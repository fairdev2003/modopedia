'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { usePersistStore } from '@/stores/persist_store'
import { translations } from '@/utils/translations'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { ItemType } from '@/types/types'

const InfoSection = () => {
    const [items, setItems] = useState<AxiosResponse<ItemType[]>>()

    const { mutate, data, isLoading } = useMutation({
        mutationFn: (query: { query: string }) => {
            return axios.post<ItemType>(
                `http://localhost:9090/honego/v1/item/find`,
                query
            )
        },
        onSuccess: (data: any) => {
            setItems(data)
            items?.data.map((item: ItemType) => {
                console.log(item.item_tag)
            })
        },
    })

    const { language, color } = usePersistStore()
    const [itemdata, setItemData] = useState<ItemType>()

    useEffect(() => {}, [])

    // @ts-ignore

    return (
        <div className="flex justify-center lg:flex-row overflow-hidden md:flex-col items-center text-white">
            <div className="flex text-center items-center flex-col gap-y-3 justify-center">
                <h1 className={`text-${color}  font-[700] text-[40px] mt-10`}>
                    {
                        translations[language]['Mainpage']['InfoSection'][
                            'How about mods?'
                        ]
                    }
                </h1>
                <p className="flex text-center md:flex-col justify-center w-[500px] text-wrap">
                    {
                        translations[language]['Mainpage']['InfoSection'][
                            'Description'
                        ]
                    }
                </p>
                <div></div>

                <div
                    className={`w-auto mx-5 h-[500px] flex bg-gray-800 py-5 rounded-lg gap-6 mt-5 divide-x-4 divide-blue-500`}
                >
                    <div className="w-[60%] rounded-l-lg h-full justify-start ml-5 mt-5 flex flex-col">
                        <h1 className="text-2xl text-white font-[600]">
                            {
                                translations[language]['Mainpage'][
                                    'InfoSection'
                                ]['Card Title']
                            }
                        </h1>
                        <p className="mt-3">
                            {
                                translations[language]['Mainpage'][
                                    'InfoSection'
                                ]['Card Description']
                            }
                        </p>
                        <div className="bg-black w-full h-full my-5 rounded-xl">
                            {itemdata &&
                            !isLoading &&
                            data &&
                            data?.length > 0 !== null ? (
                                <motion.div
                                    initial={{ opacity: 0, x: -100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    key={itemdata}
                                    className="flex flex-col gap-2 mt-10 p-5 rounded-xl mb-5 justify-center items-center"
                                >
                                    <p>
                                        {
                                            translations[language]['Mainpage'][
                                                'InfoSection'
                                            ]['Served Data']
                                        }
                                    </p>
                                    <p>
                                        <span className="text-blue-500 font-[700]">
                                            {'{'}
                                        </span>{' '}
                                        <span className="text-green-500">
                                            item_name
                                        </span>
                                        : "
                                        {itemdata && itemdata.item_name !== null
                                            ? itemdata.item_name
                                            : null}
                                        "{' '}
                                        <span className="text-blue-500 font-[700]">
                                            {'}'}
                                        </span>
                                    </p>
                                    <p>
                                        <span className="text-blue-500 font-[700]">
                                            {'{'}
                                        </span>{' '}
                                        <span className="text-green-500">
                                            tag_name
                                        </span>
                                        : "
                                        {itemdata && itemdata.item_tag
                                            ? itemdata.item_tag.replace(
                                                  '__',
                                                  ':'
                                              )
                                            : null}
                                        "{' '}
                                        <span className="text-blue-500 font-[700]">
                                            {'}'}
                                        </span>
                                    </p>
                                    <p>
                                        <span className="text-blue-500 font-[700]">
                                            {'{'}
                                        </span>{' '}
                                        <span className="text-green-500">
                                            mod_tag
                                        </span>
                                        : "
                                        {itemdata && itemdata
                                            ? itemdata.mod?.tag
                                            : null}
                                        "{' '}
                                        <span className="text-blue-500 font-[700]">
                                            {'}'}
                                        </span>
                                    </p>
                                    <p>
                                        <span className="text-blue-500 font-[700]">
                                            {'{'}
                                        </span>{' '}
                                        <span className="text-green-500">
                                            short_description
                                        </span>
                                        : "
                                        {itemdata &&
                                        itemdata.short_description &&
                                        itemdata.short_description.length >
                                            0 ? (
                                            itemdata.short_description.slice(
                                                0,
                                                50
                                            ) + '...'
                                        ) : (
                                            <span className="text-red-500">
                                                No data
                                            </span>
                                        )}
                                        "{' '}
                                        <span className="text-blue-500 font-[700]">
                                            {'}'}
                                        </span>
                                    </p>
                                    <p>
                                        <span className="text-blue-500 font-[700]">
                                            {'{'}
                                        </span>{' '}
                                        <span className="text-green-500">
                                            mod_name
                                        </span>
                                        : "
                                        {itemdata && itemdata.mod
                                            ? itemdata.mod.modName
                                            : 'Minecraft'}
                                        "{' '}
                                        <span className="text-blue-500 font-[700]">
                                            {'}'}
                                        </span>
                                    </p>
                                </motion.div>
                            ) : null}
                        </div>
                    </div>
                    <div className="w-[40%] rounded-r-lg h-full flex text-start justify-start p-5 flex-col">
                        <h2 className="text-2xl font-[600]">
                            {
                                translations[language]['Mainpage'][
                                    'InfoSection'
                                ]['Search Items']
                            }
                        </h2>
                        <Input
                            onChange={(input) => {
                                mutate({ query: input.currentTarget.value })
                            }}
                            placeholder={
                                translations[language]['Mainpage'][
                                    'InfoSection'
                                ]['Search']
                            }
                            className="bg-blue-500 mt-3 text-white placeholder:text-white"
                        ></Input>
                        <div className="flex flex-col gap-4 mt-4">
                            {!isLoading &&
                                items &&
                                items?.data
                                    .slice(0, 3)
                                    .map((item: any, index: number) => {
                                        return (
                                            console.log(itemdata),
                                            (
                                                <div
                                                    onClick={() => {
                                                        if (item === itemdata) {
                                                            setItemData(item)
                                                        } else {
                                                            setItemData(null)
                                                            setTimeout(() => {
                                                                setItemData(
                                                                    item
                                                                )
                                                            }, 10)
                                                        }
                                                    }}
                                                    className={`text-white hover:translate-x-3 transition-all cursor-pointer ${itemdata === item ? 'bg-blue-700 translate-x-3' : 'bg-blue-500'} h-[90px] rounded-lg p-5 flex items-center gap-5 truncate`}
                                                >
                                                    <Image
                                                        src={`https://res.cloudinary.com/dzaslaxhw/image/upload/v1709745445/${item.mod.tag}/${item.item_tag}.png`}
                                                        alt="item_image"
                                                        className="w-10 h-10"
                                                        width={70}
                                                        height={70}
                                                    />
                                                    <div className="flex flex-col px-2">
                                                        <h1 className="text-lg font-[600]">
                                                            {item &&
                                                            item.item_name
                                                                .length > 15
                                                                ? item.item_name.substring(
                                                                      0,
                                                                      15
                                                                  ) + '...'
                                                                : item.item_name}
                                                        </h1>
                                                        <p className="text-sm">
                                                            {item.mod &&
                                                            item.mod.modName
                                                                .length > 0
                                                                ? item.mod
                                                                      .modName
                                                                : 'Minecraft'}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    })}
                            <div className="flex gap-3 justify-center items-center">
                                <div className="h-1 rounded-full w-[30%] bg-blue-500 mt-1"></div>
                                <div className="h-1 rounded-full w-[30%] bg-blue-500 mt-1"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoSection
