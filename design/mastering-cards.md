# Mastering Cards Page

The Mastering the Cards product page — an elegant, theatrical tarot learning showcase with purple-accented video hero and feature cards.

---

### Section: Hero

## Overview

Full-viewport hero with looping video background. The Mastering Cards hero uses elegant serif typography with purple accents reflecting the tarot's mystical elegance.

## Background

**Full-viewport looping video** with parallax on desktop.

- **Video source**: `mastering-cards-hero.mp4` (see Assets)
- **Poster**: `mastering-cards-hero.jpg`
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
- Content: "Mastering the Cards"
- Font: Display size (64px desktop / 36px mobile), weight 700
- Font family: `Cinzel` (display serif)
- Color: `#8b5cf6` (purple)
- Text-align: center
- Subtle gradient: `text-shadow: 0 0 20px rgba(139, 92, 246, 0.3)`

**Element: "Hero Subtitle"**
- Content: "Learn the Ancient Art of Tarot"
- Font: Body Large (20px), weight 300
- Font family: `Cinzel`
- Color: `#a0a0b8`
- Text-align: center
- Max-width: 500px
- Margin-top: 16px

## Entrance Animations

- Headline: Fade Up, 1000ms, delay 300ms
- Subtitle: Fade Up, 1000ms, delay 500ms

## Assets

[ASSET: Video "mastering-cards-hero-video"]
1920x1080, 10-15 seconds loop. Elegant tarot-themed animation — ornate tarot cards gently floating and rotating in dark space, purple and golden light illuminating intricate card designs. Mystical, luxurious atmosphere. Seamless loop.

[ASSET: Image "mastering-cards-hero-poster"]
1920x1080. Still frame — elegant tarot cards with purple and golden lighting on dark background.

---

### Section: Features

## Overview

Feature grid for the tarot learning app.

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
- Font family: `Cinzel`
- Color: `#8b5cf6`
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
| 1 | BookOpen | Interactive Lessons | Step-by-step tutorials for every card in the deck. |
| 2 | Layout | Spread Library | Learn classic and modern tarot spreads. |
| 3 | Star | Daily Draws | Personalized daily card draws with detailed interpretations. |

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
- Content: "Begin Your Tarot Journey"
- Font: H2 (32px), weight 700
- Font family: `Cinzel`
- Color: `#8b5cf6`
- Text-align: center

**Element: "CTA Price"**
- Content: "$8.99/month"
- Font: H3, weight 600, color `#00e5e5`
- Text-align: center
- Margin-top: 16px

**Element: "CTA Description"**
- Content: "Start your path to tarot mastery today."
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
| Route | `/mastering-cards` |
| Navigation | Full nav |
| Footer | Yes |
| Background | `#0a0a0f` |
| Scroll snap | Yes |
