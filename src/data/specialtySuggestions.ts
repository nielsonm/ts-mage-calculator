/**
 * Thematic Specialty Suggestions for M20 Character Traits
 * 
 * In the Storyteller system, traits reaching 4 or more dots allow
 * the character to designate specialized areas of expertise, focus, or style.
 */

export const GENERAL_MECHANICAL_EFFECTS = [
  '10s Count as Two Successes',
  '-1 Target Difficulty on Specialized Tasks',
  'Reroll Failed 10s',
  'Auto-Success on Routine Feats',
];

export const ATTRIBUTE_SPECIALTIES: Record<string, string[]> = {
  // Physical Attributes
  strength: [
    'Feats of Might',
    'Crushing Grip',
    'Deadlifting',
    'Brute Force',
    'Explosive Power',
    'Iron Thews',
  ],
  dexterity: [
    'Lightning Reflexes',
    'Acrobatic Agility',
    'Sleight of Hand',
    'Flawless Balance',
    'Precise Fingering',
    'Swift Footwork',
  ],
  stamina: [
    'Iron Constitution',
    'Pain Tolerance',
    'Endurance Running',
    'Tough as Nails',
    'Unrelenting Drive',
    'Resistant to Toxins',
  ],

  // Social Attributes
  charisma: [
    'Inspiring Oratory',
    'Magnetic Presence',
    'Natural Empathy',
    'Regal Bearing',
    'Gentle Persuasion',
    'Fierce Conviction',
  ],
  manipulation: [
    'Silver Tongue',
    'Subtle Insinuation',
    'Negotiation & Bargaining',
    'Misdirection & Feints',
    'Emotional Leverage',
    'Plausible Deniability',
  ],
  appearance: [
    'Striking Demeanor',
    'Eerie & Mystic Allure',
    'Unassuming Blandness',
    'Regal Elegance',
    'Commanding Countenance',
    'Disarming Smile',
  ],

  // Mental Attributes
  perception: [
    'Keen Senses',
    'Micro-Expressions',
    'Hidden Details & Clues',
    'Auditory Acuity',
    'Spatial Awareness',
    'Gut Intuition',
  ],
  intelligence: [
    'Encyclopedic Recall',
    'Analytical Deduction',
    'Lateral Problem-Solving',
    'Theoretical Modeling',
    'Pattern Recognition',
    'Strategic Foresight',
  ],
  wits: [
    'Split-Second Reactions',
    'Improvisational Cunning',
    'Sharp Retorts',
    'Combat Triage',
    'Instinctive Adaptation',
    'Snappy Assessment',
  ],
};

