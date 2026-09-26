import React, { useState } from 'react';
import { EditMode } from '../types/character';

interface DotRatingProps {
  base: number;
  target: number;
  max?: number;
  min?: number;
  mode: EditMode;
  onBaseChange: (newBase: number) => void;
  onTargetChange: (newTarget: number) => void;
  ariaLabel?: string;
}

export const DotRating: React.FC<DotRatingProps> = ({
  base,
  target,
  max = 5,
  min = 0,
  mode,
  onBaseChange,
  onTargetChange,
  ariaLabel = 'Rating',
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const handleDotClick = (dotIndex: number) => {
    if (mode === 'base') {
      if (dotIndex === base && dotIndex > min) {
        // Toggle down if clicking current base dot
        const newBase = dotIndex - 1;
        onBaseChange(newBase);
        if (target < newBase) onTargetChange(newBase);
      } else if (dotIndex === base && dotIndex === min && min === 0) {
        onBaseChange(0);
      } else {
        const newBase = Math.max(min, dotIndex);
        onBaseChange(newBase);
        if (target < newBase) {
          onTargetChange(newBase);
        }
      }
    } else {
      // Upgrade mode
      if (dotIndex < base) {
        // Clicking below base in upgrade mode resets target back to base
        onTargetChange(base);
      } else if (dotIndex === target && target > base) {
        // Clicking current upgraded dot toggles back to previous or base
        onTargetChange(dotIndex - 1 >= base ? dotIndex - 1 : base);
      } else {
        onTargetChange(dotIndex);
      }
    }
  };

  const dots = Array.from({ length: max }, (_, idx) => idx + 1);

  return (
    <div
      className="flex items-center gap-1.5 select-none"
      role="group"
      aria-label={ariaLabel}
      onMouseLeave={() => setHoverIndex(null)}
    >
      {dots.map((dotIndex) => {
        const isBaseFilled = dotIndex <= base;
        const isTargetFilled = dotIndex > base && dotIndex <= target;
        const isMasteryDot = dotIndex > 4;
        
        let dotStyle = 'border-zinc-700 bg-zinc-900/80 hover:border-zinc-500';

        if (isBaseFilled) {
          dotStyle = isMasteryDot
            ? 'border-amber-300 bg-amber-400 dot-mastery-base ring-1 ring-amber-400/80'
            : 'border-amber-500 bg-amber-400 shadow-[0_0_5px_rgba(245,158,11,0.5)]';
        } else if (isTargetFilled) {
          dotStyle = isMasteryDot
            ? 'border-pink-300 bg-purple-500 dot-mastery-upgrade ring-1 ring-pink-400/80'
            : 'border-purple-300 bg-purple-500 dot-upgraded';
        }

        // Preview style during hover in upgrade mode
        if (mode === 'upgrade' && hoverIndex !== null && hoverIndex >= base) {
          if (dotIndex > base && dotIndex <= hoverIndex) {
            dotStyle = isMasteryDot
              ? 'border-pink-300 bg-purple-600/90 shadow-[0_0_14px_rgba(236,72,153,0.9)] ring-1 ring-pink-300'
              : 'border-purple-300 bg-purple-600/80 shadow-[0_0_8px_rgba(168,85,247,0.7)]';
          }
        } else if (mode === 'base' && hoverIndex !== null) {
          if (dotIndex <= hoverIndex) {
            dotStyle = isMasteryDot
              ? 'border-amber-300 bg-amber-400/90 shadow-[0_0_12px_rgba(245,158,11,0.85)] ring-1 ring-amber-300'
              : 'border-amber-400 bg-amber-500/70';
          }
        }

        const dotTitle = isMasteryDot
          ? `Rating: ${dotIndex} [Mastery & Custom Extra Effect >4 Dots] (Base: ${base}, Target: ${target})`
          : `Rating: ${dotIndex} (Base: ${base}, Target: ${target})`;

        return (
          <button
            key={dotIndex}
            type="button"
            onClick={() => handleDotClick(dotIndex)}
            onMouseEnter={() => setHoverIndex(dotIndex)}
            className={`w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border transition-all duration-150 flex items-center justify-center cursor-pointer ${dotStyle}`}
            title={dotTitle}
            aria-label={`Set to ${dotIndex}`}
          >
            {isBaseFilled && (
              isMasteryDot ? (
                <span className="text-[8px] text-amber-950 font-bold leading-none select-none">★</span>
              ) : (
                <span className="w-1 h-1 rounded-full bg-amber-900/60"></span>
              )
            )}
            {isTargetFilled && (
              isMasteryDot ? (
                <span className="text-[8px] text-white font-bold leading-none select-none">★</span>
              ) : (
                <span className="w-1 h-1 rounded-full bg-white/90"></span>
              )
            )}
          </button>
        );
      })}
    </div>
  );
};
