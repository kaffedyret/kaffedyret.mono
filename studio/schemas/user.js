export default {
  name: "user",
  title: "User",
  type: "document",
  fields: [
    {
      name: "admin",
      title: "Admin",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "name",
      title: "Navn",
      type: "string",
    },
    {
      name: "email",
      title: "E-post",
      type: "string",
    },
    {
      name: "image",
      title: "Bilde",
      type: "url",
    },
    {
      name: "password",
      title: "Passord",
      type: "string",
      // hidden: true,
    },
  ],
};
