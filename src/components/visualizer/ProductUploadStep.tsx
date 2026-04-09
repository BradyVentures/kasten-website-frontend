'use client';

import { useState, useCallback, useRef } from 'react';
import { Upload, X, Camera, Sun, Home, DoorOpen, Loader2, Image as ImageIcon } from 'lucide-react';
import { uploadVisualizerImage, type CRMCategory } from '@/lib/api';

interface ProductUploadStepProps {
  categories: CRMCategory[];
  loading: boolean;
  onComplete: (data: {
    sessionId: string;
    filename: string;
    imageUrl: string;
    category: string;
    categoryName: string;
  }) => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  rolllaeden: <Sun size={24} />,
  terrassendaecher: <Home size={24} />,
  fenster: <DoorOpen size={24} />,
};

export default function ProductUploadStep({ categories, loading, onComplete }: ProductUploadStepProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((f: File | null) => {
    if (!f) return;
    if (f.size > 10 * 1024 * 1024) {
      setError('Die Datei ist zu groß. Maximal 10 MB.');
      return;
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(f.type)) {
      setError('Bitte laden Sie ein JPEG, PNG oder WebP Bild hoch.');
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError(null);
  }, []);

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleContinue = async () => {
    if (!file || !selectedCategory) return;
    setUploading(true);
    setError(null);
    try {
      const result = await uploadVisualizerImage(file);
      const cat = categories.find(c => c.slug === selectedCategory);
      onComplete({
        ...result,
        category: selectedCategory,
        categoryName: cat?.name || selectedCategory,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload fehlgeschlagen');
    } finally {
      setUploading(false);
    }
  };

  const canContinue = selectedCategory && file && !uploading;

  return (
    <div className="space-y-8">
      {/* Section 1: Product selection */}
      <div>
        <h3 className="text-lg font-heading font-bold text-white mb-1">
          Welches Produkt interessiert Sie?
        </h3>
        <p className="text-white/70 text-sm font-body mb-4">Wählen Sie eine Kategorie</p>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 size={24} className="text-brand-red animate-spin" />
          </div>
        ) : (
          <div className={`grid grid-cols-1 ${categories.length >= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-3`}>
            {categories.map(cat => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`group relative p-4 rounded-xl border text-left transition-all duration-300 ${
                  selectedCategory === cat.slug
                    ? 'border-brand-red bg-brand-red/10'
                    : 'border-white/[0.08] bg-white/[0.12] hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors duration-300 ${
                  selectedCategory === cat.slug
                    ? 'bg-brand-red text-white'
                    : 'bg-white/[0.06] text-white/80 group-hover:text-white/70'
                }`}>
                  {CATEGORY_ICONS[cat.slug] || <Home size={24} />}
                </div>
                <h4 className={`font-heading font-bold text-sm transition-colors duration-300 ${
                  selectedCategory === cat.slug ? 'text-white' : 'text-white/70'
                }`}>
                  {cat.name}
                </h4>
                {cat.description && (
                  <p className="text-xs text-white/50 font-body mt-0.5 line-clamp-1">{cat.description}</p>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-white/[0.06]" />

      {/* Section 2: Photo upload — native input, works on all devices */}
      <div>
        <h3 className="text-lg font-heading font-bold text-white mb-1">
          Foto Ihres Hauses
        </h3>
        <p className="text-white/70 text-sm font-body mb-4">
          Laden Sie ein Foto hoch oder nutzen Sie Ihre Kamera
        </p>

        {/* Hidden native file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
        />

        {!preview ? (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full border border-dashed rounded-xl p-8 text-center transition-all duration-300 border-white/15 hover:border-white/30 bg-white/[0.12]"
          >
            <Upload size={36} className="mx-auto mb-3 text-white/50" />
            <p className="text-sm font-heading font-bold text-white/70 mb-1">
              Foto hochladen oder aufnehmen
            </p>
            <p className="text-white/50 font-body text-xs">
              JPEG, PNG oder WebP — max. 10 MB
            </p>
          </button>
        ) : (
          <div className="space-y-3">
            <div className="relative rounded-xl overflow-hidden border border-white/[0.08]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Vorschau" className="w-full max-h-[300px] object-contain bg-black/30" />
              <button
                onClick={handleRemove}
                className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white/80 hover:text-white hover:bg-black/70 transition"
                aria-label="Bild entfernen"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/70 font-body">
              <ImageIcon size={14} />
              {file?.name} ({(file!.size / 1024 / 1024).toFixed(1)} MB)
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-400 text-sm font-body">{error}</p>
      )}

      {/* Continue button */}
      <button
        onClick={handleContinue}
        disabled={!canContinue}
        className={`w-full py-3.5 rounded-xl font-heading font-bold text-sm transition-all duration-300 ${
          canContinue
            ? 'bg-brand-red text-white hover:bg-brand-red-dark shadow-lg shadow-brand-red/20'
            : 'bg-white/[0.06] text-white/20 cursor-not-allowed'
        }`}
      >
        {uploading ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 size={16} className="animate-spin" />
            Wird hochgeladen...
          </span>
        ) : (
          'Weiter'
        )}
      </button>
    </div>
  );
}
