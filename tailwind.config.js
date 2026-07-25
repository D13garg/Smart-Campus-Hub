/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: 'var(--ink-950)',
          900: 'var(--ink-900)',
          850: 'var(--ink-850)',
          800: 'var(--ink-800)',
          700: 'var(--ink-700)',
          600: 'var(--ink-600)',
        },
        haze: {
          400: 'var(--haze-400)',
          300: 'var(--haze-300)',
          200: 'var(--haze-200)',
          100: 'var(--haze-100)',
        },
        canvas: {
          track: 'var(--canvas-track)',
        },
        orbit: {
          violet: '#7C6CF6',
          violetSoft: '#A79CFA',
          teal: '#2DD8C4',
          amber: '#FBBF5A',
          rose: '#F97C9B',
          danger: '#FF6B6B',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glow: 'var(--glow-shadow)',
        glowTeal: '0 0 36px -10px rgba(45,216,196,0.4)',
        glowAmber: '0 0 36px -10px rgba(233,162,45,0.4)',
        card: 'var(--card-shadow)',
      },
      backgroundImage: {
        'aurora-mesh':
          'radial-gradient(45% 45% at 20% 20%, rgba(124,108,246,0.35) 0%, transparent 60%), radial-gradient(40% 40% at 85% 15%, rgba(45,216,196,0.28) 0%, transparent 60%), radial-gradient(50% 50% at 50% 100%, rgba(251,191,90,0.18) 0%, transparent 60%)',
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.75rem',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(2%, -3%, 0) scale(1.05)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        spin_slow: {
          to: { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        drift: 'drift 18s ease-in-out infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        spinSlow: 'spin_slow 40s linear infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
