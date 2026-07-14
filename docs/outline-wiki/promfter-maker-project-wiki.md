# Promfter Maker 프로젝트 위키

Promfter Maker는 자연어 입력을 카테고리별 최종 프롬프트로 변환하고, 복사·영문 번역·히스토리로 재사용할 수 있게 하는 프롬프트 제작 도구다.

## 01. 빠른 링크

- [Promfter Maker PRD](/doc/promfter-maker-prd-WpBFdTBm9a) — 현재 기준 제품 요구사항
- Promfter Maker 구현 스펙 — (예정)
- Promfter Maker 아키텍처 — (예정)
- Promfter Maker 개발진행 히스토리 — (예정)
- Promfter Maker 완료보고서 인덱스 — (예정)
- Stitch 디자인 프롬프트 — 로컬 `docs/stitch/promfter-maker-stitch-design-prompt.md`

로컬 원본: `docs/outline-wiki/promfter-maker-prd-current.md`

## 02. 현재 기준

- 현재 버전: v0.2 (PRD — DeepSeek V4 Flash 변환/번역)
- 운영 URL: 로컬 개발 (미배포)
- 저장소 문서 위치: `docs/outline-wiki/`
- LLM: `deepseek-v4-flash` (변환·영문 번역)
- 디자인 기준: Outline 「SVIL Main」 고대비 다크 + 교보손글씨2019
- Stitch 프롬프트: `docs/stitch/promfter-maker-stitch-design-prompt.md`
- 보고서 기록 원칙: 기능·UI 변경 시 문서와 토큰을 함께 갱신

## 03. 문서 구조

### PRD
제품 목표, 화면 기능(입력·변환·최종·복사/번역·히스토리·카테고리), SVIL 디자인 전면 적용, 성공 기준.

### 구현 스펙
라우팅, 데이터 모델, 변환/번역 연동, 화면 스펙, 접근성 검증 — PRD 확정 후 작성.

### 아키텍처
프론트·저장소·변환/번역 파이프라인 구성도 — 스펙과 함께 작성.

### 개발진행 히스토리
마일스톤·릴리스 기록.

### 완료보고서 인덱스
검증·완료 보고서 목록.

## 04. v0.2 핵심 요구 (요약)

1. 프롬프트 입력 창 상단
2. 프롬프트 변환 — **DeepSeek V4 Flash** (`deepseek-v4-flash`)
3. 최종 프롬프트 표시
4. 복사하기 / 영어로 번역 — **동일 모델 DeepSeek V4 Flash**
5. 프롬프트 히스토리
6. 히스토리 항목별 제목 입력
7. SVIL 디자인 가이드 전면 적용
8. 일반·이미지·영상·워크플로우·검색 등 카테고리 추가·삭제
