import { Invitation, RSVPResponse } from './types';

export const TEMPLATE_PRESETS = [
  {
    id: 'emerald',
    name: 'Zümrüt Zarafeti (Emerald)',
    primaryColor: '#064e3b',
    backgroundStyle: 'bg-emerald-950',
    titleColor: 'text-amber-200',
    btnColor: 'bg-amber-500 hover:bg-amber-600 text-emerald-950',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2rLy52oW1TkMtLlCQN8_qrOoSclb0ONSk2Ven7ULIuOBcAJYdBWB1_QFlNYxc78a-naJX94p3nW5mq-yXsIX_tFk5fR5ZBvcKHl7UeLuH9Q4WpFnjr6n2boxnCKoJ7dN52KSzGAFgKN6r_cxLv5WRAFtOC5OFNbJYIX0I1vIJMo-Vpvx5U89byJ33phWR4cRzBYRlSnyOmjd1duxk-S-c_xZxiTIX7t-8IPBDJaTmICc3JvhoLDKcD3Sd-BmjshRwygrypdcB52E'
  },
  {
    id: 'sunset',
    name: 'Akdeniz Günbatımı (Sunset)',
    primaryColor: '#7c2d12',
    backgroundStyle: 'bg-orange-950',
    titleColor: 'text-orange-100',
    btnColor: 'bg-orange-500 hover:bg-orange-600 text-orange-950',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8rvzomJcApGiigTByFwkw_1QqDbmE0mTT8SH07cA94_xqc-FQ80ZAZuw-VpzJvQGvCrKwrvBEHMqKARylrvdactLjGk_cwSE0STuD-9DQgjzmaN6rOK7pFKinGOAWR_MepkVFtKUAKSIIV8kDzgMO4ZSEt5SmjpD5S-gor5tRNrZs5Hs_9e7KrJVYAIJl26uagUMDpyA_z8D0E2yzPI-eUMcfcH2-xaEY23iTePgf019FFgxktwDiw0C66X0vRrBWbCg1CwFOXwc'
  },
  {
    id: 'baby',
    name: 'Pastel Gökyüzü (Baby Shower)',
    primaryColor: '#0c4a6e',
    backgroundStyle: 'bg-sky-950',
    titleColor: 'text-sky-100',
    btnColor: 'bg-sky-400 hover:bg-sky-500 text-sky-950',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMqzubU6EBIDCkDAUfAmowDiZQ9ftlfgFESwrwi7w3OuE_36IQ56zX0X5p7neONEbTVED3UcfPbo6umNoyo8dxIHtY4f4ny37Zf-daL4-05oXeSrG1ia0Rrgjfo2ek7wE_rgp1DRZtfZHacW5L9keMsW70v1CufhImLycgiAR9usdxM5TzPmwFauojorAozi_jAc-BiY2qaSomhjUlRO_IqG_Fzys9O06nKygbLWUZDXRdzDaR_clPXBsMF9di-3iHXmCCLtiT71Y'
  },
  {
    id: 'corporate',
    name: 'Asil Gece (Midnight Gold)',
    primaryColor: '#1e1b4b',
    backgroundStyle: 'bg-slate-950',
    titleColor: 'text-amber-150',
    btnColor: 'bg-amber-400 hover:bg-amber-500 text-slate-950',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzxTig4KqT31LF2xzs3cqcUUMcQKpStNQvzxO1Pfx6JtjfRN1735hy06c2aQxJ-dfVwLuS-gCDseBj7ZrJLA2M_AMYTUP2bpjetE2dRUpTtvacAz1YRS0A7wPzmfdZ3ebcPLCeo_Cy7w-83xMuESQnpP4jg0CMha0T_Vqekgswq6eTGP-27vRp3beF-yUipsYHTAMhvqvEly3fRtoXN1V1CCJR55zRtkrFu4KKJmnK_4tkZMmnw8mDs7oqZd_YGNGJH_Fk_jjZIN8'
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
