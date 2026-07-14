# Promfter Maker PRD

작성일: 2026-07-14  
기준 버전: v0.3  
대상: ComfyUI / 생성형 AI 프롬프트 변환·관리 데스크톱·웹 앱  
디자인 기준: Outline 「SVIL Main」 + **Stitch 시안** (`design/stitch/stitch_promfter_maker_ui_mockup/`)  
LLM: **DeepSeek V4 Flash** (`deepseek-v4-flash`) — 변환·번역 공통

---

## 01. 제품 개요

**Promfter Maker**는 사용자가 자연어로 입력한 아이디어를 **카테고리별 최종 프롬프트**로 변환하고, 결과물을 복사·영문 번역·히스토리로 재사용할 수 있게 하는 프롬프트 제작 도구다.

변환과 영어 번역은 모두 **DeepSeek V4 Flash**(`deepseek-v4-flash`, OpenAI 호환 API)를 사용한다. 카테고리별 시스템 프롬프트로 출력 형식을 맞춘다.

ComfyUI 워크플로우, 이미지·영상 생성, 일반 LLM, 검색 쿼리 등 용도별로 프롬프트 형식이 다르다는 문제를, **한 화면에서 입력 → 변환 → 복사/번역 → 저장** 흐름으로 해결한다.

---

## 02. 사용자

| 구분 | 설명 |
|---|---|
| 주 사용자 | ComfyUI·이미지/영상 생성형 AI를 쓰는 크리에이터 |
| 부 사용자 | LLM 프롬프트·검색 쿼리를 자주 다듬는 일반 사용자 |
| 환경 | Windows 데스크톱 우선 (웹 UI 동일 디자인 토큰 적용) |

---

## 03. 목표

1. 입력부터 최종 프롬프트까지 **한 화면에서 완료**한다.
2. **DeepSeek V4 Flash**로 카테고리별 변환·영문 번역을 수행한다.
3. 결과물을 **즉시 복사**하거나 **영어로 번역**해 외부 도구에 붙일 수 있다.
4. 변환 결과를 **히스토리로 보존**하고, 항목마다 **제목을 붙여** 찾을 수 있다.
5. **카테고리(일반/이미지/영상/워크플로우/검색 등)** 를 추가·삭제하며 용도별로 관리한다.
6. **SVIL 디자인 가이드 전 항목**을 UI에 적용해 고대비·접근성을 보장한다.

---

## 04. 주요 기능 범위

### 4.1 프롬프트 입력 창 (상단 고정)

- 화면 **최상단**에 프롬프트 입력 영역 배치.
- 멀티라인 텍스트 입력, 최소 높이 터치 타겟(≥50px) 준수.
- placeholder·라벨로 입력 목적 명시 (색만으로 상태 구분 금지).
- 현재 선택된 **카테고리**가 입력 영역에 반영되어 보이도록 한다.

### 4.2 프롬프트 변환 (DeepSeek V4 Flash)

- 입력 내용 → **최종 프롬프트**로 변환하는 주 액션.
- **모델**: `deepseek-v4-flash`
- **엔드포인트**: DeepSeek OpenAI 호환 Chat Completions (`https://api.deepseek.com`)
- **모드**: 변환은 기본 **non-thinking** (빠른 응답·비용 우선). 품질이 부족한 카테고리만 스펙에서 thinking 옵션 검토.
- **카테고리별 시스템 프롬프트**로 출력 톤·형식 제어 (일반 / 이미지 / 영상 / 워크플로우 / 검색 / 사용자 정의).
- API 키는 환경 변수 또는 로컬 설정에 보관. UI·문서·로그에 키를 노출하지 않는다.
- SVIL 주 버튼: `accent-strong` 배경 + `#000` 텍스트, hover `accent-max`.
- 상태 라벨 필수: `변환 중` / `완료` / `실패` (+ 오류 요약 텍스트).
- 빈 입력 시 호출하지 않음 + 안내 메시지.
- 최종 프롬프트 영역에서 **수동 편집** 허용 (API 결과 후편집).

### 4.3 최종 프롬프트

- 변환 결과를 읽기·선택·편집 가능한 영역에 표시.
- 원문 입력과 구분되는 패널(surface)로 배치.
- 내용이 길 경우 스크롤, 숫자·타임스탬프 등은 Consolas 모노체.

### 4.4 복사하기 / 영어로 번역 (DeepSeek V4 Flash)

