'use client';

import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';

/** Botão flutuante de WhatsApp. Nas páginas de produto, a mensagem já cita o produto. */
export default function WhatsAppFab({ number, names }: { number: string; names: Record<string, string> }) {
  const pathname = usePathname();
  const product = names[pathname.slice(1)];
  const text = product
    ? `Olá! Estou no site da Fast Secure e quero uma cotação de ${product}.`
    : 'Olá! Estou no site da Fast Secure e quero uma cotação.';
  const href = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="group fixed right-4 bottom-24 z-40 flex items-center gap-2 rounded-full bg-[#25d366] p-4 text-white shadow-[0_12px_32px_-8px_rgb(37_211_102/0.6)] transition hover:scale-105 lg:right-6 lg:bottom-6"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25d366] opacity-30" aria-hidden="true" />
      <MessageCircle className="size-6" aria-hidden="true" />
      <span className="hidden pr-1 text-sm font-bold lg:group-hover:inline">Fale no WhatsApp</span>
    </a>
  );
}
