"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedProgressProps {
  value: number
  label: string
  color?: string
  delay?: number
}

export function AnimatedProgress({
  value,
  label,
  color = "bg-blue-600",
  delay = 0
}: AnimatedProgressProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true)
            }, delay)
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-medium text-gray-700">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-1500 ease-out`}
          style={{
            width: isVisible ? `${value}%` : "0%"
          }}
        />
      </div>
    </div>
  )
}
