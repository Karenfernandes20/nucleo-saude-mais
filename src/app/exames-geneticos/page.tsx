import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Dna,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Activity,
  HeartPulse,
  Sparkles,
  HelpCircle,
  FileText,
  Clock,
  UserCheck,
} from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import FloatingActions from '@/components/floating-actions';
import { clinic } from '@/data/clinic';

export const metadata: Metadata = {
  title: 'Exames Genéticos em Montes Claros | Núcleo de Saúde Mais',
  description:
    'Painéis genéticos avançados, avaliação de câncer hereditário, genética cardiovascular, sequenciamento de exoma (WES) e testes pré-natais (NIPT) em Montes Claros – MG.',
};

const geneticPanels = [
  {
    id: 'cancer-hereditario',
    title: 'Câncer Hereditário',
    badge: 'Oncogenética',
    desc: 'Investigação aprofundada de variantes em genes como BRCA1, BRCA2, TP53, PALB2, MLH1, MSH2 e APC. Auxilia na estimativa de risco para tumores de mama, ovário, intestino, próstata e pâncreas, viabilizando estratégias preventivas e vigilância médica antecipada.',
    highlights: ['BRCA1 e BRCA2 (Mama e Ovário)', 'Síndrome de Lynch (Colorretal)', 'Painéis ampliados de risco oncológico'],
  },
  {
    id: 'genetica-cardiovascular',
    title: 'Genética Cardiovascular',
    badge: 'Cardiogenética',
    desc: 'Análise de variantes associadas a cardiomiopatias (hipertrófica, dilatada), arritmias hereditárias (síndrome do QT longo, síndrome de Brugada) e hipercolesterolemia familiar, prevenindo eventos adversos graves.',
    highlights: ['Cardiomiopatia Hipertrófica', 'Síndromes de Arritmia Genética', 'Hipercolesterolemia Familiar'],
  },
  {
    id: 'sequenciamento-exoma',
    title: 'Sequenciamento Completo do Exoma (WES)',
    badge: 'Alta Complexidade',
    desc: 'Exame de sequenciamento de nova geração (NGS) que analisa mais de 20.000 genes codificadores de proteínas. Indicado para investigação de doenças raras, síndromes pediátricas complexas e quadros clínicos sem diagnóstico esclarecido.',
    highlights: ['Mais de 20.000 genes mapeados', 'Investigação de doenças raras', 'Laudo conclusivo para suporte médico'],
  },
  {
    id: 'neurogenetica',
    title: 'Painéis Neurológicos e Neurogenética',
    badge: 'Neurologia',
    desc: 'Investigação de condições neuromusculares, epilepsias genéticas de difícil controle, ataxias hereditárias, distrofias e neuropatias motoras e sensoriais.',
    highlights: ['Epilepsias Genéticas', 'Ataxias e Distrofias', 'Neuropatias Hereditárias'],
  },
  {
    id: 'nipt',
    title: 'Teste Pré-Natal Não Invasivo (NIPT)',
    badge: 'Saúde Materno-Fetal',
    desc: 'Coleta de sangue materno a partir da 10ª semana de gestação para análise do DNA fetal livre. Rastreia com alta precisão as trissomias dos cromossomos 21 (Down), 18 (Edwards) e 13 (Patau), alterações de cromossomos sexuais e sexagem fetal.',
    highlights: ['A partir da 10ª semana', 'Sem risco para a mãe ou para o bebê', 'Detecção precisa de trissomias'],
  },
  {
    id: 'farmacogenetica',
    title: 'Farmacogenética Personalizada',
    badge: 'Medicina de Precisão',
    desc: 'Analisa variantes genéticas que modulam o metabolismo de fármacos em psiquiatria (antidepressivos e ansiolíticos), cardiologia e dor, permitindo ao médico escolher o medicamento certo e a dosagem ideal.',
    highlights: ['Resposta individual a medicamentos', 'Menos efeitos adversos', 'Eficácia clínica otimizada'],
  },
];

const steps = [
  {
    num: '01',
    title: 'Indicação e Acolhimento',
    desc: 'Nossa equipe orienta você sobre a indicação médica, preparo necessário e escolha do painel genético mais adequado.',
  },
  {
    num: '02',
    title: 'Coleta Confortável',
    desc: 'Amostra obtida por saliva (swab bucal) ou sangue periférico, rápida, indolor e com total higiene e segurança.',
  },
  {
    num: '03',
    title: 'Sequenciamento NGS',
    desc: 'Processamento em laboratórios de genética humana de padrão internacional com sequenciamento de última geração.',
  },
  {
    num: '04',
    title: 'Laudo Médico Detalhado',
    desc: 'Relatório conclusivo e explicativo para que seu médico assistente possa definir condutas preventivas e personalizadas.',
  },
];

