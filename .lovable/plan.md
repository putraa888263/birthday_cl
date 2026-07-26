# Luminous Devotion — Interactive Birthday Greeting

A single-page romantic birthday greeting built at `/` with elegant serif typography, rose/cream palette, floating hearts, and a playful "Will you be my date?" interaction where the No button runs from the cursor.

## Scope

Frontend-only. No backend, no auth, no database. All content editable via constants at the top of the page component.

## Page structure (single route: `src/routes/index.tsx`)

Replaces the placeholder index. One long scrollable page with three stacked sections inside a centered "gift card" container (max-width ~5xl, generously rounded, soft shadow, cream background).

1. **Hero Section**
   - Cream/pink silk-textured background (generated image) with subtle glitter/bokeh overlay
   - Small decorative script eyebrow: "To my beloved,"
   - Massive Playfair Display headline: "Happy Birthday, {RECIPIENT_NAME}"
   - Sub-line in script font
   - Floating heart particles (CSS-only: ~15 absolutely-positioned hearts with staggered `animate-fade-in` + custom float keyframe)
   - Scroll indicator chevron

2. **Heartfelt Wish Card**
   - Framed card (rounded-3xl, cream, rose-gold hairline border, soft shadow)
   - Serif heading "A Wish From My Heart"
   - Long-form paragraph (editable constant)
   - "Reveal Your Surprise" button → toggles a hidden panel showing a decorative gift illustration + short bonus message with `animate-scale-in` and a burst of extra hearts
   - Sign-off: script font "Forever yours," + sender name

3. **Date Proposal**
   - Heading: "Will you be my date tonight?"
   - Two buttons: **Yes** (primary rose) and **No** (outline)
   - **Yes** click → replaces section with celebratory confirmation card ("It's a date 💕" + time/place placeholder line, animated hearts burst)
   - **No** interaction → on `onMouseEnter` (and touch equivalent), the No button jumps to a new random position within the section bounds using `translate` transform with a spring-ish transition. After 4+ evasions, it shrinks and fades slightly. It never actually accepts clicks unless the cursor catches it standing still (which it won't).

## Design system updates (`src/styles.css`)

- Load Playfair Display + a script font (Dancing Script) via `<link>` tags in `src/routes/__root.tsx` head (per Tailwind v4 rules — no URL @import in CSS)
- Add `--font-serif: "Playfair Display", serif` and `--font-script: "Dancing Script", cursive` in `@theme`
- Override light-mode tokens for the romantic palette:
  - `--background`: soft cream (oklch approximation of #fff8f7)
  - `--primary`: rose pink (#f43f5e in oklch)
  - `--primary-foreground`: cream
  - `--accent`: rose gold
  - `--border`: warm blush
  - `--radius`: 1rem (Round Eight feel)
- Add `@utility` blocks for: `text-script`, `text-serif`, `bg-silk` (subtle radial gradient), and a `float-heart` animation (keyframes: translateY + rotate + opacity loop)

## Assets

Generate two images with `imagegen--generate_image`, stored under `src/assets/`:
- `silk-bg.jpg` — soft cream/blush silk fabric texture, luxurious, subtle sparkle
- `heart.png` (transparent) — small rose-gold heart glyph for particle system

## SEO / head

Update `src/routes/index.tsx` with its own `head()`:
- Title: "Happy Birthday, {RECIPIENT_NAME} — A Wish From {SENDER_NAME}"
- Description, og:title, og:description, og:type=website, twitter:card=summary_large_image

Remove the placeholder markup entirely.

## Customization surface

Top of `src/routes/index.tsx` exports plain constants:
```ts
const RECIPIENT_NAME = "..."
const SENDER_NAME = "..."
const WISH_MESSAGE = "..."
const SURPRISE_MESSAGE = "..."
const DATE_LINE = "Tonight, 8pm — our spot."
```

## Technical details

- All interactivity uses React `useState` + inline handlers; no extra libraries.
- Evasive No button: measure section rect with a ref, on hover set random `{x, y}` within bounds via `style.transform`, capped so it stays on-screen; transition ~250ms ease-out.
- Floating hearts: pure CSS animation via new `@utility float-heart`, randomized delay/duration via inline style per instance.
- Respect `prefers-reduced-motion`: hearts static, No button becomes clickable.
- Desktop-first layout; still readable and functional on mobile (No button evasion bounds shrink accordingly).

## Files touched

- `src/routes/index.tsx` — full rewrite (replaces placeholder)
- `src/routes/__root.tsx` — add Google Fonts `<link>` entries, update default title/meta
- `src/styles.css` — palette overrides, font tokens, custom utilities/keyframes
- `src/assets/silk-bg.jpg` — generated
- `src/assets/heart.png` — generated (transparent)

## Out of scope

Backend, saving responses, sharing links, multi-recipient support, admin editor UI, audio.
