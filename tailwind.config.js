/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      DADEE3: "#DADEE3",
      DA1414: "#DA1414",
      white: "white",
      red: "red",
      black: "black",
      gray: "#858C94",
      "blue": "rgb(29, 144, 237)"
    }
  },
  plugins: [],
}
