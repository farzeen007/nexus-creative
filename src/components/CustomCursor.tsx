"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const text = textRef.current;
    if (!cursor || !follower || !text) return;

    gsap.set([cursor, follower, text], { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      if (!target) return;

      const type = target.getAttribute("data-cursor");

      if (type === "gallery") {
        gsap.to(follower, {
          width: 100,
          height: 100,
          backgroundColor: "rgba(99, 102, 241, 0.2)",
          borderColor: "rgba(99, 102, 241, 0.5)",
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.to(text, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      if (!target) return;

      gsap.to(follower, {
        width: 32,
        height: 32,
        backgroundColor: "transparent",
        borderColor: "rgba(6, 182, 212, 0.5)", 
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(text, {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
      });
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-accent/50 rounded-full pointer-events-none z-[9998] flex items-center justify-center transition-colors duration-300"
      />
      <div
        ref={textRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] opacity-0 scale-50"
      >
        <span className="text-[10px] font-bold text-white uppercase tracking-widest">
          View
        </span>
      </div>
    </>
  );
}
