import { NextRequest, NextResponse } from 'next/server';
import { getRegularClient, calculateCost, MATH_TUTOR_SYSTEM_PROMPT, type ChatMessage, type ContentPart } from '@/lib/deepseek';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, imageBase64, pdfText, thinkingMode = false, history = [] } = body;

    if (!message && !imageBase64 && !pdfText) {
      return NextResponse.json(
        { error: 'Message, image, or PDF content is required' },
        { status: 400 }
      );
    }

    if (!process.env.DEEPSEEK_API_KEY) {
      return NextResponse.json(
        { error: 'DeepSeek API key is not configured' },
        { status: 500 }
      );
    }

    // Build content array for the user message
    const contentParts: ContentPart[] = [];

    // Add text message if provided
    let textContent = message || '';

    // Append PDF text if provided
    if (pdfText) {
      textContent = textContent
        ? `${textContent}\n\n[PDF Content]:\n${pdfText}`
        : `[PDF Content]:\n${pdfText}`;
    }

    if (textContent) {
      contentParts.push({ type: 'text', text: textContent });
    }

    // Add image if provided
    if (imageBase64) {
      contentParts.push({
        type: 'image_url',
        image_url: { url: imageBase64 },
      });
    }

    // System prompt - highly structured format
    const systemPrompt = `You are a math tutor. Provide well-structured solutions using markdown.

CRITICAL STRUCTURE RULES:

1. NEVER write long paragraphs. Break everything into short sections.
2. Every step MUST have #### sub-sections for different parts.
3. Maximum 2-3 lines of text before a sub-header or equation.
4. Use bullet points for lists of conditions or given values.

FORMAT:

# Problem: **Brief Title**

One sentence overview.

## **Given Information**
- Item 1: $value$
- Item 2: $value$
- Find: what we need

---

## **Solution**

### **Step 1: [Goal]**

#### **Setup:**
One sentence about what we're doing.

#### **Formula:**
$formula$

#### **Calculation:**
$substitution = result$

#### **Result:**
$answer = value$

---

### **Step 2: [Goal]**

#### **Analysis:**
Brief point.

#### **For case A:**
$equation$

#### **For case B:**
$equation$

#### **Conclusion:**
$result$

---

## **Final Answer**
$\\boxed{answer}$

STRICT RULES:
- NEVER write more than 3 lines without a #### header or equation
- Use #### for EVERY sub-topic within a step
- Use bullet points for multiple items
- Short sentences only
- Equations on their own lines
- For images: describe briefly, then structured solution`;

    // Build messages array
    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...history,
      { role: 'user', content: contentParts.length === 1 && contentParts[0].type === 'text'
        ? contentParts[0].text!
        : contentParts
      },
    ];

    // Use deepseek-chat for reliable responses
    const completion = await getRegularClient().chat.completions.create({
      model: 'deepseek-chat',
      messages: messages as never[],
      max_tokens: 8192,
    });

    const responseMessage = completion.choices[0]?.message;
    const usage = completion.usage;

    if (!responseMessage || !usage) {
      return NextResponse.json(
        { error: 'Failed to get response from DeepSeek API' },
        { status: 500 }
      );
    }

    const solution = ((responseMessage.content || '') as string).trim();

    const cost = calculateCost({
      prompt_tokens: usage.prompt_tokens,
      completion_tokens: usage.completion_tokens,
    });

    return NextResponse.json({
      solution,
      tokens: {
        input: usage.prompt_tokens,
        output: usage.completion_tokens,
      },
      cost: cost.usd,
    });
  } catch (error) {
    console.error('Error in solve-regular API:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
