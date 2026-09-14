import React, { useState } from 'react';
import { AdvantageTrait, EditMode } from '../types/character';
import { DotRating } from './DotRating';
import { Compass, Shield, Plus, Trash2, Zap, Flame } from 'lucide-react';

interface AdvantagesSectionProps {
  arete: AdvantageTrait;
  willpower: AdvantageTrait;
  backgrounds: Record<string, AdvantageTrait>;
  quintessence: number;
  paradox: number;
  mode: EditMode;
  onAreteChange: (field: 'base' | 'target', value: number) => void;
  onWillpowerChange: (field: 'base' | 'target', value: number) => void;
  onBackgroundChange: (id: string, field: 'base' | 'target', value: number) => void;
  onAddBackground: (name: string) => void;
  onRemoveBackground: (id: string) => void;
  onQuintessenceChange: (val: number) => void;
  onParadoxChange: (val: number) => void;
}

export const AdvantagesSection: React.FC<AdvantagesSectionProps> = ({
  arete,
  willpower,
  backgrounds,
  quintessence,
  paradox,
  mode,
  onAreteChange,
  onWillpowerChange,
  onBackgroundChange,
  onAddBackground,
  onRemoveBackground,
  onQuintessenceChange,
  onParadoxChange,
}) => {
  const [newBgName, setNewBgName] = useState('');
  const [isAddingBg, setIsAddingBg] = useState(false);

  const bgList = Object.values(backgrounds);

  const handleAddBg = () => {
    if (newBgName.trim()) {
      onAddBackground(newBgName.trim());
      setNewBgName('');
      setIsAddingBg(false);
    }
  };

  const isAreteUpgraded = arete.target > arete.base;
  const isWillpowerUpgraded = willpower.target > willpower.base;

  return (
    <section className="sheet-parchment rounded-lg p-4 md:p-5">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 border-b border-amber-900/30 pb-2 gap-2">
        <h2 className="font-gothic text-lg md:text-xl font-bold text-amber-400 tracking-wider uppercase">
          Advantages & Tracks
        </h2>
        <div className="text-xs text-zinc-400 font-serif italic">
          <span>Arete: Current × 8 XP</span> • <span>Willpower: Current × 1 XP</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Backgrounds Column */}
        <div className="bg-zinc-900/30 p-3.5 rounded-md border border-zinc-800/80 flex flex-col justify-between">
          <div>
            <h3 className="font-serif font-bold text-amber-300 text-center uppercase tracking-wider text-sm border-b border-amber-900/40 pb-1 mb-3">
              Backgrounds
            </h3>
            <div className="space-y-2.5">
              {bgList.map((bg) => {
                const isUpgraded = bg.target > bg.base;
                return (
                  <div key={bg.id} className="flex items-center justify-between text-xs md:text-sm group">
                    <div className="flex items-center gap-1.5 flex-1 pr-2 truncate">
                      {bg.isCustom && (
                        <button
                          type="button"
                          onClick={() => onRemoveBackground(bg.id)}
                          className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity"
                          title="Remove background"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                      <span className={`font-medium truncate ${isUpgraded ? 'text-purple-300 font-semibold' : 'text-zinc-300'}`}>
                        {bg.name}
                      </span>
                      {isUpgraded && (
                        <span className="text-[10px] bg-purple-950/80 text-purple-300 px-1 py-0.2 rounded border border-purple-500/40">
                          +{bg.target - bg.base}
                        </span>
                      )}
                    </div>
                    <DotRating
                      base={bg.base}
                      target={bg.target}
                      min={0}
                      max={5}
                      mode={mode}
                      onBaseChange={(newBase) => onBackgroundChange(bg.id, 'base', newBase)}
                      onTargetChange={(newTarget) => onBackgroundChange(bg.id, 'target', newTarget)}
                      ariaLabel={bg.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add custom background */}
          <div className="pt-3 border-t border-zinc-800/60 mt-3">
            {isAddingBg ? (
              <div className="flex items-center gap-1 text-xs">
                <input
                  type="text"
                  value={newBgName}
                  onChange={(e) => setNewBgName(e.target.value)}
                  placeholder="Background name..."
                  className="bg-zinc-950 border border-zinc-700 px-2 py-1 rounded text-zinc-100 flex-1 text-xs focus:outline-none focus:border-amber-500"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddBg();
                    if (e.key === 'Escape') setIsAddingBg(false);
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddBg}
                  className="bg-amber-600 hover:bg-amber-500 text-zinc-950 px-2 py-1 rounded font-bold text-xs"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingBg(false)}
                  className="text-zinc-400 hover:text-zinc-200 px-1 text-xs"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAddingBg(true)}
                className="flex items-center gap-1 text-xs text-zinc-400 hover:text-amber-300 transition-colors w-full justify-center py-1"
              >
                <Plus size={12} />
                <span>Add Background</span>
              </button>
            )}
          </div>
        </div>

        {/* Arete & Willpower Column (10 dots) */}
        <div className="space-y-4 bg-zinc-900/30 p-3.5 rounded-md border border-zinc-800/80">
          <h3 className="font-serif font-bold text-amber-300 text-center uppercase tracking-wider text-sm border-b border-amber-900/40 pb-1">
            Core Traits
          </h3>

          {/* Arete */}
          <div className="p-2.5 rounded bg-zinc-950/60 border border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Compass className="text-amber-400" size={16} />
                <span className={`font-serif font-bold text-sm ${isAreteUpgraded ? 'text-purple-300' : 'text-amber-300'}`}>
                  Arete
                </span>
                {isAreteUpgraded && (
                  <span className="text-[10px] bg-purple-950 text-purple-300 px-1.5 py-0.2 rounded border border-purple-500/40 font-semibold">
                    +{arete.target - arete.base}
                  </span>
                )}
              </div>
              <span className="text-xs font-mono text-zinc-400">
                {arete.base} {isAreteUpgraded && `→ ${arete.target}`} / 10
              </span>
            </div>

            <div className="flex justify-center py-1 overflow-x-auto">
              <DotRating
                base={arete.base}
                target={arete.target}
                min={1}
                max={10}
                mode={mode}
                onBaseChange={(newBase) => onAreteChange('base', newBase)}
                onTargetChange={(newTarget) => onAreteChange('target', newTarget)}
                ariaLabel="Arete"
              />
            </div>
            {isAreteUpgraded && (
              <p className="text-[11px] text-amber-400/90 font-serif italic text-center mt-1.5">
                ✦ Requires successful Seeking narrative per dot
              </p>
            )}
          </div>

          {/* Willpower */}
          <div className="p-2.5 rounded bg-zinc-950/60 border border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Shield className="text-amber-400" size={16} />
                <span className={`font-serif font-bold text-sm ${isWillpowerUpgraded ? 'text-purple-300' : 'text-amber-300'}`}>
                  Willpower
                </span>
                {isWillpowerUpgraded && (
                  <span className="text-[10px] bg-purple-950 text-purple-300 px-1.5 py-0.2 rounded border border-purple-500/40 font-semibold">
                    +{willpower.target - willpower.base}
                  </span>
                )}
              </div>
              <span className="text-xs font-mono text-zinc-400">
                {willpower.base} {isWillpowerUpgraded && `→ ${willpower.target}`} / 10
              </span>
            </div>

            <div className="flex justify-center py-1 overflow-x-auto">
              <DotRating
                base={willpower.base}
                target={willpower.target}
                min={1}
                max={10}
                mode={mode}
                onBaseChange={(newBase) => onWillpowerChange('base', newBase)}
                onTargetChange={(newTarget) => onWillpowerChange('target', newTarget)}
                ariaLabel="Willpower"
              />
            </div>
          </div>
        </div>

        {/* Quintessence & Paradox Track */}
        <div className="bg-zinc-900/30 p-3.5 rounded-md border border-zinc-800/80 flex flex-col justify-between">
          <div>
            <h3 className="font-serif font-bold text-amber-300 text-center uppercase tracking-wider text-sm border-b border-amber-900/40 pb-1 mb-3">
              Quintessence & Paradox
            </h3>

            <div className="space-y-4">
              {/* Quintessence */}
              <div className="bg-zinc-950/60 p-2.5 rounded border border-zinc-800">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-serif text-amber-300 font-semibold">
                    <Zap size={14} className="text-amber-400 fill-amber-400" />
                    <span>Quintessence</span>
                  </div>
                  <span className="text-xs font-mono text-amber-400 font-bold">{quintessence} / 20</span>
                </div>
                <div className="grid grid-cols-10 gap-1 pt-1">
                  {Array.from({ length: 20 }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => onQuintessenceChange(i + 1 === quintessence ? i : i + 1)}
                      className={`h-3 rounded-sm border transition-colors ${
                        i < quintessence
                          ? 'bg-amber-500 border-amber-400 shadow-[0_0_4px_rgba(245,158,11,0.5)]'
                          : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                      }`}
                      title={`Quintessence ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Paradox */}
              <div className="bg-zinc-950/60 p-2.5 rounded border border-zinc-800">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-serif text-red-400 font-semibold">
                    <Flame size={14} className="text-red-500 fill-red-500" />
                    <span>Paradox</span>
                  </div>
                  <span className="text-xs font-mono text-red-400 font-bold">{paradox} / 20</span>
                </div>
                <div className="grid grid-cols-10 gap-1 pt-1">
                  {Array.from({ length: 20 }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => onParadoxChange(i + 1 === paradox ? i : i + 1)}
                      className={`h-3 rounded-sm border transition-colors ${
                        i < paradox
                          ? 'bg-red-600 border-red-500 shadow-[0_0_4px_rgba(239,68,68,0.5)]'
                          : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                      }`}
                      title={`Paradox ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-zinc-500 text-center font-serif italic mt-3">
            Wheel of Prime • 20 Track Points
          </p>
        </div>
      </div>
    </section>
  );
};
