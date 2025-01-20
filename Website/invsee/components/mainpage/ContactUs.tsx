"use client";

import Mail from "@/assets/mail.webp";
import Image from "next/image";

import { translations } from "@/utils/translations";

import { usePersistStore } from "@/stores/persist_store";

const ContactUs = () => {
  const { language } = usePersistStore();

  return (
    <div className="text-white flex justify-center gap-20">
      <Image alt="mail" src={Mail} width={300} height={300} />
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold text-blue-500">
          {translations[language]["Mainpage"]["ContactUs"]["Title"]}
        </h1>
        <p>{translations[language]["Mainpage"]["ContactUs"]["Description"]}</p>
        <a className="text-blue-500" href="mailto:kubaklimkiewicz1@gmail.com">
          kubaklimkiewicz1@gmail.com
        </a>
      </div>
    </div>
  );
};

export default ContactUs;
