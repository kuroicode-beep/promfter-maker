# Promfter Maker 개발진행 히스토리

작성일: 2026-07-14  
기준 버전: v0.3

---

## 01. 요약

문서·Stitch 디자인 고정 단계(M0). 앱 코드 구현은 아직 시작 전.

---

## 02. 주요 마일스톤

### 2026-07-14 — M1–M5 구현·검수

- `web/` Vite React TS 앱 구현 (Stitch 레이아웃 + SVIL 토큰·로컬 폰트)
- DeepSeek V4 Flash 변환·번역, 히스토리·카테고리·설정·i18n
- 검증: unit / build / lint / API 스모크 / preview UI
- 관련: `docs/outline-wiki/promfter-maker-verification-2026-07-14.md`

### 2026-07-14 — M0 문서·디자인

- PRD v0.1→v0.3: 기능 요구, DeepSeek V4 Flash, Stitch 채택  
- 프로젝트 경로: `C:\ComfyUI\Promfter Maker` → `C:\Projects\Promfter Maker`  
- Stitch zip 반영: `design/stitch/stitch_promfter_maker_ui_mockup/`  
- 문서 세트: 스펙 · 아키텍처 · 스토리보드 · 로드맵 · 작업지시서  
- Outline 프로젝트 위키 동기화  

---

## 03. 현재 운영 상태

- 로컬 실행: `cd web && npm run dev`  
- GitHub: https://github.com/kuroicode-beep/promfter-maker  

## 04. 남은 확인 포인트

- 한글 출력 강제 옵션  
- 모바일 사이드 내비  
- 데스크톱 패키징(M6)  
