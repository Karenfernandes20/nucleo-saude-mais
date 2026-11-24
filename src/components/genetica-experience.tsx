'use client';
import React,{useState,useMemo} from 'react';
import Image from 'next/image';
import {ShieldCheck,Users,Target,Dna,CheckCircle2,ArrowRight,MessageCircle,Activity,HeartPulse,Sparkles,HelpCircle,Clock,FileText,Search,Layers,Baby,Pill,Brain,Heart,ChevronDown,ChevronUp,Info,Filter} from 'lucide-react';
import {clinic} from '@/data/clinic';
interface AnatomyHotspot {
  id: string;
  name: string;
  badge: string;
  top: string;
  left: string;
  icon: typeof Brain;
  examTitle: string;
  description: string;
  benefits: string[];
  sampleType: string;
  genes: string;
  turnaround: string;
  ctaText: string;
}

const anatomyHotspots: AnatomyHotspot[] = [
  {
    id: 'cerebro',
    name: 'Cérebro & Sistema Nervoso',
    badge: 'Neurologia',
    top: '11%',
    left: '52%',
    icon: Brain,
    examTitle: 'Painéis Neurológicos & Neurogenética',
    description:
      'Investigação molecular aprofundada de epilepsias refratárias de causa genética, ataxias hereditárias, distrofias neuromusculares e neuropatias sensoriais/motoras.',
    benefits: [
      'Diagnóstico etiológico para epilepsias de difícil controle na infância e na fase adulta',
      'Diferenciação precisa entre ataxias espinocerebelares e neuropatias como Charcot-Marie-Tooth',
      'Apoio ao neurologista para individualização de terapias e suporte neuroreabilitador',
    ],
    sampleType: 'Saliva (swab bucal simples) ou Sangue periférico (EDTA)',
    genes: 'SCN1A, KCNQ2, FXN, PMP22 e painéis ampliados com mais de 100 genes',
    turnaround: '20 a 30 dias úteis',
    ctaText: 'Consultar Painel Neurológico',
  },
  {
    id: 'coracao',
    name: 'Coração & Sistema Cardiovascular',
    badge: 'Cardiogenética',
    top: '36%',
    left: '56%',
    icon: Heart,
    examTitle: 'Genética Cardiovascular & Risco de Morte Súbita',
    description:
      'Investigação de variantes patogênicas ligadas a cardiomiopatias hereditárias, canalopatias, arritmias potencialmente fatais e hipercolesterolemia familiar em pacientes e seus parentes.',
    benefits: [
      'Prevenção de morte súbita cardíaca em jovens, atletas e indivíduos com histórico familiar',
      'Diagnóstico antecipado de Cardiomiopatia Hipertrófica e Dilatada antes de sintomas graves',
      'Rastreio em cascata para proteger parentes de primeiro grau (filhos, irmãos e pais)',
    ],
    sampleType: 'Saliva (swab bucal simples) ou Sangue periférico (EDTA)',
    genes: 'MYH7, MYBPC3, KCNQ1, KCNH2, SCN5A, LDLR e ApoB',
    turnaround: '20 a 25 dias úteis',
    ctaText: 'Consultar Painel Cardiovascular',
  },
  {
    id: 'oncologia',
    name: 'Mamas, Ovários & Trato Digestivo',
    badge: 'Oncogenética',
    top: '48%',
    left: '49%',
    icon: Activity,
    examTitle: 'Painéis de Câncer Hereditário (BRCA1, BRCA2 e Lynch)',
    description:
      'Avaliação de variantes germinativas de predisposição a tumores de mama, ovário, colorretal, próstata e pâncreas, permitindo estratégias preventivas e vigilância médica antecipada.',
    benefits: [
      'Mapeamento completo dos genes BRCA1 e BRCA2 (risco para mama, ovário e próstata)',
      'Identificação da Síndrome de Lynch (genes MLH1, MSH2, MSH6, PMS2) para câncer de cólon e reto',
      'Direcionamento de exames de rastreio (mamografia/ressonância) em idades mais jovens',
    ],
    sampleType: 'Saliva (swab bucal simples) ou Sangue periférico (EDTA)',
    genes: 'BRCA1, BRCA2, TP53, PALB2, MLH1, MSH2, MSH6, PMS2, APC, CDH1',
    turnaround: '15 a 25 dias úteis',
    ctaText: 'Consultar Painel de Câncer Hereditário',
  },
  {
    id: 'farmaco',
    name: 'Fígado & Metabolismo Farmacológico',
    badge: 'Farmacogenética',
    top: '60%',
    left: '44%',
    icon: Pill,
    examTitle: 'Farmacogenética Personalizada (Medicina de Precisão)',
    description:
      'Mapeamento de enzimas hepáticas e transportadores que regulam como seu organismo metaboliza medicamentos psiquiátricos (antidepressivos/ansiolíticos), cardiológicos e analgésicos.',
    benefits: [
      'Escolha do antidepressivo ou ansiolítico com maior chance de eficácia e tolerabilidade',
      'Redução drástica do período de tentativa e erro na definição de doses terapêuticas',
      'Prevenção de reações adversas e toxicidade por acúmulo de fármacos no organismo',
    ],
    sampleType: 'Saliva (swab bucal simples) ou Sangue periférico (EDTA)',
    genes: 'CYP2D6, CYP2C19, CYP2C9, CYP3A4, VKORC1, SLCO1B1',
    turnaround: '15 a 20 dias úteis',
    ctaText: 'Consultar Teste Farmacogenético',
  },
  {
    id: 'gestacao',
    name: 'Saúde Materno-Fetal & Gestação',
    badge: 'Saúde Materno-Fetal',
    top: '72%',
    left: '52%',
    icon: Baby,
    examTitle: 'Teste Pré-Natal Não Invasivo (NIPT / DNA Fetal Livre)',
    description:
      'Análise de fragmentos de DNA fetal livre presentes no sangue da mãe a partir da 10ª semana de gravidez. Exame 100% seguro, sem nenhum risco para a gestante ou para o feto.',
    benefits: [
      'Detecção com sensibilidade >99% das Trissomias 21 (Down), 18 (Edwards) e 13 (Patau)',
      'Identificação precoce de alterações em cromossomos sexuais (Turner, Klinefelter)',
      'Determinação do sexo do bebê com precisão laboratorial a partir da 10ª semana',
    ],
    sampleType: 'Sangue periférico materno (coleta de sangue tradicional e rápida)',
    genes: 'Cromossomos 21, 18, 13, X e Y (DNA fetal livre circulante)',
    turnaround: '7 a 10 dias úteis',
    ctaText: 'Consultar Exame NIPT',
  },
  {
    id: 'exoma',
    name: 'Genoma Global (Exoma Completo)',
    badge: 'Alta Complexidade',
    top: '25%',
    left: '32%',
    icon: Layers,
    examTitle: 'Sequenciamento Completo do Exoma (WES)',
    description:
      'Sequenciamento de alta resolução que analisa mais de 20.000 genes que codificam proteínas no organismo humano, indicado para casos clínicos complexos e doenças raras.',
    benefits: [
      'Investigação de doenças raras sem diagnóstico concluído após múltiplos exames convencionais',
      'Avaliação de atrasos no neurodesenvolvimento, síndromes pediátricas e malformações',
      'Laudo de máxima complexidade com bioinformática e equipe médica especializada',
    ],
    sampleType: 'Sangue periférico (EDTA) ou Saliva especializada',
    genes: 'Mais de 20.000 genes codificadores (todas as regiões exônicas)',
    turnaround: '25 a 35 dias úteis',
    ctaText: 'Consultar Sequenciamento de Exoma',
  },
];

