/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['"Bebas Neue"', "sans-serif"],
        Karla: ['"Karla"', "sans-serif"],
        Robot: ['"Roboto"', " sans-serif"],
        oldStandard: ['"Old Standard TT"', "serif"],
      },
      colors: {
        customGreen: "#181C14",
        customBalck: "#151515",
      },
    },
  },
  plugins: [],
};
