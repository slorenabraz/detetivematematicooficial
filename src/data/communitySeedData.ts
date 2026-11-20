import { User, SessionResult, QuestionAttempt } from '../types';

export interface CommunitySeedDataset {
  users: User[];
  results: SessionResult[];
  attempts: QuestionAttempt[];
}

interface StudentBlueprint {
  id: string;
  nome: string;
  serie: string;
  // 0..4 correct out of 4 seeded oficial attempts
  oficialHits4: number;
  // 1..3 completed oficial sessions (feeds Ranking)
  oficialSessions: number;
  // 0..4 correct out of 4 seeded curriculo attempts
  curriculoHits4: number;
  // 0..2 correct out of 2 seeded treine_mais attempts
  treineHits2: number;
  // base average response time in seconds
  avgTimeSec: number;
  daysAgoRegistered: number;
}

const GRADE_CURRICULO_TOPICS: Record<
  string,
  Array<{ tema: string; pergunta: string; correta: string; errada: string }>
> = {
  '6º Ano Fundamental': [
    {
      tema: 'Frações e Números Decimais',
      pergunta: 'Qual fração irredutível equivale ao número decimal 0,75?',
      correta: '3/4',
      errada: '7/5'
    },
    {
      tema: 'Perímetro e Área de Polígonos',
      pergunta: 'Um terreno retangular mede 12 m por 8 m. Qual é a sua área total?',
      correta: '96 m²',
      errada: '40 m²'
    },
    {
      tema: 'Múltiplos e Divisores',
      pergunta: 'Qual é o mínimo múltiplo comum (MMC) entre 6 e 8?',
      correta: '24',
      errada: '48'
    },
    {
      tema: 'Ângulos e Figuras Geométricas',
      pergunta: 'Um ângulo cuja medida é exatamente 90° é classificado como:',
      correta: 'Ângulo reto',
      errada: 'Ângulo obtuso'
    }
  ],
  '7º Ano Fundamental': [
    {
      tema: 'Números Inteiros e Operações',
      pergunta: 'Qual é o resultado da expressão numérica (-12) + 19 - 4?',
      correta: '3',
      errada: '-3'
    },
    {
      tema: 'Equações do 1º Grau',
      pergunta: 'Resolva a equação 3x - 7 = 14 e indique o valor de x:',
      correta: 'x = 7',
      errada: 'x = 5'
    },
    {
      tema: 'Proporcionalidade e Regra de Três',
      pergunta: 'Se 4 cadernos custam R$ 36,00, quanto custarão 7 cadernos iguais?',
      correta: 'R$ 63,00',
      errada: 'R$ 56,00'
    },
    {
      tema: 'Soma dos Ângulos do Triângulo',
      pergunta: 'Um triângulo tem dois ângulos medindo 50° e 65°. Quanto mede o terceiro ângulo?',
      correta: '65°',
      errada: '75°'
    }
  ],
  '8º Ano Fundamental': [
    {
      tema: 'Sistemas de Equações Lineares',
      pergunta: 'No sistema x + y = 10 e x - y = 2, qual é o par ordenado solução (x, y)?',
      correta: '(6, 4)',
      errada: '(7, 3)'
    },
    {
      tema: 'Produtos Notáveis e Fatoração',
      pergunta: 'Qual é o desenvolvimento correto de (x + 5)²?',
      correta: 'x² + 10x + 25',
      errada: 'x² + 25'
    },
    {
      tema: 'Polígonos e Diagonais',
      pergunta: 'Qual é a soma dos ângulos internos de um pentágono convexo?',
      correta: '540°',
      errada: '360°'
    },
    {
      tema: 'Porcentagem e Descontos',
      pergunta: 'Um livro de R$ 80,00 recebeu 15% de desconto. Qual o novo preço?',
      correta: 'R$ 68,00',
      errada: 'R$ 65,00'
    }
  ],
  '9º Ano Fundamental': [
    {
      tema: 'Teorema de Pitágoras',
      pergunta: 'Em um triângulo retângulo de catetos 6 cm e 8 cm, qual é a medida da hipotenusa?',
      correta: '10 cm',
      errada: '14 cm'
    },
    {
      tema: 'Equações do 2º Grau',
      pergunta: 'Quais são as raízes reais da equação x² - 5x + 6 = 0?',
      correta: 'x = 2 e x = 3',
      errada: 'x = -2 e x = -3'
    },
    {
      tema: 'Semelhança de Triângulos',
      pergunta: 'Dois triângulos semelhantes têm razão de semelhança 2. Se um lado mede 5 cm, o correspondente mede:',
      correta: '10 cm',
      errada: '7 cm'
    },
    {
      tema: 'Relações Métricas na Circunferência',
      pergunta: 'Qual é o comprimento aproximado de uma circunferência de raio 5 cm (π ≈ 3,14)?',
      correta: '31,4 cm',
      errada: '15,7 cm'
    }
  ],
  '1º Ano Ensino Médio': [
    {
      tema: 'Função Afim (1º Grau)',
      pergunta: 'Para a função f(x) = 2x - 6, qual é o valor do zero (raiz) da função?',
      correta: 'x = 3',
      errada: 'x = -3'
    },
    {
      tema: 'Função Quadrática e Vértice',
      pergunta: 'A parábola da função f(x) = x² - 4x + 3 possui concavidade voltada para:',
      correta: 'Cima, pois a > 0',
      errada: 'Baixo, pois b < 0'
    },
    {
      tema: 'Trigonometria no Triângulo Retângulo',
      pergunta: 'Em um triângulo retângulo, a razão entre o cateto oposto e a hipotenusa define:',
      correta: 'Seno do ângulo',
      errada: 'Cosseno do ângulo'
    },
    {
      tema: 'Progressões Aritméticas',
      pergunta: 'Qual é o 5º termo da PA (3, 7, 11, ...)?',
      correta: '19',
      errada: '17'
    }
  ],
  '2º Ano Ensino Médio': [
    {
      tema: 'Ciclo Trigonométrico',
      pergunta: 'Qual é o valor exato de sen(30°) + cos(60°)?',
      correta: '1',
      errada: '√3/2'
    },
    {
      tema: 'Matrizes e Determinantes',
      pergunta: 'Qual é o determinante da matriz 2x2 [[3, 2], [1, 4]]?',
      correta: '10',
      errada: '14'
    },
    {
      tema: 'Geometria Espacial: Prismas e Cilindros',
      pergunta: 'Um cubo possui aresta de 4 cm. Qual é o seu volume total?',
      correta: '64 cm³',
      errada: '48 cm³'
    },
    {
      tema: 'Análise Combinatória',
      pergunta: 'De quantas maneiras distintas 4 alunos podem formar uma fila?',
      correta: '24 maneiras',
      errada: '16 maneiras'
    }
  ],
  '3º Ano Ensino Médio': [
    {
      tema: 'Velocidade Média e Grandezas',
      pergunta: 'Um veículo percorre 240 km em 3 horas. Qual é sua velocidade média?',
      correta: '80 km/h',
      errada: '72 km/h'
    },
    {
      tema: 'Probabilidade e Estatística',
      pergunta: 'Ao lançar um dado honesto de 6 faces, qual a probabilidade de sair número par?',
      correta: '50% (1/2)',
      errada: '33,3% (1/3)'
    },
    {
      tema: 'Geometria Analítica: Distância entre Pontos',
      pergunta: 'Qual é a distância entre os pontos A(0, 0) e B(3, 4) no plano cartesiano?',
      correta: '5 unidades',
      errada: '7 unidades'
    },
    {
      tema: 'Matemática Financeira e Juros Compostos',
      pergunta: 'Um capital de R$ 1.000,00 aplicado a 10% ao mês em juros compostos rende quanto após 2 meses?',
      correta: 'Montante de R$ 1.210,00',
      errada: 'Montante de R$ 1.200,00'
    }
  ]
};

