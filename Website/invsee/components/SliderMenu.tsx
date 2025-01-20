import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface SliderProps {
  item_tag: string;
}

const Sections = [
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

const SliderMenu = ({ item_tag }: SliderProps) => {
  const searchParams: any = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [section, setsection] = useState<string>("");

  useEffect(() => {
    if (searchParams.has("section")) {
      setsection(searchParams.get("section"));
    } else {
      setsection("overview");
      router.push(`${pathname}?section=overview`);
    }
  }, [searchParams]);

  return (
    <div>
      <div className="flex gap-5">
        {Sections.map((s, index) => {
          return (
            <div
              key={index}
              className={`text-white cursor-pointer hover:text-blue-500 transition-all duration-300 ease-in-out select-none`}
              onClick={() => {
                router.push(`${pathname}?section=${s.value}`);
              }}
            >
              {s.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SliderMenu;
