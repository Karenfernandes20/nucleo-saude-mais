export interface Specialty {
  name: string;
  icon: string;
  category?: string;
  description: string;
  benefits: string[];
}

export interface ExamCategory {
  name: string;
  icon: string;
  description: string;
  highlights: string[];
}

export interface InsurancePartner {
  name: string;
  image: string;
  highlight?: boolean;
}

export interface FacilityPhoto {
  title: string;
  category: string;
  image: string;
  description: string;
}

export const clinic = {
  name: 'Clínica Núcleo de Saúde Mais',
  shortName: 'Núcleo de Saúde Mais',
  tagline: 'Mais saúde para você. Mais cuidado por você.',
  subtagline: 'Consultas, exames e atendimento humanizado em um só lugar.',
  address: 'Rua Januária, 684, Centro',
  cityState: 'Montes Claros – MG',
  cep: '39400-085',
  phone: '(38) 99977-1212',
  phoneDisplay: '(38) 99977-1212',
  whatsappNumber: '5538999771212',
  whatsappMessage: 'Olá! Gostaria de agendar uma consulta no Núcleo de Saúde Mais.',
  instagram: '@nucleodesaudemais',
  instagramUrl: 'https://www.instagram.com/nucleodesaudemais/',
  website: 'www.nucleodesaudemais.com',
  websiteUrl: 'https://www.nucleodesaudemais.com',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rua+Janu%C3%A1ria%2C+684%2C+Centro%2C+Montes+Claros+-+MG',
  mapsEmbedUrl: 'https://www.google.com/maps?q=Rua+Janu%C3%A1ria%2C+684%2C+Centro%2C+Montes+Claros%2C+MG%2C+Brasil&output=embed',
  technicalLead: 'Dra. Sofia Borges',
  crm: 'CRM-MG 69139',
  laboratoryTurnaround: 'até 20 minutos*',
  workingHours: [
    { days: 'Segunda a Sexta', hours: '07:00 às 18:00' },
    { days: 'Sábados e Domingos', hours: 'Fechado' },
  ],
};

export const differentials = [
  {
    id: 'humanizacao',
    title: 'Atendimento Humanizado',
    description: 'Cuidado acolhedor e escuta atenta desde a recepção até a consulta médica.',
    icon: 'heart-pulse',
  },
  {
    id: 'tecnologia',
    title: 'Tecnologia e Excelência',
    description: 'Equipamentos modernos e rigor técnico para diagnósticos com rapidez e máxima precisão.',
    icon: 'shield-check',
  },
  {
    id: 'especialidades',
    title: 'Diversas Especialidades',
    description: 'Corpo clínico multidisciplinar reunindo consultas e exames preventivos em um só espaço.',
    icon: 'stethoscope',
  },
  {
    id: 'cuidado',
    title: 'Cuidado Completo',
    description: 'Consultas médicas, exames laboratoriais e acompanhamento contínuo no Centro de Montes Claros.',
    icon: 'activity',
  },
];

export const pillars = [
  {
    title: 'Humanização',
    subtitle: 'Relação próxima e acolhedora',
    description: 'Um novo olhar sobre o relacionamento médico-paciente, priorizando a empatia, o respeito e o tempo necessário para cada consulta.',
    icon: 'heart-handshake',
  },
  {
    title: 'Excelência',
    subtitle: 'Rigor técnico e competência',
    description: 'Profissionais altamente capacitados, alinhados às melhores práticas clínicas para oferecer diagnósticos precisos e tratamentos eficazes.',
    icon: 'award',
  },
  {
    title: 'Inovação',
    subtitle: 'Tecnologia a serviço da saúde',
    description: 'Investimento contínuo em processos ágeis, instalações modernas e integração completa entre consultas e exames.',
    icon: 'sparkles',
  },
];

