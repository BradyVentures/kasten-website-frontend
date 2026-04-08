'use client';

import { useState, useEffect } from 'react';
import { Loader2, AlertCircle, Clock } from 'lucide-react';
import { checkVisualizerStatus } from '@/lib/api';
import ResultView from './ResultView';

interface ProcessingViewProps {
  requestId: string;
}

export default function ProcessingView({ requestId }: ProcessingViewProps) {
  const [status, setStatus] = useState<string>('processing');
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (status !== 'processing') return;
    const interval = setInterval(async () => {
      try {
        const data = await checkVisualizerStatus(requestId);
        setStatus(data.status);
        if (data.resultImageUrl) setResultUrl(data.resultImageUrl);
      } catch {
        setError(true);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [requestId, status]);

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle size={48} className="mx-auto mb-4 text-red-400" />
        <h3 className="text-xl font-heading font-bold text-white mb-2">Etwas ist schiefgelaufen</h3>
        <p className="text-white/80 font-body mb-6">Die Vorschau konnte nicht erstellt werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.</p>
        <a href="/kontakt" className="inline-flex px-6 py-3 bg-brand-red text-white font-heading font-bold text-sm rounded-xl hover:bg-brand-red-dark transition">Kontakt aufnehmen</a>
      </div>
    );
  }

  if (status === 'queued') {
    return (
      <div className="text-center py-12">
        <Clock size={48} className="mx-auto mb-4 text-white/60" />
        <h3 className="text-xl font-heading font-bold text-white mb-2">In der Warteschlange</h3>
        <p className="text-white/80 font-body mb-6">Das tägliche Limit für Vorschau-Generierungen ist erreicht. Sie erhalten das Ergebnis per E-Mail.</p>
        <a href="/" className="inline-flex px-6 py-3 bg-white/[0.06] border border-white/10 text-white font-heading font-bold text-sm rounded-xl hover:bg-white/[0.1] transition">Zurück zur Startseite</a>
      </div>
    );
  }

  if (status === 'completed' && resultUrl) {
    return <ResultView resultImageUrl={resultUrl} requestId={requestId} />;
  }

  if (status === 'failed') {
    return (
      <div className="text-center py-12">
        <AlertCircle size={48} className="mx-auto mb-4 text-red-400" />
        <h3 className="text-xl font-heading font-bold text-white mb-2">Generierung fehlgeschlagen</h3>
        <p className="text-white/80 font-body mb-6">Die Vorschau konnte leider nicht erstellt werden. Ihre Anfrage wurde trotzdem gespeichert — wir melden uns bei Ihnen.</p>
        <a href="/kontakt" className="inline-flex px-6 py-3 bg-brand-red text-white font-heading font-bold text-sm rounded-xl hover:bg-brand-red-dark transition">Kontakt aufnehmen</a>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <Loader2 size={48} className="mx-auto mb-4 text-brand-red animate-spin" />
      <h3 className="text-xl font-heading font-bold text-white mb-2">Ihre Vorschau wird erstellt...</h3>
      <p className="text-white/80 font-body mb-6">Wir erstellen gerade eine realistische Vorschau. Das dauert normalerweise 15-60 Sekunden.</p>
      <div className="bg-white/[0.14] border border-white/[0.18] rounded-xl p-5 max-w-md mx-auto">
        <p className="text-xs text-white/70 font-body">Wussten Sie? Moderne Rollläden können Ihre Heizkosten um bis zu 30% senken und bieten gleichzeitig Einbruchschutz.</p>
      </div>
    </div>
  );
}
