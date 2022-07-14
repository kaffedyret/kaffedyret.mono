import schemaTypes from "all:part:@sanity/base/schema-type";
import { account, verificationToken } from "next-auth-sanity/schemas";
import createSchema from "part:@sanity/base/schema-creator";
import blockContent from "./blockContent";
import category from "./category";
import employee from "./employee";
import localeBlockContent from "./locale/BlockContent";
import localeString from "./locale/String";
import localeText from "./locale/Text";
import order from "./order";
import orderStatus from "./orderStatus";
import product from "./product";
import productVariant from "./productVariant";
import user from "./user";
import vendor from "./vendor";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    account,
    blockContent,
    category,
    employee,
    localeBlockContent,
    localeString,
    localeText,
    order,
    orderStatus,
    product,
    productVariant,
    user,
    vendor,
    verificationToken,
  ]),
});
