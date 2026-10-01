// Data contracts and interfaces for data-driven Nightfall RPG

export type ElementType =
  | 'Fire' | 'Water' | 'Plant' | 'Electric' | 'Earth' | 'Wind'
  | 'Shadow' | 'Light' | 'Ghost' | 'Poison' | 'Ice' | 'Psychic'
  | 'Insect' | 'Metal' | 'Beast' | 'Cosmic' | 'Spirit';

export type UndeadTrait =
  | 'Revenant' | 'Graveborn' | 'Hollow' | 'Wraith' | 'Dreadbound' | 'Necrobeast' | 'Soulforged';

export type NoctiFormVariant =
  | 'Normal' | 'Alternate' | 'Halloween' | 'Nightfall' | 'Nightmare' | 'AstralNightfall';

export interface NoctiStats {
  hp: number;
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
}

export interface NoctiSpeciesData {
  id: string;
  name: string;
  types: ElementType[];
  undeadTrait?: UndeadTrait;
  baseStats: NoctiStats;
  description: string;
  signatureMove?: string;
  spritePlaceholderColor: string;
  possibleVariants: NoctiFormVariant[];
}

export interface NoctiInstance {
  id: string; // unique instance id
  speciesId: string;
  nickname?: string;
  level: number;
  currentHp: number;
  maxHp: number;
  form: NoctiFormVariant;
  nightfallMark?: {
    location: 'forehead' | 'chest' | 'back' | 'wings' | 'tail' | 'eyes' | 'horns';
    color: string;
    isAstral: boolean;
  };
  stats: NoctiStats;
}

// Map Data Interfaces
export interface MapObjectDef {
  id: string;
  type: 'house' | 'pumpkin' | 'tree' | 'lantern' | 'fence' | 'gate' | 'statue' | 'chest' | 'custom';
  x: number;
  z: number;
  rotationY?: number;
  scale?: [number, number, number];
  color?: string;
  hasCollision?: boolean;
  lightSource?: {
    color: string;
    intensity: number;
    distance: number;
  };
  interactableId?: string;
}

export interface NpcDef {
  id: string;
  name: string;
  spriteColor: string;
  x: number;
  z: number;
  dialogueId: string;
  hasNightmareVariant?: boolean;
}

export interface MapData {
  id: string;
  name: string;
  width: number;
  height: number;
  groundColor: string;
  fogColor: string;
  fogDensity: number;
  ambientColor: string;
  directionalLightColor: string;
  objects: MapObjectDef[];
  npcs: NpcDef[];
  spawnPoint: { x: number; z: number };
}

// Dialogue Interfaces
export interface DialogueLine {
  id: string;
  speaker: string;
  text: string;
  dateCondition?: { minDay: number; maxDay?: number }; // Date-aware NPC dialogue
  nextId?: string;
}

export interface DialogueTree {
  id: string;
  lines: Record<string, DialogueLine>;
  startLineId: string;
}
