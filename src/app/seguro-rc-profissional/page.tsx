import HeroSection from '@/components/HeroSection';
import BenefitsGrid from '@/components/BenefitsGrid';
import FAQ from '@/components/FAQ';
import LeadForm from '@/components/LeadForm';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Seguro Responsabilidade Civil (RC) Profissional | Fast Secure",
  description: "Proteção essencial para Médicos, Dentistas, Advogados e Engenheiros contra processos de erros e omissões (E&O).",
  path: "/seguro-rc-profissional",
});

export default function RCProfissional() {
  const icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
  );

  const benefits = [
    { title: "Defesa Jurídica e Custas", description: "O seguro cobre os honorários de advogados e peritos para a sua defesa em processos judiciais ou conselhos de classe." },
    { title: "Indenizações", description: "Se você for condenado a reparar danos ao cliente/paciente, a apólice arca com a indenização." },
    { title: "Tranquilidade Patrimonial", description: "Blinde seu patrimônio pessoal contra bloqueios judiciais causados por erros profissionais." }
  ];

  const faqItems = [
    { question: "Quais profissões podem contratar o RC Profissional?", answer: "Médicos, dentistas, profissionais de estética, advogados, engenheiros, arquitetos, contadores, entre outros." },
    { question: "O seguro cobre acordos extrajudiciais?", answer: "Sim, mediante aprovação prévia da seguradora, é possível usar o limite da apólice para firmar acordos extrajudiciais e evitar o prolongamento de um processo." },
    { question: "Cobre danos morais?", answer: "Sim, os seguros de RC Profissional englobam indenizações decorrentes de danos morais alegados por terceiros devido à falha profissional." }
  ];

  return (
    <main>
      <HeroSection 
        title="Blindagem para a sua Carreira e Patrimônio"
        subtitle="Seguro de Responsabilidade Civil (RC) Profissional. Trabalhe com tranquilidade sabendo que está protegido contra processos e reclamações de clientes."
        bgClass="bg-light-primary"
        btnClass="btn-primary"
        iconSvg={icon}
        imageUrl="/images/seguro_empresarial.png"
      />

      <BenefitsGrid title="O que o Seguro E&O garante?" benefits={benefits} />

      <FAQ items={faqItems} />

      <section id="cotacao" className="py-5">
        <div className="container py-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h2 className="fw-bold text-center mb-4">Cotação RC Profissional</h2>
                  <p className="text-muted text-center mb-4">Proteja seu registro e seu patrimônio agora mesmo.</p>
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
