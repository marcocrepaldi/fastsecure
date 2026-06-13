import HeroSection from '@/components/HeroSection';
import BenefitsGrid from '@/components/BenefitsGrid';
import FAQ from '@/components/FAQ';
import LeadForm from '@/components/LeadForm';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Plano de Saúde - Cuidado para Você e sua Família | Fast Secure",
  description: "As melhores opções de Planos de Saúde Individuais e Empresariais. Conte com a Fast Secure.",
  path: "/plano-de-saude",
});

export default function PlanoSaude() {
  const icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
  );

  const benefits = [
    { title: "Ampla Rede Credenciada", description: "Os melhores hospitais, laboratórios e clínicas do país à sua disposição." },
    { title: "Desconto Empresarial (PME)", description: "Se você tem CNPJ (mesmo MEI), consegue descontos de até 40% em relação ao plano físico." },
    { title: "Sem Coparticipação ou Com Coparticipação", description: "Escolha o modelo financeiro que melhor se adapta ao uso da sua família." }
  ];

  const faqItems = [
    { question: "Qual a carência de um plano de saúde?", answer: "Geralmente 24h para urgência/emergência, 30 dias para consultas/exames simples, e 180 dias para cirurgias, internações e exames complexos. 300 dias para parto." },
    { question: "Posso aproveitar carências de outro plano?", answer: "Sim! Se você está vindo de outro plano ativo, fazemos a portabilidade de carências para você não ter que esperar." },
    { question: "Preciso ter CNPJ para contratar plano PME?", answer: "Sim, é necessário ter um CNPJ ativo (pode ser MEI) com pelo menos 6 meses de abertura." }
  ];

  return (
    <main>
      <HeroSection 
        title="Plano de Saúde sob Medida para Você"
        subtitle="Trabalhamos com as operadoras líderes do mercado para oferecer os melhores hospitais com excelente custo-benefício."
        bgClass="bg-light-success"
        btnClass="btn-success"
        linkColor="text-success"
        iconSvg={icon}
        imageUrl="/images/saude_familia.png"
      />

      <BenefitsGrid title="Modalidades de Contratação" benefits={benefits} />

      <FAQ items={faqItems} />

      <section id="cotacao" className="py-5">
        <div className="container py-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h2 className="fw-bold text-center mb-4">Simule seu Plano de Saúde</h2>
                  <p className="text-muted text-center mb-4">Cuidar da sua saúde é prioridade. Vamos encontrar a melhor opção.</p>
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
