"use client";

import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  pulsePhase: number;
  pulseSpeed: number;
}

export function MatrixDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);

      initDots(rect.width, rect.height);
    };

    const initDots = (width: number, height: number) => {
      const spacing = 32;
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      const dots: Dot[] = [];

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing + spacing / 2;
          const y = j * spacing + spacing / 2;
          dots.push({
            x,
            y,
            baseX: x,
            baseY: y,
            size: Math.random() * 1.5 + 1,
            opacity: Math.random() * 0.3 + 0.1,
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02 + Math.random() * 0.03,
          });
        }
      }

      dotsRef.current = dots;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const animate = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect || !ctx) return;

      ctx.clearRect(0, 0, rect.width, rect.height);

      const time = Date.now() * 0.001;
      const mouse = mouseRef.current;
      const interactionRadius = 120;

      dotsRef.current.forEach((dot) => {
        // Calculate distance from mouse
        const dx = mouse.x - dot.baseX;
        const dy = mouse.y - dot.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Pulse animation
        dot.pulsePhase += dot.pulseSpeed;
        const pulseFactor = Math.sin(dot.pulsePhase) * 0.5 + 0.5;

        // Mouse interaction - dots move away slightly and brighten
        let offsetX = 0;
        let offsetY = 0;
        let brightness = dot.opacity;
        let size = dot.size;

        if (distance < interactionRadius) {
          const force = (1 - distance / interactionRadius) * 8;
          const angle = Math.atan2(dy, dx);
          offsetX = -Math.cos(angle) * force;
          offsetY = -Math.sin(angle) * force;
          brightness = Math.min(0.8, dot.opacity + 0.4 * (1 - distance / interactionRadius));
          size = dot.size * (1 + 0.5 * (1 - distance / interactionRadius));
        }

        dot.x = dot.baseX + offsetX;
        dot.y = dot.baseY + offsetY;

        // Draw dot with glow
        const finalOpacity = brightness * (0.7 + pulseFactor * 0.3);
        
        // Glow effect
        const gradient = ctx.createRadialGradient(
          dot.x, dot.y, 0,
          dot.x, dot.y, size * 3
        );
        gradient.addColorStop(0, `rgba(99, 102, 241, ${finalOpacity * 0.5})`);
        gradient.addColorStop(0.5, `rgba(6, 182, 212, ${finalOpacity * 0.2})`);
        gradient.addColorStop(1, "rgba(99, 102, 241, 0)");
        
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129, 140, 248, ${finalOpacity})`;
        ctx.fill();
      });

      // Draw subtle connecting lines for nearby dots
      ctx.strokeStyle = "rgba(99, 102, 241, 0.03)";
      ctx.lineWidth = 0.5;

      for (let i = 0; i < dotsRef.current.length; i++) {
        const dot1 = dotsRef.current[i];
        for (let j = i + 1; j < dotsRef.current.length; j++) {
          const dot2 = dotsRef.current[j];
          const dx = dot1.x - dot2.x;
          const dy = dot1.y - dot2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 50) {
            ctx.beginPath();
            ctx.moveTo(dot1.x, dot1.y);
            ctx.lineTo(dot2.x, dot2.y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ opacity: 0.6 }}
    />
  );
}
