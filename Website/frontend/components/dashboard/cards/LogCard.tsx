import { trpc } from "@/app/_trpc/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { Lock, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { set } from "mongoose";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUserStore } from "@/stores/user_store";

import { usePersistStore } from "@/stores/persist_store";
import { translations } from "@/utils/translations";

const roles_with_access: string[] = ["Admin"];

const LogCard = () => {
  const { language } = usePersistStore();

  const { account_data }: any = useUserStore();
  const logs = trpc.log.getAllLogs.useQuery();

  console.log(logs?.isLoading ? "Loading" : logs?.data);

  const handleRefresh = () => {
    logs.remove();
    logs.refetch();
  };

  return (
    <Card className="border-[2px] border-gray-900/50 rounded-md text-white pt-5 lg:w-auto md:w-full h-auto">
      {roles_with_access.includes(
        account_data && account_data.length > 0 ? account_data[0].role : null,
      ) ? (
        <CardContent>
          <div className="flex justify-between">
            <CardTitle>
              {translations[language]["Dashboard"]["User Logs"]}
            </CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <RefreshCcw
                    className={`w-5 h-5 cursor-pointer  transition-colors hover:text-blue-500 ${logs.isLoading ? "animate-spin duration-1000 text-blue-500" : "text-white"}`}
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
            {translations[language]["Dashboard"]["User Logs Desc"]}
          </CardDescription>
          <div className="flex flex-col gap-y-4 mt-4 mb-4">
            {!logs.isLoading
              ? logs.data
                  ?.slice(logs.data?.length - 3, logs.data?.length)
                  .map((log: any, index: number) => {
                    return (
                      <div
                        className="flex items-center bg-gray-900/50 p-3 rounded-lg relative"
                        key={1}
                      >
                        <Image
                          alt={`pfp-${index}`}
                          src={
                            log.user_info && log.user_info.length > 0
                              ? log.user_info[0].image_src
                              : "https://res.cloudinary.com/dzaslaxhw/image/upload/v1709757036/users/deafult.avif"
                          }
                          width={100}
                          height={100}
                          className="rounded-lg w-[45px] h-[45px]"
                        ></Image>
                        <div className="flex flex-col ml-5">
                          <p className="text-sm font-medium">{log.action}</p>
                          <p className="text-sm opacity-50">
                            {log.user_info && log.user_info.length > 0
                              ? log.user_info[0].nick
                              : "null"}{" "}
                            {">"}{" "}
                            <span className="text-blue-500 font-[700]">
                              {" "}
                              {log.date.slice(0, 21)}
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  })
              : null}
            {!logs.isLoading && logs?.data.length > 3 ? (
              <Link
                href="/dashboard?section=allies"
                className="hover:underline hover:text-blue-500 mb-0"
              >
                {translations[language]["Dashboard"]["and more"].replace(
                  "%s",
                  logs?.data.length - 3,
                )}
              </Link>
            ) : null}
          </div>
        </CardContent>
      ) : (
        <CardContent className="rounded-md text-white p-5 mt-5 flex flex-col gap-1 justify-center items-center">
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
    </Card>
  );
};

export default LogCard;
