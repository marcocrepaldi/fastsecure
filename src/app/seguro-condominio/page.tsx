import ProductLandingPage from '@/components/ProductLandingPage';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Seguro Condomínio | Fast Secure",
  description: "Proteção obrigatória e completa para o seu condomínio residencial ou comercial.",
  path: "/seguro-condominio",
});

export default function Page() {
  const icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  );

  const benefits = [
    { title: "Cobertura Completa", description: "Proteção sob medida de acordo com suas necessidades específicas." },
    { title: "Atendimento Especializado", description: "Nossa equipe está pronta para auxiliar você em qualquer sinistro." },
    { title: "Melhor Custo-Benefício", description: "Comparamos diversas seguradoras para encontrar a melhor proposta para você." }
  ];

  const faqItems = [
    { question: "Como faço para contratar?", answer: "Basta preencher o formulário nesta página para receber nossa cotação em minutos." },
    { question: "Quais as formas de pagamento?", answer: "Trabalhamos com diversas opções, incluindo boleto, cartão de crédito e débito em conta, além de parcelamento." },
    { question: "O processo é totalmente online?", answer: "Sim! Você pode fazer tudo do conforto da sua casa, desde a cotação até a assinatura da apólice." }
  ];

  return (
    <ProductLandingPage
      title="Seguro Condomínio"
      subtitle="Proteção obrigatória e completa para o seu condomínio residencial ou comercial."
      bgClass="bg-light-warning"
      btnClass="btn-warning"
      iconSvg={icon}
      imageUrl="/images/seguro_residencial.png"
      benefits={benefits}
      faqItems={faqItems}
      productName="Seguro Condomínio"
    />
  );
}
