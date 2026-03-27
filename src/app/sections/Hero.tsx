"use client";
import { useRef, useEffect, useState } from "react";
import { AnimatedText } from "@/components/AnimatedText";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { MagneticButton } from "@/components/MagneticButton";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

const blobs = [
  { id: 1, size: 200, color: "bg-indigo-500/20", pos: "top-[10%] left-[15%]", speed: 40, duration: 4 },
  { id: 2, size: 150, color: "bg-pink-500/20", pos: "bottom-[20%] right-[10%]", speed: 25, duration: 6 },
  { id: 3, size: 100, color: "bg-cyan-500/20", pos: "top-[40%] right-[30%]", speed: 15, duration: 5 },
  { id: 4, size: 60, color: "bg-indigo-500/10", pos: "bottom-[40%] left-[30%]", speed: 10, duration: 7 },
];

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { x, y } = useMousePosition();
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 150; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          radius: Math.random() * 1.5,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)"; 
      
      particles.forEach(p => {
        p.x += p.vx + (x - window.innerWidth / 2) * 0.0001; 
        p.y += p.vy + (y - window.innerHeight / 2) * 0.0001;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [x, y, prefersReducedMotion]);

  useGSAP(() => {
    if (prefersReducedMotion) {
      gsap.set(subtitleRef.current, { opacity: 0.8, y: 0 });
      return;
    }

    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { 
        opacity: 0.8, 
        y: 0, 
        duration: 1, 
        delay: 0.8, 
        ease: "power2.out",
        onStart: () => { if (subtitleRef.current) subtitleRef.current.style.willChange = "transform, opacity"; },
        onComplete: () => { if (subtitleRef.current) subtitleRef.current.style.willChange = "auto"; }
      }
    );

    blobRefs.current.forEach((blob, i) => {
      if (!blob) return;
      gsap.to(blob, {
        y: "+=30",
        duration: blobs[i].duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: blobs[i].duration * Math.random(),
      });
    });
  }, { scope: heroRef, dependencies: [prefersReducedMotion] });

  useGSAP(() => {
    if (prefersReducedMotion || isMobile) return;

    blobRefs.current.forEach((blob, i) => {
      if (!blob) return;
      const factor = blobs[i].speed / 1000;
      gsap.to(blob, {
        x: (x - window.innerWidth / 2) * factor,
        y: (y - window.innerHeight / 2) * factor,
        duration: 1.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  }, { dependencies: [x, y, isMobile, prefersReducedMotion], scope: heroRef });

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-mesh"
      aria-label="Hero Section"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {blobs.map((blob, i) => (
        <div
          key={blob.id}
          ref={(el) => { blobRefs.current[i] = el; }}
          className={cn(
            "absolute rounded-[40%_60%_70%_30%/40%_50%_60%_40%] mix-blend-screen pointer-events-none filter blur-[40px] will-change-transform",
            blob.color,
            blob.pos
          )}
          style={{ width: blob.size, height: blob.size }}
        />
      ))}

      <div className="relative z-10 text-center px-4">
        <AnimatedText
          text="CRAFTING BOLD FUTURES."
          type="chars"
          className="text-5xl md:text-8xl font-bold tracking-tighter text-white"
        />
        
        <p
          ref={subtitleRef}
          className="mt-6 text-lg md:text-xl font-light tracking-wide text-indigo-200/80 max-w-2xl mx-auto"
        >
          We transform visionary ideas into immersive digital realities with precision &amp; spirit.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <MagneticButton>
            <button 
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full transition-all hover:scale-105 active:scale-95 font-medium shadow-[0_0_20px_rgba(79,70,229,0.3)]"
              aria-label="View our portfolio"
            >
              Projects
            </button>
          </MagneticButton>
          
          <MagneticButton>
            <button 
              className="px-8 py-4 border border-indigo-400/30 hover:border-indigo-400 text-white rounded-full transition-all hover:bg-white/5 active:scale-95 font-medium glass"
              aria-label="Learn more about us"
            >
              Our Agency
            </button>
          </MagneticButton>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
};
