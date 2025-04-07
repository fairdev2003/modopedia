import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { trpc } from "@/app/_trpc/client";
import { set } from "mongoose";
import { Mod, User } from "@prisma/client";

const pagination_items = 5;

type Moditem = {
  author: User;
} & Mod;

export default function Mods() {
  const [mods, setMods] = useState<any>([]);
  const [page, setPage] = useState(1);

  const divRef = useRef<HTMLDivElement>(null);
  const mod = trpc.mods.getMods.useQuery();
  console.log(mod.data);

  const getallmods = () => {
    setMods(mod.data);
    console.log(mod.data?.data);
  };

  const Paginate = (
    items: any,
    page: number = 1,
    per_page: number = pagination_items,
  ) => {
    const offset = (page - 1) * per_page;
    const paginatedItems = mod.data?.data.slice(offset).slice(0, per_page);
    return paginatedItems;
  };

  const getPageCount = (mods: any, per_page: number = pagination_items) => {
    // @ts-ignore
    return Math.ceil(mod?.data?.count / per_page);
  };

  useEffect(() => {
    if (mod.data) {
      getallmods();
    }
  }, [mod]);

  return (
    <div>
      <h1 className="text-2xl text-white font-[600]">Mods</h1>
      <div ref={divRef} className="flex flex-col gap-5 mt-5">
        {mod && mod.data?.data.length ? (
          // @ts-ignore
          Paginate(mods, page).map((item: Moditem) => {
            return (
              <div className="flex gap-5 justify-between items-center bg-slate-500/20 rounded-md p-5">
                <div className="flex gap-5 items-center">
                  <Image
                    src={item.image_src}
                    alt="mod_image"
                    width={50}
                    height={50}
                    className="rounded-md"
                  ></Image>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-white font-medium">{item.modName}</h1>
                    <p className="text-gray-400">{item.author.nick}</p>
                  </div>
                </div>
                <div className="flex gap-x-2">
                  <button className="bg-green-500 text-white rounded-md px-4 py-2 font-[600]">
                    Edit
                  </button>
                  <button
                    className="bg-blue-500 text-white rounded-md px-4 py-2 font-[600]"
                    onClick={() => {
                      window.location.href = `/wiki/item/botania__terra_pick?&section=crafting`;
                    }}
                  >
                    View
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col gap-4 justify-center items-center mt-10">
            <span className="loader3"></span>
            <p className="text-white">Loading Mods...</p>
          </div>
        )}
        <Pagination>
          <PaginationContent>
            {!mod.isLoading
              ? Array.from({ length: getPageCount(mods) }).map((_, index) => {
                  return (
                    <PaginationItem key={index} className="cursor-pointer ">
                      <PaginationLink
                        onClick={() => {
                          setPage(index + 1);
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }}
                        isActive={index === page - 1}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })
              : null}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
