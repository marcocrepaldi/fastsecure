import { ImageResponse } from 'next/og';

export const alt = 'Fast Secure — Corretora de Seguros e Benefícios Multi-Produto';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Imagem padrão de compartilhamento (Open Graph / Twitter), gerada em build.
export default function Image() {
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
          background:
            'linear-gradient(135deg, #0a1124 0%, #0f1b3d 60%, #14306e 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Marca */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '18px',
              background: '#4680ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '34px',
              fontWeight: 800,
              color: '#fff',
            }}
          >
            FS
          </div>
          <div style={{ fontSize: '34px', fontWeight: 700 }}>Fast Secure</div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '66px', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-2px' }}>
            Gestão de risco e benefícios
          </div>
          <div
            style={{
              fontSize: '66px',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-2px',
              color: '#7aa2ff',
            }}
          >
            que protegem o seu negócio
          </div>
        </div>

        {/* Selos de confiança */}
        <div style={{ display: 'flex', gap: '16px', fontSize: '26px', color: '#9fb0d8' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>SUSEP &amp; ANS</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>·</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>+10.000 vidas protegidas</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>·</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>15 seguradoras</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
