/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      primary: "#FFB563",
      primaryDark: "#F85E00",
      primaryLight: "#FFD29D",
      secondaryLight: "#918450",
      secondaryDark: "#A41623", 
      black: "#000000",
      white: "#FFFFFF",
    },
  },
  plugins: [],
}