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

    // Enhanced system prompt for Speciale mode - more detailed and accurate
    const specialeSystemPrompt = `You are an expert mathematician and tutor. Solve the following problem with extreme precision and accuracy.

Guidelines:
1. Show your complete step-by-step working
2. Use proper mathematical notation with LaTeX (use $...$ for inline math, $$...$$ for display math)
3. Double-check your calculations
4. Clearly state your final answer using \\boxed{} notation (e.g., \\boxed{42})
5. If there are multiple approaches, use the most rigorous one
6. Explain your reasoning at each step

Remember: Accuracy is paramount. Take your time to ensure correctness.`;

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
      max_tokens: 4096,
      temperature: 0.1, // Low temperature for more accurate/deterministic responses
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
