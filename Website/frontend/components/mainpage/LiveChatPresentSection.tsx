"use client";

import Image from "next/image";
import Presentation from "@/assets/live_chat_presentation.webp";
import Presentation2 from "@/assets/live_chat_presentation_2.webp";
import Presentation3 from "@/assets/live_chat_presentation_3.webp";
import { usePersistStore } from "@/stores/persist_store";

import { translations } from "@/utils/translations";

const LiveChatPresentSection = () => {
  const { language, color } = usePersistStore();

  return (
    <div
      className="flex justify-center items-center mt-20 py-10 bg-blue-700 w-full flex-wrap"
      id="live_chat"
    >
      <div className="live-chat-present-section__container">
        <div className="flex flex-col justify-center gap-2 items-center mb-5">
          <h2 className="text-4xl font-[700] text-white min-w-[400px]">
            {
              translations[language]["Mainpage"]["LiveChatPresentSection"][
                "How live chat works?"
              ]
            }
          </h2>
          <p className="text-center max-w-[700px] text-white">
            {
              translations[language]["Mainpage"]["LiveChatPresentSection"][
                "Live Chat Description"
              ]
            }
          </p>
        </div>
        <div className="live-chat-present-section__container__content">
          <div className="flex flex-col gap-5 justify-center items-center px-10">
            <Image
              src={Presentation}
              alt="live-chat-present"
              id="live-chat-present"
              className="md:w-[70%] sm:w-[50%] h-auto lg:w-full"
            />
            <Image
              src={Presentation2}
              alt="live-chat-present"
              id="live-chat-present"
              className="md:w-[70%] sm:w-[50%] h-auto lg:w-full"
            />
            <Image
              src={Presentation3}
              alt="live-chat-present"
              id="live-chat-present"
              className="md:w-[70%] sm:w-[50%] h-auto lg:w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChatPresentSection;
