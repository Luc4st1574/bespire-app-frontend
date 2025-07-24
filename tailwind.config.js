/**  {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';

module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            // Referencia las variables CSS que definiste en globals.css
            "brand-dark": "var(--color-brand-dark)",
            "brand-neon": "var(--color-brand-neon)",
            "brand-pale": "var(--color-brand-pale)",
            "brand-light": "var(--color-brand-light)",
            "brand-green-light": "var(--color-brand-green-light)",
            "brand-footer": "var(--color-brand-footer)",
            "brand-blue": "var(--color-brand-blue)",
            "brand-yellow": "var(--color-brand-yellow)",
            "brand-red": "var(--color-brand-red)",
            "brand-orange": "var(--color-brand-orange)",
            "brand-dark-blue": "var(--color-brand-dark-blue)",
            "primary-green": "#CEFFA3",
            "dark-green": "#697d67",
            "light-black": "#1B1B1B",
          },
      safelist: [
        "top-[200px]",
        "top-[30px]",
        "left-[30px]",
        "right-0",
        "rotate-0",
        "top-[220px]",
        "top-[140px]",
        "top-[150px]", // todos los que uses dinámicamente
      ],

      fontFamily: {
        sans: ["GeneralSans-Variable", "sans-serif"],
      },
      borderRadius: {
        hg: "25px",
      },
    },
  },
  plugins: [
    forms,
  ],
};
