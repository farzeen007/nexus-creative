"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonialsData = [
  {
    name: "Elena V.",
    company: "Nexus IQ",
    quote: "They completely transformed our digital presence with great passion.",
  },
  {
    name: "David S.W",
    company: "Vertex Ltd",
    quote: "Exceptional quality. Their team delivered exactly what we requested.",
  },
  {
    name: "Anish M.",
    company: "BankX",
    quote: "The ultimate partner for our digital growth and market expansion.",
  },
  {
    name: "Liam G.S",
    company: "Apex Design",
    quote: "Their unique approach to design solved each of our complex issues.",
  },
  {
    name: "Luna R.",
    company: "Luxe Creative",
    quote: "The absolute best partner for every modern digital project.",
  },
];

import { useReducedMotion } from "@/hooks/useReducedMotion";

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    gsap.to(bgTextRef.current, {
      x: "-40%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
    });

    gsap.to(marqueeTrackRef.current, {
      x: "+10%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
    });
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  const MarqueeContent = () => (
    <div className="flex items-center gap-10 md:gap-16 lg:gap-20 pr-10 md:pr-16">
      {testimonialsData.map((t, i) => (
        <div
          key={i}
          className="flex items-center gap-4 md:gap-6 text-white/90 min-w-[280px] md:min-w-[420px] lg:min-w-[520px]"
          aria-label={`Testimonial from ${t.name} at ${t.company}`}
        >
          <span className="text-yellow-400 text-lg md:text-xl" aria-hidden="true">★★★★★</span>

          <p className="text-sm md:text-lg lg:text-xl leading-relaxed line-clamp-2">
            &quot;{t.quote}&quot;
          </p>

          <span className="text-white/40 text-xs md:text-sm whitespace-nowrap">
            — {t.name}, {t.company}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-b from-black via-indigo-950/80 to-black py-24 md:py-36"
      aria-label="Client Testimonials"
    >
      <div
        ref={bgTextRef}
        className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap opacity-[0.07] pointer-events-none will-change-transform"
      >
        <h2 className="text-[30vw] md:text-[14vw] font-black tracking-widest uppercase text-white">
          ·TESTIMONIALS·
        </h2>
      </div>

      <div className="relative z-10 w-full overflow-hidden border-y border-white/5 bg-black/40 backdrop-blur-sm group">
        <div
          className={cn(
            "flex w-max marquee-track will-change-transform",
            prefersReducedMotion && "animate-none"
          )}
          ref={marqueeTrackRef}
        >
          <div className="marquee-inner flex items-center">
            <MarqueeContent />
            <MarqueeContent />
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          --duration: 40s;
          animation: marquee var(--duration) linear infinite;
        }

        .group:hover .marquee-track {
          animation-play-state: paused;
        }

        @keyframes marquee {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;