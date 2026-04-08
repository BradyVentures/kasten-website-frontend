'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, ChevronDown, Phone } from 'lucide-react';
import { NAV_ITEMS, COMPANY } from '@/lib/constants';
import Container from '../shared/Container';
import Button from '../shared/Button';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Transparent when at top, solid when scrolled — on ALL pages
  const solid = scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          solid
            ? 'bg-brand-navy/90 backdrop-blur-xl shadow-lg shadow-black/10 border-b border-white/[0.18]'
            : 'bg-transparent'
        }`}
      >
        <Container className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/OKB_Logo_Light.svg"
              alt="Olaf Kasten Bauelemente"
              width={200}
              height={60}
              className="h-12 md:h-14 w-auto transition-all duration-300"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => 'children' in item ? setOpenDropdown(item.label) : undefined}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {'children' in item ? (
                  <button
                    className={`flex items-center gap-1 px-4 py-2 font-heading font-bold transition-colors duration-300 ${
                      'text-white/80 hover:text-brand-red'
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-4 py-2 font-heading font-bold transition-colors duration-300 ${
                      'text-white/80 hover:text-brand-red'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}

                {'children' in item && openDropdown === item.label && (
                  <div className="absolute top-full left-0 bg-brand-navy/95 backdrop-blur-xl shadow-lg rounded-xl py-2 min-w-[200px] border border-white/[0.08]">
                    {item.children.map(child => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2 text-white/70 font-body hover:bg-white/[0.06] hover:text-white transition"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
              className={`flex items-center gap-1.5 text-sm font-heading font-bold transition-colors duration-300 ${
                'text-white/80 hover:text-brand-red'
              }`}
            >
              <Phone size={15} />
              {COMPANY.phone}
            </a>
            <Button
              href="/kontakt"
              size="sm"
              variant="primary"
            >
              Jetzt anfragen
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden p-2 transition-colors duration-300 ${
              'text-white'
            }`}
            onClick={() => setMobileOpen(true)}
            aria-label="Menü öffnen"
          >
            <Menu size={28} />
          </button>
        </Container>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
