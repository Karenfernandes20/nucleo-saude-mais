export const clinic = {
  name: 'Clínica Núcleo de Saúde Mais',
  shortName: 'Núcleo de Saúde Mais',
  address: 'Rua Januária, 684, Centro, Montes Claros - MG',
  phone: '(38) 9 9977-1212',
  whatsappNumber: '5538999771212',
  instagram: '@nucleodesaudemais',
  instagramUrl: 'https://www.instagram.com/nucleodesaudemais/',
  website: 'www.nucleodesaudemais.com.br',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rua+Janu%C3%A1ria%2C+684%2C+Centro%2C+Montes+Claros+-+MG',
  mapsEmbedUrl: 'https://www.google.com/maps?q=Rua+Janu%C3%A1ria%2C+684%2C+Centro%2C+Montes+Claros%2C+MG%2C+Brasil&output=embed',
  technicalLead: 'Dra. Sofia Borges',
  crm: 'CRM-MG 69139',
  laboratoryTurnaround: 'até 20 min*',
};

export const specialties = [
  { name: 'Cardiologia', icon: 'heart-pulse' },
  { name: 'Pediatria', icon: 'baby' },
  { name: 'Psicologia', icon: 'brain' },
  { name: 'Neurologia', icon: 'brain-circuit' },
  { name: 'Otorrinolaringologia', icon: 'ear' },
  { name: 'Anestesiologia', icon: 'syringe' },
  { name: 'Geriatria', icon: 'hand-heart' },
  { name: 'Ginecologia', icon: 'venus' },
  { name: 'Ortopedia', icon: 'bone' },
  { name: 'Endocrinologia', icon: 'activity' },
  { name: 'Nutrição', icon: 'apple' },
  { name: 'Psiquiatria', icon: 'messages-square' },
  { name: 'Fisioterapia', icon: 'accessibility' },
  { name: 'Medicina do Trabalho', icon: 'briefcase-medical' },
];

export const specialtyDetails: Record<string, { description: string; benefits: string[]; accent: string }> = {
  Cardiologia: { description: 'Especialidade dedicada à prevenção, avaliação e acompanhamento da saúde do coração e do sistema cardiovascular.', benefits: ['Avaliação cardiovascular', 'Prevenção e diagnóstico', 'Acompanhamento especializado'], accent: '#e84963' },
  Pediatria: { description: 'Cuidados médicos voltados à saúde de crianças e adolescentes, com atenção a cada fase do desenvolvimento.', benefits: ['Cuidado infantil', 'Acompanhamento do desenvolvimento', 'Orientação para famílias'], accent: '#ef9c4c' },
  Psicologia: { description: 'Acompanhamento psicológico e cuidado com a saúde emocional em diferentes momentos da vida.', benefits: ['Escuta qualificada', 'Cuidado emocional', 'Acompanhamento individualizado'], accent: '#a66bd4' },
  Neurologia: { description: 'Avaliação de condições relacionadas ao sistema nervoso, com acompanhamento especializado e cuidadoso.', benefits: ['Avaliação neurológica', 'Investigação cuidadosa', 'Acompanhamento contínuo'], accent: '#6c82dc' },
  Otorrinolaringologia: { description: 'Cuidados relacionados ao ouvido, nariz e garganta para diferentes necessidades de saúde.', benefits: ['Ouvido, nariz e garganta', 'Avaliação especializada', 'Orientação individualizada'], accent: '#4ab3b1' },
  Anestesiologia: { description: 'Avaliação e acompanhamento relacionados à anestesia, com atenção à segurança e ao planejamento.', benefits: ['Avaliação prévia', 'Planejamento individual', 'Orientação especializada'], accent: '#698ca8' },
  Geriatria: { description: 'Cuidados de saúde direcionados às pessoas idosas, respeitando suas necessidades e sua rotina.', benefits: ['Cuidado integral', 'Acompanhamento próximo', 'Mais qualidade de vida'], accent: '#d18b57' },
  Ginecologia: { description: 'Acompanhamento da saúde ginecológica com escuta, prevenção e cuidado em todas as fases da vida.', benefits: ['Prevenção e cuidado', 'Acompanhamento ginecológico', 'Atendimento acolhedor'], accent: '#df6c9a' },
  Ortopedia: { description: 'Avaliação de condições relacionadas aos ossos, músculos e articulações.', benefits: ['Avaliação musculoesquelética', 'Cuidado das articulações', 'Orientação funcional'], accent: '#5b9bc5' },
  Endocrinologia: { description: 'Acompanhamento de condições hormonais e metabólicas com orientação individualizada.', benefits: ['Saúde hormonal', 'Avaliação metabólica', 'Acompanhamento clínico'], accent: '#72ae69' },
  Nutrição: { description: 'Orientação alimentar individualizada para apoiar escolhas mais equilibradas e adequadas à sua rotina.', benefits: ['Orientação alimentar', 'Plano individualizado', 'Hábitos mais equilibrados'], accent: '#6eaf76' },
  Psiquiatria: { description: 'Avaliação e acompanhamento da saúde mental com atenção à história e às necessidades de cada pessoa.', benefits: ['Avaliação individual', 'Cuidado em saúde mental', 'Acompanhamento contínuo'], accent: '#7c76c9' },
  Fisioterapia: { description: 'Reabilitação, recuperação funcional e promoção do movimento com acompanhamento profissional.', benefits: ['Recuperação funcional', 'Promoção do movimento', 'Plano de cuidado'], accent: '#3aa9a7' },
  'Medicina do Trabalho': { description: 'Cuidados e avaliações relacionados à saúde ocupacional e ao bem-estar no ambiente de trabalho.', benefits: ['Saúde ocupacional', 'Avaliações profissionais', 'Orientação preventiva'], accent: '#6c8e9c' },
};

