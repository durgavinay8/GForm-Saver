/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5F43AB",
        background: "#F5F5F5",
        textcolor: "#3C4341",
        cta: "#EB4616",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        pompiere: ["Pompiere", "Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
