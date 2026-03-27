"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "outcomes", label: "What You'll Learn" },
  { id: "curriculum", label: "Curriculum" },
  { id: "instructor", label: "Instructor" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQs" }
];

export function StickySubNav() {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 160;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className={`w-full z-40 transition-all duration-300 ${isFixed ? "fixed top-28 left-0 bg-background/80 backdrop-blur-xl border-b border-white/5 shadow-2xl" : "relative mt-12 mb-12"}`}>
      <div className="container mx-auto px-6 h-16 flex items-center overflow-x-auto no-scrollbar gap-8">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors whitespace-nowrap pt-1 border-b-2 border-transparent hover:border-primary h-full px-2"
          >
            {section.label}
          </button>
        ))}
      </div>
    </div>
  );
}
