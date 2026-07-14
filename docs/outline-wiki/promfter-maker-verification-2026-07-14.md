# Promfter Maker 검수 보고서

작성일: 2026-07-14  
버전: web 0.3.0

## 01. 완료 마일스톤

M0 문서 · M1 UI 셸 · M2 변환 · M3 히스토리·카테고리 · M4 번역·복사 · M5 설정·i18n·a11y 토큰

## 02. 자동 테스트

| 항목 | 결과 |
|---|---|
| `npm run test:unit` | PASS (6) |
| `npm run build` | PASS |
| `npm run lint` | PASS |
| `npm run test:api` | PASS (DeepSeek V4 Flash convert+translate) |

## 03. UI 검수 (preview http://127.0.0.1:4173)

| ID | 항목 | 결과 |
|---|---|---|
| V1 | 시드 5 카테고리 | PASS |
| V2 | 변환 → 최종·히스토리 | PASS |
| V3 | 제목 표시/편집 가능 | PASS |
| V4 | 복사 버튼 활성 | PASS (버튼 활성 확인) |
| V5 | 영어 번역 영역 | PASS |
| V6 | 카테고리 탭·추가/삭제 UI | PASS |
| V7 | 설정 글꼴8·S/M/L·5언어·API키 | PASS |
| V8 | 다크 토큰·50px·포커스 | PASS (육안) |
| V9 | 키 주입(빌드 env)로 변환 성공 | PASS |

## 04. 실행 방법

```powershell
cd web
npm install
npm run dev
```

## 05. 남은 이슈

- 이미지 카테고리 변환 결과가 종종 바로 영문으로 나옴(모델 성향). 한글 강제 옵션은 후속.
- 모바일에서 사이드바 숨김(의도). 햄버거 메뉴는 후속.
- Outline 히스토리/완료보고서 페이지는 로컬 문서만 우선 갱신 가능.
