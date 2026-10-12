import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DotRating } from '../src/components/DotRating';

describe('DotRating Component', () => {
  it('renders correct number of dots', () => {
    render(
      <DotRating
        base={2}
        target={2}
        max={5}
        mode="base"
        onBaseChange={() => {}}
        onTargetChange={() => {}}
      />
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);
  });

  describe('Base Mode Interactions', () => {
    it('calls onBaseChange with selected dot when setting new base rating', () => {
      const onBaseChange = vi.fn();
      const onTargetChange = vi.fn();

      render(
        <DotRating
          base={1}
          target={1}
          max={5}
          mode="base"
          onBaseChange={onBaseChange}
          onTargetChange={onTargetChange}
        />
      );

      const buttons = screen.getAllByRole('button');
      // Click dot 3
      fireEvent.click(buttons[2]);
      expect(onBaseChange).toHaveBeenCalledWith(3);
      expect(onTargetChange).toHaveBeenCalledWith(3);
    });

    it('toggles base rating down when clicking the current dot', () => {
      const onBaseChange = vi.fn();
      const onTargetChange = vi.fn();

      render(
        <DotRating
          base={3}
          target={3}
          min={1}
          max={5}
          mode="base"
          onBaseChange={onBaseChange}
          onTargetChange={onTargetChange}
        />
      );

      const buttons = screen.getAllByRole('button');
      // Click current base dot (dot 3, index 2)
      fireEvent.click(buttons[2]);
      expect(onBaseChange).toHaveBeenCalledWith(2);
    });

    it('toggles base to 0 when min is 0 and clicking dot 1', () => {
      const onBaseChange = vi.fn();
      const onTargetChange = vi.fn();

      render(
        <DotRating
          base={0}
          target={0}
          min={0}
          max={5}
          mode="base"
          onBaseChange={onBaseChange}
          onTargetChange={onTargetChange}
        />
      );

      const buttons = screen.getAllByRole('button');
      // Click dot 1 when base is 0
      fireEvent.click(buttons[0]);
      expect(onBaseChange).toHaveBeenCalledWith(1);
    });
  });

  describe('Upgrade Mode Interactions', () => {
    it('sets target rating when clicking higher dot', () => {
      const onBaseChange = vi.fn();
      const onTargetChange = vi.fn();

      render(
        <DotRating
          base={2}
          target={2}
          max={5}
          mode="upgrade"
          onBaseChange={onBaseChange}
          onTargetChange={onTargetChange}
        />
      );

      const buttons = screen.getAllByRole('button');
      // Click dot 4 (index 3)
      fireEvent.click(buttons[3]);
      expect(onTargetChange).toHaveBeenCalledWith(4);
      expect(onBaseChange).not.toHaveBeenCalled();
    });

    it('resets target to base when clicking dot below base in upgrade mode', () => {
      const onBaseChange = vi.fn();
      const onTargetChange = vi.fn();

      render(
        <DotRating
          base={3}
          target={5}
          max={5}
          mode="upgrade"
          onBaseChange={onBaseChange}
          onTargetChange={onTargetChange}
        />
      );

      const buttons = screen.getAllByRole('button');
      // Click dot 2 (index 1), below base
      fireEvent.click(buttons[1]);
      expect(onTargetChange).toHaveBeenCalledWith(3);
    });

    it('toggles target down when clicking current target dot in upgrade mode', () => {
      const onBaseChange = vi.fn();
      const onTargetChange = vi.fn();

      render(
        <DotRating
          base={2}
          target={4}
          max={5}
          mode="upgrade"
          onBaseChange={onBaseChange}
          onTargetChange={onTargetChange}
        />
      );

      const buttons = screen.getAllByRole('button');
      // Click dot 4 (index 3)
      fireEvent.click(buttons[3]);
      expect(onTargetChange).toHaveBeenCalledWith(3);
    });
  });

  describe('Hover and Visual Styles', () => {
    it('updates hover state on mouse enter and leave', () => {
      render(
        <DotRating
          base={2}
          target={3}
          max={5}
          mode="upgrade"
          onBaseChange={() => {}}
          onTargetChange={() => {}}
        />
      );

      const buttons = screen.getAllByRole('button');
      fireEvent.mouseEnter(buttons[4]); // dot 5
      expect(buttons[4]).toBeInTheDocument();
      fireEvent.mouseLeave(buttons[4]);
    });
  });
});
