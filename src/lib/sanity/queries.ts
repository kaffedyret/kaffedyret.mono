export const productsQuery = `*[_type == "product"] | order(order asc) {
  _id,
  title,
  slug,
  stripeProductId,
  available,
  defaultProductVariant,
  variants,
  blurb,
}`;

export const productQuery = `*[_type == "product" && slug.current == $slug] | order(order asc) {
  _id,
  title,
  slug,
  stripeProductId,
  available,
  defaultProductVariant,
  variants,
  blurb,
  body
}`;

export const employeesQuery = `*[_type == "employee"] | order(order asc) {
  _id,
  name,
  title,
  email,
  description,
  image,
}`;

export const orderStatusesQuery = `*[_type == "orderStatus"] | order(order asc) {
  _id,
  name,
}`;
