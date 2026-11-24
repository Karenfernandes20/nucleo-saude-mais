'use client';

import React, { useEffect, useRef } from 'react';

interface DnaCanvas3dProps {
  className?: string;
}

export default function DnaCanvas3d({ className = '' }: DnaCanvas3dProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let mouseX = 0;
    let mouseY = 0;
    let targetTiltX = 0.22;
    let targetTiltY = 0;
    let currentTiltX = 0.22;
    let currentTiltY = 0;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Handle high-DPI displays
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Pause when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Mouse movement parallax
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;
      targetTiltY = normX * 0.4;
      targetTiltX = 0.22 + normY * 0.2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Particles system
    const particleCount = 36;
    const particles = Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * 360,
      y: (Math.random() - 0.5) * 440,
      z: (Math.random() - 0.5) * 200,
      radius: Math.random() * 2 + 1,
      speedY: -(Math.random() * 0.4 + 0.15),
      pulse: Math.random() * Math.PI * 2,
    }));

    // DNA Geometry Settings
    const totalPairs = 34;
    const helixRadius = 72;
    const verticalSpacing = 12.5;
    const rotationSpeed = prefersReducedMotion ? 0 : 0.012;
    let angleOffset = 0;

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Smooth tilt interpolation
      currentTiltX += (targetTiltX - currentTiltX) * 0.06;
      currentTiltY += (targetTiltY - currentTiltY) * 0.06;

      if (!prefersReducedMotion) {
        angleOffset += rotationSpeed;
      }

      const centerX = width / 2;
      const centerY = height / 2;
      const fov = 380;

      // Draw background ambient glow
      const glowGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        width * 0.55
      );
      glowGrad.addColorStop(0, 'rgba(42, 208, 196, 0.18)');
      glowGrad.addColorStop(0.5, 'rgba(23, 109, 124, 0.08)');
      glowGrad.addColorStop(1, 'rgba(12, 68, 99, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // 1. Draw floating particles
      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.y += p.speedY;
          if (p.y < -height / 2) p.y = height / 2;
          p.pulse += 0.03;
        }

        const scale = fov / (fov + p.z + 100);
        const px = centerX + p.x * scale;
        const py = centerY + p.y * scale;
        const alpha = Math.max(0.1, 0.35 + Math.sin(p.pulse) * 0.25);

        ctx.beginPath();
        ctx.arc(px, py, p.radius * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(42, 208, 196, ${alpha})`;
        ctx.shadowColor = '#2AD0C4';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 2. Build 3D points for DNA Double Helix
      interface BasePair {
        zSort: number;
        p1: { x: number; y: number; z: number; sx: number; sy: number; scale: number };
        p2: { x: number; y: number; z: number; sx: number; sy: number; scale: number };
        index: number;
      }

      const pairs: BasePair[] = [];

      for (let i = 0; i < totalPairs; i++) {
        const rawY = (i - totalPairs / 2) * verticalSpacing;
        const theta = (i * 0.32) + angleOffset;

        // 3D coordinates on rotating cylinder
        let x1 = Math.cos(theta) * helixRadius;
        let z1 = Math.sin(theta) * helixRadius;
        let y1 = rawY;

        let x2 = Math.cos(theta + Math.PI) * helixRadius;
        let z2 = Math.sin(theta + Math.PI) * helixRadius;
        let y2 = rawY;

        // Apply X-tilt (inclination)
        const cosX = Math.cos(currentTiltX);
        const sinX = Math.sin(currentTiltX);

        const y1Tilt = y1 * cosX - z1 * sinX;
        const z1Tilt = y1 * sinX + z1 * cosX;
        const y2Tilt = y2 * cosX - z2 * sinX;
        const z2Tilt = y2 * sinX + z2 * cosX;

        // Apply Y-tilt (mouse parallax)
        const cosY = Math.cos(currentTiltY);
        const sinY = Math.sin(currentTiltY);

        const x1Final = x1 * cosY + z1Tilt * sinY;
        const z1Final = -x1 * sinY + z1Tilt * cosY;
        const x2Final = x2 * cosY + z2Tilt * sinY;
        const z2Final = -x2 * sinY + z2Tilt * cosY;

        // Perspective Projection
        const scale1 = fov / (fov + z1Final + 200);
        const scale2 = fov / (fov + z2Final + 200);

        const sx1 = centerX + x1Final * scale1;
        const sy1 = centerY + y1Tilt * scale1;

        const sx2 = centerX + x2Final * scale2;
        const sy2 = centerY + y2Tilt * scale2;

        pairs.push({
          zSort: (z1Final + z2Final) / 2,
          p1: { x: x1Final, y: y1Tilt, z: z1Final, sx: sx1, sy: sy1, scale: scale1 },
          p2: { x: x2Final, y: y2Tilt, z: z2Final, sx: sx2, sy: sy2, scale: scale2 },
          index: i,
        });
      }

      // Depth Sorting (painter's algorithm)
      pairs.sort((a, b) => a.zSort - b.zSort);

      // 3. Draw sorted rungs & nodes
      pairs.forEach((pair) => {
        const { p1, p2, index } = pair;

        // Draw connecting base pair rung
        const rungGrad = ctx.createLinearGradient(p1.sx, p1.sy, p2.sx, p2.sy);
        const depthAlpha = Math.max(0.18, Math.min(0.9, (pair.zSort + 160) / 320));

        // Alternating base pair colors (Turquoise / Cyan / Teal)
        if (index % 2 === 0) {
          rungGrad.addColorStop(0, `rgba(42, 208, 196, ${depthAlpha * 0.95})`);
          rungGrad.addColorStop(0.5, `rgba(255, 255, 255, ${depthAlpha * 0.7})`);
          rungGrad.addColorStop(1, `rgba(0, 229, 255, ${depthAlpha * 0.95})`);
        } else {
          rungGrad.addColorStop(0, `rgba(0, 229, 255, ${depthAlpha * 0.95})`);
          rungGrad.addColorStop(0.5, `rgba(187, 231, 232, ${depthAlpha * 0.7})`);
          rungGrad.addColorStop(1, `rgba(42, 208, 196, ${depthAlpha * 0.95})`);
        }

        ctx.beginPath();
        ctx.moveTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.lineWidth = Math.max(1, 2.2 * ((p1.scale + p2.scale) / 2));
        ctx.strokeStyle = rungGrad;
        ctx.stroke();

        // Intermediate base pair dot
        const midX = (p1.sx + p2.sx) / 2;
        const midY = (p1.sy + p2.sy) / 2;
        ctx.beginPath();
        ctx.arc(midX, midY, 1.8 * ((p1.scale + p2.scale) / 2), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha * 0.8})`;
        ctx.fill();

        // Function to draw glowing nucleotide bead
        const drawNode = (p: typeof p1, isStrandA: boolean) => {
          const nodeRadius = Math.max(3, 6.2 * p.scale);
          const nodeAlpha = Math.max(0.25, Math.min(1, (p.z + 160) / 280));

          // Outer Glow
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, nodeRadius * 2.2, 0, Math.PI * 2);
          const outerGrad = ctx.createRadialGradient(
            p.sx,
            p.sy,
            0,
            p.sx,
            p.sy,
            nodeRadius * 2.2
          );
          outerGrad.addColorStop(0, `rgba(42, 208, 196, ${nodeAlpha * 0.45})`);
          outerGrad.addColorStop(1, 'rgba(42, 208, 196, 0)');
          ctx.fillStyle = outerGrad;
          ctx.fill();

          // Core Sphere
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, nodeRadius, 0, Math.PI * 2);
          const coreGrad = ctx.createRadialGradient(
            p.sx - nodeRadius * 0.3,
            p.sy - nodeRadius * 0.3,
            0,
            p.sx,
            p.sy,
            nodeRadius
          );
          if (isStrandA) {
            coreGrad.addColorStop(0, '#FFFFFF');
            coreGrad.addColorStop(0.35, '#2AD0C4');
            coreGrad.addColorStop(1, '#0C4463');
          } else {
            coreGrad.addColorStop(0, '#FFFFFF');
            coreGrad.addColorStop(0.35, '#00E5FF');
            coreGrad.addColorStop(1, '#07293D');
          }
          ctx.fillStyle = coreGrad;
          ctx.fill();
        };

        // Draw nodes in order of z depth
        if (p1.z < p2.z) {
          drawNode(p1, true);
          drawNode(p2, false);
        } else {
          drawNode(p2, false);
          drawNode(p1, true);
        }
      });

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing"
        style={{ width: '100%', height: '100%', touchAction: 'none' }}
        aria-label="Molécula de DNA tridimensional em rotação contínua com iluminação turquesa e partículas moleculares"
      />
    </div>
  );
}
