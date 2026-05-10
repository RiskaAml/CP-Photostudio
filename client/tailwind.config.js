/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      colors: {
        primary:   '#FF6B35',  // energetic orange
        secondary: '#FFD23F',  // sunny yellow
        accent:    '#06D6A0',  // fresh mint
        dark:      '#1A1A2E',  // deep navy dark
        light:     '#FFFBF5',  // warm white
        muted:     '#6B7280',
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease forwards',
        'fade-in':    'fadeIn 0.4s ease forwards',
        'bounce-slow':'bounce 3s infinite',
        'float':      'float 4s ease-in-out infinite',
        'slide-left': 'slideLeft 0.4s ease forwards',
      },
      keyframes: {
        fadeUp:    { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:    { from: { opacity: 0 }, to: { opacity: 1 } },
        float:     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        slideLeft: { from: { opacity: 0, transform: 'translateX(20px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0,0,0,0.07)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.13)',
        'primary': '0 4px 20px rgba(255,107,53,0.35)',
      }
    }
  },
  plugins: []
}
