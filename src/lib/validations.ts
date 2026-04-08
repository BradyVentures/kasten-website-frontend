import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Bitte geben Sie Ihren Namen ein'),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
  phone: z.string().optional(),
  message: z.string().optional(),
  product_interest: z.string().optional(),
});

export const visualizerContactSchema = z.object({
  name: z.string().min(2, 'Bitte geben Sie Ihren Namen ein'),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
  phone: z.string().optional(),
  message: z.string().optional(),
  gdprConsent: z.literal(true, { message: 'Bitte stimmen Sie der Datenschutzerklärung zu' }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type VisualizerContactData = z.infer<typeof visualizerContactSchema>;
