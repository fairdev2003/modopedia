"use client";

import { CgFormatColor } from "react-icons/cg";
import { FaTags, FaTrash } from "react-icons/fa";
import { BinaryIcon, PlusIcon } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Page = () => {
  const [tags, settags] = useState<any>([]);
  const [tag_input, set_tag_input] = useState<string>("");
  const [error, seterror] = useState<string>("");
  const [buttondisabled, setbuttondisabled] = useState<boolean>(false);

  const deleteTag = (number: number) => {
    let map: any = [];
    tags.map((item: string, num: number) => {
      if (num !== number) {
        map.push(item);
      }
    });
    settags(map);
  };

  useEffect(() => {
    if (tag_input.length <= 20) {
      seterror("");
      setbuttondisabled(false);
    }
    if (tag_input.length > 20) {
      setbuttondisabled(true);
    }
  }, [tag_input]);

  return (
    <section className="flex justify-center bg-[#26292f] p-10">
      <form className="flex flex-col">
        <h1 className="text-2xl text-white font-[600] mb-5">Create New Item</h1>
        <h2 className="text-xl text-white font-[500] mb-2">Item name:</h2>
        <div className="flex gap-3 items-center mb-5 h-10 rounded-md bg-[#32343a] py-6 px-3 text-white font-[600] w-[600px]">
          <CgFormatColor className="text-xl" />
          <input className="bg-transparent outline-none w-full"></input>
        </div>
        <h2 className="text-xl text-white font-[500] mb-2">Item Tag:</h2>
        <div className="flex gap-3 items-center mb-5 h-10 rounded-md bg-[#32343a] py-6 px-3 text-white font-[600] w-[600px]">
          <FaTags className="text-xl" />
          <input className="bg-transparent outline-none w-full"></input>
        </div>
        <h2 className="text-xl text-white font-[500] mb-2">Mod name:</h2>
        <div className="flex gap-3 items-center mb-5 h-10 rounded-md bg-[#32343a] py-6 px-3 text-white font-[600] w-[600px]">
          <FaTags className="text-xl" />
          <input className="bg-transparent outline-none w-full"></input>
        </div>
        <h2 className="text-xl text-white font-[500] mb-2">Mod Tag:</h2>
        <div className="flex gap-3 items-center mb-5 h-10 rounded-md bg-[#32343a] py-6 px-3 text-white font-[600] w-[600px]">
          <FaTags className="text-xl" />
          <input className="bg-transparent outline-none w-full"></input>
        </div>
        <h2 className="text-xl text-white font-[500] mb-2">Tags:</h2>
        <div className="w-[500px] flex flex-wrap gap-3 grow mt-5">
          {tags && tags.length > 0
            ? tags.map((item: any, number: number) => {
                return (
                  <div
                    className="group bg-green-500 font-[500] transition-colors duration-500 border-green-700 border-[1px] hover:bg-red-500 hover:border-red-700 min-w-[200px] truncate h-[40px] rounded-full p-4 text-white flex justify-center items-center cursor-pointer select-none"
                    onClick={() => {
                      deleteTag(number);
                    }}
                  >
                    <div className="w-[200px] flex justify-center">
                      <p className="hidden group-hover:flex transition-transform gap-2 items-center">
                        <FaTrash /> Delete
                      </p>
                      <p className="flex group-hover:hidden relative">{item}</p>
                    </div>
                  </div>
                );
              })
            : null}
          <Dialog>
            <DialogTrigger className="bg-[#32343a] hover:bg-[#232529] w-[150px] px-1 rounded-full h-[40px] text-white">
              + Add Tag
            </DialogTrigger>
            <DialogContent className="bg-[#32343a]">
              <DialogHeader>
                <h2 className="text-md text-white font-[500] mb-5">
                  Tag Name:
                </h2>
                <div className="flex gap-2 mt-[40px]">
                  <div className="flex gap-3 items-center h-10 rounded-md bg-[#232429] py-6 px-3 text-white font-[600] w-full">
                    <FaTags className="text-xl" />
                    <input
                      onChange={(input) => {
                        const input_value: any = input.target.value;
                        if (input_value.length > 20) {
                          seterror("Max Tag length is 20");
                        } else {
                          set_tag_input(input_value);
                        }
                      }}
                      className="bg-transparent outline-none w-full"
                    ></input>
                  </div>

                  <DialogClose asChild>
                    <Button
                      disabled={buttondisabled}
                      onClick={() => {
                        set_tag_input("");
                        if (tag_input.length > 0) {
                          settags([...tags, tag_input]);
                        }
                      }}
                      className="h-12 transition-colors"
                    >
                      Add
                    </Button>
                  </DialogClose>
                </div>
                <p className="text-red-500 text-sm font-[500]">{error}</p>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </form>
    </section>
  );
};

export default Page;
