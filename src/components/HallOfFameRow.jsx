import React, { useRef, useEffect, useCallback, useState } from 'react';

const SWIPE_QUERY = '(hover: none) and (pointer: coarse)';

const getSwipeMode = () =>
  typeof window !== 'undefined' && window.matchMedia(SWIPE_QUERY).matches;

/**
 * HallOfFameRow
 * A single horizontal row of items walked past like a gallery wall.
 *
 * Desktop ("pinned"): the row stays pinned in the middle of the screen while the page
 * scrolls vertically; vertical scroll progress drives the row sideways until its end,
 * then the page continues normally (and reverses the same way going up).
 *
 * Touch devices ("swipe"): the page scrolls normally and the row is a native horizontal
 * swipe carousel that snaps each item to the centre.
 *
 * In both modes the parallax wall and the per-item depth follow the row's position.
 */
export default function HallOfFameRow({ children, label = 'Committees' }) {
  const [swipeMode, setSwipeMode] = useState(getSwipeMode);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasSwiped, setHasSwiped] = useState(false);

  const pinRef = useRef(null);
  const galleryRef = useRef(null);
  const trackRef = useRef(null);
  const frameRef = useRef(0);
  const travelRef = useRef(0);
  const activeRef = useRef(0);

  const count = React.Children.count(children);

  useEffect(() => {
    const mq = window.matchMedia(SWIPE_QUERY);
    const onChange = () => setSwipeMode(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  // Parallax + per-item depth, from the row's current horizontal position.
  const applyDepth = useCallback((progress) => {
    const gallery = galleryRef.current;
    const track = trackRef.current;
    gallery.style.setProperty('--hof-scroll', progress.toFixed(1));

    const viewCenter = track.getBoundingClientRect().left + track.clientWidth / 2;
    const reach = track.clientWidth * 0.55;
    let nearest = 0;
    let nearestDist = Infinity;
    Array.from(track.children).forEach((item, i) => {
      const r = item.getBoundingClientRect();
      const offset = r.left + r.width / 2 - viewCenter;
      const d = offset / reach;
      item.style.setProperty('--hof-d', Math.max(-1.6, Math.min(1.6, d)).toFixed(3));
      if (Math.abs(offset) < nearestDist) {
        nearestDist = Math.abs(offset);
        nearest = i;
      }
    });
    if (nearest !== activeRef.current) {
      activeRef.current = nearest;
      setActiveIndex(nearest);
    }
  }, []);

  const update = useCallback(() => {
    frameRef.current = 0;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !galleryRef.current || !track) return;

    if (swipeMode) {
      applyDepth(track.scrollLeft);
      return;
    }

    // Re-check the row length every frame: CSS, font or image changes can alter
    // scrollWidth without resizing the track, which would leave the pin too short.
    const travel = Math.max(track.scrollWidth - track.clientWidth, 0);
    if (travel !== travelRef.current) {
      travelRef.current = travel;
      pin.style.height = `${window.innerHeight + travel}px`;
    }
    const progress = Math.min(Math.max(-pin.getBoundingClientRect().top, 0), travel);
    track.scrollLeft = progress;
    applyDepth(progress);
  }, [swipeMode, applyDepth]);

  const schedule = useCallback(() => {
    if (!frameRef.current) frameRef.current = requestAnimationFrame(update);
  }, [update]);

  const measure = useCallback(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;
    if (swipeMode) {
      pin.style.height = '';
    } else {
      travelRef.current = Math.max(track.scrollWidth - track.clientWidth, 0);
      // pinned for exactly as long as the row needs to travel
      pin.style.height = `${window.innerHeight + travelRef.current}px`;
    }
    schedule();
  }, [swipeMode, schedule]);

  useEffect(() => {
    const track = trackRef.current;
    travelRef.current = 0;
    measure();

    const onTrackScroll = () => {
      // ignore the scroll event browsers fire while laying out the snap points
      if (track.scrollLeft > 10) setHasSwiped(true);
      schedule();
    };
    if (swipeMode) {
      track.addEventListener('scroll', onTrackScroll, { passive: true });
    } else {
      track.scrollLeft = 0;
      window.addEventListener('scroll', schedule, { passive: true });
    }
    window.addEventListener('resize', measure);
    // images / fonts can change the row width after mount
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    Array.from(track.children).forEach((item) => ro.observe(item));
    document.fonts?.ready.then(measure);

    return () => {
      track.removeEventListener('scroll', onTrackScroll);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
      ro.disconnect();
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    };
  }, [swipeMode, measure, schedule]);

  return (
    <div className={`hof-pin ${swipeMode ? 'hof-mode-swipe' : 'hof-mode-pinned'}`} ref={pinRef}>
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

          {swipeMode && count > 1 && (
            <div className="hof-swipe-hint" aria-hidden="true">
              <span className={`hof-swipe-cue ${hasSwiped ? 'is-faded' : ''}`}>
                <span className="hof-swipe-arrow">‹</span> Swipe <span className="hof-swipe-arrow">›</span>
              </span>
              <span className="hof-swipe-count">
                {activeIndex + 1} / {count}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
