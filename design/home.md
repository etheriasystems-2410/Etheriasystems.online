# Home Page

The main landing page for Etheria Systems — a dramatic hero with video background, four featured product showcases in glassmorphism cards, an about/developer section, and a contact section.

---

### Section: Hero

## Overview

Full-viewport hero section with a looping video background, overlaid with the company tagline and a call-to-action. The hero establishes the dark cinematic aesthetic of the entire site.

## Background

**Full-viewport looping video** covering the entire section.

- **Video source**: `hero-background.mp4` (see Assets)
- **Poster/fallback**: `hero-background.jpg` (see Assets)
- **Playback**: Autoplay, muted, loop
- **Object-fit**: Cover — fills entire viewport, crops to center
- **Mobile**: Poster image only (no video), static
- **Dark overlay**: Linear gradient from `rgba(10, 10, 15, 0.6)` at top to `rgba(10, 10, 15, 0.3)` at bottom

## Section Layout

- Section: width=100%, min-height=100vh, position=relative, overflow=hidden
  - Video background: position=absolute, inset=0, z-index=-1, object-fit=cover
  - Dark overlay: position=absolute, inset=0, z-index=0
  - Content container: position=relative, z-index=1, flex column, center aligned
    - Title block: centered horizontally and vertically
      - Headline: centered, max-width 800px
      - Subtitle: centered, below headline
      - CTA button: centered, below subtitle
    - Scroll indicator: bottom of viewport, centered

## Elements

**Element: "Hero Headline"**
- Content: "Bridging the Gap Between What Is and What Could Be."
- Font: Display size (64px desktop / 36px mobile), weight 700
- Color: Gradient text — `linear-gradient(90deg, #00e5e5, #8b5cf6)`
- Text-align: center
- Line-height: 1.1
- Max-width: 800px

**Element: "Hero Subtitle"**
- Content: "Etheria Systems creates innovative software solutions that push the boundaries of technology, connecting you to new possibilities."
- Font: Body Large (18px desktop / 16px mobile), weight 300
- Color: `#a0a0b8`
- Text-align: center
- Max-width: 600px
- Margin-top: 24px

**Element: "CTA Button"**
- Content: "Explore Our Products"
- Style: Gradient Accent Button (from design.md)
- Margin-top: 32px
- Links to: /products

**Element: "Scroll Indicator"**
- Content: Small downward-pointing chevron or arrow icon
- Position: Bottom of viewport, 40px from bottom edge
- Animation: Gentle bounce — `translateY(0)` to `translateY(8px)`, 1.5s ease-in-out infinite
- Opacity: 0.5

## Entrance Animations

- **Headline**: Fade Up, duration 1000ms, delay 300ms
- **Subtitle**: Fade Up, duration 1000ms, delay 500ms
- **CTA Button**: Fade Up, duration 1000ms, delay 700ms
- **Scroll Indicator**: Fade in, duration 500ms, delay 1200ms

## Assets

[ASSET: Video "hero-background-video"]
1920x1080, 10-15 seconds loop. Abstract dark cinematic animation — deep navy and black background with subtle flowing particle streams, soft bokeh light effects in cyan and purple tones. Slow, dreamlike motion. Ethereal atmosphere suggesting technology and mysticism merging. Seamless loop.

[ASSET: Image "hero-background-poster"]
1920x1080. Still frame from the hero video — dark abstract scene with subtle purple and cyan light effects, suitable as a loading fallback.

---

### Section: Products

## Overview

A 2×2 grid of glassmorphism cards showcasing four featured Etheria Systems products. Each card contains an image, product name, and brief description.

## Background

- Background color: `#0a0a0f`
- No background image or video

## Section Layout

- Section: width=100%, padding=80px 24px (desktop), 40px 24px (mobile)
  - Container: max-width=1200px, centered
    - Section title: centered
    - Product grid: 2 columns (desktop), 1 column (mobile), gap=24px
      - Product Card × 4

## Elements

**Element: "Section Title"**
- Content: "Our Products"
- Font: H2 size (36px desktop / 24px mobile), weight 700
- Color: `#e0e0f0`
- Text-align: center
- Margin-bottom: 48px

**Element: "Product Card"** (×4)
- Style: Glassmorphism Card (from design.md)
- Padding: 24px
- Layout: Flex column
  - Image: aspect-ratio 16/9, border-radius 8px, object-fit cover
  - Title: H3 size, weight 600, color `#e0e0f0`, margin-top 16px
  - Description: Body size, color `#a0a0b8`, margin-top 8px
  - "Learn More" link: Small text, color `#00e5e5`, margin-top 12px, with right arrow

**Product Card Content:**

| # | Title | Description | Link |
|---|-------|-------------|------|
| 1 | Quantum AI | Explore the future of AI-driven conversations. | /quantum-ai |
| 2 | Arcanum | Unlock ancient wisdom with modern technology. | /arcanum |
| 3 | DeadSpeak | Communicate beyond the veil. | /deadspeak |
| 4 | Mastering the Cards | Master the art of tarot. | /mastering-cards |

## Entrance Animations

- **Section Title**: Fade Up, duration 800ms
- **Product Cards**: Fade Up with stagger, 200ms between each card, triggered on scroll into view

## Interactions

