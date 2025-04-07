import { create } from 'zustand'
import { UserType } from '@/types/types'
import { persist } from 'zustand/middleware'

type OldUser = {
    _id: string
    first_name: string
    last_name: string
    nick: string
    connected_accounts: string[]
    badges: string[]
    role: string
    image_src: string
}

interface UserStore {
    account_data: UserType | null
    users: any[]
    loading: boolean
}

interface UserActions {
    setAccountData: (data: any) => void
    setUsers: (data: any) => void
    updateUsers: (data: any) => void
}

export const useUserStore = create<UserStore & UserActions>()(
    persist(
        (set) => ({
            account_data: {} as UserType, // Initialize as null
            users: [],
            loading: false,
            setAccountData: async (data) => {
                console.log('account_data', data)
                set({ account_data: data })
            },
            setUsers: (data) => set({ users: data }),
            updateUsers: (data) => set({ users: data }),
        }),
        {
            name: 'user-store', // Local storage key
        }
    )
)
