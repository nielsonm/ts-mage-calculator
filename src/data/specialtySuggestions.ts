/**
 * Thematic Specialty Suggestions for M20 Character Traits
 * 
 * In the Storyteller system, traits reaching 4 or more dots allow
 * the character to designate specialized areas of expertise, focus, or style.
 * Official rulebook page numbers reference the M20 Core Rulebook.
 */

export interface TraitSpecialtyInfo {
  page: number;
  book?: string;
  suggestions: string[];
}

export const GENERAL_MECHANICAL_EFFECTS = [
  '10s Count as Two Successes',
  '-1 Target Difficulty on Specialized Tasks',
  'Reroll Failed 10s',
  'Auto-Success on Routine Feats',
];

export const ATTRIBUTE_SPECIALTIES: Record<string, TraitSpecialtyInfo> = {
  // Physical Attributes (M20 Core p. 273)
  strength: {
    page: 273,
    book: 'M20 Core',
    suggestions: [
      'Feats of Might',
      'Crushing Grip',
      'Deadlifting',
      'Brute Force',
      'Explosive Power',
      'Iron Thews',
    ],
  },
  dexterity: {
    page: 273,
    book: 'M20 Core',
    suggestions: [
      'Lightning Reflexes',
      'Acrobatic Agility',
      'Sleight of Hand',
      'Flawless Balance',
      'Precise Fingering',
      'Swift Footwork',
    ],
  },
  stamina: {
    page: 273,
    book: 'M20 Core',
    suggestions: [
      'Iron Constitution',
      'Pain Tolerance',
      'Endurance Running',
      'Tough as Nails',
      'Unrelenting Drive',
      'Resistant to Toxins',
    ],
  },

  // Social Attributes (M20 Core p. 274)
  charisma: {
    page: 274,
    book: 'M20 Core',
    suggestions: [
      'Inspiring Oratory',
      'Magnetic Presence',
      'Natural Empathy',
      'Regal Bearing',
      'Gentle Persuasion',
      'Fierce Conviction',
    ],
  },
  manipulation: {
    page: 274,
    book: 'M20 Core',
    suggestions: [
      'Silver Tongue',
      'Subtle Insinuation',
      'Negotiation & Bargaining',
      'Misdirection & Feints',
      'Emotional Leverage',
      'Plausible Deniability',
    ],
  },
  appearance: {
    page: 274,
    book: 'M20 Core',
    suggestions: [
      'Striking Demeanor',
      'Eerie & Mystic Allure',
      'Unassuming Blandness',
      'Regal Elegance',
      'Commanding Countenance',
      'Disarming Smile',
    ],
  },

  // Mental Attributes (M20 Core p. 274-275)
  perception: {
    page: 274,
    book: 'M20 Core',
    suggestions: [
      'Keen Senses',
      'Micro-Expressions',
      'Hidden Details & Clues',
      'Auditory Acuity',
      'Spatial Awareness',
      'Gut Intuition',
    ],
  },
  intelligence: {
    page: 275,
    book: 'M20 Core',
    suggestions: [
      'Encyclopedic Recall',
      'Analytical Deduction',
      'Lateral Problem-Solving',
      'Theoretical Modeling',
      'Pattern Recognition',
      'Strategic Foresight',
    ],
  },
  wits: {
    page: 275,
    book: 'M20 Core',
    suggestions: [
      'Split-Second Reactions',
      'Improvisational Cunning',
      'Sharp Retorts',
      'Combat Triage',
      'Instinctive Adaptation',
      'Snappy Assessment',
    ],
  },
};

