const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addComponents }) {
  addComponents({
    ".grid-template-areas-cart-summary-item": {
      gridTemplateAreas:
        '"image title title action" "image amount price action"',

      "@screen sm": {
        gridTemplateAreas: '"image title amount price action"',
      },
    },
    ".grid-template-areas-order-summary-item": {
      gridTemplateAreas: '"title title" "amount price"',
      gridTemplateColumns: "1fr auto",

      "@screen sm": {
        gridTemplateAreas: '"title amount price"',
        gridTemplateColumns: "1fr auto auto",
      },
    },
  });
});
