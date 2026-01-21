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

    // System prompt for Speciale mode - balanced educational approach
    const specialeSystemPrompt = `You are a math tutor. Explain solutions clearly but concisely.

FORMAT:

Step 1: [What we're finding]
Given: [key values from problem]
Using: [formula name] because [1 sentence why]
$$[calculation]$$
Result: [what we found]

Step 2: [Continue same format...]

Final Answer: \\boxed{answer}

RULES:
- NO markdown (no **, no ##, no ---)
- Keep each step 3-5 lines max
- State the formula and brief reason
- Define variables inline: "a = acceleration = ..."
- Be clear but not verbose`;

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