const faqs = [
  {
    q: 'Preciso de pedido médico para fazer um exame genético?',
    a: 'Recomenda-se o encaminhamento ou pedido médico para assegurar a escolha correta do painel genético. Caso ainda não possua, nossa equipe pode orientar sobre a consulta com os especialistas da nossa clínica.',
  },
  {
    q: 'Como é feita a coleta do exame de DNA?',
    a: 'A maior parte dos testes pode ser feita por uma simples coleta de saliva (swab bucal) ou por uma punção de sangue tradicional. Ambas são rápidas e seguras.',
  },
  {
    q: 'Qual é o prazo de entrega do laudo genético?',
    a: 'Por se tratar de sequenciamento molecular aprofundado, o prazo varia de 15 a 30 dias úteis, dependendo da extensão do painel ou se envolve sequenciamento de exoma.',
  },
  {
    q: 'O resultado positivo significa que certamente terei a doença?',
    a: 'Não necessariamente. Na maioria dos painéis de predisposição hereditária (como câncer ou cardiologia), o resultado positivo indica risco aumentado, permitindo ao médico instituir medidas de vigilância precoce e prevenção.',
  },
];

export default function ExamesGeneticosPage() {
  const whatsappHref = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
    'Olá! Gostaria de informações sobre os Exames Genéticos no Núcleo de Saúde Mais.'
  )}`;

  return (
    <div className="clinic-app-wrapper">
      <Header activeSection="geneticos" />

      <main id="main-content">
        {/* Hero da Página Dedicada */}
        <section className="subpage-hero">
          <div className="site-container subpage-hero-container">
            <nav className="subpage-breadcrumb" aria-label="Navegação estrutural">
              <Link href="/">Início</Link>
              <span className="subpage-breadcrumb-separator">/</span>
              <span>Exames Genéticos</span>
            </nav>

            <div className="subpage-badge">
              <Dna size={14} className="text-teal" />
              <span>MEDICINA DE PRECISÃO & INVESTIGAÇÃO HEREDITÁRIA</span>
            </div>

            <h1 className="subpage-title">
              Exames Genéticos Avançados em Montes Claros
            </h1>

            <p className="subpage-subtitle">
              A análise do seu DNA permite identificar predisposições a doenças hereditárias,
              personalizar tratamentos médicos e promover um cuidado preventivo assertivo para
              você e sua família.
            </p>

            <div className="subpage-tags-strip">
              <span className="subpage-tag-chip">
                <Sparkles size={14} /> Sequenciamento NGS
              </span>
              <span className="subpage-tag-chip">
                <ShieldCheck size={14} /> Laudos Especializados
              </span>
              <span className="subpage-tag-chip">
                <HeartPulse size={14} /> Investigação Preventiva
              </span>
              <span className="subpage-tag-chip">
                <Clock size={14} /> Coleta Simples e Rápida
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
                <span>Consultar exames genéticos</span>
                <ArrowRight size={16} />
              </a>

              <a href="#paineis" className="btn btn-outline-white btn-lg">
                <span>Ver painéis disponíveis</span>
              </a>
            </div>
          </div>
        </section>

        {/* Seção Informativa: Por que a Genética Importa */}
        <section className="section subpage-section bg-white">
          <div className="site-container">
            <div className="section-kicker">
              <span className="kicker-line" />
              <span>CUIDADO ANTECIPADO E INDIVIDUALIZADO</span>
            </div>
            <h2 className="section-title">
              O que a análise genética pode fazer pela sua saúde?
            </h2>
            <p className="section-subtitle">
              A genética médica transformou o paradigma da saúde: não se trata apenas de tratar
              sintomas, mas de antecipar riscos e adotar condutas protetivas antes que as doenças se desenvolvam.
            </p>

            <div className="subpage-cards-grid">
              <div className="subpage-card">
                <div className="subpage-card-icon">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="subpage-card-title">Prevenção e Rastreio Ativo</h3>
                <p className="subpage-card-desc">
                  Identifique predisposições antes de qualquer manifestação clínica, permitindo exames de rastreio em idades mais precoces e com maior frequência.
                </p>
              </div>

              <div className="subpage-card">
                <div className="subpage-card-icon">
                  <UserCheck size={24} />
                </div>
                <h3 className="subpage-card-title">Histórico Familiar Positivo</h3>
                <p className="subpage-card-desc">
                  Se você possui parentes de primeiro ou segundo grau com diagnósticos de câncer, cardiopatias ou doenças raras, a investigação genética traz respostas conclusivas.
                </p>
              </div>

              <div className="subpage-card">
                <div className="subpage-card-icon">
                  <Activity size={24} />
                </div>
                <h3 className="subpage-card-title">Tratamentos Personalizados</h3>
                <p className="subpage-card-desc">
                  Oriente seu médico na escolha da medicação com maior probabilidade de eficácia e menor taxa de efeitos colaterais através da farmacogenética.
                </p>
              </div>

              <div className="subpage-card">
                <div className="subpage-card-icon">
                  <HeartPulse size={24} />
                </div>
                <h3 className="subpage-card-title">Planejamento Familiar</h3>
                <p className="subpage-card-desc">
                  Segurança para gestantes e casais através de testes pré-natais não invasivos (NIPT) e triagem de portadores de doenças recessivas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Painéis em Destaque */}
        <section id="paineis" className="section subpage-section subpage-section-has-banner bg-neutral">
          <div className="site-container">
            <div className="section-kicker">
              <span className="kicker-line" />
              <span>PORTFÓLIO DE EXAMES GENÉTICOS</span>
            </div>
            <h2 className="section-title">Painéis e Testes Genéticos Disponíveis</h2>
            <p className="section-subtitle">
              Oferecemos um portfólio completo de testes moleculares com laudos estruturados para apoiar seu médico.
            </p>

            <div className="subpage-cards-grid">
              {geneticPanels.map((panel) => (
                <article key={panel.id} className="subpage-card">
                  <div className="badge-chip" style={{ width: 'fit-content', marginBottom: '14px' }}>
                    {panel.badge}
                  </div>
                  <h3 className="subpage-card-title">{panel.title}</h3>
                  <p className="subpage-card-desc">{panel.desc}</p>
                  <ul style={{ paddingLeft: '18px', marginBottom: '20px', fontSize: '0.84375rem', color: '#0C4463' }}>
                    {panel.highlights.map((h) => (
                      <li key={h} style={{ marginBottom: '6px' }}>{h}</li>
                    ))}
                  </ul>
                  <a
                    href={`https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
                      `Olá! Gostaria de mais informações sobre o exame de ${panel.title}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-navy btn-sm"
                    style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }}
                  >
                    <MessageCircle size={15} />
                    <span>Consultar este painel</span>
                  </a>
                </article>
              ))}
            </div>

            {/* Banner de Ação Intermediário */}
            <div className="subpage-cta-banner">
              <div>
                <h3>Precisa de um painel genético específico?</h3>
                <p>
                  Nossa equipe médica e laboratorial analisa pedidos de médicos de qualquer especialidade e verifica a disponibilidade e o preparo adequado.
                </p>
              </div>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-teal btn-lg"
              >
                <MessageCircle size={18} />
                <span>Falar com equipe técnica</span>
              </a>
            </div>
          </div>
        </section>

        {/* Como Funciona o Processo */}
        <section className="section subpage-section subpage-section-after-banner bg-white">
          <div className="site-container">
            <div className="section-kicker">
              <span className="kicker-line" />
              <span>PASSO A PASSO</span>
            </div>
            <h2 className="section-title">Como é realizado o seu exame genético?</h2>
            <p className="section-subtitle">
              Um processo simples, ágil e seguro, desenhado para o seu conforto do início ao laudo final.
            </p>

            <div className="subpage-step-grid">
              {steps.map((st) => (
                <div key={st.num} className="subpage-step-card">
                  <div className="subpage-step-number">{st.num}</div>
                  <h3 className="subpage-step-title">{st.title}</h3>
                  <p className="subpage-step-desc">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Genética */}
        <section className="section subpage-section bg-neutral">
          <div className="site-container" style={{ maxWidth: '900px' }}>
            <div className="section-kicker text-center" style={{ justifyContent: 'center' }}>
              <span className="kicker-line" />
              <span>TIRE SUAS DÚVIDAS</span>
              <span className="kicker-line" />
            </div>
            <h2 className="section-title text-center">Dúvidas Frequentes sobre Genética</h2>

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
                <span>Tirar outra dúvida pelo WhatsApp</span>
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
