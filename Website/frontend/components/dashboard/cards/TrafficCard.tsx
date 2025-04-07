"use client";

import { trpc } from "@/app/_trpc/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { Clock, Eye, EyeOff, Server, User } from "lucide-react";
import { useState } from "react";

const TrafficCard = () => {
  const traffic = trpc.getTraffic.useQuery();
  console.log(traffic);

  const [iphidden, setiphidden] = useState<boolean>(true);

  return (
    <div>
      <Card className="border-[2px] border-gray-900/50 rounded-md text-white pt-5 lg:w-auto md:w-full h-auto col-span-1">
        <CardContent>
          <CardTitle>Traffic</CardTitle>
          <CardDescription className="mt-1">
            View what traffic is here!
          </CardDescription>

          <div className="flex flex-col gap-4 mt-5 p-3">
            {traffic.data?.map((item: any) => {
              return (
                <div className="flex gap-5 items-center bg-gray-900/50 p-3 rounded-lg">
                  <div className="flex gap-2 items-center w-[70px]">
                    <Clock size={20} />
                    {item.createdAt.slice(0, 5)}
                  </div>
                  {item.code === 200 && (
                    <div className="w-[50px] h-7 bg-green-500/50 text-green-400 flex justify-center rounded-lg items-center">
                      <p>{item.code}</p>
                    </div>
                  )}
                  {item.code === 401 && (
                    <div className="w-[50px] h-7 bg-red-500/50 text-red-400 flex justify-center rounded-lg items-center">
                      <p>{item.code}</p>
                    </div>
                  )}
                  {item.code === 501 && (
                    <div className="w-[50px] h-7 bg-red-500/50 text-red-400 flex justify-center rounded-lg items-center">
                      <p>{item.code}</p>
                    </div>
                  )}
                  <p
                    className={`${
                      item.code === 200 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {item.code_message}
                  </p>
                  <div className="flex gap-2">
                    {item.user && <User />}
                    {!item.user && (
                      <div>
                        {iphidden ? (
                          <EyeOff
                            className="cursor-pointer"
                            onClick={() => {
                              setiphidden(!iphidden);
                            }}
                          />
                        ) : (
                          <Eye
                            className="cursor-pointer"
                            onClick={() => {
                              setiphidden(!iphidden);
                            }}
                          />
                        )}
                      </div>
                    )}

                    <HoverCard>
                      <HoverCardTrigger className="hover:underline">
                        {item.user ? (
                          <p className="cursor-pointer">
                            {item.user && item.user.nick}
                          </p>
                        ) : (
                          <p className="cursor-pointer">
                            {!iphidden ? item.ip : "IP HIDDEN"}
                          </p>
                        )}
                        <HoverCardContent className="flex gap-5 items-center border-[2px] border-gray-900 bg-black w-[300px] h-[100px] p-3 rounded-lg">
                          <Image
                            width={50}
                            height={50}
                            className="rounded-full"
                            src={
                              (item.user && item.user.image) ||
                              "https://res.cloudinary.com/dzaslaxhw/image/upload/v1709757036/users/deafult.avif"
                            }
                            alt={""}
                          />
                          <h1>{item.user ? item.user.nick : null}</h1>
                        </HoverCardContent>
                      </HoverCardTrigger>
                    </HoverCard>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrafficCard;
