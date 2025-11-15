/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED',
        accent: '#0EA5E9'
      },
      backdropBlur: {
        xs: '2px'
      },
      boxShadow: {
        glass: '0 25px 50px -12px rgba(15, 23, 42, 0.55)'
      }
    }
  },
  plugins: []
};
