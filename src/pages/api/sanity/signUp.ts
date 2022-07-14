import { signUpHandler } from "next-auth-sanity";
import sanityClient from "~/lib/sanity/sanityClient";

// @ts-ignore
export default signUpHandler(sanityClient);
