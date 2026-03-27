"use client";
import { useRef } from "react";
import { Target, Layers, Compass, Cpu } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { AnimatedText } from "@/components/AnimatedText";

const services = [
  {
    title: "Visual Systems",
    icon: Target,
    desc: "Defining custom brand identities that resonate everywhere.",
  },
  {
    title: "Web Design",
    icon: Layers,
    desc: "Strategic digital products and sites built for scalability.",
  },
  {
    title: "Creative Direction",
    icon: Compass,
    desc: "Strategic guidance for modern digital brands.",
  },
  {
    title: "Web Innovation",
    icon: Cpu,
    desc: "Building seamless tech platforms for leading enterprise.",
  },
];

export const Services = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!triggerRef.current || !containerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const container = containerRef.current!;

      const getScrollDistance = () =>
        container.scrollWidth - window.innerWidth;

      const tween = gsap.to(container, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true, 
        },
      });

      return () => {
        tween.kill();
      };
    });

    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(
        ".service-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 85%",
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={triggerRef}
      className="relative bg-[#020617] overflow-hidden py-20 md:py-0"
    >
      <div className="relative md:absolute top-0 md:top-20 left-0 md:left-10 z-10 px-6 md:px-0 mb-10 md:mb-0">
        <AnimatedText
          text="SERVICES"
          type="words"
          className="text-3xl md:text-5xl text-white"
        />
      </div>

      <div className="h-auto md:h-screen flex items-center">
        <div
          ref={containerRef}
          className="
            flex 
            flex-col md:flex-row 
            gap-6 md:gap-10 
            px-6 md:px-20
          "
          style={{
            width: "100%",
            ...(typeof window !== "undefined" &&
            window.innerWidth >= 768
              ? { width: "max-content" }
              : {}),
          }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="
                service-card 
                w-full md:w-[400px] 
                h-auto md:h-[300px] 
                bg-indigo-900/40 
                border border-indigo-500/20 
                p-6 md:p-8 
                rounded-2xl 
                flex-shrink-0
              "
            >
              <service.icon className="w-8 h-8 md:w-10 md:h-10 text-indigo-400 mb-4 md:mb-6" />

              <h3 className="text-xl md:text-2xl text-white mb-3 md:mb-4">
                {service.title}
              </h3>

              <p className="text-indigo-200/70 text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};