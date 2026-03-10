"use client";

import { useState, useEffect, useRef } from "react";
import { clsx } from "clsx";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  light?: boolean;
}

export default function StatCounter({
  value,
  suffix = "",
  label,
  light = false,
}: StatCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // IntersectionObserver to trigger animation when in view
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [hasAnimated]);

  // Animated count-up
  useEffect(() => {
    if (!hasAnimated) return;

    const duration = 2000;
    let startTime: number | null = null;
    let animationFrame: number;

    function easeOutCubic(t: number): number {
      return 1 - Math.pow(1 - t, 3);
    }

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      setCount(Math.round(easedProgress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    }

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [hasAnimated, value]);

  return (
    <div ref={ref} className="text-center">
      <div
        className={clsx(
          "text-4xl font-bold",
          light ? "text-gold" : "text-navy"
        )}
      >
        {count}
        {suffix}
      </div>
      <div
        className={clsx(
          "text-sm uppercase tracking-wider mt-2",
          light ? "text-white/80" : "text-charcoal-light"
        )}
      >
        {label}
      </div>
    </div>
  );
}
