import { BlogHero, CategoryNav, PostCard } from '@/components/blog';
import JsonLd from '@/components/JsonLd';
import { blogCategories, publishedPosts } from '@/lib/blog';
import { breadcrumbLd, buildMetadata } from '@/lib/seo';

// Matérias agendadas entram no ar sem novo deploy.
export const revalidate = 3600;

export const metadata = buildMetadata({
  title: 'Blog: guias de seguros, planos de saúde e consórcios',
  description:
    'Guias práticos da Fast Secure para escolher seguro auto, plano de saúde, seguro de vida, seguros empresariais e consórcios sem cair em armadilhas.',
  path: '/blog',
});

export default function BlogPage() {
  const posts = publishedPosts();
  const [first, ...rest] = posts;
  return (
    <main>
      <JsonLd data={breadcrumbLd([{ name: 'Início', path: '/' }, { name: 'Blog' }])} />
      <BlogHero
        eyebrow="Blog Fast Secure"
        title="Seguro explicado sem letra miúda."
        text="Guias práticos para entender coberturas, comparar preços e contratar a proteção certa — para você, sua família e sua empresa."
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <CategoryNav items={blogCategories()} />
        {first ? (
          <>
            <div className="mt-10">
              <PostCard p={first} featured />
            </div>
            {rest.length > 0 && (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((p, i) => (
                  <PostCard key={p.slug} p={p} i={i} />
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="mt-10 text-ink-500">Em breve, novas matérias por aqui.</p>
        )}
      </section>
    </main>
  );
}
