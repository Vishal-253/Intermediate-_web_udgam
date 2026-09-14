import React, { useEffect, useRef } from 'react';

export default function PetalCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = { x: -1000, y: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0 };
    const handleMouseMove = (e) => {
      mouse.vx = (e.clientX - mouse.lastX) * 0.1;
      mouse.vy = (e.clientY - mouse.lastY) * 0.1;
      mouse.lastX = mouse.x = e.clientX;
      mouse.lastY = mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    class Petal {
      constructor(isSpawnFromTree = false) {
        this.reset(isSpawnFromTree);
      }

      reset(isSpawnFromTree = false) {
        if (isSpawnFromTree) {
          this.x = width * 0.65 + (Math.random() * 200 - 100);
          this.y = Math.random() * (height * 0.5);
        } else {
          this.x = Math.random() * (width + 200) - 100;
          this.y = Math.random() * -height;
        }

        this.size = 12 + Math.random() * 15;
        this.speedY = 0.8 + Math.random() * 1.7;
        this.speedX = 0.5 + Math.random() * 1.3;
        this.angle = Math.random() * Math.PI * 2;
        this.angularSpeed = (Math.random() - 0.5) * 0.035;
        this.flip = Math.random() * Math.PI * 2;
        this.flipSpeed = 0.02 + Math.random() * 0.03;
        this.opacity = 0.55 + Math.random() * 0.4;
        this.swayFreq = 0.001 + Math.random() * 0.002;
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

        const sway = Math.sin(time * this.swayFreq + this.swayPhase) * 0.85;
        this.x += this.speedX + sway;
        this.y += this.speedY;

        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (140 - dist) / 140;
          this.x += (dx / dist) * force * 4.5 + mouse.vx * 0.35;
          this.y += (dy / dist) * force * 3.5 + mouse.vy * 0.35;
        }

        if (this.y > height + 50 || this.x > width + 100 || this.x < -100) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        const scaleY = Math.sin(this.flip);
        ctx.scale(1, scaleY);

        ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.7)`;
        ctx.shadowBlur = 10;

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

        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.6})`;
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.8);
        ctx.lineTo(0, -s * 0.3);
        ctx.stroke();

        ctx.restore();
      }
    }

    const count = Math.min(Math.floor(window.innerWidth / 28), 50);
    const petals = [];
    for (let i = 0; i < count; i++) {
      const p = new Petal(false);
      p.y = Math.random() * height;
      petals.push(p);
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

    const spawnInterval = setInterval(() => {
      if (petals.length < 60) {
        petals.push(new Petal(true));
      }
    }, 3500);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
      clearInterval(spawnInterval);
    };
  }, []);

  return <canvas ref={canvasRef} id="petal-canvas" aria-hidden="true" />;
}
