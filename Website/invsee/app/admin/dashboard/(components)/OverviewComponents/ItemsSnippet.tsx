import { cn } from "@/lib/utils";
import { Item, Mod } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";
import { FaUser } from "react-icons/fa";
import { useDashboardStore } from "../../(stores)/dashboardStore";
import PickaxeIcon from "@/app/admin/workspace/(images)/itemIcon.svg";

const ItemsSnippet = ({ items }: { items: any }) => {
  const { setSelectedDashboardSection } = useDashboardStore();

  const loadingBlur = {
    initial: { opacity: 1 },
    animate: { opacity: [0, 100, 0] },
  };

  const { data } = items;

  return (
    <motion.div
      onClick={() => setSelectedDashboardSection("items")}
      variants={loadingBlur}
      initial="initial"
      animate="initial"
      transition={{ repeat: Infinity, duration: 2 }}
      className={cn(
        items.isLoading
          ? `bg-slate-500/20 blur-lg cursor-pointer text-white p-5 rounded-xl`
          : `bg-slate-500/20 cursor-pointer text-white p-5 rounded-xl`,
      )}
    >
      <div className="flex flex-col justify-start gap-3">
        <div className="flex gap-2 items-center">
          <h1 className="font-bold text-2xl">Items</h1>
        </div>
        <div className="flex flex-col gap-y-3 mt-2">
          {data?.map((item: any) => {
            return (
              <ItemRecord
                image={`https://res.cloudinary.com/dzaslaxhw/image/upload/v1709745445/${item?.mod.tag}/${item.item_tag}.png`}
                mod={item.mod as Mod}
                item_tag={item.item_tag}
                item_name={item.item_name}
              />
            );
          })}
          {items.isLoading &&
            Array.from({ length: 3 }).map((_, index) => {
              return (
                <ItemRecord
                  image="https://res.cloudinary.com/dzaslaxhw/image/upload/v1709757036/users/deafult.avif"
                  mod={{ modName: "Minecraft" } as Mod}
                  item_tag="minecraft:air"
                  item_name="Air"
                />
              );
            })}
        </div>
      </div>
    </motion.div>
  );
};

const ItemRecord = ({
  mod,
  image,
  item_tag,
  item_name,
  children,
}: Pick<Item, "item_tag" | "item_name"> & {
  children?: ReactNode;
} & { mod: Mod; image: string; children?: ReactNode }) => {
  return (
    <div className="flex items-center gap-3 bg-slate-500/20 p-4 rounded-lg">
      {image && (
        <Image alt={`pfp-${item_tag}`} src={image} width={45} height={45} />
      )}
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-md">{item_name}</h1>
        <p className="text-gray-400 text-sm">{mod.modName}</p>
      </div>
      {children}
    </div>
  );
};

export default ItemsSnippet;
