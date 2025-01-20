import Image from "next/image";
import { Tooltip } from "./Tooltip";
import Link from "next/link";

interface ItemProps {
  itemstack?: any;
  count?: number;
  blocked?: boolean;
}

export const ItemStack = ({ itemstack, count, blocked }: ItemProps) => {
  const handleDeafultImage = (event: any) => {
    event.target.src = "deafult.png";
  };

  return (
    <Link href={`/wiki/item/${itemstack.item_tag}?section=overview`}>
      <div
        className={`group bg-transparent border-[3px] border-[#464444] rounded-lg w-[75px] h-[75px] flex justify-center items-center relative z-2 ${
          itemstack.item_tag && itemstack.item_tag != "minecraft__air"
            ? "cursor-pointer hover:border-white transition-colors"
            : null
        }`}
      >
        {itemstack.item_tag && itemstack.item_tag != "minecraft__air" ? (
          <Image
            width={50}
            height={50}
            alt="item_stack"
            src={`/mc_assets/${itemstack.item_tag.split("__")[0]}/${itemstack.item_tag}.png`}
            className=""
            onError={(event) => {
              handleDeafultImage(event);
            }}
          ></Image>
        ) : null}
        {count && count > 1 ? (
          <p className="absolute z-2 bottom-1 right-3 text-lg text-white font-[600]">
            {count}
          </p>
        ) : null}
        {itemstack.item_tag &&
        itemstack.item_tag != "minecraft__air" &&
        !blocked ? (
          <Tooltip itemstack={itemstack} />
        ) : null}
      </div>
    </Link>
  );
};
