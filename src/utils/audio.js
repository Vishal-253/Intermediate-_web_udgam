// Web Audio API Pentatonic Chime Synthesizer (Hirajoshi / Insen Scale)

let audioCtx = null;

export const chimeFrequencies = [
  523.25, // C5
  587.33, // D5
  659.25, // E5
  783.99, // G5
  880.00, // A5
  1046.50 // C6
];

export function playChimeNote(freq) {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.8);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 3.0);
  } catch (err) {
    console.warn('AudioContext not allowed yet:', err);
  }
}

export function playSuccessChime() {
  playChimeNote(523.25);
  setTimeout(() => playChimeNote(659.25), 150);
  setTimeout(() => playChimeNote(783.99), 300);
  setTimeout(() => playChimeNote(1046.50), 450);
}
