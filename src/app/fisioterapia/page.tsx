import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Activity,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Heart,
  Sparkles,
  HelpCircle,
  Clock,
  UserCheck,
  Award,
  Bone,
} from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import FloatingActions from '@/components/floating-actions';
import { clinic } from '@/data/clinic';

export const metadata: Metadata = {
  title: 'Fisioterapia e Reabilitação em Montes Claros | Núcleo de Saúde Mais',
  description:
    'Fisioterapia ortopédica, esportiva, tratamento de coluna, dores crônicas, reabilitação funcional e geriatria no Centro de Montes Claros – MG.',
};

const rehabModalities = [
  {
    id: 'ortopedica-trauma',
    title: 'Fisioterapia Ortopédica e Traumatológica',
    badge: 'Ortopedia',
    desc: 'Recuperação intensiva de pós-operatórios (ligamentos cruzados, meniscos, próteses de quadril e joelho), fraturas, luxações, bursites, tendinites e lesões osteomusculares.',
    highlights: ['Pós-operatório de ligamentos e próteses', 'Tratamento de bursites e tendinites', 'Recuperação de fraturas e entorses'],
  },
  {
    id: 'coluna-dores',
    title: 'Tratamento da Coluna e Alívio de Dores',
    badge: 'Coluna Vertebral',
    desc: 'Protocolos voltados ao alívio e controle de hérnias de disco, lombalgias, cervicalgias, ciática e dores crônicas, atuando na causa biomecânica e descompressão neural.',
    highlights: ['Hérnia de disco e ciatalgia', 'Lombalgias agudas e crônicas', 'Terapia manual e descompressão'],
  },
  {
    id: 'esportiva',
    title: 'Fisioterapia Esportiva e Performance',
    badge: 'Esportes',
    desc: 'Atendimento direcionado para praticantes de atividade física e atletas. Foco em reabilitação rápida e retorno seguro ao esporte (return to play), prevenindo recidivas.',
    highlights: ['Lesões musculares e articulares', 'Fortalecimento preventivo', 'Retorno seguro ao esporte'],
  },
  {
    id: 'gerontologia-mobilidade',
    title: 'Fisioterapia Geriátrica e Mobilidade',
    badge: 'Melhor Idade',
    desc: 'Treinamento de equilíbrio, fortalecimento muscular funcional, prevenção de quedas e manutenção da autonomia para idosos, promovendo longevidade ativa.',
    highlights: ['Prevenção de quedas e equilíbrio', 'Manutenção da autonomia', 'Fortalecimento seguro'],
  },
  {
    id: 'neurologica',
    title: 'Reabilitação Neurológica',
    badge: 'Neuroreabilitação',
    desc: 'Acompanhamento individualizado para pacientes com sequelas de AVC, Doença de Parkinson, esclerose e neuropatias periféricas, estimulando a neuroplasticidade e coordenação motora.',
    highlights: ['Recuperação pós-AVC', 'Suporte para Parkinson', 'Treino de marcha e coordenação'],
  },
  {
    id: 'respiratoria',
    title: 'Fisioterapia Respiratória e Postural',
    badge: 'Reeducação Postural',
    desc: 'Exercícios terapêuticos de expansão pulmonar e alinhamento biomecânico para desvios posturais (escoliose, hipercifose) e alívio de tensões de rotina de trabalho.',
    highlights: ['Reeducação postural global', 'Exercícios de expansão torácica', 'Alívio de sobrecargas ergonômicas'],
  },
];

const treatmentStages = [
  {
    num: '01',
    title: 'Avaliação Individualizada',
    desc: 'Análise detalhada de amplitude de movimento, força muscular, postura, marcha e testes ortopédicos específicos para o seu caso.',
  },
  {
    num: '02',
    title: 'Plano Terapêutico Sob Medida',
    desc: 'Elaboração de um plano com metas realistas, combinando terapia manual, exercícios ativos e recursos modernos.',
  },
  {
    num: '03',
    title: 'Sessões Focadas e Acolhedoras',
    desc: 'Atendimento com atenção contínua do profissional, sem pressa e ajustado ao seu nível de dor e evolução.',
  },
  {
    num: '04',
    title: 'Reavaliação e Alta Funcional',
    desc: 'Consolidação dos ganhos, prevenção de recidivas e orientações de autocuidado e postura para o seu dia a dia.',
  },
];

const faqs = [
  {
    q: 'Preciso de encaminhamento médico para iniciar a fisioterapia?',
    a: 'Você pode passar por uma avaliação fisioterapêutica diretamente com nossos profissionais. No entanto, se você já possui encaminhamento, raio-x ou ressonância do seu médico, traga-os na primeira sessão para enriquecer a conduta.',
  },
  {
    q: 'Quantas sessões de fisioterapia são necessárias?',
    a: 'O número varia conforme o tipo de lesão, tempo de evolução da dor e resposta individual do organismo. Após a primeira avaliação, o fisioterapeuta estima um cronograma claro com reavaliações periódicas.',
  },
  {
    q: 'A fisioterapia ajuda no tratamento de hérnia de disco sem cirurgia?',
    a: 'Sim! A imensa maioria dos casos de hérnia de disco melhora substancialmente com tratamento conservador fisioterapêutico, diminuindo a inflamação, descomprimindo a raiz nervosa e fortalecendo a musculatura estabilizadora da coluna.',
  },
  {
    q: 'Como funciona o agendamento da avaliação?',
    a: 'O agendamento é rápido e prático pelo WhatsApp ou telefone da clínica. Nossa equipe verifica o melhor horário para sua rotina, com atendimento de segunda a sexta-feira.',
  },
];