const OFICIAL_TOPICS = [
  {
    etapa: 1,
    tema: 'Teorema de Pitágoras',
    pergunta: '[PISTA]: Identifique a afirmação INCORRETA sobre as relações entre catetos e hipotenusa no triângulo retângulo.',
    correta: 'A hipotenusa é sempre menor que a soma dos quadrados dos catetos.',
    errada: 'O quadrado da hipotenusa equivale à soma dos quadrados dos catetos.'
  },
  {
    etapa: 2,
    tema: 'Lei dos Senos',
    pergunta: '[PISTA]: Analise as proporções da Lei dos Senos em um triângulo qualquer e marque a afirmação INCORRETA.',
    correta: 'A razão entre lado e cosseno do ângulo oposto é sempre constante igual a 2R.',
    errada: 'A razão a/sen(A) = b/sen(B) = c/sen(C) é válida em qualquer triângulo.'
  },
  {
    etapa: 3,
    tema: 'Lei dos Cossenos',
    pergunta: '[PISTA]: Sobre a Lei dos Cossenos aplicada a triângulos acutângulos e obtusângulos, assinale a pista FALSA.',
    correta: 'Quando o ângulo é 90°, o termo -2bc·cos(90°) dobra o valor da hipotenusa.',
    errada: 'a² = b² + c² - 2bc·cos(A) generaliza o Teorema de Pitágoras.'
  },
  {
    etapa: 4,
    tema: 'Semelhança de Triângulos',
    pergunta: '[PISTA]: Examine os casos de semelhança (AA, LAL, LLL) e encontre a afirmação INCORRETA.',
    correta: 'Triângulos semelhantes possuem obrigatoriamente a mesma área.',
    errada: 'Triângulos semelhantes mantêm ângulos correspondentes congruentes.'
  }
];

const TREINE_TOPICS = [
  {
    tema: 'Razões Trigonométricas (Seno, Cosseno e Tangente)',
    pergunta: 'Em um triângulo retângulo de cateto oposto 3, cateto adjacente 4 e hipotenusa 5, qual é o valor de tg(θ)?',
    correta: '3/4 (0,75)',
    errada: '4/5 (0,80)'
  },
  {
    tema: 'Ângulos Notáveis (30°, 45° e 60°)',
    pergunta: 'Qual é o valor exato de cos(45°) na tabela trigonométrica de ângulos notáveis?',
    correta: '√2 / 2',
    errada: '1 / 2'
  }
];

const SEED_TEACHERS: Array<{
  id: string;
  nome: string;
  email: string;
  materia: string;
  daysAgo: number;
}> = [
  {
    id: 'seed-prof-01',
    nome: 'Profª Camila Ferreira',
    email: 'camila.ferreira@professor.educacao.sp.gov.br',
    materia: 'Matemática',
    daysAgo: 28
  },
  {
    id: 'seed-prof-02',
    nome: 'Prof. Ricardo Almeida',
    email: 'ricardo.almeida@professor.educacao.sp.gov.br',
    materia: 'Geometria',
    daysAgo: 25
  },
  {
    id: 'seed-prof-03',
    nome: 'Profª Juliana Nogueira',
    email: 'juliana.nogueira@professor.educacao.sp.gov.br',
    materia: 'Trigonometria',
    daysAgo: 22
  },
  {
    id: 'seed-prof-04',
    nome: 'Prof. Marcelo Siqueira',
    email: 'marcelo.siqueira@professor.educacao.sp.gov.br',
    materia: 'Cálculo e Álgebra',
    daysAgo: 19
  },
  {
    id: 'seed-prof-05',
    nome: 'Profª Patrícia Monteiro',
    email: 'patricia.monteiro@professor.educacao.sp.gov.br',
    materia: 'Física',
    daysAgo: 15
  },
  {
    id: 'seed-prof-06',
    nome: 'Prof. Eduardo Vasconcelos',
    email: 'eduardo.vasconcelos@professor.educacao.sp.gov.br',
    materia: 'Tecnologia e Inovação',
    daysAgo: 12
  }
];

