import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/user_store";
import { Lock, RefreshCcw } from "lucide-react";
import { trpc } from "@/app/_trpc/client";
import Link from "next/link";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

import { translations } from "@/utils/translations";
import { usePersistStore } from "@/stores/persist_store";

const roles_with_access = ["Admin"];

export const UsersWithAccess = () => {
  const { language } = usePersistStore();
  const { account_data, setUsers, users }: any = useUserStore();
  const [state, setState] = useState<string>("");
  const updateUserRole = trpc.user.updateUserRole.useMutation({
    onSettled: () => {
      fetch_users();
    },
  });
  const add_log = trpc.log.addLog.useMutation();

  const fetch_users = async () => {
    const response = await axios.get("api/user");

    setUsers(response.data);
    console.log(users);
  };

  const handleRefresh = () => {
    setUsers([]);

    fetch_users();
  };

  useEffect(() => {
    console.log("account data", account_data);
    if (roles_with_access.includes(account_data[0].role) === false) {
      return;
    } else {
      fetch_users();
    }
  }, []);

  const handleRoleChange = async (value: string, email: string) => {
    updateUserRole.mutate({ email, role: value });
    add_log.mutate({
      action: `Changed role to: ${value} for user with email: ${email}`,
      user: account_data[0].nick,
    });

    console.log(updateUserRole.data);
    setUsers([]);
    fetch_users();
    toast("Changed role to: " + value + " for user.ts with email: " + email, {
      duration: 5000,
      closeButton: true,
    });

    setTimeout(() => {
      setState("");
    }, 6000);
  };

  return (
    <Card>
      {account_data.length > 0 &&
      roles_with_access.includes(account_data[0].role) ? (
        <CardContent
          className={`border-[2px] border-gray-900/50 rounded-md text-white pt-5 lg:w-auto md:w-full h-auto`}
        >
          <div className="flex justify-between">
            <CardTitle>
              {translations[language]["Dashboard"]["Users with access"]}
            </CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <RefreshCcw
                    className={`w-5 h-5 cursor-pointer  transition-colors hover:text-blue-500 ${
                      users.length === 0
                        ? "animate-spin duration-1000 text-blue-500"
                        : "text-white"
                    }`}
                    onClick={() => {
                      handleRefresh();
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{translations[language]["Dashboard"]["Refresh"]}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <CardDescription className="mt-1">
            {translations[language]["Dashboard"]["Users with access desc"]}
          </CardDescription>
          <div className="flex flex-col gap-y-4 mt-4 mb-4">
            {users.length > 0
              ? users.slice(0, 3).map((user: any, index: number) => {
                  return (
                    <div
                      className="flex items-center bg-gray-900/50 p-3 rounded-lg relative"
                      key={index + 1}
                    >
                      <Image
                        alt="profile image"
                        src={
                          user.image_src ||
                          "https://res.cloudinary.com/dzaslaxhw/image/upload/v1709757036/users/deafult.avif"
                        }
                        width={100}
                        height={100}
                        className="rounded-lg w-[45px] h-[45px]"
                      ></Image>
                      <div className="flex flex-col w-[300px] ml-5">
                        <p className="text-[15px] font-medium flex gap-1">
                          {user.nick}{" "}
                          <span className="text-blue-500 flex">
                            {account_data[0].nick === user.nick ? (
                              <>{translations[language]["Dashboard"]["You"]}</>
                            ) : null}
                          </span>
                        </p>
                        <p className="text-[13px] opacity-50">{user.email}</p>
                      </div>
                      {account_data[0].nick !== user.nick &&
                      account_data[0].role !== user.role ? (
                        <Select
                          onValueChange={(value) => {
                            handleRoleChange(value, user.email);
                          }}
                        >
                          <SelectTrigger
                            className="w-[180px] border-none"
                            disabled={account_data[0].role !== "Admin"}
                          >
                            <Button variant="secondary" className="w-[100px]">
                              {user.role}
                            </Button>
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 text-white border-none">
                            <SelectGroup>
                              <SelectLabel>Roles</SelectLabel>
                              {account_data[0].role == user.role ? (
                                <SelectItem
                                  disabled={
                                    user.role === "Admin" ? true : false
                                  }
                                  value="Admin"
                                >
                                  Admin
                                </SelectItem>
                              ) : null}
                              <SelectItem
                                disabled={user.role === "Mod" ? true : false}
                                value="Mod"
                              >
                                Mod
                              </SelectItem>
                              <SelectItem
                                disabled={user.role === "Editor" ? true : false}
                                value="Editor"
                              >
                                Editor
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      ) : null}
                    </div>
                  );
                })
              : null}
          </div>
          {users.length > 0 ? (
            <Link
              href="/dashboard?section=allies"
              className="hover:underline hover:text-blue-500"
            >
              {translations[language]["Dashboard"]["and more"].replace(
                "%s",
                users?.length - 3,
              )}
            </Link>
          ) : null}
          {state.length > 0 ? (
            <CardDescription className=" mt-3 text-emerald-500">
              {state}
            </CardDescription>
          ) : null}
        </CardContent>
      ) : (
        <CardContent className="border-[2px] border-gray-900/50 rounded-md text-white p-5 w-[500px] h-[390px] mt-5 flex flex-col gap-1 justify-center items-center">
          <div className="flex gap-2 items-center">
            <Lock className="text-red-500" />
            <h2 className="text-red-500">
              {translations[language]["Dashboard"]["No permission"]}
            </h2>
          </div>
          <h3 className="text-gray-500 mt-1 text-sm text-center">
            {translations[language]["Dashboard"]["Permission error"]}
          </h3>
        </CardContent>
      )}
      <Toaster className="bg-none text-green-500" />
    </Card>
  );
};
