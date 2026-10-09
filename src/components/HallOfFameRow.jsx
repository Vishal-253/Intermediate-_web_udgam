import React, { useRef, useEffect, useCallback } from 'react';

/**
 * HallOfFameRow
 * A single horizontal row of items that stays pinned in the middle of the screen while the
 * page scrolls vertically. Vertical scroll progress drives the row sideways until its end,
 * then the page continues scrolling normally (and reverses the same way going up).
 */
export default function HallOfFameRow({ children, label = 'Committees' }) {
  const pinRef = useRef(null);
  const galleryRef = useRef(null);
  const trackRef = useRef(null);
  const frameRef = useRef(0);
  const travelRef = useRef(0);

  const update = useCallback(() => {
    frameRef.current = 0;
    const pin = pinRef.current;
    const gallery = galleryRef.current;
    const track = trackRef.current;
    if (!pin || !gallery || !track) return;

    // Re-check the row length every frame: CSS, font or image changes can alter
    // scrollWidth without resizing the track, which would leave the pin too short.
    const travel = Math.max(track.scrollWidth - track.clientWidth, 0);
    if (travel !== travelRef.current) {
      travelRef.current = travel;
      pin.style.height = `${window.innerHeight + travel}px`;
    }
    const progress = Math.min(Math.max(-pin.getBoundingClientRect().top, 0), travel);
    track.scrollLeft = progress;
    gallery.style.setProperty('--hof-scroll', progress.toFixed(1));

    const viewCenter = track.getBoundingClientRect().left + track.clientWidth / 2;
    const reach = track.clientWidth * 0.55;
    for (const item of track.children) {
      const r = item.getBoundingClientRect();
      const d = (r.left + r.width / 2 - viewCenter) / reach;
      item.style.setProperty('--hof-d', Math.max(-1.6, Math.min(1.6, d)).toFixed(3));
    }
  }, []);

  const schedule = useCallback(() => {
    if (!frameRef.current) frameRef.current = requestAnimationFrame(update);
  }, [update]);

  const measure = useCallback(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;
    travelRef.current = Math.max(track.scrollWidth - track.clientWidth, 0);
    // pinned for exactly as long as the row needs to travel
    pin.style.height = `${window.innerHeight + travelRef.current}px`;
    schedule();
  }, [schedule]);

  useEffect(() => {
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);
    // images / fonts can change the row width after mount
    const ro = new ResizeObserver(measure);
    ro.observe(trackRef.current);
    Array.from(trackRef.current.children).forEach((item) => ro.observe(item));
    document.fonts?.ready.then(measure);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
      ro.disconnect();
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    };
  }, [measure, schedule]);

  return (
    <div className="hof-pin" ref={pinRef}>
      <div className="hof-sticky">
        <div className="hof-gallery" ref={galleryRef}>
          <div className="hof-wall" aria-hidden="true">
            <div className="hof-layer hof-wall-far" />
            <div className="hof-layer hof-wall-mid" />
            <div className="hof-layer hof-rail" />
            <div className="hof-layer hof-floor" />
          </div>

          <div className="hof-track" ref={trackRef} role="region" aria-label={label}>
            {React.Children.map(children, (child) => (
              <div className="hof-item">{child}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
