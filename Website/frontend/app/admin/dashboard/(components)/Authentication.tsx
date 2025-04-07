import "../(components)/externalcss/loader.css";
import { easeIn, motion, useAnimate } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

type AuthenticationProps = {
  loading?: boolean;
};

const Authentication = ({ loading }: AuthenticationProps) => {
  return (
    <>
      {loading && (
        <div
          key={1}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 flex-col gap-5"
        >
          <h1 className="text-4xl text-white font-bold">Authentication</h1>
          <div className="flex justify-center p-10 w-full h-[400px]">
            <div id="loader" />
          </div>
        </div>
      )}
    </>
  );
};

export default Authentication;
