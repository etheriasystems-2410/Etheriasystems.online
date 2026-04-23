# Etheria Systems — Design Specification

## Project Info

- **Name**: Etheria Systems
- **Category**: Technology Product Showcase / Landing Pages
- **Style Tags**: Dark cinematic, glassmorphism, purple-cyan accent, parallax
- **Interaction Complexity**: Medium-High (custom cursor, parallax, scroll-triggered animations, video backgrounds)
- **Language**: English

## Design Overview

The site follows a dark cinematic aesthetic inspired by futuristic technology and mystical themes. A near-black background serves as the canvas for glassmorphism panels with subtle transparency. The primary accent is a purple-to-cyan gradient that appears on key text, borders, and hover states. Full-page hero sections feature dramatic looping video backgrounds with parallax motion.

**Design Philosophy**: The visual language blends cutting-edge technology with ethereal, almost mystical qualities. Each product page has its own distinct character (e.g., DeadSpeak's spooky typography, Quantum AI's futuristic purple glitch, Mastering Cards' theatrical serif) while sharing the same glassmorphism card system and navigation structure.

**Content Density**: Medium. Large hero sections dominate, with content organized in stacked glassmorphism cards on a deep dark background. Scroll behavior is intentionally smooth and cinematic.

**Mood**: Mysterious, premium, ethereal, powerful — alternating between technological futurism and mystical/spiritual aesthetics depending on the page.

---

## Site Structure

| Page | Description | File |
|------|-------------|------|
| Home | Hero + 3 featured products + About + Contact | home.md |
| Products | All products grid with pricing | products.md |
| Quantum AI | Futuristic AI conversation platform | quantum-ai.md |
| Arcanum | Mystical guidance platform | arcanum.md |
| DeadSpeak | Spirit communication interface | deadspeak.md |
| Mastering Cards | Tarot learning app | mastering-cards.md |
| Etheria | AI entity showcase | etheria.md |
| Donate | Financial contribution page | donate.md |
| Contest Rules | Giveaway terms | contest-rules.md |
| About | Developer/founder profile | about.md |
| Contact | Contact form + newsletter | contact.md |
| Pricing | Product pricing overview | pricing.md |
| Privacy | Privacy policy | privacy.md |
| Terms | Terms of service | terms.md |
| Suggestions | Feature request form | suggestions.md |

---

## Colors

### Core Palette

| Token | Hex | Usage |
|-------|-----|-------|
| **Background Primary** | `#0a0a0f` | Main page background (near-black with blue undertone) |
| **Background Secondary** | `#12121a` | Footer background |
| **Surface Dark** | `#16161f` | Card backgrounds |
| **Surface Light** | `#2a2a35` | Input fields, hover states |
| **Text Primary** | `#e0e0f0` | Headings, primary text |
| **Text Secondary** | `#a0a0b8` | Body text, descriptions |
| **Text Muted** | `#6b6b8a` | Labels, captions |
| **Accent Cyan** | `#00e5e5` | Primary accent — CTAs, active states |
| **Accent Purple** | `#8b5cf6` | Secondary accent — decorative elements |
| **Accent Gradient** | `linear-gradient(90deg, #00e5e5, #8b5cf6)` | Text fills, borders, hover effects |
| **Glass Surface** | `rgba(255,255,255,0.05)` | Glassmorphism card fill |
| **Glass Border** | `rgba(255,255,255,0.1)` | Card borders |
| **Glass Border Hover** | `rgba(255,255,255,0.2)` | Card borders on hover |

### Opacity Scale

| Opacity | Usage |
|---------|-------|
| 0.03 | Subtle card fill |
| 0.05 | Glassmorphism fill |
| 0.08 | Card fill (light mode) |
| 0.1 | Borders, separators |
| 0.15 | Hover backgrounds |
| 0.2 | Hover borders |
| 0.5 | Disabled states |
| 0.7 | Overlays |

---

## Typography

### Font Families

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| **Primary Sans** | `Inter` (Google Fonts) | 300, 400, 500 | Body text, buttons, UI elements |
| **Display Serif** | `Cinzel` (Google Fonts) | 400, 700 | Hero titles, mystical themes (Arcanum, Etheria) |
| **Spooky Display** | `Creepster` (Google Fonts) | 400 | DeadSpeak titles |
| **Decorative Script** | `Great Vibes` (Google Fonts) | 400 | DeadSpeak subtitles |
| **Technical Mono** | `Orbitron` (Google Fonts) | 400, 700 | Quantum AI, tech displays |

### Type Scale

| Token | Size (Desktop) | Size (Mobile) | Weight | Line-Height | Usage |
|-------|---------------|--------------|--------|-------------|-------|
| **Display** | 64px | 36px | 700 | 1.1 | Hero titles |
| **H1** | 48px | 28px | 700 | 1.2 | Page titles |
| **H2** | 36px | 24px | 700 | 1.2 | Section headings |
| **H3** | 24px | 18px | 600 | 1.3 | Card titles |
| **Body Large** | 18px | 16px | 300 | 1.6 | Lead paragraphs |
| **Body** | 16px | 14px | 400 | 1.6 | Standard body text |
| **Small** | 14px | 12px | 400 | 1.4 | Captions, metadata |
| **XSmall** | 12px | 11px | 400 | 1.4 | Labels, badges |

### Special Typography Effects

**Gradient Text** — Applied to hero titles and key headings on specific pages:
```css
background: linear-gradient(90deg, #00e5e5, #8b5cf6);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

**Spooky Glow** — Applied to DeadSpeak titles:
```css
text-shadow: 0 0 10px rgba(0, 229, 229, 0.5), 0 0 20px rgba(0, 229, 229, 0.3);
```

**Futuristic Glitch** — Applied to Quantum AI titles:
```css
text-shadow: 2px 2px rgba(139, 92, 246, 0.4), -2px -2px rgba(0, 229, 229, 0.4);
```

---

## Spacing

### Container System

| Size | Max Width | Side Padding |
|------|----------|-------------|
| Default | 1200px | 24px |
| Wide | 1400px | 24px |
| Full | 100% | 0 |

### Section Spacing

| Context | Value |
|---------|-------|
| Section vertical padding (desktop) | 80px |
| Section vertical padding (mobile) | 40px |
| Card internal padding (desktop) | 40px |
| Card internal padding (mobile) | 24px |
| Card gap in grids | 24px |
| Content gap within sections | 24px |

---

## Layout

### Breakpoints

| Name | Width | Purpose |
|------|-------|---------|
| Mobile | < 768px | Single column, stacked layout |
| Tablet | 768px–1024px | 2-column grids |
| Desktop | > 1024px | Full layout, all features |

### Z-Index Hierarchy

| Layer | Z-Index | Element |
|-------|---------|---------|
| Background video | -1 | Video elements |
| Page content | 1 | Main content |
| Sticky nav | 100 | Fixed navigation |
| Modals | 200 | Dialog overlays |
| Cursor | 9999 | Custom cursor (desktop) |

---

## Shared Components

### Glassmorphism Card

A reusable card component used across all pages for content sections.

- **Background**: `rgba(255, 255, 255, 0.03)` (light) or `rgba(0, 0, 0, 0.3)` (dark variant)
- **Border**: 1px solid `rgba(255, 255, 255, 0.1)`
- **Border-radius**: 16px
- **Padding**: 40px (desktop), 24px (mobile)
- **Backdrop-filter**: `blur(10px)` (applied to container, not card itself)
- **Hover**: Border transitions to `rgba(255, 255, 255, 0.2)`, subtle scale(1.01)

**Hover Animation**:
```css
transition: transform 0.3s ease-out, box-shadow 0.3s ease-out, border-color 0.3s ease-out;
```

### Gradient Accent Button

Primary CTA button used throughout the site.

- **Size**: Default padding 12px 32px, border-radius 8px
- **Background**: `linear-gradient(90deg, #00e5e5, #8b5cf6)`
- **Text**: White, 16px, weight 500
- **Hover**: Background gradient shifts, subtle glow shadow `0 0 20px rgba(0, 229, 229, 0.3)`
- **Disabled**: Opacity 0.5, cursor not-allowed

**Hover Animation**:
```css
transition: all 0.3s ease;
```

### Outline Button

Secondary button variant.

- **Border**: 1px solid `rgba(255, 255, 255, 0.3)`
- **Background**: Transparent
- **Text**: `#e0e0f0`, 16px
- **Hover**: Border color `#00e5e5`, text color `#00e5e5`

### Navigation Bar

Fixed/sticky top navigation shared across all pages.

- **Position**: Fixed top, z-index 100
- **Height**: 64px
- **Background**: `rgba(10, 10, 15, 0.8)` with `backdrop-filter: blur(12px)`
- **Border-bottom**: 1px solid `rgba(255, 255, 255, 0.05)`
- **Left**: Logo text "Ethe" (on home) or full nav links (on other pages)
- **Center/Right**: Nav links — Products, About, Contact (with dropdown submenus)
- **Text**: `#e0e0f0`, 14px, weight 500
- **Active link**: `#00e5e5` with underline accent

**Dropdown Menus**:
- Products dropdown: Quantum AI, Arcanum, DeadSpeak, Mastering Cards, Etheria
- About dropdown: About, Donate, Contest Rules
- Contact dropdown: Contact, Pricing, Privacy Policy, Terms, Suggestions

**Mobile**: Hamburger menu with slide-out panel.

### Footer

Shared footer component on all pages except pages with `noFooter: true`.

- **Background**: `#12121a`
- **Padding**: 48px 24px
- **Border-top**: 1px solid `rgba(255, 255, 255, 0.1)`
- **Layout**: Logo + tagline left, nav links center, social icons right
- **Tagline**: "Bridging the Gap Between What Is and What Could Be."
- **Copyright**: "© 2025 Etheria Systems. All rights reserved."

**Social Icons**: YouTube (32px, hover `#FF0000`), Discord (32px, hover `#5865F2`)

---

## Shared Assets

### Logo

[ASSET: Image "etheria-logo"]
256x256px. The Etheria Systems logo — a stylized "E" mark rendered in cyan-to-purple gradient, clean geometric lines, modern and minimal. Dark background.

### Favicon

[ASSET: Image "favicon"]
32x32px. Small version of the Etheria "E" mark, suitable for browser tab display.

### Background Music

[ASSET: Audio "ambient-music"]
Ambient ethereal background music, 15-20 seconds loop. Dreamy, atmospheric pads with subtle electronic undertones. Low volume, optional playback.

---

## Global Interactions & Behaviors

### Philosophy

The interaction design follows a cinematic, smooth-scroll approach. Animations are gentle and fluid — never jarring. The glassmorphism system provides depth through subtle transparency and blur. Parallax effects on hero sections create an immersive, layered feel. All transitions use ease-out curves for natural deceleration.

### Custom Cursor (Desktop Only)

The site uses a custom cursor on desktop to reinforce the premium, tech-forward aesthetic.

- **Default state**: Small white dot, 8px diameter, centered on mouse position
- **Hover state (on links/buttons)**: Dot scales to 24px, gains `mix-blend-mode: difference`
- **Movement**: Follows mouse with slight delay (lerp factor ~0.15)
- **Hidden on**: Mobile devices, elements with `cursor: none`

### Scroll-Triggered Entrance Animations

All section content uses scroll-triggered entrance animations.

**Default Entrance — Fade Up**:
- Initial: `opacity: 0`, `translateY: 30px`
- Final: `opacity: 1`, `translateY: 0`
- Duration: 800ms
- Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (ease-out-quad)
- Trigger: When element enters viewport (threshold: 0.2)
- Stagger: 100ms between sibling elements

**Scale-In Variant**:
- Initial: `opacity: 0`, `scale: 0.95`
- Final: `opacity: 1`, `scale: 1`
- Same timing as Fade Up

### Parallax System

Hero section backgrounds use parallax scrolling on desktop.

- **Direction**: Background video moves slower than scroll content
- **Factor**: 0.5 (background moves at half the scroll speed)
- **Implementation**: `translateY` on the video element driven by scroll position
- **Disabled on**: Mobile devices

### Page Transitions

Route transitions between pages use a subtle fade:
- Outgoing page: Fade out 200ms
- Incoming page: Fade in 300ms with slight upward drift (translateY: 10px → 0)

### Scroll Snap (Product Pages)

Product pages (Quantum AI, Arcanum, etc.) use scroll-snap for full-viewport sections.
- Scroll snap: `y mandatory` on the container
- Each section: `scroll-snap-align: start`, `min-height: 100vh`
- Navigation clicks scroll to corresponding section

### Video Background Behavior

Hero sections feature looping video backgrounds:
- **Autoplay**: Yes, muted (browser autoplay policy)
- **Loop**: Yes, seamless
- **Object-fit**: Cover (fills viewport)
- **Overlay**: Semi-transparent dark gradient overlay for text readability
- **Fallback**: Static poster image while video loads
- **Mobile**: Poster image only (no video playback)

### Audio Playback

Background music on select pages:
- **Default**: Muted (user must enable)
- **Toggle**: Small speaker icon in corner
- **Behavior**: Plays when toggled on, persists during navigation

---

## Page-Specific Theming

Each product page has a unique accent color that overrides the default cyan/purple gradient for that page's hero title and accents:

| Page | Primary Accent | Title Effect |
|------|---------------|-------------|
| Home | Cyan-to-Purple gradient | Gradient text |
| Quantum AI | Purple `#8b5cf6` | Futuristic glow |
| Arcanum | Gold `#ffd700` | Golden gradient |
| DeadSpeak | Cyan `#00e5e5` | Spooky glow |
| Mastering Cards | Purple `#8b5cf6` | Elegant gradient |
| Etheria | Purple `#8b5cf6` | Ethereal glow |
