import { db } from "@/prisma/prisma";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { z } from "zod";
import { searchForItems, searchForMods } from "../search_helpers";

const websiteroute = [
  {
    id: 1,
    name: "Workspace",
    url: "/admin/workspace",
    description:
      "The workspace is where you can manage your items, mods, and other data.",
  },
  {
    id: 1,
    name: "Home",
    url: "/",
    description: "",
  },
];

export const searchRouter = router({
  searchEverything: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      console.profile("api");

      if (input.startsWith("@")) {
        return searchItemWithMod(input);
      }
      if (input.startsWith("#")) {
        return searchItemsWithType(input);
      }
      if (
        input.startsWith(">") ||
        input.startsWith("<") ||
        input.startsWith("=") ||
        input.startsWith("emc")
      ) {
        return searchItemWithEMC(input);
      }

      if (!input) {
        return { items: [], mods: [], links: [] };
      }

      const items = await searchForItems(input);
      const mods = await searchForMods(input);

      console.log(items.items);

      console.profileEnd();
      return { items: items.items, mods: mods.mods };
    }),
});

const searchItemWithMod = async (input: string) => {
  const type = input.split(" ")[0].slice(1);
  const item = input.split(type + " ")[1];

  const items = await db.item.findMany({
    include: {
      mod: true,
    },
    where: {
      mod: {
        tag: {
          contains: type,
          mode: "insensitive",
        },
      },
      item_name: {
        contains: item,
        mode: "insensitive",
      },
    },
  });

  return {
    items: items,
    mods: [],
    links: websiteroute.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase()),
    ),
  };
};

const searchItemsWithType = async (input: string) => {
  const type = input.split(" ")[0].slice(1);
  const item = input.split(" ")[1];

  const items = await db.item.findMany({
    include: {
      mod: true,
    },
    where: {
      type: {
        contains: type,
        mode: "insensitive",
      },
      item_name: {
        contains: item,
        mode: "insensitive",
      },
    },
  });

  return {
    items: items,
    mods: [],
    links: websiteroute.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase()),
    ),
  };
};

const searchItemWithEMC = async (input: string) => {
  if (input.startsWith(">")) {
    const emc = input.slice(1);
    const items = await db.item.findMany({
      include: {
        mod: true,
      },
      where: {
        material_value: {
          gt: parseInt(emc),
        },
      },
      orderBy: {
        material_value: "asc",
      },
    });

    return {
      items: items,
      mods: [],
      links: [],
    };
  }
  if (input.startsWith("<")) {
    const emc = input.slice(1);
    const items = await db.item.findMany({
      include: {
        mod: true,
      },
      where: {
        material_value: {
          lt: parseInt(emc),
          gt: 0,
        },
      },
      orderBy: {
        material_value: "desc",
      },
    });

    return {
      items: items,
      mods: [],
      links: [],
    };
  }
  if (input.startsWith("=")) {
    const emc = input.slice(1);
    const items = await db.item.findMany({
      include: {
        mod: true,
      },
      where: {
        material_value: parseInt(emc),
      },
      orderBy: {
        material_value: "asc",
      },
    });

    return {
      items: items,
      mods: [],
      links: [],
    };
  }
  if (input.startsWith("emc")) {
    const emc = input.slice(3);
    const items = await db.item.findMany({
      include: {
        mod: true,
      },
      where: {
        material_value: {
          gt: 0,
        },
      },
      orderBy: {
        material_value: "asc",
      },
    });

    return {
      items: items,
      mods: [],
      links: [],
    };
  }
};
