/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    dropShadow: {
      '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
      '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.95)',
          '0 45px 65px rgba(0, 0, 0, 0.95)'
      ]
    },
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
      infoColor: "#404040",
      transparent: "rgba(255,255,255,0)",
      red: "#FF0000",
      black: "#000000", 
    },
    fontFamily: {
      'inriaSans' : ['Inria Sans'],
      'inriaSansItalic' : ['Inria Sans', 'Italic']
    },

     
  },
  plugins: [],
};
