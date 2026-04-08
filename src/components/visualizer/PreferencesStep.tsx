'use client';

import { useState } from 'react';
import { ArrowLeft, Ruler } from 'lucide-react';
import type { CRMAttribute } from '@/lib/api';

interface PreferencesStepProps {
  categorySlug: string;
  attributes: CRMAttribute[];
  preferences: Record<string, string>;
  onComplete: (preferences: Record<string, string>, requestQuote: boolean, width?: number, height?: number, depth?: number) => void;
  onBack: () => void;
}

const TERRASSENDACH_SLUGS = ['terrassendach', 'terrassendaecher'];

export default function PreferencesStep({ categorySlug, attributes, preferences: initial, onComplete, onBack }: PreferencesStepProps) {
  const [prefs, setPrefs] = useState<Record<string, string>>(initial);
  const [requestQuote, setRequestQuote] = useState(false);
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [depth, setDepth] = useState<string>('');
  const [additional, setAdditional] = useState(initial.additional || '');

  const isTerrassendach = TERRASSENDACH_SLUGS.some(s => categorySlug.includes(s));

  const handleSubmit = () => {
    const result = { ...prefs };
    if (additional.trim()) result.additional = additional.trim();

    if (isTerrassendach) {
      onComplete(result, true,
        width ? parseInt(width, 10) : undefined,
        height ? parseInt(height, 10) : undefined,
        depth ? parseInt(depth, 10) : undefined,
      );
    } else {
      onComplete(result, requestQuote,
        requestQuote && width ? parseInt(width, 10) : undefined,
        requestQuote && height ? parseInt(height, 10) : undefined,
      );
    }
  };

  const inputClass = "w-full px-4 py-3 bg-white/[0.06] border border-white/[0.08] rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition font-body";

  return (
    <div>
      <h3 className="text-lg font-heading font-bold text-white mb-1">Ihre Wünsche</h3>
      <p className="text-white/70 text-sm font-body mb-6">Passen Sie die Details an</p>

      <div className="space-y-6 mb-8">
        {attributes.map(attr => (
          <div key={attr.slug}>
            {attr.attribute_type === 'select' && (
              <>
                <label className="block text-sm font-heading font-bold text-white/80 mb-2">
                  {attr.label}
                </label>
                <div className="flex flex-wrap gap-2">
                  {attr.options.map(opt => {
                    const isColor = opt.value.startsWith('#');
                    const isSelected = prefs[attr.slug] === opt.label;

                    if (isColor) {
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setPrefs(prev => ({ ...prev, [attr.slug]: opt.label }))}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-body transition border ${
                            isSelected ? 'border-brand-red bg-brand-red/10' : 'border-white/[0.08] bg-white/[0.14] hover:border-white/20'
                          }`}
                          title={opt.label}
                        >
                          <span className="w-5 h-5 rounded-full border border-white/20 shrink-0" style={{ backgroundColor: opt.value }} />
                          <span className={`text-xs ${isSelected ? 'font-bold text-white' : 'text-white/80'}`}>{opt.label}</span>
                        </button>
                      );
                    }

                    return (
                      <button
                        key={opt.value}
                        onClick={() => setPrefs(prev => ({ ...prev, [attr.slug]: opt.label }))}
                        className={`px-4 py-2 rounded-lg text-sm font-body transition ${
                          isSelected ? 'bg-brand-red text-white' : 'bg-white/[0.06] text-white/60 hover:bg-white/[0.1] border border-white/[0.08]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {attr.attribute_type === 'boolean' && (
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={prefs[attr.slug] === 'true'}
                  onChange={e => setPrefs(prev => ({ ...prev, [attr.slug]: e.target.checked ? 'true' : 'false' }))}
                  className="w-5 h-5 accent-brand-red"
                />
                <span className="font-heading font-bold text-white/80">{attr.label}</span>
              </label>
            )}
          </div>
        ))}

        {/* Terrassendach dimensions */}
        {isTerrassendach && (
          <div className="border-t border-white/[0.18] pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Ruler size={18} className="text-brand-red" />
              <span className="font-heading font-bold text-white/80">Maße Ihres Terrassendachs</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-heading font-bold text-white/80 mb-1">Breite (mm)</label>
                <input type="number" value={width} onChange={e => setWidth(e.target.value)} placeholder="z.B. 5000" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-heading font-bold text-white/80 mb-1">Höhe (mm)</label>
                <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="z.B. 2500" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-heading font-bold text-white/80 mb-1">Ausfall (mm)</label>
                <input type="number" value={depth} onChange={e => setDepth(e.target.value)} placeholder="z.B. 3500" className={inputClass} />
                <p className="text-[10px] text-white/50 mt-1">Hauswand bis Dachende</p>
              </div>
            </div>
          </div>
        )}

        {/* Other categories: optional quote */}
        {!isTerrassendach && (
          <div className="border-t border-white/[0.18] pt-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={requestQuote} onChange={e => setRequestQuote(e.target.checked)} className="w-5 h-5 accent-brand-red mt-0.5" />
              <div>
                <span className="font-heading font-bold text-white/80 flex items-center gap-2">
                  <Ruler size={18} /> Maße angeben und direkt Angebot erhalten
                </span>
                <span className="text-sm text-white/70 font-body">Wir erstellen Ihnen ein unverbindliches Angebot.</span>
              </div>
            </label>
            {requestQuote && (
              <div className="mt-4 ml-8 grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-heading font-bold text-white/80 mb-1">Breite (mm)</label>
                  <input type="number" value={width} onChange={e => setWidth(e.target.value)} placeholder="z.B. 1200" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold text-white/80 mb-1">Höhe (mm)</label>
                  <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="z.B. 1400" className={inputClass} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Additional wishes */}
        <div>
          <label className="block text-sm font-heading font-bold text-white/80 mb-2">Zusätzliche Wünsche (optional)</label>
          <textarea
            value={additional}
            onChange={e => setAdditional(e.target.value)}
            rows={3}
            className={`${inputClass} resize-none`}
            placeholder="z.B. spezielle Anforderungen..."
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-white/70 font-heading text-sm hover:text-white transition">
          <ArrowLeft size={16} /> Zurück
        </button>
        <button onClick={handleSubmit} className="px-6 py-3 bg-brand-red text-white font-heading font-bold text-sm rounded-xl hover:bg-brand-red-dark transition shadow-lg shadow-brand-red/20">
          Weiter
        </button>
      </div>
    </div>
  );
}
