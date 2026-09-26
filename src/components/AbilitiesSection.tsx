import React, { useState } from 'react';
import { AbilityTrait, AbilityCategory, EditMode } from '../types/character';
import { DotRating } from './DotRating';
import { ExtraEffectBadge } from './ExtraEffectBadge';
import { Plus, Trash2, Crown, Sparkles } from 'lucide-react';

interface AbilitiesSectionProps {
  abilities: Record<string, AbilityTrait>;
  mode: EditMode;
  onAbilityChange: (
    id: string,
    field: 'base' | 'target' | 'specialty' | 'extraEffect',
    value: number | string
  ) => void;
  onAddCustomAbility: (name: string, category: AbilityCategory) => void;
  onRemoveCustomAbility: (id: string) => void;
}

export const AbilitiesSection: React.FC<AbilitiesSectionProps> = ({
  abilities,
  mode,
  onAbilityChange,
  onAddCustomAbility,
  onRemoveCustomAbility,
}) => {
  const [newAbilityName, setNewAbilityName] = useState('');
  const [targetCategory, setTargetCategory] = useState<AbilityCategory | null>(null);

  const talents = Object.values(abilities).filter((a) => a.category === 'talents');
  const skills = Object.values(abilities).filter((a) => a.category === 'skills');
  const knowledges = Object.values(abilities).filter((a) => a.category === 'knowledges');

  const handleAdd = (category: AbilityCategory) => {
    if (newAbilityName.trim()) {
      onAddCustomAbility(newAbilityName.trim(), category);
      setNewAbilityName('');
      setTargetCategory(null);
    }
  };

  const renderColumn = (title: string, category: AbilityCategory, items: AbilityTrait[]) => (
    <div className="space-y-3 bg-zinc-900/30 p-3 rounded-md border border-zinc-800/80 flex flex-col justify-between">
      <div>
        <h3 className="font-serif font-bold text-amber-300 text-center uppercase tracking-wider text-sm border-b border-amber-900/40 pb-1 mb-2.5">
          {title}
        </h3>
        <div className="space-y-2">
          {items.map((trait) => {
            const isUpgraded = trait.target > trait.base;
            const currentRating = Math.max(trait.base, trait.target);
            const isMastery = currentRating > 4;
            const isSpecialty = currentRating === 4;
            const showExtraEffect = currentRating >= 4 || Boolean(trait.extraEffect);

            return (
              <div
                key={trait.id}
                className={`p-1.5 rounded transition-all group ${
                  isMastery
                    ? isUpgraded
                      ? 'trait-mastery-upgraded border border-purple-500/30'
                      : 'trait-mastery-active border border-amber-500/30'
                    : isSpecialty
                    ? isUpgraded
                      ? 'bg-purple-950/20 border border-purple-500/25'
                      : 'bg-amber-950/15 border border-amber-600/25'
                    : 'hover:bg-zinc-800/20'
                }`}
              >
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <div className="flex items-center gap-1.5 flex-1 pr-2 truncate">
                    {isMastery ? (
                      <span title="Mastery rank (>4 dots)" className="shrink-0 flex items-center">
                        <Crown
                          size={12}
                          className={isUpgraded ? 'text-purple-400' : 'text-amber-400'}
                        />
                      </span>
                    ) : isSpecialty ? (
                      <span title="Specialty rank (4+ dots)" className="shrink-0 flex items-center">
                        <Sparkles
                          size={11}
                          className={isUpgraded ? 'text-purple-400' : 'text-amber-400'}
                        />
                      </span>
                    ) : null}
                    {trait.isCustom && (
                      <button
                        type="button"
                        onClick={() => onRemoveCustomAbility(trait.id)}
                        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity"
                        title="Remove custom ability"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                    <span
                      className={`truncate font-medium ${
                        isUpgraded ? 'text-purple-300 font-semibold' : 'text-zinc-300'
                      }`}
                    >
                      {trait.name}
                    </span>
                    {isUpgraded && (
                      <span className="text-[10px] bg-purple-950/80 text-purple-300 px-1 py-0.2 rounded border border-purple-500/40">
                        +{trait.target - trait.base}
                      </span>
                    )}
                  </div>
                  <DotRating
                    base={trait.base}
                    target={trait.target}
                    min={0}
                    max={5}
                    mode={mode}
                    onBaseChange={(newBase) => onAbilityChange(trait.id, 'base', newBase)}
                    onTargetChange={(newTarget) => onAbilityChange(trait.id, 'target', newTarget)}
                    ariaLabel={trait.name}
                  />
                </div>

                {showExtraEffect && (
                  <ExtraEffectBadge
                    traitId={trait.id}
                    traitName={trait.name}
                    rating={currentRating}
                    isUpgraded={isUpgraded}
                    extraEffect={trait.extraEffect}
                    categoryType="ability"
                    onSaveEffect={(effect) => onAbilityChange(trait.id, 'extraEffect', effect)}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Custom Ability */}
      <div className="pt-2 border-t border-zinc-800/60 mt-2">
        {targetCategory === category ? (
          <div className="flex items-center gap-1 text-xs">
            <input
              type="text"
              value={newAbilityName}
              onChange={(e) => setNewAbilityName(e.target.value)}
              placeholder="Ability name..."
              className="bg-zinc-950 border border-zinc-700 px-2 py-1 rounded text-zinc-100 flex-1 text-xs focus:outline-none focus:border-amber-500"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAdd(category);
                if (e.key === 'Escape') setTargetCategory(null);
              }}
            />
            <button
              type="button"
              onClick={() => handleAdd(category)}
              className="bg-amber-600 hover:bg-amber-500 text-zinc-950 px-2 py-1 rounded font-bold text-xs"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setTargetCategory(null)}
              className="text-zinc-400 hover:text-zinc-200 px-1 text-xs"
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              setTargetCategory(category);
              setNewAbilityName('');
            }}
            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-amber-300 transition-colors w-full justify-center py-1"
          >
            <Plus size={12} />
            <span>Add Custom {title.slice(0, -1)}</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <section className="sheet-parchment rounded-lg p-4 md:p-5">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 border-b border-amber-900/30 pb-2 gap-2">
        <h2 className="font-gothic text-lg md:text-xl font-bold text-amber-400 tracking-wider uppercase">
          Abilities
        </h2>
        <span className="text-xs text-zinc-400 font-serif italic">
          Upgrade Cost: New Ability: 3 XP • Existing: Current Rating × 2 XP
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderColumn('Talents', 'talents', talents)}
        {renderColumn('Skills', 'skills', skills)}
        {renderColumn('Knowledges', 'knowledges', knowledges)}
      </div>
    </section>
  );
};
