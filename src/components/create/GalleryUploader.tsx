import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { useInvitationStore } from '../../stores/useInvitationStore';
import { mediaService } from '../../services/media';

const EASE_LUXE = [0.22, 1, 0.36, 1] as const;
const MAX_PHOTOS = 8;

/**
 * Wizard uploader for the invitation gallery. Files go through the media
 * boundary (object URLs today, cloud storage once the backend lands) and the
 * resulting URLs are stored on the invitation.
 */
export function GalleryUploader() {
  const images = useInvitationStore((s) => s.invitation.galleryImages);
  const updateField = useInvitationStore((s) => s.updateField);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList).slice(0, MAX_PHOTOS - images.length);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const urls = await Promise.all(files.map((file) => mediaService.upload(file)));
      updateField('galleryImages', [...images, ...urls]);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const removeImage = (url: string) =>
    updateField('galleryImages', images.filter((image) => image !== url));

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-2.5">
        <AnimatePresence initial={false}>
          {images.map((url) => (
            <motion.div
              key={url}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.4, ease: EASE_LUXE }}
              className="relative aspect-square rounded-lg overflow-hidden border border-white/10 group"
            >
              <img src={url} alt="Galeri fotoğrafı" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                aria-label="Fotoğrafı kaldır"
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 hover:bg-rose-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              >
                <X size={11} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {images.length < MAX_PHOTOS && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="aspect-square rounded-lg border border-dashed border-white/20 hover:border-gold/50 text-white/50 hover:text-champagne flex flex-col items-center justify-center gap-1 transition-colors duration-300 cursor-pointer disabled:opacity-50"
          >
            {uploading ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
            <span className="text-[9px] font-semibold">{uploading ? 'Yükleniyor' : 'Ekle'}</span>
          </button>
        )}
      </div>

      <p className="text-[11px] text-white/35">
        En fazla {MAX_PHOTOS} fotoğraf • {images.length} / {MAX_PHOTOS} yüklendi
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => void handleFiles(e.target.files)}
      />
    </div>
  );
}
