import { NextResponse } from "next/server";
import { AI } from "@/lib/ai/config";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!AI.apiKey || AI.apiKey === "<<<HARDCODE_NVIDIA_API_KEY_HERE>>>") {
      return NextResponse.json(
        { error: "NVIDIA API Key is missing. Please set it in config or .env" },
        { status: 500 }
      );
    }

    const response = await fetch(`${AI.baseURL}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${AI.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: AI.models.brain,
        messages: [
          {
            role: "system",
            content: "You are MENTOR-ONE, a realistic, voice-first AI life-mentor. Provide detailed thinking on the student's constraints and current goals before answering."
          },
          ...messages
        ],
        temperature: AI.reasoning.on.temperature,
        top_p: AI.reasoning.on.top_p,
        max_tokens: 1024,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`NVIDIA API Error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return NextResponse.json({ message: data.choices[0].message.content });

  } catch (error: unknown) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
