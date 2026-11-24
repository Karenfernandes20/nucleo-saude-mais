'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Clock,
  UserCheck,
  FileText,
  Search,
  Microscope,
  Cpu,
  Layers,
  Baby,
  Pill,
  Brain,
  Heart,
  Stethoscope,
  ChevronDown,
  ChevronUp,
  Info,
  Filter,
  Sparkle,
} from 'lucide-react';
import { clinic } from '@/data/clinic';
import DnaCanvas3d from '@/components/dna-canvas-3d';

// ==========================================
// 1. DATA: HIERARQUIA GENÉTICA EDUCATIVA
// ==========================================
interface HierarchyLevel {
  id: string;
  step: string;
  name: string;
  subtitle: string;
  summary: string;
  details: string;
  analogy: string;
  clinicalFocus: string;
  badge: string;
}

const hierarchyLevels: HierarchyLevel[] = [
  {
    id: 'celula',
    step: '01',
    name: 'Célula Humana',
    subtitle: 'A unidade viva fundamental',
    badge: '30+ Trilhões no Corpo',
    summary:
      'A menor unidade viva de todo o organismo. Nosso corpo é composto por mais de 30 trilhões de células especializadas, como neurônios, células cardíacas, epiteliais e musculares.',
    details:
      'Praticamente todas as células do seu corpo (com exceção das hemácias maduras) possuem uma cópia idêntica e completa do seu código genético. É por isso que uma simples amostra de saliva (swab bucal) ou sangue fornece células suficientes para decodificar todo o seu DNA com precisão absoluta.',
    analogy:
      'Imagine a célula como uma fábrica altamente eficiente: no centro dela fica uma sala de arquivos protegida contendo a planta completa de toda a obra.',
    clinicalFocus: 'Amostras celulares simples por swab bucal ou sangue sem desconforto.',
  },
  {
    id: 'nucleo',
    step: '02',
    name: 'Núcleo Celular',
    subtitle: 'O cofre protetor do genoma',
    badge: 'Blindagem Molecular',
    summary:
      'O compartimento intracelular delimitado por uma dupla membrana biológica, cuja função primordial é blindar o material genético contra danos químicos e oxidativos.',
    details:
      'O núcleo mantém o genoma isolado do resto da célula. No laboratório molecular, o primeiro passo técnico chama-se "lise celular e nuclear": uma reação bioquímica controlada que abre delicadamente a célula e o núcleo para isolar e purificar as fitas de DNA intactas.',
    analogy:
      'O núcleo é como o cofre de alta segurança de um banco internacional, onde os livros originais ficam guardados em temperatura e ambiente controlados.',
    clinicalFocus: 'Extração e purificação de DNA com controle de pureza óptica (razão A260/A280).',
  },
  {
    id: 'cromossomo',
    step: '03',
    name: 'Cromossomos',
    subtitle: 'Os 23 pares organizadores',
    badge: '46 Estruturas no Total',
    summary:
      'Estruturas altamente condensadas formadas por DNA associado a proteínas histonas. Os seres humanos possuem 23 pares de cromossomos (46 no total), sendo 23 herdados da mãe e 23 do pai.',
    details:
      'Se esticássemos todo o DNA de uma única célula microscópica, ele mediria quase 2 metros de comprimento. Para caber em um espaço de apenas alguns micrômetros, o DNA se compacta como um novelo nos cromossomos. Alterações no número de cromossomos inteiros causam condições como a Síndrome de Down (Trissomia 21).',
    analogy:
      'Os cromossomos são como os 23 volumes de uma enciclopédia: se faltar um volume ou houver um volume duplicado, a leitura biológica se altera.',
    clinicalFocus: 'Detectados precocemente na gestação através do teste pré-natal NIPT.',
  },
  {
    id: 'dna',
    step: '04',
    name: 'Molécula de DNA',
    subtitle: 'A famosa dupla hélice',
    badge: '4 Letras Químicas (A, T, C, G)',
    summary:
      'O Ácido Desoxirribonucleico é a molécula em formato de escada em caracol (dupla hélice) formada por bilhões de pares de bases químicas: Adenina (A), Timina (T), Citosina (C) e Guanina (G).',
    details:
      'A ordem exata dessas quatro letras químicas constitui a linguagem da vida. O Sequenciamento de Nova Geração (NGS) realiza a leitura digital dessas sequências, comparando o genoma do paciente com o genoma humano de referência internacional para identificar variações de base única (SNVs).',
    analogy:
      'O DNA é o código binário fundamental da biologia: enquanto o computador lê 0s e 1s, a vida lê as sequências de A, T, C e G.',
    clinicalFocus: 'Sequenciamento massivo paralelo (NGS) com leitura profunda de milhões de fragmentos.',
  },
  {
    id: 'gene',
    step: '05',
    name: 'Genes & Variantes',
    subtitle: 'As instruções funcionais ativas',
    badge: '~20.000 Genes Humanos',
    summary:
      'Segmentos específicos de DNA que contêm as instruções necessárias para sintetizar proteínas funcionais no organismo. O genoma humano possui cerca de 20.000 genes codificadores.',
    details:
      'Mutações pontuais (troca de uma única letra química) ou inserções/deleções no gene podem alterar a proteína produzida. Nos painéis genéticos da clínica, analisamos genes com impacto clínico comprovado: genes de predisposição a câncer (ex: BRCA1, BRCA2), arritmias cardíacas (ex: MYBPC3) ou enzimas hepáticas do metabolismo de remédios (ex: CYP2D6).',
    analogy:
      'Os genes são as receitas individuais dentro do grande livro de receitas: se houver um erro de digitação no tempo de forno ou na quantidade de sal, o resultado do prato será afetado.',
    clinicalFocus: 'Painéis genéticos focados, Exoma completo (WES) e Farmacogenética personalizada.',
  },
];

