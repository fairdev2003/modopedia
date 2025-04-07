import { AnimatePresence, motion } from 'framer-motion'
import { SearchIcon, SearchXIcon, X, XIcon } from 'lucide-react'
import { use, useEffect, useRef, useState } from 'react'
import { RiAppsLine } from 'react-icons/ri'
import { trpc } from '@/app/_trpc/client'
import Image from 'next/image'
import '../../app/admin/workspace/(components)/externalcss/loader.css'
import SearchResults from './components/SearchResults'
import { usePersistStore } from '@/stores/persist_store'
import { cn } from '@/lib/utils'
import { linkSync } from 'fs'
import { websiteroutes } from '@/utils/data/webisteRoutes'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { ItemType } from '@/types/types'

type SearchBarProps = {
    className?: string
}

const SearchBar = ({ className }: SearchBarProps) => {
    const [searching, setSearching] = useState<boolean>(false)
    const searchRef = useRef<HTMLInputElement>(null)
    const [fallstart, setFallstart] = useState<boolean>(true)
    const [searchData, setSearchData] = useState<any>(null)
    const { searchLocked } = usePersistStore()
    const [searchValue, setSearchValue] = useState<string>('')
    const [debounceTimeout, setDebounceTimeout] =
        useState<NodeJS.Timeout | null>(null)

    const data = useMutation({
        mutationFn: (query: { query: string }) => {
            return axios.post<ItemType>(
                `http://localhost:9090/honego/v1/item/find`,
                {
                    query: searchValue,
                }
            )
        },
        onSuccess: (data: any) => {
            setSearchData({ items: data })
            console.log(searchData)
        },
    })

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault()
                document.body.style.overflow = ''
                setSearching(false)
            }
            if (e.key === 'k' && e.ctrlKey && !searchLocked) {
                e.preventDefault()
                document.body.style.overflow = 'hidden'
                setSearching(true)
                setFallstart(false)
                setTimeout(() => {
                    searchRef.current?.focus()
                }, 0)
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    useEffect(() => {
        data.mutate({ query: '' })
    }, [])

    const search = (input: string) => {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout)
        }

        const timeout = setTimeout(() => {
            data.isLoading = true
            if (input.length > 0) {
                data.mutate({ query: input })
            } else {
                setSearchData([])
            }
        }, 1000)
        setDebounceTimeout(timeout)
        data.isLoading = false
    }

    return (
        <div>
            <AnimatePresence>
                {searching && !searchLocked ? (
                    <motion.div
                        className={cn(
                            className,
                            'fixed inset-0 flex justify-center bg-black lg:pt-[100px] bg-opacity-75 z-50'
                        )}
                    >
                        <motion.div
                            initial={{ opacity: 0, height: 300 }}
                            animate={{ opacity: 1, height: 600 }}
                            exit={{ opacity: 0, height: 300 }}
                            className="text-gray-400 bg-gray-800 lg:h-[600px] lg:w-[800px] w-full md:my-5 mx-5 my-5 rounded-lg flex flex-col"
                        >
                            <div className="flex gap-1 items-center px-4 pt-2 justify-between">
                                <div className="flex gap-1 items-center justify-center">
                                    <SearchIcon className="h-5 w-5 text-gray-400" />
                                    <input
                                        spellCheck={false}
                                        onChange={(e) => {
                                            setSearchValue(
                                                e.currentTarget.value
                                            )
                                            if (
                                                e.currentTarget.value.length > 0
                                            ) {
                                                search(e.currentTarget.value)
                                            } else {
                                                setSearchData({
                                                    data: {
                                                        items: { ...data },
                                                    },
                                                })
                                            }
                                        }}
                                        ref={searchRef}
                                        placeholder="Search Mods..."
                                        type="text"
                                        className="w-full text-gray-400 font-semibold h-[50px] bg-transparent outline-none rounded-lg p-3"
                                    />
                                </div>
                                <div
                                    className="p-1 px-3 bg-gray-900 rounded-xl cursor-pointer "
                                    onClick={() => {
                                        document.body.style.overflow = ''
                                        setSearching(false)
                                        setFallstart(true)
                                        setTimeout(() => {
                                            searchRef.current?.focus()
                                        }, 0)
                                    }}
                                >
                                    <XIcon className="lg:hidden flex" />
                                    <p className="lg:flex hidden">ESC</p>
                                </div>
                            </div>
                            <div className="h-[2px] w-full bg-gray-600 mt-2 mb-3" />
                            <div className="h-[2px] w-full bg-gray-600 flex justify-end items-center"></div>
                            <div className="h-20 w-full items-center p-2 px-4 flex flex-col md:justify-between md:flex-row lg:justify-between">
                                <div className="p-1 px-3 bg-gray-900 rounded-xl cursor-pointer ">
                                    <XIcon className="lg:hidden hidden" />
                                    <p className="text-sm">
                                        <span className="font-bold">
                                            CTRL + K
                                        </span>{' '}
                                        - to focus on search bar
                                    </p>
                                </div>
                                <p>
                                    <span className="text-gray-400">
                                        Powered by
                                    </span>
                                    <span className="text-blue-500 font-semibold">
                                        {' '}
                                        Modopedia
                                    </span>
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
            <SearchIcon
                color="white"
                className="lg:hidden md:hidden flex text-white"
                onClick={() => {
                    if (searchLocked) {
                        return
                    }
                    document.body.style.overflow = 'hidden'
                    setSearching(true)
                    setFallstart(false)
                    setTimeout(() => {
                        searchRef.current?.focus()
                    }, 0)
                }}
            />
            <button
                className={cn(
                    'lg:flex md:flex hidden gap-7 items-center p-3 px-3 bg-gray-800 hover:bg-gray-600 cursor-pointer rounded-lg select-none'
                )}
                onClick={() => {
                    if (searchLocked) {
                        return
                    }
                    document.body.style.overflow = 'hidden'
                    setSearching(true)
                    setFallstart(false)
                    setTimeout(() => {
                        searchRef.current?.focus()
                    }, 0)
                }}
            >
                <div className="w-full h-full flex text-sm font-semibold gap-2 items-center justify-center mx-10 lg:mx-0 rounded-lg ">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                    <p className="text-gray-400">Search Mods...</p>
                </div>
                <p className="text-gray-400 items-center gap-1 text-sm p-1 px-3 bg-gray-900 lg:flex hidden rounded-xl">
                    CTRL<span>+</span>K
                </p>
            </button>
        </div>
    )
}

export default SearchBar
