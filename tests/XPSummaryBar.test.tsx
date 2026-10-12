import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { XPSummaryBar } from '../src/components/XPSummaryBar';
import { PlanCalculationResult } from '../src/types/character';

describe('XPSummaryBar Component', () => {
  const mockPlan: PlanCalculationResult = {
    totalXp: 24,
    warnings: ['Forces target rating (5) exceeds character Arete (3).'],
    items: [
      {
        traitId: 'intelligence',
        traitName: 'Intelligence',
        section: 'attributes',
        baseRating: 3,
        targetRating: 4,
        totalCost: 12,
        steps: [{ from: 3, to: 4, cost: 12, formula: '3 × 4 XP' }],
        notes: 'Unlocks Custom Specialty (4+ Dots)',
      },
      {
        traitId: 'forces',
        traitName: 'Forces',
        section: 'spheres',
        baseRating: 2,
        targetRating: 3,
        totalCost: 12,
        steps: [{ from: 2, to: 3, cost: 12, formula: '2 × 6 XP' }],
      },
    ],
  };

  it('renders mode buttons and total XP required', () => {
    const onModeChange = vi.fn();
    render(
      <XPSummaryBar
        mode="base"
        onModeChange={onModeChange}
        plan={mockPlan}
        onResetUpgrades={() => {}}
        onExportJson={() => {}}
        onImportJson={() => {}}
      />
    );

    expect(screen.getByText('24 XP')).toBeInTheDocument();

    const upgradeModeBtn = screen.getByText('2. Plan XP Upgrades');
    fireEvent.click(upgradeModeBtn);
    expect(onModeChange).toHaveBeenCalledWith('upgrade');

    const baseModeBtn = screen.getByText('1. Edit Base Stats');
    fireEvent.click(baseModeBtn);
    expect(onModeChange).toHaveBeenCalledWith('base');
  });

  it('renders warning banner and opens drawer when warning badge clicked', () => {
    render(
      <XPSummaryBar
        mode="upgrade"
        onModeChange={() => {}}
        plan={mockPlan}
        onResetUpgrades={() => {}}
        onExportJson={() => {}}
        onImportJson={() => {}}
      />
    );

    const warningBadge = screen.getByText(/1 Rule Notice\(s\)/i);
    expect(warningBadge).toBeInTheDocument();

    fireEvent.click(warningBadge);
    expect(screen.getByText('M20 Experience Point Upgrade Ledger')).toBeInTheDocument();
    expect(
      screen.getByText(/Forces target rating \(5\) exceeds character Arete \(3\)\./i)
    ).toBeInTheDocument();
  });

  it('opens and closes drawer via Ledger button and close X', () => {
    render(
      <XPSummaryBar
        mode="upgrade"
        onModeChange={() => {}}
        plan={mockPlan}
        onResetUpgrades={() => {}}
        onExportJson={() => {}}
        onImportJson={() => {}}
      />
    );

    const ledgerBtn = screen.getByTitle('View step-by-step upgrade breakdown ledger');
    fireEvent.click(ledgerBtn);
    expect(screen.getByText('M20 Experience Point Upgrade Ledger')).toBeInTheDocument();

    // Close button
    const closeBtn = screen.getAllByRole('button').find((btn) => btn.querySelector('svg.lucide-x'));
    expect(closeBtn).toBeDefined();
    if (closeBtn) fireEvent.click(closeBtn);

    expect(screen.queryByText('M20 Experience Point Upgrade Ledger')).not.toBeInTheDocument();
  });

  it('shows empty state message in ledger when no upgrades are planned', () => {
    const emptyPlan: PlanCalculationResult = { totalXp: 0, items: [], warnings: [] };
    render(
      <XPSummaryBar
        mode="upgrade"
        onModeChange={() => {}}
        plan={emptyPlan}
        onResetUpgrades={() => {}}
        onExportJson={() => {}}
        onImportJson={() => {}}
      />
    );

    const ledgerBtn = screen.getByTitle('View step-by-step upgrade breakdown ledger');
    fireEvent.click(ledgerBtn);

    expect(
      screen.getByText(/No upgrades planned yet/i)
    ).toBeInTheDocument();
  });

  it('triggers onResetUpgrades, onExportJson, and onImportJson', () => {
    const onResetUpgrades = vi.fn();
    const onExportJson = vi.fn();
    const onImportJson = vi.fn();

    const { container } = render(
      <XPSummaryBar
        mode="upgrade"
        onModeChange={() => {}}
        plan={mockPlan}
        onResetUpgrades={onResetUpgrades}
        onExportJson={onExportJson}
        onImportJson={onImportJson}
      />
    );

    const resetBtn = screen.getByTitle('Reset all planned upgrades back to base values');
    fireEvent.click(resetBtn);
    expect(onResetUpgrades).toHaveBeenCalled();

    const exportBtn = screen.getByTitle('Export Character Sheet & Plan to JSON');
    fireEvent.click(exportBtn);
    expect(onExportJson).toHaveBeenCalled();

    const fileInput = container.querySelector('input[type="file"]');
    expect(fileInput).toBeInTheDocument();
    if (fileInput) {
      fireEvent.change(fileInput, { target: { files: [new File(['{}'], 'sheet.json')] } });
      expect(onImportJson).toHaveBeenCalled();
    }
  });
});
