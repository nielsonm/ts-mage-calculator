import { describe, it, expect } from 'vitest';
import {
  calculateAttributeCost,
  calculateAbilityCost,
  calculateSphereCost,
  calculateAreteCost,
  calculateWillpowerCost,
  calculateBackgroundCost,
  calculateCharacterPlan,
  DEFAULT_M20_RULES,
} from '../src/engine/xpCalculator';
import { INITIAL_CHARACTER_STATE } from '../src/engine/initialState';
import { CharacterSheetState } from '../src/types/character';

describe('M20 XP Calculator Engine', () => {
  describe('Attributes (Current Rating x 4)', () => {
    it('calculates 1 -> 2 as 4 XP', () => {
      const result = calculateAttributeCost(1, 2);
      expect(result.totalCost).toBe(4);
      expect(result.steps).toHaveLength(1);
      expect(result.steps[0].cost).toBe(4);
    });

    it('calculates 1 -> 3 as 12 XP (4 + 8)', () => {
      const result = calculateAttributeCost(1, 3);
      expect(result.totalCost).toBe(12);
      expect(result.steps).toEqual([
        { from: 1, to: 2, cost: 4, formula: '1 × 4 XP' },
        { from: 2, to: 3, cost: 8, formula: '2 × 4 XP' },
      ]);
    });

    it('calculates 2 -> 5 as 36 XP (8 + 12 + 16)', () => {
      const result = calculateAttributeCost(2, 5);
      expect(result.totalCost).toBe(36);
    });

    it('returns 0 if target <= base', () => {
      expect(calculateAttributeCost(3, 3).totalCost).toBe(0);
      expect(calculateAttributeCost(4, 2).totalCost).toBe(0);
    });
  });

  describe('Abilities (New = 3 XP, Current Rating x 2)', () => {
    it('calculates 0 -> 1 as 3 XP (New Ability)', () => {
      const result = calculateAbilityCost(0, 1);
      expect(result.totalCost).toBe(3);
      expect(result.steps[0].formula).toContain('New Ability');
    });

    it('calculates 0 -> 2 as 5 XP (3 + 2)', () => {
      const result = calculateAbilityCost(0, 2);
      expect(result.totalCost).toBe(5);
    });

    it('calculates 1 -> 4 as 12 XP (2 + 4 + 6)', () => {
      const result = calculateAbilityCost(1, 4);
      expect(result.totalCost).toBe(12);
    });

    it('calculates 0 -> 5 as 23 XP (3 + 2 + 4 + 6 + 8)', () => {
      const result = calculateAbilityCost(0, 5);
      expect(result.totalCost).toBe(23);
    });
  });

  describe('Spheres (Affinity x 7, Other x 8, New = 10)', () => {
    it('calculates Affinity Sphere 1 -> 3 as 21 XP (7 + 14)', () => {
      const result = calculateSphereCost(1, 3, true);
      expect(result.totalCost).toBe(21);
    });

    it('calculates Non-Affinity Sphere 1 -> 3 as 24 XP (8 + 16)', () => {
      const result = calculateSphereCost(1, 3, false);
      expect(result.totalCost).toBe(24);
    });

    it('calculates New Sphere 0 -> 2 as 17 XP (Affinity) and 18 XP (Other)', () => {
      const aff = calculateSphereCost(0, 2, true);
      expect(aff.totalCost).toBe(17); // 10 + 7
      const other = calculateSphereCost(0, 2, false);
      expect(other.totalCost).toBe(18); // 10 + 8
    });
  });

  describe('Arete (Current Rating x 8)', () => {
    it('calculates Arete 1 -> 2 as 8 XP', () => {
      const result = calculateAreteCost(1, 2);
      expect(result.totalCost).toBe(8);
      expect(result.steps[0].formula).toContain('Seeking');
    });

    it('calculates Arete 2 -> 4 as 40 XP (16 + 24)', () => {
      const result = calculateAreteCost(2, 4);
      expect(result.totalCost).toBe(40);
    });
  });

  describe('Willpower (Current Rating x 1)', () => {
    it('calculates Willpower 5 -> 8 as 18 XP (5 + 6 + 7)', () => {
      const result = calculateWillpowerCost(5, 8);
      expect(result.totalCost).toBe(18);
    });
  });

  describe('Backgrounds (Optional House Rule)', () => {
    it('calculates 0 -> 2 as 5 XP (3 flat + 2)', () => {
      const result = calculateBackgroundCost(0, 2);
      expect(result.totalCost).toBe(5);
    });

    it('calculates 1 -> 3 as 6 XP (2 + 4)', () => {
      const result = calculateBackgroundCost(1, 3);
      expect(result.totalCost).toBe(6);
    });
  });

  describe('Full Character Plan & Warnings', () => {
    it('computes aggregated multi-trait upgrades and generates arete warning if sphere > arete', () => {
      const sheet: CharacterSheetState = JSON.parse(JSON.stringify(INITIAL_CHARACTER_STATE));
      
      // Upgrade Intelligence 3 -> 4 (12 XP)
      sheet.attributes.intelligence.target = 4;
      // Upgrade Forces (Affinity) 2 -> 3 (14 XP)
      sheet.spheres.forces.target = 3;
      // Upgrade Arete 3 -> 4 (24 XP)
      sheet.arete.target = 4;

      const plan = calculateCharacterPlan(sheet, DEFAULT_M20_RULES);
      expect(plan.totalXp).toBe(12 + 14 + 24); // 50 XP
      expect(plan.warnings).toHaveLength(0);

      // Now set Forces target to 5 while Arete is 4 -> should trigger warning
      sheet.spheres.forces.target = 5;
      const planWithWarning = calculateCharacterPlan(sheet, DEFAULT_M20_RULES);
      expect(planWithWarning.warnings.length).toBeGreaterThan(0);
      expect(planWithWarning.warnings[0]).toContain('exceeds character Arete');
    });
  });
});
