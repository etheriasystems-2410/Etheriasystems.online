# Contact Page

A contact page with a contact form, email link, newsletter signup, and company information.

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
- Content: "Contact Us"
- Font: H1 (48px desktop / 28px mobile), weight 700
- Color: `#e0e0f0`
- Text-align: center

## Entrance Animations

- Title: Fade Up, 800ms

---

### Section: Contact Form

## Overview

A contact form for visitors to send messages to Etheria Systems.

## Background

- Background color: `#0a0a0f`

## Section Layout

- Section: width=100%, padding=60px 24px (desktop), 40px 24px (mobile)
  - Container: max-width=800px, centered
    - Glassmorphism Card
      - Padding: 48px

## Elements

**Element: "Form Title"**
- Content: "Send Us a Message"
- Font: H3 (24px), weight 600, color `#e0e0f0`
- Margin-bottom: 24px

**Element: "Name Input"**
- Label: "Your Name"
- Type: Text input
- Style: Dark input — background `#2a2a35`, border 1px solid `rgba(255,255,255,0.1)`, border-radius 8px, padding 12px 16px
- Text color: `#e0e0f0`
- Placeholder color: `#6b6b8a`
- Focus: Border color `#00e5e5`

**Element: "Email Input"**
- Label: "Email Address"
- Type: Email input
- Same styling as Name Input

**Element: "Subject Input"**
- Label: "Subject"
- Type: Text input
- Same styling

**Element: "Message Textarea"**
- Label: "Message"
- Type: Textarea, 5 rows
- Same styling

**Element: "Submit Button"**
- Content: "Send Message"
- Style: Gradient Accent Button, full width
- Margin-top: 16px

**Element: "Direct Email"**
- Content: "Or email us directly at: ethereasystems@gmail.com"
- Font: Body, color `#a0a0b8`
- Margin-top: 24px
- Email link: `#00e5e5`, hover underline

## Entrance Animations

- Card: Fade Up, 800ms
- Form fields: Fade Up with stagger, 80ms between fields

---

### Section: Newsletter

## Overview

Newsletter signup section.

## Background

- Background color: `#0a0a0f`

## Section Layout

- Section: width=100%, padding=80px 24px
  - Container: max-width=800px, centered
    - Glassmorphism Card
      - Padding: 48px
      - Content: centered

## Elements

**Element: "Newsletter Title"**
- Content: "Stay Updated"
- Font: H3, weight 600, color `#e0e0f0`
- Text-align: center

**Element: "Newsletter Description"**
- Content: "Subscribe to our newsletter for product updates, new releases, and exclusive offers."
- Font: Body, color `#a0a0b8`
- Text-align: center
- Margin-top: 12px

**Element: "Newsletter Form"**
- Layout: Flex row on desktop (input + button side by side), stacked on mobile
- Gap: 12px
- Margin-top: 24px
  - Email input: Same dark input styling, flex-grow 1
  - Submit button: Gradient Accent Button, "Subscribe"

## Entrance Animations

- All elements: Fade Up with stagger

---

## Page Settings

| Property | Value |
|----------|-------|
| Route | `/contact` |
| Navigation | Full nav |
| Footer | Yes |
| Background | `#0a0a0f` |

---

## Component List

### shadcn/ui Components

| Component | Usage |
|-----------|-------|
| Button | Submit buttons |
| Input | Form fields |
| Textarea | Message field |
| Label | Form labels |
