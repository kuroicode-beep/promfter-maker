# Promfter Maker 작업지시서

작성일: 2026-07-14  
기준 버전: v0.3  
대상 실행자: Cursor / Codex 등 구현 에이전트 · 개발자

---

## 01. 목적

PRD·스펙·아키텍처·스토리보드·로드맵·Stitch 시안을 기준으로 **Promfter Maker** 앱을 구현한다. 변환·번역은 `deepseek-v4-flash`만 사용한다.

---

## 02. 필수 참조 (읽은 뒤 코딩)

| 우선 | 문서/경로 |
|---|---|
| 1 | `docs/outline-wiki/promfter-maker-prd-current.md` |
| 2 | `docs/outline-wiki/promfter-maker-spec-current.md` |
| 3 | `docs/outline-wiki/promfter-maker-architecture.md` |
| 4 | `docs/outline-wiki/promfter-maker-storyboard.md` |
| 5 | `design/README.md` + `design/stitch/stitch_promfter_maker_ui_mockup/` |
| 6 | SVIL 프론트엔드 디자인 가이드 (Outline SVIL Main / 스킬 `svil-frontend-design`) |

---

## 03. 작업 순서 (강제)

1. **Vite + React + TS** 프로젝트 초기화 (`C:\Projects\Promfter Maker`)  
2. **SVIL 토큰 CSS** + 로컬 교보손글씨2019 `@font-face` (CDN 금지)  
3. **메인 셸** — Stitch `promfter_maker_main_screen` 레이아웃 이식  
4. **설정 모달** — Stitch `promfter_maker_settings_panel` 이식  
5. **CategoryStore** — 시드 5종 + 추가/삭제  
6. **DeepSeekClient** — 변환  
7. **History** — 저장·복원·제목 편집  
8. **복사 · 영문 번역**  
9. **i18n · 글꼴 실재분 · S/M/L**  
10. **스펙 §09 검증 체크리스트** 수행  

로드맵 M1→M5 순을 기본으로 하되, M3/M4는 변환 완료 후 병렬 가능.

---

## 04. 구현 규칙

- 색상 하드코딩 금지 → CSS 변수  
- 주 버튼 `#b3ddff` + `#000` · 일반 버튼 `border-strong` `#6b6b82`  
- 컨트롤 높이 ≥50px · focus `#ffd479` 3px  
- bold로 위계 만들지 말 것  
- 상태·오류는 **텍스트 라벨** 필수  
- API 키 로그/커밋/히스토리 JSON 금지  
- Stitch HTML의 Tailwind/Google Fonts CDN을 제품에 복사하지 말 것  
- 카테고리·사용자 제목은 번역하지 않음  

---

## 05. DeepSeek 호출 체크

```text
model: deepseek-v4-flash
base: https://api.deepseek.com
thinking: disabled (기본)
용도: convertPrompt / translateToEnglish
```

키: `DEEPSEEK_API_KEY` 또는 설정 저장분.

---

## 06. 완료 보고 형식

작업 종료 시 짧게 기록:

1. 완료한 마일스톤 (M#)  
2. 변경 파일 목록  
3. 수동 검증 V1–V9 결과  
4. 남은 이슈  
5. Outline/로컬 문서 갱신 여부  

---

## 07. 금지

- DeepSeek V4 Pro를 기본 모델로 바꾸기 (설정 옵션 추가는 별도 승인)  
- 클라우드 계정·동기화 범위 확대 (PRD 비범위)  
- ComfyUI 자동 전송을 1차 범위에 넣기  
- 시안 무시하고 대시보드형으로 재설계하기 (사이드+메인 컬럼은 Stitch 유지)

---

## 08. 즉시 착수 커맨드 (참고)

```powershell
cd "C:\Projects\Promfter Maker"
# 예: npm create vite@latest . -- --template react-ts
# 이후 design/stitch HTML을 컴포넌트로 이식
```

기존 `docs/` · `design/` 은 유지한 채 앱 코드를 추가한다.
