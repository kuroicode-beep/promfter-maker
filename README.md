# Promfter Maker

카테고리별 프롬프트 변환·영문 번역·히스토리 도구.  
LLM: **DeepSeek V4 Flash** (`deepseek-v4-flash`)  
UI: Stitch 시안 + SVIL 고대비 다크

## 빠른 실행

```powershell
cd web
npm install
npm run dev
```

브라우저: http://localhost:5173

API 키: OS `DEEPSEEK_API_KEY` 또는 `web/.env` 또는 앱 설정 모달.

## 검증

```powershell
cd web
npm run test:unit
npm run build
npm run test:api
```

## 문서

- `docs/outline-wiki/` — PRD·스펙·아키텍처·스토리보드·로드맵·작업지시서
- `design/stitch/` — Stitch 디자인 소스