// ==========================================
// 3. DATA: CATÁLOGO DE EXAMES DA CLÍNICA
// ==========================================
interface GeneticExamCard {
  id: string;
  category: string;
  title: string;
  badge: string;
  desc: string;
  highlights: string[];
  genesSample: string;
  sampleInfo: string;
}

const geneticExamCatalog: GeneticExamCard[] = [
  {
    id: 'cancer-hereditario',
    category: 'Oncogenética',
    title: 'Câncer Hereditário (Painel Expandido)',
    badge: 'Oncogenética',
    desc: 'Investigação de variantes patogênicas em genes de alta e moderada penetrância associados a tumores de mama, ovário, colorretal, próstata, útero e pâncreas.',
    highlights: [
      'Genes BRCA1 e BRCA2 completos',
      'Síndrome de Lynch (MLH1, MSH2, MSH6, PMS2)',
      'Painel ampliado com TP53, PALB2, ATM, CHEK2 e APC',
    ],
    genesSample: 'BRCA1, BRCA2, TP53, PALB2, MLH1, APC e outros',
    sampleInfo: 'Saliva (swab bucal) ou Sangue',
  },
  {
    id: 'genetica-cardiovascular',
    category: 'Cardiogenética',
    title: 'Genética Cardiovascular & Arritmias',
    badge: 'Cardiogenética',
    desc: 'Painel molecular focado em variantes ligadas a cardiomiopatias, síndrome do QT longo, síndrome de Brugada e hipercolesterolemia familiar, prevenindo morte súbita.',
    highlights: [
      'Cardiomiopatia Hipertrófica e Dilatada',
      'Síndromes de Arritmia Genética e Canalopatias',
      'Hipercolesterolemia Familiar (LDLR, ApoB)',
    ],
    genesSample: 'MYH7, MYBPC3, KCNQ1, KCNH2, SCN5A, LDLR',
    sampleInfo: 'Saliva (swab bucal) ou Sangue',
  },
  {
    id: 'sequenciamento-exoma',
    category: 'Alta Complexidade',
    title: 'Sequenciamento Completo do Exoma (WES)',
    badge: 'Alta Complexidade',
    desc: 'Exame de sequenciamento NGS de última geração que cobre mais de 20.000 genes codificadores de proteínas. Indicado para doenças raras e quadros clínicos complexos.',
    highlights: [
      'Mais de 20.000 genes mapeados simultaneamente',
      'Diagnóstico de síndromes pediátricas e neurológicas',
      'Laudo com classificação de variantes segundo diretrizes ACMG',
    ],
    genesSample: 'Regiões codificadoras de todo o genoma (~20.000 genes)',
    sampleInfo: 'Sangue periférico (EDTA) ou Saliva',
  },
  {
    id: 'neurogenetica',
    category: 'Neurologia',
    title: 'Painéis Neurológicos & Neurogenética',
    badge: 'Neurologia',
    desc: 'Painéis de NGS focados em epilepsias de difícil controle, ataxias espinocerebelares, distrofias musculares e neuropatias hereditárias periféricas.',
    highlights: [
      'Epilepsias genéticas precoces e refratárias',
      'Ataxias hereditárias e distrofias musculares',
      'Neuropatias sensoriais e motoras hereditárias',
    ],
    genesSample: 'SCN1A, KCNQ2, FXN, PMP22, SMN1 e painel ampliado',
    sampleInfo: 'Saliva (swab bucal) ou Sangue',
  },
  {
    id: 'nipt',
    category: 'Saúde Materno-Fetal',
    title: 'Teste Pré-Natal Não Invasivo (NIPT)',
    badge: 'Saúde Materno-Fetal',
    desc: 'Coleta de sangue materno a partir da 10ª semana de gravidez para contagem de DNA fetal livre. Rastreia com alta sensibilidade trissomias cromossômicas e revela o sexo do bebê.',
    highlights: [
      'Sem risco para o feto ou para a mãe (coleta de sangue comum)',
      'Sensibilidade >99% para Síndromes de Down, Edwards e Patau',
      'Sexagem fetal inclusa a partir da 10ª semana',
    ],
    genesSample: 'Cromossomos 21, 18, 13, X e Y',
    sampleInfo: 'Sangue periférico materno simples',
  },
  {
    id: 'farmacogenetica',
    category: 'Medicina de Precisão',
    title: 'Farmacogenética Personalizada',
    badge: 'Medicina de Precisão',
    desc: 'Analisa variantes em enzimas do citocromo P450 que modulam como seu corpo processa psicotrópicos, antidepressivos, anticoagulantes e analgésicos.',
    highlights: [
      'Escolha do medicamento psiquiátrico com maior taxa de resposta',
      'Menor risco de reações adversas e efeitos colaterais',
      'Economia de tempo no ajuste de dosagem pelo médico assistente',
    ],
    genesSample: 'CYP2D6, CYP2C19, CYP2C9, CYP3A4, VKORC1, SLCO1B1',
    sampleInfo: 'Saliva (swab bucal simples)',
  },
];


