# Donate Page

A financial contribution page for Etheria Systems, featuring donation methods and supporter recognition.

---

### Section: Hero

## Overview

A compact hero section with the page title and heartfelt message about supporting the project.

## Background

- Background color: `#0a0a0f`
- No video

## Section Layout

- Section: width=100%, padding=120px 24px 60px (desktop), 100px 24px 40px (mobile)
  - Container: max-width=1200px, centered
    - Title: centered
    - Subtitle: centered

## Elements

**Element: "Page Title"**
- Content: "Support Etheria Systems"
- Font: H1 (48px desktop / 28px mobile), weight 700
- Color: Gradient text — `linear-gradient(90deg, #00e5e5, #8b5cf6)`
- Text-align: center

**Element: "Page Subtitle"**
- Content: "Your contributions help us continue building innovative software that bridges the gap between what is and what could be. Every donation, big or small, makes a difference."
- Font: Body Large (18px), weight 300
- Color: `#a0a0b8`
- Text-align: center
- Max-width: 700px
- Margin: 16px auto 0

## Entrance Animations

- Title: Fade Up, 800ms
- Subtitle: Fade Up, 800ms, delay 200ms

---

### Section: Donation Methods

## Overview

A grid of donation options presented in glassmorphism cards.

## Background

- Background color: `#0a0a0f`

## Section Layout

- Section: width=100%, padding=60px 24px 80px (desktop), 40px 24px (mobile)
  - Container: max-width=1200px, centered
    - Methods grid: 2 columns (desktop), 1 column (mobile), gap=24px
      - Donation Card × 4

## Elements

**Element: "Donation Card"** (×4)
- Style: Glassmorphism Card
- Padding: 32px
- Layout: Flex column, center aligned
  - Icon: 56px, centered
  - Method Name: H3, weight 600, color `#e0e0f0`, margin-top 16px, centered
  - Description: Body, color `#a0a0b8`, margin-top 8px, centered
  - Action Button: Gradient Accent Button or Outline Button, margin-top 16px

**Donation Methods:**

| # | Icon | Name | Description | Action |
|---|------|------|-------------|--------|
| 1 | CreditCard | Credit/Debit Card | Secure one-time or recurring donations via Stripe. | "Donate with Card" → Stripe link |
| 2 | Coffee | Buy Me a Coffee | Support with a small, one-time contribution. | "Buy a Coffee" → BMC link |
| 3 | Repeat | SubscribeStar | Monthly subscription support with exclusive perks. | "Subscribe" → SubscribeStar link |
| 4 | Bitcoin | Cryptocurrency | Donate using Bitcoin, Ethereum, or other major cryptocurrencies. | "Crypto Donation" → Wallet address modal |

## Entrance Animations

- Cards: Fade Up with stagger, 150ms between cards

## Interactions

**Card Hover**: Scale(1.02), border brightens

**Crypto Modal**: Clicking "Crypto Donation" opens a modal displaying wallet addresses for BTC and ETH.

---

### Section: Supporters

## Overview

A thank-you section acknowledging donors.

## Background

- Background color: `#0a0a0f`

## Section Layout

- Section: width=100%, padding=80px 24px
  - Container: max-width=800px, centered
    - Glassmorphism Card
      - Padding: 48px
      - Content: centered

## Elements

**Element: "Supporters Title"**
- Content: "Our Supporters"
- Font: H2, weight 700, color `#e0e0f0`
- Text-align: center

**Element: "Supporters Text"**
- Content: "We are deeply grateful to everyone who has supported Etheria Systems. Your generosity fuels our innovation."
- Font: Body, color `#a0a0b8`
- Text-align: center
- Margin-top: 16px

**Element: "Supporters List"**
- Content: "[Supporter names will appear here]"
- Font: Body, color `#a0a0b8`
- Text-align: center
- Margin-top: 24px
- Style: Italic, muted

## Entrance Animations

- All elements: Fade Up with stagger

---

## Page Settings

| Property | Value |
|----------|-------|
| Route | `/donate` |
| Navigation | Full nav |
| Footer | Yes |
| Background | `#0a0a0f` |

---

## Component List

### shadcn/ui Components

| Component | Usage |
|-----------|-------|
| Button | Donation action buttons |
| Dialog | Crypto wallet address modal |
