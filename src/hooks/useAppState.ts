import React, { useState, useEffect } from 'react';
import { Invitation, RSVPResponse } from '../types';
import { INITIAL_INVITATION, INITIAL_RSVP_LIST } from '../data';
import { toast } from '../components/ui/Toast';

export function useAppState() {
  const [invitation, setInvitation] = useState<Invitation>(() => {
    const saved = localStorage.getItem('e_davetiye_invitation');
    return saved ? JSON.parse(saved) : INITIAL_INVITATION;
  });

  const [rsvpList, setRsvpList] = useState<RSVPResponse[]>(() => {
    const saved = localStorage.getItem('e_davetiye_rsvps');
    return saved ? JSON.parse(saved) : INITIAL_RSVP_LIST;
  });

  const [activePresetId, setActivePresetId] = useState<string>(invitation.imageTheme || 'emerald');
  const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [newRsvp, setNewRsvp] = useState({
    guestName: '',
    guestCount: 2,
    menuPreference: 'Et Menü',
    status: 'Katılıyor' as 'Katılıyor' | 'Bekleniyor' | 'Katılamıyor',
    message: '',
    photoUrl: '',
    videoUrl: ''
  });

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    localStorage.setItem('e_davetiye_invitation', JSON.stringify(invitation));
  }, [invitation]);

  useEffect(() => {
    localStorage.setItem('e_davetiye_rsvps', JSON.stringify(rsvpList));
  }, [rsvpList]);

  const handleTemplateChange = (id: string, phoneRef?: React.RefObject<HTMLDivElement>) => {
    setActivePresetId(id);
    setInvitation(prev => ({ ...prev, imageTheme: id, phoneBackground: id }));
    if (isMobile && phoneRef?.current) {
      phoneRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInvitation(prev => ({ ...prev, [name]: value }));
  };

  const handleAddRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRsvp.guestName.trim()) return;

    const entry: RSVPResponse = {
      id: `rsvp-${Date.now()}`,
      guestName: newRsvp.guestName,
      guestCount: Number(newRsvp.guestCount),
      menuPreference: newRsvp.menuPreference,
      status: newRsvp.status,
      message: newRsvp.message,
      photoUrl: newRsvp.photoUrl,
      videoUrl: newRsvp.videoUrl,
      createdAt: new Date().toISOString()
    };

    setRsvpList(prev => [entry, ...prev]);
    setNewRsvp({ guestName: '', guestCount: 2, menuPreference: 'Et Menü', status: 'Katılıyor', message: '', photoUrl: '', videoUrl: '' });
    setIsRsvpModalOpen(false);

    toast(`Teşekkürler, ${entry.guestName}! Katılım bildiriminiz kaydedildi ve canlı panele eklendi.`);
  };

  const handleDeleteRsvp = (id: string) => {
    if (window.confirm('Bu katılım kaydını silmek istediğinize emin misiniz?')) {
      setRsvpList(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleResetRsvps = () => {
    if (window.confirm('Katılım listesini orijinal durumuna sıfırlamak istiyor musunuz?')) {
      setRsvpList(INITIAL_RSVP_LIST);
    }
  };

  const handleRsvpPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setNewRsvp(prev => ({ ...prev, photoUrl: url }));
    }
  };

  const handleRsvpVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setNewRsvp(prev => ({ ...prev, videoUrl: url }));
    }
  };

  return {
    invitation,
    setInvitation,
    rsvpList,
    setRsvpList,
    activePresetId,
    setActivePresetId,
    isRsvpModalOpen,
    setIsRsvpModalOpen,
    mobileMenuOpen,
    setMobileMenuOpen,
    newRsvp,
    setNewRsvp,
    isMobile,
    handleTemplateChange,
    handleInputChange,
    handleAddRsvp,
    handleDeleteRsvp,
    handleResetRsvps,
    handleRsvpPhotoUpload,
    handleRsvpVideoUpload
  };
}
