import * as THREE from 'three';

/**
 * Creates an asset-swappable billboard visual sprite.
 * Supports placeholder canvas textures with custom color & stylized pixel aesthetic,
 * and allows easy swapping to full PNG sprite sheets or 3D mesh models in future.
 */
export class VisualSprite {
  public mesh: THREE.Mesh;
  private material: THREE.MeshStandardMaterial;

  constructor(
    colorHex: string = '#a845ff',
    width: number = 1.0,
    height: number = 1.6,
    label: string = '?'
  ) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 96;
    const ctx = canvas.getContext('2d')!;

    // Background body shape
    ctx.fillStyle = colorHex;
    ctx.beginPath();
    ctx.roundRect(8, 16, 48, 72, [12, 12, 4, 4]);
    ctx.fill();

    // Dark outline
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#120822';
    ctx.stroke();

    // Eyes / Face features
    ctx.fillStyle = '#ffea78';
    ctx.beginPath();
    ctx.arc(24, 40, 5, 0, Math.PI * 2);
    ctx.arc(40, 40, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#120822';
    ctx.beginPath();
    ctx.arc(24, 40, 2.5, 0, Math.PI * 2);
    ctx.arc(40, 40, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Label / Symbol
    if (label) {
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(label, 32, 70);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;

    const geometry = new THREE.PlaneGeometry(width, height);
    this.material = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.2,
      roughness: 0.8
    });

    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = false;
    this.mesh.position.y = height / 2;
  }

  public updateAsset(textureUrl: string) {
    const loader = new THREE.TextureLoader();
    loader.load(textureUrl, (tex) => {
      tex.magFilter = THREE.NearestFilter;
      this.material.map = tex;
      this.material.needsUpdate = true;
    });
  }

  public setRotationToCamera(camera: THREE.Camera) {
    // Keep sprite billboard facing camera
    this.mesh.rotation.y = camera.rotation.y;
  }
}
