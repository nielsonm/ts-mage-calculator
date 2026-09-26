# User Guide: Mage M20 Character & XP Calculator

Welcome to the **Mage: The Ascension (M20) Character Sheet & XP Calculator**! This user guide walks you through building your mage, planning character advancement, selecting specialties, and auditing experience point costs.

---

## 🖥️ Interface Overview

The calculator interface is organized into five primary sections:

1. **Header**: Mage identity (Character Name, Player, Chronicle, Nature, Demeanor, Concept, Essence, Tradition, and Cabal).
2. **Mode Switcher**: Toggle between **Base Character** mode and **XP Upgrade Plan** mode.
3. **Attributes & Abilities**: Nine core attributes and thirty standard abilities arranged by category, plus custom ability support.
4. **Spheres & Advantages**: The 9 Spheres of Magick, Arete, Willpower, Backgrounds, Quintessence, and Paradox.
5. **Sticky XP Summary Bar**: Real-time counter of total planned XP, rule constraint warnings, and an itemized cost breakdown drawer.

---

## 🛠️ Step-by-Step Walkthrough

### 1. Setting Up Your Base Character
1. Click the **"Base Character"** button in the mode toggle bar.
2. In this mode, clicking dot tracks sets your character's **current starting rating**.
3. Fill in your character's biographical information in the top header.
4. Click dots to match your character's current sheet for:
   - **Attributes** (Strength, Dexterity, Stamina, etc.)
   - **Abilities** (Alertness, Athletics, Occult, Science, etc.)
   - **Spheres** (Correspondence, Forces, Prime, etc.)
   - **Advantages** (Arete, Willpower, and Backgrounds)
5. Set your **Affinity Sphere** by clicking the star or affinity button next to your Tradition's favored sphere.

---

### 2. Planning Upgrades with XP
1. Click the **"XP Upgrade Plan"** button in the mode toggle bar.
2. In this mode, clicking dots sets your **Target Rating**:
   - The solid dark dots represent your **Base Rating**.
   - The purple/gold highlighted dots represent your planned **Target Upgrades**.
3. As you allocate target dots, the floating **XP Summary Bar** at the bottom of the screen updates in real time with the exact required XP.

---

### 3. Choosing Specialties (4+ Dots)
When any Attribute or Ability reaches **4 or more dots**, it earns a **Specialty**:
1. Look for the specialty input or tag beneath the trait name.
2. Click **"Select Specialty"** to open the suggestion drawer.
3. Choose one of the canonical specialties sourced directly from the *M20 Core Rulebook* (with page numbers provided), or type your own custom specialty.
4. If a trait reaches **5 dots** (Mastery), you can also define an **Extra Effect** or signature mastery benefit.

---

### 4. Adding Custom Abilities
If your chronicle uses custom or secondary abilities (e.g., *Hacking*, *Occult: Hermetic Lore*, *Archery*):
1. In the **Abilities Section**, find the category (Talents, Skills, or Knowledges).
2. Click **"+ Add Custom Ability"**.
3. Enter the ability name and confirm.
4. The custom ability will immediately integrate into dot allocation, specialty tracking, and XP calculations.

---

### 5. Reviewing the Cost Breakdown & Warnings
At the bottom of your screen, the **XP Summary Bar** shows:
- **Total XP**: The grand sum of all planned advancements.
- **Rule Warnings**: If any rule violation occurs—such as a Sphere rating exceeding your character's Arete rating—an amber warning notification will appear.
- **Itemized Audit Trail**: Click **"View Breakdown"** to view a line-by-line modal detailing every upgrade step (e.g. `Occult: Dot 2 -> 3 (4 XP)`, `Forces: Dot 1 -> 2 (7 XP [Affinity])`).

---

### 6. Persistence & Resetting
- **Auto-Save**: All changes are automatically saved to your browser's local storage (`localStorage`). You can safely refresh or close your browser without losing your sheet.
- **Reset Sheet**: To start fresh with a default Hermetic mage template, click the **Reset** button in the top navigation bar.

---

## ❓ Frequently Asked Questions (FAQ)

### Q: Why is there an alert stating my Sphere target exceeds Arete?
In *Mage: The Ascension 20th Anniversary Edition* (p. 66), a mage's understanding of any individual Sphere cannot exceed their enlightenment rating (**Arete**). If you plan to raise Forces to 4, you must also increase your Arete target to at least 4.

### Q: Why do Spheres have different costs?
Under M20 rules (p. 336):
- Raising your Tradition's **Affinity Sphere** costs `Current Rating × 7 XP`.
- Raising a **Non-Affinity Sphere** costs `Current Rating × 8 XP`.
- Learning a new Sphere from 0 to 1 costs a flat `10 XP`.

### Q: Does raising Arete automatically grant the increase in-game?
No. In the narrative rules of Mage: The Ascension, raising Arete requires a character to undergo and succeed at a **Seeking**—a mystical vision quest where the mage is tested by their Avatar. The calculator flags this reminder in your audit breakdown.
