module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      gridTemplateColumns: {
        header: "auto 1fr auto",
      },
      gridTemplateRows: {
        app: "auto 1fr auto",
      },
      screens: {
        xs: "480px",
      },
    },
    fontFamily: {
      heading: ["omnes-cyrillic", "sans-serif"],
      sans: ["sofia-pro-soft", "sans-serif"],
      jumble: ["jumble", "sans-serif"],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("./src/styles/plugins/container"),
    require("./src/styles/plugins/gradient"),
  ],
};
