import { Item } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaFile } from "react-icons/fa";

interface WorkspaceRecordProps {
  workspace: any;
  index: number;
}

const WorkspaceRecord = ({ workspace, index }: WorkspaceRecordProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-gray-700 flex gap-5 m-2 rounded-lg w-[97%] p-4"
    >
      <div>
        <FaFile className="text-white" width={75} height={75} />
      </div>
      <div>
        <p className="text-white font-semibold">{workspace.workspaceName}</p>
      </div>
    </motion.div>
  );
};

export default WorkspaceRecord;
