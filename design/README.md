# Stitch 디자인 소스 (기준)

원본: `C:\Downloads\stitch_promfter_maker_ui_mockup.zip`  
위치: `design/stitch/stitch_promfter_maker_ui_mockup/`  
역할: **Promfter Maker UI 구현의 시각·레이아웃 기준**

## 화면

| 화면 | HTML | 미리보기 |
|---|---|---|
| 메인 | `promfter_maker_main_screen/code.html` | `promfter_maker_main_screen/screen.png` |
| 설정 | `promfter_maker_settings_panel/code.html` | `promfter_maker_settings_panel/screen.png` |
| 디자인 시스템 | `svil_high_contrast_dark/DESIGN.md` | — |

## 메인 구조 (시안)

1. 좌측 사이드: Management (History / Settings / Help) + User Profile  
2. 상단 브랜드: Promfter Maker + prompt converter  
3. 카테고리 탭: General / Image / Video / Workflow / Search (+/−)  
4. 프롬프트 입력 → **변환** (주 버튼 `#b3ddff`)  
5. 최종 프롬프트 → 복사하기 / 영어로 번역  
6. History 목록 (제목 편집·카테고리 칩·타임스탬프)

## 설정 구조 (시안)

- 글꼴: Handwritten / System Sans  
- 글자 크기: S / M / L  
- 언어: KR / EN / JA / ZH / VI  
- 저장 / 초기화

## 구현 시 SVIL 보정 (필수)

Stitch HTML은 CDN·데모 폰트를 쓰므로, 앱 구현 시 아래를 적용한다.

| Stitch 시안 | SVIL 구현 |
|---|---|
| Bricolage / Nanum Pen Script (CDN) | 교보손글씨2019 로컬 번들 (+ 폴백) |
| JetBrains Mono (CDN) | Consolas (숫자·타임스탬프) |
| Tailwind CDN | 앱 빌드 CSS + `:root` 토큰 |
| Material Symbols CDN | 로컬 아이콘 또는 SVG |
| 글꼴 2종만 | SVIL 글꼴 8종(실재분만) |
| bg `#131318` 등 Material 매핑 | PRD/가이드 토큰 (`#0d0d12`, `#16161d`, …) — 시안과 동일 계열 유지 |

핵심 hex는 시안·DESIGN.md와 맞춤: 주 버튼 `#b3ddff`+#000, 포커스 `#ffd479`, accent `#7ec8ff`, 컨트롤 높이 50px, radius 12/16.
