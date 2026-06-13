'use client';
import React, { useEffect, useState } from 'react';

interface WhatsAppButtonProps {
  /** Número em formato internacional, só dígitos. Ex.: 5511999999999 */
  number: string;
  greeting?: string;
  defaultMessage?: string;
}

const WaIcon = ({ size = 30 }: { size?: number }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M16.04 3C9.42 3 4.04 8.38 4.04 15c0 2.1.55 4.16 1.6 5.97L4 29l8.25-1.6a11.9 11.9 0 0 0 3.79.62h.01c6.62 0 12-5.38 12-12s-5.39-12-12.01-12Zm0 21.96h-.01c-1.18 0-2.34-.32-3.35-.92l-.24-.14-4.9.95.98-4.77-.16-.25a9.94 9.94 0 0 1-1.52-5.27c0-5.5 4.48-9.96 9.97-9.96 2.66 0 5.16 1.04 7.04 2.92a9.9 9.9 0 0 1 2.92 7.05c0 5.5-4.48 9.96-9.97 9.96Zm5.47-7.46c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
  </svg>
);

export default function WhatsAppButton({
  number,
  greeting = 'Olá! 👋 Como podemos ajudar você hoje?',
  defaultMessage = 'Olá! Vim pelo site da Fast Secure e gostaria de mais informações.',
}: WhatsAppButtonProps) {
  const [open, setOpen] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const href = `https://wa.me/${number}?text=${encodeURIComponent(defaultMessage)}`;

  // Mostra uma dica discreta após alguns segundos (uma vez por sessão).
  useEffect(() => {
    if (sessionStorage.getItem('wa-tip-seen')) return;
    const t = setTimeout(() => setShowTip(true), 4000);
    return () => clearTimeout(t);
  }, []);

  const dismissTip = () => {
    setShowTip(false);
    sessionStorage.setItem('wa-tip-seen', '1');
  };

  return (
    <div className="wa-widget">
      {open && (
        <div className="wa-popover" role="dialog" aria-label="Conversar no WhatsApp">
          <div className="wa-popover-head">
            <div className="wa-avatar"><WaIcon size={22} /></div>
            <div className="flex-grow-1">
              <div className="wa-name">Fast Secure</div>
              <div className="wa-status"><span className="wa-online-dot" /> Online agora</div>
            </div>
            <button className="wa-close" onClick={() => setOpen(false)} aria-label="Fechar">×</button>
          </div>
          <div className="wa-popover-body">
            <div className="wa-bubble">{greeting}</div>
            <div className="wa-bubble wa-bubble-sub">Resposta rápida no horário comercial.</div>
          </div>
          <a href={href} target="_blank" rel="noopener noreferrer" className="wa-cta" onClick={dismissTip}>
            <WaIcon size={20} /> Iniciar conversa
          </a>
        </div>
      )}

      {showTip && !open && (
        <button className="wa-tip" onClick={() => { setOpen(true); dismissTip(); }}>
          Precisa de ajuda? Fale conosco
          <span className="wa-tip-close" onClick={(e) => { e.stopPropagation(); dismissTip(); }}>×</span>
        </button>
      )}

      <button
        className={`wa-fab ${open ? 'is-open' : ''}`}
        onClick={() => { setOpen((v) => !v); dismissTip(); }}
        aria-label="Abrir conversa no WhatsApp"
        aria-expanded={open}
      >
        {open ? <span className="wa-fab-x">×</span> : <WaIcon />}
      </button>
    </div>
  );
}
