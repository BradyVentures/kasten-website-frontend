'use client';

import { useState } from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';
import Link from 'next/link';
import { generateVisualization } from '@/lib/api';
import type { VisualizerState } from '@/app/(marketing)/visualizer/page';

interface ContactStepProps {
  state: VisualizerState;
  onComplete: (requestId: string) => void;
  onBack: () => void;
}

const VALID_PLZ_PREFIXES = ['17', '18', '19', '20', '21', '22', '23', '24', '25', '27', '28', '29', '16'];

function isPlzInRange(plz: string): boolean {
  return VALID_PLZ_PREFIXES.includes(plz.trim().slice(0, 2));
}

export default function ContactStep({ state, onComplete, onBack }: ContactStepProps) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', plz: '', address: '', message: '', gdprConsent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [plzWarning, setPlzWarning] = useState(false);

  const handlePlzChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 5);
    setForm(f => ({ ...f, plz: cleaned }));
    setPlzWarning(cleaned.length >= 2 ? !isPlzInRange(cleaned) : false);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = 'Bitte geben Sie Ihren Namen ein';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Bitte geben Sie eine gültige E-Mail ein';
    if (form.phone.trim().length < 5) errs.phone = 'Bitte geben Sie Ihre Telefonnummer ein';
    if (form.plz.length < 5) errs.plz = 'Bitte geben Sie eine gültige PLZ ein';
    if (!form.gdprConsent) errs.gdprConsent = 'Bitte stimmen Sie der Datenschutzerklärung zu';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setSubmitError(null);
    try {
      const result = await generateVisualization({
        sessionId: state.sessionId,
        filename: state.filename,
        category: state.category,
        categoryName: state.categoryName,
        preferences: state.preferences,
        contact: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: [`PLZ: ${form.plz}`, form.address ? `Adresse: ${form.address}` : '', form.message || ''].filter(Boolean).join(' | '),
        },
        gdprConsent: true,
        requestQuote: state.requestQuote || false,
        width: state.width,
        height: state.height,
        depth: state.depth,
      });
      onComplete(result.requestId);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-white/[0.06] border border-white/[0.08] rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition font-body";

  return (
    <div>
      <h3 className="text-lg font-heading font-bold text-white mb-1">Ihre Kontaktdaten</h3>
      <p className="text-white/70 text-sm font-body mb-6">Damit wir Ihnen die Vorschau zusenden können</p>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-heading font-bold text-white/80 mb-1.5">Name *</label>
            <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputClass} placeholder="Ihr Name" />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-xs font-heading font-bold text-white/80 mb-1.5">PLZ *</label>
            <input
              type="text" inputMode="numeric" value={form.plz} onChange={e => handlePlzChange(e.target.value)}
              className={`${inputClass} ${plzWarning ? 'border-amber-500/50' : ''}`} placeholder="z.B. 19258" maxLength={5}
            />
            {errors.plz && <p className="text-red-400 text-xs mt-1">{errors.plz}</p>}
            {plzWarning && (
              <div className="flex items-start gap-2 mt-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <MapPin size={14} className="text-amber-400 mt-0.5 shrink-0" />
                <p className="text-[11px] text-amber-300/80 font-body">
                  Außerhalb unseres Einzugsgebietes. Anfrage trotzdem möglich.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-heading font-bold text-white/80 mb-1.5">E-Mail *</label>
            <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputClass} placeholder="ihre@email.de" />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-xs font-heading font-bold text-white/80 mb-1.5">Telefon *</label>
            <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={inputClass} placeholder="Ihre Telefonnummer" />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-heading font-bold text-white/80 mb-1.5">Straße & Hausnummer (optional)</label>
          <input type="text" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className={inputClass} placeholder="z.B. Schillerstraße 19" />
        </div>

        <div>
          <label className="block text-xs font-heading font-bold text-white/80 mb-1.5">Nachricht (optional)</label>
          <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={3} className={`${inputClass} resize-none`} placeholder="Weitere Wünsche oder Fragen?" />
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={form.gdprConsent} onChange={e => setForm(f => ({ ...f, gdprConsent: e.target.checked }))} className="mt-1 w-4 h-4 accent-brand-red" />
          <span className="text-xs text-white/70 font-body">
            Ich stimme der <Link href="/datenschutz" target="_blank" className="text-brand-red underline">Datenschutzerklärung</Link> zu
            und bin damit einverstanden, dass mein Foto zur Erstellung der Produktvorschau verarbeitet wird. *
          </span>
        </label>
        {errors.gdprConsent && <p className="text-red-400 text-xs">{errors.gdprConsent}</p>}
      </div>

      {submitError && <p className="text-red-400 font-body text-sm mb-4">{submitError}</p>}

      <div className="flex justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-white/70 font-heading text-sm hover:text-white transition">
          <ArrowLeft size={16} /> Zurück
        </button>
        <button onClick={handleSubmit} disabled={loading}
          className="px-6 py-3 bg-brand-red text-white font-heading font-bold text-sm rounded-xl hover:bg-brand-red-dark transition shadow-lg shadow-brand-red/20 disabled:opacity-50">
          {loading ? 'Wird generiert...' : 'Vorschau generieren'}
        </button>
      </div>
    </div>
  );
}
