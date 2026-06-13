import HeroSection from '@/components/HeroSection';
import BenefitsGrid from '@/components/BenefitsGrid';
import FAQ from '@/components/FAQ';
import LeadForm from '@/components/LeadForm';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Plano de Saúde Empresarial e PME | Fast Secure",
  description: "Reduza o custo com saúde na sua empresa. Planos de Saúde para PMEs a partir de 2 vidas com descontos de até 40%.",
  path: "/plano-de-saude-empresarial",
});

export default function PlanoSaudeEmpresarial() {
  const icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 14v8"/><path d="M8 18h8"/></svg>
  );

  const benefits = [
    { title: "Até 40% de Desconto", description: "Planos empresariais são significativamente mais baratos que planos físicos individuais." },
    { title: "Retenção de Talentos", description: "O benefício de saúde é o mais valorizado pelos colaboradores no Brasil." },
    { title: "A partir de 2 vidas", description: "Mesmo pequenas empresas e MEIs podem contratar e incluir dependentes familiares." }
  ];

  const faqItems = [
    { question: "MEI pode contratar plano empresarial?", answer: "Sim! Se o seu MEI tem mais de 6 meses de abertura, você pode contratar incluindo um dependente (cônjuge ou filho)." },
    { question: "Qual o mínimo de vidas exigidas?", answer: "A partir de 2 ou 3 vidas, dependendo da operadora. (Pode ser 1 titular + 1 dependente)." },
    { question: "Tem redução de carência?", answer: "Em grupos acima de 30 vidas, a isenção de carência é total (inclusive para partos e doenças pré-existentes)." }
  ];

  return (
    <main>
      <HeroSection 
        title="Plano de Saúde para sua Empresa (PME e Corporativo)"
        subtitle="O melhor investimento para o seu time. Reduza custos, retenha talentos e garanta o bem-estar dos seus colaboradores."
        bgClass="bg-light-success"
        btnClass="btn-success"
        linkColor="text-success"
        iconSvg={icon}
        imageUrl="/images/saude_familia.png"
      />

      <BenefitsGrid title="Por que fazer pelo CNPJ?" benefits={benefits} />

      <FAQ items={faqItems} />

      <section id="cotacao" className="py-5">
        <div className="container py-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h2 className="fw-bold text-center mb-4">Cotação Plano Empresarial</h2>
                  <p className="text-muted text-center mb-4">Descubra quanto sua empresa pode economizar.</p>
                  <LeadForm defaultProduct="Plano de Saúde" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
