import { useState } from 'react'
import WorkspaceInput from '../../Input'

const ItemWorkspace3 = () => {
    const [photo, setPhoto] = useState<string | null>(null)

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
            <div className="mt-10 flex flex-col justify-center">
                <h1 className="text-3xl text-white font-bold border-[2px] min-h-[453px] border-transparent border-b-gray-200 pb-5">
                    Media Elements
                </h1>
            </div>
        </div>
    )
}

export default ItemWorkspace3
