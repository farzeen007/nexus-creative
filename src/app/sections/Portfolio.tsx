"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

const projects = [
  {
    title: "Modern Ritual",
    category: "Brand Identity",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2000&auto=format&fit=crop",
    className: "md:col-start-1 md:row-span-2 h-[500px] md:h-auto",
  },
  {
    title: "Apex Mobile",
    category: "Digital Experience",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2000&auto=format&fit=crop",
    className: "md:col-start-2 md:row-span-1 h-[400px]",
  },
  {
    title: "Moving Spirits",
    category: "Content Creation",
    image: "https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?q=80&w=2000&auto=format&fit=crop",
    className: "md:col-start-2 md:row-span-1 h-[400px]",
  },
  {
    title: "Global Network",
    category: "Ecommerce Build",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    className: "md:col-start-1 md:row-span-1 h-[400px]",
  },
  {
    title: "Beyond Visuals",
    category: "Strategic Growth",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2000&auto=format&fit=crop",
    className: "md:col-start-2 md:row-span-2 h-[500px] md:h-auto",
  },
];

export const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        titleRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
          },
        }
      );

      gsap.from(".portfolio-card", {
        clipPath: "inset(100% 0 0 0)",
        y: 100,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".portfolio-grid",
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  const onMouseEnter = (index: number) => {
    gsap.to(`.card-image-${index}`, {
      scale: 1.08,
      duration: 0.6,
      ease: "power2.out",
    });
    gsap.to(`.card-overlay-${index}`, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const onMouseLeave = (index: number) => {
    gsap.to(`.card-image-${index}`, {
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
    });
    gsap.to(`.card-overlay-${index}`, {
      y: "100%",
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    });
  };

  return (
    <section ref={sectionRef} className="py-32 px-4 md:px-20 bg-[#020617] relative">
      <div className="mb-20">
        <h2
          ref={titleRef}
          className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none"
        >
          OUR PORTFOLIO
        </h2>
      </div>

      <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {projects.map((project, index) => (
          <div
            key={index}
            className={cn(
              "portfolio-card relative overflow-hidden rounded-3xl group cursor-none",
              project.className
            )}
            data-cursor="gallery"
            onMouseEnter={() => onMouseEnter(index)}
            onMouseLeave={() => onMouseLeave(index)}
          >
            <div
              className={cn(
                "w-full h-full bg-cover bg-center transition-all duration-700 will-change-transform",
                `card-image-${index}`
              )}
              style={{ backgroundImage: `url(${project.image})` }}
              role="img"
              aria-label={`Project image for ${project.title}`}
            />

            <div
              className={cn(
                "absolute inset-0 bg-black/60 flex flex-col justify-end p-10 opacity-0 translate-y-full will-change-transform",
                `card-overlay-${index}`
              )}
            >
              <span className="text-indigo-300 text-sm font-medium tracking-[0.2em] uppercase mb-2">
                {project.category}
              </span>
              <h3 className="text-3xl font-bold text-white mb-6">
                {project.title}
              </h3>
              <button 
                className="flex items-center text-white/70 group-hover:text-white transition-colors"
                aria-label={`View details of ${project.title}`}
              >
                <span className="text-sm font-light">Explore Now →</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
