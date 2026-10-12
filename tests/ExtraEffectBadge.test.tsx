import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ExtraEffectBadge } from '../src/components/ExtraEffectBadge';

describe('ExtraEffectBadge Component', () => {
  it('renders nothing when rating < 4 and no effect is assigned', () => {
    const { container } = render(
      <ExtraEffectBadge
        traitId="strength"
        traitName="Strength"
        rating={3}
        isUpgraded={false}
        categoryType="attribute"
        onSaveEffect={() => {}}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders specialty prompt when rating is 4 without effect', () => {
    render(
      <ExtraEffectBadge
        traitId="strength"
        traitName="Strength"
        rating={4}
        isUpgraded={false}
        categoryType="attribute"
        onSaveEffect={() => {}}
      />
    );

    expect(screen.getByText(/4\+ Dots Specialty:/i)).toBeInTheDocument();
    expect(screen.getByText(/\+ Add Custom Extra Effect/i)).toBeInTheDocument();
  });

  it('renders mastery prompt when rating is 5 (>4 dots)', () => {
    render(
      <ExtraEffectBadge
        traitId="strength"
        traitName="Strength"
        rating={5}
        isUpgraded={true}
        categoryType="attribute"
        onSaveEffect={() => {}}
      />
    );

    expect(screen.getByText(/>4 Dots Mastery:/i)).toBeInTheDocument();
  });

  it('renders assigned effect badge and allows editing or removing', () => {
    const onSaveEffect = vi.fn();
    render(
      <ExtraEffectBadge
        traitId="strength"
        traitName="Strength"
        rating={4}
        isUpgraded={true}
        extraEffect="Feats of Might"
        categoryType="attribute"
        onSaveEffect={onSaveEffect}
      />
    );

    expect(screen.getByText('Feats of Might')).toBeInTheDocument();

    const removeBtn = screen.getByTitle('Remove custom extra effect');
    fireEvent.click(removeBtn);
    expect(onSaveEffect).toHaveBeenCalledWith('');
  });

  it('opens edit form, selects suggestion, and saves effect', () => {
    const onSaveEffect = vi.fn();
    render(
      <ExtraEffectBadge
        traitId="strength"
        traitName="Strength"
        rating={4}
        isUpgraded={false}
        categoryType="attribute"
        onSaveEffect={onSaveEffect}
      />
    );

    const addBtn = screen.getByText(/\+ Add Custom Extra Effect/i);
    fireEvent.click(addBtn);

    // Book reference and thematic suggestions should appear
    expect(screen.getAllByText(/273/i).length).toBeGreaterThan(0);
    const suggestionBtn = screen.getByRole('button', { name: 'Feats of Might' });
    expect(suggestionBtn).toBeInTheDocument();

    fireEvent.click(suggestionBtn);

    // Click Save Effect
    const saveBtn = screen.getByRole('button', { name: /Save Effect/i });
    fireEvent.click(saveBtn);
    expect(onSaveEffect).toHaveBeenCalledWith('Feats of Might');
  });

  it('cancels edit on Cancel button or Escape key', () => {
    const onSaveEffect = vi.fn();
    render(
      <ExtraEffectBadge
        traitId="strength"
        traitName="Strength"
        rating={4}
        isUpgraded={false}
        categoryType="attribute"
        onSaveEffect={onSaveEffect}
      />
    );

    fireEvent.click(screen.getByText(/\+ Add Custom Extra Effect/i));
    const input = screen.getByPlaceholderText(/Type custom effect/i);
    fireEvent.change(input, { target: { value: 'Temporary Typing' } });

    const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelBtn);

    expect(screen.queryByPlaceholderText(/Type custom effect/i)).not.toBeInTheDocument();
    expect(onSaveEffect).not.toHaveBeenCalled();
  });
});
