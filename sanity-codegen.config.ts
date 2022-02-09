import { SanityCodegenConfig } from "sanity-codegen";

const config: SanityCodegenConfig = {
  schemaPath: "./studio/schemas/schema.js",
  outputPath: "./src/models/schema.sanity.ts",
};

export default config;
