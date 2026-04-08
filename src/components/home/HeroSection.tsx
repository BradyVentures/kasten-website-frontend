'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import Container from '../shared/Container';
import type { Variants } from 'framer-motion';

const HeroScene3D = dynamic(() => import('./HeroScene3D'), { ssr: false });

const slides = [
  { src: '/images/hero/hero-terrassendach.png', alt: 'Terrassendach', label: 'Terrassendächer', href: '/terrassendaecher' },
  { src: '/images/hero/hero-fenster.png', alt: 'Fenster', label: 'Fenster & Türen', href: '/fenster-tueren' },
  { src: '/images/hero/hero-rolllaeden.png', alt: 'Rollläden', label: 'Rollläden', href: '/rolllaeden' },
  { src: '/images/hero/hero-haustuer.png', alt: 'Haustür', label: 'Haustüren', href: '/fenster-tueren' },
];

const heroStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const fadeOut = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const next = useCallback(() => setActive(p => (p + 1) % slides.length), []);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] overflow-hidden bg-brand-navy">

      {/* === BACKGROUND IMAGE CAROUSEL === */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={active}
          className="absolute inset-0 z-0"
          initial={reduced ? false : { opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div className="absolute inset-0" style={reduced ? {} : { y: parallaxY }}>
            <Image
              src={slides[active].src}
              alt={slides[active].alt}
              fill
              className="object-cover"
              priority={active === 0}
              sizes="100vw"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* === OVERLAYS === */}
      {/* Dark cinematic gradient */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-transparent to-black/40" />

      {/* Animated mesh gradient accent */}
      <div className="absolute inset-0 z-[1] opacity-30 mix-blend-overlay">
        <div
          className="absolute -top-1/2 -left-1/4 w-[80vw] h-[80vw] rounded-full animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(199,3,4,0.3) 0%, transparent 70%)',
            animationDuration: '6s',
          }}
        />
        <div
          className="absolute -bottom-1/3 -right-1/4 w-[60vw] h-[60vw] rounded-full animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(199,3,4,0.15) 0%, transparent 70%)',
            animationDuration: '8s',
            animationDelay: '3s',
          }}
        />
      </div>

      {/* 3D Particles overlay */}
      <HeroScene3D />

      {/* === CONTENT === */}
      <motion.div
        className="relative z-10 h-full flex items-center"
        style={reduced ? {} : { opacity: fadeOut }}
      >
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">

            {/* Left: Text content */}
            <motion.div
              className="max-w-xl"
              variants={heroStagger}
              initial="hidden"
              animate="visible"
            >
              {/* Badge */}
              <motion.div variants={fadeUp} className="mb-6">
                <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.12] backdrop-blur-xl border border-white/[0.08]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red" />
                  </span>
                  <span className="text-white/70 text-xs font-heading font-bold tracking-[0.15em] uppercase">
                    Boizenburg & Umgebung
                  </span>
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                className="text-[clamp(2.5rem,6vw,5.5rem)] font-heading font-black text-white leading-[0.95] tracking-tight mb-5"
              >
                Bauelemente
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-red-400 to-brand-red-light">
                  neu gedacht.
                </span>
              </motion.h1>

              {/* Subline */}
              <motion.p
                variants={fadeUp}
                className="text-base md:text-lg text-white/80 font-body leading-relaxed max-w-md mb-8"
              >
                Rollläden, Terrassendächer, Fenster & Haustüren —
                professionelle Beratung, Verkauf und Montage aus einer Hand.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
                <motion.div
                  whileHover={reduced ? {} : { scale: 1.03, y: -2 }}
                  whileTap={reduced ? {} : { scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <Link
                    href="/kontakt"
                    className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-heading font-bold text-white bg-brand-red hover:bg-brand-red-dark rounded-xl transition-colors duration-300 shadow-lg shadow-brand-red/20"
                  >
                    Kostenlose Beratung
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={reduced ? {} : { scale: 1.03, y: -2 }}
                  whileTap={reduced ? {} : { scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <Link
                    href="/visualizer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-heading font-bold text-white/80 hover:text-white rounded-xl border border-white/10 hover:border-white/20 bg-white/[0.04] hover:bg-white/[0.14] backdrop-blur-xl transition-all duration-300"
                  >
                    Produktvorschau testen
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right: Product cards grid */}
            <motion.div
              className="hidden lg:grid grid-cols-2 gap-3 w-[380px] shrink-0"
              variants={heroStagger}
              initial="hidden"
              animate="visible"
            >
              {slides.map((slide, i) => (
                <motion.div key={i} variants={scaleReveal}>
                  <Link
                    href={slide.href}
                    className={`group relative block rounded-2xl overflow-hidden border transition-all duration-500 ${
                      i === active
                        ? 'border-brand-red/40 shadow-lg shadow-brand-red/10'
                        : 'border-white/[0.18] hover:border-white/15'
                    }`}
                    onClick={(e) => { e.preventDefault(); setActive(i); }}
                    onMouseEnter={() => setActive(i)}
                  >
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={slide.src}
                        alt={slide.label}
                        fill
                        className={`object-cover transition-all duration-700 ${
                          i === active ? 'scale-105 brightness-100' : 'scale-100 brightness-[0.6]'
                        }`}
                        sizes="200px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className={`text-xs font-heading font-bold transition-colors duration-300 ${
                        i === active ? 'text-white' : 'text-white/60'
                      }`}>
                        {slide.label}
                      </p>
                      {i === active && (
                        <motion.div
                          className="h-0.5 bg-brand-red rounded-full mt-1.5"
                          layoutId="activeIndicator"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </motion.div>

      {/* === BOTTOM UI === */}

      {/* Mobile slide dots */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex gap-2 lg:hidden">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-full transition-all duration-400 ${
              i === active ? 'w-8 h-2 bg-brand-red' : 'w-2 h-2 bg-white/25'
            }`}
            aria-label={`Bild ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <motion.div
          animate={reduced ? {} : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} className="text-white" />
        </motion.div>
      </motion.div>

    </section>
  );
}
