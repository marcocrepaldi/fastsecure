import HeroSection from '@/components/HeroSection';
import BenefitsGrid from '@/components/BenefitsGrid';
import FAQ from '@/components/FAQ';
import LeadForm from '@/components/LeadForm';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Seguro Diária de Incapacidade Temporária (DIT) | Fast Secure",
  description: "Garantia de renda para autônomos e profissionais liberais. Receba se ficar impedido de trabalhar por doença ou acidente.",
  path: "/seguro-dit",
});

export default function SeguroDIT() {
  const icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  );

  const benefits = [
    { title: "Garantia de Renda", description: "Paga uma diária equivalente ao seu ganho médio diário caso precise se afastar do trabalho." },
    { title: "Doença ou Acidente", description: "Cobertura ampla: desde um pé quebrado que impede locomoção até diagnósticos médicos complexos." },
    { title: "LER / DORT (Opcional)", description: "Muitas seguradoras cobrem afastamento por Lesão por Esforço Repetitivo." }
  ];

  const faqItems = [
    { question: "Quem deve contratar o seguro DIT?", answer: "Profissionais liberais (dentistas, advogados, médicos), autônomos, empresários e freelancers que não têm estabilidade salarial do CLT." },
    { question: "Por quanto tempo recebo a diária?", answer: "A apólice possui um limite de dias (franquia e dias de cobertura contratados), geralmente podendo pagar de 90 a até 365 diárias por evento." },
    { question: "É preciso comprovar renda?", answer: "No momento do acionamento do seguro (sinistro), a seguradora pedirá a comprovação da renda média dos últimos meses (IR, extrato bancário) para justificar a diária." }
  ];

  return (
    <main>
      <HeroSection 
        title="Se Você Precisar Parar, Sua Renda Não Para"
        subtitle="Seguro de Diária por Incapacidade Temporária (DIT). A rede de proteção que todo profissional liberal e autônomo deve ter."
        bgClass="bg-light-warning"
        btnClass="btn-warning text-white"
        linkColor="text-warning"
        iconSvg={icon}
        imageUrl="/images/seguro_vida.png"
      />

      <BenefitsGrid title="O Seguro Ideal para Autônomos" benefits={benefits} />

      <FAQ items={faqItems} />

      <section id="cotacao" className="py-5">
        <div className="container py-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h2 className="fw-bold text-center mb-4">Cotação Seguro DIT</h2>
                  <p className="text-muted text-center mb-4">Tenha tranquilidade financeira mesmo diante de imprevistos.</p>
                  <LeadForm defaultProduct="Seguro de Vida" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
