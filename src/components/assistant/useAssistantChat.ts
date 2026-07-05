import { useCallback, useRef, useState } from 'react';
import { AssistantMessage } from './types';

const WELCOME_MESSAGE: AssistantMessage = {
  id: 'welcome',
  role: 'assistant',
  text: 'Merhaba! 👋 Ben DavetKart Asistanı. Davetiye tasarımı, şablon seçimi ve katılım takibi konularında yardımcı olmak için buradayım. Size nasıl yardımcı olabilirim?',
  createdAt: Date.now()
};

/**
 * İleride gerçek yapay zeka servisine bağlanacak TEK nokta.
 * Entegrasyon sırasında bu fonksiyonun gövdesini API çağrısıyla değiştirmek yeterli;
 * arayüz (AssistantChat/AssistantWidget) hiçbir değişiklik gerektirmez.
 */
async function generateReply(_userText: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 1100 + Math.random() * 900));
  return 'Mesajınız için teşekkürler! Şablonları canlı önizlemeden inceleyebilir, "Davetiye Tasarımcısı" bölümünden davetiyenizi kişiselleştirebilir ve katılım yanıtlarını canlı panelden takip edebilirsiniz. Nasıl yardımcı olabilirim? ✨';
}

/** Sohbet durumu ve mesaj gönderme mantığı — arayüzden tamamen bağımsız. */
export function useAssistantChat() {
  const [messages, setMessages] = useState<AssistantMessage[]>([WELCOME_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const idCounter = useRef(0);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: AssistantMessage = {
      id: `msg-${++idCounter.current}`,
      role: 'user',
      text: trimmed,
      createdAt: Date.now()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const reply = await generateReply(trimmed);
      setMessages(prev => [
        ...prev,
        { id: `msg-${++idCounter.current}`, role: 'assistant', text: reply, createdAt: Date.now() }
      ]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  return { messages, isTyping, sendMessage };
}
