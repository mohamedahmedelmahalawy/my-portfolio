"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import { useRef } from "react";

interface AimatedTextLinesProps {
  text: string;
  className: string;
}

function AnimatedTextLines({ text, className }: AimatedTextLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLSpanElement[]>([]);
  const lines = text.split("\n").filter((line) => line.trim() !== "");

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (linesRef.current.length > 0) {
      gsap.from(linesRef.current, {
        y: 100,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.3,
        ease: "back.out",
        scrollTrigger: {
          trigger: containerRef.current,
        },
      });
    }
  });
  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, index) => (
        <span
          key={index}
          ref={(el) => {
            if (el) {
              linesRef.current[index] = el;
            }
          }}
          className="block leading-relaxed tracking-wide text-pretty invisible"
        >
          {line}
        </span>
      ))}
    </div>
  );
}

export default AnimatedTextLines;
