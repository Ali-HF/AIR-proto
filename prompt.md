PROJECT: Website for the new AI Research Lab (AIR Lab) at NED University of Engineering & Technology, Karachi.

SETUP
- Scaffold with Vite + React + TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, React Router.
- Frontend prototype only. No backend yet. Keep all content in /src/data/*.json (team.json, projects.json, publications.json, blogs.json, interns.json, collaborations.json, performers.json, gallery.json) with realistic placeholder content, so I can swap in real data and later replace it with a MERN API.
- Before designing anything, find and install the "UI UX Pro Max" skill and follow it. Then research these for inspiration and pull ideas (not copies): recent.design/websites, framer.com, mobbin, uiverse.io, and React Bits (use its components where they fit). Reference sites the lab head likes: allenai.org and ai.stanford.edu (credible, academic, clean), but our layout must feel different and more alive.

DESIGN GOALS
- Minimalistic, aesthetic, alive, and immersive at a MEDIUM level: an animated neural-network hero reacting to the cursor, plus smooth scroll effects. Not heavy 3D.
- It must NOT look like a generic AI template: no purple-gradient-on-black cliché, no stock robot imagery, no generic card grids everywhere. Use distinctive typography (a strong display font plus a clean sans and a mono accent), generous whitespace, and an unusual layout rhythm (asymmetry, large type, sticky side labels, varied section structures).
- AI-native visual ideas to use: a node-and-edge network hero; a "latent space" scatter plot as a way to explore team members/projects by research area; attention-heatmap style hover highlights on text; a scroll progress indicator styled as a loss curve; token-by-token text reveal on headings; the gallery styled as a feature-map grid; "best performers" styled as a leaderboard.
- Fully responsive, accessible (contrast, focus states, prefers-reduced-motion respected), and fast.

THEME SYSTEM (important)
- Build a theme switcher (floating panel, always visible) so I can show my teacher different options live. Use CSS variables/design tokens so all colors, fonts, and radii change instantly with no reload, and persist the choice in localStorage.
- Include light and dark modes AND at least 6 distinct palettes/themes, e.g. Midnight Neural (dark, cyan/violet), Paper Lab (light editorial, ink + one accent), Terminal (dark, green mono), Aurora (deep teal to magenta), Ember (warm dark, orange), and a NED-inspired blue/gold theme (placeholder colors). Each theme can also tweak the hero network's colors and the font pairing.

SITE STRUCTURE (pages/sections)
1. Home: hero, short About, highlights of projects, publications, best performers, and industry partners.
2. About: mission, vision, research areas.
3. Team, with three categories (tabs or filter): Faculty Members, Postgraduate Students, Undergraduate Students.
4. Previous Research Interns.
5. Industry Collaborations.
6. Projects, with four categories: Funded Projects, R&D Projects, Undergraduate Projects, Postgraduate Projects.
7. Blogs & Research Papers: one tab area where members' published papers (title, authors, venue, year, link) and blog posts live, with filters.
8. Best Performers of the Month.
9. Gallery.
10. Contact/footer.

DELIVERABLES
- A working dev server (npm run dev), clean component structure, reusable data-driven components, and a short README explaining how to edit content and add a theme.
- First give me a short plan (layout concept + font/palette choices) for approval, then build.