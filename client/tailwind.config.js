/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary: {
          100:"#ebecf8",
          200:"#d1d4ee", 
          300:"#b7bce4", 
          400:"#9da4da", 
          500:"#6974c7", 
          600:"#4f5cbd", 
          700:"#3f4ca9", 
          800:"#36408f", 
          900:"#2c3475"
        },
      }
    },
  },
  plugins: [],
}

