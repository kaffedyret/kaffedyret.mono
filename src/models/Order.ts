import { DeepOmit } from "src/types/DeepOmit";
import { Order as SanityOrder } from "./schema.sanity";

export type Order = DeepOmit<
  SanityOrder,
  "_createdAt" | "_updatedAt" | "_rev" | "_type"
> & { _type: "order" };
