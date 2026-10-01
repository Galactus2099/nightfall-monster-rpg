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
    canvas.width = 128;
    canvas.height = 192;
    const ctx = canvas.getContext('2d')!;

    // Clear canvas
    ctx.clearRect(0, 0, 128, 192);

    if (label === 'P') {
      // Player: Dark Purple Cloak & Pointed Halloween Wizard Hat
      // Cloak
      ctx.fillStyle = '#4a1e78';
      ctx.beginPath();
      ctx.moveTo(34, 80);
      ctx.lineTo(94, 80);
      ctx.lineTo(108, 170);
      ctx.lineTo(20, 170);
      ctx.closePath();
      ctx.fill();
      ctx.lineWidth = 6;
      ctx.strokeStyle = '#100520';
      ctx.stroke();

      // Inner tunic / belt
      ctx.fillStyle = '#8a4fff';
      ctx.fillRect(48, 90, 32, 70);
      ctx.fillStyle = '#ffb830';
      ctx.fillRect(52, 120, 24, 8); // Gold belt buckle

      // Face
      ctx.fillStyle = '#ffdca8';
      ctx.beginPath();
      ctx.arc(64, 60, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Eyes
      ctx.fillStyle = '#220033';
      ctx.beginPath();
      ctx.arc(54, 60, 4, 0, Math.PI * 2);
      ctx.arc(74, 60, 4, 0, Math.PI * 2);
      ctx.fill();

      // Pointed Wizard Hat
      ctx.fillStyle = '#200e38';
      ctx.beginPath();
      ctx.ellipse(64, 46, 38, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(32, 44);
      ctx.lineTo(64, 6);
      ctx.lineTo(96, 44);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Gold Star on Hat
      ctx.fillStyle = '#ffb830';
      ctx.font = 'bold 18px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('★', 64, 34);

    } else if (label === 'E' || label === 'M') {
      // Elder Malachi: Grand Elder Robes, White Beard & Staff Emblem
      ctx.fillStyle = '#2c124d';
      ctx.beginPath();
      ctx.moveTo(30, 70);
      ctx.lineTo(98, 70);
      ctx.lineTo(110, 175);
      ctx.lineTo(18, 175);
      ctx.closePath();
      ctx.fill();
      ctx.lineWidth = 6;
      ctx.strokeStyle = '#0e051a';
      ctx.stroke();

      // Gold trim
      ctx.strokeStyle = '#ff9d00';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(64, 70);
      ctx.lineTo(64, 175);
      ctx.stroke();

      // Head / Face
      ctx.fillStyle = '#f2c9a0';
      ctx.beginPath();
      ctx.arc(64, 52, 20, 0, Math.PI * 2);
      ctx.fill();

      // Long White Elder Beard
      ctx.fillStyle = '#e8e5f0';
      ctx.beginPath();
      ctx.moveTo(46, 56);
      ctx.quadraticCurveTo(64, 115, 82, 56);
      ctx.closePath();
      ctx.fill();

      // Glowing Elder Eyes
      ctx.fillStyle = '#ffb830';
      ctx.beginPath();
      ctx.arc(54, 50, 3.5, 0, Math.PI * 2);
      ctx.arc(74, 50, 3.5, 0, Math.PI * 2);
      ctx.fill();

    } else if (label === 'T' || label === 'P2') {
      // Pip: Trick-or-Treater in Pumpkin Mask
      ctx.fillStyle = '#ff6600';
      ctx.beginPath();
      ctx.arc(64, 60, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 6;
      ctx.strokeStyle = '#1a0800';
      ctx.stroke();

      // Carved Pumpkin Mask Face
      ctx.fillStyle = '#110500';
      // Triangle eyes
      ctx.beginPath();
      ctx.moveTo(48, 52); ctx.lineTo(58, 52); ctx.lineTo(53, 42); ctx.closePath();
      ctx.moveTo(70, 52); ctx.lineTo(80, 52); ctx.lineTo(75, 42); ctx.closePath();
      ctx.fill();
      // Jagged mouth
      ctx.beginPath();
      ctx.moveTo(46, 68); ctx.lineTo(54, 74); ctx.lineTo(64, 68); ctx.lineTo(74, 74); ctx.lineTo(82, 68);
      ctx.lineTo(76, 78); ctx.lineTo(52, 78); ctx.closePath();
      ctx.fill();

      // Costume Body
      ctx.fillStyle = '#226688';
      ctx.fillRect(36, 92, 56, 70);
      ctx.lineWidth = 5;
      ctx.strokeRect(36, 92, 56, 70);

    } else {
      // Default Character Silhouette
      ctx.fillStyle = colorHex;
      ctx.beginPath();
      ctx.roundRect(24, 32, 80, 136, [20, 20, 8, 8]);
      ctx.fill();

      ctx.lineWidth = 6;
      ctx.strokeStyle = '#120822';
      ctx.stroke();

      // Face features
      ctx.fillStyle = '#ffea78';
      ctx.beginPath();
      ctx.arc(48, 70, 8, 0, Math.PI * 2);
      ctx.arc(80, 70, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#120822';
      ctx.beginPath();
      ctx.arc(48, 70, 4, 0, Math.PI * 2);
      ctx.arc(80, 70, 4, 0, Math.PI * 2);
      ctx.fill();

      if (label) {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px Georgia, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(label, 64, 130);
      }
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
