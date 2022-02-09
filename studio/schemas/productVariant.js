export default {
  title: "Product variant",
  name: "productVariant",
  type: "object",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      codegen: { required: true },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Weight in grams",
      name: "grams",
      type: "number",
    },
    {
      title: "Price",
      name: "price",
      type: "number",
      codegen: { required: true },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "SKU",
      name: "sku",
      type: "string",
      codegen: { required: true },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Taxable",
      name: "taxable",
      type: "boolean",
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
      codegen: { required: true },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Bar code",
      name: "barcode",
      type: "barcode",
    },
  ],
};
