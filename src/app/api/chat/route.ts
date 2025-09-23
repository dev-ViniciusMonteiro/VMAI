// src/app/api/chat/route.ts
import { NextResponse } from "next/server";
import { systemPrompt } from "./prompts";

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = process.env.OPENROUTER_API_KEY!;
const HTTP_REFERER = "https://www.vmai.com.br/";
const X_TITLE = "viniciusdev";
const MODEL = "x-ai/grok-4-fast:free";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messageHistory } = body;

    const messages = [
      ...systemPrompt,
      ...messageHistory.slice(-5)
    ];

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "HTTP-Referer": HTTP_REFERER,
        "X-Title": X_TITLE,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: messages,
        temperature: 0.7, // Aumenta a aleatoriedade das respostas
        max_tokens: 700, // Limite de tokens para a resposta
        top_p: 1, // isso ajuda a evitar respostas repetitivas
      }),
    });

    if (!response.ok) {
      throw new Error("Primary model failed");
    }

    const data = await response.json();
    const result = data?.choices?.[0]?.message?.content || "Erro, sem resposta!";

    return NextResponse.json({ result });
  } catch {
    try {
      // Fallback to the contingency model
      const fallbackMessages = [
        ...systemPrompt,
        ...messageHistory.slice(-5)
      ];
      
      const fallbackResponse = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "HTTP-Referer": HTTP_REFERER,
          "X-Title": X_TITLE,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-4.1-nano",
          messages: fallbackMessages,
        }),
      });

      if (!fallbackResponse.ok) {
        throw new Error("Contingency model also failed");
      }

      const fallbackData = await fallbackResponse.json();
      const fallbackResult = fallbackData?.choices?.[0]?.message?.content || "Erro, sem resposta!";

      return NextResponse.json({ result: fallbackResult });
    } catch (fallbackErr: unknown) {
      const errorMessage = fallbackErr instanceof Error ? fallbackErr.message : "An unknown error occurred during fallback";
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }
}
