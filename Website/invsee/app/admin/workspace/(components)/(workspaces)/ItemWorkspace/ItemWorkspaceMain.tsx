'use client'

import { useEffect, useState } from 'react'
import ItemWorkspace1 from './ItemWorkspace1'
import Loading from '../../Loading'
import ItemWorkspace2 from './ItemWorkspace2'
import ItemWorkspace3 from './ItemWorkspace3'
import Error from '../../Error'
import { motion } from 'framer-motion'

const ItemWorkspace = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const [_, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <div className="flex flex-col justify-center w-full lg:px-[5%] mt-5 mb-20">
            {loading && <Loading />}

            <div className="lg:flex lg:flex-row md:flex md:flex-row items-end">
                <h1 className="text-3xl flex flex-col gap-2 text-white font-bold">
                    ItemWorkspace
                    <span className="ml-1 text-gray-500 text-base">
                        Editing:
                    </span>
                </h1>
            </div>
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: '100%' }}
                className="lg:grid lg:grid-cols-3 flex-col flex w-auto gap-5 mt-10"
            >
                <div
                    className={`${
                        1 === 1
                            ? 'text-white bg-blue-600'
                            : 'text-black bg-white'
                    } h-[50px] w-full px-3 flex items-center rounded-lg cursor-pointer font-semibold`}
                >
                    1. Basic Info
                </div>
                <div
                    className={`${
                        2 === 2
                            ? 'text-white bg-blue-600'
                            : `${
                                  1 === 1
                                      ? 'text-gray-400 bg-gray-500'
                                      : 'text-black bg-white'
                              }`
                    } h-[50px] w-full px-3 flex items-center rounded-lg cursor-pointer font-semibold`}
                    onClick={() => {
                        if (3 === 3) {
                        }
                    }}
                >
                    2. Wiki Elementor
                </div>
                <div
                    className={`${
                        3 === 3
                            ? 'text-white bg-blue-600'
                            : `${
                                  1 === 1 || 2 === 2
                                      ? 'text-gray-400 bg-gray-500'
                                      : 'text-black bg-white'
                              }`
                    } h-[50px] w-full px-3 flex items-center rounded-lg cursor-pointer font-semibold`}
                >
                    3. {'Media'}
                </div>
            </motion.div>

            {1 === 1 && <ItemWorkspace1 />}
            {1 === 1 && <ItemWorkspace2 />}
            {1 === 1 && <ItemWorkspace3 />}

            <div
                className={`flex ${
                    1 > 1 ? 'justify-between' : 'justify-end'
                } mt-10`}
            >
                {1 > 1 && (
                    <button className="bg-transparent rounded-xl p-4 w-[150px] transition-colors h-[70px] text-white font-medium text-lg">
                        {'<'} Previous
                    </button>
                )}
                <button className="bg-blue-600 mb-10 rounded-xl p-4 lg:w-[250px] md:w-[250px] w-full hover:bg-white hover:text-black transition-colors h-[70px] text-white font-medium text-lg"></button>
            </div>
        </div>
    )
}

export default ItemWorkspace
