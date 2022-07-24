import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Leandro Fernandez</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <header>
        <div id="main-data">
            <h1>Leandro Fernandez</h1>
          </div>
          <ul className="personal-data">
            <li className="listItem">
              <span>
                <Image src="/location-pointer.svg" alt="location icon" width={20} height={20} />{" "}
                Argentina
              </span>
            </li>
            <li className="listItem">
              <span>
                <Image src="/email.svg" alt="email icon" width={20} height={20} />{" "}
                leandroofernandezz@gmail.com
              </span>
            </li>
            <li className="listItem">
              <span>
                <Image src="/phone.svg" alt="phone icon" width={20} height={20} /> +54 1168521053
              </span>
            </li>
            <li className="listItem">
              <span>
                <Image src="/github.svg" alt="github icon" width={20} height={20} />{" "}
                <a className="link"
                  href="https://github.com/leandroFernandez94"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  leandroFernandez94
                </a>
              </span>
            </li>
          </ul>
        </header>

        <hr className="main-line" />
        <p className='paragraph'>
        <h3 className="section-title">About me</h3>
          I started coding in high school and never stopped since then. I have a 
          fullstack background, with most of my experience being related to frontend technologies, I have been working with
          React + Node.js stacks for a long time(5+ years) building web apps.
          <br />
          When I am not facing a computer screen, I enjoy singing(used to have a band), playing padel or watching TV shows
          with my girlfriend.
          <h4>Motivations</h4>
          <ul>
            <li className="listItem">
              Coming up with ideas that could be transformed into helpful utilities.
            </li>
            <li className="listItem">
              Elaborating solutions for challenging technical problems and documenting them the best way I can.
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
        </p>
        <h3 className="section-title">Education</h3>
        <ul>
          <li className="listItem">
            Currently focused on applying to courses and workshops 
            to keep myself updated in terms of new technologies
            that can help me become a better engineer.
          </li>
          <li className="listItem">Systems Engineering at UTN, 2013 - stopped in 2018.</li>
          <li className="listItem">
            Computer Technician at E.T. 35 D.E. 18 Ing. Eduardo Latzina, 2008 -
            2013.
          </li>
          <li className="listItem">English level: Firsts Certificate with a B qualification.</li>
        </ul>
        <h3 className="section-title">Experience</h3>

        <h4>
          <a className="link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.sibly.com/"
          >
            Sibly
          </a>{" "}
          February 2021 - Present day:
        </h4>
        <ul>
          <li className="listItem">First experience working remotely with an international team.</li>
          <li className="listItem">
            Replatform: Accomplished a project to refactor an old jquery web app into a new react dashboard.
          </li>
          <li className="listItem">
            Improved performance and code reliability issues adding typescript to the project.
          </li>
          <li className="listItem">Added jest unit tests to improve code coverage on both components and Store logic.</li>
          <li className="listItem">
            Developed new features working alongside product and designers team.
          </li>
          <li className="listItem">
            Dealt with complex challenges related to websockets and messaging events using sendbird SDK.
          </li>
          <li className="listItem">
            Worked on timezone dependant features for a webapp used by people in different zones of the world.
          </li>
          <li className="listItem">Lead the development of a new web platform for users of sibly.</li>
          <li className="listItem">Experience using an AWS setup with s3 and cloudfront.</li>
        </ul>


        <h4>
          <a className="link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.bons.io/"
          >
            Bons
          </a>{" "}
          October 2018 - January 2021:
        </h4>
        <ul>
          <li className="listItem">
            Frontend development of{" "}
            <a className="link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.produck.io/"
            >
              Produck
            </a>{" "}
            Progressive web app built with React and connected to a backend using graphQL queries.
          </li>
          <li className="listItem">
            Implemented performance improvements to a React app that has complex components 
            connected to a very large state using the apollo graphQL client while also considering 
            optimistic results and caching strategies.
          </li>
          <li className="listItem">
            Developed react and vuejs web apps integrated to{" "}
            <a className="link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://webflow.com/"
            >
              webflow
            </a>{" "}
            for many of Bons clients. Using a custom stack with nodeJS + airtable
            + mongoDB in the backend served by a Vercel serverless BE.
          </li>
        </ul>


        <h4>
          <a className="link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://despegar.com"
          >
            Despegar.com
          </a>{" "}
          August 2015 - October 2018:
        </h4>
        <ul>
          <li className="listItem">
            Received training during &quot;Alto Vuelo&quot; course imparted by leaders of
            backend, frontend and mobile teams.
          </li>
          <li className="listItem">Development of REST APIs written in JAVA, SCALA and node.js.</li>
          <li className="listItem">Development of user interfaces powered by angularjs and React.</li>
        </ul>
        {/* <h3 className="section-title">Key technologies I have worked with</h3>
        <ul>
          <li className="listItem">
            <b>OS:</b> Linux, MacOS
          </li>
          <li className="listItem">
            <b>Frontend stack: </b>React, Vue, Angular, Redux, Mobx State Tree, NextJS,
            Apollo(GraphQL), Webpack, PWAs
          </li>
          <li className="listItem">
            <b>Backend stack: </b> Nodejs(with typescript) powered by
            express/vercel, MongoDB, sql based DBs, redis
          </li>
        </ul> */}
      </main>
    </div>
  )
}

export default Home
