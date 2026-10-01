# PROJECT_STATUS.md

## Current Milestone
**Milestone 1: Real Playable HD-2D Foundation & New Moon Village Prototype** (Completed)

## Completed Systems
- **Three.js HD-2D Engine Base**: Integrated WebGLRenderer with soft PCF shadow mapping, exponential atmospheric fog, and dynamic day/night ambient & directional lighting.
- **Camera Follow System**: Angled HD-2D perspective camera smoothly tracking player movement.
- **Input System**: Keyboard input binding (WASD/Arrows for 8-way movement, E/Space for interaction, P for Party, F5/F9 for Save/Load, T for time advance).
- **Time & Calendar System**: Expandable calendar initialized to October 21 (10 days until Halloween) with Dawn/Day/Dusk/Night/Midnight lighting state transitions.
- **Data-Driven Map Manager & Loader**: Map system rendering terrain, gothic pitched-roof houses, street lanterns with point lights, carved glowing jack-o'-lanterns, and gnarled dark trees from data definitions (`src/data/maps/`).
- **Collision Detection System**: AABB bounding-box physics preventing player movement through walls, houses, trees, lanterns, and NPCs.
- **Asset-Swappable Visual Sprite System**: Billboard pixel sprite renderer with shadow support, customizable colors, and visual icons.
- **Data-Driven Dialogue System**: Typewriter-style dialogue overlay with speaker titles, sequential line progression, and date-aware conversation trees (`src/data/dialogue/`).
- **Data-Driven Nocti Creature System**: Data models supporting elemental affinities (Fire, Ghost, Shadow, Plant, Poison, etc.), undead classifications (Wraith, Hollow, etc.), stats, party management, and rare Nightfall / Astral Nightfall glowing marks (`src/data/nocti/`).
- **Save & Load System**: LocalStorage persistence storing player coordinates, active map ID, calendar date and time state, Nocti party, and quest flags.
- **UI HUD Overlay**: Responsive HUD displaying current date, time of day, location title, controls guide, Nocti party modal window, and toast notifications.

## Playable Locations Implemented
- **New Moon Village**: Gothic Halloween village featuring houses, carved pumpkins, street lanterns, spooky trees, and interactive NPCs (Elder Malachi & Pip).

## Nocti Implemented
1. **Ignikindle** (#001) - Fire type. Fiery ember spirit encased inside a carved jack-o'-lantern hearth.
2. **Spectramew** (#002) - Ghost/Shadow type (Wraith). Iconic ghostly phantom kitten with mischief in its eyes.
3. **Thornweeper** (#003) - Plant/Poison type (Hollow). Eerie vine creature wrapped around a gravestone.

## Controls
- **WASD / Arrow Keys**: Move character
- **E / Space**: Interact with NPCs / Advance dialogue
- **P**: Toggle Nocti Party panel
- **F5**: Save game state
- **F9**: Load game state
- **T**: Advance time by 3 hours (test dynamic day/night transitions)

## How to Run & Build
1. **Install dependencies**: `npm install`
2. **Run dev server**: `npm run dev` (opens on `http://localhost:3000`)
3. **Build for production**: `npm run build`

## Architecture Decisions
- Game data (Nocti species, map definitions, dialogue trees) is kept completely decoupled from engine logic in `src/data/`.
- Entities utilize `VisualSprite` billboards to enable straightforward future swapping to full custom pixel-art sprite sheets or 3D GLTF models.
- Map loading and collision detection are driven by declarative map object definitions.

## Known Bugs / Limitations
- None currently reported. Type-check (`tsc --noEmit`) and Vite production build pass cleanly.

## Next Recommended Milestone
- **Milestone 2: Exploration Routes & Turn-Based Battle System**:
  - Implement Witchwood route map with wild Nocti encounters in tall grass/fog.
  - Implement turn-based battle engine (wild Nocti battles, moves, damage calculation, status effects, catching mechanics with Halloween lanterns/treats, and battle animations).
