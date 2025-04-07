import { createContext } from 'react'
import { UserType } from '@/types/types'

export const protectedContext = createContext<
    Omit<UserType, 'password'> | undefined | null
>(undefined)
