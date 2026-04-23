# Arcanum Page

The Arcanum product page — a mystical, wisdom-themed showcase with a golden-accented video hero, feature cards, and subscription CTA.

---

### Section: Hero

## Overview

Full-viewport hero with looping video background. The Arcanum hero uses a golden color theme reflecting ancient wisdom and mystical knowledge.

## Background

**Full-viewport looping video** with parallax on desktop.

- **Video source**: `arcanum-hero.mp4` (see Assets)
- **Poster**: `arcanum-hero.jpg`
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
- Content: "Arcanum"
- Font: Display size (64px desktop / 36px mobile), weight 700
- Font family: `Cinzel` (display serif)
- Color: `#ffd700` (gold)
- Text-align: center
- Subtle glow: `text-shadow: 0 0 20px rgba(255, 215, 0, 0.3)`

**Element: "Hero Subtitle"**
- Content: "Unlock Ancient Wisdom with Modern Technology"
- Font: Body Large (18px), weight 300
- Color: `#a0a0b8`
- Text-align: center
- Max-width: 500px
- Margin-top: 16px

## Entrance Animations

- Headline: Fade Up, 1000ms, delay 300ms
- Subtitle: Fade Up, 1000ms, delay 500ms

## Assets

[ASSET: Video "arcanum-hero-video"]
1920x1080, 10-15 seconds loop. Mystical golden particles swirling in dark space, ancient symbols and runes faintly glowing, ethereal light beams. Warm gold and amber tones. Magical, ancient atmosphere. Seamless loop.

[ASSET: Image "arcanum-hero-poster"]
1920x1080. Still frame — golden light particles and symbols on dark background.

---

### Section: Features

## Overview

Feature grid showcasing Arcanum's mystical capabilities.

## Background

- Background color: `#0a0a0f`

## Section Layout

- Section: width=100%, padding=80px 24px (desktop), 40px 24px (mobile)
  - Container: max-width=1200px, centered
    - Section title: centered
    - Features grid: 3 columns, gap=24px
      - Feature Card × 3

## Elements

**Element: "Section Title"**
- Content: "Features"
- Font: H2, weight 700, color `#e0e0f0`
- Text-align: center
- Margin-bottom: 48px

**Element: "Feature Card"** (×3)
- Style: Glassmorphism Card
- Padding: 32px, centered
  - Icon: 48px, color `#ffd700`
  - Title: H3, color `#e0e0f0`
  - Description: Body, color `#a0a0b8`

**Feature Content:**

| # | Icon | Title | Description |
|---|------|-------|-------------|
| 1 | BookOpen | Ancient Knowledge Library | Access centuries of mystical wisdom and esoteric teachings. |
| 2 | Sparkles | Interactive Rituals | Step-by-step guided rituals for modern practitioners. |
| 3 | Moon | Astrological Insights | Personalized guidance based on celestial alignments. |

## Entrance Animations

- Title: Fade Up, 800ms
- Cards: Fade Up with stagger, 150ms

---

### Section: CTA

## Overview

Subscription call-to-action for Arcanum.

## Background

- Background color: `#0a0a0f`

## Section Layout

- Section: width=100%, padding=80px 24px
  - Container: max-width=800px, centered
    - Glassmorphism Card (centered)
      - Padding: 48px
      - Content: centered

## Elements

**Element: "CTA Title"**
- Content: "Begin Your Journey with Arcanum"
- Font: H2, weight 700, color `#e0e0f0`
- Text-align: center

**Element: "CTA Price"**
- Content: "$12.99/month"
- Font: H3, weight 600, color `#ffd700`
- Text-align: center
- Margin-top: 16px

**Element: "CTA Description"**
- Content: "Unlock the mysteries of the ancient world with our premium subscription."
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
| Route | `/arcanum` |
| Navigation | Full nav |
| Footer | Yes |
| Background | `#0a0a0f` |
| Scroll snap | Yes |
