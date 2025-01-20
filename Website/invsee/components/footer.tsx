"use client";

import { usePersistStore } from "@/stores/persist_store";
import { translations } from "@/utils/translations";
import { motion } from "framer-motion";

const Footer = () => {
  const { language } = usePersistStore();

  return (
    <footer className="bg-blue-600 w-full" id="soon">
      <div className="text-white p-12 flex justify-center">
        <div className="w-1/3 font-bold text-xl flex flex-col justify-center items-center text-start">
          <motion.div
            whileHover={{ width: 500, height: 100 }}
            className="flex cursor-pointer bg-white justify-center w-40 rounded-lg h-10 items-center"
          >
            <p className="text-blue-700">Modopedia</p>
          </motion.div>
        </div>
        <div className="w-1/3 flex flex-col gap-1 justify-center items-center text-start">
          {translations[language]["Mainpage"]["Footer"]["FirstColumn"].map(
            (item: string, index: number) => {
              return (
                <p
                  className="hover:font-bold hover:text-underline cursor-pointer"
                  key={index}
                >
                  {item}
                </p>
              );
            },
          )}
        </div>
        <div className="w-1/3 flex flex-col gap-1 justify-center items-center text-start">
          {translations[language]["Mainpage"]["Footer"]["SecondColumn"].map(
            (item: string, index: number) => {
              return (
                <p
                  className="hover:font-bold hover:text-underline cursor-pointer"
                  key={index}
                >
                  {item}
                </p>
              );
            },
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
