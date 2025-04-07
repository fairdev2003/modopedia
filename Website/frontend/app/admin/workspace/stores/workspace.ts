import { create } from 'zustand'
import type { WorkspaceActions } from '@/stores/types/workspaceTypes'
import { persist } from 'zustand/middleware'
import type { Mod } from '@prisma/client'
import { UserType } from '@/types/types'

type workspaceStoreProps = {
    user: UserType | null
}

export const useWorkspaceStore = create<workspaceStoreProps>()(
    persist(
        (set) => ({
            user: null,
        }),
        { name: 'workspaces' }
    )
)
