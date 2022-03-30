const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addComponents }) {
  addComponents({
    ".grid-template-areas-cart-summary-item": {
      gridTemplateAreas:
        '"image title title action" "image amount price action"',
      gridTemplateColumns: "auto 1fr 1fr auto",

      "@screen sm": {
        gridTemplateAreas: '"image title amount price action"',
        gridTemplateColumns: "3.5rem 1fr auto auto 3rem",
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
