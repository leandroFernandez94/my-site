import Image from "next/image";
import Link from "next/link";
import styles from "../styles/contact.module.scss";

export default function Contact() {
  return (
    <div className={styles.contactContainer}>
      <p className={styles.title}>You can find me on</p>
      <ul className={styles.contactMethodsList}>
        <li className={styles.contactMethod}>
          <Link
            href="https://twitter.com/FLeandroF"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactMethodLink}
          >
            <Image
              src="/twitterIcon.svg"
              alt="twitter icon"
              width={24}
              height={24}
              style={{ objectFit: "contain" }}
              className={styles.networkImage}
            />
            <span className={styles.methodName}>Twitter</span>
          </Link>
        </li>
        <li className={styles.contactMethod}>
          <Link
            href="mailto:leandroofernandezz@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactMethodLink}
          >
            <Image
              src="/email.svg"
              alt="email icon"
              width={24}
              height={24}
              style={{ objectFit: "contain" }}
              className={styles.networkImage}
            />
            <span className={styles.methodName}>Mail</span>
          </Link>
        </li>
        <li className={styles.contactMethod}>
          <Link
            href="https://github.com/leandroFernandez94"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactMethodLink}
          >
            <Image
              src="/github.svg"
              alt="github icon"
              width={24}
              height={24}
              style={{ objectFit: "contain" }}
              className={styles.networkImage}
            />
            <span className={styles.methodName}>Github</span>
          </Link>
        </li>
        <li className={styles.contactMethod}>
          <Link
            href="https://www.linkedin.com/in/leandro-fernandez-3a2b85101"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactMethodLink}
          >
            <Image
              src="/linkedinIcon.svg"
              alt="linkedin icon"
              width={24}
              height={24}
              style={{ objectFit: "contain" }}
              className={styles.networkImage}
            />
            <span className={styles.methodName}>LinkedIn</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
