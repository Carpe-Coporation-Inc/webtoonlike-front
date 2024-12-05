"use client";

import { ReactNode, useLayoutEffect, useState } from "react";

export default function LightThemeProvider({ children }: {
  children: ReactNode;
}) {
  const [modeChanged, setModeChanged] = useState(false);
  useLayoutEffect(() => {
    document.body.classList.add("light");
    setModeChanged(true);
    return () => {
      document.body.classList.remove("light");
    };
  }, []);
  return modeChanged && children;
}