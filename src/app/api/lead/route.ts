import { NextResponse } from 'next/server';
import { AUTO_QUOTE_SOURCE, autoQuoteNotice, parseAutoQuote } from '@/lib/auto-quote';
import { whatsappUrl } from '@/lib/site';

type LeadPayload = Partial<
  Record<
    | 'name' | 'phone' | 'email' | 'company' | 'website' | 'product' | 'productSlug'
    | 'question' | 'answer' | 'source' | 'page' | 'referrer'
    | 'employees' | 'interest' | 'leadId',
    unknown
  >
> & { utm?: unknown; autoQuote?: unknown };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LEAD_ID_RE = /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i;

const str = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(req: Request) {
  if (req.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    return NextResponse.json({ ok: false, error: 'Formato de envio inválido.' }, { status: 415 });
  }

  let data: LeadPayload;
  try {
    const body: unknown = await req.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('Invalid payload');
    data = body;
  } catch {
    return NextResponse.json({ ok: false, error: 'Requisição inválida.' }, { status: 400 });
  }

  // Bot preencheu o campo invisível: responde OK sem registrar nada.
  if (str(data.website)) {
    return NextResponse.json({ ok: true, delivery: 'received' });
  }

  const name = str(data.name, 120);
  const phone = str(data.phone, 30);
  const email = str(data.email, 160);
  const digits = phone.replace(/\D/g, '');

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: 'Informe seu nome.' }, { status: 400 });
  }
  if (digits.length < 10 || digits.length > 13) {
    return NextResponse.json({ ok: false, error: 'Informe um WhatsApp válido, com DDD.' }, { status: 400 });
  }
  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'O e-mail informado parece inválido.' }, { status: 400 });
  }

  const source = str(data.source, 60);
  const isAutoQuote = source === AUTO_QUOTE_SOURCE;
  const autoDetails = isAutoQuote ? parseAutoQuote(data.autoQuote) : null;
  if (autoDetails?.error) {
    return NextResponse.json({ ok: false, error: autoDetails.error }, { status: 400 });
  }
  const autoQuote = autoDetails?.value;

  const utm =
    data.utm && typeof data.utm === 'object'
      ? Object.fromEntries(Object.entries(data.utm).slice(0, 12).map(([k, v]) => [k.slice(0, 40), str(v)]))
      : {};

  const requestedId = str(data.leadId, 72);
  if (requestedId && !LEAD_ID_RE.test(requestedId)) {
    return NextResponse.json({ ok: false, error: 'Identificador de envio inválido.' }, { status: 400 });
  }

  const lead = {
    leadId: requestedId || crypto.randomUUID(),
    name,
    phone,
    email,
    company: str(data.company, 160),
    employees: str(data.employees, 40),
    interest: str(data.interest, 120),
    product: autoQuote ? 'Seguro Auto' : str(data.product, 120),
    productSlug: autoQuote ? 'seguro-auto' : str(data.productSlug, 80),
    question: autoQuote ? 'Veículo e perfil' : str(data.question, 160),
    answer: autoQuote ? autoQuoteNotice(autoQuote) : str(data.answer, 160),
    source,
    page: str(data.page, 200),
    referrer: str(data.referrer, 300),
    utm,
    ...(autoQuote ? { autoQuote } : {}),
    receivedAt: new Date().toISOString(),
  };

  const lines = [
    `Olá! Vim pelo site da Fast Secure e quero uma cotação${lead.product ? ` de *${lead.product}*` : ''}.`,
    '',
    `*Nome:* ${name}`,
    `*WhatsApp:* ${phone}`,
  ];
  if (email) lines.push(`*E-mail:* ${email}`);
  if (lead.company) lines.push(`*Empresa:* ${lead.company}`);
  if (lead.employees) lines.push(`*Colaboradores:* ${lead.employees}`);
  if (lead.answer) lines.push(`*${lead.question || 'Detalhe'}:* ${lead.answer}`);
  if (lead.interest) lines.push(`*Interesse:* ${lead.interest}`);

  const manualUrl = isAutoQuote ? undefined : whatsappUrl(lines.join('\n'));
  const webhook = process.env.LEAD_WEBHOOK_URL?.trim();
  const token = process.env.LEAD_WEBHOOK_TOKEN?.trim();
  const error = isAutoQuote
    ? 'Não conseguimos confirmar o recebimento da sua cotação. Tente novamente.'
    : 'Não conseguimos confirmar o recebimento. Tente novamente ou envie pelo WhatsApp.';

  if (isAutoQuote && (!webhook || !token)) {
    return NextResponse.json({ ok: false, error }, { status: 503 });
  }

  if (!webhook && !token) {
    return NextResponse.json({ ok: true, delivery: 'whatsapp', whatsappUrl: manualUrl });
  }

  try {
    if (!webhook) throw new Error('Missing webhook URL');
    const endpoint = new URL(webhook);
    const isLocalTest =
      process.env.NODE_ENV !== 'production' &&
      ['localhost', '127.0.0.1', '[::1]'].includes(endpoint.hostname);
    if (token && endpoint.protocol !== 'https:' && !(isLocalTest && endpoint.protocol === 'http:')) {
      throw new Error('Authenticated webhook requires HTTPS');
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(lead),
      redirect: 'error',
      signal: AbortSignal.timeout(5000),
    });

    if (res.ok) {
      // No modo autenticado, o n8n confirma somente depois de gravar o pedido.
      const receipt = token ? await res.json().catch(() => null) : null;
      if (!token || (receipt?.accepted === true && receipt.leadId === lead.leadId)) {
        return NextResponse.json({ ok: true, delivery: 'received' });
      }
    }
    console.error('[LEAD] recebimento não confirmado', { leadId: lead.leadId, status: res.status });
  } catch {
    console.error('[LEAD] recebimento indisponível', { leadId: lead.leadId });
  }

  return NextResponse.json(
    {
      ok: false,
      error,
      whatsappUrl: manualUrl,
    },
    { status: 503 },
  );
}
