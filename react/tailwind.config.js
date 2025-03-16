/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      geist: ["Geist", "sans-serif"],
    },
    extend: {
      colors: {
        textBlack: "#2D2727",
        textGray: "#737373",
        bgColor: "#e4e4e7",
        primaryColor: "#3155FF",
      },
    },
  },
  plugins: [],
};
