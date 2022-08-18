import Link from "next/link";
import cn from "classnames";
import styles from "../styles/navbar.module.scss";
import { useRef } from "react";
import useEventListener from "../hooks/useEventListener";

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const lastScrollPosition = useRef<number>(0);
  let initialVisibility = styles.visible;

  useEventListener("scroll", () => {
    const scrollY = window.scrollY;
    initialVisibility = "";

    if (scrollY > lastScrollPosition.current) {
      navRef.current?.classList.remove(styles.visible);
      navRef.current?.classList.add(styles.hide);
    } else {
      console.log("adding visible::");
      navRef.current?.classList.remove(styles.hide);
      navRef.current?.classList.add(styles.visible);
    }
    lastScrollPosition.current = scrollY;
  });

  return (
    <nav className={cn(styles.nav, initialVisibility)} ref={navRef}>
      <ul>
        <li>
          <Link href="/landing">Home</Link>
        </li>
        <li>
          <Link href="#about-me">About me</Link>
        </li>
        {/* <li>
          <Link href="/resume">Resume</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
