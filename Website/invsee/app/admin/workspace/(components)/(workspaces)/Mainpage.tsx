import PickaxeIcon from '../../(images)/itemIcon.svg'
import FireIcon from '../../(images)/modIcon.svg'
import CraftingIcon from '../../(images)/craftingIcon.svg'
import UserIcon from '../../(images)/userIcon.svg'

import { motion } from 'framer-motion'
import SelectWorkspaceCard from '../SelectWorkspaceCard'
import { PlusIcon } from 'lucide-react'

const Mainpage = () => {
    return (
        <motion.div
            className="text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="mt-10">
                <div className="">
                    <h1 className="text-3xl text-white font-bold">
                        Workspace Hub
                    </h1>
                </div>
                <div className="mt-10">
                    <button className="bg-gray-600 p-5 px-7 rounded-lg flex gap-2 hover:bg-blue-500 transition-colors duration-200">
                        <PlusIcon /> Create New
                    </button>
                </div>
                <div className="">
                    <h1 className="text-2xl text-white font-bold mt-10">
                        Latest Workspace
                    </h1>
                    <div className="mt-5 grid grid-cols-3 gap-6">
                        <div className="col-span-1 h-[150px] bg-gray-600 rounded-lg"></div>
                        <div className="col-span-1 h-[150px] bg-gray-600 rounded-lg"></div>
                        <div className="col-span-1 h-[150px] bg-gray-600 rounded-lg"></div>
                    </div>
                    <div className="text-blue-500 hover:underline flex justify-center mt-5 cursor-pointer">
                        Load more
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Mainpage
