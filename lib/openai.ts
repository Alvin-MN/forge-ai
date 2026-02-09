import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateContent = async (
  systemPrompt: string,
  userPrompt: string,
  temperature: number = 0.7,
  maxTokens: number = 3000
): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: userPrompt,
    config: {
      systemInstruction: systemPrompt,
      temperature,
      maxOutputTokens: maxTokens,
    },
  });
  return response.text || "";
};

// Keep backward compat export shape
export const openai = {
  chat: {
    completions: {
      create: async (params: {
        model: string;
        messages: { role: string; content: string }[];
        temperature?: number;
        max_tokens?: number;
      }) => {
        const system = params.messages.find((m) => m.role === "system")?.content || "";
        const user = params.messages.find((m) => m.role === "user")?.content || "";
        const text = await generateContent(system, user, params.temperature, params.max_tokens);
        return { choices: [{ message: { content: text } }] };
      },
    },
  },
};
