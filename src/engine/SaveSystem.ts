import { NoctiInstance } from '../data/types';
import { CalendarState } from './TimeManager';

export interface SaveData {
  version: string;
  timestamp: number;
  player: {
    x: number;
    z: number;
    currentMapId: string;
  };
  time: CalendarState;
  party: NoctiInstance[];
  flags: Record<string, boolean>;
}

const SAVE_KEY = 'NIGHTFALL_SAVE_SLOT_1';

export class SaveSystem {
  public static saveGame(data: SaveData): boolean {
    try {
      const json = JSON.stringify(data);
      localStorage.setItem(SAVE_KEY, json);
      console.log('Game saved successfully:', data);
      return true;
    } catch (err) {
      console.error('Failed to save game:', err);
      return false;
    }
  }

  public static loadGame(): SaveData | null {
    try {
      const json = localStorage.getItem(SAVE_KEY);
      if (!json) return null;
      const data = JSON.parse(json) as SaveData;
      console.log('Game loaded successfully:', data);
      return data;
    } catch (err) {
      console.error('Failed to load game:', err);
      return null;
    }
  }

  public static hasSave(): boolean {
    return localStorage.getItem(SAVE_KEY) !== null;
  }
}
