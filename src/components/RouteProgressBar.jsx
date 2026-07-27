import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * RouteProgressBar — shows a thin gradient bar at the top during route transitions.
 * Pure CSS + React, no extra library needed.
 */
export default function RouteProgressBar() {
  const location = useLocation()
  const [width, setWidth] = useState(0)
  const [visible, setVisible] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    setVisible(true)
    setWidth(0)
    // Animate to ~80% quickly
    timerRef.current = setTimeout(() => setWidth(80), 50)
    // Complete after short delay
    const done = setTimeout(() => {
      setWidth(100)
      setTimeout(() => { setVisible(false); setWidth(0) }, 350)
    }, 400)
    return () => { clearTimeout(timerRef.current); clearTimeout(done) }
  }, [location.pathname])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, zIndex: 9999,
        height: '3px', width: `${width}%`,
        background: 'linear-gradient(90deg, #e67614, #fbbf24)',
        borderRadius: '0 2px 2px 0',
        boxShadow: '0 0 10px #e67614',
        transition: width === 0 ? 'none' : 'width 0.4s cubic-bezier(0.4,0,0.2,1)',
        pointerEvents: 'none',
      }}
    />
  )
}