export const exams = [
  { name: 'Exames laboratoriais', icon: 'flask-conical' },
  { name: 'Exames cardiológicos', icon: 'heart-pulse' },
  { name: 'Ultrassonografias', icon: 'scan-line' },
  { name: 'Diagnóstico por imagem', icon: 'scan' },
  { name: 'Exames ocupacionais', icon: 'hard-hat' },
  { name: 'Exames neurológicos', icon: 'brain-circuit' },
  { name: 'Exames otorrinolaringológicos', icon: 'ear' },
];

export const insurancePlans = [
  'AMIL',
  'BRADESCO',
  'CAMED',
  'CARTÃO DE SAÚDE MAIS',
  'CISVARG',
  'PMMG',
  'PRÓ SAÚDE',
  'PROCEDE',
  'SUL AMÉRICA',
  'SUL DO PARÁ',
  'TEM SAÚDE',
  'VITTALLIS',
  'VIVENDO BEM',
];

export const insurancePartners = [
  { name: 'AMIL', image: '/images/insurance/01_amil.png' },
  { name: 'BRADESCO', image: '/images/insurance/02_bradesco_saude.png' },
  { name: 'CAMED', image: '/images/insurance/03_camed.png' },
  { name: 'CARTÃO DE SAÚDE MAIS', image: null },
  { name: 'CISVARG', image: null },
  { name: 'PMMG', image: null },
  { name: 'PRÓ SAÚDE', image: null },
  { name: 'PROCEDE', image: null },
  { name: 'SUL AMÉRICA', image: '/images/insurance/09_sulamerica.png' },
  { name: 'SUL DO PARÁ', image: null },
  { name: 'TEM SAÚDE', image: null },
  { name: 'VITTALLIS', image: '/images/insurance/12_vittallis.png' },
  { name: 'VIVENDO BEM', image: null },
];

export const faqItems = [
  {
    question: 'Como faço para agendar uma consulta?',
    answer: 'Você pode entrar em contato com nossa equipe pelo WhatsApp e consultar a disponibilidade de horários.',
  },
  {
    question: 'Quais especialidades a clínica atende?',
    answer: 'A clínica reúne profissionais de diferentes especialidades. Consulte a lista apresentada no site e confirme a disponibilidade com nossa equipe.',
  },
  {
    question: 'A clínica realiza exames?',
    answer: 'Sim. A clínica apresenta diferentes modalidades de exames. Consulte a disponibilidade de cada procedimento.',
  },
  {
    question: 'Onde a clínica está localizada?',
    answer: 'Na Rua Januária, 684, Centro, Montes Claros - MG.',
  },
  {
    question: 'A clínica atende convênios?',
    answer: 'Consulte os convênios disponíveis na seção de planos atendidos ou fale com nossa equipe para confirmar a cobertura.',
  },
];

export const valueCards = [
  {
    title: 'Resumo do negócio',
    text: 'Clínica médica multiespecializada em Montes Claros que reúne consultas e exames em um só lugar, com atendimento humanizado e estrutura preparada para diferentes necessidades de saúde.',
    icon: 'building-2',
  },
  {
    title: 'Proposta de valor',
    text: 'Oferecer atendimento médico de qualidade, reunindo profissionais de diferentes especialidades e exames com praticidade, acolhimento e conveniência.',
    icon: 'gem',
  },
  {
    title: 'Público-alvo',
    text: 'Pessoas e famílias que procuram consultas médicas e exames em Montes Claros, valorizando comodidade, confiança e variedade de atendimentos.',
    icon: 'users-round',
  },
  {
    title: 'Diferencial central',
    text: 'Variedade de especialidades, preços acessíveis, atendimento acolhedor e facilidade no agendamento.',
    icon: 'star',
  },
];

export const reasons = [
  { title: 'Equipe qualificada', text: 'Profissionais de diferentes especialidades, comprometidos com a qualidade do atendimento.', icon: 'users' },
  { title: 'Agendamento fácil', text: 'Entre em contato pelo WhatsApp e marque sua consulta com praticidade.', icon: 'calendar-check-2' },
  { title: 'Estrutura moderna', text: 'Ambientes organizados, confortáveis e preparados para receber você.', icon: 'building-2' },
  { title: 'Cuidado completo', text: 'Consultas, exames e acompanhamento em um só lugar.', icon: 'heart-pulse' },
];

export const steps = [
  { number: '01', title: 'Escolha a especialidade', text: 'Encontre a área de atendimento que você precisa.', icon: 'stethoscope' },
  { number: '02', title: 'Fale pelo WhatsApp', text: 'Entre em contato com nossa equipe de atendimento.', icon: 'message-circle' },
  { number: '03', title: 'Confirme seu horário', text: 'Consulte os horários disponíveis e conclua seu agendamento.', icon: 'calendar-check-2' },
];
