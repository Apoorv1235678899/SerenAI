import "server-only";
import { GoogleGenAI } from "@google/genai";
import type { IChatMessage } from "@/models/ChatSession";

const systemPrompt = `You are an AI therapist assistant. Provide empathetic, supportive guidance, use evidence-based techniques, maintain professional boundaries, monitor for risk, and encourage appropriate professional help when needed.`;

export async function generateChatReply(
  message: string,
  history: IChatMessage[]
) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not configured");

  const ai = new GoogleGenAI({ apiKey });
  const analysisResult = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Analyze this therapy message and return only valid JSON with keys emotionalState (string), themes (string[]), riskLevel (number), recommendedApproach (string), and progressIndicators (string[]).\nMessage: ${message}\nRecent history: ${JSON.stringify(history.slice(-12))}`,
          },
        ],
      },
    ],
  });

  const analysisText = (analysisResult.text ?? "")
    .replace(/```(?:json)?/gi, "")
    .trim();
  const analysis = JSON.parse(analysisText);
  const responseResult = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `${systemPrompt}\nMessage: ${message}\nAnalysis: ${JSON.stringify(analysis)}\nRecent history: ${JSON.stringify(history.slice(-12))}`,
          },
        ],
      },
    ],
  });

  return {
    analysis,
    response: (responseResult.text ?? "").trim(),
  };
}