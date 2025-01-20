import { Item } from "@radix-ui/react-select";
import { ItemSlot } from "../Item/ItemStack";
import { ArrowRight } from "lucide-react";

export type {
  FurnaceProps,
  WorkbenchProps,
  InventoryProps,
} from "./types/VanillaTypes";

const Workbench = () => {
  return (
    <div className="flex items-center">
      <div className="grid grid-cols-3 w-[250px] gap-y-2">
        <ItemSlot
          itemName="ME Controller"
          itemTag="ae2__controller"
          mod="ae2"
        />
        <ItemSlot
          itemName="ME Controller"
          itemTag="ae2__controller"
          mod="ae2"
        />
        <ItemSlot
          itemName="ME Controller"
          itemTag="ae2__controller"
          mod="ae2"
        />
        <ItemSlot
          itemName="ME Controller"
          itemTag="ae2__controller"
          mod="ae2"
        />
        <ItemSlot
          itemName="ME Controller"
          itemTag="ae2__controller"
          mod="ae2"
        />
        <ItemSlot
          itemName="ME Controller"
          itemTag="ae2__controller"
          mod="ae2"
        />
        <ItemSlot
          itemName="ME Controller"
          itemTag="ae2__controller"
          mod="ae2"
        />
        <ItemSlot
          itemName="ME Controller"
          itemTag="ae2__controller"
          mod="ae2"
        />
        <ItemSlot
          itemName="ME Controller"
          itemTag="ae2__controller"
          mod="ae2"
        />
      </div>
      <ArrowRight size={50} className="mr-4 ml-3" />
      <ItemSlot itemName="ME Controller" itemTag="ae2__controller" mod="ae2" />
    </div>
  );
};

const Inventory = () => {
  return (
    <div className="flex items-center">
      <div className="grid grid-cols-2 w-[170px] gap-y-2">
        <ItemSlot
          itemName="ME Controller"
          itemTag="ae2__controller"
          mod="ae2"
        />
        <ItemSlot
          itemName="ME Controller"
          itemTag="ae2__controller"
          mod="ae2"
        />
        <ItemSlot
          itemName="ME Controller"
          itemTag="ae2__controller"
          mod="ae2"
        />
        <ItemSlot
          itemName="ME Controller"
          itemTag="ae2__controller"
          mod="ae2"
        />
      </div>
      <ArrowRight size={50} className="mr-4 ml-3" />
      <ItemSlot itemName="ME Controller" itemTag="ae2__controller" mod="ae2" />
    </div>
  );
};

const Furnace = () => {
  return (
    <div className="flex items-center">
      <div className="flex flex-col gap-y-10">
        <ItemSlot
          itemName="Iron Ore"
          itemTag="minecraft__iron_ore"
          mod="minecraft"
        />
        <ItemSlot itemName="Coal" itemTag="minecraft__coal" mod="minecraft" />
      </div>
      <ArrowRight size={50} className="mr-4 ml-3" />
      <ItemSlot
        itemName="Iron Ingot"
        itemTag="minecraft__iron_ingot"
        mod="minecraft"
      />
    </div>
  );
};

export { Workbench, Inventory, Furnace };
