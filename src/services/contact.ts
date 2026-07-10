import { api } from './api';

export type ContactSubject =
  | 'general'
  | 'support'
  | 'pricing'
  | 'partnership'
  | 'kvkk';

export interface ContactPayload {
  name: string;
  email: string;
  subject: ContactSubject;
  message: string;
}

/**
 * İletişim formu mesajını backend'e iletir. Mesajlar sunucu tarafında
 * kaydedilir ve destek ekibine yönlendirilir; başarısız istekler çağırana
 * fırlatılır ki arayüz dürüst bir hata durumu gösterebilsin.
 */
export async function sendContactMessage(payload: ContactPayload): Promise<void> {
  await api.post('/contact', payload);
}
