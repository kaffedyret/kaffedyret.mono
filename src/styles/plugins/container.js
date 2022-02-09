const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addComponents }) {
  addComponents({
    ".container-narrow": {
      marginRight: "auto",
      marginLeft: "auto",
      maxWidth: "100%",
      padding: "1rem",

      "@screen sm": {
        maxWidth: "640px",
      },
      "@screen md": {
        maxWidth: "768px",
      },
      "@screen lg": {
        maxWidth: "1024px",
      },
    },
  });
});
