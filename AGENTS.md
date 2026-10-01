# AGENTS.md

## Repository Overview
**Nightfall** is an original Halloween-themed HD-2D monster-catching RPG developed with Three.js, TypeScript, HTML, and CSS.

## Key Architectural Principles & Directives

1. **Data-Driven Architecture**:
   - Keep game data separate from engine code wherever practical.
   - All Nocti species, moves, items, NPC dialogues, map definitions, quests, dungeon definitions, encounters, and events MUST reside in JSON/TypeScript data modules (`src/data/`).

2. **Asset-Swappable Visuals**:
   - Visual entities (Player, NPCs, Nocti) must use modular visual components (e.g., `VisualSprite` or future model wrappers).
   - Code must remain agnostic of whether graphics are procedural canvas billboards, pixel-art sprite sheets, or low-poly 3D models.

3. **Modular File Structure**:
   - Avoid giant files. Keep engine subsystems (`Renderer`, `Camera`, `Input`, `TimeManager`, `SaveSystem`), entities (`Player`, `NPC`, `VisualSprite`), systems (`DialogueSystem`, `NoctiSystem`), and world managers (`MapManager`) nicely separated into dedicated files under `src/`.

4. **Time & Calendar Progression**:
   - The calendar system (`TimeManager`) tracks date (starting Oct 21) and time of day (Dawn, Day, Dusk, Night, Midnight).
   - Time changes dynamically update environment lighting, fog, shadows, ambient tones, and NPC responses.

5. **Testing & Verification**:
   - Run `npx tsc --noEmit` and `npx vite build` to confirm zero type or build errors before committing changes.
   - Maintain `AGENTS.md` and `PROJECT_STATUS.md` in tandem with codebase updates.
