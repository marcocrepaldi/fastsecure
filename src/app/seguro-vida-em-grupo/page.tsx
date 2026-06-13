import HeroSection from '@/components/HeroSection';
import BenefitsGrid from '@/components/BenefitsGrid';
import FAQ from '@/components/FAQ';
import LeadForm from '@/components/LeadForm';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: "Seguro de Vida em Grupo (Empresarial) | Fast Secure",
  description: "Cumpra a Convenção Coletiva (CCT) e ofereça o melhor benefício para os colaboradores da sua empresa com o Seguro de Vida em Grupo.",
  path: "/seguro-vida-em-grupo",
});

export default function VidaEmGrupo() {
  const icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  );

  const benefits = [
    { title: "Cumprimento Sindical (CCT)", description: "Evite multas altíssimas e passivos trabalhistas cumprindo a exigência de seguro de vida do sindicato da sua categoria." },
    { title: "Baixo Custo por Vida", description: "O valor por funcionário é extremamente acessível (muitas vezes menos de R$ 10,00/mês), tornando-se um excelente benefício de RH." },
    { title: "Assistência Funeral Integrada", description: "Garante o reembolso ou prestação de serviços funerários para o colaborador e seus dependentes diretos." }
  ];

  const faqItems = [
    { question: "Sou obrigado a contratar Seguro de Vida em Grupo?", answer: "Depende do sindicato da sua categoria profissional. Se a Convenção Coletiva de Trabalho (CCT) exigir, passa a ser obrigatório." },
    { question: "O que acontece se um funcionário falecer e a empresa não tiver o seguro exigido na CCT?", answer: "A empresa será obrigada a indenizar a família do funcionário do próprio bolso, pagando o valor exato estipulado na convenção coletiva, o que pode quebrar o negócio." },
    { question: "Posso abater do Imposto de Renda?", answer: "Sim, empresas no regime de Lucro Real podem deduzir os prêmios do Seguro de Vida em Grupo como despesa operacional." }
  ];

  return (
    <main>
      <HeroSection 
        title="Proteção para Seu Time, Segurança Trabalhista para Você"
        subtitle="O Seguro de Vida em Grupo (Empresarial) protege a família dos seus colaboradores e livra a empresa de pesados passivos em caso de acidentes de trabalho ou fatalidades."
        bgClass="bg-light-success"
        btnClass="btn-success"
        linkColor="text-success"
        iconSvg={icon}
        imageUrl="/images/seguro_empresarial.png"
      />

      <BenefitsGrid title="Vantagens Estratégicas para o RH e Financeiro" benefits={benefits} />

      <FAQ items={faqItems} />

      <section id="cotacao" className="py-5">
        <div className="container py-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h2 className="fw-bold text-center mb-4">Cotação Vida em Grupo Empresarial</h2>
                  <p className="text-muted text-center mb-4">Informe o número de funcionários ou anexe sua CCT para uma cotação exata.</p>
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
