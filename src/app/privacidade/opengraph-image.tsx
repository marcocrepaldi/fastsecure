import { privacyPage } from '@/lib/editorial';
import { ogCard, ogSize, publicImageDataUrl } from '@/lib/og';

export const alt = 'Política de Privacidade da Fast Secure';
export const size = ogSize;
export const contentType = 'image/png';

export default async function Image() {
  return ogCard({
    eyebrow: privacyPage.eyebrow,
    title: privacyPage.heading,
    footer: 'Tratamento de dados pessoais e direitos do titular',
    backgroundSrc: await publicImageDataUrl(privacyPage.image),
    fullBleedBackground: true,
  });
}
