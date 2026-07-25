/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#07080F',
          900: '#0A0B14',
          850: '#0E1019',
          800: '#12141F',
          700: '#191C29',
          600: '#242739',
        },
        haze: {
          400: '#9296AC',
          300: '#B7BACB',
          100: '#F4F5FA',
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
        glow: '0 0 40px -8px rgba(124,108,246,0.45)',
        glowTeal: '0 0 40px -8px rgba(45,216,196,0.45)',
        glowAmber: '0 0 40px -8px rgba(251,191,90,0.45)',
        card: '0 8px 30px -12px rgba(0,0,0,0.5)',
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
