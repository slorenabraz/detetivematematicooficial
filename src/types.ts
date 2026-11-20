export type UserType = 'aluno' | 'professor' | 'admin';

export type QuestionModule = 'oficial' | 'treine_mais' | 'curriculo_acao';

export type QuestionOverrideStatus = 'custom' | 'edited' | 'deleted';

export interface QuestionOverride {
  id: string;
  modulo: QuestionModule;
  status: QuestionOverrideStatus;
  etapa?: number;
  nivel?: 'iniciante' | 'intermediario' | 'avancado';
  serie?: string;
  aulaNumero?: number;
  aulaTitulo?: string;
  temaKey?: string;
  temaNome?: string;
  pergunta?: string;
  opcoes?: string[];
  correta?: number;
  porque?: string;
  dicaInvestigacao?: string;
  svgType?: string;
  invertida?: boolean;
  habilidade?: string;
  updatedAt: number;
}

export interface User {
  id: string;
  nome: string;
  tipo: UserType;
  email: string;
  senha: string;
  serie: string; // e.g. "9º Ano Fundamental", "1º Ano Ensino Médio", etc.
  materia?: string; // Disciplina que o professor ministra (e.g. "Matemática", "Geometria", etc.)
  dataCadastro: string;
}

export const DISCIPLINAS_ESCOLARES = [
  'Matemática',
  'Geometria',
  'Trigonometria',
  'Matemática e Geometria',
  'Cálculo e Álgebra',
  'Física',
  'Química',
  'Ciências',
  'Ciências da Natureza',
  'Biologia',
  'Língua Portuguesa',
  'Literatura',
  'Redação',
  'Língua Inglesa (Inglês)',
  'Língua Espanhola (Espanhol)',
  'Arte / Artes Visuais',
  'Educação Física',
  'História',
  'Geografia',
  'Filosofia',
  'Sociologia',
  'Projeto de Vida',
  'Tecnologia e Inovação',
  'Robótica',
  'Eletivas / Itinerários Formativos'
];

export type ThemeType = 
  | 'pitagoras'
  | 'senos'
  | 'cossenos'
  | 'semelhanca'
  | 'trig_iniciante'
  | 'trig_intermediario'
  | 'trig_avancado';

export interface CurriculoActivity {
  id: string;
  numero: number;
  titulo: string; // Ex: "Atividade 1", "Atividade 2 (ENEM)"
  pergunta: string;
  opcoes: string[];
  correta: number;
  porque: string;
  dica1?: string;
  dica2?: string;
}

export interface Question {
  id: string;
  etapa?: number; // 1 to 4 for Desafios Oficiais
  nivel?: 'iniciante' | 'intermediario' | 'avancado'; // for Treine Mais
  serie?: string; // for Curriculo em Acao (e.g., '6º Ano Fundamental')
  aulaNumero?: number; // for Curriculo em Acao (e.g., Aula 1, 2, ...)
  aulaTitulo?: string; // Lesson title (e.g., 'EXPLORANDO O CÁLCULO DE VELOCIDADE MÉDIA')
  resumoAula?: string; // Lesson theoretical summary and formulas
  formulaDestaque?: string; // Featured key formula on the pedagogical chalkboard
  apresentacaoTema?: string; // Breve apresentação pedagógica do tema da aula
  habilidade?: string; // e.g., 'EM13MAT101'
  temaKey: ThemeType | string;
  temaNome: string;
  pergunta: string;
  opcoes: string[];
  correta: number; // Index of the correct option
  porque?: string;
  svgType?: string;
  invertida?: boolean;
  dicaInvestigacao?: string; // Dica pedagógica e conceito geométrico
  atividades?: CurriculoActivity[]; // Atividades oficiais adicionais da aula para navegação
}

export interface QuestionAttempt {
  id: string;
  usuarioId: string;
  alunoNome: string;
  serie: string;
  modo: 'oficial' | 'treine_mais' | 'curriculo_acao';
  etapaNumero?: number;
  temaNome: string;
  pergunta: string;
  respostaSelecionada: string;
  respostaCorreta: string;
  acertou: boolean;
  tempoGastoSegundos: number; // Time student stayed on this question
  data: string;
  timestamp: number;
}

export interface SessionResult {
  id: string;
  usuarioId: string;
  alunoNome: string;
  serie: string;
  modo: 'oficial' | 'treine_mais' | 'curriculo_acao';
  etapaNome: string;
  acertos: number;
  erros: number;
  tempoTotalSegundos: number;
  tempoMedioPorQuestao: number;
  data: string;
  timestamp: number;
}

export interface TeacherThemeStats {
  temaNome: string;
  totalRespostas: number;
  totalErros: number;
  taxaErroPercentual: number;
  tempoMedioSegundos: number;
}

export interface StudentComparisonData {
  alunoId: string;
  nome: string;
  nomeAbrev: string;
  serie: string;
  totalOficial: number;
  acertosOficial: number;
  errosOficial: number;
  taxaOficial: number; // 0 to 100%
  totalCurriculo: number;
  acertosCurriculo: number;
  errosCurriculo: number;
  taxaCurriculo: number; // 0 to 100%
  diferencaTaxa: number; // taxaCurriculo - taxaOficial
  diagnosticoPedagogico: string;
  categoriaIntervencao: 'atencao' | 'descompasso' | 'avancado' | 'em_progresso';
}

export interface TeacherComparativeSummary {
  mediaOficialGeral: number;
  mediaCurriculoGeral: number;
  totalAlunosComparados: number;
  alunosAtencaoCount: number;
  alunosDescompassoCount: number;
  alunosAvancadoCount: number;
  insightsPedagogicos: string[];
}

