export const AUTO_QUOTE_SOURCE = 'auto-quote';

export const autoUses = {
  particular: 'Particular ou lazer',
  deslocamento: 'Ida ao trabalho ou estudo',
  profissional: 'Trabalho ou entregas',
  aplicativo: 'Aplicativo de transporte ou táxi',
} as const;

export const autoPolicies = {
  novo: 'Seguro novo',
  renovacao: 'Renovação',
  desconhecido: 'Não sei',
} as const;

type Vehicle =
  | { kind: 'plate'; plate: string }
  | { kind: 'model'; make: string; model: string; version: string; modelYear: string };

export type AutoQuote = {
  vehicle: Vehicle;
  overnightCep: string;
  use: keyof typeof autoUses;
  driverBirthDate: string;
  policy: keyof typeof autoPolicies;
};

type Result<T> = { value: T; error?: never } | { value?: never; error: string };

function fields(input: unknown): Record<string, unknown> {
  return input && typeof input === 'object' && !Array.isArray(input) ? input as Record<string, unknown> : {};
}

function shortText(value: unknown) {
  return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ').slice(0, 80) : '';
}

function ageOn(birthDate: string, today: Date) {
  const [year, month, day] = birthDate.split('-').map(Number);
  const birthdayPending = today.getUTCMonth() + 1 < month ||
    (today.getUTCMonth() + 1 === month && today.getUTCDate() < day);
  return today.getUTCFullYear() - year - Number(birthdayPending);
}

export function parseAutoVehicle(input: unknown, now = new Date()): Result<Pick<AutoQuote, 'vehicle' | 'overnightCep'>> {
  const { vehicle, overnightCep: rawCep } = fields(input);
  const values = fields(vehicle);
  const postalCode = shortText(rawCep);
  if (!/^\d{5}-?\d{3}$/.test(postalCode) || /^0{5}-?0{3}$/.test(postalCode)) {
    return { error: 'Informe o CEP de 8 dígitos de onde o carro passa a noite.' };
  }
  const overnightCep = postalCode.replace('-', '');

  if (values.kind === 'plate') {
    const plate = shortText(values.plate).toUpperCase().replace(/[- ]/g, '');
    return /^[A-Z]{3}\d[0-9A-Z]\d{2}$/.test(plate)
      ? { value: { vehicle: { kind: 'plate', plate }, overnightCep } }
      : { error: 'Informe uma placa válida ou escolha informar o modelo do carro.' };
  }

  const make = shortText(values.make);
  const model = shortText(values.model);
  const version = shortText(values.version);
  const modelYear = shortText(values.modelYear);
  if (values.kind !== 'model' || !make || !model || !version || !/^\d{4}$/.test(modelYear) ||
      Number(modelYear) < 1886 || Number(modelYear) > now.getUTCFullYear() + 2) {
    return { error: 'Informe a marca, o modelo, a versão e um ano-modelo válido.' };
  }
  return { value: { vehicle: { kind: 'model', make, model, version, modelYear }, overnightCep } };
}

export function parseAutoQuote(input: unknown, now = new Date()): Result<AutoQuote> {
  const data = fields(input);
  const vehicleData = parseAutoVehicle(data, now);
  if (!vehicleData.value) return vehicleData;

  const use = shortText(data.use) as keyof typeof autoUses;
  const policy = shortText(data.policy) as keyof typeof autoPolicies;
  if (!Object.hasOwn(autoUses, use) || !Object.hasOwn(autoPolicies, policy)) {
    return { error: 'Informe como você usa o carro e se é seguro novo ou renovação.' };
  }

  const driverBirthDate = shortText(data.driverBirthDate);
  const date = new Date(driverBirthDate);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(driverBirthDate) || !Number.isFinite(date.getTime()) ||
      date.toISOString().slice(0, 10) !== driverBirthDate || date.getUTCFullYear() < 1900 || ageOn(driverBirthDate, now) < 0) {
    return { error: 'Informe uma data de nascimento válida do principal condutor.' };
  }
  return { value: { ...vehicleData.value, use, driverBirthDate, policy } };
}

export function autoQuoteNotice(quote: AutoQuote, now = new Date()) {
  const { vehicle, overnightCep } = quote;
  const car = vehicle.kind === 'plate'
    ? vehicle.plate
    : [vehicle.make, vehicle.model, vehicle.version, vehicle.modelYear].join(' ');
  return [
    '',
    `Veículo: ${car}`,
    `CEP de pernoite: ${overnightCep.slice(0, 5)}-${overnightCep.slice(5)}`,
    `Uso: ${autoUses[quote.use]}`,
    `Idade do principal condutor: ${ageOn(quote.driverBirthDate, now)} anos`,
    `Situação: ${autoPolicies[quote.policy]}`,
  ].join('\n');
}
