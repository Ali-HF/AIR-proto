TASK: Revamp the UI of the existing AIR Lab website (React + Vite + Tailwind + shadcn/ui) so it takes visual inspiration from https://www.mintlify.com. Keep all existing pages, routes, JSON data and the theme switcher working. Restyle, don't rebuild from scratch. Do NOT copy Mintlify's text, logos, illustrations or assets; recreate the style with our own lab content.

STEP 1: STUDY THE REFERENCE
Open https://www.mintlify.com in the browser in both light and dark mode. Take screenshots of each section and use DevTools to extract the actual colors, fonts, font sizes, border radii, spacing and animation behavior. Write these into a short design-tokens file (/src/styles/tokens.css) before changing any components.

STEP 2: STYLE DIRECTION (verify against the live site)
- Overall feel: clean, spacious, minimal, confident. Lots of whitespace, hairline 1px borders instead of heavy shadows, soft rounded corners (12 to 16px), pill-shaped buttons.
- Colors: near-white background and near-black text in light mode, true dark equivalents in dark mode, muted gray secondary text, and ONE fresh mint/green brand accent (Mintlify uses roughly #0D9373 with a lighter mint around #55D799; confirm by sampling).
- Typography: a modern geometric sans (Inter or Geist) with large, tightly tracked headlines (56 to 72px hero), and a mono font (Geist Mono or JetBrains Mono) for small labels and stats.
- Background: subtle grid or dot pattern that fades out with a radial mask, plus a faint glow behind the hero. Keep the animated neural-network hero from before, but make it subtle and monochrome/green so it feels like part of this style.
- Motion: gentle fade-up on scroll, animated number counters, hover states on cards (border brightens, slight lift), smooth scrolling. Respect prefers-reduced-motion.

STEP 3: MAP MINTLIFY SECTIONS TO OUR LAB CONTENT
- Announcement banner at the very top (e.g. "New: 2 research positions open") linking to the vacancy section. Later this connects to the vacancy indicator.
- Sticky top nav: logo, About, Team, Projects, Research & Blog, Gallery, a theme toggle, and a primary "Join the lab" pill button.
- Hero: large headline about the lab, one line of supporting text, two buttons (primary filled, secondary outlined), and a live-looking stats strip (publications, members, projects) using animated counters. Below it, a product-style preview card showing a featured paper or project.
- Logo marquee: "Industry collaborations" as a slow infinite logo row (grayscale logos, color on hover).
- Feature grid (Mintlify's six-block grid) becomes a bento grid of our research areas.
- Big stats row (like "300M+ visitors") becomes lab metrics.
- Customer-story cards with a large metric become Project highlight cards (title, category tag, one big number or outcome).
- Testimonials carousel becomes quotes from collaborators and alumni interns.
- "Latest updates" cards become Latest blogs and research papers.
- Team page: three tabs (Faculty, Postgraduate, Undergraduate) using clean profile cards.
- Projects page: four tab filters (Funded, R&D, Undergraduate, Postgraduate).
- Best Performers of the Month and Gallery restyled to match (leaderboard rows, masonry grid).
- Multi-column footer with link groups, social icons and a small status-style pill.

STEP 4: THEME SWITCHER
Keep the theme switcher. Make "Mint Light" the default and "Mint Dark" its pair, then keep 4 to 5 other palettes, all driven by CSS variables so the teacher can switch live.

STEP 5: COMPONENT SOURCES (use these instead of hand-writing everything)
- shadcn/ui (ui.shadcn.com): Button, Card, Tabs, Badge, Accordion, Navigation Menu, Sheet, Tooltip, Command. Install with npx shadcn@latest add <component>.
- React Bits (reactbits.dev): Count Up, Split Text / Blur Text, Spotlight Card, Logo Loop, Dot Grid, Aurora or Particles backgrounds.
- Magic UI (magicui.design): Marquee, Number Ticker, Bento Grid, Grid/Dot Pattern, Border Beam, Blur Fade.
- Aceternity UI (ui.aceternity.com): Bento grid, Spotlight, Background Beams, Sticky Scroll Reveal.
- 21st.dev: community shadcn-style sections (heroes, navbars, footers, testimonials).
- Uiverse.io: the theme toggle switch and small button or loader details.
- Icons: lucide-react (comes with shadcn). Fonts: Fontsource packages for Inter/Geist and Geist Mono.
- Motion: Framer Motion (motion.dev); optional Lenis for smooth scroll.
- Also use the UI UX Pro Max skill, recent.design and Mobbin for layout and interaction ideas.

STEP 6: QUALITY BAR
- Responsive from 360px up, accessible contrast in every theme, no layout shift, fast load.
- Keep components data-driven from /src/data/*.json.
- Show me a short plan and the design tokens first, then implement section by section, and give me screenshots of light and dark mode when done.