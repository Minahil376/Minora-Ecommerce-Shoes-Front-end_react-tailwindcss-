import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../App';

interface NavbarProps {
  onSearchOpen: () => void;
}

export default function Navbar({ onSearchOpen }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();
  const navMenuRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        menuOpen &&
        navMenuRef.current &&
        menuToggleRef.current &&
        !navMenuRef.current.contains(e.target as Node) &&
        !menuToggleRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center h-20 justify-between">
          {/* Logo */}
          <div className="flex items-center h-full">
            <Link to="/" className="hover:scale-105 transition-transform duration-300 inline-block">
              <img
                src="/images/Minoralogo3 .png"
                alt="Minora Logo"
                className="h-12 w-32 object-contain"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div
            ref={navMenuRef}
            className={`
              flex-1 flex justify-center items-center
              max-md:absolute max-md:top-20 max-md:left-0 max-md:right-0
              max-md:bg-white max-md:border-t-2 max-md:border-rose-600
              max-md:shadow-[0_10px_30px_rgba(0,0,0,0.15)] max-md:z-[100]
              max-md:overflow-hidden max-md:transition-all max-md:duration-400
              ${menuOpen
                ? 'max-md:flex max-md:flex-col max-md:max-h-[400px] max-md:opacity-100 max-md:py-4'
                : 'max-md:hidden max-md:max-h-0 max-md:opacity-0'
              }
            `}
          >
            <ul className="flex gap-8 max-md:flex-col max-md:gap-0 max-md:w-full">
              {[
                { to: '/', label: 'Home' },
                { to: '/shop', label: 'Shop' },
                { to: '/login', label: 'Login' },
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Contact Us' },
                { to: '/dashboard', label: 'Dashboard' },
              ].map(({ to, label }) => (
                <li key={to} className="relative list-none max-md:w-full">
                  <Link
                    to={to}
                    className={`
                      font-semibold pb-1 border-b-[3px] transition-all duration-300
                      max-md:block max-md:px-6 max-md:py-3 max-md:border-b max-md:border-gray-100
                      max-md:font-semibold max-md:border-b-0
                      ${isActive(to)
                        ? 'text-rose-500 border-rose-500 max-md:bg-rose-100 max-md:text-rose-600 max-md:border-l-4 max-md:border-rose-600 max-md:pl-5'
                        : 'text-[#2B3467] border-transparent hover:text-rose-500 hover:border-rose-500 max-md:hover:bg-rose-50 max-md:hover:text-rose-600 max-md:hover:pl-8'
                      }
                    `}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-5 py-2 bg-rose-600 text-white font-bold text-sm rounded-md transition-all duration-300 shadow-[0_2px_8px_rgba(225,29,72,0.2)] hover:bg-rose-500 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(225,29,72,0.3)] whitespace-nowrap lg:px-5 lg:text-sm md:px-4 md:text-[0.8rem] max-sm:px-[10px] max-sm:text-[0.65rem]"
            >
              Sign Up
            </Link>
            <button
              aria-label="Search"
              onClick={onSearchOpen}
              className="cursor-pointer bg-transparent border-none text-[#2B3467] text-xl inline-flex items-center justify-content-center transition-all duration-300 hover:text-rose-500"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <Link to="/cart" className="relative text-[#2B3467] text-xl hover:text-rose-500 transition-all duration-300">
              <i className="fa-solid fa-bag-shopping"></i>
              <span className="absolute -top-1.5 -right-2 bg-rose-600 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">
                {totalItems}
              </span>
            </Link>
            <button
              ref={menuToggleRef}
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((prev) => !prev);
              }}
              className={`hidden max-md:block ml-4 text-2xl bg-transparent border-none cursor-pointer p-1 transition-all duration-300 ${menuOpen ? 'text-rose-500' : 'text-[#2B3467]'}`}
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
