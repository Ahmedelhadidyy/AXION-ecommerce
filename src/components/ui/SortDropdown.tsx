"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const sortOptions = [
  { value: "featured", label: "Featured", icon: "✨" },
  { value: "newest", label: "Newest", icon: "🆕" },
  { value: "price-low", label: "Price: Low → High", icon: "💰" },
  { value: "price-high", label: "Price: High → Low", icon: "💎" },
];

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = sortOptions.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full lg:w-auto">
      {/* Trigger Button */}
      <button
        aria-label="dropdown"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full lg:w-auto rounded-2xl border border-primary/20 bg-black px-5 py-4 text-white outline-none transition cursor-pointer flex items-center justify-between hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20"
      >
        <span className="flex items-center gap-2">
          <span className="text-lg">{selectedOption?.icon}</span>
          <span className="text-sm font-medium">{selectedOption?.label}</span>
        </span>
        <ChevronDown
          className={`w-5 h-5 text-primary/60 transition duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 rounded-2xl border border-primary/20 bg-black/95 backdrop-blur-md shadow-2xl shadow-black/50 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {sortOptions.map((option) => (
            <button
              aria-label="dropdown"
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`
                w-full
                px-5
                py-4
                text-left
                text-sm
                font-medium
                transition
                flex
                items-center
                gap-3
                border-b
                border-primary/10
                last:border-b-0
                cursor-pointer

                ${
                  value === option.value
                    ? "bg-primary/15 text-primary"
                    : "text-white/80 hover:bg-primary/10 hover:text-white"
                }
              `}
            >
              <span className="text-lg">{option.icon}</span>
              <span>{option.label}</span>
              {value === option.value && (
                <span className="ml-auto">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
