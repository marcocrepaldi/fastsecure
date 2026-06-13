import React from 'react';

export interface BenefitItem {
  title: string;
  description: string;
}

interface BenefitsGridProps {
  title?: string;
  subtitle?: string;
  benefits: BenefitItem[];
}

export default function BenefitsGrid({ title = "Por que contratar?", subtitle, benefits }: BenefitsGridProps) {
  return (
    <section className="py-5 bg-white">
      <div className="container py-4">
        <div className="text-center mb-5" data-reveal>
          <span className="badge-soft mb-3"><span className="dot" />Vantagens</span>
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="text-center text-muted mt-3 mb-0">{subtitle}</p>}
        </div>

        <div className="row g-4 mt-2">
          {benefits.map((item, index) => (
            <div key={index} className="col-md-4" data-reveal style={{ ['--reveal-delay' as string]: index % 3 }}>
              <div className="bento-card h-100">
                <div className="benefit-index">{String(index + 1).padStart(2, '0')}</div>
                <h5 className="fw-bold text-dark">{item.title}</h5>
                <p className="text-muted mb-0">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
