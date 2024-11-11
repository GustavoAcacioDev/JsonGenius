/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "components/**/*.{ts,tsx}", 
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        gray: {
          100: '#f2f4f8',
          200: '#e9ebee',
          300: '#ccd0d6',
          400: '#acb1ba',
          500: '#737a86',
          600: '#5a626e',
          700: '#333e4f',
          800: '#19202d',
          900: '#13161a',
          1000: '#080a0d',
        },
        'blue-hover': '#2148B9',
        'neutral-blue': '#0066FF',
        'neutral-purple': '#733EE3',
        'neutral-magenta': '#B83EE3',
        'neutral-green': '#02B52F',
        'neutral-orange': '#FF6B00',
        primary: '#2B5FF3',
        negativePure: '#ff3541',
        'light-green': '#eefbf1',
        'positive-md': '#1d8d3c',
        'positive-md-800': '#166b2e',
        'positive-dark': '#125A26',
        positivePure: '#1ecb4f',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      screens: {
        desktop: '1367px',
        laptop: '1024px',
        tablet: '640px',
      },
      gridTemplateRows: {
        'auto-1fr': 'auto 1fr',
        'auto-double-1fr': 'auto 1fr 1fr',
        '1fr-auto': '1fr auto',
        table: 'auto 1fr auto',
      },
      gridTemplateColumns: {
        'auto-1fr': 'auto 1fr',
        'auto-double-1fr': 'auto 1fr 1fr',
        '1fr-auto': '1fr auto',
        table: 'auto 1fr auto',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}