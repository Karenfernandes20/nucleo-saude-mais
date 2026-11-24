import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Activity,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Heart,
  Sparkles,
  HelpCircle,
  UserCheck,
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
        <section className="subpage-hero fisioterapia-hero-section">
          <div className="fisioterapia-hero-container">
            <div className="fisioterapia-hero-grid">
              <div className="fisioterapia-hero-content">
                <div className="fisioterapia-hero-badge"><span>FISIOTERAPIA E REABILITAÇÃO</span></div>
                <h1 className="fisioterapia-hero-title">Recupere seus movimentos. Viva melhor.</h1>
                <p className="fisioterapia-hero-subtitle">Cuidado individualizado para aliviar dores e recuperar sua mobilidade.</p>
                <div className="fisioterapia-hero-actions">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-teal btn-lg"
                  >
                    <MessageCircle size={18} />
                    <span>Agendar avaliação</span>
                    <ArrowRight size={16} />
                  </a>

                  <a href="#tratamentos" className="btn btn-outline-white btn-lg">
                    <span>Conhecer tratamentos</span>
                  </a>
                </div>
              </div>

              {/* 1. Imagem Principal — Atendimento Fisioterapêutico (Ombro) */}
              <div className="fisioterapia-hero-image-wrap">
                <Image
                  src="/images/fisioterapia/fisioterapia-hero.webp"
                  alt="Fisioterapeuta realizando atendimento especializado e terapia manual no ombro do paciente no Núcleo de Saúde Mais"
                  width={1024}
                  height={682}
                  priority
                  className="fisioterapia-hero-image"
                />
                <div className="fisioterapia-badge-floating">
                  <ShieldCheck size={14} className="text-teal" />
                  <span>Terapia Manual & Cuidado Humanizado</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Áreas de Atuação e Reabilitação Física */}
        <section id="tratamentos" className="section subpage-section subpage-section-has-banner bg-white">
          <div className="site-container">
            {/* 2. Bloco de Destaque: Reabilitação Física e Recuperação de Movimentos (Imagem à Esquerda) */}
            <div className="fisioterapia-split-section">
              {/* Imagem à Esquerda */}
              <div className="fisioterapia-feature-image-wrap">
                <Image
                  src="/images/fisioterapia/fisioterapia-reabilitacao.webp"
                  alt="Paciente realizando exercícios com faixa elástica vermelha acompanhada pela fisioterapeuta no Núcleo de Saúde Mais"
                  width={1024}
                  height={682}
                  loading="lazy"
                  className="fisioterapia-feature-image"
                />
                <div className="fisioterapia-badge-floating">
                  <Activity size={16} className="text-teal" />
                  <span>Recuperação Ativa & Fortalecimento</span>
                </div>
              </div>

              {/* Informações à Direita */}
              <div className="fisioterapia-feature-content">
                <div className="section-kicker">
                  <span className="kicker-line" />
                  <span>RECUPERAÇÃO DE MOVIMENTOS & QUALIDADE DE VIDA</span>
                </div>
                <h2 className="fisioterapia-feature-title">
                  Reabilitação física voltada à sua autonomia e bem-estar
                </h2>
                <p className="fisioterapia-feature-desc">
                  Nosso serviço de fisioterapia é estruturado para restabelecer a função mecânica,
                  aliviar dores na coluna e articulações e devolver sua liberdade de movimento com segurança e suporte contínuo.
                </p>

                <div className="fisioterapia-benefit-list">
                  <div className="fisioterapia-benefit-item">
                    <CheckCircle2 size={18} className="text-teal flex-shrink-0" style={{ marginTop: '2px' }} />
                    <div>
                      <strong>Alívio de dores na coluna e articulações:</strong>{' '}
                      <span>protocolos clínicos para hérnia de disco, lombalgias, tendinites e bursites.</span>
                    </div>
                  </div>
                  <div className="fisioterapia-benefit-item">
                    <CheckCircle2 size={18} className="text-teal flex-shrink-0" style={{ marginTop: '2px' }} />
                    <div>
                      <strong>Reabilitação pós-cirúrgica e esportiva:</strong>{' '}
                      <span>recuperação de cirurgias ortopédicas, próteses, ligamentos e retorno seguro aos treinos.</span>
                    </div>
                  </div>
                  <div className="fisioterapia-benefit-item">
                    <CheckCircle2 size={18} className="text-teal flex-shrink-0" style={{ marginTop: '2px' }} />
                    <div>
                      <strong>Exercícios terapêuticos direcionados:</strong>{' '}
                      <span>fortalecimento muscular progressivo e correção biomecânica para evitar novas lesões.</span>
                    </div>
                  </div>
                </div>

                <div>
                  
                </div>
              </div>
            </div>

            <div className="section-kicker">
              <span className="kicker-line" />
              <span>MODALIDADES TERAPÊUTICAS</span>
            </div>
            <h3 className="section-title">Nossas Especialidades em Reabilitação</h3>
            <p className="section-subtitle">
              Abordagem clínica integrada para aliviar dores, restaurar funções e devolver sua liberdade de movimento.
            </p>

            <div className="rehab-accordion" style={{display:'grid',gap:'10px',marginTop:'20px'}}>
              {rehabModalities.map((mod) => (
                <details key={mod.id} name="rehab-modalities" className="rehab-accordion-item">
                  <summary>
                    <span>{mod.title}</span>
                    <svg className="rehab-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
                  </summary>
                  <div className="rehab-accordion-content">
                    <p>{mod.desc}</p>
                    <ul>{mod.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
                  </div>
                </details>
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

        {/* Como Funciona o Tratamento / Acompanhamento Personalizado */}
        <section className="section subpage-section subpage-section-after-banner bg-neutral">
          <div className="site-container">
            <div className="fisioterapia-stages-split">
              {/* Conteúdo Textual à Esquerda */}
              <div className="fisioterapia-stages-content">
                <div className="section-kicker">
                  <span className="kicker-line" />
                  <span>ETAPAS DO TRATAMENTO</span>
                </div>
                <h2 className="section-title">Como funciona o seu acompanhamento?</h2>
                <p className="section-subtitle" style={{ marginBottom: '20px' }}>
                  Metodologia estruturada que prioriza a causa raiz do problema e garante segurança em cada sessão.
                </p>

                <div className="fisioterapia-stages-grid">
                  {treatmentStages.map((st) => (
                    <div key={st.num} className="subpage-step-card">
                      <div className="subpage-step-number">{st.num}</div>
                      <h3 className="subpage-step-title">{st.title}</h3>
                      <p className="subpage-step-desc">{st.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Terceira Imagem — Tratamento Personalizado (Faixa Azul) */}
              <div className="fisioterapia-stages-image-wrap">
                <Image
                  src="/images/fisioterapia/fisioterapia-personalizada.webp"
                  alt="Fisioterapeuta acompanhando paciente durante exercício terapêutico individualizado com faixa elástica azul"
                  width={1024}
                  height={682}
                  loading="lazy"
                  className="fisioterapia-stages-image"
                />
                <div className="fisioterapia-badge-floating">
                  <UserCheck size={16} className="text-teal" />
                  <span>Atendimento 100% Individualizado</span>
                </div>
              </div>
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
              
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </div>
  );
}
