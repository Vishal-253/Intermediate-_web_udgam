import React, { useEffect, useRef } from 'react';

export default function PetalCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;
    let isMobile = width < 768;

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      isMobile = width < 768;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const pointer = { x: -1000, y: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0 };

    const handleMouseMove = (e) => {
      pointer.vx = (e.clientX - pointer.lastX) * 0.1;
      pointer.vy = (e.clientY - pointer.lastY) * 0.1;
      pointer.lastX = pointer.x = e.clientX;
      pointer.lastY = pointer.y = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        pointer.vx = (touch.clientX - pointer.lastX) * 0.08;
        pointer.vy = (touch.clientY - pointer.lastY) * 0.08;
        pointer.lastX = pointer.x = touch.clientX;
        pointer.lastY = pointer.y = touch.clientY;
      }
    };

    const handleTouchEnd = () => {
      pointer.x = -1000;
      pointer.y = -1000;
      pointer.vx = 0;
      pointer.vy = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    class Petal {
      constructor(randomY = true) {
        this.reset(randomY);
      }

      reset(randomY = false) {
        this.x = Math.random() * (width + 120) - 60;
        this.y = randomY ? Math.random() * height : -Math.random() * 60 - 20;

        if (isMobile) {
          // Delicate, smaller petals on mobile to keep text crystal clear
          this.size = 7 + Math.random() * 7;
          this.speedY = 0.5 + Math.random() * 0.8;
          this.speedX = 0.25 + Math.random() * 0.65;
          this.opacity = 0.38 + Math.random() * 0.35;
        } else {
          this.size = 11 + Math.random() * 14;
          this.speedY = 0.7 + Math.random() * 1.5;
          this.speedX = 0.5 + Math.random() * 1.1;
          this.opacity = 0.52 + Math.random() * 0.38;
        }

        this.angle = Math.random() * Math.PI * 2;
        this.angularSpeed = (Math.random() - 0.5) * (isMobile ? 0.02 : 0.035);
        this.flip = Math.random() * Math.PI * 2;
        this.flipSpeed = 0.015 + Math.random() * 0.025;
        this.swayFreq = 0.0008 + Math.random() * 0.0016;
        this.swayPhase = Math.random() * Math.PI * 2;

        const shades = [
          { r: 255, g: 107, b: 139 },
          { r: 255, g: 183, b: 197 },
          { r: 255, g: 133, b: 162 },
          { r: 255, g: 230, b: 242 },
          { r: 240, g: 194, b: 138 }
        ];
        this.color = shades[Math.floor(Math.random() * shades.length)];
      }

      update(time) {
        this.angle += this.angularSpeed;
        this.flip += this.flipSpeed;

        const sway = Math.sin(time * this.swayFreq + this.swayPhase) * (isMobile ? 0.55 : 0.9);
        this.x += this.speedX + sway;
        this.y += this.speedY;

        // Interactive dispersion on touch/cursor
        const interactionRadius = isMobile ? 80 : 130;
        const dx = this.x - pointer.x;
        const dy = this.y - pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < interactionRadius && dist > 0) {
          const force = (interactionRadius - dist) / interactionRadius;
          this.x += (dx / dist) * force * (isMobile ? 3.0 : 4.5) + pointer.vx * 0.3;
          this.y += (dy / dist) * force * (isMobile ? 2.5 : 3.5) + pointer.vy * 0.3;
        }

        if (this.y > height + 40 || this.x > width + 80 || this.x < -80) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        const scaleY = Math.sin(this.flip);
        ctx.scale(1, scaleY);

        if (!isMobile) {
          ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.5)`;
          ctx.shadowBlur = 8;
        }

        ctx.beginPath();
        const s = this.size;
        ctx.moveTo(0, -s * 0.6);
        ctx.bezierCurveTo(-s * 0.5, -s * 0.8, -s * 0.7, -s * 0.1, -s * 0.3, s * 0.6);
        ctx.bezierCurveTo(-s * 0.1, s * 0.9, 0, s, 0, s);
        ctx.bezierCurveTo(0, s, s * 0.1, s * 0.9, s * 0.3, s * 0.6);
        ctx.bezierCurveTo(s * 0.7, -s * 0.1, s * 0.5, -s * 0.8, 0, -s * 0.6);

        const grad = ctx.createRadialGradient(0, s * 0.2, 1, 0, 0, s);
        grad.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`);
        grad.addColorStop(0.8, `rgba(255, 107, 139, ${this.opacity * 0.85})`);
        grad.addColorStop(1, `rgba(212, 165, 116, ${this.opacity * 0.6})`);

        ctx.fillStyle = grad;
        ctx.fill();

        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.5})`;
        ctx.lineWidth = isMobile ? 0.6 : 0.9;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.8);
        ctx.lineTo(0, -s * 0.3);
        ctx.stroke();

        ctx.restore();
      }
    }

    const count = isMobile ? 18 : Math.min(Math.floor(width / 32), 42);
    const petals = [];
    for (let i = 0; i < count; i++) {
      petals.push(new Petal(true));
    }

    let animId;
    function animate(time) {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < petals.length; i++) {
        petals[i].update(time);
        petals[i].draw();
      }
      animId = requestAnimationFrame(animate);
    }
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} id="petal-canvas" aria-hidden="true" />;
}
