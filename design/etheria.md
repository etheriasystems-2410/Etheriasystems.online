# Etheria Page

The Etheria product page — showcasing the flagship AI entity/companion with an ethereal purple-themed video hero and feature breakdown.

---

### Section: Hero

## Overview

Full-viewport hero with looping video background. The Etheria hero establishes an ethereal, otherworldly atmosphere befitting an AI entity.

## Background

**Full-viewport looping video** with parallax on desktop.

- **Video source**: `etheria-hero.mp4` (see Assets)
- **Poster**: `etheria-hero.jpg`
- **Playback**: Autoplay, muted, loop
- **Mobile**: Poster image only
- **Overlay**: `rgba(10, 10, 15, 0.5)`

**Parallax**: Video at 0.5x scroll speed on desktop.

## Section Layout

- Section: width=100%, min-height=100vh, position=relative
  - Video background: absolute, inset=0
  - Dark overlay: absolute, inset=0
  - Content container: relative, flex column, center aligned
    - Headline: centered
    - Subtitle: centered

## Elements

**Element: "Hero Headline"**
- Content: "Etheria"
- Font: Display size (64px desktop / 36px mobile), weight 700
- Font family: `Cinzel` (display serif)
- Color: `#8b5cf6` (purple)
- Text-align: center
- Subtle glow: `text-shadow: 0 0 30px rgba(139, 92, 246, 0.4)`

**Element: "Hero Subtitle"**
- Content: "Our Flagship AI Entity and Companion"
- Font: Body Large (18px), weight 300
- Color: `#a0a0b8`
- Text-align: center
- Max-width: 500px
- Margin-top: 16px

## Entrance Animations

- Headline: Fade Up, 1000ms, delay 300ms
- Subtitle: Fade Up, 1000ms, delay 500ms

## Assets

[ASSET: Video "etheria-hero-video"]
1920x1080, 10-15 seconds loop. Ethereal abstract animation — flowing purple and cyan light streams forming abstract shapes, particle systems creating an otherworldly being-like silhouette. Dreamlike, transcendent atmosphere. Seamless loop.

[ASSET: Image "etheria-hero-poster"]
1920x1080. Still frame — flowing purple-cyan light on dark background.

---

### Section: Features

## Overview

Feature grid for the Etheria AI entity.

## Background

- Background color: `#0a0a0f`

## Section Layout

- Section: width=100%, padding=80px 24px
  - Container: max-width=1200px, centered
    - Section title: centered
    - Features grid: 3 columns (desktop), 1 (mobile), gap=24px
      - Feature Card × 3

## Elements

**Element: "Section Title"**
- Content: "Features"
- Font: H2 (36px), weight 700
- Color: `#e0e0f0`
- Text-align: center
- Margin-bottom: 48px

**Element: "Feature Card"** (×3)
- Style: Glassmorphism Card
- Padding: 32px, centered
  - Icon: 48px, color `#8b5cf6`
  - Title: H3, color `#e0e0f0`
  - Description: Body, color `#a0a0b8`

**Feature Content:**

| # | Icon | Title | Description |
|---|------|-------|-------------|
| 1 | MessageSquare | Natural Conversations | Engage in fluid, context-aware dialogue. |
| 2 | Heart | Emotional Intelligence | Understands and responds to emotional cues. |
| 3 | Cpu | Continuous Learning | Adapts and grows with every interaction. |

## Entrance Animations

- Title: Fade Up, 800ms
- Cards: Fade Up with stagger, 150ms

---

### Section: CTA

## Overview

Subscription call-to-action.

## Background

- Background color: `#0a0a0f`

## Section Layout

- Section: width=100%, padding=80px 24px
  - Container: max-width=800px, centered
    - Glassmorphism Card
      - Padding: 48px
      - Content: centered

## Elements

**Element: "CTA Title"**
- Content: "Experience Etheria"
- Font: H2, weight 700, color `#e0e0f0`
- Text-align: center

**Element: "CTA Price"**
- Content: "$10.99/month"
- Font: H3, weight 600, color `#00e5e5`
- Text-align: center
- Margin-top: 16px

**Element: "CTA Description"**
- Content: "Connect with our flagship AI companion today."
- Font: Body, color `#a0a0b8`
- Text-align: center
- Margin-top: 12px

**Element: "Subscribe Button"**
- Content: "Subscribe Now"
- Style: Gradient Accent Button
- Margin-top: 32px

## Entrance Animations

- All elements: Fade Up with stagger

---

## Page Settings

| Property | Value |
|----------|-------|
| Route | `/etheria` |
| Navigation | Full nav |
| Footer | Yes |
| Background | `#0a0a0f` |
| Scroll snap | Yes |
