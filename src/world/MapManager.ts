import * as THREE from 'three';
import { MapData, MapObjectDef } from '../data/types';
import { NPC } from '../entities/NPC';

export interface BoundingBox {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

export class MapManager {
  public currentMapData?: MapData;
  public mapGroup: THREE.Group;
  public npcs: NPC[] = [];
  public collisionBoxes: BoundingBox[] = [];

  constructor(private scene: THREE.Scene) {
    this.mapGroup = new THREE.Group();
    this.scene.add(this.mapGroup);
  }

  public loadMap(mapData: MapData) {
    // Clear previous map objects and npcs
    while (this.mapGroup.children.length > 0) {
      const obj = this.mapGroup.children[0];
      this.mapGroup.remove(obj);
    }
    this.npcs = [];
    this.collisionBoxes = [];
    this.currentMapData = mapData;

    // Ground Plane
    const groundGeo = new THREE.PlaneGeometry(mapData.width, mapData.height);
    const groundMat = new THREE.MeshStandardMaterial({
      color: parseInt(mapData.groundColor.replace('#', '0x')),
      roughness: 0.9,
      metalness: 0.1
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    this.mapGroup.add(groundMesh);

    // Map Boundaries Collisions
    const halfW = mapData.width / 2;
    const halfH = mapData.height / 2;
    this.collisionBoxes.push({ minX: -halfW - 10, maxX: -halfW, minZ: -halfH, maxZ: halfH });
    this.collisionBoxes.push({ minX: halfW, maxX: halfW + 10, minZ: -halfH, maxZ: halfH });
    this.collisionBoxes.push({ minX: -halfW, maxX: halfW, minZ: -halfH - 10, maxZ: -halfH });
    this.collisionBoxes.push({ minX: -halfW, maxX: halfW, minZ: halfH, maxZ: halfH + 10 });

    // Spawn Objects
    for (const objDef of mapData.objects) {
      this.buildMapObject(objDef);
    }

    // Spawn NPCs
    for (const npcDef of mapData.npcs) {
      const npc = new NPC(npcDef);
      this.mapGroup.add(npc.group);
      this.npcs.push(npc);

      // NPC collision box
      this.collisionBoxes.push({
        minX: npcDef.x - 0.5,
        maxX: npcDef.x + 0.5,
        minZ: npcDef.z - 0.5,
        maxZ: npcDef.z + 0.5
      });
    }
  }

  private buildMapObject(def: MapObjectDef) {
    const group = new THREE.Group();
    group.position.set(def.x, 0, def.z);
    if (def.rotationY) group.rotation.y = def.rotationY;
    if (def.scale) group.scale.set(def.scale[0], def.scale[1], def.scale[2]);

    let width = 1;
    let depth = 1;
    const colorHex = parseInt((def.color || '#888888').replace('#', '0x'));

    switch (def.type) {
      case 'house': {
        width = 4;
        depth = 4;
        // Body
        const houseGeo = new THREE.BoxGeometry(4, 3, 4);
        const houseMat = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.8 });
        const houseMesh = new THREE.Mesh(houseGeo, houseMat);
        houseMesh.position.y = 1.5;
        houseMesh.castShadow = true;
        houseMesh.receiveShadow = true;
        group.add(houseMesh);

        // Gothic pitched roof
        const roofGeo = new THREE.ConeGeometry(3.2, 2.5, 4);
        const roofMat = new THREE.MeshStandardMaterial({ color: 0x3a1e12, roughness: 0.6 });
        const roofMesh = new THREE.Mesh(roofGeo, roofMat);
        roofMesh.position.y = 4.25;
        roofMesh.rotation.y = Math.PI / 4;
        roofMesh.castShadow = true;
        group.add(roofMesh);

        // Glowing window
        const winGeo = new THREE.PlaneGeometry(0.8, 1.2);
        const winMat = new THREE.MeshBasicMaterial({ color: 0xffa022 });
        const winMesh = new THREE.Mesh(winGeo, winMat);
        winMesh.position.set(0, 1.8, 2.01);
        group.add(winMesh);
        break;
      }
      case 'pumpkin': {
        width = 0.8;
        depth = 0.8;
        const pGeo = new THREE.SphereGeometry(0.5, 8, 8);
        pGeo.scale(1, 0.8, 1);
        const pMat = new THREE.MeshStandardMaterial({ color: colorHex || 0xff6600, roughness: 0.5 });
        const pMesh = new THREE.Mesh(pGeo, pMat);
        pMesh.position.y = 0.4;
        pMesh.castShadow = true;
        group.add(pMesh);

        // Glowing Jack-o'-Lantern face light
        const pLight = new THREE.PointLight(0xff7700, 1.5, 6);
        pLight.position.set(0, 0.5, 0.2);
        group.add(pLight);
        break;
      }
      case 'tree': {
        width = 1.2;
        depth = 1.2;
        // Trunk
        const trunkGeo = new THREE.CylinderGeometry(0.3, 0.5, 3.5, 6);
        const trunkMat = new THREE.MeshStandardMaterial({ color: 0x2b1d14, roughness: 0.9 });
        const trunkMesh = new THREE.Mesh(trunkGeo, trunkMat);
        trunkMesh.position.y = 1.75;
        trunkMesh.castShadow = true;
        group.add(trunkMesh);

        // Gnarled dark foliage cone
        const folGeo = new THREE.ConeGeometry(2.0, 4.0, 6);
        const folMat = new THREE.MeshStandardMaterial({ color: colorHex || 0x122416, roughness: 0.8 });
        const folMesh = new THREE.Mesh(folGeo, folMat);
        folMesh.position.y = 4.5;
        folMesh.castShadow = true;
        group.add(folMesh);
        break;
      }
      case 'lantern': {
        width = 0.5;
        depth = 0.5;
        // Pole
        const poleGeo = new THREE.CylinderGeometry(0.08, 0.1, 2.8, 6);
        const poleMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8 });
        const poleMesh = new THREE.Mesh(poleGeo, poleMat);
        poleMesh.position.y = 1.4;
        poleMesh.castShadow = true;
        group.add(poleMesh);

        // Lantern head
        const lLight = new THREE.PointLight(0xffa524, 2.2, 10);
        lLight.position.set(0, 2.6, 0);
        group.add(lLight);

        const bulbGeo = new THREE.SphereGeometry(0.2, 8, 8);
        const bulbMat = new THREE.MeshBasicMaterial({ color: 0xffbb44 });
        const bulbMesh = new THREE.Mesh(bulbGeo, bulbMat);
        bulbMesh.position.set(0, 2.6, 0);
        group.add(bulbMesh);
        break;
      }
      default: {
        width = 1;
        depth = 1;
        const boxGeo = new THREE.BoxGeometry(1, 1, 1);
        const boxMat = new THREE.MeshStandardMaterial({ color: colorHex });
        const boxMesh = new THREE.Mesh(boxGeo, boxMat);
        boxMesh.position.y = 0.5;
        boxMesh.castShadow = true;
        group.add(boxMesh);
        break;
      }
    }

    if (def.lightSource) {
      const pLight = new THREE.PointLight(
        parseInt(def.lightSource.color.replace('#', '0x')),
        def.lightSource.intensity,
        def.lightSource.distance
      );
      pLight.position.set(0, 1.5, 0);
      group.add(pLight);
    }

    this.mapGroup.add(group);

    if (def.hasCollision !== false) {
      const hw = (width * (def.scale ? def.scale[0] : 1)) / 2;
      const hd = (depth * (def.scale ? def.scale[2] : 1)) / 2;
      this.collisionBoxes.push({
        minX: def.x - hw,
        maxX: def.x + hw,
        minZ: def.z - hd,
        maxZ: def.z + hd
      });
    }
  }

  public checkCollision(pos: THREE.Vector3, radius: number): boolean {
    for (const box of this.collisionBoxes) {
      if (
        pos.x + radius > box.minX &&
        pos.x - radius < box.maxX &&
        pos.z + radius > box.minZ &&
        pos.z - radius < box.maxZ
      ) {
        return true;
      }
    }
    return false;
  }

  public update(camera: THREE.Camera) {
    for (const npc of this.npcs) {
      npc.update(camera);
    }
  }
}
