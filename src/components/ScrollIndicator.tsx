"use client";

import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

export const ScrollIndicator = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(".chevron-icon", {
      y: 10,
      opacity: 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "100px top",
      scrub: true,
      onUpdate: (self) => {
        if (containerRef.current) {
          gsap.set(containerRef.current, {
            opacity: 1 - self.progress,
            display: self.progress === 1 ? "none" : "flex",
          });
        }
      },
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
    >
      <span className="text-[10px] tracking-[0.2em] uppercase opacity-40">Scroll</span>
      <ChevronDown className="chevron-icon w-6 h-6 opacity-80" />
    </div>
  );
};
