import React from 'react';
import { CharacterHeader } from '../types/character';

interface SheetHeaderProps {
  header: CharacterHeader;
  onChange: (field: keyof CharacterHeader, value: string) => void;
}

export const SheetHeader: React.FC<SheetHeaderProps> = ({ header, onChange }) => {
  return (
    <div className="border border-amber-900/40 bg-zinc-950/60 p-4 md:p-6 rounded-lg backdrop-blur-sm shadow-inner">
      <div className="text-center mb-6 border-b border-amber-900/30 pb-4">
        <h1 className="text-2xl md:text-4xl font-gothic font-bold text-amber-300 tracking-widest uppercase drop-shadow-[0_2px_8px_rgba(200,155,60,0.3)]">
          Mage: The Ascension
        </h1>
        <p className="text-xs md:text-sm text-zinc-400 font-serif tracking-wider uppercase mt-1">
          20th Anniversary Edition • Character Advancement & XP Ledger
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-6 text-sm">
        {/* Column 1 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-1">
            <span className="text-amber-400/90 font-serif font-semibold text-xs uppercase w-20">Name:</span>
            <input
              type="text"
              value={header.name}
              onChange={(e) => onChange('name', e.target.value)}
              className="bg-transparent text-zinc-100 flex-1 focus:outline-none focus:border-amber-500 font-medium"
              placeholder="Character Name"
            />
          </div>
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-1">
            <span className="text-amber-400/90 font-serif font-semibold text-xs uppercase w-20">Player:</span>
            <input
              type="text"
              value={header.player}
              onChange={(e) => onChange('player', e.target.value)}
              className="bg-transparent text-zinc-100 flex-1 focus:outline-none focus:border-amber-500 font-medium"
              placeholder="Player Name"
            />
          </div>
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-1">
            <span className="text-amber-400/90 font-serif font-semibold text-xs uppercase w-20">Chronicle:</span>
            <input
              type="text"
              value={header.chronicle}
              onChange={(e) => onChange('chronicle', e.target.value)}
              className="bg-transparent text-zinc-100 flex-1 focus:outline-none focus:border-amber-500 font-medium"
              placeholder="Chronicle Title"
            />
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-1">
            <span className="text-amber-400/90 font-serif font-semibold text-xs uppercase w-20">Nature:</span>
            <input
              type="text"
              value={header.nature}
              onChange={(e) => onChange('nature', e.target.value)}
              className="bg-transparent text-zinc-100 flex-1 focus:outline-none focus:border-amber-500 font-medium"
              placeholder="Nature"
            />
          </div>
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-1">
            <span className="text-amber-400/90 font-serif font-semibold text-xs uppercase w-20">Demeanor:</span>
            <input
              type="text"
              value={header.demeanor}
              onChange={(e) => onChange('demeanor', e.target.value)}
              className="bg-transparent text-zinc-100 flex-1 focus:outline-none focus:border-amber-500 font-medium"
              placeholder="Demeanor"
            />
          </div>
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-1">
            <span className="text-amber-400/90 font-serif font-semibold text-xs uppercase w-20">Concept:</span>
            <input
              type="text"
              value={header.concept}
              onChange={(e) => onChange('concept', e.target.value)}
              className="bg-transparent text-zinc-100 flex-1 focus:outline-none focus:border-amber-500 font-medium"
              placeholder="Concept"
            />
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-1">
            <span className="text-amber-400/90 font-serif font-semibold text-xs uppercase w-20">Essence:</span>
            <input
              type="text"
              value={header.essence}
              onChange={(e) => onChange('essence', e.target.value)}
              className="bg-transparent text-zinc-100 flex-1 focus:outline-none focus:border-amber-500 font-medium"
              placeholder="Essence (Dynamic/Questing...)"
            />
          </div>
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-1">
            <span className="text-amber-400/90 font-serif font-semibold text-xs uppercase w-20">Affiliation:</span>
            <input
              type="text"
              value={header.tradition}
              onChange={(e) => onChange('tradition', e.target.value)}
              className="bg-transparent text-zinc-100 flex-1 focus:outline-none focus:border-amber-500 font-medium"
              placeholder="Tradition / Convention / Disparate"
            />
          </div>
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-1">
            <span className="text-amber-400/90 font-serif font-semibold text-xs uppercase w-20">Cabal:</span>
            <input
              type="text"
              value={header.cabal}
              onChange={(e) => onChange('cabal', e.target.value)}
              className="bg-transparent text-zinc-100 flex-1 focus:outline-none focus:border-amber-500 font-medium"
              placeholder="Cabal / Chantry"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
