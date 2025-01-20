"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";

const TestTRPC = () => {
  const [socket] = useState<any>(
    io("http://localhost:9090/socket.io/*anyW", {
      transports: ["websocket"],
    }),
  );

  useEffect(() => {
    socket.emit("server_info");

    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on("siema", "sigma");

    return () => {
      socket.off("connect");
      socket.off("receive_message");
      socket.off("server_info");
      socket.off("receive_server_info");
    };
  });

  return <div className="text-white pt-[200px]"></div>;
};

export default TestTRPC;
