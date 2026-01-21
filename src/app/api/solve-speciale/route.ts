import { NextRequest, NextResponse } from 'next/server';
import { getSpecialeClient, calculateCost, MATH_TUTOR_SYSTEM_PROMPT, type ChatMessage } from '@/lib/deepseek';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history = [] } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!process.env.DEEPSEEK_API_KEY) {
      return NextResponse.json(
        { error: 'DeepSeek API key is not configured' },
        { status: 500 }
      );
    }

    // System prompt for Speciale mode - comprehensive markdown format
    const specialeSystemPrompt = `You are a math tutor. Provide detailed, well-structured solutions using markdown formatting.

FORMAT YOUR RESPONSE LIKE THIS:

# Problem Title: **Brief Description**

Brief introduction explaining the approach.

## **Setup**

State the given information and what we need to find.

$A = \\begin{bmatrix} ... \\end{bmatrix}$

---

## **Step-by-Step Solution**

### **Step 1: [What we're doing]**

Explain what this step accomplishes.

#### **Element/Part being calculated:**
$\\text{Description} = expression$
$(values)(substituted) = result$
$answer = value$

### **Step 2: [Continue...]**

[Continue pattern...]

---

## **Final Answer:**

$\\boxed{final answer}$

---

## **Verification** (optional but encouraged)

Show the answer is correct.

FORMATTING RULES:
- Use # for main title, ## for sections, ### for steps, #### for sub-parts
- Use **bold** for emphasis
- Use --- for horizontal separators between major sections
- Use $ for inline math, $$ for display math
- Show each calculation step clearly
- Define all notation`;

    // Build messages array
    const messages: ChatMessage[] = [
      { role: 'system', content: specialeSystemPrompt },
      ...history,
      { role: 'user', content: message },
    ];

    // Use deepseek-chat for reliable responses
    const completion = await getSpecialeClient().chat.completions.create({
      model: 'deepseek-chat',
      messages: messages as never[],
      max_tokens: 8192,
      temperature: 0.1,
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
    console.error('Error in solve-speciale API:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
