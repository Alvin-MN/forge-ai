import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

async function callWithRetry(fn: () => Promise<string>, maxRetries = 5): Promise<string> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err: unknown) {
      const status = (err as { status?: number }).status;
      if (status === 429 && attempt < maxRetries) {
        const wait = Math.min(Math.pow(2, attempt + 1) * 1000, 30000); // 2s, 4s, 8s, 16s, 30s
        console.log(`Gemini 429 - retry ${attempt + 1}/${maxRetries} in ${wait}ms`);
        await new Promise((r) => setTimeout(r, wait));
        continue;
      }
      throw err;
    }
  }
  throw new Error("Max retries exceeded");
}

export const generateContent = async (
  systemPrompt: string,
  userPrompt: string,
  temperature: number = 0.7,
  maxTokens: number = 3000
): Promise<string> => {
  return callWithRetry(async () => {
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
  });
};

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
