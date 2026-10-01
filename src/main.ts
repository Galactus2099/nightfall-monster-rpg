import * as THREE from 'three';
import { Renderer } from './engine/Renderer';
import { Camera } from './engine/Camera';
import { Input } from './engine/Input';
import { TimeManager } from './engine/TimeManager';
import { SaveSystem } from './engine/SaveSystem';
import { MapManager } from './world/MapManager';
import { Player } from './entities/Player';
import { DialogueSystem } from './systems/DialogueSystem';
import { NoctiSystem } from './systems/NoctiSystem';
import { NoctiInstance } from './data/types';

import { NEW_MOON_VILLAGE_MAP } from './data/maps/new_moon_village';
import { INITIAL_NOCTI_SPECIES } from './data/nocti/species';
import { VILLAGE_DIALOGUES } from './data/dialogue/new_moon_dialogue';

class NightfallGame {
  private renderer: Renderer;
  private camera: Camera;
  private input: Input;
  private timeManager: TimeManager;
  private mapManager: MapManager;
  private player: Player;
  private dialogueSystem: DialogueSystem;
  private noctiSystem: NoctiSystem;

  private playerParty: NoctiInstance[] = [];
  private gameFlags: Record<string, boolean> = {};
  private partyModalOpen: boolean = false;
  private controlsModalOpen: boolean = false;

  constructor() {
    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    this.renderer = new Renderer(canvas);
    this.camera = new Camera();
    this.input = new Input();
    this.timeManager = new TimeManager(21, 18);
    this.mapManager = new MapManager(this.renderer.scene);
    this.player = new Player(NEW_MOON_VILLAGE_MAP.spawnPoint.x, NEW_MOON_VILLAGE_MAP.spawnPoint.z);
    this.renderer.scene.add(this.player.group);

    this.dialogueSystem = new DialogueSystem();
    this.noctiSystem = new NoctiSystem();

    this.init();
  }

  private init() {
    // Register Nocti Species
    for (const species of INITIAL_NOCTI_SPECIES) {
      this.noctiSystem.registerSpecies(species);
    }

    // Give Starter Nocti (Ignikindle & Spectramew)
    const starter1 = this.noctiSystem.createInstance('ignikindle', 5, 'Halloween', 'Ember');
    const starter2 = this.noctiSystem.createInstance('spectramew', 7, 'Nightfall', 'Phantom');
    if (starter1) this.playerParty.push(starter1);
    if (starter2) this.playerParty.push(starter2);

    // Load Map
    this.mapManager.loadMap(NEW_MOON_VILLAGE_MAP);

    // Setup Calendar Events
    this.timeManager.onTimeChanged = () => this.updateHUD();
    this.updateHUD();

    // UI Bindings
    document.getElementById('close-party-btn')?.addEventListener('click', () => this.togglePartyModal(false));
    document.getElementById('close-controls-btn')?.addEventListener('click', () => this.toggleControlsModal(false));

    // Check for existing save
    if (SaveSystem.hasSave()) {
      this.showToast('Press [F9] to Load Saved Game');
    }

    // Start Game Loop
    let lastTime = performance.now();
    const animate = (currentTime: number) => {
      requestAnimationFrame(animate);
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      this.update(deltaTime);
      this.render();
    };
    requestAnimationFrame(animate);
  }

  private update(deltaTime: number) {
    // Input Handling for UI / Hotkeys
    if (this.input.isSavePressed()) {
      this.saveGame();
    }
    if (this.input.isLoadPressed()) {
      this.loadGame();
    }
    if (this.input.isAdvanceTimePressed()) {
      this.timeManager.advanceHour(3);
      this.showToast(`Time advanced: ${this.timeManager.getTimeString()}`);
    }
    if (this.input.isPartyPressed()) {
      this.togglePartyModal(!this.partyModalOpen);
    }
    if (this.input.isHelpPressed()) {
      this.toggleControlsModal(!this.controlsModalOpen);
    }

    // ESC Key handling to close open overlays
    if (this.input.isEscapePressed()) {
      if (this.dialogueSystem.isDialogueOpen()) {
        this.dialogueSystem.close();
      } else if (this.partyModalOpen) {
        this.togglePartyModal(false);
      } else if (this.controlsModalOpen) {
        this.toggleControlsModal(false);
      }
    }

    // Dialogue interaction
    if (this.input.isInteractPressed()) {
      if (this.controlsModalOpen) {
        this.toggleControlsModal(false);
      } else if (this.dialogueSystem.isDialogueOpen()) {
        this.dialogueSystem.advance();
      } else {
        this.checkNpcInteraction();
      }
    }

    // Player Movement (disabled during dialogue or open modals)
    if (!this.dialogueSystem.isDialogueOpen() && !this.partyModalOpen && !this.controlsModalOpen) {
      this.player.update(deltaTime, this.input, this.camera.camera, (pos, radius) =>
        this.mapManager.checkCollision(pos, radius)
      );
    }

    // Camera follow player
    this.camera.follow(this.player.position);

    // Update map NPCs (billboard rotation + interaction range check)
    this.mapManager.update(this.camera.camera, this.player.position);

    // Update dynamic environment lighting based on time
    const lightVals = this.timeManager.getLightingValues();
    this.renderer.updateLighting(
      lightVals.ambientHex,
      lightVals.dirHex,
      lightVals.dirIntensity,
      lightVals.fogHex,
      lightVals.fogDensity
    );

    this.input.update();
  }

