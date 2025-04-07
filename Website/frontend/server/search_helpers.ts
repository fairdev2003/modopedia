"use server";
import { db } from "@/prisma/prisma";

const searchForItems = async (query: string) => {
  return {
    items: await db.item.findMany({
      include: {
        mod: true,
      },
      where: {
        OR: [
          {
            item_name: {
              contains: query,
              mode: "insensitive",
            },
          },

          {
            item_tag: {
              contains: query,
            },
          },
          {
            mod: {
              modName: {
                contains: query,
              },
            },
          },
          {
            mod: {
              tag: {
                contains: query,
              },
            },
          },
        ],
      },
    }),
  };
};

const searchForMods = async (query: string) => {
  return {
    mods: await db.mod.findMany({
      where: {
        OR: [
          {
            modName: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            tag: {
              contains: query,
            },
          },
        ],
      },
    }),
  };
};

export { searchForItems, searchForMods };
