"use client";

import React from "react";

import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { data, isLoading } = trpc.user.getUserByEmail.useQuery(
    "kubaklimkiewicz1@gmail.com",
    {
      onSuccess: (data) => {
        console.log(data);
      },
    },
  );

  const allusers = trpc.user.getAllUsers.useQuery();

  const toods = trpc.getUsers.useQuery();
  const add_user = trpc.getDate.useMutation({
    onSettled: () => {
      toods.refetch();
    },
  });

  const todoFunc = async () => {
    await add_user.mutateAsync({ name: `${new Date()}`, id: 1 });
  };

  return (
    <section className="p-10 flex flex-col gap-y-6 text-white">
      <div>
        <h1>{data?.nick}</h1>
        <h1>{data?.firstname}</h1>
        <h1>{data?.lastname}</h1>
      </div>
      <div>
        {allusers.data?.map((user: any) => {
          return (
            <h1 className="text-white" key={user.id}>
              {user.email}
            </h1>
          );
        })}
      </div>
      <Button className="w-[300px]" variant="secondary" onClick={todoFunc}>
        Add user
      </Button>
    </section>
  );
};

export default Page;
