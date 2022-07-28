import { useEffect, useRef } from "react";
import useEventListener from "./useEventListener";

function useChangeBGOnScroll<T extends HTMLElement>(style: any) {
  const ref = useRef<T>(null)
  const lastScroll = useRef<number>(0)

  useEventListener("scroll", (e) => {
    const scroll = window.scrollY;
    if(
      (lastScroll.current === 0  && scroll > 0) || 
      (lastScroll.current > 0 && scroll === 0)
    ) {
      ref.current?.classList.toggle("navbar-scrolled")
    }
    lastScroll.current = scroll
  })

  return ref
}

export default useChangeBGOnScroll