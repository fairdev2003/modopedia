'use client'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { usePersistStore } from '@/stores/persist_store'
import { translations } from '@/utils/translations'
import { GoDot, GoDotFill } from 'react-icons/go'
import { FaPlay, FaPause } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import NavigationBar from '@/components/Navbar/NavigationBar'

const ExploreSection = () => {
    const { language } = usePersistStore()
    const [image, setImage] = useState(
        'https://res.cloudinary.com/dzaslaxhw/image/upload/v1721836749/gallery/Art1.png'
    )
    const [index, setIndex] = useState(0)
    const [hidden, setHidden] = useState(false)
    const [paused, setPaused] = useState(false)

    const imageReference =
        translations[language]['Mainpage']['ExploreSection']['Images']

    const images = [
        {
            image: 'https://res.cloudinary.com/dzaslaxhw/image/upload/v1721836749/gallery/Art1.png',
            name: imageReference[0],
        },
        {
            image: 'https://res.cloudinary.com/dzaslaxhw/image/upload/v1721836749/gallery/Art2.png',
            name: imageReference[1],
        },
        {
            image: 'https://res.cloudinary.com/dzaslaxhw/image/upload/v1721836749/gallery/Art3.png',
            name: imageReference[2],
        },
        {
            image: 'https://res.cloudinary.com/dzaslaxhw/image/upload/v1721836749/gallery/Art4.png',
            name: imageReference[3],
        },
        {
            image: 'https://res.cloudinary.com/dzaslaxhw/image/upload/v1721836749/gallery/Art5.png',
            name: imageReference[4],
        },
        {
            image: 'https://res.cloudinary.com/dzaslaxhw/image/upload/v1721836749/gallery/Art6.png',
            name: imageReference[5],
        },
        {
            image: 'https://res.cloudinary.com/dzaslaxhw/image/upload/v1721836749/gallery/Art7.png',
            name: imageReference[6],
        },
        {
            image: 'https://res.cloudinary.com/dzaslaxhw/image/upload/v1721836749/gallery/Art8.png',
            name: imageReference[7],
        },
        {
            image: 'https://res.cloudinary.com/dzaslaxhw/image/upload/v1721836749/gallery/Art9.png',
            name: imageReference[8],
        },
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => {
                if (!paused) {
                    const newIndex = (prevIndex + 1) % images.length
                    setImage(images[newIndex].image)
                    return newIndex
                }
                return index
            })
        }, 5000)

        return () => clearInterval(interval)
    })

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={image}
            className="flex flex-col sm:p-10 items-center relative justify-center w-full h-[600px] sm:text-md z-3"
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
                className={`absolute ${hidden ? 'hidden' : 'flex'} flex-col items-center bg-black rounded-lg p-5`}
            >
                <h1 className="text-4xl text-white font-[700] max-w-[700px] text-center mt-10 tracking-wider">
                    {
                        translations[language]['Mainpage']['ExploreSection'][
                            'Explore you favorite'
                        ]
                    }{' '}
                    <span className="p-1 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                        {
                            translations[language]['Mainpage'][
                                'ExploreSection'
                            ]['Mods']
                        }
                    </span>
                </h1>
                <h1 className="text-4xl text-white font-[700] w-[700px] text-center mt-5 tracking-wider">
                    {' '}
                    {
                        translations[language]['Mainpage']['ExploreSection'][
                            'and wiki about them!'
                        ]
                    }
                </h1>
                <Link
                    href="/"
                    className="text-white hover:underline hover:text-blue-300 my-5 hover:font-[700] flex gap-1"
                >
                    {
                        translations[language]['Mainpage']['ExploreSection'][
                            'Get Started'
                        ]
                    }{' '}
                    <ArrowRight />
                </Link>
            </motion.div>
            <div className="text-white flex gap-2 px-3 font-bold absolute bg-black bottom-10 right-10 p-2 select-none rounded-md">
                {images[index].name}
            </div>
            <div className="text-white font-bold absolute bg-black bottom-10 p-2 flex items-center rounded-md">
                {images.map((_, i) => {
                    return i === index ? (
                        <GoDotFill size={30} className="cursor-pointer" />
                    ) : (
                        <GoDot
                            onClick={() => {
                                setIndex(i)
                                setImage(images[i].image)
                            }}
                            size={30}
                            className="cursor-pointer"
                        />
                    )
                })}
            </div>

            <div className="text-white flex gap-2 font-bold absolute bottom-10 left-10">
                <div
                    className="bg-black w-10 h-10 rounded-md select-none flex items-center justify-center cursor-pointer"
                    onClick={() => {
                        setPaused(!paused)
                    }}
                >
                    {paused ? <FaPlay /> : <FaPause />}
                </div>
                <div
                    className="bg-black w-10 h-10 rounded-md select-none flex items-center justify-center cursor-pointer"
                    onClick={() => {
                        setHidden(!hidden)
                    }}
                >
                    {!hidden ? <EyeOff /> : <Eye />}
                </div>
            </div>
        </motion.div>
    )
}

export default ExploreSection
