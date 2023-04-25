/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        '144': '36rem',
      }
    },
    colors: {
      primary: "#FFB563",
      primaryDark: "#F85E00",
      primaryLight: "#FFD29D",
      secondaryLight: "#918450",
      secondaryDark: "#A41623",
      white: "#FFFFFF",
      gray: "#808080",
      infoColor: "#FFECCC",
      transparent: "rgba(255,255,255,0)"
    },
    fontFamily: {
      'inriaSans' : ['Inria Sans'],
      'inriaSansItalic' : ['Inria Sans', 'Italic']
    },
  },
  plugins: [],
};