// ==========================================
// 2. DATA: CORPO HUMANO INTERATIVO (HOTSPOTS)
// ==========================================
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

// ==========================================
// 4. DATA: LINHA DO TEMPO (5 ETAPAS)
// ==========================================
const workflowSteps = [
  {
    step: '01',
    title: 'Orientação Inicial & Acolhimento',
    desc: 'Nossa equipe esclarece suas dúvidas, explica os detalhes da metodologia e auxilia no alinhamento com a solicitação do seu médico.',
    icon: Stethoscope,
  },
  {
    step: '02',
    title: 'Definição do Exame Apropriado',
    desc: 'Identificação do painel genético exato conforme a especialidade (oncologia, cardiologia, NIPT, exoma ou farmacogenética) e preparo necessário.',
    icon: Dna,
  },
  {
    step: '03',
    title: 'Coleta Rápida & Confortável',
    desc: 'Procedimento simples por saliva (swab bucal indolor) ou pequena amostra de sangue, em ambiente clínico seguro e higienizado.',
    icon: Clock,
  },
  {
    step: '04',
    title: 'Processamento & Sequenciamento NGS',
    desc: 'As amostras são processadas em laboratórios de genética de padrão internacional com sequenciamento de última geração e controle rigoroso.',
    icon: Microscope,
  },
  {
    step: '05',
    title: 'Laudo Estruturado & Apoio Clínico',
    desc: 'Emissão de relatório molecular detalhado e conclusivo para que seu médico de confiança possa orientar condutas preventivas e personalizadas.',
    icon: FileText,
  },
];

// ==========================================
// 5. DATA: FAQS
// ==========================================
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

