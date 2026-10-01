import * as THREE from 'three';
import { VisualSprite } from './VisualSprite';
import { NpcDef } from '../data/types';

export class NPC {
  public def: NpcDef;
  public group: THREE.Group;
  public sprite: VisualSprite;
  public promptMesh: THREE.Mesh;
  public position: THREE.Vector3;
  public interactionRadius: number = 2.5;

  constructor(def: NpcDef) {
    this.def = def;
    this.group = new THREE.Group();
    this.position = new THREE.Vector3(def.x, 0, def.z);
    this.group.position.copy(this.position);

    const initialLetter = def.name.charAt(0).toUpperCase();
    this.sprite = new VisualSprite(def.spriteColor || '#ff9d00', 1.1, 1.8, initialLetter);
    this.group.add(this.sprite.mesh);

    // Floating Interaction Prompt Billboard ([E] Talk)
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 128;
    pCanvas.height = 48;
    const pCtx = pCanvas.getContext('2d')!;
    pCtx.fillStyle = 'rgba(25, 12, 45, 0.9)';
    pCtx.beginPath();
    pCtx.roundRect(4, 4, 120, 40, 8);
    pCtx.fill();
    pCtx.lineWidth = 3;
    pCtx.strokeStyle = '#ff9d00';
    pCtx.stroke();

    pCtx.fillStyle = '#ffb830';
    pCtx.font = 'bold 20px Georgia, sans-serif';
    pCtx.textAlign = 'center';
    pCtx.fillText('PRESS [E]', 64, 30);

    const pTex = new THREE.CanvasTexture(pCanvas);
    pTex.magFilter = THREE.NearestFilter;
    const pMat = new THREE.MeshStandardMaterial({
      map: pTex,
      transparent: true,
      alphaTest: 0.1
    });
    const pGeo = new THREE.PlaneGeometry(1.4, 0.55);
    this.promptMesh = new THREE.Mesh(pGeo, pMat);
    this.promptMesh.position.set(0, 2.3, 0);
    this.promptMesh.visible = false;
    this.group.add(this.promptMesh);
  }

  public update(camera: THREE.Camera, playerPosition?: THREE.Vector3) {
    this.sprite.setRotationToCamera(camera);
    if (this.promptMesh.visible) {
      this.promptMesh.rotation.y = camera.rotation.y;
    }

    if (playerPosition) {
      const inRange = this.isPlayerInInteractionRange(playerPosition);
      this.promptMesh.visible = inRange;
    }
  }

  public isPlayerInInteractionRange(playerPosition: THREE.Vector3): boolean {
    const dist = this.position.distanceTo(playerPosition);
    return dist <= this.interactionRadius;
  }
}
