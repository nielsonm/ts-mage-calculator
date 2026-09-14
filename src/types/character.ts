export type AttributeCategory = 'physical' | 'social' | 'mental';

export interface AttributeTrait {
  id: string;
  name: string;
  category: AttributeCategory;
  base: number;
  target: number;
  specialty?: string;
}

export type AbilityCategory = 'talents' | 'skills' | 'knowledges';

export interface AbilityTrait {
  id: string;
  name: string;
  category: AbilityCategory;
  base: number;
  target: number;
  specialty?: string;
  isCustom?: boolean;
}

export interface SphereTrait {
  id: string;
  name: string;
  base: number;
  target: number;
  isAffinity: boolean;
  specialty?: string;
}

export interface AdvantageTrait {
  id: string;
  name: string;
  base: number;
  target: number;
  max: number;
  min: number;
  isCustom?: boolean;
}

export interface CharacterHeader {
  name: string;
  player: string;
  chronicle: string;
  nature: string;
  demeanor: string;
  concept: string;
  essence: string;
  tradition: string;
  cabal: string;
}

export interface CharacterSheetState {
  header: CharacterHeader;
  attributes: Record<string, AttributeTrait>;
  abilities: Record<string, AbilityTrait>;
  spheres: Record<string, SphereTrait>;
  arete: AdvantageTrait;
  willpower: AdvantageTrait;
  backgrounds: Record<string, AdvantageTrait>;
  quintessence: number;
  paradox: number;
}

export type EditMode = 'base' | 'upgrade';

export interface UpgradeStepDetail {
  from: number;
  to: number;
  cost: number;
  formula: string;
}

export interface TraitUpgradeCost {
  traitId: string;
  traitName: string;
  section: 'attributes' | 'abilities' | 'spheres' | 'advantages' | 'backgrounds';
  baseRating: number;
  targetRating: number;
  totalCost: number;
  steps: UpgradeStepDetail[];
  notes?: string;
}

export interface PlanCalculationResult {
  totalXp: number;
  items: TraitUpgradeCost[];
  warnings: string[];
}
