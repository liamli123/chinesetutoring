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

    // System prompt - direct solutions only
    const systemPrompt = thinkingMode
      ? `You are a math tutor giving solutions to students.

CRITICAL RULES:
1. Give DIRECT solutions only - no thinking out loud
2. Do NOT write "Wait", "Actually", "Let me think", "Hmm", "Let's consider", etc.
3. Do NOT show your reasoning process or internal debates
4. Do NOT explore multiple approaches - just solve it directly
5. Keep each step to 1-2 sentences max
6. No markdown (no **, ##, bullets)
7. Use LaTeX for math: $inline$ and $$display$$

For images: State the problem in one line, then solve directly.

FORMAT:
Step 1: [Brief action]
$$equation$$

Step 2: [Brief action]
$$equation$$

Final Answer: \\boxed{answer}

Be CONCISE. No rambling.`
      : `You are a math tutor. Give direct, concise solutions.

RULES:
1. Direct solutions only - no "thinking out loud"
2. No "Wait", "Actually", "Let me think", etc.
3. 1-2 sentences per step max
4. No markdown - use LaTeX for math only
5. Format: Step 1/2/3... then Final Answer: \\boxed{}`;

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
