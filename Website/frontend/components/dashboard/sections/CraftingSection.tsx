import { CraftingBig } from "@/components/crafting_components/CraftingBig";
import { CraftingSmall } from "@/components/crafting_components/CraftingSmall";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CraftingSection() {
  const [craftings, setCraftings] = useState<any>([]);

  const getallCraftings = async () => {
    try {
      const response = await axios.get("/api/craftings");
      setCraftings(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    getallCraftings();
  }, []);

  return (
    <div className="">
      <h1 className="text-2xl text-white font-[600]">Crafting Section</h1>
      <div>
        {craftings && craftings.length > 0
          ? craftings.map((crafting: any) => {
              return (
                <div>
                  {crafting.crafting_type === "minecraft_crafting_4" ? (
                    <CraftingBig crafting={crafting}></CraftingBig>
                  ) : null}
                  {crafting.crafting_type === "minecraft_crafting_2" ? (
                    <CraftingSmall crafting={crafting}></CraftingSmall>
                  ) : null}
                </div>
              );
            })
          : "Loading..."}
      </div>
    </div>
  );
}
