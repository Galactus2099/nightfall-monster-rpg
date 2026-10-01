import { NoctiSpeciesData, NoctiInstance, NoctiFormVariant } from '../data/types';

export class NoctiSystem {
  private speciesRegistry: Map<string, NoctiSpeciesData> = new Map();

  public registerSpecies(species: NoctiSpeciesData) {
    this.speciesRegistry.set(species.id, species);
  }

  public getSpecies(speciesId: string): NoctiSpeciesData | undefined {
    return this.speciesRegistry.get(speciesId);
  }

  public createInstance(
    speciesId: string,
    level: number = 5,
    form: NoctiFormVariant = 'Normal',
    nickname?: string
  ): NoctiInstance | null {
    const species = this.getSpecies(speciesId);
    if (!species) return null;

    const hp = Math.floor(species.baseStats.hp + (level * 2.5));
    const attack = Math.floor(species.baseStats.attack + (level * 1.5));
    const defense = Math.floor(species.baseStats.defense + (level * 1.5));
    const spAttack = Math.floor(species.baseStats.spAttack + (level * 1.5));
    const spDefense = Math.floor(species.baseStats.spDefense + (level * 1.5));
    const speed = Math.floor(species.baseStats.speed + (level * 1.5));

    // Chance for Nightfall Mark (1 in 10 for basic demo, or Astral Nightfall 1 in 50)
    let nightfallMark: NoctiInstance['nightfallMark'] = undefined;
    const markRoll = Math.random();
    if (markRoll < 0.15) {
      const isAstral = markRoll < 0.03;
      nightfallMark = {
        location: 'forehead',
        color: isAstral ? '#00e5ff' : '#a845ff',
        isAstral
      };
    }

    return {
      id: `nocti_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      speciesId,
      nickname,
      level,
      currentHp: hp,
      maxHp: hp,
      form,
      nightfallMark,
      stats: { hp, attack, defense, spAttack, spDefense, speed }
    };
  }
}
