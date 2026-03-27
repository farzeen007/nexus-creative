"use client";
import { useEffect, useState } from "react";
import { MagneticButton } from "@/components/MagneticButton";
import { cn } from "@/lib/utils";

const links = [
  { name: "About", href: "#" },
  { name: "Services", href: "#" },
  { name: "Work", href: "#" },
  { name: "Contact", href: "#" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6 px-4 md:px-20",
        scrolled ? "bg-black/20 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent"
      )}
      aria-label="Main Navigation"
    >
      <div className="flex justify-between items-center max-w-[1400px] mx-auto">
        <MagneticButton>
          <a href="/" className="text-2xl font-black tracking-tighter text-white" aria-label="Nexus Logo">
            NEXUS
          </a>
        </MagneticButton>

        <div className="flex items-center gap-8 md:gap-12">
          <div className="hidden md:flex gap-12">
            {links.map((link) => (
              <MagneticButton key={link.name}>
                <a
                  href={link.href}
                  className="text-xs uppercase tracking-[0.2em] font-medium text-white/50 hover:text-white transition-colors"
                  data-cursor="hover"
                  aria-label={`Go to ${link.name}`}
                >
                  {link.name}
                </a>
              </MagneticButton>
            ))}
          </div>


          <div className="md:hidden">
            <button className="flex flex-col gap-2" aria-label="Open menu">
              <div className="w-8 h-[2px] bg-white transition-all" />
              <div className="w-8 h-[2px] bg-white transition-all" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
