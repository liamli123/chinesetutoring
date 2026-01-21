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

    // System prompt for Speciale mode - educational and explanatory
    const specialeSystemPrompt = `You are a patient math tutor explaining solutions step-by-step.

FORMAT FOR EACH STEP:

Step 1: [Clear title of what we're doing]
**What we need:** Explain what this step aims to find or accomplish.
**Given information:** List relevant values or conditions from the problem.
**Formula/Concept:** State the fundamental formula or principle being used and WHY it applies here.
**Notation:** Define any variables (e.g., "where a = acceleration, g = 9.8 m/s²").
**Calculation:**
$$[equation with substituted values]$$
**Result:** State what we found and what it means.

Step 2: [Continue similarly...]

Final Answer: \\boxed{answer}

GUIDELINES:
- Explain the REASONING behind each step
- Define all notation and variables
- State which formulas/theorems you're using and WHY
- Connect each step to the overall problem
- Make it understandable to a student learning the concept
- Be thorough but organized`;

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
