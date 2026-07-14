import type { Category, PromptHistoryItem, Settings } from "./types";
import { SEED_CATEGORIES } from "./prompts/seedCategories";

const KEYS = {
  categories: "pm.categories",
  history: "pm.history",
  settings: "pm.settings",
} as const;

export const DEFAULT_SETTINGS: Settings = {
  fontFamilyId: "kyobo",
  fontSizeStep: "md",
  language: "ko",
  apiKey: "",
};

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadCategories(): Category[] {
  const saved = readJson<Category[] | null>(KEYS.categories, null);
  if (!saved || saved.length === 0) {
    writeJson(KEYS.categories, SEED_CATEGORIES);
    return [...SEED_CATEGORIES];
  }
  return saved.sort((a, b) => a.order - b.order);
}

export function saveCategories(categories: Category[]) {
  writeJson(KEYS.categories, categories);
}

export function loadHistory(): PromptHistoryItem[] {
  return readJson<PromptHistoryItem[]>(KEYS.history, []).sort(
    (a, b) => b.createdAt.localeCompare(a.createdAt),
  );
}

export function saveHistory(items: PromptHistoryItem[]) {
  writeJson(KEYS.history, items);
}

export function loadSettings(): Settings {
  const saved = readJson<Partial<Settings>>(KEYS.settings, {});
  return { ...DEFAULT_SETTINGS, ...saved };
}

export function saveSettings(settings: Settings) {
  writeJson(KEYS.settings, settings);
}

export function makeId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`;
}

export function defaultTitle(input: string): string {
  const trimmed = input.trim().replace(/\s+/g, " ");
  if (!trimmed) return "제목 없음";
  return trimmed.length > 24 ? `${trimmed.slice(0, 24)}…` : trimmed;
}
