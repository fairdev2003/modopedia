import { trpc } from "@/app/_trpc/client";
import { cn } from "@/lib/utils";
import { Mod, ModLoader } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";
import { FaUser } from "react-icons/fa";
import { useDashboardStore } from "../../(stores)/dashboardStore";
import { modsTRPCType } from "./types/overviewTypes";
import { UseTRPCQueryResult } from "@trpc/react-query/shared";
import { TRPCClientError } from "@trpc/client";

const ModsSnippet = ({ mods }: { mods: any }) => {
  const { setSelectedDashboardSection } = useDashboardStore();

  const loadingBlur = {
    initial: { opacity: 1 },
    animate: { opacity: [0, 100, 0] },
  };

  const { data } = mods;

  return (
    <motion.div
      onClick={() => setSelectedDashboardSection("mods")}
      variants={loadingBlur}
      initial="initial"
      animate="initial"
      transition={{ repeat: Infinity, duration: 2 }}
      className={cn(
        mods.isLoading
          ? `bg-slate-500/20 blur-lg cursor-pointer text-white p-5 rounded-xl`
          : `bg-slate-500/20 cursor-pointer text-white p-5 rounded-xl`,
      )}
    >
      <div className="flex flex-col justify-start gap-3">
        <div className="flex gap-2 items-center">
          <FaUser size={20} />
          <h1 className="font-bold text-2xl">Mods</h1>
        </div>
        <div className="flex flex-col gap-y-3 mt-2">
          {data?.map((mod) => {
            return (
              <ModRecord
                tag={mod.tag}
                image_src={mod.image_src}
                modName={mod.modName}
                author={mod.author.nick}
              />
            );
          })}
          {mods.isLoading &&
            Array.from({ length: 3 }).map((_, index) => {
              return (
                <ModRecord
                  tag={`tag-${index}`}
                  image_src="https://res.cloudinary.com/dzaslaxhw/image/upload/v1709757036/users/deafult.avif"
                  modName="Minecraft"
                  author="Mojang"
                />
              );
            })}
        </div>
      </div>
    </motion.div>
  );
};

const ModRecord = ({
  modName,
  image_src,
  author,
  tag,
  children,
}: Pick<Mod, "image_src" | "modName" | "tag"> & {
  children?: ReactNode;
  author: string;
}) => {
  return (
    <div className="flex items-center gap-3 bg-slate-500/20 p-4 rounded-lg">
      {image_src && (
        <Image alt={`pfp-${tag}`} src={image_src} width={45} height={45} />
      )}
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-md">{modName}</h1>
        <p className="text-gray-400 text-sm">{author}</p>
      </div>
      {children}
    </div>
  );
};

export default ModsSnippet;