// 51 estudantes equilibrados entre alunos (25) e alunas (26) nas 7 séries (6º EF ao 3º EM)
const SEED_STUDENTS: StudentBlueprint[] = [
  // 6º Ano Fundamental (7 estudantes: 4 alunas, 3 alunos)
  { id: 'seed-aluno-6ef-01', nome: 'Sophia Lima', serie: '6º Ano Fundamental', oficialHits4: 4, oficialSessions: 2, curriculoHits4: 4, treineHits2: 2, avgTimeSec: 24, daysAgoRegistered: 26 },
  { id: 'seed-aluno-6ef-02', nome: 'Miguel Andrade', serie: '6º Ano Fundamental', oficialHits4: 3, oficialSessions: 2, curriculoHits4: 3, treineHits2: 2, avgTimeSec: 29, daysAgoRegistered: 24 },
  { id: 'seed-aluno-6ef-03', nome: 'Helena Duarte', serie: '6º Ano Fundamental', oficialHits4: 3, oficialSessions: 2, curriculoHits4: 4, treineHits2: 1, avgTimeSec: 31, daysAgoRegistered: 22 },
  { id: 'seed-aluno-6ef-04', nome: 'Arthur Cardoso', serie: '6º Ano Fundamental', oficialHits4: 2, oficialSessions: 1, curriculoHits4: 3, treineHits2: 2, avgTimeSec: 38, daysAgoRegistered: 20 },
  { id: 'seed-aluno-6ef-05', nome: 'Laura Nascimento', serie: '6º Ano Fundamental', oficialHits4: 3, oficialSessions: 1, curriculoHits4: 3, treineHits2: 1, avgTimeSec: 34, daysAgoRegistered: 18 },
  { id: 'seed-aluno-6ef-06', nome: 'Davi Batista', serie: '6º Ano Fundamental', oficialHits4: 1, oficialSessions: 1, curriculoHits4: 2, treineHits2: 1, avgTimeSec: 46, daysAgoRegistered: 16 },
  { id: 'seed-aluno-6ef-07', nome: 'Manuela Peixoto', serie: '6º Ano Fundamental', oficialHits4: 2, oficialSessions: 2, curriculoHits4: 3, treineHits2: 2, avgTimeSec: 33, daysAgoRegistered: 14 },

  // 7º Ano Fundamental (7 estudantes: 3 alunas, 4 alunos)
  { id: 'seed-aluno-7ef-01', nome: 'Isabella Mendes', serie: '7º Ano Fundamental', oficialHits4: 4, oficialSessions: 3, curriculoHits4: 4, treineHits2: 2, avgTimeSec: 22, daysAgoRegistered: 27 },
  { id: 'seed-aluno-7ef-02', nome: 'Pedro Henrique Alves', serie: '7º Ano Fundamental', oficialHits4: 3, oficialSessions: 2, curriculoHits4: 3, treineHits2: 2, avgTimeSec: 28, daysAgoRegistered: 25 },
  { id: 'seed-aluno-7ef-03', nome: 'Alice Rodrigues', serie: '7º Ano Fundamental', oficialHits4: 3, oficialSessions: 2, curriculoHits4: 4, treineHits2: 2, avgTimeSec: 27, daysAgoRegistered: 21 },
  { id: 'seed-aluno-7ef-04', nome: 'Bernardo Teixeira', serie: '7º Ano Fundamental', oficialHits4: 2, oficialSessions: 2, curriculoHits4: 3, treineHits2: 1, avgTimeSec: 36, daysAgoRegistered: 19 },
  { id: 'seed-aluno-7ef-05', nome: 'Valentina Correia', serie: '7º Ano Fundamental', oficialHits4: 2, oficialSessions: 1, curriculoHits4: 4, treineHits2: 2, avgTimeSec: 39, daysAgoRegistered: 17 },
  { id: 'seed-aluno-7ef-06', nome: 'Heitor Rezende', serie: '7º Ano Fundamental', oficialHits4: 3, oficialSessions: 1, curriculoHits4: 2, treineHits2: 1, avgTimeSec: 32, daysAgoRegistered: 15 },
  { id: 'seed-aluno-7ef-07', nome: 'Samuel Freitas', serie: '7º Ano Fundamental', oficialHits4: 1, oficialSessions: 1, curriculoHits4: 1, treineHits2: 1, avgTimeSec: 52, daysAgoRegistered: 11 },

  // 8º Ano Fundamental (7 estudantes: 4 alunas, 3 alunos)
  { id: 'seed-aluno-8ef-01', nome: 'Thiago Almeida', serie: '8º Ano Fundamental', oficialHits4: 4, oficialSessions: 3, curriculoHits4: 4, treineHits2: 2, avgTimeSec: 23, daysAgoRegistered: 26 },
  { id: 'seed-aluno-8ef-02', nome: 'Larissa Souza', serie: '8º Ano Fundamental', oficialHits4: 4, oficialSessions: 2, curriculoHits4: 3, treineHits2: 2, avgTimeSec: 25, daysAgoRegistered: 24 },
  { id: 'seed-aluno-8ef-03', nome: 'Clara Guimarães', serie: '8º Ano Fundamental', oficialHits4: 3, oficialSessions: 2, curriculoHits4: 4, treineHits2: 2, avgTimeSec: 30, daysAgoRegistered: 22 },
  { id: 'seed-aluno-8ef-04', nome: 'Rafael Vieira', serie: '8º Ano Fundamental', oficialHits4: 3, oficialSessions: 2, curriculoHits4: 3, treineHits2: 1, avgTimeSec: 31, daysAgoRegistered: 19 },
  { id: 'seed-aluno-8ef-05', nome: 'Giovanna Martins', serie: '8º Ano Fundamental', oficialHits4: 2, oficialSessions: 2, curriculoHits4: 3, treineHits2: 2, avgTimeSec: 37, daysAgoRegistered: 16 },
  { id: 'seed-aluno-8ef-06', nome: 'Caio Nogueira', serie: '8º Ano Fundamental', oficialHits4: 2, oficialSessions: 1, curriculoHits4: 2, treineHits2: 1, avgTimeSec: 44, daysAgoRegistered: 13 },
  { id: 'seed-aluno-8ef-07', nome: 'Lívia Barros', serie: '8º Ano Fundamental', oficialHits4: 1, oficialSessions: 1, curriculoHits4: 2, treineHits2: 1, avgTimeSec: 49, daysAgoRegistered: 10 },

  // 9º Ano Fundamental (8 estudantes: 4 alunas, 4 alunos)
  { id: 'seed-aluno-9ef-01', nome: 'Gabriel Oliveira', serie: '9º Ano Fundamental', oficialHits4: 4, oficialSessions: 3, curriculoHits4: 4, treineHits2: 2, avgTimeSec: 20, daysAgoRegistered: 28 },
  { id: 'seed-aluno-9ef-02', nome: 'Beatriz Santos', serie: '9º Ano Fundamental', oficialHits4: 4, oficialSessions: 3, curriculoHits4: 4, treineHits2: 2, avgTimeSec: 23, daysAgoRegistered: 26 },
  { id: 'seed-aluno-9ef-03', nome: 'Matheus Rocha', serie: '9º Ano Fundamental', oficialHits4: 3, oficialSessions: 2, curriculoHits4: 3, treineHits2: 2, avgTimeSec: 27, daysAgoRegistered: 23 },
  { id: 'seed-aluno-9ef-04', nome: 'Amanda Silveira', serie: '9º Ano Fundamental', oficialHits4: 3, oficialSessions: 2, curriculoHits4: 4, treineHits2: 2, avgTimeSec: 29, daysAgoRegistered: 21 },
  { id: 'seed-aluno-9ef-05', nome: 'Gustavo Pereira', serie: '9º Ano Fundamental', oficialHits4: 2, oficialSessions: 2, curriculoHits4: 3, treineHits2: 1, avgTimeSec: 35, daysAgoRegistered: 18 },
  { id: 'seed-aluno-9ef-06', nome: 'Yasmin Ribeiro', serie: '9º Ano Fundamental', oficialHits4: 3, oficialSessions: 1, curriculoHits4: 3, treineHits2: 2, avgTimeSec: 32, daysAgoRegistered: 15 },
  { id: 'seed-aluno-9ef-07', nome: 'Leonardo Campos', serie: '9º Ano Fundamental', oficialHits4: 2, oficialSessions: 1, curriculoHits4: 2, treineHits2: 1, avgTimeSec: 43, daysAgoRegistered: 12 },
  { id: 'seed-aluno-9ef-08', nome: 'Nicole Azevedo', serie: '9º Ano Fundamental', oficialHits4: 1, oficialSessions: 1, curriculoHits4: 1, treineHits2: 1, avgTimeSec: 54, daysAgoRegistered: 9 },

  // 1º Ano Ensino Médio (7 estudantes: 4 alunas, 3 alunos)
  { id: 'seed-aluno-1em-01', nome: 'Lucas Silva', serie: '1º Ano Ensino Médio', oficialHits4: 4, oficialSessions: 3, curriculoHits4: 4, treineHits2: 2, avgTimeSec: 21, daysAgoRegistered: 27 },
  { id: 'seed-aluno-1em-02', nome: 'Mariana Costa', serie: '1º Ano Ensino Médio', oficialHits4: 4, oficialSessions: 2, curriculoHits4: 4, treineHits2: 2, avgTimeSec: 24, daysAgoRegistered: 25 },
  { id: 'seed-aluno-1em-03', nome: 'Henrique Moreira', serie: '1º Ano Ensino Médio', oficialHits4: 3, oficialSessions: 2, curriculoHits4: 3, treineHits2: 2, avgTimeSec: 29, daysAgoRegistered: 21 },
  { id: 'seed-aluno-1em-04', nome: 'Bianca Cavalcante', serie: '1º Ano Ensino Médio', oficialHits4: 3, oficialSessions: 2, curriculoHits4: 4, treineHits2: 1, avgTimeSec: 31, daysAgoRegistered: 19 },
  { id: 'seed-aluno-1em-05', nome: 'Felipe Duarte', serie: '1º Ano Ensino Médio', oficialHits4: 2, oficialSessions: 2, curriculoHits4: 2, treineHits2: 1, avgTimeSec: 40, daysAgoRegistered: 16 },
  { id: 'seed-aluno-1em-06', nome: 'Fernanda Lopes', serie: '1º Ano Ensino Médio', oficialHits4: 2, oficialSessions: 1, curriculoHits4: 3, treineHits2: 2, avgTimeSec: 36, daysAgoRegistered: 13 },
  { id: 'seed-aluno-1em-07', nome: 'Rafaela Tavares', serie: '1º Ano Ensino Médio', oficialHits4: 1, oficialSessions: 1, curriculoHits4: 2, treineHits2: 1, avgTimeSec: 48, daysAgoRegistered: 8 },

  // 2º Ano Ensino Médio (7 estudantes: 3 alunas, 4 alunos)
  { id: 'seed-aluno-2em-01', nome: 'Letícia Lima', serie: '2º Ano Ensino Médio', oficialHits4: 4, oficialSessions: 3, curriculoHits4: 4, treineHits2: 2, avgTimeSec: 19, daysAgoRegistered: 29 },
  { id: 'seed-aluno-2em-02', nome: 'Vinícius Carvalho', serie: '2º Ano Ensino Médio', oficialHits4: 4, oficialSessions: 3, curriculoHits4: 3, treineHits2: 2, avgTimeSec: 22, daysAgoRegistered: 26 },
  { id: 'seed-aluno-2em-03', nome: 'Gabriela Moura', serie: '2º Ano Ensino Médio', oficialHits4: 3, oficialSessions: 2, curriculoHits4: 4, treineHits2: 2, avgTimeSec: 26, daysAgoRegistered: 23 },
  { id: 'seed-aluno-2em-04', nome: 'Bruno Castro', serie: '2º Ano Ensino Médio', oficialHits4: 3, oficialSessions: 2, curriculoHits4: 3, treineHits2: 2, avgTimeSec: 30, daysAgoRegistered: 20 },
  { id: 'seed-aluno-2em-05', nome: 'Natália Farias', serie: '2º Ano Ensino Médio', oficialHits4: 2, oficialSessions: 2, curriculoHits4: 4, treineHits2: 1, avgTimeSec: 35, daysAgoRegistered: 17 },
  { id: 'seed-aluno-2em-06', nome: 'Murilo Santana', serie: '2º Ano Ensino Médio', oficialHits4: 2, oficialSessions: 1, curriculoHits4: 2, treineHits2: 1, avgTimeSec: 42, daysAgoRegistered: 14 },
  { id: 'seed-aluno-2em-07', nome: 'Igor Mendonça', serie: '2º Ano Ensino Médio', oficialHits4: 1, oficialSessions: 1, curriculoHits4: 1, treineHits2: 1, avgTimeSec: 51, daysAgoRegistered: 10 },

  // 3º Ano Ensino Médio (8 estudantes: 4 alunas, 4 alunos)
  { id: 'seed-aluno-3em-01', nome: 'Camila Rocha', serie: '3º Ano Ensino Médio', oficialHits4: 4, oficialSessions: 3, curriculoHits4: 4, treineHits2: 2, avgTimeSec: 18, daysAgoRegistered: 30 },
  { id: 'seed-aluno-3em-02', nome: 'João Victor Gomes', serie: '3º Ano Ensino Médio', oficialHits4: 4, oficialSessions: 3, curriculoHits4: 4, treineHits2: 2, avgTimeSec: 21, daysAgoRegistered: 27 },
  { id: 'seed-aluno-3em-03', nome: 'Júlia Barbosa', serie: '3º Ano Ensino Médio', oficialHits4: 3, oficialSessions: 3, curriculoHits4: 4, treineHits2: 2, avgTimeSec: 24, daysAgoRegistered: 24 },
  { id: 'seed-aluno-3em-04', nome: 'Daniel Machado', serie: '3º Ano Ensino Médio', oficialHits4: 3, oficialSessions: 2, curriculoHits4: 3, treineHits2: 2, avgTimeSec: 28, daysAgoRegistered: 21 },
  { id: 'seed-aluno-3em-05', nome: 'Carolina Dias', serie: '3º Ano Ensino Médio', oficialHits4: 3, oficialSessions: 2, curriculoHits4: 3, treineHits2: 1, avgTimeSec: 30, daysAgoRegistered: 18 },
  { id: 'seed-aluno-3em-06', nome: 'Enzo Ferreira', serie: '3º Ano Ensino Médio', oficialHits4: 2, oficialSessions: 2, curriculoHits4: 3, treineHits2: 2, avgTimeSec: 36, daysAgoRegistered: 15 },
  { id: 'seed-aluno-3em-07', nome: 'Ana Clara Borges', serie: '3º Ano Ensino Médio', oficialHits4: 2, oficialSessions: 1, curriculoHits4: 2, treineHits2: 1, avgTimeSec: 41, daysAgoRegistered: 12 },
  { id: 'seed-aluno-3em-08', nome: 'Kauã Teixeira', serie: '3º Ano Ensino Médio', oficialHits4: 1, oficialSessions: 1, curriculoHits4: 2, treineHits2: 1, avgTimeSec: 47, daysAgoRegistered: 7 }
];

