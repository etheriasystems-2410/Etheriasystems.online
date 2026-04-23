# Pricing Page

A pricing overview page displaying all product subscription tiers.

---

### Section: Hero

## Overview

Compact hero with page title.

## Background

- Background color: `#0a0a0f`

## Section Layout

- Section: width=100%, padding=120px 24px 60px (desktop), 100px 24px 40px (mobile)
  - Container: max-width=1200px, centered
    - Title: centered
    - Subtitle: centered

## Elements

**Element: "Page Title"**
- Content: "Pricing"
- Font: H1 (48px desktop / 28px mobile), weight 700
- Color: `#e0e0f0`
- Text-align: center

**Element: "Page Subtitle"**
- Content: "Choose the plan that works best for you. All plans include full access to the product's features."
- Font: Body Large, color `#a0a0b8`
- Text-align: center
- Max-width: 600px
- Margin: 16px auto 0

## Entrance Animations

- Title: Fade Up, 800ms
- Subtitle: Fade Up, 800ms, delay 200ms

---

### Section: Pricing Cards

## Overview

A grid of pricing cards for each product.

## Background

- Background color: `#0a0a0f`

## Section Layout

- Section: width=100%, padding=60px 24px 80px (desktop), 40px 24px (mobile)
  - Container: max-width=1200px, centered
    - Pricing grid: 3 columns (desktop), 2 columns (tablet), 1 column (mobile), gap=24px
      - Pricing Card × 5

## Elements

**Element: "Pricing Card"** (×5)
- Style: Glassmorphism Card
- Padding: 40px 32px
- Layout: Flex column, center aligned
  - Product Name: H3, weight 600, color `#e0e0f0`, centered
  - Price: Display size (48px), weight 700, color `#00e5e5`, centered, margin-top 16px
  - Period: Small text, color `#a0a0b8`, centered ("/month")
  - Features list: Body, color `#a0a0b8`, margin-top 24px
    - Checkmark + feature text, 12px vertical spacing
  - CTA Button: Gradient Accent Button, margin-top 32px, full width

**Pricing Content:**

| Product | Price | Features |
|---------|-------|----------|
| Quantum AI | $10.99/mo | Full AI access, Unlimited conversations, Priority support |
| Arcanum | $12.99/mo | Full knowledge library, All rituals, Astrological features |
| DeadSpeak | $12.99/mo | Full EVP suite, Unlimited sessions, Historical logs |
| Mastering the Cards | $8.99/mo | All lessons, Spread library, Daily draws |
| Etheria | $10.99/mo | Full AI companion, Emotional intelligence, Continuous learning |

## Entrance Animations

- Cards: Fade Up with stagger, 150ms between cards

## Interactions

**Card Hover**: Scale(1.02), border brightens to `rgba(255,255,255,0.2)`

---

### Section: Bundle CTA

## Overview

A call-to-action for a future bundle deal.

## Background

- Background color: `#0a0a0f`

## Section Layout

- Section: width=100%, padding=80px 24px
  - Container: max-width=800px, centered
    - Glassmorphism Card
      - Padding: 48px
      - Content: centered

## Elements

**Element: "Bundle Title"**
- Content: "Coming Soon: Etheria Bundle"
- Font: H2, weight 700, color `#e0e0f0`
- Text-align: center

**Element: "Bundle Description"**
- Content: "Get access to all Etheria Systems products at a discounted bundle price. Stay tuned for more details!"
- Font: Body, color `#a0a0b8`
- Text-align: center
- Margin-top: 12px

## Entrance Animations

- All elements: Fade Up with stagger

---

## Page Settings

| Property | Value |
|----------|-------|
| Route | `/pricing` |
| Navigation | Full nav |
| Footer | Yes |
| Background | `#0a0a0f` |

---

## Component List

### shadcn/ui Components

| Component | Usage |
|-----------|-------|
| Button | CTA buttons |

### Lucide React Icons

| Icon | Usage |
|------|-------|
| `Check` | Feature list items |
