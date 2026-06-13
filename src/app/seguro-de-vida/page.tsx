import HeroSection from '@/components/HeroSection';
import BenefitsGrid from '@/components/BenefitsGrid';
import FAQ from '@/components/FAQ';
import LeadForm from '@/components/LeadForm';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Seguro de Vida - Proteja Quem Você Ama | Fast Secure",
  description: "Seguro de vida individual e familiar. Garanta o futuro de quem você ama com coberturas sob medida e sem burocracia.",
  path: "/seguro-de-vida",
});

export default function SeguroVida() {
  const icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
  );

  const benefits = [
    { title: "Morte Natural ou Acidental", description: "Garante um valor financeiro (indenização) para seus beneficiários, mantendo o padrão de vida da família." },
    { title: "Invalidez Permanente", description: "Em caso de acidente que o impeça de trabalhar, você recebe a indenização em vida." },
    { title: "Antecipação por Doença Grave", description: "Pagamento em vida do capital segurado em caso de diagnóstico de câncer, infarto, AVC, etc." }
  ];

  const faqItems = [
    { question: "Qual a idade limite para contratar um Seguro de Vida?", answer: "Na maioria das seguradoras, você pode contratar até os 65 anos. O ideal é contratar mais cedo, pois as taxas são bem menores." },
    { question: "O seguro de vida entra em inventário?", answer: "Não! A indenização do seguro de vida é paga diretamente aos beneficiários, de forma rápida, e não responde por dívidas deixadas." },
    { question: "Posso resgatar o valor pago?", answer: "Os seguros de vida tradicionais não possuem resgate (são de risco puro). Mas existem modalidades de Seguro de Vida Resgatável, fale com nosso especialista." }
  ];

  return (
    <main>
      <HeroSection 
        title="Amor em Forma de Proteção Financeira"
        subtitle="O Seguro de Vida garante o conforto da sua família em caso de ausência e te ampara em vida em caso de invalidez ou doenças graves."
        bgClass="bg-light-success"
        btnClass="btn-success"
        linkColor="text-success"
        iconSvg={icon}
        imageUrl="/images/seguro_vida.png"
      />

      <BenefitsGrid title="Por que o Seguro de Vida é Essencial?" benefits={benefits} />

      <FAQ items={faqItems} />

      <section id="cotacao" className="py-5">
        <div className="container py-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h2 className="fw-bold text-center mb-4">Simule seu Seguro de Vida</h2>
                  <p className="text-muted text-center mb-4">Planeje o amanhã, proteja sua família.</p>
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
