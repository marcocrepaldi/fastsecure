'use client';

import { useRef, useState } from 'react';

type Delivery = 'received' | 'whatsapp';
type Fields = Record<string, unknown>;

export function maskPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function trackingData() {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid']) {
    const value = params.get(key);
    if (value) utm[key] = value.slice(0, 200);
  }
  return { page: window.location.pathname, referrer: document.referrer.slice(0, 300), utm };
}

export function useLeadSubmission(source: string) {
  const [status, setStatus] = useState<'idle' | 'sending' | Delivery>('idle');
  const [error, setError] = useState<string | null>(null);
  const [waUrl, setWaUrl] = useState<string | null>(null);
  const attempt = useRef<{ payload: string; leadId: string } | null>(null);
  const submitting = useRef(false);

  async function send(fields: Fields) {
    if (submitting.current) return;
    submitting.current = true;
    setError(null);
    setWaUrl(null);
    setStatus('sending');

    try {
      const payload = { ...fields, source, ...trackingData() };
      const serialized = JSON.stringify(payload);
      if (attempt.current?.payload !== serialized) {
        attempt.current = { payload: serialized, leadId: crypto.randomUUID() };
      }

      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, leadId: attempt.current.leadId }),
      });
      const data = await response.json().catch(() => null);
      const manualUrl = typeof data?.whatsappUrl === 'string' ? data.whatsappUrl : null;
      setWaUrl(manualUrl);
      if (!response.ok || !data?.ok) throw new Error(data?.error || 'Não foi possível enviar. Tente novamente.');

      const delivery: unknown = data.delivery;
      if (delivery !== 'received' && !(delivery === 'whatsapp' && manualUrl)) {
        throw new Error('Não conseguimos confirmar o recebimento. Tente novamente.');
      }
      setStatus(delivery);
      return delivery;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado.');
      setStatus('idle');
    } finally {
      submitting.current = false;
    }
  }

  function reset() {
    attempt.current = null;
    setError(null);
    setWaUrl(null);
    setStatus('idle');
  }

  return { status, error, waUrl, send, reset };
}
