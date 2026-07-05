import React from 'react';
import { cn } from '../../../utils/cn';

/**
 * Seksiyon bazlı arka plan konfigürasyonu. Şablonlar hero (giriş) ve gövde
 * (kaydırılan bölümler) için ayrı katmanlar tanımlar; kompozisyon bu
 * katmanları ilgili sarmalayıcıların arkasına yerleştirir.
 *
 *  - `hero`: Yalnızca Summary'nin arkasında görünür (fotoğraf, degrade, ışık).
 *  - `body`: Timeline/Details/Gift/RSVP bölümlerinin arkasında görünür —
 *    temanın düz zemini üzerinde zarif desenler ve kategoriye özgü objeler.
 */
export interface TemplateBackdrop {
  hero?: React.ReactNode;
  body?: React.ReactNode;
}

/* ————— Hero katmanları ————— */

interface HeroImageProps {
  src: string;
  /** Okunabilirlik için fotoğrafın üzerine binen koyu katman. */
  overlayClass?: string;
  /** Alt kenarda gövde zeminine karışan degrade, örn. `to-slate-950`. */
  fadeClass: string;
}

/**
 * Hero'ya sabitlenen fotoğraf: kaydırınca devam etmez; alt kenarı gövdenin
 * düz zeminine yumuşakça karışır.
 */
export function HeroImage({ src, overlayClass = 'bg-black/45', fadeClass }: HeroImageProps) {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${src})` }}
      />
      <div className={cn('absolute inset-0', overlayClass)} />
      <div className={cn('absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent', fadeClass)} />
    </div>
  );
}

/* ————— CSS desen katmanları ————— */

interface PatternProps {
  className?: string;
  /** Desen çizgi/nokta rengi (rgba önerilir). */
  color?: string;
  /** Desen karo boyutu (px). */
  size?: number;
}

/** Zarif nokta ızgarası. */
export function DotsPattern({ className, color = 'rgba(255,255,255,0.07)', size = 22 }: PatternProps) {
  return (
    <div
      className={cn('absolute inset-0', className)}
      style={{
        backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`
      }}
    />
  );
}

/** İnce çizgi ızgarası. */
export function GridPattern({ className, color = 'rgba(255,255,255,0.05)', size = 44 }: PatternProps) {
  return (
    <div
      className={cn('absolute inset-0', className)}
      style={{
        backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`
      }}
    />
  );
}

/** Çapraz kafes (yaldızlı motif zemini). */
export function CrosshatchPattern({ className, color = 'rgba(212,175,55,0.05)', size = 20 }: PatternProps) {
  return (
    <div
      className={cn('absolute inset-0', className)}
      style={{
        backgroundImage: `repeating-linear-gradient(45deg, ${color} 0 1px, transparent 1px ${size}px), repeating-linear-gradient(-45deg, ${color} 0 1px, transparent 1px ${size}px)`
      }}
    />
  );
}

/** Yumuşak ışık lekesi — konum ve renk çağıran tarafın sınıflarıyla verilir. */
export function GlowBlob({ className }: { className?: string }) {
  return <div className={cn('absolute rounded-full blur-3xl pointer-events-none', className)} />;
}