function slugifyEmailPart(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .join('.');
}

function formatPastDate(daysAgo: number): string {
  const date = new Date(Date.now() - daysAgo * 86400000);
  return date.toLocaleDateString('pt-BR');
}

export function buildCommunitySeedDataset(): CommunitySeedDataset {
  const users: User[] = [];
  const results: SessionResult[] = [];
  const attempts: QuestionAttempt[] = [];
  const now = Date.now();

  // 1. 6 Professores
  SEED_TEACHERS.forEach((prof) => {
    users.push({
      id: prof.id,
      nome: prof.nome,
      tipo: 'professor',
      email: prof.email,
      senha: 'prof2026',
      serie: 'Corpo Docente',
      materia: prof.materia,
      dataCadastro: formatPastDate(prof.daysAgo)
    });
  });

  // 2. 51 Alunos e Alunas + Resultados nos 3 desafios + Tentativas detalhadas
  SEED_STUDENTS.forEach((student, sIdx) => {
    const email = `${slugifyEmailPart(student.nome)}@aluno.educacao.sp.gov.br`;

    users.push({
      id: student.id,
      nome: student.nome,
      tipo: 'aluno',
      email,
      senha: '1234',
      serie: student.serie,
      dataCadastro: formatPastDate(student.daysAgoRegistered)
    });

    const etapaLabels = [
      'Etapa 1: Teorema de Pitágoras',
      'Etapa 2: Lei dos Senos',
      'Etapa 3: Lei dos Cossenos',
      'Etapa 4: Semelhança de Triângulos'
    ];

    // 2a. Resultados do Desafio Oficial (1 a 3 rodadas por aluno para Ranking realista)
    for (let r = 0; r < student.oficialSessions; r++) {
      const questoesPorRodada = 8;
      // Variação natural entre rodadas baseada no perfil do estudante
      const baseRatio = student.oficialHits4 / 4;
      const rawAcertos = Math.round(baseRatio * questoesPorRodada) - (r % 2 === 1 && baseRatio < 1 ? 1 : 0);
      const acertos = Math.max(2, Math.min(questoesPorRodada, rawAcertos));
      const erros = questoesPorRodada - acertos;
      const tempoMedio = Math.max(14, student.avgTimeSec + ((r + sIdx) % 5) - 2);
      const daysAgo = Math.max(1, student.daysAgoRegistered - 2 - r * 3);

      results.push({
        id: `seed-res-of-${student.id}-${r + 1}`,
        usuarioId: student.id,
        alunoNome: student.nome,
        serie: student.serie,
        modo: 'oficial',
        etapaNome: etapaLabels[(sIdx + r) % etapaLabels.length],
        acertos,
        erros,
        tempoTotalSegundos: tempoMedio * questoesPorRodada,
        tempoMedioPorQuestao: tempoMedio,
        data: formatPastDate(daysAgo),
        timestamp: now - daysAgo * 86400000 - r * 3600000
      });
    }

    // 2b. Resultado do Currículo em Ação
    const curTotal = 10;
    const curAcertos = Math.max(3, Math.min(curTotal, Math.round((student.curriculoHits4 / 4) * curTotal)));
    const curErros = curTotal - curAcertos;
    const curTempoMedio = student.avgTimeSec + 4;
    const curDaysAgo = Math.max(1, student.daysAgoRegistered - 3);
    results.push({
      id: `seed-res-cur-${student.id}`,
      usuarioId: student.id,
      alunoNome: student.nome,
      serie: student.serie,
      modo: 'curriculo_acao',
      etapaNome: `Currículo em Ação — ${student.serie}`,
      acertos: curAcertos,
      erros: curErros,
      tempoTotalSegundos: curTempoMedio * curTotal,
      tempoMedioPorQuestao: curTempoMedio,
      data: formatPastDate(curDaysAgo),
      timestamp: now - curDaysAgo * 86400000 - 7200000
    });

    // 2c. Resultado do Treine Mais
    const treineNiveis = ['Iniciante', 'Intermediário', 'Avançado'];
    const treineNivel = treineNiveis[sIdx % 3];
    const treineTotal = 6;
    const treineAcertos = student.treineHits2 === 2 ? 5 + (sIdx % 2) : 3 + (sIdx % 2);
    const treineErros = treineTotal - treineAcertos;
    const treineTempoMedio = student.avgTimeSec + 6;
    const treineDaysAgo = Math.max(1, student.daysAgoRegistered - 4);
    results.push({
      id: `seed-res-tr-${student.id}`,
      usuarioId: student.id,
      alunoNome: student.nome,
      serie: student.serie,
      modo: 'treine_mais',
      etapaNome: `Treine Mais — Nível ${treineNivel}`,
      acertos: treineAcertos,
      erros: treineErros,
      tempoTotalSegundos: treineTempoMedio * treineTotal,
      tempoMedioPorQuestao: treineTempoMedio,
      data: formatPastDate(treineDaysAgo),
      timestamp: now - treineDaysAgo * 86400000 - 10800000
    });

    // 2d. 4 Tentativas detalhadas do Desafio Oficial (Etapas 1 a 4)
    OFICIAL_TOPICS.forEach((topic, tIdx) => {
      // Rotaciona qual etapa o aluno erra para enriquecer o gráfico de erros por tema
      const shiftedOrder = (tIdx + sIdx) % 4;
      const acertou = shiftedOrder < student.oficialHits4;
      const tempo = Math.max(12, student.avgTimeSec + (tIdx * 3) - 4);
      const attDaysAgo = Math.max(1, student.daysAgoRegistered - 2);
      attempts.push({
        id: `seed-att-of-${student.id}-${tIdx + 1}`,
        usuarioId: student.id,
        alunoNome: student.nome,
        serie: student.serie,
        modo: 'oficial',
        etapaNumero: topic.etapa,
        temaNome: topic.tema,
        pergunta: topic.pergunta,
        respostaSelecionada: acertou ? topic.correta : topic.errada,
        respostaCorreta: topic.correta,
        acertou,
        tempoGastoSegundos: tempo,
        data: formatPastDate(attDaysAgo),
        timestamp: now - attDaysAgo * 86400000 - tIdx * 600000
      });
    });

    // 2e. 4 Tentativas detalhadas do Currículo em Ação (temas da série exata do aluno)
    const gradeTopics =
      GRADE_CURRICULO_TOPICS[student.serie] || GRADE_CURRICULO_TOPICS['9º Ano Fundamental'];
    gradeTopics.forEach((topic, tIdx) => {
      const shiftedOrder = (tIdx + sIdx) % 4;
      const acertou = shiftedOrder < student.curriculoHits4;
      const tempo = Math.max(15, student.avgTimeSec + 4 + (tIdx * 2));
      const attDaysAgo = Math.max(1, student.daysAgoRegistered - 3);
      attempts.push({
        id: `seed-att-cur-${student.id}-${tIdx + 1}`,
        usuarioId: student.id,
        alunoNome: student.nome,
        serie: student.serie,
        modo: 'curriculo_acao',
        etapaNumero: tIdx + 1,
        temaNome: topic.tema,
        pergunta: topic.pergunta,
        respostaSelecionada: acertou ? topic.correta : topic.errada,
        respostaCorreta: topic.correta,
        acertou,
        tempoGastoSegundos: tempo,
        data: formatPastDate(attDaysAgo),
        timestamp: now - attDaysAgo * 86400000 - (tIdx + 5) * 600000
      });
    });

    // 2f. 2 Tentativas detalhadas do Treine Mais
    TREINE_TOPICS.forEach((topic, tIdx) => {
      const acertou = tIdx < student.treineHits2;
      const tempo = Math.max(16, student.avgTimeSec + 6 + tIdx * 4);
      const attDaysAgo = Math.max(1, student.daysAgoRegistered - 4);
      attempts.push({
        id: `seed-att-tr-${student.id}-${tIdx + 1}`,
        usuarioId: student.id,
        alunoNome: student.nome,
        serie: student.serie,
        modo: 'treine_mais',
        etapaNumero: tIdx + 1,
        temaNome: topic.tema,
        pergunta: topic.pergunta,
        respostaSelecionada: acertou ? topic.correta : topic.errada,
        respostaCorreta: topic.correta,
        acertou,
        tempoGastoSegundos: tempo,
        data: formatPastDate(attDaysAgo),
        timestamp: now - attDaysAgo * 86400000 - (tIdx + 10) * 600000
      });
    });
  });

  return { users, results, attempts };
}

