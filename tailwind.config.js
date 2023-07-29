/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#165FC5",
        secondary: "#D1E2FA",
        accent: "#196EE6",
        black: "#010205",
        lightGray: "#D8E4F3",
        darkGray: "#ADB6C3",
      },
    },
  },
  plugins: [],
};
