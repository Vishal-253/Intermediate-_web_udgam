import React, { useEffect, useState } from 'react';
import { subscribeTiltState, requestTiltPermission, setTiltEnabled } from '../utils/deviceTilt';

const DISMISS_KEY = 'udgam_tilt_prompt_dismissed';

/**
 * Small pill shown only on iPhone/iPad, where motion access needs a tap-triggered
 * permission request. Android and other browsers enable tilt without asking.
 */
export default function TiltPrompt() {
  const [state, setState] = useState('unsupported');
  const [dismissed, setDismissed] = useState(() => {
    try { return sessionStorage.getItem(DISMISS_KEY) === '1'; } catch { return false; }
  });

  useEffect(() => subscribeTiltState(setState), []);

  if (state !== 'prompt' || dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try { sessionStorage.setItem(DISMISS_KEY, '1'); } catch { /* storage unavailable */ }
  };

  return (
    <div className="tilt-prompt" role="dialog" aria-label="Tilt cards with your phone">
      <span>Tilt the cards with your phone</span>
      <button type="button" className="tilt-prompt-enable" onClick={() => requestTiltPermission()}>
        Enable
      </button>
      <button
        type="button"
        className="tilt-prompt-dismiss"
        aria-label="No thanks"
        onClick={() => {
          setTiltEnabled(false);
          dismiss();
        }}
      >
        ×
      </button>
    </div>
  );
}
