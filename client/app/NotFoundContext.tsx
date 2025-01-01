"use client";

import { createContext, useContext, useState } from "react";

const NotFoundContext = createContext<{
  isNotFound: boolean;
  setIsNotFound: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isNotFound: false,
  setIsNotFound: () => {},
});

export const NotFoundProvider = ({ children }: { children: React.ReactNode }) => {
  const [isNotFound, setIsNotFound] = useState(false);

  return (
    <NotFoundContext.Provider value={{ isNotFound, setIsNotFound }}>
      {children}
    </NotFoundContext.Provider>
  );
};

export const useNotFound = () => useContext(NotFoundContext);
