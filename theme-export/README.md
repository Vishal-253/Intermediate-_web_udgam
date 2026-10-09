# Udgam "Cherry Blossom" theme

Pink cherry-blossom palette (OKLCH) for Tailwind CSS v4 + shadcn/ui (new-york).

## Install in a new project

1. `npm i tailwindcss @tailwindcss/vite tw-animate-css clsx tailwind-merge class-variance-authority lucide-react`
2. Copy `theme.css` to your global stylesheet (e.g. `src/styles.css`) and import it once at the app root.
3. Copy `components.json` to the project root and `utils.ts` to `src/lib/utils.ts`. Fix the paths if your layout differs.
4. Load the fonts by adding the Google Fonts `<link>` from the top of `theme.css`.
   With Next.js, use `next/font/google` (`Fraunces`, `Quicksand`) and keep the family names as they are in `--font-display` / `--font-sans`.
5. `npx shadcn@latest add button card …` gives you components that pick up the palette.

## Tokens

| Token | Value | Use |
|---|---|---|
| primary | oklch(0.62 0.17 355) | main pink |
| blossom | oklch(0.85 0.09 355) | soft petal pink |
| blossom-deep | oklch(0.55 0.19 358) | deep rose (gradient start) |
| leaf / accent | oklch(0.75 0.1 140) / oklch(0.88 0.08 140) | green accent |
| foreground | oklch(0.3 0.06 350) | dark plum text |
| background | oklch(0.975 0.015 350) | blush white |
| radius | 1.25rem | rounded, soft corners |

Gradients: `--gradient-blossom` (deep rose → coral, 135°) and `--gradient-sky` (page background, blush → warm cream).
Shadow: `--shadow-glow` (rose glow).

## Utilities
- `glass`: frosted panel (blur, translucent white, rose glow)
- `text-gradient`: rose→coral gradient text
- `btn-blossom`: gradient button with glow
- `font-display`: Fraunces serif. h1–h3 use it by default.

There is no dark mode. The source project has no `.dark` values.
