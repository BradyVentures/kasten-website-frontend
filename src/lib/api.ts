import { API_URL, CRM_API_URL } from './constants';

// CRM-Typen
export interface CRMAttributeOption {
  id: string;
  attribute_id: string;
  value: string;
  label: string;
  is_default: boolean;
}

export interface CRMAttribute {
  id: string;
  slug: string;
  label: string;
  attribute_type: 'select' | 'boolean';
  unit: string | null;
  options: CRMAttributeOption[];
}

export interface CRMCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  attributes: CRMAttribute[];
}

// CRM-API: Visualizer-Kategorien laden (öffentlich, kein Auth)
export async function getVisualizerCategories(): Promise<CRMCategory[]> {
  const res = await fetch(`${CRM_API_URL}/products/visualizer/categories`);
  if (!res.ok) throw new Error('Produkte konnten nicht geladen werden');
  return res.json();
}

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Netzwerkfehler' }));
    throw new Error(error.error || 'Ein Fehler ist aufgetreten');
  }

  return res.json();
}

export async function submitContact(data: {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  product_interest?: string;
}) {
  return fetchAPI<{ id: string; message: string }>('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function uploadVisualizerImage(file: File) {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`${API_URL}/api/visualizer/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Upload fehlgeschlagen' }));
    throw new Error(error.error);
  }

  return res.json() as Promise<{ sessionId: string; imageUrl: string; filename: string }>;
}

export async function generateVisualization(data: {
  sessionId: string;
  filename: string;
  category: string;
  categoryName: string;
  preferences: Record<string, string>;
  contact: { name: string; email: string; phone?: string; message?: string };
  gdprConsent: boolean;
  requestQuote?: boolean;
  width?: number;
  height?: number;
  depth?: number;
}) {
  return fetchAPI<{ requestId: string; status: string }>('/api/visualizer/generate', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function checkVisualizerStatus(id: string) {
  return fetchAPI<{
    id: string;
    status: string;
    resultImageUrl: string | null;
    createdAt: string;
    completedAt: string | null;
  }>(`/api/visualizer/status/${id}`);
}
