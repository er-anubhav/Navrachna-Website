import { useEffect, useState } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`scroll-top-btn ${visible ? 'visible' : ''}`}
    >
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  )
}
