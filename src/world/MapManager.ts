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
      case 'path': {
        // Cobblestone walkway plane
        width = def.scale ? def.scale[0] : 3;
        depth = def.scale ? def.scale[2] : 3;
        const pathGeo = new THREE.PlaneGeometry(width, depth);
        const pathMat = new THREE.MeshStandardMaterial({
          color: colorHex || 0x2e2538,
          roughness: 0.95
        });
        const pathMesh = new THREE.Mesh(pathGeo, pathMat);
        pathMesh.rotation.x = -Math.PI / 2;
        pathMesh.position.y = 0.01;
        pathMesh.receiveShadow = true;
        group.add(pathMesh);
        break;
      }
      case 'fence': {
        width = 2.0;
        depth = 0.4;
        const wallGeo = new THREE.BoxGeometry(2.0, 1.2, 0.3);
        const wallMat = new THREE.MeshStandardMaterial({ color: colorHex || 0x2c2636, roughness: 0.8 });
        const wallMesh = new THREE.Mesh(wallGeo, wallMat);
        wallMesh.position.y = 0.6;
        wallMesh.castShadow = true;
        wallMesh.receiveShadow = true;
        group.add(wallMesh);
        break;
      }
      case 'pumpkin': {
        width = 0.8;
        depth = 0.8;
        const pGeo = new THREE.SphereGeometry(0.5, 10, 10);
        pGeo.scale(1, 0.8, 1);
        const pMat = new THREE.MeshStandardMaterial({ color: colorHex || 0xff5500, roughness: 0.4 });
        const pMesh = new THREE.Mesh(pGeo, pMat);
        pMesh.position.y = 0.4;
        pMesh.castShadow = true;
        group.add(pMesh);

        // Pumpkin stem
        const stemGeo = new THREE.CylinderGeometry(0.05, 0.08, 0.25, 5);
        const stemMat = new THREE.MeshStandardMaterial({ color: 0x1f3a15 });
        const stemMesh = new THREE.Mesh(stemGeo, stemMat);
        stemMesh.position.set(0, 0.85, 0);
        group.add(stemMesh);

        // Glowing Jack-o'-Lantern face light
        const pLight = new THREE.PointLight(0xff7700, 2.0, 7);
        pLight.position.set(0, 0.5, 0.3);
        group.add(pLight);
        break;
      }
      case 'tree': {
        width = 1.4;
        depth = 1.4;
        // Trunk
        const trunkGeo = new THREE.CylinderGeometry(0.35, 0.6, 3.8, 7);
        const trunkMat = new THREE.MeshStandardMaterial({ color: 0x241810, roughness: 0.9 });
        const trunkMesh = new THREE.Mesh(trunkGeo, trunkMat);
        trunkMesh.position.y = 1.9;
        trunkMesh.castShadow = true;
        group.add(trunkMesh);

        // Layered dark spooky foliage
        const folMat = new THREE.MeshStandardMaterial({ color: colorHex || 0x102115, roughness: 0.8 });
        const fol1 = new THREE.Mesh(new THREE.ConeGeometry(2.4, 3.5, 6), folMat);
        fol1.position.y = 4.2;
        fol1.castShadow = true;
        group.add(fol1);

        const fol2 = new THREE.Mesh(new THREE.ConeGeometry(1.8, 3.0, 6), folMat);
        fol2.position.y = 5.6;
        fol2.castShadow = true;
        group.add(fol2);
        break;
      }
      case 'lantern': {
        width = 0.5;
        depth = 0.5;
        // Stone base
        const bGeo = new THREE.BoxGeometry(0.4, 0.4, 0.4);
        const bMat = new THREE.MeshStandardMaterial({ color: 0x221a2e });
        const bMesh = new THREE.Mesh(bGeo, bMat);
        bMesh.position.y = 0.2;
        bMesh.castShadow = true;
        group.add(bMesh);

        // Iron Pole
        const poleGeo = new THREE.CylinderGeometry(0.08, 0.1, 2.8, 6);
        const poleMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8 });
        const poleMesh = new THREE.Mesh(poleGeo, poleMat);
        poleMesh.position.y = 1.6;
        poleMesh.castShadow = true;
        group.add(poleMesh);

        // Lantern head
        const lLight = new THREE.PointLight(0xffa022, 2.8, 12);
        lLight.position.set(0, 2.8, 0);
        group.add(lLight);

        const bulbGeo = new THREE.SphereGeometry(0.22, 8, 8);
        const bulbMat = new THREE.MeshBasicMaterial({ color: 0xffb830 });
        const bulbMesh = new THREE.Mesh(bulbGeo, bulbMat);
        bulbMesh.position.set(0, 2.8, 0);
        group.add(bulbMesh);
        break;
      }
      case 'statue': {
        // Ancient Runestone Monolith / Monolith Landmark
        width = 2.0;
        depth = 2.0;
        const monoGeo = new THREE.BoxGeometry(1.6, 4.2, 1.2);
        const monoMat = new THREE.MeshStandardMaterial({ color: 0x2a1e38, roughness: 0.7, metalness: 0.2 });
        const monoMesh = new THREE.Mesh(monoGeo, monoMat);
        monoMesh.position.y = 2.1;
        monoMesh.castShadow = true;
        monoMesh.receiveShadow = true;
        group.add(monoMesh);

        // Eerie glowing rune glyph on face
        const runeGeo = new THREE.PlaneGeometry(1.0, 2.0);
        const runeMat = new THREE.MeshBasicMaterial({ color: 0x9b51e0 });
        const runeMesh = new THREE.Mesh(runeGeo, runeMat);
        runeMesh.position.set(0, 2.2, 0.61);
        group.add(runeMesh);

        // Eerie purple ambient light
        const monoLight = new THREE.PointLight(0x8a4fff, 2.5, 10);
        monoLight.position.set(0, 2.5, 0.8);
        group.add(monoLight);
        break;
      }
      case 'gate': {
        // Cemetery Gravestone / Monument
        width = 1.0;
        depth = 0.5;
        const stoneGeo = new THREE.BoxGeometry(1.0, 1.8, 0.4);
        const stoneMat = new THREE.MeshStandardMaterial({ color: 0x3d354a, roughness: 0.8 });
        const stoneMesh = new THREE.Mesh(stoneGeo, stoneMat);
        stoneMesh.position.y = 0.9;
        stoneMesh.castShadow = true;
        group.add(stoneMesh);
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

  public update(camera: THREE.Camera, playerPosition?: THREE.Vector3) {
    for (const npc of this.npcs) {
      npc.update(camera, playerPosition);
    }
  }
}
