import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText,
  Lock,
  Key,
  UserCheck,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  MessageCircle,
  CheckCircle2,
  ExternalLink,
  Clock,
  Download,
} from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import FloatingActions from '@/components/floating-actions';
import { clinic } from '@/data/clinic';

export const metadata: Metadata = {
  title: 'Resultado de Exames Online | Núcleo de Saúde Mais - Montes Claros',
  description:
    'Consulte e baixe seus laudos de exames laboratoriais online no Núcleo de Saúde Mais via portal WorkLab Web. Rápido, seguro e disponível 24 horas por dia.',
};

export default function ResultadoExamesPage() {
  const whatsappHref = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
    'Olá! Preciso de ajuda para consultar meu resultado de exames no site do Núcleo de Saúde Mais.'
  )}`;

  return (
    <div className="clinic-app-wrapper">
      <Header activeSection="resultado-exames" />

      <main id="main-content">
        {/* Hero da Página de Resultados */}
        <section className="subpage-hero">
          <div className="site-container subpage-hero-container">
            <nav className="subpage-breadcrumb" aria-label="Navegação estrutural">
              <Link href="/">Início</Link>
              <span className="subpage-breadcrumb-separator">/</span>
              <span>Resultado de Exames</span>
            </nav>

            <div className="subpage-badge">
              <FileText size={14} className="text-teal" />
              <span>PORTAL DO PACIENTE E DO MÉDICO</span>
            </div>

            <h1 className="subpage-title">
              Consulte seus Resultados de Exames Online
            </h1>

            <p className="subpage-subtitle">
              Acesse seus laudos laboratoriais com agilidade, privacidade e segurança. Disponível 24 horas
              por dia para pacientes, médicos assistentes e convênios parceiros.
            </p>
          </div>
        </section>

        {/* Seção Principal com o Formulário WorkLab Integrado */}
        <section className="section bg-neutral" style={{ padding: '60px 0 80px' }}>
          <div className="site-container">
            <div className="results-portal-grid">
              {/* Card Central com o Formulário */}
              <div className="results-form-card">
                <div className="results-card-header">
                  <div className="results-card-icon">
                    <FileText size={28} />
                  </div>
                  <h2>Acesse seus Laudos</h2>
                  <p>
                    Preencha os dados do seu protocolo de atendimento fornecido no momento da coleta.
                  </p>
                </div>

                {/* Formulário Oficial WorkLab */}
                <form
                  method="post"
                  target="_blank"
                  action="https://portal.worklabweb.com.br/resultados/2909"
                  className="results-dedicated-form"
                >
                  <div className="exam-form-group">
                    <label htmlFor="page-tbCodigo" className="exam-form-label">
                      <span>Chave de Acesso (Protocolo)</span>
                    </label>
                    <div className="exam-input-wrapper">
                      <Key size={18} className="exam-input-icon" />
                      <input
                        id="page-tbCodigo"
                        name="tbCodigo"
                        type="text"
                        maxLength={16}
                        placeholder="Ex: 12345678"
                        required
                        className="form-result exam-form-input"
                        autoComplete="off"
                      />
                    </div>
                    <span className="exam-field-hint">
                      Código numérico informado na sua guia de atendimento.
                    </span>
                  </div>

                  <div className="exam-form-group">
                    <label htmlFor="page-tbSenha" className="exam-form-label">
                      <span>Senha de Acesso</span>
                    </label>
                    <div className="exam-input-wrapper">
                      <Lock size={18} className="exam-input-icon" />
                      <input
                        id="page-tbSenha"
                        name="tbSenha"
                        type="password"
                        maxLength={16}
                        placeholder="Digite sua senha"
                        required
                        className="form-result exam-form-input"
                        autoComplete="current-password"
                      />
                    </div>
                    <span className="exam-field-hint">
                      Senha temporária cadastrada na recepção.
                    </span>
                  </div>

                  <div className="exam-form-group">
                    <label htmlFor="page-rdbOpcao" className="exam-form-label">
                      <span>Perfil de Acesso</span>
                    </label>
                    <div className="exam-input-wrapper">
                      <UserCheck size={18} className="exam-input-icon" />
                      <select
                        id="page-rdbOpcao"
                        name="rdbOpcao"
                        defaultValue="paciente"
                        className="form-result exam-form-select"
                      >
                        <option value="paciente">Paciente</option>
                        <option value="medico">Médico</option>
                        <option value="convenio">Convênio</option>
                        <option value="unidade">Unidade</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginTop: '28px' }}>
                    <button
                      type="submit"
                      className="form-enviar btn btn-teal btn-lg"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <span>Consultar Resultados</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </form>

                <div className="results-card-footer">
                  <div className="results-security-row">
                    <ShieldCheck size={17} className="text-teal flex-shrink-0" />
                    <span>Conexão criptografada de alta segurança via WorkLab Web</span>
                  </div>
                </div>
              </div>

              {/* Coluna Lateral de Apoio e Orientações */}
              <div className="results-sidebar-info">
                {/* Onde encontrar */}
                <div className="results-info-card">
                  <h3 className="results-info-title">
                    <HelpCircle size={20} className="text-teal" />
                    <span>Onde encontrar minha chave e senha?</span>
                  </h3>
                  <p>
                    A chave e a senha são fornecidas no comprovante impresso entregue pela nossa equipe na
                    recepção no dia da realização dos seus exames laboratoriais.
                  </p>
                  <ul className="results-info-list">
                    <li>
                      <CheckCircle2 size={16} className="text-teal flex-shrink-0" />
                      <span><strong>Chave:</strong> código de identificação do pedido.</span>
                    </li>
                    <li>
                      <CheckCircle2 size={16} className="text-teal flex-shrink-0" />
                      <span><strong>Senha:</strong> código numérico ou alfanumérico confidencial.</span>
                    </li>
                  </ul>
                </div>

                {/* Vantagens */}
                <div className="results-info-card">
                  <h3 className="results-info-title">
                    <Download size={20} className="text-teal" />
                    <span>Facilidades do Portal Online</span>
                  </h3>
                  <ul className="results-info-list">
                    <li>
                      <Clock size={16} className="text-teal flex-shrink-0" />
                      <span>Acesso 24 horas por dia, 7 dias por semana.</span>
                    </li>
                    <li>
                      <CheckCircle2 size={16} className="text-teal flex-shrink-0" />
                      <span>Download de laudos em formato PDF assinado digitalmente.</span>
                    </li>
                    <li>
                      <CheckCircle2 size={16} className="text-teal flex-shrink-0" />
                      <span>Histórico organizado para acompanhamento médico.</span>
                    </li>
                  </ul>
                </div>

                {/* Ajuda WhatsApp */}
                <div className="results-help-card">
                  <h4>Precisa de ajuda com seus resultados?</h4>
                  <p>
                    Caso não encontre seu comprovante ou tenha dificuldades com o acesso, fale diretamente
                    com a nossa recepção pelo WhatsApp.
                  </p>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-white btn-md"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <MessageCircle size={17} />
                    <span>Falar com o laboratório</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}
