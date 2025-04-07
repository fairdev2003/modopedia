import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "stdout",
      level: "error",
    },
    {
      emit: "stdout",
      level: "info",
    },
    {
      emit: "stdout",
      level: "warn",
    },
  ],
});

prisma.$on("query", ({ duration, query, params }) => {
  console.log("Logs: ");
  console.log({
    duration,
    query,
    params,
  });
});

const db = globalForPrisma.prisma ?? prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export { db };
