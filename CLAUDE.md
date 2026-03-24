# CLAUDE.md — FPT Game Project Context

> **Purpose**: This file gives AI assistants full context about this project so they can write accurate, consistent code without repeated explanations.

---

## Project Overview

**FPT Game** is a **browser-based simulation/strategy game** where the player experiences life as an FPT University student over 30 in-game days. The player navigates a pixel-art campus map, makes decisions, manages stats (health, intelligence, confidence, progress, money), completes quests, and interacts with university systems.

**Theme**: FPT University campus life — Vietnamese language UI throughout.

**GitHub**: `https://github.com/khanh020905/FPT-Game.git`

---

## Tech Stack

| Layer       | Technology                                                  |
| ----------- | ----------------------------------------------------------- |
| Framework   | **React 19** (JSX, no TypeScript)                           |
| Build Tool  | **Vite 7** (`@vitejs/plugin-react`)                         |
| Styling     | **Tailwind CSS v4** (`@tailwindcss/vite` plugin)            |
| UI Library  | **shadcn/ui** (New York style, JSX, `lucide-react` icons)   |
| Animation   | **Motion** (Framer Motion v12) + CSS keyframe animations    |
| Components  | **Radix UI** primitives, **class-variance-authority (CVA)** |
| Utilities   | `clsx`, `tailwind-merge`                                    |
| Font        | Google Fonts: **Press Start 2P** (pixel), **Inter** (UI)    |
| Package Mgr | **npm**                                                     |

---

## Project Structure

```
FPT_Game/
├── index.html                  # Entry point
├── vite.config.js              # Vite config with React + Tailwind plugins
├── components.json             # shadcn/ui configuration
├── package.json
├── src/
│   ├── main.jsx                # React root mount
│   ├── App.jsx                 # App router (Start → Playing → GameOver)
│   ├── index.css               # Design tokens, animations, glass-card styles
│   │
│   ├── engine/                 # 🎮 Core Game Engine
│   │   ├── GameContext.jsx     # React Context + useReducer (central state)
│   │   ├── gameReducer.js      # All state transitions (MOVE_TO, PERFORM_ACTION, etc.)
│   │   ├── fateEngine.js       # RNG event generator (morning events, encounters)
│   │   ├── events.js           # Event definitions (morning events data)
│   │   └── canvasMapRenderer.js # HTML5 Canvas map rendering logic
│   │
│   ├── components/             # 🖼️ UI Components
│   │   ├── GameCanvas.jsx      # Main game canvas (keyboard input, rendering)
│   │   ├── PlayerHUD.jsx       # Left sidebar — stats, inventory, quests
│   │   ├── EventModal.jsx      # Random event dialog
│   │   ├── DayTransition.jsx   # Day change animation overlay
│   │   ├── StartScreen.jsx     # Main menu / start screen
│   │   ├── CampusMap.jsx       # Campus location map view
│   │   ├── ADaySection.jsx     # "A Day at FPT" section
│   │   ├── BuildingLandingPage.jsx  # Building detail pages
│   │   ├── FPTLandingPage.jsx  # Landing page (marketing)
│   │   ├── faq-founder.jsx     # FAQ / Founder section
│   │   └── timeline-animation.jsx
│   │
│   ├── systems/                # 🔧 Game Sub-Systems (modal overlays)
│   │   ├── LukApp.jsx          # LUK (Learning Unit Kit) app system
│   │   ├── ShopSystem.jsx      # In-game shop (buy items)
│   │   ├── MentorSystem.jsx    # Mentor consultation system
│   │   └── SubmissionHub.jsx   # Assignment submission hub
│   │
│   ├── data/                   # 📦 Static Game Data
│   │   ├── buildingData.js     # Campus building definitions
│   │   ├── mapData.js          # Map layout, zones, spawn points
│   │   ├── items.js            # Shop items and effects
│   │   ├── quests.js           # Quest definitions and requirements
│   │   └── mentorTips.js       # Mentor advice text
│   │
│   ├── utils/
│   │   └── helpers.js          # Utility functions (clamp, chance, pickRandom)
│   │
│   ├── lib/
│   │   └── utils.js            # shadcn/ui utility (cn function)
│   │
│   └── assets/                 # Static assets (images, sprites)
│
├── ui/                         # External UI components/prototypes
│   └── team-clippath/
└── public/                     # Public static files
```

---

## Architecture Patterns

### State Management

- **React Context + useReducer** pattern (no external state library)
- Single `GameContext` wraps the entire app
- `gameReducer.js` handles ALL state transitions via action dispatch
- Available actions: `NEW_GAME`, `LOAD_GAME`, `SAVE_GAME`, `MOVE_TO`, `PERFORM_ACTION`, `APPLY_EVENT`, `DISMISS_EVENT`, `BUY_ITEM`, `USE_ITEM`, `OPEN_SYSTEM`, `CLOSE_SYSTEM`, `UPDATE_PLAYER_POS`, `CANVAS_INTERACT`, `CLEAR_NOTIFICATION`

