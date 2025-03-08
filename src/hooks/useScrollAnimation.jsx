import { useEffect } from "react";

const useScrollAnimation = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");

    console.log(elements);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.3 } // Trigger when 20% of the element is visible
    );

    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);
};

export default useScrollAnimation;
