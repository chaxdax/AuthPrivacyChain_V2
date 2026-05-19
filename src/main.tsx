import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './module-light-theme.css'

interface ParticleData {
  x: number; y: number; vx: number; vy: number;
  w: number; h: number; radius: number;
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

function createParticle(w: number, h: number): ParticleData {
  const p: ParticleData = {
    w, h,
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 1.5,
    vy: (Math.random() - 0.5) * 1.5,
    radius: 2,
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > this.w) this.vx *= -1;
      if (this.y < 0 || this.y > this.h) this.vy *= -1;
    },
    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#3b82f6';
      ctx.fill();
    }
  };
  return p;
}

const LoginBackgroundPreview = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let particles: ParticleData[] = [];
    const mouse: { x: number | null; y: number | null } = { x: null, y: null };

    const checkTarget = () => {
      const portal = document.querySelector('.main-portal') as HTMLElement | null;
      const home = document.querySelector('.home-original') as HTMLElement | null;
      const found = !!(portal || home);

      if (found) {
        if (!isVisible) setIsVisible(true);
        const target = portal || home;
        if (target) {
          target.style.setProperty('background', 'transparent', 'important');
          target.style.setProperty('background-color', 'transparent', 'important');
        }
        document.querySelectorAll('.cyber-grid-bg, .home-glow, .cloud-container').forEach(el => {
          (el as HTMLElement).style.display = 'none';
        });
      } else {
        if (isVisible) setIsVisible(false);
      }
    };

    const interval = setInterval(checkTarget, 100);

    const initParticles = () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 10000);
      for (let i = 0; i < Math.min(count, 150); i++) {
        particles.push(createParticle(canvas.width, canvas.height));
      }
    };

    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };

    const animate = () => {
      if (!canvasRef.current) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.update();
        p.draw(ctx);
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x; const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.5 * (1 - dist / 150)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
        if (mouse.x !== null && mouse.y !== null) {
          const mdx = p.x - mouse.x; const mdy = p.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 250) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(96, 165, 250, ${0.9 * (1 - mdist / 250)})`;
            ctx.lineWidth = 1.5;
            ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', initParticles);
    window.addEventListener('mousemove', handleMouseMove);
    initParticles();
    animate();

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', initParticles);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  return (
    <>
      <style>{`
        body:has(.main-portal), body:has(.home-original) {
          background: linear-gradient(135deg, #000000 0%, #020818 50%, #0d1a55 100%) !important;
        }
        .particle-fixed-overlay {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          z-index: 9999;
          pointer-events: none;
        }
      `}</style>
      {isVisible && (
        <div className="particle-fixed-overlay">
          <canvas ref={canvasRef} />
        </div>
      )}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <LoginBackgroundPreview />
  </React.StrictMode>,
)