import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { categories, productsIn } from '@/lib/products';
import { SITE } from '@/lib/site';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 pb-28 text-white/70 lg:pb-10">
      <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_3fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              Corretora de seguros multi-produto. Comparamos as principais seguradoras para você contratar a proteção
              certa pelo melhor preço.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-volt-500" aria-hidden="true" />
                <a href={`tel:${SITE.phoneE164}`} className="hover:text-white">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-volt-500" aria-hidden="true" />
                <a href={`mailto:${SITE.email}`} className="hover:text-white">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-volt-500" aria-hidden="true" />
                <span>
                  {SITE.address.street} — {SITE.address.city}/{SITE.address.region}
                </span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((cat) => (
              <div key={cat.id}>
                <p className="text-sm font-bold text-white">{cat.name}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {productsIn(cat.id).map((p) => (
                    <li key={p.slug}>
                      <Link href={`/${p.slug}`} className="transition hover:text-white">
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/produtos" className="hover:text-white">
              Todos os produtos
            </Link>
            <Link href="/privacidade" className="hover:text-white">
              Política de Privacidade
            </Link>
          </div>
        </div>
        <p className="mt-6 max-w-4xl text-[11px] leading-relaxed text-white/40">
          A Fast Secure atua como corretora de seguros, intermediando a contratação junto a seguradoras e operadoras
          autorizadas pela SUSEP e pela ANS. As condições de cada produto, coberturas e carências constam das
          condições gerais da seguradora ou operadora. Consórcios são administrados por empresas autorizadas pelo
          Banco Central do Brasil.
        </p>
      </div>
    </footer>
  );
}
