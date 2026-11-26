import HeroBackdrop from '@/components/HeroBackdrop';
import { privacyPage } from '@/lib/editorial';
import { buildMetadata } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata = buildMetadata({
  title: privacyPage.title,
  description: privacyPage.description,
  path: '/privacidade',
});

const sections: { title: string; body: string[] }[] = [
  {
    title: '2. Quais dados coletamos',
    body: [
      'Os formulários pedem nome, WhatsApp com DDD e, se você informar, e-mail. Conforme o formulário, coletamos o produto de interesse, a resposta sobre o seu perfil, ou informações sobre a empresa.',
      'Na página de Seguro Auto, pedimos a placa ou a marca, o modelo, a versão e o ano-modelo para identificar o veículo. Usamos o CEP de pernoite, o tipo de uso e a data de nascimento do principal condutor para avaliar o perfil de risco. A indicação de seguro novo ou renovação ajuda a identificar um possível bônus.',
      'O pedido pode incluir a página de origem, o site de referência e identificadores da campanha usados para entender como você chegou até nós. Em produção, o site usa o Google Analytics para medir navegação e interações.',
    ],
  },
  {
    title: '3. Para que usamos',
    body: [
      'Para elaborar e enviar a cotação solicitada, entrar em contato pelo WhatsApp, telefone ou e-mail e intermediar a contratação junto às seguradoras e operadoras.',
      'Para preparar uma cotação solicitada por você, tratamos os dados necessários aos procedimentos preliminares à contratação, conforme o art. 7º, V, da LGPD. Para medir e melhorar o atendimento, podemos usar dados com base no legítimo interesse, quando aplicável.',
    ],
  },
  {
    title: '4. Com quem compartilhamos',
    body: [
      'Compartilhamos os dados necessários com seguradoras, operadoras de saúde, administradoras de consórcio e outras instituições envolvidas no produto solicitado. Fornecedores de hospedagem, medição, automação e atendimento também podem tratar dados para operar o site e encaminhar o pedido à corretora.',
    ],
  },
  {
    title: '5. Por quanto tempo guardamos',
    body: [
      'O prazo depende da finalidade da coleta e das obrigações aplicáveis. Mantemos os dados pelo tempo necessário para tratar o pedido, prestar o atendimento e cumprir obrigações legais e regulatórias.',
    ],
  },
  {
    title: '6. Segurança',
    body: [
      'O site usa conexão criptografada (HTTPS). Os pedidos são encaminhados aos canais de atendimento para avaliação pela corretora.',
    ],
  },
];

export default function PrivacidadePage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-ink-950 pt-40 pb-16 text-white lg:pt-44">
        <HeroBackdrop src={privacyPage.image} />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <p className="eyebrow text-volt-500">{privacyPage.eyebrow}</p>
          <h1 className="display mt-3 text-5xl">{privacyPage.heading}</h1>
          <p className="mt-5 max-w-lg text-lg text-white/85">{privacyPage.description}</p>
        </div>
      </section>
      <article className="mx-auto max-w-3xl space-y-10 px-4 py-16 sm:px-6">
        <section>
          <h2 className="text-xl font-bold">1. Quem somos</h2>
          <p className="mt-3 leading-relaxed text-ink-600">
            {SITE.legalName} é a controladora dos dados pessoais tratados por meio deste site. Nosso endereço é{' '}
            {SITE.address.street}, {SITE.address.neighborhood}, {SITE.address.city} – {SITE.address.region}, CEP{' '}
            {SITE.address.postalCode}.
          </p>
        </section>
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
        <section>
          <h2 className="text-xl font-bold">7. Seus direitos e como falar com a corretora</h2>
          <p className="mt-3 leading-relaxed text-ink-600">
            Solicite confirmação de tratamento, acesso, correção ou outros direitos previstos na LGPD pelo e-mail{' '}
            <a href={`mailto:${SITE.email}`} className="font-semibold text-brand-700 underline underline-offset-4">{SITE.email}</a>.
            A portabilidade, eliminação e revogação de consentimento se aplicam conforme a situação.
          </p>
          <p className="mt-3 text-ink-600">
            <a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm" className="font-semibold text-brand-700 underline underline-offset-4">
              Consultar a Lei Geral de Proteção de Dados
            </a>
          </p>
        </section>
      </article>
    </main>
  );
}
