import * as THREE from 'three';

export class Renderer {
  public scene: THREE.Scene;
  public renderer: THREE.WebGLRenderer;
  public dirLight: THREE.DirectionalLight;
  public ambientLight: THREE.AmbientLight;

  constructor(canvas: HTMLCanvasElement) {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0612);
    this.scene.fog = new THREE.FogExp2(0x120a21, 0.035);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Ambient Lighting
    this.ambientLight = new THREE.AmbientLight(0x2d1f47, 1.2);
    this.scene.add(this.ambientLight);

    // Directional Light (Moonlight / Sun)
    this.dirLight = new THREE.DirectionalLight(0x7b61ff, 1.5);
    this.dirLight.position.set(15, 25, 15);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize.width = 2048;
    this.dirLight.shadow.mapSize.height = 2048;
    this.dirLight.shadow.camera.near = 0.5;
    this.dirLight.shadow.camera.far = 80;
    const shadowDist = 20;
    this.dirLight.shadow.camera.left = -shadowDist;
    this.dirLight.shadow.camera.right = shadowDist;
    this.dirLight.shadow.camera.top = shadowDist;
    this.dirLight.shadow.camera.bottom = -shadowDist;
    this.scene.add(this.dirLight);

    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  public updateLighting(
    ambientHex: number,
    dirHex: number,
    dirIntensity: number,
    fogHex: number,
    fogDensity: number
  ) {
    this.ambientLight.color.setHex(ambientHex);
    this.dirLight.color.setHex(dirHex);
    this.dirLight.intensity = dirIntensity;
    this.scene.background = new THREE.Color(fogHex);
    if (this.scene.fog instanceof THREE.FogExp2) {
      this.scene.fog.color.setHex(fogHex);
      this.scene.fog.density = fogDensity;
    }
  }

  private onWindowResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  public render(camera: THREE.Camera) {
    this.renderer.render(this.scene, camera);
  }
}
