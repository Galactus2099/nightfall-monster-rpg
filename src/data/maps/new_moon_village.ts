import { MapData } from '../types';

export const NEW_MOON_VILLAGE_MAP: MapData = {
  id: 'new_moon_village',
  name: 'NEW MOON VILLAGE',
  width: 40,
  height: 40,
  groundColor: '#1d1726',
  fogColor: '#120a21',
  fogDensity: 0.035,
  ambientColor: '#2d1f47',
  directionalLightColor: '#7b61ff',
  spawnPoint: { x: 0, z: 6 },
  objects: [
    // Elder / Mayor's House (North)
    {
      id: 'elder_house',
      type: 'house',
      x: 0,
      z: -10,
      color: '#2a1a38',
      hasCollision: true
    },
    // Village Houses (East & West)
    {
      id: 'house_west_1',
      type: 'house',
      x: -10,
      z: -2,
      color: '#241730',
      hasCollision: true
    },
    {
      id: 'house_east_1',
      type: 'house',
      x: 10,
      z: -2,
      color: '#241730',
      hasCollision: true
    },
    // Street Lanterns
    {
      id: 'lantern_1',
      type: 'lantern',
      x: -4,
      z: -4,
      hasCollision: true
    },
    {
      id: 'lantern_2',
      type: 'lantern',
      x: 4,
      z: -4,
      hasCollision: true
    },
    {
      id: 'lantern_3',
      type: 'lantern',
      x: -4,
      z: 4,
      hasCollision: true
    },
    {
      id: 'lantern_4',
      type: 'lantern',
      x: 4,
      z: 4,
      hasCollision: true
    },
    // Carved Jack-o'-Lanterns (Halloween Scenery)
    {
      id: 'pump_1',
      type: 'pumpkin',
      x: -2,
      z: -7,
      color: '#ff6600',
      hasCollision: true
    },
    {
      id: 'pump_2',
      type: 'pumpkin',
      x: 2,
      z: -7,
      color: '#ff6600',
      hasCollision: true
    },
    {
      id: 'pump_3',
      type: 'pumpkin',
      x: -8,
      z: 1,
      color: '#ff8800',
      hasCollision: true
    },
    {
      id: 'pump_4',
      type: 'pumpkin',
      x: 8,
      z: 1,
      color: '#ff8800',
      hasCollision: true
    },
    // Spooky Gothic Gnarled Trees
    {
      id: 'tree_1',
      type: 'tree',
      x: -12,
      z: -12,
      color: '#0e1d13',
      hasCollision: true
    },
    {
      id: 'tree_2',
      type: 'tree',
      x: 12,
      z: -12,
      color: '#0e1d13',
      hasCollision: true
    },
    {
      id: 'tree_3',
      type: 'tree',
      x: -12,
      z: 10,
      color: '#0e1d13',
      hasCollision: true
    },
    {
      id: 'tree_4',
      type: 'tree',
      x: 12,
      z: 10,
      color: '#0e1d13',
      hasCollision: true
    }
  ],
  npcs: [
    {
      id: 'elder_malachi',
      name: 'Elder Malachi',
      spriteColor: '#ff9d00',
      x: 0,
      z: -6,
      dialogueId: 'elder_malachi_dialogue'
    },
    {
      id: 'villager_pip',
      name: 'Trick-or-Treater Pip',
      spriteColor: '#30c5ff',
      x: 5,
      z: 1,
      dialogueId: 'pip_dialogue'
    }
  ]
};
