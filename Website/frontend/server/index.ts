import { protectedProcedure, publicProcedure, router } from "./trpc";
import { z } from "zod";
import { connectMongo } from "@/app/api/mongo/mongo";
import { userRouter } from "./routes/user";
import { logRouter } from "./routes/actionLog";
import { itemsRouter } from "./routes/items";
import { db } from "@/prisma/prisma";
import { modsRouter } from "./routes/mods";
import { searchRouter } from "./routes/search";

export const appRouter = router({
  getOverviewStats: publicProcedure.query(async () => {
    const client = await connectMongo();
    const db = client.db("test");
    const items = await db.collection("items").find().count();
    const users = await db.collection("users").find().count();
    const logs = await db.collection("logs").find().count();
    const mods = await db.collection("mods").find().count();
    const crafting = await db.collection("crafting").find().count();
    const music = await db.collection("musicdatas").find().count();
    const wiki_pages = 134;
    const tags = 40;
    const stats = {
      items,
      users,
      logs,
      mods,
      wiki_pages,
      tags,
      music,
      crafting,
    };
    console.log("Count", stats);
    return stats;
  }),
  getTraffic: protectedProcedure.query(async ({ ctx }) => {
    const data = await db.traffic.findMany({
      include: {
        user: true,
      },
    });
    return data.slice(data.length - 5, data.length);
  }),
  makeFakeTraffic: publicProcedure.query(async ({ ctx }) => {
    const date = new Date().toTimeString();

    const data = await db.traffic.create({
      data: {
        code: 501,
        code_message: "SERVER ERROR",
        geo: "Cracov",
        ip: "12.21.21.121",
        createdAt: date,
      },
    });
  }),
  getUsers: publicProcedure.query(async () => {
    const client = await connectMongo();
    const db = client.db("test");
    const collection = await db
      .collection("users")
      .find({}, { projection: { _id: 0 } })
      .toArray();

    return collection;
  }),
  getDate: publicProcedure
    .input(z.object({ name: z.string(), id: z.number() }))
    .mutation(async (input) => {
      const { name, id } = input.input;
      console.log(name.substring(0, 24), id);
      return input;
    }),

  user: userRouter,
  log: logRouter,
  items: itemsRouter,
  mods: modsRouter,
  search: searchRouter,
});

export type AppRouter = typeof appRouter;
