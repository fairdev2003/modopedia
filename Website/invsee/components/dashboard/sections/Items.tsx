import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PaginationComponent from "@/components/PaginationComponent";
import { Edit, Trash, ZoomOut } from "lucide-react";
import { Popover } from "@/components/ui/popover";
import {
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { AddItemModal } from "../Modal";

const handleDeafultImage = (e: any) => {
  e.target.src = "deafult.png";
};

export default function Items() {
  const [items, setItems] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [section, setSection] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [mods, setMods] = useState<any>([]);

  const [querymod, setQuerymod] = useState<any>([]);

  const pagination_items = 5;

  const searchParams = useSearchParams() as any;

  const [nameRef, mod_tagRef, descriptionRef, searchRef] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLTextAreaElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleDeleteItem = async (item_tag: string) => {
    const response = await axios.delete(`/api/items?item_tag=${item_tag}`);

    console.log("Successfully deleted" + response);
  };

  const [key, setKey] = useState(0);

  const router = useRouter();

  const divRef = useRef<HTMLDivElement>(null);

  const getallItems = async () => {
    setLoading(true);

    try {
      const response = await axios.get("/api/items");
      setItems(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const Search = async (query: any) => {
    try {
      const response = await axios.get(`/api/items/search?query=${query}`);
      setItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const Paginate = (
    items: any,
    page: number = 1,
    per_page: number = pagination_items,
  ) => {
    const offset = (page - 1) * per_page;
    const paginatedItems = items.slice(offset).slice(0, per_page);
    return paginatedItems;
  };

  const getPageCount = (items: any, per_page: number = pagination_items) => {
    return Math.ceil(items.length / per_page);
  };

  const handleDeafultImage = (e: any) => {
    e.target.src = "deafult.png";
  };

  useEffect(() => {
    getallItems();
  }, []);

  useEffect(() => {
    if (searchParams.has("page")) {
      setPage(parseInt(searchParams.get("page")));
    }
    if (searchParams.has("section")) {
      setSection(searchParams.get("section"));
    }
  }, [searchParams]);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [page]);

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 items-center">
        <AddItemModal className="bg-[#32343a]">s</AddItemModal>
        <div className="flex gap-3 items-center h-7 rounded-md bg-[#32343a] py-6 px-3 text-white font-[500] w-auto">
          <ZoomOut size={35} />
          <input
            ref={searchRef}
            className="bg-transparent outline-none w-full"
            type="text"
            placeholder="Search..."
            onChange={(input) => {
              if (input.currentTarget.value === "") {
                getallItems();
              } else {
                Search(input.currentTarget.value);
                setPage(1);
                router.push(`${window.location.pathname}?page=1&section=items`);
              }
            }}
          ></input>
        </div>
      </div>

      <div className="flex gap-x-4 items-center mt-5"></div>
      <div ref={divRef}>
        <div className="flex flex-col gap-5 h-auto mt-5">
          {loading === false ? (
            Paginate(items, page).map((item: any, number: number) => {
              return (
                <div
                  className="flex gap-5 justify-between items-center bg-gray-900/80 rounded-md p-5"
                  key={item.tag_name}
                >
                  <div className="flex gap-5 items-center">
                    <Image
                      src={
                        item.tag_name !== "minecraft__air"
                          ? `/mc_assets/${item.tag_name.split("__")[0]}/${
                              item.tag_name
                            }.png`
                          : "/deafult.png"
                      }
                      alt="item_image"
                      className="w-10 h-10"
                      width={50}
                      height={50}
                      onError={(event) => {
                        return handleDeafultImage(event);
                      }}
                    ></Image>
                    <div>
                      <h1
                        className="text-white font-medium hover:underline cursor-pointer"
                        onClick={() => {
                          window.location.href = `/wiki/item/${item.tag_name}?&section=crafting`;
                        }}
                      >
                        {item.item_name}
                      </h1>
                      <p className="text-blue-500 text-sm hover:underline cursor-pointer">
                        {item.mod[0] ? item.mod[0].mod_name : "Minecraft"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-x-2">
                    <Dialog
                      onOpenChange={async () => {
                        const response = await axios.get(`/api/mods`);

                        setMods(response.data);
                      }}
                    >
                      <DialogTrigger>
                        <button className="bg-green-500 text-white rounded-md p-2 font-[600]">
                          <Edit />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="bg-[#26292f] p-7">
                        <div className="text-white font-medium flex items-center gap-x-4">
                          <Image
                            width={40}
                            height={40}
                            alt={item.tag_name}
                            src={
                              item.tag_name != "minecraft__air"
                                ? `/mc_assets/${item.tag_name.split("__")[0]}/${
                                    item.tag_name
                                  }.png`
                                : "deafult.png"
                            }
                            onError={(event) => {
                              handleDeafultImage(event);
                            }}
                          ></Image>
                          <div className="flex flex-col">
                            <p>{item.item_name}</p>
                            <p className="text-sm text-blue-500">
                              {item.mod[0] ? item.mod[0].mod_name : "Minecraft"}
                            </p>
                          </div>
                        </div>
                        <DialogDescription className="text-gray-400">
                          You can edit this item here. If you want tutorial
                          about adding new mods please refer to this page:{" "}
                          <Link
                            href="https://www.google.pl"
                            className="text-blue-500 underline"
                          >
                            Tutorial Page
                          </Link>
                          . To add custom crafting to the item you need to
                          create this in other section named{" "}
                          <Link
                            href={window.location.href}
                            className="text-blue-500 underline"
                          >
                            crafting
                          </Link>
                        </DialogDescription>

                        <div className="flex gap-x-4 items-center justify-center">
                          <p className="text-white font-medium flex justify-center w-[100px]">
                            Item Name
                          </p>
                          <div className="flex gap-3 items-center h-7 rounded-md bg-[#32343a] py-6 px-3 text-white font-[500] w-[300px]">
                            <input
                              ref={nameRef}
                              className="bg-transparent outline-none w-full"
                              type="text"
                              placeholder={item.item_name}
                            ></input>
                          </div>
                        </div>

                        <div className="flex gap-x-4 items-center justify-center">
                          <p className="text-white font-medium flex justify-center w-[100px]">
                            Mod Tag
                          </p>
                          <div className="flex gap-3 items-center h-7 rounded-md bg-none py-6 px-3 text-white font-[500] w-[300px]">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="secondary">
                                  {item.mod[0]
                                    ? item.mod[0].mod_name
                                    : "Minecraft"}
                                </Button>
                              </PopoverTrigger>

                              <PopoverContent sideOffset={5} alignOffset={5}>
                                <div className="flex flex-col gap-3 p-3 bg-[#1c1d20] rounded-md">
                                  <p className="text-white font-medium">
                                    Mod Tag
                                  </p>
                                  <input
                                    className="bg-transparent outline-none w-full"
                                    type="text"
                                    placeholder={item.mod_tag}
                                    onChange={async (e) => {
                                      if (e.currentTarget.value === "") {
                                        const response: any =
                                          await axios.get(`/api/mods`);

                                        setMods(response.data);
                                      } else {
                                        const response: any = await axios.post(
                                          `/api/mods/search`,
                                          { query: e.currentTarget.value },
                                        );

                                        setMods(response.data);
                                      }
                                    }}
                                  ></input>
                                  <div className="flex flex-col gap-1 overflow-y-scroll h-[90px] w-[500px]">
                                    {mods
                                      ? mods.map((mod: any) => {
                                          return (
                                            <PopoverClose
                                              onClick={() => {
                                                setQuerymod(mod);
                                              }}
                                            >
                                              {mod.mod_name}
                                            </PopoverClose>
                                          );
                                        })
                                      : "No mods found"}
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>

                        <DialogDescription></DialogDescription>

                        <div className="flex gap-x-4 items-center justify-center">
                          <p className="text-white font-medium flex justify-center w-[100px]">
                            Description
                          </p>
                          <div className="flex gap-3 items-center rounded-md bg-[#32343a] text-white font-[500] w-[300px] h-auto">
                            <textarea
                              ref={descriptionRef}
                              className="bg-transparent w-full h-full outline-none mx-3 my-6 max-h-[300px] min-h-[50px]"
                              placeholder="Description..."
                            />
                          </div>
                        </div>

                        <DialogDescription className="text-gray-400">
                          Provide some short desription to this item. More words
                          can be added in{" "}
                          <Link
                            href="https://www.google.pl"
                            className="text-blue-500 underline"
                          >
                            Wiki Section
                          </Link>
                          . For more info please visit this site{" "}
                          <Link
                            href="https://www.google.pl"
                            className="text-blue-500 underline"
                          >
                            Tutorial Page
                          </Link>
                        </DialogDescription>
                        <DialogClose>
                          <Button
                            variant="secondary"
                            onClick={async () => {
                              const data_to_update: any = {
                                tag_name: item.tag_name,
                                update_data: {
                                  item_name:
                                    nameRef.current?.value != ""
                                      ? nameRef.current?.value
                                      : item.item_name,
                                  mod_tag: querymod
                                    ? querymod.mod_tag
                                    : item.mod_tag,
                                  short_description:
                                    descriptionRef.current?.value != ""
                                      ? descriptionRef.current?.value
                                      : item.short_description,
                                },
                              };

                              await axios.post(
                                `/api/items/update/${item.tag_name}`,
                                data_to_update,
                              );
                              setItems([]);
                              if (searchRef.current?.value) {
                                Search(searchRef.current?.value);
                              } else {
                                getallItems();
                              }
                            }}
                          >
                            Submit
                          </Button>
                        </DialogClose>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger>
                        <button className="bg-red-500 rounded-lg p-2 flex gap-1 font-[500] text-white outline-red-500">
                          <Trash />
                        </button>
                      </DialogTrigger>

                      <DialogContent className="">
                        <DialogHeader>Are u sure?</DialogHeader>

                        <DialogClose
                          onClick={() => {
                            handleDeleteItem(item.tag_name);
                          }}
                        >
                          Delete
                        </DialogClose>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              {items.length ? (
                <div className="flex flex-col gap-4 justify-center items-center mt-10">
                  <span className="loader3"></span>
                  <p className="text-white">Loading Items...</p>
                </div>
              ) : (
                <div>
                  <p className="text-white text-3xl">No items found</p>
                </div>
              )}
            </div>
          )}
          <PaginationComponent items={items} getPageCount={getPageCount} />
        </div>
      </div>
    </div>
  );
}
