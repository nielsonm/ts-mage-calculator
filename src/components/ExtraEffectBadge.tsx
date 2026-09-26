import React, { useState } from 'react';
import { Sparkles, Edit2, Check, X, Crown, Trash2, BookOpen } from 'lucide-react';
import {
  getSpecialtiesForTrait,
  getTraitSpecialtyInfo,
  GENERAL_MECHANICAL_EFFECTS,
} from '../data/specialtySuggestions';

export type ExtraEffectCategory = 'attribute' | 'ability';

interface ExtraEffectBadgeProps {
  traitId?: string;
  traitName: string;
  rating: number; // Math.max(base, target)
  isUpgraded: boolean; // target > base
  extraEffect?: string;
  categoryType: ExtraEffectCategory;
  onSaveEffect: (effect: string) => void;
  isEditingExternal?: boolean;
  onCloseExternalEdit?: () => void;
}

export const ExtraEffectBadge: React.FC<ExtraEffectBadgeProps> = ({
  traitId,
  traitName,
  rating,
  isUpgraded,
  extraEffect,
  categoryType,
  onSaveEffect,
  isEditingExternal,
  onCloseExternalEdit,
}) => {
  const [internalEditing, setInternalEditing] = useState(false);
  const [inputText, setInputText] = useState(extraEffect || '');

  const isEditing = isEditingExternal !== undefined ? (isEditingExternal || internalEditing) : internalEditing;

  // Render badge if rating is 4 or higher (4+ dots / >4 dots), or if an effect is already set, or if currently editing
  if (rating < 4 && !extraEffect && !isEditing) {
    return null;
  }

  // Trait-specific thematic suggestions & source reference
  const traitInfo = traitId ? getTraitSpecialtyInfo(traitId, categoryType) : undefined;
  const thematicSuggestions = traitInfo?.suggestions || (traitId ? getSpecialtiesForTrait(traitId, categoryType) : []);

  const handleOpenEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInputText(extraEffect || '');
    setInternalEditing(true);
  };

  const handleSave = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.stopPropagation();
    onSaveEffect(inputText.trim());
    setInternalEditing(false);
    if (onCloseExternalEdit) onCloseExternalEdit();
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSaveEffect('');
    setInputText('');
    setInternalEditing(false);
    if (onCloseExternalEdit) onCloseExternalEdit();
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInputText(extraEffect || '');
    setInternalEditing(false);
    if (onCloseExternalEdit) onCloseExternalEdit();
  };

  const handleSelectPreset = (preset: string) => {
    setInputText(preset);
  };

  // Label depending on rating threshold
  const isMastery = rating > 4; // 5+ dots
  const isSpecialty = rating === 4; // 4 dots

  return (
    <div className="w-full mt-1.5 pt-1.5 border-t border-amber-900/30">
      {!isEditing ? (
        <div className="flex flex-wrap items-center justify-between gap-1 text-[11px]">
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <span className="flex items-center gap-1 font-serif font-semibold shrink-0 text-amber-400">
              {isMastery ? (
                <>
                  <Crown size={11} className="text-amber-400 shrink-0" />
                  <span>&gt;4 Dots Mastery:</span>
                </>
              ) : isSpecialty ? (
                <>
                  <Sparkles size={11} className="text-amber-400 shrink-0" />
                  <span>4+ Dots Specialty:</span>
                </>
              ) : (
                <>
                  <Sparkles size={11} className="text-zinc-400 shrink-0" />
                  <span>Custom Effect:</span>
                </>
              )}
            </span>

            {extraEffect ? (
              <span
                className={`truncate px-2 py-0.5 rounded text-[11px] font-medium border flex items-center gap-1 ${
                  isUpgraded
                    ? 'bg-purple-950/70 border-purple-500/50 text-purple-200'
                    : 'bg-amber-950/50 border-amber-500/40 text-amber-200'
                }`}
                title={extraEffect}
              >
                <Sparkles size={10} className="shrink-0 text-amber-300" />
                <span className="truncate">{extraEffect}</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleOpenEdit}
                className="text-amber-400/80 hover:text-amber-200 italic hover:underline flex items-center gap-1 transition-colors"
                title={`Click to assign a custom extra effect (${isMastery ? '>4 Dots Mastery' : '4+ Dots Specialty'})`}
              >
                <Sparkles size={10} />
                <span>+ Add Custom Extra Effect</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {extraEffect && (
              <>
                <button
                  type="button"
                  onClick={handleOpenEdit}
                  className="text-zinc-400 hover:text-amber-300 p-0.5 transition-colors"
                  title="Edit custom extra effect"
                >
                  <Edit2 size={11} />
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-zinc-400 hover:text-red-400 p-0.5 transition-colors"
                  title="Remove custom extra effect"
                >
                  <Trash2 size={11} />
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div
          className="space-y-2 bg-zinc-950/90 p-2.5 rounded border border-amber-500/40 shadow-lg text-xs"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between text-zinc-300 border-b border-zinc-800 pb-1 gap-2">
            <div className="flex flex-wrap items-center gap-1.5 min-w-0">
              <span className="font-serif font-bold text-amber-300 flex items-center gap-1 text-[11px] truncate">
                <Sparkles size={12} className="text-amber-400 shrink-0" />
                <span>Custom Extra Effect for {traitName} ({isMastery ? '>4 Dots Mastery' : isSpecialty ? '4+ Dots Specialty' : 'Custom'})</span>
              </span>
              {traitInfo?.page && (
                <span
                  className="inline-flex items-center gap-1 text-[10px] bg-amber-950/70 text-amber-300 border border-amber-800/60 px-1.5 py-0.2 rounded font-serif shadow-sm shrink-0"
                  title={`Reference: ${traitInfo.book || 'M20 Core'} Page ${traitInfo.page}`}
                >
                  <BookOpen size={10} className="text-amber-400" />
                  <span>{traitInfo.book || 'M20'} p. {traitInfo.page}</span>
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={handleCancel}
              className="text-zinc-400 hover:text-zinc-200"
            >
              <X size={13} />
            </button>
          </div>

          <div>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type custom effect or select a suggestion below..."
              className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-400 px-2 py-1 rounded text-zinc-100 text-xs outline-none"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave(e);
                if (e.key === 'Escape') handleCancel(e as any);
              }}
            />
          </div>

          {/* Thematic Suggestions */}
          {thematicSuggestions.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1 font-serif">
                <span>Thematic Specialties for {traitName}:</span>
                {traitInfo?.page && (
                  <span className="text-zinc-500 italic">
                    See {traitInfo.book || 'M20'} p. {traitInfo.page} for more
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-1">
                {thematicSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleSelectPreset(suggestion)}
                    className={`text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
                      inputText === suggestion
                        ? 'bg-amber-500 text-zinc-950 border-amber-400 font-semibold'
                        : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-700 hover:border-amber-500/60'
                    }`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mechanical Rule Presets */}
          <div>
            <div className="text-[10px] text-zinc-400 mb-1 font-serif">Mechanical Rule Effects:</div>
            <div className="flex flex-wrap gap-1">
              {GENERAL_MECHANICAL_EFFECTS.map((effect) => (
                <button
                  key={effect}
                  type="button"
                  onClick={() => handleSelectPreset(effect)}
                  className={`text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
                    inputText === effect
                      ? 'bg-amber-500 text-zinc-950 border-amber-400 font-semibold'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-700 hover:border-amber-500/60'
                  }`}
                >
                  {effect}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-1.5 pt-1">
            <button
              type="button"
              onClick={handleCancel}
              className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-[11px] shadow-[0_0_8px_rgba(245,158,11,0.4)]"
            >
              <Check size={12} />
              <span>Save Effect</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
