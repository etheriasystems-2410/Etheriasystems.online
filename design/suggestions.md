# Suggestions Page

A feature request and suggestions page for Etheria Systems.

---

### Section: Hero

## Overview

Compact hero with page title and description.

## Background

- Background color: `#0a0a0f`

## Section Layout

- Section: width=100%, padding=120px 24px 60px (desktop), 100px 24px 40px (mobile)
  - Container: max-width=1200px, centered
    - Title: centered
    - Subtitle: centered

## Elements

**Element: "Page Title"**
- Content: "Suggestions"
- Font: H1 (48px desktop / 28px mobile), weight 700
- Color: `#e0e0f0`
- Text-align: center

**Element: "Page Subtitle"**
- Content: "We value your feedback! Share your ideas and help us improve Etheria Systems."
- Font: Body Large, color `#a0a0b8`
- Text-align: center
- Max-width: 600px
- Margin: 16px auto 0

## Entrance Animations

- Title: Fade Up, 800ms
- Subtitle: Fade Up, 800ms, delay 200ms

---

### Section: Suggestion Form

## Overview

A form for submitting feature requests and suggestions.

## Background

- Background color: `#0a0a0f`

## Section Layout

- Section: width=100%, padding=60px 24px (desktop), 40px 24px (mobile)
  - Container: max-width=800px, centered
    - Glassmorphism Card
      - Padding: 48px

## Elements

**Element: "Form Title"**
- Content: "Submit Your Idea"
- Font: H3 (24px), weight 600, color `#e0e0f0`
- Margin-bottom: 24px

**Element: "Name Input"**
- Label: "Your Name"
- Type: Text input
- Style: Dark input (same as contact form)

**Element: "Email Input"**
- Label: "Email Address"
- Type: Email input
- Same styling

**Element: "Product Select"**
- Label: "Which Product?"
- Type: Dropdown select
- Options: General, Quantum AI, Arcanum, DeadSpeak, Mastering the Cards, Etheria, Zohar
- Style: Dark select — background `#2a2a35`, border `rgba(255,255,255,0.1)`, color `#e0e0f0`

**Element: "Suggestion Type"**
- Label: "Type of Suggestion"
- Type: Dropdown select
- Options: Feature Request, Bug Report, Improvement, Other
- Same styling

**Element: "Description Textarea"**
- Label: "Describe Your Suggestion"
- Type: Textarea, 6 rows
- Placeholder: "Tell us about your idea in detail..."
- Same dark styling

**Element: "Submit Button"**
- Content: "Submit Suggestion"
- Style: Gradient Accent Button, full width
- Margin-top: 16px

## Entrance Animations

- Card: Fade Up, 800ms
- Form fields: Fade Up with stagger, 80ms between fields

---

### Section: FAQ

## Overview

A small FAQ section about the suggestions process.

## Background

- Background color: `#0a0a0f`

## Section Layout

- Section: width=100%, padding=80px 24px
  - Container: max-width=800px, centered
    - Glassmorphism Card
      - Padding: 48px

## Elements

**Element: "FAQ Title"**
- Content: "Frequently Asked Questions"
- Font: H3, weight 600, color `#e0e0f0`
- Margin-bottom: 24px

**Element: "FAQ Items"** (×3)
- Layout: Each item is a question + answer pair
- Question: Body, weight 600, color `#e0e0f0`, margin-top 20px
- Answer: Body, color `#a0a0b8`, margin-top 8px

**FAQ Content:**

**Q: What happens after I submit a suggestion?**
A: Our team reviews all submissions within 5-7 business days. If your suggestion is selected for development, we'll contact you via email.

**Q: Will I be credited for my suggestion?**
A: Yes! Contributors whose suggestions are implemented will be credited in our release notes and may receive exclusive perks.

**Q: Can I submit multiple suggestions?**
A: Absolutely! We encourage you to share as many ideas as you have. There's no limit to the number of suggestions you can submit.

## Entrance Animations

- Card: Fade Up, 800ms
- FAQ items: Fade Up with stagger

---

## Page Settings

| Property | Value |
|----------|-------|
| Route | `/suggestions` |
| Navigation | Full nav |
| Footer | Yes |
| Background | `#0a0a0f` |

---

## Component List

### shadcn/ui Components

| Component | Usage |
|-----------|-------|
| Button | Submit button |
| Input | Form fields |
| Textarea | Description field |
| Select | Dropdown fields |
| Label | Form labels |
