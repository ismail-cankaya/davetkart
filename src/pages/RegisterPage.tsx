import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { AuthShell, authInputClass } from '../components/auth/AuthShell';
import { useAuthStore } from '../stores/useAuthStore';
import { toast } from '../components/ui/Toast';
import { AuthRedirectState } from '../types';

/** Sign-up page; new members also return to the flow they came from. */
export default function RegisterPage() {
  const register = useAuthStore(s => s.register);
  const navigate = useNavigate();
  const location = useLocation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTo = (location.state as AuthRedirectState | null)?.from ?? '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const user = await register({ fullName, email, password });
      toast(`Aramıza hoş geldiniz, ${user.fullName}! 🎉`);
      navigate(redirectTo, { replace: true });
    } catch {
      toast('Kayıt tamamlanamadı. Lütfen tekrar deneyin.', 'info');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      title={<>DavetKart'a <span className="italic text-champagne font-medium">Katılın</span></>}
      subtitle="Ücretsiz hesabınızı oluşturun; ilk davetiyeniz %60 indirimli, katılım takibi ilk 102 misafir için hediye."
      footer={
        <>
          Zaten üye misiniz?{' '}
          <Link
            to="/login"
            state={{ from: redirectTo } satisfies AuthRedirectState}
            className="text-champagne font-semibold hover:text-gold transition-colors"
          >
            Giriş yapın
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="register-name" className="block text-xs font-bold tracking-wider uppercase text-champagne">
            Ad Soyad
          </label>
          <input
            id="register-name"
            type="text"
            required
            autoComplete="name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            placeholder="Örn. Sophia Yılmaz"
            className={authInputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="register-email" className="block text-xs font-bold tracking-wider uppercase text-champagne">
            E-posta Adresi
          </label>
          <input
            id="register-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="ornek@eposta.com"
            className={authInputClass}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="register-password" className="block text-xs font-bold tracking-wider uppercase text-champagne">
            Şifre
          </label>
          <input
            id="register-password"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="En az 6 karakter"
            className={authInputClass}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full relative overflow-hidden bg-champagne hover:bg-gold disabled:opacity-60 disabled:cursor-wait text-brand-deep font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
        >
          <UserPlus size={15} />
          {isSubmitting ? 'Hesap oluşturuluyor…' : 'Ücretsiz Kayıt Ol'}
        </button>
      </form>
    </AuthShell>
  );
}
