export type RsvpStatus = 'Katılıyor' | 'Bekleniyor' | 'Katılamıyor';

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
}

/** JWT session issued by the Auth microservice. */
export interface AuthSession {
  user: AuthUser;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}

/** Router location state used to send the user back after authentication. */
export interface AuthRedirectState {
  from?: string;
}

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

/** Event category presented in the /create wizard's first step. */
export interface EventCategory {
  id: string;
  label: string;
  description: string;
  /** Field labels for the two-person name inputs (e.g. Gelin / Damat). */
  nameLabels: [string, string];
  /** Suggested top badge text applied when the category is picked. */
  suggestedTitle: string;
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
