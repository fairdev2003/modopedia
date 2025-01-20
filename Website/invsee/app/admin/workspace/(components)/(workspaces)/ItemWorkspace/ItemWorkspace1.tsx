import { useRef, useState } from 'react'
import WorkspaceInput from '../../Input'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Loading from '../../Loading'
import '../../externalcss/dangerouslySetInnerHTML.css'
import { translations } from '@/utils/translations'
import { usePersistStore } from '@/stores/persist_store'
import ModSelector from '../../ModSelector'
import TagSelector from '../../TagSelector'

const ItemWorkspace1 = () => {
    const [photo, setPhoto] = useState<string | null>(null)
    const photoRef = useRef<HTMLImageElement>(null)
    const [loading, setLoading] = useState<boolean>(false)

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {loading && <Loading />}
            <div className="mt-10 flex flex-col justify-center">
                <h1 className="text-3xl text-white font-bold border-[2px] border-transparent border-b-gray-200 pb-5">
                    General Info
                </h1>
            </div>

            <div className="mt-5 md:flex-col md:flex-5 md:gap-5">
                <div className="mt-5 md:flex rounded-md font-bold gap-5 text-xl flex flex-col text-white col-span-5 ">
                    <div className="lg:grid lg:grid-cols-2 md:flex md:flex-col gap-4 flex flex-col">
                        <WorkspaceInput
                            name={'Item Name'}
                            placeholder="Type Item Name"
                            value=""
                            required
                            height="[70px]"
                            onChange={() => {}}
                        />
                        <WorkspaceInput
                            name="Item Tag"
                            placeholder="Type Item Tag"
                            comment="(MOD__ITEM_NAME)"
                            required
                            height="[70px]"
                            value=""
                            onChange={() => {}}
                        />
                    </div>
                    <div className="lg:grid lg:grid-cols-4 gap-4 md:flex md:flex-col flex flex-col">
                        <WorkspaceInput
                            className="col-span-1"
                            name="Material Value"
                            comment="(EMC)"
                            placeholder="Type Item Emc"
                            height="[70px]"
                            onChange={() => {}}
                        />
                        <WorkspaceInput
                            placeholder="Type Stack Size"
                            name="Stack Size"
                            comment="(1-64)"
                            required
                            className="col-span-1"
                            value=""
                            height="[70px]"
                            onChange={() => {}}
                        />
                        <WorkspaceInput
                            className="col-span-2"
                            name="Item Type"
                            placeholder="Type Item Type"
                            value=""
                            required
                            height="[70px]"
                            onChange={() => {}}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <TagSelector />
                <div className="lg:grid lg:grid-cols-2 mt-5 gap-4 md:flex md:flex-col flex flex-col">
                    <ModSelector
                        onClick={() => {
                            console.log('clicked!')
                        }}
                        name="Choose Mod"
                    />

                    <div>
                        <p className="text-white text-sm font-semibold mb-2">
                            Item Preview
                        </p>
                        <div className="h-[100px] flex gap-7 items-center p-1 px-3 bg-gray-800 hover:bg-gray-600 cursor-pointer rounded-lg outline-none focus:bg-gray-600">
                            <motion.div
                                initial={{ x: -20 }}
                                animate={{ x: 0 }}
                                className="flex gap-2"
                            >
                                {/*<Image*/}
                                {/*    src="IMAGE_HERE"*/}
                                {/*    ref={photoRef}*/}
                                {/*    onError={(e) => {*/}
                                {/*        // @ts-ignore*/}
                                {/*        photoRef.current.src = 'deafult.png'*/}
                                {/*    }}*/}
                                {/*    width={60}*/}
                                {/*    height={60}*/}
                                {/*    alt="mod_icon"*/}
                                {/*/>*/}
                                <div className="flex justify-between">
                                    <div className="flex flex-col">
                                        <p className="text-white font-semibold flex gap-1 items-center">
                                            <span className="text-sm text-gray-400"></span>
                                        </p>
                                        <p className="text-blue-500 font-medium"></p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <WorkspaceInput
                    name="Item Description"
                    placeholder="Type Item Description"
                    value="DESCRIPTION"
                    textarea
                    height="[100px]"
                    width="full"
                    onChange={() => {}}
                />
            </div>
        </motion.div>
    )
}

export default ItemWorkspace1
