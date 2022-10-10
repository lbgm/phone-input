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
      primary: "#006A52",
      "primary-light": "#EDF9F0",
      "danger-light": "#FEEFEF",
      DADEE3: "#DADEE3",
      white: "white",
      red: "red",
      black: "black",
      danger: "#DA1414",
      gray: "#858C94",
      DA1414: "#DA1414",
      394452: "#394452",
      '3dark-1': "rgba(51, 51, 51, 0.1)",
      '3dark-2': "rgba(51, 51, 51, 0.2)",
      '3dark': "rgba(51, 51, 51, 0.5)",
      "blue-20": "rgba(29, 144, 237, 0.2)",
      "blue-30": "rgba(29, 144, 237, 0.3)",
      "blue-50": "rgba(29, 144, 237, 0.5)",
      "blue": "rgb(29, 144, 237)"
    },
  },
  plugins: [],
}
