import { useEffect, useRef } from "react";

const LINK_DISTANCE = 130;
const POINTER_RADIUS = 190;

/**
 * Pointer-reactive node graph rendered on a single canvas.
 * - DPR capped at 2, node count scales with area
 * - Pauses when off-screen or the tab is hidden
 * - Renders one static frame for prefers-reduced-motion
 */
export default function NeuralField({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -9999, y: -9999 };
    let width = 0;
    let height = 0;
    let nodes = [];
    let frame = 0;
    let onScreen = true;

    const seed = () => {
      const count = Math.max(24, Math.min(96, Math.round((width * height) / 15000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.3 + 0.6,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];

        if (!reduceMotion) {
          a.x += a.vx;
          a.y += a.vy;
          if (a.x < -20) a.x = width + 20;
          else if (a.x > width + 20) a.x = -20;
          if (a.y < -20) a.y = height + 20;
          else if (a.y > height + 20) a.y = -20;
        }

        const pdx = a.x - pointer.x;
        const pdy = a.y - pointer.y;
        const pDist = Math.hypot(pdx, pdy);
        const heat = pDist < POINTER_RADIUS ? 1 - pDist / POINTER_RADIUS : 0;

        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq > LINK_DISTANCE * LINK_DISTANCE) continue;

          const strength = 1 - Math.sqrt(distSq) / LINK_DISTANCE;
          ctx.strokeStyle =
            heat > 0.05
              ? `rgba(139, 155, 255, ${strength * (0.12 + heat * 0.5)})`
              : `rgba(255, 255, 255, ${strength * 0.1})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }

        if (heat > 0) {
          ctx.strokeStyle = `rgba(139, 155, 255, ${heat * 0.35})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }

        ctx.fillStyle =
          heat > 0.05 ? `rgba(139, 155, 255, ${0.5 + heat * 0.5})` : "rgba(255, 255, 255, 0.34)";
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r + heat * 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduceMotion || frame || !onScreen || document.hidden) return;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw();
    };

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const viewObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    viewObserver.observe(canvas);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      resizeObserver.disconnect();
      viewObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
