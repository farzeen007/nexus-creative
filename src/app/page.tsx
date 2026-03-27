"use client";

import dynamic from "next/dynamic";
import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { Hero } from "@/app/sections/Hero";
import { Navbar } from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";

const Services = dynamic(() => import("@/app/sections/Services").then(mod => mod.Services), { ssr: false });
const Portfolio = dynamic(() => import("@/app/sections/Portfolio").then(mod => mod.Portfolio), { ssr: false });
const Testimonials = dynamic(() => import("@/app/sections/Testimonials"), { ssr: false });
const Contact = dynamic(() => import("@/app/sections/Contact"), { ssr: false });
const Footer = dynamic(() => import("@/app/sections/Footer").then(mod => mod.Footer), { ssr: false });

export default function Home() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (overlayRef.current) {
      const tl = gsap.timeline();
      
      tl.to(overlayRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "power3.inOut",
        delay: 0.2, 
      });
    }
  }, []);

  return (
    <>
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-[100] bg-[#020617] pointer-events-none"
      />

      <CustomCursor />
      <Navbar />
      
      <main className="relative min-h-screen">
        <Hero />
        <Services />
        <Portfolio />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
