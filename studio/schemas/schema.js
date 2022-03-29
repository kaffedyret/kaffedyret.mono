import schemaTypes from "all:part:@sanity/base/schema-type";
import createSchema from "part:@sanity/base/schema-creator";
import blockContent from "./blockContent";
import category from "./category";
import employee from "./employee";
import localeBlockContent from "./locale/BlockContent";
import localeString from "./locale/String";
import localeText from "./locale/Text";
import product from "./product";
import productVariant from "./productVariant";
import vendor from "./vendor";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    blockContent,
    category,
    employee,
    localeBlockContent,
    localeString,
    localeText,
    product,
    productVariant,
    vendor,
  ]),
});
