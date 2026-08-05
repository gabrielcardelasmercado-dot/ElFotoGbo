'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';

const BIO_PARAGRAPHS = [
  'Soy Gabriel Cardelas, fotógrafo y creador visual.',
  'Creo que una fotografía debe transmitir algo incluso antes de ser explicada.',
  'Cada proyecto representa una oportunidad para construir imágenes que permanezcan en la memoria.',
  'Mi trabajo combina dirección artística, composición y una búsqueda constante por crear fotografías con identidad.',
];

/**
 * "SOBRE MÍ" — editorial split layout with a large vertical portrait
 * (behind-the-scenes feel) on one side and the bio + social buttons on the
 * other. Instagram opens the official profile in a new tab; WhatsApp opens
 * the configured wa.me link in a new tab.
 */
export function SobreMi() {
  return (
    <section
      id="sobre-mi"
      className="relative flex min-h-screen items-center overflow-hidden px-6 py-30 md:px-10"
    >
      <div className="mx-auto grid w-full max-w-[1500px] items-center gap-16 md:grid-cols-2 md:gap-24">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <div className="relative aspect-[4/5] w-full max-w-[460px] overflow-hidden bg-card-ink">
            <Image
              src="/images/sobre-mi.jpg"
              alt="Gabriel Cardelas — fotógrafo"
              fill
              sizes="(max-width: 768px) 100vw, 460px"
              className="object-cover transition-transform duration-1000 ease-luxe hover:scale-[1.04]"
            />
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="flex flex-col"
        >
          <h2 className="text-4xl font-bold tracking-luxe-sm text-white md:text-6xl">
            SOBRE MÍ
          </h2>

          <div className="mt-8 flex max-w-md flex-col gap-5">
            {BIO_PARAGRAPHS.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? 'text-base leading-relaxed text-white md:text-lg'
                    : 'text-sm leading-relaxed text-muted-ink md:text-base'
                }
              >
                {p}
              </p>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-5">
            <SocialButton
              href={SITE_CONFIG.social.instagram}
              icon={<Instagram size={16} />}
              label="Instagram"
            />
            <SocialButton
              href={SITE_CONFIG.social.whatsapp}
              icon={<MessageCircle size={16} />}
              label="WhatsApp"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="link"
      className="group inline-flex items-center gap-3 border border-hairline px-6 py-3 text-[11px] tracking-luxe-sm text-white transition-colors duration-500 hover:border-white/30"
    >
      {icon}
      {label}
      <span className="transition-transform duration-500 ease-luxe group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
