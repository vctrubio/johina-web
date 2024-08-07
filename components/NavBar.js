import Link from 'next/link';
import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.row}>
        <Link href="/murals" className={styles.link}>
          Murals
        </Link>
        <Link href="/press" className={styles.link}>
          Press
        </Link>
        <Link href="/workshops" className={styles.link}>
          Workshops
        </Link>
      </div>
      <div className={styles.row}>
        <Link href="/contact" className={styles.link}>
          Contact
        </Link>
        <Link href="/about" className={styles.link}>
          About
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;