const faqsList = [
  {
    q: 'Preciso de pedido médico para fazer um exame genético?',
    a: 'Recomenda-se o encaminhamento ou pedido médico para assegurar a escolha correta do painel genético. Caso ainda não possua uma indicação médica específica, nossa equipe orienta sobre a consulta com os especialistas da nossa clínica para direcionar o teste adequado.',
  },
  {
    q: 'Como é feita a coleta do exame de DNA?',
    a: 'A maior parte dos testes pode ser feita por uma simples coleta de saliva (swab bucal indolor) ou por uma punção de sangue tradicional. Ambas são rápidas, higiênicas e confortáveis, e não exigem jejum prolongado na maioria dos casos.',
  },
  {
    q: 'Qual é o prazo de entrega do laudo genético?',
    a: 'Por se tratar de sequenciamento molecular aprofundado com bioinformática rigorosa, o prazo varia conforme a extensão do teste: cerca de 7 a 10 dias úteis para NIPT, 15 a 25 dias para painéis de câncer e cardiologia, e 25 a 35 dias para Sequenciamento Completo do Exoma.',
  },
  {
    q: 'O resultado positivo significa que certamente terei a doença?',
    a: 'Não necessariamente. Na maioria dos painéis de predisposição hereditária (como câncer ou cardiologia), o resultado positivo indica risco aumentado em comparação com a população geral. Essa informação é uma ferramenta preventiva poderosa: permite ao seu médico instituir vigilância antecipada, exames periódicos e medidas protetivas antes de qualquer sintoma.',
  },
];
const shortAnatomy:Record<string,string>={cerebro:'Investigue possíveis causas genéticas de condições neurológicas.',coracao:'Avalie predisposições hereditárias relacionadas ao coração.',oncologia:'Conheça fatores genéticos associados ao risco de alguns tipos de câncer.',farmaco:'Entenda fatores genéticos que podem influenciar a resposta a medicamentos.',gestacao:'Conheça opções de rastreamento cromossômico durante a gestação.',exoma:'Investigue possíveis causas genéticas de condições complexas e doenças raras.'};
const shortExams:Record<string,string>={'cancer-hereditario':shortAnatomy.oncologia,'genetica-cardiovascular':shortAnatomy.coracao,'sequenciamento-exoma':shortAnatomy.exoma,neurogenetica:shortAnatomy.cerebro,nipt:shortAnatomy.gestacao,farmacogenetica:shortAnatomy.farmaco};
const examIcons:Record<string,typeof Brain>={'cancer-hereditario':Activity,'genetica-cardiovascular':HeartPulse,'sequenciamento-exoma':Dna,neurogenetica:Brain,nipt:Baby,farmacogenetica:Pill};
const situations=[{title:'Histórico de câncer na família?',desc:'Conheça as opções de avaliação de risco hereditário.',icon:Activity},{title:'Doenças cardíacas na família?',desc:'Saiba mais sobre genética cardiovascular.',icon:HeartPulse},{title:'Dificuldade de adaptação a medicamentos?',desc:'Conheça a farmacogenética.',icon:Pill},{title:'Está esperando um bebê?',desc:'Entenda as opções de rastreamento pré-natal.',icon:Baby}];

