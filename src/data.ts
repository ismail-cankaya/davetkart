import { EventCategory, Invitation, RSVPResponse, RsvpDraft, TemplatePreset, TimelineEvent } from './types';

export const EVENT_CATEGORIES: EventCategory[] = [
  {
    id: 'dugun',
    label: 'Düğün',
    description: 'Hayatınızın en özel gününe zarif bir davet',
    nameLabels: ['Gelin Adı', 'Damat Adı'],
    suggestedTitle: 'HAYATIMIZIN EN ANLAMLI GÜNÜ'
  },
  {
    id: 'kina',
    label: 'Kına Gecesi',
    description: 'Geleneksel gecenize modern bir dokunuş',
    nameLabels: ['Gelin Adı', 'Damat Adı'],
    suggestedTitle: 'KINA GECEMİZE DAVETLİSİNİZ'
  },
  {
    id: 'nisan',
    label: 'Nişan',
    description: 'Mutluluğa atılan ilk adımı birlikte kutlayın',
    nameLabels: ['Partner 1', 'Partner 2'],
    suggestedTitle: 'NİŞANIMIZA DAVETLİSİNİZ'
  },
  {
    id: 'sunnet',
    label: 'Sünnet',
    description: 'Şehzadenizin büyük günü için görkemli davet',
    nameLabels: ['Çocuğun Adı', 'Aile Adı'],
    suggestedTitle: 'SÜNNET DÜĞÜNÜMÜZE DAVETLİSİNİZ'
  },
  {
    id: 'dogum-gunu',
    label: 'Doğum Günü',
    description: 'Yeni yaşınızı sevdiklerinizle karşılayın',
    nameLabels: ['Doğum Günü Sahibi', 'Ev Sahibi (opsiyonel)'],
    suggestedTitle: 'DOĞUM GÜNÜ PARTİSİNE DAVETLİSİNİZ'
  },
  {
    id: 'mezuniyet',
    label: 'Mezuniyet',
    description: 'Emeklerinizin taçlandığı anı paylaşın',
    nameLabels: ['Mezun Adı', 'Okul / Bölüm'],
    suggestedTitle: 'MEZUNİYET TÖRENİME DAVETLİSİNİZ'
  },
  {
    id: 'baby-shower',
    label: 'Baby Shower',
    description: 'Minik misafirinizi hep birlikte karşılayın',
    nameLabels: ['Anne Adayı', 'Bebeğin Adı'],
    suggestedTitle: 'ARAMIZA HOŞ GELDİN BEBEĞİM'
  },
  {
    id: 'parti',
    label: 'Parti',
    description: 'Unutulmaz bir gece için şık bir başlangıç',
    nameLabels: ['Ev Sahibi 1', 'Ev Sahibi 2 (opsiyonel)'],
    suggestedTitle: 'PARTİMİZE DAVETLİSİNİZ'
  }
];

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  {
    id: 'sade',
    name: 'Sade Stil',
    primaryColor: '#faf8f3',
    backgroundStyle: 'bg-stone-100',
    titleColor: 'text-stone-800',
    btnColor: 'bg-stone-900 hover:bg-stone-700 text-stone-50',
    imageUrl: '/images/dugun-sade.svg'
  },
  {
    id: 'manzara',
    name: 'Manzara Konsepti',
    primaryColor: '#0f172a',
    backgroundStyle: 'bg-slate-900',
    titleColor: 'text-white',
    btnColor: 'bg-emerald-500 hover:bg-emerald-400 text-white',
    imageUrl: '/images/emerald.png'
  },
  {
    id: 'sekilli',
    name: 'Şekilli / Motifli',
    primaryColor: '#1a1c23',
    backgroundStyle: 'bg-[#1a1c23]',
    titleColor: 'text-amber-400',
    btnColor: 'bg-gradient-to-r from-amber-400 to-amber-600 text-stone-900',
    imageUrl: '/images/corporate.png'
  },
  {
    id: 'modern',
    name: 'Modern / Dinamik',
    primaryColor: '#09090b',
    backgroundStyle: 'bg-zinc-950',
    titleColor: 'text-white',
    btnColor: 'bg-indigo-600 hover:bg-indigo-500 text-white',
    imageUrl: '/images/moda-gece.svg'
  }
];

/** Ready-made invitation messages the wizard offers as one-tap suggestions. */
export const DEFAULT_INVITE_MESSAGES: string[] = [
  'Sizleri de bu mutlu günümüzde aramızda görmekten onur duyarız.',
  'Hayatımızın en özel anına tanıklık etmenizi yürekten diliyoruz.',
  'Bir ömür boyu sürecek yolculuğumuzun ilk adımında yanımızda olun.',
  'Bu anlamlı günü sevdiklerimizle paylaşmak, mutluluğumuzu ikiye katlayacak.'
];

/** Starter program flow shown when the timeline module is enabled. */
export const DEFAULT_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'tl-1',
    time: '17:00',
    title: 'Karşılama & Kokteyl',
    description: 'Misafirlerimizi hoş geldin kokteyli ile karşılıyoruz.'
  },
  {
    id: 'tl-2',
    time: '19:00',
    title: 'Nikah Töreni',
    description: 'Evet dediğimiz o büyülü ana hep birlikte tanıklık edin.'
  },
  {
    id: 'tl-3',
    time: '20:00',
    title: 'Akşam Yemeği',
    description: 'Özenle hazırlanan menümüz eşliğinde keyifli bir akşam.'
  },
  {
    id: 'tl-4',
    time: '22:00',
    title: 'İlk Dans & Eğlence',
    description: 'Gece boyu sürecek müzik ve dans ile kutlamaya devam.'
  }
];

/** Pre-set gift amounts (₺) offered in the gift registry section. */
export const DEFAULT_GIFT_OPTIONS: number[] = [1000, 2500, 5000];

export const INITIAL_INVITATION: Invitation = {
  title: 'HAYATIMIZIN EN ANLAMLI GÜNÜ',
  subtitle: 'Sizleri de bu mutlu günümüzde aramızda görmekten onur duyarız.',
  names: 'Sophia & Elias',
  date: '2026-09-12T19:00',
  venue: 'Çırağan Sarayı Kempinski, İstanbul',
  mapUrl: '',
  phoneBackground: 'moda-gece',
  imageTheme: 'moda-gece',
  categoryId: 'dugun',
  palette: 'midnight',

  showEnvelope: true,
  showTimer: true,
  showTimeline: true,
  showGallery: false,
  showGift: false,
  showRSVP: true,

  bankName: '',
  accountHolder: '',
  iban: '',
  giftOptions: DEFAULT_GIFT_OPTIONS,

  rsvpDeadline: '',
  askMenuPreference: true,

  timelineEvents: DEFAULT_TIMELINE_EVENTS,
  galleryImages: []
};

export const INITIAL_RSVP_DRAFT: RsvpDraft = {
  guestName: '',
  guestCount: 2,
  menuPreference: 'Et Menü',
  status: 'Katılıyor',
  message: '',
  photoUrl: '',
  videoUrl: ''
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
