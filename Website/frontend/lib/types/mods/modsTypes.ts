import { z } from "zod";

export const ModLoadersEnum = z.enum(["FORGE", "FABRIC", "NEOFORGE", "QUILT"]);

export const ByFilterEnum = z.enum([
  "tag",
  "userId",
  "modName",
  "id",
  "modloaders",
]);
