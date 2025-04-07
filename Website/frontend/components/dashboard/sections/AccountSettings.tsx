import Image from "next/image";
import { useUserStore } from "@/stores/user_store";
import { Crown, Hammer, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function AccountSettings() {
  const [loadingUpdate, setloadingUpdate] = useState<boolean>(false);

  const { account_data, setAccountData } = useUserStore();

  const [first_nameRef, last_nameRef, nick_nameRef] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const user = trpc.user.updateUserData.useMutation({
    onSuccess: () => {
      toast(`The user with email ${account_data[0].email} has been updated!`, {
        duration: 5000,
        closeButton: true,
      });
      setloadingUpdate(false);
    },
  });

  const keydownFunc = (e: any) => {
    if (e.key === "Enter" && !loadingUpdate) {
      handleUpdate();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keydownFunc);
  }, []);

  const handleUpdate = () => {
    setloadingUpdate(true);
    setTimeout(() => {
      const first_name: string = first_nameRef?.current?.value as string;
      const last_name: string = last_nameRef?.current?.value as string;
      const nick: string = nick_nameRef?.current?.value as string;
      const role = account_data[0].role;
      const email = account_data[0].email;
      user.mutate({
        email,
        data: {
          first_name,
          last_name,
          nick,
          role,
        },
      });
      setAccountData([
        {
          ...account_data[0],
          first_name,
          last_name,
          role,
          nick,
        },
      ]);
    }, 2000);
  };

  return (
    <section>
      {account_data ? (
        <div>
          <h1 className="text-2xl text-white font-[600]">Account Seetings</h1>
          <div className="border-[2px] border-gray-900/50 bg-none h-[150px] w-full mt-5 rounded-lg flex flex-wrap gap-x-5 items-center p-5 px-7">
            <div className="relative">
              <Image
                alt="profile image"
                src={
                  account_data[0]?.image_src ||
                  "https://res.cloudinary.com/dzaslaxhw/image/upload/v1709757036/users/deafult.avif"
                }
                height={100}
                width={100}
                className="rounded-lg"
              ></Image>
            </div>

            <div>
              <p className="text-white font-[600] text-xl">
                {account_data.length > 0 ? account_data[0].nick : null}
              </p>
              <p className="text-blue-500 font-[400] text-md">
                {account_data.length > 0 ? account_data[0].first_name : null}{" "}
                {account_data.length > 0 ? account_data[0].last_name : null}
              </p>

              <div className="flex gap-1">
                {account_data.length > 0 &&
                account_data[0].role === "Editor" ? (
                  <Hammer className="text-orange-400 w-5 h-5" />
                ) : null}
                {account_data.length > 0 && account_data[0].role === "Mod" ? (
                  <Star className="text-orange-400 w-5 h-5" />
                ) : null}
                {account_data.length > 0 && account_data[0].role === "Admin" ? (
                  <Crown className="text-orange-400 w-5 h-5" />
                ) : null}
                <p className="text-white font-[400] text-sm">
                  {account_data.length > 0 ? account_data[0].role : null}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-none border-[2px] border-gray-900/50 h-auto w-full mt-5 rounded-lg flex flex-col gap-y-5 p-5 px-7">
            <h1 className="text-2xl text-white font-[600]">
              Basic Information
            </h1>
            <p className=""></p>
            <input
              ref={first_nameRef}
              className="border-[2px] p-3 text-white rounded-lg border-gray-900/50 bg-transparent focus:border-green-500"
              type="text"
              defaultValue={account_data[0].first_name}
              placeholder={account_data[0].first_name}
            />
            <input
              ref={last_nameRef}
              className="border-[2px] p-3 text-white rounded-lg border-gray-900/50 bg-transparent focus:border-green-500"
              type="text"
              defaultValue={account_data[0].last_name}
              placeholder={account_data[0].last_name}
            />
            <input
              ref={nick_nameRef}
              className="border-[2px] p-3 text-white rounded-lg border-gray-900/50 bg-transparent focus:border-green-500"
              type="text"
              defaultValue={account_data[0].nick}
              placeholder={account_data[0].nick}
            />
            <div className="border-[2px] p-3 text-white rounded-lg border-gray-900/50 focus:border-green-500">
              <p className="text-white">Email: {account_data[0].email}</p>
            </div>
            <div className="flex justify-end mt-1">
              <Button
                variant="secondary"
                onClick={handleUpdate}
                className={`w-[10%] ${loadingUpdate ? "opacity-50" : null}`}
              >
                {loadingUpdate ? "Updating..." : "Update"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
      <Toaster className="bg-none text-green-500" />
    </section>
  );
}
