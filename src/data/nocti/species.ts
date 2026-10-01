import { NoctiSpeciesData } from '../types';

export const INITIAL_NOCTI_SPECIES: NoctiSpeciesData[] = [
  {
    id: 'ignikindle',
    name: 'Ignikindle',
    types: ['Fire'],
    baseStats: { hp: 45, attack: 52, defense: 43, spAttack: 60, spDefense: 50, speed: 65 },
    description: 'A fiery ember spirit encased inside a carved jack-o-lantern hearth. Its tail glimmers with festive Halloween sparks.',
    signatureMove: 'Ember Burst',
    spritePlaceholderColor: '#ff6600',
    possibleVariants: ['Normal', 'Halloween', 'Nightfall']
  },
  {
    id: 'spectramew',
    name: 'Spectramew',
    types: ['Ghost', 'Shadow'],
    undeadTrait: 'Wraith',
    baseStats: { hp: 50, attack: 40, defense: 45, spAttack: 70, spDefense: 65, speed: 75 },
    description: 'An iconic ghostly phantom kitten with mischief in its glowing eyes and a subtle sinister smile that hovers in foggy alleys.',
    signatureMove: 'Spectral Mischief',
    spritePlaceholderColor: '#9b51e0',
    possibleVariants: ['Normal', 'Halloween', 'Nightfall', 'Nightmare', 'AstralNightfall']
  },
  {
    id: 'thornweeper',
    name: 'Thornweeper',
    types: ['Plant', 'Poison'],
    undeadTrait: 'Hollow',
    baseStats: { hp: 65, attack: 60, defense: 70, spAttack: 45, spDefense: 55, speed: 40 },
    description: 'An eerie sentient vine creature wrapped around a carved stone gravestone. Its poisonous pollen smells like autumn decay.',
    signatureMove: 'Grave Briar',
    spritePlaceholderColor: '#27ae60',
    possibleVariants: ['Normal', 'Nightfall']
  }
];
