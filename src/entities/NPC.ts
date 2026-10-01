import * as THREE from 'three';
import { VisualSprite } from './VisualSprite';
import { NpcDef } from '../data/types';

export class NPC {
  public def: NpcDef;
  public group: THREE.Group;
  public sprite: VisualSprite;
  public position: THREE.Vector3;
  public interactionRadius: number = 2.0;

  constructor(def: NpcDef) {
    this.def = def;
    this.group = new THREE.Group();
    this.position = new THREE.Vector3(def.x, 0, def.z);
    this.group.position.copy(this.position);

    const initialLetter = def.name.charAt(0).toUpperCase();
    this.sprite = new VisualSprite(def.spriteColor || '#ff9d00', 1.1, 1.8, initialLetter);
    this.group.add(this.sprite.mesh);
  }

  public update(camera: THREE.Camera) {
    this.sprite.setRotationToCamera(camera);
  }

  public isPlayerInInteractionRange(playerPosition: THREE.Vector3): boolean {
    const dist = this.position.distanceTo(playerPosition);
    return dist <= this.interactionRadius;
  }
}
