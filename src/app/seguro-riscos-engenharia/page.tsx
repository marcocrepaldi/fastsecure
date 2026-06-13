import HeroSection from '@/components/HeroSection';
import BenefitsGrid from '@/components/BenefitsGrid';
import FAQ from '@/components/FAQ';
import LeadForm from '@/components/LeadForm';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Seguro Riscos de Engenharia - Obras Seguras | Fast Secure",
  description: "Proteja sua obra contra acidentes, incêndio, desmoronamento e erros de execução. Seguro indispensável para construtoras e incorporadoras.",
  path: "/seguro-riscos-engenharia",
});

export default function RiscosEngenharia() {
  const icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22h20"/><path d="M17 22V10a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v12"/><path d="M12 2v6"/><path d="M10 4h4"/></svg>
  );

  const benefits = [
    { title: "Cobertura Ampla (All Risks)", description: "Cobre quase todos os acidentes físicos de causa súbita e imprevista no canteiro de obras, incluindo incêndios e ventos." },
    { title: "Erros de Execução", description: "Indeniza os danos materiais causados à obra em decorrência de falhas na execução do projeto." },
    { title: "Despesas de Desentulho", description: "Se ocorrer um sinistro grave, a seguradora paga os custos para remover os escombros e limpar a área para recomeçar." }
  ];

  const faqItems = [
    { question: "O seguro Riscos de Engenharia cobre danos aos vizinhos da obra?", answer: "A cobertura básica cobre apenas a obra em si. Mas você pode (e deve) incluir a cobertura adicional de RC Obras (Responsabilidade Civil) para proteger contra danos a terceiros." },
    { question: "Quando devo contratar o seguro?", answer: "Idealmente, a apólice deve ser contratada e emitida antes do início das movimentações de terra e fundação no canteiro de obras." },
    { question: "Cobre roubo de materiais?", answer: "Sim, existe cobertura adicional para roubo ou furto qualificado de materiais estocados no canteiro de obras e bens incorporados." }
  ];

  return (
    <main>
      <HeroSection 
        title="Construa com Segurança e Previsibilidade"
        subtitle="Seguro Riscos de Engenharia (Obras Civis). A proteção fundamental para garantir que acidentes no canteiro não comprometam o lucro do seu projeto."
        bgClass="bg-light-warning"
        btnClass="btn-warning text-white"
        linkColor="text-warning"
        iconSvg={icon}
        imageUrl="/images/seguro_empresarial.png"
      />

      <BenefitsGrid title="Por que toda obra exige esse seguro?" benefits={benefits} />

      <FAQ items={faqItems} />

      <section id="cotacao" className="py-5">
        <div className="container py-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h2 className="fw-bold text-center mb-4">Cotação Riscos de Engenharia</h2>
                  <p className="text-muted text-center mb-4">Envie os dados do projeto (Cronograma físico-financeiro) e obtenha a melhor taxa.</p>
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
