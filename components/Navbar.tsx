import Link from 'next/link'
import useChangeBGOnScroll from '../hooks/useChangeBGOnScroll'
import styles from './navbar.module.scss'
import cn from 'classnames';

const Navbar = () => {
  const navRef = useChangeBGOnScroll<HTMLElement>({})

  return (
    <nav className={cn(styles.nav, "main-content")} ref={navRef}>
      <ul>
        <li>
          <Link href="/">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about-me">
            About me
          </Link>
        </li>
        <li>
          <Link href="/resume">
            Resume
          </Link>
          
        </li>
        <li>
          <Link href="/blog">
            Blog
          </Link>
          
        </li>
      </ul>
    </nav>
  )
}

export default Navbar