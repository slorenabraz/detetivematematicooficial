import React, { useState, useEffect, useMemo } from 'react';
import { Question, CurriculoActivity } from '../types';
import { ResumoPedagogicoCard } from './ResumoPedagogicoCard';
import { CurriculoLessonDiagram } from './CurriculoLessonDiagram';
import { MathParticleCelebration } from './MathParticleCelebration';
import { ArianeIncentiveCard } from './ArianeIncentiveCard';
import { getAulaColorTheme } from '../data/curriculoColorThemes';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Compass,
  Check,
  Layers,
  Sparkles,
  Zap,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface CurriculoLessonViewProps {
  question: Question;
  isCompleted: boolean;
  onCompleteLesson: (lessonId: string, aulaNumero: number) => void;
  onBackToTrail: () => void;
  onNextLesson?: () => void;
  hasNextLesson: boolean;
  onPrevLesson?: () => void;
  hasPrevLesson?: boolean;
  onSelectLessonNumber?: (num: number) => void;
}

// Fisher-Yates shuffle for activity alternatives
function shuffleActivity(act: CurriculoActivity): CurriculoActivity {
  const originalOptions = act.opcoes;
  const correctText = originalOptions[act.correta];
  const shuffled = [...originalOptions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const newCorrectIndex = shuffled.indexOf(correctText);
  return {
    ...act,
    opcoes: shuffled,
    correta: newCorrectIndex >= 0 ? newCorrectIndex : 0
  };
}

export const CurriculoLessonView: React.FC<CurriculoLessonViewProps> = ({
  question: initialQuestion,
  isCompleted,
  onCompleteLesson,
  onBackToTrail,
  onNextLesson,
  hasNextLesson,
  onPrevLesson,
  hasPrevLesson,
  onSelectLessonNumber
}) => {
  const aulaNum = initialQuestion.aulaNumero || 1;
  const aulaTitulo = initialQuestion.aulaTitulo || initialQuestion.temaNome;
  const theme = getAulaColorTheme(aulaNum);

  // Modo 'Revisão Rápida' (apenas resumos teóricos e diagramas, sem desafios práticos)
  const [isQuickRevision, setIsQuickRevision] = useState<boolean>(false);

  // Build complete list of official activities for this lesson
  const activities: CurriculoActivity[] = useMemo(() => {
    const mainAct: CurriculoActivity = {
      id: `${initialQuestion.id}-act1`,
      numero: 1,
      titulo: 'Atividade 1',
      pergunta: initialQuestion.pergunta,
      opcoes: initialQuestion.opcoes,
      correta: initialQuestion.correta,
      porque: initialQuestion.porque || 'Consulte o modelo matemático e aplique a relação fundamental da aula.',
      dica1: initialQuestion.formulaDestaque,
      dica2: initialQuestion.dicaInvestigacao
    };

    if (initialQuestion.atividades && initialQuestion.atividades.length > 0) {
      return [mainAct, ...initialQuestion.atividades];
    }
    return [mainAct];
  }, [initialQuestion]);

  const [selectedActivityIdx, setSelectedActivityIdx] = useState<number>(0);
  const [completedActivities, setCompletedActivities] = useState<Record<string, boolean>>({});

  // Active shuffled activity
  const [currentActivity, setCurrentActivity] = useState<CurriculoActivity>(() =>
    shuffleActivity(activities[0])
  );

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [hasSucceeded, setHasSucceeded] = useState<boolean>(false);
  const [showHintStep1, setShowHintStep1] = useState<boolean>(false);
  const [showHintStep2, setShowHintStep2] = useState<boolean>(false);
  const [celebrationTrigger, setCelebrationTrigger] = useState<number>(0);

  // When initialQuestion changes (e.g. user goes to next lesson), reset state
  useEffect(() => {
    setSelectedActivityIdx(0);
    const firstAct = activities[0];
    setCurrentActivity(shuffleActivity(firstAct));
    setSelectedOption(null);
    setIsConfirmed(false);
    setHasSucceeded(false);
    setShowHintStep1(false);
    setShowHintStep2(false);
    setCompletedActivities({});
  }, [initialQuestion.id, activities]);

  const handleSelectActivity = (idx: number) => {
    setSelectedActivityIdx(idx);
    const targetAct = activities[idx];
    setCurrentActivity(shuffleActivity(targetAct));
    setSelectedOption(null);
    setIsConfirmed(false);
    setHasSucceeded(false);
    setShowHintStep1(false);
    setShowHintStep2(false);
  };

  const handleConfirm = () => {
    if (selectedOption === null || isConfirmed) return;

    const isCorrect = selectedOption === currentActivity.correta;
    setIsConfirmed(true);

    if (isCorrect) {
      setHasSucceeded(true);
      setCelebrationTrigger(Date.now());
      setCompletedActivities(prev => ({ ...prev, [currentActivity.id]: true }));
      onCompleteLesson(initialQuestion.id, aulaNum);
    } else {
      setHasSucceeded(false);
    }
  };

  const handleRetry = () => {
    setCurrentActivity(shuffleActivity(activities[selectedActivityIdx]));
    setSelectedOption(null);
    setIsConfirmed(false);
    setHasSucceeded(false);
    setShowHintStep1(true);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 sm:space-y-8 pb-16">
      {/* Visual particle celebration upon completing the lesson */}
      <MathParticleCelebration trigger={celebrationTrigger} />

      {/* ----------------------------------------------------
          1. BARRA SUPERIOR DE NAVEGAÇÃO & SELETOR DE MODO
             Alternância entre "Aula Completa" e "Revisão Rápida"
         ---------------------------------------------------- */}
      <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#091124]/90 border ${theme.cardBorder} shadow-lg`}>
        {/* Navegação Voltar e Título da Aula */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onBackToTrail}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-colors cursor-pointer border border-slate-700/60"
            title="Voltar para a Trilha de 24 Aulas"
          >
            <ArrowLeft className={`w-4 h-4 ${theme.textAccent}`} />
            <span>Voltar à Trilha</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <span className={`font-black px-2.5 py-1 rounded-md ${theme.badgeBg} border ${theme.badgeBorder} ${theme.textAccent}`}>
              Aula {String(aulaNum).padStart(2, '0')}
            </span>
            <span>·</span>
            <span>3º Ano EM</span>
            <span className="hidden sm:inline">·</span>
            <span className="text-slate-400 hidden sm:inline">{theme.nomeCor}</span>
          </div>

          {isCompleted && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Concluída</span>
            </div>
          )}
        </div>

        {/* ----------------------------------------------------
            BOTÃO DE ALTERNÂNCIA: REVISÃO RÁPIDA (APENAS TEORIA)
           ---------------------------------------------------- */}
        <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 self-start lg:self-center">
          <button
            type="button"
            onClick={() => setIsQuickRevision(false)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              !isQuickRevision
                ? `${theme.buttonGradient} shadow-md font-black`
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Aula Completa (Teoria + Desafio)</span>
          </button>

          <button
            type="button"
            onClick={() => setIsQuickRevision(true)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              isQuickRevision
                ? 'bg-amber-400 text-slate-950 shadow-[0_0_15px_rgba(251,191,36,0.3)] font-black'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Oculta os desafios práticos para focar exclusivamente na consulta de resumos teóricos e diagramas"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Revisão Rápida (Apenas Teoria)</span>
          </button>
        </div>
      </div>

      {/* ----------------------------------------------------
          2. THEME TITLE & PEDAGOGICAL PRESENTATION
             ADAPTS TO THIS LESSON'S UNIQUE WARM COLOR THEME
         ---------------------------------------------------- */}
      <div className={`p-5 sm:p-7 rounded-3xl bg-gradient-to-r ${theme.cardHeroGradient} border ${theme.cardBorder} space-y-3 shadow-xl`}>
        <div className={`flex items-center gap-2 text-xs font-mono ${theme.textAccent} uppercase tracking-wider font-bold`}>
          <BookOpen className="w-4 h-4" />
          <span>Tema Oficial da Aula {String(aulaNum).padStart(2, '0')}</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white font-['Oxanium',sans-serif] tracking-tight break-words">
          {aulaTitulo}
        </h2>
        {initialQuestion.apresentacaoTema && (
          <div className="pt-2 border-t border-slate-800/80">
            <p className="text-sm sm:text-base text-slate-100 font-sans leading-relaxed break-words">
              {initialQuestion.apresentacaoTema}
            </p>
          </div>
        )}
      </div>

      {/* ----------------------------------------------------
          3. RESUMO PEDAGÓGICO OFICIAL (FÓRMULAS E CONCEITOS)
             Com Significado das Grandezas removido e Foco na Habilidade atraente
         ---------------------------------------------------- */}
      <ResumoPedagogicoCard
        question={initialQuestion}
        aulaNumero={aulaNum}
        isQuickRevision={isQuickRevision}
      />

      {/* ----------------------------------------------------
          4. ESQUEMA VISUAL INVESTIGATIVO (SEM TEXTO VAZANDO)
         ---------------------------------------------------- */}
      <CurriculoLessonDiagram question={initialQuestion} />

      {/* ----------------------------------------------------
          5. CONTROLE DINÂMICO CONFORME O MODO:
             - SE REVISÃO RÁPIDA: NAVEGADOR ÁGIL ENTRE AS 24 AULAS TEÓRICAS
             - SE COMPLETO: DESAFIO PRÁTICO OFICIAL COM QUESTÕES
         ---------------------------------------------------- */}
      {isQuickRevision ? (
        /* PAINEL DE NAVEGAÇÃO ÁGIL DA REVISÃO RÁPIDA */
        <section className={`rounded-3xl bg-[#070d1e]/95 border-2 ${theme.cardBorder} p-5 sm:p-7 space-y-5 shadow-2xl`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/40">
                <Zap className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-['Oxanium',sans-serif]">
                  Navegação Rápida entre Teorias (Aulas 01 a 24)
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  Consulte os conceitos fundamentais, fórmulas e diagramas de todas as aulas de forma instantânea:
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {hasPrevLesson && onPrevLesson && (
                <button
                  type="button"
                  onClick={onPrevLesson}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition cursor-pointer border border-slate-700"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Aula Anterior</span>
                </button>
              )}

              {hasNextLesson && onNextLesson && (
                <button
                  type="button"
                  onClick={onNextLesson}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl ${theme.buttonGradient} text-xs font-black uppercase tracking-wider transition cursor-pointer shadow-md`}
                >
                  <span>Próxima Aula</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Grade seletora rápida de aulas (1 a 24) */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
              Pular Direto para Outra Aula Teórica:
            </span>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
              {Array.from({ length: 24 }, (_, i) => i + 1).map((num) => {
                const isCurrent = num === aulaNum;
                const numTheme = getAulaColorTheme(num);

                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => onSelectLessonNumber && onSelectLessonNumber(num)}
                    className={`py-2 px-1 rounded-xl text-xs font-mono font-bold transition cursor-pointer border text-center ${
                      isCurrent
                        ? `${numTheme.buttonGradient} font-black shadow-md ring-2 ring-amber-400/50 scale-105`
                        : `${numTheme.badgeBg} ${numTheme.textAccent} ${numTheme.badgeBorder} hover:scale-105 opacity-80 hover:opacity-100`
                    }`}
                    title={`Ver Teoria da Aula ${num}: ${numTheme.nomeCor}`}
                  >
                    A{String(num).padStart(2, '0')}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        /* DESAFIO PRÁTICO DA AULA (MODO COMPLETO) */
        <section className={`rounded-3xl bg-[#070d1e]/95 border-2 ${theme.cardBorder} p-5 sm:p-7 md:p-8 space-y-6 shadow-2xl`}>
          {/* Header do Desafio Prático */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-lg ${theme.iconBg} flex items-center justify-center font-bold text-sm`}>
                🎯
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-['Oxanium',sans-serif] break-words">
                  Desafio Prático da Aula {aulaNum}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Sparkles className={`w-4 h-4 ${theme.textAccent}`} />
              <span>Resolução Formativa Oficial</span>
            </div>
          </div>

          {/* CARD CONVIDATIVO DE USO DAS PISTAS 1 E 2 */}
          <div className={`p-4 rounded-2xl bg-gradient-to-r ${theme.cardHeroGradient} border ${theme.cardBorder} flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs sm:text-sm shadow-md`}>
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/40 shrink-0 mt-0.5">
                <Lightbulb className="w-5 h-5 text-amber-400" />
              </div>
              <div className="space-y-1">
                <span className="font-bold text-amber-300 block font-['Oxanium',sans-serif] text-sm">
                  💡 Precisa de Ajuda? Use as Pistas 1 e 2!
                </span>
                <p className="text-slate-200 text-xs sm:text-[13px] font-sans leading-relaxed break-words">
                  Você pode consultar a <strong className="text-amber-300 font-semibold">Pista 1 (Fórmula Fundamental)</strong> e a <strong className={`${theme.textAccent} font-semibold`}>Pista 2 (Orientação dos Dados)</strong> a qualquer momento para enriquecer sua aprendizagem e impulsionar seu raciocínio matemático!
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0 w-full md:w-auto justify-end">
              <button
                type="button"
                onClick={() => setShowHintStep1(!showHintStep1)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  showHintStep1
                    ? 'bg-amber-950/80 text-amber-300 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>{showHintStep1 ? 'Ocultar Pista 1' : 'Ver Pista 1: Fórmula'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowHintStep2(!showHintStep2)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  showHintStep2
                    ? `${theme.badgeBg} ${theme.textAccent} ${theme.badgeBorder} shadow-[0_0_12px_rgba(0,240,255,0.3)]`
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>{showHintStep2 ? 'Ocultar Pista 2' : 'Ver Pista 2: Dados'}</span>
              </button>
            </div>
          </div>

          {/* Seletor de Atividades Oficiais da Aula (se houver múltiplas) */}
          {activities.length > 1 && (
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-semibold">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Atividades Oficiais da Aula (navegue livremente entre todas):</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {activities.map((act, idx) => {
                  const isActive = selectedActivityIdx === idx;
                  const isActDone = completedActivities[act.id];

                  return (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => handleSelectActivity(idx)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                        isActive
                          ? `${theme.buttonGradient} border-transparent shadow-md font-black`
                          : isActDone
                          ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/40'
                          : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-600 hover:text-white'
                      }`}
                    >
                      <span>{act.titulo || `Atividade ${idx + 1}`}</span>
                      {isActDone && (
                        <CheckCircle2 className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-emerald-400'}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pistas sob demanda */}
          {(showHintStep1 || showHintStep2) && (
            <div className={`space-y-2.5 p-4 rounded-2xl bg-[#081226] border ${theme.cardBorder} text-xs sm:text-sm shadow-inner`}>
              {showHintStep1 && (
                <div className="flex items-start gap-2.5 text-amber-200">
                  <span className="font-bold text-amber-400 shrink-0">💡 Pista 1 (Fórmula):</span>
                  <span className="break-words leading-relaxed flex-1">
                    {currentActivity.dica1 || initialQuestion.formulaDestaque || 'Aplique a definição da grandeza e mantenha a proporção constante.'}
                  </span>
                </div>
              )}
              {showHintStep2 && (
                <div className="flex items-start gap-2.5 text-cyan-200 pt-2 border-t border-slate-800">
                  <span className="font-bold text-cyan-400 shrink-0">🧭 Pista 2 (Orientação):</span>
                  <span className="break-words leading-relaxed flex-1">
                    {currentActivity.dica2 || initialQuestion.dicaInvestigacao}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Enunciado da Questão Oficial */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-mono font-bold ${theme.textAccent} uppercase tracking-wider block`}>
                {currentActivity.titulo || `Atividade ${selectedActivityIdx + 1}`}
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-100 font-sans leading-relaxed whitespace-pre-line break-words">
              {currentActivity.pergunta}
            </p>
          </div>

          {/* Lista de Alternativas */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
              Selecione a Alternativa Correta:
            </span>

            <div className="grid grid-cols-1 gap-2.5">
              {currentActivity.opcoes.map((opcao, idx) => {
                const isSelected = selectedOption === idx;
                let optionStyle = 'bg-slate-950/70 border-slate-800 text-slate-200 hover:border-cyan-500/60 hover:bg-slate-900/80';

                if (isConfirmed) {
                  if (idx === currentActivity.correta) {
                    optionStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/30';
                  } else if (isSelected && !hasSucceeded) {
                    optionStyle = 'bg-rose-950/70 border-rose-500 text-rose-200';
                  } else {
                    optionStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                  }
                } else if (isSelected) {
                  optionStyle = `${theme.badgeBg} ${theme.badgeBorder} text-white ring-2 ring-amber-500/30 shadow-lg`;
                }

                const letters = ['A', 'B', 'C', 'D', 'E'];

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isConfirmed}
                    onClick={() => setSelectedOption(idx)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 cursor-pointer disabled:cursor-default ${optionStyle}`}
                  >
                    <span
                      className={`w-6 h-6 rounded-md font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? `${theme.accentBar} text-slate-950`
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {letters[idx]}
                    </span>
                    <span className="text-xs sm:text-sm font-sans leading-relaxed pt-0.5 break-words flex-1">
                      {opcao}
                    </span>
                    {isConfirmed && idx === currentActivity.correta && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {isConfirmed && isSelected && !hasSucceeded && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback pós-resposta */}
          {isConfirmed && (
            <div
              className={`p-4 sm:p-5 rounded-2xl border space-y-3 animate-fadeIn ${
                hasSucceeded
                  ? 'bg-emerald-950/40 border-emerald-500/50'
                  : 'bg-rose-950/40 border-rose-500/50'
              }`}
            >
              <div className="flex items-center gap-2">
                {hasSucceeded ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span className="text-sm sm:text-base font-bold text-emerald-300 font-['Oxanium',sans-serif]">
                      Excelente! Resolução Correta
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    <span className="text-sm sm:text-base font-bold text-rose-300 font-['Oxanium',sans-serif]">
                      Resposta Incorreta. Revise o raciocínio e tente novamente!
                    </span>
                  </>
                )}
              </div>

              <div className="text-xs sm:text-sm text-slate-200 space-y-1.5 pt-2 border-t border-slate-800">
                <strong className="text-amber-300 block font-mono text-xs uppercase tracking-wider">
                  Resolução Comentada & Passo a Passo:
                </strong>
                <p className="leading-relaxed font-sans text-slate-300 break-words">
                  {currentActivity.porque}
                </p>
              </div>
            </div>
          )}

          {/* Mensagem de Foco & Incentivo • Profª Ariane Braz ao concluir a aula */}
          {isConfirmed && hasSucceeded && (
            <div className="animate-fadeIn">
              <ArianeIncentiveCard
                serie="3º Ano Ensino Médio"
                aulaNumero={aulaNum}
                temaNome={aulaTitulo}
              />
            </div>
          )}

          {/* Botões de Ação & Próximo Passo 100% Responsivo */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-800">
            {!isConfirmed ? (
              <button
                type="button"
                disabled={selectedOption === null}
                onClick={handleConfirm}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl ${theme.buttonGradient} disabled:opacity-40 disabled:cursor-not-allowed font-black text-sm uppercase tracking-wider transition-all shadow-lg cursor-pointer`}
              >
                Confirmar Resposta
              </button>
            ) : hasSucceeded ? (
              <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onBackToTrail}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition cursor-pointer border border-slate-700 text-center"
                >
                  Voltar à Trilha
                </button>

                {hasNextLesson && onNextLesson && (
                  <button
                    type="button"
                    onClick={onNextLesson}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider transition cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.3)] shrink-0 min-w-0"
                  >
                    <span className="break-words text-center">
                      Próximo passo: Avançar para a Aula {aulaNum + 1}
                    </span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                )}
              </div>
            ) : (
              <div className="w-full flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleRetry}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Tentar Novamente</span>
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};
