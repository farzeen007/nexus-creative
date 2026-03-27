# NEXUS Creative — Next-Gen Landing Page

NEXUS Creative is a premium, high-performance landing page for a creative staffing and design agency. Built with Next.js 14 and GSAP, it features immersive animations, smooth scrolling, and a high-fidelity user interface designed to "wow" visitors.

## 🚀 Key Features

- **Next.js 14 (App Router)**: Fast, SEO-friendly, and modern React framework.
- **GSAP & ScrollTrigger**: Advanced web animations with complex scroll interactions.
- **Lenis Smooth Scroll**: Silky-smooth professional scrolling experience.
- **Fluid Layout**: Fully responsive, dark-mode-first aesthetic using Tailwind CSS.
- **Dynamic Imports**: Optimized performance with code splitting and lazy-loading.

## 🛠️ Setup Instructions

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Local Development
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the project.

### 4. Production Build
Optimize for production:
```bash
npm run build
npm run start
```

---

## 🎬 Animation Implementation

The motion system is powered by **GSAP (GreenSock Animation Platform)**. Key techniques used include:

- **ScrollTrigger**: Context-aware animations that respond to the user's scroll position.
- **Timelines**: Highly precise, sequenced animations to ensure elements enter and exit the viewport with perfect rhythm.
- **Scrub**: Many scroll effects are bound to the scrollbar movement (`scrub: true`), creating a tactile feel where the user controls the animation speed.
- **Pinning**: Used in sections like "Services" and "Portfolio" to lock content in place while internal transitions occur.
- **Stagger**: Elements in grids (like Services cards or Portfolio items) use staggered entry animations to avoid visual overload.
- **Parallax Effects**: Distant background text and foreground imagery move at different velocities to create a sense of depth and 3D space.

---

## ⚡ Performance Considerations

To maintain a consistent **60fps experience** across devices, the following optimizations are implemented:

### Lazy-loading
Heavy components (Services, Portfolio, Testimonials) use `next/dynamic` to prevent the main thread from blocking during initial load. This ensures the Hero section is interactive immediately.

### Animation Cleanup
Using `@gsap/react`'s `useGSAP` hook (or `gsap.context()`) ensures all ScrollTriggers and timelines are properly killed when components unmount, preventing memory leaks.

### Render Optimization
- **`will-change` Usage**: Applied to elements undergoing complex transforms to inform the browser's compositor.
- **Reduced Motion Support**: Animations respect the user's system settings for reduced motion via custom hooks.
- **GPU Acceleration**: Most animations target `transform: translate3d()` and `opacity` to leverage hardware acceleration.

### Core Dependencies
- `gsap` & `@gsap/react` — Creative motion engine.
- `lenis` — Cross-browser smooth scroll.
- `lucide-react` — Lightweight iconography.
- `tailwind-merge` & `clsx` — Utility-first styling management.

---

## 📄 License
This project is licensed under the MIT License.
