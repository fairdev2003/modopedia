import { useState, useEffect } from "react";

export const useResize = () => {
  const [clickcount, setclickcount] = useState<number>(0);

  function handleUserKeyPress(e: any) {
    setclickcount(5);
    console.error(e);
  }

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, []);
};
