"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const codeSnippets = [
  'const developer = "Gurunath Gorule"',
  'async function createSolution() {',
  '  const skills = ["React", "Node.js", "TypeScript"]',
  '  return buildAwesomeProject(skills)',
  '}',
  'class SoftwareEngineer {',
  '  constructor() {',
  '    this.passion = "Building great software"',
  '  }',
  '}',
]

export function CodeBackground() {
  const [currentLines, setCurrentLines] = useState<string[]>([])
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    let currentIndex = 0
    let currentLineIndex = 0
    let currentText = ''

    const typeText = () => {
      if (currentLineIndex >= codeSnippets.length) {
        currentLineIndex = 0
        setCurrentLines([])
        timeoutRef.current = setTimeout(typeText, 2000)
        return
      }

      const targetText = codeSnippets[currentLineIndex]
      if (currentIndex < targetText.length) {
        currentText = targetText.slice(0, currentIndex + 1)
        currentIndex++
        setCurrentLines(prev => {
          const newLines = [...prev]
          newLines[currentLineIndex] = currentText
          return newLines
        })
        timeoutRef.current = setTimeout(typeText, 50)
      } else {
        currentIndex = 0
        currentLineIndex++
        timeoutRef.current = setTimeout(typeText, 500)
      }
    }

    typeText()

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen bg-black/90 overflow-hidden">
      <div className="absolute inset-0 grid place-items-center opacity-20">
        {currentLines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-mono text-[#4ff0c1] text-xl"
          >
            {line}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

