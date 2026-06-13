import HeroSection from '@/components/HeroSection';
import BenefitsGrid from '@/components/BenefitsGrid';
import FAQ from '@/components/FAQ';
import LeadForm from '@/components/LeadForm';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Seguro Celular e Notebook - Proteção para Portáteis | Fast Secure",
  description: "Proteja seu Smartphone, Notebook e Tablet contra roubo, furto qualificado e quebra. Cotação rápida.",
  path: "/seguro-celular-notebook",
});

export default function SeguroCelular() {
  const icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
  );

  const benefits = [
    { title: "Roubo e Furto Qualificado", description: "Seu aparelho protegido contra roubos ou furtos onde há vestígio de arrombamento." },
    { title: "Quebra Acidental", description: "Caiu e quebrou a tela? A cobertura de danos físicos garante o conserto ou reposição do aparelho." },
    { title: "Danos por Líquidos", description: "Cobertura contra derramamento acidental de líquidos ou queda na água." }
  ];

  const faqItems = [
    { question: "O seguro cobre furto simples?", answer: "Na maioria das apólices padrão, o furto simples (quando você esquece o aparelho em algum lugar e alguém leva, sem vestígios) não tem cobertura. Apenas furto qualificado ou roubo." },
    { question: "Qual o limite de tempo de uso do celular para fazer seguro?", answer: "Geralmente, as seguradoras aceitam aparelhos com até 18 a 24 meses da data de emissão da nota fiscal de compra." },
    { question: "Como funciona a franquia em caso de roubo?", answer: "Em caso de sinistro aprovado, você paga uma participação obrigatória (franquia), que costuma ser de 15% a 25% do valor do aparelho, e a seguradora indeniza o restante." }
  ];

  return (
    <main>
      <HeroSection 
        title="Seu Celular e Notebook 100% Protegidos"
        subtitle="Ande sem medo! Tenha cobertura contra roubo, queda, quebra de tela e danos por líquidos para seus equipamentos portáteis."
        bgClass="bg-light-primary"
        btnClass="btn-primary"
        iconSvg={icon}
        imageUrl="/images/seguro_residencial.png"
      />

      <BenefitsGrid title="Coberturas do Seguro Portáteis" benefits={benefits} />

      <FAQ items={faqItems} />

      <section id="cotacao" className="py-5">
        <div className="container py-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h2 className="fw-bold text-center mb-4">Cotação Rápida de Seguro Celular</h2>
                  <p className="text-muted text-center mb-4">Proteja seus dispositivos hoje mesmo.</p>
                  <LeadForm defaultProduct="Seguro Celular" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
