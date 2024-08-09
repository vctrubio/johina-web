import Link from 'next/link';

const NavBar = () => {
  return (
    <nav >
 
      <Link href="/" >
        Home
      </Link>
      <Link href="/murals" >
        Murals
      </Link>
      <Link href="/workshops" >
        Workshops
      </Link>
      <Link href="/press" >
        Press
      </Link>
      <Link href="/contact" >
        Contact
      </Link>
    </nav>
  );
};

export default NavBar;


/*
*/