import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server";
import { createContext } from "@/server/trpc";
import { NextRequest } from "next/server";
import { NextApiRequest } from "next";

const handler = async (req: NextRequest, reqapi: NextApiRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async () => await createContext(req),
  });

export { handler as GET, handler as POST };
