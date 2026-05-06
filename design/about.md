# About Page

A detailed about page featuring the founder Lacy Easter, the company mission, and company background.

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

## Elements

**Element: "Page Title"**
- Content: "About Etheria Systems"
- Font: H1 (48px desktop / 28px mobile), weight 700
- Color: `#e0e0f0`
- Text-align: center

## Entrance Animations

- Title: Fade Up, 800ms

---

### Section: Founder Profile

## Overview

Detailed founder profile with large photo and extended bio.

## Background

- Background color: `#0a0a0f`

## Section Layout

- Section: width=100%, padding=60px 24px (desktop), 40px 24px (mobile)
  - Container: max-width=1200px, centered
    - Glassmorphism Card
      - Layout: 2 columns on desktop (image left 40%, text right 60%), stacked on mobile
      - Gap: 48px
      - Padding: 48px

## Elements

**Element: "Founder Photo"**
- Dimensions: Full width of column, border-radius 16px
- Object-fit: cover
- Max-height: 500px

**Element: "Founder Name"**
- Content: "Lacy Easter"
- Font: H2 (36px), weight 700
- Color: Gradient text — `linear-gradient(90deg, #00e5e5, #8b5cf6)`

**Element: "Founder Role"**
- Content: "Founder & Developer"
- Font: Body Large, weight 500
- Color: `#00e5e5`
- Margin-top: 8px

**Element: "Bio Paragraph 1"**
- Content: "Lacy Easter is the visionary founder and sole developer behind Etheria Systems, a cutting-edge software company dedicated to bridging the gap between what is and what could be."
- Font: Body, color `#a0a0b8`
- Margin-top: 16px

**Element: "Bio Paragraph 2"**
- Content: "With a passion for innovation and a deep understanding of emerging technologies, Lacy has single-handedly crafted a suite of groundbreaking applications. Each product reflects a unique blend of technical expertise and creative vision, designed to push boundaries and explore new frontiers in human-technology interaction."
- Font: Body, color `#a0a0b8`
- Margin-top: 12px

**Element: "Bio Paragraph 3"**
- Content: "When not coding, Lacy explores the intersection of technology and spirituality, drawing inspiration from ancient wisdom traditions and cutting-edge scientific research to create truly unique digital experiences."
- Font: Body, color `#a0a0b8`
- Margin-top: 12px

## Entrance Animations

- Photo: Scale-In, 800ms
- Text: Fade Up with stagger, 100ms between elements

## Assets

[ASSET: Image "founder-photo-large"]
800x1000. Full portrait of the tech founder — confident, approachable. Dark background with subtle cyan/purple rim lighting. Modern startup aesthetic. Well-lit, professional yet casual.

---

### Section: Mission

## Overview

Company mission statement in a glassmorphism card.

## Background

- Background color: `#0a0a0f`

## Section Layout

- Section: width=100%, padding=80px 24px
  - Container: max-width=800px, centered
    - Glassmorphism Card
      - Padding: 48px
      - Content: centered

## Elements

**Element: "Mission Title"**
- Content: "Our Mission"
- Font: H2, weight 700, color `#e0e0f0`
- Text-align: center

**Element: "Mission Text"**
- Content: "At Etheria Systems, we believe technology should expand human potential, not limit it. Our mission is to create software that bridges the gap between what is and what could be — tools that empower exploration, foster connection, and unlock new dimensions of human experience."
- Font: Body Large, color `#a0a0b8`
- Text-align: center
- Margin-top: 16px

## Entrance Animations

- All elements: Fade Up with stagger

---

## Page Settings

| Property | Value |
|----------|-------|
| Route | `/about` |
| Navigation | Full nav |
| Footer | Yes |
| Background | `#0a0a0f` |
