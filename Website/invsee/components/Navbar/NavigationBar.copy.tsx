"use client";

import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "@radix-ui/react-separator";
import { Crown, Hammer, Settings, Star, User } from "lucide-react";
import { useUserStore } from "@/stores/user_store";
import { redirect } from "next/navigation";
import { AdminStripe } from "../NavComponents/AdminStripes";

import { usePersistStore } from "@/stores/persist_store";
import { translations } from "@/utils/translations";
import { trpc } from "@/app/_trpc/client";
import { BsCircle } from "react-icons/bs";
import { useWorkspaceStore } from "@/app/admin/workspace/stores/workspaceBroswerData";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

const NavigationBar = () => {
  const { data: token } = useSession();

  const login = trpc.user.getSingleUser.useMutation({
    onSettled: (data) => {
      setAccountData([data]);
    },
  });

  const { account_data, setAccountData } = useUserStore();

  const { setpage, itemWorkspace } = useWorkspaceStore();

  const { language, setLanguage } = usePersistStore();

  const [isLogged, setIsLogged] = useState<boolean>(false);

  const fetch_user = async () => {
    try {
      // @ts-ignore
      login.mutate(token?.user?.email);
    } catch (error) {
      console.error("Error fetching user.ts:", error);
    }
  };

  useEffect(() => {
    if (token?.user?.email) {
      setIsLogged(true);

      fetch_user();
    } else {
      setIsLogged(false);
    }
  }, [token?.user?.email]);

  const handleLogout = async () => {
    await signOut();
    setAccountData([]);
    setIsLogged(false);
    window.location.href = "/login";
  };

  return (
    <div className="fixed w-full z-[2] top-0">
      {account_data[0] && account_data[0].role === "Admin" && (
        <div>
          {/* // pc navigation */}
          <motion.div
            initial={{ height: "0px" }}
            animate={{ height: "auto" }}
            className="text-white p-1 font-medium justify-between flex-col md:h-[30px] md:flex md:flex-row lg:flex lg:flex-row lg:h-[30px] bg-blue-700 md:gap-2 px-3 items-center hidden"
          >
            {/*
              Stripe for admin with permissions to access the dashboard
            */}
            <AdminStripe
              context={{ setLanguage, setpage, account_data, itemWorkspace }}
            />
          </motion.div>
          {/* // mobile navigation */}
          <motion.div
            initial={{ height: -20 }}
            animate={{ height: 70 }}
            className="text-white rounded-t-xl h-[70px] font-medium fixed bottom-0 w-full justify-between mt-10 flex-col md:h-[30px] md:hidden flex lg:hidden lg:h-[30px] bg-blue-700 md:gap-2 px-3 items-center"
          >
            s
          </motion.div>
        </div>
      )}
      <div className="flex justify-between items-center p-1 bg-black h-[100px] top-0 z-100">
        <div className="flex gap-2 items-center">
          <a href="/">
            <h1 className="text-white text-2xl m-5 font-bold">Modopedia</h1>
          </a>
          <SearchBar />
        </div>

        {account_data[0] && account_data.length > 0 ? (
          <div className="flex">
            <Popover>
              <PopoverTrigger className="mr-5">
                <Avatar>
                  <AvatarImage
                    className="w-30 h-30"
                    src={
                      account_data[0]?.image ||
                      "https://res.cloudinary.com/dzaslaxhw/image/upload/v1709757036/users/deafult.avif"
                    }
                    alt="@avatar"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="bg-black z-[3] text-white w-auto border-[1px] border-gray-800 p-1">
                <p className="mx-2 my-1 text-[15px] flex gap-x-2 items-center font-medium">
                  {account_data.length > 0 &&
                  account_data[0].role === "Editor" ? (
                    <Hammer size={15} className="text-orange-400" />
                  ) : null}
                  {account_data.length > 0 && account_data[0].role === "Mod" ? (
                    <Star size={15} className="text-orange-400" />
                  ) : null}
                  {account_data.length > 0 &&
                  account_data[0].role === "Admin" ? (
                    <Crown size={15} className="text-orange-400" />
                  ) : null}
                  {account_data.length > 0
                    ? account_data[0].nick
                    : "loading..."}
                </p>
                {/* <p className="mx-2 my-1 text-[12px] truncate text-gray-500">
                  {account_data.length > 0
                    ? account_data[0].email
                    : "loading..."}
                </p> */}
                <p className="mx-2 my-1 text-[12px] truncate text-red-500">
                  {account_data.length > 0 ? "EMAIL IS HIDDEN" : "loading..."}
                </p>
                <Separator
                  orientation="horizontal"
                  className="w-full h-[1px] bg-gray-800"
                ></Separator>
                <Button
                  onClick={() => {
                    redirect("/dashboard?section=account-settings");
                  }}
                  variant="outline"
                  className="w-full bg-none h-[35px] mt-1 flex justify-start"
                >
                  {translations[language]["Dashboard"]["Settings"]}
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full bg-none h-[35px] flex justify-start"
                >
                  {translations[language]["Dashboard"]["Change MC Account"]}
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full bg-none h-[35px] flex justify-start"
                >
                  {translations[language]["Dashboard"]["Billing"]}
                </Button>
                <Button
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                  variant="outline"
                  className="w-full bg-none h-[35px] flex justify-start"
                >
                  {translations[language]["Dashboard"]["Change Account"]}
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full bg-none h-[35px] hover:bg-red-500 flex justify-start"
                >
                  {translations[language]["Dashboard"]["Logout"]}
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
            variant="secondary"
            className="mr-5"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
