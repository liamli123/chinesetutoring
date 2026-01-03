"use client"

import { useEffect, useRef, ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  direction?: "up" | "left" | "right" | "scale"
  delay?: number
}

export function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible")
            }, delay)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [delay])

  const directionClass = {
    up: "scroll-fade-in",
    left: "scroll-fade-left",
    right: "scroll-fade-right",
    scale: "scroll-scale-in"
  }[direction]

  return (
    <div ref={ref} className={`${directionClass} ${className}`}>
      {children}
    </div>
  )
}
