import { PortableText } from "@portabletext/react";
import { BlockContent } from "~/models/schema.sanity";

type Props = {
  children: BlockContent;
};

export const TextBlock = ({ children }: Props) => (
  <PortableText value={children} />
);
