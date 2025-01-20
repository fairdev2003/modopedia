import { Recipe } from '@/types/recipeTypes'

export type ItemType<RecipeType = any[]> = {
    _id: string
    item_name: string
    item_tag: string
    authorId: string
    stack_size: number
    modId: string
    type: string
    material_value: number
    short_description: string
    createdAt: string
    updatedAt: string

    // pipelines
    mod?: ModType
    recipes?: Recipe<RecipeType>[]
    author?: UserType
}
/**
 * Mod type
 */
export type ModType = {
    _id: string
    modName: string
    tag: string
    userId: string
    modDescription: string
    modLoaders: ImplementedModLoaders[]
    image_src: string
    updatedAt: string
    createdAt: string

    // pipelines
    user?: UserType
}

export const ImplementedModLoadersArray = [
    'Babric',
    'Fabric',
    'Legacy Fabric',
    'Cursed Fabric',
    'Minecraft Forge',
    'Forge',
    'NeoForge',
    'Quilt',
    'Meddle',
    'Rift',
    "Risugami's Modloader",
]

export type ImplementedModLoaders = (typeof ImplementedModLoadersArray)[number]

export type SearchBarResponse = {
    items: ItemType[]
    mods: ModType[]
    links: string[]
}

export type UserType = {
    _id: string
    userId: string
    nick: string
    firstName: string
    lastName: string
    email: string
    password: string
    image: string
    role: string
    createdAt: string
    updatedAt: string
    backgroundImage: string
}

export type TokenData = string

export type Options = {
    perms?: {
        isAdmin: boolean
        isMod: boolean
        isEditor: boolean
        isCreator: boolean
    }
}

export type GoodServerResponse<T = undefined> = T extends TokenData
    ? {
          code: number
          message: string
          token?: T
      }
    : T extends Options
      ? {
            code: number
            message: string
            options?: T
        }
      : {
            code: number
            message: string
        }

export type ErrorServerResponse = {
    code: number
    message: string
    error: string
}

export type AccessPower = 'user' | 'secure' | 'admin'

const ImplementedCraftingTypes = [
    'crafting2',
    'crafting3',
    'furnace',
    'blasting',
    'smoking',
]

export type CraftingType = (typeof ImplementedCraftingTypes)[number]
