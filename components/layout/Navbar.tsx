'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={cn(
          'fixed inset-x-0 top-0 z-[100] transition-all duration-700 ease-luxe',
          scrolled
            ? 'bg-ink/80 backdrop-blur-md border-b border-hairline py-4'
            : 'bg-transparent py-6'
        )}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-10">
          <Link
            href="/"
            data-cursor="link"
            className="text-[13px] font-semibold tracking-luxe-sm text-white"
          >
            ELFOTOGABO
          </Link>

          {/* Desktop menu */}
          <ul className="hidden items-center gap-10 md:flex">
            {SITE_CONFIG.nav.map((item) => {
              const href = item.href as string;
              const active =
                pathname === href ||
                (!href.startsWith('/#') && href !== '/' && pathname.startsWith(href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-cursor="link"
                    className={cn(
                      'text-[11px] tracking-luxe-sm text-muted-ink transition-colors duration-500 hover:text-white',
                      active && 'text-white'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setOpen((v) => !v)}
            data-cursor="link"
            className="text-white md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-8 bg-ink md:hidden"
          >
            {SITE_CONFIG.nav.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.1 + i * 0.08,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={item.href}
                  className="text-2xl font-semibold tracking-luxe-sm text-white"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
