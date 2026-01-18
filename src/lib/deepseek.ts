import OpenAI from 'openai';

// Lazy-initialized clients to avoid build-time errors
let _regularClient: OpenAI | null = null;
let _specialeClient: OpenAI | null = null;

// Regular DeepSeek API client (getter)
export function getRegularClient(): OpenAI {
  if (!_regularClient) {
    _regularClient = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY || '',
      baseURL: 'https://api.deepseek.com',
    });
  }
  return _regularClient;
}

// Speciale DeepSeek API client (getter)
// Note: The special endpoint URL has expired, using regular endpoint with deepseek-reasoner for best accuracy
export function getSpecialeClient(): OpenAI {
  if (!_specialeClient) {
    _specialeClient = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY || '',
      baseURL: 'https://api.deepseek.com',
    });
  }
  return _specialeClient;
}

// Cost calculation based on DeepSeek pricing
// Input: $0.14 per million tokens
// Output: $0.28 per million tokens
export function calculateCost(usage: { prompt_tokens: number; completion_tokens: number }) {
  const inputCost = (usage.prompt_tokens / 1_000_000) * 0.14;
  const outputCost = (usage.completion_tokens / 1_000_000) * 0.28;
  return {
    usd: inputCost + outputCost,
    inputTokens: usage.prompt_tokens,
    outputTokens: usage.completion_tokens,
  };
}

// TypeScript interfaces
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string | ContentPart[];
}

export interface ContentPart {
  type: 'text' | 'image_url';
  text?: string;
  image_url?: {
    url: string;
  };
}

export interface SolveRequest {
  message: string;
  imageBase64?: string;
  pdfText?: string;
  thinkingMode?: boolean;
  history?: ChatMessage[];
}

export interface SolveResponse {
  solution: string;
  reasoning?: string;
  tokens: {
    input: number;
    output: number;
  };
  cost: number;
  error?: string;
}

// System prompt for math tutoring
export const MATH_TUTOR_SYSTEM_PROMPT = `You are an expert math tutor AI assistant. Your role is to help students solve mathematical problems step by step.

Guidelines:
1. Provide clear, step-by-step explanations
2. Show all your work and reasoning
3. Use proper mathematical notation when possible
4. Highlight the final answer using \\boxed{} notation (e.g., \\boxed{42})
5. If the problem is ambiguous, state your assumptions
6. Be encouraging and educational in your responses
7. If you see an image of a math problem, analyze it carefully and solve it
8. For complex problems, break them down into manageable parts

Remember: Your goal is to help students understand the concepts, not just give them answers.`;
