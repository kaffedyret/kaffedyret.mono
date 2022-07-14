import { DeepOmit } from "src/types/DeepOmit";
import { Order as SanityOrder, OrderStatus } from "./schema.sanity";

export type SessionOrder = DeepOmit<
  SanityOrder,
  "_createdAt" | "_updatedAt" | "_rev" | "_type"
> & { _type: "order" };

export type Order = DeepOmit<SanityOrder, "status"> & { status: OrderStatus };
