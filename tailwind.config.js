/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "system-menu-blue": "#15192F",
        "system-menu-light-blue": "#7AB0CE",
        "system-section-white": "#F7F7F7",
        "system-label-blue": "#3085C3",
        "button-color": "0730BE"

      }
    },
  },
  plugins: [],
}

