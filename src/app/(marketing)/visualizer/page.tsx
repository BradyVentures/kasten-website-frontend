'use client';

import { useState, useEffect } from 'react';
import Container from '@/components/shared/Container';
import PageBackground from '@/components/shared/PageBackground';
import PageHeader from '@/components/shared/PageHeader';
import ProductUploadStep from '@/components/visualizer/ProductUploadStep';
import PreferencesStep from '@/components/visualizer/PreferencesStep';
import ContactStep from '@/components/visualizer/ContactStep';
import ProcessingView from '@/components/visualizer/ProcessingView';
import { getVisualizerCategories, type CRMCategory } from '@/lib/api';

export interface VisualizerState {
  sessionId: string;
  filename: string;
  imageUrl: string;
  category: string;
  categoryName: string;
  preferences: Record<string, string>;
  requestQuote: boolean;
  width?: number;
  height?: number;
  depth?: number;
  contact: {
    name: string;
    email: string;
    phone?: string;
    message?: string;
  };
  requestId?: string;
}

const STEPS = ['Produkt & Foto', 'Details', 'Kontakt'];

export default function VisualizerPage() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<Partial<VisualizerState>>({});
  const [categories, setCategories] = useState<CRMCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    getVisualizerCategories()
      .then(setCategories)
      .catch(err => console.error('Failed to load categories:', err))
      .finally(() => setLoadingCategories(false));
  }, []);

  const selectedCategory = categories.find(c => c.slug === state.category);

  return (
    <>
      <PageBackground image="/images/hero/hero-haustuer.png" />
      <div className="relative z-[1]">
        <PageHeader
          badge="In Sekunden visualisieren"
          title="Produktvorschau."
          subtitle="Sehen Sie, wie unsere Produkte an Ihrem Zuhause aussehen würden."
        />

        {/* Stepper */}
        {step < 3 && (
          <Container>
            <div className="flex items-center justify-center gap-3 mb-8 max-w-md mx-auto">
              {STEPS.map((label, i) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-heading font-bold transition-all duration-300 ${
                      i < step
                        ? 'bg-brand-red text-white'
                        : i === step
                          ? 'bg-white text-white ring-2 ring-brand-red ring-offset-2 ring-offset-brand-navy'
                          : 'bg-white/10 text-white/70'
                    }`}>
                      {i < step ? '✓' : i + 1}
                    </div>
                    <span className={`hidden sm:inline text-sm font-heading transition-colors duration-300 ${
                      i <= step ? 'text-white font-bold' : 'text-white/50'
                    }`}>
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`w-8 md:w-12 h-px transition-colors duration-300 ${i < step ? 'bg-brand-red' : 'bg-white/10'}`} />
                  )}
                </div>
              ))}
            </div>
          </Container>
        )}

        {/* Content */}
        <Container>
          <div className={`mx-auto ${step < 3 ? 'max-w-3xl' : 'max-w-2xl'}`}>
            <div className={step < 3 ? 'rounded-2xl border border-white/[0.18] bg-white/[0.14] backdrop-blur-sm p-6 md:p-10' : ''}>

              {step === 0 && (
                <ProductUploadStep
                  categories={categories}
                  loading={loadingCategories}
                  onComplete={(data) => {
                    setState(prev => ({ ...prev, ...data }));
                    setStep(1);
                  }}
                />
              )}

              {step === 1 && selectedCategory && (
                <PreferencesStep
                  categorySlug={state.category || ''}
                  attributes={selectedCategory.attributes}
                  preferences={state.preferences || {}}
                  onComplete={(preferences, requestQuote, width, height, depth) => {
                    setState(prev => ({ ...prev, preferences, requestQuote, width, height, depth }));
                    setStep(2);
                  }}
                  onBack={() => setStep(0)}
                />
              )}

              {step === 2 && (
                <ContactStep
                  state={state as VisualizerState}
                  onComplete={(requestId) => {
                    setState(prev => ({ ...prev, requestId }));
                    setStep(3);
                  }}
                  onBack={() => setStep(1)}
                />
              )}

              {step === 3 && state.requestId && (
                <ProcessingView requestId={state.requestId} />
              )}
            </div>
          </div>
        </Container>
        <div className="h-20" />
      </div>
    </>
  );
}
