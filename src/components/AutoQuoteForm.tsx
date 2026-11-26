'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CircleCheck, LoaderCircle } from 'lucide-react';
import { AUTO_QUOTE_SOURCE, autoPolicies, autoUses, parseAutoQuote, parseAutoVehicle, type AutoQuote } from '@/lib/auto-quote';
import { maskPhone, useLeadSubmission } from './useLeadSubmission';

const stepTitles = ['Seu carro', 'Perfil de uso', 'Seus dados de contato'] as const;
const fieldLabel = 'mb-1.5 block text-sm font-semibold';
const hint = 'mt-1.5 text-xs leading-relaxed text-ink-500';

export default function AutoQuoteForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [kind, setKind] = useState<'plate' | 'model'>('plate');
  const [vehicleDetails, setVehicleDetails] = useState<Pick<AutoQuote, 'vehicle' | 'overnightCep'> | null>(null);
  const [quote, setQuote] = useState<AutoQuote | null>(null);
  const [phone, setPhone] = useState('');
  const [stepError, setStepError] = useState<string | null>(null);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const { status, error, send } = useLeadSubmission(AUTO_QUOTE_SOURCE);
  const notice = stepError ?? (step === 3 ? error ?? (status === 'whatsapp' ? 'Tente enviar sua solicitação novamente.' : null) : null);
  const isSending = status === 'sending';

  function goTo(next: 1 | 2 | 3) {
    setStepError(null);
    setStep(next);
    stepHeading.current?.focus();
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (step === 1) {
      const vehicle = kind === 'plate'
        ? { kind, plate: data.get('plate') }
        : { kind, make: data.get('make'), model: data.get('model'), version: data.get('version'), modelYear: data.get('modelYear') };
      const validated = parseAutoVehicle({ vehicle, overnightCep: data.get('overnightCep') });
      if (!validated.value) {
        setStepError(validated.error);
        return;
      }
      setVehicleDetails(validated.value);
      goTo(2);
      return;
    }

    if (step === 2) {
      const validated = parseAutoQuote({
        ...vehicleDetails,
        use: data.get('use'),
        driverBirthDate: data.get('driverBirthDate'),
        policy: data.get('policy'),
      });
      if (!validated.value) {
        setStepError(validated.error);
        return;
      }
      setQuote(validated.value);
      goTo(3);
      return;
    }

    if (!quote) return;
    const delivery = await send({ name: data.get('name'), phone, email: data.get('email'), website: data.get('website'), autoQuote: quote });
    if (delivery === 'received') {
      const analytics = window as unknown as { dataLayer?: object[] };
      analytics.dataLayer?.push({ event: 'generate_lead', product: 'seguro-auto', source: AUTO_QUOTE_SOURCE });
    }
  }

  if (status === 'received') {
    return (
      <div className="rounded-3xl bg-white p-8 text-center text-ink-900 shadow-lift" role="status">
        <div className="mx-auto grid size-14 place-items-center rounded-full bg-volt-500">
          <CircleCheck className="size-7" aria-hidden="true" />
        </div>
        <h2 className="display mt-5 text-2xl">Pedido recebido!</h2>
        <p className="mt-2 text-ink-500">A Fast Secure vai preparar sua cotação de Seguro Auto e enviar as opções pelo WhatsApp que você informou.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-6 text-ink-900 shadow-lift sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-brand-600">Cotação gratuita</p>
          <h2 className="display mt-1 text-2xl sm:text-[1.7rem]">Cotação de Seguro Auto</h2>
        </div>
        <span className="shrink-0 rounded-full bg-ink-50 px-3 py-1 text-xs font-semibold text-ink-500">
          {step} de 3
        </span>
      </div>
      <progress value={step} max={3} aria-label="Etapas da cotação" className="sr-only" />
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-ink-100" aria-hidden="true">
        <div className="h-full rounded-full bg-brand-500 transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
      </div>

      <h3 ref={stepHeading} tabIndex={-1} className="display mt-5 text-xl outline-none" aria-live="polite">
        {stepTitles[step - 1]}
      </h3>
      <form onSubmit={submit} className="mt-4">
        <fieldset hidden={step !== 1} disabled={step !== 1} className="space-y-4">
          <fieldset>
            <legend className={fieldLabel}>Como prefere informar o carro?</legend>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="identification" checked={kind === 'plate'} onChange={() => setKind('plate')} />
                Tenho a placa
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="identification" checked={kind === 'model'} onChange={() => setKind('model')} />
                Informar o modelo
              </label>
            </div>
          </fieldset>

          <div hidden={kind !== 'plate'}>
            <label htmlFor="auto-plate" className={fieldLabel}>Placa</label>
            <input
              className="field uppercase"
              id="auto-plate"
              name="plate"
              maxLength={8}
              autoCapitalize="characters"
              autoComplete="off"
              spellCheck={false}
              placeholder="ABC1D23"
              aria-describedby="auto-vehicle-purpose"
              disabled={kind !== 'plate'}
              required
            />
          </div>

          <fieldset hidden={kind !== 'model'} disabled={kind !== 'model'}>
            <legend className="sr-only">Identificação do carro sem placa</legend>
            <div className="grid gap-3 sm:grid-cols-2" aria-describedby="auto-vehicle-purpose">
              <label className="block">
                <span className={fieldLabel}>Marca</span>
                <input className="field" name="make" maxLength={80} required />
              </label>
              <label className="block">
                <span className={fieldLabel}>Modelo</span>
                <input className="field" name="model" maxLength={80} required />
              </label>
              <label className="block">
                <span className={fieldLabel}>Versão</span>
                <input className="field" name="version" maxLength={80} required />
              </label>
              <label className="block">
                <span className={fieldLabel}>Ano-modelo</span>
                <input className="field" name="modelYear" inputMode="numeric" maxLength={4} pattern="[0-9]{4}" required />
              </label>
            </div>
          </fieldset>
          <p className={hint} id="auto-vehicle-purpose">A identificação do veículo ajuda a cotar a versão e o ano corretos.</p>

          <div>
            <label htmlFor="auto-cep" className={fieldLabel}>CEP onde o carro passa a noite</label>
            <input
              className="field"
              id="auto-cep"
              name="overnightCep"
              inputMode="numeric"
              maxLength={9}
              placeholder="00000-000"
              aria-describedby="auto-cep-purpose"
              required
            />
            <p className={hint} id="auto-cep-purpose">A região de pernoite influencia o cálculo do seguro.</p>
          </div>
        </fieldset>

        <fieldset hidden={step !== 2} disabled={step !== 2} className="space-y-4">
          <div>
            <label htmlFor="auto-use" className={fieldLabel}>Como você usa o carro?</label>
            <select className="field" id="auto-use" name="use" defaultValue="" aria-describedby="auto-use-purpose" required>
              <option disabled value="">Selecione o uso</option>
              {Object.entries(autoUses).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
            <p className={hint} id="auto-use-purpose">O tipo de uso muda a análise de risco e as coberturas disponíveis.</p>
          </div>
          <div>
            <label htmlFor="auto-birth-date" className={fieldLabel}>Data de nascimento de quem mais dirige</label>
            <input className="field" id="auto-birth-date" name="driverBirthDate" type="date" aria-describedby="auto-birth-purpose" required />
            <p className={hint} id="auto-birth-purpose">A seguradora considera a idade do principal condutor para calcular o preço.</p>
          </div>
          <div>
            <label htmlFor="auto-policy" className={fieldLabel}>É seguro novo ou renovação?</label>
            <select className="field" id="auto-policy" name="policy" defaultValue="" aria-describedby="auto-policy-purpose" required>
              <option disabled value="">Selecione uma opção</option>
              {Object.entries(autoPolicies).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
            <p className={hint} id="auto-policy-purpose">Na renovação, a equipe pode verificar se você tem direito a bônus.</p>
          </div>
        </fieldset>

        <fieldset hidden={step !== 3} disabled={step !== 3 || isSending} className="space-y-3">
          <p id="auto-contact-purpose" className="text-sm text-ink-500">Usamos seus contatos para enviar as opções e tirar dúvidas sobre este pedido.</p>
          <label className="block">
            <span className={fieldLabel}>Nome completo</span>
            <input name="name" className="field" autoComplete="name" maxLength={120} minLength={2} required />
          </label>
          <label className="block">
            <span className={fieldLabel}>WhatsApp com DDD</span>
            <input
              type="tel"
              name="phone"
              className="field"
              autoComplete="tel-national"
              value={phone}
              onChange={(event) => setPhone(maskPhone(event.target.value))}
              pattern="\(\d{2}\) \d{4,5}-\d{4}"
              aria-describedby="auto-contact-purpose"
              required
            />
          </label>
          <label className="block">
            <span className={fieldLabel}>E-mail (opcional)</span>
            <input name="email" className="field" type="email" autoComplete="email" maxLength={160} />
          </label>
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <input name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <p className={hint}>
            A Fast Secure usa esses dados para preparar a cotação com as seguradoras e retornar seu contato.
            Consulte a <Link href="/privacidade" className="underline">Política de Privacidade</Link>.
          </p>
        </fieldset>

        {notice && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{notice}</p>}
        <div className="mt-5 flex items-center gap-4">
          {step !== 1 && (
            <button type="button" disabled={isSending} onClick={() => goTo(step === 2 ? 1 : 2)} className="flex items-center gap-1.5 text-sm font-semibold text-ink-600 hover:text-ink-900">
              <ArrowLeft className="size-4" aria-hidden="true" /> Voltar
            </button>
          )}
          <button type="submit" className="btn btn-volt flex-1 py-3" disabled={isSending}>
            {isSending ? (
              <><LoaderCircle className="size-5 animate-spin" aria-hidden="true" /> Enviando…</>
            ) : (
              <>{step === 3 ? 'Solicitar cotação' : 'Continuar'} <ArrowRight className="size-5" aria-hidden="true" /></>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
