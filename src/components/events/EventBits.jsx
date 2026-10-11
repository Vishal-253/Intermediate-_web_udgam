import React, { useEffect, useState } from 'react';
import { EVENT_CATEGORIES } from '../../data/eventDetails';
import { CategoryIcon, CheckIcon, PlusIcon } from './eventIcons';

export const categoryOf = (id) => EVENT_CATEGORIES.find((c) => c.id === id) || EVENT_CATEGORIES[0];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Cycles through taglines with a soft cross-fade; pauses while hovered or focused. */
export function RotatingTagline({ lines, interval = 3800, className = '' }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!lines || lines.length < 2 || paused || prefersReducedMotion()) return undefined;
    const t = setInterval(() => setIndex((i) => (i + 1) % lines.length), interval);
    return () => clearInterval(t);
  }, [lines, interval, paused]);

  if (!lines || lines.length === 0) return null;
  return (
    <p
      className={`ep-tagline ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span key={index} className="ep-tagline-text">
        {lines[index % lines.length]}
      </span>
    </p>
  );
}

export function CategoryChip({ id, small = false }) {
  const cat = categoryOf(id);
  return (
    <span className={`ep-cat-chip ${small ? 'is-small' : ''}`} style={{ '--hue': cat.hue }}>
      <CategoryIcon id={cat.id} className="ep-cat-chip-icon" />
      {cat.label}
    </span>
  );
}

export function RegisterButton({ added, onToggle, eventName, size = 'md' }) {
  return (
    <button
      type="button"
      className={`ep-register ${added ? 'is-added' : ''} is-${size}`}
      aria-pressed={added}
      aria-label={added ? `Remove ${eventName} from your pass` : `Add ${eventName} to your pass`}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
    >
      {added ? <CheckIcon className="ep-register-icon" /> : <PlusIcon className="ep-register-icon" />}
      <span>{added ? 'Added' : 'Register'}</span>
    </button>
  );
}
