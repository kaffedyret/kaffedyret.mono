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

export const ordersQuery = `*[_type == "order"] | order(order asc) {
  sessionId,
  customerId,
  customerName,
  customerEmail,
  shipping,
  "status": *[_type=='orderStatus' && _id==^.status._ref][0]{ name },
  amountSubtotal,
  amountTotal,
  orderDatetime,
  lineItems
}`;

export const orderStatusesQuery = `*[_type == "orderStatus"] | order(order asc) {
  _id,
  name,
}`;
