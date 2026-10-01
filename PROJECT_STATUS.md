# PROJECT_STATUS.md

## Current Milestone
**Milestone 1: Real Playable HD-2D Foundation & New Moon Village Prototype** (Completed & Verified)

## Deployed URL & GitHub Pages
- **Target URL**: [https://Galactus2099.github.io/nightfall-monster-rpg/](https://Galactus2099.github.io/nightfall-monster-rpg/)
- **Build & Deployment Workflow**: Configured in `.github/workflows/deploy.yml` with triggers on `push` (to `main` and `jules-*` branches), `pull_request` (to `main`), and `workflow_dispatch`.
- **Pages Note**: GitHub Pages must be enabled in repo settings (Settings -> Pages -> Source: GitHub Actions) for automatic deployment upon PR merge or workflow run.

## Playable Features & Completed Systems
- **Three.js HD-2D Engine Base**: Integrated WebGLRenderer with soft PCF shadow mapping, exponential atmospheric foggy glow, and dynamic day/night ambient & directional lighting transitions.
- **Camera Follow System**: Angled 2.5D perspective camera smoothly tracking player movement without jitter.
- **Input System**: Keyboard input binding (WASD/Arrows for 8-way movement, E/Space for interaction, P for Party, F5/F9 for Quick Save/Load, T for time advance, H for Controls Help, ESC to close modals/dialogue).
- **Time & Calendar System**: Expandable calendar initialized to October 21 (10 days until Halloween) with Dawn/Day/Dusk/Night/Midnight lighting state transitions.
- **Data-Driven Map Manager & Visual Environment**:
  - Central ancient runestone monolith with glowing purple rune core.
  - Cobblestone paths connecting village squares and houses.
  - Village cemetery with tombstones and stone wall perimeter fences.
  - Gothic pitched-roof houses, street lanterns with warm point light glow, carved glowing jack-o'-lanterns, and gnarled spooky trees.
- **3D Interaction Billboards**: Dynamic floating `PRESS [E]` billboard indicators rendered directly above interactable NPCs in 3D world space when the player enters interaction proximity.
- **Collision Detection System**: AABB bounding-box physics preventing player movement through walls, houses, trees, lanterns, monolith, tombstones, and NPCs.
- **Asset-Swappable Visual Canvas Sprites**: Billboard canvas sprite renderer (`VisualSprite`) displaying detailed original character artwork (Player with purple wizard hat & cloak, Elder Malachi with elder robes & white beard, Pip with pumpkin mask).
- **Data-Driven Dialogue System**: Typewriter-style dialogue overlay with character portraits, speaker titles, sequential line progression, and date-aware conversation trees (`src/data/dialogue/`).
- **Data-Driven Nocti Creature System**: Data models supporting elemental affinities (Fire, Ghost, Shadow, Plant, Poison), undead classifications (Wraith, Hollow), stats, party management, and rare Nightfall glowing marks (`src/data/nocti/`).
- **Save & Load System**: LocalStorage persistence storing player coordinates, active map ID, calendar date/time state, Nocti party, and quest flags (via F5 key save / F9 key load).
- **UI HUD & Controls Overlay**: Responsive UI HUD displaying date, time of day, location title, bottom tips bar, Nocti party modal window, toggleable Controls Help modal window (H key), and toast notifications.

## Playable Locations Implemented
- **New Moon Village**: Gothic Halloween village featuring houses, central runestone monolith, cobblestone walkways, cemetery tombstones, stone wall fences, carved jack-o'-lanterns, street lanterns, spooky trees, and interactive NPCs (Elder Malachi & Trick-or-Treater Pip).

## Nocti Implemented
1. **Ignikindle** (#001) - Fire type. Fiery ember spirit encased inside a carved jack-o'-lantern hearth.
2. **Spectramew** (#002) - Ghost/Shadow type (Wraith). Iconic ghostly phantom kitten with mischief in its eyes.
3. **Thornweeper** (#003) - Plant/Poison type (Hollow). Eerie vine creature wrapped around a gravestone.

## Controls
- **WASD / Arrow Keys**: Move character in 8 directions
- **E / Space**: Interact with NPCs / Advance dialogue
- **P**: Toggle Nocti Party panel
- **F5**: Quick Save game state
- **F9**: Quick Load game state
- **ESC**: Close dialogue or open menu window
- **T**: Advance time by 3 hours (test dynamic day/night lighting transitions)
- **H**: Toggle Controls Help & Guide modal

## Development & Deployment Commands
1. **Install dependencies**: `npm install`
2. **Run dev server**: `npm run dev` (opens on `http://localhost:3000/nightfall-monster-rpg/`)
3. **Run TypeScript check**: `npx tsc --noEmit`
4. **Build production bundle**: `npm run build`
5. **Test production build locally**: `npx vite preview` or `python3 -m http.server 8080 --directory dist`

## Architecture Decisions
- Game data (Nocti species, map definitions, dialogue trees) is decoupled from engine logic in `src/data/`.
- Visual entities utilize `VisualSprite` canvas billboards to enable straightforward future swapping to full custom pixel-art sprite sheets or 3D GLTF models without modifying entity collision or gameplay logic.
- GitHub Pages deployment uses relative Vite base path (`./`) with automated build and deploy via `.github/workflows/deploy.yml`.

## Known Bugs / Limitations
- None. TypeScript compilation (`npx tsc --noEmit`), Vite production build, and Playwright end-to-end browser tests pass cleanly with zero console errors.

## Next Recommended Milestone
- **Milestone 2: Exploration Routes & Turn-Based Battle System**:
  - Implement Witchwood route map connecting New Moon Village to outer dark forests with wild Nocti encounters in tall spooky grass/fog patches.
  - Implement turn-based battle engine (wild Nocti battles, moves, damage calculation, status effects, catching mechanics with Halloween lanterns/treats, and battle UI/animations).
