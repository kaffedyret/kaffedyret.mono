import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "./sanityClient";

const builder = imageUrlBuilder(sanityClient);
export default (source: any): any => builder.image(source);
