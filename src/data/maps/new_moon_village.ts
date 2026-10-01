import { MapData } from '../types';

export const NEW_MOON_VILLAGE_MAP: MapData = {
  id: 'new_moon_village',
  name: 'NEW MOON VILLAGE',
  width: 44,
  height: 44,
  groundColor: '#1d1726',
  fogColor: '#140c24',
  fogDensity: 0.035,
  ambientColor: '#2d1f47',
  directionalLightColor: '#7b61ff',
  spawnPoint: { x: 0, z: 8 },
  objects: [
    // Cobblestone Main Paths
    {
      id: 'path_north_south',
      type: 'path',
      x: 0,
      z: 0,
      color: '#2c2238',
      scale: [4, 1, 24],
      hasCollision: false
    },
    {
      id: 'path_east_west',
      type: 'path',
      x: 0,
      z: 1,
      color: '#2c2238',
      scale: [24, 1, 4],
      hasCollision: false
    },

    // Central Ancient Runestone Monolith Landmark
    {
      id: 'village_monolith',
      type: 'statue',
      x: 0,
      z: 1,
      hasCollision: true
    },

    // Elder / Mayor's Gothic Manor (North)
    {
      id: 'elder_house',
      type: 'house',
      x: 0,
      z: -11,
      color: '#2e1c3e',
      hasCollision: true
    },

    // Village Houses (West & East)
    {
      id: 'house_west_1',
      type: 'house',
      x: -11,
      z: -2,
      color: '#241730',
      hasCollision: true
    },
    {
      id: 'house_east_1',
      type: 'house',
      x: 11,
      z: -2,
      color: '#241730',
      hasCollision: true
    },

    // Village Stone Walls / Fences
    {
      id: 'fence_north_1',
      type: 'fence',
      x: -6,
      z: -11,
      color: '#2c2636',
      hasCollision: true
    },
    {
      id: 'fence_north_2',
      type: 'fence',
      x: 6,
      z: -11,
      color: '#2c2636',
      hasCollision: true
    },
    {
      id: 'fence_west_1',
      type: 'fence',
      x: -11,
      z: 5,
      rotationY: Math.PI / 2,
      color: '#2c2636',
      hasCollision: true
    },

    // East Cemetery Grounds
    {
      id: 'grave_1',
      type: 'gate',
      x: 11,
      z: 6,
      hasCollision: true
    },
    {
      id: 'grave_2',
      type: 'gate',
      x: 13,
      z: 7,
      hasCollision: true
    },
    {
      id: 'grave_3',
      type: 'gate',
      x: 10,
      z: 9,
      hasCollision: true
    },

    // Street Lanterns
    {
      id: 'lantern_1',
      type: 'lantern',
      x: -3.5,
      z: -5,
      hasCollision: true
    },
    {
      id: 'lantern_2',
      type: 'lantern',
      x: 3.5,
      z: -5,
      hasCollision: true
    },
    {
      id: 'lantern_3',
      type: 'lantern',
      x: -3.5,
      z: 6,
      hasCollision: true
    },
    {
      id: 'lantern_4',
      type: 'lantern',
      x: 3.5,
      z: 6,
      hasCollision: true
    },

    // Glowing Jack-o'-Lanterns (Halloween Decor)
    {
      id: 'pump_1',
      type: 'pumpkin',
      x: -2.2,
      z: -8,
      color: '#ff5500',
      hasCollision: true
    },
    {
      id: 'pump_2',
      type: 'pumpkin',
      x: 2.2,
      z: -8,
      color: '#ff5500',
      hasCollision: true
    },
    {
      id: 'pump_3',
      type: 'pumpkin',
      x: -8.5,
      z: 1,
      color: '#ff7700',
      hasCollision: true
    },
    {
      id: 'pump_4',
      type: 'pumpkin',
      x: 8.5,
      z: 1,
      color: '#ff7700',
      hasCollision: true
    },
    {
      id: 'pump_5',
      type: 'pumpkin',
      x: -1.5,
      z: 7.5,
      color: '#ff6600',
      hasCollision: true
    },

    // Spooky Gothic Trees around perimeter
    {
      id: 'tree_1',
      type: 'tree',
      x: -14,
      z: -14,
      color: '#0d1c12',
      hasCollision: true
    },
    {
      id: 'tree_2',
      type: 'tree',
      x: 14,
      z: -14,
      color: '#0d1c12',
      hasCollision: true
    },
    {
      id: 'tree_3',
      type: 'tree',
      x: -14,
      z: 12,
      color: '#0d1c12',
      hasCollision: true
    },
    {
      id: 'tree_4',
      type: 'tree',
      x: 14,
      z: 12,
      color: '#0d1c12',
      hasCollision: true
    },
    {
      id: 'tree_5',
      type: 'tree',
      x: -6,
      z: 14,
      color: '#140d24',
      hasCollision: true
    },
    {
      id: 'tree_6',
      type: 'tree',
      x: 6,
      z: 14,
      color: '#140d24',
      hasCollision: true
    }
  ],
  npcs: [
    {
      id: 'elder_malachi',
      name: 'Elder Malachi',
      spriteColor: '#ff9d00',
      x: 0,
      z: -6.5,
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
