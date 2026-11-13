import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };

/** Card de compartilhamento (Open Graph) com a identidade da Fast Secure. */
export function ogCard({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          color: '#fff',
          backgroundColor: '#080c1a',
          backgroundImage:
            'radial-gradient(circle at 90% 0%, rgba(61,107,255,0.6) 0%, transparent 55%), radial-gradient(circle at 0% 100%, rgba(212,255,58,0.18) 0%, transparent 50%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <svg width="64" height="64" viewBox="0 0 32 32">
            <path d="M16 2 4 6.5v8.2C4 22.3 9.1 28.4 16 30c6.9-1.6 12-7.7 12-15.3V6.5L16 2Z" fill="#3d6bff" />
            <path d="M17.6 7.5 11 17.2h4.6l-1.2 7.3 6.6-9.8h-4.6l1.2-7.2Z" fill="#d4ff3a" />
          </svg>
          <div style={{ fontSize: 36, fontWeight: 800, display: 'flex' }}>
            Fast<span style={{ color: '#9db3ff' }}>Secure</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#d4ff3a', letterSpacing: 4, textTransform: 'uppercase' }}>
            {eyebrow}
          </div>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, marginTop: 16, maxWidth: 1000 }}>
            {title}
          </div>
        </div>
        <div style={{ fontSize: 26, color: 'rgba(255,255,255,0.6)', display: 'flex' }}>{footer}</div>
      </div>
    ),
    ogSize,
  );
}
