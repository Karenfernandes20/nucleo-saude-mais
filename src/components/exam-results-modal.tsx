'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  FileText,
  Lock,
  Key,
  UserCheck,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  MessageCircle,
  Eye,
  EyeOff,
  ExternalLink,
} from 'lucide-react';
import { clinic } from '@/data/clinic';

interface ExamResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExamResultsModal({ isOpen, onClose }: ExamResultsModalProps) {
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [chave, setChave] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('paciente');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const whatsappDuvidasHref = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
    'Olá! Preciso de ajuda com a chave ou senha para acessar meus resultados de exames no Núcleo de Saúde Mais.'
  )}`;

  return createPortal(
    <div
      className="exam-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exam-modal-title"
    >
      <div className="exam-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="exam-modal-close-btn"
          aria-label="Fechar janela"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="exam-modal-header">
          <div className="exam-modal-icon-badge">
            <FileText size={24} className="text-teal" />
          </div>
          <span className="exam-modal-kicker">PORTAL DE LAUDOS ONLINE</span>
          <h2 id="exam-modal-title" className="exam-modal-title">
            Resultado de Exames
          </h2>
          <p className="exam-modal-subtitle">
            Informe a chave e a senha presentes no seu comprovante de atendimento laboratorial para visualizar e baixar seus laudos.
          </p>
        </div>

        {/* WorkLab Official Integration Form */}
        <form
          method="post"
          target="_blank"
          action="https://portal.worklabweb.com.br/resultados/2909"
          className="exam-modal-form"
        >
          {/* Campo CHAVE (tbCodigo) */}
          <div className="exam-form-group">
            <label htmlFor="modal-tbCodigo" className="exam-form-label">
              <span>Chave de Acesso (Protocolo)</span>
            </label>
            <div className="exam-input-wrapper">
              <Key size={17} className="exam-input-icon" />
              <input
                id="modal-tbCodigo"
                name="tbCodigo"
                type="text"
                maxLength={16}
                value={chave}
                onChange={(e) => setChave(e.target.value)}
                placeholder="Digite a chave do comprovante"
                required
                className="form-result exam-form-input"
                autoComplete="off"
              />
            </div>
            <span className="exam-field-hint">Código numérico impresso na sua guia de coleta.</span>
          </div>

          {/* Campo SENHA (tbSenha) */}
          <div className="exam-form-group">
            <label htmlFor="modal-tbSenha" className="exam-form-label">
              <span>Senha de Acesso</span>
            </label>
            <div className="exam-input-wrapper">
              <Lock size={17} className="exam-input-icon" />
              <input
                id="modal-tbSenha"
                name="tbSenha"
                type={showPassword ? 'text' : 'password'}
                maxLength={16}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite a senha"
                required
                className="form-result exam-form-input"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="exam-toggle-password-btn"
                aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Campo PERFIL (rdbOpcao) */}
          <div className="exam-form-group">
            <label htmlFor="modal-rdbOpcao" className="exam-form-label">
              <span>Perfil de Acesso</span>
            </label>
            <div className="exam-input-wrapper">
              <UserCheck size={17} className="exam-input-icon" />
              <select
                id="modal-rdbOpcao"
                name="rdbOpcao"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="form-result exam-form-select"
              >
                <option value="paciente">Paciente</option>
                <option value="medico">Médico</option>
                <option value="convenio">Convênio</option>
                <option value="unidade">Unidade</option>
              </select>
            </div>
          </div>

          {/* Botão de Envio (form-enviar) */}
          <div className="exam-form-submit-row">
            <button
              type="submit"
              className="form-enviar exam-submit-btn"
            >
              <span>Consultar Resultados</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </form>

        {/* Security & Support Note */}
        <div className="exam-modal-footer">
          <div className="exam-security-badge">
            <ShieldCheck size={16} className="text-teal" />
            <span>Ambiente seguro e criptografado WorkLab Web</span>
          </div>

          <div className="exam-help-box">
            <HelpCircle size={15} className="text-teal flex-shrink-0" />
            <span>
              Perdeu sua chave ou senha?{' '}
              <a
                href={whatsappDuvidasHref}
                target="_blank"
                rel="noopener noreferrer"
                className="exam-help-link"
              >
                Fale com a equipe no WhatsApp <ExternalLink size={12} className="inline-icon" />
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
