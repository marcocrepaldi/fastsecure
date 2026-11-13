import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };

// Logo oficial (versão para fundo escuro), embutido como data URL. As imagens OG são geradas no build.
const logoSrc = `data:image/png;base64,${readFileSync(join(process.cwd(), 'public/brand/logo-fastsecure-dark.png')).toString('base64')}`;

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="Fast Secure" width={305} height={72} />
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
