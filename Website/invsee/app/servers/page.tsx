"use client";

import Navbar from "@/components/navbar";

import dynamic from "next/dynamic";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowRight, FaArrowLeft, FaUser } from "react-icons/fa6";
import { GiDeathSkull } from "react-icons/gi";
import { io } from "socket.io-client";
import "@/app/globals.css";
import { EnchantmentsDictonary, NumberFormula } from "@/utils/enchants";
import { NbtContent } from "@/utils/nbt_content";
import { ModName } from "@/utils/mod_name";
import Deafult from "../../public/deafult.png";

const data: any = [
  {
    message: "Dev left the game",
    type: "player_left",
    user_name: "Dev",
    uuid: "380df991-f603-344c-a090-369bad2a924a",
  },
];

export const senddatatoDatabase = () => {
  "use php";
};

function Chat() {
  const [message, setmessage] = useState("");
  const [messages, setmessages]: any = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [socket] = useState<any>(io("http://localhost:9090/socket.io"));

  const chatbox_ref = useRef<any>();

  const [server_info, setServerInfo]: any = useState({
    count: 0,
  });

  useEffect(() => {
    socket.emit("server_info");

    setIsClient(true);

    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on("receive_message", (mess: any) => {
      setmessages((prevMessages: any) => [...prevMessages, mess]);
    });

    socket.on("receive_server_info", (server_info: any) => {
      setServerInfo(server_info);
      console.log(server_info);
    });

    return () => {
      socket.off("connect");
      socket.off("receive_message");
      socket.off("server_info");
      socket.off("receive_server_info");
    };
  });

  const input_ref = useRef(typeof Input);
  const getRarityColor: any = (rarity: string) => {
    switch (rarity) {
      case "epic": {
        return "#7851A9";
      }
      case "rare": {
        return "rgb(59 130 246 / 1";
      }
      case "uncommon": {
        return "rgb(0, 0, 255)";
      }
      case "common": {
        return "white";
      }
      default: {
        return "black";
      }
    }
  };

  const sendMessage = (message_query: any) => {
    setmessages((prevMessages: any) => [...prevMessages, message_query]);
    socket.emit("send", `<Web Message> ${message}`);
  };

  const handleDeafultImage = (event: any) => {
    event.target.src = "deafult.png";
  };

  type MessageType = {
    message: string;
    type: string;
    user_name: string;
    uuid: string;

    item_data: {
      nbt_data?: {
        [key: string]: any;
      };
      registry_name: string;
      display_name: string;
      rarity: string;
      enchants: {
        id: string;
        level: number;
      }[];
    };
  };

  const message_handler = (message: MessageType) => {
    if (message.type === "player_joined") {
      return (
        <Alert
          variant="joined"
          className="flex gap-2 items-center bg-[#88dd88] max-w-[98%]"
        >
          <div className="text-[green]">
            <FaArrowRight size={20} />
          </div>
          <AlertDescription className="font-[600]">
            {message.message}
          </AlertDescription>
        </Alert>
      );
    }
    if (message.type === "player_left") {
      return (
        <Alert
          variant="left"
          className="flex gap-2 items-center bg-[#e7a4a4] max-w-[98%]"
        >
          <div className="text-destructive">
            <FaArrowLeft size={20} />
          </div>
          <AlertDescription className="font-[600]">
            {message.message}
          </AlertDescription>
        </Alert>
      );
    }
    if (message.type === "player_chat") {
      return (
        <Alert
          variant="message"
          className="flex gap-5 items-center bg-[#dad2d2] max-w-[98%]"
        >
          <img
            src={`https://mc-heads.net/avatar/${message.uuid}`}
            alt={`image-${message.user_name}`}
            className="w-10 h-10 rounded-lg"
          />
          <div>
            <AlertTitle>{message.user_name}</AlertTitle>
            <AlertDescription>{message.message}</AlertDescription>
          </div>
        </Alert>
      );
    }
    if (message.type === "share_item") {
      return (
        <Alert
          variant="shared_item"
          className="flex gap-5 items-center max-w-[98%] relative z-0"
        >
          <div id="hover_trigger" className="cursor-pointer">
            <img
              src={`http://localhost:3005/images/icon/${message.item_data.registry_name}/${message.item_data.enchants.length > 0 ? "true" : "false"}`}
              alt={`image-${message.user_name}`}
              className="image w-10 h-10 relative"
              onError={(event) => {
                handleDeafultImage(event);
              }}
            />
            <div
              style={{ borderColor: getRarityColor(message.item_data.rarity) }}
              className="w-[auto] h-[auto] bg-[#16181c] border-[5px] p-5 absolute z-2 left-[5rem] top-5 rounded-lg z-2"
              id="hover_content"
            >
              <div className="flex gap-4 items-center mb-5">
                <img
                  src={`http://localhost:3005/images/icon/${message.item_data.registry_name}/${message.item_data.enchants.length > 0 ? "true" : "false"}`}
                  alt={`image-${message.user_name}`}
                  className="image w-10 h-10 relative"
                  onError={(event) => {
                    handleDeafultImage(event);
                  }}
                ></img>
                <div>
                  <h1
                    style={{ color: getRarityColor(message.item_data.rarity) }}
                    className={`text-md font-[800]`}
                  >
                    {message.item_data.display_name}
                  </h1>
                  <p className="text-gray-200 text-sm font-[600]">Tool</p>
                </div>
              </div>

              <div>
                {message.item_data.nbt_data["Modifier"] ===
                "forbidden_arcanus:eternal" ? (
                  <div>
                    <p className="text-white">
                      + <span className="text-green-600">Eternal Modifer</span>
                    </p>
                    <p className="text-white">
                      <i>Tool is indestructible!</i>
                    </p>
                  </div>
                ) : null}
                {message.item_data.nbt_data["Modifier"] ===
                "forbidden_arcanus:fiery" ? (
                  <div>
                    <p className="text-white">
                      + <span className="text-red-600">Fiery Modifer</span>
                    </p>
                    <p className="text-white">
                      <i>Allows the tool to smelt the mined block</i>
                    </p>
                  </div>
                ) : null}
                {message.item_data.nbt_data["Modifier"] ===
                "forbidden_arcanus:demolishing" ? (
                  <div>
                    <p className="text-white">
                      +{" "}
                      <span className="text-[brown]">Demolishing Modifer</span>
                    </p>
                    <p className="text-white">
                      <i>Tool can mine 3x3 area</i>
                    </p>
                  </div>
                ) : null}
                {NbtContent(
                  message.item_data.registry_name.split("__")[0],
                  message.item_data,
                  getRarityColor(message.item_data.rarity),
                )}
              </div>

              <div className="">
                {/* <div className='w-[200px]'><i className='text-white my-3'>"Mystical tool which takes alheim mystical power to conquer the world. This tool is used to mine magical side of the world, be carefull!"</i></div> */}
                <div className="mt-4">
                  {message.item_data.enchants
                    ? message.item_data.enchants.map(
                        (item: any, number: number) => {
                          return (
                            <p className="text-white font-[500]">
                              {EnchantmentsDictonary[item.id]}{" "}
                              {NumberFormula[item.lvl]}
                            </p>
                          );
                        },
                      )
                    : null}
                </div>
              </div>
              <p className="text-blue-500">
                {ModName[message.item_data.registry_name.split("__")[0]]}
              </p>
            </div>
            <img />
          </div>
          <div>
            <AlertTitle>{`${message.item_data.amount > 1 ? message.item_data.amount + "x" : ""} ${message.item_data.display_name}`}</AlertTitle>
            <AlertDescription>
              shared by <b>{message.user_name}</b>
            </AlertDescription>
          </div>
        </Alert>
      );
    }
    if (message.type === "web_chat") {
      return (
        <Alert
          variant="message"
          className="gap-2 items-center bg-[#d2d3da] max-w-[98%]"
        >
          <AlertTitle>You</AlertTitle>
          <AlertDescription>{message.message}</AlertDescription>
        </Alert>
      );
    }
    if (message.type === "player_death") {
      return (
        <Alert
          variant="left"
          className="flex gap-2 items-center bg-[#e7a4a4] max-w-[98%]"
        >
          <div className="text-destructive">
            <GiDeathSkull size={20} />
          </div>
          <AlertDescription className="font-[600]">
            {message.message}
          </AlertDescription>
        </Alert>
      );
    }
  };

  return (
    <div>
      {isClient ? (
        <div>
          <Navbar></Navbar>
          <div className="px-[50px] py-[50px] flex flex-grow flex-row gap-5 justify-center">
            <div
              key="left-menu"
              className="w-[700px] h-[850px] bg-[#26292f] rounded-lg px-10 py-10"
            >
              <h1 className="text-white text-2xl font-[700] ml-1 mb-3 flex items-center">
                Server Info
              </h1>
              <div className="bg-[#213f21] w-full h-[60px] rounded-lg flex items-center gap-3 px-5">
                <FaUser size={25} className="text-white " />
                <p className="font-[700] text-lg text-white">
                  {server_info ? server_info.count : 0}/8 Players Online
                </p>
              </div>
            </div>
            <div className="w-[1200px] h-[850px] bg-[#26292f] py-7 pb-5 rounded-lg">
              <h1 className="text-white text-2xl font-[700] ml-5 mb-3 flex items-center">
                Live Chat
              </h1>
              <div
                ref={chatbox_ref}
                id="chat-box"
                className="h-[88%] bg-[#26292f] m-5 mb-0 rounded-lg flex flex-col gap-3 overflow-y-scroll max-h-[85%]"
              >
                {messages && messages.length > 0
                  ? messages.map((item: any) => {
                      return message_handler(item);
                    })
                  : null}
              </div>
              <div
                id="message-box"
                key="message-box"
                className="px-5 pt-2 flex flex-grow gap-2 items-center mt-6 mb-5"
              >
                <div className="flex grow items-center gap-4 ">
                  <p className="text-white font-[600] text-lg ml-1">#</p>
                  <Input
                    ref={input_ref}
                    onChange={(input) => {
                      setmessage(input.target.value);
                    }}
                  ></Input>
                </div>

                <Button
                  size="lg"
                  variant="admin"
                  onClick={() => {
                    sendMessage({ message: message, type: "web_chat" });

                    input_ref.current.value = "";
                  }}
                >
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Chat;
