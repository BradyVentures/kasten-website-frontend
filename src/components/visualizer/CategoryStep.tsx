'use client';

import { Sun, Home, DoorOpen, ArrowLeft, Loader2 } from 'lucide-react';
import type { CRMCategory } from '@/lib/api';

interface CategoryStepProps {
  categories: CRMCategory[];
  loading: boolean;
  selected?: string;
  onSelect: (slug: string) => void;
  onBack: () => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  rolllaeden: <Sun size={32} />,
  terrassendaecher: <Home size={32} />,
  fenster: <DoorOpen size={32} />,
};

export default function CategoryStep({ categories, loading, selected, onSelect, onBack }: CategoryStepProps) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader2 size={32} className="mx-auto mb-4 text-brand-red animate-spin" />
        <p className="text-white/70 font-body">Produkte werden geladen...</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/70 font-body">Aktuell sind keine Produkte für den Visualizer verfügbar.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-heading font-bold text-white mb-6 text-center">
        Welches Produkt möchten Sie visualisieren?
      </h3>

      <div className={`grid grid-cols-1 ${categories.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4 mb-8`}>
        {categories.map(cat => (
          <button
            key={cat.slug}
            onClick={() => onSelect(cat.slug)}
            className={`p-6 rounded-xl border-2 text-left transition-all hover:shadow-lg ${
              selected === cat.slug
                ? 'border-brand-red bg-brand-red/5'
                : 'border-white/[0.1] hover:border-brand-red/50'
            }`}
          >
            <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 ${
              selected === cat.slug ? 'bg-brand-red text-white' : 'bg-brand-red/10 text-brand-red'
            }`}>
              {CATEGORY_ICONS[cat.slug] || <Home size={32} />}
            </div>
            <h4 className="font-heading font-bold text-white mb-1">{cat.name}</h4>
            {cat.description && (
              <p className="text-sm text-white/70 font-body">{cat.description}</p>
            )}
          </button>
        ))}
      </div>

      <button
        onClick={onBack}
        className="flex items-center gap-2 text-white/70 font-heading text-sm hover:text-brand-red transition"
      >
        <ArrowLeft size={16} /> Zurück
      </button>
    </div>
  );
}
