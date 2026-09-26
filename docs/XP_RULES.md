# Mage: The Ascension (M20) Experience Point (XP) Rules

This guide outlines the official experience point progression rules and formulas for **Mage: The Ascension 20th Anniversary Edition (M20)**, as implemented in this calculator.

References: *Mage: The Ascension 20th Anniversary Edition Core Rulebook*, Chapter Six: "The Crucible of Change", p. 336.

---

## 📊 Summary of Experience Point Costs

| Trait | Cost | Rulebook Page | Notes |
| :--- | :--- | :--- | :--- |
| **Attribute** | Current Rating × 4 XP | p. 336 | Specialty chosen at Dot 4; Mastery effect at Dot 5 |
| **New Ability** | 3 XP | p. 336 | Flat cost for obtaining Dot 1 in a previously untrained ability |
| **Existing Ability** | Current Rating × 2 XP | p. 336 | Specialty chosen at Dot 4; Mastery effect at Dot 5 |
| **New Sphere** | 10 XP | p. 336 | Flat cost for obtaining Dot 1 in an unstudied Sphere |
| **Affinity Sphere** | Current Rating × 7 XP | p. 336 | Sphere assigned to the mage's Tradition / Convention / Craft |
| **Non-Affinity Sphere** | Current Rating × 8 XP | p. 336 | All other Spheres |
| **Arete** | Current Rating × 8 XP | p. 336 | Must be accompanied by a successful narrative **Seeking** |
| **Willpower** | Current Rating × 1 XP | p. 336 | Permanent Willpower rating |
| **Background** *(Optional)* | 3 XP (new) / Current × 2 XP | p. 336 | Storyteller discretion; usually requires in-game justification |

---

## 🔢 Step-by-Step Calculation Formula

In White Wolf's Storyteller System, increasing a trait across multiple dots is calculated **cumulatively per step**, rather than simply multiplying the final rating.

$$\text{Total Cost} = \sum_{r = \text{base}}^{\text{target} - 1} \text{Cost}(r \rightarrow r + 1)$$

---

## 🧮 Worked Calculation Examples

### 1. Attribute Progression (e.g. Intelligence 2 ➔ 4)
*Formula: Current Rating × 4 XP*
- Step 1 (Dot 2 ➔ 3): $2 \times 4 = 8\text{ XP}$
- Step 2 (Dot 3 ➔ 4): $3 \times 4 = 12\text{ XP}$
- **Total Cost**: $8 + 12 = \mathbf{20\text{ XP}}$
- *Milestone*: Reaching Dot 4 unlocks a **Specialty** (e.g. "Creative Logic", M20 p. 275).

### 2. Untrained Ability Progression (e.g. Occult 0 ➔ 3)
*Formula: 0 ➔ 1 = 3 XP flat; Subsequent steps = Current Rating × 2 XP*
- Step 1 (Dot 0 ➔ 1): $\text{Flat } 3\text{ XP}$
- Step 2 (Dot 1 ➔ 2): $1 \times 2 = 2\text{ XP}$
- Step 3 (Dot 2 ➔ 3): $2 \times 2 = 4\text{ XP}$
- **Total Cost**: $3 + 2 + 4 = \mathbf{9\text{ XP}}$

### 3. Affinity vs. Non-Affinity Sphere (e.g. Dot 1 ➔ 3)
Assume an Order of Hermes mage with **Forces** as their Affinity Sphere, learning both Forces and Life from 1 to 3:

#### Forces (Affinity: Current Rating × 7 XP):
- Step 1 (Dot 1 ➔ 2): $1 \times 7 = 7\text{ XP}$
- Step 2 (Dot 2 ➔ 3): $2 \times 7 = 14\text{ XP}$
- **Total Cost**: $7 + 14 = \mathbf{21\text{ XP}}$

#### Life (Non-Affinity: Current Rating × 8 XP):
- Step 1 (Dot 1 ➔ 2): $1 \times 8 = 8\text{ XP}$
- Step 2 (Dot 2 ➔ 3): $2 \times 8 = 16\text{ XP}$
- **Total Cost**: $8 + 16 = \mathbf{24\text{ XP}}$

*Savings from Tradition Affinity:* **3 XP**.

### 4. Learning a Brand New Sphere (0 ➔ 2)
*Formula: 0 ➔ 1 = 10 XP flat; Subsequent = Current × 7 (or 8)*
- Step 1 (Dot 0 ➔ 1): $\text{Flat } 10\text{ XP}$
- Step 2 (Dot 1 ➔ 2): $1 \times 8 = 8\text{ XP}$ (Non-Affinity)
- **Total Cost**: $10 + 8 = \mathbf{18\text{ XP}}$

---

## ⚡ Special Rules & Game Constraints

### The Arete Ceiling (M20 Core, p. 66 & p. 331)
> *"A mage's rating in any single Sphere cannot exceed their permanent Arete rating."*

- **Example**: If a mage has an Arete of 3, they cannot raise Forces to 4 or 5 until their Arete is raised to 4 or higher.
- **Calculator Implementation**: If you allocate a Sphere target higher than your Arete target, the calculator generates an immediate amber warning badge in the summary bar.

### Arete Seekings (M20 Core, p. 336 & pp. 384–389)
- Arete cannot simply be bought with spare experience points.
- Before spending the `Current Rating × 8 XP`, the character must undergo and successfully complete a **Seeking**—a profound, narrative spiritual ordeal orchestrated by the Storyteller where the mage confronts their Avatar.

### Specialties (4+ Dots)
- When any Attribute or Ability reaches 4 or more dots, the character chooses an area of specialization (M20 Core, p. 273).
- **Rule Benefit**: Whenever rolling a die pool using that trait in its specialty context, any rolled `10` counts as **two successes** instead of one (or allows re-rolling, depending on the edition rule version in use).
- **Calculator Implementation**: The app provides direct suggested specialties with rulebook page references and allows typing custom text.

### Mastery Extra Effects (5 Dots)
- Reaching Dot 5 in an Attribute or Ability represents human pinnacle mastery.
- The calculator displays a distinctive Mastery badge, allowing players to record custom master effects or signature proficiencies.
