import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { connectMongo } from "@/app/api/mongo/mongo";

export const logRouter = router({
  getAllLogs: publicProcedure.query(async () => {
    const client = await connectMongo();
    const db = client.db("test");
    const collection = await db
      .collection("logs")
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "nick",
            as: "user_info",
          },
        },
      ])
      .toArray();

    console.log("mutation: ", collection.user_info);

    return collection;
  }),

  addLog: publicProcedure
    .input(z.object({ action: z.string(), user: z.string() }))
    .mutation(async (input) => {
      const { action, user } = input.input;
      const date = new Date().toString();

      const client = await connectMongo();
      const db = client.db("test");
      const collection = db
        .collection("logs")
        .insertOne({ action, user, date });
      return collection;
    }),
});
