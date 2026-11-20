import { Question } from '../types';
import { applyOverridesToPool, prepareShuffledQuestion, shuffle } from './questions';
import { CURRICULO_3EM_QUESTIONS } from './curriculo3AnoQuestions';

export const CURRICULO_SERIES = [
  '6º Ano Fundamental',
  '7º Ano Fundamental',
  '8º Ano Fundamental',
  '9º Ano Fundamental',
  '1º Ano Ensino Médio',
  '2º Ano Ensino Médio',
  '3º Ano Ensino Médio'
] as const;

export type CurriculoSerie = typeof CURRICULO_SERIES[number];

export interface SerieInfo {
  serie: CurriculoSerie;
  titulo: string;
  subtitulo: string;
  badge: string;
  icon: string;
  descricao: string;
  topicos: string[];
  corGradient: string;
  neonBorder: string;
}

export interface SerieColorTheme {
  serie: CurriculoSerie;
  nomeCor: string;
  cardBorder: string;
  cardBorderHover: string;
  cardHeroGradient: string;
  badgeBg: string;
  badgeBorder: string;
  textAccent: string;
  buttonGradient: string;
  accentBar: string;
  iconBg: string;
}

export const SERIE_COLOR_THEMES: Record<CurriculoSerie, SerieColorTheme> = {
  '6º Ano Fundamental': {
    serie: '6º Ano Fundamental',
    nomeCor: 'Laranja Solar Vibrante',
    cardBorder: 'border-orange-500/60',
    cardBorderHover: 'hover:border-orange-400 hover:shadow-[0_0_25px_rgba(249,115,22,0.3)]',
    cardHeroGradient: 'from-[#291002] via-[#381603] to-[#1f0b01]',
    badgeBg: 'bg-orange-950/85',
    badgeBorder: 'border-orange-500/60',
    textAccent: 'text-orange-300',
    buttonGradient: 'bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-slate-950 font-black shadow-[0_0_20px_rgba(249,115,22,0.4)]',
    accentBar: 'bg-orange-500',
    iconBg: 'bg-orange-500/20 text-orange-300 border border-orange-400/50'
  },
  '7º Ano Fundamental': {
    serie: '7º Ano Fundamental',
    nomeCor: 'Vermelho-Alaranjado Vulcânico',
    cardBorder: 'border-red-500/60',
    cardBorderHover: 'hover:border-orange-400 hover:shadow-[0_0_25px_rgba(239,68,68,0.32)]',
    cardHeroGradient: 'from-[#2b0803] via-[#3a0c04] to-[#210502]',
    badgeBg: 'bg-red-950/85',
    badgeBorder: 'border-red-500/60',
    textAccent: 'text-orange-300',
    buttonGradient: 'bg-gradient-to-r from-red-500 via-orange-500 to-red-600 hover:from-red-400 hover:to-orange-400 text-white font-black shadow-[0_0_20px_rgba(239,68,68,0.4)]',
    accentBar: 'bg-red-500',
    iconBg: 'bg-red-500/20 text-red-300 border border-orange-500/50'
  },
  '8º Ano Fundamental': {
    serie: '8º Ano Fundamental',
    nomeCor: 'Verde Esmeralda Neon',
    cardBorder: 'border-emerald-500/50',
    cardBorderHover: 'hover:border-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]',
    cardHeroGradient: 'from-[#021c13] via-[#04291c] to-[#01140e]',
    badgeBg: 'bg-emerald-950/80',
    badgeBorder: 'border-emerald-500/50',
    textAccent: 'text-emerald-300',
    buttonGradient: 'bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black shadow-[0_0_20px_rgba(16,185,129,0.35)]',
    accentBar: 'bg-emerald-400',
    iconBg: 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
  },
  '9º Ano Fundamental': {
    serie: '9º Ano Fundamental',
    nomeCor: 'Roxo Elétrico Ultravioleta',
    cardBorder: 'border-purple-500/50',
    cardBorderHover: 'hover:border-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]',
    cardHeroGradient: 'from-[#190a2a] via-[#240e3b] to-[#12071f]',
    badgeBg: 'bg-purple-950/80',
    badgeBorder: 'border-purple-500/50',
    textAccent: 'text-purple-300',
    buttonGradient: 'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-600 hover:from-purple-400 hover:to-fuchsia-400 text-white font-black shadow-[0_0_20px_rgba(168,85,247,0.35)]',
    accentBar: 'bg-purple-400',
    iconBg: 'bg-purple-500/20 text-purple-300 border border-purple-400/40'
  },
  '1º Ano Ensino Médio': {
    serie: '1º Ano Ensino Médio',
    nomeCor: 'Rosa Choque & Framboesa',
    cardBorder: 'border-pink-500/50',
    cardBorderHover: 'hover:border-pink-400 hover:shadow-[0_0_25px_rgba(236,72,153,0.25)]',
    cardHeroGradient: 'from-[#260517] via-[#360821] to-[#1a0310]',
    badgeBg: 'bg-pink-950/80',
    badgeBorder: 'border-pink-500/50',
    textAccent: 'text-pink-300',
    buttonGradient: 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-400 hover:to-rose-400 text-white font-black shadow-[0_0_20px_rgba(236,72,153,0.35)]',
    accentBar: 'bg-pink-400',
    iconBg: 'bg-pink-500/20 text-pink-300 border border-pink-400/40'
  },
  '2º Ano Ensino Médio': {
    serie: '2º Ano Ensino Médio',
    nomeCor: 'Azul Safira Galáctico',
    cardBorder: 'border-sky-500/50',
    cardBorderHover: 'hover:border-sky-400 hover:shadow-[0_0_25px_rgba(56,189,248,0.25)]',
    cardHeroGradient: 'from-[#03152e] via-[#051e42] to-[#020e21]',
    badgeBg: 'bg-sky-950/80',
    badgeBorder: 'border-sky-500/50',
    textAccent: 'text-sky-300',
    buttonGradient: 'bg-gradient-to-r from-sky-400 via-blue-500 to-sky-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-black shadow-[0_0_20px_rgba(56,189,248,0.35)]',
    accentBar: 'bg-sky-400',
    iconBg: 'bg-sky-500/20 text-sky-300 border border-sky-400/40'
  },
  '3º Ano Ensino Médio': {
    serie: '3º Ano Ensino Médio',
    nomeCor: 'Grande Ouro Diamante',
    cardBorder: 'border-yellow-500/50',
    cardBorderHover: 'hover:border-yellow-400 hover:shadow-[0_0_25px_rgba(234,179,8,0.25)]',
    cardHeroGradient: 'from-[#1c1402] via-[#291e03] to-[#140e02]',
    badgeBg: 'bg-amber-950/80',
    badgeBorder: 'border-yellow-500/50',
    textAccent: 'text-yellow-300',
    buttonGradient: 'bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black shadow-[0_0_20px_rgba(234,179,8,0.35)]',
    accentBar: 'bg-yellow-400',
    iconBg: 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/40'
  }
};

export function getSerieColorTheme(serie: CurriculoSerie): SerieColorTheme {
  return SERIE_COLOR_THEMES[serie] || SERIE_COLOR_THEMES['3º Ano Ensino Médio'];
}

export const CURRICULO_SERIES_INFO: Record<CurriculoSerie, SerieInfo> = {
  '6º Ano Fundamental': {
    serie: '6º Ano Fundamental',
    titulo: '6º Ano • Ensino Fundamental',
    subtitulo: '4º Bimestre • Área, Perímetro em Malhas, Volume e Probabilidade',
    badge: 'Livro do Estudante • 4º Bimestre',
    icon: '📐',
    descricao: 'Conteúdos do 4º Bimestre do Material Digital de SP: cálculo de perímetro e área de polígonos em malha quadriculada, volume de blocos retangulares em cm³ e m³, noções de probabilidade simples e leitura de gráficos.',
    topicos: ['Área e Perímetro em Malha', 'Volume de Blocos Retangulares', 'Probabilidade Simples', 'Gráficos e Polígonos'],
    corGradient: 'from-orange-500 to-orange-600',
    neonBorder: 'border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.35)]'
  },
  '7º Ano Fundamental': {
    serie: '7º Ano Fundamental',
    titulo: '7º Ano • Ensino Fundamental',
    subtitulo: '4º Bimestre • Equivalência de Áreas, Volume, Capacidade e Simetria',
    badge: 'Livro do Estudante • 4º Bimestre',
    icon: '📏',
    descricao: 'Conteúdos do 4º Bimestre do Material Digital de SP: equivalência e decomposição de áreas (triângulos e trapézios), volume de blocos retangulares e capacidade (1 dm³ = 1 L), probabilidade e transformações no plano cartesiano.',
    topicos: ['Equivalência de Áreas', 'Volume e Capacidade (Litros)', 'Transformações no Plano', 'Espaço Amostral'],
    corGradient: 'from-red-500 to-orange-500',
    neonBorder: 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.35)]'
  },
  '8º Ano Fundamental': {
    serie: '8º Ano Fundamental',
    titulo: '8º Ano • Ensino Fundamental',
    subtitulo: '4º Bimestre • Área do Círculo, Volume do Cilindro e Contagem',
    badge: 'Livro do Estudante • 4º Bimestre',
    icon: '📊',
    descricao: 'Conteúdos do 4º Bimestre do Material Digital de SP: comprimento da circunferência (C = 2πr), área do círculo e coroa circular (A = πr²), volume de cilindros retos (V = πr²h), princípio fundamental da contagem e medidas estatísticas.',
    topicos: ['Círculo e Circunferência (π)', 'Volume do Cilindro Reto', 'Princípio da Contagem', 'Estatística e Média'],
    corGradient: 'from-emerald-400 to-teal-500',
    neonBorder: 'border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
  },
  '9º Ano Fundamental': {
    serie: '9º Ano Fundamental',
    titulo: '9º Ano • Ensino Fundamental',
    subtitulo: '4º Bimestre • Relações Métricas no Triângulo Retângulo e Trigonometria',
    badge: 'Livro do Estudante • 4º Bimestre',
    icon: '🔺',
    descricao: 'Conteúdos do 4º Bimestre do Material Digital de SP: relações métricas no triângulo retângulo (Pitágoras a²=b²+c², altura h²=m·n e projeções), razões trigonométricas fundamentais (seno, cosseno, tangente em 30°, 45° e 60°) e prismas.',
    topicos: ['Pitágoras e Relações Métricas', 'Seno, Cosseno e Tangente', 'Distâncias e Sombras', 'Prismas e Polígonos'],
    corGradient: 'from-purple-400 to-fuchsia-500',
    neonBorder: 'border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
  },
  '1º Ano Ensino Médio': {
    serie: '1º Ano Ensino Médio',
    titulo: '1º Ano • Ensino Médio',
    subtitulo: '4º Bimestre • Trigonometria Aplicada, Alturas e Dispersão',
    badge: 'Livro do Estudante • 4º Bimestre',
    icon: '📈',
    descricao: 'Conteúdos do 4º Bimestre do Material Digital de SP: trigonometria no triângulo retângulo aplicada a situações reais (elevação e depressão, teodolito), área de triângulos via fórmula trigonométrica A = ½ab·sen(θ) e medidas estatísticas.',
    topicos: ['Trigonometria e Alturas Inacessíveis', 'Área Trigonométrica de Triângulos', 'Leis dos Senos e Cossenos', 'Medidas de Dispersão'],
    corGradient: 'from-pink-500 to-rose-500',
    neonBorder: 'border-pink-400 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
  },
  '2º Ano Ensino Médio': {
    serie: '2º Ano Ensino Médio',
    titulo: '2º Ano • Ensino Médio',
    subtitulo: '4º Bimestre • Geometria Espacial Métrica (Prismas, Pirâmides, Cilindros, Cones e Esferas)',
    badge: 'Livro do Estudante • 4º Bimestre',
    icon: '🪐',
    descricao: 'Conteúdos do 4º Bimestre do Material Digital de SP: áreas e volumes de prismas regulares, pirâmides e apótemas, cilindros retos, cones e geratrizes (g² = r² + h²), e volume da esfera (V = 4/3 πr³) com seções planas.',
    topicos: ['Prismas e Pirâmides Regulares', 'Cilindros e Cones Retos', 'Esfera e Seções Planas', 'Cavalieri e Troncos'],
    corGradient: 'from-sky-400 to-blue-600',
    neonBorder: 'border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.3)]'
  },
  '3º Ano Ensino Médio': {
    serie: '3º Ano Ensino Médio',
    titulo: '3º Ano • Ensino Médio',
    subtitulo: 'Material Digital SP • Organizado em 24 Aulas com Resumo e Aplicação',
    badge: 'Currículo em Ação • 24 Aulas',
    icon: '🎯',
    descricao: 'Conteúdos do Material Digital de São Paulo estruturados em 24 Aulas temáticas do 4º Bimestre. Cada aula conta com o resumo pedagógico oficial dos conceitos essenciais (velocidade média, grandezas por razão e produto, proporcionalidade, geometria analítica, trigonometria e sólidos) acompanhado de desafio prático.',
    topicos: ['24 Aulas do 4º Bimestre', 'Grandezas por Razão e Produto', 'Geometria Analítica & Circunferência', 'Trigonometria & Sólidos'],
    corGradient: 'from-amber-300 via-yellow-400 to-emerald-400',
    neonBorder: 'border-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.35)]'
  }
};

