type Enchantments<T extends string> = {
  [K in `${"minecraft" | "ae2"}:${T[0]}`]: string;
};

export const EnchantmentsDictonary: Enchantments<string> = {
  "minecraft:mending": "Mending",
  "minecraft:sharpness": "Sharpness",
  "minecraft:unbreaking": "Unbreaking",
  "minecraft:efficiency": "Efficiency",
  "minecraft:fortune": "Fortune",
  "minecraft:silk_touch": "Silk Touch",
  "minecraft:lure": "Lure",
  "minecraft:luck_of_the_sea": "Luck of the Sea",
  "minecraft:sweeping": "Sweeping Edge",
  "minecraft:fire_aspect": "Fire Aspect",
  "minecraft:looting": "Looting",
  "minecraft:knockback": "Knockback",
  "minecraft:smite": "Smite",
  "minecraft:bane_of_arthropods": "Bane of Arthropods",
  "minecraft:protection": "Protection",
  "minecraft:thorns": "Thorns",
  "ae2:grind": "Grind",
};

export const NumberFormula: any = {
  "1": "",
  "2": "II",
  "3": "III",
  "4": "IV",
  "5": "V",
  "6": "VI",
  "7": "VII",
  "8": "VII",
  "9": "IX",
  "10": "X",
};
