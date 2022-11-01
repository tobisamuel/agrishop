/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        note: "url('/assets/1.png')",
      },
      fontFamily: {
        cards: ["Dancing Script"],
      },
    },
  },
  plugins: [],
};
