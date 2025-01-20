"use client";

import Image from "next/image";
import { usePersistStore } from "@/stores/persist_store";
import { translations } from "@/utils/translations";
import Steve from "@/assets/steve.png";
import "./mainpage_styles.css";

const MoreComingComponent = () => {
  const { language } = usePersistStore();

  return (
    <div className="flex justify-center bg-blue-700 w-full" id="soon">
      <Image src={Steve} alt="steve" className="scale-[65%]" id="steve" />
      <div className="flex flex-col items-center justify-center gap-0">
        <h1 className="text-4xl text-start font-[700] text-white">
          {
            translations[language]["Mainpage"]["ComingSoonSection"][
              "Hyped for more?"
            ]
          }
        </h1>
        <p className="text-center flex justify-start items-center text-white p-10 w-[500px]">
          {
            translations[language]["Mainpage"]["ComingSoonSection"][
              "ComingSoonDescription"
            ]
          }
        </p>
      </div>
    </div>
  );
};

export default MoreComingComponent;
