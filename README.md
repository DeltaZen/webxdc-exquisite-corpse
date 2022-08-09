# exquisite-corpse.xdc

A social creative writing game for Delta Chat.

## Features

1. React
2. TypeScript
3. Tailwind CSS
4. Vite

## Development

    1. Clone the repository
    2. Run `pnpm i`
    3. Run `pnpm dev`

`index.html` is the main file for your app. There we have `<div id="react-code" class="..."></div>` where we will render our react app.

`src/index.jsx` is where we have our react code

`src/input.css` is the main CSS file

In `manifest.toml` change `name` to your app name (the other keys are optional for simplebot)

Change `icon.png` to your app icon

In `.jsziprc.json` is the configuration for how to build your app.

# Build

Run `pnpm build`, the output file is saved in `dist/package.xdc`