  private checkNpcInteraction() {
    for (const npc of this.mapManager.npcs) {
      if (npc.isPlayerInInteractionRange(this.player.position)) {
        const tree = VILLAGE_DIALOGUES[npc.def.dialogueId];
        if (tree) {
          this.dialogueSystem.startDialogue(tree);
          break;
        }
      }
    }
  }

  private updateHUD() {
    const dateElem = document.getElementById('calendar-date');
    const timeElem = document.getElementById('calendar-time');
    const locElem = document.getElementById('location-name');

    if (dateElem) dateElem.textContent = this.timeManager.getDateString();
    if (timeElem) timeElem.textContent = this.timeManager.getTimeString();
    if (locElem && this.mapManager.currentMapData) {
      locElem.textContent = this.mapManager.currentMapData.name;
    }
  }

  private togglePartyModal(show: boolean) {
    this.partyModalOpen = show;
    const modal = document.getElementById('party-panel');
    if (!modal) return;

    if (show) {
      this.toggleControlsModal(false);
      modal.classList.remove('hidden');
      this.renderPartyList();
    } else {
      modal.classList.add('hidden');
    }
  }

  private toggleControlsModal(show: boolean) {
    this.controlsModalOpen = show;
    const modal = document.getElementById('controls-panel');
    if (!modal) return;

    if (show) {
      this.togglePartyModal(false);
      modal.classList.remove('hidden');
    } else {
      modal.classList.add('hidden');
    }
  }

  private renderPartyList() {
    const listContainer = document.getElementById('party-list');
    if (!listContainer) return;
    listContainer.innerHTML = '';

    for (const nocti of this.playerParty) {
      const species = this.noctiSystem.getSpecies(nocti.speciesId);
      const card = document.createElement('div');
      card.className = 'party-card';

      const markText = nocti.nightfallMark
        ? `<span style="color:${nocti.nightfallMark.color}">★ ${nocti.nightfallMark.isAstral ? 'Astral Mark' : 'Nightfall Mark'}</span>`
        : '';

      card.innerHTML = `
        <div class="nocti-name">${nocti.nickname || species?.name} (Lv. ${nocti.level})</div>
        <div class="nocti-type">Type: ${species?.types.join('/')} ${species?.undeadTrait ? `[${species.undeadTrait}]` : ''}</div>
        <div class="nocti-hp">HP: ${nocti.currentHp} / ${nocti.maxHp}</div>
        <div>Form: ${nocti.form} ${markText}</div>
      `;
      listContainer.appendChild(card);
    }
  }

  private saveGame() {
    const saveData = {
      version: '0.1.0',
      timestamp: Date.now(),
      player: {
        x: this.player.position.x,
        z: this.player.position.z,
        currentMapId: this.mapManager.currentMapData?.id || 'new_moon_village'
      },
      time: this.timeManager.getState(),
      party: this.playerParty,
      flags: this.gameFlags
    };

    if (SaveSystem.saveGame(saveData)) {
      this.showToast('Game Saved Successfully!');
    }
  }

  private loadGame() {
    const saveData = SaveSystem.loadGame();
    if (saveData) {
      this.player.setPosition(saveData.player.x, saveData.player.z);
      this.timeManager.setState(saveData.time);
      this.playerParty = saveData.party || [];
      this.gameFlags = saveData.flags || {};
      this.showToast('Game Loaded Successfully!');
    } else {
      this.showToast('No Save File Found!');
    }
  }

  private showToast(msg: string) {
    const toast = document.getElementById('notification-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 2500);
  }

  private render() {
    this.renderer.render(this.camera.camera);
  }
}

// Start Game on Page Load
window.addEventListener('DOMContentLoaded', () => {
  new NightfallGame();
});
