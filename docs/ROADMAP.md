# Future Features Roadmap

This document outlines the planned development milestones and feature roadmap for the **ts-mage-calculator** project (*Mage: The Ascension 20th Anniversary Edition*).

For the full detailed breakdown and architecture plans, see the product artifact at `m20_future_features_roadmap.md`.

---

## 🗺️ Strategic Roadmap Overview

```text
Phase 1: Merits & Flaws System & Archetype Expansion
Phase 2: Expanded Character Sheet (Pages 2 & 3 Support)
Phase 3: Character Creation Suite & Freebie Points Engine
Phase 4: Interactive Magick Engine & Dice Roller
Phase 5: Cabal Roster, Storyteller Suite & Chronicle Tools
Phase 6: Export, Interoperability & Native Ecosystem
```

---

## 📌 Phase 1: Merits & Flaws System & Archetype Expansion
- **M20 Merits & Flaws Catalog**: Searchable reference database of canonical M20 traits (Physical, Mental, Social, Supernatural/Mage-specific) with book citations and rules descriptions.
- **Unified Trait Collection Data Model**: Store traits in a single typed collection with a discriminator (`type: 'merit' | 'flaw'`), keeping data structures lean, extensible, and easy to serialize.
- **Merits & Flaws Trait Ledger**: Interactive selection panel with automatic balance calculation (+FP from Flaws, -FP from Merits) and 7-point flaw limit validation.
- **Custom Merits & Flaws**: Allow custom trait entry with point values and custom descriptions.
- **Expanded Archetype Presets**: Add pre-configured archetypes for all 9 Council Traditions, 5 Technocracy Conventions, and Disparate Crafts.

---

## 📌 Phase 2: Expanded Character Sheet (Pages 2 & 3 Support)
- **Health & Damage Track**: Bashing (/), Lethal (X), and Aggravated (*) damage tracking with automatic wound penalty calculations.
- **Resonance & Synergy**: Dynamic, Static, and Entropic trait tracks with descriptive qualities.
- **Focus, Paradigm & Instruments (Foci)**: Instrument tracking mapped per Sphere, with Arete threshold reminders (Arete 6+).
- **Wonders & Equipment**: Inventory tracking for Grimoires, Talismans, Artifacts, and Enhancements.
- **Rote Grimoire**: Custom spell catalog with Sphere prerequisites and mechanics.

---

## 📌 Phase 3: Character Creation Suite & Freebie Points Engine
- **Core Creation Point Pools**: Character creation mode with M20 initial point distribution (Attributes: 7/5/3, Abilities: 13/9/5, Spheres: 6, Backgrounds: 7, Arete: 1, Willpower: 5).
- **15 Freebie Points Engine**: Real-time spending ledger and validation against official M20 Freebie point rates.
- **Creation Mode Validation**: Interactive checks ensuring points are completely and legally distributed before enabling XP mode.
- **Merits/Flaws Freebie Integration**: Seamlessly apply Phase 1 Flaw bonuses (+FP) and Merit costs to the Freebie point ledger.

---

## 📌 Phase 4: Interactive Magick Engine & Dice Roller
- **M20 Spellcasting Calculator**: Automatic difficulty calculation (Coincidental vs. Vulgar, witnesses, Quintessence spending, personalized instruments).
- **Extended Casting Thresholds**: Target success calculator for range, duration, damage, and area.
- **Integrated Dice Roller**: Automatic Arete and trait rolls with 10s specialty exploding dice, 1s cancellation, and botch detection.
- **Paradox & Backlash Engine**: Automated Paradox pool resolution and backlash result generation.

---

## 📌 Phase 5: Cabal Roster, Storyteller Suite & Chronicle Tools
- **Multi-Character Storage**: Local `IndexedDB` manager to save, duplicate, and switch between characters.
- **Cabal & Chantry Hub**: Collective dashboard for shared Nodes, Chantry rating, and Familiars/Totems.
- **Session XP Award Ledger**: Chronological transaction logging for Storyteller awards and player dot purchases.
- **House Rules Configuration**: Customizable XP multipliers and trait ceilings (e.g., Archmage traits 6–10).

---

## 📌 Phase 6: Export, Interoperability & Native Ecosystem
- **Official PDF Form Export**: Direct generation into fillable 4-page official M20 PDF sheets using `pdf-lib`.
- **Print Optimization**: High-contrast, clean `@media print` physical sheet styles.
- **URL & QR Code Sharing**: Compressed character URL hashing for rapid mobile sharing.
- **VTT Integrations**: Exporters for Foundry VTT (Mage system) and Obsidian TTRPG markdown vaults.
- **PWA & Offline Mode**: Full offline usability for convention and tabletop play.