// =============================================================================
// EXPANSÃO 3º ANO ENSINO MÉDIO: +35 ESTUDANTES (18 ALUNAS + 17 ALUNOS)
// CADASTRADOS NO 2º BIMESTRE DESTE ANO (MAIO E JUNHO)
// =============================================================================
interface Expansion3EmBlueprint {
  id: string;
  nome: string;
  regMonth: number; // 5 (Maio) ou 6 (Junho) -> 2º Bimestre
  regDay: number;
  oficialHits4: number;
  oficialSessions: number;
  curriculoHits4: number;
  treineHits2: number;
  avgTimeSec: number;
}

const SEED_3EM_EXPANSION_STUDENTS: Expansion3EmBlueprint[] = [
  // 18 Alunas do 3º Ano Ensino Médio (cadastradas em Maio e Junho — 2º Bimestre)
  { id: 'seed-aluno-3em-09', nome: 'Isadora Vasconcelos', regMonth: 5, regDay: 4, oficialHits4: 4, oficialSessions: 3, curriculoHits4: 4, treineHits2: 2, avgTimeSec: 19 },
  { id: 'seed-aluno-3em-10', nome: 'Vitória Albuquerque', regMonth: 5, regDay: 5, oficialHits4: 4, oficialSessions: 3, curriculoHits4: 4, treineHits2: 2, avgTimeSec: 22 },
  { id: 'seed-aluno-3em-11', nome: 'Luana Figueiredo', regMonth: 5, regDay: 7, oficialHits4: 3, oficialSessions: 3, curriculoHits4: 4, treineHits2: 2, avgTimeSec: 25 },
  { id: 'seed-aluno-3em-12', nome: 'Marina Queiroz', regMonth: 5, regDay: 8, oficialHits4: 3, oficialSessions: 2, curriculoHits4: 3, treineHits2: 2, avgTimeSec: 27 },
  { id: 'seed-aluno-3em-13', nome: 'Rebeca Melo', regMonth: 5, regDay: 11, oficialHits4: 4, oficialSessions: 2, curriculoHits4: 3, treineHits2: 2, avgTimeSec: 24 },
  { id: 'seed-aluno-3em-14', nome: 'Raquel Sampaio', regMonth: 5, regDay: 12, oficialHits4: 3, oficialSessions: 2, curriculoHits4: 4, treineHits2: 1, avgTimeSec: 29 },
  { id: 'seed-aluno-3em-15', nome: 'Milena Fonseca', regMonth: 5, regDay: 14, oficialHits4: 2, oficialSessions: 2, curriculoHits4: 3, treineHits2: 2, avgTimeSec: 34 },
  { id: 'seed-aluno-3em-16', nome: 'Eduarda Pacheco', regMonth: 5, regDay: 15, oficialHits4: 3, oficialSessions: 2, curriculoHits4: 3, treineHits2: 2, avgTimeSec: 28 },
  { id: 'seed-aluno-3em-17', nome: 'Bárbara Monteiro', regMonth: 5, regDay: 18, oficialHits4: 2, oficialSessions: 2, curriculoHits4: 4, treineHits2: 1, avgTimeSec: 36 },
  { id: 'seed-aluno-3em-18', nome: 'Lorena Magalhães', regMonth: 5, regDay: 20, oficialHits4: 4, oficialSessions: 3, curriculoHits4: 4, treineHits2: 2, avgTimeSec: 20 },
  { id: 'seed-aluno-3em-19', nome: 'Melissa Rangel', regMonth: 5, regDay: 22, oficialHits4: 3, oficialSessions: 2, curriculoHits4: 2, treineHits2: 1, avgTimeSec: 32 },
  { id: 'seed-aluno-3em-20', nome: 'Estela Cordeiro', regMonth: 5, regDay: 25, oficialHits4: 2, oficialSessions: 1, curriculoHits4: 3, treineHits2: 2, avgTimeSec: 38 },
  { id: 'seed-aluno-3em-21', nome: 'Aline Barreto', regMonth: 5, regDay: 28, oficialHits4: 3, oficialSessions: 2, curriculoHits4: 3, treineHits2: 2, avgTimeSec: 30 },
  { id: 'seed-aluno-3em-22', nome: 'Débora Guedes', regMonth: 6, regDay: 2, oficialHits4: 1, oficialSessions: 1, curriculoHits4: 2, treineHits2: 1, avgTimeSec: 47 },
  { id: 'seed-aluno-3em-23', nome: 'Talita Bastos', regMonth: 6, regDay: 5, oficialHits4: 3, oficialSessions: 2, curriculoHits4: 4, treineHits2: 2, avgTimeSec: 26 },
  { id: 'seed-aluno-3em-24', nome: 'Mirella Paiva', regMonth: 6, regDay: 10, oficialHits4: 2, oficialSessions: 2, curriculoHits4: 3, treineHits2: 1, avgTimeSec: 35 },
  { id: 'seed-aluno-3em-25', nome: 'Heloísa Cunha', regMonth: 6, regDay: 16, oficialHits4: 4, oficialSessions: 2, curriculoHits4: 4, treineHits2: 2, avgTimeSec: 23 },
  { id: 'seed-aluno-3em-26', nome: 'Cecília Prado', regMonth: 6, regDay: 23, oficialHits4: 2, oficialSessions: 1, curriculoHits4: 2, treineHits2: 1, avgTimeSec: 42 },

  // 17 Alunos do 3º Ano Ensino Médio (cadastrados em Maio e Junho — 2º Bimestre)
  { id: 'seed-aluno-3em-27', nome: 'Rodrigo Amaral', regMonth: 5, regDay: 4, oficialHits4: 4, oficialSessions: 3, curriculoHits4: 4, treineHits2: 2, avgTimeSec: 18 },
  { id: 'seed-aluno-3em-28', nome: 'Vitor Hugo Lemos', regMonth: 5, regDay: 6, oficialHits4: 3, oficialSessions: 3, curriculoHits4: 4, treineHits2: 2, avgTimeSec: 24 },
  { id: 'seed-aluno-3em-29', nome: 'Guilherme Macedo', regMonth: 5, regDay: 8, oficialHits4: 4, oficialSessions: 2, curriculoHits4: 3, treineHits2: 2, avgTimeSec: 23 },
  { id: 'seed-aluno-3em-30', nome: 'Diego Siqueira', regMonth: 5, regDay: 11, oficialHits4: 3, oficialSessions: 2, curriculoHits4: 3, treineHits2: 2, avgTimeSec: 28 },
  { id: 'seed-aluno-3em-31', nome: 'Eduardo Brito', regMonth: 5, regDay: 13, oficialHits4: 2, oficialSessions: 2, curriculoHits4: 3, treineHits2: 1, avgTimeSec: 35 },
  { id: 'seed-aluno-3em-32', nome: 'André Luis Neves', regMonth: 5, regDay: 15, oficialHits4: 3, oficialSessions: 2, curriculoHits4: 4, treineHits2: 2, avgTimeSec: 27 },
  { id: 'seed-aluno-3em-33', nome: 'Caíque Moraes', regMonth: 5, regDay: 19, oficialHits4: 2, oficialSessions: 2, curriculoHits4: 2, treineHits2: 1, avgTimeSec: 41 },
  { id: 'seed-aluno-3em-34', nome: 'Renan Tavares', regMonth: 5, regDay: 21, oficialHits4: 3, oficialSessions: 3, curriculoHits4: 3, treineHits2: 2, avgTimeSec: 26 },
  { id: 'seed-aluno-3em-35', nome: 'Otávio Braga', regMonth: 5, regDay: 25, oficialHits4: 4, oficialSessions: 2, curriculoHits4: 4, treineHits2: 2, avgTimeSec: 21 },
  { id: 'seed-aluno-3em-36', nome: 'Luan Aguiar', regMonth: 5, regDay: 27, oficialHits4: 2, oficialSessions: 1, curriculoHits4: 3, treineHits2: 1, avgTimeSec: 39 },
  { id: 'seed-aluno-3em-37', nome: 'Paulo Sérgio Lima', regMonth: 6, regDay: 1, oficialHits4: 3, oficialSessions: 2, curriculoHits4: 3, treineHits2: 2, avgTimeSec: 31 },
  { id: 'seed-aluno-3em-38', nome: 'Yuri Bezerra', regMonth: 6, regDay: 4, oficialHits4: 1, oficialSessions: 1, curriculoHits4: 2, treineHits2: 1, avgTimeSec: 49 },
  { id: 'seed-aluno-3em-39', nome: 'Breno Pinheiro', regMonth: 6, regDay: 9, oficialHits4: 3, oficialSessions: 2, curriculoHits4: 4, treineHits2: 2, avgTimeSec: 29 },
  { id: 'seed-aluno-3em-40', nome: 'Danilo Coelho', regMonth: 6, regDay: 12, oficialHits4: 2, oficialSessions: 2, curriculoHits4: 3, treineHits2: 2, avgTimeSec: 34 },
  { id: 'seed-aluno-3em-41', nome: 'Fábio Meireles', regMonth: 6, regDay: 17, oficialHits4: 3, oficialSessions: 2, curriculoHits4: 3, treineHits2: 1, avgTimeSec: 30 },
  { id: 'seed-aluno-3em-42', nome: 'César Augusto Mota', regMonth: 6, regDay: 22, oficialHits4: 2, oficialSessions: 1, curriculoHits4: 1, treineHits2: 1, avgTimeSec: 48 },
  { id: 'seed-aluno-3em-43', nome: 'Erickson Ramos', regMonth: 6, regDay: 26, oficialHits4: 3, oficialSessions: 2, curriculoHits4: 4, treineHits2: 2, avgTimeSec: 27 }
];

