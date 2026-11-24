import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FlaskConical,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Clock,
  Sparkles,
  HelpCircle,
  FileCheck,
  Building2,
  CalendarCheck,
} from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import FloatingActions from '@/components/floating-actions';
import Exams from '@/components/exams';
import { clinic } from '@/data/clinic';

export const metadata: Metadata = {
  title: 'Exames Laboratoriais e Diagnósticos em Montes Claros | Núcleo de Saúde Mais',
  description:
    'Exames de sangue, bioquímicos, ultrassonografia, eletrocardiograma, audiometria, exames ocupacionais e toxicológicos no Centro de Montes Claros – MG.',
};

const examAdvantages = [
  {
    icon: Clock,
    title: 'Resultados Ágeis e Confiáveis',
    desc: 'Controle rigoroso de qualidade com laudos rápidos. Diversos testes laboratoriais com liberação no mesmo dia.',
  },
  {
    icon: ShieldCheck,
    title: 'Mais de 500 Tipos de Exames',
    desc: 'Do hemograma de rotina à ultrassonografia detalhada, passando por exames cardiológicos, ocupacionais e toxicológicos.',
  },
  {
    icon: Sparkles,
    title: 'Coleta Humanizada e Confortável',
    desc: 'Equipe de enfermagem e biomédicos treinados para coleta delicada em adultos, crianças e idosos com máxima atenção.',
  },
  {
    icon: FileCheck,
    title: 'Resultados Online e WhatsApp',
    desc: 'Praticidade total para acessar seus laudos diretamente pelo celular ou computador sem precisar se deslocar novamente.',
  },
];

const prepGuidelines = [
  {
    title: 'Exames de Sangue e Bioquímica',
    desc: 'A maioria dos exames de rotina (como glicemia e colesterol) exige jejum de 8 a 12 horas. Água pura em quantidade moderada é sempre permitida. Pergunte sobre medicamentos de uso contínuo.',
  },
  {
    title: 'Ultrassonografia Abdominal Total',
    desc: 'Requer jejum de 6 a 8 horas para visualização adequada da vesícula biliar e retenção de urina (bexiga cheia) para avaliação da pelve e vias urinárias.',
  },
  {
    title: 'Ultrassonografia Pélvica / Vias Urinárias',
    desc: 'Bexiga confortavelmente cheia (beber cerca de 4 a 6 copos de água 1 hora antes do exame e não urinar até a realização).',
  },
  {
    title: 'Exames Cardiológicos (ECG, Holter, MAPA)',
    desc: 'Evitar cremes ou óleos na pele do tórax no dia do exame para fixação dos eletrodos. Usar roupas confortáveis e com botões frontais.',
  },
];

const faqs = [
  {
    q: 'Preciso agendar previamente os exames de sangue?',
    a: 'Para a maioria dos exames de sangue e laboratoriais de rotina, o atendimento é por ordem de chegada no período da manhã (a partir das 07h). Para ultrassonografias e exames cardiológicos, recomendamos o agendamento prévio.',
  },
  {
    q: 'Posso beber água durante o período de jejum?',
    a: 'Sim! Água pura e em quantidade moderada não quebra o jejum para a grande maioria dos exames de sangue. Evite apenas café, chás, sucos, balas ou refrigerantes.',
  },
  {
    q: 'Atendem convênios médicos para exames?',
    a: 'Sim, atendemos ampla rede de convênios médicos e oferecemos também tabela particular acessível com facilidade de pagamento no cartão e PIX.',
  },
  {
    q: 'Como recebo os resultados dos meus exames?',
    a: 'Você pode retirar o laudo impresso na recepção da clínica ou solicitar o envio prático do laudo em PDF via WhatsApp e plataforma online.',
  },
];

