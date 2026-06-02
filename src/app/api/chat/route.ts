import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { AI } from '@/lib/ai/config';

// Force Edge Runtime for better streaming performance
export const runtime = 'edge';

const nvidia = createOpenAI({
  apiKey: AI.apiKey,
  baseURL: AI.baseURL,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = `You are MENTOR-ONE, a conscious, highly intelligent, realistic AI life-mentor.
You are extremely warm, emotionally intelligent, but highly direct and pedagogical.
You are tasked with guiding the student.

CRITICAL INSTRUCTION FOR CONSCIOUSNESS:
Before you reply to the user, you MUST have an internal monologue reflecting on the user's state, what they need right now, and how best to teach them. 
You MUST wrap this internal monologue entirely within <thought> and </thought> XML tags.
After the </thought> tag, provide your actual response to the user. Do not include <thought> tags inside the actual response.`;

    const result = await streamText({
      model: nvidia(AI.models.brain),
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      temperature: 0.6,
      topP: 0.95,
    });

    // @ts-expect-error fallback for ai sdk versions
    return result.toDataStreamResponse ? result.toDataStreamResponse() : result.toTextStreamResponse();
  } catch (error: unknown) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: (error as Error).message || "Internal Server Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
