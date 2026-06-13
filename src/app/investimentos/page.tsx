import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import ProductSchema from '@/components/ProductSchema';

export const metadata = buildMetadata({
  title: "Investimentos - Rentabilidade e Segurança | Fast Secure",
  description: "Diversifique sua carteira com as melhores opções de renda fixa e variável. Consultoria especializada em investimentos na Fast Secure.",
  path: "/investimentos",
});

export default function Investimentos() {
  return (
    <main>
      <ProductSchema name="Investimentos" description="Diversifique sua carteira com renda fixa e variável e consultoria especializada da Fast Secure." />
      <section className="bg-light-warning py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link href="/" className="text-decoration-none text-warning" style={{color: '#e8a900'}}>Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Investimentos</li>
                </ol>
              </nav>
              <h1 className="fw-bold mb-4">Multiplique Seu Patrimônio com Segurança</h1>
              <p className="text-muted fs-5 mb-4">
                Temos as melhores opções do mercado para você diversificar seus investimentos, desde Renda Fixa (CDB, LCI, LCA, Tesouro) até Fundos Imobiliários e Ações.
              </p>
              <a href="/#cotacao" className="btn btn-warning btn-lg px-4 text-white" style={{ backgroundColor: '#e8a900', borderColor: '#e8a900' }}>Falar com Especialista</a>
            </div>
            <div className="col-lg-5 offset-lg-1 mt-5 mt-lg-0 text-center">
              <div className="feature-icon text-white" style={{backgroundColor: '#e8a900', width: '120px', height: '120px', borderRadius: '24px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-white">
        <div className="container py-4">
          <h2 className="fw-bold text-center mb-5">Opções para todos os perfis</h2>
          <div className="row g-4 justify-content-center">
            <div className="col-md-5">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-3" style={{color: '#e8a900'}}>Renda Fixa</h4>
                  <ul className="text-muted mb-0 list-unstyled">
                    <li className="mb-2">✓ CDB e LC</li>
                    <li className="mb-2">✓ LCI e LCA (Isentos de IR)</li>
                    <li className="mb-2">✓ Tesouro Direto</li>
                    <li>✓ Debêntures</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-3" style={{color: '#e8a900'}}>Renda Variável e Fundos</h4>
                  <ul className="text-muted mb-0 list-unstyled">
                    <li className="mb-2">✓ Fundos de Investimentos</li>
                    <li className="mb-2">✓ Fundos Imobiliários (FIIs)</li>
                    <li className="mb-2">✓ Mercado de Ações</li>
                    <li>✓ Previdência Privada</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
