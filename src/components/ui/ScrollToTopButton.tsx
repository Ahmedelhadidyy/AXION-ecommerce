"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleVisibility = () => {
    if (window.scrollY > window.innerHeight) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    // Calculate scroll progress
    const windowHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    setScrollProgress(scrolled);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-primary to-primary/50 z-40 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Scroll to Top Button */}
      <button
        aria-label="scroll to top"
        onClick={scrollToTop}
        className={`
          fixed
          bottom-8
          right-8
          group
          z-40
          transition-all
          duration-500
          transform
          cursor-pointer

          ${
            isVisible
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-12 pointer-events-none"
          }
        `}
      >
        {/* Glow Effect Background */}
        <div className="absolute inset-0 bg-linear-to-r from-primary to-primary/50 rounded-full blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-300" />

        {/* Main Button */}
        <div className="relative w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 cursor-pointer backdrop-blur-md">
          {/* Rotating Ring */}
          <div
            className="absolute inset-0 rounded-full border border-transparent border-t-primary border-r-primary opacity-0 group-hover:opacity-100 animate-spin"
            style={{ animationDuration: "3s" }}
          />

          {/* Arrow Icon */}
          <ArrowUp className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110 relative z-10" />
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-primary/20 border border-primary/40 rounded-lg px-3 py-2 text-xs font-semibold text-white whitespace-nowrap backdrop-blur-md">
            Back to top
            <div className="absolute top-full right-4 w-2 h-2 bg-primary/20 rotate-45" />
          </div>
        </div>

        {/* Scroll Progress Circle */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 50 50"
          style={{ transform: "rotate(-90deg)" }}
        >
          <circle
            cx="25"
            cy="25"
            r="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary/10"
          />
          <circle
            cx="25"
            cy="25"
            r="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={`${2 * Math.PI * 22}`}
            strokeDashoffset={`${2 * Math.PI * 22 * (1 - scrollProgress / 100)}`}
            className="text-primary transition-all duration-300"
          />
        </svg>
      </button>
    </>
  );
}
