import { createTRPCReact } from "@trpc/react-query";
import { createContext } from "@/server/trpc";

import { appRouter, type AppRouter } from "@/server";
import { createNextApiHandler } from "@trpc/server/adapters/next";

export const trpc = createTRPCReact<AppRouter>();
