# Promfter Maker 프로젝트 위키

Promfter Maker는 자연어 입력을 카테고리별 최종 프롬프트로 변환하고, 복사·영문 번역·히스토리로 재사용할 수 있게 하는 프롬프트 제작 도구다. 변환·번역은 DeepSeek V4 Flash(`deepseek-v4-flash`)를 사용한다.

## 01. 빠른 링크

- [Promfter Maker PRD](/doc/promfter-maker-prd-WpBFdTBm9a)
- [Promfter Maker 구현 스펙](/doc/promfter-maker-mBLfJB6rIy)
- [Promfter Maker 아키텍처](/doc/promfter-maker-3AN5sjfXSN)
- [Promfter Maker 스토리보드](/doc/promfter-maker-hog6rhaGOh)
- [Promfter Maker 로드맵](/doc/promfter-maker-hTcIIHSZRK)
- [Promfter Maker 작업지시서](/doc/promfter-maker-Afm4NnIZqn)
- [Promfter Maker 개발진행 히스토리](/doc/promfter-maker-s9QROtmApv)
- [Promfter Maker 완료보고서 인덱스](/doc/promfter-maker-mtZMckxVTO)

로컬: `docs/outline-wiki/` · 디자인: `design/README.md`

## 02. 현재 기준

- 현재 버전: v0.3 (문서 세트 + Stitch 시안)
- 운영 URL: 로컬 개발 (미배포)
- 저장소: `C:\Projects\Promfter Maker`
- LLM: `deepseek-v4-flash`
- 디자인 시안: `design/stitch/stitch_promfter_maker_ui_mockup/`
- 디자인/접근성: Outline 「SVIL Main」 + 교보손글씨2019 로컬
- 보고서 기록 원칙: 기능·UI 변경 시 문서와 토큰을 함께 갱신

## 03. 문서 구조

| 문서 | 역할 |
|---|---|
| PRD | 제품 요구·성공 기준 |
| 구현 스펙 | 데이터·API·화면·검증 |
| 아키텍처 | 모듈·저장소·LLM 흐름 |
| 스토리보드 | 화면 컷·사용자 흐름 |
| 로드맵 | 마일스톤 M0–M6 |
| 작업지시서 | 구현 순서·규칙·금지 |
| 개발진행 히스토리 | 일자별 기록 |
| 완료보고서 인덱스 | 검증 보고 목록 |

## 04. v0.3 핵심 요구 (요약)

1. 프롬프트 입력 (상단)  
2. DeepSeek V4 Flash 변환  
3. 최종 프롬프트  
4. 복사 / 영어 번역 (동일 모델)  
5. 히스토리 + 제목 편집  
6. Stitch 레이아웃 + SVIL 토큰·폰트  
7. 카테고리 시드 5종 + 추가·삭제  
