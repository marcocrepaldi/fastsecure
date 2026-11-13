import { buildMetadata } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Política de Privacidade',
  description: 'Como a Fast Secure coleta, usa e protege os dados pessoais enviados pelo site, conforme a LGPD.',
  path: '/privacidade',
});

// ⚠️ Texto-base. Revisar com o jurídico/DPO antes do go-live.
const sections: { title: string; body: string[] }[] = [
  {
    title: '1. Quem somos',
    body: [
      `${SITE.legalName} ("Fast Secure") é a controladora dos dados pessoais coletados neste site. Dúvidas sobre privacidade podem ser enviadas para ${SITE.email}.`,
    ],
  },
  {
    title: '2. Quais dados coletamos',
    body: [
      'Dados que você informa nos formulários: nome, telefone/WhatsApp, e-mail (opcional), nome da empresa (em cotações corporativas), o produto de interesse e a resposta à pergunta de qualificação.',
      'Dados de navegação: página de origem do contato, parâmetros de campanha (UTM) e site de referência, usados para entender como você chegou até nós.',
    ],
  },
  {
    title: '3. Para que usamos',
    body: [
      'Para elaborar e enviar a cotação solicitada, entrar em contato pelo WhatsApp, telefone ou e-mail e intermediar a contratação junto às seguradoras e operadoras.',
      'A base legal é o procedimento preliminar a um contrato solicitado por você (art. 7º, V, da LGPD) e, quando aplicável, o nosso legítimo interesse em melhorar o atendimento.',
    ],
  },
  {
    title: '4. Com quem compartilhamos',
    body: [
      'Com seguradoras, operadoras de saúde e administradoras de consórcio necessárias para a cotação e a contratação, e com fornecedores de tecnologia que nos ajudam a operar o site e o atendimento. Não vendemos dados pessoais.',
    ],
  },
  {
    title: '5. Por quanto tempo guardamos',
    body: [
      'Pelo tempo necessário para atender à sua solicitação e cumprir obrigações legais e regulatórias aplicáveis à corretagem de seguros.',
    ],
  },
  {
    title: '6. Seus direitos',
    body: [
      'Você pode pedir a confirmação do tratamento, acesso, correção, anonimização, portabilidade ou eliminação dos seus dados, além de revogar consentimentos, pelo e-mail ' +
        SITE.email +
        '.',
    ],
  },
  {
    title: '7. Segurança',
    body: [
      'Adotamos medidas técnicas e administrativas para proteger os dados contra acessos não autorizados, como conexão criptografada (HTTPS) e acesso restrito às informações.',
    ],
  },
];

export default function PrivacidadePage() {
  return (
    <main>
      <section className="mesh grain relative overflow-hidden pt-32 pb-14 text-white lg:pt-40">
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <p className="eyebrow text-volt-500">LGPD</p>
          <h1 className="display mt-3 text-5xl">Política de Privacidade</h1>
        </div>
      </section>
      <article className="mx-auto max-w-3xl space-y-10 px-4 py-16 sm:px-6">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="text-xl font-bold">{s.title}</h2>
            {s.body.map((b) => (
              <p key={b} className="mt-3 leading-relaxed text-ink-600">
                {b}
              </p>
            ))}
          </section>
        ))}
      </article>
    </main>
  );
}
