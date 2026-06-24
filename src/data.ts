import { Invitation, RSVPResponse } from './types';

export const TEMPLATE_PRESETS = [
  {
    id: 'emerald',
    name: 'Zümrüt Zarafeti (Emerald)',
    primaryColor: '#064e3b',
    backgroundStyle: 'bg-emerald-950',
    titleColor: 'text-amber-200',
    btnColor: 'bg-amber-500 hover:bg-amber-600 text-emerald-950',
    imageUrl: '/images/emerald.png'
  },
  {
    id: 'sunset',
    name: 'Akdeniz Günbatımı (Sunset)',
    primaryColor: '#7c2d12',
    backgroundStyle: 'bg-orange-950',
    titleColor: 'text-orange-100',
    btnColor: 'bg-orange-500 hover:bg-orange-600 text-orange-950',
    imageUrl: '/images/sunset.png'
  },
  {
    id: 'baby',
    name: 'Pastel Gökyüzü (Baby Shower)',
    primaryColor: '#0c4a6e',
    backgroundStyle: 'bg-sky-950',
    titleColor: 'text-sky-100',
    btnColor: 'bg-sky-400 hover:bg-sky-500 text-sky-950',
    imageUrl: '/images/baby.png'
  },
  {
    id: 'corporate',
    name: 'Asil Gece (Midnight Gold)',
    primaryColor: '#1e1b4b',
    backgroundStyle: 'bg-slate-950',
    titleColor: 'text-amber-150',
    btnColor: 'bg-amber-400 hover:bg-amber-500 text-slate-950',
    imageUrl: '/images/corporate.png'
  }
];

export const INITIAL_INVITATION: Invitation = {
  title: 'HAYATIMIZIN EN ANLAMLI GÜNÜ',
  subtitle: 'Sizleri de bu mutlu günümüzde aramızda görmekten onur duyarız.',
  names: 'Sophia & Elias',
  date: '2026-09-12T19:00',
  venue: 'Çırağan Sarayı Kempinski, İstanbul',
  phoneBackground: 'emerald',
  imageTheme: 'emerald'
};

export const INITIAL_RSVP_LIST: RSVPResponse[] = [
  {
    id: 'rsvp-1',
    guestName: 'Ahmet Yılmaz',
    guestCount: 2,
    menuPreference: 'Et Menü',
    status: 'Katılıyor',
    message: 'Canım arkadaşlarım, bu mutlu gününüzde yanınızda olmayı çok isterdim. Mutluluklar!',
    createdAt: '2026-06-21T10:15:00Z'
  },
  {
    id: 'rsvp-2',
    guestName: 'Zeynep Kaya',
    guestCount: 1,
    menuPreference: 'Standart Menü',
    status: 'Bekleniyor',
    createdAt: '2026-06-21T11:42:00Z'
  },
  {
    id: 'rsvp-3',
    guestName: 'Mehmet Can',
    guestCount: 1,
    menuPreference: 'Belirtilmedi',
    status: 'Katılamıyor',
    createdAt: '2026-06-21T12:05:00Z'
  }
];
