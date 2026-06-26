import { useCursor } from '@/hooks/useCursor'

export default function CustomCursor() {
  const { dotRef, ringRef } = useCursor()

  return (
    <>
      <div
        ref={ringRef}
        id="cursor-ring"
        aria-hidden="true"
        className="hidden md:block fixed top-0 left-0 z-[9998] pointer-events-none rounded-full"
        style={{
          width: '28px',
          height: '28px',
          border: '1.5px solid rgba(255,255,255,0.35)',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.25s ease',
          willChange: 'left, top',
        }}
      />
      <div
        ref={dotRef}
        id="cursor-dot"
        aria-hidden="true"
        className="hidden md:block fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        style={{
          width: '5px',
          height: '5px',
          background: '#fff',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <style>{`
        [data-theme='dark'] #cursor-ring { border-color: rgba(255,255,255,0.35); }
        [data-theme='dark'] #cursor-dot { background: #fff; }
        [data-theme='light'] #cursor-ring { border-color: rgba(0,0,0,0.25); }
        [data-theme='light'] #cursor-dot { background: #000; }

        body.cursor--link #cursor-ring {
          width: 48px;
          height: 48px;
          border-color: var(--accent);
        }
        body.cursor--link #cursor-dot {
          width: 8px;
          height: 8px;
          background: var(--accent);
        }
      `}</style>
    </>
  )
}
