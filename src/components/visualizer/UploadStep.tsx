'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { uploadVisualizerImage } from '@/lib/api';
import Button from '../shared/Button';

interface UploadStepProps {
  onComplete: (data: { sessionId: string; filename: string; imageUrl: string }) => void;
}

export default function UploadStep({ onComplete }: UploadStepProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const f = acceptedFiles[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
    onDropRejected: (rejections) => {
      const err = rejections[0]?.errors[0];
      if (err?.code === 'file-too-large') setError('Die Datei ist zu groß. Maximal 10 MB.');
      else setError('Bitte laden Sie ein JPEG, PNG oder WebP Bild hoch.');
    },
  });

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const result = await uploadVisualizerImage(file);
      onComplete(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload fehlgeschlagen');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setError(null);
  };

  return (
    <div>
      {!preview ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
            isDragActive ? 'border-brand-red bg-brand-red/5' : 'border-white/[0.1] hover:border-brand-red hover:bg-white/[0.04]'
          }`}
        >
          <input {...getInputProps()} />
          <Upload size={48} className="mx-auto mb-4 text-white/50" />
          <p className="text-lg font-heading font-bold text-white mb-2">
            {isDragActive ? 'Bild hier ablegen...' : 'Foto Ihres Hauses hochladen'}
          </p>
          <p className="text-white/70 font-body text-sm">
            JPEG, PNG oder WebP — maximal 10 MB
          </p>
          <p className="text-white/50 font-body text-xs mt-2">
            Klicken oder Bild hierhin ziehen
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Vorschau" className="w-full max-h-[400px] object-contain bg-white/[0.06]" />
            <button
              onClick={handleRemove}
              className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-white/[0.06] transition"
              aria-label="Bild entfernen"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/70 font-body">
            <ImageIcon size={16} />
            {file?.name} ({(file!.size / 1024 / 1024).toFixed(1)} MB)
          </div>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm font-body mt-4">{error}</p>
      )}

      {preview && (
        <div className="mt-6 flex gap-4">
          <Button onClick={handleUpload} disabled={uploading}>
            {uploading ? 'Wird hochgeladen...' : 'Weiter'}
          </Button>
          <Button variant="outline" onClick={handleRemove} disabled={uploading}>
            Anderes Bild
          </Button>
        </div>
      )}
    </div>
  );
}
