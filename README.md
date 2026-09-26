# Mage: The Ascension (M20) Character Sheet & XP Calculator

[![CI](https://github.com/nielsonm/ts-mage-calculator/actions/workflows/ci.yml/badge.svg)](https://github.com/nielsonm/ts-mage-calculator/actions/workflows/ci.yml)
[![CD - Deploy to GitHub Pages](https://github.com/nielsonm/ts-mage-calculator/actions/workflows/cd.yml/badge.svg)](https://github.com/nielsonm/ts-mage-calculator/actions/workflows/cd.yml)

An interactive, responsive character sheet and real-time experience point (XP) planning calculator for **Mage: The Ascension 20th Anniversary Edition (M20)**. Built with React 18, TypeScript, Vite, and Tailwind CSS.

---

## ✨ Features

- **Dual-Mode Editing**:
  - **Base Character Mode**: Configure starting traits, attributes, abilities, spheres, and backgrounds.
  - **XP Upgrade Plan Mode**: Interactively allocate target dots to plan character advancement with instant XP calculation.
- **Accurate M20 XP Rules Engine**:
  - Implements authentic M20 Core progression formulas (Attributes, Abilities, Spheres, Arete, Willpower, and Storyteller-approved Backgrounds).
  - Handles differential costs for Affinity vs. Non-Affinity Spheres.
  - Accounts for flat costs on new traits (Abilities: 3 XP, Spheres: 10 XP).
- **Rule Validations & Alerts**:
  - Warns in real-time when any Sphere target rating exceeds the character's [`Arete`](src/types/character.ts#L62) rating.
  - Seeking reminders for Arete advancement.
- **Specialties & Mastery Effects**:
  - Interactive specialty picker drawer with verified M20 Core rulebook page citations (pp. 273–288) for all 9 Attributes and 30+ Abilities.
  - Automatic prompts and badges for custom specialties at 4+ dots and Mastery Extra Effects at 5 dots.
- **Custom Ability Support**:
  - Dynamically add and remove custom Talents, Skills, and Knowledges.
- **Persistent State**:
  - Automatically saves character sheet changes in `localStorage`.
  - One-click reset to default Hermetic researcher template.

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ recommended)
- [Yarn](https://yarnpkg.com/) or `npm`

### Installation

Clone the repository and install dependencies:

```bash
# Using Yarn
yarn install

# Or using npm
npm install
```

### Development Server

Start Vite's local development server with hot module reloading (HMR):

```bash
yarn dev
# or: npm run dev
```

Visit `http://localhost:5173` in your browser.

### Running Tests

Execute the unit test suite powered by [Vitest](https://vitest.dev/):

```bash
yarn test
# or: npm test
```

### Production Build

Typecheck with TypeScript compiler and build optimized production assets:

```bash
yarn build
# or: npm run build
```

Preview the production build locally:

```bash
yarn preview
# or: npm run preview
```

---

## 📁 Repository Structure

```text
ts-mage-calculator/
├── src/
│   ├── components/                 # React UI components
│   │   ├── AbilitiesSection.tsx    # Talents, Skills, Knowledges tables & custom abilities
│   │   ├── AdvantagesSection.tsx   # Arete, Willpower, Backgrounds, Quintessence, Paradox
│   │   ├── AttributesSection.tsx   # Physical, Social, Mental attributes
│   │   ├── DotRating.tsx           # Interactive 1-10 dot rating control
│   │   ├── ExtraEffectBadge.tsx    # 4+ dot specialty and 5 dot mastery effect badges
│   │   ├── SheetHeader.tsx         # Mage concept, nature, demeanor, tradition, cabal
│   │   ├── SpheresSection.tsx      # 9 Spheres with affinity toggle & arete validation
│   │   └── XPSummaryBar.tsx        # Floating summary bar with breakdown & warnings
│   ├── data/
│   │   └── specialtySuggestions.ts # M20 Core verified specialties & book page references
│   ├── engine/
│   │   ├── initialState.ts         # Default Hermetic character template
│   │   └── xpCalculator.ts         # Pure functional M20 XP calculation engine
│   ├── types/
│   │   └── character.ts            # Core TypeScript interfaces & domain types
│   ├── App.tsx                     # Top-level state coordinator & localStorage sync
│   ├── main.tsx                    # Application entry point
│   └── index.css                   # Tailwind CSS styling and theme definitions
├── tests/
│   └── xpCalculator.test.ts        # Comprehensive Vitest test suite for XP engine
├── docs/
│   ├── ARCHITECTURE.md             # System architecture and data flow
│   ├── USER_GUIDE.md               # End-user guide for players & Storytellers
│   └── XP_RULES.md                 # M20 XP formula reference and edge cases
├── CONTRIBUTING.md                 # Contribution guidelines, workflow, and standards
├── package.json                    # Project scripts and dependencies
├── tailwind.config.js              # Tailwind styling configuration
├── tsconfig.json                   # TypeScript compiler options
└── vite.config.ts                  # Vite bundler configuration
```

---

## 🧮 M20 XP Cost Reference

| Trait | New Rating Cost | Notes |
| :--- | :--- | :--- |
| **Attribute** | `Current Rating × 4 XP` | Specialties unlocked at dot 4; Mastery effect at dot 5 |
| **New Ability** | `3 XP` | First dot in an untrained ability |
| **Existing Ability** | `Current Rating × 2 XP` | Specialties unlocked at dot 4; Mastery effect at dot 5 |
| **New Sphere** | `10 XP` | First dot in a new sphere |
| **Affinity Sphere** | `Current Rating × 7 XP` | Designated tradition sphere |
| **Non-Affinity Sphere**| `Current Rating × 8 XP` | Other spheres |
| **Arete** | `Current Rating × 8 XP` | Requires a narrative Seeking |
| **Willpower** | `Current Rating × 1 XP` | Base dot progression |
| **Backgrounds** | `3 XP` (new) / `Current × 2 XP` | Storyteller permission required |

*For complete details, see [docs/XP_RULES.md](docs/XP_RULES.md).*

---

## 📚 Documentation Suite

- 📖 [User Guide](docs/USER_GUIDE.md) - How to use the character sheet and planner.
- 📐 [Architecture Guide](docs/ARCHITECTURE.md) - Deep dive into state management, engine design, and component hierarchy.
- 📜 [M20 XP Rules Reference](docs/XP_RULES.md) - Mathematical mechanics and book citations.
- 🤝 [Contributing Guide](CONTRIBUTING.md) - Setup instructions, coding conventions, and pull request guidelines.

---

## ⚖️ License & Attribution

*Mage: The Ascension 20th Anniversary Edition* is a trademark of Paradox Interactive AB / White Wolf Publishing. This tool is an unofficial, open-source fan utility designed for tabletop roleplaying groups.
