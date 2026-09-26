import React from 'react';
import { AttributeTrait, EditMode } from '../types/character';
import { DotRating } from './DotRating';
import { ExtraEffectBadge } from './ExtraEffectBadge';
import { Crown, Sparkles } from 'lucide-react';

interface AttributesSectionProps {
  attributes: Record<string, AttributeTrait>;
  mode: EditMode;
  onAttributeChange: (
    id: string,
    field: 'base' | 'target' | 'specialty' | 'extraEffect',
    value: number | string
  ) => void;
}

export const AttributesSection: React.FC<AttributesSectionProps> = ({
  attributes,
  mode,
  onAttributeChange,
}) => {
  const physical = Object.values(attributes).filter((a) => a.category === 'physical');
  const social = Object.values(attributes).filter((a) => a.category === 'social');
  const mental = Object.values(attributes).filter((a) => a.category === 'mental');

  const renderColumn = (title: string, items: AttributeTrait[]) => (
    <div className="space-y-3 bg-zinc-900/30 p-3 rounded-md border border-zinc-800/80">
      <h3 className="font-serif font-bold text-amber-300 text-center uppercase tracking-wider text-sm border-b border-amber-900/40 pb-1">
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
                <div className="flex items-center gap-1.5 flex-1 pr-2">
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
                  <span className={`font-medium ${isUpgraded ? 'text-purple-300 font-semibold' : 'text-zinc-300'}`}>
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
                  min={1}
                  max={5}
                  mode={mode}
                  onBaseChange={(newBase) => onAttributeChange(trait.id, 'base', newBase)}
                  onTargetChange={(newTarget) => onAttributeChange(trait.id, 'target', newTarget)}
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
                  categoryType="attribute"
                  onSaveEffect={(effect) => onAttributeChange(trait.id, 'extraEffect', effect)}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <section className="sheet-parchment rounded-lg p-4 md:p-5">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 border-b border-amber-900/30 pb-2 gap-2">
        <h2 className="font-gothic text-lg md:text-xl font-bold text-amber-400 tracking-wider uppercase">
          Attributes
        </h2>
        <span className="text-xs text-zinc-400 font-serif italic">
          Upgrade Cost: Current Rating × 4 XP
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderColumn('Physical', physical)}
        {renderColumn('Social', social)}
        {renderColumn('Mental', mental)}
      </div>
    </section>
  );
};
