import { publicProcedure, protectedProcedure, router } from "../trpc";
import { z } from "zod";
import { db } from "@/prisma/prisma";
import { ModLoadersEnum, ByFilterEnum } from "@/lib/types/mods/modsTypes";

export const modsRouter = router({
  // Get mods without any relations

  getModByQuery: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const data = await db.mod.findMany({
        where: {
          OR: [
            {
              modName: {
                contains: input,
                mode: "insensitive",
              },
            },
            {
              tag: {
                contains: input,
              },
            },
          ],
        },
      });
      return data;
    }),

  getRawMods: publicProcedure.query(async () => {
    const data = await db.mod.findMany();

    const count = await db.mod.count();

    return { data, count };
  }),

  getFirstThreeMods: publicProcedure.query(async () => {
    const data = await db.mod.findMany({
      include: {
        author: true,
      },
      take: 3,
    });

    return data;
  }),

  // get mods with relations
  getMods: publicProcedure.query(async () => {
    const data = await db.mod.findMany({
      include: {
        author: true,
        items: {
          include: {
            author: true,
            gallery: true,
            mod: true,
          },
        },
      },
    });
    const count = await db.mod.count();
    console.log(data);
    return { data, count };
  }),

  // get mod by id
  getFilteredMod: publicProcedure
    .input(
      z.object({
        by: ByFilterEnum,
        value: z.any(),
      }),
    )
    .mutation(async ({ input }) => {
      const by = input.by;
      const value = input.value;

      const data = await db.mod.findFirst({
        where: {
          [by]: value,
        },
        include: {
          items: {
            include: {
              gallery: true,
              author: true,
            },
          },
        },
      });

      return {
        ...data,
        items: data?.items.filter((item) => item.item_tag === value),
      };
    }),

  // get mods by filter
  getFilteredMods: publicProcedure
    .input(
      z.object({
        by: ByFilterEnum,
        value: z.any(),
      }),
    )
    .mutation(async ({ input }) => {
      const by = input.by;
      const value = input.value;

      const data = await db.mod.findMany({
        where: {
          AND: {
            [by]: value,
          },
        },
        include: {
          items: {
            include: {
              author: true,
              gallery: true,
            },
          },
        },
      });

      if (by === "modloaders") {
        const data = await db.mod.findMany({
          where: {
            modloaders: {
              has: value,
            },
          },
          include: {
            items: {
              include: {
                gallery: true,
              },
            },
          },
        });
      }

      return { data };
    }),

  // create a new mod
  createMod: protectedProcedure
    .input(
      z.object({
        modName: z.string(),
        image_src: z.string(),
        modDescription: z.string(),
        tag: z.string(),
        modloaders: z.array(ModLoadersEnum),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { image_src, modDescription, modName, modloaders, tag } = input;

      const create_response = await db.mod.create({
        data: {
          modName,
          image_src,
          modDescription,
          modloaders,
          tag,
          userId: `${ctx.user?.id}`,
        },
      });

      return { status: "OK", response: create_response };
    }),

  // update a mod
  updateMod: protectedProcedure
    .input(
      z.object({
        data: z.object({
          modName: z.string(),
          image_src: z.string(),
          modDescription: z.string(),
          tag: z.string(),
          modloaders: z.array(ModLoadersEnum),
        }),
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { data, id } = input;
      const { image_src, modDescription, modName, modloaders, tag } = data;

      const update_response = await db.mod.update({
        where: {
          id,
        },
        data: {
          modName,
          image_src,
          modDescription,
          modloaders,
          tag,
          userId: `${ctx.user?.id}`,
        },
      });
      return { status: "OK", response: update_response };
    }),

  // delete a mod
  deleteMod: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = input;

      const update_response = await db.mod.delete({
        where: {
          id,
        },
      });

      return { status: "OK", response: update_response };
    }),
});
