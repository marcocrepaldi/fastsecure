import HeroSection from '@/components/HeroSection';
import BenefitsGrid from '@/components/BenefitsGrid';
import FAQ from '@/components/FAQ';
import LeadForm from '@/components/LeadForm';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Seguro Empresarial - Proteção para o seu Negócio | Fast Secure",
  description: "Seguro Compreensivo Empresarial. Proteja sua empresa contra incêndio, roubo, danos elétricos e garanta Lucros Cessantes.",
  path: "/seguro-empresarial",
});

export default function SeguroEmpresarial() {
  const icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M9 8h1"/><path d="M9 12h1"/><path d="M9 16h1"/><path d="M14 8h1"/><path d="M14 12h1"/><path d="M14 16h1"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/></svg>
  );

  const benefits = [
    { title: "Proteção Patrimonial Total", description: "Cobertura contra incêndio, raios, explosão, queda de aeronaves, vendaval e granizo." },
    { title: "Roubo e Furto", description: "Indenização por roubo de equipamentos, mercadorias e valores guardados na empresa." },
    { title: "Lucros Cessantes", description: "Se um sinistro forçar o fechamento temporário, a seguradora arca com as despesas fixas (aluguel, folha) da empresa." }
  ];

  const faqItems = [
    { question: "É obrigatório ter Seguro Empresarial?", answer: "Legalmente, na maioria dos casos não é obrigatório, mas contratos de aluguel de imóveis comerciais geralmente exigem a apólice com cobertura de incêndio." },
    { question: "O que é RC Operações?", answer: "É a Responsabilidade Civil da empresa. Se um letreiro cai e amassa um carro, ou se um cliente escorrega e se machuca dentro da loja, a apólice paga os danos." },
    { question: "Cobre danos em notebooks da empresa fora do endereço?", answer: "A cobertura padrão geralmente abrange apenas os bens dentro do imóvel. Mas você pode contratar uma cláusula extra (Equipamentos Portáteis) para cobri-los fora da empresa." }
  ];

  return (
    <main>
      <HeroSection 
        title="O Patrimônio da sua Empresa 100% Protegido"
        subtitle="Lojas, clínicas, galpões e escritórios. Um imprevisto não pode fechar as suas portas."
        bgClass="bg-light-info"
        btnClass="btn-info text-white"
        linkColor="text-info"
        iconSvg={icon}
        imageUrl="/images/seguro_empresarial.png"
      />

      <BenefitsGrid title="O que o Seguro Empresarial cobre?" benefits={benefits} />

      <FAQ items={faqItems} />

      <section id="cotacao" className="py-5">
        <div className="container py-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h2 className="fw-bold text-center mb-4">Cotação Seguro Empresarial</h2>
                  <p className="text-muted text-center mb-4">Fale com nosso especialista B2B para estruturar a melhor apólice.</p>
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
