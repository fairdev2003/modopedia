"use client";
import Image from "next/image";
import Account1 from "@/assets/account-1.jpg";
import Account2 from "@/assets/account-2.jpg";
import Account3 from "@/assets/account-3.jpg";
import Arrow from "@/assets/curly-arrow-2.png";
import { Dot } from "lucide-react";
import { usePersistStore } from "@/stores/persist_store";
import { translations } from "@/utils/translations";

const AccountSwitchComponent = () => {
  const { language } = usePersistStore();

  return (
    <div className="mt-20 justify-center flex flex-col items-center gap-3 mb-20">
      <h1 className="text-4xl text-blue-500 font-[700] ">
        {translations[language]["Mainpage"]["AccountSection"]["Title"]}
      </h1>
      <p className="text-white text-center max-w-[600px]">
        {translations[language]["Mainpage"]["AccountSection"]["Description"]}
      </p>
      <div className="flex gap-10 justify-center mt-10" id="account">
        <div className="bg-gray-800 rounded-xl flex flex-col items-center gap-3 justify-center border-[3px] p-10 border-green-500 relative">
          <Image
            src={Account1}
            alt="account-switch"
            width={80}
            height={80}
            className="rounded-full"
          />
          <Image
            src={Arrow}
            alt="account-switch"
            width={80}
            height={80}
            id="arrow-2"
            className="md:hidden sm:hidden lg:flex absolute -top-[90px] -left-20"
          />
          <p className="absolute text-white top-5 -left-[200px] max-w-[150px] md:hidden sm:hidden lg:flex overflow-hidden">
            {
              translations[language]["Mainpage"]["AccountSection"][
                "ArrowTooltip"
              ]
            }
          </p>
          <Dot className="text-green-500 absolute top-0 right-0 w-10 h-10" />
          <h3 className="text-green-500 font-[600]">czerwus2003</h3>
          <p className="text-gray-400">
            {translations[language]["Mainpage"]["AccountSection"]["Server"]}:
            cubigame.pl
          </p>
        </div>
        <div className="bg-gray-800  flex flex-col items-center gap-3 justify-center rounded-xl p-10">
          <Image
            src={Account2}
            alt="account-switch"
            width={80}
            height={80}
            className="rounded-full"
          />
          <h3 className="text-white font-[600]">cysie123</h3>
          <p className="text-gray-400">
            {translations[language]["Mainpage"]["AccountSection"]["Server"]}:
            cubecraft.com
          </p>
        </div>
        <div className="bg-gray-800  flex flex-col items-center gap-3 justify-center rounded-xl p-10">
          <Image
            src={Account3}
            alt="account-switch"
            width={80}
            height={80}
            className="rounded-full"
          />
          <h3 className="text-white font-[600]">fairshooter607</h3>
          <p className="text-gray-400">
            {translations[language]["Mainpage"]["AccountSection"]["Server"]}:
            hypecraft.net
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountSwitchComponent;
