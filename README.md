# 🎨 Component Styler

A React-based visual component styler and composition tool. Drag UI components onto a canvas, customize their styles visually, and save/load style configurations.

## Features

- **Drag-and-drop canvas** — Drag components from the palette onto the canvas and reposition them freely
- **Component palette** — Button, Text Input, Text Area, Card, Heading, Paragraph, Image placeholder, Divider
- **Visual style editor** — Edit colors, typography, spacing, borders, sizing, and effects in real time
- **Save configurations** — Name and save canvas states to localStorage
- **Load / Delete** — Restore any saved configuration with one click; delete ones you no longer need
- **Search / Filter** — Filter saved configurations by name instantly
- **Light & Dark mode** — Toggle the app theme with a single button
- **Responsive design** — Adapts to smaller screens

## Technologies Used

- [React](https://react.dev/) — UI library with hooks (`useState`, `useEffect`, `useContext`)
- [@dnd-kit/core](https://dndkit.com/) — Accessible drag-and-drop
- CSS Custom Properties — Theme system (light / dark)
- `localStorage` — Persistent configuration storage

## Getting Started

```bash
cd component-styler
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

1. **Add a component** — Drag any item from the left palette onto the canvas
2. **Select a component** — Click it on the canvas to open the style editor on the right
3. **Edit styles** — Change colors, fonts, spacing, borders, sizing, and effects
4. **Reposition** — Drag components around the canvas to arrange them
5. **Save** — Click **Configs** → type a name → press **Save**
6. **Load** — Click the 📂 button next to a saved config to restore it
7. **Theme** — Click 🌙 / ☀️ in the toolbar to toggle light/dark mode

## Building for Production

```bash
npm run build
```

The optimized build is output to `component-styler/build/`.

## Deployment

This project is configured for GitHub Pages deployment:

```bash
npm run deploy
```

## Project Structure

```
component-styler/src/
├── components/
│   ├── Canvas.js / Canvas.css          # Drop zone + component layout
│   ├── CanvasComponent.js              # Individual draggable canvas item
│   ├── ComponentPalette.js / .css      # Left-side component library
│   ├── StyleEditor.js / .css           # Right-side style panel
│   ├── ConfigPanel.js / .css           # Save/load/search panel
│   └── Toolbar.js / .css              # Top navigation bar
├── context/
│   └── ThemeContext.js                 # Light/dark theme context
├── hooks/
│   └── useLocalStorage.js             # Persistent state hook
├── utils/
│   └── componentUtils.js              # Component types, style helpers
├── App.js                             # Root component + DnD logic
└── App.css                            # Global styles + CSS variables
```
