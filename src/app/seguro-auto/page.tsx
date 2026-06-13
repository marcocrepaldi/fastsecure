import HeroSection from '@/components/HeroSection';
import BenefitsGrid from '@/components/BenefitsGrid';
import FAQ from '@/components/FAQ';
import LeadForm from '@/components/LeadForm';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Seguro Auto - Proteção Completa para seu Veículo | Fast Secure",
  description: "Faça a cotação do seu Seguro Auto com a Fast Secure. Cobertura completa e assistência 24h.",
  path: "/seguro-auto",
});

export default function SeguroAuto() {
  const icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.4-1.7-1-2.1L17 8H7L3 10.9c-.6.4-1 1.2-1 2.1v3c0 .6.4 1 1 1h2"/><path d="M14 17H9"/><circle cx="16.5" cy="17.5" r="2.5"/><circle cx="6.5" cy="17.5" r="2.5"/></svg>
  );

  const benefits = [
    { title: "Assistência 24 Horas", description: "Pane elétrica, mecânica, pneu furado ou falta de combustível. Estaremos lá quando você precisar." },
    { title: "Carro Reserva", description: "Em caso de sinistro, não fique a pé. Opções de carro reserva de 7 a 30 dias." },
    { title: "Cobertura de Terceiros", description: "Proteção contra danos materiais e corporais causados a outras pessoas." }
  ];

  const faqItems = [
    { question: "O que o Seguro Auto compreensivo cobre?", answer: "Cobre colisão, incêndio, roubo e furto do seu veículo, além de danos da natureza (enchentes, queda de árvores)." },
    { question: "A assistência 24 horas tem limite de km?", answer: "Depende do plano contratado. Temos opções de 100km, 200km, 500km ou guincho com quilometragem ilimitada." },
    { question: "Como funciona a classe de bônus?", answer: "A cada ano que você renova o seguro sem ter acionado sinistro, você ganha um 'bônus' que gera desconto na renovação." }
  ];

  return (
    <main>
      <HeroSection 
        title="Seguro Auto: Proteção e Tranquilidade na Estrada"
        subtitle="Não deixe seu veículo desprotegido. Trabalhamos com as melhores seguradoras do mercado para oferecer coberturas sob medida."
        bgClass="bg-light-primary"
        btnClass="btn-primary"
        iconSvg={icon}
        imageUrl="/images/seguro_auto.png"
      />

      <BenefitsGrid title="Por que contratar conosco?" benefits={benefits} />

      <FAQ items={faqItems} />

      <section id="cotacao" className="py-5">
        <div className="container py-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h2 className="fw-bold text-center mb-4">Faça sua Cotação de Seguro Auto</h2>
                  <p className="text-muted text-center mb-4">Receba as melhores propostas em poucos minutos.</p>
                  <LeadForm defaultProduct="Seguro Auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
