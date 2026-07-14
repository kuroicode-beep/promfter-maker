import type { AppLanguage, FontOption } from "./types";

export const FONT_OPTIONS: FontOption[] = [
  {
    id: "kyobo",
    family: '"KyoboHandwriting2019", "Malgun Gothic", sans-serif',
    label: "교보손글씨2019",
    fileHint: "KyoboHandwriting2019.woff",
  },
  {
    id: "gothic",
    family: '"Malgun Gothic", sans-serif',
    label: "고딕",
    fileHint: "system",
  },
  {
    id: "nanum",
    family: '"NanumGothic", "Malgun Gothic", sans-serif',
    label: "나눔고딕",
    fileHint: "NanumGothic.woff",
  },
  {
    id: "lineseed",
    family: '"LINE Seed Sans KR", "Malgun Gothic", sans-serif',
    label: "라인시드",
    fileHint: "LINESeedKR-Rg.woff2",
  },
  {
    id: "gowun",
    family: '"Gowun Dodum", "Malgun Gothic", sans-serif',
    label: "고운돋움",
    fileHint: "GowunDodum-Regular.woff",
  },
  {
    id: "cafe24",
    family: '"Cafe24Dongdong", "Malgun Gothic", sans-serif',
    label: "카페24동동",
    fileHint: "Cafe24Dongdong.woff",
  },
  {
    id: "tmoney",
    family: '"TmoneyRoundWind", "Malgun Gothic", sans-serif',
    label: "티머니둥근바람",
    fileHint: "TmoneyRoundWindRegular.woff",
  },
  {
    id: "recipe",
    family: '"Recipekorea", "Malgun Gothic", sans-serif',
    label: "레코",
    fileHint: "Recipekorea.woff",
  },
];

export const FONT_SIZE_PX: Record<"sm" | "md" | "lg", number> = {
  sm: 16,
  md: 18,
  lg: 20,
};

type Dict = Record<string, string>;

const ko: Dict = {
  brandSubtitle: "prompt converter",
  management: "관리",
  managementHint: "변환을 관리합니다",
  history: "히스토리",
  settings: "설정",
  help: "도움말",
  profile: "사용자",
  promptInput: "프롬프트 입력",
  promptPlaceholder: "아이디어를 입력하세요",
  convert: "변환",
  finalPrompt: "최종 프롬프트",
  copy: "복사하기",
  translate: "영어로 번역",
  addCategory: "카테고리 추가",
  deleteCategory: "카테고리 삭제",
  emptyInput: "입력이 비어 있습니다",
  converting: "변환 중",
  translating: "번역 중",
  done: "완료",
  copied: "복사됨",
  failed: "실패",
  convertFailed: "변환 실패",
  translateFailed: "번역 실패",
  minCategory: "카테고리는 최소 1개 필요합니다",
  confirmDeleteCategory: "이 카테고리를 삭제할까요?",
  newCategoryName: "새 카테고리 이름",
  noTitle: "제목 없음",
  settingsTitle: "설정",
  fontSection: "글꼴 설정",
  sizeSection: "글자 크기",
  langSection: "언어",
  apiKeySection: "DeepSeek API 키",
  apiKeyPlaceholder: "sk-... (비우면 환경 변수 사용)",
  saveSettings: "설정 저장",
  resetSettings: "초기화",
  close: "닫기",
  helpBody:
    "카테고리를 고르고 아이디어를 입력한 뒤 변환하세요. DeepSeek V4 Flash가 최종 프롬프트를 만듭니다.",
  idleHint: "준비됨",
  noHistory: "히스토리가 없습니다",
  sizeSm: "작음",
  sizeMd: "보통",
  sizeLg: "큼",
};

const en: Dict = {
  ...ko,
  brandSubtitle: "prompt converter",
  management: "Management",
  managementHint: "Manage your conversions",
  history: "History",
  settings: "Settings",
  help: "Help",
  profile: "User",
  promptInput: "Prompt input",
  promptPlaceholder: "Enter your idea",
  convert: "Convert",
  finalPrompt: "Final prompt",
  copy: "Copy",
  translate: "Translate to English",
  addCategory: "Add category",
  deleteCategory: "Delete category",
  emptyInput: "Input is empty",
  converting: "Converting",
  translating: "Translating",
  done: "Done",
  copied: "Copied",
  failed: "Failed",
  convertFailed: "Convert failed",
  translateFailed: "Translate failed",
  minCategory: "At least one category is required",
  confirmDeleteCategory: "Delete this category?",
  newCategoryName: "New category name",
  noTitle: "Untitled",
  settingsTitle: "Settings",
  fontSection: "Font",
  sizeSection: "Text size",
  langSection: "Language",
  apiKeySection: "DeepSeek API key",
  apiKeyPlaceholder: "sk-... (env fallback if empty)",
  saveSettings: "Save",
  resetSettings: "Reset",
  close: "Close",
  helpBody:
    "Pick a category, enter an idea, then convert. DeepSeek V4 Flash builds the final prompt.",
  idleHint: "Ready",
  noHistory: "No history yet",
  sizeSm: "S",
  sizeMd: "M",
  sizeLg: "L",
};

const ja: Dict = {
  ...en,
  management: "管理",
  history: "履歴",
  settings: "設定",
  help: "ヘルプ",
  promptInput: "プロンプト入力",
  promptPlaceholder: "アイデアを入力",
  convert: "変換",
  finalPrompt: "最終プロンプト",
  copy: "コピー",
  translate: "英語に翻訳",
  settingsTitle: "設定",
  saveSettings: "保存",
  resetSettings: "初期化",
};

const zh: Dict = {
  ...en,
  management: "管理",
  history: "历史",
  settings: "设置",
  help: "帮助",
  promptInput: "提示词输入",
  promptPlaceholder: "输入想法",
  convert: "转换",
  finalPrompt: "最终提示词",
  copy: "复制",
  translate: "翻译成英语",
  settingsTitle: "设置",
  saveSettings: "保存",
  resetSettings: "重置",
};

const vi: Dict = {
  ...en,
  management: "Quản lý",
  history: "Lịch sử",
  settings: "Cài đặt",
  help: "Trợ giúp",
  promptInput: "Nhập prompt",
  promptPlaceholder: "Nhập ý tưởng",
  convert: "Chuyển đổi",
  finalPrompt: "Prompt cuối",
  copy: "Sao chép",
  translate: "Dịch sang tiếng Anh",
  settingsTitle: "Cài đặt",
  saveSettings: "Lưu",
  resetSettings: "Đặt lại",
};

const TABLES: Record<AppLanguage, Dict> = { ko, en, ja, zh, vi };

export function t(lang: AppLanguage, key: string): string {
  return TABLES[lang][key] ?? TABLES.en[key] ?? key;
}

export function langToHtml(lang: AppLanguage): string {
  const map: Record<AppLanguage, string> = {
    ko: "ko",
    en: "en",
    ja: "ja",
    zh: "zh",
    vi: "vi",
  };
  return map[lang];
}
