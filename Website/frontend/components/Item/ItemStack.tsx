import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../ui/hover-card";
import { sizzle } from "@cloudinary/url-gen/qualifiers/artisticFilter";
import { trpc } from "@/app/_trpc/client";
import { useEffect } from "react";
import { useParams } from "next/navigation";

interface ItemProps {
  itemName?: string;
  description?: string;
  mod?: string;
  itemTag?: string;
  size?: number;
}

export const ItemSlot = ({
  itemName = "Terrashatterer",
  description = "A powerful pickaxe that can mine any block in the game",
  mod = "botania",
  itemTag = "botania__terra_pick",
  size = 75,
}: ItemProps) => {
  const params = useParams();
  console.log(params?.item_tag);

  const item = trpc.items.getItemByTag.useMutation({});

  useEffect(() => {
    item.mutate(itemTag);
    console.log(item);
  }, []);

  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger>
        <div
          className={`group bg-transparent border-[3px] border-[#464444] rounded-lg w-[${size}px] h-[${size}px] flex justify-center items-center relative z-2 hover:border-white cursor-pointer transition-colors`}
        >
          {!item.isLoading ? (
            <Image
              className="mx-auto"
              alt="controller"
              width={size - 25}
              height={size - 25}
              src={`https://res.cloudinary.com/dzaslaxhw/image/upload/v1709745445/${item?.data?.mod?.tag}/${item?.data?.item_tag}.png`}
            ></Image>
          ) : (
            "L"
          )}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="bg-black w-[400px]">
        {!item.isLoading ? (
          <div className="p-2 flex flex-col gap-y-3">
            <div className="flex gap-2 items-center">
              <Image
                alt="controller"
                width={40}
                height={40}
                src={`https://res.cloudinary.com/dzaslaxhw/image/upload/v1709745445/${mod}/${itemTag}.png`}
              />
              <div className="flex flex-col">
                <h1 className="text-white text-lg">{item?.data?.item_name}</h1>
                <p className="text-blue-500 text-sm">
                  {item?.data?.mod?.modName || "Minecraft"}
                </p>
              </div>
            </div>

            <p className="text-white text-sm">
              {item?.data?.short_description}
            </p>
            {params?.item_tag !== itemTag && (
              <Button
                onClick={() => {
                  window.location.href = `/mods/${mod}/${itemTag}`;
                }}
              >
                View Item
              </Button>
            )}
            {params?.item_tag === itemTag && (
              <Button
                disabled
                className="bg-green-500 text-white"
                variant="ghost"
              >
                Selected
              </Button>
            )}
          </div>
        ) : (
          <p className="text-white">Loading </p>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};
