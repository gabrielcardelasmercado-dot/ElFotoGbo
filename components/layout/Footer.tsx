'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SITE_CONFIG } from '@/lib/site-config';

export function Footer() {
  return (
    <footer
      id="contacto"
      className="border-t border-hairline bg-ink px-6 py-20 md:px-10 md:py-30"
    >
      <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl font-bold tracking-luxe-sm text-white md:text-5xl"
        >
          ELFOTOGABO
        </motion.h2>

        <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          <FooterLink href={SITE_CONFIG.social.instagram} external>
            Instagram
          </FooterLink>
          <FooterLink href={SITE_CONFIG.social.facebook} external>
            Facebook
          </FooterLink>
          <FooterLink href={SITE_CONFIG.social.whatsapp} external>
            WhatsApp
          </FooterLink>
        </nav>

        <p className="text-[11px] tracking-luxe-sm text-muted-ink/70">
          © {new Date().getFullYear()} ELFOTOGABO · GABRIEL CARDELAS · TODOS LOS DERECHOS RESERVADOS
        </p>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      data-cursor="link"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="text-[11px] tracking-luxe-sm text-muted-ink transition-colors duration-500 hover:text-white"
    >
      {children}
    </Link>
  );
}
