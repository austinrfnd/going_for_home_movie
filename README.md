# Going for Home

A promotional website for the documentary film about the Altadena community rebuilding after the Eaton Canyon fire, centered around a Little League season.

**Live Site:** [going-for-home.web.app](https://going-for-home.web.app)

## Overview

Going for Home is a cinematic single-page application showcasing the documentary with:

- Click-to-play video trailer (Vimeo integration)
- Parallax scrolling effects
- Scroll-triggered animations
- Mobile-responsive design
- Firebase Analytics tracking

## Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Hosting:** Firebase Hosting
- **Analytics:** Firebase Analytics
- **Fonts:** Google Fonts (Bebas Neue, Cormorant Garamond, Work Sans)

## Project Structure

```
going_for_home/
├── public/                   # Deployable assets
│   ├── index.html           # Main HTML with Firebase SDK
│   ├── main.js              # Navigation, animations, analytics
│   ├── styles.css           # Design system & components
│   └── assets/              # Images and media
├── requirements/            # Design specs & mockups
├── firebase.json            # Hosting configuration
├── .firebaserc              # Firebase project settings
└── STYLE_GUIDE.md           # Design system documentation
```

## Pages

1. **About** — Hero, synopsis, awards, press quotes
2. **Screenings** — Upcoming/past screenings, host a screening CTA
3. **Team** — Director, producer bios, full credits
4. **Contact** — Press, screenings, and general inquiries

## Local Development

No build step required. Serve the `public/` directory with any static server:

```bash
# Using Python
python -m http.server 8000 -d public

# Using Node
npx serve public
```

## Deployment

Deploy to Firebase Hosting:

```bash
firebase deploy
```

## Design System

See [STYLE_GUIDE.md](./STYLE_GUIDE.md) for the complete design system including:

- Color palette (dark cinematic theme with gold accents)
- Typography scale
- Component patterns
- Animation specifications
- Responsive breakpoints

## Documentation

| File | Description |
|------|-------------|
| `STYLE_GUIDE.md` | Design tokens, components, animations |
| `requirements/site-requirements.md` | Original project requirements |
| `requirements/design-spec-v3.1.md` | Design philosophy & interactions |
| `requirements/wireframes.md` | Layout wireframes |

## License

All rights reserved. This project is for the Going for Home documentary.
