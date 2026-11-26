import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, ChevronRight, MessageCircle, ShieldCheck } from 'lucide-react';
import Icon from '@/components/Icon';
import JsonLd from '@/components/JsonLd';
import QuoteForm from '@/components/QuoteForm';
import AutoQuoteForm from '@/components/AutoQuoteForm';
import { FaqList, ProductCard, SectionHeading, toQuoteProduct } from '@/components/ui';
import { getCategory, getProduct, products, relatedProducts } from '@/lib/products';
import { breadcrumbLd, buildMetadata, faqLd, serviceLd } from '@/lib/seo';
import { SITE, whatsappUrl } from '@/lib/site';

// Só os slugs do catálogo existem; qualquer outro vira 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<'/[slug]'>) {
  const { slug } = await props.params;
  const p = getProduct(slug);
  if (!p) return {};
  return buildMetadata({ title: p.metaTitle, description: p.metaDescription, path: `/${p.slug}` });
}

const steps = {
  pf: (
    comparisonText = `Cotamos com até ${SITE.stats.insurers}+ seguradoras e filtramos as melhores para o seu perfil.`,
    requestText = 'Responda duas perguntas rápidas. Leva menos de um minuto.',
  ) => [
    { title: 'Conte o que precisa', text: requestText },
    { title: 'Comparamos o mercado', text: comparisonText },
    { title: 'Você escolhe e contrata', text: 'Explicamos as diferenças em linguagem simples e cuidamos da contratação.' },
  ],
  pj: [
    { title: 'Diagnóstico', text: 'Entendemos a operação, os contratos e os riscos da sua empresa.' },
    { title: 'Cotação comparativa', text: 'Negociamos com as seguradoras e apresentamos as opções lado a lado.' },
    { title: 'Implantação e gestão', text: 'Emitimos a apólice e acompanhamos sinistros e renovações.' },
  ],
};

