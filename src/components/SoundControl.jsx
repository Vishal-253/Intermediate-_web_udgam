import React, { useState, useEffect, useRef } from 'react';
import { playChimeNote, chimeFrequencies } from '../utils/audio';

export default function SoundControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);

  const toggleSound = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);

    if (nextState) {
      playChimeNote(chimeFrequencies[0]);
      setTimeout(() => playChimeNote(chimeFrequencies[2]), 200);
      setTimeout(() => playChimeNote(chimeFrequencies[4]), 400);

      intervalRef.current = setInterval(() => {
        if (Math.random() > 0.35) {
          const randomNote = chimeFrequencies[Math.floor(Math.random() * chimeFrequencies.length)];
          playChimeNote(randomNote);
          if (Math.random() > 0.6) {
            setTimeout(() => {
              const harmonic = chimeFrequencies[Math.floor(Math.random() * chimeFrequencies.length)];
              playChimeNote(harmonic);
            }, 220);
          }
        }
      }, 3200);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="floating-controls">
      <button
        id="sound-toggle"
        className={`control-btn ${isPlaying ? 'playing' : ''}`}
        aria-label="Toggle Spring Ambient Chimes"
        title="Experience Ambient Blossom Chimes"
        onClick={toggleSound}
      >
        <span className="control-icon" id="sound-icon">🎐</span>
        <span className="control-label">{isPlaying ? 'Chimes On' : 'Wind Chime'}</span>
      </button>
    </div>
  );
}
