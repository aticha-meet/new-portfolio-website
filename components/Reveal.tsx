"use client";

import { useEffect, useRef } from "react";
import { useAnimate, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** HTML starts visible: a missing script must never hide portfolio content. */
export function Reveal({ children }: { children: ReactNode }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const reduceMotion = useReducedMotion();
  const played = useRef(false);

  useEffect(() => {
    if (reduceMotion || !scope.current || played.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played.current) return;
        played.current = true;
        void animate(
          scope.current,
          { opacity: [0.92, 1], y: [16, 0] },
          { duration: 0.4, ease: "easeOut" },
        );
        observer.disconnect();
      },
      { threshold: 0.06 },
    );
    observer.observe(scope.current);
    return () => observer.disconnect();
  }, [animate, reduceMotion, scope]);

  return (
    <div ref={scope} className="reveal">
      {children}
    </div>
  );
}
