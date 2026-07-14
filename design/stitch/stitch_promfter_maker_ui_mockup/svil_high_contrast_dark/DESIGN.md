---
name: SVIL High-Contrast Dark
colors:
  surface: '#131318'
  surface-dim: '#131318'
  surface-bright: '#39383e'
  surface-container-lowest: '#0e0e13'
  surface-container-low: '#1b1b20'
  surface-container: '#1f1f24'
  surface-container-high: '#2a292f'
  surface-container-highest: '#35343a'
  on-surface: '#e4e1e9'
  on-surface-variant: '#c1c7ce'
  inverse-surface: '#e4e1e9'
  inverse-on-surface: '#303035'
  outline: '#8c9198'
  outline-variant: '#42474d'
  surface-tint: '#a2cbed'
  primary: '#edf5ff'
  on-primary: '#00344e'
  primary-container: '#b3ddff'
  on-primary-container: '#38627f'
  inverse-primary: '#396380'
  secondary: '#8dcdff'
  on-secondary: '#00344f'
  secondary-container: '#036c9e'
  on-secondary-container: '#cde7ff'
  tertiary: '#fff2e0'
  on-tertiary: '#402d00'
  tertiary-container: '#fdd277'
  on-tertiary-container: '#775904'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c9e6ff'
  primary-fixed-dim: '#a2cbed'
  on-primary-fixed: '#001e2f'
  on-primary-fixed-variant: '#1e4b67'
  secondary-fixed: '#cae6ff'
  secondary-fixed-dim: '#8dcdff'
  on-secondary-fixed: '#001e30'
  on-secondary-fixed-variant: '#004b70'
  tertiary-fixed: '#ffdf9f'
  tertiary-fixed-dim: '#eac168'
  on-tertiary-fixed: '#261a00'
  on-tertiary-fixed-variant: '#5b4300'
  background: '#131318'
  on-background: '#e4e1e9'
  surface-variant: '#35343a'
typography:
  display-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Bricolage Grotesque
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-sm:
    fontFamily: Bricolage Grotesque
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Bricolage Grotesque
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Bricolage Grotesque
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.2'
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  gutter: 24px
  margin: 32px
  control-height: 50px
  panel-padding: 24px
---

## Brand & Style
This design system focuses on a high-precision, technical aesthetic tailored for "Promfter Maker." The brand personality is clinical, focused, and utilitarian, utilizing a deep-space "High-Contrast Dark" style. It draws from **Brutalism** through its reliance on strong borders and specific control heights, and **Minimalism** through its strict rejection of font weights for hierarchy.

The UI is designed to evoke a sense of focused productivity. By stripping away font weight variations and relying on size and color contrast, the interface minimizes visual noise while maximizing legibility in low-light environments.

## Colors
The palette is strictly dark-mode. Contrast is the primary driver for accessibility and component definition.
- **Backgrounds**: A deep, neutral black-blue (`#0d0d12`) serves as the foundation.
- **Surfaces**: Panels use a slightly lifted gray (`#16161d`), while interactive elements like inputs and secondary buttons use a lighter tertiary layer (`#1f1f2a`).
- **Accents**: The primary action uses a high-luminance blue-white (`#b3ddff`) with black text to ensure immediate focal point recognition.
- **State Feedback**: Focus states utilize a vibrant yellow (`#ffd479`) to ensure the user's position is never lost in the dark interface.

## Typography
Hierarchy is achieved exclusively through scale and color, never through weight. All text uses a weight of 400.
- **UI Labels & Body**: Use Bricolage Grotesque to capture the expressive, slightly quirky "handwritten" vibe required for UI labels while maintaining high legibility.
- **Technical Data**: Use JetBrains Mono for timestamps, IDs, and prompt tokens to signify "system output."
- **Contrast Ratios**: Primary information uses `#f5f5f7`. Secondary information and metadata use `#c9c9d4`.

## Layout & Spacing
The design system employs a **Fluid Grid** with generous internal spacing to offset the heavy dark theme.
- **Control Height**: A strict minimum height of 50px is enforced for all touch/click targets (buttons, inputs, list items).
- **Padding**: Use a 24px internal padding for panels to ensure content has significant breathing room.
- **Breakpoints**:
  - **Mobile (<768px)**: 16px margins, 1-column stack.
  - **Desktop (>768px)**: 12-column grid with 24px gutters.

## Elevation & Depth
Depth is created through **Bold Borders** and **Tonal Layers** rather than shadows.
- **Panels**: Defined by a `#3a3a48` border. No drop shadows are used.
- **Interactive Elements**: Buttons and inputs use a stronger `#6b6b82` border to separate them from the panel surfaces.
- **Focus**: Active focus is indicated by a 3px solid stroke of `#ffd479`.
- **Selection**: Text selection and active highlights use `#7ec8ff`.

## Shapes
The shape language uses moderate rounding to soften the high-contrast "Brutalist" influence.
- **Inputs & Buttons**: 12px corner radius.
- **Panels & Containers**: 16px corner radius.
- **Tabs**: Bottom-aligned 3px indicator stroke with 0px radius for the underline itself.

## Components
- **Buttons**:
  - **Primary**: Background `#b3ddff`, text `#000000`. Hover state: `#d6ecff`.
  - **Secondary**: Background `#1f1f2a`, border 1px `#6b6b82`, text `#f5f5f7`.
- **Inputs**: 50px height, background `#1f1f2a`, border 1px `#6b6b82`. Text is vertically centered.
- **Tabs**: Text-only labels. Selected state features a 3px underline in `#7ec8ff`.
- **Lists**: Items are separated by 1px borders (`#3a3a48`). Every item must maintain the 50px minimum height.
- **Chips**: Used for prompt tags. Background `#1f1f2a`, border 1px `#6b6b82`, 12px radius, font size 14px.
- **Cards/Panels**: Background `#16161d`, border 1px `#3a3a48`, 16px radius, 24px padding.