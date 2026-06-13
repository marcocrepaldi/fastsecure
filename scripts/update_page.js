const fs = require('fs');
const path = require('path');

const pagePath = path.join(process.cwd(), 'src', 'app', 'page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

const newSections = `
      <section id="produtos" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Nossas Soluções</h2>
            <p className="text-muted">Encontre o produto ideal para você ou sua empresa</p>
          </div>

          <ul className="nav nav-pills justify-content-center mb-5 flex-column flex-md-row gap-2" id="products-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active rounded-pill px-4" id="saude-tab" data-bs-toggle="pill" data-bs-target="#saude" type="button" role="tab" aria-controls="saude" aria-selected="true">Saúde e Odonto</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link rounded-pill px-4" id="pessoas-tab" data-bs-toggle="pill" data-bs-target="#pessoas" type="button" role="tab" aria-controls="pessoas" aria-selected="false">Seguro de Vida</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link rounded-pill px-4" id="bens-tab" data-bs-toggle="pill" data-bs-target="#bens" type="button" role="tab" aria-controls="bens" aria-selected="false">Bens e Patrimônio</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link rounded-pill px-4" id="empresas-tab" data-bs-toggle="pill" data-bs-target="#empresas-pane" type="button" role="tab" aria-controls="empresas-pane" aria-selected="false">Corporativo (B2B)</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link rounded-pill px-4" id="prev-tab" data-bs-toggle="pill" data-bs-target="#previdencia" type="button" role="tab" aria-controls="previdencia" aria-selected="false">Investimentos</button>
            </li>
          </ul>

          <div className="tab-content" id="products-tabContent">
            {/* SAÚDE E ODONTO */}
            <div className="tab-pane fade show active" id="saude" role="tabpanel" aria-labelledby="saude-tab">
              <div className="row g-4">
                <div className="col-md-4 col-lg-3"><Link href="/plano-de-saude" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Plano Individual/Familiar</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/plano-de-saude-empresarial" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Plano Empresarial</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/plano-por-adesao" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Plano por Adesão</h5></div></Link></div>
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
                <div className="col-md-4 col-lg-3"><Link href="/seguro-celular-notebook" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Celular & Notebook</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-condominio" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Seguro Condomínio</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-equipamentos-fotograficos" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Equip. Fotográficos</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-fianca" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Fiança Locatícia</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-rc-profissional" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">RC Profissional</h5></div></Link></div>
              </div>
            </div>

            {/* CORPORATIVO (B2B) */}
            <div className="tab-pane fade" id="empresas-pane" role="tabpanel" aria-labelledby="empresas-tab">
              <div className="row g-4">
                <div className="col-md-4 col-lg-3"><Link href="/seguro-empresarial" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Empresarial & Frota</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-riscos-engenharia" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Riscos Engenharia</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-rc-ambiental" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">RC Ambiental</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-riscos-ciberneticos" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Seguro Cyber</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-vida-em-grupo" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Vida em Grupo</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-sucessao-empresarial" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Sucessão Empresarial</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-garantia" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Seguro Garantia</h5></div></Link></div>
                <div className="col-md-4 col-lg-3"><Link href="/seguro-transportes" className="card h-100 border-0 text-decoration-none shadow-sm card-hover"><div className="card-body text-center"><h5 className="fw-bold text-dark mt-2">Transportes & Logística</h5></div></Link></div>
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
`;

const lines = content.split('\\n');
const startIdx = lines.findIndex(line => line.includes('<section id="produtos"'));
const endIdx = lines.findIndex(line => line.includes('id="sobre"')) - 2; // getting the previous section end

if (startIdx !== -1 && endIdx !== -1) {
  const newLines = [
    ...lines.slice(0, startIdx),
    newSections.trim(),
    ...lines.slice(endIdx)
  ];
  fs.writeFileSync(pagePath, newLines.join('\\n'), 'utf8');
  console.log('Successfully updated page.tsx');
} else {
  console.log('Could not find start/end indices');
}
