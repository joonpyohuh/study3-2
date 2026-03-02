# Project Blueprint: b-cube Website

## Overview
b-cube는 아주대학교 경영인텔리전스학과 소학회로, 데이터 분석 및 비즈니스 인텔리전스 분야를 연구합니다. 이 프로젝트는 소학회의 정체성을 알리고 멤버 및 활동을 소개하는 웹사이트입니다.

## Implemented Features
- **Responsive Design**: Mobile-friendly layout using modern CSS.
- **Web Components**: Custom `<member-card>` element for consistent member profiles.
- **Animations**: Fade-in and scroll-triggered animations for a dynamic feel.
- **Modern CSS**: Uses CSS Variables, Flexbox, and Grid.
- **Dark/Light Mode**: User-selectable theme with persistence via `localStorage`.
- **Contact Form**: Functional contact form powered by Formspree for partnership and general inquiries.
- **Real-time Weather**: Live weather updates using the OpenWeatherMap API (or mock).
- **Dynamic Particles**: Interactive background particles in the Hero section.
- **Interactive 3D**: Three.js based interactive element for a premium feel.
- **AI Fortune Teller**: A fun "Daily AI Insight" generator.

## Detailed Design
- **Colors**:
  - Light Mode: Navy (`#003366`), Light Blue-Grey (`#f0f4f8`), Orange Accent (`#ff9900`).
  - Dark Mode: Sky Blue (`#4da3ff`), Dark Grey (`#1a1a1a`), Gold Accent (`#ffad33`).
- **Typography**: 'Noto Sans KR' for a clean, modern look.
- **Components**:
  - `header`: Sticky navigation with theme toggle and weather badge.
  - `hero`: Large introductory section with dynamic particle background and 3D floating object.
  - `sections`: About, Activities, Members, Contact, Market, Weather, Fun.
  - `weather-widget`: A glassmorphism styled card showing current weather.
  - `fun-zone`: Interactive area for quotes and mini-interactions.

## Current Task: Enhanced Experience & Deployment
1.  **Weather Integration**: Fetch real-time data from a public API and display it in the header/hero.
2.  **Dynamic Animations**:
    - Add a Three.js canvas for a floating 3D cube/sphere.
    - Implement a particle system for the hero background.
    - Enhance scroll animations with stagger effects.
3.  **Fun Elements**:
    - Create a "Fortune of the Day" component.
    - Add hover-triggered sound effects (optional) or subtle haptic-like animations.
4.  **GitHub Deployment**: Prepare for GitHub Pages and provide deployment steps.
