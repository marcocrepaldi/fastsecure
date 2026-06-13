import HeroSection from '@/components/HeroSection';
import BenefitsGrid from '@/components/BenefitsGrid';
import FAQ from '@/components/FAQ';
import LeadForm from '@/components/LeadForm';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Seguro Residencial - Proteja seu Lar | Fast Secure",
  description: "Seguro Residencial com as melhores coberturas e assistência 24h para sua casa ou apartamento. Cotação rápida.",
  path: "/seguro-residencial",
});

export default function SeguroResidencial() {
  const icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  );

  const benefits = [
    { title: "Incêndio, Raio e Explosão", description: "Cobertura básica que protege a estrutura e os bens do seu imóvel contra danos graves." },
    { title: "Roubo e Furto Qualificado", description: "Indenização de bens como eletrônicos, móveis e objetos levados durante invasões." },
    { title: "Assistência 24 Horas", description: "Chaveiro, encanador, eletricista e conserto de eletrodomésticos sempre à disposição." }
  ];

  const faqItems = [
    { question: "Moro de aluguel, posso fazer o seguro residencial?", answer: "Sim! É muito recomendado para inquilinos, pois protege os seus bens (conteúdo) e a responsabilidade civil do imóvel." },
    { question: "O seguro cobre vendaval ou chuva forte?", answer: "Sim, se a cobertura de Vendaval, Furacão, Ciclone, Tornado e Queda de Granizo for contratada como adicional na sua apólice." },
    { question: "O seguro residencial é caro?", answer: "Não. É um dos seguros mais baratos do mercado. Em média, custa menos de R$ 50 por mês para uma excelente cobertura." }
  ];

  return (
    <main>
      <HeroSection 
        title="O Seu Lar Mais Seguro do que Nunca"
        subtitle="Proteja o seu patrimônio com o Seguro Residencial. Assistência 24h para imprevistos domésticos e tranquilidade para a sua família."
        bgClass="bg-light-warning"
        btnClass="btn-warning text-white"
        linkColor="text-warning"
        iconSvg={icon}
        imageUrl="/images/seguro_residencial.png"
      />

      <BenefitsGrid title="Vantagens de Ter Seguro Residencial" benefits={benefits} />

      <FAQ items={faqItems} />

      <section id="cotacao" className="py-5">
        <div className="container py-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h2 className="fw-bold text-center mb-4">Cote seu Seguro Residencial</h2>
                  <p className="text-muted text-center mb-4">Descubra como é barato proteger a sua casa.</p>
                  <LeadForm defaultProduct="Outros" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
