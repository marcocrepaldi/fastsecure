'use client';
import React, { useState } from 'react';

export default function LeadFormB2B() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get('name') || ''),
      company: String(fd.get('company') || ''),
      email: String(fd.get('email') || ''),
      phone: String(fd.get('phone') || ''),
      employees: String(fd.get('employees') || ''),
      interest: String(fd.get('interest') || ''),
      source: 'home-b2b',
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
      window.open(data.whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="alert alert-success text-center p-4 p-md-5 rounded-4 border-0">
        <h4 className="fw-bold mb-3">Diagnóstico solicitado! 🎉</h4>
        <p className="mb-4 text-dark">Um especialista entrará em contato em até 1 dia útil para apresentar seu programa de proteção.</p>
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
          <label className="form-label fw-medium">Nome completo</label>
          <input name="name" type="text" className="form-control form-control-lg" placeholder="Seu nome" required />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-medium">Empresa</label>
          <input name="company" type="text" className="form-control form-control-lg" placeholder="Nome da empresa" />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-medium">E-mail corporativo</label>
          <input name="email" type="email" className="form-control form-control-lg" placeholder="voce@empresa.com.br" required />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-medium">Telefone / WhatsApp</label>
          <input name="phone" type="tel" className="form-control form-control-lg" placeholder="(00) 00000-0000" required />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-medium">Nº de colaboradores</label>
          <select name="employees" className="form-select form-select-lg" defaultValue="">
            <option value="" disabled>Selecione</option>
            <option>1 a 50</option>
            <option>51 a 200</option>
            <option>201 a 500</option>
            <option>500+</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-medium">Interesse principal</label>
          <select name="interest" className="form-select form-select-lg" defaultValue="">
            <option value="" disabled>Selecione</option>
            <option>Benefícios para colaboradores</option>
            <option>Patrimônio e operação</option>
            <option>Responsabilidade e compliance</option>
            <option>Sucessão e investimentos</option>
            <option>Seguros para pessoa física</option>
          </select>
        </div>
        {error && (
          <div className="col-12">
            <div className="alert alert-danger mb-0 py-2">{error}</div>
          </div>
        )}
        <div className="col-12 mt-3">
          <button type="submit" className="btn btn-primary btn-lg px-5 w-100 w-md-auto hero-btn-primary" disabled={loading}>
            {loading ? 'Enviando...' : 'Solicitar diagnóstico gratuito'}
          </button>
          <p className="text-muted small mt-3 mb-0">Ao enviar, você concorda em ser contatado pela equipe Fast Secure. Seus dados estão protegidos conforme a LGPD.</p>
        </div>
      </div>
    </form>
  );
}
