import { config } from "./config";
import sanityClient from "@sanity/client";

export default sanityClient({
  ...config,
  token: process.env.SANITY_API_TOKEN ?? ``,
});