export const specialties: Specialty[] = [
  {
    name: 'Cardiologia',
    icon: 'heart-pulse',
    category: 'Clínica',
    description: 'Prevenção, diagnóstico e tratamento de doenças do coração e do sistema cardiovascular, com avaliação de risco cirúrgico e acompanhamento da hipertensão arterial.',
    benefits: ['Eletrocardiograma e exames associados', 'Avaliação de risco cirúrgico e cardiovascular', 'Acompanhamento preventivo de pressão e colesterol'],
  },
  {
    name: 'Pediatria',
    icon: 'baby',
    category: 'Infantil',
    description: 'Acompanhamento integral do desenvolvimento físico e emocional de bebês, crianças e adolescentes, com orientação detalhada para os pais e responsáveis.',
    benefits: ['Puericultura e acompanhamento do crescimento', 'Vacinação e orientações alimentares', 'Diagnóstico e tratamento de patologias infantis'],
  },
  {
    name: 'Ginecologia',
    icon: 'venus',
    category: 'Saúde da Mulher',
    description: 'Atenção especializada à saúde feminina em todas as fases da vida, desde a adolescência até a maturidade, com exames preventivos e acolhimento singular.',
    benefits: ['Exames preventivos de rotina e Papanicolau', 'Planejamento reprodutivo e métodos contraceptivos', 'Acompanhamento do climatério e menopausa'],
  },
  {
    name: 'Ortopedia',
    icon: 'bone',
    category: 'Locomotor',
    description: 'Diagnóstico e tratamento de lesões, traumas e patologias dos ossos, músculos, articulações e ligamentos, restaurando sua mobilidade e conforto.',
    benefits: ['Tratamento de dores articulares e na coluna', 'Recuperação de entorses, fraturas e tendinites', 'Avaliação funcional para retorno a atividades físicas'],
  },
  {
    name: 'Neurologia',
    icon: 'brain-circuit',
    category: 'Sistema Nervoso',
    description: 'Investigação e tratamento de distúrbios do cérebro e sistema nervoso, como enxaquecas, distúrbios do sono, tremores, epilepsia e perda de memória.',
    benefits: ['Tratamento especializado para cefaleias crônicas', 'Acompanhamento de neuropatias e dores de cabeça', 'Exames neurológicos dedicados e acompanhamento contínuo'],
  },
  {
    name: 'Otorrinolaringologia',
    icon: 'ear',
    category: 'Especializada',
    description: 'Cuidados dedicados às patologias do ouvido, nariz e garganta, solucionando queixas como sinusites, rinites, alterações auditivas e distúrbios vocais.',
    benefits: ['Diagnóstico de perda auditiva e zumbidos', 'Tratamento de rinites, sinusites e desvios de septo', 'Exames otorrinolaringológicos integrados'],
  },
  {
    name: 'Endocrinologia',
    icon: 'activity',
    category: 'Metabolismo',
    description: 'Avaliação clínica dos hormônios e metabolismo corporal, auxiliando no controle do diabetes, doenças da tireoide, obesidade e distúrbios metabólicos.',
    benefits: ['Controle e manejo do diabetes e pré-diabetes', 'Investigação e tratamento de disfunções da tireoide', 'Plano terapêutico para equilíbrio hormonal e peso'],
  },
  {
    name: 'Geriatria',
    icon: 'hand-heart',
    category: 'Melhor Idade',
    description: 'Medicina voltada à preservação da autonomia, independência e qualidade de vida na terceira idade, com abordagem global do idoso.',
    benefits: ['Avaliação geriátrica ampla e integrada', 'Prevenção de quedas e otimização de medicações', 'Acolhimento familiar e plano de cuidados contínuos'],
  },
  {
    name: 'Psiquiatria',
    icon: 'messages-square',
    category: 'Saúde Mental',
    description: 'Diagnóstico e acompanhamento médico dos transtornos de humor, ansiedade, depressão, estresse pós-traumático e equilíbrio neuroquímico.',
    benefits: ['Tratamento com escuta humanizada e sigilo', 'Adequação medicamentosa responsável e personalizada', 'Integração contínua com a psicologia clínica'],
  },
  {
    name: 'Psicologia',
    icon: 'brain',
    category: 'Saúde Mental',
    description: 'Psicoterapia individual e acolhimento emocional em momentos de transição, estresse, autoconhecimento e desenvolvimento de resiliência psicológica.',
    benefits: ['Espaço seguro para expressão de sentimentos', 'Estratégias práticas contra ansiedade e angústia', 'Sessões focadas no bem-estar e saúde emocional'],
  },
  {
    name: 'Nutrição',
    icon: 'apple',
    category: 'Estilo de Vida',
    description: 'Orientação nutricional individualizada respeitando seus hábitos e rotina, promovendo saúde preventiva e performance diária sustentável.',
    benefits: ['Plano alimentar personalizado e realista', 'Nutrição preventiva para diabetes e colesterol', 'Reeducação alimentar sem restrições extremas'],
  },
  {
    name: 'Fisioterapia',
    icon: 'accessibility',
    category: 'Reabilitação',
    description: 'Reabilitação física, alívio de quadros dolorosos e fortalecimento funcional para restaurar o movimento natural do seu corpo.',
    benefits: ['Reabilitação postural e alívio de dores nas costas', 'Fisioterapia motora e funcional pós-trauma', 'Melhora da amplitude de movimento e equilíbrio'],
  },
  {
    name: 'Anestesiologia',
    icon: 'syringe',
    category: 'Cirúrgica',
    description: 'Consulta pré-anestésica detalhada para esclarecer dúvidas, avaliar riscos e garantir total segurança em procedimentos clínicos e cirúrgicos.',
    benefits: ['Avaliação do histórico clínico pré-operatório', 'Orientação clara para tranquilizar o paciente', 'Planejamento anestésico seguro e individualizado'],
  },
  {
    name: 'Medicina do Trabalho',
    icon: 'briefcase-medical',
    category: 'Ocupacional',
    description: 'Assessoria completa em saúde ocupacional com exames admissionais, demissionais, periódicos e de retorno ao trabalho para empresas e colaboradores.',
    benefits: ['Emissão rápida de Atestado de Saúde Ocupacional (ASO)', 'Exames complementares no próprio local', 'Conformidade com as Normas Regulamentadoras (NRs)'],
  },
];

