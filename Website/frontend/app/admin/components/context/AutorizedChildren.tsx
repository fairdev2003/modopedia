import { ReactNode, useContext } from 'react'
import { protectedContext } from '@/app/admin/components/context/ProtectedContext'
import { UserType } from '@/types/types'
import DashboardError from '@/app/admin/dashboard/(components)/sections/DashboardError'

type AutorizedChildrenProps = {
    children: ReactNode
}

export const AutorizedChildren = ({ children }: AutorizedChildrenProps) => {
    const user = useContext(protectedContext)

    if (!user) {
        return <div className="text-white">No user</div>
    }

    switch (user.role) {
        case 'Admin': {
            return <div>{children}</div>
        }
        default:
            return <div className="text-white">No perms</div>
    }

    return null
}
