"use client";
import { useEffect, useState, useRef } from "react";
import { gsap } from "@/lib/gsap";

export const LoadingScreen = () => {
  const [percent, setPercent] = useState(0);
  const screenRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    const progress = { value: 0 };
    gsap.to(progress, {
      value: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => setPercent(Math.floor(progress.value)),
      onComplete: () => {
        tl.to(textRef.current, {
          y: -100,
          opacity: 0,
          duration: 0.8,
          ease: "back.in(1.7)",
        })
          .to(
            screenRef.current,
            {
              yPercent: -100,
              duration: 1.2,
              ease: "expo.inOut",
            },
            "-=0.4"
          )
          .set(screenRef.current, { display: "none" });
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={screenRef}
      className="fixed inset-0 z-[99999] bg-[#020617] flex items-center justify-center overflow-hidden"
    >
      <div ref={textRef} className="text-center">
        <div className="text-sm tracking-[1em] text-white/30 mb-8 uppercase animate-pulse">
          Nexus Creative
        </div>
        <div className="text-8xl md:text-[12rem] font-black tracking-tighter text-white tabular-nums">
          {percent}%
        </div>
      </div>
    </div>
  );
};
