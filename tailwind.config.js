/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        brandColor: "#718355",
        secondaryColor: "#e9f5db",
      },
      width: {
        100: "650px",
      },
      borderRadius: {
        xl: "50%",
      },
      fontFamily: {
        cormorant: ["Cormorant", "serif"],
      },
      animation: {
        "move-forever":
          "move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite",
      },
      keyframes: {
        "move-forever": {
          "0%": {
            transform: "translate3d(-90px, 0, 0)",
          },
          "100%": {
            transform: "translate3d(85px, 0, 0)",
          },
        },
      },
    },
  },
  plugins: [],
};
