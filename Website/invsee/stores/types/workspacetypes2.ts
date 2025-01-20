import { ItemType, ModType, UserType } from '@/types/types'

type WorkspaceState = 'editing' | 'viewing'

type BaseWorkspace = {
    workspaceId: string
    workspaceName: string
    workspaceType: string
    databaseMerged?: string //TODO
    authorId: string
    createdAt: string // timestamp
    updatedAt: string // timestamp
}

type ModWorkspaceActions = {
    resetKey: <ModInterfaceKey extends keyof ModType>(
        key: ModType[ModInterfaceKey]
    ) => void
    removeWorkspace: (workspaceId: string) => void
}

type ModWorkspace = ModType & BaseWorkspace
type ItemWorkspace = ItemType & BaseWorkspace
type UserWorkspace = UserType & BaseWorkspace

const actions: ModWorkspaceActions = {
    resetKey: 'modId',
}
