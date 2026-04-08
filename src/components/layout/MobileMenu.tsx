'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, ChevronDown, Phone, Mail } from 'lucide-react';
import { NAV_ITEMS, COMPANY } from '@/lib/constants';
import Button from '../shared/Button';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Slide-in panel */}
      <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-brand-navy/95 backdrop-blur-xl border-l border-white/[0.08] shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-white/[0.08]">
          <span className="text-lg font-heading font-bold text-white">Menü</span>
          <button onClick={onClose} className="p-2 text-white" aria-label="Menü schließen">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {NAV_ITEMS.map(item => (
            <div key={item.label}>
              {'children' in item ? (
                <>
                  <button
                    onClick={() => setExpandedItem(expandedItem === item.label ? null : item.label)}
                    className="w-full flex items-center justify-between px-6 py-3 text-white font-heading font-bold hover:bg-white/[0.04] transition"
                  >
                    {item.label}
                    <ChevronDown size={18} className={`transition-transform ${expandedItem === item.label ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedItem === item.label && (
                    <div className="bg-white/[0.04]">
                      {item.children.map(child => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={onClose}
                          className="block px-10 py-2.5 text-white/70 font-body hover:text-brand-red transition"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block px-6 py-3 text-white font-heading font-bold hover:bg-white/[0.04] transition"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="p-6 border-t border-white/[0.08] space-y-3">
          <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-white font-body">
            <Phone size={18} /> {COMPANY.phone}
          </a>
          <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 text-white font-body">
            <Mail size={18} /> {COMPANY.email}
          </a>
          <Button href="/kontakt" className="w-full mt-4" onClick={onClose}>
            Jetzt anfragen
          </Button>
        </div>
      </div>
    </div>
  );
}
