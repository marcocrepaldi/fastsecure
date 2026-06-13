import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import BootstrapClient from '../components/BootstrapClient';
import ScrollFX from '../components/ScrollFX';
import WhatsAppButton from '../components/WhatsAppButton';
import { SITE } from '../lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Fast Secure | Corretora de Seguros e Benefícios Multi-Produto',
    template: '%s | Fast Secure',
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    'corretora de seguros',
    'seguros corporativos',
    'plano de saúde empresarial',
    'seguro de vida',
    'seguro auto',
    'seguro empresarial',
    'benefícios para colaboradores',
    'previdência privada',
    'consórcio',
    'SUSEP',
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: 'Fast Secure | Corretora de Seguros e Benefícios Multi-Produto',
    description: SITE.description,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fast Secure | Corretora de Seguros e Benefícios',
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'finance',
};

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'InsuranceAgency',
  name: SITE.legalName,
  alternateName: SITE.name,
  url: SITE.url,
  description: SITE.description,
  telephone: SITE.phone,
  email: SITE.email,
  image: `${SITE.url}/opengraph-image`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    addressCountry: SITE.address.country,
  },
  areaServed: 'BR',
  priceRange: '$$',
};

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: SITE.url,
  inLanguage: 'pt-BR',
  publisher: { '@type': 'Organization', name: SITE.legalName },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const whatsappNumber = process.env.WHATSAPP_NUMBER || '5511999999999';
  return (
    <html lang="pt-BR">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <BootstrapClient />
        <ScrollFX />
        <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
          <div className="container">
            <a className="navbar-brand" href="/">
              <div className="logo-icon">FS</div>
              Fast Secure
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link fw-medium" href="#produtos">Produtos</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link fw-medium" href="#sobre">Sobre Nós</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link fw-medium" href="#contato">Contato</a>
                </li>
                <li className="nav-item ms-lg-3">
                  <a className="btn btn-primary" href="#cotacao">Fazer Cotação</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {children}
        
        <footer className="site-footer py-5 mt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-4 mb-4 mb-md-0">
                <a className="navbar-brand mb-3" href="/">
                  <div className="logo-icon">FS</div>
                  Fast Secure
                </a>
                <p>A sua corretora de seguros e investimentos de confiança. Protegendo o seu presente e garantindo o seu futuro.</p>
                <div className="d-flex flex-wrap gap-2 mt-3">
                  <span className="footer-badge">✓ SUSEP &amp; ANS</span>
                  <span className="footer-badge">🔒 LGPD</span>
                  <span className="footer-badge">15 seguradoras</span>
                </div>
              </div>
              <div className="col-md-2 col-6 mb-4 mb-md-0">
                <h6 className="fw-bold mb-3">Produtos</h6>
                <ul className="list-unstyled">
                  <li className="mb-2"><a href="/seguro-auto" className="text-decoration-none">Seguro Auto</a></li>
                  <li className="mb-2"><a href="/plano-de-saude" className="text-decoration-none">Plano de Saúde</a></li>
                  <li className="mb-2"><a href="/seguro-de-vida" className="text-decoration-none">Seguro de Vida</a></li>
                  <li className="mb-2"><a href="/consorcios" className="text-decoration-none">Consórcio</a></li>
                </ul>
              </div>
              <div className="col-md-2 col-6 mb-4 mb-md-0">
                <h6 className="fw-bold mb-3">Empresa</h6>
                <ul className="list-unstyled">
                  <li className="mb-2"><a href="/#sobre" className="text-decoration-none">Sobre Nós</a></li>
                  <li className="mb-2"><a href="/#solucoes" className="text-decoration-none">Soluções B2B</a></li>
                  <li className="mb-2"><a href="/#produtos" className="text-decoration-none">Catálogo</a></li>
                  <li className="mb-2"><a href="/#cotacao" className="text-decoration-none">Contato</a></li>
                </ul>
              </div>
              <div className="col-md-4">
                <h6 className="fw-bold mb-3">Fale Conosco</h6>
                <p className="mb-1">0800 123 4567</p>
                <p className="mb-3">contato@fastsecure.com.br</p>
                <p className="mb-0">Av. Paulista, 1000 - São Paulo, SP</p>
              </div>
            </div>
            <div className="border-top footer-divider pt-4 mt-4 text-center">
              <p className="mb-0">&copy; {new Date().getFullYear()} Fast Secure Corretora. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>

        <WhatsAppButton number={whatsappNumber} />
      </body>
    </html>
  );
}
