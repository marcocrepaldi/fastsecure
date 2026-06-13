import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import ProductSchema from '@/components/ProductSchema';

export const metadata = buildMetadata({
  title: "Consórcios de Imóveis e Veículos | Fast Secure",
  description: "Conquiste seu imóvel ou veículo sem pagar juros com os consórcios da Fast Secure. Planejamento inteligente e taxas atrativas.",
  path: "/consorcios",
});

export default function Consorcios() {
  return (
    <main>
      <ProductSchema name="Consórcios de Imóveis e Veículos" description="Conquiste seu imóvel ou veículo sem pagar juros com os consórcios da Fast Secure." />
      <section className="bg-light-info py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link href="/" className="text-decoration-none text-info" style={{color: '#00c0ef'}}>Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Consórcios</li>
                </ol>
              </nav>
              <h1 className="fw-bold mb-4">Planeje o Seu Futuro Sem Pagar Juros</h1>
              <p className="text-muted fs-5 mb-4">
                O consórcio é a maneira mais inteligente e econômica de planejar a compra da sua casa própria, terreno, veículo ou até mesmo investir. 
              </p>
              <a href="/#cotacao" className="btn btn-info btn-lg px-4 text-white" style={{ backgroundColor: '#00c0ef', borderColor: '#00c0ef' }}>Fazer Simulação</a>
            </div>
            <div className="col-lg-5 offset-lg-1 mt-5 mt-lg-0 text-center">
              <div className="feature-icon text-white" style={{backgroundColor: '#00c0ef', width: '120px', height: '120px', borderRadius: '24px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-white">
        <div className="container py-4">
          <h2 className="fw-bold text-center mb-5">O que você deseja conquistar hoje?</h2>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-5">
                  <h4 className="fw-bold mb-4" style={{color: '#00c0ef'}}>Imóveis</h4>
                  <p className="text-muted">
                    Ideal para compra de casas, apartamentos (na planta ou prontos), terrenos, chácaras e imóveis comerciais. Você pode utilizar seu FGTS como lance para acelerar a contemplação!
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-5">
                  <h4 className="fw-bold mb-4" style={{color: '#00c0ef'}}>Veículos e Pesados</h4>
                  <p className="text-muted">
                    Troque de carro de forma planejada. Consórcios para carros zero km ou seminovos, motos, utilitários, caminhões e máquinas agrícolas. Parcelas que cabem no seu orçamento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