### Game Loop

1. **Start Screen** → Player starts or loads game
2. **Day Cycle** → Each day: morning event (60% chance) → player actions (max 4/day) → day advances
3. **Player Movement** → Canvas-based with keyboard controls, interaction zones near buildings
4. **Events** → Weighted random selection, adjusted by player stats
5. **Game Over** → Health ≤ 0, Progress ≤ 0, or Money < -500,000₫

### Rendering

- **HTML5 Canvas** for the campus map (pixel-art style with `image-rendering: pixelated`)
- **React components** for UI overlays (HUD, modals, systems)
- `canvasMapRenderer.js` handles all map drawing logic

### Persistence

- `localStorage` key: `fpt-game-save` — save/load full game state as JSON

---

## Coding Conventions

### General

- **Language**: JavaScript (JSX), NO TypeScript
- **Module system**: ES Modules (`import`/`export`)
- **Component style**: Function components with hooks
- **State**: Always use `useGame()` hook to access game state and dispatch
- **Path alias**: `@/` maps to `./src/` (configured in `vite.config.js`)

### Naming

- **Components**: PascalCase files and exports (`GameCanvas.jsx`, `PlayerHUD.jsx`)
- **Engine/Data files**: camelCase (`gameReducer.js`, `fateEngine.js`, `buildingData.js`)
- **CSS classes**: Tailwind utilities + custom classes like `.glass-card`, `.neon-text`, `.stat-bar`
- **Game locations**: kebab-case IDs (`alpha-tower`, `gamma-tower`, `dorm-a`, `canteen`)
- **Actions/Events**: kebab-case IDs (`kiem-tra-dot-xuat`, `gap-senior`, `free-food`)

### Styling

- **Primary approach**: Tailwind CSS v4 utility classes inline
- **Design tokens**: Defined in `src/index.css` under `@theme` block
- **Color palette**:
  - FPT Brand: `fpt-orange` (#f37021), `fpt-blue` (#1e3a5f)
  - Neon accents: cyan, pink, green, yellow, purple
  - Dark theme: `dark-bg` (#0a0e17), `dark-card` (#111827), `dark-surface` (#1a1f2e)
- **Glass effect**: Use `.glass-card` class for transparent card overlays
- **Gradients**: FPT gradient = `from-[#f37021] to-[#ff2d95]`

### Vietnamese Content

- All UI text is in **Vietnamese**
- Use Vietnamese diacritics correctly (e.g., "Trí Tuệ", "Sức Khỏe", "Tiến Độ")
- Currency format: `toLocaleString()` + "đ" suffix

---

## Key Game Mechanics

| Stat         | Range   | Color Variable        | Description                    |
| ------------ | ------- | --------------------- | ------------------------------ |
| Health (HP)  | 0-100   | `hp-green` / `hp-red` | Physical/mental wellbeing      |
| Intelligence | 0-100   | `intel-blue`          | Academic ability               |
| Confidence   | 0-100   | `conf-yellow`         | Self-confidence / social skill |
| Progress     | 0-100%  | `progress-orange`     | Academic completion            |
| Money        | -∞ to ∞ | `money-emerald`       | Vietnamese Dong (₫)            |

### Locations

`canteen`, `alpha-tower`, `beta-tower`, `gamma-tower`, `dorm-a`, `dorm-b`

### Systems (opened via `OPEN_SYSTEM` action)

- `luk-app` — Only at gamma-tower
- `shop` — Buy items with money
- `mentor` — Get academic advice
- `submission` — Submit assignments

---

## Development Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # ESLint
```

---

## Important Notes for AI Assistants

1. **Always use the `useGame()` hook** — never import `GameContext` directly for consuming state
2. **Dispatch actions through the context** — don't modify state directly
3. **Canvas rendering is separate from React** — `canvasMapRenderer.js` uses raw Canvas API, not React
4. **stat effects must be clamped** — use `clamp()` from `helpers.js` (0-100 range for most stats)
5. **New game data** goes in `src/data/` — events in `engine/events.js`
6. **New UI systems** go in `src/systems/` as modal overlays — wire them in `App.jsx`'s `GameScreen`
7. **Keep pixel-art aesthetic** — the game canvas uses pixelated rendering
8. **Vietnamese text only** for player-facing UI; code comments can be English
9. **No router library** — routing is handled by `gamePhase` state (`start` → `playing` → `gameover`)
10. **shadcn/ui components** are configured for JSX (not TSX) — use `npx shadcn@latest add <component>` to add new ones
