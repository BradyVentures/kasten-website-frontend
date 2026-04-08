'use client';

import { CheckCircle, RotateCcw, Phone } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

interface ResultViewProps {
  resultImageUrl: string;
  requestId: string;
}

export default function ResultView({ resultImageUrl }: ResultViewProps) {
  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <CheckCircle size={48} className="mx-auto mb-4 text-green-400" />
        <h3 className="text-2xl font-heading font-bold text-white mb-2">Ihre Vorschau ist fertig!</h3>
        <p className="text-white/80 font-body">So könnte Ihr Zuhause mit unseren Produkten aussehen:</p>
      </div>

      <div className="rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl mb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={resultImageUrl} alt="Produktvorschau" className="w-full" />
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-8">
        <p className="text-xs text-amber-300/80 font-body">
          Dies ist eine automatisch generierte Vorschau. Das tatsächliche Ergebnis kann abweichen. Für eine exakte Planung kontaktieren Sie uns gerne.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a href="/kontakt" className="inline-flex items-center justify-center px-6 py-3 bg-brand-red text-white font-heading font-bold text-sm rounded-xl hover:bg-brand-red-dark transition shadow-lg shadow-brand-red/20">
          Kostenlose Beratung anfragen
        </a>
        <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/10 bg-white/[0.04] text-white/80 font-heading font-bold text-sm rounded-xl hover:bg-white/[0.14] transition">
          <Phone size={16} /> {COMPANY.phone}
        </a>
        <a href="/visualizer" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/10 bg-white/[0.04] text-white/80 font-heading font-bold text-sm rounded-xl hover:bg-white/[0.14] transition">
          <RotateCcw size={16} /> Neues Bild
        </a>
      </div>
    </div>
  );
}
