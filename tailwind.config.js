/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'var(--bg)',
          2: 'var(--bg-2)',
        },
        fg: {
          DEFAULT: 'var(--fg)',
          muted: 'var(--fg-muted)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          dark: 'var(--accent-dark)',
        },
        card: 'var(--card-bg)',
        border: 'var(--border-color)',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        serif: ['Instrument Serif', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'fluid-hero': 'clamp(3.2rem, 9vw, 11rem)',
        'fluid-h2': 'clamp(2.4rem, 6vw, 6rem)',
        'fluid-h3': 'clamp(1.5rem, 3vw, 2.4rem)',
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.03em',
        snug: '-0.02em',
        wide: '0.08em',
        wider: '0.12em',
        widest: '0.2em',
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
        'marquee-reverse': 'marquee 25s linear infinite reverse',
        float: 'float 8s ease-in-out infinite',
        pulse: 'pulse 2s ease-in-out infinite',
        'scroll-line': 'scrollLine 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-30px) scale(1.05)' },
        },
        scrollLine: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '51%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
