export type VanillaCraftingGrids =
  | "Workbench"
  | "Inventory"
  | "Furnace"
  | "Blast Furnace"
  | "Smoker"
  | "Stonecutter"
  | "Cartography Table"
  | "Loom"
  | "Smithing Table"
  | "Anvil"
  | "Grindstone"
  | "Enchanting Table"
  | "Brewing Stand"
  | "Crafting Table"
  | "Crafting Table 2x2"
  | "Crafting Table 3x3"
  | "Crafting Table 4x4"
  | "Crafting Table 5x5"
  | "Crafting Table 6x6"
  | "Crafting Table 7x7"
  | "Crafting Table 8x8"
  | "Crafting Table 9x9"
  | "Crafting Table 10x10"
  | "Crafting Table 11x11"
  | "Crafting Table 12x12"
  | "Crafting Table 13x13"
  | "Crafting Table 14x14"
  | "Crafting Table 15x15"
  | "Crafting Table 16x16"
  | "Crafting Table 17x17"
  | "Crafting Table 18x18"
  | "Crafting Table 19x19"
  | "Crafting Table 20x20"
  | "Crafting Table 21x21"
  | "Crafting Table 22x22"
  | "Crafting Table 23x23"
  | "Crafting Table 24x24"
  | "Crafting Table 25x25"
  | "Crafting Table 26x26"
  | "Crafting Table 27x27"
  | "Crafting Table 28x28"
  | "Crafting Table 29x29"
  | "Crafting Table 30x30"
  | "Crafting Table 31x31"
  | "Crafting Table 32x32"
  | "Crafting Table 33x33"
  | "Crafting Table 34x34"
  | "Crafting Table 35x35"
  | "Crafting Table 36x36"
  | "Crafting Table 37x37"
  | "Crafting Table 38x38"
  | "Crafting Table 39x39"
  | "Crafting Table 40x40"
  | "Crafting Table 41x41"
  | "Crafting Table 42x42"
  | "Crafting";

export interface WorkbenchProps {
  items: any;
  final_item: any;
}

export interface InventoryProps {
  items: any;
  final_item: any;
}

export interface FurnaceProps {
  items: any;
  fuel: any;
  final_item: any;
}
