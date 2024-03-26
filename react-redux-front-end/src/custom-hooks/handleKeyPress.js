import { useEffect } from "react";

export const useHandleKeyPress = (callback, key) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === key) {
        callback();
        console.log("Custom hook for a keypress event");
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [callback, key]);
};
