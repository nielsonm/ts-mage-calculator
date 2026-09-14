import {
  CharacterSheetState,
  PlanCalculationResult,
  TraitUpgradeCost,
  UpgradeStepDetail,
} from '../types/character';

export interface XPRuleConfig {
  attributeMultiplier: number; // 4
  abilityMultiplier: number; // 2
  newAbilityFlatCost: number; // 3
  affinitySphereMultiplier: number; // 7
  nonAffinitySphereMultiplier: number; // 8
  newSphereFlatCost: number; // 10
  areteMultiplier: number; // 8
  willpowerMultiplier: number; // 1
  backgroundMultiplier: number; // 2
}

export const DEFAULT_M20_RULES: XPRuleConfig = {
  attributeMultiplier: 4,
  abilityMultiplier: 2,
  newAbilityFlatCost: 3,
  affinitySphereMultiplier: 7,
  nonAffinitySphereMultiplier: 8,
  newSphereFlatCost: 10,
  areteMultiplier: 8,
  willpowerMultiplier: 1,
  backgroundMultiplier: 2,
};

/**
 * Calculate step-by-step cost for an Attribute.
 * Formula: Current Rating * 4
 */
export function calculateAttributeCost(
  from: number,
  to: number,
  config: XPRuleConfig = DEFAULT_M20_RULES
): { totalCost: number; steps: UpgradeStepDetail[] } {
  if (to <= from) return { totalCost: 0, steps: [] };

  const steps: UpgradeStepDetail[] = [];
  let totalCost = 0;

  for (let current = from; current < to; current++) {
    const cost = current * config.attributeMultiplier;
    steps.push({
      from: current,
      to: current + 1,
      cost,
      formula: `${current} × ${config.attributeMultiplier} XP`,
    });
    totalCost += cost;
  }

  return { totalCost, steps };
}

/**
 * Calculate step-by-step cost for an Ability.
 * Formula: New Ability (0 -> 1) = 3 XP; Current Rating * 2
 */
export function calculateAbilityCost(
  from: number,
  to: number,
  config: XPRuleConfig = DEFAULT_M20_RULES
): { totalCost: number; steps: UpgradeStepDetail[] } {
  if (to <= from) return { totalCost: 0, steps: [] };

  const steps: UpgradeStepDetail[] = [];
  let totalCost = 0;

  for (let current = from; current < to; current++) {
    if (current === 0) {
      const cost = config.newAbilityFlatCost;
      steps.push({
        from: 0,
        to: 1,
        cost,
        formula: `New Ability flat ${cost} XP`,
      });
      totalCost += cost;
    } else {
      const cost = current * config.abilityMultiplier;
      steps.push({
        from: current,
        to: current + 1,
        cost,
        formula: `${current} × ${config.abilityMultiplier} XP`,
      });
      totalCost += cost;
    }
  }

  return { totalCost, steps };
}

/**
 * Calculate step-by-step cost for a Sphere.
 * Formula: New Sphere (0 -> 1) = 10 XP; Affinity = Current * 7; Non-Affinity = Current * 8
 */
export function calculateSphereCost(
  from: number,
  to: number,
  isAffinity: boolean,
  config: XPRuleConfig = DEFAULT_M20_RULES
): { totalCost: number; steps: UpgradeStepDetail[] } {
  if (to <= from) return { totalCost: 0, steps: [] };

  const multiplier = isAffinity ? config.affinitySphereMultiplier : config.nonAffinitySphereMultiplier;
  const steps: UpgradeStepDetail[] = [];
  let totalCost = 0;

  for (let current = from; current < to; current++) {
    if (current === 0) {
      const cost = config.newSphereFlatCost;
      steps.push({
        from: 0,
        to: 1,
        cost,
        formula: `New Sphere flat ${cost} XP`,
      });
      totalCost += cost;
    } else {
      const cost = current * multiplier;
      steps.push({
        from: current,
        to: current + 1,
        cost,
        formula: `${current} × ${multiplier} XP (${isAffinity ? 'Affinity' : 'Other'})`,
      });
      totalCost += cost;
    }
  }

  return { totalCost, steps };
}

/**
 * Calculate step-by-step cost for Arete.
 * Formula: Current Rating * 8 (Requires Seeking)
 */
export function calculateAreteCost(
  from: number,
  to: number,
  config: XPRuleConfig = DEFAULT_M20_RULES
): { totalCost: number; steps: UpgradeStepDetail[] } {
  if (to <= from) return { totalCost: 0, steps: [] };

  const steps: UpgradeStepDetail[] = [];
  let totalCost = 0;

  for (let current = from; current < to; current++) {
    const cost = current * config.areteMultiplier;
    steps.push({
      from: current,
      to: current + 1,
      cost,
      formula: `${current} × ${config.areteMultiplier} XP (Requires Seeking)`,
    });
    totalCost += cost;
  }

  return { totalCost, steps };
}

/**
 * Calculate step-by-step cost for Willpower.
 * Formula: Current Rating * 1
 */