| 액션 | 요구사항 |
|---|---|
| 복사하기 | 최종 프롬프트(현재 표시본)를 클립보드에 복사. 성공 시 `복사됨` 텍스트 피드백 |
| 영어로 번역 | **동일 모델 `deepseek-v4-flash`**로 최종 프롬프트를 영문 번역. 진행·완료·실패 라벨 필수 |

- 번역 시스템 프롬프트: 의미 보존, 프롬프트/검색 쿼리 용도에 맞는 자연스러운 영어, 불필요한 설명 문구 없이 **번역문만** 출력.
- 번역 결과는 별도 영역 또는 최종 영역 전환으로 표시. 원문(변환 결과)은 유지.
- 번역 실패 시 원문 유지 + `번역 실패` 라벨.
- 두 버튼 최소 높이 50px, 일반 버튼 대비 규칙(`border-strong`).

### 4.5 프롬프트 히스토리

- 변환 성공 시 히스토리에 자동 저장 (입력, 최종 프롬프트, 카테고리, 시각, 선택적 번역문).
- 목록에서 항목 선택 시 입력·최종 프롬프트를 다시 불러온다.
- 삭제 가능. 시각·ID는 Consolas.
- 로컬 영속 저장(기본). 동기화/계정은 비범위.

### 4.6 히스토리 항목 제목 입력

- 히스토리 **항목별 제목**을 사용자가 입력·수정할 수 있다.
- 제목 미입력 시 기본값: 입력 앞부분 요약 또는 `제목 없음` 라벨.
- 인라인 편집, 포커스 링 `#ffd479` 준수.

### 4.7 UI 디자인 기준 (Stitch + SVIL)

- **레이아웃·컴포넌트 배치**: Stitch 시안을 따른다.  
  - 메인: `promfter_maker_main_screen/` (사이드 내비 + 입력/변환/최종/복사·번역/히스토리)  
  - 설정: `promfter_maker_settings_panel/` (글꼴·크기·언어 모달)  
  - 토큰 문서: `svil_high_contrast_dark/DESIGN.md`
- **접근성·폰트·색 토큰**: Outline SVIL 가이드를 최종 기준으로 적용한다 (로컬 교보손글씨2019, CDN 금지, Consolas 숫자).
- Stitch HTML의 CDN(Tailwind/Google Fonts)은 시안 전용이며, 제품 빌드에는 넣지 않는다.

Outline 「SVIL Main」 및 로컬 사본의 **모든 규칙**을 적용한다.

| 영역 | 적용 내용 |
|---|---|
| 테마 | 다크 기본 (`bg` `#0d0d12` 등 토큰) |
| 색상 | 하드코딩 금지, CSS/상수 토큰만 |
| 타이포 | 교보손글씨2019 → Pretendard → Malgun Gothic, 본문 18px, line-height 1.8 |
| 강조 | bold 합성 금지 → 크기·색(accent) |
| 컴포넌트 | 버튼·입력 min 50px, radius 12px, focus 3px `#ffd479` |
| 버튼 대비 | 주 버튼 accent-strong+#000 / 일반 버튼 border-strong |
| 접근성 | 본문 ≥4.5:1, UI ≥3:1, 색+텍스트 라벨, reduced-motion |
| 화면 설정 | 글꼴 8종·크기 3단계·다국어 5종(한/영/일/중/베트남) |
| 폰트 | 로컬 번들 우선, CDN 금지 |
| 숫자 | Consolas 모노체 |

### 4.8 카테고리 추가·삭제

- 기본 시드: **일반** / **이미지** / **영상** / **워크플로우** / **검색**
- 사용자 **추가·삭제** 가능. 최소 1개 유지.
- 카테고리 전환 시 DeepSeek 변환용 시스템 프롬프트가 바뀐다.
- 삭제 시 확인 다이얼로그. 히스토리 카테고리 라벨은 보존 또는 `삭제된 카테고리`.
- 카테고리 이름은 사용자 데이터 → UI 언어 전환 시 번역하지 않음.

---

## 05. LLM 연동 요약

