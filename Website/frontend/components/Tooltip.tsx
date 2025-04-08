import Image from 'next/image';
import { useState, useRef } from 'react';

interface ItemProps {
  itemstack?: any;
  className?: string;
}

export const Tooltip = ({ itemstack, className }: ItemProps) => {
  const [infoPosition, setInfoPosition] = useState({ top: 0, left: 0 });
  const infoRef = useRef(null);

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
          ` duration-400 absolute -left-[100px] top-[70px] z-10 hidden h-[300px] w-[300px] scale-100 transition animate-in group-hover:block group-hover:translate-y-5`
        }
      >
        <div className="h-[auto] w-[auto] overflow-auto rounded-lg border-[3px] border-white bg-[#16181c] p-5">
          <div className="mb-5 flex items-center gap-4">
            <Image
              width={30}
              height={30}
              src={`/mc_assets/${itemstack.item_tag.split('__')[0]}/${itemstack.item_tag}.png`}
              alt="item-icon"
              className="image relative h-10 w-10"
            ></Image>
            <div>
              <h1 className={`text-md font-[800] text-white`}>{itemstack.item_name}</h1>
              <p className="text-sm font-[600] text-gray-200">
                {itemstack ? itemstack.type : 'No type provided'}
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
