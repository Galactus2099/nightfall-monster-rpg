import { DialogueTree } from '../data/types';

export class DialogueSystem {
  private boxElem: HTMLElement;
  private nameElem: HTMLElement;
  private textElem: HTMLElement;
  private currentTree?: DialogueTree;
  private currentLineId?: string;
  private isOpen: boolean = false;
  private fullText: string = '';
  private displayedText: string = '';
  private charIndex: number = 0;
  private typewriterTimer?: any;

  constructor() {
    this.boxElem = document.getElementById('dialogue-box')!;
    this.nameElem = document.getElementById('speaker-name')!;
    this.textElem = document.getElementById('dialogue-text')!;
  }

  public isDialogueOpen(): boolean {
    return this.isOpen;
  }

  public startDialogue(tree: DialogueTree, startLineOverride?: string) {
    this.currentTree = tree;
    this.currentLineId = startLineOverride || tree.startLineId;
    this.isOpen = true;
    this.boxElem.classList.remove('hidden');
    this.showCurrentLine();
  }

  public advance(): boolean {
    if (!this.isOpen || !this.currentTree || !this.currentLineId) return false;

    // If typewriter is still animating, instantly complete line
    if (this.charIndex < this.fullText.length) {
      clearInterval(this.typewriterTimer);
      this.displayedText = this.fullText;
      this.textElem.textContent = this.displayedText;
      this.charIndex = this.fullText.length;
      return true;
    }

    const currentLine = this.currentTree.lines[this.currentLineId];
    if (currentLine && currentLine.nextId && this.currentTree.lines[currentLine.nextId]) {
      this.currentLineId = currentLine.nextId;
      this.showCurrentLine();
      return true;
    } else {
      this.close();
      return false;
    }
  }

  private showCurrentLine() {
    if (!this.currentTree || !this.currentLineId) return;
    const line = this.currentTree.lines[this.currentLineId];
    if (!line) {
      this.close();
      return;
    }

    this.nameElem.textContent = line.speaker;
    this.fullText = line.text;
    this.displayedText = '';
    this.charIndex = 0;
    this.textElem.textContent = '';

    if (this.typewriterTimer) clearInterval(this.typewriterTimer);

    this.typewriterTimer = setInterval(() => {
      if (this.charIndex < this.fullText.length) {
        this.displayedText += this.fullText.charAt(this.charIndex);
        this.textElem.textContent = this.displayedText;
        this.charIndex++;
      } else {
        clearInterval(this.typewriterTimer);
      }
    }, 25);
  }

  public close() {
    this.isOpen = false;
    this.boxElem.classList.add('hidden');
    if (this.typewriterTimer) clearInterval(this.typewriterTimer);
  }
}
