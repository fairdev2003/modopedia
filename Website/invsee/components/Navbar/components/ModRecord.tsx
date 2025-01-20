import { Item } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";

interface ModRecordProps {
  mod: any;
  index: number;
}

const ModRecord = ({ mod, index }: ModRecordProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-gray-700 flex gap-5 m-2 rounded-lg w-[97%] p-4"
    >
      <div>
        <Image
          alt={`search-result-${index}`}
          src={mod.image_src}
          width={75}
          height={75}
        ></Image>
      </div>
      <div>
        <p className="text-white font-semibold">{mod.modName}</p>
        <code className="text-blue-300">{mod.tag}</code>
        <p className="mt-1 font-semibold flex gap-2">
          {mod.modloaders.map((modloader: any) => {
            return (
              <span
                key={modloader.id}
                className="text-white text-sm font-semibold"
              >
                {modloader}
              </span>
            );
          })}
        </p>
      </div>
    </motion.div>
  );
};

export default ModRecord;
