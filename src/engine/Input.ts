export class Input {
  private keys: Record<string, boolean> = {};
  private keyJustPressed: Record<string, boolean> = {};

  constructor() {
    window.addEventListener('keydown', (e) => {
      if (!this.keys[e.code]) {
        this.keyJustPressed[e.code] = true;
      }
      this.keys[e.code] = true;
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });
  }

  public isKeyDown(code: string): boolean {
    return !!this.keys[code];
  }

  public wasKeyJustPressed(code: string): boolean {
    if (this.keyJustPressed[code]) {
      this.keyJustPressed[code] = false;
      return true;
    }
    return false;
  }

  public getMovementVector(): { x: number; z: number } {
    let x = 0;
    let z = 0;

    if (this.isKeyDown('KeyW') || this.isKeyDown('ArrowUp')) z -= 1;
    if (this.isKeyDown('KeyS') || this.isKeyDown('ArrowDown')) z += 1;
    if (this.isKeyDown('KeyA') || this.isKeyDown('ArrowLeft')) x -= 1;
    if (this.isKeyDown('KeyD') || this.isKeyDown('ArrowRight')) x += 1;

    // Normalize diagonal movement
    if (x !== 0 && z !== 0) {
      x *= 0.7071;
      z *= 0.7071;
    }

    return { x, z };
  }

  public isInteractPressed(): boolean {
    return this.wasKeyJustPressed('KeyE') || this.wasKeyJustPressed('Space');
  }

  public isPartyPressed(): boolean {
    return this.wasKeyJustPressed('KeyP');
  }

  public isSavePressed(): boolean {
    return this.wasKeyJustPressed('F5');
  }

  public isLoadPressed(): boolean {
    return this.wasKeyJustPressed('F9');
  }

  public isAdvanceTimePressed(): boolean {
    return this.wasKeyJustPressed('KeyT');
  }

  public isEscapePressed(): boolean {
    return this.wasKeyJustPressed('Escape');
  }

  public isHelpPressed(): boolean {
    return this.wasKeyJustPressed('KeyH');
  }

  public update() {
    // Clear any single-frame key presses that weren't consumed
    this.keyJustPressed = {};
  }
}
