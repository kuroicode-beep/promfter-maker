# Promfter Maker 구현 스펙

작성일: 2026-07-14  
기준 버전: v0.3  
근거: PRD v0.3 · Stitch 시안 · SVIL 디자인 가이드

---

## 01. 버전 관리

| 항목 | 값 |
|---|---|
| 앱 버전 | 0.3.0-dev |
| 문서 버전 | v0.3 |
| 저장소 | `C:\Projects\Promfter Maker` |
| 브랜치 | `master` (초기) |

변경 시 PRD·스펙·아키텍처를 함께 갱신한다.

---

## 02. 기술 스택 · 진입점

| 계층 | 선택 | 비고 |
|---|---|---|
| UI | React + Vite (TypeScript) | Stitch HTML을 컴포넌트로 이식 |
| 스타일 | CSS 변수 토큰 (`App.css`) | Tailwind CDN 금지 · 로컬 빌드 |
| 데스크톱 셸 (선택) | Electron 또는 Tauri | Windows 우선 · v1은 웹 단독 가능 |
| LLM | DeepSeek OpenAI 호환 SDK | `deepseek-v4-flash` |
| 저장 | `localStorage` + 선택적 IndexedDB | 계정 없음 |

**진입점**

- 웹: `index.html` → `src/main.tsx` → `App`
- 라우트(최소): `/` 메인 작업 화면, 설정은 모달(오버레이)

---

## 03. 세션과 인증

- 사용자 계정·로그인 없음 (PRD 비범위).
- API 키: `DEEPSEEK_API_KEY` 환경 변수 또는 설정 모달의 로컬 시크릿 저장(마스킹 표시).
- 키는 로그·히스토리·클립보드 자동 복사에 포함하지 않는다.

---

## 04. 데이터 모델

### Category

```ts
type Category = {
  id: string;           // uuid
  name: string;         // 사용자 데이터, UI 언어 전환 시 번역 안 함
  order: number;
  systemPrompt: string; // DeepSeek 변환용 시스템 프롬프트
  isSeed: boolean;      // 시드 여부(삭제 가능하나 최소 1개 유지)
  createdAt: string;    // ISO
};
```

시드(초기): 일반, 이미지, 영상, 워크플로우, 검색 — 각 `systemPrompt`는 부록 A.

### PromptHistoryItem

```ts
type PromptHistoryItem = {
  id: string;
  title: string;              // 기본: 입력 앞 24자 또는 "제목 없음"
  categoryId: string;
  categoryNameSnapshot: string; // 삭제된 카테고리 대비
  inputText: string;
  outputText: string;
  translatedText?: string;
  modelId: string;            // "deepseek-v4-flash"
  createdAt: string;
  updatedAt: string;
};
```

### Settings

```ts
type FontSizeStep = "sm" | "md" | "lg"; // 16 / 18 / 20 px
type AppLanguage = "ko" | "en" | "ja" | "zh" | "vi";

type Settings = {
  fontFamilyId: string;       // 로컬 번들 실재 ID만
  fontSizeStep: FontSizeStep;
  language: AppLanguage;
  apiKeyStored: boolean;      // 키 본문은 secure storage / masked
};
```

### 영속 키

| 키 | 내용 |
|---|---|
| `pm.categories` | Category[] |
| `pm.history` | PromptHistoryItem[] |
| `pm.settings` | Settings (키 제외 가능) |
| `pm.apiKey` | 로컬만 · 가능하면 OS 시크릿 |

---

## 05. 서비스 · API

### DeepSeekClient

- Base URL: `https://api.deepseek.com`
- Model: `deepseek-v4-flash`
- `thinking: { type: "disabled" }` (기본)
- 타임아웃: 60s · 실패 시 사용자 라벨 `실패` + 메시지

### convertPrompt(input, category)

1. system = category.systemPrompt  
2. user = 입력 원문  
3. assistant content → `outputText`  
4. 성공 시 히스토리 append (title 자동)

### translateToEnglish(text)

1. system = 번역 전용 (부록 B)  
2. user = 최종 프롬프트  
3. 결과만 반환 · 설명 문장 금지

### clipboard.copy(text)

- `navigator.clipboard.writeText` · 성공 라벨 `복사됨`

