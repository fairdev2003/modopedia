import { cn } from '@/lib/utils'
import { usePersistStore } from '@/stores/persist_store'
import { AnimatePresence, motion } from 'framer-motion'
import { SearchIcon } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { trpc } from '@/app/_trpc/client'
import Image from 'next/image'
import '@/components/Navbar/components/externalcss/scrollbar.css'
import { translations } from '@/utils/translations'

interface ModSelectorProps {
    onClick: () => void
    className?: string
    name: string
}

const ModSelector = ({ onClick, className, name }: ModSelectorProps) => {
    const [opened, setOpened] = useState<boolean>(false)
    const { setSearchLocked } = usePersistStore()
    const { language } = usePersistStore()
    const searchRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setOpened(false)
                setSearchLocked(false)
                document.body.style.overflow = ''
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    const mods = {}

    const search = (query: string) => {}

    return (
        <div>
            <AnimatePresence>
                {opened && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={cn(
                            className,
                            'fixed inset-0 flex justify-center bg-black pt-[200px] bg-opacity-75 z-50'
                        )}
                    >
                        <motion.div
                            initial={{ opacity: 0, height: 300 }}
                            animate={{ opacity: 1, height: 550 }}
                            exit={{ opacity: 0, height: 300 }}
                            className="text-gray-400 bg-gray-800 w-[800px] rounded-lg flex flex-col"
                        >
                            <div className="flex gap-1 items-center px-4 pt-2 justify-between">
                                <div className="flex gap-1 items-center justify-center">
                                    <SearchIcon className="h-5 w-5 text-gray-400" />
                                    <input
                                        spellCheck={false}
                                        onChange={(e) => {
                                            search(e.target.value)
                                        }}
                                        ref={searchRef}
                                        placeholder="Search Mods..."
                                        type="text"
                                        className="w-full text-gray-400 font-semibold h-[50px] bg-transparent outline-none rounded-lg p-3"
                                    />
                                </div>
                                <code
                                    className="p-1 px-3 bg-gray-900 rounded-xl cursor-pointer"
                                    onClick={() => {
                                        setOpened(false)
                                        setSearchLocked(false)
                                        document.body.style.overflow = ''
                                    }}
                                >
                                    ESC
                                </code>
                            </div>
                            <div
                                className="flex flex-col gap-4 p-4 h-[450px] overflow-y-scroll"
                                id="modal"
                            >
                                <AnimatePresence>
                                    {/*{mods.data?.map((mod) => {*/}
                                    {/*  return (*/}
                                    {/*    <motion.div*/}
                                    {/*      key={mod.id}*/}
                                    {/*      initial={{ opacity: 0 }}*/}
                                    {/*      animate={{ opacity: 1 }}*/}
                                    {/*      exit={{ opacity: 0 }}*/}
                                    {/*      className="flex gap-5 p-2 bg-gray-600 rounded-lg hover:bg-slate-400 cursor-pointer"*/}
                                    {/*      onClick={() => {*/}
                                    {/*        setItemWorkspaceState("mod", mod);*/}
                                    {/*        setOpened(false);*/}
                                    {/*        setSearchLocked(false);*/}
                                    {/*        document.body.style.overflow = "";*/}
                                    {/*      }}*/}
                                    {/*    >*/}
                                    {/*      <Image*/}
                                    {/*        src={mod.image_src}*/}
                                    {/*        width={50}*/}
                                    {/*        height={50}*/}
                                    {/*        alt="mod_icon"*/}
                                    {/*      />*/}
                                    {/*      <p className="text-white text-sm font-semibold">*/}
                                    {/*        {mod.modName}*/}
                                    {/*      </p>*/}
                                    {/*    </motion.div>*/}
                                    {/*  );*/}
                                    {/*  */}
                                    {/*})}*/}
                                    <motion.div
                                        key="Clear"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex gap-5 p-2 bg-gray-600 rounded-lg hover:bg-slate-400 cursor-pointer"
                                    >
                                        <p className="text-white text-sm font-semibold">
                                            Clear
                                        </p>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                            <div className="h-[40px] flex gap-1 font-semibold text-sm justify-end p-4">
                                <p>Don't see your mod?</p>{' '}
                                <span className="text-blue-500 cursor-pointer hover:underline">
                                    Add Mod
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div>
                <p className="text-white text-sm font-semibold mb-2">{name}</p>

                <motion.div
                    className="h-[100px] flex gap-7 items-center p-3 px-3 bg-gray-800 hover:bg-gray-600 cursor-pointer rounded-lg outline-none focus:bg-gray-600"
                    onClick={() => {
                        document.body.style.overflow = 'hidden'
                        onClick()
                        setOpened(true)
                        setSearchLocked(true)
                        setTimeout(() => {
                            searchRef.current?.focus()
                        }, 0)
                    }}
                ></motion.div>
            </div>
        </div>
    )
}

export default ModSelector