export default function GeneticaExperience(){
  const whatsappHref = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
    'Olá! Gostaria de informações sobre os Exames Genéticos no Núcleo de Saúde Mais.'
  )}`;

  // Interactive States
  const [mobileOpenId, setMobileOpenId] = useState<string | null>(null);
  const [activeHotspotId, setActiveHotspotId] = useState<string>('cerebro');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Active Hotspot Item
  const activeHotspot = useMemo(
    () => anatomyHotspots.find((h) => h.id === activeHotspotId) || anatomyHotspots[0],
    [activeHotspotId]
  );

  // Categories list
  const categories = useMemo(() => {
    return ['Todos', 'Oncogenética', 'Cardiogenética', 'Neurologia', 'Saúde Materno-Fetal', 'Medicina de Precisão', 'Alta Complexidade'];
  }, []);

  // Filtered Catalog
  const filteredCatalog = useMemo(() => {
    return geneticExamCatalog.filter((exam) => {
      const matchCat = selectedCategory === 'Todos' || exam.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchCat;

      const matchText =
        exam.title.toLowerCase().includes(query) ||
        exam.desc.toLowerCase().includes(query) ||
        exam.genesSample.toLowerCase().includes(query) ||
        exam.highlights.some((h) => h.toLowerCase().includes(query));

      return matchCat && matchText;
    });
  }, [selectedCategory, searchQuery]);


const contact=(message:string)=>`https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(message)}`;
const renderAnatomyDetails = (activeHotspot: AnatomyHotspot) => (<div className="body-details-card" aria-live="polite" key={activeHotspot.id}>
                <div className="details-header-row">
                  <div className="details-badge">{activeHotspot.badge}</div>
                  <span className="details-turnaround">
                    <Clock size={13} /> {activeHotspot.turnaround}
                  </span>
                </div>

                <h3 className="details-title">{activeHotspot.name}</h3>
                <h4 className="details-exam-name">{activeHotspot.examTitle}</h4>

                <p className="details-desc">{shortAnatomy[activeHotspot.id]}</p><details style={{marginBottom:16}}><summary style={{cursor:"pointer",color:"#087f85"}}>Ver detalhes técnicos</summary><p className="details-desc">{activeHotspot.description}</p>

                <div className="details-benefits-box">
                  <h5 className="benefits-label">Principais Benefícios Clínicos:</h5>
                  <ul className="benefits-list">
                    {activeHotspot.benefits.map((b, idx) => (
                      <li key={idx} className="benefit-item">
                        <CheckCircle2 size={16} className="text-teal flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="details-meta-grid">
                  <div className="meta-card">
                    <span className="meta-label">Tipo de Coleta:</span>
                    <span className="meta-value">{activeHotspot.sampleType}</span>
                  </div>
                  <div className="meta-card">
                    <span className="meta-label">Genes de Exemplo:</span>
                    <span className="meta-value">{activeHotspot.genes}</span>
                  </div>
                </div>

                </details><div className="details-action-box">
                  <a
                    href={`https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
                      `Olá! Gostaria de informações sobre o exame de ${activeHotspot.examTitle}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-teal btn-md"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <MessageCircle size={16} />
                    <span>Tirar dúvidas sobre este exame</span>
                  </a>
                </div>
              </div>);
return (<div className="genetica-page-container"><section className="genetica-hero-section genetica-hero-clean">
<div className="genetica-hero-copy">
<div className="genetica-hero-badge">EXAMES GENÉTICOS</div>
<h1 className="genetica-hero-title">O que seu DNA pode revelar sobre <span>sua saúde?</span></h1>
<p className="genetica-hero-subtitle">Conheça sua genética e tenha mais informações para cuidar da sua saúde e da sua família.</p>
<div className="genetica-hero-actions"><a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-teal btn-lg"><MessageCircle size={22}/><span>Quero saber mais pelo WhatsApp</span><ArrowRight size={18}/></a><a href="#paineis" className="btn btn-lg genetics-outline"><Dna size={24}/>Conhecer os exames</a></div>
<div className="genetics-benefits"><div><ShieldCheck/><span>Prevenção<br/> e cuidado</span></div><div><Users/><span>Informação<br/> para sua família</span></div><div><Target/><span>Mais precisão<br/> nas decisões de saúde</span></div></div>
</div><div className="genetics-hero-art" aria-hidden="true"><Image src="/images/genetica/dna-hero-art.svg" alt="" fill sizes="(max-width:900px) 100vw, 48vw" priority/></div>
</section><section className="section bg-white genetica-section-padding"><div className="genetica-container"><h2 className="section-title text-center">Você se identifica com alguma dessas situações?</h2><div className="genetica-catalog-grid" style={{marginTop:24}}>{situations.map(({title,desc,icon:Icon})=><article key={title} className="genetica-exam-card"><Icon size={32} className="text-teal"/><h3 className="exam-card-title">{title}</h3><p className="exam-card-desc">{desc}</p></article>)}</div></div></section><section id="paineis" className="section bg-white genetica-section-padding">
        <div className="genetica-container">
          <div className="section-header-compact text-center" style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 32px' }}>
            <div className="section-kicker" style={{ justifyContent: 'center' }}>
              <span className="kicker-line" />
              <span>PORTFÓLIO DE EXAMES DA CLÍNICA</span>
              <span className="kicker-line" />
            </div>
            <h2 className="section-title">Conheça nossos exames genéticos</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Encontre seu exame ou converse com nossa equipe.
            </p>
          </div>

          {/* Barra de Filtros e Busca */}
          <div className="genetica-catalog-controls">
            {/* Campo de Busca Instantânea */}
            <div className="catalog-search-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar exame (ex.: NIPT, BRCA1, exoma)"
                className="catalog-search-input"
                aria-label="Pesquisar exames genéticos"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="search-clear-btn"
                  aria-label="Limpar pesquisa"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Categorias em Chips */}
            <div className="catalog-category-chips" role="tablist">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`catalog-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                >
                  {cat === 'Todos' && <Filter size={13} />}
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Grid de Cards dos Exames */}
          {filteredCatalog.length > 0 ? (
            <div className="genetica-catalog-grid">
              {filteredCatalog.map((exam) => (
                <article key={exam.id} className="genetica-exam-card">
                  <div className="exam-card-header">
                    <span className="badge-chip">{exam.badge}</span>
                    <span className="exam-card-sample">
                      <Clock size={12} /> Coleta Simples
                    </span>
                  </div>

                  <h3 className="exam-card-title">{exam.title}</h3>
                  <div style={{color:"#169FA5",margin:"12px 0"}}>{React.createElement(examIcons[exam.id] || Dna,{size:36})}</div><p className="exam-card-desc">{shortExams[exam.id]}</p><details style={{marginBottom:16}}><summary style={{cursor:"pointer",color:"#087f85"}}>Saiba mais</summary><p>{exam.desc}</p>

                  <div className="exam-card-highlights">
                    <strong>Destaques do painel:</strong>
                    <ul>
                      {exam.highlights.map((h, i) => (
                        <li key={i}>
                          <CheckCircle2 size={13} className="text-teal flex-shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="exam-card-genes">
                    <span className="genes-label">Genes mapeados:</span>
                    <span className="genes-val">{exam.genesSample}</span>
                  </div>

                  </details><div className="exam-card-footer">
                    
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="catalog-empty-state">
              <Dna size={42} className="text-teal" style={{ margin: '0 auto 14px' }} />
              <h3>Nenhum exame encontrado para &ldquo;{searchQuery}&rdquo;</h3>
              <p>
                Nossa equipe médica analisa pedidos de qualquer especialidade. Envie sua guia para verificarmos
                a disponibilidade laboratorial.
              </p>
              <div style={{ marginTop: '16px' }}>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-teal btn-md"
                >
                  <MessageCircle size={16} />
                  <span>Consultar exame específico no WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </section><section id="corpo-interativo" className="section genetica-anatomy-light">
        <div className="genetica-container">
          <div className="section-header-compact text-center" style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 36px' }}>
            <div className="section-kicker" style={{ justifyContent: 'center' }}>
              <span className="kicker-line" />
              <span>MAPA ANATÔMICO INTERATIVO</span>
              <span className="kicker-line" />
            </div>
            <h2 className="section-title">
              Explore o que sua genética pode revelar
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Clique ou toque nos pontos com + para descobrir os exames de cada região.
            </p>
          </div>

          <div className="genetica-body-split">
            {/* Lado Esquerdo: Imagem Anatômica com Hotspots */}
            <div className="genetica-body-visual">
              <div className="genetica-body-image-wrap">
                <div className="anatomy-click-hint" aria-hidden="true"><span>☝</span> Clique nos pontos + para explorar</div>
                <Image
                  src="/images/genetica/corpo-humano-genetica.webp"
                  alt="Representação estilizada e anatômica do corpo humano com pontos luminosos de exames genéticos"
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="genetica-body-image"
                />

                {/* Hotspots Luminosos Sobrepostos */}
                {anatomyHotspots.map((spot) => {
                  const isSelected = spot.id === activeHotspotId;
                  return (
                    <button
                      key={spot.id}
                      onClick={() => { setActiveHotspotId(spot.id); setMobileOpenId(spot.id); if (window.matchMedia("(max-width: 900px)").matches) requestAnimationFrame(() => document.getElementById(`anatomy-mobile-${spot.id}`)?.parentElement?.scrollIntoView({block:"start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"})); }}

                      className={`genetica-hotspot-pin ${isSelected ? 'active' : ''}`}
                      style={{ top: spot.top, left: spot.left }}
                      aria-pressed={isSelected} aria-label={`Ver informações de ${spot.name}`}
                    >
                      <span className="hotspot-pulse" />
                      <span className="hotspot-dot" aria-hidden="true">+</span>
                      <span className="hotspot-tooltip">{spot.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Aviso Ético Importante */}
              <div className="genetica-disclaimer-box">
                <Info size={15} className="text-teal flex-shrink-0" />
                <span>
                  <strong>Aviso Informativo:</strong> Este recurso é exclusivamente educativo para ilustrar as áreas
                  médicas de aplicação dos testes moleculares e não constitui ferramenta de autodiagnóstico.
                </span>
              </div>
            </div>

            {/* Lado Direito: Painel de Detalhes do Órgão Selecionado */}
            <div className="genetica-body-details">
              {renderAnatomyDetails(activeHotspot)}
            </div>
          </div>
          <div className="genetica-hotspots-mobile-nav">
            {anatomyHotspots.map((spot) => (
              <div key={spot.id} className="genetica-mobile-accordion-item">
                <button type="button" aria-expanded={mobileOpenId === spot.id}
                  aria-controls={`anatomy-mobile-${spot.id}`}
                  onClick={() => { setActiveHotspotId(spot.id); setMobileOpenId(mobileOpenId === spot.id ? null : spot.id); }}
                  className={`genetica-hotspot-pill ${mobileOpenId === spot.id ? 'active' : ''}`}>
                  <span>{spot.name}</span>{mobileOpenId === spot.id ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
                </button>
                <div id={`anatomy-mobile-${spot.id}`} hidden={mobileOpenId !== spot.id}>
                  {mobileOpenId === spot.id && renderAnatomyDetails(spot)}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section><section className="section bg-neutral genetica-section-padding"><div className="genetica-container"><div className="genetica-split-section genetica-request-compact"><div className="genetica-image-card"><Image src="/images/genetica/consulta-genetica-medica.webp" alt="Ilustração de atendimento médico" width={1024} height={768} className="genetica-consult-image"/></div><div><h2 className="section-title">Já tem um pedido médico?</h2><p className="genetica-split-desc">Consulte a disponibilidade, o preparo e os valores do seu exame com nossa equipe.</p><a className="btn btn-teal btn-md" href={contact('Olá! Tenho um pedido médico e gostaria de consultar a disponibilidade do exame.')} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/> Consultar meu pedido</a></div></div></div></section><section className="section bg-white genetica-section-padding"><div className="genetica-container"><h2 className="section-title text-center">Seu exame em três passos</h2><div className="genetica-catalog-grid" style={{marginTop:24}}>{[{title:'Converse com nossa equipe',desc:'Tire dúvidas e confirme a indicação com seu médico.',icon:MessageCircle},{title:'Realize a coleta',desc:'Sangue ou saliva, conforme o exame.',icon:Dna},{title:'Receba seu resultado',desc:'Leve o laudo para avaliação médica.',icon:FileText}].map(({title,desc,icon:Icon},i)=><article className="genetica-exam-card" key={title}><Icon size={30} className="text-teal"/><h3 className="exam-card-title">{i+1}. {title}</h3><p>{desc}</p></article>)}</div></div></section><section className="section bg-white genetica-section-padding">
        <div className="genetica-container" style={{ maxWidth: '860px' }}>
          <div className="section-header-compact text-center" style={{ textAlign: 'center', margin: '0 auto 36px' }}>
            <div className="section-kicker" style={{ justifyContent: 'center' }}>
              <span className="kicker-line" />
              <span>TIRE SUAS DÚVIDAS</span>
              <span className="kicker-line" />
            </div>
            <h2 className="section-title text-center">Dúvidas frequentes</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Respostas rápidas para começar.
            </p>
          </div>

          <div className="genetica-accordion-wrapper">
            {faqsList.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className={`genetica-faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="genetica-faq-trigger"
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">
                      <HelpCircle size={18} className="text-teal flex-shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    <span className="faq-icon-arrow">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="genetica-faq-content">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            
          </div>
        </div>
      </section><section className="genetica-cta-bottom-section"><div className="genetica-container"><div className="genetica-cta-bottom-banner"><div><h3>Não sabe qual exame realizar?</h3><p>Converse com nossa equipe e descubra como começar.</p></div><a className="btn btn-teal btn-lg" href={whatsappHref} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/> Conversar pelo WhatsApp</a></div></div></section></div>);
}