// -------------------------------------------------------------------------
// BANCO DE QUESTÕES CURRÍCULO EM AÇÃO (15 QUESTÕES PARA CADA UMA DAS 7 SÉRIES)
// -------------------------------------------------------------------------

export const CURRICULO_QUESTIONS: Record<CurriculoSerie, Question[]> = {
  // ==========================================
  // 1. 6º ANO DO ENSINO FUNDAMENTAL (15 ITENS)
  // ==========================================
  '6º Ano Fundamental': [
    {
      id: 'cur-6-1',
      serie: '6º Ano Fundamental',
      temaKey: 'curriculo_6ano',
      temaNome: 'Perímetro de Figuras Planas',
      habilidade: 'EF06MA19',
      svgType: 'retangulo_perimetro',
      pergunta: 'Um pátio retangular da escola possui 12 metros de comprimento e 8 metros de largura. O professor pediu aos estudantes que calculassem o perímetro desse pátio para instalar uma fita protetora ao redor. Qual é o perímetro total?',
      opcoes: [
        '40 metros',
        '20 metros',
        '96 metros',
        '24 metros'
      ],
      correta: 0,
      porque: 'O perímetro é a soma de todos os lados: P = 12 + 8 + 12 + 8 = 40 metros (ou 2 × (12 + 8) = 40 m). O valor 96 m² seria a área, não o perímetro.',
      dicaInvestigacao: 'Perímetro é o contorno total da figura: some os quatro lados do retângulo!'
    },
    {
      id: 'cur-6-2',
      serie: '6º Ano Fundamental',
      temaKey: 'curriculo_6ano',
      temaNome: 'Classificação de Ângulos',
      habilidade: 'EF06MA25',
      svgType: 'angulo_classificacao',
      pergunta: 'Observando os ponteiros de um relógio marcando exatamente 3 horas, os ponteiros formam um ângulo bem definido entre si. Como esse ângulo é classificado pela geometria?',
      opcoes: [
        'Ângulo Reto (mede exatamente 90°)',
        'Ângulo Agudo (mede menos de 90°)',
        'Ângulo Obtuso (mede mais de 90°)',
        'Ângulo Raso (mede 180°)'
      ],
      correta: 0,
      porque: 'Às 3 horas, o ponteiro dos minutos aponta para o 12 e o das horas para o 3, formando 1/4 de volta completa (360° ÷ 4 = 90°), caracterizando um ângulo reto perfeito.',
      dicaInvestigacao: 'Um ângulo de 90° lembra o canto quadrado de uma folha de papel ou de uma parede perpendicular.'
    },
    {
      id: 'cur-6-3',
      serie: '6º Ano Fundamental',
      temaKey: 'curriculo_6ano',
      temaNome: 'Área do Quadrado e Retângulo',
      habilidade: 'EF06MA19',
      svgType: 'quadrado_area',
      pergunta: 'Uma sala de aula quadrada possui lados medindo 7 metros cada. Qual é a área do piso que receberá piso cerâmico?',
      opcoes: [
        '49 m²',
        '28 m²',
        '14 m²',
        '56 m²'
      ],
      correta: 0,
      porque: 'A área do quadrado é dada por lado × lado: 7 m × 7 m = 49 m². O valor 28 m seria o perímetro (7 × 4).',
      dicaInvestigacao: 'Área de quadrados é calculada multiplicando a medida do lado por ela mesma: A = L².'
    },
    {
      id: 'cur-6-4',
      serie: '6º Ano Fundamental',
      temaKey: 'curriculo_6ano',
      temaNome: 'Frações e Representação Geométrica',
      habilidade: 'EF06MA07',
      svgType: 'fracao_circulo',
      pergunta: 'Uma pizza circular foi dividida em 8 pedaços iguais. Lucas e seus amigos comeram 5 pedaços. Qual fração representa a parte que SOBROU da pizza?',
      opcoes: [
        '3/8 da pizza',
        '5/8 da pizza',
        '3/5 da pizza',
        '8/3 da pizza'
      ],
      correta: 0,
      porque: 'O total de fatias é 8/8. Se comeram 5 pedaços, restaram 8 - 5 = 3 pedaços, correspondendo à fração 3/8 da pizza inteira.',
      dicaInvestigacao: 'Atenção ao que foi pedido: pergunte-se quantas fatias sobraram do total de 8 pedaços.'
    },
    {
      id: 'cur-6-5',
      serie: '6º Ano Fundamental',
      temaKey: 'curriculo_6ano',
      temaNome: 'Triângulos: Classificação por Lados',
      habilidade: 'EF06MA18',
      svgType: 'triangulo_equilatero',
      pergunta: 'Um triângulo possui os três lados com a mesma medida de 6 cm cada um. Qual é o nome desse triângulo quanto aos seus lados?',
      opcoes: [
        'Triângulo Equilátero',
        'Triângulo Isósceles',
        'Triângulo Escaleno',
        'Triângulo Retângulo'
      ],
      correta: 0,
      porque: 'Quando os três lados são congruentes (iguais), o triângulo é chamado de equilátero. Se fossem apenas 2 iguais seria isósceles, e se todos fossem diferentes seria escaleno.',
      dicaInvestigacao: 'O prefixo "equi" remete a igualdade: lados iguais formam o triângulo equilátero.'
    },
    {
      id: 'cur-6-6',
      serie: '6º Ano Fundamental',
      temaKey: 'curriculo_6ano',
      temaNome: 'Polígonos e Elementos',
      habilidade: 'EF06MA18',
      svgType: 'hexagono_regular',
      pergunta: 'Quantos lados, vértices e ângulos internos possui um hexágono regular?',
      opcoes: [
        '6 lados, 6 vértices e 6 ângulos internos',
        '5 lados, 5 vértices e 5 ângulos internos',
        '8 lados, 8 vértices e 8 ângulos internos',
        '6 lados, 12 vértices e 6 ângulos internos'
      ],
      correta: 0,
      porque: 'Em todo polígono convexo, o número de lados é rigorosamente igual ao número de vértices e ao número de ângulos internos. O hexágono possui 6 de cada.',
      dicaInvestigacao: 'Lembre-se da raiz grega: "hexa" indica o número seis!'
    },
    {
      id: 'cur-6-7',
      serie: '6º Ano Fundamental',
      temaKey: 'curriculo_6ano',
      temaNome: 'Ângulos Agudos e Obtusos',
      habilidade: 'EF06MA25',
      svgType: 'angulo_agudo',
      pergunta: 'Uma tesoura aberta forma entre suas lâminas uma abertura angular que mede 42°. Esse ângulo é classificado como:',
      opcoes: [
        'Ângulo Agudo',
        'Ângulo Obtuso',
        'Ângulo Reto',
        'Ângulo Raso'
      ],
      correta: 0,
      porque: 'Ângulo agudo é todo aquele cuja medida é maior que 0° e menor que 90°. Como 42° < 90°, é um ângulo agudo.',
      dicaInvestigacao: 'Ângulos menores que 90° são pontiagudos e chamados de agudos.'
    },
    {
      id: 'cur-6-8',
      serie: '6º Ano Fundamental',
      temaKey: 'curriculo_6ano',
      temaNome: 'Unidades de Medida e Conversão',
      habilidade: 'EF06MA24',
      svgType: 'metro_conversao',
      pergunta: 'Uma régua de desenho técnico tem 30 centímetros de comprimento. Quantos milímetros essa régua possui no total?',
      opcoes: [
        '300 milímetros',
        '30 milímetros',
        '3 000 milímetros',
        '3 milímetros'
      ],
      correta: 0,
      porque: '1 centímetro equivale a 10 milímetros. Logo, 30 cm × 10 mm/cm = 300 mm.',
      dicaInvestigacao: 'Cada centímetro é subdividido em 10 pequenos milímetros.'
    },
    {
      id: 'cur-6-9',
      serie: '6º Ano Fundamental',
      temaKey: 'curriculo_6ano',
      temaNome: 'Área com Malha Quadriculada',
      habilidade: 'EF06MA21',
      svgType: 'malha_quadriculada',
      pergunta: 'Em uma malha quadriculada onde cada quadradinho tem 1 cm² de área, um aluno desenhou uma figura que ocupa 14 quadradinhos inteiros e 4 metades de quadradinho. Qual é a área total da figura?',
      opcoes: [
        '16 cm²',
        '18 cm²',
        '14 cm²',
        '15 cm²'
      ],
      correta: 0,
      porque: 'As 4 metades equivalem a 4 × 0,5 = 2 quadradinhos inteiros. Somando com os 14 inteiros: 14 + 2 = 16 cm².',
      dicaInvestigacao: 'Junte duas metades de quadradinho para formar 1 quadradinho inteiro de 1 cm².'
    },
    {
      id: 'cur-6-10',
      serie: '6º Ano Fundamental',
      temaKey: 'curriculo_6ano',
      temaNome: 'Sólidos Geométricos e Planificação',
      habilidade: 'EF06MA17',
      svgType: 'cubo_planificacao',
      pergunta: 'Um dado cúbico tradicional é um prisma regular com todas as faces congruentes. Quantas faces, arestas e vértices possui um cubo?',
      opcoes: [
        '6 faces, 12 arestas e 8 vértices',
        '6 faces, 8 arestas e 12 vértices',
        '4 faces, 6 arestas e 4 vértices',
        '8 faces, 12 arestas e 6 vértices'
      ],
      correta: 0,
      porque: 'O cubo possui 6 faces quadradas, 12 arestas (segmentos de encontro das faces) e 8 vértices (pontos de encontro das arestas). Satisfaz V - A + F = 8 - 12 + 6 = 2.',
      dicaInvestigacao: 'Pense numa caixa de sapato cúbica: 4 paredes laterais + tampa + fundo = 6 faces.'
    },
    {
      id: 'cur-6-11',
      serie: '6º Ano Fundamental',
      temaKey: 'curriculo_6ano',
      temaNome: 'Retas Paralelas e Concorrentes',
      habilidade: 'EF06MA22',
      svgType: 'retas_paralelas',
      pergunta: 'As linhas dos trilhos de um trem mantêm sempre a mesma distância entre si e nunca se cruzam ao longo do percurso. Na geometria, essas retas são chamadas de:',
      opcoes: [
        'Retas Paralelas',
        'Retas Perpendiculares',
        'Retas Concorrentes Oblíquas',
        'Retas Coincidentes'
      ],
      correta: 0,
      porque: 'Retas paralelas pertencem ao mesmo plano e não possuem nenhum ponto em comum, mantendo distância constante.',
      dicaInvestigacao: 'Retas que caminham lado a lado sem nunca se encontrarem são paralelas.'
    },
    {
      id: 'cur-6-12',
      serie: '6º Ano Fundamental',
      temaKey: 'curriculo_6ano',
      temaNome: 'Simetria de Reflexão',
      habilidade: 'EF06MA20',
      svgType: 'eixo_simetria',
      pergunta: 'Um quadrado possui linhas imaginárias que, ao dobrarmos a folha sobre elas, as duas metades se sobrepõem perfeitamente. Quantos eixos de simetria um quadrado possui?',
      opcoes: [
        '4 eixos de simetria',
        '2 eixos de simetria',
        '1 eixo de simetria',
        '8 eixos de simetria'
      ],
      correta: 0,
      porque: 'O quadrado tem 4 eixos de simetria: 2 passando pelos pontos médios dos lados opostos (vertical e horizontal) e 2 pelas diagonais.',
      dicaInvestigacao: 'Dobre mentalmente o quadrado verticalmente, horizontalmente e pelas duas diagonais.'
    },
    {
      id: 'cur-6-13',
      serie: '6º Ano Fundamental',
      temaKey: 'curriculo_6ano',
      temaNome: 'Perímetro com Lados Diferentes',
      habilidade: 'EF06MA19',
      svgType: 'trapezio_perimetro',
      pergunta: 'Um jardim tem formato de trapézio com lados medindo 10 m, 6 m, 5 m e 5 m. Qual é o perímetro total desse jardim?',
      opcoes: [
        '26 metros',
        '30 metros',
        '21 metros',
        '50 metros'
      ],
      correta: 0,
      porque: 'Somando todos os lados: 10 + 6 + 5 + 5 = 26 metros.',
      dicaInvestigacao: 'Some individualmente os 4 segmentos que delimitam o trapézio.'
    },
    {
      id: 'cur-6-14',
      serie: '6º Ano Fundamental',
      temaKey: 'curriculo_6ano',
      temaNome: 'Volume com Cubos Unitários',
      habilidade: 'EF06MA20',
      svgType: 'bloco_cubinhos',
      pergunta: 'Um bloco retangular foi construído empilhando cubinhos de 1 cm³ cada. Ele tem 4 cubinhos de comprimento, 3 de largura e 2 de altura. Qual é o volume desse bloco?',
      opcoes: [
        '24 cm³',
        '18 cm³',
        '9 cm³',
        '28 cm³'
      ],
      correta: 0,
      porque: 'O volume do paralelepípedo retângulo é V = comprimento × largura × altura = 4 × 3 × 2 = 24 cm³.',
      dicaInvestigacao: 'Multiplique as três dimensões: comprimento × largura × altura.'
    },
    {
      id: 'cur-6-15',
      serie: '6º Ano Fundamental',
      temaKey: 'curriculo_6ano',
      temaNome: 'Giro e Fração de Volta',
      habilidade: 'EF06MA25',
      svgType: 'giro_graus',
      pergunta: 'Um atleta de skate realizou uma manobra girando 180° no ar antes de aterrissar. Essa rotação corresponde a:',
      opcoes: [
        'Meia volta completa (1/2 volta)',
        'Uma volta completa (1 volta)',
        'Um quarto de volta (1/4 de volta)',
        'Três quartos de volta (3/4 de volta)'
      ],
      correta: 0,
      porque: 'Uma volta completa equivale a 360°. Logo, 180° ÷ 360° = 1/2 de volta (meia volta), invertendo o sentido do skatista.',
      dicaInvestigacao: 'Se 360° é a volta inteira, metade dessa medida é exatamente 180°.'
    }
  ],

  // ==========================================
  // 2. 7º ANO DO ENSINO FUNDAMENTAL (15 ITENS)
  // ==========================================
  '7º Ano Fundamental': [
    {
      id: 'cur-7-1',
      serie: '7º Ano Fundamental',
      temaKey: 'curriculo_7ano',
      temaNome: 'Soma dos Ângulos Internos do Triângulo',
      habilidade: 'EF07MA24',
      svgType: 'triangulo_angulos_soma',
      pergunta: 'Em qualquer triângulo plano, a soma das medidas dos três ângulos internos é uma propriedade fundamental constante. Se dois ângulos de um triângulo medem 55° e 65°, quanto mede o terceiro ângulo?',
      opcoes: [
        '60°',
        '70°',
        '50°',
        '80°'
      ],
      correta: 0,
      porque: 'A soma dos ângulos internos de qualquer triângulo é sempre 180°. Logo: 180° - (55° + 65°) = 180° - 120° = 60°.',
      dicaInvestigacao: 'Lembre-se da lei universal: Ângulo A + Ângulo B + Ângulo C = 180°.'
    },
    {
      id: 'cur-7-2',
      serie: '7º Ano Fundamental',
      temaKey: 'curriculo_7ano',
      temaNome: 'Área do Triângulo',
      habilidade: 'EF07MA31',
      svgType: 'triangulo_base_altura',
      pergunta: 'Uma placa de trânsito triangular possui base medindo 40 cm e altura relativa a essa base medindo 30 cm. Qual é a área dessa placa?',
      opcoes: [
        '600 cm²',
        '1 200 cm²',
        '70 cm²',
        '300 cm²'
      ],
      correta: 0,
      porque: 'A fórmula da área do triângulo é A = (base × altura) ÷ 2 = (40 × 30) ÷ 2 = 1200 ÷ 2 = 600 cm².',
      dicaInvestigacao: 'A área do triângulo é a metade da área do retângulo correspondente: (b × h) / 2.'
    },
    {
      id: 'cur-7-3',
      serie: '7º Ano Fundamental',
      temaKey: 'curriculo_7ano',
      temaNome: 'Ângulos Complementares e Suplementares',
      habilidade: 'EF07MA23',
      svgType: 'angulos_suplementares',
      pergunta: 'Dois ângulos são chamados de suplementares quando a soma de suas medidas é igual a 180°. Se um ângulo mede 115°, qual é o valor do seu suplemento?',
      opcoes: [
        '65°',
        '75°',
        '85°',
        '25°'
      ],
      correta: 0,
      porque: 'O suplemento de 115° é 180° - 115° = 65°.',
      dicaInvestigacao: 'Suplementares somam 180° (linha reta); complementares somam 90° (canto reto).'
    },
    {
      id: 'cur-7-4',
      serie: '7º Ano Fundamental',
      temaKey: 'curriculo_7ano',
      temaNome: 'Ângulos Opostos pelo Vértice (OPV)',
      habilidade: 'EF07MA24',
      svgType: 'angulos_opv',
      pergunta: 'Duas retas concorrentes se cruzam formando quatro ângulos. Dois ângulos opostos pelo vértice (O.P.V.) têm a propriedade geométrica de serem congruentes. Se um deles mede (2x + 10)° e o outro mede 70°, qual é o valor de x?',
      opcoes: [
        'x = 30°',
        'x = 40°',
        'x = 35°',
        'x = 25°'
      ],
      correta: 0,
      porque: 'Como são opostos pelo vértice: 2x + 10 = 70 => 2x = 60 => x = 30°.',
      dicaInvestigacao: 'Ângulos O.P.V. são exatamente iguais: iguale as duas expressões!'
    },
    {
      id: 'cur-7-5',
      serie: '7º Ano Fundamental',
      temaKey: 'curriculo_7ano',
      temaNome: 'Área do Trapézio',
      habilidade: 'EF07MA31',
      svgType: 'trapezio_area',
      pergunta: 'Um terreno tem a forma de um trapézio com base maior B = 14 m, base menor b = 6 m e altura h = 8 m. Qual é a área desse terreno?',
      opcoes: [
        '80 m²',
        '160 m²',
        '112 m²',
        '96 m²'
      ],
      correta: 0,
      porque: 'Área do trapézio: A = [(B + b) × h] ÷ 2 = [(14 + 6) × 8] ÷ 2 = [20 × 8] ÷ 2 = 160 ÷ 2 = 80 m².',
      dicaInvestigacao: 'Fórmula do trapézio: some as bases, multiplique pela altura e divida por 2.'
    },
    {
      id: 'cur-7-6',
      serie: '7º Ano Fundamental',
      temaKey: 'curriculo_7ano',
      temaNome: 'Quadriláteros e Soma dos Ângulos',
      habilidade: 'EF07MA24',
      svgType: 'quadrilatero_angulos',
      pergunta: 'Qual é a soma das medidas dos quatro ângulos internos de qualquer quadrilátero convexo (como quadrados, retângulos, trapézios e paralelogramos)?',
      opcoes: [
        '360°',
        '180°',
        '540°',
        '720°'
      ],
      correta: 0,
      porque: 'Qualquer quadrilátero pode ser dividido por uma diagonal em 2 triângulos. Como cada triângulo soma 180°, temos 2 × 180° = 360°.',
      dicaInvestigacao: 'Divida o quadrilátero em 2 triângulos: 180° + 180° = 360°.'
    },
    {
      id: 'cur-7-7',
      serie: '7º Ano Fundamental',
      temaKey: 'curriculo_7ano',
      temaNome: 'Condição de Existência de Triângulos',
      habilidade: 'EF07MA26',
      svgType: 'desigualdade_triangular',
      pergunta: 'Para que três segmentos formem um triângulo, a medida de qualquer lado deve ser sempre menor que a soma dos outros dois. Qual dos seguintes conjuntos de varetas PODE formar um triângulo?',
      opcoes: [
        '5 cm, 7 cm e 10 cm (pois 10 < 5 + 7 = 12)',
        '3 cm, 4 cm e 8 cm (pois 8 > 3 + 4)',
        '2 cm, 5 cm e 7 cm (pois 7 = 2 + 5)',
        '1 cm, 2 cm e 5 cm (pois 5 > 1 + 2)'
      ],
      correta: 0,
      porque: 'Pela desigualdade triangular: 5 + 7 = 12 > 10, 5 + 10 = 15 > 7 e 7 + 10 = 17 > 5. Nos demais casos, o lado maior é maior ou igual à soma dos dois menores, não fechando o triângulo.',
      dicaInvestigacao: 'A soma dos dois menores segmentos precisa ser estritamente maior que o maior segmento.'
    },
    {
      id: 'cur-7-8',
      serie: '7º Ano Fundamental',
      temaKey: 'curriculo_7ano',
      temaNome: 'Plano Cartesiano e Coordenadas',
      habilidade: 'EF07MA19',
      svgType: 'plano_cartesiano_ponto',
      pergunta: 'No plano cartesiano, o ponto P está localizado no par ordenado (-3, 4). Em qual quadrante o ponto P se encontra?',
      opcoes: [
        '2º Quadrante (x < 0 e y > 0)',
        '1º Quadrante (x > 0 e y > 0)',
        '3º Quadrante (x < 0 e y < 0)',
        '4º Quadrante (x > 0 e y < 0)'
      ],
      correta: 0,
      porque: 'No 1º quadrante (+,+), no 2º (-,+), no 3º (-,-) e no 4º (+,-). Como x = -3 (negativo) e y = 4 (positivo), P está no 2º quadrante.',
      dicaInvestigacao: 'x negativo fica à esquerda; y positivo fica para cima: quadrante superior esquerdo (2º Q).'
    },
    {
      id: 'cur-7-9',
      serie: '7º Ano Fundamental',
      temaKey: 'curriculo_7ano',
      temaNome: 'Área do Losango',
      habilidade: 'EF07MA31',
      svgType: 'losango_diagonais',
      pergunta: 'Uma pipa em formato de losango possui diagonal maior D = 18 cm e diagonal menor d = 10 cm. Qual é a área dessa pipa?',
      opcoes: [
        '90 cm²',
        '180 cm²',
        '140 cm²',
        '45 cm²'
      ],
      correta: 0,
      porque: 'A área do losango é o semi-produto de suas diagonais: A = (D × d) ÷ 2 = (18 × 10) ÷ 2 = 180 ÷ 2 = 90 cm².',
      dicaInvestigacao: 'Área do losango = (Diagonal Maior × Diagonal menor) / 2.'
    },
    {
      id: 'cur-7-10',
      serie: '7º Ano Fundamental',
      temaKey: 'curriculo_7ano',
      temaNome: 'Circunferência: Raio e Diâmetro',
      habilidade: 'EF07MA32',
      svgType: 'circulo_raio_diametro',
      pergunta: 'A roda de uma bicicleta possui raio de 35 cm medido do centro até a borda. Qual é a medida do diâmetro dessa roda?',
      opcoes: [
        '70 cm',
        '17,5 cm',
        '35 cm',
        '105 cm'
      ],
      correta: 0,
      porque: 'O diâmetro é o dobro do raio: D = 2 × R = 2 × 35 cm = 70 cm.',
      dicaInvestigacao: 'O diâmetro passa pelo centro e atravessa a circunferência inteira: D = 2 × raio.'
    },
    {
      id: 'cur-7-11',
      serie: '7º Ano Fundamental',
      temaKey: 'curriculo_7ano',
      temaNome: 'Equação de 1º Grau com Ângulos',
      habilidade: 'EF07MA18',
      svgType: 'angulos_complementares',
      pergunta: 'Dois ângulos adjacentes formam juntos um ângulo reto de 90°. Se um mede x e o outro mede 2x, qual é o valor de x?',
      opcoes: [
        'x = 30°',
        'x = 45°',
        'x = 20°',
        'x = 60°'
      ],
      correta: 0,
      porque: 'Como são complementares: x + 2x = 90° => 3x = 90° => x = 30°. Os ângulos medem 30° e 60°.',
      dicaInvestigacao: 'A soma dos dois ângulos deve totalizar o ângulo reto de 90°.'
    },
    {
      id: 'cur-7-12',
      serie: '7º Ano Fundamental',
      temaKey: 'curriculo_7ano',
      temaNome: 'Classificação de Triângulos por Ângulos',
      habilidade: 'EF07MA25',
      svgType: 'triangulo_obtusangulo',
      pergunta: 'Um triângulo possui ângulos medindo 110°, 40° e 30°. Por possuir um ângulo maior que 90°, esse triângulo é classificado como:',
      opcoes: [
        'Triângulo Obtusângulo',
        'Triângulo Acutângulo',
        'Triângulo Retângulo',
        'Triângulo Equilátero'
      ],
      correta: 0,
      porque: 'Triângulo obtusângulo possui um ângulo obtuso (> 90°). Acutângulo possui todos menores que 90°, e retângulo possui um de 90°.',
      dicaInvestigacao: 'Basta um único ângulo maior que 90° para nomear o triângulo como obtusângulo.'
    },
    {
      id: 'cur-7-13',
      serie: '7º Ano Fundamental',
      temaKey: 'curriculo_7ano',
      temaNome: 'Área do Paralelogramo',
      habilidade: 'EF07MA31',
      svgType: 'paralelogramo_area',
      pergunta: 'Um paralelogramo tem base medindo 15 cm e altura relativa de 8 cm. Qual é a área dessa figura geométrica?',
      opcoes: [
        '120 cm²',
        '60 cm²',
        '46 cm²',
        '240 cm²'
      ],
      correta: 0,
      porque: 'A área do paralelogramo é simplesmente base × altura: A = b × h = 15 × 8 = 120 cm² (não se divide por 2).',
      dicaInvestigacao: 'Diferente do triângulo, no paralelogramo não se divide por 2: A = base × altura.'
    },
    {
      id: 'cur-7-14',
      serie: '7º Ano Fundamental',
      temaKey: 'curriculo_7ano',
      temaNome: 'Proporcionalidade Geométrica',
      habilidade: 'EF07MA17',
      svgType: 'escala_mapa',
      pergunta: 'Em uma maquete com escala 1:50, uma parede mede 8 cm de comprimento. Qual é o comprimento real dessa parede no edifício?',
      opcoes: [
        '400 cm (ou 4 metros)',
        '40 cm',
        '58 cm',
        '800 cm (ou 8 metros)'
      ],
      correta: 0,
      porque: 'Comprimento real = 8 cm × 50 = 400 cm = 4 metros.',
      dicaInvestigacao: 'Multiplique a medida na maquete pelo fator da escala: 8 × 50.'
    },
    {
      id: 'cur-7-15',
      serie: '7º Ano Fundamental',
      temaKey: 'curriculo_7ano',
      temaNome: 'Ângulos em Retas Paralelas Cortadas por Transversal',
      habilidade: 'EF07MA23',
      svgType: 'retas_transversal',
      pergunta: 'Duas retas paralelas r e s são cortadas por uma transversal t. Dois ângulos alternos internos formados medem (3x - 15)° e 60°. Qual é o valor de x?',
      opcoes: [
        'x = 25°',
        'x = 15°',
        'x = 30°',
        'x = 20°'
      ],
      correta: 0,
      porque: 'Ângulos alternos internos entre paralelas são congruentes: 3x - 15 = 60 => 3x = 75 => x = 25°.',
      dicaInvestigacao: 'Ângulos alternos internos têm exatamente o mesmo valor em retas paralelas.'
    }
  ],

  // ==========================================
  // 3. 8º ANO DO ENSINO FUNDAMENTAL (15 ITENS)
  // ==========================================
  '8º Ano Fundamental': [
    {
      id: 'cur-8-1',
      serie: '8º Ano Fundamental',
      temaKey: 'curriculo_8ano',
      temaNome: 'Teorema de Tales em Retas Paralelas',
      habilidade: 'EF08MA14',
      svgType: 'teorema_tales',
      pergunta: 'Três retas paralelas cortadas por duas transversais determinam segmentos proporcionais: na primeira transversal os segmentos medem 6 cm e 9 cm; na segunda medem 8 cm e x. Pelo Teorema de Tales, qual é o valor de x?',
      opcoes: [
        'x = 12 cm',
        'x = 11 cm',
        'x = 10 cm',
        'x = 15 cm'
      ],
      correta: 0,
      porque: 'Pelo Teorema de Tales: 6 / 9 = 8 / x => 6x = 72 => x = 12 cm.',
      dicaInvestigacao: 'Monte a proporção direta entre os segmentos correspondentes: a/b = c/d.'
    },
    {
      id: 'cur-8-2',
      serie: '8º Ano Fundamental',
      temaKey: 'curriculo_8ano',
      temaNome: 'Comprimento da Circunferência',
      habilidade: 'EF08MA19',
      svgType: 'circulo_comprimento',
      pergunta: 'Uma pista circular de atletismo tem raio R = 20 metros. Usando a aproximação π ≈ 3,14, qual é a distância percorrida por um atleta ao dar uma volta completa nessa pista?',
      opcoes: [
        '125,6 metros',
        '62,8 metros',
        '1 256 metros',
        '400 metros'
      ],
      correta: 0,
      porque: 'O comprimento da circunferência é C = 2·π·R = 2 × 3,14 × 20 = 125,6 metros.',
      dicaInvestigacao: 'Fórmula do perímetro do círculo: C = 2·π·r.'
    },
    {
      id: 'cur-8-3',
      serie: '8º Ano Fundamental',
      temaKey: 'curriculo_8ano',
      temaNome: 'Área do Círculo',
      habilidade: 'EF08MA19',
      svgType: 'circulo_area_pi',
      pergunta: 'Um canteiro circular de flores tem raio de 5 metros. Adotando π ≈ 3,14, qual é a área desse canteiro?',
      opcoes: [
        '78,5 m²',
        '31,4 m²',
        '15,7 m²',
        '157 m²'
      ],
      correta: 0,
      porque: 'Área do círculo: A = π·R² = 3,14 × 5² = 3,14 × 25 = 78,5 m².',
      dicaInvestigacao: 'Eleve o raio ao quadrado antes de multiplicar por π: A = π·r².'
    },
    {
      id: 'cur-8-4',
      serie: '8º Ano Fundamental',
      temaKey: 'curriculo_8ano',
      temaNome: 'Soma dos Ângulos Internos de Polígono',
      habilidade: 'EF08MA15',
      svgType: 'pentagono_angulos',
      pergunta: 'A soma dos ângulos internos de um polígono convexo de n lados é dada por S = (n - 2) × 180°. Qual é a soma dos ângulos internos de um pentágono (5 lados)?',
      opcoes: [
        '540°',
        '360°',
        '720°',
        '180°'
      ],
      correta: 0,
      porque: 'Para n = 5: S = (5 - 2) × 180° = 3 × 180° = 540°.',
      dicaInvestigacao: 'Subtraia 2 do número de lados e multiplique por 180°.'
    },
    {
      id: 'cur-8-5',
      serie: '8º Ano Fundamental',
      temaKey: 'curriculo_8ano',
      temaNome: 'Ângulo Interno de Polígono Regular',
      habilidade: 'EF08MA15',
      svgType: 'hexagono_angulo_interno',
      pergunta: 'Em um hexágono regular (6 lados iguais), todos os ângulos internos têm a mesma medida. Qual é a medida de CADA ângulo interno desse hexágono?',
      opcoes: [
        '120°',
        '108°',
        '135°',
        '90°'
      ],
      correta: 0,
      porque: 'Soma total: S = (6 - 2) × 180° = 4 × 180° = 720°. Como são 6 ângulos iguais: 720° ÷ 6 = 120°.',
      dicaInvestigacao: 'Calcule a soma dos 6 ângulos (720°) e divida igualmente por 6.'
    },
    {
      id: 'cur-8-6',
      serie: '8º Ano Fundamental',
      temaKey: 'curriculo_8ano',
      temaNome: 'Bissetriz de um Ângulo',
      habilidade: 'EF08MA17',
      svgType: 'bissetriz_angulo',
      pergunta: 'A bissetriz é a semirreta que divide um ângulo exatamente em duas metades iguais. Se a semirreta OZ é bissetriz do ângulo AÔB e cada metade mede 38°, quanto mede o ângulo total AÔB?',
      opcoes: [
        '76°',
        '38°',
        '19°',
        '90°'
      ],
      correta: 0,
      porque: 'A bissetriz divide em dois ângulos congruentes de 38°. O ângulo completo é 38° + 38° = 76° (ou 2 × 38°).',
      dicaInvestigacao: 'A bissetriz cria duas partes idênticas: multiplique uma metade por 2 para achar o todo.'
    },
    {
      id: 'cur-8-7',
      serie: '8º Ano Fundamental',
      temaKey: 'curriculo_8ano',
      temaNome: 'Mediatriz de um Segmento',
      habilidade: 'EF08MA17',
      svgType: 'mediatriz_segmento',
      pergunta: 'A mediatriz de um segmento AB é definida geometricamente como a reta que:',
      opcoes: [
        'Passa pelo ponto médio de AB e é perpendicular a ele (90°)',
        'Passa por uma das extremidades de AB em qualquer inclinação',
        'É paralela ao segmento AB a uma distância fixa',
        'Divide o segmento AB em três partes desiguais'
      ],
      correta: 0,
      porque: 'A mediatriz é perpendicular (faz 90°) com o segmento e corta rigorosamente no seu ponto central (ponto médio).',
      dicaInvestigacao: 'Mediatriz = Ponto Médio + Ângulo Reto de 90°.'
    },
    {
      id: 'cur-8-8',
      serie: '8º Ano Fundamental',
      temaKey: 'curriculo_8ano',
      temaNome: 'Volume do Prisma Retangular',
      habilidade: 'EF08MA20',
      svgType: 'prisma_volume',
      pergunta: 'Uma caixa d’água em formato de paralelepípedo retângulo tem 2 metros de comprimento, 1,5 metro de largura e 1 metro de profundidade. Qual é a capacidade em litros dessa caixa (1 m³ = 1000 L)?',
      opcoes: [
        '3 000 litros',
        '4 500 litros',
        '1 500 litros',
        '300 litros'
      ],
      correta: 0,
      porque: 'Volume = 2 m × 1,5 m × 1 m = 3 m³. Como 1 m³ = 1000 litros, temos 3 × 1000 = 3000 litros.',
      dicaInvestigacao: 'Calcule o volume em metros cúbicos e multiplique por 1 000 para converter para litros.'
    },
    {
      id: 'cur-8-9',
      serie: '8º Ano Fundamental',
      temaKey: 'curriculo_8ano',
      temaNome: 'Produtos Notáveis na Geometria (Quadrado da Soma)',
      habilidade: 'EF08MA09',
      svgType: 'quadrado_soma_geometrico',
      pergunta: 'Geometricamente, a área de um quadrado de lado (x + 3) é formada por um quadrado de área x², dois retângulos de área 3x e um quadrado menor de área 3². A expressão algébrica expandida é:',
      opcoes: [
        'x² + 6x + 9',
        'x² + 9',
        'x² + 3x + 9',
        '2x + 6'
      ],
      correta: 0,
      porque: '(x + 3)² = x² + 2·x·3 + 3² = x² + 6x + 9. O termo do meio 6x corresponde à soma dos dois retângulos 3x + 3x.',
      dicaInvestigacao: 'Quadrado da soma: quadrado do primeiro + 2 vezes o primeiro pelo segundo + quadrado do segundo.'
    },
    {
      id: 'cur-8-10',
      serie: '8º Ano Fundamental',
      temaKey: 'curriculo_8ano',
      temaNome: 'Área de Coroa Circular',
      habilidade: 'EF08MA19',
      svgType: 'coroa_circular',
      pergunta: 'Uma praça circular de raio externo R = 10 m possui um chafariz central de raio r = 6 m. A calçada ao redor é a coroa circular entre eles. Considerando π ≈ 3,14, qual é a área dessa calçada?',
      opcoes: [
        '200,96 m²',
        '314 m²',
        '113,04 m²',
        '64 m²'
      ],
      correta: 0,
      porque: 'Área da coroa: A = π·(R² - r²) = 3,14 × (100 - 36) = 3,14 × 64 = 200,96 m².',
      dicaInvestigacao: 'Subtraia a área do círculo menor da área do círculo maior: π·(R² - r²).'
    },
    {
      id: 'cur-8-11',
      serie: '8º Ano Fundamental',
      temaKey: 'curriculo_8ano',
      temaNome: 'Triângulos Congruentes (Casos)',
      habilidade: 'EF08MA14',
      svgType: 'triangulos_congruentes',
      pergunta: 'Dois triângulos possuem dois lados respectivamente iguais e o ângulo compreendido entre eles também igual. Esse caso clássico de congruência é conhecido pela sigla:',
      opcoes: [
        'LAL (Lado - Ângulo - Lado)',
        'LLL (Lado - Lado - Lado)',
        'ALA (Ângulo - Lado - Ângulo)',
        'LAAo (Lado - Ângulo - Ângulo Oposto)'
      ],
      correta: 0,
      porque: 'O caso LAL estabelece que se dois lados e o ângulo formado entre eles forem congruentes, os dois triângulos são idênticos em todas as suas medidas.',
      dicaInvestigacao: 'Dois Lados com o Ângulo no meio: L - A - L.'
    },
    {
      id: 'cur-8-12',
      serie: '8º Ano Fundamental',
      temaKey: 'curriculo_8ano',
      temaNome: 'Diagonais de um Polígono',
      habilidade: 'EF08MA15',
      svgType: 'poligono_diagonais',
      pergunta: 'A quantidade de diagonais d de um polígono de n lados é calculada por d = [n · (n - 3)] ÷ 2. Quantas diagonais possui um octógono (8 lados)?',
      opcoes: [
        '20 diagonais',
        '16 diagonais',
        '24 diagonais',
        '40 diagonais'
      ],
      correta: 0,
      porque: 'Para n = 8: d = [8 × (8 - 3)] ÷ 2 = [8 × 5] ÷ 2 = 40 ÷ 2 = 20 diagonais.',
      dicaInvestigacao: 'Aplique a fórmula d = n(n - 3)/2 substituindo n por 8.'
    },
    {
      id: 'cur-8-13',
      serie: '8º Ano Fundamental',
      temaKey: 'curriculo_8ano',
      temaNome: 'Ângulo Externo de Triângulo',
      habilidade: 'EF08MA15',
      svgType: 'angulo_externo_triangulo',
      pergunta: 'Pelo Teorema do Ângulo Externo, a medida de um ângulo externo de um triângulo é igual à soma das medidas dos dois ângulos internos não adjacentes a ele. Se dois ângulos internos medem 48° e 62°, quanto mede o ângulo externo adjacente ao terceiro vértice?',
      opcoes: [
        '110°',
        '70°',
        '90°',
        '130°'
      ],
      correta: 0,
      porque: 'Ângulo externo = 48° + 62° = 110°. (O terceiro ângulo interno mede 180° - 110° = 70°, e seu suplemento é 110°).',
      dicaInvestigacao: 'O ângulo externo é simplesmente a soma direta dos dois internos opostos.'
    },
    {
      id: 'cur-8-14',
      serie: '8º Ano Fundamental',
      temaKey: 'curriculo_8ano',
      temaNome: 'Área do Setor Circular',
      habilidade: 'EF08MA19',
      svgType: 'setor_circular',
      pergunta: 'Uma fatia de bolo circular tem raio de 6 cm e abertura angular central de 90° (um quarto do círculo). Usando π ≈ 3,14, qual é a área desse setor circular?',
      opcoes: [
        '28,26 cm²',
        '113,04 cm²',
        '56,52 cm²',
        '18,84 cm²'
      ],
      correta: 0,
      porque: 'Área total do círculo = π·r² = 3,14 × 36 = 113,04 cm². Como 90° é 1/4 da volta (360°), a área do setor é 113,04 ÷ 4 = 28,26 cm².',
      dicaInvestigacao: 'Como 90° é um quarto de 360°, divida a área do círculo por 4.'
    },
    {
      id: 'cur-8-15',
      serie: '8º Ano Fundamental',
      temaKey: 'curriculo_8ano',
      temaNome: 'Posições Relativas entre Reta e Circunferência',
      habilidade: 'EF08MA16',
      svgType: 'reta_secante_tangente',
      pergunta: 'Uma reta que toca a circunferência em um único ponto, sendo perpendicular ao raio nesse ponto de contato, é denominada:',
      opcoes: [
        'Reta Tangente à circunferência',
        'Reta Secante à circunferência',
        'Reta Externa à circunferência',
        'Corda da circunferência'
      ],
      correta: 0,
      porque: 'A reta tangente encosta na circunferência em exatamente 1 ponto e forma um ângulo reto de 90° com o raio naquele ponto. A secante cruzaria em 2 pontos.',
      dicaInvestigacao: 'Toca em apenas 1 ponto: é a reta tangente.'
    }
  ],

  // ==========================================
  // 4. 9º ANO DO ENSINO FUNDAMENTAL (15 ITENS)
  // ==========================================
  '9º Ano Fundamental': [
    {
      id: 'cur-9-1',
      serie: '9º Ano Fundamental',
      temaKey: 'curriculo_9ano',
      temaNome: 'Teorema de Pitágoras no Triângulo Retângulo',
      habilidade: 'EF09MA14',
      svgType: 'pitagoras_3_4_5',
      pergunta: 'Um triângulo retângulo tem catetos medindo a = 9 cm e b = 12 cm. Qual é a medida da hipotenusa c?',
      opcoes: [
        '15 cm',
        '21 cm',
        '18 cm',
        '14 cm'
      ],
      correta: 0,
      porque: 'c² = a² + b² = 9² + 12² = 81 + 144 = 225 => c = √225 = 15 cm. Trata-se do triângulo pitagórico 3-4-5 multiplicado por 3.',
      dicaInvestigacao: 'Aplique c² = a² + b²: eleve 9 e 12 ao quadrado, some os resultados e extraia a raiz quadrada.'
    },
    {
      id: 'cur-9-2',
      serie: '9º Ano Fundamental',
      temaKey: 'curriculo_9ano',
      temaNome: 'Razões Trigonométricas: Seno',
      habilidade: 'EF09MA13',
      svgType: 'triangulo_seno',
      pergunta: 'No triângulo retângulo, a definição de seno de um ângulo agudo θ é dada pela razão entre:',
      opcoes: [
        'Cateto Oposto / Hipotenusa',
        'Cateto Adjacente / Hipotenusa',
        'Cateto Oposto / Cateto Adjacente',
        'Hipotenusa / Cateto Oposto'
      ],
      correta: 0,
      porque: 'Seno = Cateto Oposto / Hipotenusa. Cosseno = Cateto Adjacente / Hipotenusa. Tangente = Cateto Oposto / Cateto Adjacente.',
      dicaInvestigacao: 'Lembre-se da sigla SOH: Seno = Oposto sobre Hipotenusa.'
    },
    {
      id: 'cur-9-3',
      serie: '9º Ano Fundamental',
      temaKey: 'curriculo_9ano',
      temaNome: 'Cálculo com Ângulo Notável de 30°',
      habilidade: 'EF09MA13',
      svgType: 'triangulo_x_20',
      pergunta: 'Uma rampa forma um ângulo de 30° com o solo. O comprimento da rampa (hipotenusa) é de 20 metros. Sabendo que sen(30°) = 0,5, qual é a altura h alcançada pela rampa?',
      opcoes: [
        '10 metros',
        '15 metros',
        '17,3 metros',
        '5 metros'
      ],
      correta: 0,
      porque: 'sen(30°) = cateto oposto / hipotenusa => 0,5 = h / 20 => h = 20 × 0,5 = 10 metros.',
      dicaInvestigacao: 'Multiplique o comprimento da hipotenusa pelo seno de 30° (0,5).'
    },
    {
      id: 'cur-9-4',
      serie: '9º Ano Fundamental',
      temaKey: 'curriculo_9ano',
      temaNome: 'Cálculo de Altura com Tangente de 45°',
      habilidade: 'EF09MA13',
      svgType: 'predio_30m',
      pergunta: 'A 30 metros de distância da base de um prédio, uma pessoa avista o topo sob um ângulo de elevação de 45°. Dado que tg(45°) = 1, qual é a altura aproximada do prédio?',
      opcoes: [
        '30 metros',
        '45 metros',
        '15 metros',
        '60 metros'
      ],
      correta: 0,
      porque: 'tg(45°) = altura / distância horizontal => 1 = h / 30 => h = 30 metros.',
      dicaInvestigacao: 'Como a tangente de 45° é 1, a altura é exatamente igual à distância horizontal!'
    },
    {
      id: 'cur-9-5',
      serie: '9º Ano Fundamental',
      temaKey: 'curriculo_9ano',
      temaNome: 'Semelhança de Triângulos (Critério AA)',
      habilidade: 'EF09MA12',
      svgType: 'triangulos_semelhantes_sombra',
      pergunta: 'Um poste vertical projeta uma sombra de 6 metros no chão no mesmo instante em que uma estaca de 2 metros projeta uma sombra de 1,5 metro. Pela semelhança dos triângulos de sombra, qual é a altura do poste?',
      opcoes: [
        '8 metros',
        '9 metros',
        '7,5 metros',
        '12 metros'
      ],
      correta: 0,
      porque: 'H_poste / S_poste = h_estaca / s_estaca => H / 6 = 2 / 1,5 => 1,5·H = 12 => H = 8 metros.',
      dicaInvestigacao: 'Monte a proporção: Altura do poste / Sombra do poste = Altura da estaca / Sombra da estaca.'
    },
    {
      id: 'cur-9-6',
      serie: '9º Ano Fundamental',
      temaKey: 'curriculo_9ano',
      temaNome: 'Relações Métricas no Triângulo Retângulo',
      habilidade: 'EF09MA14',
      svgType: 'relacoes_metricas_altura',
      pergunta: 'No triângulo retângulo, a altura h relativa à hipotenusa e as projeções dos catetos m e n sobre a hipotenusa relacionam-se por h² = m · n. Se as projeções medem m = 4 cm e n = 9 cm, qual é a altura h?',
      opcoes: [
        '6 cm',
        '13 cm',
        '36 cm',
        '6,5 cm'
      ],
      correta: 0,
      porque: 'h² = m · n = 4 · 9 = 36 => h = √36 = 6 cm.',
      dicaInvestigacao: 'Multiplique as duas projeções (4 × 9 = 36) e extraia a raiz quadrada.'
    },
    {
      id: 'cur-9-7',
      serie: '9º Ano Fundamental',
      temaKey: 'curriculo_9ano',
      temaNome: 'Cateto em Função da Hipotenusa e Projeção',
      habilidade: 'EF09MA14',
      svgType: 'relacao_cateto_projecao',
      pergunta: 'Pela relação métrica b² = a · m, o quadrado de um cateto é igual ao produto da hipotenusa pela sua projeção. Em um triângulo com hipotenusa a = 25 cm e projeção m = 9 cm, qual é a medida do cateto b?',
      opcoes: [
        '15 cm',
        '16 cm',
        '225 cm',
        '12 cm'
      ],
      correta: 0,
      porque: 'b² = a · m = 25 · 9 = 225 => b = √225 = 15 cm.',
      dicaInvestigacao: 'Multiplique a hipotenusa (25) pela projeção (9) e tire a raiz.'
    },
    {
      id: 'cur-9-8',
      serie: '9º Ano Fundamental',
      temaKey: 'curriculo_9ano',
      temaNome: 'Cosseno no Triângulo Retângulo',
      habilidade: 'EF09MA13',
      svgType: 'triangulo_cosseno',
      pergunta: 'Em um triângulo retângulo, a hipotenusa mede 10 cm e o cateto adjacente ao ângulo α mede 8 cm. Qual é o valor de cos(α)?',
      opcoes: [
        '0,8',
        '0,6',
        '1,25',
        '0,75'
      ],
      correta: 0,
      porque: 'cos(α) = cateto adjacente / hipotenusa = 8 / 10 = 0,8.',
      dicaInvestigacao: 'Cosseno é a divisão do cateto colado (adjacente) pela hipotenusa.'
    },
    {
      id: 'cur-9-9',
      serie: '9º Ano Fundamental',
      temaKey: 'curriculo_9ano',
      temaNome: 'Volume do Cilindro Reto',
      habilidade: 'EF09MA19',
      svgType: 'cilindro_volume',
      pergunta: 'Um reservatório de água tem a forma de um cilindro circular reto com raio da base r = 3 metros e altura h = 5 metros. Usando π ≈ 3,14, qual é o volume desse reservatório?',
      opcoes: [
        '141,3 m³',
        '94,2 m³',
        '45 m³',
        '282,6 m³'
      ],
      correta: 0,
      porque: 'Volume do cilindro: V = π · r² · h = 3,14 × 3² × 5 = 3,14 × 9 × 5 = 3,14 × 45 = 141,3 m³.',
      dicaInvestigacao: 'Área da base circular (π·r²) vezes a altura do cilindro.'
    },
    {
      id: 'cur-9-10',
      serie: '9º Ano Fundamental',
      temaKey: 'curriculo_9ano',
      temaNome: 'Diagonal do Quadrado e Pitágoras',
      habilidade: 'EF09MA14',
      svgType: 'quadrado_diagonal',
      pergunta: 'A diagonal d de um quadrado de lado L divide o quadrado em dois triângulos retângulos isósceles. Pelo Teorema de Pitágoras, d² = L² + L² = 2L². Se o lado mede 10 cm, qual é a medida exata da diagonal?',
      opcoes: [
        '10√2 cm',
        '20 cm',
        '14 cm',
        '100 cm'
      ],
      correta: 0,
      porque: 'd = √(2L²) = L√2. Para L = 10 cm, d = 10√2 cm (aproximadamente 14,14 cm).',
      dicaInvestigacao: 'A diagonal de qualquer quadrado é sempre o lado multiplicado por √2.'
    },
    {
      id: 'cur-9-11',
      serie: '9º Ano Fundamental',
      temaKey: 'curriculo_9ano',
      temaNome: 'Tabela de Ângulos Notáveis (60°)',
      habilidade: 'EF09MA13',
      svgType: 'angulo_60',
      pergunta: 'Na tabela trigonométrica dos ângulos notáveis, quais são os valores exatos de sen(60°) e cos(60°)?',
      opcoes: [
        'sen(60°) = √3/2  e  cos(60°) = 1/2',
        'sen(60°) = 1/2  e  cos(60°) = √3/2',
        'sen(60°) = √2/2  e  cos(60°) = √2/2',
        'sen(60°) = 1  e  cos(60°) = 0'
      ],
      correta: 0,
      porque: 'Para 60°: o seno é √3/2 (≈ 0,866) e o cosseno é 1/2 (0,5). Note que sen(60°) = cos(30°).',
      dicaInvestigacao: 'Lembre-se da cantiga dos ângulos notáveis: 1, 2, 3 com raiz sobre 2.'
    },
    {
      id: 'cur-9-12',
      serie: '9º Ano Fundamental',
      temaKey: 'curriculo_9ano',
      temaNome: 'Altura do Triângulo Equilátero',
      habilidade: 'EF09MA14',
      svgType: 'triangulo_equilatero_altura',
      pergunta: 'A altura h de um triângulo equilátero de lado L é deduzida por Pitágoras como h = (L√3) ÷ 2. Se o lado do triângulo equilátero mede 8 cm, quanto mede sua altura?',
      opcoes: [
        '4√3 cm',
        '8√3 cm',
        '4 cm',
        '16√3 cm'
      ],
      correta: 0,
      porque: 'h = (8√3) ÷ 2 = 4√3 cm.',
      dicaInvestigacao: 'Substitua L = 8 na fórmula h = (L√3)/2.'
    },
    {
      id: 'cur-9-13',
      serie: '9º Ano Fundamental',
      temaKey: 'curriculo_9ano',
      temaNome: 'Razão entre Áreas de Figuras Semelhantes',
      habilidade: 'EF09MA12',
      svgType: 'semelhanca_k2',
      pergunta: 'Dois triângulos semelhantes têm razão de semelhança entre seus lados k = 3 (o maior tem lados 3 vezes maiores que o menor). Qual é a razão entre as áreas desses dois triângulos?',
      opcoes: [
        'A razão entre as áreas é 9 (k² = 3²)',
        'A razão entre as áreas é 3 (igual aos lados)',
        'A razão entre as áreas é 6 (o dobro de 3)',
        'A razão entre as áreas é 27 (k³)'
      ],
      correta: 0,
      porque: 'A razão entre comprimentos é k, mas a razão entre áreas é sempre k² = 3² = 9. O triângulo maior tem 9 vezes a área do menor.',
      dicaInvestigacao: 'Área envolve duas dimensões multiplicadas, portanto a razão de semelhança fica elevada ao quadrado (k²).'
    },
    {
      id: 'cur-9-14',
      serie: '9º Ano Fundamental',
      temaKey: 'curriculo_9ano',
      temaNome: 'Tangente e Coeficiente Angular',
      habilidade: 'EF09MA13',
      svgType: 'triangulo_tangente',
      pergunta: 'Um telhado tem uma subida vertical de 3 metros para cada 4 metros de extensão horizontal. Qual é o valor da tangente do ângulo de inclinação desse telhado?',
      opcoes: [
        'tg(θ) = 3/4 = 0,75',
        'tg(θ) = 4/3 ≈ 1,33',
        'tg(θ) = 3/5 = 0,6',
        'tg(θ) = 4/5 = 0,8'
      ],
      correta: 0,
      porque: 'A tangente é a razão entre a altura vertical (cateto oposto = 3) e o avanço horizontal (cateto adjacente = 4): 3/4 = 0,75.',
      dicaInvestigacao: 'Tangente = Altura vertical dividida pelo comprimento horizontal (Cateto Oposto / Cateto Adjacente).'
    },
    {
      id: 'cur-9-15',
      serie: '9º Ano Fundamental',
      temaKey: 'curriculo_9ano',
      temaNome: 'Triângulo Retângulo 30°-60°-90°',
      habilidade: 'EF09MA13',
      svgType: 'triangulo_calculo_5_10',
      pergunta: 'Em um triângulo retângulo com ângulo de 30°, a hipotenusa mede 10 cm e o cateto oposto mede 5 cm. Sabendo que o outro cateto é adjacente ao ângulo de 30°, sua medida calculada por Pitágoras é:',
      opcoes: [
        '5√3 cm (pois 10² - 5² = 100 - 25 = 75 = 25 · 3)',
        '5 cm',
        '15 cm',
        '5√2 cm'
      ],
      correta: 0,
      porque: 'b² = 10² - 5² = 100 - 25 = 75 => b = √75 = √(25 × 3) = 5√3 cm (aproximadamente 8,66 cm).',
      dicaInvestigacao: 'No triângulo 30-60-90, o cateto menor é metade da hipotenusa e o maior é o menor multiplicado por √3.'
    }
  ],

  // ==========================================
  // 5. 1º ANO DO ENSINO MÉDIO (15 ITENS)
  // ==========================================
  '1º Ano Ensino Médio': [
    {
      id: 'cur-1em-1',
      serie: '1º Ano Ensino Médio',
      temaKey: 'curriculo_1em',
      temaNome: 'Função Afim e Gráfico da Reta',
      habilidade: 'EM13MAT101',
      svgType: 'funcao_afim_reta',
      pergunta: 'A função f(x) = 2x - 6 representa o crescimento linear de um projeto. Qual é o ponto em que a reta intercepta o eixo das abscissas (eixo x, raiz da função)?',
      opcoes: [
        '(3, 0)',
        '(0, -6)',
        '(-3, 0)',
        '(6, 0)'
      ],
      correta: 0,
      porque: 'Para encontrar a raiz no eixo x, fazemos f(x) = 0: 2x - 6 = 0 => 2x = 6 => x = 3. O ponto é (3, 0).',
      dicaInvestigacao: 'Zere a função (f(x) = 0) para encontrar onde a reta cruza o eixo horizontal x.'
    },
    {
      id: 'cur-1em-2',
      serie: '1º Ano Ensino Médio',
      temaKey: 'curriculo_1em',
      temaNome: 'Vértice da Parábola e Altura Máxima',
      habilidade: 'EM13MAT101',
      svgType: 'parabola_vertice',
      pergunta: 'A trajetória de um projétil é descrita pela função quadrática h(t) = -5t² + 20t, onde h é a altura em metros e t é o tempo em segundos. Qual é a altura máxima atingida pelo projétil?',
      opcoes: [
        '20 metros',
        '25 metros',
        '10 metros',
        '40 metros'
      ],
      correta: 0,
      porque: 'O tempo do vértice é t_v = -b / (2a) = -20 / (-10) = 2 s. Substituindo: h(2) = -5(2)² + 20(2) = -20 + 40 = 20 metros.',
      dicaInvestigacao: 'Ache o tempo do vértice t = -b/(2a) e depois calcule h(t) nesse instante.'
    },
    {
      id: 'cur-1em-3',
      serie: '1º Ano Ensino Médio',
      temaKey: 'curriculo_1em',
      temaNome: 'Conversão de Graus para Radianos',
      habilidade: 'EM13MAT306',
      svgType: 'graus_radianos',
      pergunta: 'No ciclo trigonométrico, 180° corresponde a π radianos. A quantos radianos equivale o ângulo notável de 60°?',
      opcoes: [
        'π / 3 radianos',
        'π / 4 radianos',
        'π / 6 radianos',
        '2π / 3 radianos'
      ],
      correta: 0,
      porque: 'Dividindo 180° por 3 obtemos 60°. Logo, 60° = π / 3 radianos (60/180 = 1/3).',
      dicaInvestigacao: 'Monte a proporção: 180° está para π assim como 60° está para x.'
    },
    {
      id: 'cur-1em-4',
      serie: '1º Ano Ensino Médio',
      temaKey: 'curriculo_1em',
      temaNome: 'Seno e Cosseno no Ciclo Trigonométrico',
      habilidade: 'EM13MAT306',
      svgType: 'ciclo_eixos_sen_cos',
      pergunta: 'No ciclo trigonométrico de raio unitário R = 1, o eixo vertical (eixo y) e o eixo horizontal (eixo x) representam respectivamente quais funções trigonométricas?',
      opcoes: [
        'Eixo y = Seno e Eixo x = Cosseno',
        'Eixo y = Cosseno e Eixo x = Seno',
        'Eixo y = Tangente e Eixo x = Cosseno',
        'Eixo y = Seno e Eixo x = Tangente'
      ],
      correta: 0,
      porque: 'No ciclo trigonométrico, as coordenadas de qualquer ponto P são (cos θ, sen θ). O eixo x é o eixo dos cossenos e o eixo y é o eixo dos senos ("com sono deitado, sem sono em pé").',
      dicaInvestigacao: 'Macete clássico: Eixo x = Com sono (deitado) = Cosseno; Eixo y = Sem sono (em pé) = Seno.'
    },
    {
      id: 'cur-1em-5',
      serie: '1º Ano Ensino Médio',
      temaKey: 'curriculo_1em',
      temaNome: 'Relação Fundamental da Trigonometria',
      habilidade: 'EM13MAT306',
      svgType: 'relacao_fundamental',
      pergunta: 'Para qualquer ângulo θ pertencente ao ciclo trigonométrico, a Relação Fundamental garante que sen²(θ) + cos²(θ) é sempre igual a:',
      opcoes: [
        '1',
        '0',
        '2',
        'tg(θ)'
      ],
      correta: 0,
      porque: 'Pelo Teorema de Pitágoras no triângulo retângulo do ciclo trigonométrico (onde a hipotenusa é o raio 1): (sen θ)² + (cos θ)² = 1² = 1.',
      dicaInvestigacao: 'A soma dos quadrados do seno e do cosseno de um mesmo ângulo sempre resulta em 1.'
    },
    {
      id: 'cur-1em-6',
      serie: '1º Ano Ensino Médio',
      temaKey: 'curriculo_1em',
      temaNome: 'Progressão Aritmética na Geometria',
      habilidade: 'EM13MAT507',
      svgType: 'pa_segmentos',
      pergunta: 'Os perímetros de três quadrados formam uma Progressão Aritmética (PA): 12 cm, 20 cm e 28 cm. Qual é a razão dessa progressão e o perímetro do 4º quadrado?',
      opcoes: [
        'Razão r = 8 cm e 4º perímetro = 36 cm',
        'Razão r = 6 cm e 4º perímetro = 34 cm',
        'Razão r = 8 cm e 4º perímetro = 32 cm',
        'Razão r = 10 cm e 4º perímetro = 38 cm'
      ],
      correta: 0,
      porque: 'A razão é 20 - 12 = 8 cm. O quarto termo é 28 + 8 = 36 cm.',
      dicaInvestigacao: 'Subtraia o primeiro termo do segundo para achar a razão r e some ao terceiro termo.'
    },
    {
      id: 'cur-1em-7',
      serie: '1º Ano Ensino Médio',
      temaKey: 'curriculo_1em',
      temaNome: 'Sinal das Funções Trigonométricas por Quadrante',
      habilidade: 'EM13MAT306',
      svgType: 'quadrantes_sinais',
      pergunta: 'Um ângulo de 150° está localizado no 2º quadrante do ciclo trigonométrico. Quais são os sinais de sen(150°) e cos(150°)?',
      opcoes: [
        'sen(150°) > 0 (positivo) e cos(150°) < 0 (negativo)',
        'sen(150°) < 0 e cos(150°) > 0',
        'Ambos são positivos',
        'Ambos são negativos'
      ],
      correta: 0,
      porque: 'No 2º quadrante: y > 0 (seno positivo) e x < 0 (cosseno negativo). De fato, sen(150°) = 0,5 e cos(150°) = -√3/2.',
      dicaInvestigacao: 'No segundo quadrante (canto superior esquerdo): o y é positivo e o x é negativo.'
    },
    {
      id: 'cur-1em-8',
      serie: '1º Ano Ensino Médio',
      temaKey: 'curriculo_1em',
      temaNome: 'Distância entre Dois Pontos no Plano',
      habilidade: 'EM13MAT501',
      svgType: 'distancia_dois_pontos',
      pergunta: 'Dados os pontos A(1, 2) e B(4, 6) no plano cartesiano, a distância d entre eles é deduzida diretamente por Pitágoras: d = √[(xB - xA)² + (yB - yA)²]. Qual é a distância d?',
      opcoes: [
        '5 unidades',
        '7 unidades',
        '25 unidades',
        '√7 unidades'
      ],
      correta: 0,
      porque: 'd = √[(4 - 1)² + (6 - 2)²] = √[3² + 4²] = √[9 + 16] = √25 = 5 unidades.',
      dicaInvestigacao: 'Calcule a variação horizontal (3) e vertical (4): triângulo pitagórico 3-4-5.'
    },
    {
      id: 'cur-1em-9',
      serie: '1º Ano Ensino Médio',
      temaKey: 'curriculo_1em',
      temaNome: 'Tangente no Ciclo Trigonométrico',
      habilidade: 'EM13MAT306',
      svgType: 'eixo_tangente',
      pergunta: 'A reta tangente ao ciclo trigonométrico passa pelo ponto (1, 0) paralela ao eixo y. Sabendo que tg(θ) = sen(θ) / cos(θ), para qual dos seguintes ângulos a tangente NÃO é definida?',
      opcoes: [
        '90° (onde cos(90°) = 0)',
        '0° (onde sen(0°) = 0)',
        '45° (onde sen = cos)',
        '180° (onde sen = 0)'
      ],
      correta: 0,
      porque: 'Em 90° e 270°, o cosseno é zero. Como não existe divisão por zero, a tangente não é definida (a reta é paralela ao eixo da tangente).',
      dicaInvestigacao: 'A tangente divide pelo cosseno; onde o cosseno for zero, a tangente não existe.'
    },
    {
      id: 'cur-1em-10',
      serie: '1º Ano Ensino Médio',
      temaKey: 'curriculo_1em',
      temaNome: 'Comprimento de Arco de Circunferência',
      habilidade: 'EM13MAT306',
      svgType: 'arco_circunferencia',
      pergunta: 'O comprimento de um arco s é dado por s = R · θ, com o ângulo θ em radianos. Em uma roda de raio R = 4 metros, qual é o comprimento do arco subtendido por um ângulo central de π/2 radianos (90°)?',
      opcoes: [
        '2π metros (≈ 6,28 m)',
        '4π metros',
        'π metros',
        '8π metros'
      ],
      correta: 0,
      porque: 's = R · θ = 4 · (π/2) = 2π metros.',
      dicaInvestigacao: 'Multiplique o raio pelo ângulo em radianos: 4 × (π/2) = 2π.'
    },
    {
      id: 'cur-1em-11',
      serie: '1º Ano Ensino Médio',
      temaKey: 'curriculo_1em',
      temaNome: 'Taxa de Variação (Coeficiente Angular)',
      habilidade: 'EM13MAT101',
      svgType: 'inclinacao_reta_m',
      pergunta: 'Uma reta passa pelos pontos P(2, 5) e Q(6, 13). Qual é o coeficiente angular m = (y2 - y1) / (x2 - x1) dessa reta?',
      opcoes: [
        'm = 2',
        'm = 4',
        'm = 0,5',
        'm = 8'
      ],
      correta: 0,
      porque: 'm = (13 - 5) / (6 - 2) = 8 / 4 = 2.',
      dicaInvestigacao: 'Divida a variação em y pela variação em x: (13 - 5)/(6 - 2).'
    },
    {
      id: 'cur-1em-12',
      serie: '1º Ano Ensino Médio',
      temaKey: 'curriculo_1em',
      temaNome: 'Simetria no Ciclo: Redução ao 1º Quadrante',
      habilidade: 'EM13MAT306',
      svgType: 'reducao_primeiro_quadrante',
      pergunta: 'Para calcular sen(120°), reduzimos ao 1º quadrante usando o suplemento (180° - 120° = 60°). Como o seno é positivo no 2º quadrante, sen(120°) é igual a:',
      opcoes: [
        'sen(60°) = √3/2',
        '-sen(60°) = -√3/2',
        'cos(60°) = 1/2',
        '-1/2'
      ],
      correta: 0,
      porque: 'sen(180° - x) = sen(x). Para x = 60°: sen(120°) = sen(60°) = √3/2.',
      dicaInvestigacao: 'O seno no segundo quadrante é positivo e tem o mesmo valor do seno do seu ângulo suplementar.'
    },
    {
      id: 'cur-1em-13',
      serie: '1º Ano Ensino Médio',
      temaKey: 'curriculo_1em',
      temaNome: 'Área do Setor Circular em Radianos',
      habilidade: 'EM13MAT306',
      svgType: 'setor_radianos',
      pergunta: 'A fórmula da área de um setor circular com ângulo θ em radianos é A = (θ · R²) / 2. Para um raio R = 6 cm e ângulo central de π/3 radianos, qual é a área?',
      opcoes: [
        '6π cm²',
        '12π cm²',
        '36π cm²',
        '3π cm²'
      ],
      correta: 0,
      porque: 'A = (π/3 × 6²) / 2 = (π/3 × 36) / 2 = 12π / 2 = 6π cm².',
      dicaInvestigacao: 'Multiplique o ângulo em radianos pelo raio ao quadrado e divida por 2.'
    },
    {
      id: 'cur-1em-14',
      serie: '1º Ano Ensino Médio',
      temaKey: 'curriculo_1em',
      temaNome: 'Cálculo de Cosseno com a Relação Fundamental',
      habilidade: 'EM13MAT306',
      svgType: 'seno_para_cosseno',
      pergunta: 'Sabendo que um ângulo agudo α tem sen(α) = 3/5, qual é o valor exato de cos(α)?',
      opcoes: [
        'cos(α) = 4/5',
        'cos(α) = 2/5',
        'cos(α) = 5/3',
        'cos(α) = 1/5'
      ],
      correta: 0,
      porque: 'sen²(α) + cos²(α) = 1 => (3/5)² + cos²(α) = 1 => 9/25 + cos²(α) = 1 => cos²(α) = 16/25 => cos(α) = 4/5.',
      dicaInvestigacao: 'Substitua 3/5 em sen² + cos² = 1 e resolva: cos = √(1 - 9/25) = √(16/25) = 4/5.'
    },
    {
      id: 'cur-1em-15',
      serie: '1º Ano Ensino Médio',
      temaKey: 'curriculo_1em',
      temaNome: 'Progressão Geométrica e Fractais',
      habilidade: 'EM13MAT507',
      svgType: 'fractal_pg',
      pergunta: 'Na construção de um fractal geométrico, as áreas dos triângulos a cada etapa formam uma PG de razão q = 1/2: 16 cm², 8 cm², 4 cm²... Qual é a área do 5º termo dessa sequência?',
      opcoes: [
        '1 cm²',
        '2 cm²',
        '0,5 cm²',
        '0,25 cm²'
      ],
      correta: 0,
      porque: 'Termos: a1 = 16, a2 = 8, a3 = 4, a4 = 2, a5 = 1 cm².',
      dicaInvestigacao: 'Vá dividindo por 2 a cada etapa sucessiva: 16 -> 8 -> 4 -> 2 -> 1.'
    }
  ],

  // ==========================================
  // 6. 2º ANO DO ENSINO MÉDIO (15 ITENS)
  // ==========================================
  '2º Ano Ensino Médio': [
    {
      id: 'cur-2em-1',
      serie: '2º Ano Ensino Médio',
      temaKey: 'curriculo_2em',
      temaNome: 'Lei dos Senos em Triângulos Quaisquer',
      habilidade: 'EM13MAT307',
      svgType: 'lei_senos_geral',
      pergunta: 'Em um triângulo qualquer, a Lei dos Senos afirma que a / sen(A) = b / sen(B). Se o lado a mede 12 cm, o ângulo oposto A mede 30° e o ângulo B mede 45°, sabendo que sen(30°) = 0,5 e sen(45°) = √2/2, qual é a medida do lado b?',
      opcoes: [
        '12√2 cm',
        '6√2 cm',
        '24 cm',
        '12 cm'
      ],
      correta: 0,
      porque: '12 / 0,5 = b / (√2/2) => 24 = b / (√2/2) => b = 24 × (√2/2) = 12√2 cm.',
      dicaInvestigacao: 'Multiplique em cruz: 12 · sen(45°) = b · sen(30°).'
    },
    {
      id: 'cur-2em-2',
      serie: '2º Ano Ensino Médio',
      temaKey: 'curriculo_2em',
      temaNome: 'Lei dos Cossenos: Cálculo de Lado Oposto',
      habilidade: 'EM13MAT307',
      svgType: 'triangulo_cossenos_5_8',
      pergunta: 'Em um triângulo ABC, dois lados medem b = 5 cm e c = 8 cm, e o ângulo compreendido entre eles é A = 60°. Dado cos(60°) = 0,5, qual é a medida do terceiro lado a?',
      opcoes: [
        '7 cm',
        '9 cm',
        '√89 cm',
        '6 cm'
      ],
      correta: 0,
      porque: 'a² = b² + c² - 2bc·cos(A) = 5² + 8² - 2(5)(8)(0,5) = 25 + 64 - 40 = 89 - 40 = 49 => a = √49 = 7 cm.',
      dicaInvestigacao: 'Aplique a fórmula a² = b² + c² - 2bc·cos(A): 25 + 64 - 40 = 49 => a = 7.'
    },
    {
      id: 'cur-2em-3',
      serie: '2º Ano Ensino Médio',
      temaKey: 'curriculo_2em',
      temaNome: 'Volume do Prisma Triangular',
      habilidade: 'EM13MAT201',
      svgType: 'prisma_triangular',
      pergunta: 'Um prisma reto tem como base um triângulo de área A_base = 24 cm² e altura h = 10 cm. Qual é o volume total desse prisma?',
      opcoes: [
        '240 cm³',
        '80 cm³',
        '120 cm³',
        '480 cm³'
      ],
      correta: 0,
      porque: 'O volume de qualquer prisma reto é V = Área da base × altura = 24 × 10 = 240 cm³.',
      dicaInvestigacao: 'Em prismas, multiplique diretamente a área da base pela altura: V = Ab × h.'
    },
    {
      id: 'cur-2em-4',
      serie: '2º Ano Ensino Médio',
      temaKey: 'curriculo_2em',
      temaNome: 'Volume da Pirâmide Regular',
      habilidade: 'EM13MAT201',
      svgType: 'piramide_volume',
      pergunta: 'Uma pirâmide reta de base quadrada possui lado da base de 6 metros e altura de 10 metros. Qual é o volume dessa pirâmide?',
      opcoes: [
        '120 m³',
        '360 m³',
        '180 m³',
        '60 m³'
      ],
      correta: 0,
      porque: 'Área da base = 6 × 6 = 36 m². O volume da pirâmide é V = (Área da base × altura) ÷ 3 = (36 × 10) ÷ 3 = 360 ÷ 3 = 120 m³.',
      dicaInvestigacao: 'Lembre-se do fator 1/3 nas pirâmides e cones: V = (Ab × h) / 3.'
    },
    {
      id: 'cur-2em-5',
      serie: '2º Ano Ensino Médio',
      temaKey: 'curriculo_2em',
      temaNome: 'Período da Função Seno',
      habilidade: 'EM13MAT306',
      svgType: 'funcao_senoide',
      pergunta: 'A função trigonométrica f(x) = sen(x) tem período clássico 2π. Se a função for modificada para f(x) = sen(2x), qual será o novo período P?',
      opcoes: [
        'P = π radianos',
        'P = 4π radianos',
        'P = 2π radianos',
        'P = π/2 radianos'
      ],
      correta: 0,
      porque: 'Para f(x) = sen(kx), o período é P = 2π / |k|. Com k = 2: P = 2π / 2 = π radianos.',
      dicaInvestigacao: 'Divida o período padrão 2π pelo coeficiente que multiplica x: 2π / 2 = π.'
    },
    {
      id: 'cur-2em-6',
      serie: '2º Ano Ensino Médio',
      temaKey: 'curriculo_2em',
      temaNome: 'Volume do Cone Circular Reto',
      habilidade: 'EM13MAT201',
      svgType: 'cone_volume',
      pergunta: 'Um cone circular reto tem raio da base r = 3 cm e altura h = 8 cm. Usando π ≈ 3,14, qual é o volume aproximado desse cone?',
      opcoes: [
        '75,36 cm³',
        '226,08 cm³',
        '24 cm³',
        '150,72 cm³'
      ],
      correta: 0,
      porque: 'Volume do cone = (π · r² · h) ÷ 3 = (3,14 × 9 × 8) ÷ 3 = (3,14 × 72) ÷ 3 = 3,14 × 24 = 75,36 cm³.',
      dicaInvestigacao: 'O cone é a terça parte do cilindro correspondente: (π·r²·h) / 3.'
    },
    {
      id: 'cur-2em-7',
      serie: '2º Ano Ensino Médio',
      temaKey: 'curriculo_2em',
      temaNome: 'Lei dos Cossenos com Ângulo Obtuso',
      habilidade: 'EM13MAT307',
      svgType: 'triangulo_obtuso_cosseno',
      pergunta: 'Em um triângulo, lados b = 3 e c = 5 formam um ângulo obtuso A = 120°. Sabendo que cos(120°) = -0,5, qual é o valor do lado oposto a?',
      opcoes: [
        '7 (pois a² = 9 + 25 - 2(3)(5)(-0,5) = 34 + 15 = 49)',
        '√19',
        '8',
        '6'
      ],
      correta: 0,
      porque: 'a² = 3² + 5² - 2(3)(5)(-0,5) = 9 + 25 + 15 = 49 => a = 7. O cosseno negativo fez o termo virar positivo!',
      dicaInvestigacao: 'Atenção aos sinais: menos com menos dá mais no termo -2bc·cos(A)!'
    },
    {
      id: 'cur-2em-8',
      serie: '2º Ano Ensino Médio',
      temaKey: 'curriculo_2em',
      temaNome: 'Volume da Esfera',
      habilidade: 'EM13MAT201',
      svgType: 'esfera_volume',
      pergunta: 'Uma esfera de aço possui raio R = 3 cm. Usando π ≈ 3,14 e a fórmula V = (4/3)·π·R³, qual é o volume dessa esfera?',
      opcoes: [
        '113,04 cm³',
        '36 cm³',
        '37,68 cm³',
        '339,12 cm³'
      ],
      correta: 0,
      porque: 'V = (4/3) × 3,14 × 3³ = (4/3) × 3,14 × 27 = 4 × 3,14 × 9 = 113,04 cm³.',
      dicaInvestigacao: 'R³ = 27; dividindo por 3 dá 9; 4 × 3,14 × 9 = 113,04.'
    },
    {
      id: 'cur-2em-9',
      serie: '2º Ano Ensino Médio',
      temaKey: 'curriculo_2em',
      temaNome: 'Fórmula de Adição de Arcos (Seno da Soma)',
      habilidade: 'EM13MAT306',
      svgType: 'seno_adicao_arcos',
      pergunta: 'A fórmula da adição de arcos para o seno é sen(a + b) = sen(a)cos(b) + sen(b)cos(a). Como 75° = 45° + 30°, sen(75°) equivale a:',
      opcoes: [
        '(√6 + √2) / 4',
        '(√6 - √2) / 4',
        '(√3 + 1) / 2',
        '1 / 2'
      ],
      correta: 0,
      porque: 'sen(45°+30°) = (√2/2)(√3/2) + (√2/2)(1/2) = √6/4 + √2/4 = (√6 + √2) / 4.',
      dicaInvestigacao: 'Substitua sen(45°)=√2/2, cos(30°)=√3/2, sen(30°)=1/2, cos(45°)=√2/2.'
    },
    {
      id: 'cur-2em-10',
      serie: '2º Ano Ensino Médio',
      temaKey: 'curriculo_2em',
      temaNome: 'Área da Superfície Esférica',
      habilidade: 'EM13MAT201',
      svgType: 'esfera_area',
      pergunta: 'A área da superfície de uma esfera de raio R é dada por A = 4·π·R². Para uma bola de basquete de raio R = 10 cm e π ≈ 3,14, qual é a área externa?',
      opcoes: [
        '1 256 cm²',
        '314 cm²',
        '400 cm²',
        '628 cm²'
      ],
      correta: 0,
      porque: 'A = 4 × 3,14 × 10² = 4 × 3,14 × 100 = 1256 cm².',
      dicaInvestigacao: 'Área da casca esférica = 4 vezes a área do círculo máximo: 4·π·r².'
    },
    {
      id: 'cur-2em-11',
      serie: '2º Ano Ensino Médio',
      temaKey: 'curriculo_2em',
      temaNome: 'Lei dos Senos e o Raio Circunscrito (2R)',
      habilidade: 'EM13MAT307',
      svgType: 'lei_senos_circunscrito',
      pergunta: 'Pela Lei dos Senos completa, a / sen(A) = 2R, onde R é o raio da circunferência circunscrita. Se um triângulo tem lado a = 10 cm oposto ao ângulo de 30° (sen 30° = 0,5), qual é o raio R da circunferência?',
      opcoes: [
        'R = 10 cm',
        'R = 20 cm',
        'R = 5 cm',
        'R = 15 cm'
      ],
      correta: 0,
      porque: '10 / 0,5 = 20 = 2R => R = 10 cm.',
      dicaInvestigacao: 'Divida o lado pelo seno (10 / 0,5 = 20) e depois divida por 2 para achar o raio R.'
    },
    {
      id: 'cur-2em-12',
      serie: '2º Ano Ensino Médio',
      temaKey: 'curriculo_2em',
      temaNome: 'Área do Triângulo com Seno (Fórmula Trigonométrica)',
      habilidade: 'EM13MAT307',
      svgType: 'area_triangulo_seno',
      pergunta: 'A área de um triângulo pode ser calculada por A = (b · c · sen(A)) ÷ 2 quando conhecemos dois lados e o ângulo entre eles. Se b = 6 cm, c = 10 cm e o ângulo entre eles é 30° (sen 30° = 0,5), qual é a área?',
      opcoes: [
        '15 cm²',
        '30 cm²',
        '60 cm²',
        '7,5 cm²'
      ],
      correta: 0,
      porque: 'A = (6 × 10 × 0,5) ÷ 2 = (60 × 0,5) ÷ 2 = 30 ÷ 2 = 15 cm².',
      dicaInvestigacao: 'Multiplique os dois lados, multiplique pelo seno do ângulo entre eles e divida por 2.'
    },
    {
      id: 'cur-2em-13',
      serie: '2º Ano Ensino Médio',
      temaKey: 'curriculo_2em',
      temaNome: 'Equação Trigonométrica Básica',
      habilidade: 'EM13MAT306',
      svgType: 'equacao_trigonometrica',
      pergunta: 'No intervalo [0, 2π], quais são os dois ângulos cuja função seno resulta em 1/2 (sen(x) = 1/2)?',
      opcoes: [
        '30° (π/6) e 150° (5π/6)',
        '30° (π/6) e 60° (π/3)',
        '60° (π/3) e 120° (2π/3)',
        '45° (π/4) e 135° (3π/4)'
      ],
      correta: 0,
      porque: 'O seno é positivo no 1º e 2º quadrantes: x = 30° e x = 180° - 30° = 150°.',
      dicaInvestigacao: 'O seno tem valor 1/2 no 1º quadrante (30°) e no 2º quadrante (180° - 30° = 150°).'
    },
    {
      id: 'cur-2em-14',
      serie: '2º Ano Ensino Médio',
      temaKey: 'curriculo_2em',
      temaNome: 'Relação de Euler nos Poliedros Convexos',
      habilidade: 'EM13MAT201',
      svgType: 'poliedro_euler',
      pergunta: 'Pela célebre Relação de Euler para poliedros convexos: V - A + F = 2 (Vértices - Arestas + Faces = 2). Se um poliedro possui 12 vértices e 30 arestas, quantas faces ele possui?',
      opcoes: [
        '20 faces (Icosaedro)',
        '18 faces',
        '14 faces',
        '22 faces'
      ],
      correta: 0,
      porque: 'V - A + F = 2 => 12 - 30 + F = 2 => -18 + F = 2 => F = 20 faces.',
      dicaInvestigacao: 'Isole F na fórmula: F = 2 + A - V = 2 + 30 - 12 = 20.'
    },
    {
      id: 'cur-2em-15',
      serie: '2º Ano Ensino Médio',
      temaKey: 'curriculo_2em',
      temaNome: 'Tronco de Pirâmide e Semelhança Espacial',
      habilidade: 'EM13MAT201',
      svgType: 'tronco_piramide',
      pergunta: 'Ao seccionarmos uma pirâmide por um plano paralelo à base na metade da sua altura (razão k = 1/2), qual é a razão entre o volume da pirâmide menor do topo e o volume da pirâmide original?',
      opcoes: [
        '1/8 (pois k³ = (1/2)³ = 1/8)',
        '1/4 (k²)',
        '1/2 (k)',
        '1/16'
      ],
      correta: 0,
      porque: 'A razão entre volumes de sólidos semelhantes é o cubo da razão linear: k³ = (1/2)³ = 1/8.',
      dicaInvestigacao: 'Volume está na terceira dimensão: eleve a razão de escala ao cubo (k³).'
    }
  ],

  // ==========================================
// ==========================================
  // 7. 3º ANO DO ENSINO MÉDIO - ESTRUTURADO POR AULAS
  // ==========================================
    // ==========================================
  // 7. 3º ANO DO ENSINO MÉDIO - ESTRUTURADO POR AULAS
  // ==========================================
  '3º Ano Ensino Médio': CURRICULO_3EM_QUESTIONS
};

