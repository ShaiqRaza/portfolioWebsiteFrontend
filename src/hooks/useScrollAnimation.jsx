import { useEffect } from "react";

const useScrollAnimation = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target); // Stop observing once visible
          }
        });
      },
      { threshold: 0.4 }
    );

    elements.forEach((el) => {
      // ✅ Ensure layout is calculated before checking visibility
      requestAnimationFrame(() => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("show");
          observer.unobserve(el);
        } else {
          observer.observe(el);
        }
      });
    });

    return () => elements.forEach((el) => observer.unobserve(el));
  });
};

export default useScrollAnimation;
