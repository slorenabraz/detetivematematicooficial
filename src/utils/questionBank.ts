import { Question, QuestionModule, QuestionOverride } from '../types';
import {
  poolEtapa1Pitagoras,
  poolEtapa2Senos,
  poolEtapa3Cossenos,
  poolEtapa4Semelhanca,
  poolTreineIniciante,
  poolTreineIntermediario,
  poolTreineAvancado,
  mergeOverrideWithQuestion,
  overrideToCustomQuestion
} from '../data/questions';
import { CURRICULO_QUESTIONS, CURRICULO_SERIES } from '../data/curriculoAcaoQuestions';
import { Storage } from './storage';

export interface AdminQuestionEntry {
  id: string;
  modulo: QuestionModule;
  status: 'original' | 'edited' | 'custom' | 'deleted';
  subLabel: string;
  question: Question;
  isBuiltIn: boolean;
}

export function getAdminQuestionCatalog(): AdminQuestionEntry[] {
  const overrides = Storage.getQuestionOverrides();
  const overrideMap = new Map<string, QuestionOverride>();
  overrides.forEach((o) => overrideMap.set(o.id, o));

  const entries: AdminQuestionEntry[] = [];

  const addBuiltIn = (
    baseList: Question[],
    modulo: QuestionModule,
    getSubLabel: (q: Question) => string
  ) => {
    for (const baseQ of baseList) {
      const ov = overrideMap.get(baseQ.id);
      if (ov?.status === 'deleted') {
        entries.push({
          id: baseQ.id,
          modulo,
          status: 'deleted',
          subLabel: getSubLabel(baseQ),
          question: baseQ,
          isBuiltIn: true
        });
      } else if (ov?.status === 'edited') {
        const merged = mergeOverrideWithQuestion(baseQ, ov);
        entries.push({
          id: baseQ.id,
          modulo,
          status: 'edited',
          subLabel: getSubLabel(merged),
          question: merged,
          isBuiltIn: true
        });
      } else {
        entries.push({
          id: baseQ.id,
          modulo,
          status: 'original',
          subLabel: getSubLabel(baseQ),
          question: baseQ,
          isBuiltIn: true
        });
      }
    }
  };

  // 1. Desafio Oficial (Etapas 1 a 4)
  addBuiltIn(poolEtapa1Pitagoras, 'oficial', () => 'Etapa 1 • Pitágoras');
  addBuiltIn(poolEtapa2Senos, 'oficial', () => 'Etapa 2 • Lei dos Senos');
  addBuiltIn(poolEtapa3Cossenos, 'oficial', () => 'Etapa 3 • Lei dos Cossenos');
  addBuiltIn(poolEtapa4Semelhanca, 'oficial', () => 'Etapa 4 • Semelhança');

  // 2. Treine Mais (Iniciante, Intermediário, Avançado)
  addBuiltIn(poolTreineIniciante, 'treine_mais', () => 'Nível Iniciante');
  addBuiltIn(poolTreineIntermediario, 'treine_mais', () => 'Nível Intermediário');
  addBuiltIn(poolTreineAvancado, 'treine_mais', () => 'Nível Avançado');

  // 3. Currículo em Ação (6º EF ao 3º EM)
  for (const serie of CURRICULO_SERIES) {
    const list = CURRICULO_QUESTIONS[serie] || [];
    addBuiltIn(list, 'curriculo_acao', (q) =>
      serie === '3º Ano Ensino Médio' && q.aulaNumero
        ? `${serie} • Aula ${String(q.aulaNumero).padStart(2, '0')}`
        : serie
    );
  }

  // 4. Questões 100% novas (custom) criadas pelo Administrador
  for (const ov of overrides) {
    if (ov.status !== 'custom') continue;
    const q = overrideToCustomQuestion(ov);
    let subLabel = 'Personalizada';
    if (ov.modulo === 'oficial') {
      subLabel = `Etapa ${ov.etapa || 1}`;
    } else if (ov.modulo === 'treine_mais') {
      subLabel =
        ov.nivel === 'avancado'
          ? 'Nível Avançado'
          : ov.nivel === 'intermediario'
          ? 'Nível Intermediário'
          : 'Nível Iniciante';
    } else if (ov.modulo === 'curriculo_acao') {
      subLabel =
        ov.serie === '3º Ano Ensino Médio' && ov.aulaNumero
          ? `${ov.serie} • Aula ${String(ov.aulaNumero).padStart(2, '0')}`
          : ov.serie || '6º Ano Fundamental';
    }

    entries.unshift({
      id: q.id,
      modulo: ov.modulo,
      status: 'custom',
      subLabel,
      question: q,
      isBuiltIn: false
    });
  }

  return entries;
}
