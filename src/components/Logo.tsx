/** Marca Fast Secure: escudo com raio (velocidade + proteção). */
export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className={`flex items-center gap-2.5 ${dark ? 'text-ink-900' : 'text-white'}`}>
      <svg viewBox="0 0 32 32" className="size-9" aria-hidden="true">
        <path d="M16 2 4 6.5v8.2C4 22.3 9.1 28.4 16 30c6.9-1.6 12-7.7 12-15.3V6.5L16 2Z" fill="#3d6bff" />
        <path d="M17.6 7.5 11 17.2h4.6l-1.2 7.3 6.6-9.8h-4.6l1.2-7.2Z" fill="#d4ff3a" />
      </svg>
      <span className="display text-xl tracking-tight">
        Fast<span className="text-brand-400">Secure</span>
      </span>
    </span>
  );
}
