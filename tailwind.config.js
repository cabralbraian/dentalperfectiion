/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mineral: {
          50: '#F8FAFB',
          100: '#EEF2F4',
          200: '#DCE4E8',
          300: '#C9D5DB',
        },
        ink: {
          900: '#0B1F2E',
          800: '#132C3F',
          700: '#1D3B52',
          600: '#2A4D68',
        },
        tealbrand: {
          500: '#00A3A6',
          600: '#008C8F',
          700: '#006E70',
        }
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        sans: ['"Hanken Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