export default function GeneticaExperience() {
  const whatsappHref = `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
    'Olá! Gostaria de informações sobre os Exames Genéticos no Núcleo de Saúde Mais.'
  )}`;

  // Interactive States
  const [activeHierarchyId, setActiveHierarchyId] = useState<string>('celula');
  const [activeHotspotId, setActiveHotspotId] = useState<string>('cerebro');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Active Hierarchy Item
  const activeHierarchy = useMemo(
    () => hierarchyLevels.find((l) => l.id === activeHierarchyId) || hierarchyLevels[0],
    [activeHierarchyId]
  );

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

  return (
    <div className="genetica-page-container">
      {/* =====================================================================
          1. HERO COM DNA 3D INTERATIVO
          ===================================================================== */}
      <section className="genetica-hero-section">
        <div className="genetica-container">
          <div className="genetica-hero-grid">
            {/* Coluna Esquerda: Textos & Ações */}
            <div className="genetica-hero-left">
              <nav className="subpage-breadcrumb" aria-label="Navegação estrutural">
                <Link href="/">Início</Link>
                <span className="subpage-breadcrumb-separator">/</span>
                <span>Exames Genéticos</span>
              </nav>

              <div className="genetica-hero-badge">
                <Dna size={14} className="text-teal" />
                <span>MEDICINA DE PRECISÃO & INVESTIGAÇÃO HEREDITÁRIA</span>
              </div>

              <h1 className="genetica-hero-title">
                Exames Genéticos Avançados em Montes Claros
              </h1>

              <p className="genetica-hero-subtitle">
                A tecnologia do DNA a favor da sua saúde: antecipe riscos hereditários, personalize condutas
                médicas e adote uma postura preventiva de excelência com laudos estruturados e acolhimento clínico.
              </p>

              <div className="genetica-hero-highlights">
                <span className="genetica-hero-chip">
                  <Sparkles size={14} className="text-teal" /> Sequenciamento NGS
                </span>
                <span className="genetica-hero-chip">
                  <ShieldCheck size={14} className="text-teal" /> Laudos Acreditados
                </span>
                <span className="genetica-hero-chip">
                  <Clock size={14} className="text-teal" /> Coleta Rápida & Confortável
                </span>
                <span className="genetica-hero-chip">
                  <UserCheck size={14} className="text-teal" /> Apoio ao Seu Médico
                </span>
              </div>

              <div className="genetica-hero-actions">
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

                <a href="#corpo-interativo" className="btn btn-outline-white btn-lg">
                  <Activity size={18} />
                  <span>Explorar mapa anatômico</span>
                </a>
              </div>
            </div>

            {/* Coluna Direita: Molécula DNA 3D Interativa */}
            <div className="genetica-hero-right">
              <div className="genetica-dna-card">
                <DnaCanvas3d className="genetica-dna-canvas" />

                {/* Micro-badge Flutuante */}
                <div className="genetica-dna-floating-badge">
                  <Sparkles size={14} className="text-teal" />
                  <span>Molécula 3D em Tempo Real • Tecnologia NGS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. SEÇÃO EDUCATIVA: HIERARQUIA GENÉTICA (CÉLULA → GENE)
          ===================================================================== */}
      <section id="educativo" className="section bg-white genetica-section-padding">
        <div className="genetica-container">
          <div className="section-header-compact" style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 36px' }}>
            <div className="section-kicker" style={{ justifyContent: 'center' }}>
              <span className="kicker-line" />
              <span>CIÊNCIA DESCOMPLICADA</span>
              <span className="kicker-line" />
            </div>
            <h2 className="section-title">Como a informação genética está organizada no seu corpo?</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Do microscópico ao molecular: clique nos 5 níveis biológicos para entender como seu DNA
              guarda as instruções da vida e onde nossos exames atuam.
            </p>
          </div>

          <div className="genetica-hierarchy-wrapper">
            {/* Seletor Horizontal de Passos (Tabs) */}
            <div className="genetica-hierarchy-nav" role="tablist">
              {hierarchyLevels.map((lvl) => {
                const isActive = lvl.id === activeHierarchyId;
                return (
                  <button
                    key={lvl.id}
                    onClick={() => setActiveHierarchyId(lvl.id)}
                    className={`genetica-hierarchy-tab ${isActive ? 'active' : ''}`}
                    role="tab"
                    aria-selected={isActive}
                  >
                    <span className="tab-step">{lvl.step}</span>
                    <span className="tab-name">{lvl.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Conteúdo Dinâmico Split: Imagem Ilustrada + Card de Detalhes */}
            <div className="genetica-hierarchy-card">
              <div className="hierarchy-image-col">
                <div className="hierarchy-image-wrap">
                  <Image
                    src="/images/genetica/estrutura-genetica-celula.webp"
                    alt="Representação científica interativa: Célula, Núcleo, Cromossomo, DNA e Gene no Núcleo de Saúde Mais"
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="hierarchy-image"
                  />
                  <div className="hierarchy-image-badge">
                    <Dna size={14} className="text-teal" />
                    <span>Nível Ativo: {activeHierarchy.name}</span>
                  </div>
                </div>
              </div>

              <div className="hierarchy-text-col">
                <div className="hierarchy-badge-chip">
                  <span>Passo {activeHierarchy.step} de 05</span>
                  <span className="separator">•</span>
                  <span>{activeHierarchy.badge}</span>
                </div>

                <h3 className="hierarchy-detail-title">{activeHierarchy.name}</h3>
                <h4 className="hierarchy-detail-sub">{activeHierarchy.subtitle}</h4>

                <p className="hierarchy-detail-summary">{activeHierarchy.summary}</p>
                <p className="hierarchy-detail-desc">{activeHierarchy.details}</p>

                <div className="hierarchy-analogy-box">
                  <div className="analogy-icon">
                    <Sparkles size={16} className="text-teal" />
                  </div>
                  <div>
                    <strong>Analogia didática:</strong>
                    <p>{activeHierarchy.analogy}</p>
                  </div>
                </div>

                <div className="hierarchy-clinical-focus">
                  <ShieldCheck size={16} className="text-teal flex-shrink-0" />
                  <span>
                    <strong>Importância para o exame:</strong> {activeHierarchy.clinicalFocus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. CORPO HUMANO ANATÔMICO INTERATIVO
          ===================================================================== */}
      <section id="corpo-interativo" className="section genetica-anatomy-light">
        <div className="genetica-container">
          <div className="section-header-compact text-center" style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 36px' }}>
            <div className="section-kicker" style={{ justifyContent: 'center' }}>
              <span className="kicker-line" />
              <span>MAPA ANATÔMICO INTERATIVO</span>
              <span className="kicker-line" />
            </div>
            <h2 className="section-title">
              Aplicações dos Exames Genéticos no Organismo
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Passe o mouse ou toque nos pontos luminosos do corpo humano para explorar quais órgãos e
              sistemas contam com testes moleculares dedicados na nossa clínica.
            </p>
          </div>

          {/* Seletor Mobile / Tablet de Órgãos */}
          <div className="genetica-hotspots-mobile-nav">
            {anatomyHotspots.map((spot) => (
              <button
                key={spot.id}
                aria-pressed={spot.id === activeHotspotId}
                onClick={() => setActiveHotspotId(spot.id)}
                className={`genetica-hotspot-pill ${spot.id === activeHotspotId ? 'active' : ''}`}
              >
                <span>{spot.name}</span>
              </button>
            ))}
          </div>

          <div className="genetica-body-split">
            {/* Lado Esquerdo: Imagem Anatômica com Hotspots */}
            <div className="genetica-body-visual">
              <div className="genetica-body-image-wrap">
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
                      onClick={() => setActiveHotspotId(spot.id)}
                      onMouseEnter={() => setActiveHotspotId(spot.id)}
                      onFocus={() => setActiveHotspotId(spot.id)}
                      className={`genetica-hotspot-pin ${isSelected ? 'active' : ''}`}
                      style={{ top: spot.top, left: spot.left }}
                      aria-label={`Ver informações de ${spot.name}`}
                    >
                      <span className="hotspot-pulse" />
                      <span className="hotspot-dot" />
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
              <div className="body-details-card" aria-live="polite">
                <div className="details-header-row">
                  <div className="details-badge">{activeHotspot.badge}</div>
                  <span className="details-turnaround">
                    <Clock size={13} /> {activeHotspot.turnaround}
                  </span>
                </div>

                <h3 className="details-title">{activeHotspot.name}</h3>
                <h4 className="details-exam-name">{activeHotspot.examTitle}</h4>

                <p className="details-desc">{activeHotspot.description}</p>

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

                <div className="details-action-box">
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
                    <span>{activeHotspot.ctaText} no WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. CATÁLOGO INTERATIVO DE EXAMES COM FILTROS & BUSCA
          ===================================================================== */}
      <section id="paineis" className="section bg-white genetica-section-padding">
        <div className="genetica-container">
          <div className="section-header-compact text-center" style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 32px' }}>
            <div className="section-kicker" style={{ justifyContent: 'center' }}>
              <span className="kicker-line" />
              <span>PORTFÓLIO DE EXAMES DA CLÍNICA</span>
              <span className="kicker-line" />
            </div>
            <h2 className="section-title">Painéis e Testes Moleculares Disponíveis</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Filtre por categoria ou pesquise pelo nome do exame para encontrar a avaliação genética indicada
              pelo seu médico assistente.
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
                placeholder="Buscar por exame, gene ou indicação (ex: BRCA1, NIPT, coração, exoma...)"
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
                  <p className="exam-card-desc">{exam.desc}</p>

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

                  <div className="exam-card-footer">
                    <a
                      href={`https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
                        `Olá! Gostaria de consultar detalhes e valores do exame de ${exam.title}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-navy btn-sm"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <MessageCircle size={15} />
                      <span>Consultar este painel</span>
                    </a>
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
      </section>

      {/* =====================================================================
          5. TECNOLOGIA DE ANÁLISE GENÉTICA & RIGOR LABORATORIAL
          ===================================================================== */}
      <section className="section bg-neutral genetica-section-padding">
        <div className="genetica-container">
          <div className="genetica-split-section">
            {/* Imagem do Laboratório */}
            <div className="genetica-split-image-col">
              <div className="genetica-image-card">
                <Image
                  src="/images/genetica/laboratorio-genetica.webp"
                  alt="Cientista biomédica realizando preparo e pipetagem de amostras genéticas em ambiente laboratorial certificado"
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="genetica-tech-image"
                />
                <div className="genetica-floating-card">
                  <Cpu size={16} className="text-teal" />
                  <span>Plataformas de Sequenciamento NGS de Última Geração</span>
                </div>
              </div>
            </div>

            {/* Conteúdo Textual Explicativo */}
            <div className="genetica-split-text-col">
              <div className="section-kicker">
                <span className="kicker-line" />
                <span>TECNOLOGIA MOLECULAR DE PONTA</span>
              </div>
              <h2 className="section-title">
                Sequenciamento NGS e Bioinformática Clínica de Referência
              </h2>
              <p className="genetica-split-desc">
                O Núcleo de Saúde Mais atua em parceria com os mais conceituados laboratórios de genética humana
                do país, assegurando que cada amostra coletada em Montes Claros passe pelo mais elevado rigor
                de controle técnico e científico internacional.
              </p>

              <div className="genetica-features-grid">
                <div className="genetica-feature-item">
                  <div className="feature-icon">
                    <Microscope size={20} />
                  </div>
                  <div>
                    <h4>Leitura Massiva Paralela (NGS)</h4>
                    <p>
                      Milhões de fragmentos de DNA sequenciados simultaneamente com alta cobertura de profundidade,
                      garantindo sensibilidade superior a 99% na detecção de variantes.
                    </p>
                  </div>
                </div>

                <div className="genetica-feature-item">
                  <div className="feature-icon">
                    <Cpu size={20} />
                  </div>
                  <div>
                    <h4>Pipeline Computacional de Bioinformática</h4>
                    <p>
                      Algoritmos sofisticados filtram ruídos analíticos, comparam dados com bancos populacionais globais
                      (como GnomAD e ClinVar) e mapeiam variantes com exatidão.
                    </p>
                  </div>
                </div>

                <div className="genetica-feature-item">
                  <div className="feature-icon">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4>Classificação segundo Diretrizes ACMG</h4>
                    <p>
                      Todos os laudos seguem as diretrizes do Colégio Americano de Genética Médica e Genômica (ACMG),
                      categorizando variantes como patogênicas, provavelmente patogênicas ou VUS.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. COMO FUNCIONA O EXAME GENÉTICO (LINHA DO TEMPO)
          ===================================================================== */}
      <section className="section bg-white genetica-section-padding">
        <div className="genetica-container">
          <div className="section-header-compact text-center" style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 40px' }}>
            <div className="section-kicker" style={{ justifyContent: 'center' }}>
              <span className="kicker-line" />
              <span>PASSO A PASSO</span>
              <span className="kicker-line" />
            </div>
            <h2 className="section-title">Como funciona o seu exame genético?</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Um fluxo claro, transparente e acolhedor do primeiro contato à entrega do laudo médico.
            </p>
          </div>

          <div className="genetica-timeline-grid">
            {workflowSteps.map((ws, i) => {
              const Icon = ws.icon;
              return (
                <div key={ws.step} className="genetica-timeline-card">
                  <div className="timeline-step-badge">{ws.step}</div>
                  <div className="timeline-icon-box">
                    <Icon size={20} />
                  </div>
                  <h3 className="timeline-card-title">{ws.title}</h3>
                  <p className="timeline-card-desc">{ws.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. CONSULTA MÉDICA & HUMANIZAÇÃO (IMAGEM 5)
          ===================================================================== */}
      <section className="section bg-neutral genetica-section-padding">
        <div className="genetica-container">
          <div className="genetica-split-section reverse">
            {/* Imagem Médica + Paciente */}
            <div className="genetica-split-image-col">
              <div className="genetica-image-card">
                <Image
                  src="/images/genetica/consulta-genetica-medica.webp"
                  alt="Médica explicando os resultados e o laudo do teste genético em tablet para o paciente durante consulta humanizada"
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="genetica-consult-image"
                />
                <div className="genetica-floating-card">
                  <UserCheck size={16} className="text-teal" />
                  <span>Aconselhamento Clínico & Cuidado Humanizado</span>
                </div>
              </div>
            </div>

            {/* Texto Aconselhamento */}
            <div className="genetica-split-text-col">
              <div className="section-kicker">
                <span className="kicker-line" />
                <span>O PAPEL DO MÉDICO</span>
              </div>
              <h2 className="section-title">
                O resultado genético ganha verdadeiro valor na consulta médica
              </h2>
              <p className="genetica-split-desc">
                Um exame genético não é uma sentença definitiva, mas sim uma bússola preditiva. No Núcleo de Saúde
                Mais, entendemos que o laudo molecular deve ser integrado ao seu histórico clínico, hábitos de vida
                e história familiar de saúde.
              </p>

              <div className="genetica-consult-points">
                <div className="consult-point">
                  <CheckCircle2 size={18} className="text-teal flex-shrink-0" />
                  <div>
                    <strong>Interpretação Segura e Contextualizada:</strong>{' '}
                    <span>compreensão exata do que significa uma variante de significado incerto (VUS) ou patogênica.</span>
                  </div>
                </div>

                <div className="consult-point">
                  <CheckCircle2 size={18} className="text-teal flex-shrink-0" />
                  <div>
                    <strong>Plano de Ação Preventivo:</strong>{' '}
                    <span>definição de exames de rastreio em intervalos personalizados para você e seus familiares.</span>
                  </div>
                </div>

                <div className="consult-point">
                  <CheckCircle2 size={18} className="text-teal flex-shrink-0" />
                  <div>
                    <strong>Apoio Integral à Família:</strong>{' '}
                    <span>orientação clara quando houver indicação de investigação em cascata para filhos ou irmãos.</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '24px' }}>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-teal btn-lg"
                >
                  <MessageCircle size={18} />
                  <span>Agendar orientação com nossa equipe</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. DÚVIDAS FREQUENTES EM ACCORDION INTERATIVO
          ===================================================================== */}
      <section className="section bg-white genetica-section-padding">
        <div className="genetica-container" style={{ maxWidth: '860px' }}>
          <div className="section-header-compact text-center" style={{ textAlign: 'center', margin: '0 auto 36px' }}>
            <div className="section-kicker" style={{ justifyContent: 'center' }}>
              <span className="kicker-line" />
              <span>TIRE SUAS DÚVIDAS</span>
              <span className="kicker-line" />
            </div>
            <h2 className="section-title text-center">Perguntas Frequentes sobre Genética</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Tudo o que você precisa saber antes de realizar seu exame molecular no Núcleo de Saúde Mais.
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

      {/* =====================================================================
          9. BANNER CTA FINAL
          ===================================================================== */}
      <section className="genetica-cta-bottom-section">
        <div className="genetica-container">
          <div className="genetica-cta-bottom-banner">
            <div>
              <h3>Pronto para conhecer o que o seu DNA tem a dizer?</h3>
              <p>
                Nossa equipe médica e laboratorial analisa pedidos de médicos de qualquer especialidade e
                verifica a disponibilidade e o preparo adequado para o seu exame.
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
    </div>
  );
}
