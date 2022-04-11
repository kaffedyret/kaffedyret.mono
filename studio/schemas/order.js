export default {
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    {
      name: "sessionId",
      title: "Session ID",
      type: "string",
      codegen: { required: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "customerId",
      title: "Customer ID",
      type: "string",
    },
    {
      name: "customerName",
      title: "Customer name",
      type: "string",
    },
    {
      name: "customerEmail",
      title: "Customer email",
      type: "string",
    },
    {
      name: "shipping",
      title: "Shipping",
      type: "object",
      fields: [
        { name: "name", type: "string", title: "Name" },
        {
          name: "shippingRate",
          title: "Shipping rate",
          type: "object",
          fields: [
            {
              name: "id",
              title: "Shipping rate ID",
              type: "string",
            },
            {
              name: "displayName",
              title: "Display name",
              type: "string",
            },
          ],
          codegen: { required: true },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "address",
          title: "Address",
          type: "object",
          fields: [
            {
              name: "line1",
              title: "Address line 1",
              type: "string",
            },
            { name: "line2", title: "Address line 2", type: "string" },
            {
              name: "postalCode",
              title: "Postal code",
              type: "string",
            },
            {
              name: "city",
              title: "City",
              type: "string",
            },
            { name: "state", title: "State", type: "string" },
            {
              name: "country",
              title: "Country",
              type: "string",
            },
          ],
        },
      ],
      codegen: { required: true },
      validation: (Rule) => Rule.required(),
    },

    {
      name: "status",
      title: "Status",
      type: "reference",
      to: { type: "orderStatus" },
      codegen: { required: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "amountSubtotal",
      title: "Amount subtotal",
      type: "number",
      codegen: { required: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "amountTotal",
      title: "Amount total",
      type: "number",
      codegen: { required: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "orderDatetime",
      title: "Order datetime",
      type: "datetime",
      codegen: { required: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "lineItems",
      title: "Line items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "description", title: "Description", type: "string" },
            { name: "id", title: "Stripe ID", type: "string" },
            { name: "amountTotal", title: "Amount total", type: "number" },
            { name: "quantity", title: "Quantity", type: "number" },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "customerName",
    },
  },
};
