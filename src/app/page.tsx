import Link from 'next/link';
import FAQ from '../components/FAQ';
import LeadFormB2B from '../components/LeadFormB2B';
import { buildMetadata } from '../lib/seo';

export const metadata = {
  ...buildMetadata({
    title: 'Corretora de Seguros e Benefícios para Empresas',
    description:
      'Consultoria independente em seguros corporativos, planos de saúde empresarial, seguro de vida, proteção patrimonial e investimentos. Reduza custos e mitigue riscos com a Fast Secure — habilitada SUSEP e ANS. +10.000 vidas protegidas.',
    path: '/',
  }),
  // O template do layout não se aplica ao segmento raiz; marca explícita no título.
  title: 'Fast Secure | Corretora de Seguros e Benefícios para Empresas',
};

const faqItems = [
  {
    question: 'A Fast Secure trabalha com qual porte de empresa?',
    answer: 'Atendemos de pequenas e médias empresas a grandes operações com milhares de colaboradores. A consultoria é dimensionada de acordo com o porte, o segmento e o perfil de risco do seu negócio.',
  },
  {
    question: 'Como funciona a gestão de sinistros para empresas?',
    answer: 'Você tem um consultor dedicado que acompanha cada sinistro de ponta a ponta — abertura, documentação e negociação com a seguradora — para reduzir o tempo de resposta e o impacto na operação.',
  },
  {
    question: 'Vocês ajudam a reduzir o custo total dos seguros e benefícios?',
    answer: 'Sim. Por sermos uma corretora independente, cotamos entre as principais seguradoras do mercado e estruturamos o programa de risco para equilibrar cobertura e custo, eliminando sobreposições e lacunas.',
  },
  {
    question: 'A Fast Secure é registrada na SUSEP?',
    answer: 'Sim. Atuamos como corretora devidamente habilitada e seguimos as normas da SUSEP e da ANS, garantindo conformidade em todas as apólices intermediadas.',
  },
  {
    question: 'Em quanto tempo recebo uma proposta?',
    answer: 'Após o diagnóstico inicial, apresentamos um plano de cobertura e cotações comparativas em poucos dias úteis, dependendo da complexidade do programa.',
  },
];

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero-modern">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-reveal>
              <span className="badge-soft mb-4">
                <span className="dot" />
                Corretora corporativa · Multi-produto
              </span>
              <h1 className="display-hero text-dark mb-4">
                Gestão de risco e benefícios que{' '}
                <span className="text-gradient">protegem o seu negócio</span>
              </h1>
              <p className="hero-subtitle fs-5 text-muted mb-4">
                Consultoria independente em seguros corporativos, benefícios para colaboradores e proteção patrimonial. Estruturamos um programa sob medida para reduzir custos, mitigar riscos e dar previsibilidade à sua operação.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                <a href="#cotacao" className="btn btn-primary btn-lg px-4 py-2 hero-btn-primary">Falar com um especialista</a>
                <a href="#solucoes" className="btn btn-outline-secondary btn-lg px-4 py-2 bg-white">Ver soluções corporativas</a>
              </div>
              <div className="d-flex flex-wrap gap-4 mt-4 pt-2">
                <span className="hero-chip"><strong>+10.000</strong> vidas protegidas</span>
                <span className="hero-chip"><strong>15</strong> seguradoras parceiras</span>
                <span className="hero-chip"><strong>SUSEP</strong> &amp; ANS habilitada</span>
              </div>
            </div>
            <div className="col-lg-6" data-reveal style={{ ['--reveal-delay' as string]: 2 }}>
              <div className="hero-visual">
                <img src="/images/seguro_empresarial.png" alt="Proteção empresarial Fast Secure" className="img-fluid shadow-lg w-100" style={{ objectFit: 'cover', maxHeight: '460px' }} />
                <div className="hero-floating-card shadow-lg">
                  <div className="d-flex align-items-center gap-3">
                    <div className="feature-icon bg-light-success mb-0" style={{ width: 48, height: 48, fontSize: '1.2rem' }}>✓</div>
                    <div>
                      <div className="fw-bold text-dark">Conta dedicada</div>
                      <small className="text-muted">Consultor exclusivo do diagnóstico ao sinistro</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / MÉTRICAS (count-up) */}
      <section className="trust-strip py-5">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-6 col-md-3" data-reveal>
              <div className="metric-number text-primary" data-count="10000" data-prefix="+">+0</div>
              <div className="trust-label text-muted mt-1">Vidas e bens protegidos</div>
            </div>
            <div className="col-6 col-md-3" data-reveal style={{ ['--reveal-delay' as string]: 1 }}>
              <div className="metric-number text-primary" data-count="15">0</div>
              <div className="trust-label text-muted mt-1">Seguradoras parceiras</div>
            </div>
            <div className="col-6 col-md-3" data-reveal style={{ ['--reveal-delay' as string]: 2 }}>
              <div className="metric-number text-primary" data-count="30" data-prefix="+">+0</div>
              <div className="trust-label text-muted mt-1">Soluções de seguro e benefícios</div>
            </div>
            <div className="col-6 col-md-3" data-reveal style={{ ['--reveal-delay' as string]: 3 }}>
              <div className="metric-number text-primary" data-count="98" data-suffix="%">0%</div>
              <div className="trust-label text-muted mt-1">Índice de renovação de carteira</div>
            </div>
          </div>
        </div>
      </section>

      {/* PILARES CORPORATIVOS — Bento grid */}
      <section id="solucoes" className="py-5 has-glow">
        <div className="container py-4">
          <div className="text-center mb-5" data-reveal>
            <span className="badge-soft mb-3"><span className="dot" />Soluções corporativas</span>
            <h2 className="section-title">Um programa de proteção completo para a sua empresa</h2>
            <p className="text-muted mx-auto mt-3" style={{ maxWidth: 680 }}>
              Organizamos toda a estratégia de risco e benefícios em quatro frentes integradas — pensadas para RH, financeiro e diretoria.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3" data-reveal>
              <div className="bento-card">
                <div className="feature-icon bg-light-primary">👥</div>
                <h5 className="fw-bold text-dark">Benefícios para colaboradores</h5>
                <p className="text-muted small">Saúde, odonto, vida em grupo e previdência empresarial para atrair e reter talentos.</p>
                <ul className="pillar-list">
                  <li><Link href="/plano-de-saude-empresarial">Plano de Saúde Empresarial</Link></li>
                  <li><Link href="/seguro-vida-em-grupo">Seguro de Vida em Grupo</Link></li>
                  <li><Link href="/plano-odontologico">Plano Odontológico</Link></li>
                  <li><Link href="/previdencia-privada">Previdência Privada</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-3" data-reveal style={{ ['--reveal-delay' as string]: 1 }}>
              <div className="bento-card">
                <div className="feature-icon bg-light-success">🏭</div>
                <h5 className="fw-bold text-dark">Patrimônio &amp; operação</h5>
                <p className="text-muted small">Proteção de ativos, frota e cadeia logística para manter o negócio rodando.</p>
                <ul className="pillar-list">
                  <li><Link href="/seguro-empresarial">Seguro Empresarial</Link></li>
                  <li><Link href="/seguro-frota">Seguro de Frota</Link></li>
                  <li><Link href="/seguro-transportes">Transportes &amp; Logística</Link></li>
                  <li><Link href="/seguro-riscos-engenharia">Riscos de Engenharia</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-3" data-reveal style={{ ['--reveal-delay' as string]: 2 }}>
              <div className="bento-card">
                <div className="feature-icon bg-light-warning">🛡️</div>
                <h5 className="fw-bold text-dark">Responsabilidade &amp; compliance</h5>
                <p className="text-muted small">Cobertura de responsabilidades e exigências contratuais e regulatórias.</p>
                <ul className="pillar-list">
                  <li><Link href="/seguro-rc-profissional">RC Profissional</Link></li>
                  <li><Link href="/seguro-riscos-ciberneticos">Seguro Cyber</Link></li>
                  <li><Link href="/seguro-rc-ambiental">RC Ambiental</Link></li>
                  <li><Link href="/seguro-garantia">Seguro Garantia</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-3" data-reveal style={{ ['--reveal-delay' as string]: 3 }}>
              <div className="bento-card">
                <div className="feature-icon bg-light-info">📈</div>
                <h5 className="fw-bold text-dark">Sucessão &amp; gestão patrimonial</h5>
                <p className="text-muted small">Planejamento sucessório e financeiro para sócios e gestores.</p>
                <ul className="pillar-list">
                  <li><Link href="/seguro-sucessao-empresarial">Sucessão Empresarial</Link></li>
                  <li><Link href="/investimentos">Investimentos</Link></li>
                  <li><Link href="/consorcios">Consórcios</Link></li>
                  <li><Link href="/capitalizacao">Capitalização</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATÁLOGO COMPLETO */}
      <section id="produtos" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5" data-reveal>
            <span className="badge-soft mb-3"><span className="dot" />Catálogo completo</span>
            <h2 className="section-title">Mais de 30 produtos, uma só corretora</h2>
            <p className="text-muted mt-3">Da pessoa física à grande operação corporativa</p>
          </div>

          <ul className="nav nav-pills justify-content-center mb-5 flex-column flex-md-row gap-2" id="products-tab" role="tablist" data-reveal>
            <li className="nav-item" role="presentation">
              <button className="nav-link active rounded-pill px-4" id="empresas-tab" data-bs-toggle="pill" data-bs-target="#empresas-pane" type="button" role="tab" aria-controls="empresas-pane" aria-selected="true">Corporativo (B2B)</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link rounded-pill px-4" id="saude-tab" data-bs-toggle="pill" data-bs-target="#saude" type="button" role="tab" aria-controls="saude" aria-selected="false">Saúde e Odonto</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link rounded-pill px-4" id="pessoas-tab" data-bs-toggle="pill" data-bs-target="#pessoas" type="button" role="tab" aria-controls="pessoas" aria-selected="false">Seguro de Vida</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link rounded-pill px-4" id="bens-tab" data-bs-toggle="pill" data-bs-target="#bens" type="button" role="tab" aria-controls="bens" aria-selected="false">Bens e Patrimônio</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link rounded-pill px-4" id="prev-tab" data-bs-toggle="pill" data-bs-target="#previdencia" type="button" role="tab" aria-controls="previdencia" aria-selected="false">Investimentos</button>
            </li>
          </ul>

          <div className="tab-content" id="products-tabContent" data-reveal>
            {/* CORPORATIVO (B2B) */}
            <div className="tab-pane fade show active" id="empresas-pane" role="tabpanel" aria-labelledby="empresas-tab">
              <div className="row g-4">
                <div className="col-md-4 col-lg-3"><Link href="/seguro-empresarial" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Empresarial &amp; Frota</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-riscos-engenharia" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Riscos Engenharia</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-rc-ambiental" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">RC Ambiental</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-riscos-ciberneticos" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Seguro Cyber</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-vida-em-grupo" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Vida em Grupo</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-sucessao-empresarial" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Sucessão Empresarial</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-garantia" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Seguro Garantia</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-transportes" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Transportes &amp; Logística</h5></div></Link></div>
              </div>
            </div>

            {/* SAÚDE E ODONTO */}
            <div className="tab-pane fade" id="saude" role="tabpanel" aria-labelledby="saude-tab">
              <div className="row g-4">
                <div className="col-md-4 col-lg-3"><Link href="/plano-de-saude-empresarial" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Plano Empresarial</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/plano-por-adesao" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Plano por Adesão</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/plano-de-saude" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Plano Individual/Familiar</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/plano-odontologico" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Plano Odontológico</h5></div></Link></div>
              </div>
            </div>

            {/* SEGUROS DE PESSOAS */}
            <div className="tab-pane fade" id="pessoas" role="tabpanel" aria-labelledby="pessoas-tab">
              <div className="row g-4">
                <div className="col-md-4 col-lg-3"><Link href="/seguro-de-vida" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Seguro de Vida</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-acidentes-pessoais" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Acidentes Pessoais</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-prestamista" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Seguro Prestamista</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-viagem" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Seguro Viagem</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-doencas-graves" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Doenças Graves</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-educacional" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Seguro Educacional</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-dit" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Diária Incapacidade (DIT)</h5></div></Link></div>
              </div>
            </div>

            {/* BENS E PATRIMÔNIO */}
            <div className="tab-pane fade" id="bens" role="tabpanel" aria-labelledby="bens-tab">
              <div className="row g-4">
                <div className="col-md-4 col-lg-3"><Link href="/seguro-auto" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Seguro Auto</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-motos" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Seguro de Motos</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-residencial" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Seguro Residencial</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-celular-notebook" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Celular &amp; Notebook</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-condominio" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Seguro Condomínio</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-equipamentos-fotograficos" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Equip. Fotográficos</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-fianca" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Fiança Locatícia</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-rc-profissional" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">RC Profissional</h5></div></Link></div>
              </div>
            </div>

            {/* INVESTIMENTOS E CONSÓRCIOS */}
            <div className="tab-pane fade" id="previdencia" role="tabpanel" aria-labelledby="prev-tab">
              <div className="row g-4 justify-content-center">
                <div className="col-md-4 col-lg-3"><Link href="/previdencia-privada" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Previdência Privada</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/consorcios" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Consórcios</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/investimentos" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Investimentos Diversos</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/capitalizacao" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Capitalização</h5></div></Link></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="py-5 bg-white" id="sobre">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-reveal>
              <span className="badge-soft mb-3"><span className="dot" />Por que a Fast Secure</span>
              <h2 className="section-title mb-4">Uma corretora que pensa como parceira estratégica</h2>
              <p className="text-muted mb-4">
                Não vendemos apólices avulsas: desenhamos um programa de proteção alinhado aos objetivos da sua empresa. Nossa independência nos permite negociar as melhores condições entre todas as principais seguradoras.
              </p>

              <div className="differentiator">
                <div className="differentiator-icon bg-light-primary">🎯</div>
                <div>
                  <h6 className="fw-bold text-dark mb-1">Consultoria de risco independente</h6>
                  <p className="text-muted small mb-0">Mapeamos exposições, eliminamos lacunas e sobreposições de cobertura.</p>
                </div>
              </div>
              <div className="differentiator">
                <div className="differentiator-icon bg-light-success">🤝</div>
                <div>
                  <h6 className="fw-bold text-dark mb-1">Conta dedicada</h6>
                  <p className="text-muted small mb-0">Um consultor exclusivo acompanha sua empresa do contrato à renovação.</p>
                </div>
              </div>
              <div className="differentiator">
                <div className="differentiator-icon bg-light-warning">⚡</div>
                <div>
                  <h6 className="fw-bold text-dark mb-1">Gestão de sinistros ativa</h6>
                  <p className="text-muted small mb-0">Cuidamos de toda a tramitação para acelerar a indenização e reduzir o impacto.</p>
                </div>
              </div>
              <div className="differentiator">
                <div className="differentiator-icon bg-light-info">📊</div>
                <div>
                  <h6 className="fw-bold text-dark mb-1">Otimização de custos</h6>
                  <p className="text-muted small mb-0">Comparamos o mercado e estruturamos o programa para o melhor custo-benefício.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1" data-reveal style={{ ['--reveal-delay' as string]: 1 }}>
              <div className="card border-0 testimonial-card">
                <div className="card-body p-5">
                  <div className="quote-mark text-primary">&ldquo;</div>
                  <p className="fs-5 fw-medium text-dark mb-4">
                    A Fast Secure reorganizou todo o nosso programa de benefícios e seguros patrimoniais. Reduzimos custos e ganhamos um parceiro que resolve os sinistros por nós.
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="testimonial-avatar">RM</div>
                    <div className="ms-3">
                      <div className="fw-bold text-dark">Diretoria de RH</div>
                      <small className="text-muted">Indústria · 320 colaboradores</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-5 bg-light" id="processo">
        <div className="container py-4">
          <div className="text-center mb-5" data-reveal>
            <span className="badge-soft mb-3"><span className="dot" />Como funciona</span>
            <h2 className="section-title">Da análise à proteção em 4 passos</h2>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3" data-reveal>
              <div className="step-card">
                <div className="step-number">1</div>
                <h6 className="fw-bold text-dark">Diagnóstico</h6>
                <p className="text-muted small mb-0">Entendemos seu negócio, riscos e benefícios atuais.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3" data-reveal style={{ ['--reveal-delay' as string]: 1 }}>
              <div className="step-card">
                <div className="step-number">2</div>
                <h6 className="fw-bold text-dark">Cotação comparativa</h6>
                <p className="text-muted small mb-0">Negociamos condições entre as principais seguradoras.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3" data-reveal style={{ ['--reveal-delay' as string]: 2 }}>
              <div className="step-card">
                <div className="step-number">3</div>
                <h6 className="fw-bold text-dark">Implantação</h6>
                <p className="text-muted small mb-0">Estruturamos as apólices e fazemos o onboarding da equipe.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3" data-reveal style={{ ['--reveal-delay' as string]: 3 }}>
              <div className="step-card">
                <div className="step-number">4</div>
                <h6 className="fw-bold text-dark">Acompanhamento</h6>
                <p className="text-muted small mb-0">Gestão contínua, sinistros e renovação otimizada.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ items={faqItems} title="Perguntas frequentes de empresas" />

      {/* CTA / FORMULÁRIO — seção navy de destaque */}
      <section id="cotacao" className="py-5">
        <div className="container py-4">
          <div className="section-dark" data-reveal>
            <div className="p-4 p-md-5">
              <div className="row align-items-center g-5">
                <div className="col-lg-5">
                  <span className="badge-soft mb-3"><span className="dot" />Diagnóstico gratuito</span>
                  <h2 className="section-title mb-3">Receba uma análise de risco sem compromisso</h2>
                  <p className="text-muted mb-4">Um especialista entra em contato para entender sua empresa e apresentar um programa de proteção sob medida.</p>
                  <ul className="cta-list text-muted">
                    <li>Resposta em até 1 dia útil</li>
                    <li>Cotação comparativa entre seguradoras</li>
                    <li>Sem custo e sem compromisso</li>
                  </ul>
                </div>
                <div className="col-lg-7">
                  <LeadFormB2B />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
