import { NextPage } from "next";
import Navbar from "../components/Navbar";
import cn from "classnames";
import styles from "../styles/Landing.module.scss";
import LandingAvatarContainer from "../components/LandingAvatar/LandingAvatarContainer";
import Link from "next/link";
import Contact from "../components/Contact";
import Image from "next/image";

const Landing: NextPage = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className={cn(styles.container, "main-content")}>
        <section className={styles.landingSection}>
          <div className={styles.hero}>
            <div className={styles.presentation}>
              <p className={styles.codeTyper}>
                <span className="color-yellow">{"<h1> "}</span>
                <span className="color-almond">Hello World!</span>
                <span className="color-yellow">{" </h1>"}</span>
              </p>
              <p className={styles.name}>
                Leandro
                <br />
                Fernandez
              </p>
              <p className={styles.subName}>Fullstack Developer</p>
            </div>
            <Contact />
          </div>
        </section>
        <main className={cn("bg-dark-blue", styles.content)}>
          <section
            className={cn(styles.landingSection, styles.contentSection)}
            id="about-me"
          >
            <div className={styles.borderContainer}>
              <h3 className={styles.sectionTitle}>About Me</h3>
              <p className={styles.sectionSubtitle}>
                My name is Leandro, I am a web developer from Argentina 👋🏻
              </p>
              <div className={styles.aboutMeContent}>
                <div className={styles.aboutMeText}>
                  I started coding at the age of 15 and never stopped since
                  then.
                  <br />
                  <br />
                  When I was in highschool I used to code in visual basic 5 and
                  that&apos;s when my interest in building nice interfaces was
                  born. Later on, I had my first experience with web development
                  on a bootcamp at{" "}
                  <Link href="https://despegar.com">
                    <a target="_blank" rel="noopener noreferrer">
                      Despegar
                    </a>
                  </Link>
                  &apos;s AltoVuelo program, which turned out to be my first job
                  experience.
                  <br />
                  <br />
                  I also studied Systems Engeneering at UTN, the National
                  Technology University of Argentina.
                  <br />
                  This was a great experience that helped me shape my knowledge
                  in different engeneering areas. However, I dropped in 2018
                  when I felt I wouldnt be able to carry both my formal studies
                  and my fulltime job.
                  <br />
                  <br />
                  When I am not facing a computer screen, I enjoy singing(used
                  to have a band), going for a walk with my dog Penny, playing
                  padel or watching TV shows with my girlfriend.
                </div>
                {/* <div className={styles.portraitContainer}>
                  <Image
                    src="/portrait.png"
                    alt="portrait of Leandro"
                    width={300}
                    height={300}
                    objectFit="contain"
                    className={styles.portrait}
                  ></Image>
                  <div className={styles.overlay} />
                </div> */}
              </div>
            </div>
          </section>
          <section
            className={cn(styles.landingSection, styles.contentSection)}
            id="my-experience"
          >
            <div className={styles.borderContainer}>
              <h3 className={styles.sectionTitle}>My Experience</h3>
            </div>
          </section>
          {/* <h4>Motivations</h4>
          <ul>
            <li className="listItem">
              Coming up with ideas that could be transformed into helpful
              utilities.
            </li>
            <li className="listItem">
              Elaborating solutions for challenging technical problems and
              documenting them the best way I can.
            </li>
            <li className="listItem">
              Finding ways to improve the UX of the projects I work on.
            </li>
          </ul> */}
          {/* I enjoy working with my team mates and being helpful to them in any way I can, I also consider
              being a nice person to everyone an essential part of my daily routine */}
          {/* <br /> */}
          {/* Elaborating solutions for challenging technical problems and finding ways to improve the UX 
              in my projects is very important to me. Part of my responsability as an engineer is making 
              sure anyone who reads my code can understand it and add value to it. */}
          {/* Looking for new projects where I can write production ready code,
              apply my experience in the development of web apps and find good
              working environments where I can help others and get good feedback. */}
          {/* <h3 className="section-title">Education</h3>
          <ul>
            <li className="listItem">
              Currently focused on applying to courses and workshops to keep
              myself updated in terms of new technologies that can help me
              become a better engineer.
            </li>
            <li className="listItem">
              Systems Engineering at UTN, 2013 - stopped in 2018.
            </li>
            <li className="listItem">
              Computer Technician at E.T. 35 D.E. 18 Ing. Eduardo Latzina, 2008
              - 2013.
            </li>
            <li className="listItem">
              English level: Firsts Certificate with a B qualification.
            </li>
          </ul> */}
        </main>
      </div>
    </>
  );
};

export default Landing;
