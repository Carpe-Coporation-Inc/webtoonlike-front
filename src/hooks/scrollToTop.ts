import { useLayoutContext } from "@/providers/LayoutContextProvider";
import { RefObject, useEffect } from "react";

export default function useScrollToTop(
  targetRef: RefObject<HTMLElement | null>,
  conditionToScroll: boolean = true
) {
  const { headerRef } = useLayoutContext();
  useEffect(() => {
    if (!targetRef.current || !conditionToScroll){
      return;
    }
    targetRef.current.style.scrollMargin = headerRef?.current?.clientHeight.toString() + "px";
    targetRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, [headerRef, targetRef, conditionToScroll]);
}