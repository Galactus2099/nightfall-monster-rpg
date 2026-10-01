export type TimeOfDay = 'DAWN' | 'DAY' | 'DUSK' | 'NIGHT' | 'MIDNIGHT';

export interface CalendarState {
  month: number; // 10 = October, 11 = November, etc.
  day: number; // 21 to 31+
  hour: number; // 0 to 23
  minute: number; // 0 to 59
  timeOfDay: TimeOfDay;
}

export class TimeManager {
  private month: number = 10;
  private day: number = 21;
  private hour: number = 18; // Start at Dusk (18:00)
  private minute: number = 0;
  private isNightmareRealm: boolean = false;

  public onTimeChanged?: (state: CalendarState) => void;

  constructor(startDay: number = 21, startHour: number = 18) {
    this.day = startDay;
    this.hour = startHour;
  }

  public advanceHour(hours: number = 1) {
    this.hour += hours;
    while (this.hour >= 24) {
      this.hour -= 24;
      this.day += 1;
      if (this.day > 31 && this.month === 10) {
        this.month = 11;
        this.day = 1;
      }
    }
    if (this.onTimeChanged) {
      this.onTimeChanged(this.getState());
    }
  }

  public getTimeOfDay(): TimeOfDay {
    if (this.hour >= 5 && this.hour < 7) return 'DAWN';
    if (this.hour >= 7 && this.hour < 17) return 'DAY';
    if (this.hour >= 17 && this.hour < 20) return 'DUSK';
    if (this.hour >= 20 || this.hour < 3) return 'NIGHT';
    return 'MIDNIGHT';
  }

  public getDateString(): string {
    const monthName = this.month === 10 ? 'OCTOBER' : 'NOVEMBER';
    return `${monthName} ${this.day}`;
  }

  public getTimeString(): string {
    const hh = this.hour.toString().padStart(2, '0');
    const mm = this.minute.toString().padStart(2, '0');
    return `${hh}:${mm} (${this.getTimeOfDay()})`;
  }

  public getState(): CalendarState {
    return {
      month: this.month,
      day: this.day,
      hour: this.hour,
      minute: this.minute,
      timeOfDay: this.getTimeOfDay()
    };
  }

  public setState(state: Partial<CalendarState>) {
    if (state.month !== undefined) this.month = state.month;
    if (state.day !== undefined) this.day = state.day;
    if (state.hour !== undefined) this.hour = state.hour;
    if (state.minute !== undefined) this.minute = state.minute;
    if (this.onTimeChanged) {
      this.onTimeChanged(this.getState());
    }
  }

  public getLightingValues(): { ambientHex: number; dirHex: number; dirIntensity: number; fogHex: number; fogDensity: number } {
    const tod = this.getTimeOfDay();
    switch (tod) {
      case 'DAWN':
        return { ambientHex: 0x4a3459, dirHex: 0xffa066, dirIntensity: 1.2, fogHex: 0x3d2b4d, fogDensity: 0.03 };
      case 'DAY':
        return { ambientHex: 0x5c4d7d, dirHex: 0xffe6b3, dirIntensity: 1.8, fogHex: 0x4a3d69, fogDensity: 0.02 };
      case 'DUSK':
        return { ambientHex: 0x3d214f, dirHex: 0xff7733, dirIntensity: 1.4, fogHex: 0x241133, fogDensity: 0.035 };
      case 'NIGHT':
        return { ambientHex: 0x18102b, dirHex: 0x614fba, dirIntensity: 1.0, fogHex: 0x0e081c, fogDensity: 0.04 };
      case 'MIDNIGHT':
        return { ambientHex: 0x0f0a1c, dirHex: 0x3d2d85, dirIntensity: 0.7, fogHex: 0x07040f, fogDensity: 0.05 };
    }
  }
}
