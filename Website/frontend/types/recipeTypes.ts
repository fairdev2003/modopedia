import { CraftingType, ItemType } from '@/types/generalTypes'

export type Recipe<T> = {
    _id: string
    itemTag: string
    authorId: string
    craftingTypes: CraftingType[]
    craftingGrid: T
    createdAt: string
    updatedAt: string
}

export type BaseCraftingInfo = {
    name: Uppercase<CraftingType>
    craftingType: CraftingType
}

export type Ingredient = {
    itemName: string
    itemId: string
    itemAmount: number
    // pipeline
    item?: ItemType
}

export type Crafting2 = BaseCraftingInfo & {
    name: 'Crafting2'
    ingredients: Ingredient[]
    result: Ingredient
}

// 3x3 Crafting Grid
export type Crafting3 = BaseCraftingInfo & {
    name: 'Crafting2'
    ingredients: Ingredient[]
    result: Ingredient
}
