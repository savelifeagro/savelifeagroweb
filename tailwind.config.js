/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#146a2e",
        "primary-container": "#338444",
        "deep-forest": "#1F5D3A",
        "cream-foundation": "#FBF7F1",
        "warm-gold": "#F0C417",
        "charcoal-text": "#1A1A1A",
        "background": "#f9f9f9",
        "on-background": "#1a1c1c",
        "surface": "#f9f9f9",
        "surface-container": "#eeeeee",
        "surface-container-low": "#f3f3f4",
        "surface-container-high": "#e8e8e8",
        "surface-container-highest": "#e2e2e2",
        "surface-container-lowest": "#ffffff",
        "on-surface": "#1a1c1c",
        "on-surface-variant": "#40493f",
        "secondary": "#5c5f5c",
        "secondary-container": "#dee0dc",
        "outline": "#707a6e",
        "outline-variant": "#bfc9bc",
        "inverse-primary": "#87d98f",
        "inverse-surface": "#2f3131",
        "inverse-on-surface": "#f0f1f1",
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      spacing: {
        "container-padding": "64px",
        "gutter": "32px",
        "stack-gap": "24px",
        "asymmetric-offset": "48px",
        "section-gap": "160px",
      },
      fontFamily: {
        "display-lg": ["Playfair Display", "serif"],
        "headline-xl": ["Playfair Display", "serif"],
        "headline-md": ["Playfair Display", "serif"],
        "body-lg": ["Plus Jakarta Sans", "sans-serif"],
        "body-md": ["Plus Jakarta Sans", "sans-serif"],
        "label-bold": ["Plus Jakarta Sans", "sans-serif"],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
