import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FEF3C7',
          100: '#FDE68A',
          200: '#FCD34D',
          300: '#FBBF24',
          400: '#F59E0B',
          500: '#D97706',
          600: '#B45309',
          700: '#92400E',
          800: '#78350F',
          900: '#451A03',
        },
        honey: {
          50: '#FFF9C4',
          100: '#FFF59D',
          200: '#FFF176',
          300: '#FFEE58',
          400: '#FFEB3B',
          500: '#FBC02D',
          550: '#F59E0B', // Added for better contrast (matches primary-400)
          600: '#F9A825',
          700: '#F57F17',
          800: '#EF6C00',
          900: '#E65100',
        },
        bee: {
          stripe: '#1A1A1A',
          gold: '#FFD700',
          amber: '#FFB300',
          cream: '#FFF8E1',
          // Darker variants for better contrast on light backgrounds
          'gold-dark': '#D4A500',
          'amber-dark': '#B8860B',
        },
        wax: {
          50: '#FFFDE7',
          100: '#FFF9C4',
          200: '#FFF59D',
          300: '#FFF176',
          400: '#FFEE58',
        },
        dark: '#000000',
        light: '#FFFFFF',
        accent: '#3B82F6',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'bee-float': 'beeFloat 4s ease-in-out infinite',
        'honeycomb-pulse': 'honeycombPulse 3s ease-in-out infinite',
        'hex-rotate': 'hexRotate 20s linear infinite',
        'drip': 'drip 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        beeFloat: {
          '0%, 100%': { transform: 'translate(0px, 0px) rotate(0deg)' },
          '25%': { transform: 'translate(10px, -15px) rotate(5deg)' },
          '50%': { transform: 'translate(20px, -10px) rotate(0deg)' },
          '75%': { transform: 'translate(10px, -20px) rotate(-5deg)' },
        },
        honeycombPulse: {
          '0%, 100%': { opacity: '0.1' },
          '50%': { opacity: '0.2' },
        },
        hexRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        drip: {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
export default config
