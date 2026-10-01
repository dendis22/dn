import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface FireworksCanvasProps {
  active: boolean;
  onComplete?: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  decay: number;
  gravity: number;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  color: string;
  exploded: boolean;
}

export const FireworksCanvas: React.FC<FireworksCanvasProps> = ({ active, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    // Trigger canvas-confetti bursts for additional festive atmosphere
    try {
      // Pastel pink, rose gold, champagne, blush, lavender
      const colors = ['#FDA4AF', '#F472B6', '#FB7185', '#FDE047', '#E879F9', '#FBCFE8', '#FED7AA'];

      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.75, x: 0.5 },
        colors,
        disableForReducedMotion: true,
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 70,
          origin: { x: 0.1, y: 0.7 },
          colors,
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 70,
          origin: { x: 0.9, y: 0.7 },
          colors,
        });
      }, 350);

      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 160,
          origin: { y: 0.5, x: 0.5 },
          colors,
        });
      }, 800);
    } catch {
      // Fallback silently if canvas-confetti is unavailable
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const particles: Particle[] = [];
    const rockets: Rocket[] = [];
    const pastelColors = [
      '#FF6B8B', // Soft Rose
      '#FF8E53', // Pastel Coral
      '#F472B6', // Blush Pink
      '#E879F9', // Lavender
      '#FCD34D', // Warm Gold
      '#FDA4AF', // Petal Pink
      '#C084FC', // Violet
      '#6EE7B7', // Mint Sage
    ];

    // Launch 7 staggered rockets
    for (let i = 0; i < 7; i++) {
      const startX = width * (0.15 + (i * 0.7) / 6) + (Math.random() * 40 - 20);
      const targetY = height * (0.15 + Math.random() * 0.35);
      rockets.push({
        x: startX,
        y: height + Math.random() * 50,
        targetY,
        vy: -(11 + Math.random() * 4),
        color: pastelColors[Math.floor(Math.random() * pastelColors.length)],
        exploded: false,
      });
    }

    const explode = (x: number, y: number, color: string) => {
      const particleCount = 75;
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 6;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          size: 2.2 + Math.random() * 2.8,
          decay: 0.012 + Math.random() * 0.012,
          gravity: 0.07,
        });
      }
    };

    let startTime = Date.now();
    const duration = 4500; // 4.5 seconds of fireworks show

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        if (!r.exploded) {
          r.y += r.vy;

          // Draw trail
          ctx.beginPath();
          ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = r.color;
          ctx.shadowBlur = 12;
          ctx.shadowColor = r.color;
          ctx.fill();
          ctx.shadowBlur = 0;

          if (r.y <= r.targetY) {
            r.exploded = true;
            explode(r.x, r.y, r.color);
            // Spawn secondary small burst
            setTimeout(() => {
              explode(r.x + (Math.random() * 30 - 15), r.y + (Math.random() * 30 - 15), pastelColors[Math.floor(Math.random() * pastelColors.length)]);
            }, 180);
          }
        }
      }

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      if (Date.now() - startTime < duration || particles.length > 0) {
        animId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
        if (onComplete) onComplete();
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
};
