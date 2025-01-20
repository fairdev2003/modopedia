"use client";

import { usePersistStore } from "@/stores/persist_store";
import { translations } from "@/utils/translations";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import "./slider.css";
import { useEffect } from "react";
import { image } from "@cloudinary/url-gen/qualifiers/source";

const SliderImages = [
  {
    src: "https://res.cloudinary.com/dzaslaxhw/image/upload/v1711732563/gallery/2024-03-29_18.13.11.png",
    title: "Our community",
    description: "We have a great community, join us!",
  },
  {
    src: "https://res.cloudinary.com/dzaslaxhw/image/upload/v1711732561/gallery/2024-03-29_18.08.30.png",
    title: "Our community",
    description: "We have a great community, join us!",
  },
  {
    src: "https://res.cloudinary.com/dzaslaxhw/image/upload/v1711732561/gallery/2024-03-29_18.01.46.png",
    title: "Our community",
    description: "We have a great community, join us!",
  },
  {
    src: "https://res.cloudinary.com/dzaslaxhw/image/upload/v1711733783/gallery/2024-03-29_18.36.04.png",
    title: "Our community",
    description: "We have a great community, join us!",
  },
  {
    src: "https://res.cloudinary.com/dzaslaxhw/image/upload/v1711734613/gallery/2024-03-29_18.49.53.png",
    title: "Our community",
    description: "We have a great community, join us!",
  },
  {
    src: "https://res.cloudinary.com/dzaslaxhw/image/upload/v1711734990/gallery/2024-03-29_18.56.06.png",
    title: "Our community",
    description: "We have a great community, join us!",
  },
  {
    src: "https://res.cloudinary.com/dzaslaxhw/image/upload/v1711735276/gallery/me_chest_interface.png",
    title: "Our community",
    description: "We have a great community, join us!",
  },
];

const Social = () => {
  const { language } = usePersistStore();

  const controls = useAnimation();

  const loop = async () => {
    while (true) {
      await controls.start({
        x: [0, 0.1],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "mirror",
            duration: 1,
            ease: "linear",
          },
        },
      });
    }
  };

  useEffect(() => {
    loop();
  }, []);

  return (
    <div className="mt-20 justify-center flex flex-col items-center gap-3 bg-blue-700 py-20">
      <h1 className="text-4xl text-white font-[700] ">
        {translations[language]["Mainpage"]["Social"]["Title"]}
      </h1>
      <p className="text-white text-center max-w-[600px]">
        {translations[language]["Mainpage"]["Social"]["Description"]}
      </p>
      <div className="overflow-hidden whitespace-nowrap w-full mt-10">
        <motion.div className="flex" animate={controls}>
          {SliderImages.map((_, index) => (
            <div
              key={index}
              className="w-[400px] flex items-center justify-center mr-2"
            >
              <Image
                key={index}
                alt={`${index}`}
                src={SliderImages[index].src}
                width={400}
                height={400}
                className="rounded-xl"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Social;
