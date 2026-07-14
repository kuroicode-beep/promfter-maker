/**
 * Smoke test: DeepSeek V4 Flash convert + translate.
 * Usage: npm run test:api
 */
const key =
  process.env.DEEPSEEK_API_KEY ||
  process.env.VITE_DEEPSEEK_API_KEY ||
  "";

if (!key) {
  console.error("FAIL: DEEPSEEK_API_KEY missing");
  process.exit(1);
}

async function chat(system, user) {
  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "deepseek-v4-flash",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      thinking: { type: "disabled" },
    }),
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  }
  const data = await res.json();
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("empty content");
  return text;
}

async function main() {
  const imageSystem =
    "당신은 이미지 생성 프롬프트 전문가입니다. 주제·스타일·구도·조명·재질·카메라/렌즈 힌트를 포함한 이미지 생성용 최종 프롬프트만 출력하세요. 설명 문장은 금지합니다.";
  const converted = await chat(
    imageSystem,
    "빛나는 금속 구체가 떠 있는 어두운 연구실",
  );
  if (converted.length < 20) throw new Error("convert too short");
  console.log("CONVERT_OK", converted.slice(0, 160).replace(/\n/g, " "));

  const translated = await chat(
    "Translate the user's text into natural English suitable as a generative AI prompt. Output English only. No explanations, quotes, or prefixes.",
    converted,
  );
  if (!/[A-Za-z]{8,}/.test(translated)) {
    throw new Error("translate does not look like English");
  }
  console.log("TRANSLATE_OK", translated.slice(0, 160).replace(/\n/g, " "));
  console.log("ALL_PASS");
}

main().catch((err) => {
  console.error("FAIL", err);
  process.exit(1);
});