export const CURRICULO_ACAO_QUESTIONS = CURRICULO_QUESTIONS;

/**
 * Retorna a lista ativa de questões de uma série do Currículo em Ação,
 * já aplicando adições, edições e remoções cadastradas pelo Administrador.
 */
export function getMergedCurriculoQuestions(serie: CurriculoSerie): Question[] {
  const baseQuestions = CURRICULO_QUESTIONS[serie] || [];
  return applyOverridesToPool(
    baseQuestions,
    'curriculo_acao',
    (o) => o.serie === serie
  );
}

/**
 * Retorna as 10 questões oficiais do Livro do Estudante (4º Bimestre) para as séries do 6º EF ao 2º EM,
 * ou todas as aulas ativas para o 3º EM.
 * As questões e alternativas são dinamicamente embaralhadas a cada sessão de treino.
 */
export function generateCurriculoSession(serie: CurriculoSerie, limit: number = 10): Question[] {
  const activeQuestions = getMergedCurriculoQuestions(serie);
  const source = activeQuestions.length > 0 ? activeQuestions : (CURRICULO_QUESTIONS[serie] || []);
  if (serie === '3º Ano Ensino Médio') {
    return source.map(prepareShuffledQuestion);
  }
  const shuffledQuestions = shuffle(source).slice(0, limit);
  return shuffledQuestions.map(prepareShuffledQuestion);
}
