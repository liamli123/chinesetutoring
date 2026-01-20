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

    // Build messages array
    const messages: ChatMessage[] = [
      { role: 'system', content: MATH_TUTOR_SYSTEM_PROMPT },
      ...history,
      { role: 'user', content: contentParts.length === 1 && contentParts[0].type === 'text'
        ? contentParts[0].text!
        : contentParts
      },
    ];

    // Choose model based on thinking mode
    const model = thinkingMode ? 'deepseek-reasoner' : 'deepseek-chat';

    const completion = await getRegularClient().chat.completions.create({
      model,
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

    // Extract content and reasoning_content (for deepseek-reasoner)
    const messageAny = responseMessage as unknown as Record<string, unknown>;
    let reasoning: string | undefined;
    let solution = ((responseMessage.content || '') as string).trim();

    // For deepseek-reasoner (thinking mode), extract reasoning_content
    if (thinkingMode) {
      reasoning = messageAny.reasoning_content as string | undefined;
      // If solution is empty but we have reasoning, use reasoning as the solution
      if (!solution && reasoning) {
        solution = reasoning;
      }
      // Debug log
      console.log('DeepSeek response - content:', responseMessage.content, 'reasoning_content:', reasoning ? reasoning.substring(0, 100) + '...' : 'none');
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
    console.error('Error in solve-regular API:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
