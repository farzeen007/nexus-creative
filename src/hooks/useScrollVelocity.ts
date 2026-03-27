import { useState, useEffect } from "react";

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollVelocity = () => {
      const currentScrollY = window.scrollY;
      setVelocity(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollVelocity);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return velocity;
}
