# Promfter Maker — Google Stitch 디자인 프롬프트

Stitch에 그대로 붙여 넣어 메인 화면(및 설정) 시안을 생성할 때 사용한다.  
기준: SVIL 고대비 다크 + 교보손글씨2019 / PRD v0.2

---

## Stitch용 프롬프트 (영문 — Stitch 입력 권장)

```text
Design a single-screen desktop web app UI mockup named "Promfter Maker" — a prompt conversion tool for ComfyUI and generative AI creators.

PRODUCT PURPOSE
- User types a rough idea at the top, taps Convert (DeepSeek V4 Flash), sees a polished final prompt, then can Copy or Translate to English (also DeepSeek V4 Flash), and browse editable history below.
- Categories: General, Image, Video, Workflow, Search — with add/delete category controls.

LAYOUT (ONE COMPOSITION, TOP-TO-BOTTOM — NOT A DASHBOARD)
1) App header: brand name "Promfter Maker" as the strongest text signal (hero-level brand), subtle subtitle “prompt converter”, no stats, no promo chips.
2) Category row: underline tabs (3px selected underline) for General / Image / Video / Workflow / Search, plus “+ Add” and delete control. Selected tab uses accent color, not bold weight.
3) Prompt input (TOP): large multiline textarea labeled “프롬프트 입력” / “Prompt input”, min height ~120px, placeholder “아이디어를 입력하세요”.
4) Primary action: full-width or prominent “변환” (Convert) button directly under input.
5) Final prompt panel: labeled “최종 프롬프트”, large readable textarea/panel with sample Korean prompt text.
6) Secondary actions row: “복사하기” (Copy) and “영어로 번역” (Translate to English) side by side — secondary style, not primary.
7) History section: list of 3–4 items. Each row has an editable title field, category label text, Consolas-style timestamp, short preview. One row shows inline title editing.

VISUAL SYSTEM — SVIL HIGH-CONTRAST DARK (MANDATORY)
- Background bg: #0d0d12
- Surfaces/cards/panels: #16161d
- Inputs/button surfaces: #1f1f2a
- Borders: #3a3a48 (panels); button borders must use #6b6b82 (border-strong), never weak #3a3a48 on buttons
- Body text: #f5f5f7
- Secondary text: #c9c9d4
- Accent / selection / links: #7ec8ff
- Primary button fill: #b3ddff with #000000 text; hover #d6ecff
- Positive: #7ee2a8 · Warning/focus: #ffd479 · Negative: #ff9b9b
- Focus ring: 3px #ffd479 on focused inputs/buttons
- Corner radius: inputs/buttons 12px; panels 16px
- Min control height: 50px (large touch/click targets)
- Typography feel: handwritten Korean display font vibe (KyoboHandwriting-like) for UI labels; avoid Inter/Roboto/Arial; no faux-bold — hierarchy by SIZE and accent COLOR only
- Timestamps/IDs: monospace (Consolas look)
- Status must include TEXT labels (e.g. “변환 중”, “복사됨”) — never color alone
- Dark theme only. No purple gradients, no glow blobs, no glassmorphism, no floating badge stickers on the hero.

STYLE NOTES
- One calm vertical workflow screen; generous padding; high contrast.
- Cards only where they contain interaction (input, final prompt, history list).
- Desktop width ~1440px frame, also imply usable on narrower widths.
- Korean UI labels preferred; keep brand “Promfter Maker” in Latin letters.
- Show a yellow focus ring on the input to demonstrate accessibility.
- Do NOT invent extra widgets (charts, stats, AI avatars, side nav with many icons).

OUTPUT
- High-fidelity dark UI mockup of the main screen as described.
- Optional second frame: Settings panel (font family, text size S/M/L, language KR/EN/JA/ZH/VI) using the same tokens.
```

---

## Stitch용 프롬프트 (한국어 보조 — 의도 정리용)

```text
Promfter Maker 메인 화면 시안.
위→아래 한 흐름: 브랜드명 → 카테고리 탭(일반/이미지/영상/워크플로우/검색 + 추가/삭제) → 상단 프롬프트 입력 → 변환(주 버튼) → 최종 프롬프트 → 복사하기 / 영어로 번역 → 제목 편집 가능한 히스토리.

SVIL 고대비 다크 필수:
bg #0d0d12, surface #16161d, surface-2 #1f1f2a,
text #f5f5f7, text-sub #c9c9d4, accent #7ec8ff,
주 버튼 #b3ddff 배경 + #000 글자, 버튼 테두리 #6b6b82,
포커스 링 #ffd479 3px, 컨트롤 높이 최소 50px, radius 12/16.
교보손글씨 느낌, bold 금지(크기·색으로 위계), 숫자는 모노스페이스.
보라 그라데이션·글로우·통계 대시보드·플로팅 배지 금지.
상태(변환 중/복사됨 등)는 색+텍스트 라벨 병행.
```

---

## 사용 방법

1. Google Stitch에 **영문 프롬프트** 블록을 붙여넣는다.
2. 비율: Desktop / 1440 또는 유사.
3. 결과에서 토큰 색·50px 타겟·포커스 링이 빠졌으면 아래 **리파인 프롬프트**로 보정한다.

### 리파인 (색·접근성 보정)

```text
Refine the Promfter Maker mockup to strictly match these hex tokens: bg #0d0d12, surface #16161d, surface-2 #1f1f2a, text #f5f5f7, accent #7ec8ff, primary button #b3ddff on #000 text, button border #6b6b82, focus ring #ffd479. Increase all clickable heights to at least 50px. Keep category underline tabs (not bold). Remove any purple, neon glow, or dashboard widgets. Keep Korean labels and the vertical Convert → Final → Copy/Translate → History flow.
```

---

## 체크리스트 (시안 검수)

- [ ] 브랜드명 Promfter Maker가 첫 화면에서 가장 강하게 읽힘
- [ ] 입력창이 상단(카테고리 바로 아래)
- [ ] 변환 = 밝은 주 버튼 / 복사·번역 = 일반 버튼
- [ ] 히스토리에 제목 입력 필드 보임
- [ ] 카테고리 추가·삭제 UI 존재
- [ ] 다크 + 지정 hex / 포커스 링 / 50px 타겟
- [ ] 통계·사이드바 과다·보라 테마 없음
