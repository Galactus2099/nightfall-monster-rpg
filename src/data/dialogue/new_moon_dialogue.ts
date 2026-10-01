import { DialogueTree } from '../types';

export const VILLAGE_DIALOGUES: Record<string, DialogueTree> = {
  elder_malachi_dialogue: {
    id: 'elder_malachi_dialogue',
    startLineId: 'line1',
    lines: {
      line1: {
        id: 'line1',
        speaker: 'Elder Malachi',
        text: 'Welcome, young traveler, to New Moon Village. Today is October 21... exactly ten days remain until Halloween.',
        nextId: 'line2'
      },
      line2: {
        id: 'line2',
        speaker: 'Elder Malachi',
        text: 'The veil between Nocturne and the Nightmare Realm weakens with every passing twilight. Strange Nocti are awakening in Witchwood!',
        nextId: 'line3'
      },
      line3: {
        id: 'line3',
        speaker: 'Elder Malachi',
        text: 'Take care of your Nocti companions. As October 31 approaches, the world will grow far more mysterious...',
        nextId: undefined
      }
    }
  },
  pip_dialogue: {
    id: 'pip_dialogue',
    startLineId: 'pip_line1',
    lines: {
      pip_line1: {
        id: 'pip_line1',
        speaker: 'Pip',
        text: 'Hehehe! Look at my carved pumpkin costume! Have you seen any Spectramew near the cemetery yet?',
        nextId: 'pip_line2'
      },
      pip_line2: {
        id: 'pip_line2',
        speaker: 'Pip',
        text: 'I heard some rare Nocti even have glowing Nightfall Marks! I want to find an Astral Nightfall Nocti before Halloween night!',
        nextId: undefined
      }
    }
  }
};
