# Going for Home — Style Guide

This document captures the design system for the "Going for Home" documentary website. Use this as a reference when maintaining or extending the site.

---

## Design Philosophy

**Theme:** Cinematic Dark with Premium Polish  
**Mood:** Prestige documentary, HBO/A24 aesthetic, emotionally weighty but hopeful  
**Inspiration:** Film festival sites, Criterion Collection, Ken Burns documentaries

---

## Color Palette

### CSS Custom Properties

```css
:root {
  /* Backgrounds */
  --bg-dark: #080808;        /* Primary background, near-black */
  --bg-card: #111111;        /* Card backgrounds, elevated surfaces */
  --bg-elevated: #1a1a1a;    /* Hover states, secondary surfaces */
  --bg-hover: #1f1f1f;       /* Interactive hover states */

  /* Text */
  --text-primary: #FAFAFA;   /* Headlines, primary text */
  --text-secondary: #A0A0A0; /* Body text, descriptions */
  --text-muted: #5A5A5A;     /* Labels, captions, tertiary text */

  /* Accents */
  --accent-gold: #C9A962;       /* Primary accent — buttons, highlights, links */
  --accent-gold-light: #E8D5A3; /* Title accent (second line of "Home") */

  /* Borders */
  --border: #222222;         /* Subtle dividers, card borders */
  --border-light: #333333;   /* Lighter borders for emphasis */
}
```

### Usage Guidelines

- **Gold accent** (`#C9A962`) is used sparingly for maximum impact — section labels, hover states, and the play button
- The gold evokes film festival laurels and prestige cinema
- Maintain high contrast between text and backgrounds for readability

---

## Typography

### Font Stack

| Purpose | Font Family | Fallback |
|---------|-------------|----------|
| Display | Bebas Neue | Impact, sans-serif |
| Serif | Cormorant Garamond | Georgia, serif |
| Sans-serif | Work Sans | -apple-system, sans-serif |

### Font Loading

```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Work+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
```

### Type Scale

| Element | Font | Size | Weight | Letter-spacing |
|---------|------|------|--------|----------------|
| Hero Title | Bebas Neue | `clamp(4rem, 12vw, 9rem)` | 400 | 0.03em |
| Page Header | Bebas Neue | `clamp(3rem, 8vw, 5.5rem)` | 400 | 0.08em |
| Section Title | Bebas Neue | 3.5rem | 400 | 0.03em |
| Section Label | Cormorant Garamond | 0.85rem | 400 italic | 0.15em |
| Body Text | Cormorant Garamond | 1.2rem | 300 | — |
| Nav Links | Work Sans | 0.75rem | 500 | 0.15em |
| Buttons | Work Sans | 0.75rem | 500-600 | 0.18em |
| Captions | Work Sans | 0.65rem | 400 | 0.15-0.25em |

### Special Typography Treatments

**Hero Title Split:**
```css
.hero-title span { display: block; }
.hero-title span:last-child { color: var(--accent-gold-light); }
```

**Drop Cap (Synopsis):**
```css
.synopsis-full p:first-of-type::first-letter {
  font-size: 4rem;
  float: left;
  line-height: 1;
  margin-right: 12px;
  margin-top: 6px;
  color: var(--accent-gold);
}
```

---

## Spacing

### Container

```css
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 32px;
}
```

### Section Padding

| Breakpoint | Section Padding |
|------------|-----------------|
| Desktop | 100px 0 |
| Mobile (≤768px) | 72px 0 |

### Common Spacing Values

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Tight spacing, label margins |
| sm | 8-12px | Icon gaps, small margins |
| md | 16-24px | Component internal spacing |
| lg | 32-48px | Section gaps, card padding |
| xl | 64-80px | Major section separations |
| xxl | 100-120px | Page sections, footer margin |

---

## Component Patterns

### Buttons

**Gold Outline (Primary CTA):**
```css
.hero-play {
  padding: 18px 36px;
  border: 1px solid var(--accent-gold);
  color: var(--accent-gold);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
```

**Solid Gold (CTA):**
```css
.btn {
  padding: 18px 48px;
  background: var(--accent-gold);
  color: var(--bg-dark);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
```

**White Outline (Secondary):**
```css
.screening-link {
  padding: 16px 32px;
  border: 1px solid var(--text-primary);
  color: var(--text-primary);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
```

### Cards

**Standard Card:**
```css
background: var(--bg-card);
border: 1px solid var(--border);
transition: background 0.3s;
```

