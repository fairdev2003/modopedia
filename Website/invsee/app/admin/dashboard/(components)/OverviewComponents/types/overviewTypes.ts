import { trpc } from "@/app/_trpc/client";

export type userTRPCType = typeof trpc.user.getFirstThreeUsers.useQuery;
export type modsTRPCType = typeof trpc.mods.getFirstThreeMods.useQuery;
export type itemsTRPCType = typeof trpc.items.getFirstThreeItems.useQuery;
