import { TRANSLATE_SYSTEM_PROMPT } from "../prompts/seedCategories";

const MODEL = "deepseek-v4-flash";
const BASE = "https://api.deepseek.com";

export class DeepSeekError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DeepSeekError";
  }
}

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

async function chat(
  apiKey: string,
  messages: ChatMessage[],
  signal?: AbortSignal,
): Promise<string> {
  if (!apiKey.trim()) {
    throw new DeepSeekError("API 키가 없습니다. 설정에서 키를 입력하세요.");
  }

  const res = await fetch(`${BASE}/chat/completions`, {
    method: "POST",
    signal,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey.trim()}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      thinking: { type: "disabled" },
    }),
  });

  if (!res.ok) {
    let detail = `${res.status}`;
    try {
      const body = (await res.json()) as { error?: { message?: string } };
      if (body.error?.message) detail = body.error.message;
    } catch {
      /* ignore */
    }
    throw new DeepSeekError(`DeepSeek 요청 실패: ${detail}`);
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) throw new DeepSeekError("응답이 비어 있습니다.");
  return content;
}

export function resolveApiKey(stored: string): string {
  return (
    stored.trim() ||
    (import.meta.env.VITE_DEEPSEEK_API_KEY ?? "").trim() ||
    ""
  );
}

export async function convertPrompt(
  apiKey: string,
  systemPrompt: string,
  input: string,
  signal?: AbortSignal,
): Promise<{ text: string; modelId: string }> {
  const text = await chat(
    apiKey,
    [
      { role: "system", content: systemPrompt },
      { role: "user", content: input },
    ],
    signal,
  );
  return { text, modelId: MODEL };
}

export async function translateToEnglish(
  apiKey: string,
  text: string,
  signal?: AbortSignal,
): Promise<string> {
  return chat(
    apiKey,
    [
      { role: "system", content: TRANSLATE_SYSTEM_PROMPT },
      { role: "user", content: text },
    ],
    signal,
  );
}

export { MODEL as DEEPSEEK_MODEL };
