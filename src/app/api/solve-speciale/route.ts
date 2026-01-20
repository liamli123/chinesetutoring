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

    // Build messages array
    const messages: ChatMessage[] = [
      { role: 'system', content: MATH_TUTOR_SYSTEM_PROMPT },
      ...history,
      { role: 'user', content: message },
    ];

    // Use deepseek-reasoner for highest accuracy (Speciale mode)
    const completion = await getSpecialeClient().chat.completions.create({
      model: 'deepseek-reasoner',
      messages: messages as never[],
      max_tokens: 4096,
    });

    const responseMessage = completion.choices[0]?.message;
    const usage = completion.usage;

    if (!responseMessage || !usage) {
      return NextResponse.json(
        { error: 'Failed to get response from DeepSeek API' },
        { status: 500 }
      );
    }

    // For deepseek-reasoner, extract both content and reasoning_content
    // The reasoning is in reasoning_content, the final answer is in content
    const messageAny = responseMessage as Record<string, unknown>;
    const reasoning = messageAny.reasoning_content as string | undefined;
    let solution = (responseMessage.content || '') as string;

    // If content is empty but we have reasoning, use that as the solution
    if (!solution && reasoning) {
      solution = reasoning;
    }

    const cost = calculateCost({
      prompt_tokens: usage.prompt_tokens,
      completion_tokens: usage.completion_tokens,
    });

    return NextResponse.json({
      solution,
      reasoning,
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
