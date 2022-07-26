import { useEffect, useRef, useState } from "react";
import LandingAvatar from "./LandingAvatar";
import styles from "../../styles/avatar.module.scss";

export default function LandingAvatarContainer() {
  const [hovered, setHovered] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>();

  function enterEventListener() {
    setHovered(true);
  }

  function leaveEventListener() {
    setHovered(false);
  }

  function setRef(element: HTMLDivElement) {
    if (!element) return;
    imageContainerRef.current = element;

    imageContainerRef.current.addEventListener(
      "mouseenter",
      enterEventListener
    );

    imageContainerRef.current.addEventListener(
      "mouseleave",
      leaveEventListener
    );
  }

  useEffect(
    () => () => {
      if (imageContainerRef.current) {
        imageContainerRef.current.removeEventListener(
          "mouseenter",
          enterEventListener
        );
        imageContainerRef.current.removeEventListener(
          "mouseleave",
          leaveEventListener
        );
      }
    },
    []
  );

  return (
    <div className={styles.avatarContainer} ref={setRef}>
      <LandingAvatar hovered={hovered} />
    </div>
  );
}
