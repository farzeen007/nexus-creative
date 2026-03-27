"use client";
import { useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
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
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDarkMode(false);
      applyTheme(false);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const applyTheme = (dark: boolean) => {
    const bg = dark ? "#020617" : "#f8fafc";
    const fg = dark ? "#ffffff" : "#0f172a";

    gsap.to("body, main", {
      backgroundColor: bg,
      color: fg,
      duration: 0.8,
      ease: "power2.inOut",
    });

    document.documentElement.style.setProperty("--background", bg);
    document.documentElement.style.setProperty("--foreground", fg);
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    applyTheme(newTheme);
  };

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
