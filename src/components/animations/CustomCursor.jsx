import { useCursor } from '@/hooks/useCursor'

export default function CustomCursor() {
  const { dotRef, ringRef } = useCursor()

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        id="cursor-dot"
        className="hidden md:block fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        style={{
          width: '8px',
          height: '8px',
          background: 'var(--accent)',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        id="cursor-ring"
        className="hidden md:block fixed top-0 left-0 z-[9998] pointer-events-none rounded-full"
        style={{
          width: '36px',
          height: '36px',
          border: '1.5px solid var(--accent)',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s ease, height 0.3s ease',
          willChange: 'left, top',
        }}
      />

      {/* Cursor states via global CSS */}
      <style>{`
        body.cursor--link #cursor-dot {
          width: 6px; height: 6px;
        }
        body.cursor--link #cursor-ring {
          width: 70px; height: 70px;
          background: var(--accent);
          opacity: 0.15;
          border-color: var(--accent);
        }
      `}</style>
    </>
  )
}
