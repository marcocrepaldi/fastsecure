const fs = require('fs');
const path = require('path');

const pagesToCreate = [
  // Saúde Suplementar
  { route: 'plano-por-adesao', title: 'Plano de Saúde por Adesão', desc: 'Planos exclusivos para profissionais liberais, servidores públicos e estudantes associados a entidades de classe.', icon: 'bg-light-success', btn: 'btn-success', product: 'Plano por Adesão' },
  { route: 'plano-odontologico', title: 'Plano Odontológico', desc: 'Cuide do seu sorriso e da sua família com os melhores dentistas e clínicas do país.', icon: 'bg-light-success', btn: 'btn-success', product: 'Plano Odontológico' },

  // Seguros de Pessoas
  { route: 'seguro-acidentes-pessoais', title: 'Seguro de Acidentes Pessoais', desc: 'Proteção financeira garantida para você e sua família em caso de imprevistos e acidentes.', icon: 'bg-light-info', btn: 'btn-info', product: 'Seguro Acidentes Pessoais' },
  { route: 'seguro-prestamista', title: 'Seguro Prestamista', desc: 'Garanta a quitação de suas dívidas (financiamentos, empréstimos) em caso de imprevistos.', icon: 'bg-light-info', btn: 'btn-info', product: 'Seguro Prestamista' },
  { route: 'seguro-doencas-graves', title: 'Seguro Doenças Graves', desc: 'Amparo financeiro em vida para você focar no que importa: sua recuperação.', icon: 'bg-light-info', btn: 'btn-info', product: 'Seguro Doenças Graves' },
  { route: 'seguro-educacional', title: 'Seguro Educacional', desc: 'Garanta o futuro educacional dos seus filhos mesmo diante de imprevistos financeiros.', icon: 'bg-light-info', btn: 'btn-info', product: 'Seguro Educacional' },

  // Ramos Elementares
  { route: 'seguro-caminhoes', title: 'Seguro de Caminhões', desc: 'Proteção sob medida para caminhoneiros e transportadoras.', icon: 'bg-light-primary', btn: 'btn-primary', product: 'Seguro de Caminhões' },
  { route: 'seguro-motos', title: 'Seguro de Motos', desc: 'Sua moto protegida contra roubo, furto e colisões para você rodar com tranquilidade.', icon: 'bg-light-primary', btn: 'btn-primary', product: 'Seguro de Motos' },
  { route: 'seguro-condominio', title: 'Seguro Condomínio', desc: 'Proteção obrigatória e completa para o seu condomínio residencial ou comercial.', icon: 'bg-light-warning', btn: 'btn-warning', product: 'Seguro Condomínio' },
  { route: 'seguro-equipamentos-fotograficos', title: 'Seguro para Equipamentos Fotográficos', desc: 'Trabalhe sem medo. Proteção contra roubo e danos para câmeras e lentes.', icon: 'bg-light-primary', btn: 'btn-primary', product: 'Seguro Equipamentos Fotográficos' },
  { route: 'seguro-fianca', title: 'Seguro Fiança Locatícia', desc: 'Alugue sem fiador e sem burocracia. A garantia perfeita para inquilinos e proprietários.', icon: 'bg-light-primary', btn: 'btn-primary', product: 'Seguro Fiança Locatícia' },
  { route: 'seguro-garantia', title: 'Seguro Garantia', desc: 'Garantia de cumprimento de contratos públicos e privados com o melhor custo-benefício.', icon: 'bg-light-primary', btn: 'btn-primary', product: 'Seguro Garantia' },
  { route: 'seguro-transportes', title: 'Seguro de Transportes', desc: 'Proteja suas cargas durante todo o trajeto terrestre, aéreo ou marítimo.', icon: 'bg-light-primary', btn: 'btn-primary', product: 'Seguro de Transportes' },
  { route: 'seguro-agricola', title: 'Seguro Agrícola', desc: 'Proteja sua lavoura contra intempéries climáticas e garanta sua produtividade.', icon: 'bg-light-success', btn: 'btn-success', product: 'Seguro Agrícola' },
  { route: 'seguro-rc-do', title: 'Seguro RC D&O', desc: 'Proteção do patrimônio pessoal de diretores e executivos contra processos judiciais.', icon: 'bg-light-danger', btn: 'btn-danger', product: 'Seguro RC D&O' },
  { route: 'seguro-rc-geral', title: 'Seguro RC Geral', desc: 'Proteja sua empresa contra danos causados a terceiros nas suas operações.', icon: 'bg-light-danger', btn: 'btn-danger', product: 'Seguro RC Geral' },

  // Corporativos e Engenharia
  { route: 'seguro-instalacao-montagem', title: 'Seguro Instalação e Montagem', desc: 'Proteção contra riscos durante a montagem de máquinas e estruturas industriais.', icon: 'bg-light-warning', btn: 'btn-warning', product: 'Seguro Instalação e Montagem' },
  { route: 'seguro-maquinas-equipamentos', title: 'Seguro Máquinas e Equipamentos', desc: 'Proteja os equipamentos essenciais para a operação da sua indústria ou obra.', icon: 'bg-light-warning', btn: 'btn-warning', product: 'Seguro Máquinas e Equipamentos' },
  { route: 'seguro-rc-obras', title: 'Seguro RC Obras (Cruzado)', desc: 'Proteção contra danos a terceiros causados durante obras e reformas.', icon: 'bg-light-danger', btn: 'btn-danger', product: 'Seguro RC Obras' },
  { route: 'seguro-rc-eventos', title: 'Seguro RC Eventos', desc: 'Segurança obrigatória para organizadores, participantes e público do seu evento.', icon: 'bg-light-danger', btn: 'btn-danger', product: 'Seguro RC Eventos' },
  { route: 'seguro-sucessao-empresarial', title: 'Seguro Sucessão Empresarial', desc: 'Garanta a continuidade do seu negócio em caso de falta de um dos sócios.', icon: 'bg-light-dark', btn: 'btn-dark', product: 'Seguro Sucessão Empresarial' },
  { route: 'seguro-aeronautico', title: 'Seguro Aeronáutico e Drones', desc: 'Proteção obrigatória (RETA) e de Casco para aeronaves tripuladas e drones.', icon: 'bg-light-primary', btn: 'btn-primary', product: 'Seguro Aeronáutico e Drones' },
  { route: 'seguro-maritimo', title: 'Seguro Marítimo', desc: 'Proteção de cascos para embarcações de esporte, recreio e uso comercial.', icon: 'bg-light-primary', btn: 'btn-primary', product: 'Seguro Marítimo' },
  { route: 'seguro-garantia-judicial', title: 'Seguro Garantia Judicial', desc: 'Substitua depósitos judiciais e libere o fluxo de caixa da sua empresa.', icon: 'bg-light-primary', btn: 'btn-primary', product: 'Seguro Garantia Judicial' },

  // Previdência
  { route: 'previdencia-privada', title: 'Previdência Privada (PGBL e VGBL)', desc: 'Planeje seu futuro e garanta uma aposentadoria tranquila com benefícios fiscais.', icon: 'bg-light-warning', btn: 'btn-warning', product: 'Previdência Privada' },
  { route: 'capitalizacao', title: 'Títulos de Capitalização', desc: 'Economia programada com sorteios e opção de uso como garantia de aluguel.', icon: 'bg-light-warning', btn: 'btn-warning', product: 'Capitalização' },
];

const generatePageContent = (page) => {
  return `import ProductLandingPage from '@/components/ProductLandingPage';

export const metadata = {
  title: '${page.title} | Fast Secure',
  description: '${page.desc}',
};

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
      title="${page.title}"
      subtitle="${page.desc}"
      bgClass="${page.icon}"
      btnClass="${page.btn}"
      iconSvg={icon}
      benefits={benefits}
      faqItems={faqItems}
      productName="${page.product}"
    />
  );
}
`;
};

pagesToCreate.forEach(page => {
  const dirPath = path.join(__dirname, 'src', 'app', page.route);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const filePath = path.join(dirPath, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, generatePageContent(page), 'utf-8');
    console.log('Created:', page.route);
  } else {
    console.log('Skipped (already exists):', page.route);
  }
});
