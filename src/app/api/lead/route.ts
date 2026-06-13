import { NextResponse } from 'next/server';

// Número de destino do WhatsApp (formato internacional, só dígitos).
// Configure em .env.local: WHATSAPP_NUMBER=5511999999999
const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || '5511999999999';

interface LeadPayload {
  name?: string;
  email?: string;
  phone?: string;
  product?: string;
  company?: string;
  employees?: string;
  interest?: string;
  source?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let data: LeadPayload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Requisição inválida.' }, { status: 400 });
  }

  const name = data.name?.trim() ?? '';
  const email = data.email?.trim() ?? '';
  const phone = data.phone?.trim() ?? '';

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: 'Informe seu nome completo.' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'Informe um e-mail válido.' }, { status: 400 });
  }
  if (phone.replace(/\D/g, '').length < 10) {
    return NextResponse.json({ ok: false, error: 'Informe um telefone/WhatsApp válido.' }, { status: 400 });
  }

  // Ponto de integração: aqui você pode persistir em banco, enviar e-mail
  // ou disparar para um CRM. Por ora registramos no log do servidor.
  console.log('[LEAD]', {
    ...data,
    name,
    email,
    phone,
    receivedAt: new Date().toISOString(),
  });

  // Mensagem pré-preenchida para o WhatsApp da corretora.
  const lines = [
    'Olá! Vim pelo site da Fast Secure e gostaria de uma cotação.',
    '',
    `*Nome:* ${name}`,
    `*E-mail:* ${email}`,
    `*Telefone:* ${phone}`,
  ];
  if (data.company) lines.push(`*Empresa:* ${data.company}`);
  if (data.employees) lines.push(`*Nº de colaboradores:* ${data.employees}`);
  if (data.product) lines.push(`*Produto de interesse:* ${data.product}`);
  if (data.interest) lines.push(`*Interesse principal:* ${data.interest}`);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;

  return NextResponse.json({ ok: true, whatsappUrl });
}