function formatDateBr(date: Date): string {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export function build3EmExpansionDataset(): CommunitySeedDataset {
  const users: User[] = [];
  const results: SessionResult[] = [];
  const attempts: QuestionAttempt[] = [];
  const currentYear = new Date().getFullYear();
  const serie = '3º Ano Ensino Médio';
  const gradeTopics = GRADE_CURRICULO_TOPICS[serie];

  const etapaLabels = [
    'Etapa 1: Teorema de Pitágoras',
    'Etapa 2: Lei dos Senos',
    'Etapa 3: Lei dos Cossenos',
    'Etapa 4: Semelhança de Triângulos'
  ];

  SEED_3EM_EXPANSION_STUDENTS.forEach((student, idx) => {
    const regDate = new Date(currentYear, student.regMonth - 1, student.regDay, 9, 30);
    const email = `${slugifyEmailPart(student.nome)}@aluno.educacao.sp.gov.br`;

    users.push({
      id: student.id,
      nome: student.nome,
      tipo: 'aluno',
      email,
      senha: '1234',
      serie,
      dataCadastro: formatDateBr(regDate)
    });

    // Atividades distribuídas a partir do 2º bimestre até os bimestres seguintes
    // 1. Resultados do Desafio Oficial (1 a 3 rodadas)
    for (let r = 0; r < student.oficialSessions; r++) {
      const questoesPorRodada = 8;
      const baseRatio = student.oficialHits4 / 4;
      const rawAcertos =
        Math.round(baseRatio * questoesPorRodada) - (r % 2 === 1 && baseRatio < 1 ? 1 : 0);
      const acertos = Math.max(2, Math.min(questoesPorRodada, rawAcertos));
      const erros = questoesPorRodada - acertos;
      const tempoMedio = Math.max(14, student.avgTimeSec + ((r + idx) % 5) - 2);
      const sessionDate = new Date(regDate.getTime() + (7 + r * 35) * 86400000);

      results.push({
        id: `seed-res-of-${student.id}-${r + 1}`,
        usuarioId: student.id,
        alunoNome: student.nome,
        serie,
        modo: 'oficial',
        etapaNome: etapaLabels[(idx + r) % etapaLabels.length],
        acertos,
        erros,
        tempoTotalSegundos: tempoMedio * questoesPorRodada,
        tempoMedioPorQuestao: tempoMedio,
        data: formatDateBr(sessionDate),
        timestamp: sessionDate.getTime()
      });
    }

    // 2. Resultado do Currículo em Ação (3º EM)
    const curTotal = 10;
    const curAcertos = Math.max(3, Math.min(curTotal, Math.round((student.curriculoHits4 / 4) * curTotal)));
    const curErros = curTotal - curAcertos;
    const curTempoMedio = student.avgTimeSec + 4;
    const curDate = new Date(regDate.getTime() + (21 + (idx % 12)) * 86400000);
    results.push({
      id: `seed-res-cur-${student.id}`,
      usuarioId: student.id,
      alunoNome: student.nome,
      serie,
      modo: 'curriculo_acao',
      etapaNome: `Currículo em Ação — ${serie}`,
      acertos: curAcertos,
      erros: curErros,
      tempoTotalSegundos: curTempoMedio * curTotal,
      tempoMedioPorQuestao: curTempoMedio,
      data: formatDateBr(curDate),
      timestamp: curDate.getTime()
    });

    // 3. Resultado do Treine Mais
    const treineNiveis = ['Iniciante', 'Intermediário', 'Avançado'];
    const treineNivel = treineNiveis[idx % 3];
    const treineTotal = 6;
    const treineAcertos = student.treineHits2 === 2 ? 5 + (idx % 2) : 3 + (idx % 2);
    const treineErros = treineTotal - treineAcertos;
    const treineTempoMedio = student.avgTimeSec + 6;
    const treineDate = new Date(regDate.getTime() + (14 + (idx % 10)) * 86400000);
    results.push({
      id: `seed-res-tr-${student.id}`,
      usuarioId: student.id,
      alunoNome: student.nome,
      serie,
      modo: 'treine_mais',
      etapaNome: `Treine Mais — Nível ${treineNivel}`,
      acertos: treineAcertos,
      erros: treineErros,
      tempoTotalSegundos: treineTempoMedio * treineTotal,
      tempoMedioPorQuestao: treineTempoMedio,
      data: formatDateBr(treineDate),
      timestamp: treineDate.getTime()
    });

    // 4. 4 Tentativas detalhadas do Desafio Oficial
    OFICIAL_TOPICS.forEach((topic, tIdx) => {
      const shiftedOrder = (tIdx + idx) % 4;
      const acertou = shiftedOrder < student.oficialHits4;
      const tempo = Math.max(12, student.avgTimeSec + tIdx * 3 - 4);
      const attDate = new Date(regDate.getTime() + (10 + tIdx * 18) * 86400000);
      attempts.push({
        id: `seed-att-of-${student.id}-${tIdx + 1}`,
        usuarioId: student.id,
        alunoNome: student.nome,
        serie,
        modo: 'oficial',
        etapaNumero: topic.etapa,
        temaNome: topic.tema,
        pergunta: topic.pergunta,
        respostaSelecionada: acertou ? topic.correta : topic.errada,
        respostaCorreta: topic.correta,
        acertou,
        tempoGastoSegundos: tempo,
        data: formatDateBr(attDate),
        timestamp: attDate.getTime()
      });
    });

    // 5. 4 Tentativas detalhadas do Currículo em Ação (3º EM)
    gradeTopics.forEach((topic, tIdx) => {
      const shiftedOrder = (tIdx + idx) % 4;
      const acertou = shiftedOrder < student.curriculoHits4;
      const tempo = Math.max(15, student.avgTimeSec + 4 + tIdx * 2);
      const attDate = new Date(regDate.getTime() + (18 + tIdx * 16) * 86400000);
      attempts.push({
        id: `seed-att-cur-${student.id}-${tIdx + 1}`,
        usuarioId: student.id,
        alunoNome: student.nome,
        serie,
        modo: 'curriculo_acao',
        etapaNumero: tIdx + 1,
        temaNome: topic.tema,
        pergunta: topic.pergunta,
        respostaSelecionada: acertou ? topic.correta : topic.errada,
        respostaCorreta: topic.correta,
        acertou,
        tempoGastoSegundos: tempo,
        data: formatDateBr(attDate),
        timestamp: attDate.getTime()
      });
    });

    // 6. 2 Tentativas detalhadas do Treine Mais
    TREINE_TOPICS.forEach((topic, tIdx) => {
      const acertou = tIdx < student.treineHits2;
      const tempo = Math.max(16, student.avgTimeSec + 6 + tIdx * 4);
      const attDate = new Date(regDate.getTime() + (12 + tIdx * 20) * 86400000);
      attempts.push({
        id: `seed-att-tr-${student.id}-${tIdx + 1}`,
        usuarioId: student.id,
        alunoNome: student.nome,
        serie,
        modo: 'treine_mais',
        etapaNumero: tIdx + 1,
        temaNome: topic.tema,
        pergunta: topic.pergunta,
        respostaSelecionada: acertou ? topic.correta : topic.errada,
        respostaCorreta: topic.correta,
        acertou,
        tempoGastoSegundos: tempo,
        data: formatDateBr(attDate),
        timestamp: attDate.getTime()
      });
    });
  });

  return { users, results, attempts };
}
