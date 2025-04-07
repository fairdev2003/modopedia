import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image, { StaticImageData } from 'next/image'
import Deafult from '@/assets/Avatar.png'
import { useState } from 'react'

interface SelectWorkspaceCardProps {
    name?: string
    image?: StaticImageData | string | StaticImport
}

const SelectWorkspaceCard = ({
    name = 'Please select a workspace',
    image = Deafult,
}: SelectWorkspaceCardProps) => {
    const [isSelected, selected] = useState(false)

    return (
        <button className="m-6 col-span-1 h-[150px] bg-white hover:bg-gray-200 cursor-pointer rounded-xl transition-colors text-black gap-4 flex flex-col justify-center items-center">
            <Image
                src={image}
                width={50}
                height={50}
                alt="card_icon"
                className="fill-red-500"
            />
            <h1 className="text-xl font-semibold">{name}</h1>
        </button>
    )
}

export default SelectWorkspaceCard
