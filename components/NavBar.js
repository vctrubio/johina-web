import Link from 'next/link';

const NavBar = () => {
  return (
    <nav >
      <div id='logo'>
        <img src='/logo.png' alt='logo' />
      </div>
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