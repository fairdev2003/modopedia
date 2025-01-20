import { CraftingBig } from "./crafting_components/CraftingBig";
import { CraftingSmall } from "./crafting_components/CraftingSmall";

interface Props {
  crafting_type: string;
  crafting: any;
}

const CraftingSelect = ({ crafting_type, crafting }: Props) => {
  return (
    <section>
      {crafting_type === "minecraft_crafting_4" ? (
        <CraftingBig crafting={crafting}></CraftingBig>
      ) : null}
      {crafting_type === "minecraft_crafting_2" ? (
        <CraftingSmall crafting={crafting}></CraftingSmall>
      ) : null}
    </section>
  );
};

export default CraftingSelect;
