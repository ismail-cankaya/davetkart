/**
 * Media upload boundary. Callers depend only on the returned URL, so swapping
 * in a real backend/cloud-storage adapter (S3, Cloudinary…) requires no
 * changes outside this file.
 */
export interface MediaService {
  upload(file: File): Promise<string>;
}

const objectUrlAdapter: MediaService = {
  // Offline/dev adapter: a session-scoped object URL for instant preview.
  // The production adapter must POST the file and resolve to the hosted,
  // permanent URL that gets stored with the RSVP record.
  upload: (file) => Promise.resolve(URL.createObjectURL(file))
};

export const mediaService: MediaService = objectUrlAdapter;
