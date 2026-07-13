import { api, unwrapEnvelope } from './api';

/**
 * Media upload boundary. Callers depend only on the returned URL, so swapping
 * the storage backend (local disk, S3, Cloudinary…) requires no changes
 * outside this file.
 */
export interface MediaService {
  /** Upload a file and resolve to its permanent, hosted URL. */
  upload(file: File): Promise<string>;
}

function toHostedUrl(payload: unknown): string {
  const body = unwrapEnvelope(payload);
  if (body && typeof body === 'object' && typeof (body as { url?: unknown }).url === 'string') {
    return (body as { url: string }).url;
  }
  throw new Error('Unexpected /media/upload response shape');
}

const httpAdapter: MediaService = {
  async upload(file) {
    const form = new FormData();
    form.append('file', file);
    // axios drops the instance's JSON Content-Type for FormData bodies, so the
    // browser sets the multipart boundary itself — no manual header needed.
    const { data } = await api.post<unknown>('/media/upload', form);
    return toHostedUrl(data);
  }
};

export const mediaService: MediaService = httpAdapter;
