"use client";

import Image from "next/image";
import Fair from "@/assets/me.jpg";

import { usePersistStore } from "@/stores/persist_store";
import { translations } from "@/utils/translations";

const AboutMeSection = () => {
  const { language } = usePersistStore();

  return (
    <div className="lg:flex lg:flex-row sm:flex-col md:flex md:flex-col about-author-section w-full flex justify-center items-center text-white gap-10 max-w-[1000px] p-20">
      <Image
        alt="fair"
        className="w-[250px] rounded-full h-[250px]"
        src={Fair}
      ></Image>
      <div className="flex flex-col gap-5">
        <h1 className="text-blue-500 text-4xl font-[700] md:text-center lg:text-start">
          {translations[language]["Mainpage"]["AboutMeSection"]["Title"]}
        </h1>
        <p>
          {translations[language]["Mainpage"]["AboutMeSection"]["Description"]}
        </p>
      </div>
    </div>
  );
};

export default AboutMeSection;