export const ABILITY_SPECIALTIES: Record<string, string[]> = {
  // Talents
  alertness: [
    'Ambush Detection',
    'Subtle Sounds',
    'Peripheral Motion',
    'Crowd Dynamics',
    'Eavesdropping',
  ],
  art: [
    'Illumination & Calligraphy',
    'Classical Painting',
    'Sculpting',
    'Sacred Geometry',
    'Avant-Garde Compositions',
  ],
  athletics: [
    'Parkour & Free-Running',
    'Long-Distance Swimming',
    'Climbing Sheer Surfaces',
    'Acrobatic Tumbling',
    'Sprinting',
  ],
  awareness: [
    'Ethereal Resonance',
    'Aura Sight Sensations',
    'Shifts in the Gauntlet',
    'Paradox Static',
    'Tangled Fates',
  ],
  brawl: [
    'Grappling & Submissions',
    'Haymakers & Power Strikes',
    'Street Scrapping',
    'Disarming Throws',
    'Joint Locks',
  ],
  empathy: [
    'Reading Micro-Expressions',
    'Detecting Deception',
    'Calming Hysteria',
    'Psychological Profiling',
    'Hidden Motives',
  ],
  expression: [
    'Poetic Recitation',
    'Political Speeches',
    'Passionate Manifesto',
    'Satirical Wit',
    'Dramatic Performance',
  ],
  intimidation: [
    'Veiled Threats',
    'Physical Looming',
    'Cold Clinical Stare',
    'Supernatural Dread',
    'Bureaucratic Leverage',
  ],
  leadership: [
    'Crisis Management',
    'Inspiring Loyalty',
    'Cabal Coordination',
    'Tactical Command',
    'Public Governance',
  ],
  streetwise: [
    'Black Markets',
    'Gang Territory & Etiquette',
    'Fences & Safehouses',
    'Urban Rumors',
    'Evading Authorities',
  ],
  subterfuge: [
    'Deep Cover Personas',
    'Flawless Lies',
    'Seductive Guile',
    'Concealing Intent',
    'Planting False Clues',
  ],

  // Skills
  crafts: [
    'Alchemical Forging',
    'Hermetic Talismans',
    'Clockwork & Fine Mechanics',
    'Carpentry & Architecture',
    'Leatherworking & Bookbinding',
  ],
  drive: [
    'High-Speed Pursuits',
    'Evasive Maneuvers',
    'Heavy Rigs & Trucks',
    'Motorcycles',
    'Rough Terrain Off-Roading',
  ],
  etiquette: [
    'Hermetic Formalities',
    'High Society Protocol',
    'Underworld Polite Custom',
    'Diplomatic Immunity',
    'Occult Lodges',
  ],
  firearms: [
    'Pistols & Concealed Carry',
    'Sniper Rifles',
    'Quick Draw',
    'Tactical Reloads',
    'Suppressor Handling',
  ],
  martialArts: [
    'Internal Soft Styles',
    'Hard External Strikes',
    'Defensive Redirection',
    'Pressure Points',
    'Staff & Weapon Forms',
  ],
  meditation: [
    'Centering the Avatar',
    'Trance Induction',
    'Void Mind',
    'Breathing Control',
    'Cleansing Negative Resonance',
  ],
  melee: [
    'Fencing Swords & Rapiers',
    'Two-Handed Heavy Blades',
    'Combat Knives',
    'Staves & Polearms',
    'Improvised Blunt Weapons',
  ],
  research: [
    'Ancient Grimoires',
    'Digital Archives & Leaks',
    'Genealogical Tracing',
    'Esoteric Cross-Referencing',
    'Cross-Tradition Lore',
  ],
  stealth: [
    'Shadow Movement',
    'Urban Blending',
    'Silent Infiltration',
    'Camouflage in Wilderness',
    'Tail Tracking',
  ],
  survival: [
    'Urban Scavenging',
    'Deep Wilderness Foraging',
    'Desert & Wasteland Endurance',
    'Tracking Trails',
    'Shelter Building',
  ],
  technology: [
    'Cybernetic Interfaces',
    'Digital Security Hardware',
    'Signal Interception',
    'Jury-Rigging Devices',
    'Technomantic Gizmos',
  ],

  // Knowledges
  academics: [
    'Classical Philosophy',
    'Medieval Latin & Greek',
    'World History',
    'Linguistics',
    'Anthropology',
  ],
  computer: [
    'Penetration Testing / Hacking',
    'System Encryption',
    'Neural Net Architecture',
    'Data Recovery',
    'Network Intrusion',
  ],
  cosmology: [
    'The Umbral Realms',
    'Spirit Hierarchy & Courts',
    'Near Gauntlet Navigation',
    'Deep Umbra Voids',
    'Horizon Realms',
  ],
  enigmas: [
    'Cryptic Riddles',
    'Alchemical Ciphers',
    'Sphinx Conundrums',
    'Mystical Paradoxes',
    'Symbolic Logic Puzzles',
  ],
  esoterica: [
    'Hermetic Qabalah',
    'Gnostic Scriptures',
    'Tarot Symbolism',
    'Astrological Transits',
    'Alchemical Allegories',
  ],
  investigation: [
    'Forensic Scene Reconstruction',
    'Witness Interrogation',
    'Financial Auditing',
    'Ballistics Analysis',
    'Uncovering Occult Cover-ups',
  ],
  law: [
    'Tradition Tribunal Precedents',
    'International Corporate Law',
    'Criminal Defense',
    'Contract Loopholes',
    'Intellectual Property',
  ],
  medicine: [
    'Trauma Surgery',
    'Toxicology & Poison Antidotes',
    'Neuropharmacology',
    'Holistic Herbalism',
    'Forensic Pathology',
  ],
  occult: [
    'Ascension Traditions History',
    'Demonology & Goetia',
    'Vampiric & Lupine Lore',
    'Ancient Sumerian Invocations',
    'Necromancy & Ghost Lore',
  ],
  politics: [
    'Chantry & Council Politics',
    'Grassroots Activism',
    'Technocracy Front Organizations',
    'Geopolitical Dynamics',
    'Lobbying & Influence',
  ],
  science: [
    'Quantum Physics',
    'Organic Chemistry',
    'Genetics & Cellular Biology',
    'Astronomy & Astrophysics',
    'Materials Science',
  ],
};

/**
 * Helper to fetch specialty suggestions for any given trait.
 */
export function getSpecialtiesForTrait(
  traitId: string,
  categoryType: 'attribute' | 'ability'
): string[] {
  const normalizedId = traitId.toLowerCase().replace(/[^a-z0-9]/g, '');

  if (categoryType === 'attribute') {
    return ATTRIBUTE_SPECIALTIES[normalizedId] || ATTRIBUTE_SPECIALTIES[traitId] || [];
  }

  return ABILITY_SPECIALTIES[normalizedId] || ABILITY_SPECIALTIES[traitId] || [];
}
