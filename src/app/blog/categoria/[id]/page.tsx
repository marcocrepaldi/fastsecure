import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BlogHero, CategoryNav, PostCard } from '@/components/blog';
import JsonLd from '@/components/JsonLd';
import { blogCategories, postsInCategory } from '@/lib/blog';
import { categories, getProduct } from '@/lib/products';
import { categoryGuides } from '@/lib/editorial';
import { breadcrumbLd, buildMetadata } from '@/lib/seo';

export const revalidate = 3600;

export function generateStaticParams() {
  return blogCategories().map((c) => ({ id: c.id }));
}

const find = (id: string) => categories.find((c) => c.id === id);

export async function generateMetadata(props: PageProps<'/blog/categoria/[id]'>) {
  const { id } = await props.params;
  const cat = find(id);
  if (!cat) return {};
  const guide = categoryGuides[cat.id];
  return buildMetadata({
    title: guide?.title ?? `Guias de ${cat.name.toLowerCase()}`,
    description: guide?.description ?? cat.tagline,
    path: `/blog/categoria/${cat.id}`,
  });
}

export default async function BlogCategoryPage(props: PageProps<'/blog/categoria/[id]'>) {
  const { id } = await props.params;
  const cat = find(id);
  const posts = cat ? postsInCategory(cat.id) : [];
  if (!cat || posts.length === 0) notFound();
  const guide = categoryGuides[cat.id];

  return (
    <main>
      <JsonLd
        data={breadcrumbLd([{ name: 'Início', path: '/' }, { name: 'Blog', path: '/blog' }, { name: cat.name }])}
      />
      <BlogHero
        eyebrow="Blog Fast Secure"
        title={guide?.title ?? cat.name}
        text={guide?.description ?? cat.tagline}
        image={guide?.image}
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <CategoryNav items={blogCategories()} active={cat.id} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <PostCard key={p.slug} p={p} i={i} />
          ))}
        </div>
        {guide && (
          <nav className="mt-12 border-t border-ink-100 pt-8" aria-labelledby="produtos-relacionados">
            <h2 id="produtos-relacionados" className="display text-2xl">Produtos relacionados aos guias</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {guide.products.map((slug) => {
                const product = getProduct(slug);
                return product && (
                  <li key={slug}>
                    <Link href={`/${slug}`} className="btn btn-ghost">{product.name}</Link>
                  </li>
                );
              })}
              <li>
                <Link href={`/produtos#${cat.id}`} className="btn btn-ghost">Ver categoria no catálogo</Link>
              </li>
            </ul>
          </nav>
        )}
      </section>
    </main>
  );
}
