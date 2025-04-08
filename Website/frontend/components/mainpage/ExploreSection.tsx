'use client';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { usePersistStore } from '@/stores/persist_store';
import { translations } from '@/utils/translations';
import { GoDot, GoDotFill } from 'react-icons/go';
import { FaPlay, FaPause } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ExploreSection = () => {
  const { language } = usePersistStore();
  const [image, setImage] = useState(
    'https://res.cloudinary.com/dzaslaxhw/image/upload/v1721836749/gallery/Art1.png'
  );
  const [index, setIndex] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [paused, setPaused] = useState(false);

  const imageReference = translations[language]['Mainpage']['ExploreSection']['Images'];

  const images = [
    {
      image: 'https://res.cloudinary.com/dzaslaxhw/image/upload/v1721836749/gallery/Art1.webp',
      name: imageReference[0],
    },
    {
      image: 'https://res.cloudinary.com/dzaslaxhw/image/upload/v1721836749/gallery/Art2.webp',
      name: imageReference[1],
    },
    {
      image: 'https://res.cloudinary.com/dzaslaxhw/image/upload/v1721836749/gallery/Art3.webp',
      name: imageReference[2],
    },
    {
      image: 'https://res.cloudinary.com/dzaslaxhw/image/upload/v1721836749/gallery/Art4.webp',
      name: imageReference[3],
    },
    {
      image: 'https://res.cloudinary.com/dzaslaxhw/image/upload/v1721836749/gallery/Art5.webp',
      name: imageReference[4],
    },
    {
      image: 'https://res.cloudinary.com/dzaslaxhw/image/upload/v1721836749/gallery/Art6.webp',
      name: imageReference[5],
    },
    {
      image: 'https://res.cloudinary.com/dzaslaxhw/image/upload/v1721836749/gallery/Art7.webp',
      name: imageReference[6],
    },
    {
      image: 'https://res.cloudinary.com/dzaslaxhw/image/upload/v1721836749/gallery/Art8.webp',
      name: imageReference[7],
    },
    {
      image: 'https://res.cloudinary.com/dzaslaxhw/image/upload/v1721836749/gallery/Art9.webp',
      name: imageReference[8],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => {
        if (!paused) {
          const newIndex = (prevIndex + 1) % images.length;
          setImage(images[newIndex].image);
          return newIndex;
        }
        return index;
      });
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key={image}
      className="sm:text-md z-3 relative flex h-[600px] w-full flex-col items-center justify-center sm:p-10"
      style={{
        backgroundImage: 'url(' + image + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={`${hidden}`}
        className={`absolute ${hidden ? 'hidden' : 'flex'} flex-col items-center rounded-lg bg-black p-5`}
      >
        <h1 className="mt-10 max-w-[700px] text-center text-4xl font-[700] tracking-wider text-white">
          {translations[language]['Mainpage']['ExploreSection']['Explore you favorite']}{' '}
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1 text-white">
            {translations[language]['Mainpage']['ExploreSection']['Mods']}
          </span>
        </h1>
        <h1 className="mt-5 w-[700px] text-center text-4xl font-[700] tracking-wider text-white">
          {' '}
          {translations[language]['Mainpage']['ExploreSection']['and wiki about them!']}
        </h1>
        <Link
          href="/"
          className="my-5 flex gap-1 text-white hover:font-[700] hover:text-blue-300 hover:underline"
        >
          {translations[language]['Mainpage']['ExploreSection']['Get Started']} <ArrowRight />
        </Link>
      </motion.div>
      <div className="absolute bottom-10 right-10 flex select-none gap-2 rounded-md bg-black p-2 px-3 font-bold text-white">
        {images[index].name}
      </div>
      <div className="absolute bottom-10 flex items-center rounded-md bg-black p-2 font-bold text-white">
        {images.map((_, i) => {
          return i === index ? (
            <GoDotFill size={30} className="cursor-pointer" />
          ) : (
            <GoDot
              onClick={() => {
                setIndex(i);
                setImage(images[i].image);
              }}
              size={30}
              className="cursor-pointer"
            />
          );
        })}
      </div>

      <div className="absolute bottom-10 left-10 flex gap-2 font-bold text-white">
        <div
          className="flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-md bg-black"
          onClick={() => {
            setPaused(!paused);
          }}
        >
          {paused ? <FaPlay /> : <FaPause />}
        </div>
        <div
          className="flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-md bg-black"
          onClick={() => {
            setHidden(!hidden);
          }}
        >
          {!hidden ? <EyeOff /> : <Eye />}
        </div>
      </div>
    </motion.div>
  );
};

export default ExploreSection;
