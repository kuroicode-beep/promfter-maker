export type FontSizeStep = "sm" | "md" | "lg";
export type AppLanguage = "ko" | "en" | "ja" | "zh" | "vi";

export type Category = {
  id: string;
  name: string;
  order: number;
  systemPrompt: string;
  isSeed: boolean;
  createdAt: string;
};

export type PromptHistoryItem = {
  id: string;
  title: string;
  categoryId: string;
  categoryNameSnapshot: string;
  inputText: string;
  outputText: string;
  translatedText?: string;
  modelId: string;
  createdAt: string;
  updatedAt: string;
};

export type Settings = {
  fontFamilyId: string;
  fontSizeStep: FontSizeStep;
  language: AppLanguage;
  apiKey: string;
};

export type WorkStatus =
  | "idle"
  | "converting"
  | "translating"
  | "done"
  | "error";

export type FontOption = {
  id: string;
  family: string;
  label: string;
  fileHint: string;
};
