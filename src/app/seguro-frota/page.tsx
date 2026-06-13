import HeroSection from '@/components/HeroSection';
import BenefitsGrid from '@/components/BenefitsGrid';
import FAQ from '@/components/FAQ';
import LeadForm from '@/components/LeadForm';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Seguro de Frota - Proteção para os Veículos da sua Empresa | Fast Secure",
  description: "Seguro de Frota de Veículos com taxas reduzidas. Proteção para carros, utilitários e caminhões de empresas e locadoras.",
  path: "/seguro-frota",
});

export default function SeguroFrota() {
  const icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.4-1.7-1-2.1L17 8H7L3 10.9c-.6.4-1 1.2-1 2.1v3c0 .6.4 1 1 1h2"/><path d="M14 17H9"/><circle cx="16.5" cy="17.5" r="2.5"/><circle cx="6.5" cy="17.5" r="2.5"/></svg>
  );

  const benefits = [
    { title: "Custos Reduzidos", description: "O custo por veículo numa apólice de frota é consideravelmente menor do que em apólices individuais." },
    { title: "Apólice Única", description: "Todos os veículos numa única apólice, com o mesmo vencimento. Fim da dor de cabeça com controles." },
    { title: "Assistência 24h Especializada", description: "Coberturas de reboque sem limite de km para sua equipe comercial ou de entregas não ficar na rua." }
  ];

  const faqItems = [
    { question: "Quantos veículos são necessários para formar uma frota?", answer: "Na maioria das seguradoras, apólices de frota podem ser contratadas a partir de 2 ou 3 veículos cadastrados num mesmo CNPJ." },
    { question: "O que acontece se eu comprar um veículo novo no meio da apólice?", answer: "Basta solicitar a 'inclusão de item' na apólice (endosso). O veículo entra na cobertura e o valor é cobrado proporcionalmente aos dias que faltam para o fim do contrato." },
    { question: "E se um funcionário causar um acidente?", answer: "O seguro cobre os danos ao veículo e também a responsabilidade civil contra terceiros (RCF-V), blindando o caixa da empresa." }
  ];

  return (
    <main>
      <HeroSection 
        title="Frota Protegida, Operação Sem Parar"
        subtitle="O Seguro de Frota é o formato ideal para reduzir os custos operacionais e proteger os veículos (carros, caminhões e utilitários) do seu CNPJ."
        bgClass="bg-light-primary"
        btnClass="btn-primary"
        iconSvg={icon}
        imageUrl="/images/seguro_auto.png"
      />

      <BenefitsGrid title="Vantagens do Seguro de Frota" benefits={benefits} />

      <FAQ items={faqItems} />

      <section id="cotacao" className="py-5">
        <div className="container py-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h2 className="fw-bold text-center mb-4">Cotação Seguro de Frota</h2>
                  <p className="text-muted text-center mb-4">Diga-nos o tamanho da sua frota e nós traremos as melhores taxas.</p>
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
