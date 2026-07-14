import { describe, expect, it } from "vitest";
import { defaultTitle, makeId } from "./storage";
import { FONT_SIZE_PX, t } from "./i18n";
import { SEED_CATEGORIES } from "./prompts/seedCategories";

describe("defaultTitle", () => {
  it("returns 제목 없음 for empty", () => {
    expect(defaultTitle("")).toBe("제목 없음");
    expect(defaultTitle("   ")).toBe("제목 없음");
  });

  it("truncates long input", () => {
    const long = "가".repeat(40);
    expect(defaultTitle(long).endsWith("…")).toBe(true);
    expect(defaultTitle(long).length).toBe(25);
  });
});

describe("makeId", () => {
  it("prefixes ids", () => {
    expect(makeId("hist").startsWith("hist-")).toBe(true);
  });
});

describe("i18n and seeds", () => {
  it("has five seed categories", () => {
    expect(SEED_CATEGORIES).toHaveLength(5);
  });

  it("returns korean convert label", () => {
    expect(t("ko", "convert")).toBe("변환");
  });

  it("maps font sizes", () => {
    expect(FONT_SIZE_PX.sm).toBe(16);
    expect(FONT_SIZE_PX.md).toBe(18);
    expect(FONT_SIZE_PX.lg).toBe(20);
  });
});
