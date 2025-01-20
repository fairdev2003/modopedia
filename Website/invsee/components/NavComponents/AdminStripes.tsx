import { ItemWorkspaceProps } from '@/stores/types/workspaceTypes'
import { User } from '@prisma/client'
import { Settings, User as UserSVG } from 'lucide-react'
import { useState } from 'react'
import { BsCircle } from 'react-icons/bs'
import { UserType } from '@/types/types'

const languages = ['pl', 'en', 'es'] as const
const pages = ['mainpage', 'item', 'mod', 'crafting', 'user'] as const
interface Context {
    context: {
        setLanguage: (language: string) => void
        setpage: (page: string) => void
        account_data: UserType
        itemWorkspace: ItemWorkspaceProps
    }
}

const AdminStripe = ({ context }: Context) => {
    const [g, setg] = useState(0)
    const [p, setp] = useState(0)

    return (
        <>
            <div className="lg:flex md:flex flex lg:gap-5 gap-3 items-center">
                <BsCircle className="text-green-500" />
                <a href="/admin/dashboard">
                    <p className="text-[13px] cursor-pointer select-none hover:bg-blue-600 transition-colors rounded-xl">
                        DASHBOARD
                    </p>
                </a>

                <a href="/admin/workspace">
                    <p className="text-[13px] hidden md:hidden lg:flex cursor-pointer select-none hover:bg-blue-600 transition-colors rounded-xl">
                        WORKSPACE
                    </p>
                </a>

                <a href="/admin/dashboard?section=items">
                    <p className="text-[13px] hidden lg:flex cursor-pointer select-none hover:bg-blue-600 transition-colors rounded-xl">
                        ITEMS & BLOCKS
                    </p>
                </a>

                <p
                    className="text-[13px] hidden lg:flex cursor-pointer select-none hover:bg-blue-600 transition-colors rounded-xl"
                    onClick={() => {
                        if (g === 2) {
                            setg(0)
                        } else {
                            setg(g + 1)
                        }
                        context.setLanguage(languages[g])
                    }}
                >
                    CHANGE LANGUAGE
                </p>

                <p
                    className="text-[13px] hidden lg:flex cursor-pointer select-none hover:bg-blue-600 transition-colors rounded-xl"
                    onClick={() => {
                        if (p === 2) {
                            setp(0)
                        } else {
                            setp(p + 1)
                        }
                        context.setpage(pages[p])
                    }}
                >
                    Editing {context.itemWorkspace.workspaceName}
                </p>

                <Settings size={20} className="cursor-pointer" />
            </div>
            <a href="/dashboard?section=account-settings">
                <div className="text-[13px] hidden lg:flex gap-1 items-center cursor-pointer hover:bg-blue-600 transition-colors rounded-xl">
                    <UserSVG size={20} />{' '}
                    <p>
                        {context.account_data.firstName &&
                            context.account_data.firstName.toUpperCase()}{' '}
                        {context.account_data.lastName &&
                            context.account_data.lastName.toUpperCase()}
                    </p>
                </div>
            </a>
        </>
    )
}

export { AdminStripe }
