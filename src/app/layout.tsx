import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Header, { type NavCategory } from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFab from '@/components/WhatsAppFab';
import Reveal from '@/components/Reveal';
import JsonLd from '@/components/JsonLd';
import { categories, products, productsIn } from '@/lib/products';
import { organizationLd, websiteLd } from '@/lib/seo';
import { SITE, whatsappNumber } from '@/lib/site';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' });
const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Fast Secure | Corretora de Seguros — cotação rápida e comparada',
    template: '%s | Fast Secure',
  },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: 'Fast Secure | Corretora de Seguros',
    description: SITE.description,
  },
  twitter: { card: 'summary_large_image' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  category: 'finance',
};

export const viewport: Viewport = { themeColor: '#080c1a' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const nav: NavCategory[] = categories.map((c) => ({
    id: c.id,
    name: c.name,
    items: productsIn(c.id).map((p) => ({ slug: p.slug, name: p.name })),
  }));
  const names = Object.fromEntries(products.map((p) => [p.slug, p.name]));

  return (
    // suppressHydrationWarning: o script abaixo adiciona a classe "js" ao <html> antes da hidratação.
    // Vale só para os atributos desta tag; erros nos filhos continuam sendo reportados.
    <html
      lang="pt-BR"
      className={`${jakarta.variable} ${bricolage.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Ativa as animações de entrada só quando há JavaScript. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh font-sans antialiased">
        <JsonLd data={organizationLd} />
        <JsonLd data={websiteLd} />
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-volt-500 focus:px-4 focus:py-2 focus:font-bold">
          Pular para o conteúdo
        </a>
        <Header nav={nav} />
        <div id="conteudo">{children}</div>
        <Footer />
        <WhatsAppFab number={whatsappNumber()} names={names} />
        <Reveal />
      </body>
    </html>
  );
}
