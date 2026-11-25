import { notFound } from 'next/navigation';
import { BlogHero, CategoryNav, PostCard } from '@/components/blog';
import JsonLd from '@/components/JsonLd';
import { blogCategories, postsInCategory } from '@/lib/blog';
import { categories, type CategoryId } from '@/lib/products';
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
  return buildMetadata({
    title: `${cat.name}: guias e matérias`,
    description: `Matérias da Fast Secure sobre ${cat.name.toLowerCase()} — ${cat.tagline.toLowerCase()}. Entenda coberturas, preços e como contratar.`,
    path: `/blog/categoria/${cat.id}`,
  });
}

export default async function BlogCategoryPage(props: PageProps<'/blog/categoria/[id]'>) {
  const { id } = await props.params;
  const cat = find(id);
  const posts = cat ? postsInCategory(cat.id as CategoryId) : [];
  if (!cat || posts.length === 0) notFound();

  return (
    <main>
      <JsonLd
        data={breadcrumbLd([{ name: 'Início', path: '/' }, { name: 'Blog', path: '/blog' }, { name: cat.name }])}
      />
      <BlogHero eyebrow="Blog Fast Secure" title={cat.name} text={`Guias e matérias sobre ${cat.tagline.toLowerCase()}.`} />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <CategoryNav items={blogCategories()} active={cat.id} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <PostCard key={p.slug} p={p} i={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