export const examCategories: ExamCategory[] = [
  {
    name: 'Exames laboratoriais',
    icon: 'flask-conical',
    description: 'Hemogramas, perfil lipídico, glicemia, dosagens hormonais e exames bioquímicos completos.',
    highlights: ['Agilidade na coleta', 'Resultados laboratoriais em até 20 min*', 'Controle rigoroso de qualidade'],
  },
  {
    name: 'Covid-19',
    icon: 'microscope',
    description: 'Testes e exames diagnósticos para detecção e acompanhamento da Covid-19 com agilidade e segurança.',
    highlights: ['Coleta ágil e cuidadosa', 'Resultados com confiabilidade técnica', 'Atendimento com rigor preventivo'],
  },
  {
    name: 'Exames otorrinolaringológicos',
    icon: 'ear',
    description: 'Avaliações especializadas para investigação de audição, equilíbrio, cavidade nasal e laringe.',
    highlights: ['Investigação de queixas auditivas', 'Avaliação de via aérea superior', 'Atendimento cuidadoso'],
  },
  {
    name: 'Exames ocupacionais',
    icon: 'hard-hat',
    description: 'Bateria de exames admissionais, demissionais, periódicos e de mudança de risco com emissão de ASO.',
    highlights: ['Emissão ágil de ASO', 'Atendimento para empresas parceiras', 'Facilidade para trabalhadores'],
  },
  {
    name: 'Exames neurológicos',
    icon: 'brain-circuit',
    description: 'Testes e avaliações complementares para suporte ao diagnóstico das condições neurológicas.',
    highlights: ['Avaliação neurofuncional', 'Apoio especializado', 'Acompanhamento integrado'],
  },
  {
    name: 'Ultrassonografias',
    icon: 'scan-line',
    description: 'Exames ultrassonográficos abdominais, pélvicos, tireoide, obstétricos e de partes moles.',
    highlights: ['Imagens de alta resolução', 'Equipamento de ultrassom moderno', 'Interpretação diagnóstica precisa'],
  },
  {
    name: 'Exames cardiológicos',
    icon: 'heart-pulse',
    description: 'Eletrocardiograma (ECG) e avaliações do ritmo e função cardíaca com emissão de laudo especializado.',
    highlights: ['Laudos emitidos por cardiologistas', 'Avaliação rápida de risco cirúrgico', 'Conforto e segurança no atendimento'],
  },
  {
    name: 'Diagnóstico por imagem',
    icon: 'scan',
    description: 'Procedimentos de imagem fundamentais para elucidação diagnóstica e planejamento de conduta terapêutica.',
    highlights: ['Estrutura moderna e organizada', 'Profissionais capacitados', 'Integração direta com as consultas'],
  },
];

export const insurancePartners: InsurancePartner[] = [
  { name: 'AMIL', image: '/images/insurance/01_amil.png' },
  { name: 'Bradesco Saúde', image: '/images/insurance/02_bradesco_saude.png' },
  { name: 'CAMED', image: '/images/insurance/03_camed.png' },
  { name: 'Cartão Saúde Mais', image: '/images/insurance/04_cartao_saude_mais.png' },
  { name: 'CISVARG', image: '/images/insurance/05_cisvarg.png' },
  { name: 'PMMG', image: '/images/insurance/06_pmmg.png' },
  { name: 'Pró-Saúde', image: '/images/insurance/07_pro_saude.png' },
  { name: 'PROCEDE', image: '/images/insurance/08_procede.png' },
  { name: 'SulAmérica', image: '/images/insurance/09_sulamerica.png' },
  { name: 'Sul do Pará', image: '/images/insurance/10_sul_do_para.png' },
  { name: 'TEM Saúde', image: '/images/insurance/11_tem_saude.png' },
  { name: 'Vittallis', image: '/images/insurance/12_vittallis.png' },
  { name: 'Vivendo Bem', image: '/images/insurance/13_vivendo_bem.png' },
];

