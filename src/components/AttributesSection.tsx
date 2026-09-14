import React from 'react';
import { AttributeTrait, EditMode } from '../types/character';
import { DotRating } from './DotRating';

interface AttributesSectionProps {
  attributes: Record<string, AttributeTrait>;
  mode: EditMode;
  onAttributeChange: (id: string, field: 'base' | 'target' | 'specialty', value: number | string) => void;
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
      <div className="space-y-2.5">
        {items.map((trait) => {
          const isUpgraded = trait.target > trait.base;
          return (
            <div key={trait.id} className="flex items-center justify-between text-xs md:text-sm">
              <div className="flex items-center gap-1.5 flex-1 pr-2">
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
