import { Item } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
interface ItemRecordProps {
  item: any;
  index: number;
}

const ItemRecord = ({ item, index }: ItemRecordProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -20 }}
      id="item"
      className="bg-gray-700 flex gap-5 m-2 rounded-lg w-[97%] p-4"
    >
      <div>
        <Image
          alt={`search-result-${index}`}
          src={`https://res.cloudinary.com/dzaslaxhw/image/upload/v1709745445/${item.mod.tag}/${item.item_tag}.png`}
          width={75}
          height={75}
        ></Image>
      </div>
      <div>
        <p className="text-white font-semibold">
          {item.item_name} {">"}{" "}
          <span className="text-sm text-gray-400">{item.type}</span>
        </p>
        <p className="text-blue-300 text-sm font-semibold">
          {item.mod.modName}
        </p>
        <p className="mt-1 font-semibold">
          {item.material_value === 0 ? (
            ""
          ) : (
            <span className="text-yellow-500">
              EMC
              <span className="text-white">
                :{" "}
                {new Intl.NumberFormat("de-DE")
                  .format(item.material_value)
                  .replace(".", ",")
                  .replace(".", ",")}
              </span>
            </span>
          )}
        </p>
      </div>
    </motion.div>
  );
};

export default ItemRecord;