export function calculateWillpowerCost(
  from: number,
  to: number,
  config: XPRuleConfig = DEFAULT_M20_RULES
): { totalCost: number; steps: UpgradeStepDetail[] } {
  if (to <= from) return { totalCost: 0, steps: [] };

  const steps: UpgradeStepDetail[] = [];
  let totalCost = 0;

  for (let current = from; current < to; current++) {
    const cost = current * config.willpowerMultiplier;
    steps.push({
      from: current,
      to: current + 1,
      cost,
      formula: `${current} × ${config.willpowerMultiplier} XP`,
    });
    totalCost += cost;
  }

  return { totalCost, steps };
}

/**
 * Calculate step-by-step cost for Backgrounds (Storyteller House Rule).
 * Formula: Current Rating * 2 (or 3 flat if from 0)
 */
export function calculateBackgroundCost(
  from: number,
  to: number,
  config: XPRuleConfig = DEFAULT_M20_RULES
): { totalCost: number; steps: UpgradeStepDetail[] } {
  if (to <= from) return { totalCost: 0, steps: [] };

  const steps: UpgradeStepDetail[] = [];
  let totalCost = 0;

  for (let current = from; current < to; current++) {
    const cost = current === 0 ? 3 : current * config.backgroundMultiplier;
    steps.push({
      from: current,
      to: current + 1,
      cost,
      formula: current === 0 ? 'New Background (3 XP)' : `${current} × ${config.backgroundMultiplier} XP (ST Option)`,
    });
    totalCost += cost;
  }

  return { totalCost, steps };
}

/**
 * Calculate total XP plan and compile line-by-line upgrade breakdown.
 */
export function calculateCharacterPlan(
  sheet: CharacterSheetState,
  config: XPRuleConfig = DEFAULT_M20_RULES
): PlanCalculationResult {
  const items: TraitUpgradeCost[] = [];
  const warnings: string[] = [];

  // Effective target arete for sphere validation
  const effectiveArete = Math.max(sheet.arete.target, sheet.arete.base);

  // 1. Attributes
  Object.values(sheet.attributes).forEach((attr) => {
    if (attr.target > attr.base) {
      const { totalCost, steps } = calculateAttributeCost(attr.base, attr.target, config);
      items.push({
        traitId: attr.id,
        traitName: attr.name,
        section: 'attributes',
        baseRating: attr.base,
        targetRating: attr.target,
        totalCost,
        steps,
      });
    }
  });

  // 2. Abilities
  Object.values(sheet.abilities).forEach((ability) => {
    if (ability.target > ability.base) {
      const { totalCost, steps } = calculateAbilityCost(ability.base, ability.target, config);
      items.push({
        traitId: ability.id,
        traitName: ability.name,
        section: 'abilities',
        baseRating: ability.base,
        targetRating: ability.target,
        totalCost,
        steps,
      });
    }
  });

  // 3. Spheres
  Object.values(sheet.spheres).forEach((sphere) => {
    if (sphere.target > sphere.base) {
      const { totalCost, steps } = calculateSphereCost(sphere.base, sphere.target, sphere.isAffinity, config);
      items.push({
        traitId: sphere.id,
        traitName: sphere.name,
        section: 'spheres',
        baseRating: sphere.base,
        targetRating: sphere.target,
        totalCost,
        steps,
        notes: sphere.isAffinity ? 'Tradition Specialty Sphere' : undefined,
      });
    }

    // Validation: Sphere cannot exceed Arete
    if (sphere.target > effectiveArete) {
      warnings.push(
        `${sphere.name} target rating (${sphere.target}) exceeds character Arete (${effectiveArete}). A mage cannot raise a Sphere higher than their Arete rating.`
      );
    }
  });

  // 4. Arete
  if (sheet.arete.target > sheet.arete.base) {
    const { totalCost, steps } = calculateAreteCost(sheet.arete.base, sheet.arete.target, config);
    items.push({
      traitId: sheet.arete.id,
      traitName: sheet.arete.name,
      section: 'advantages',
      baseRating: sheet.arete.base,
      targetRating: sheet.arete.target,
      totalCost,
      steps,
      notes: 'Each Arete dot increase requires a successful Seeking.',
    });
  }

  // 5. Willpower
  if (sheet.willpower.target > sheet.willpower.base) {
    const { totalCost, steps } = calculateWillpowerCost(sheet.willpower.base, sheet.willpower.target, config);
    items.push({
      traitId: sheet.willpower.id,
      traitName: sheet.willpower.name,
      section: 'advantages',
      baseRating: sheet.willpower.base,
      targetRating: sheet.willpower.target,
      totalCost,
      steps,
    });
  }

  // 6. Backgrounds
  Object.values(sheet.backgrounds).forEach((bg) => {
    if (bg.target > bg.base) {
      const { totalCost, steps } = calculateBackgroundCost(bg.base, bg.target, config);
      items.push({
        traitId: bg.id,
        traitName: bg.name,
        section: 'backgrounds',
        baseRating: bg.base,
        targetRating: bg.target,
        totalCost,
        steps,
        notes: 'Storyteller approval required to purchase backgrounds with XP.',
      });
    }
  });

  const totalXp = items.reduce((sum, item) => sum + item.totalCost, 0);

  return {
    totalXp,
    items,
    warnings,
  };
}
