/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      main: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        primary: {
          green: "#7AC74F", // buttons
          "green-hover": "#67A83E",
          orange: "#FFB74D", // call to actions, icons, buttons...
          "orange-hover": "#E69A30",
        },
        secondary: {
          cream: "#FDF3E7",
          blue: "#4F83CC", // Good for links and text accents
        },
        accent: {
          red: "#FF6347",
          "red-hover": "#E65239",
          yellow: "#FFEB3B",
          "yellow-hover": "#E4C92F",
        },
        text: {
          darkSlate: "#2C3E50",
          charcoalGray: "#37474F",
        },
      },
    },
  },
  plugins: [],
};
