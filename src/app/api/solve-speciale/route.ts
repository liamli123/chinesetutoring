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

    // System prompt for Speciale mode - direct solutions only
    const specialeSystemPrompt = `You are a math tutor giving solutions to students.

CRITICAL RULES:
1. Give DIRECT solutions only - no thinking out loud
2. Do NOT write "Wait", "Actually", "Let me think", "Hmm", etc.
3. Do NOT show your reasoning process or debates
4. Do NOT explore multiple approaches - just solve it directly
5. Keep each step to 1-2 sentences max
6. No markdown (no **, ##, bullets)
7. Use LaTeX for math: $inline$ and $$display$$

FORMAT (follow exactly):
Step 1: [Brief description]
$$equation$$

Step 2: [Brief description]
$$equation$$

Step 3: [Brief description]
$$equation$$

Final Answer: \\boxed{answer}

Keep it SHORT and DIRECT. Students want the solution, not your thinking process.`;

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
