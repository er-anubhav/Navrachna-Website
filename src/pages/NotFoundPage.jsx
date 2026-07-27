import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{
        background: 'linear-gradient(135deg, #013759 0%, #074887 50%, #0a5da6 100%)',
        fontFamily: "'Sora', sans-serif"
      }}>
      {/* Decorative glowing circle */}
      <div style={{
        position: 'absolute',
        width: '600px', height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(230,118,20,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{
          fontSize: '10rem', fontWeight: 800, lineHeight: 1,
          background: 'linear-gradient(135deg, #e67614, #fbbf24)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: 0,
        }}>404</p>

        <h1 style={{
          fontSize: '1.75rem', fontWeight: 700, color: '#fff',
          marginTop: '0.5rem', marginBottom: '1rem'
        }}>
          Page Not Found
        </h1>

        <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '420px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn-primary shimmer">
            ← Back to Home
          </Link>
          <Link to="/contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.25)',
            color: '#fff', borderRadius: '12px', padding: '14px 28px',
            fontWeight: 600, cursor: 'pointer', transition: 'all 0.25s ease'
          }}>
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}
