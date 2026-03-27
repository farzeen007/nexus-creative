"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { MagneticButton } from "@/components/MagneticButton";

const socialLinks = [
  { name: "Twitter", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "Dribbble", href: "#" },
];

export const Footer = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".footer-content", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <footer
      ref={containerRef}
      className="bg-[#020617] text-white py-24 px-4 md:px-20 border-t border-white/5 relative overflow-hidden"
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="footer-content relative z-10 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-7xl font-light tracking-tighter mb-12">
          START YOUR NEXT GREAT <br />
          <span className="font-bold italic text-indigo-400">BRANDING ADVENTURE?</span>
        </h2>

        <MagneticButton>
          <a
            href="mailto:hello@nexus.design!"
            className="text-2xl md:text-4xl font-medium hover:text-indigo-400 transition-colors border-b-2 border-indigo-400/30 pb-2 flex items-center gap-4"
          >
            hello@nexus.design!
            <span className="text-sm border border-white/20 rounded-full px-4 py-1 font-light opacity-50 group-hover:opacity-100">
              Start today.
            </span>
          </a>
        </MagneticButton>

        <div className="mt-32 w-full flex flex-col md:flex-row justify-between items-center gap-12 border-t border-white/5 pt-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="text-2xl font-black tracking-tighter">NEXUS</span>
            <p className="text-white/40 text-sm max-w-[200px]">
              London & Virtual. <br />
              Creating the spirit of modern design and brands
            </p>
          </div>

          <div className="flex gap-8">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/50 hover:text-indigo-400 transition-colors text-sm uppercase tracking-widest"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="text-white/30 text-xs">
            &copy; 2026 NEXUS CREATIVE <br />
            ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </footer>
  );
};
