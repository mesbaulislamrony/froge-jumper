# froge Jumper

A cheerful, no-rush typing adventure for young learners. froge Jumper is an original browser game built with React, TypeScript, and Vite. Its illustrated worlds use CSS and emoji—there are no external images, sound files, accounts, or services.

## Play

- Find the large target letter shown in the climbing scene and press it on a physical keyboard, or tap the target letter.
- Correct letters move your climber up. After 10 successful letters, the next adventure starts automatically.
- A wrong letter gives a gentle wobble and keeps the same target. Mistakes never erase completed steps or end the game.
- Use **Give me a hint** whenever you like. Toggle sound or restart an adventure from the top bar.
- Jungle Jamboree, Cloudtop Cove, and Starlight Station repeat in an endless loop. Restart any time with the restart button.

There is no timer, speed score, or game-over state. Children can take as long as they need.

## Local development

Requires Node.js 18 or newer and npm.

1. Install dependencies with `npm install`.
2. Start the development server with `npm run dev`.
3. Create and type-check the production build with `npm run build`.
4. Preview the production build locally with `npm run preview`.

## Deploy

### Vercel

Import the repository into Vercel. It detects Vite automatically; use `npm run build` as the build command and `dist` as the output directory.

### Netlify

Import the repository into Netlify. The included `netlify.toml` configures `npm run build` and publishes `dist`.

Both hosts support the static Vite output; no server or environment variables are required.
