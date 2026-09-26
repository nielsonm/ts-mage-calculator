import React, { useState, useMemo, useEffect } from 'react';
import {
  CharacterSheetState,
  EditMode,
  AbilityCategory,
  CharacterHeader,
} from './types/character';
import { INITIAL_CHARACTER_STATE } from './engine/initialState';
import { calculateCharacterPlan } from './engine/xpCalculator';
import { SheetHeader } from './components/SheetHeader';
import { AttributesSection } from './components/AttributesSection';
import { AbilitiesSection } from './components/AbilitiesSection';
import { SpheresSection } from './components/SpheresSection';
import { AdvantagesSection } from './components/AdvantagesSection';
import { XPSummaryBar } from './components/XPSummaryBar';
import { Sparkles, Scroll, RefreshCw } from 'lucide-react';

const STORAGE_KEY = 'm20_mage_character_sheet_v1';

export const App: React.FC = () => {
  const [sheet, setSheet] = useState<CharacterSheetState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load character from storage', e);
    }
    return INITIAL_CHARACTER_STATE;
  });

  const [mode, setMode] = useState<EditMode>('upgrade');

  // Save to localStorage whenever sheet changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sheet));
    } catch (e) {
      console.error('Failed to save character to storage', e);
    }
  }, [sheet]);

  // Real-time calculation of XP plan and validations
  const plan = useMemo(() => calculateCharacterPlan(sheet), [sheet]);

  // Header change
  const handleHeaderChange = (field: keyof CharacterHeader, value: string) => {
    setSheet((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        [field]: value,
      },
    }));
  };

  // Attribute change
  const handleAttributeChange = (
    id: string,
    field: 'base' | 'target' | 'specialty' | 'extraEffect',
    value: number | string
  ) => {
    setSheet((prev) => {
      const attr = prev.attributes[id];
      if (!attr) return prev;
      return {
        ...prev,
        attributes: {
          ...prev.attributes,
          [id]: {
            ...attr,
            [field]: value,
          },
        },
      };
    });
  };

  // Ability change
  const handleAbilityChange = (
    id: string,
    field: 'base' | 'target' | 'specialty' | 'extraEffect',
    value: number | string
  ) => {
    setSheet((prev) => {
      const ability = prev.abilities[id];
      if (!ability) return prev;
      return {
        ...prev,
        abilities: {
          ...prev.abilities,
          [id]: {
            ...ability,
            [field]: value,
          },
        },
      };
    });
  };

  const handleAddCustomAbility = (name: string, category: AbilityCategory) => {
    const id = `custom_${Date.now()}_${name.toLowerCase().replace(/\s+/g, '_')}`;
    setSheet((prev) => ({
      ...prev,
      abilities: {
        ...prev.abilities,
        [id]: {
          id,
          name,
          category,
          base: 0,
          target: 0,
          isCustom: true,
        },
      },
    }));
  };

  const handleRemoveCustomAbility = (id: string) => {
    setSheet((prev) => {
      const copy = { ...prev.abilities };
      delete copy[id];
      return { ...prev, abilities: copy };
    });
  };

  // Sphere change
  const handleSphereChange = (
    id: string,
    field: 'base' | 'target' | 'isAffinity',
    value: number | boolean
  ) => {
    setSheet((prev) => {
      const sphere = prev.spheres[id];
      if (!sphere) return prev;
      return {
        ...prev,
        spheres: {
          ...prev.spheres,
          [id]: {
            ...sphere,
            [field]: value,
          },
        },
      };
    });
  };

  // Arete change
  const handleAreteChange = (field: 'base' | 'target', value: number) => {
    setSheet((prev) => ({
      ...prev,
      arete: {
        ...prev.arete,
        [field]: value,
      },
    }));
  };

  // Willpower change
  const handleWillpowerChange = (field: 'base' | 'target', value: number) => {
    setSheet((prev) => ({
      ...prev,
      willpower: {
        ...prev.willpower,
        [field]: value,
      },
    }));
  };

  // Backgrounds change
  const handleBackgroundChange = (id: string, field: 'base' | 'target', value: number) => {
    setSheet((prev) => {
      const bg = prev.backgrounds[id];
      if (!bg) return prev;
      return {
        ...prev,
        backgrounds: {
          ...prev.backgrounds,
          [id]: {
            ...bg,
            [field]: value,
          },
        },
      };
    });
  };

  const handleAddBackground = (name: string) => {
    const id = `bg_${Date.now()}_${name.toLowerCase().replace(/\s+/g, '_')}`;
    setSheet((prev) => ({
      ...prev,
      backgrounds: {
        ...prev.backgrounds,
        [id]: {
          id,
          name,
          base: 0,
          target: 0,
          min: 0,
          max: 5,
          isCustom: true,
        },
      },
    }));
  };

  const handleRemoveBackground = (id: string) => {
    setSheet((prev) => {
      const copy = { ...prev.backgrounds };
      delete copy[id];
      return { ...prev, backgrounds: copy };
    });
  };

  const handleQuintessenceChange = (val: number) => {
    setSheet((prev) => ({ ...prev, quintessence: val }));
  };

  const handleParadoxChange = (val: number) => {
    setSheet((prev) => ({ ...prev, paradox: val }));
  };

  // Reset only planned upgrades back to base stats
  const handleResetUpgrades = () => {
    setSheet((prev) => {
      const next = JSON.parse(JSON.stringify(prev)) as CharacterSheetState;
      Object.values(next.attributes).forEach((a) => (a.target = a.base));
      Object.values(next.abilities).forEach((a) => (a.target = a.base));
      Object.values(next.spheres).forEach((s) => (s.target = s.base));
      next.arete.target = next.arete.base;
      next.willpower.target = next.willpower.base;
      Object.values(next.backgrounds).forEach((b) => (b.target = b.base));
      return next;
    });
  };

  // Reset to initial preset
  const handleResetToDefault = () => {
    if (window.confirm('Reset character sheet to standard Hermetic preset?')) {
      setSheet(INITIAL_CHARACTER_STATE);
    }
  };

  // Export JSON
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(sheet, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `${(sheet.header.name || 'mage_character').replace(/\s+/g, '_')}_m20_sheet.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.header && parsed.attributes && parsed.spheres) {
          setSheet(parsed);
        } else {
          alert('Invalid character sheet JSON format.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="min-h-screen bg-[#0b0b0e] text-zinc-100 pb-28 pt-4 px-3 md:px-6">
      {/* Top Banner & Presets */}
      <div className="max-w-6xl mx-auto mb-4 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400 bg-zinc-950/70 p-3 rounded-lg border border-zinc-800">
        <div className="flex items-center gap-2">
          <Scroll className="text-amber-400" size={16} />
          <span className="font-serif text-zinc-300">
            Interactive M20 Front Page Sheet & Advancement Planner
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-serif text-zinc-500">Quick Presets:</span>
          <button
            type="button"
            onClick={handleResetToDefault}
            className="hover:text-amber-300 text-zinc-400 px-2 py-1 rounded bg-zinc-900 border border-zinc-800 transition-colors flex items-center gap-1"
            title="Reset to default template"
          >
            <RefreshCw size={11} />
            <span>Hermetic Scholar</span>
          </button>
        </div>
      </div>

      {/* Main Character Sheet Container */}
      <main className="max-w-6xl mx-auto space-y-6">
        {/* Instructions Banner */}
        <div className="bg-gradient-to-r from-amber-950/30 via-zinc-900/50 to-purple-950/30 border border-amber-900/40 p-3 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-zinc-300">
            <Sparkles className="text-purple-400 shrink-0" size={16} />
            <span>
              <strong>How to use:</strong> Use <strong>1. Edit Base Stats</strong> to set your current dots. Switch to{' '}
              <strong className="text-purple-300">2. Plan XP Upgrades</strong> and click higher dots to preview advancement costs!
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <span className="w-3 h-3 rounded-full bg-amber-400 border border-amber-600 inline-block" /> Current Base
            </span>
            <span className="flex items-center gap-1.5 text-purple-300">
              <span className="w-3 h-3 rounded-full bg-purple-500 border border-purple-300 dot-upgraded inline-block" /> Planned Upgrade
            </span>
          </div>
        </div>

        {/* 1. Header */}
        <SheetHeader header={sheet.header} onChange={handleHeaderChange} />

        {/* 2. Attributes */}
        <AttributesSection
          attributes={sheet.attributes}
          mode={mode}
          onAttributeChange={handleAttributeChange}
        />

        {/* 3. Abilities */}
        <AbilitiesSection
          abilities={sheet.abilities}
          mode={mode}
          onAbilityChange={handleAbilityChange}
          onAddCustomAbility={handleAddCustomAbility}
          onRemoveCustomAbility={handleRemoveCustomAbility}
        />

        {/* 4. Spheres */}
        <SpheresSection
          spheres={sheet.spheres}
          areteValue={sheet.arete.target}
          mode={mode}
          onSphereChange={handleSphereChange}
        />

        {/* 5. Advantages, Arete, Willpower, Backgrounds, Quintessence/Paradox */}
        <AdvantagesSection
          arete={sheet.arete}
          willpower={sheet.willpower}
          backgrounds={sheet.backgrounds}
          quintessence={sheet.quintessence}
          paradox={sheet.paradox}
          mode={mode}
          onAreteChange={handleAreteChange}
          onWillpowerChange={handleWillpowerChange}
          onBackgroundChange={handleBackgroundChange}
          onAddBackground={handleAddBackground}
          onRemoveBackground={handleRemoveBackground}
          onQuintessenceChange={handleQuintessenceChange}
          onParadoxChange={handleParadoxChange}
        />
      </main>

      {/* Sticky XP Bar & Upgrade Ledger Drawer */}
      <XPSummaryBar
        mode={mode}
        onModeChange={setMode}
        plan={plan}
        onResetUpgrades={handleResetUpgrades}
        onExportJson={handleExportJson}
        onImportJson={handleImportJson}
      />
    </div>
  );
};
