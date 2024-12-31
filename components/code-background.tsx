"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const codeSnippets = [
  "const notFound = () => {",
  '  throw new Error("404: Page Not Found")',
  "}",
  "function explorePortfolio() {",
  '  return "Exciting Projects"',
  "}",
  "class Developer {",
  "  constructor() {",
  '    this.name = "Gurunath Gorule"',
  '    this.skills = ["React", "Next.js", "TypeScript"]',
  "  }",
  "}",
];

export function CodeBackground() {
  const [currentLines, setCurrentLines] = useState<string[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let currentIndex = 0;
    let currentLineIndex = 0;

    const typeText = () => {
      if (currentLineIndex >= codeSnippets.length) {
        currentLineIndex = 0;
        setCurrentLines([]);
      }

      const targetText = codeSnippets[currentLineIndex];
      if (currentIndex < targetText.length) {
        setCurrentLines((prev) => {
          const newLines = [...prev];
          newLines[currentLineIndex] = targetText.slice(0, currentIndex + 1);
          return newLines;
        });
        currentIndex++;
      } else {
        currentIndex = 0;
        currentLineIndex++;
      }

      timeoutRef.current = setTimeout(typeText, currentIndex === 0 ? 1000 : 50);
    };

    typeText();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen bg-black/90 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-[#4ff0c1] font-mono text-sm md:text-base opacity-20">
          {currentLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {line}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
