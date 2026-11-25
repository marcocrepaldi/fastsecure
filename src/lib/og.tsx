import { readFileSync } from 'node:fs';
import { extname, join } from 'node:path';
import { ImageResponse } from 'next/og';
import sharp from 'sharp';

export const ogSize = { width: 1200, height: 630 };

// Logo oficial (versão para fundo escuro), embutido como data URL. As imagens OG são geradas no build.
const logoSrc = `data:image/png;base64,${readFileSync(join(process.cwd(), 'public/brand/logo-fastsecure-dark.png')).toString('base64')}`;

export async function publicImageDataUrl(publicPath: string): Promise<string> {
  const ext = extname(publicPath).toLowerCase();
  const file = join(process.cwd(), 'public', publicPath.replace(/^\/+/, ''));
  const source = readFileSync(file);

  // O renderer do Next OG não mede WebP embutido. Convertemos só a cópia em memória;
  // a capa publicada continua sendo o WebP original.
  if (ext === '.webp') {
    const jpeg = await sharp(source).jpeg({ quality: 86 }).toBuffer();
    return `data:image/jpeg;base64,${jpeg.toString('base64')}`;
  }

  const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
  return `data:${mime};base64,${source.toString('base64')}`;
}

/** Card de compartilhamento (Open Graph) com a identidade da Fast Secure. */
export function ogCard({
  eyebrow,
  title,
  footer,
  backgroundSrc,
  fullBleedBackground = false,
}: {
  eyebrow: string;
  title: string;
  footer: string;
  backgroundSrc?: string;
  fullBleedBackground?: boolean;
}) {
  const padding = 72;
  const backgroundOffset = fullBleedBackground ? -padding : 0;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding,
          color: '#fff',
          backgroundColor: '#080c1a',
          ...(backgroundSrc
            ? {}
            : {
                backgroundImage:
                  'radial-gradient(circle at 90% 0%, rgba(61,107,255,0.6) 0%, transparent 55%), radial-gradient(circle at 0% 100%, rgba(212,255,58,0.18) 0%, transparent 50%)',
              }),
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {backgroundSrc && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={backgroundSrc}
              alt=""
              width={ogSize.width}
              height={ogSize.height}
              style={{ position: 'absolute', top: backgroundOffset, left: backgroundOffset, ...ogSize, objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                top: backgroundOffset,
                left: backgroundOffset,
                ...ogSize,
                background:
                  'linear-gradient(90deg, rgba(8,12,26,0.96) 0%, rgba(8,12,26,0.78) 58%, rgba(8,12,26,0.42) 100%)',
              }}
            />
          </>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="Fast Secure" width={305} height={72} style={{ position: 'relative' }} />
        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#d4ff3a', letterSpacing: 4, textTransform: 'uppercase' }}>
            {eyebrow}
          </div>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, marginTop: 16, maxWidth: 1000 }}>
            {title}
          </div>
        </div>
        <div style={{ fontSize: 26, color: 'rgba(255,255,255,0.65)', display: 'flex', position: 'relative' }}>{footer}</div>
      </div>
    ),
    ogSize,
  );
}
