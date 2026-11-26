import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ChevronRight, MessageCircle } from 'lucide-react';
import { PostCard, PostMetaLine } from '@/components/blog';
import HeroBackdrop from '@/components/HeroBackdrop';
import JsonLd from '@/components/JsonLd';
import QuoteForm, { type ProductOptionGroup } from '@/components/QuoteForm';
import { ProductCard, SectionHeading, toQuoteProduct } from '@/components/ui';
import { formatDate, getPost, postProducts, publishedPosts, relatedPosts } from '@/lib/blog';
import { articleHeroImages } from '@/lib/editorial';
import { categories, getCategory, productsIn } from '@/lib/products';
import { blogPostingLd, breadcrumbLd, buildMetadata, faqLd, postDateTime } from '@/lib/seo';
import { whatsappUrl } from '@/lib/site';

// Matérias agendadas: a página passa a existir no dia da publicação, sem novo deploy.
export const revalidate = 3600;

export function generateStaticParams() {
  return publishedPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params;
  const p = getPost(slug);
  if (!p) return {};
  return buildMetadata({
    title: p.title,
    description: p.description,
    path: `/blog/${p.slug}`,
    article: {
      publishedTime: postDateTime(p.date),
      modifiedTime: p.updated ? postDateTime(p.updated) : undefined,
      section: getCategory(p.category).name,
      tags: p.tags,
    },
  });
}

const productOptions: ProductOptionGroup[] = categories.map((c) => ({
  group: c.name,
  items: productsIn(c.id).map((p) => ({ slug: p.slug, name: p.name })),
}));

export default async function BlogPostPage(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const cat = getCategory(post.category);
  const linked = postProducts(post);
  const main = linked[0];
  const heroImage = articleHeroImages[post.slug] ?? main?.hero.image;
  const related = relatedPosts(post);
  const toc = post.headings.filter((h) => h.level === 2);
  const source = `blog:${post.slug}`.slice(0, 60);

  return (
    <main>
      <JsonLd data={blogPostingLd(post, cat.name)} />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Início', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: cat.name, path: `/blog/categoria/${cat.id}` },
          { name: post.title },
        ])}
      />
      {post.faq.length > 0 && <JsonLd data={faqLd(post.faq)} />}

      <section className={`relative overflow-hidden pt-28 pb-14 text-white lg:pt-36 lg:pb-20 ${heroImage ? 'bg-ink-950' : 'mesh grain'}`}>
        {heroImage
          ? <HeroBackdrop src={heroImage} preload={!post.cover} />
          : <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />}
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Você está em" className="flex flex-wrap items-center gap-1.5 text-sm text-white/50">
            <Link href="/" className="hover:text-white">
              Início
            </Link>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <Link href="/blog" className="hover:text-white">
              Blog
            </Link>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <Link href={`/blog/categoria/${cat.id}`} className="hover:text-white">
              {cat.name}
            </Link>
          </nav>
          <h1 className="display mt-8 text-4xl text-balance sm:text-5xl lg:text-6xl">{post.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{post.description}</p>
          <div className="mt-8">
            <PostMetaLine p={post} dark />
            {post.updated && (
              <p className="mt-1 text-sm text-white/50">
                Atualizado em <time dateTime={post.updated}>{formatDate(post.updated)}</time>
              </p>
            )}
          </div>
        </div>
      </section>

      {post.cover && (
        <div className="relative z-10 mx-auto -mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
          <figure className="relative aspect-video overflow-hidden rounded-3xl bg-ink-900 shadow-lift ring-1 ring-black/5">
            <Image
              src={post.cover.src}
              alt={post.cover.alt}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 72rem, 100vw"
            />
          </figure>
        </div>
      )}

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:px-8 lg:py-20">
        <article className="post-body min-w-0" dangerouslySetInnerHTML={{ __html: post.html }} />

        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-6">
            {toc.length > 1 && (
              <nav aria-label="Nesta matéria" className="rounded-3xl border border-ink-100 p-6">
                <p className="eyebrow text-brand-600">Nesta matéria</p>
                <ol className="mt-4 space-y-2.5 text-sm">
                  {toc.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="text-ink-500 transition hover:text-ink-900">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <div className="rounded-3xl bg-ink-900 p-6 text-white">
              <p className="font-bold">{main ? `Quer cotar ${main.name}?` : 'Quer uma cotação?'}</p>
              <p className="mt-2 text-sm text-white/60">Comparamos as principais seguradoras e respondemos pelo WhatsApp.</p>
              <a href="#cotacao" className="btn btn-volt mt-5 w-full">
                Cotar agora <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </aside>
      </div>

      <section className="mesh grain relative overflow-hidden py-16 text-white lg:py-24">
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="eyebrow text-volt-500">Fale com a Fast Secure</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">
              {main ? `Compare ${main.name} nas principais seguradoras` : 'Compare as principais seguradoras'}
            </h2>
            <p className="mt-4 text-white/65">
              Cotação sem custo e sem compromisso. Um especialista explica as diferenças em linguagem simples.
            </p>
            <a
              href={whatsappUrl(`Olá! Li a matéria "${post.title}" no blog e quero tirar uma dúvida.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost-dark mt-6"
            >
              <MessageCircle className="size-5" aria-hidden="true" /> Tirar dúvida no WhatsApp
            </a>
          </div>
          <div id="cotacao" className="scroll-mt-28">
            {main ? (
              <QuoteForm product={toQuoteProduct(main)} source={source} title={`Cotação de ${main.name}`} />
            ) : (
              <QuoteForm productOptions={productOptions} source={source} title="O que vamos proteger?" />
            )}
          </div>
        </div>
      </section>

      {linked.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Produtos citados" title="Conheça as coberturas" />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {linked.map((p, i) => (
                <ProductCard key={p.slug} p={p} i={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-ink-50 py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Leia também" title="Mais guias do blog" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <PostCard key={p.slug} p={p} i={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