**Product Card Hover**:
- Card: Border color transitions to `rgba(255, 255, 255, 0.2)`, subtle scale(1.02)
- Image: Subtle scale(1.05) within container (overflow hidden clips)
- "Learn More" link: Arrow shifts right 4px
- Duration: 300ms ease-out

## Assets

[ASSET: Image "product-quantum-ai"]
800x450. Abstract futuristic visualization — purple and cyan neural network patterns on dark background, glowing nodes connected by light streams. High-tech, sophisticated feel.

[ASSET: Image "product-arcanum"]
800x450. Mystical glowing crystal ball or orb on dark background, surrounded by subtle golden light particles and ancient script patterns. Ethereal and mysterious.

[ASSET: Image "product-deadspeak"]
800x450. Dark, moody scene — ethereal blue-green spectral mist swirling in darkness, faint ghostly shapes suggesting spiritual communication. Haunting and atmospheric.

[ASSET: Image "product-mastering-cards"]
800x450. Elegant tarot card spread on dark velvet surface, golden light illuminating ornate card backs with purple and gold decorative borders. Luxurious and mystical.

---

### Section: About

## Overview

A personal introduction section featuring the founder's photo and bio, presented in a glassmorphism card.

## Background

- Background color: `#0a0a0f`
- Continues from Products section seamlessly

## Section Layout

- Section: width=100%, padding=80px 24px (desktop), 40px 24px (mobile)
  - Container: max-width=1200px, centered
    - Glassmorphism Card (large variant)
      - Layout: 2 columns on desktop (image left, text right), stacked on mobile
      - Gap: 40px

## Elements

**Element: "Founder Photo"**
- Dimensions: Aspect ratio 3:4, border-radius 16px
- Object-fit: cover
- Max-height: 400px
- Subtle border: 1px solid `rgba(255, 255, 255, 0.1)`

**Element: "About Title"**
- Content: "About the Developer"
- Font: H2 size (36px desktop / 24px mobile), weight 700
- Color: `#e0e0f0`

**Element: "Founder Name"**
- Content: "Lacy Easter"
- Font: H3 size (24px), weight 600
- Color: Gradient text — `linear-gradient(90deg, #00e5e5, #8b5cf6)`
- Margin-top: 16px

**Element: "Bio Text"**
- Content: "Lacy Easter is the visionary founder and sole developer behind Etheria Systems, a cutting-edge software company dedicated to bridging the gap between what is and what could be. With a passion for innovation and a deep understanding of emerging technologies, Lacy has single-handedly crafted a suite of groundbreaking applications including Quantum AI, Arcanum, DeadSpeak, and Mastering the Cards. Each product reflects a unique blend of technical expertise and creative vision, designed to push boundaries and explore new frontiers in human-technology interaction."
- Font: Body (16px), weight 300
- Color: `#a0a0b8`
- Line-height: 1.6
- Margin-top: 16px

**Element: "Read More Link"**
- Content: "Read more about the developer →"
- Font: Body, color `#00e5e5`
- Links to: /about
- Margin-top: 24px

## Entrance Animations

- **Photo**: Scale-In from left, duration 800ms
- **Text elements**: Fade Up with stagger, 100ms between elements

## Assets

[ASSET: Image "founder-photo"]
600x800. Portrait of a young tech founder — confident pose, casual-professional attire (dark hoodie or jacket). Neutral dark background with subtle cyan/purple rim lighting. Modern startup aesthetic. Clean, well-lit, approachable.

---

### Section: Contact

## Overview

A contact section with a simple call-to-action encouraging visitors to get in touch, plus a direct email link.

## Background

- Background color: `#0a0a0f`

## Section Layout

- Section: width=100%, padding=80px 24px (desktop), 40px 24px (mobile)
  - Container: max-width=1200px, centered
    - Glassmorphism Card
      - Layout: Centered text content
      - Padding: 48px

## Elements

**Element: "Contact Title"**
- Content: "Get in Touch"
- Font: H2 size (36px desktop / 24px mobile), weight 700
- Color: `#e0e0f0`
- Text-align: center

**Element: "Contact Description"**
- Content: "Have questions or want to learn more about Etheria Systems? We'd love to hear from you. Reach out via email or visit our contact page."
- Font: Body Large (18px), weight 300
- Color: `#a0a0b8`
- Text-align: center
- Max-width: 600px
- Margin: 16px auto 0

**Element: "Email Link"**
- Content: "ethereasystems@gmail.com"
- Font: Body Large, weight 500
- Color: `#00e5e5`
- Text-align: center
- Link: `mailto:ethereasystems@gmail.com`
- Margin-top: 24px
- Hover: Underline, slight glow

**Element: "Contact Button"**
- Content: "Contact Us"
- Style: Gradient Accent Button
- Margin-top: 32px
- Links to: /contact

## Entrance Animations

- All elements: Fade Up with stagger, 100ms between elements

---

## Page Settings

| Property | Value |
|----------|-------|
| Route | `/` |
| Navigation | Full nav with all links |
| Footer | Yes — standard footer |
| Background | `#0a0a0f` |
| Scroll snap | No — free scroll |

---

## Component List

### shadcn/ui Components

| Component | Usage |
|-----------|-------|
| Button | CTA buttons |

### Lucide React Icons

| Icon | Usage |
|------|-------|
| `ChevronDown` | Scroll indicator |
| `ArrowRight` | Product card "Learn More" link |
