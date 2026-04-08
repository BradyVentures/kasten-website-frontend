'use client';

import { useState } from 'react';
import { contactSchema, type ContactFormData } from '@/lib/validations';
import { submitContact } from '@/lib/api';

interface ContactFormProps {
  defaultProductInterest?: string;
}

const inputClass = "w-full px-4 py-3 bg-white/[0.06] border border-white/[0.08] rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition font-body";

export default function ContactForm({ defaultProductInterest }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '', email: '', phone: '', message: '', product_interest: defaultProductInterest || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach(issue => { if (issue.path[0]) fieldErrors[issue.path[0] as string] = issue.message; });
      setErrors(fieldErrors);
      return;
    }
    setStatus('loading');
    try {
      await submitContact(result.data);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '', product_interest: '' });
    } catch { setStatus('error'); }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-8 text-center">
        <h3 className="text-xl font-heading font-bold text-green-400 mb-2">Vielen Dank!</h3>
        <p className="text-green-300/70 font-body">Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns schnellstmöglich bei Ihnen.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-heading font-bold text-white/80 mb-1.5">Name *</label>
          <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputClass} placeholder="Ihr Name" />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-xs font-heading font-bold text-white/80 mb-1.5">E-Mail *</label>
          <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className={inputClass} placeholder="ihre@email.de" />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-heading font-bold text-white/80 mb-1.5">Telefon</label>
          <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className={inputClass} placeholder="Ihre Telefonnummer" />
        </div>
        <div>
          <label className="block text-xs font-heading font-bold text-white/80 mb-1.5">Interesse</label>
          <select value={formData.product_interest} onChange={e => setFormData({ ...formData, product_interest: e.target.value })} className={inputClass}>
            <option value="">Bitte wählen...</option>
            <option value="rolllaeden">Rollläden & Sonnenschutz</option>
            <option value="terrassendaecher">Terrassendächer</option>
            <option value="fenster-tueren">Fenster & Haustüren</option>
            <option value="reparatur">Reparaturservice</option>
            <option value="sonstiges">Sonstiges</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-heading font-bold text-white/80 mb-1.5">Nachricht</label>
        <textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} rows={4} className={`${inputClass} resize-none`} placeholder="Wie können wir Ihnen helfen?" />
      </div>
      {status === 'error' && <p className="text-red-400 font-body text-sm">Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.</p>}
      <button type="submit" disabled={status === 'loading'} className="px-8 py-3.5 bg-brand-red text-white font-heading font-bold text-sm rounded-xl hover:bg-brand-red-dark transition shadow-lg shadow-brand-red/20 disabled:opacity-50">
        {status === 'loading' ? 'Wird gesendet...' : 'Anfrage senden'}
      </button>
    </form>
  );
}
