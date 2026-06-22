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
  status: 'Katılıyor' | 'Bekleniyor' | 'Katılamıyor';
  createdAt: string;
}
