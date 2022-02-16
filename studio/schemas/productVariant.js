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
      name: "stripePriceId",
      title: "Stripe Price ID",
      type: "string",
      codegen: { required: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      codegen: { required: true },
      validation: (Rule) => Rule.required(),
    },
  ],
};
