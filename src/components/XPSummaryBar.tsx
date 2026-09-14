import React, { useState } from 'react';
import { EditMode, PlanCalculationResult } from '../types/character';
import {
  Sparkles,
  Edit3,
  ListOrdered,
  RotateCcw,
  AlertTriangle,
  Download,
  Upload,
  X,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';

interface XPSummaryBarProps {
  mode: EditMode;
  onModeChange: (newMode: EditMode) => void;
  plan: PlanCalculationResult;
  onResetUpgrades: () => void;
  onExportJson: () => void;
  onImportJson: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const XPSummaryBar: React.FC<XPSummaryBarProps> = ({
  mode,
  onModeChange,
  plan,
  onResetUpgrades,
  onExportJson,
  onImportJson,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const upgradedCount = plan.items.length;

  return (
    <>
      {/* Sticky Bottom Control & XP Summary Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 border-t border-amber-800/50 backdrop-blur-md px-4 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Mode Switcher */}
          <div className="flex items-center bg-zinc-900/90 p-1 rounded-lg border border-zinc-800 shadow-inner">
            <button
              type="button"
              onClick={() => onModeChange('base')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-serif font-bold transition-all ${
                mode === 'base'
                  ? 'bg-amber-500 text-zinc-950 shadow-[0_0_10px_rgba(245,158,11,0.4)]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Edit3 size={14} />
              <span>1. Edit Base Stats</span>
            </button>
            <button
              type="button"
              onClick={() => onModeChange('upgrade')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-serif font-bold transition-all ${
                mode === 'upgrade'
                  ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.6)]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Sparkles size={14} />
              <span>2. Plan XP Upgrades</span>
            </button>
          </div>

          {/* Warning notice if any */}
          {plan.warnings.length > 0 && (
            <div
              className="flex items-center gap-1.5 text-xs text-red-400 bg-red-950/40 border border-red-800/60 px-3 py-1 rounded cursor-pointer"
              onClick={() => setIsDrawerOpen(true)}
            >
              <AlertTriangle size={14} className="shrink-0" />
              <span>{plan.warnings.length} Rule Notice(s)</span>
            </div>
          )}

          {/* XP Total & Action Buttons */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gradient-to-r from-zinc-900 via-purple-950/30 to-zinc-900 border border-purple-800/40 px-3.5 py-1.5 rounded-lg shadow-inner">
              <span className="text-xs font-serif text-zinc-400 uppercase tracking-wider">Total XP Required:</span>
              <span className="text-lg md:text-xl font-mono font-bold text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
                {plan.totalXp} XP
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-lg text-xs font-semibold border border-zinc-700 transition-colors"
              title="View step-by-step upgrade breakdown ledger"
            >
              <ListOrdered size={14} />
              <span className="hidden sm:inline">Ledger</span>
              <span className="bg-purple-900/80 text-purple-300 text-[10px] px-1.5 py-0.2 rounded font-mono">
                {upgradedCount}
              </span>
              {isDrawerOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </button>

            {upgradedCount > 0 && (
              <button
                type="button"
                onClick={onResetUpgrades}
                className="flex items-center gap-1 bg-zinc-900 hover:bg-red-950/60 text-zinc-300 hover:text-red-300 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-zinc-800 hover:border-red-800 transition-colors"
                title="Reset all planned upgrades back to base values"
              >
                <RotateCcw size={13} />
                <span className="hidden md:inline">Reset Upgrades</span>
              </button>
            )}

            <button
              type="button"
              onClick={onExportJson}
              className="p-1.5 text-zinc-400 hover:text-amber-300 transition-colors"
              title="Export Character Sheet & Plan to JSON"
            >
              <Download size={16} />
            </button>

            <label className="p-1.5 text-zinc-400 hover:text-amber-300 transition-colors cursor-pointer" title="Import Character JSON">
              <Upload size={16} />
              <input type="file" accept=".json" onChange={onImportJson} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Upgrade Ledger Modal / Slide-up Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-end md:items-center p-0 md:p-4">
          <div className="bg-zinc-950 border border-amber-900/60 w-full max-w-3xl rounded-t-xl md:rounded-xl shadow-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-amber-900/40 bg-zinc-900/60">
              <div className="flex items-center gap-2">
                <ListOrdered className="text-amber-400" size={18} />
                <h3 className="font-gothic font-bold text-amber-300 text-base md:text-lg uppercase">
                  M20 Experience Point Upgrade Ledger
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="text-zinc-400 hover:text-zinc-100 p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto space-y-4 text-xs md:text-sm flex-1">
              {/* Rule Warnings */}
              {plan.warnings.length > 0 && (
                <div className="bg-red-950/40 border border-red-800/80 rounded-lg p-3 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-red-400 uppercase text-xs">
                    <AlertTriangle size={14} />
                    <span>M20 Rule Validations:</span>
                  </div>
                  {plan.warnings.map((warn, i) => (
                    <p key={i} className="text-red-200 text-xs pl-5 font-serif">
                      • {warn}
                    </p>
                  ))}
                </div>
              )}

              {/* Items List */}
              {plan.items.length === 0 ? (
                <div className="text-center py-8 text-zinc-500 font-serif italic">
                  No upgrades planned yet. Switch to "Plan XP Upgrades" mode and click higher dots on the character sheet to plan upgrades!
                </div>
              ) : (
                <div className="space-y-3">
                  {plan.items.map((item) => (
                    <div
                      key={item.traitId}
                      className="bg-zinc-900/70 border border-zinc-800 rounded-lg p-3 space-y-2"
                    >
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-amber-300 text-sm">
                            {item.traitName}
                          </span>
                          <span className="text-xs font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-700/50">
                            {item.baseRating} → {item.targetRating} (+{item.targetRating - item.baseRating} dots)
                          </span>
                          {item.notes && (
                            <span className="text-[11px] text-zinc-400 italic">
                              ({item.notes})
                            </span>
                          )}
                        </div>
                        <span className="font-mono font-bold text-amber-400 text-sm">
                          {item.totalCost} XP
                        </span>
                      </div>

                      {/* Step-by-step breakdown */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-[11px] font-mono text-zinc-300">
                        {item.steps.map((step, sIdx) => (
                          <div
                            key={sIdx}
                            className="bg-zinc-950/80 px-2 py-1 rounded border border-zinc-800/80 flex items-center justify-between"
                          >
                            <span className="text-zinc-400">
                              Dot {step.from} → {step.to}: {step.formula}
                            </span>
                            <span className="text-purple-300 font-semibold">{step.cost} XP</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-amber-900/40 bg-zinc-900/60 flex items-center justify-between">
              <span className="font-serif text-xs text-zinc-400">
                Calculated according to M20 Core p. 336
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-serif font-bold text-zinc-300 uppercase">Total:</span>
                <span className="text-lg font-mono font-bold text-amber-300">
                  {plan.totalXp} XP
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
