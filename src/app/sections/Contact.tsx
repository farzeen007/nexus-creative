"use client";

import React, { useRef, useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { AnimatedText } from "@/components/AnimatedText";
import { MagneticButton } from "@/components/MagneticButton";
import { cn } from "@/lib/utils";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@nexus-creative.design" },
  { icon: Phone, label: "Phone", value: "+1 (800) 900-NEXUS" },
  { icon: MapPin, label: "Location", value: "London, United Kingdom (2026)" },
];

import { useReducedMotion } from "@/hooks/useReducedMotion";

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const infoItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const checkmarkPathRef = useRef<SVGPathElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) {
      gsap.set(infoItemsRef.current, { opacity: 1, x: 0 });
      return;
    }

    gsap.from(infoItemsRef.current, {
      x: -50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
      onStart: () => { 
        infoItemsRef.current.forEach(el => { if(el) el.style.willChange = "transform, opacity"; }); 
      },
      onComplete: () => {
        infoItemsRef.current.forEach(el => { if(el) el.style.willChange = "auto"; }); 
      }
    });
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (prefersReducedMotion) return;
    const parent = e.target.parentElement;
    if (!parent) return;

    const label = parent.querySelector("label");
    const border = parent.querySelector(".bottom-border");

    if (label instanceof HTMLElement) {
      label.style.willChange = "transform, scale, color";
      gsap.to(label, {
        y: -25,
        scale: 0.85,
        color: "#818cf8", 
        duration: 0.4,
        ease: "power2.out",
      });
    }

    if (border instanceof HTMLElement) {
      border.style.willChange = "width";
      gsap.to(border, {
        width: "100%",
        duration: 0.6,
        ease: "power2.inOut",
      });
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (prefersReducedMotion) return;
    const parent = e.target.parentElement;
    if (!parent || e.target.value !== "") return;

    const label = parent.querySelector("label");
    const border = parent.querySelector(".bottom-border");

    if (label instanceof HTMLElement) {
      gsap.to(label, {
        y: 0,
        scale: 1,
        color: "rgba(255, 255, 255, 0.4)",
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => { label.style.willChange = "auto"; }
      });
    }

    if (border instanceof HTMLElement) {
      gsap.to(border, {
        width: "0%",
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => { border.style.willChange = "auto"; }
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitted) return;

    setIsSubmitted(true);

    if (prefersReducedMotion) return;

    setTimeout(() => {
      if (checkmarkPathRef.current) {
        const length = checkmarkPathRef.current.getTotalLength();
        gsap.set(checkmarkPathRef.current, { strokeDasharray: length, strokeDashoffset: length });
        
        gsap.to(checkmarkPathRef.current, {
          strokeDashoffset: 0,
          duration: 1,
          ease: "power2.inOut",
        });

        gsap.fromTo(".success-msg", 
          { opacity: 0, y: 10 }, 
          { opacity: 1, y: 0, duration: 0.5, delay: 0.5 }
        );
      }
    }, 100);
  };

  const renderField = (id: string, label: string, type: "input" | "textarea") => {
    const Component = type;
    return (
      <div className="relative mb-12 group">
        <label 
          htmlFor={id} 
          className={cn(
            "absolute left-0 top-2 text-white/40 pointer-events-none transition-all origin-left",
            prefersReducedMotion && formData[id as keyof typeof formData] && "-translate-y-6 scale-[0.85] text-indigo-400"
          )}
        >
          {label}
        </label>
        <Component
          id={id}
          className="w-full bg-transparent border-b border-white/10 py-2 text-white outline-none focus:border-white/20 transition-colors"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          aria-label={label}
          required
          rows={type === "textarea" ? 4 : undefined}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData({ ...formData, [id]: e.target.value })}
        />
        <div className="bottom-border absolute bottom-0 left-0 h-[2px] w-0 bg-indigo-400" />
      </div>
    );
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative py-32 px-4 md:px-20 bg-black min-h-screen flex items-center overflow-hidden"
      aria-label="Contact Section"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-950/20 blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="flex flex-col justify-center">
          <AnimatedText 
            text="LET'S TALK." 
            className="text-7xl md:text-9xl font-black text-white tracking-tighter mb-12"
          />
          
          <div className="space-y-8" role="list">
            {contactInfo.map((info, i) => (
              <div 
                key={i} 
                ref={(el) => { infoItemsRef.current[i] = el; }}
                className="flex items-center gap-6 group cursor-none"
                role="listitem"
              >
                <div className="p-4 bg-white/5 rounded-full group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-all duration-500">
                  <info.icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-white/40 text-sm font-medium uppercase tracking-widest">{info.label}</p>
                  <p className="text-white text-xl md:text-2xl font-light">{info.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="glass p-8 md:p-12 rounded-3xl border border-white/5 bg-white/5">
              {renderField("name", "YOUR NAME", "input")}
              {renderField("email", "YOUR EMAIL", "input")}
              {renderField("message", "YOUR MESSAGE", "textarea")}

              <div className="mt-12">
                <MagneticButton className="w-full sm:w-auto">
                  <button 
                    type="submit"
                    className="group relative px-12 py-5 bg-white text-black font-bold uppercase tracking-widest rounded-full overflow-hidden transition-transform active:scale-95"
                    aria-label="Send message"
                  >
                    <span className="relative z-10">SUBMIT →</span>
                    <div className="absolute inset-0 bg-indigo-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
                  </button>
                </MagneticButton>
              </div>
            </form>
          ) : (
            <div 
              className="flex flex-col items-center justify-center p-20 glass rounded-3xl border border-white/5 bg-white/5 text-center min-h-[400px]"
              role="status"
              aria-live="polite"
            >
              <svg 
                className="w-24 h-24 mb-6 text-indigo-400" 
                viewBox="0 0 52 52" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Success checkmark"
              >
                <circle cx="26" cy="26" r="25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path 
                  ref={checkmarkPathRef}
                  d="M14 27l8 8 16-16" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>
              <h3 className="success-msg text-4xl font-black text-white uppercase tracking-tighter">
                Message Sent!
              </h3>
              <p className="success-msg mt-4 text-white/50">
                We&apos;ll sync with you shortly.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
