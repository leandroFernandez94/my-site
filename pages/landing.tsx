import { NextPage } from "next";
import Navbar from "../components/Navbar";
import cn from "classnames";
import styles from "../styles/Landing.module.scss";
import LandingAvatarContainer from "../components/LandingAvatar/LandingAvatarContainer";

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
              <p className={cn(styles.name, "color-olive")}>
                Leandro
                <br />
                Fernandez
              </p>
              <p className={cn(styles.subName, "color-white")}>
                Fullstack Developer with more than 5 years of experience
                building webapps using React.js on the front and Node.js for the
                backend
              </p>
            </div>
            <LandingAvatarContainer />
          </div>
        </section>
        <main className="main-content bg-dark-blue">
          <h3 className="section-title">Hello World!</h3>
          I started coding in high school and never stopped since then. I have a
          fullstack background, with most of my experience being related to
          frontend technologies, I have been working with React + Node.js stacks
          for a long time(5+ years) building web apps.
          <br />
          When I am not facing a computer screen, I enjoy singing(used to have a
          band), playing padel or watching TV shows with my girlfriend.
          <h4>Motivations</h4>
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
          </ul>
          {/* I enjoy working with my team mates and being helpful to them in any way I can, I also consider
              being a nice person to everyone an essential part of my daily routine */}
          {/* <br /> */}
          {/* Elaborating solutions for challenging technical problems and finding ways to improve the UX 
              in my projects is very important to me. Part of my responsability as an engineer is making 
              sure anyone who reads my code can understand it and add value to it. */}
          {/* Looking for new projects where I can write production ready code,
              apply my experience in the development of web apps and find good
              working environments where I can help others and get good feedback. */}
          <h3 className="section-title">Education</h3>
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
          </ul>
        </main>
      </div>
    </>
  );
};

export default Landing;
