import * as THREE from 'three';

export class Camera {
  public camera: THREE.PerspectiveCamera;
  public offset: THREE.Vector3 = new THREE.Vector3(0, 14, 12);
  public lookAtOffset: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

  constructor() {
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    this.camera.position.copy(this.offset);

    window.addEventListener('resize', this.onResize.bind(this));
  }

  public follow(targetPos: THREE.Vector3, lerpFactor: number = 0.08) {
    const desiredPos = targetPos.clone().add(this.offset);
    this.camera.position.lerp(desiredPos, lerpFactor);

    const targetLookAt = targetPos.clone().add(this.lookAtOffset);
    this.camera.lookAt(targetLookAt);
  }

  private onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
}
