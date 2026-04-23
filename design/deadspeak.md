# DeadSpeak Page

The DeadSpeak product page — a dark, spooky interface for spirit communication. Features custom spooky typography (Creepster/Great Vibes fonts), eerie video background, and haunting visual effects.

---

### Section: Hero

## Overview

Full-viewport hero with a haunting video background. The DeadSpeak hero uses custom spooky fonts — Creepster for the title and Great Vibes for subtitles — creating an unsettling, supernatural atmosphere.

## Background

**Full-viewport looping video** with parallax on desktop.

- **Video source**: `deadspeak-hero.mp4` (see Assets)
- **Poster**: `deadspeak-hero.jpg`
- **Playback**: Autoplay, muted, loop
- **Mobile**: Poster image only
- **Overlay**: `rgba(10, 10, 15, 0.6)` — slightly darker than other pages for spooky atmosphere

**Parallax**: Video at 0.5x scroll speed on desktop.

## Section Layout

- Section: width=100%, min-height=100vh, position=relative
  - Video background: absolute, inset=0
  - Dark overlay: absolute, inset=0
  - Content container: relative, flex column, center aligned
    - Headline: centered
    - Subtitle: centered (script font)

## Elements

**Element: "Hero Headline"**
- Content: "DeadSpeak"
- Font: Display size (72px desktop / 42px mobile), weight 400
- Font family: `Creepster` (spooky display)
- Color: `#00e5e5` (cyan)
- Text effect: Spooky Glow — `text-shadow: 0 0 10px rgba(0, 229, 229, 0.5), 0 0 20px rgba(0, 229, 229, 0.3)`
- Text-align: center
- Letter-spacing: 4px

**Element: "Hero Subtitle"**
- Content: "Communicate Beyond the Veil"
- Font: Body Large (24px desktop / 18px mobile), weight 400
- Font family: `Great Vibes` (decorative script)
- Color: `#e0e0f0`
- Text-align: center
- Max-width: 500px
- Margin-top: 16px
- Subtle glow: `text-shadow: 0 0 10px rgba(255, 255, 255, 0.3)`

## Entrance Animations

- Headline: Fade Up, 1200ms, delay 300ms (slower for dramatic effect)
- Subtitle: Fade Up, 1000ms, delay 600ms

## Assets

[ASSET: Video "deadspeak-hero-video"]
1920x1080, 10-15 seconds loop. Dark eerie scene — swirling blue-green spectral mist (Will-o'-the-wisp style), faint ghostly silhouettes drifting through fog, occasional flickers of cyan light. Haunting, supernatural mood. Seamless loop.

[ASSET: Image "deadspeak-hero-poster"]
1920x1080. Still frame — spectral mist with ghostly shapes, cyan-green tones on very dark background.

---

### Section: Features

## Overview

Feature grid for DeadSpeak's spirit communication capabilities.

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
- Font family: `Creepster`
- Color: `#00e5e5`
- Text-align: center
- Margin-bottom: 48px

**Element: "Feature Card"** (×3)
- Style: Glassmorphism Card (dark variant: `rgba(0,0,0,0.3)` fill)
- Padding: 32px, centered
  - Icon: 48px, color `#00e5e5`
  - Title: H3, color `#e0e0f0`
  - Description: Body, color `#a0a0b8`

**Feature Content:**

| # | Icon | Title | Description |
|---|------|-------|-------------|
| 1 | Radio | EVP Analysis | Advanced electronic voice phenomenon detection and analysis. |
| 2 | MessageCircle | Spirit Communication | Direct messaging interface for beyond-the-veil contact. |
| 3 | History | Session History | Log and review all your supernatural communication sessions. |

## Entrance Animations

- Title: Fade Up, 800ms
- Cards: Fade Up with stagger, 150ms

---

### Section: CTA

## Overview

Subscription call-to-action with spooky styling.

## Background

- Background color: `#0a0a0f`

## Section Layout

- Section: width=100%, padding=80px 24px
  - Container: max-width=800px, centered
    - Glassmorphism Card (dark variant)
      - Padding: 48px
      - Content: centered

## Elements

**Element: "CTA Title"**
- Content: "Ready to Speak with the Other Side?"
- Font: H2 (32px), weight 400
- Font family: `Creepster`
- Color: `#00e5e5`
- Text-align: center

**Element: "CTA Price"**
- Content: "$12.99/month"
- Font: H3, weight 600
- Color: `#00e5e5`
- Text-align: center
- Margin-top: 16px

**Element: "CTA Description"**
- Content: "Unlock the full potential of spirit communication with our premium features."
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
| Route | `/deadspeak` |
| Navigation | Full nav |
| Footer | Yes |
| Background | `#0a0a0f` |
| Scroll snap | Yes |
| Custom fonts | Creepster, Great Vibes |

---

## Component List

### shadcn/ui Components

| Component | Usage |
|-----------|-------|
| Button | Subscribe CTA |

### Lucide React Icons

| Icon | Usage |
|------|-------|
| `Radio` | EVP Analysis feature |
| `MessageCircle` | Spirit Communication feature |
| `History` | Session History feature |
