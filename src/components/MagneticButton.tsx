"use client";
import { useRef, ReactNode, useState, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number; 
}

export const MagneticButton = ({ children, className, onClick, strength = 0.4 }: MagneticButtonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const handleGlobalMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = container.getBoundingClientRect();
        
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        
        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < 80) {
          const moveX = (deltaX / 80) * 20;
          const moveY = (deltaY / 80) * 20;

          gsap.to(container, {
            x: moveX,
            y: moveY,
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
          });
        } else {
          gsap.to(container, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.4)",
            overwrite: "auto",
          });
        }
      };

      window.addEventListener("mousemove", handleGlobalMouseMove);
      return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
    },
    { scope: containerRef }
  );

  return (
    <div 
      ref={containerRef} 
      className={cn("inline-block cursor-none", className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
