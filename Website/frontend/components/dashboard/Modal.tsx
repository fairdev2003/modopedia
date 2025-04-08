'use client';

import { DialogClose, DialogTrigger } from '@radix-ui/react-dialog';
import { Dialog, DialogContent } from '../ui/dialog';
import { Plus, PlusCircle, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BsSearch } from 'react-icons/bs';
import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useRef, useState } from 'react';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

interface AddItemModalProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export const AddItemModal = ({ children, className, color }: AddItemModalProps) => {
  const [error, setError] = useState<string>('');

  const [itemNameRef, TagNameRef, descriptionRef] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLTextAreaElement>(null),
  ];

  const handleAddItem = async () => {
    if (
      itemNameRef.current?.value.length === 0 &&
      TagNameRef.current?.value.length === 0 &&
      descriptionRef.current?.value.length === 0
    ) {
      if (
        TagNameRef.current?.value.includes(':') === false ||
        TagNameRef.current?.value.includes('__') === false
      ) {
        setError('Mod Tag should contain a colon and an underscore');
        return;
      }
      setError('All fields are required');
      return;
    } else {
      const item = {
        item_name: itemNameRef.current?.value,
        mod_tag: TagNameRef.current?.value,
        description: descriptionRef.current?.value,
      };
      console.log(item);
      console.log('All fields are filled');
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <button className="flex gap-1 rounded-lg bg-green-500 p-2 pr-3 font-[500] text-white outline-red-500">
          <Plus />
          Add New Item
        </button>
      </DialogTrigger>

      <DialogContent className={cn('', className)}>
        <div className="flex items-center justify-start gap-x-3">
          <p className="font-medium text-white">Add New Item!</p>
        </div>
        <div className="mb-5 flex flex-col items-center gap-5">
          <div className="flex items-center justify-center gap-x-4">
            <p className="flex w-[100px] justify-center font-medium text-white">Item Name</p>
            <div className="flex h-7 w-[300px] items-center gap-3 rounded-md bg-[#32343a] px-3 py-6 font-[500] text-white">
              <input
                ref={itemNameRef}
                className="w-full bg-transparent outline-none"
                type="text"
                placeholder={'Your Item Name'}
              ></input>
            </div>
          </div>

          <div className="flex items-center justify-center gap-x-4">
            <p className="flex w-[100px] justify-center font-medium text-white">Mod Tag</p>
            <div className="flex h-7 w-[300px] items-center gap-3 rounded-md bg-[#32343a] px-3 py-6 font-[500] text-white">
              <input
                ref={TagNameRef}
                className="w-full bg-transparent outline-none"
                type="text"
                placeholder={'Your Item Name'}
              ></input>
            </div>
          </div>
          <div className="flex items-center justify-center gap-x-4">
            <p className="flex w-[100px] justify-center font-medium text-white">Description</p>
            <div className="flex h-auto w-[300px] items-center gap-3 rounded-md bg-[#32343a] font-[500] text-white">
              <textarea
                ref={descriptionRef}
                className="mx-3 my-6 h-full max-h-[300px] min-h-[50px] w-full bg-transparent outline-none"
                placeholder="Description..."
              />
            </div>
          </div>
        </div>
        <button onClick={handleAddItem}>Submit</button>
      </DialogContent>
    </Dialog>
  );
};

interface DeleteItemModalProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  item_tag: string;
}
