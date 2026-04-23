# Quantum AI Page

The Quantum AI product page — a futuristic, technology-focused showcase with a dramatic purple-themed video hero, feature breakdown, and pricing call-to-action.

---

### Section: Hero

## Overview

Full-viewport hero with looping video background, featuring the Quantum AI title in a futuristic purple glitch style. The hero establishes the high-tech, advanced AI aesthetic.

## Background

**Full-viewport looping video** with parallax effect on desktop.

- **Video source**: `quantum-ai-hero.mp4` (see Assets)
- **Poster**: `quantum-ai-hero.jpg`
- **Playback**: Autoplay, muted, loop
- **Object-fit**: Cover
- **Mobile**: Poster image only
- **Overlay**: `rgba(10, 10, 15, 0.5)` semi-transparent dark overlay

**Parallax**: Video moves at 0.5x scroll speed on desktop.

## Section Layout

- Section: width=100%, min-height=100vh, position=relative
  - Video background: absolute, inset=0, z-index=-1
  - Dark overlay: absolute, inset=0
  - Content container: relative, flex column, center aligned
    - Headline: centered
    - Subtitle: centered

## Elements

**Element: "Hero Headline"**
- Content: "Quantum AI"
- Font: Display size (64px desktop / 36px mobile), weight 700
- Font family: `Orbitron` (technical mono)
- Color: `#8b5cf6` (purple)
- Text effect: Futuristic Glitch — `text-shadow: 2px 2px rgba(139, 92, 246, 0.4), -2px -2px rgba(0, 229, 229, 0.4)`
- Text-align: center

**Element: "Hero Subtitle"**
- Content: "Experience the Future of AI-Driven Conversations"
- Font: Body Large (18px), weight 300
- Color: `#a0a0b8`
- Text-align: center
- Max-width: 500px
- Margin-top: 16px

## Entrance Animations

- Headline: Fade Up, 1000ms, delay 300ms
- Subtitle: Fade Up, 1000ms, delay 500ms

## Assets

[ASSET: Video "quantum-ai-hero-video"]
1920x1080, 10-15 seconds loop. Futuristic abstract animation — deep purple and black background with flowing digital particle streams, neural network visualization patterns, subtle glitch effects. High-tech, sophisticated mood. Seamless loop.

[ASSET: Image "quantum-ai-hero-poster"]
1920x1080. Still frame from Quantum AI hero video — purple digital particles on dark background.

---

### Section: Features

## Overview

A feature breakdown section showcasing Quantum AI's capabilities in a grid of glassmorphism cards.

## Background

- Background color: `#0a0a0f`

## Section Layout

- Section: width=100%, padding=80px 24px (desktop), 40px 24px (mobile)
  - Container: max-width=1200px, centered
    - Section title: centered
    - Features grid: 3 columns (desktop), 1 column (mobile), gap=24px
      - Feature Card × 3

## Elements

**Element: "Section Title"**
- Content: "Features"
- Font: H2 size (36px), weight 700
- Color: `#e0e0f0`
- Text-align: center
- Margin-bottom: 48px

**Element: "Feature Card"** (×3)
- Style: Glassmorphism Card
- Padding: 32px
- Layout: Flex column, center aligned
  - Icon: 48px, centered, color `#8b5cf6`
  - Title: H3, weight 600, color `#e0e0f0`, margin-top 16px, centered
  - Description: Body, color `#a0a0b8`, margin-top 8px, centered

**Feature Content:**

| # | Icon | Title | Description |
|---|------|-------|-------------|
| 1 | Brain | Advanced Neural Networks | Powered by cutting-edge neural architecture for human-like conversations. |
| 2 | Zap | Real-Time Processing | Lightning-fast responses with our optimized inference engine. |
| 3 | Shield | Secure & Private | End-to-end encryption ensures your conversations remain confidential. |

## Entrance Animations

- Section Title: Fade Up, 800ms
- Feature Cards: Fade Up with stagger, 150ms between cards

## Interactions

- Feature Card Hover: Scale(1.02), border brightens

---

### Section: CTA

## Overview

A call-to-action section encouraging users to subscribe to Quantum AI.

## Background

- Background color: `#0a0a0f`
- Subtle top border: 1px solid `rgba(255, 255, 255, 0.05)`

## Section Layout

- Section: width=100%, padding=80px 24px (desktop), 40px 24px (mobile)
  - Container: max-width=800px, centered
    - Glassmorphism Card (centered, prominent)
      - Layout: Centered text
      - Padding: 48px

## Elements

**Element: "CTA Title"**
- Content: "Ready to Experience Quantum AI?"
- Font: H2 size, weight 700
- Color: `#e0e0f0`
- Text-align: center

**Element: "CTA Price"**
- Content: "$10.99/month"
- Font: H3 size, weight 600
- Color: `#00e5e5`
- Text-align: center
- Margin-top: 16px

**Element: "CTA Description"**
- Content: "Unlock the full potential of AI-driven conversations with our premium subscription."
- Font: Body, color `#a0a0b8`
- Text-align: center
- Margin-top: 12px

**Element: "Subscribe Button"**
- Content: "Subscribe Now"
- Style: Gradient Accent Button (large variant)
- Margin-top: 32px
- Action: External payment/subscription link

## Entrance Animations

- All elements: Fade Up with stagger

---

## Page Settings

| Property | Value |
|----------|-------|
| Route | `/quantum-ai` |
| Navigation | Full nav |
| Footer | Yes |
| Background | `#0a0a0f` |
| Scroll snap | Yes — scroll-snap-type: y mandatory |

---

## Component List

### shadcn/ui Components

| Component | Usage |
|-----------|-------|
| Button | Subscribe CTA |

### Lucide React Icons

| Icon | Usage |
|------|-------|
| `Brain` | Neural Networks feature |
| `Zap` | Real-Time Processing feature |
| `Shield` | Secure & Private feature |
