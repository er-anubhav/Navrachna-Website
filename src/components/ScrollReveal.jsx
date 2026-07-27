import { useEffect, useRef } from 'react'

/**
 * ScrollReveal — wraps children and animates them into view
 * using IntersectionObserver (no extra library needed).
 */
export default function ScrollReveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal reveal-delay-${delay} ${className}`}
    >
      {children}
    </div>
  )
}