export default async function ProductPage(props: PageProps<'/[slug]'>) {
  const { slug } = await props.params;
  const p = getProduct(slug);
  if (!p) notFound();

  const cat = getCategory(p.category);
  const related = relatedProducts(p);
  const { image: heroImage } = p.hero;
  const comparison = p.quoteComparison;
  const guide = p.comparisonGuide;
  const isAutoQuote = p.slug === 'seguro-auto';
  const flow = p.audience === 'pj'
    ? steps.pj
    : steps.pf(comparison?.description, isAutoQuote ? 'Informe os dados do carro, de quem mais dirige e seu contato.' : undefined);
  const highlights = [
    'Cotação sem custo',
    comparison?.label ?? `${SITE.stats.insurers}+ seguradoras`,
    'Atendimento no WhatsApp',
  ];
  const isFinance = p.category === "financeiro";
  const wa = whatsappUrl(`Olá! Quero tirar uma dúvida sobre ${p.name}.`);

  return (
    <main>
      <JsonLd data={serviceLd(p)} />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Início', path: '/' },
          { name: cat.name, path: `/produtos#${cat.id}` },
          { name: p.name },
        ])}
      />
      <JsonLd data={faqLd(p.faq)} />

      {/* HERO + FORMULÁRIO */}
      <section
        className={`relative isolate overflow-hidden pt-28 pb-16 text-white lg:pt-36 lg:pb-24 ${
          heroImage ? 'bg-ink-950' : 'mesh grain'
        }`}
      >
        {!heroImage && <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />}
        <div
          className={`relative mx-auto grid max-w-7xl items-start px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-8 ${
            heroImage ? 'gap-6 lg:min-h-[28rem]' : 'gap-12'
          }`}
        >
          <div className="relative z-10 lg:pt-6">
            <nav aria-label="Você está em" className="flex flex-wrap items-center gap-1.5 text-sm text-white/50">
              <Link href="/" className="hover:text-white">
                Início
              </Link>
              <ChevronRight className="size-3.5" aria-hidden="true" />
              <Link href={`/produtos#${cat.id}`} className="hover:text-white">
                {cat.name}
              </Link>
              <ChevronRight className="size-3.5" aria-hidden="true" />
              <span className="text-white/80">{p.name}</span>
            </nav>
            <span className="chip mt-8 bg-white/10 text-white ring-1 ring-white/15">
              <Icon name={p.icon} className="size-4 text-volt-500" /> {p.hero.eyebrow}
            </span>
            <h1 className="display mt-5 text-4xl text-balance sm:text-5xl lg:text-6xl">{p.hero.title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">{p.hero.subtitle}</p>
            <ul className="mt-8 grid gap-3 text-sm font-medium text-white/85 sm:grid-cols-3">
              {highlights.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="grid size-5 place-items-center rounded-full bg-volt-500 text-ink-900">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          {heroImage && (
            <div
              className="pointer-events-none relative -mx-4 h-44 overflow-hidden sm:-mx-6 sm:h-56 md:h-64 lg:absolute lg:-top-36 lg:-bottom-24 lg:left-1/2 lg:mx-0 lg:h-auto lg:w-screen lg:-translate-x-1/2"
              aria-hidden="true"
            >
              <Image
                src={heroImage}
                alt=""
                fill
                preload
                sizes="100vw"
                className="object-cover object-[right_75%] motion-safe:animate-[product-hero-settle_1.2s_ease-out_both] lg:object-[center_75%]"
              />
              <div className="absolute inset-0 bg-linear-to-b from-ink-950 via-transparent via-35% to-ink-950/90 lg:bg-linear-to-r lg:from-ink-950/95 lg:via-ink-950/45 lg:via-50% lg:to-ink-950/5" />
              <div className="absolute inset-x-0 top-0 hidden h-36 bg-linear-to-b from-ink-950/85 to-transparent lg:block" />
            </div>
          )}
          <div id="cotacao" className="relative z-10 scroll-mt-28">
            {isAutoQuote
              ? <AutoQuoteForm />
              : <QuoteForm product={toQuoteProduct(p)} source="product-page" title={`Cotação de ${p.name}`} />}
          </div>
        </div>
      </section>

      {/* DORES */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="O risco"
            title={
              <>
                Sem proteção, <span className="text-brand-500">quem paga a conta é você</span>
              </>
            }
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {p.pains.map((pain, i) => (
              <article
                key={pain.title}
                data-reveal
                style={{ ['--d' as string]: i }}
                className="relative overflow-hidden rounded-3xl bg-ink-900 p-8 text-white"
              >
                <span className="display absolute -top-4 -right-2 text-[7rem] leading-none text-white/[0.04]" aria-hidden="true">
                  0{i + 1}
                </span>
                <span className="eyebrow text-volt-500">Risco 0{i + 1}</span>
                <h3 className="mt-4 text-xl font-bold">{pain.title}</h3>
                <p className="mt-2 leading-relaxed text-white/60">{pain.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COBERTURAS */}
      <section className="bg-ink-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading eyebrow={isFinance ? "Vantagens" : "Coberturas"} title={`${p.name}: o que está incluído`} />
            <p className="max-w-sm text-sm text-ink-400" data-reveal>
              {isFinance
                ? "Regras, prazos e taxas variam conforme a administradora e o plano. Na simulação, mostramos tudo lado a lado."
                : "Coberturas, limites e carências variam conforme a seguradora e o plano. Na cotação, mostramos tudo lado a lado."}
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.coverages.map((c, i) => (
              <div
                key={c.title}
                data-reveal
                style={{ ['--d' as string]: i % 3 }}
                className="group rounded-3xl bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="grid size-11 place-items-center rounded-2xl bg-brand-500 text-white transition group-hover:bg-volt-500 group-hover:text-ink-900">
                  <ShieldCheck className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{c.title}</h3>
                <p className="mt-1.5 leading-relaxed text-ink-500">{c.text}</p>
              </div>
            ))}
          </div>
          {guide && (
            <section className="mt-8 rounded-3xl border border-ink-100 bg-white p-6 sm:p-8">
              <h3 className="display text-2xl text-ink-900 sm:text-3xl">{guide.title}</h3>
              <ul className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {guide.items.map((item) => (
                  <li key={item.title} className="leading-relaxed text-ink-500">
                    <strong className="text-ink-900">{item.title}.</strong> {item.text}
                  </li>
                ))}
              </ul>
              <Link href={guide.article.href} className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-700 underline underline-offset-4 hover:text-ink-900">
                {guide.article.label} <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </Link>
            </section>
          )}
        </div>
      </section>

      {/* PARA QUEM + COMO FUNCIONA */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:items-start lg:px-8">
          <div className="mesh grain relative overflow-hidden rounded-4xl p-8 text-white sm:p-12" data-reveal>
            <p className="eyebrow text-volt-500">Para quem é</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">Feito para quem…</h2>
            <ul className="mt-8 space-y-4">
              {p.forWho.map((w) => (
                <li key={w} className="flex items-start gap-3 text-lg">
                  <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-volt-500 text-ink-900">
                    <Check className="size-4" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-4xl border border-ink-100 p-8 sm:p-12" data-reveal style={{ ['--d' as string]: 1 }}>
            <p className="eyebrow text-brand-600">Como funciona</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">Três passos, zero burocracia</h2>
            <ol className="mt-8 space-y-6">
              {flow.map((s, i) => (
                <li key={s.title} className="flex gap-5">
                  <span className="display grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-xl text-brand-600">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold">{s.title}</h3>
                    <p className="mt-1 text-ink-500">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <a href="#cotacao" className="btn btn-brand mt-10">
              Começar minha cotação <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ink-50 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:px-8">
          <div>
            <SectionHeading eyebrow="Dúvidas frequentes" title={`Perguntas sobre ${p.name}`} />
            <div className="mt-8 rounded-3xl bg-white p-6 shadow-soft" data-reveal>
              <p className="font-semibold">Ficou alguma dúvida?</p>
              <p className="mt-1 text-sm text-ink-500">Um especialista responde pelo WhatsApp, sem compromisso.</p>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-4">
                <MessageCircle className="size-4" aria-hidden="true" /> Perguntar no WhatsApp
              </a>
            </div>
          </div>
          <div data-reveal>
            <FaqList items={p.faq} />
          </div>
        </div>
      </section>

      {/* RELACIONADOS */}
      {related.length > 0 && (
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Combine proteções" title="Quem contrata este também procura" />
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {related.map((r, i) => (
                <ProductCard key={r.slug} p={r} i={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA FINAL */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div
          className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 overflow-hidden rounded-4xl bg-volt-500 p-8 text-ink-900 sm:p-12 lg:flex-row lg:items-center"
          data-reveal
        >
          <div>
            <h2 className="display text-3xl sm:text-5xl">Pronto para a sua cotação de {p.name}?</h2>
            <p className="mt-3 text-lg text-ink-700">Leva menos de um minuto. Sem custo e sem compromisso.</p>
          </div>
          <a href="#cotacao" className="btn shrink-0 bg-ink-900 px-7 py-4 text-base text-white hover:bg-ink-800">
            Quero minha cotação <ArrowRight className="size-5" aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* Barra fixa no celular */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink-100 bg-white/95 p-3 backdrop-blur lg:hidden">
        <a href="#cotacao" className="btn btn-volt w-full py-4">
          Cotar {p.name} <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    </main>
  );
}
