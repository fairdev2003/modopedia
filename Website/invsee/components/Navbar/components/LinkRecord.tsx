import { Item } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface LinkRecordProps {
  link: any;
  index: number;
}

const LinkRecord = ({ link, index }: LinkRecordProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-gray-700 flex gap-5 m-2 rounded-lg w-[97%] p-4 cursor-pointer"
      onClick={() => (window.location.href = link.url)}
    >
      <p className="text-blue-500 font-semibold">{link.name}</p>
    </motion.div>
  );
};

export default LinkRecord;
