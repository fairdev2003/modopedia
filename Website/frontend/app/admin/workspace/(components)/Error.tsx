import "../(components)/externalcss/loader.css";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useWorkspaceStore } from "../stores/workspaceBroswerData";
import { CgDanger } from "react-icons/cg";

interface ErrorProps {
  message: string;
  description: string;
}

const Error = ({ message, description }: ErrorProps) => {
  const { setErrorState } = useWorkspaceStore();

  return (
    <div
      key={1}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
      onClick={() => {
        setErrorState(false);
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-white bg-gray-800 p-10 rounded-lg flex flex-col justify-center"
      >
        <div className="flex justify-center items-center flex-col gap-2">
          <CgDanger size={50} />
          <h1 className="text-2xl font-semibold">{message}</h1>
          <p className="text-md text-center font-normal">{description}</p>
        </div>

        <button
          onClick={() => {
            setErrorState(false);
          }}
          className="bg-blue-600 text-white hover:text-black transition-colors hover:bg-white mt-3 h-[50px] rounded-xl"
        >
          Understand
        </button>
      </motion.div>
    </div>
  );
};

export default Error;
