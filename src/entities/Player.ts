import * as THREE from 'three';
import { VisualSprite } from './VisualSprite';
import { Input } from '../engine/Input';

export class Player {
  public group: THREE.Group;
  public sprite: VisualSprite;
  public position: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  public speed: number = 6.0;
  public radius: number = 0.45;

  constructor(x: number = 0, z: number = 0) {
    this.group = new THREE.Group();
    this.position.set(x, 0, z);
    this.group.position.copy(this.position);

    this.sprite = new VisualSprite('#9a4dff', 1.1, 1.8, 'P');
    this.group.add(this.sprite.mesh);
  }

  public update(
    deltaTime: number,
    input: Input,
    camera: THREE.Camera,
    checkCollision: (nextPos: THREE.Vector3, radius: number) => boolean
  ) {
    const move = input.getMovementVector();
    if (move.x !== 0 || move.z !== 0) {
      const moveDist = this.speed * deltaTime;

      // X movement test
      const nextX = this.position.clone();
      nextX.x += move.x * moveDist;
      if (!checkCollision(nextX, this.radius)) {
        this.position.x = nextX.x;
      }

      // Z movement test
      const nextZ = this.position.clone();
      nextZ.z += move.z * moveDist;
      if (!checkCollision(nextZ, this.radius)) {
        this.position.z = nextZ.z;
      }

      this.group.position.copy(this.position);
    }

    this.sprite.setRotationToCamera(camera);
  }

  public setPosition(x: number, z: number) {
    this.position.set(x, 0, z);
    this.group.position.copy(this.position);
  }
}