---

## 06. 상태 · 훅 (제안)

| 훅/스토어 | 역할 |
|---|---|
| `useCategories` | CRUD · 최소 1개 가드 |
| `usePromptWorkspace` | 입력·출력·선택 카테고리·변환/번역 상태 |
| `useHistory` | 목록·선택 복원·제목 수정·삭제 |
| `useSettings` | 글꼴·크기·언어·API 키 |
| `useI18n` | 사전 키 · `<html lang>` 동기화 |

상태 라벨: `idle` | `converting` | `translating` | `done` | `error` — **텍스트 병행**.

---

## 07. 주요 화면 스펙

### 7.1 메인 (Stitch `promfter_maker_main_screen`)

| 영역 | 동작 |
|---|---|
| 사이드 History | 메인 히스토리 섹션으로 스크롤/포커스 |
| 사이드 Settings | 설정 모달 오픈 |
| 사이드 Help | 간단 도움말(후속) 또는 플레이스홀더 |
| 탭 | 카테고리 선택 · underline 3px accent |
| + / 삭제 | 카테고리 추가·삭제(확인) |
| 입력 | autofocus · min-height ≥120px · focus `#ffd479` |
| 변환 | 주 버튼 · 빈 입력 차단 |
| 최종 | 편집 가능 textarea |
| 복사 / 번역 | 일반 버튼 · 상태 라벨 |
| History 행 | 클릭 복원 · 제목 인라인 편집 |

### 7.2 설정 (Stitch `promfter_maker_settings_panel`)

- 글꼴: SVIL 8종 중 실재분만 · 항목에 해당 글꼴 미리보기  
- 크기: S/M/L  
- 언어: KR/EN/JA/ZH/VI  
- API 키 입력(마스킹)  
- 저장 / 초기화

---

## 08. 접근성 · 테마

- `:root` 토큰: `bg` `#0d0d12`, `surface` `#16161d`, `surface-2` `#1f1f2a`, `text` `#f5f5f7`, `text-sub` `#c9c9d4`, `accent` `#7ec8ff`, `accent-strong` `#b3ddff`, `accent-max` `#d6ecff`, `border` `#3a3a48`, `border-strong` `#6b6b82`, `focus` `#ffd479`, `positive` `#7ee2a8`, `warning` `#ffd479`, `negative` `#ff9b9b`
- 주 버튼: accent-strong + `#000`  
- 컨트롤 min-height 50px · radius 12/16  
- bold 합성 금지 · 숫자 Consolas  
- `prefers-reduced-motion` 존중  
- CDN 폰트/아이콘 금지

---

## 09. 검증

| ID | 검증 |
|---|---|
| V1 | 시드 5 카테고리 표시·전환 |
| V2 | 변환 → 최종 표시 → 히스토리 1건 |
| V3 | 제목 수정 영속 |
| V4 | 복사 클립보드 |
| V5 | 번역 영문 표시 |
| V6 | 카테고리 추가/삭제(최소 1) |
| V7 | 설정 글꼴·크기·언어 반영 |
| V8 | 포커스 링·50px·대비 육안/도구 |
| V9 | API 키 없이 변환 시 명확한 실패 라벨 |

---

## 부록 A — 시드 시스템 프롬프트 (초안)

- **일반**: 명확한 LLM 지시문으로 재구성. 불필요한 메타 설명 없이 프롬프트 본문만.
- **이미지**: 주제·스타일·구도·조명·재질·카메라 키워드를 포함한 이미지 생성 프롬프트.
- **영상**: 샷·동작·카메라 무브·분위기·길이 힌트가 있는 영상/모션 프롬프트.
- **워크플로우**: ComfyUI/노드 파이프라인에 쓰기 좋은 단계·조건·입력 명세형 프롬프트.
- **검색**: 검색엔진/자료 조사에 적합한 간결한 쿼리·키워드 조합.

(본문 문자열은 구현 시 `src/prompts/seedCategories.ts`에 확정.)

## 부록 B — 번역 시스템 프롬프트 (초안)

영문으로만 출력한다. 설명·따옴표·머리말을 붙이지 않는다. 원문의 프롬프트/쿼리 의도를 유지한다.
