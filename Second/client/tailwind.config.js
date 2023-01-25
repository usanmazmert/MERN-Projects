/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundColor:{
        primary: "#003580",
      },
      text:{
        primary: "#003580",
      },
      h:{
        "7.5": "30px"
      }
    },
  },
  plugins: [],
}
