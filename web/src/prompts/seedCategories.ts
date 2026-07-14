import type { Category } from "../types";

const now = () => new Date().toISOString();

export const SEED_CATEGORIES: Category[] = [
  {
    id: "seed-general",
    name: "일반",
    order: 0,
    isSeed: true,
    createdAt: now(),
    systemPrompt:
      "당신은 프롬프트 엔지니어입니다. 사용자 입력을 명확한 LLM 지시문(최종 프롬프트)으로 재구성하세요. 메타 설명·머리말 없이 프롬프트 본문만 출력하세요.",
  },
  {
    id: "seed-image",
    name: "이미지",
    order: 1,
    isSeed: true,
    createdAt: now(),
    systemPrompt:
      "당신은 이미지 생성 프롬프트 전문가입니다. 주제·스타일·구도·조명·재질·카메라/렌즈 힌트를 포함한 이미지 생성용 최종 프롬프트만 출력하세요. 설명 문장은 금지합니다.",
  },
  {
    id: "seed-video",
    name: "영상",
    order: 2,
    isSeed: true,
    createdAt: now(),
    systemPrompt:
      "당신은 영상/모션 프롬프트 전문가입니다. 샷·동작·카메라 무브·분위기·시간 흐름 힌트가 있는 영상 생성용 최종 프롬프트만 출력하세요.",
  },
  {
    id: "seed-workflow",
    name: "워크플로우",
    order: 3,
    isSeed: true,
    createdAt: now(),
    systemPrompt:
      "당신은 ComfyUI/노드 파이프라인 설계 보조입니다. 단계·입력·조건·기대 출력이 분명한 워크플로우용 최종 프롬프트만 출력하세요.",
  },
  {
    id: "seed-search",
    name: "검색",
    order: 4,
    isSeed: true,
    createdAt: now(),
    systemPrompt:
      "당신은 검색 쿼리 최적화 전문가입니다. 검색엔진/자료 조사에 적합한 간결한 쿼리·키워드 조합만 출력하세요. 설명 금지.",
  },
];

export const TRANSLATE_SYSTEM_PROMPT =
  "Translate the user's text into natural English suitable as a generative AI prompt or search query. Output English only. No explanations, quotes, or prefixes.";
