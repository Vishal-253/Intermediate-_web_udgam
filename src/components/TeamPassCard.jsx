'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
  ENTER_TRANSITION_MS: 180
};

const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v, precision = 3) => parseFloat(v.toFixed(precision));
const adjust = (v, fMin, fMax, tMin, tMax) => round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

/**
 * TeamPassCard
 * Integrates the physics-based 3D tilt engine, dynamic surface glare, and cursor-following
 * behind-glow from React Bits while preserving 100% of the authentic festival ID badge pass design.
 */
export default function TeamPassCard({
  member,
  festTag = "CREW · UDGAM '26",
  hideRoleInside = false,
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 4,
  behindGlowEnabled = true,
  behindGlowColor = 'rgba(245, 183, 41, 0.42)',
  behindGlowSize = '55%',
  className = ''
}) {
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);

  const wrapRef = useRef(null);
  const shellRef = useRef(null);
  const enterTimerRef = useRef(null);
  const leaveRafRef = useRef(null);

  // Physics-based 3D Tilt Engine with smooth exponential damping
  const tiltEngine = useMemo(() => {
    if (!enableTilt) return null;

    let rafId = null;
    let running = false;
    let lastTs = 0;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const DEFAULT_TAU = 0.14;
    const INITIAL_TAU = 0.6;
    let initialUntil = 0;

    const setVarsFromXY = (x, y) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;

      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;

      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      // Keep rotation angles subtle & refined (max ~10-12 deg) to remain elegant and clean
      const properties = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
        '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        '--pointer-from-top': `${percentY / 100}`,
        '--pointer-from-left': `${percentX / 100}`,
        '--rotate-x': `${round(-(centerX / 5.5))}deg`,
        '--rotate-y': `${round(centerY / 4.8)}deg`
      };

      for (const [k, v] of Object.entries(properties)) {
        wrap.style.setProperty(k, v);
      }
    };

    const step = (ts) => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
      const k = 1 - Math.exp(-dt / tau);

      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;

      setVarsFromXY(currentX, currentY);

      const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;

      if (stillFar || document.hasFocus()) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    return {
      setImmediate(x, y) {
        currentX = x;
        currentY = y;
        setVarsFromXY(currentX, currentY);
      },
      setTarget(x, y) {
        targetX = x;
        targetY = y;
        start();
      },
      toCenter() {
        const shell = shellRef.current;
        if (!shell) return;
        this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      beginInitial(durationMs) {
        initialUntil = performance.now() + durationMs;
        start();
      },
      getCurrent() {
        return { x: currentX, y: currentY, tx: targetX, ty: targetY };
      },
      cancel() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        running = false;
        lastTs = 0;
      }
    };
  }, [enableTilt]);

  const getOffsets = (evt, el) => {
    const rect = el.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const handlePointerMove = useCallback(
    (event) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerEnter = useCallback(
    (event) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap || !tiltEngine) return;

      wrap.classList.add('active');
      shell.classList.add('active');
      shell.classList.add('entering');
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = window.setTimeout(() => {
        shell.classList.remove('entering');
      }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);

      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  const handlePointerLeave = useCallback(() => {
    const shell = shellRef.current;
    const wrap = wrapRef.current;
    if (!shell || !wrap || !tiltEngine) return;

    tiltEngine.toCenter();

    const checkSettle = () => {
      const { x, y, tx, ty } = tiltEngine.getCurrent();
      const settled = Math.hypot(tx - x, ty - y) < 0.6;
      if (settled) {
        shell.classList.remove('active');
        wrap.classList.remove('active');
        leaveRafRef.current = null;
      } else {
        leaveRafRef.current = requestAnimationFrame(checkSettle);
      }
    };
    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
    leaveRafRef.current = requestAnimationFrame(checkSettle);
  }, [tiltEngine]);

  const handleDeviceOrientation = useCallback(
    (event) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;

      const { beta, gamma } = event;
      if (beta == null || gamma == null) return;

      const centerX = shell.clientWidth / 2;
      const centerY = shell.clientHeight / 2;
      const x = clamp(centerX + gamma * mobileTiltSensitivity, 0, shell.clientWidth);
      const y = clamp(
        centerY + (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity,
        0,
        shell.clientHeight
      );

      tiltEngine.setTarget(x, y);
    },
    [tiltEngine, mobileTiltSensitivity]
  );

  useEffect(() => {
    if (!enableTilt || !tiltEngine) return;

    const shell = shellRef.current;
    if (!shell) return;

    const pointerMoveHandler = handlePointerMove;
    const pointerEnterHandler = handlePointerEnter;
    const pointerLeaveHandler = handlePointerLeave;
    const deviceOrientationHandler = handleDeviceOrientation;

    shell.addEventListener('pointerenter', pointerEnterHandler);
    shell.addEventListener('pointermove', pointerMoveHandler);
    shell.addEventListener('pointerleave', pointerLeaveHandler);

    const handleClick = () => {
      if (!enableMobileTilt || (typeof window !== 'undefined' && window.location.protocol !== 'https:')) return;
      const anyMotion = typeof window !== 'undefined' ? window.DeviceMotionEvent : null;
      if (anyMotion && typeof anyMotion.requestPermission === 'function') {
        anyMotion
          .requestPermission()
          .then((state) => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', deviceOrientationHandler);
            }
          })
          .catch(console.error);
      } else if (typeof window !== 'undefined') {
        window.addEventListener('deviceorientation', deviceOrientationHandler);
      }
    };
    shell.addEventListener('click', handleClick);

    const initialX = (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    tiltEngine.setImmediate(initialX, initialY);
    tiltEngine.toCenter();
    tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);

    return () => {
      shell.removeEventListener('pointerenter', pointerEnterHandler);
      shell.removeEventListener('pointermove', pointerMoveHandler);
      shell.removeEventListener('pointerleave', pointerLeaveHandler);
      shell.removeEventListener('click', handleClick);
      if (typeof window !== 'undefined') {
        window.removeEventListener('deviceorientation', deviceOrientationHandler);
      }
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel();
      shell.classList.remove('entering');
    };
  }, [
    enableTilt,
    enableMobileTilt,
    tiltEngine,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
    handleDeviceOrientation
  ]);

  // Format the yellow role tape text
  const formatTagText = () => {
    if (member.tag) return member.tag;
    const rolePart = (member.badgeText || member.role || 'CREW').toUpperCase();
    const deptPart = (member.department || member.committeeName || 'CORE')
      .replace(/Committee|Wing/gi, '')
      .trim()
      .toUpperCase();
    return `${rolePart} · ${deptPart}`;
  };

  const displayPhone = member.phone ? member.phone.replace('+91 ', '').trim() : '';

  const handleCopyPhone = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!member.phone) return;

    const rawNumber = member.phone;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(rawNumber)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => fallbackCopy(rawNumber));
    } else {
      fallbackCopy(rawNumber);
    }
  };

  const fallbackCopy = (text) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Fallback copy failed:', err);
    }
  };

  const hasPhoto = Boolean(member.image) && !imageError;

  const cardStyle = useMemo(
    () => ({
      '--behind-glow-color': behindGlowColor,
      '--behind-glow-size': behindGlowSize
    }),
    [behindGlowColor, behindGlowSize]
  );

  return (
    <div
      ref={wrapRef}
      className={`team-pass-card-wrapper ${className}`.trim()}
      style={cardStyle}
    >
      {/* Behind Glow following cursor */}
      {behindGlowEnabled && <div className="pc-behind" aria-hidden="true" />}

      {/* Tilt Interactive Shell */}
      <div ref={shellRef} className="team-pass-shell">
        <article className="team-pass-card" id={`pass-${member.id}`}>
          {/* Surface Glare reflection highlight */}
          <div className="pc-glare" aria-hidden="true" />

          {/* Top Lanyard Slot Punch Cutout */}
          <div className="team-pass-slot" aria-hidden="true"></div>

          {/* Festival Crew Identifier */}
          <div className="team-pass-crew-tag">{festTag}</div>

          {/* Circular Avatar with Radiant Gradient Glow Ring */}
          <div className="team-pass-avatar-ring">
            <div className="team-pass-avatar-inner">
              {hasPhoto ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-pass-avatar-img"
                  loading="lazy"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div
                  className="team-pass-avatar-fallback"
                  style={{
                    background:
                      member.avatarGradient ||
                      'linear-gradient(135deg, #FF6B8B 0%, #FF8E53 100%)'
                  }}
                >
                  <svg
                    viewBox="0 0 64 64"
                    width="54"
                    height="54"
                    fill="none"
                    className="team-pass-silhouette"
                    aria-hidden="true"
                  >
                    <circle cx="32" cy="22" r="12" fill="rgba(255, 255, 255, 0.88)" />
                    <path
                      d="M12 54 C12 40, 20 36, 32 36 C44 36, 52 40, 52 54 Z"
                      fill="rgba(255, 255, 255, 0.88)"
                    />
                  </svg>
                  <span className="team-pass-monogram">{member.initials || 'UG'}</span>
                </div>
              )}
            </div>
          </div>

          {/* Member Name */}
          <h3 className="team-pass-name" title={member.name}>
            {member.name}
          </h3>

          {/* Yellow Role Tape Ribbon (Hidden for Standalone Leadership Cards) */}
          {!hideRoleInside && (
            <div className="team-pass-role-ribbon">
              <span className="team-pass-role-text">{formatTagText()}</span>
            </div>
          )}

          {/* Phone Contact with Click-to-Copy */}
          {member.phone ? (
            <button
              type="button"
              className={`team-pass-phone-btn ${copied ? 'copied' : ''}`}
              onClick={handleCopyPhone}
              title="Click to copy phone number to clipboard"
              aria-label={`Copy phone number ${member.phone}`}
            >
              {copied ? (
                <>
                  <svg
                    className="phone-btn-icon"
                    viewBox="0 0 24 24"
                    width="13"
                    height="13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="phone-btn-text">Copied</span>
                </>
              ) : (
                <>
                  <svg
                    className="phone-btn-icon"
                    viewBox="0 0 24 24"
                    width="13"
                    height="13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className="phone-btn-text">{displayPhone || member.phone}</span>
                </>
              )}
            </button>
          ) : (
            <span className="team-pass-phone-placeholder">&nbsp;</span>
          )}

          {/* Perforated Ticket Divider with Notches */}
          <div className="team-pass-perforation" aria-hidden="true">
            <span className="team-pass-notch notch-left"></span>
            <span className="team-pass-perf-line"></span>
            <span className="team-pass-notch notch-right"></span>
          </div>

          {/* Bottom Stub: Clean Email & Barcode (Instagram and LinkedIn removed) */}
          <div className="team-pass-stub">
            <div className="team-pass-email-wrap">
              {member.email ? (
                <a
                  href={`mailto:${member.email}`}
                  className="team-pass-email-link"
                  title={`Send email to ${member.name} (${member.email})`}
                  aria-label={`Email ${member.name}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg
                    className="team-pass-mail-icon"
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span className="team-pass-email-text">Email</span>
                </a>
              ) : (
                <span className="team-pass-stub-placeholder" />
              )}
            </div>

            <div className="team-pass-barcode-wrapper" title="Fest Verification Barcode">
              <svg
                className="team-pass-barcode-svg"
                viewBox="0 0 52 20"
                width="44"
                height="17"
                fill="currentColor"
                aria-hidden="true"
              >
                <rect x="0" y="0" width="1.8" height="20" />
                <rect x="3.2" y="0" width="1" height="20" />
                <rect x="5.8" y="0" width="2.6" height="20" />
                <rect x="10.2" y="0" width="1.2" height="20" />
                <rect x="12.8" y="0" width="2" height="20" />
                <rect x="16.4" y="0" width="1" height="20" />
                <rect x="19" y="0" width="3.2" height="20" />
                <rect x="24" y="0" width="1" height="20" />
                <rect x="26.6" y="0" width="1.8" height="20" />
                <rect x="30" y="0" width="2.6" height="20" />
                <rect x="34.4" y="0" width="1" height="20" />
                <rect x="36.8" y="0" width="2" height="20" />
                <rect x="40.4" y="0" width="1" height="20" />
                <rect x="42.8" y="0" width="2.8" height="20" />
                <rect x="47.2" y="0" width="1.4" height="20" />
                <rect x="50" y="0" width="1.8" height="20" />
              </svg>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
