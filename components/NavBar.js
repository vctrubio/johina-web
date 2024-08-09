import Link from 'next/link';

const NavBar = () => {
  return (
    <nav >
      <Link href="/murals" >
        Murals
      </Link>
      <Link href="/press" >
        Press
      </Link>
      <Link href="/about" >
        About
      </Link>
    </nav>
  );
};

export default NavBar;


/*
        <Link href="/contact" >
          Contact
        </Link>
        <Link href="/workshops" >
          Workshops
        </Link>
*/