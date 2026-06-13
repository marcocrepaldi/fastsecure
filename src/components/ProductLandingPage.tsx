import HeroSection from '@/components/HeroSection';
import BenefitsGrid from '@/components/BenefitsGrid';
import FAQ from '@/components/FAQ';
import LeadForm from '@/components/LeadForm';

interface ProductLandingPageProps {
  title: string;
  subtitle: string;
  iconSvg?: React.ReactNode;
  bgClass?: string;
  btnClass?: string;
  benefits: { title: string; description: string }[];
  faqItems: { question: string; answer: string }[];
  productName: string;
  imageUrl?: string;
}

export default function ProductLandingPage({
  title,
  subtitle,
  iconSvg,
  bgClass = 'bg-light-primary',
  btnClass = 'btn-primary',
  benefits,
  faqItems,
  productName,
  imageUrl
}: ProductLandingPageProps) {
  return (
    <main>
      <HeroSection 
        title={title}
        subtitle={subtitle}
        bgClass={bgClass}
        btnClass={btnClass}
        iconSvg={iconSvg}
        imageUrl={imageUrl}
      />

      <BenefitsGrid title="Por que contratar conosco?" benefits={benefits} />

      {faqItems && faqItems.length > 0 && (
        <FAQ items={faqItems} />
      )}

      <section id="cotacao" className="py-5">
        <div className="container py-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h2 className="fw-bold text-center mb-4">Faça sua Cotação de {productName}</h2>
                  <p className="text-muted text-center mb-4">Receba as melhores propostas em poucos minutos.</p>
                  <LeadForm defaultProduct={productName} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
