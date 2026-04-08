'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Container from '@/components/shared/Container';
import ProcessingView from '@/components/visualizer/ProcessingView';

function ErgebnisContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  if (!id) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-heading font-bold text-white mb-4">Kein Ergebnis gefunden</h1>
        <p className="text-white/80 font-body">
          Bitte nutzen Sie die <a href="/visualizer" className="text-brand-red underline">Produktvorschau</a>, um eine neue Vorschau zu erstellen.
        </p>
      </div>
    );
  }

  return <ProcessingView requestId={id} />;
}

export default function ErgebnisPage() {
  return (
    <section className="min-h-screen py-20">
      <Container className="max-w-2xl">
        <Suspense fallback={<div className="text-center py-20 text-white/70">Laden...</div>}>
          <ErgebnisContent />
        </Suspense>
      </Container>
    </section>
  );
}
