import createClient from "@sanity/client";
import { config } from "./config";

const sanityClient = createClient({
  ...config,
  token: process.env.SANITY_API_TOKEN ?? ``,
});

export default sanityClient;
