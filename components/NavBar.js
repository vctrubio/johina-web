'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NavBar = () => {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  return (
    <nav>
      <Link href="/" className={currentPath === '/' ? 'active' : ''}>
        Home
      </Link>
      <Link href="/murals" className={currentPath === '/murals' ? 'active' : ''}>
        Murals
      </Link>
      <Link href="/workshops" className={currentPath === '/workshops' ? 'active' : ''}>
        Workshops
      </Link>
      <Link href="/press" className={currentPath === '/press' ? 'active' : ''}>
        Press
      </Link>
      <Link href="/contact" className={currentPath === '/contact' ? 'active' : ''}>
        Contact
      </Link>
    </nav>
  );
};

export default NavBar;