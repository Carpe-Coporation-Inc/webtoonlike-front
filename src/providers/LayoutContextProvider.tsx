"use client";

import { createContext, Dispatch, ReactNode, RefObject, SetStateAction, useContext, useState } from "react";

type HeaderRef = RefObject<HTMLElement | null>;
type LayoutContextValue = {
  headerRef: HeaderRef | undefined;
  setHeaderRef: Dispatch<SetStateAction<HeaderRef | undefined>>;
};
const LayoutContext = createContext<LayoutContextValue>(
  {} as LayoutContextValue
);

export default function LayoutContextProvider({ children }: {
  children: ReactNode;
}) {
  const [headerRef, setHeaderRef] = useState<HeaderRef>();
  return <LayoutContext.Provider value={{ headerRef, setHeaderRef }}>
    {children}
  </LayoutContext.Provider>;
}

export function useLayoutContext() {
  return useContext(LayoutContext);
}