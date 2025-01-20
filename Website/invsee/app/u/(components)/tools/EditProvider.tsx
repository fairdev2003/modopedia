import { ReactNode, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import {
    motion,
    AnimatePresence,
    useAnimate,
    AnimationSequence,
} from 'framer-motion'
import { Edit2Icon, XIcon } from 'lucide-react'

type EditProviderProps = {
    children: ReactNode
    onSave?: (content: string | undefined) => boolean
    onClick?: () => void
    access: boolean
}

export const EditProvider = ({
    children,
    access,
    onSave,
}: EditProviderProps) => {
    const [scope, animate] = useAnimate()

    const [isOpened, setIsOpened] = useState<boolean>(false)

    const inputRef = useRef<HTMLInputElement>(null)

    const sequnce: AnimationSequence = [
        [scope.current, { x: 200 }, { duration: 2 }],
        [scope.current, { x: -200 }, { duration: 2 }],
    ]

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpened(false)
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    useEffect(() => {
        animate(sequnce)
    }, [])

    return (
        <div className="flex gap-1">
            {/* Keep AnimatePresence always mounted */}
            <AnimatePresence>
                {isOpened && (
                    <motion.div
                        onClick={() => setIsOpened(false)} // Close modal when background is clicked
                        className={cn(
                            'absolute z-1 inset-0 flex justify-center items-center bg-black lg:pt-[100px] bg-opacity-75 z-50'
                        )}
                    >
                        <motion.div
                            ref={scope}
                            initial={{ width: 0, height: 0, opacity: 0 }}
                            exit={{ width: 'auto', height: 'auto', opacity: 1 }}
                            onClick={(e) => e.stopPropagation()}
                            className="text-gray-400 bg-gray-800 rounded-lg flex-col w-[400px] rounded-lg relative z-2"
                        >
                            <div className="flex justify-between bg-gray-900 p-2 px-5 rounded-t-lg">
                                <h1>Edit Window</h1>
                                <XIcon
                                    className="hover:text-red-500 cursor-pointer"
                                    onClick={() => setIsOpened(!isOpened)}
                                />
                            </div>
                            <div className="mx-5 h-[200px]">
                                <input ref={inputRef} />
                                <button
                                    onClick={() => {
                                        if (onSave) {
                                            const result = onSave(
                                                inputRef?.current?.value
                                            )
                                            if (result) {
                                                setIsOpened(false)
                                            }
                                        }
                                    }}
                                >
                                    Save
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {access ? (
                <div
                    className="flex gap-1 items-center cursor-pointer"
                    onClick={() => setIsOpened(!isOpened)}
                >
                    {children}
                    <Edit2Icon size={15} />
                </div>
            ) : (
                <div>{children}</div>
            )}
        </div>
    )
}