export const facilityGallery: FacilityPhoto[] = [
  {
    title: 'Consultório Principal',
    category: 'Consultório',
    image: '/images/clinica/facility/estrutura_05_consultorio_logo.webp',
    description: 'Consultório moderno com a identidade do Núcleo de Saúde Mais, pensado para proporcionar uma consulta acolhedora e agradável.',
  },
  {
    title: 'Recepção e Sala de Espera',
    category: 'Acolhimento',
    image: '/images/clinica/facility/estrutura_02_recepcao_espera.webp',
    description: 'Ambiente climatizado, silencioso e confortável para receber você e seus acompanhantes com total tranquilidade.',
  },
  {
    title: 'Fachada da Clínica',
    category: 'Estrutura Externa',
    image: '/images/clinica/facade/fachada.webp',
    description: 'Localizada no Centro de Montes Claros, com fácil acesso e identificação para sua conveniência.',
  },
  {
    title: 'Consultório de Exames e Avaliação',
    category: 'Atendimento',
    image: '/images/clinica/facility/estrutura_01_consultorio_angulo.webp',
    description: 'Mobiliário ergonômico e equipamentos de ponta para avaliações médicas precisas e confortáveis.',
  },
  {
    title: 'Sala de Atendimento Individual',
    category: 'Consultório',
    image: '/images/clinica/facility/estrutura_03_consultorio_branco.webp',
    description: 'Ambiente privativo para consultas médicas, psicológicas e acompanhamento nutricional detalhado.',
  },
  {
    title: 'Balcão de Atendimento e Triagem',
    category: 'Recepção',
    image: '/images/clinica/facility/estrutura_06_recepcao_balcao.webp',
    description: 'Equipe sempre pronta para tirar dúvidas, agilizar cadastros e encaminhar seu atendimento sem perda de tempo.',
  },
  {
    title: 'Consultório Amplo Integrado',
    category: 'Consultório',
    image: '/images/clinica/facility/estrutura_07_consultorio_amplo.webp',
    description: 'Infraestrutura completa para consultas com acompanhantes e atendimentos com conforto máximo.',
  },
  {
    title: 'Consultório de Especialidades',
    category: 'Consultório',
    image: '/images/clinica/facility/estrutura_04_consultorio_vertical.webp',
    description: 'Espaço dedicado a especialidades clínicas e ocupacionais com higiene rigorosa e padrão elevado.',
  },
];

export const faqItems = [
  {
    question: 'Como faço para agendar minha consulta ou exame?',
    answer: 'O agendamento é muito simples e rápido: basta clicar em qualquer botão de WhatsApp aqui no site ou mandar uma mensagem para (38) 99977-1212. Nossa equipe informa datas, horários disponíveis e valores imediatamente.',
  },
  {
    question: 'A clínica realiza exames laboratoriais no mesmo local?',
    answer: 'Sim! Possuímos estrutura integrada para coleta e realização de exames laboratoriais, com resultados rápidos (em até 20 minutos para testes laboratoriais ágeis*), proporcionando economia de tempo para você.',
  },
  {
    question: 'Quais convênios são atendidos pelo Núcleo de Saúde Mais?',
    answer: 'Atendemos convênios renomados como AMIL, Bradesco Saúde, SulAmérica, Vittallis, CAMED, PMMG, Pró-Saúde, Cartão Saúde Mais, entre outros. Como a cobertura pode variar conforme o procedimento ou especialidade, sugerimos enviar uma mensagem pelo WhatsApp para confirmação imediata.',
  },
  {
    question: 'Qual é o horário de funcionamento da clínica?',
    answer: 'Atendemos de segunda a sexta-feira, das 07:00 às 18:00 (sábados e domingos fechado). Estamos situados na Rua Januária, 684, no Centro de Montes Claros – MG.',
  },
  {
    question: 'Não tenho convênio. Consigo agendar consultas particulares acessíveis?',
    answer: 'Com certeza! Um dos grandes pilares do Núcleo de Saúde Mais é democratizar o acesso à medicina de excelência, oferecendo consultas particulares e pacotes de exames com valores justos e acessíveis.',
  },
];
