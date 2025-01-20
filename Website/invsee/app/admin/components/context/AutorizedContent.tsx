import { ReactNode, useContext } from 'react'
import { protectedContext } from '@/app/admin/components/context/ProtectedContext'
import { UserType } from '@/types/types'
import { AutorizedChildren } from '@/app/admin/components/context/AutorizedChildren'
import { useUserStore } from '@/stores/user_store'

type AutorizedContentProps = {
    children: ReactNode
    user: Omit<UserType, 'password'>
}

export const AutorizedContent = ({ children, user }: AutorizedContentProps) => {
    if (!user) {
        return null
    } else {
        if (user.role === 'Admin') {
            return <div>{children}</div>
        } else {
            return null
        }
    }
}
