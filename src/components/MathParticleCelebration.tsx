import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface MathParticleCelebrationProps {
  trigger: number; // Increment or set timestamp to fire explosion
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  alpha: number;
  decay: number;
  type: 'triangle' | 'square' | 'circle' | 'symbol';
  symbol?: string;
}

interface ShockwaveRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  color: string;
  alpha: number;
}

const NEON_COLORS = [
  '#00F0FF', // Electric Cyan
  '#10B981', // Neon Emerald
  '#FFB800', // Neon Gold
  '#FF2A85', // Neon Hot Pink
  '#A855F7', // Neon Purple
  '#38BDF8', // Laser Sky
  '#FDE047'  // Bright Yellow
];

const MATH_SYMBOLS = ['Δ', 'θ', 'π', '√', 'Σ', 'x²', '90°', 'sen', 'cos', 'tg', '✦', '★'];

export const MathParticleCelebration: React.FC<MathParticleCelebrationProps> = ({ trigger }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!trigger) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Cap DPR at 1.5 for buttery-smooth frame rate with zero lag on high-DPI displays
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Multiple wide burst centers to cover the full screen cleanly
    const burstPoints = [
      { x: width * 0.25, y: height * 0.45 },
      { x: width * 0.5, y: height * 0.40 },
      { x: width * 0.75, y: height * 0.45 }
    ];

    const rings: ShockwaveRing[] = burstPoints.map((pt, idx) => ({
      x: pt.x,
      y: pt.y,
      radius: 18,
      maxRadius: Math.max(width, height) * (idx === 1 ? 0.5 : 0.36),
      color: idx === 1 ? '#00F0FF' : idx === 0 ? '#FFB800' : '#10B981',
      alpha: 0.72
    }));

    const particlesCount = 66;
    const particles: Particle[] = [];
    const types: ('triangle' | 'square' | 'circle' | 'symbol')[] = [
      'triangle',
      'square',
      'circle',
      'symbol',
      'symbol'
    ];

    for (let i = 0; i < particlesCount; i++) {
      const origin = burstPoints[i % burstPoints.length];
      const angle = Math.random() * Math.PI * 2;
      const speed = 5.5 + Math.random() * 10.5; // Energetic launch with gentle spread
      const upwardBias = -3.8 - Math.random() * 6.5;
      const color = NEON_COLORS[i % NEON_COLORS.length];
      const type = types[Math.floor(Math.random() * types.length)];
      const symbol =
        type === 'symbol'
          ? MATH_SYMBOLS[Math.floor(Math.random() * MATH_SYMBOLS.length)]
          : undefined;

      particles.push({
        x: origin.x + (Math.random() - 0.5) * 95,
        y: origin.y + (Math.random() - 0.5) * 60,
        vx: Math.cos(angle) * speed * 1.15,
        vy: Math.sin(angle) * speed + upwardBias,
        size: type === 'symbol' ? 22 + Math.random() * 18 : 13 + Math.random() * 16,
        color,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.14,
        alpha: 1.0,
        decay: 0.0056 + Math.random() * 0.0024, // Smooth ~2.5s to 3.0s duration at 60fps
        type,
        symbol
      });
    }

    let animationFrameId = 0;
    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.67, 2.5);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      let aliveCount = 0;

      // Expanding smooth shockwave rings
      for (let r = 0; r < rings.length; r++) {
        const ring = rings[r];
        if (ring.alpha <= 0.02) continue;
        aliveCount++;

        ring.radius += (ring.maxRadius - ring.radius) * 0.075 * dt;
        ring.alpha -= 0.013 * dt;

        ctx.globalAlpha = Math.max(0, ring.alpha);
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Smooth, lag-free GPU-friendly particles with gentle gravity fall
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.alpha <= 0.02) continue;

        aliveCount++;

        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 0.14 * dt;
        p.vx *= 0.986;
        p.vy *= 0.986;
        p.rotation += p.rotationSpeed * dt;
        p.alpha = Math.max(0, p.alpha - p.decay * dt);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        if (p.type === 'triangle') {
          ctx.beginPath();
          const r = p.size;
          ctx.moveTo(0, -r);
          ctx.lineTo(r * 0.866, r * 0.5);
          ctx.lineTo(-r * 0.866, r * 0.5);
          ctx.closePath();
          ctx.fill();
        } else if (p.type === 'square') {
          ctx.fillRect(-p.size * 0.5, -p.size * 0.5, p.size, p.size);
        } else if (p.type === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();
        } else if (p.type === 'symbol' && p.symbol) {
          ctx.font = `900 ${Math.round(p.size)}px 'Oxanium', monospace, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.symbol, 0, 0);
        }

        ctx.restore();
      }

      if (aliveCount > 0) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      ctx.clearRect(0, 0, width, height);
    };
  }, [trigger]);

  const canvasEl = (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] w-screen h-screen"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );

  if (typeof document !== 'undefined') {
    return createPortal(canvasEl, document.body);
  }

  return canvasEl;
};