export default function ExamesPage() {
  const whatsappHref = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
    'Olá! Gostaria de consultar informações e agendar exames no Núcleo de Saúde Mais.'
  )}`;

  return (
    <div className="clinic-app-wrapper">
      <Header activeSection="exames" />

      <main id="main-content">
        {/* Subpage Hero */}
        <section className="subpage-hero">
          <div className="site-container subpage-hero-container">
            <nav className="subpage-breadcrumb" aria-label="Navegação estrutural">
              <Link href="/">Início</Link>
              <span className="subpage-breadcrumb-separator">/</span>
              <span>Exames Diagnósticos</span>
            </nav>

            <div className="subpage-badge">
              <FlaskConical size={14} className="text-teal" />
              <span>LABORATÓRIO & DIAGNÓSTICO INTEGRADO</span>
            </div>

            <h1 className="subpage-title">
              Exames Laboratoriais e Diagnósticos em Montes Claros
            </h1>

            <p className="subpage-subtitle">
              Mais de 500 exames laboratoriais, de imagem, cardiológicos e ocupacionais com controle
              rigoroso de qualidade, agilidade na liberação de laudos e atendimento acolhedor.
            </p>

            <div className="subpage-tags-strip">
              <span className="subpage-tag-chip">
                <Clock size={14} /> Laudos Rápidos
              </span>
              <span className="subpage-tag-chip">
                <ShieldCheck size={14} /> Rigoroso Controle de Qualidade
              </span>
              <span className="subpage-tag-chip">
                <FileCheck size={14} /> Resultados Online
              </span>
              <span className="subpage-tag-chip">
                <Building2 size={14} /> Centro de Montes Claros
              </span>
            </div>

            <div className="subpage-actions">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-teal btn-lg"
              >
                <MessageCircle size={18} />
                <span>Consultar exame pelo WhatsApp</span>
                <ArrowRight size={16} />
              </a>

              <a href="#catalogo" className="btn btn-outline-white btn-lg">
                <span>Ver categorias de exames</span>
              </a>
            </div>
          </div>
        </section>

        {/* Vantagens */}
        <section className="section bg-white">
          <div className="site-container">
            <div className="section-kicker">
              <span className="kicker-line" />
              <span>POR QUE FAZER SEUS EXAMES CONOSCO</span>
            </div>
            <h2 className="section-title">Tecnologia, Agilidade e Precisão</h2>
            <p className="section-subtitle">
              Combinamos equipamentos modernos e equipe experiente para entregar diagnósticos seguros no menor tempo possível.
            </p>

            <div className="subpage-cards-grid">
              {examAdvantages.map((adv) => {
                const Icon = adv.icon;
                return (
                  <div key={adv.title} className="subpage-card">
                    <div className="subpage-card-icon">
                      <Icon size={24} />
                    </div>
                    <h3 className="subpage-card-title">{adv.title}</h3>
                    <p className="subpage-card-desc">{adv.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Componente Interativo Completo de Exames */}
        <div id="catalogo">
          <Exams />
        </div>

        {/* Orientações de Preparo */}
        <section className="section bg-white">
          <div className="site-container">
            <div className="section-kicker">
              <span className="kicker-line" />
              <span>INFORMAÇÕES ÚTEIS</span>
            </div>
            <h2 className="section-title">Orientações de Preparo para Exames</h2>
            <p className="section-subtitle">
              O preparo correto garante resultados fidedignos e evita a necessidade de repetição de coletas.
            </p>

            <div className="subpage-cards-grid">
              {prepGuidelines.map((prep) => (
                <div key={prep.title} className="subpage-card">
                  <h3 className="subpage-card-title">{prep.title}</h3>
                  <p className="subpage-card-desc">{prep.desc}</p>
                </div>
              ))}
            </div>

            <div className="subpage-cta-banner">
              <div>
                <h3>Tem dúvidas sobre o preparo do seu exame específico?</h3>
                <p>
                  Envie sua guia ou pedido médico pelo WhatsApp para receber todas as instruções detalhadas de jejum e horários de coleta.
                </p>
              </div>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-teal btn-lg"
              >
                <MessageCircle size={18} />
                <span>Enviar pedido pelo WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Exames */}
        <section className="section bg-neutral">
          <div className="site-container" style={{ maxWidth: '900px' }}>
            <div className="section-kicker text-center" style={{ justifyContent: 'center' }}>
              <span className="kicker-line" />
              <span>DÚVIDAS FREQUENTES</span>
              <span className="kicker-line" />
            </div>
            <h2 className="section-title text-center">Perguntas sobre Exames Laboratoriais</h2>

            <div style={{ marginTop: '36px' }}>
              {faqs.map((faq) => (
                <div key={faq.q} className="subpage-faq-box">
                  <h3 className="subpage-faq-question">
                    <HelpCircle size={18} className="text-teal flex-shrink-0" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="subpage-faq-answer">{faq.a}</p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-teal btn-md"
              >
                <MessageCircle size={18} />
                <span>Consultar outro exame no WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}
