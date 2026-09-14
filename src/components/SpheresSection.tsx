import React from 'react';
import { SphereTrait, EditMode } from '../types/character';
import { DotRating } from './DotRating';
import { Sparkles, AlertTriangle } from 'lucide-react';

interface SpheresSectionProps {
  spheres: Record<string, SphereTrait>;
  areteValue: number;
  mode: EditMode;
  onSphereChange: (id: string, field: 'base' | 'target' | 'isAffinity', value: number | boolean) => void;
}

export const SpheresSection: React.FC<SpheresSectionProps> = ({
  spheres,
  areteValue,
  mode,
  onSphereChange,
}) => {
  const sphereList = Object.values(spheres);

  return (
    <section className="sheet-parchment rounded-lg p-4 md:p-5">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 border-b border-amber-900/30 pb-2 gap-2">
        <div className="flex items-center gap-2">
          <h2 className="font-gothic text-lg md:text-xl font-bold text-amber-400 tracking-wider uppercase">
            Spheres
          </h2>
          <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-700/50">
            Cap: Arete ({areteValue})
          </span>
        </div>
        <div className="text-xs text-zinc-400 font-serif italic text-center md:text-right">
          <span>Affinity (★): Current × 7 XP</span> • <span>Other: Current × 8 XP</span> • <span>New: 10 XP</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sphereList.map((sphere) => {
          const isUpgraded = sphere.target > sphere.base;
          const exceedsArete = sphere.target > areteValue;

          return (
            <div
              key={sphere.id}
              className={`p-3 rounded-md border transition-all ${
                exceedsArete
                  ? 'border-red-600/70 bg-red-950/20'
                  : sphere.isAffinity
                  ? 'border-amber-700/50 bg-amber-950/15'
                  : 'border-zinc-800/80 bg-zinc-900/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 flex-1 pr-1 truncate">
                  <button
                    type="button"
                    onClick={() => onSphereChange(sphere.id, 'isAffinity', !sphere.isAffinity)}
                    title={
                      sphere.isAffinity
                        ? 'Affinity/Specialty Sphere (Current × 7 XP). Click to toggle.'
                        : 'Non-Affinity Sphere (Current × 8 XP). Click to mark as Affinity.'
                    }
                    className={`p-0.5 rounded transition-colors ${
                      sphere.isAffinity
                        ? 'text-amber-400 hover:text-amber-300'
                        : 'text-zinc-600 hover:text-zinc-400'
                    }`}
                  >
                    <Sparkles size={14} className={sphere.isAffinity ? 'fill-amber-400' : ''} />
                  </button>

                  <span
                    className={`font-serif font-semibold text-sm truncate ${
                      isUpgraded
                        ? 'text-purple-300'
                        : sphere.isAffinity
                        ? 'text-amber-300'
                        : 'text-zinc-200'
                    }`}
                  >
                    {sphere.name}
                  </span>

                  {isUpgraded && (
                    <span className="text-[10px] bg-purple-950/80 text-purple-300 px-1 py-0.2 rounded border border-purple-500/40">
                      +{sphere.target - sphere.base}
                    </span>
                  )}
                </div>

                <DotRating
                  base={sphere.base}
                  target={sphere.target}
                  min={0}
                  max={5}
                  mode={mode}
                  onBaseChange={(newBase) => onSphereChange(sphere.id, 'base', newBase)}
                  onTargetChange={(newTarget) => onSphereChange(sphere.id, 'target', newTarget)}
                  ariaLabel={sphere.name}
                />
              </div>

              {exceedsArete && (
                <div className="flex items-center gap-1 text-[11px] text-red-400 mt-1 font-sans">
                  <AlertTriangle size={12} className="shrink-0" />
                  <span>Exceeds Arete ({areteValue})</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
