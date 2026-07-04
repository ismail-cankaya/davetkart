export interface AssistantMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  createdAt: number;
}

/** Pencerenin görünüm durumu: kapalı, simge (mini bar), açık veya tam ekran. */
export type AssistantWindowState = 'closed' | 'minimized' | 'open' | 'fullscreen';
