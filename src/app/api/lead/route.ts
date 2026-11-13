import { NextResponse } from 'next/server';
import { whatsappUrl } from '@/lib/site';

/**
 * Recebe leads dos formulários do site.
 *
 * 1. Valida os campos e descarta bots (honeypot "website").
 * 2. Registra no log do servidor.
 * 3. Se LEAD_WEBHOOK_URL estiver definido, envia o lead em JSON para lá
 *    (CRM, Zapier, Make, n8n, planilha…). Falha no webhook não bloqueia o usuário.
 * 4. Devolve o link do WhatsApp com a mensagem pronta.
 */

type LeadPayload = Partial<
  Record<
    | 'name' | 'phone' | 'email' | 'company' | 'website' | 'product' | 'productSlug'
    | 'question' | 'answer' | 'source' | 'page' | 'referrer'
    | 'employees' | 'interest',
    unknown
  >
> & { utm?: unknown };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const str = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(req: Request) {
  let data: LeadPayload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Requisição inválida.' }, { status: 400 });
  }

  // Bot preencheu o campo invisível: responde OK sem registrar nada.
  if (str(data.website)) {
    return NextResponse.json({ ok: true, whatsappUrl: whatsappUrl() });
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

  const utm =
    data.utm && typeof data.utm === 'object'
      ? Object.fromEntries(Object.entries(data.utm as Record<string, unknown>).map(([k, v]) => [k.slice(0, 40), str(v)]))
      : {};

  const lead = {
    name,
    phone,
    email,
    company: str(data.company, 160),
    employees: str(data.employees, 40),
    interest: str(data.interest, 120),
    product: str(data.product, 120),
    productSlug: str(data.productSlug, 80),
    question: str(data.question, 160),
    answer: str(data.answer, 160),
    source: str(data.source, 60),
    page: str(data.page, 200),
    referrer: str(data.referrer, 300),
    utm,
    receivedAt: new Date().toISOString(),
  };

  console.log('[LEAD]', JSON.stringify(lead));

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) console.error('[LEAD] webhook respondeu', res.status);
    } catch (err) {
      console.error('[LEAD] falha no webhook', err);
    }
  }

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

  return NextResponse.json({ ok: true, whatsappUrl: whatsappUrl(lines.join('\n')) });
}
