export type RsvpStatus = 'Katılıyor' | 'Bekleniyor' | 'Katılamıyor';

export interface Invitation {
  title: string;
  subtitle: string;
  names: string;
  date: string;
  venue: string;
  phoneBackground: string;
  imageTheme: string;
}

export interface RSVPResponse {
  id: string;
  guestName: string;
  guestCount: number;
  menuPreference: string;
  status: RsvpStatus;
  message?: string;
  photoUrl?: string;
  videoUrl?: string;
  createdAt: string;
}

/** Form state of an RSVP being composed, before it becomes an RSVPResponse. */
export interface RsvpDraft {
  guestName: string;
  guestCount: number;
  menuPreference: string;
  status: RsvpStatus;
  message: string;
  photoUrl: string;
  videoUrl: string;
}

export interface TemplatePreset {
  id: string;
  name: string;
  primaryColor: string;
  backgroundStyle: string;
  titleColor: string;
  btnColor: string;
  imageUrl: string;
}
