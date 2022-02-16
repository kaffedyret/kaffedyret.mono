const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addComponents }) {
  addComponents({
    ".grid-template-areas-cart-summary-item": {
      gridTemplateAreas: '"image title action" "image price action"',

      "@screen sm": {
        gridTemplateAreas: '"image title price action"',
      },
    },
  });
});
