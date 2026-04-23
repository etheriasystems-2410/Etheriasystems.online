# Products Page

A dedicated product showcase page displaying all Etheria Systems offerings in a grid layout with pricing information.

---

### Section: Hero

## Overview

A compact hero section with the page title and brief introduction.

## Background

- Background color: `#0a0a0f`
- No video — clean, minimal

## Section Layout

- Section: width=100%, padding=120px 24px 60px (desktop), 100px 24px 40px (mobile)
  - Container: max-width=1200px, centered
    - Title: centered
    - Subtitle: centered

## Elements

**Element: "Page Title"**
- Content: "Our Products"
- Font: H1 size (48px desktop / 28px mobile), weight 700
- Color: `#e0e0f0`
- Text-align: center

**Element: "Page Subtitle"**
- Content: "Discover our suite of innovative applications designed to expand your horizons."
- Font: Body Large (18px), weight 300
- Color: `#a0a0b8`
- Text-align: center
- Max-width: 600px
- Margin: 16px auto 0

## Entrance Animations

- Title: Fade Up, duration 800ms
- Subtitle: Fade Up, duration 800ms, delay 200ms

---

### Section: Product Grid

## Overview

A responsive grid showcasing all six Etheria Systems products. Each product card includes an image, name, description, pricing, and action buttons.

## Background

- Background color: `#0a0a0f`

## Section Layout

- Section: width=100%, padding=60px 24px 80px (desktop), 40px 24px (mobile)
  - Container: max-width=1200px, centered
    - Product Grid: 3 columns (desktop), 2 columns (tablet), 1 column (mobile), gap=24px
      - Product Card × 6

## Elements

**Element: "Product Card"** (×6)
- Style: Glassmorphism Card (from design.md)
- Padding: 24px
- Layout: Flex column
  - Image: aspect-ratio 16/9, border-radius 8px, object-fit cover
  - Product Name: H3 size, weight 600, color `#e0e0f0`, margin-top 16px
  - Description: Body size, color `#a0a0b8`, margin-top 8px
  - Price: Body Large, weight 600, color `#00e5e5`, margin-top 12px
  - Button Group: Flex row, gap 12px, margin-top 16px
    - "Learn More" button: Outline Button style
    - "Buy Now" button: Gradient Accent Button (smaller variant)

**Product Card Content:**

| # | Name | Description | Price | Learn Link |
|---|------|-------------|-------|------------|
| 1 | Quantum AI | Experience the future of AI-driven conversations with our advanced neural interface. | $10.99/mo | /quantum-ai |
| 2 | Arcanum | Unlock ancient wisdom and mystical knowledge through modern digital experiences. | $12.99/mo | /arcanum |
| 3 | DeadSpeak | Push the boundaries of communication beyond the physical realm. | $12.99/mo | /deadspeak |
| 4 | Mastering the Cards | Learn the ancient art of tarot reading with interactive digital lessons. | $8.99/mo | /mastering-cards |
| 5 | Etheria | Explore our flagship AI entity and companion. | $10.99/mo | /etheria |
| 6 | Zohar | Coming Soon — Our next breakthrough in spiritual technology. | TBA | # |

**Card 6 (Zohar)** — Special styling:
- Image replaced with "Coming Soon" placeholder
- "Buy Now" button disabled (opacity 0.5)
- Slight overlay: `rgba(10, 10, 15, 0.5)` over the card

## Entrance Animations

- Product Cards: Fade Up with stagger, 150ms between each card

## Interactions

**Product Card Hover**:
- Card: Scale(1.02), border color brightens
- Image: Scale(1.05) within container
- Duration: 300ms ease-out

## Assets

[ASSET: Image "product-quantum-ai-grid"]
800x450. Abstract futuristic AI visualization — glowing purple neural network nodes on dark background, streams of cyan data flowing between connections.

[ASSET: Image "product-arcanum-grid"]
800x450. Mystical golden orb surrounded by ancient symbols and soft golden light particles on dark background.

[ASSET: Image "product-deadspeak-grid"]
800x450. Ethereal blue-green spectral mist with faint spirit silhouettes in darkness.

[ASSET: Image "product-mastering-cards-grid"]
800x450. Elegant tarot cards fanned on dark velvet with golden and purple lighting.

[ASSET: Image "product-etheria-grid"]
800x450. Abstract AI entity visualization — flowing purple and cyan light forming a humanoid silhouette.

[ASSET: Image "product-coming-soon"]
800x450. Dark background with subtle geometric grid pattern and "Coming Soon" text area.

---

## Page Settings

| Property | Value |
|----------|-------|
| Route | `/products` |
| Navigation | Full nav |
| Footer | Yes |
| Background | `#0a0a0f` |

---

## Component List

### shadcn/ui Components

| Component | Usage |
|-----------|-------|
| Button | Card action buttons |

### Lucide React Icons

| Icon | Usage |
|------|-------|
| `ArrowRight` | Learn More buttons |
| `ShoppingCart` | Buy Now buttons |
