"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  type?: "words" | "chars";
  delay?: number;
  className?: string;
}

export const AnimatedText = ({
  text,
  type = "words",
  delay = 0,
  className,
}: AnimatedTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(".animate-span", { opacity: 1, y: 0 });
        return;
      }

      const elements = containerRef.current?.querySelectorAll(".animate-span");
      if (!elements || elements.length === 0) return;

      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          delay: delay,
          stagger: type === "chars" ? 0.04 : 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [text, type, delay, prefersReducedMotion] }
  );

  const words = text.split(" ");

  return (
    <div
      ref={containerRef}
      className={cn("flex flex-wrap items-center", className)}
      aria-label={text}
    >
      {words.map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          className="inline-block overflow-hidden mr-[0.25em] py-[0.1em]"
        >
          {type === "words" ? (
            <span className="animate-span inline-block">
              {word}
            </span>
          ) : (
            <span className="inline-flex whitespace-nowrap">
              {word.split("").map((char, charIndex) => (
                <span
                  key={`${char}-${charIndex}`}
                  className="animate-span inline-block"
                >
                  {char}
                </span>
              ))}
            </span>
          )}
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </div>
  );
};