**Card Hover:**
```css
background: var(--bg-elevated);
```

### Navigation

**Fixed Nav Bar:**
```css
.nav {
  position: fixed;
  background: rgba(8, 8, 8, 0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
```

**Nav Link Underline:**
```css
.nav-links a::after {
  width: 0;
  height: 1px;
  background: var(--accent-gold);
  transition: width 0.3s;
}
.nav-links a:hover::after { width: 100%; }
```

### Section Labels

```css
.section-label {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 0.85rem;
  font-style: italic;
  letter-spacing: 0.15em;
  color: var(--accent-gold);
  display: flex;
  align-items: center;
  gap: 20px;
}
.section-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, var(--border), transparent);
}
```

---

## Animation Timing & Effects

### Easing Functions

| Name | Value | Usage |
|------|-------|-------|
| Standard | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Most transitions |
| Linear | `ease` | Simple fades |

### Transition Durations

| Duration | Usage |
|----------|-------|
| 0.3s | Hover states, color changes |
| 0.4s | Button fills, nav transitions |
| 0.5s | Page transitions, media states |
| 0.8s | Reveal animations |
| 1.0s | Hero entrance animations |

### Keyframe Animations

**Fade Up (Hero Elements):**
```css
@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
}
/* Usage: animation: fadeUp 1s 0.3s forwards; */
```

**Scroll Pulse (Scroll Indicator):**
```css
@keyframes scrollPulse {
  0%, 100% { opacity: 0.5; transform: scaleY(1); }
  50% { opacity: 1; transform: scaleY(1.1); }
}
```

### Hero Load Sequence

| Element | Delay |
|---------|-------|
| Eyebrow | 0.3s |
| Title | 0.5s |
| Media | 0.7s |
| Tagline | 0.7s |
| Play Button | 0.9s |
| Scroll Indicator | 1.0s |

### Reveal Animation (Scroll-triggered)

```css
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s, transform 0.8s;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Stagger Classes:**
- `.reveal-delay-1` — 0.1s delay
- `.reveal-delay-2` — 0.2s delay
- `.reveal-delay-3` — 0.3s delay

### Button Fill Animation

```css
.button::before {
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.button:hover::before {
  transform: scaleX(1);
}
```

### Parallax Effects

| Element | Speed |
|---------|-------|
| Hero Background | 40% of scroll (`scrollY * 0.4`) |
| Parallax Section | 20% relative to section |

---

## Responsive Breakpoints

### Breakpoint Values

| Name | Max-width | Usage |
|------|-----------|-------|
| Tablet | 900px | Container padding, stats wrap, credits single column |
| Mobile | 768px | Nav collapse, typography scale down, grid stacking |

### 900px Breakpoint Changes

```css
@media (max-width: 900px) {
  .container { padding: 0 24px; }
  .nav-inner { padding: 16px 24px; }
  .film-stats { gap: 32px; flex-wrap: wrap; }
  .credits-grid { grid-template-columns: 1fr; }
}
```

### 768px Breakpoint Changes

```css
@media (max-width: 768px) {
  /* Navigation */
  .nav-links { display: none; }
  .nav-toggle { display: block; }

  /* Typography */
  .hero-title { font-size: 3.5rem; }
  .hero-tagline { font-size: 1.1rem; }
  .section-title { font-size: 2.5rem; }
  .page-header h1 { font-size: 3rem; }
  .quote p { font-size: 1.5rem; }

  /* Layout */
  .section { padding: 72px 0; }
  .screening-item { grid-template-columns: 1fr; gap: 12px; }
  .team-member { grid-template-columns: 1fr; gap: 32px; }
  .team-photo { max-width: 180px; }
  .contact-grid { grid-template-columns: 1fr; }
  .page-header { padding: 140px 0 60px; }

  /* Components */
  .host-cta { padding: 64px 32px; margin: 64px 0; }
  .host-cta h3 { font-size: 2.25rem; }
  .footer-inner { flex-direction: column; gap: 16px; text-align: center; }
}
```

---

## Accessibility Notes

- All interactive elements have visible focus states (inherits from hover)
- Mobile menu has aria-labels on toggle buttons
- Video iframe has descriptive title attribute
- Color contrast: Gold on dark passes WCAG AA for large text
- Consider adding `prefers-reduced-motion` media query to disable parallax/animations

---

## Performance Considerations

- Parallax uses `passive: true` scroll listener
- `will-change: transform` on animated backgrounds
- Noise texture is inline SVG data URI (no extra request)
- Consider lazy-loading images in production
