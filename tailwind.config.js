/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  plugins: [
    require("@tailwindcss/typography"),
    // ... other plugins
  ],
  theme: {
    extend: {
      colors: {
        "light-blue": "#4cb5f9",
        "dark-blue": "#0095f6",
      },
      fontSize: {
        xxs: ".55rem",
      },
      fontFamily: {
        sans: [
          "Roboto",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
      maxWidth: {
        custom: "600px",
        "user-profile": "1000px",
        "post-detail": "600px",
      },
      maxHeight: {
        custom: "600px",
        "post-detail": "600px",
      },
      width: {
        "user-profile": "800px",
        "post-detail": "600px",
      },
      height: {
        "post-detail": "600px",
        "user-profile": "800px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("tailwind-scrollbar-hide")],
};
