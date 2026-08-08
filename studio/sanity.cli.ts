import { defineCliConfig } from "sanity/cli";

/**
 * CLI config for `sanity dev` / `sanity build` / `sanity deploy`.
 * Project and dataset come from the environment so the same package can target
 * a staging dataset without editing tracked files (see .env.example).
 */
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "ej04dib0",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
});
