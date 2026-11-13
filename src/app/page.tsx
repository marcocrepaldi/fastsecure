import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BadgeCheck, Building2, Check, Handshake, Scale, Zap } from 'lucide-react';
import BranchSlider from '@/components/BranchSlider';
import Icon from '@/components/Icon';
import JsonLd from '@/components/JsonLd';
import QuoteForm, { type ProductOptionGroup } from '@/components/QuoteForm';
import { FaqList, SectionHeading } from '@/components/ui';
import { categories, popularProducts, products, productsIn } from '@/lib/products';
import { buildMetadata, faqLd } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { getSlides } from '@/lib/slides';

export const metadata = {
  ...buildMetadata({
    title: 'Corretora de Seguros',
    description:
      'Cote seguro auto, plano de saúde, seguro de vida, residencial, empresarial, garantias e consórcios em um só lugar. Comparamos as principais seguradoras para você.',
    path: '/',
  }),
  // O template do layout não vale para a raiz: título completo aqui.
  title: { absolute: 'Fast Secure | Corretora de Seguros — cotação rápida e comparada' },
};

const productOptions: ProductOptionGroup[] = categories.map((c) => ({
  group: c.name,
  items: productsIn(c.id).map((p) => ({ slug: p.slug, name: p.name })),
}));

const b2bOptions: ProductOptionGroup[] = categories
  .map((c) => ({
    group: c.name,
    items: productsIn(c.id)
      .filter((p) => p.audience !== 'pf')
      .map((p) => ({ slug: p.slug, name: p.name })),
  }))
  .filter((g) => g.items.length > 0);

const faq = [
  { q: 'A cotação tem custo?', a: 'Não. A cotação e a consultoria são gratuitas. A corretora é remunerada pela seguradora quando você contrata.' },
  { q: 'Com quantas seguradoras vocês trabalham?', a: `Com ${SITE.stats.insurers}+ seguradoras e operadoras, o que nos permite comparar preço e cobertura para o seu perfil.` },
  { q: 'Em quanto tempo recebo as opções?', a: 'Para seguros pessoais simples, normalmente no mesmo dia útil. Seguros empresariais dependem da análise de risco e levam alguns dias.' },
  { q: 'Pagar por uma corretora sai mais caro?', a: 'Não. O preço do seguro é o mesmo, e a corretora ainda negocia condições e defende você em caso de sinistro.' },
  { q: 'Vocês ajudam na hora do sinistro?', a: 'Sim. Orientamos a abertura, a documentação e acompanhamos o processo junto à seguradora até a indenização.' },
];

const b2bPoints = [
  'Diagnóstico de riscos e benefícios sem custo',
  'Apólices de várias seguradoras em uma gestão só',
  'Consultor dedicado para sinistros e renovações',
  'Relatórios para RH, financeiro e diretoria',
];

const reasons = [
  { icon: Zap, title: 'Rápido de verdade', text: 'Formulário de um minuto e resposta pelo WhatsApp. Sem ligação de telemarketing.' },
  { icon: Scale, title: 'Comparação honesta', text: 'Mostramos as opções lado a lado, inclusive o que cada uma não cobre.' },
  { icon: Handshake, title: 'Do seu lado no sinistro', text: 'Quando você precisa, quem cuida do processo é a gente.' },
  { icon: BadgeCheck, title: 'Tudo regulado', text: 'Trabalhamos só com seguradoras e operadoras autorizadas pela SUSEP e pela ANS.' },
];