export const ABILITY_SPECIALTIES: Record<string, TraitSpecialtyInfo> = {
  // Talents (M20 Core p. 275-279)
  alertness: {
    page: 275,
    book: 'M20 Core',
    suggestions: [
      'Ambush Detection',
      'Subtle Sounds',
      'Peripheral Motion',
      'Crowd Dynamics',
      'Eavesdropping',
    ],
  },
  art: {
    page: 275,
    book: 'M20 Core',
    suggestions: [
      'Illumination & Calligraphy',
      'Classical Painting',
      'Sculpting',
      'Sacred Geometry',
      'Avant-Garde Compositions',
    ],
  },
  athletics: {
    page: 276,
    book: 'M20 Core',
    suggestions: [
      'Parkour & Free-Running',
      'Long-Distance Swimming',
      'Climbing Sheer Surfaces',
      'Acrobatic Tumbling',
      'Sprinting',
    ],
  },
  awareness: {
    page: 276,
    book: 'M20 Core',
    suggestions: [
      'Ethereal Resonance',
      'Aura Sight Sensations',
      'Shifts in the Gauntlet',
      'Paradox Static',
      'Tangled Fates',
    ],
  },
  brawl: {
    page: 276,
    book: 'M20 Core',
    suggestions: [
      'Grappling & Submissions',
      'Haymakers & Power Strikes',
      'Street Scrapping',
      'Disarming Throws',
      'Joint Locks',
    ],
  },
  empathy: {
    page: 277,
    book: 'M20 Core',
    suggestions: [
      'Reading Micro-Expressions',
      'Detecting Deception',
      'Calming Hysteria',
      'Psychological Profiling',
      'Hidden Motives',
    ],
  },
  expression: {
    page: 278,
    book: 'M20 Core',
    suggestions: [
      'Poetic Recitation',
      'Political Speeches',
      'Passionate Manifesto',
      'Satirical Wit',
      'Dramatic Performance',
    ],
  },
  intimidation: {
    page: 278,
    book: 'M20 Core',
    suggestions: [
      'Veiled Threats',
      'Physical Looming',
      'Cold Clinical Stare',
      'Supernatural Dread',
      'Bureaucratic Leverage',
    ],
  },
  leadership: {
    page: 278,
    book: 'M20 Core',
    suggestions: [
      'Crisis Management',
      'Inspiring Loyalty',
      'Cabal Coordination',
      'Tactical Command',
      'Public Governance',
    ],
  },
  streetwise: {
    page: 279,
    book: 'M20 Core',
    suggestions: [
      'Black Markets',
      'Gang Territory & Etiquette',
      'Fences & Safehouses',
      'Urban Rumors',
      'Evading Authorities',
    ],
  },
  subterfuge: {
    page: 279,
    book: 'M20 Core',
    suggestions: [
      'Deep Cover Personas',
      'Flawless Lies',
      'Seductive Guile',
      'Concealing Intent',
      'Planting False Clues',
    ],
  },

  // Skills (M20 Core p. 279-283)
  crafts: {
    page: 279,
    book: 'M20 Core',
    suggestions: [
      'Alchemical Forging',
      'Hermetic Talismans',
      'Clockwork & Fine Mechanics',
      'Carpentry & Architecture',
      'Leatherworking & Bookbinding',
    ],
  },
  drive: {
    page: 280,
    book: 'M20 Core',
    suggestions: [
      'High-Speed Pursuits',
      'Evasive Maneuvers',
      'Heavy Rigs & Trucks',
      'Motorcycles',
      'Rough Terrain Off-Roading',
    ],
  },
  etiquette: {
    page: 280,
    book: 'M20 Core',
    suggestions: [
      'Hermetic Formalities',
      'High Society Protocol',
      'Underworld Polite Custom',
      'Diplomatic Immunity',
      'Occult Lodges',
    ],
  },
  firearms: {
    page: 280,
    book: 'M20 Core',
    suggestions: [
      'Pistols & Concealed Carry',
      'Sniper Rifles',
      'Quick Draw',
      'Tactical Reloads',
      'Suppressor Handling',
    ],
  },
  martialArts: {
    page: 280,
    book: 'M20 Core',
    suggestions: [
      'Internal Soft Styles',
      'Hard External Strikes',
      'Defensive Redirection',
      'Pressure Points',
      'Staff & Weapon Forms',
    ],
  },
  meditation: {
    page: 281,
    book: 'M20 Core',
    suggestions: [
      'Centering the Avatar',
      'Trance Induction',
      'Void Mind',
      'Breathing Control',
      'Cleansing Negative Resonance',
    ],
  },
  melee: {
    page: 281,
    book: 'M20 Core',
    suggestions: [
      'Fencing Swords & Rapiers',
      'Two-Handed Heavy Blades',
      'Combat Knives',
      'Staves & Polearms',
      'Improvised Blunt Weapons',
    ],
  },
  research: {
    page: 282,
    book: 'M20 Core',
    suggestions: [
      'Ancient Grimoires',
      'Digital Archives & Leaks',
      'Genealogical Tracing',
      'Esoteric Cross-Referencing',
      'Cross-Tradition Lore',
    ],
  },
  stealth: {
    page: 282,
    book: 'M20 Core',
    suggestions: [
      'Shadow Movement',
      'Urban Blending',
      'Silent Infiltration',
      'Camouflage in Wilderness',
      'Tail Tracking',
    ],
  },
  survival: {
    page: 282,
    book: 'M20 Core',
    suggestions: [
      'Urban Scavenging',
      'Deep Wilderness Foraging',
      'Desert & Wasteland Endurance',
      'Tracking Trails',
      'Shelter Building',
    ],
  },
  technology: {
    page: 282,
    book: 'M20 Core',
    suggestions: [
      'Cybernetic Interfaces',
      'Digital Security Hardware',
      'Signal Interception',
      'Jury-Rigging Devices',
      'Technomantic Gizmos',
    ],
  },

  // Knowledges (M20 Core p. 283-288)
  academics: {
    page: 283,
    book: 'M20 Core',
    suggestions: [
      'Classical Philosophy',
      'Medieval Latin & Greek',
      'World History',
      'Linguistics',
      'Anthropology',
    ],
  },
  computer: {
    page: 283,
    book: 'M20 Core',
    suggestions: [
      'Penetration Testing / Hacking',
      'System Encryption',
      'Neural Net Architecture',
      'Data Recovery',
      'Network Intrusion',
    ],
  },
  cosmology: {
    page: 284,
    book: 'M20 Core',
    suggestions: [
      'The Umbral Realms',
      'Spirit Hierarchy & Courts',
      'Near Gauntlet Navigation',
      'Deep Umbra Voids',
      'Horizon Realms',
    ],
  },
  enigmas: {
    page: 284,
    book: 'M20 Core',
    suggestions: [
      'Cryptic Riddles',
      'Alchemical Ciphers',
      'Sphinx Conundrums',
      'Mystical Paradoxes',
      'Symbolic Logic Puzzles',
    ],
  },
  esoterica: {
    page: 284,
    book: 'M20 Core',
    suggestions: [
      'Hermetic Qabalah',
      'Gnostic Scriptures',
      'Tarot Symbolism',
      'Astrological Transits',
      'Alchemical Allegories',
    ],
  },
  investigation: {
    page: 286,
    book: 'M20 Core',
    suggestions: [
      'Forensic Scene Reconstruction',
      'Witness Interrogation',
      'Financial Auditing',
      'Ballistics Analysis',
      'Uncovering Occult Cover-ups',
    ],
  },
  law: {
    page: 286,
    book: 'M20 Core',
    suggestions: [
      'Tradition Tribunal Precedents',
      'International Corporate Law',
      'Criminal Defense',
      'Contract Loopholes',
      'Intellectual Property',
    ],
  },
  medicine: {
    page: 286,
    book: 'M20 Core',
    suggestions: [
      'Trauma Surgery',
      'Toxicology & Poison Antidotes',
      'Neuropharmacology',
      'Holistic Herbalism',
      'Forensic Pathology',
    ],
  },
  occult: {
    page: 286,
    book: 'M20 Core',
    suggestions: [
      'Ascension Traditions History',
      'Demonology & Goetia',
      'Vampiric & Lupine Lore',
      'Ancient Sumerian Invocations',
      'Necromancy & Ghost Lore',
    ],
  },
  politics: {
    page: 287,
    book: 'M20 Core',
    suggestions: [
      'Chantry & Council Politics',
      'Grassroots Activism',
      'Technocracy Front Organizations',
      'Geopolitical Dynamics',
      'Lobbying & Influence',
    ],
  },
  science: {
    page: 288,
    book: 'M20 Core',
    suggestions: [
      'Quantum Physics',
      'Organic Chemistry',
      'Genetics & Cellular Biology',
      'Astronomy & Astrophysics',
      'Materials Science',
    ],
  },
};

/**
 * Helper to fetch detailed trait specialty reference info including page number.
 */
export function getTraitSpecialtyInfo(
  traitId: string,
  categoryType: 'attribute' | 'ability'
): TraitSpecialtyInfo | undefined {
  const normalizedId = traitId.toLowerCase().replace(/[^a-z0-9]/g, '');

  if (categoryType === 'attribute') {
    return ATTRIBUTE_SPECIALTIES[normalizedId] || ATTRIBUTE_SPECIALTIES[traitId];
  }

  return ABILITY_SPECIALTIES[normalizedId] || ABILITY_SPECIALTIES[traitId];
}

/**
 * Helper to fetch specialty suggestions for any given trait (backward-compatible).
 */
export function getSpecialtiesForTrait(
  traitId: string,
  categoryType: 'attribute' | 'ability'
): string[] {
  const info = getTraitSpecialtyInfo(traitId, categoryType);
  return info ? info.suggestions : [];
}
