/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        geist: ['Geist', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        med: {
          primary: '#2563eb',
          dark: '#0f172a',
          accent: '#10b981',
          danger: '#ef4444',
          warning: '#f59e0b',
          purple: '#a855f7',
        }
      },
      animation: {
        'scan-line': 'scanLine 4s ease-in-out infinite',
        'float': 'float 7s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out infinite 3s',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-up-delay-1': 'fadeUp 0.8s ease-out 0.1s forwards',
        'fade-up-delay-2': 'fadeUp 0.8s ease-out 0.2s forwards',
        'fade-up-delay-3': 'fadeUp 0.8s ease-out 0.3s forwards',
        'gradient-shift': 'gradientShift 5s ease infinite',
        'orb-float': 'orbFloat 25s ease-in-out infinite',
        'particle-float': 'particleFloat 15s linear infinite',
        'detection-appear': 'detectionAppear 0.5s ease-out forwards',
        'scan-image': 'scanImage 2.5s ease-in-out',
      },
      keyframes: {
        scanLine: {
          '0%': { top: '0', opacity: '0' },
          '5%': { opacity: '1' },
          '95%': { opacity: '1' },
          '100%': { top: '100%', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0', transform: 'scale(2)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        orbFloat: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '25%': { transform: 'translate(30px,-50px) scale(1.05)' },
          '50%': { transform: 'translate(-40px,20px) scale(0.95)' },
          '75%': { transform: 'translate(50px,40px) scale(1.08)' },
        },
        particleFloat: {
          '0%': { transform: 'translateY(100vh)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100vh)', opacity: '0' },
        },
        detectionAppear: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scanImage: {
          '0%': { top: '0', opacity: '0' },
          '5%': { opacity: '1' },
          '95%': { opacity: '1' },
          '100%': { top: '100%', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}