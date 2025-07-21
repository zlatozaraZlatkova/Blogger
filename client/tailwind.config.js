/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
      },
      colors: {
        light: "#F9F9F9",
        blue: {
          DEFAULT: "#3C91E6",
          100: "#CFE8FF",
        },
        grey: "#eee",
        "dark-grey": "#AAAAAA",
        dark: "#342E37",
        red: {
          DEFAULT: "#DB504A",
        },
        yellow: {
          DEFAULT: "#FFCE26",
          100: "#FFF2C6",
        },
        orange: {
          DEFAULT: "#FD7238",
          100: "#FFE0D3",
        },
      },
    },
    
  },
  plugins: [],
}

