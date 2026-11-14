import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { brand } from '../data/assets';
import { navLinks, site } from '../data/site';

export default function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = pathname === '/';
  // Transparent over the dark hero on the home page; solid everywhere else / after scrolling.
  const solid = scrolled || !isHome || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const text = solid ? 'text-ink' : 'text-paper';

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? 'border-b border-line bg-paper/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="container-page flex h-[72px] items-center justify-between" aria-label="Primary">
        <Link to="/" className={`flex items-center gap-3 ${text}`} aria-label={`${site.name} — home`}>
          <span className="flex h-11 w-11 items-center justify-center bg-paper p-1.5">
            <img src={brand.logoMark.src} alt="" width={brand.logoMark.width} height={brand.logoMark.height} className="h-full w-auto object-contain" />
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-xl font-semibold tracking-wide">{site.name}</span>
            <span className="label !text-[10px] opacity-70">{site.role}</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {navLinks.map((l) => (
            <li key={l.hash}>
              <Link
                to={{ pathname: '/', hash: `#${l.hash}` }}
                className={`label relative py-2 transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full ${text}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Link
            to={{ pathname: '/', hash: '#contact' }}
            className={`btn hidden !px-5 !py-3 sm:inline-flex ${solid ? 'btn-solid' : 'btn-light'}`}
          >
            Get in Touch
          </Link>
          <button
            type="button"
            className={`flex h-11 w-11 items-center justify-center lg:hidden ${text}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

    </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-paper lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="container-page flex flex-col py-8">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.hash}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                  className="border-b border-line"
                >
                  <Link
                    to={{ pathname: '/', hash: `#${l.hash}` }}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-5 font-display text-4xl text-ink"
                  >
                    {l.label}
                    <span className="label text-accent-deep">0{i + 1}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
