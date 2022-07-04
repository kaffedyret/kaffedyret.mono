import React from "react";

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
      customerName: "customerName",
      statusName: "status.name",
      orderDatetime: "orderDatetime",
    },
    prepare({ customerName, statusName, orderDatetime }) {
      const orderDate = new Date(orderDatetime);
      let statusStyling = {};

      switch (statusName) {
        case "Ordered":
          statusStyling = {
            backgroundColor: "rgb(254, 226, 226)",
            color: "#000",
            fontSize: "2rem",
            icon: "⏱",
          };
          break;
        case "Fulfilled":
          statusStyling = {
            backgroundColor: "rgb(132 204 22)",
            color: "#000",
            fontSize: "1.5rem",
            icon: "✓",
          };
          break;
        default: {
          statusStyling = {
            backgroundColor: "rgb(59 130 246)",
            color: "#fff",
            fontSize: "1.5rem",
            icon: "☕️",
          };
          break;
        }
      }

      const { icon, ...styling } = statusStyling;

      return {
        title: `${customerName}`,
        subtitle: `${orderDate.toLocaleDateString()}: ${statusName}`,
        media: (
          <span
            style={{
              ...styling,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </span>
        ),
      };
    },
  },
};
