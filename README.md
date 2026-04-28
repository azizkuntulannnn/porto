# Minanul Aziz — Personal Portfolio

A modern, elegant, and interactive personal-branding website built with plain
HTML, CSS, and JavaScript — no build step required.

> "A curious mind crafting calm, thoughtful experiences at the intersection of
> technology, design, and good vibes."

## Features

- **Dark, minimalist UI** with glassmorphism, subtle gradients, and animated background orbs
- **Smooth scroll**, scroll-progress bar, and active-link spy
- **Reveal-on-scroll** animations and animated skill bars
- **Custom cursor** (desktop only) with hover state on interactive elements
- **Glowing tilt-light** effect on skill cards
- **Responsive** mobile drawer navigation
- **Accessible**: respects `prefers-reduced-motion`, semantic HTML, ARIA labels

## Sections

1. **Hero** — large name, tagline, CTAs, meta strip, scroll hint
2. **About Me** — short bio + animated `about.json` card
3. **Skills / Expertise** — six interactive cards with progress bars and chips
4. **Projects / Portfolio** — modern grid with gradient covers and hover effects
5. **Contact** — WhatsApp, Email, and social links inside a glass card

## Tech

- HTML5 / CSS3 (custom properties, grid, backdrop-filter)
- Vanilla JavaScript (IntersectionObserver, requestAnimationFrame)
- Google Fonts: **Inter** + **Space Grotesk**

## Run locally

The site is fully static. Just open `index.html` in any modern browser, or
serve it locally:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then visit <http://localhost:8000>.

## Project structure

```
.
├── index.html   # Markup for all sections
├── styles.css   # Design tokens, layout, animations
├── script.js    # Interactivity (scroll, cursor, reveal)
└── README.md
```

## Customize

- Update social links, WhatsApp number, and email in `index.html`
  (`#contact` section).
- Swap the project cards in `#projects` with your own work.
- Tweak the brand gradient in `styles.css` via the `--grad-1`…`--grad-4`
  CSS variables at the top of the file.
