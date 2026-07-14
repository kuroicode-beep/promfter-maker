import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { FONT_OPTIONS, FONT_SIZE_PX, langToHtml, t } from "./i18n";
import {
  convertPrompt,
  DeepSeekError,
  resolveApiKey,
  translateToEnglish,
} from "./services/deepseek";
import {
  defaultTitle,
  DEFAULT_SETTINGS,
  loadCategories,
  loadHistory,
  loadSettings,
  makeId,
  saveCategories,
  saveHistory,
  saveSettings,
} from "./storage";
import type {
  Category,
  PromptHistoryItem,
  Settings,
  WorkStatus,
} from "./types";

type Panel = "workspace" | "help";

function statusClass(status: WorkStatus): string {
  if (status === "done") return "ok";
  if (status === "error") return "err";
  if (status === "converting" || status === "translating") return "warn";
  return "";
}

export default function App() {
  const [categories, setCategories] = useState<Category[]>(() => loadCategories());
  const [history, setHistory] = useState<PromptHistoryItem[]>(() => loadHistory());
  const [settings, setSettings] = useState<Settings>(() => loadSettings());
  const [draftSettings, setDraftSettings] = useState<Settings>(settings);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    () => loadCategories()[0]?.id ?? "",
  );
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [status, setStatus] = useState<WorkStatus>("idle");
  const [statusLabel, setStatusLabel] = useState("");
  const [activeHistoryId, setActiveHistoryId] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [panel, setPanel] = useState<Panel>("workspace");
  const abortRef = useRef<AbortController | null>(null);

  const lang = settings.language;
  const selectedCategory = useMemo(
    () => categories.find((c) => c.id === selectedCategoryId) ?? categories[0],
    [categories, selectedCategoryId],
  );

  useEffect(() => {
    document.documentElement.lang = langToHtml(settings.language);
    const font =
      FONT_OPTIONS.find((f) => f.id === settings.fontFamilyId) ?? FONT_OPTIONS[0];
    document.documentElement.style.setProperty("--app-font-family", font.family);
    document.documentElement.style.setProperty(
      "--font-size-base",
      `${FONT_SIZE_PX[settings.fontSizeStep]}px`,
    );
  }, [settings]);

  useEffect(() => {
    saveCategories(categories);
  }, [categories]);

  useEffect(() => {
    saveHistory(history);
  }, [history]);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  function setBusy(next: WorkStatus, label: string) {
    setStatus(next);
    setStatusLabel(label);
  }

  async function onConvert() {
    if (!selectedCategory) return;
    const trimmed = inputText.trim();
    if (!trimmed) {
      setBusy("error", t(lang, "emptyInput"));
      return;
    }
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setBusy("converting", t(lang, "converting"));
    try {
      const key = resolveApiKey(settings.apiKey);
      const { text, modelId } = await convertPrompt(
        key,
        selectedCategory.systemPrompt,
        trimmed,
        ac.signal,
      );
      setOutputText(text);
      setTranslatedText("");
      const item: PromptHistoryItem = {
        id: makeId("hist"),
        title: defaultTitle(trimmed),
        categoryId: selectedCategory.id,
        categoryNameSnapshot: selectedCategory.name,
        inputText: trimmed,
        outputText: text,
        modelId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setHistory((prev) => [item, ...prev]);
      setActiveHistoryId(item.id);
      setBusy("done", t(lang, "done"));
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      const message =
        err instanceof DeepSeekError
          ? err.message
          : `${t(lang, "convertFailed")}: ${(err as Error).message}`;
      setBusy("error", message);
    }
  }

  async function onTranslate() {
    const source = outputText.trim();
    if (!source) {
      setBusy("error", t(lang, "emptyInput"));
      return;
    }
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setBusy("translating", t(lang, "translating"));
    try {
      const key = resolveApiKey(settings.apiKey);
      const en = await translateToEnglish(key, source, ac.signal);
      setTranslatedText(en);
      if (activeHistoryId) {
        setHistory((prev) =>
          prev.map((h) =>
            h.id === activeHistoryId
              ? {
                  ...h,
                  translatedText: en,
                  updatedAt: new Date().toISOString(),
                }
              : h,
          ),
        );
      }
      setBusy("done", t(lang, "done"));
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      const message =
        err instanceof DeepSeekError
          ? err.message
          : `${t(lang, "translateFailed")}: ${(err as Error).message}`;
      setBusy("error", message);
    }
  }

  async function onCopy() {
    const text = (translatedText || outputText).trim();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setBusy("done", t(lang, "copied"));
    } catch {
      setBusy("error", t(lang, "failed"));
    }
  }

  function restoreHistory(item: PromptHistoryItem) {
    setActiveHistoryId(item.id);
    setInputText(item.inputText);
    setOutputText(item.outputText);
    setTranslatedText(item.translatedText ?? "");
    if (categories.some((c) => c.id === item.categoryId)) {
      setSelectedCategoryId(item.categoryId);
    }
    setPanel("workspace");
    setBusy("idle", t(lang, "idleHint"));
  }

  function updateHistoryTitle(id: string, title: string) {
    setHistory((prev) =>
      prev.map((h) =>
        h.id === id
          ? {
              ...h,
              title: title.trim() || t(lang, "noTitle"),
              updatedAt: new Date().toISOString(),
            }
          : h,
      ),
    );
  }

  function addCategory() {
    const name = window.prompt(t(lang, "newCategoryName"), "");
    if (!name || !name.trim()) return;
    const cat: Category = {
      id: makeId("cat"),
      name: name.trim(),
      order: categories.length,
      isSeed: false,
      createdAt: new Date().toISOString(),
      systemPrompt:
        "사용자 입력을 선택한 용도에 맞는 최종 프롬프트로 재작성하세요. 본문만 출력하세요.",
    };
    setCategories((prev) => [...prev, cat]);
    setSelectedCategoryId(cat.id);
  }

  function deleteCategory() {
    if (categories.length <= 1) {
      setBusy("error", t(lang, "minCategory"));
      return;
    }
    if (!selectedCategory) return;
    if (!window.confirm(t(lang, "confirmDeleteCategory"))) return;
    const next = categories
      .filter((c) => c.id !== selectedCategory.id)
      .map((c, i) => ({ ...c, order: i }));
    setCategories(next);
    setSelectedCategoryId(next[0].id);
  }

  function openSettings() {
    setDraftSettings(settings);
    setSettingsOpen(true);
  }

  function saveDraftSettings() {
    setSettings(draftSettings);
    setSettingsOpen(false);
    setBusy("done", t(lang, "done"));
  }

  function resetDraftSettings() {
    setDraftSettings({ ...DEFAULT_SETTINGS, apiKey: draftSettings.apiKey });
  }

  const busy = status === "converting" || status === "translating";

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="sidebar">
        <div>
          <h2>{t(lang, "management")}</h2>
          <p>{t(lang, "managementHint")}</p>
        </div>
        <nav>
          <button
            type="button"
            className={`nav-btn ${panel === "workspace" ? "active" : ""}`}
            onClick={() => {
              setPanel("workspace");
              document.getElementById("history-section")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            <span aria-hidden="true">⏱</span>
            <span>{t(lang, "history")}</span>
          </button>
          <button type="button" className="nav-btn" onClick={openSettings}>
            <span aria-hidden="true">⚙</span>
            <span>{t(lang, "settings")}</span>
          </button>
          <button
            type="button"
            className={`nav-btn ${panel === "help" ? "active" : ""}`}
            onClick={() => setPanel("help")}
          >
            <span aria-hidden="true">?</span>
            <span>{t(lang, "help")}</span>
          </button>
        </nav>
        <div className="sidebar-footer">{t(lang, "profile")}</div>
      </aside>

      <div className="main">
        <header className="topbar">
          <div className="brand">
            <h1>Promfter Maker</h1>
            <div className="subtitle">{t(lang, "brandSubtitle")}</div>
          </div>
          <div className="icon-row">
            <button
              type="button"
              className="icon-btn"
              onClick={addCategory}
              aria-label={t(lang, "addCategory")}
              title={t(lang, "addCategory")}
            >
              +
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={deleteCategory}
              aria-label={t(lang, "deleteCategory")}
              title={t(lang, "deleteCategory")}
            >
              ⌫
            </button>
          </div>
        </header>

        <main className="content">
          {panel === "help" ? (
            <section className="help-box" aria-live="polite">
              {t(lang, "helpBody")}
            </section>
          ) : null}

          <div className="tabs" role="tablist" aria-label="categories">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={cat.id === selectedCategory?.id}
                className={`tab ${cat.id === selectedCategory?.id ? "active" : ""}`}
                onClick={() => setSelectedCategoryId(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <section>
            <label className="hand-label" htmlFor="prompt-input">
              {t(lang, "promptInput")}
              {selectedCategory ? ` · ${selectedCategory.name}` : ""}
            </label>
            <textarea
              id="prompt-input"
              className="textarea"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t(lang, "promptPlaceholder")}
              autoFocus
            />
            <button
              type="button"
              className="btn-primary"
              onClick={onConvert}
              disabled={busy}
            >
              {t(lang, "convert")}
            </button>
          </section>

          <section>
            <label className="hand-label" htmlFor="final-prompt">
              {t(lang, "finalPrompt")}
            </label>
            <div className="panel">
              <textarea
                id="final-prompt"
                className="textarea"
                value={outputText}
                onChange={(e) => setOutputText(e.target.value)}
                placeholder="—"
              />
              {translatedText ? (
                <>
                  <label className="hand-label" htmlFor="translated-prompt">
                    English
                  </label>
                  <textarea
                    id="translated-prompt"
                    className="textarea"
                    value={translatedText}
                    onChange={(e) => setTranslatedText(e.target.value)}
                  />
                </>
              ) : null}
            </div>
            <div className="actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={onCopy}
                disabled={busy || !(translatedText || outputText).trim()}
              >
                {t(lang, "copy")}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={onTranslate}
                disabled={busy || !outputText.trim()}
              >
                {t(lang, "translate")}
              </button>
            </div>
          </section>

          <div className="status-row" aria-live="polite">
            <span className={statusClass(status)}>
              {statusLabel || t(lang, "idleHint")}
            </span>
          </div>

          <section id="history-section">
            <label className="hand-label">{t(lang, "history")}</label>
            <div className="history-list">
              {history.length === 0 ? (
                <div className="help-box">{t(lang, "noHistory")}</div>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    className={`history-item ${
                      item.id === activeHistoryId ? "active" : ""
                    }`}
                  >
                    <div className="history-top">
                      <input
                        className="history-title"
                        value={item.title}
                        aria-label="history title"
                        onChange={(e) =>
                          updateHistoryTitle(item.id, e.target.value)
                        }
                        onFocus={() => setActiveHistoryId(item.id)}
                      />
                      <time className="mono" dateTime={item.createdAt}>
                        {item.createdAt.replace("T", " ").slice(0, 19)}
                      </time>
                    </div>
                    <button
                      type="button"
                      className="history-meta"
                      style={{
                        width: "100%",
                        border: "none",
                        background: "transparent",
                        padding: 0,
                        cursor: "pointer",
                      }}
                      onClick={() => restoreHistory(item)}
                    >
                      <span className="chip">{item.categoryNameSnapshot}</span>
                      <span className="preview">{item.outputText}</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        </main>
      </div>

      {settingsOpen ? (
        <div className="modal-backdrop" role="presentation">
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
          >
            <header>
              <h2 id="settings-title">{t(lang, "settingsTitle")}</h2>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setSettingsOpen(false)}
                aria-label={t(lang, "close")}
              >
                ×
              </button>
            </header>
            <div className="modal-body">
              <section>
                <h3 className="hand-label">{t(lang, "fontSection")}</h3>
                <div className="option-grid">
                  {FONT_OPTIONS.map((font) => (
                    <button
                      key={font.id}
                      type="button"
                      className={`option-btn ${
                        draftSettings.fontFamilyId === font.id ? "selected" : ""
                      }`}
                      style={{ fontFamily: font.family }}
                      onClick={() =>
                        setDraftSettings((s) => ({
                          ...s,
                          fontFamilyId: font.id,
                        }))
                      }
                    >
                      {font.label}
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="hand-label">{t(lang, "sizeSection")}</h3>
                <div className="size-row">
                  {(
                    [
                      ["sm", "sizeSm"],
                      ["md", "sizeMd"],
                      ["lg", "sizeLg"],
                    ] as const
                  ).map(([step, key]) => (
                    <button
                      key={step}
                      type="button"
                      className={`option-btn ${
                        draftSettings.fontSizeStep === step ? "selected" : ""
                      }`}
                      onClick={() =>
                        setDraftSettings((s) => ({
                          ...s,
                          fontSizeStep: step,
                        }))
                      }
                    >
                      {t(lang, key)}
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="hand-label">{t(lang, "langSection")}</h3>
                <div className="option-grid">
                  {(
                    [
                      ["ko", "KR"],
                      ["en", "EN"],
                      ["ja", "JA"],
                      ["zh", "ZH"],
                      ["vi", "VI"],
                    ] as const
                  ).map(([code, label]) => (
                    <button
                      key={code}
                      type="button"
                      className={`option-btn ${
                        draftSettings.language === code ? "selected" : ""
                      }`}
                      onClick={() =>
                        setDraftSettings((s) => ({ ...s, language: code }))
                      }
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="hand-label">{t(lang, "apiKeySection")}</h3>
                <input
                  className="field"
                  type="password"
                  autoComplete="off"
                  value={draftSettings.apiKey}
                  placeholder={t(lang, "apiKeyPlaceholder")}
                  onChange={(e) =>
                    setDraftSettings((s) => ({ ...s, apiKey: e.target.value }))
                  }
                />
              </section>
            </div>
            <footer>
              <button
                type="button"
                className="btn-primary"
                style={{ width: "auto", flex: 1, marginTop: 0 }}
                onClick={saveDraftSettings}
              >
                {t(lang, "saveSettings")}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={resetDraftSettings}
              >
                {t(lang, "resetSettings")}
              </button>
            </footer>
          </div>
        </div>
      ) : null}
    </div>
  );
}
