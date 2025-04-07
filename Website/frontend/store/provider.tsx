"use client";

import { Provider as Pr } from "react-redux";
import { PersistGate as Pg } from "redux-persist/integration/react";
import { ReactNode, useRef } from "react";
import { AppStore, makeStore } from "./store";

const PersistGate = ({ children }: { children: ReactNode }) => {
  const storageRef = useRef<AppStore>();
  if (!storageRef.current) {
    storageRef.current = makeStore();
  }

  return (
    <Pg persistor={storageRef.current.__persistor} loading={null}>
      {children}
    </Pg>
  );
};

export { PersistGate };
