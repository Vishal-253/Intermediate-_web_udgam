import React, { useEffect, useRef, useState } from 'react';

export default function CursorInsects() {
  const butterflyRef = useRef(null);
  const beeRef = useRef(null);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mediaQuery.matches);

    if (!mediaQuery.matches) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let bPos = { x: targetX, y: targetY };
    let beePos = { x: targetX, y: targetY };
    let hasMoved = false;
    let lastMoveTime = Date.now();

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      lastMoveTime = Date.now();
      if (!hasMoved) {
        hasMoved = true;
        butterflyRef.current?.classList.add('active');
        beeRef.current?.classList.add('active');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const lerp = (start, end, factor) => start + (end - start) * factor;

    let animTime = 0;
    let animId;

    const update = () => {
      animTime += 0.02;
      const idle = Date.now() - lastMoveTime > 400;

      let idleOffsetX = 0;
      let idleOffsetY = 0;
      let idleBeeX = 0;
      let idleBeeY = 0;

      if (idle) {
        idleOffsetX = Math.sin(animTime * 1.5) * 24;
        idleOffsetY = Math.sin(animTime * 3) * 14;
        idleBeeX = Math.cos(animTime * 2) * 20;
        idleBeeY = Math.sin(animTime * 2) * 18;
      }

      const targetBX = targetX - 35 + idleOffsetX;
      const targetBY = targetY - 25 + idleOffsetY;
      bPos.x = lerp(bPos.x, targetBX, 0.055);
      bPos.y = lerp(bPos.y, targetBY, 0.055);

      const targetBeeX = targetX + 30 + idleBeeX;
      const targetBeeY = targetY + 20 + idleBeeY;
      beePos.x = lerp(beePos.x, targetBeeX, 0.04);
      beePos.y = lerp(beePos.y, targetBeeY, 0.04);

      const bVx = targetBX - bPos.x;
      const bAngle = Math.max(Math.min(bVx * 0.8, 25), -25);

      if (butterflyRef.current) {
        butterflyRef.current.style.transform = `translate(${bPos.x}px, ${bPos.y}px) rotate(${bAngle}deg)`;
      }
      if (beeRef.current) {
        beeRef.current.style.transform = `translate(${beePos.x}px, ${beePos.y}px)`;
      }

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!isFinePointer) return null;

  return (
    <div id="cursor-insects" aria-hidden="true">
      {/* Bioluminescent Butterfly */}
      <div ref={butterflyRef} className="cursor-insect insect-butterfly" id="insect-butterfly">
        <svg className="butterfly-svg" viewBox="0 0 40 40" width="36" height="36">
          <defs>
            <radialGradient id="wingGlowReact" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
              <stop offset="50%" stopColor="#FF6B8B" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F0C28A" stopOpacity="0.75" />
            </radialGradient>
          </defs>
          <g className="wing wing-left">
            <path d="M20 20 C14 10 4 8 6 18 C7 25 15 24 20 20 Z" fill="url(#wingGlowReact)" stroke="#FFF0F5" strokeWidth="0.8" opacity="0.95" />
            <path d="M20 20 C12 21 8 28 13 32 C17 35 19 26 20 20 Z" fill="url(#wingGlowReact)" stroke="#FFF0F5" strokeWidth="0.7" opacity="0.85" />
            <circle cx="12" cy="16" r="1.5" fill="#FFFFFF" opacity="0.95" />
          </g>
          <g className="wing wing-right">
            <path d="M20 20 C26 10 36 8 34 18 C33 25 25 24 20 20 Z" fill="url(#wingGlowReact)" stroke="#FFF0F5" strokeWidth="0.8" opacity="0.95" />
            <path d="M20 20 C28 21 32 28 27 32 C23 35 21 26 20 20 Z" fill="url(#wingGlowReact)" stroke="#FFF0F5" strokeWidth="0.7" opacity="0.85" />
            <circle cx="28" cy="16" r="1.5" fill="#FFFFFF" opacity="0.95" />
          </g>
          <path d="M20 14 C19.5 17 19.5 24 20 27" stroke="#FFF0F5" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M19.5 14 Q17 10 15 10 M20.5 14 Q23 10 25 10" stroke="#FFD9E8" strokeWidth="0.9" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {/* Bioluminescent Honeybee */}
      <div ref={beeRef} className="cursor-insect insect-bee" id="insect-bee">
        <svg className="bee-svg" viewBox="0 0 32 32" width="26" height="26">
          <g className="bee-wing bee-wing-top">
            <ellipse cx="16" cy="10" rx="5.5" ry="3.2" fill="#FFFFFF" stroke="#FFB356" strokeWidth="0.8" opacity="0.9" transform="rotate(-25 16 10)" />
          </g>
          <g className="bee-wing bee-wing-bottom">
            <ellipse cx="16" cy="12" rx="4.5" ry="2.4" fill="#FFFFFF" stroke="#FFB356" strokeWidth="0.7" opacity="0.8" transform="rotate(25 16 12)" />
          </g>
          <ellipse cx="16" cy="17" rx="4.8" ry="6.2" fill="#FFB356" stroke="#120B11" strokeWidth="0.9" transform="rotate(20 16 17)" />
          <line x1="12" y1="16" x2="20" y2="18.5" stroke="#120B11" strokeWidth="1.4" />
          <line x1="13" y1="19.5" x2="19" y2="21.5" stroke="#120B11" strokeWidth="1.4" />
          <circle cx="16" cy="17" r="1.2" fill="#FFFFFF" />
        </svg>
      </div>
    </div>
  );
}
