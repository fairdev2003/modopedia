import { useRef, useState } from 'react'
import WorkspaceInput from '../../Input'
import { WikiContentHandler } from '../../../utils/WikiContentHandler'
import '../../externalcss/dangerouslySetInnerHTML.css'
import { motion } from 'framer-motion'
import WikiElementor from '../../WikiElementor'

const ItemWorkspace2 = () => {
    const [photo, setPhoto] = useState<string | null>(null)

    const divRef = useRef<HTMLDivElement>(null)

    const uploadPhoto = (e: any) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onloadend = () => {
            setPhoto(reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    return (
        <div>
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: '100%' }}
                transition={{ delay: 4 }}
                className="mt-10 flex flex-col justify-center"
                ref={divRef}
            >
                <h1 className="text-3xl text-white font-bold pb-5 border-[2px] border-transparent border-b-gray-200">
                    Wiki Elementor
                </h1>
                {/* <div id="wrapper" className="text-white mt-10 p-5" dangerouslySetInnerHTML={{__html: WikiContentHandler({ content: itemWorksapce.itemDescription })}}/> */}

                <WikiElementor />
            </motion.div>
        </div>
    )
}

export default ItemWorkspace2
