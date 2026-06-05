import styles from "../../styles/avatar.module.scss";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

export default function AvatarChatBubble() {
  // const [visible, setVisible] = useState(false);
  // useEventListener("scroll", () => {
  //   if (visible) return;
  //   setVisible(true);
  // });

  return (
    <div className={cn(styles.avatarChatBubble, styles.bubbleVisible)}>
      <p>Find me here!</p>
      <p className={styles.networks}>
        <span>
          <Link
            href="https://twitter.com/FLeandroF"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/twitterIcon.png"
              alt="twitter icon"
              width={24}
              height={24}
              style={{ objectFit: "contain" }}
              className={styles.networkImage}
            />
          </Link>
        </span>
        <span>
          <Link
            href="mailto:leandroofernandezz@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/email.svg"
              alt="email icon"
              width={24}
              height={24}
              className={styles.networkImage}
            />
          </Link>
        </span>
        <span>
          <Link
            href="https://github.com/leandroFernandez94"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/github.svg"
              alt="github icon"
              width={24}
              height={24}
              className={styles.networkImage}
            />
          </Link>
        </span>
        <span>
          <Link
            href="https://www.linkedin.com/in/leandro-fernandez-3a2b85101"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/linkedinIcon.png"
              alt="linkedin icon"
              width={24}
              height={24}
              className={styles.networkImage}
            />
          </Link>
        </span>
      </p>
    </div>
  );
}
