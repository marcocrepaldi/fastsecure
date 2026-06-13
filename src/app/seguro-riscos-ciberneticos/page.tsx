import HeroSection from '@/components/HeroSection';
import BenefitsGrid from '@/components/BenefitsGrid';
import FAQ from '@/components/FAQ';
import LeadForm from '@/components/LeadForm';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Seguro Contra Riscos Cibernéticos (Cyber) | Fast Secure",
  description: "Proteção contra vazamento de dados, LGPD, ataques hackers e ransomware para a sua empresa.",
  path: "/seguro-riscos-ciberneticos",
});

export default function SeguroCyber() {
  const icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  );

  const benefits = [
    { title: "Custos de Notificação e Perícia", description: "Paga os custos para descobrir como os hackers entraram, restaurar o sistema e notificar os clientes afetados." },
    { title: "Responsabilidade por Dados (LGPD)", description: "Arrecada com os processos de clientes e penalidades estatais derivadas do vazamento de dados sensíveis." },
    { title: "Lucros Cessantes por Ataque", description: "Indenização caso seu e-commerce ou sistema fique fora do ar devido a um ataque cibernético." }
  ];

  const faqItems = [
    { question: "Minha empresa é pequena, eu preciso?", answer: "Sim. PMEs são os principais alvos de hackers hoje em dia, pois costumam ter menos defesas que as grandes corporações. Além disso, as multas da LGPD afetam qualquer tamanho de empresa." },
    { question: "O seguro paga o resgate em caso de Ransomware?", answer: "A maioria das apólices cobre os lucros cessantes, a perícia forense e os honorários de negociação para resolver sequestros digitais." },
    { question: "O seguro cobre falhas humanas?", answer: "Sim. Vazamentos que ocorrem porque um funcionário clicou num link malicioso ou perdeu um notebook com acesso livre também têm cobertura, desde que respeitados os protocolos mínimos de segurança." }
  ];

  return (
    <main>
      <HeroSection 
        title="Blindagem Cibernética e Proteção LGPD"
        subtitle="Ameaças digitais podem custar milhões. O Seguro de Riscos Cibernéticos (Cyber) protege sua empresa contra prejuízos financeiros após um ataque hacker ou vazamento de dados."
        bgClass="bg-light-info"
        btnClass="btn-info text-white"
        linkColor="text-info"
        iconSvg={icon}
        imageUrl="/images/seguro_empresarial.png"
      />

      <BenefitsGrid title="O que a apólice Cyber garante?" benefits={benefits} />

      <FAQ items={faqItems} />

      <section id="cotacao" className="py-5">
        <div className="container py-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h2 className="fw-bold text-center mb-4">Cotação Seguro Cyber</h2>
                  <p className="text-muted text-center mb-4">Proteja o ativo mais valioso de hoje: a informação da sua empresa.</p>
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
