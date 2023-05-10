/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    dropShadow: {
      "3xl": "0 35px 35px rgba(0, 0, 0, 0.25)",
      "4xl": [
        "0 35px 35px rgba(0, 0, 0, 0.95)",
        "0 45px 65px rgba(0, 0, 0, 0.95)",
      ],
    },
    extend: {
      spacing: {
        144: "36rem",
      },
      keyframes: {
        glowLike: {
          "0%, 100%": { boxShadow: "0 0 10px -10px #918450" },
          "50%": { boxShadow: "0 0 10px 10px #918450" },
        },
        glowDislike: {
          "0%, 100%": { boxShadow: "0 0 10px -2px #A41623" },
          "50%": { boxShadow: "0 0 10px 2px #A41623" },
        },
      },
      animation: {
        glowLike: "glowLike 1s ease-in-out infinite",
        glowDislike: "glowDislike 1s ease-in-out infinite",
      },
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
      inriaSans: ["Inria Sans"],
      inriaSansItalic: ["Inria Sans", "Italic"],
    },
  },
  plugins: [],
};
