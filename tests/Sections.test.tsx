import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SheetHeader } from '../src/components/SheetHeader';
import { AttributesSection } from '../src/components/AttributesSection';
import { AbilitiesSection } from '../src/components/AbilitiesSection';
import { SpheresSection } from '../src/components/SpheresSection';
import { AdvantagesSection } from '../src/components/AdvantagesSection';
import { INITIAL_CHARACTER_STATE } from '../src/engine/initialState';

describe('Character Sheet Section Components', () => {
  describe('SheetHeader Component', () => {
    it('renders header fields and triggers onChange', () => {
      const onChange = vi.fn();
      render(<SheetHeader header={INITIAL_CHARACTER_STATE.header} onChange={onChange} />);

      const nameInput = screen.getByPlaceholderText('Character Name');
      expect(nameInput).toHaveValue(INITIAL_CHARACTER_STATE.header.name);

      fireEvent.change(nameInput, { target: { value: 'John Dee' } });
      expect(onChange).toHaveBeenCalledWith('name', 'John Dee');

      const conceptInput = screen.getByPlaceholderText('Concept');
      fireEvent.change(conceptInput, { target: { value: 'Occult Scholar' } });
      expect(onChange).toHaveBeenCalledWith('concept', 'Occult Scholar');
    });
  });

  describe('AttributesSection Component', () => {
    it('renders physical, social, and mental attribute groups', () => {
      const onAttributeChange = vi.fn();
      render(
        <AttributesSection
          attributes={INITIAL_CHARACTER_STATE.attributes}
          mode="upgrade"
          onAttributeChange={onAttributeChange}
        />
      );

      expect(screen.getByText('Physical')).toBeInTheDocument();
      expect(screen.getByText('Social')).toBeInTheDocument();
      expect(screen.getByText('Mental')).toBeInTheDocument();
      expect(screen.getByText('Strength')).toBeInTheDocument();
      expect(screen.getByText('Intelligence')).toBeInTheDocument();
    });
  });

  describe('AbilitiesSection Component', () => {
    it('renders categories and supports custom ability creation and removal', () => {
      const onAbilityChange = vi.fn();
      const onAddCustomAbility = vi.fn();
      const onRemoveCustomAbility = vi.fn();

      const customAbilities = {
        ...INITIAL_CHARACTER_STATE.abilities,
        custom_alchemy: {
          id: 'custom_alchemy',
          name: 'Alchemy',
          category: 'knowledges' as const,
          base: 1,
          target: 1,
          isCustom: true,
        },
      };

      render(
        <AbilitiesSection
          abilities={customAbilities}
          mode="base"
          onAbilityChange={onAbilityChange}
          onAddCustomAbility={onAddCustomAbility}
          onRemoveCustomAbility={onRemoveCustomAbility}
        />
      );

      expect(screen.getByText('Talents')).toBeInTheDocument();
      expect(screen.getByText('Skills')).toBeInTheDocument();
      expect(screen.getByText('Knowledges')).toBeInTheDocument();
      expect(screen.getByText('Alchemy')).toBeInTheDocument();

      // Test removing custom ability
      const removeBtn = screen.getByTitle('Remove custom ability');
      fireEvent.click(removeBtn);
      expect(onRemoveCustomAbility).toHaveBeenCalledWith('custom_alchemy');

      // Test adding custom ability
      const addBtn = screen.getByRole('button', { name: /Add Custom Talent/i });
      fireEvent.click(addBtn);

      const input = screen.getByPlaceholderText('Ability name...');
      fireEvent.change(input, { target: { value: 'Street Preaching' } });

      const confirmBtn = screen.getByRole('button', { name: 'Add' });
      fireEvent.click(confirmBtn);
      expect(onAddCustomAbility).toHaveBeenCalledWith('Street Preaching', 'talents');
    });
  });

  describe('SpheresSection Component', () => {
    it('renders spheres and toggles affinity status', () => {
      const onSphereChange = vi.fn();
      render(
        <SpheresSection
          spheres={INITIAL_CHARACTER_STATE.spheres}
          areteValue={3}
          mode="upgrade"
          onSphereChange={onSphereChange}
        />
      );

      expect(screen.getByText('Forces')).toBeInTheDocument();
      expect(screen.getByText('Correspondence')).toBeInTheDocument();

      // Find affinity star toggle button for Forces
      const affinityToggle = screen.getByTitle(/Affinity\/Specialty Sphere/i);
      fireEvent.click(affinityToggle);
      expect(onSphereChange).toHaveBeenCalledWith('forces', 'isAffinity', false);
    });

    it('highlights spheres exceeding Arete cap', () => {
      const modifiedSpheres = {
        ...INITIAL_CHARACTER_STATE.spheres,
        forces: {
          ...INITIAL_CHARACTER_STATE.spheres.forces,
          base: 2,
          target: 5,
        },
      };

      render(
        <SpheresSection
          spheres={modifiedSpheres}
          areteValue={3}
          mode="upgrade"
          onSphereChange={() => {}}
        />
      );

      expect(screen.getByText(/Exceeds Arete \(3\)/i)).toBeInTheDocument();
    });
  });

  describe('AdvantagesSection Component', () => {
    it('renders advantages and handles background CRUD and track changes', () => {
      const onAreteChange = vi.fn();
      const onWillpowerChange = vi.fn();
      const onBackgroundChange = vi.fn();
      const onAddBackground = vi.fn();
      const onRemoveBackground = vi.fn();
      const onQuintessenceChange = vi.fn();
      const onParadoxChange = vi.fn();

      const customBackgrounds = {
        ...INITIAL_CHARACTER_STATE.backgrounds,
        custom_node: {
          id: 'custom_node',
          name: 'Sanctum Node',
          category: 'backgrounds' as const,
          base: 2,
          target: 2,
          min: 0,
          max: 5,
          isCustom: true,
        },
      };

      render(
        <AdvantagesSection
          arete={INITIAL_CHARACTER_STATE.arete}
          willpower={INITIAL_CHARACTER_STATE.willpower}
          backgrounds={customBackgrounds}
          quintessence={3}
          paradox={2}
          mode="base"
          onAreteChange={onAreteChange}
          onWillpowerChange={onWillpowerChange}
          onBackgroundChange={onBackgroundChange}
          onAddBackground={onAddBackground}
          onRemoveBackground={onRemoveBackground}
          onQuintessenceChange={onQuintessenceChange}
          onParadoxChange={onParadoxChange}
        />
      );

      expect(screen.getByText('Arete')).toBeInTheDocument();
      expect(screen.getByText('Willpower')).toBeInTheDocument();
      expect(screen.getByText('Backgrounds')).toBeInTheDocument();
      expect(screen.getByText('Sanctum Node')).toBeInTheDocument();

      // Remove custom background
      const deleteBgBtn = screen.getByTitle('Remove background');
      fireEvent.click(deleteBgBtn);
      expect(onRemoveBackground).toHaveBeenCalledWith('custom_node');

      // Add background
      const addBgPrompt = screen.getByRole('button', { name: /Add Background/i });
      fireEvent.click(addBgPrompt);
      const bgInput = screen.getByPlaceholderText('Background name...');
      fireEvent.change(bgInput, { target: { value: 'Wonder' } });
      const addConfirm = screen.getByRole('button', { name: 'Add' });
      fireEvent.click(addConfirm);
      expect(onAddBackground).toHaveBeenCalledWith('Wonder');

      // Quintessence and Paradox heading
      expect(screen.getByText('Quintessence & Paradox')).toBeInTheDocument();
    });
  });
});
