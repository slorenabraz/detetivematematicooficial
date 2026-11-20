import React, { useState, useEffect } from 'react';
import { User, Question } from '../types';
import { MathParticleCelebration } from './MathParticleCelebration';
import { CurriculoLessonView } from './CurriculoLessonView';
import { CurriculoXpBar } from './CurriculoXpBar';
import { MathDiagram } from './MathDiagram';
import { ArianeIncentiveCard } from './ArianeIncentiveCard';
import { getAulaColorTheme } from '../data/curriculoColorThemes';
import {
  CURRICULO_SERIES,
  CURRICULO_SERIES_INFO,
  CurriculoSerie,
  generateCurriculoSession,
  getMergedCurriculoQuestions,
  getSerieColorTheme
} from '../data/curriculoAcaoQuestions';
import { Storage } from '../utils/storage';
import {
  BookOpen,
  Lock,
  Unlock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
  ChevronDown,
  HelpCircle,
  Flame,
  Zap,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Lightbulb,
  LogIn
} from 'lucide-react';

interface CurriculoAcaoTabProps {
  currentUser: User | null;
  onOpenAuth: () => void;
  onNavigate: (page: string) => void;
}

export const CurriculoAcaoTab: React.FC<CurriculoAcaoTabProps> = ({
  currentUser,
  onOpenAuth,
  onNavigate: _onNavigate
}) => {
  // Navigation view: 'selector' (dashboard de séries) vs 'serie' (página dedicada da série selecionada)
  const [activeView, setActiveView] = useState<'selector' | 'serie'>('selector');

  // Default series is 3º Ano do Ensino Médio (24 Aulas Interativas)
  const [selectedSerie, setSelectedSerie] = useState<CurriculoSerie>('3º Ano Ensino Médio');
  const [showSeriesDropdown, setShowSeriesDropdown] = useState<boolean>(false);

  // Live sync version for admin question overrides
  const [storageVersion, setStorageVersion] = useState(0);

  useEffect(() => {
    return Storage.subscribe(() => {
      setStorageVersion((v) => v + 1);
    });
  }, []);

  // -------------------------------------------------------------------------
  // 3º ANO DO ENSINO MÉDIO: ESTADO DA TRILHA DE 24 AULAS (COM OVERRIDES DO ADMIN)
  // -------------------------------------------------------------------------
  const all3EmQuestions = React.useMemo(
    () => getMergedCurriculoQuestions('3º Ano Ensino Médio'),
    [storageVersion]
  );

  // Completed lessons stored in localStorage
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('curriculo_3em_completed_lessons');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Mode: Sequential unlockable stages (default) vs Free Revision mode
  const [freeMode, setFreeMode] = useState<boolean>(false);

  // Module filter for the 24 lessons: 'all' | 'mod1' | 'mod2' | 'mod3'
  const [activeModuleFilter, setActiveModuleFilter] = useState<'all' | 'mod1' | 'mod2' | 'mod3'>('all');

  // Currently active lesson: null = Trail Hub, Question = Active Lesson View
  const [activeLesson, setActiveLesson] = useState<Question | null>(null);

  const [celebrationTrigger, setCelebrationTrigger] = useState<number>(0);

  // -------------------------------------------------------------------------
  // OUTRAS SÉRIES (6º a 2º EM): ESTADO DO TREINE MAIS (10 QUESTÕES OFICIAIS)
  // -------------------------------------------------------------------------
  const [otherActiveQuestions, setOtherActiveQuestions] = useState<Question[]>([]);
  const [otherCurrentIndex, setOtherCurrentIndex] = useState<number>(0);
  const [otherAcertos, setOtherAcertos] = useState<number>(0);
  const [otherErros, setOtherErros] = useState<number>(0);
  const [otherStreak, setOtherStreak] = useState<number>(0);
  const [otherMaxStreak, setOtherMaxStreak] = useState<number>(0);
  const [otherCurrentXp, setOtherCurrentXp] = useState<number>(0);
  const [otherSelectedOption, setOtherSelectedOption] = useState<number | null>(null);
  const [otherIsConfirmed, setOtherIsConfirmed] = useState<boolean>(false);
  const [otherShowHint, setOtherShowHint] = useState<boolean>(false);

  // Multiplicador de Streak: 1.0x base, 1.2x (3+ acertos), 1.5x (5+ acertos), 2.0x (8+ acertos)
  const getStreakMultiplier = (streak: number) => {
    if (streak >= 8) return 2.0;
    if (streak >= 5) return 1.5;
    if (streak >= 3) return 1.2;
    return 1.0;
  };

  // Garante que a sessão seja inicializada se o usuário já estiver em uma série do 6º EF ao 2º EM
  useEffect(() => {
    if (selectedSerie !== '3º Ano Ensino Médio' && otherActiveQuestions.length === 0) {
      const qs = generateCurriculoSession(selectedSerie, 10);
      setOtherActiveQuestions(qs);
    }
  }, [selectedSerie, otherActiveQuestions.length]);

  // Setup question when opening a lesson
  const handleOpenLesson = (q: Question) => {
    setActiveLesson(q);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteLesson = (lessonId: string) => {
    setCompletedLessonIds((prev) => {
      if (!prev.includes(lessonId)) {
        const updated = [...prev, lessonId];
        try {
          localStorage.setItem('curriculo_3em_completed_lessons', JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      }
      return prev;
    });
  };

  const isLessonCompleted = (lessonId: string) => completedLessonIds.includes(lessonId);

  // A lesson is accessible if freeMode is on, or if it is Lesson 1, or if the previous lesson was completed
  const isLessonAccessible = (index: number) => {
    if (freeMode || index === 0) return true;
    const prevQ = all3EmQuestions[index - 1];
    return prevQ ? isLessonCompleted(prevQ.id) : true;
  };

  const filtered3EmQuestions = all3EmQuestions.filter((q) => {
    const num = q.aulaNumero || 1;
    if (activeModuleFilter === 'mod1') return num >= 1 && num <= 8;
    if (activeModuleFilter === 'mod2') return num >= 9 && num <= 16;
    if (activeModuleFilter === 'mod3') return num >= 17 && num <= 24;
    return true;
  });

  const total3Em = all3EmQuestions.length;
  const completedCount = completedLessonIds.length;
  const progressPercent = Math.round((completedCount / (total3Em || 1)) * 100);

  // Mastery badges calculations
  const mod1Completed = all3EmQuestions.slice(0, 8).every((q) => isLessonCompleted(q.id));
  const mod2Completed = all3EmQuestions.slice(8, 16).every((q) => isLessonCompleted(q.id));
  const mod3Completed = all3EmQuestions.slice(16, 24).every((q) => isLessonCompleted(q.id));
  const all3EmCompleted = total3Em > 0 && completedCount >= total3Em;

  // Handler for switching grade and opening dedicated serie view
  const handleSelectSerie = (serie: CurriculoSerie) => {
    setSelectedSerie(serie);
    setShowSeriesDropdown(false);
    setActiveLesson(null);
    setActiveView('serie');
    if (serie !== '3º Ano Ensino Médio') {
      const qs = generateCurriculoSession(serie, 10);
      setOtherActiveQuestions(qs);
      setOtherCurrentIndex(0);
      setOtherAcertos(0);
      setOtherErros(0);
      setOtherStreak(0);
      setOtherMaxStreak(0);
      setOtherCurrentXp(0);
      setOtherSelectedOption(null);
      setOtherIsConfirmed(false);
      setOtherShowHint(false);
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handler to return to the series selector dashboard
  const handleBackToSeries = () => {
    setActiveView('selector');
    setActiveLesson(null);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleConfirmOtherAnswer = () => {
    if (otherSelectedOption === null || otherIsConfirmed) return;
    const currentQ = otherActiveQuestions[otherCurrentIndex];
    if (!currentQ) return;

    const isCorrect = otherSelectedOption === currentQ.correta;
    setOtherIsConfirmed(true);

    if (isCorrect) {
      const nextStreak = otherStreak + 1;
      setOtherStreak(nextStreak);
      setOtherMaxStreak((prev) => Math.max(prev, nextStreak));
      setOtherCurrentXp((prev) => prev + 100);
      setOtherAcertos((prev) => prev + 1);
      setCelebrationTrigger(Date.now());
    } else {
      setOtherStreak(0);
      setOtherErros((prev) => prev + 1);
    }
  };

  const handleNextOtherQuestion = () => {
    if (otherCurrentIndex + 1 < otherActiveQuestions.length) {
      setOtherCurrentIndex((prev) => prev + 1);
      setOtherSelectedOption(null);
      setOtherIsConfirmed(false);
      setOtherShowHint(false);
    } else {
      setCelebrationTrigger(Date.now());
    }
  };

  const handleRestartOtherTraining = () => {
    const qs = generateCurriculoSession(selectedSerie, 10);
    setOtherActiveQuestions(qs);
    setOtherCurrentIndex(0);
    setOtherAcertos(0);
    setOtherErros(0);
    setOtherStreak(0);
    setOtherMaxStreak(0);
    setOtherCurrentXp(0);
    setOtherSelectedOption(null);
    setOtherIsConfirmed(false);
    setOtherShowHint(false);
  };

  const isAuthorizedUser =
    currentUser !== null &&
    (currentUser.tipo === 'aluno' || currentUser.tipo === 'professor' || currentUser.tipo === 'admin');

  if (!isAuthorizedUser) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-8 animate-fadeIn">
        <div className="bg-[#0b1329]/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-[0_0_30px_rgba(0,240,255,0.16)] border border-cyan-500/35 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-orange-500/15 border border-orange-400/50 text-orange-300 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(249,115,22,0.25)]">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2.5">
            <p className="text-xs font-mono text-cyan-300 uppercase tracking-wider font-bold">
              Acesso Exclusivo · Alunos e Professores
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Oxanium',sans-serif]">
              Currículo em Ação Gamificado
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
              Para acessar as trilhas oficiais do 6º Ano do Ensino Fundamental ao 3º Ano do Ensino Médio, ganhar XP e acompanhar seu diagnóstico formativo, faça login com sua conta de <strong className="text-cyan-300">Aluno</strong> ou <strong className="text-amber-300">Professor</strong>.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenAuth}
            className="bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-500 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-black px-8 py-3.5 rounded-2xl transition shadow-[0_0_20px_rgba(0,240,255,0.4)] inline-flex items-center gap-2 text-sm uppercase tracking-wider cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Fazer Login para Acessar</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 space-y-7 sm:space-y-9 pb-24">
      {/* Visual celebration effects */}
      <MathParticleCelebration trigger={celebrationTrigger} />

      {/* =========================================================================
          PÁGINA 1: DASHBOARD DE SELEÇÃO DE SÉRIES (COMO FUNCIONA O CURRÍCULO EM AÇÃO)
          Apresentação limpa, organizada e harmônica com o site todo
         ========================================================================= */}
      {activeView === 'selector' && (
        <section className="rounded-3xl bg-[#0b1329]/85 backdrop-blur-xl border border-cyan-500/30 p-6 sm:p-8 shadow-[0_0_30px_rgba(0,240,255,0.1)] space-y-7 animate-fadeIn">
          <div className="space-y-5">
            {/* Subtítulo limpo em texto tipográfico */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-300">
              <span>Material Digital SP</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-amber-300">4º Bimestre Oficial</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">6º EF ao 3º EM</span>
            </div>

            <div className="space-y-3 max-w-4xl">
              <h2 className="text-2xl sm:text-3xl font-black text-white font-['Oxanium',sans-serif] tracking-tight text-balance">
                Como Funciona o Currículo em Ação Gamificado
              </h2>

              <p className="text-sm text-slate-300 font-sans leading-relaxed">
                Cada etapa transforma os conteúdos do Livro do Estudante em desafios investigativos dinâmicos: avance com <strong className="text-amber-300">100 XP por acerto</strong>, explore esquemas visuais claros, consulte pistas estratégicas quando precisar e receba explicações detalhadas passo a passo após cada resposta.
              </p>
            </div>

            {/* Fundamento Essencial reorganizado em harmonia com o restante do site */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#070d1e]/90 border border-cyan-500/25 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <span className="text-xl shrink-0">🏫</span>
                <h3 className="text-sm sm:text-base font-black text-amber-300 font-['Oxanium',sans-serif] tracking-wide">
                  Fundamento Essencial: As Aulas Presenciais com seu Professor
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                As aulas presenciais na escola são de <strong className="text-white">extrema e insubstituível importância</strong>. É na troca direta com seu professor, nos debates da sala de aula e no caderno construído dia a dia que o raciocínio matemático cria raízes. O <em>Detetive Matemático</em> atua como um reforço divertido e interativo para consolidar o que você aprende em sala e ampliar sua segurança nas avaliações.
              </p>
            </div>

            {/* 3 Pilares Didáticos organizados com espaçamento limpo */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div className="p-4 rounded-2xl bg-[#070c1a]/90 border border-cyan-500/25 flex items-start gap-3">
                <span className="text-xl shrink-0 mt-0.5">🎯</span>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-cyan-300 font-['Oxanium',sans-serif]">Jornada Investigativa Gamificada</h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Desafios dinâmicos com XP, diagramas visuais e situações do cotidiano para transformar a Matemática do 4º Bimestre em descobertas práticas!
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#070c1a]/90 border border-amber-500/25 flex items-start gap-3">
                <span className="text-xl shrink-0 mt-0.5">💡</span>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-amber-300 font-['Oxanium',sans-serif]">Pistas do Detetive</h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Dicas e fórmulas fundamentais sob demanda para apoiar seu raciocínio a qualquer momento.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#070c1a]/90 border border-emerald-500/25 flex items-start gap-3">
                <span className="text-xl shrink-0 mt-0.5">📝</span>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-emerald-300 font-['Oxanium',sans-serif]">Feedback Analítico Oficial</h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Explicação objetiva do porquê da resposta correta e das armadilhas mais comuns.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------
              GRADE DE CARDS VIBRANTES DE SELEÇÃO DE SÉRIE
              (6º EF ao 3º EM - Todas Coloridas com Paletas Únicas)
             ---------------------------------------------------- */}
          <div className="space-y-4 pt-5 border-t border-cyan-500/20">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-mono font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                Selecione a Série Desejada para Abrir a Página:
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {CURRICULO_SERIES.map((serieName) => {
                const isSelected = selectedSerie === serieName;
                const info = CURRICULO_SERIES_INFO[serieName];
                const theme = getSerieColorTheme(serieName);

                return (
                  <div
                    key={serieName}
                    className={`rounded-2xl border-2 p-4 flex flex-col justify-between transition-all duration-300 min-h-[220px] ${
                      isSelected
                        ? `bg-slate-900/95 ${theme.cardBorder} ring-2 ring-amber-400/50 shadow-xl scale-[1.02]`
                        : `bg-slate-900/80 ${theme.cardBorder} ${theme.cardBorderHover} opacity-90 hover:opacity-100 hover:scale-[1.01]`
                    }`}
                  >
                    <div className="space-y-2.5 flex-1">
                      <div className="flex items-center justify-between gap-1.5">
                        <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-md border ${theme.badgeBg} ${theme.badgeBorder} ${theme.textAccent}`}>
                          {serieName.includes('Médio') ? 'Ensino Médio' : 'Ensino Fundamental'}
                        </span>
                        <span className="text-lg">{info.icon}</span>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-white font-['Oxanium',sans-serif] leading-snug break-words">
                        {info.titulo}
                      </h3>

                      <p className="text-[11px] text-slate-300 font-sans leading-relaxed break-words line-clamp-3">
                        {info.descricao}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {info.topicos.slice(0, 2).map((topico, tIdx) => (
                          <span key={tIdx} className="text-[9.5px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                            {topico}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-800/80">
                      <button
                        type="button"
                        onClick={() => handleSelectSerie(serieName)}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer ${theme.buttonGradient} shadow-md`}
                      >
                        <span>Entrar na Série</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          PÁGINA 2: PÁGINA DEDICADA DA SÉRIE SELECIONADA
          Aberta separadamente com cabeçalho exclusivo e botão Voltar para as Séries
         ========================================================================= */}
      {activeView === 'serie' && (
        <div className="space-y-6 animate-fadeIn">
          {/* BARRA SUPERIOR DE NAVEGAÇÃO: BOTÃO VOLTAR PARA AS SÉRIES */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between flex-wrap gap-3 shadow-lg">
            <button
              type="button"
              onClick={handleBackToSeries}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition cursor-pointer border border-slate-700 shadow-md group"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
              <span>← Voltar para as Séries</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="hidden sm:inline">Página Dedicada:</span>
              <span className="px-3 py-1 rounded-md bg-slate-950 border border-amber-500/40 text-amber-300 font-black">
                {selectedSerie}
              </span>
            </div>
          </div>

          {/* =========================================================================
              FLUXO PRINCIPAL: 3º ANO DO ENSINO MÉDIO - TRILHA DAS 24 AULAS
             ========================================================================= */}
          {selectedSerie === '3º Ano Ensino Médio' && (
            <>
          {/* ====================================================
              SUB-VIEW A: DETALHE DA AULA ATIVA
             ==================================================== */}
          {activeLesson ? (
            <CurriculoLessonView
              question={activeLesson}
              isCompleted={isLessonCompleted(activeLesson.id)}
              onCompleteLesson={(lessonId) => {
                handleCompleteLesson(lessonId);
              }}
              onBackToTrail={() => setActiveLesson(null)}
              hasNextLesson={
                all3EmQuestions.findIndex((q) => q.id === activeLesson.id) < all3EmQuestions.length - 1
              }
              hasPrevLesson={
                all3EmQuestions.findIndex((q) => q.id === activeLesson.id) > 0
              }
              onNextLesson={() => {
                const curIdx = all3EmQuestions.findIndex((q) => q.id === activeLesson.id);
                if (curIdx >= 0 && curIdx < all3EmQuestions.length - 1) {
                  handleOpenLesson(all3EmQuestions[curIdx + 1]);
                }
              }}
              onPrevLesson={() => {
                const curIdx = all3EmQuestions.findIndex((q) => q.id === activeLesson.id);
                if (curIdx > 0) {
                  handleOpenLesson(all3EmQuestions[curIdx - 1]);
                }
              }}
              onSelectLessonNumber={(targetNum) => {
                const targetQ = all3EmQuestions.find(q => (q.aulaNumero || 1) === targetNum);
                if (targetQ) handleOpenLesson(targetQ);
              }}
            />
          ) : (
            /* ====================================================
                SUB-VIEW B: HUB DA TRILHA DE 24 AULAS
               ==================================================== */
            <div className="space-y-7 sm:space-y-9 animate-fadeIn">
              {/* Header Hero Banner: Trilha de Aulas com Paleta Quente */}
              <section className="rounded-3xl bg-gradient-to-b from-[#0a1329] via-[#080e1e] to-[#040814] border-2 border-cyan-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <span className="font-bold">Trilha Gamificada de Aprendizagem</span>
                      <span>·</span>
                      <span>3º Ano do Ensino Médio</span>
                      <span>·</span>
                      <span className="text-amber-400">4º Bimestre (Material Digital SP)</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-['Oxanium',sans-serif] tracking-tight">
                      24 Aulas Interativas Desbloqueáveis
                    </h1>

                    <p className="text-xs sm:text-sm text-amber-100/90 max-w-2xl font-sans leading-relaxed">
                      Cada etapa aborda uma aula com tema oficial, apresentação breve, cards de fórmulas e questões oficiais para resolução prática ou consulta direta em Revisão Rápida.
                    </p>
                  </div>

                  {/* Indicador de Progresso (Sem Ranking, Sem Pontos) */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-amber-500/30 min-w-[240px] space-y-2.5 shadow-inner">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-amber-200/80 font-bold uppercase">Progresso da Trilha:</span>
                      <span className="text-amber-400 font-black text-sm">{progressPercent}%</span>
                    </div>

                    <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-rose-600 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                      <span>{completedCount} de {total3Em} Aulas Concluídas</span>
                      {completedCount > 0 && (
                        <span className="text-emerald-400 flex items-center gap-1 font-bold">
                          <Check className="w-3 h-3" />
                          Salvo
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-5 mt-5 border-t border-slate-800/80 text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Progresso individual e formativo (foco didático e resolução ativa).</span>
                  </div>
                  <span className="text-cyan-400 font-bold">
                    24 Cores Vibrantes e Exclusivas
                  </span>
                </div>
              </section>

              {/* ----------------------------------------------------
                  GUIA PRÉVIO CONCISO: COMO FUNCIONAM OS MODOS DE APRENDIZAGEM
                  Com cores vibrantes e explicações diretas de alto impacto
                 ---------------------------------------------------- */}
              <section className="rounded-3xl bg-gradient-to-r from-[#170a02] via-[#200a06] to-[#170a02] border-2 border-orange-500/40 p-5 sm:p-6 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-orange-500/20 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-400/40">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-black text-white font-['Oxanium',sans-serif]">
                        Como Funcionam os Modos de Estudo
                      </h2>
                      <p className="text-xs text-orange-200/80 font-sans">
                        Escolha como deseja explorar o conteúdo oficial do 4º Bimestre:
                      </p>
                    </div>
                  </div>

                  {/* Botão de Alternância Imediata */}
                  <button
                    type="button"
                    onClick={() => setFreeMode(!freeMode)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer border shadow-md ${
                      freeMode
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 border-emerald-400'
                        : 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 border-amber-300'
                    }`}
                  >
                    {freeMode ? <Unlock className="w-4 h-4 text-slate-950" /> : <Lock className="w-4 h-4 text-slate-950" />}
                    <span>{freeMode ? 'Ativar Modo Trilha Sequencial' : 'Ativar Modo Revisão (Livre)'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Card Modo Trilha Sequencial (Conciso e Vibrante) */}
                  <div
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      !freeMode
                        ? 'bg-gradient-to-br from-amber-950/80 to-[#1e0e02] border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/50'
                        : 'bg-slate-900/60 border-slate-800 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-amber-400" />
                        <h3 className="text-sm font-black text-white font-['Oxanium',sans-serif]">
                          Modo Trilha Sequencial
                        </h3>
                      </div>
                      {!freeMode && (
                        <span className="text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                          Ativo Agora
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-[13px] text-amber-100 font-sans leading-relaxed">
                      Avanço guiado aula por aula. Conclua o desafio da aula atual para desbloquear a próxima etapa e construir o raciocínio matemático passo a passo.
                    </p>
                  </div>

                  {/* Card Modo Revisão Livre (Conciso e Vibrante) */}
                  <div
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      freeMode
                        ? 'bg-gradient-to-br from-emerald-950/80 to-[#032014] border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)] ring-1 ring-emerald-400/50'
                        : 'bg-slate-900/60 border-slate-800 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Unlock className="w-4 h-4 text-emerald-400" />
                        <h3 className="text-sm font-black text-white font-['Oxanium',sans-serif]">
                          Modo Revisão (Acesso Livre)
                        </h3>
                      </div>
                      {freeMode && (
                        <span className="text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded bg-emerald-400 text-slate-950">
                          Ativo Agora
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-[13px] text-emerald-100 font-sans leading-relaxed">
                      Acesso imediato às 24 aulas. Consulte livremente teorias, fórmulas e resolva questões no seu próprio ritmo para provas e vestibulares.
                    </p>
                  </div>
                </div>
              </section>

              {/* Quadro de Medalhas de Maestria Pedagógica */}
              <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    mod1Completed
                      ? 'bg-amber-950/40 border-amber-500/60 text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.2)]'
                      : 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-70'
                  }`}
                >
                  <div className="text-2xl mb-1.5">{mod1Completed ? '🏅' : '🔒'}</div>
                  <span className="text-xs font-bold block text-white font-['Oxanium',sans-serif]">
                    Detetive das Grandezas
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Aulas 01 a 08 (Razão & Produto)
                  </span>
                </div>

                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    mod2Completed
                      ? 'bg-orange-950/40 border-orange-500/60 text-orange-200 shadow-[0_0_15px_rgba(249,115,22,0.2)]'
                      : 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-70'
                  }`}
                >
                  <div className="text-2xl mb-1.5">{mod2Completed ? '🎖️' : '🔒'}</div>
                  <span className="text-xs font-bold block text-white font-['Oxanium',sans-serif]">
                    Mestre da Estatística
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Aulas 09 a 16 (Médias & Dispersão)
                  </span>
                </div>

                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    mod3Completed
                      ? 'bg-rose-950/40 border-rose-500/60 text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                      : 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-70'
                  }`}
                >
                  <div className="text-2xl mb-1.5">{mod3Completed ? '📐' : '🔒'}</div>
                  <span className="text-xs font-bold block text-white font-['Oxanium',sans-serif]">
                    Geômetra das Áreas
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Aulas 17 a 24 (Polígonos & Círculos)
                  </span>
                </div>

                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    all3EmCompleted
                      ? 'bg-gradient-to-r from-amber-950/60 to-rose-950/60 border-amber-400 text-amber-200 shadow-[0_0_20px_rgba(250,204,21,0.35)]'
                      : 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-70'
                  }`}
                >
                  <div className="text-2xl mb-1.5">{all3EmCompleted ? '🏆' : '🔒'}</div>
                  <span className="text-xs font-bold block text-white font-['Oxanium',sans-serif]">
                    Coroa do 4º Bimestre
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    24 Aulas Concluídas
                  </span>
                </div>
              </section>

              {/* Filtros por Módulo da Trilha */}
              <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveModuleFilter('all')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeModuleFilter === 'all'
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Todas as 24 Aulas ({total3Em})
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModuleFilter('mod1')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeModuleFilter === 'mod1'
                      ? 'bg-yellow-400 text-slate-950 font-black shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Módulo 1: Grandezas & Proporções (1 a 8)
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModuleFilter('mod2')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeModuleFilter === 'mod2'
                      ? 'bg-orange-500 text-slate-950 font-black shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Módulo 2: Estatística & Dispersão (9 a 16)
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModuleFilter('mod3')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeModuleFilter === 'mod3'
                      ? 'bg-rose-600 text-white font-black shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Módulo 3: Geometria & Áreas (17 a 24)
                </button>
              </div>

              {/* ----------------------------------------------------
                  GRADE DAS 24 AULAS COLORIDAS (24 CORES VIBRANTES E CHAMATIVAS)
                  100% VISÍVEIS MESMO COM MODO TRILHA SEQUENCIAL ATIVADO
                 ---------------------------------------------------- */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filtered3EmQuestions.map((q, idx) => {
                  const aulaNum = q.aulaNumero || idx + 1;
                  const completed = isLessonCompleted(q.id);
                  const accessible = isLessonAccessible(aulaNum - 1);
                  const theme = getAulaColorTheme(aulaNum);

                  return (
                    <div
                      key={q.id}
                      className={`rounded-2xl border-2 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 min-h-[340px] h-auto opacity-100 ${
                        completed
                          ? 'bg-slate-900/95 border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                          : accessible
                          ? `bg-slate-900/95 ${theme.cardBorder} ${theme.cardBorderHover}`
                          : `bg-slate-900/95 ${theme.cardBorder} hover:shadow-md`
                      }`}
                    >
                      <div className="space-y-3.5 flex-1 flex flex-col">
                        {/* Top Badge: Aula Number with Unique Vibrant Color Theme */}
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`font-mono text-xs font-black px-2.5 py-1 rounded-md border ${theme.badgeBg} ${theme.badgeBorder} ${theme.textAccent}`}
                          >
                            AULA {String(aulaNum).padStart(2, '0')}
                          </span>

                          {completed ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/70 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                              <Check className="w-3 h-3" />
                              Concluída
                            </span>
                          ) : accessible ? (
                            <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${theme.badgeBg} ${theme.textAccent} ${theme.badgeBorder}`}>
                              Disponível
                            </span>
                          ) : (
                            <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${theme.badgeBg} ${theme.textAccent} ${theme.badgeBorder}`}>
                              <Lock className={`w-3 h-3 ${theme.textAccent}`} />
                              Bloqueada
                            </span>
                          )}
                        </div>

                        {/* Official Theme Title: Escrita 100% Completa sem Truncar */}
                        <h3 className="text-base sm:text-[17px] font-bold text-white leading-snug font-['Oxanium',sans-serif] break-words">
                          {q.aulaTitulo || q.temaNome}
                        </h3>

                        {/* Brief Presentation: Escrita Completa e Legível sem Line-Clamp */}
                        {q.apresentacaoTema && (
                          <p className="text-xs sm:text-[13px] text-slate-300 font-sans leading-relaxed break-words flex-1">
                            {q.apresentacaoTema}
                          </p>
                        )}

                        {/* Featured formula with unique color styling */}
                        {q.formulaDestaque && (
                          <div
                            className={`p-2.5 rounded-xl bg-slate-950/90 border text-xs font-mono break-words [overflow-wrap:anywhere] ${theme.badgeBorder} ${theme.textAccent}`}
                          >
                            {q.formulaDestaque}
                          </div>
                        )}
                      </div>

                      {/* Action Button: Styled with Lesson Vibrant Theme */}
                      <div className="pt-4 mt-4 border-t border-slate-800/80">
                        <button
                          type="button"
                          disabled={!accessible}
                          onClick={() => handleOpenLesson(q)}
                          className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer disabled:cursor-not-allowed ${
                            completed
                              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                              : accessible
                              ? `${theme.buttonGradient} shadow-md`
                              : `${theme.badgeBg} ${theme.textAccent} border ${theme.badgeBorder} opacity-85`
                          }`}
                        >
                          {completed ? (
                            <>
                              <span>Revisar Aula</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </>
                          ) : accessible ? (
                            <>
                              <span>Iniciar Aula</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </>
                          ) : (
                            <>
                              <Lock className={`w-3.5 h-3.5 ${theme.textAccent}`} />
                              <span>Aula Bloqueada</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {/* =========================================================================
          FLUXO SECUNDÁRIO: TREINE MAIS (6º EF AO 2º EM - 100% LIVRO DO ESTUDANTE 4º BIMESTRE)
          - Formato Treine Mais com Aprendizado Progressivo com Imagens
          - Dica de Investigação oficial do Material Digital SP
          - Alternativas e questões dinamicamente embaralhadas
          - Barra de XP com resolução de exercícios e Bônus de Sequência (Streak)
         ========================================================================= */}
      {selectedSerie !== '3º Ano Ensino Médio' && otherActiveQuestions.length > 0 && (() => {
        const isSessionFinished = otherCurrentIndex >= otherActiveQuestions.length - 1 && otherIsConfirmed;
        const currentQ = otherActiveQuestions[otherCurrentIndex];
        const serieInfo = CURRICULO_SERIES_INFO[selectedSerie];
        const serieTheme = getSerieColorTheme(selectedSerie);
        const currentMultiplier = getStreakMultiplier(otherStreak);

        return (
          <div className="space-y-6 animate-fadeIn">
            {/* 1. BARRA DE XP DINÂMICA COM BÔNUS DE SEQUÊNCIA (STREAK) */}
            <CurriculoXpBar
              currentResolved={otherCurrentIndex + (otherIsConfirmed ? 1 : 0)}
              totalItems={otherActiveQuestions.length}
              acertos={otherAcertos}
              serie={selectedSerie}
              streak={otherStreak}
              streakMultiplier={currentMultiplier}
              currentXp={otherCurrentXp}
              maxXp={otherActiveQuestions.length * 100}
              on100PercentReached={() => setCelebrationTrigger(Date.now())}
            />

            {/* 2. CABEÇALHO DA SÉRIE COM PALETA DE COR VIBRANTE DA SÉRIE */}
            <div className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-r ${serieTheme.cardHeroGradient} border-2 ${serieTheme.cardBorder} flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xl`}>
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-lg ${serieTheme.iconBg}`}>{serieInfo?.icon || '📐'}</span>
                  <h2 className="text-base sm:text-lg font-black text-white font-['Oxanium',sans-serif] tracking-tight break-words">
                    {serieInfo?.titulo || selectedSerie}
                  </h2>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${serieTheme.badgeBg} ${serieTheme.textAccent} border ${serieTheme.badgeBorder} shrink-0`}>
                    Livro do Estudante • 4º Bimestre (SP)
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed break-words">
                  {serieInfo?.descricao || 'Sessão oficial com 10 questões de matemática selecionadas do Material Digital do Estado de São Paulo.'}
                </p>
              </div>

              {/* Status do Streak (sem multiplicador de XP) */}
              {otherStreak >= 2 && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-950/80 border border-orange-500/60 text-orange-200 text-xs font-mono font-black shadow-[0_0_15px_rgba(249,115,22,0.3)] shrink-0 self-start md:self-center">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span>Sequência: {otherStreak} acertos seguidos</span>
                </div>
              )}
            </div>

            {/* 3. TELA DE SESSÃO CONCLUÍDA OU CARD DA QUESTÃO ATUAL */}
            {isSessionFinished ? (
              /* CARD DE CONCLUSÃO DA SESSÃO DE 10 QUESTÕES */
              <div className="p-6 sm:p-8 rounded-3xl bg-[#080e22] border-2 border-emerald-500/60 shadow-[0_0_30px_rgba(16,185,129,0.2)] text-center space-y-6 animate-fadeIn">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-emerald-400 flex items-center justify-center text-slate-950 shadow-[0_0_25px_rgba(251,191,36,0.5)]">
                  <Trophy className="w-9 h-9 text-slate-950 animate-bounce" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                    Treino Oficial Concluído com Sucesso!
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-['Oxanium',sans-serif]">
                    Parabéns pelo Treinamento do 4º Bimestre!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-sans leading-relaxed break-words">
                    Você completou as 10 questões oficiais do Livro do Estudante para o <strong>{selectedSerie}</strong>. Continue praticando para fixar os conceitos e bater novos recordes de sequência!
                  </p>
                </div>

                {/* Grid de Estatísticas Finais da Sessão */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto text-left">
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">XP Total Ganho</span>
                    <span className="text-lg sm:text-xl font-black text-yellow-300 font-mono flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      {otherCurrentXp} XP
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Total de Acertos</span>
                    <span className="text-lg sm:text-xl font-black text-emerald-400 font-mono flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      {otherAcertos} / {otherActiveQuestions.length}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Maior Sequência (Streak)</span>
                    <span className="text-lg sm:text-xl font-black text-orange-400 font-mono flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      {otherMaxStreak} acertos
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Taxa de Precisão</span>
                    <span className="text-lg sm:text-xl font-black text-cyan-300 font-mono">
                      {Math.round((otherAcertos / otherActiveQuestions.length) * 100)}%
                    </span>
                  </div>
                </div>

                {/* Mensagem de Foco & Incentivo • Profª Ariane Braz */}
                <ArianeIncentiveCard
                  serie={selectedSerie}
                  accuracyPercent={Math.round((otherAcertos / otherActiveQuestions.length) * 100)}
                />

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleRestartOtherTraining}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-lg"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Iniciar Novo Treino (10 Questões do 4º Bimestre)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBackToSeries}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition cursor-pointer border border-slate-700 shadow-md"
                  >
                    <ArrowLeft className="w-4 h-4 text-amber-400" />
                    <span>Voltar para as Séries</span>
                  </button>
                </div>
              </div>
            ) : (
              /* CARD DA QUESTÃO ATUAL NO FORMATO TREINE MAIS COM PALETA VIBRANTE DA SÉRIE */
              <div className={`p-5 sm:p-7 rounded-3xl bg-slate-900/95 border-2 ${serieTheme.cardBorder} space-y-5 shadow-2xl`}>
                {/* Top Question Info Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs font-mono font-black ${serieTheme.textAccent} ${serieTheme.badgeBg} px-3 py-1 rounded-md border ${serieTheme.badgeBorder}`}>
                      Questão {otherCurrentIndex + 1} de {otherActiveQuestions.length}
                    </span>
                    <span className="text-xs font-mono text-slate-200 font-bold">
                      {currentQ.temaNome}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      Habilidade: {currentQ.habilidade}
                    </span>
                  </div>
                </div>

                {/* 1. APRENDIZADO PROGRESSIVO COM IMAGENS (DIAGRAMA SVG) */}
                {currentQ.svgType && (
                  <div className="flex justify-center bg-[#060a16] p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-inner">
                    <MathDiagram type={currentQ.svgType} className="w-full max-w-sm sm:max-w-md h-auto" />
                  </div>
                )}

                {/* 2. ENUNCIADO DA QUESTÃO OFICIAL */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-slate-800">
                  <p className="text-base sm:text-lg font-semibold text-white leading-relaxed break-words whitespace-pre-line">
                    {currentQ.pergunta}
                  </p>
                </div>

                {/* 3. DICA DE INVESTIGAÇÃO (PISTA DO DETETIVE) */}
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setOtherShowHint((prev) => !prev)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                      otherShowHint
                        ? 'bg-amber-950/80 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                    }`}
                  >
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <span>{otherShowHint ? 'Ocultar Dica de Investigação' : 'Ver Dica de Investigação (Pista do Detetive)'}</span>
                  </button>

                  {otherShowHint && (
                    <div className="p-4 rounded-2xl bg-[#091226] border-2 border-amber-400/80 text-amber-100 text-xs sm:text-sm leading-relaxed shadow-lg space-y-1.5 animate-fadeIn">
                      <div className="flex items-center gap-2 font-bold text-amber-300 font-['Oxanium',sans-serif]">
                        <span>🕵️‍♂️ Pista Oficial de Investigação • {currentQ.temaNome}:</span>
                      </div>
                      <p className="break-words font-sans text-slate-200 leading-relaxed">
                        {currentQ.dicaInvestigacao || 'Analise atentamente as propriedades da figura, as grandezas dadas e aplique a relação matemática fundamental.'}
                      </p>
                    </div>
                  )}
                </div>

                {/* 4. ALTERNATIVAS EMBARALHADAS */}
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
                    Selecione a Alternativa Correta:
                  </span>

                  <div className="grid grid-cols-1 gap-2.5">
                    {currentQ.opcoes.map((opcao, idx) => {
                      const isSelected = otherSelectedOption === idx;
                      const isCorrect = idx === currentQ.correta;

                      let style = 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-900/70';
                      if (!otherIsConfirmed && isSelected) {
                        style = 'bg-amber-950/80 border-amber-400 text-amber-100 ring-2 ring-amber-400/40 shadow-md';
                      }
                      if (otherIsConfirmed) {
                        if (isCorrect) {
                          style = 'bg-emerald-950/80 border-emerald-400 text-emerald-100 font-bold ring-2 ring-emerald-400/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]';
                        } else if (isSelected && !isCorrect) {
                          style = 'bg-rose-950/80 border-rose-500 text-rose-100 font-bold';
                        } else {
                          style = 'opacity-40 bg-slate-950/40 border-slate-900 text-slate-500';
                        }
                      }

                      const letters = ['A', 'B', 'C', 'D', 'E'];

                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={otherIsConfirmed}
                          onClick={() => setOtherSelectedOption(idx)}
                          className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer disabled:cursor-default ${style}`}
                        >
                          <span
                            className={`w-6 h-6 rounded-md font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                              isSelected && !otherIsConfirmed
                                ? 'bg-amber-400 text-slate-950'
                                : otherIsConfirmed && isCorrect
                                ? 'bg-emerald-400 text-slate-950'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {letters[idx]}
                          </span>
                          <span className="text-xs sm:text-sm font-sans leading-relaxed break-words flex-1">
                            {opcao}
                          </span>
                          {otherIsConfirmed && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                          )}
                          {otherIsConfirmed && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. FORMATO DE RESPOSTA CORRETA OU INCORRETA E O BREVE RESUMO */}
                {otherIsConfirmed && (
                  <div
                    className={`p-4 sm:p-5 rounded-2xl border space-y-3 animate-fadeIn ${
                      otherSelectedOption === currentQ.correta
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                        : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
                      {otherSelectedOption === currentQ.correta ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          <span className="font-['Oxanium',sans-serif]">
                            ✓ Resposta Correta! +100 XP
                            {otherStreak >= 2 && (
                              <span className="ml-2 text-xs text-amber-300 font-mono">
                                (Sequência: {otherStreak} acertos seguidos)
                              </span>
                            )}
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                          <span className="font-['Oxanium',sans-serif]">
                            ✕ Resposta Incorreta! A alternativa correta foi indicada em destaque verde.
                          </span>
                        </>
                      )}
                    </div>

                    {/* Explicação Oficial: Resumo completo e conciso de acerto vs erro */}
                    <div className="pt-3 border-t border-slate-800/80 space-y-3 text-xs sm:text-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5">
                          <span className="text-[11px] font-mono font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            Por que esta alternativa é a correta:
                          </span>
                          <p className="text-slate-200 font-sans leading-relaxed break-words">
                            {currentQ.porque}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                          <span className="text-[11px] font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                            Armadilha:
                          </span>
                          <p className="text-slate-300 font-sans leading-relaxed break-words">
                            Distratores típicos desta habilidade surgem ao trocar numerador por denominador, omitir conversão de unidades ou confundir perímetro com área e proporcionalidade direta com inversa.
                          </p>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between flex-wrap gap-2">
                        <span className="font-mono text-amber-300 font-semibold flex items-center gap-1.5">
                          📖 Livro do Estudante • {selectedSerie} (4º Bimestre - SP)
                        </span>
                        <span className="font-mono text-slate-400">
                          Habilidade Oficial: {currentQ.habilidade}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. BOTÕES DE AÇÃO E PROGRESSÃO */}
                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleBackToSeries}
                    className="text-slate-400 hover:text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 text-amber-400" />
                    <span>Voltar para as Séries</span>
                  </button>

                  {!otherIsConfirmed ? (
                    <button
                      type="button"
                      disabled={otherSelectedOption === null}
                      onClick={handleConfirmOtherAnswer}
                      className={`px-6 py-2.5 rounded-xl ${serieTheme.buttonGradient} text-slate-950 font-black text-xs uppercase tracking-wider transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md`}
                    >
                      Confirmar Resposta
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNextOtherQuestion}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs uppercase tracking-wider transition cursor-pointer shadow-md inline-flex items-center gap-1.5"
                    >
                      <span>
                        {otherCurrentIndex + 1 < otherActiveQuestions.length
                          ? 'Próxima Questão'
                          : 'Ver Resultado Final'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })()}
      </div>
    )}
    </div>
  );
};
