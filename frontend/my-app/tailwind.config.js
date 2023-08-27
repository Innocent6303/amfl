/** @type {import('tailwindcss').Config} */
const withMt = require("@material-tailwind/react/utils/withMT");
module.exports = withMt({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPurple: "#d946ef",
        customPink: "#c026d3",
        customBlue:"#818cf8",
        customLight:"#4f46e5",
        customSky:"#7dd3fc",
        customLow:"#0284c7"

      },
    },
  },
  
  plugins: [],
});

