# Project Blueprint: b-cube Website

## Overview
b-cube는 아주대학교 경영인텔리전스학과 소학회로, 데이터 분석 및 비즈니스 인텔리전스 분야를 연구합니다. 이 프로젝트는 소학회의 정체성을 알리고 멤버 및 활동을 소개하는 웹사이트입니다.

## Implemented Features
- **Responsive Design**: Mobile-friendly layout using modern CSS.
- **Web Components**: Custom `<member-card>` element for consistent member profiles.
- **Animations**: Fade-in and scroll-triggered animations for a dynamic feel.
- **Modern CSS**: Uses CSS Variables, Flexbox, and Grid.
- **Dark/Light Mode**: User-selectable theme with persistence via `localStorage`.

## Detailed Design
- **Colors**:
  - Light Mode: Navy (`#003366`), Light Blue-Grey (`#f0f4f8`), Orange Accent (`#ff9900`).
  - Dark Mode: Sky Blue (`#4da3ff`), Dark Grey (`#1a1a1a`), Gold Accent (`#ffad33`).
- **Typography**: 'Noto Sans KR' for a clean, modern look.
- **Components**:
  - `header`: Sticky navigation with theme toggle.
  - `hero`: Large introductory section with background image and call-to-action.
  - `sections`: About, Activities, Members, Contact with intersection observer animations.
  - `member-card`: Shadow DOM encapsulated profile cards.

## Current Task: Dark/Light Mode Implementation
1.  **CSS Variables**: Defined global variables in `:root` and overrides in `body.dark-mode`.
2.  **Toggle UI**: Added a button in the navigation bar to switch between moon and sun icons.
3.  **JavaScript Logic**:
    - Toggle `dark-mode` class on the `body` element.
    - Save/Load theme preference from `localStorage`.
    - Update custom component styles to inherit theme variables.
4.  **Verification**: Ensure all text, backgrounds, and cards transition smoothly.