| 항목 | 값 |
|---|---|
| 모델 | DeepSeek V4 Flash |
| Model ID | `deepseek-v4-flash` |
| 용도 | ① 카테고리별 프롬프트 변환 ② 영어 번역 |
| API | OpenAI 호환 Chat Completions |
| Base URL | `https://api.deepseek.com` |
| Thinking | 기본 disabled (non-thinking) |
| 인증 | `DEEPSEEK_API_KEY` (또는 앱 로컬 설정) |
| 실패 처리 | 재시도 안내 + 텍스트 오류 라벨, 기존 결과 유지 |

카테고리별 시스템 프롬프트·온도·max_tokens는 구현 스펙에서 정의.

---

## 06. 화면 구성 (정보 구조)

Stitch 메인 시안 기준:

1. **좌측 사이드**: History / Settings / Help (+ 프로필 영역)
2. **헤더**: 브랜드 Promfter Maker · 카테고리 추가/삭제
3. **카테고리 탭**: General / Image / Video / Workflow / Search
4. **프롬프트 입력** → **변환** (DeepSeek V4 Flash)
5. **최종 프롬프트** → **복사하기 | 영어로 번역** (DeepSeek V4 Flash)
6. **History** (제목 편집·카테고리 칩·타임스탬프)

설정은 Stitch 설정 모달: 글꼴 / 크기(S·M·L) / 언어(KR·EN·JA·ZH·VI) / 저장·초기화. API 키는 설정에 포함.

---

## 07. 비범위 (v0.3)

- 클라우드 동기화·계정·멀티디바이스
- ComfyUI 노드 직접 삽입 / API 자동 전송
- DeepSeek V4 Pro 기본 사용 (필요 시 설정 옵션은 후속)
- 팀 공유·권한
- 모바일 네이티브 앱
- 자동 이미지 생성 실행

---

## 08. 성공 기준

| ID | 기준 |
|---|---|
| S1 | 입력 → DeepSeek 변환 → 최종 프롬프트 표시가 한 화면에서 완료된다 |
| S2 | 복사하기 시 클립보드에 최종 프롬프트가 들어간다 |
| S3 | DeepSeek로 영어 번역 후 영문 결과를 확인·복사할 수 있다 |
| S4 | 변환 결과가 히스토리에 남고, 제목을 수정할 수 있다 |
| S5 | 기본 5종 카테고리 + 사용자 추가/삭제가 동작한다 |
| S6 | SVIL 토큰·폰트·터치 50px·포커스 링·고대비가 UI 전반에 적용된다 |
| S7 | 본문 대비 4.5:1, UI 3:1, 색만으로 상태 구분하지 않는다 |
| S8 | API 키·오류 시에도 원문/기존 결과가 유실되지 않는다 |

---

## 09. 데이터 개념 (요약)

- **Category**: id, name, order, systemPrompt?, createdAt  
- **PromptHistoryItem**: id, title, categoryId, inputText, outputText, translatedText?, modelId, createdAt, updatedAt  
- **Settings**: fontFamily, fontSizeStep, language, apiKeyRef  

상세 스키마는 구현 스펙에서 정의.

---

## 10. 리스크

| 리스크 | 완화 |
|---|---|
| 카테고리별 변환 품질 편차 | 카테고리별 시스템 프롬프트, 수동 편집 |
| API 장애·쿼터 | 타임아웃·재시도·실패 라벨, 오프라인 시 안내 |
| 키 유출 | env/로컬 시크릿만, UI 마스킹 |
| 히스토리 과다 | 가상화·상한(후속) |
| 디자인 가이드 누락 | 토큰 단일 소스 + Stitch/구현 체크리스트 |

---

## 11. 마일스톤 (초안)

| 단계 | 내용 |
|---|---|
| M0 | PRD·위키·Stitch 디자인·토큰 확정 |
| M1 | 셸 UI + DeepSeek 변환 연동 |
| M2 | 카테고리 CRUD + 카테고리별 시스템 프롬프트 |
| M3 | 영문 번역(DeepSeek) + 복사 + 히스토리·제목 |
| M4 | SVIL 설정(글꼴·크기·언어) + 접근성 검증 |

---

## 12. 참고

- Outline: SVIL Main 프론트엔드 디자인 가이드  
- DeepSeek API: model `deepseek-v4-flash`, base `https://api.deepseek.com`  
- **Stitch 디자인 소스**: `design/stitch/stitch_promfter_maker_ui_mockup/` (`design/README.md`)  
- Stitch 생성 프롬프트: `docs/stitch/promfter-maker-stitch-design-prompt.md`  
- 스킬: `svil-frontend-design`
