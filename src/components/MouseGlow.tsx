import { useEffect, useRef, useCallback } from "react";

const MouseGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const lerp = useCallback(() => {
    const pos = posRef.current;
    pos.x += (pos.targetX - pos.x) * 0.08;
    pos.y += (pos.targetY - pos.y) * 0.08;

    if (glowRef.current) {
      glowRef.current.style.transform = `translate(${pos.x - 300}px, ${pos.y - 300}px)`;
    }

    rafRef.current = requestAnimationFrame(lerp);
  }, []);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const handleMove = (e: MouseEvent) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY + window.scrollY;
    };

    rafRef.current = requestAnimationFrame(lerp);
    document.addEventListener("mousemove", handleMove);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", handleMove);
    };
  }, [lerp]);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-0 hidden md:block"
      style={{
        width: 600,
        height: 600,
        borderRadius: "50%",
        background: "radial-gradient(circle, hsl(142 70% 45% / 0.04) 0%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
};

export default MouseGlow;