export default function Home() {
  const marquee = products.map((p) => p.name);

  return (
    <main>
      <JsonLd data={faqLd(faq)} />

      {/* HERO */}
      <section className="mesh grain relative overflow-hidden pt-28 pb-20 text-white lg:pt-40 lg:pb-28">
        <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
          <div>
            <span className="chip bg-white/10 text-white ring-1 ring-white/15">
              <span className="size-2 animate-pulse rounded-full bg-volt-500" aria-hidden="true" />
              {products.length} soluções · {SITE.stats.insurers}+ seguradoras
            </span>
            <h1 className="display mt-6 text-5xl text-balance sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              Seguro bom é <span className="text-shine">seguro comparado.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl">
              Do carro ao plano de saúde da empresa: você conta o que precisa, a gente compara o mercado e devolve as
              melhores opções no seu WhatsApp.
            </p>
            <div className="mt-10">
              <p className="text-sm font-semibold text-white/50">Mais procurados</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {popularProducts.slice(0, 8).map((p) => (
                  <Link
                    key={p.slug}
                    href={`/${p.slug}`}
                    className="chip bg-white/5 text-white/85 ring-1 ring-white/10 transition hover:bg-white hover:text-ink-900"
                  >
                    <Icon name={p.icon} className="size-4" />
                    {p.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div id="cotacao" className="scroll-mt-28">
            <QuoteForm productOptions={productOptions} source="home-hero" title="O que vamos proteger?" />
          </div>
        </div>
      </section>

      {/* SLIDES DOS PRINCIPAIS RAMOS */}
      <BranchSlider slides={getSlides()} />

      {/* FAIXA */}
      <div className="overflow-hidden border-y border-white/5 bg-ink-950 py-5" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[...marquee, ...marquee].map((name, i) => (
            <span key={i} className="display flex items-center gap-10 text-2xl text-white/25">
              {name}
              <span className="size-2 rounded-full bg-volt-500/60" />
            </span>
          ))}
        </div>
      </div>

      {/* NÚMEROS */}
      <section className="border-b border-ink-100 py-14">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 text-center sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            [`${SITE.stats.insurers}+`, 'seguradoras e operadoras'],
            [String(products.length), 'produtos para pessoas e empresas'],
            [`+${(SITE.stats.lives / 1000).toLocaleString('pt-BR')} mil`, 'vidas e bens protegidos'],
            ['1 min', 'para pedir sua cotação'],
          ].map(([n, label], i) => (
            <div key={label} data-reveal style={{ ['--d' as string]: i }}>
              <dt className="sr-only">{label}</dt>
              <dd className="display text-4xl text-ink-900 sm:text-5xl">{n}</dd>
              <dd className="mt-2 text-sm text-ink-500">{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* CATEGORIAS — bento */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Uma corretora, todos os seguros"
              title="Tudo o que você e sua empresa precisam proteger"
            />
            <Link href="/produtos" className="btn btn-ghost self-start lg:self-auto" data-reveal>
              Ver catálogo completo <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((c, i) => {
              const items = productsIn(c.id);
              const featured = i < 2;
              return (
                <article
                  key={c.id}
                  data-reveal
                  style={{ ['--d' as string]: i % 4 }}
                  className={`group relative flex flex-col overflow-hidden rounded-4xl p-7 ${
                    featured ? 'mesh grain text-white lg:col-span-2' : 'border border-ink-100 bg-ink-50'
                  }`}
                >
                  <span
                    className={`grid size-12 place-items-center rounded-2xl ${
                      featured ? 'bg-volt-500 text-ink-900' : 'bg-white text-brand-600 shadow-soft'
                    }`}
                  >
                    <Icon name={c.icon} className="size-6" />
                  </span>
                  <h3 className="display mt-6 text-2xl">{c.name}</h3>
                  <p className={`mt-1 text-sm ${featured ? 'text-white/60' : 'text-ink-500'}`}>{c.tagline}</p>
                  <ul className={`mt-6 flex flex-wrap gap-2 ${featured ? '' : 'flex-col gap-1.5'}`}>
                    {items.slice(0, featured ? 8 : 5).map((p) =>
                      featured ? (
                        <li key={p.slug}>
                          <Link
                            href={`/${p.slug}`}
                            className="chip bg-white/10 text-white/85 ring-1 ring-white/10 transition hover:bg-white hover:text-ink-900"
                          >
                            {p.name}
                          </Link>
                        </li>
                      ) : (
                        <li key={p.slug}>
                          <Link href={`/${p.slug}`} className="text-sm font-medium text-ink-700 hover:text-brand-600">
                            {p.name}
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                  <Link
                    href={`/produtos#${c.id}`}
                    className={`mt-auto flex items-center gap-1.5 pt-6 text-sm font-bold ${featured ? 'text-volt-500' : 'text-brand-600'}`}
                  >
                    {items.length} produtos <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
            <Link
              href="/produtos"
              data-reveal
              className="group flex flex-col justify-between gap-8 rounded-4xl bg-brand-500 p-7 text-white transition hover:bg-brand-600 md:col-span-1 lg:col-span-3 lg:flex-row lg:items-end lg:p-10"
            >
              <span className="display max-w-md text-3xl lg:text-4xl">Não achou o que procura? Temos {products.length} produtos.</span>
              <span className="flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-ink-900">
                Ver catálogo completo
                <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="scroll-mt-20 bg-ink-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center eyebrow="Como funciona" title="Da dúvida à apólice em três passos" />
          <ol className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              ['Conte o que precisa', 'Escolha o produto e responda uma pergunta rápida. Leva menos de um minuto.'],
              ['A gente compara', `Cotamos com ${SITE.stats.insurers}+ seguradoras e separamos as opções que fazem sentido para você.`],
              ['Você decide', 'Recebe tudo no WhatsApp, tira dúvidas com um especialista e contrata sem burocracia.'],
            ].map(([t, d], i) => (
              <li key={t} data-reveal style={{ ['--d' as string]: i }} className="relative rounded-4xl bg-white p-8 shadow-soft">
                <span className="display text-7xl text-brand-500/15">0{i + 1}</span>
                <h3 className="mt-2 text-xl font-bold">{t}</h3>
                <p className="mt-2 leading-relaxed text-ink-500">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* EMPRESAS */}
      <section id="empresas" className="scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mesh grain relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] px-6 py-14 text-white sm:px-12 lg:py-20">
          <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <span className="chip bg-white/10 ring-1 ring-white/15">
                <Building2 className="size-4 text-volt-500" aria-hidden="true" /> Para empresas
              </span>
              <h2 className="display mt-5 text-4xl sm:text-5xl">Risco e benefícios da sua empresa em uma gestão só</h2>
              <p className="mt-5 text-lg text-white/70">
                Plano de saúde, vida em grupo, frota, patrimonial, D&amp;O, cyber, garantias e SST. Desenhamos o programa,
                negociamos com o mercado e cuidamos do dia a dia.
              </p>
              <ul className="mt-8 space-y-3">
                {b2bPoints.map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="grid size-6 place-items-center rounded-full bg-volt-500 text-ink-900">
                      <Check className="size-4" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <QuoteForm
              productOptions={b2bOptions}
              source="home-b2b"
              b2b
              title="Diagnóstico para empresas"
              subtitle="Escolha a principal necessidade. Um especialista corporativo fala com você."
            />
          </div>
        </div>
      </section>

      {/* POR QUE */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Por que a Fast Secure" title="Seguro sem letra miúda escondida" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <div key={r.title} data-reveal style={{ ['--d' as string]: i }} className="rounded-3xl border border-ink-100 p-7">
                <r.icon className="size-7 text-brand-500" strokeWidth={1.75} aria-hidden="true" />
                <h3 className="mt-5 text-lg font-bold">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="duvidas" className="scroll-mt-20 bg-ink-50 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:px-8">
          <SectionHeading eyebrow="Dúvidas" title="Perguntas frequentes" text="Não encontrou a sua? Chame no WhatsApp." />
          <div data-reveal>
            <FaqList items={faq} />
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-volt-500 px-6 py-16 text-center text-ink-900 sm:px-12" data-reveal>
          <h2 className="display mx-auto max-w-3xl text-4xl sm:text-6xl">Sua cotação começa em um minuto.</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-700">Sem custo, sem compromisso e sem ligação de telemarketing.</p>
          <a href="#cotacao" className="btn mt-8 bg-ink-900 px-8 py-4 text-base text-white hover:bg-ink-800">
            Começar agora <ArrowRight className="size-5" aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}
