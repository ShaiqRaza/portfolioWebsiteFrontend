import { useEffect } from "react";

const useScrollAnimation = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target); // Stop observing once it's visible
          }
        });
      },
      { threshold: 0.3 }
    );

    elements.forEach((el) => {
      observer.observe(el);

      // ✅ Check if already visible when page loads
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add("show");
        observer.unobserve(el);
      }
    });

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);
};


export default useScrollAnimation;
