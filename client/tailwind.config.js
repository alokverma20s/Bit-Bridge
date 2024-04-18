/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary: {
          1:"#B0A4FA",
          2: "#B0A4C8",
          3:"#B064FF"
        },
      }
    },
  },
  plugins: [],
}

