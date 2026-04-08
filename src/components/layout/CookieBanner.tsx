'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '../shared/Button';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  const handleAcceptEssential = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({ essential: true, analytics: false }));
    setVisible(false);
  };

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({ essential: true, analytics: true }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[70] bg-brand-navy/95 backdrop-blur-xl border-t border-white/[0.1] shadow-2xl p-4 md:p-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-white/70 font-body">
            Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten.
            Weitere Informationen finden Sie in unserer{' '}
            <Link href="/datenschutz" className="text-brand-red underline">Datenschutzerklärung</Link>.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Button variant="outline" size="sm" onClick={handleAcceptEssential}>
            Nur notwendige
          </Button>
          <Button size="sm" onClick={handleAcceptAll}>
            Alle akzeptieren
          </Button>
        </div>
      </div>
    </div>
  );
}
