'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, CircleCheck, Lock, LoaderCircle, MessageCircle } from 'lucide-react';

export type QuoteProduct = {
  slug: string;
  name: string;
  audience: 'pf' | 'pj' | 'ambos';
  question: { label: string; options: string[] };
};

export type ProductOptionGroup = { group: string; items: { slug: string; name: string }[] };

type Props = {
  /** Produto da página. Sem ele, o formulário pede para escolher o produto. */
  product?: QuoteProduct;
  /** Lista para o seletor quando não há produto definido. */
  productOptions?: ProductOptionGroup[];
  source: string;
  title?: string;
  subtitle?: string;
  /** Força o campo "empresa" (formulários corporativos). */
  b2b?: boolean;
};

function maskPhone(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function trackingData() {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid']) {
    const v = params.get(k);
    if (v) utm[k] = v.slice(0, 200);
  }
  return { page: window.location.pathname, referrer: document.referrer.slice(0, 300), utm };
}

export default function QuoteForm({ product, productOptions, source, title, subtitle, b2b = false }: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selected, setSelected] = useState(product?.slug ?? '');
  const [answer, setAnswer] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [waUrl, setWaUrl] = useState<string | null>(null);

  const productName =
    product?.name ?? productOptions?.flatMap((g) => g.items).find((i) => i.slug === selected)?.name ?? '';
  const isB2B = b2b || product?.audience === 'pj';

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          phone,
          email: fd.get('email'),
          company: fd.get('company'),
          website: fd.get('website'),
          product: productName,
          productSlug: selected,
          question: product?.question.label,
          answer,
          source,
          ...trackingData(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || 'Não foi possível enviar. Tente novamente.');
      setWaUrl(data.whatsappUrl);
      setStatus('done');
      const w = window as unknown as { dataLayer?: object[] };
      w.dataLayer?.push({ event: 'generate_lead', product: selected || productName, source });
      window.open(data.whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado.');
      setStatus('idle');
    }
  }

  if (status === 'done') {
    return (
      <div className="rounded-3xl bg-white p-8 text-center text-ink-900 shadow-lift" role="status">
        <div className="mx-auto grid size-14 place-items-center rounded-full bg-volt-500">
          <CircleCheck className="size-7" aria-hidden="true" />
        </div>
        <h3 className="display mt-5 text-2xl">Pedido recebido!</h3>
        <p className="mt-2 text-ink-500">
          Um especialista vai falar com você pelo WhatsApp com as opções de {productName || 'cotação'}.
        </p>
        {waUrl && (
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-brand mt-6 w-full">
            <MessageCircle className="size-5" aria-hidden="true" /> Abrir o WhatsApp
          </a>
        )}
      </div>
    );
  }

  const canAdvance = Boolean(selected) && (!product || Boolean(answer));

  return (
    <div className="rounded-3xl bg-white p-6 text-ink-900 shadow-lift sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="eyebrow text-brand-600">Cotação gratuita</p>
          <h2 className="display mt-1 text-2xl sm:text-[1.7rem]">{title ?? 'Receba sua cotação'}</h2>
        </div>
        <span className="shrink-0 rounded-full bg-ink-50 px-3 py-1 text-xs font-semibold text-ink-500">
          {step} de 2
        </span>
      </div>
      {subtitle && <p className="mt-2 text-sm text-ink-500">{subtitle}</p>}
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-ink-100" aria-hidden="true">
        <div className="h-full rounded-full bg-brand-500 transition-all duration-500" style={{ width: step === 1 ? '50%' : '100%' }} />
      </div>

      {step === 1 ? (
        <div className="mt-6">
          {!product && productOptions && (
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">O que você quer proteger?</span>
              <select className="field" value={selected} onChange={(e) => setSelected(e.target.value)} required>
                <option value="" disabled>
                  Escolha um produto
                </option>
                {productOptions.map((g) => (
                  <optgroup key={g.group} label={g.group}>
                    {g.items.map((i) => (
                      <option key={i.slug} value={i.slug}>
                        {i.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </label>
          )}

          {product && (
            <fieldset>
              <legend className="mb-3 text-sm font-semibold">{product.question.label}</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {product.question.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    aria-pressed={answer === opt}
                    onClick={() => {
                      setAnswer(opt);
                      setStep(2);
                    }}
                    className={`group flex items-center justify-between rounded-2xl border px-4 py-3.5 text-left text-sm font-semibold transition ${
                      answer === opt
                        ? 'border-brand-500 bg-brand-50 text-brand-700'
                        : 'border-ink-200 hover:border-brand-400 hover:bg-brand-50/50'
                    }`}
                  >
                    {opt}
                    <ArrowRight className="size-4 text-ink-300 transition group-hover:translate-x-0.5 group-hover:text-brand-500" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {!product && (
            <button type="button" className="btn btn-brand mt-5 w-full" disabled={!canAdvance} onClick={() => setStep(2)}>
              Continuar <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>
      ) : (
        <form className="mt-6 space-y-3" onSubmit={submit} noValidate={false}>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="flex items-center gap-1.5 text-xs font-semibold text-ink-400 hover:text-ink-900"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            {productName}
            {answer ? ` · ${answer}` : ''}
          </button>

          <label className="block">
            <span className="sr-only">Nome completo</span>
            <input name="name" className="field" placeholder="Seu nome" autoComplete="name" required minLength={2} />
          </label>
          <label className="block">
            <span className="sr-only">WhatsApp</span>
            <input
              name="phone"
              className="field"
              placeholder="WhatsApp com DDD"
              inputMode="tel"
              autoComplete="tel-national"
              value={phone}
              onChange={(e) => setPhone(maskPhone(e.target.value))}
              required
              pattern="\(\d{2}\) \d{4,5}-\d{4}"
              title="Informe o celular com DDD"
            />
          </label>
          <label className="block">
            <span className="sr-only">E-mail (opcional)</span>
            <input name="email" type="email" className="field" placeholder="E-mail (opcional)" autoComplete="email" />
          </label>
          {isB2B && (
            <label className="block">
              <span className="sr-only">Empresa</span>
              <input name="company" className="field" placeholder="Nome da empresa" autoComplete="organization" required />
            </label>
          )}

          {/* Honeypot anti-spam: invisível para pessoas. */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <input name="website" tabIndex={-1} autoComplete="off" />
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="btn btn-volt w-full py-4 text-base" disabled={status === 'sending'}>
            {status === 'sending' ? (
              <>
                <LoaderCircle className="size-5 animate-spin" aria-hidden="true" /> Enviando…
              </>
            ) : (
              <>
                Quero minha cotação <ArrowRight className="size-5" aria-hidden="true" />
              </>
            )}
          </button>
          <p className="flex items-start gap-2 text-xs leading-relaxed text-ink-400">
            <Lock className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
            <span>
              Seus dados são usados só para esta cotação, conforme a{' '}
              <Link href="/privacidade" className="underline hover:text-ink-900">
                Política de Privacidade
              </Link>
              .
            </span>
          </p>
        </form>
      )}
    </div>
  );
}
