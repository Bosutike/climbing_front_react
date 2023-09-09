/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    borderRadius: {
      none: "0",
      sm: "0.2rem",
      DEFAULT: "0.25rem",
      DEFAULT: "4px",
      md: "0.5rem",
      lg: "1rem",
      full: "9999px",
      large: "12px",
    },
  },
  plugins: [] /*[require("tw-elements/dist/plugin")]*/ ,
}