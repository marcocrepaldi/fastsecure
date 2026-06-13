import HeroSection from '@/components/HeroSection';
import BenefitsGrid from '@/components/BenefitsGrid';
import FAQ from '@/components/FAQ';
import LeadForm from '@/components/LeadForm';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Seguro Viagem Nacional e Internacional | Fast Secure",
  description: "Viaje tranquilo com coberturas médicas, odontológicas e extravio de bagagem. Cotação online.",
  path: "/seguro-viagem",
});

export default function SeguroViagem() {
  const icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L3 8l6.5 5L7 17l-3-1-1.5 1.5 4 2 2 4L10 22l-1-3 4-2.5 5 6.5l1.2-.7c.4-.2.7-.6.6-1.1z"/></svg>
  );

  const benefits = [
    { title: "Despesas Médicas e Hospitalares", description: "Atendimento emergencial de saúde no exterior ou no Brasil, sem surpresas com contas altíssimas." },
    { title: "Extravio de Bagagem", description: "Indenização caso a companhia aérea perca sua mala durante o voo." },
    { title: "Traslado Médico e Repatriação", description: "Garante o seu retorno seguro ao local de origem em caso de acidente grave ou falecimento." }
  ];

  const faqItems = [
    { question: "O seguro viagem é obrigatório?", answer: "Para muitos países da Europa (Tratado de Schengen), é obrigatório possuir um seguro viagem com cobertura mínima de 30.000 euros. Para outros países, é altamente recomendado." },
    { question: "O cartão de crédito já não me dá seguro viagem?", answer: "Alguns cartões de alta renda oferecem, mas as coberturas podem ser limitadas. Um seguro viagem contratado sob medida oferece capital maior e atendimento muito mais ágil." },
    { question: "Posso contratar se já estiver viajando?", answer: "A maioria das seguradoras exige que a contratação seja feita antes do início da viagem (embarque)." }
  ];

  return (
    <main>
      <HeroSection 
        title="Viaje com Segurança e Sem Surpresas"
        subtitle="Seguro Viagem nacional e internacional. Despesas médicas, bagagem extraviada e suporte 24h em português, onde você estiver."
        bgClass="bg-light-info"
        btnClass="btn-info text-white"
        linkColor="text-info"
        iconSvg={icon}
        imageUrl="/images/seguro_vida.png"
      />

      <BenefitsGrid title="Principais Coberturas" benefits={benefits} />

      <FAQ items={faqItems} />

      <section id="cotacao" className="py-5">
        <div className="container py-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h2 className="fw-bold text-center mb-4">Cotação Rápida de Seguro Viagem</h2>
                  <p className="text-muted text-center mb-4">Embarque tranquilo para suas férias ou viagem de negócios.</p>
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
