import React from "react";
import { CraftingBig } from "./CraftingBig";
import { CraftingSmall } from "./CraftingSmall";
import CraftingSelect from "../CraftingSelect";

interface Props {
  section: string;
  data: any;
}

function Content({ section, data }: Props) {
  return (
    <section>
      {section === "crafting" && data.length > 0 ? (
        <div>
          {data.map((item: any) => {
            return (
              <CraftingSelect
                crafting_type={item.crafting_type}
                crafting={item}
              ></CraftingSelect>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}

export default Content;
