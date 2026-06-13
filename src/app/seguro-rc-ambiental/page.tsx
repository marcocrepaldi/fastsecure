import HeroSection from '@/components/HeroSection';
import BenefitsGrid from '@/components/BenefitsGrid';
import FAQ from '@/components/FAQ';
import LeadForm from '@/components/LeadForm';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Seguro Responsabilidade Civil Ambiental | Fast Secure",
  description: "Mitigue os riscos de poluição e desastres ambientais da sua empresa. Cobre multas, limpeza e indenizações a terceiros.",
  path: "/seguro-rc-ambiental",
});

export default function RCAmbiental() {
  const icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  );

  const benefits = [
    { title: "Custos de Limpeza (Remediação)", description: "Arrecada com os custos milionários para limpar solos, rios ou mananciais contaminados pelo vazamento da sua empresa." },
    { title: "Indenizações a Terceiros", description: "Paga os danos corporais e materiais causados à população e propriedades vizinhas afetadas pela poluição." },
    { title: "Defesa Jurídica e Multas", description: "Garante honorários de advogados especializados para defender a empresa contra ações civis públicas e órgãos ambientais." }
  ];

  const faqItems = [
    { question: "Quais empresas mais precisam do RC Ambiental?", answer: "Postos de combustíveis, indústrias químicas, transportadoras de produtos perigosos, mineradoras, aterros sanitários e construtoras." },
    { question: "Cobre poluição gradual?", answer: "Depende da apólice. A maioria cobre apenas poluição súbita e acidental (um tanque que rompe de repente). Apólices mais complexas podem cobrir a poluição gradual (um cano vazando óleo há anos), mas exigem auditoria rigorosa." },
    { question: "O RC Ambiental substitui o licenciamento do IBAMA?", answer: "Não, o seguro é uma proteção financeira. O licenciamento ambiental e o cumprimento das normas continuam sendo obrigatórios." }
  ];

  return (
    <main>
      <HeroSection 
        title="Responsabilidade Ambiental Protegida"
        subtitle="Um desastre ambiental pode falir uma empresa da noite para o dia. O RC Ambiental blinda o caixa da empresa contra vazamentos, contaminações e pesadas sanções estatais."
        bgClass="bg-light-info"
        btnClass="btn-info text-white"
        linkColor="text-info"
        iconSvg={icon}
        imageUrl="/images/seguro_empresarial.png"
      />

      <BenefitsGrid title="Por que o risco não pode ser ignorado?" benefits={benefits} />

      <FAQ items={faqItems} />

      <section id="cotacao" className="py-5">
        <div className="container py-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h2 className="fw-bold text-center mb-4">Cotação RC Ambiental</h2>
                  <p className="text-muted text-center mb-4">Fale com especialistas em grandes riscos e proteja sua operação.</p>
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
