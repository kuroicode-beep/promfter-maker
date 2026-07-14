# Promfter Maker (web)

React + Vite 앱. 문서·시안은 저장소 루트 `docs/`, `design/`.

## 실행

```powershell
cd web
npm install
npm run dev
```

DeepSeek 키: OS 환경변수 `DEEPSEEK_API_KEY`, 또는 `web/.env`의 `DEEPSEEK_API_KEY` / `VITE_DEEPSEEK_API_KEY`, 또는 앱 설정 모달.

## 스크립트

- `npm run dev` — 개발 서버
- `npm run build` — 타입체크 + 빌드
- `npm run test:unit` — 단위 테스트
- `npm run test:api` — DeepSeek 변환·번역 스모크 (키 필요)
