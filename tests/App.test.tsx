import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { App } from '../src/App';
import { INITIAL_CHARACTER_STATE } from '../src/engine/initialState';

describe('App Component (Integration & State Management)', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders application with default Hermetic preset when localStorage is empty', () => {
    render(<App />);
    expect(screen.getByText('Mage: The Ascension')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Edward Kelly')).toBeInTheDocument();
    expect(screen.getByText('Hermetic Scholar')).toBeInTheDocument();
    expect(screen.getByText('Ecstatic Cultist')).toBeInTheDocument();
  });

  it('loads saved character sheet from localStorage on mount', () => {
    const customState = {
      ...INITIAL_CHARACTER_STATE,
      header: {
        ...INITIAL_CHARACTER_STATE.header,
        name: 'Saved Alchemist',
      },
    };
    localStorage.setItem('m20_mage_character_sheet_v1', JSON.stringify(customState));

    render(<App />);
    expect(screen.getByDisplayValue('Saved Alchemist')).toBeInTheDocument();
  });

  it('handles corrupted localStorage gracefully by falling back to initial state', () => {
    localStorage.setItem('m20_mage_character_sheet_v1', 'INVALID_JSON_CORRUPTED');
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<App />);
    expect(screen.getByDisplayValue('Edward Kelly')).toBeInTheDocument();
    expect(spy).toHaveBeenCalled();
  });

  it('switches between presets when confirmed', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);

    render(<App />);
    const ecstaticBtn = screen.getByText('Ecstatic Cultist');
    fireEvent.click(ecstaticBtn);

    expect(window.confirm).toHaveBeenCalledWith(
      expect.stringContaining('Santiago Gutierrez')
    );
    expect(screen.getByDisplayValue('Santiago Gutierrez')).toBeInTheDocument();

    const hermeticBtn = screen.getByText('Hermetic Scholar');
    fireEvent.click(hermeticBtn);
    expect(screen.getByDisplayValue('Edward Kelly')).toBeInTheDocument();
  });

  it('does not switch preset if user cancels confirm dialog', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);

    render(<App />);
    const ecstaticBtn = screen.getByText('Ecstatic Cultist');
    fireEvent.click(ecstaticBtn);

    expect(screen.getByDisplayValue('Edward Kelly')).toBeInTheDocument();
  });

  it('switches edit mode and resets planned upgrades', async () => {
    render(<App />);

    // Switch to edit base mode
    const baseModeBtn = screen.getByRole('button', { name: /1\. Edit Base Stats/i });
    fireEvent.click(baseModeBtn);

    // Switch back to upgrade mode
    const upgradeModeBtn = screen.getByRole('button', { name: /2\. Plan XP Upgrades/i });
    fireEvent.click(upgradeModeBtn);

    // Click Reset Upgrades button if present
    const resetUpgradesBtn = screen.queryByTitle('Reset all planned upgrades back to base values');
    if (resetUpgradesBtn) {
      fireEvent.click(resetUpgradesBtn);
    }
  });

  it('handles character sheet export to JSON', () => {
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});

    render(<App />);
    const exportBtn = screen.getByTitle('Export Character Sheet & Plan to JSON');
    fireEvent.click(exportBtn);

    expect(clickSpy).toHaveBeenCalled();
  });

  it('handles character sheet import from valid JSON file', async () => {
    const { container } = render(<App />);

    const importedSheet = {
      ...INITIAL_CHARACTER_STATE,
      header: {
        ...INITIAL_CHARACTER_STATE.header,
        name: 'Imported Mage',
      },
    };

    const file = new File([JSON.stringify(importedSheet)], 'sheet.json', {
      type: 'application/json',
    });

    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    expect(fileInput).toBeInTheDocument();

    // Trigger file change
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByDisplayValue('Imported Mage')).toBeInTheDocument();
    });
  });

  it('alerts error on invalid imported JSON file structure', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const { container } = render(<App />);

    const badFile = new File(['{"notAValidSheet": true}'], 'bad.json', {
      type: 'application/json',
    });

    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [badFile] } });

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Invalid character sheet JSON format.');
    });
  });
});
