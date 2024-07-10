import { ZodOpenApiObject } from "zod-openapi";

import { LinkSchema } from "@/lib/zod/schemas/links";
import { TagSchema } from "@/lib/zod/schemas/tags";
import { WorkspaceSchema } from "@/lib/zod/schemas/workspaces";
import { API_DOMAIN } from "@dub/utils";
import { analyticsPaths } from "./analytics";
import { linksPaths } from "./links";
import { qrCodePaths } from "./qr";
import { tagsPaths } from "./tags";
import { workspacesPaths } from "./workspaces";

export const openApiObject: ZodOpenApiObject = {
  openapi: "3.0.3",
  info: {
    title: "AffEasy API",
    description:
      "AffEasy is an affiliate marketing platform for modern marketers.",
    version: "0.0.1",
    contact: {
      name: "AffEasy Support",
      email: "support@affeasy.link",
      url: "https://affeasy.link/api",
    },
    license: {
      name: "AGPL-3.0 license",
      url: "https://github.com/dubinc/dub/blob/main/LICENSE.md",
    },
  },
  servers: [
    {
      url: API_DOMAIN,
      description: "Production API",
    },
  ],
  paths: {
    ...linksPaths,
    ...qrCodePaths,
    ...analyticsPaths,
    ...workspacesPaths,
    ...tagsPaths,
  },
  components: {
    schemas: {
      LinkSchema,
      WorkspaceSchema,
      TagSchema,
    },
    securitySchemes: {
      bearerToken: {
        type: "http",
        description: "Default authentication mechanism",
        scheme: "bearer",
      },
    },
  },
};
