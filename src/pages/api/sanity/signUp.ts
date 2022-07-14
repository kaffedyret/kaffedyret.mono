import { signUpHandler } from "next-auth-sanity";
import sanityClient from "~/lib/sanity/sanityClient";

export default signUpHandler(sanityClient);
