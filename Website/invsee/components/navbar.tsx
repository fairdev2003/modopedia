"use client";

import { Button } from "./ui/button";
import "./ui.css";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "@radix-ui/react-separator";
import { Crown, Dot, Hammer, Star } from "lucide-react";
import { useUserStore } from "@/stores/user_store";
import axios from "axios";
import { redirect } from "next/navigation";
import { Select, SelectContent } from "./ui/select";
import { SelectTrigger } from "@radix-ui/react-select";

import { usePersistStore } from "@/stores/persist_store";
import { translations } from "@/utils/translations";

export default function Navbar() {
  const { data: token, status } = useSession();

  const { account_data, setAccountData } = useUserStore();

  const { language, setLanguage } = usePersistStore();

  const [isLogged, setIsLogged] = useState<boolean>(false);

  const fetch_user = async () => {
    try {
      const response = await axios.get(
        `/api/user?search_by=email&name=${token?.user?.email}`,
      );
      const data = response.data;
      setAccountData(data);
    } catch (error) {
      console.error("Error fetching user.ts:", error);
    }
  };

  useEffect(() => {
    if (token?.user?.email) {
      setIsLogged(true);
      console.log(account_data);

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
    <nav className="w-full max-w-[100vh] flex items-center justify-between bg-black rounded-b-md text-white h-[75px] gap-10 px-5 sticky top-0 z-50 ">
      {!isLogged ? (
        <div className="flex items-center ">
          <h1 className="text-white text-lg font-[600]">
            <Link href="/">Minecraft Wiki</Link>
          </h1>
          <div className="flex gap-5 ml-5">
            <Link
              href="/wiki"
              className="text-white hover:text-blue-500 transition-colors"
            >
              Wiki
            </Link>
            <Link
              href="/dashboard"
              className="text-white hover:text-blue-500 transition-colors"
            >
              {translations[language]["Dashboard"]["Dashboard"]}
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-[2000px] flex items-center justify-between gap-x-3">
          <h1 className="text-white text-lg font-[600]">
            <Link href="/dashboard">
              {translations[language]["Dashboard"]["Dashboard"]}
            </Link>
          </h1>

          <Link
            href="/dashboard?section=overview"
            className="text-sm hover:text-blue-500"
          >
            {translations[language]["Dashboard"]["Overview"]}
          </Link>
          <Link
            href="/dashboard?section=workspace"
            className="text-sm hover:text-blue-500"
          >
            {translations[language]["Dashboard"]["Workspace"]}
          </Link>
          <Link
            href="/dashboard?section=allies"
            className="text-sm hover:text-blue-500"
          >
            {translations[language]["Dashboard"]["User & Roles"]}
          </Link>
        </div>
      )}

      <div className="flex items-center gap-x-4">
        <Select>
          <SelectTrigger className="w-[50px] h-[35px]">
            <Button variant="outline" className="p-3 w-[50px] h-[35px]">
              <button>
                {language === "en" ? (
                  <p className="mx-3">
                    {translations[language]["Dashboard"]["English"]}
                  </p>
                ) : null}
                {language === "es" ? (
                  <p className="mx-3">
                    {translations[language]["Dashboard"]["Spanish"]}
                  </p>
                ) : null}
                {language === "pl" ? (
                  <p className="mx-3">
                    {translations[language]["Dashboard"]["Polish"]}
                  </p>
                ) : null}
              </button>
            </Button>
          </SelectTrigger>
          <SelectContent className="bg-black text-white border-none">
            <Button
              onClick={() => {
                setLanguage("en");
              }}
              variant="outline"
              className="w-full bg-none h-[35px] flex justify-start"
            >
              <p>{translations[language]["Dashboard"]["English"]}</p>
            </Button>
            <Button
              onClick={() => {
                setLanguage("pl");
              }}
              variant="outline"
              className="w-full bg-none h-[35px] flex justify-start"
            >
              <p>{translations[language]["Dashboard"]["Polish"]}</p>
            </Button>
            <Button
              onClick={() => {
                setLanguage("es");
              }}
              variant="outline"
              className="w-full bg-none h-[35px] flex justify-start"
            >
              <p>{translations[language]["Dashboard"]["Spanish"]}</p>
            </Button>
          </SelectContent>
        </Select>
        {account_data && account_data.length > 0 ? (
          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage
                  src={
                    account_data[0]?.image_src ||
                    "https://res.cloudinary.com/dzaslaxhw/image/upload/v1709757036/users/deafult.avif"
                  }
                  alt="@avatar"
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="bg-black text-white w-auto border-[1px] border-gray-800 p-1">
              <p className="mx-2 my-1 text-[15px] flex gap-x-2 items-center font-medium">
                {account_data.length > 0 &&
                account_data[0].role === "Editor" ? (
                  <Hammer size={15} className="text-orange-400" />
                ) : null}
                {account_data.length > 0 && account_data[0].role === "Mod" ? (
                  <Star size={15} className="text-orange-400" />
                ) : null}
                {account_data.length > 0 && account_data[0].role === "Admin" ? (
                  <Crown size={15} className="text-orange-400" />
                ) : null}
                {account_data.length > 0 ? account_data[0].nick : "loading..."}
              </p>
              <p className="mx-2 my-1 text-[12px] truncate text-gray-500">
                {account_data.length > 0 ? account_data[0].email : "loading..."}
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
        ) : null}
      </div>
    </nav>
  );
}
