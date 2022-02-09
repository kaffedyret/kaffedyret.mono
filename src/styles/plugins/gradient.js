const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addComponents }) {
  addComponents({
    ".gradient-hero": {
      background: "rgb(131,58,180)",
      background:
        "linear-gradient(60deg, rgba(214,0,38,1) 0%, rgba(255,129,37,1) 50%, rgba(255,201,38,1) 100%);",
    },
  });
});
