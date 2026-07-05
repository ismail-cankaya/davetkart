import { EventCategory, Invitation, RSVPResponse, RsvpDraft, TemplatePreset } from './types';

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
    titleColor: 'text-amber-100',
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
