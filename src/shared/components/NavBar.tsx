import { Atom } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface NavItem {
  label: string;
  href: string; // puede ser "/projects" o "#skills"
}

interface NavBarProps {
  items: NavItem[];
}

export const NavBar = ({ items }: NavBarProps) => {

  const [openMenu, setOpenMenu] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

  // Animación al hacer scroll
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const top = element.getBoundingClientRect().top;
        const winHeight = window.innerHeight;
        if (top < winHeight - 100) {
          element.classList.add('animate-fadeIn');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    return () => {
      window.removeEventListener('scroll', animateOnScroll);
      window.removeEventListener('load', animateOnScroll);
    };
  }, []);

  // Scroll suave para enlaces con #
  useEffect(() => {
    const anchors = document.querySelectorAll('a[href^="#"]');

    const handler = (e: Event) => {
      e.preventDefault();
      const anchor = e.currentTarget as HTMLAnchorElement;
      const target = document.querySelector(anchor.getAttribute('href')!);
      target?.scrollIntoView({ behavior: 'smooth' });
    };

    anchors.forEach(a => a.addEventListener('click', handler));
    return () => anchors.forEach(a => a.removeEventListener('click', handler));
  }, []);



  const visibleItems = items.filter(item => {

  // Ocultar anchors si no estamos en home
  if (currentPath !== "/") {
    if (item.href === "#about-me" || item.href === "#skills") {
      return false;
    }
  }

  const token = localStorage.getItem("token");

  // Si hay token, ocultar login
  if (token && item.href === "/login") {
    return false;
  }

  // Si NO hay token, ocultar zona privada
  if (!token && item.href === "/private-zona") {
    return false;
  }

  return true;
});



  return (
    <header className="relative z-10 bg-black">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          
          <a href="/" className="flex gap-2 text-2xl font-bold gradient-text">
            <Atom />
             Alexi Dg
          </a>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {visibleItems.map(item => (
              <a key={item.href} href={item.href} className={`nav-link ${item.href === currentPath  ? "nav-link-active" : ""} ${item.href === '/login' ? 'bg-violet-800 p-2 rounded-lg border-2 border-green-400' : ''}`}>
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile button */}
          <button
            type="button"
            className="md:hidden"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          ref={mobileMenuRef}
          className={`${openMenu ? 'block' : 'hidden'} md:hidden`}
        >
          <div className="px-4 pt-2 pb-3 space-y-1 sm:px-3 grid col-span-1">
            {visibleItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link mobile-nav-link"
                onClick={() => setOpenMenu(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

      </nav>
    </header>
  );
};

