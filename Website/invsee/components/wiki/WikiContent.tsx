"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import SliderMenu from "../SliderMenu";
import { getAllItems, searchItems } from "@/actions/itemHelpers";

interface WikiContentProps {
  data: any;
  className?: string;
  section?: string | undefined | null | string[];
}

const sections = [
  { name: "Overview", value: "overview", desc: "Overview of the item" },
  { name: "Crafting", value: "crafting", desc: "Crafting recipe for the item" },
  { name: "Smelting", value: "smelting", desc: "Smelting recipe for the item" },
  { name: "Brewing", value: "brewing", desc: "Brewing recipe for the item" },
  { name: "Usage", value: "usage", desc: "Usage of the item" },
  { name: "History", value: "history", desc: "History of the item" },
  { name: "Trivia", value: "trivia", desc: "Trivia of the item" },
  { name: "Gallery", value: "gallery", desc: "Gallery of the item" },
  { name: "Tutorials", value: "tutorials", desc: "Tutorials of the item" },
  { name: "Links", value: "links", desc: "Links of the item" },
];

export default function WikiContent({
  data,
  className,
  section,
}: WikiContentProps) {
  return (
    <section>
      <SliderMenu item_tag={data.tag_name}></SliderMenu>
      {sections
        ?.filter((s) => s.value === section)
        .map((s, index) => {
          return (
            <div key={index} className={cn("text-white")}>
              <p className="mt-5">{s.desc}</p>
            </div>
          );
        })}
    </section>
  );
}
