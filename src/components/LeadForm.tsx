'use client';
import React, { useState } from 'react';

interface LeadFormProps {
  defaultProduct?: string;
}

export default function LeadForm({ defaultProduct = '' }: LeadFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      phone: String(fd.get('phone') || ''),
      product: String(fd.get('product') || ''),
      source: 'product-page',
    };

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Não foi possível enviar. Tente novamente.');
      }
      setWhatsappUrl(data.whatsappUrl);
      setSuccess(true);
      // Abre o WhatsApp com a mensagem pronta.
      window.open(data.whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="alert alert-success text-center p-5 rounded-4 border-0 shadow-sm">
        <h4 className="fw-bold mb-3">Solicitação Recebida! 🎉</h4>
        <p className="mb-4">Um de nossos especialistas entrará em contato em breve com as melhores propostas para você.</p>
        {whatsappUrl && (
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-success btn-lg px-4">
            Continuar no WhatsApp
          </a>
        )}
      </div>
    );
  }

  return (
    <form className="text-start" onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label fw-medium">Nome Completo</label>
          <input name="name" type="text" className="form-control form-control-lg" placeholder="Seu nome" required />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-medium">Email</label>
          <input name="email" type="email" className="form-control form-control-lg" placeholder="seu@email.com" required />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-medium">Telefone / WhatsApp</label>
          <input name="phone" type="tel" className="form-control form-control-lg" placeholder="(00) 00000-0000" required />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-medium">Produto de Interesse</label>
          <select name="product" className="form-select form-select-lg" defaultValue={defaultProduct} required>
            <option value="" disabled>Selecione um produto</option>
            <option value="Seguro Auto">Seguro Auto</option>
            <option value="Plano de Saúde">Plano de Saúde</option>
            <option value="Seguro de Vida">Seguro de Vida</option>
            <option value="Seguro Celular">Seguro de Equipamentos / Celular</option>
            <option value="Consórcio">Consórcio</option>
            <option value="Investimentos">Investimentos</option>
            <option value="Outros">Outros Seguros</option>
          </select>
        </div>
        {error && (
          <div className="col-12">
            <div className="alert alert-danger mb-0 py-2">{error}</div>
          </div>
        )}
        <div className="col-12 mt-4 text-center">
          <button type="submit" className="btn btn-primary btn-lg px-5 hero-btn-primary" disabled={loading}>
            {loading ? 'Enviando...' : 'Solicitar Cotação Gratuita'}
          </button>
        </div>
      </div>
    </form>
  );
}
