# Contributing to Mage: The Ascension (M20) Calculator

Thank you for your interest in contributing to the **M20 Character Sheet & XP Calculator**! This project provides Mage: The Ascension 20th Anniversary Edition players and Storytellers with a reliable, mathematically accurate character builder and XP progression planner.

Whether you are reporting a bug, proposing an enhancement, adding official M20 sourcebook data, or fixing code, we welcome your contributions.

---

## 📋 Table of Contents

1. [Code of Conduct](#-code-of-conduct)
2. [Development Setup](#-development-setup)
3. [Development Workflow](#-development-workflow)
4. [Coding Standards](#-coding-standards)
5. [Testing Guidelines](#-testing-guidelines)
6. [Submitting a Pull Request](#-submitting-a-pull-request)
7. [M20 Rules Fidelity](#-m20-rules-fidelity)

---

## 🤝 Code of Conduct

We are committed to providing a friendly, safe, and welcoming environment for all contributors, regardless of experience level, background, or identity. Please be respectful, constructive, and open to feedback in all discussions and reviews.

---

## 🛠️ Development Setup

### Prerequisites

- **Node.js**: `v18.0.0` or higher
- **Package Manager**: [Yarn](https://yarnpkg.com/) (v1.22+ or Berry) or `npm` (v9+)
- **Git**

### Step-by-Step Setup

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/ts-mage-calculator.git
   cd ts-mage-calculator
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Start the local development server:**
   ```bash
   yarn dev
   # or
   npm run dev
   ```
   Open `http://localhost:5173` to see the application live with Vite Hot Module Replacement (HMR).

4. **Verify tests and build:**
   ```bash
   yarn test
   yarn build
   ```

---

## 🌿 Development Workflow

### Branch Naming Conventions

Create a dedicated feature or bugfix branch off `main`:

```bash
git checkout -b <type>/<short-description>
```

Recommended branch prefixes:
- `feat/` — New user-facing features or capabilities (e.g. `feat/merits-and-flaws`)
- `fix/` — Bug fixes or calculation corrections (e.g. `fix/sphere-affinity-cost`)
- `docs/` — Documentation updates or additions (e.g. `docs/user-guide`)
- `refactor/` — Code refactoring without changing user-facing functionality (e.g. `refactor/component-cleanup`)
- `test/` — Adding or updating test suites (e.g. `test/arete-seeking-checks`)

> [!NOTE]
> For automated pair programming and AI agents: Never execute destructive or unauthorized git operations. Version control actions (committing, pushing, merging, tagging) are managed directly by the developer.

### Commit Messages

We adhere to [Conventional Commits](https://www.conventionalcommits.org/):

```text
<type>(<scope>): <short description in present imperative tense>

[optional body explaining rationale and background]

[optional footer(s), e.g., Fixes #123]
```

**Examples:**
- `feat(engine): add configurable house rules for background costs`
- `fix(spheres): correct affinity sphere calculation formula`
- `docs(readme): add installation instructions and M20 table`
- `test(calculator): add edge case tests for 0 to 5 ability upgrade`

---

## 📐 Coding Standards

### TypeScript & Strict Typing
- We use strict TypeScript (`strict: true` in [`tsconfig.json`](file:///home/mike/Documents/TTRPG/Mage/ts-mage-calculator/tsconfig.json)).
- Avoid using `any` or `unknown` without explicit type guards.
- All domain structures must be typed in [`src/types/character.ts`](file:///home/mike/Documents/TTRPG/Mage/ts-mage-calculator/src/types/character.ts).
- Export types and interfaces cleanly and prefer descriptive property names.

### Architecture & Separation of Concerns
- **Pure Calculation Engine**: Mathematical rules live in [`src/engine/xpCalculator.ts`](file:///home/mike/Documents/TTRPG/Mage/ts-mage-calculator/src/engine/xpCalculator.ts). Do not embed XP calculation formulas inside React components.
- **Rules Configuration**: All multiplier constants and flat costs are defined in [`XPRuleConfig`](file:///home/mike/Documents/TTRPG/Mage/ts-mage-calculator/src/engine/xpCalculator.ts#L8) and default to [`DEFAULT_M20_RULES`](file:///home/mike/Documents/TTRPG/Mage/ts-mage-calculator/src/engine/xpCalculator.ts#L20).
- **UI Components**: Components in [`src/components/`](file:///home/mike/Documents/TTRPG/Mage/ts-mage-calculator/src/components/) focus strictly on rendering, event handling, and accessible UI.
- **State Management**: Top-level state lives in [`src/App.tsx`](file:///home/mike/Documents/TTRPG/Mage/ts-mage-calculator/src/App.tsx) with immutable state updates. Avoid direct state mutations.

### Styling & Design System
- Use [Tailwind CSS](https://tailwindcss.com/) classes for styling.
- Follow the arcane / occult theme palette (dark slate backgrounds, amber/gold accents, violet/purple magical highlights, emerald success cues).
- Keep controls keyboard-accessible and touch-friendly (dot controls, dropdowns, modal drawers).
- Use [Lucide React](https://lucide.dev/) icons consistently.

---

## 🧪 Testing Guidelines

We use [Vitest](https://vitest.dev/) for unit testing. All calculation logic and rules validations must have corresponding test coverage.

### Running Tests

```bash
# Run tests once
yarn test

# Run tests in watch mode
npx vitest

# Run tests with UI
npx vitest --ui
```

### Adding New Tests

When adding or modifying rules or traits:
1. Locate [`tests/xpCalculator.test.ts`](file:///home/mike/Documents/TTRPG/Mage/ts-mage-calculator/tests/xpCalculator.test.ts).
2. Write unit tests testing:
   - Single step increases (e.g. 1 -> 2, 2 -> 3).
   - Multi-dot leaps (e.g. 0 -> 4, 1 -> 5).
   - Flat costs (new abilities at 3 XP, new spheres at 10 XP).
   - Boundary checks (target <= base returning 0 XP).
   - Validation warnings (e.g. Sphere rating > Arete).
3. Verify that all tests pass:
   ```bash
   yarn test
   ```

---

## 🚀 Submitting a Pull Request

Before opening a pull request, ensure you have completed the following checklist:

### Pre-Submission Checklist

- [ ] Ran `yarn test` and all unit tests pass with zero failures.
- [ ] Ran `yarn build` and the TypeScript compiler produces zero diagnostics or errors.
- [ ] Code follows project formatting and styling standards.
- [ ] If changing or introducing new game rules, cited the specific M20 Core rulebook page or supplement.
- [ ] Updated corresponding documentation in [`docs/`](file:///home/mike/Documents/TTRPG/Mage/ts-mage-calculator/docs/) or [`README.md`](file:///home/mike/Documents/TTRPG/Mage/ts-mage-calculator/README.md) if user-facing behavior changed.

### Pull Request Description Template

```markdown
### Summary of Changes
- Briefly describe what was added, changed, or fixed.

### Motivation & Context
- Why is this change necessary? Link any related issues (`Fixes #...`).

### M20 Reference (if applicable)
- E.g., *Mage: The Ascension 20th Anniversary Edition Core Rulebook*, p. 336.

### Testing Done
- List unit tests added or manual test scenarios verified in the browser.
```

---

## 📖 M20 Rules Fidelity

Mage 20th Anniversary Edition has precise character advancement rules:

- **Attributes**: Current Rating × 4 XP (p. 336)
- **Abilities**: New = 3 XP flat; Current Rating × 2 XP (p. 336)
- **Spheres**: New = 10 XP flat; Affinity Sphere = Current Rating × 7 XP; Non-Affinity = Current Rating × 8 XP (p. 336)
- **Arete**: Current Rating × 8 XP (p. 336) — Requires a narrative Seeking.
- **Willpower**: Current Rating × 1 XP (p. 336)
- **Backgrounds**: Storyteller option: New = 3 XP; Existing = Current Rating × 2 XP (p. 336)
- **Spheres Capped by Arete**: A mage cannot possess a Sphere rating exceeding their Arete rating (p. 66, 331).

Any contributions adjusting these formulas must be justified against printed source material or implemented as optional Storyteller rule toggles in [`XPRuleConfig`](file:///home/mike/Documents/TTRPG/Mage/ts-mage-calculator/src/engine/xpCalculator.ts#L8).