export default function FisioterapiaPage() {
  const whatsappHref = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
    'Olá! Gostaria de agendar uma avaliação de Fisioterapia no Núcleo de Saúde Mais.'
  )}`;

  return (
    <div className="clinic-app-wrapper">
      <Header activeSection="fisioterapia" />

      <main id="main-content">
        {/* Hero da Página de Fisioterapia */}
        <section className="subpage-hero">
          <div className="site-container subpage-hero-container">
            <nav className="subpage-breadcrumb" aria-label="Navegação estrutural">
              <Link href="/">Início</Link>
              <span className="subpage-breadcrumb-separator">/</span>
              <span>Fisioterapia e Reabilitação</span>
            </nav>

            <div className="subpage-badge">
              <Activity size={14} className="text-teal" />
              <span>REABILITAÇÃO FUNCIONAL & QUALIDADE DE VIDA</span>
            </div>

            <h1 className="subpage-title">
              Fisioterapia Especializada e Reabilitação em Montes Claros
            </h1>

            <p className="subpage-subtitle">
              Alívio de dores, recuperação de movimentos e fortalecimento físico. Cuidado humanizado,
              profissionais qualificados e planos de tratamento 100% individualizados no Centro de Montes Claros.
            </p>

            <div className="subpage-tags-strip">
              <span className="subpage-tag-chip">
                <UserCheck size={14} /> Atendimento Individual
              </span>
              <span className="subpage-tag-chip">
                <ShieldCheck size={14} /> Fisioterapeutas Qualificados
              </span>
              <span className="subpage-tag-chip">
                <Award size={14} /> Estrutura Completa
              </span>
              <span className="subpage-tag-chip">
                <Clock size={14} /> Horários Flexíveis
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
                <span>Agendar avaliação fisioterapêutica</span>
                <ArrowRight size={16} />
              </a>

              <a href="#tratamentos" className="btn btn-outline-white btn-lg">
                <span>Conhecer tratamentos</span>
              </a>
            </div>
          </div>
        </section>

        {/* Áreas de Atuação */}
        <section id="tratamentos" className="section subpage-section subpage-section-has-banner bg-white">
          <div className="site-container">
            <div className="section-kicker">
              <span className="kicker-line" />
              <span>MODALIDADES TERAPÊUTICAS</span>
            </div>
            <h2 className="section-title">Nossas Especialidades em Reabilitação</h2>
            <p className="section-subtitle">
              Abordagem clínica integrada para aliviar dores, restaurar funções e devolver sua liberdade de movimento.
            </p>

            <div className="subpage-cards-grid">
              {rehabModalities.map((mod) => (
                <article key={mod.id} className="subpage-card">
                  <div className="badge-chip" style={{ width: 'fit-content', marginBottom: '14px' }}>
                    {mod.badge}
                  </div>
                  <h3 className="subpage-card-title">{mod.title}</h3>
                  <p className="subpage-card-desc">{mod.desc}</p>
                  <ul style={{ paddingLeft: '18px', marginBottom: '20px', fontSize: '0.84375rem', color: '#0C4463' }}>
                    {mod.highlights.map((h) => (
                      <li key={h} style={{ marginBottom: '6px' }}>{h}</li>
                    ))}
                  </ul>
                  <a
                    href={`https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
                      `Olá! Gostaria de agendar atendimento de ${mod.title}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-navy btn-sm"
                    style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }}
                  >
                    <MessageCircle size={15} />
                    <span>Agendar para esta área</span>
                  </a>
                </article>
              ))}
            </div>

            {/* Banner de CTA */}
            <div className="subpage-cta-banner">
              <div>
                <h3>Está sofrendo com dores musculares, nas costas ou articulações?</h3>
                <p>
                  Não deixe a dor limitar o seu dia a dia. Agende uma avaliação com nossa equipe e comece seu plano de recuperação.
                </p>
              </div>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-teal btn-lg"
              >
                <MessageCircle size={18} />
                <span>Agendar minha avaliação</span>
              </a>
            </div>
          </div>
        </section>

        {/* Como Funciona o Tratamento */}
        <section className="section subpage-section subpage-section-after-banner bg-neutral">
          <div className="site-container">
            <div className="section-kicker">
              <span className="kicker-line" />
              <span>ETAPAS DO TRATAMENTO</span>
            </div>
            <h2 className="section-title">Como funciona o seu acompanhamento?</h2>
            <p className="section-subtitle">
              Metodologia estruturada que prioriza a causa raiz do problema e garante segurança em cada sessão.
            </p>

            <div className="subpage-step-grid">
              {treatmentStages.map((st) => (
                <div key={st.num} className="subpage-step-card">
                  <div className="subpage-step-number">{st.num}</div>
                  <h3 className="subpage-step-title">{st.title}</h3>
                  <p className="subpage-step-desc">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Fisioterapia */}
        <section className="section subpage-section bg-white">
          <div className="site-container" style={{ maxWidth: '900px' }}>
            <div className="section-kicker text-center" style={{ justifyContent: 'center' }}>
              <span className="kicker-line" />
              <span>PERGUNTAS FREQUENTES</span>
              <span className="kicker-line" />
            </div>
            <h2 className="section-title text-center">Dúvidas Frequentes sobre Fisioterapia</h2>

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
                <span>Falar com o setor de Fisioterapia</span>
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
