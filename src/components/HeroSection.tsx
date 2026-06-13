import React from 'react';
import Link from 'next/link';
import ProductSchema from './ProductSchema';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  bgClass: string;
  btnClass: string;
  iconSvg: React.ReactNode;
  breadcrumbLink?: string;
  breadcrumbText?: string;
  linkColor?: string;
  imageUrl?: string;
}

export default function HeroSection({
  title,
  subtitle,
  bgClass,
  btnClass,
  iconSvg,
  breadcrumbLink = '/',
  breadcrumbText = 'Home',
  linkColor,
  imageUrl
}: HeroSectionProps) {
  return (
    <section className={`hero-product has-glow ${bgClass}`}>
      <ProductSchema name={title} description={subtitle} />
      <div className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6" data-reveal>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb small">
                <li className="breadcrumb-item">
                  <Link href={breadcrumbLink} className={`text-decoration-none ${linkColor || ''}`}>
                    {breadcrumbText}
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">Detalhes</li>
              </ol>
            </nav>
            <h1 className="display-hero mb-4">{title}</h1>
            <p className="hero-subtitle fs-5 text-muted mb-4">{subtitle}</p>
            <a href="#cotacao" className={`btn btn-lg px-4 py-2 hero-btn-primary ${btnClass}`}>Fazer Cotação Agora</a>
          </div>
          <div className="col-lg-5 offset-lg-1 mt-4 mt-lg-0 text-center" data-reveal style={{ ['--reveal-delay' as string]: 2 }}>
            {imageUrl ? (
              <img src={imageUrl} alt={title} className="img-fluid shadow-lg w-100" style={{ objectFit: 'cover', maxHeight: '420px', borderRadius: 'var(--fs-radius-lg)' }} />
            ) : (
              <div className="feature-icon text-white d-inline-flex align-items-center justify-content-center hero-icon-xl" style={{ width: '120px', height: '120px', borderRadius: '24px', backgroundColor: 'var(--bs-primary)' }}>
                {iconSvg}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
