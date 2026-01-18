"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from "react";

interface CommandMenuContextProps {
  open: boolean;
  toggle: () => void;
}

const CommandMenuContext = createContext<CommandMenuContextProps | undefined>(
  undefined,
);

export const CommandMenuProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const value = useMemo(() => ({ open, toggle }), [open, toggle]);

  return (
    <CommandMenuContext.Provider value={value}>
      {children}
    </CommandMenuContext.Provider>
  );
};

export const useCommandMenu = () => {
  const context = useContext(CommandMenuContext);
  if (!context) {
    throw new Error("useCommandMenu must be used within a CommandMenuProvider");
  }
  return context;
};
