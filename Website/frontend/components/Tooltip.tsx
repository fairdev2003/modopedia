import Image from "next/image";
import { useState, useRef } from "react";

interface ItemProps {
  itemstack?: any;
  className?: string;
}

export const Tooltip = ({ itemstack, className }: ItemProps) => {
  const [infoPosition, setInfoPosition] = useState({ top: 0, left: 0 });
  const infoRef = useRef(null);

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const { clientX, clientY } = event;
    setInfoPosition({ top: clientY, left: clientX });
  };

  const handleMouseLeave = () => {
    setInfoPosition({ top: 0, left: 0 });
  };

  return (
    <div>
      <div
        ref={infoRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={
          className +
          ` w-[300px] h-[300px] scale-100 hidden group-hover:block absolute -left-[100px] top-[70px] z-10 transition duration-400 group-hover:translate-y-5 animate-in`
        }
      >
        <div className="w-[auto] h-[auto] bg-[#16181c] border-white border-[3px] p-5 rounded-lg overflow-auto">
          <div className="flex gap-4 items-center mb-5">
            <Image
              width={30}
              height={30}
              src={`/mc_assets/${itemstack.item_tag.split("__")[0]}/${itemstack.item_tag}.png`}
              alt="item-icon"
              className="image w-10 h-10 relative"
            ></Image>
            <div>
              <h1 className={`text-md font-[800] text-white`}>
                {itemstack.item_name}
              </h1>
              <p className="text-gray-200 text-sm font-[600]">
                {itemstack ? itemstack.type : "No type provided"}
              </p>
            </div>
          </div>

          <div></div>

          <p className="text-blue-500">{itemstack.mod_name}</p>
        </div>
      </div>
    </div>
  );
};
