import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { CURRICULO_QUESTIONS } from '../data/curriculoAcaoQuestions';
import { CurriculoLessonView } from './CurriculoLessonView';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Lock,
  Sparkles,
  Award,
  ArrowRight,
  Compass,
  Layers,
  Unlock,
  Check
} from 'lucide-react';

interface Curriculo3AnoMissionTrailProps {
  onBackToSeriesSelect: () => void;
}

export const Curriculo3AnoMissionTrail: React.FC<Curriculo3AnoMissionTrailProps> = ({
  onBackToSeriesSelect
}) => {
  const allQuestions = CURRICULO_QUESTIONS['3º Ano Ensino Médio'] || [];

  // Local storage for completed lessons persistence
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('curriculo_3em_completed_lessons');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Free revision mode toggle: allow direct access to all 24 lessons or sequential progression
  const [freeMode, setFreeMode] = useState<boolean>(true);

  // Active module filter: 'all' | 'mod1' | 'mod2' | 'mod3'
  const [activeModuleFilter, setActiveModuleFilter] = useState<'all' | 'mod1' | 'mod2' | 'mod3'>('all');

  // Selected lesson to solve: null = trail view, Question = lesson view
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  const saveCompletion = (lessonId: string, aulaNum: number) => {
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

  // Check if a lesson is accessible (in freeMode all are unlocked, in sequential mode unlocked if previous is done)
  const isLessonAccessible = (index: number) => {
    if (freeMode || index === 0) return true;
    const prevQuestion = allQuestions[index - 1];
    return prevQuestion ? isLessonCompleted(prevQuestion.id) : true;
  };

  const filteredQuestions = allQuestions.filter((q) => {
    const num = q.aulaNumero || 1;
    if (activeModuleFilter === 'mod1') return num >= 1 && num <= 8;
    if (activeModuleFilter === 'mod2') return num >= 9 && num <= 16;
    if (activeModuleFilter === 'mod3') return num >= 17 && num <= 24;
    return true;
  });

  const totalLessons = allQuestions.length;
  const completedCount = completedLessonIds.length;
  const progressPercent = Math.round((completedCount / (totalLessons || 1)) * 100);

  // Module completion checks for pedagogical mastery badges
  const mod1Completed = allQuestions.slice(0, 8).every((q) => isLessonCompleted(q.id));
  const mod2Completed = allQuestions.slice(8, 16).every((q) => isLessonCompleted(q.id));
  const mod3Completed = allQuestions.slice(16, 24).every((q) => isLessonCompleted(q.id));
  const allCompleted = totalLessons > 0 && completedCount >= totalLessons;

  // If a lesson is currently open, render the specialized CurriculoLessonView
  if (selectedQuestion) {
    const currentIndex = allQuestions.findIndex((q) => q.id === selectedQuestion.id);
    const hasNext = currentIndex >= 0 && currentIndex < allQuestions.length - 1;

    return (
      <CurriculoLessonView
        question={selectedQuestion}
        isCompleted={isLessonCompleted(selectedQuestion.id)}
        onCompleteLesson={saveCompletion}
        onBackToTrail={() => setSelectedQuestion(null)}
        hasNextLesson={hasNext}
        onNextLesson={() => {
          if (hasNext) {
            setSelectedQuestion(allQuestions[currentIndex + 1]);
          }
        }}
      />
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-7 sm:space-y-9 pb-20">
      {/* ----------------------------------------------------
          1. HEADER & TRAIL OVERVIEW (ZERO RANKING / ZERO XP)
         ---------------------------------------------------- */}
      <section className="rounded-3xl bg-gradient-to-b from-[#0a1329] via-[#080e1e] to-[#040814] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span className="font-bold">Currículo em Ação</span>
              <span>·</span>
              <span>3º Ano do Ensino Médio</span>
              <span>·</span>
              <span className="text-amber-400">4º Bimestre (24 Aulas)</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-['Oxanium',sans-serif] tracking-tight">
              Trilha de Missões Pedagógicas
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-sans leading-relaxed">
              Explore cada uma das 24 aulas separadamente. Estude os resumos conceituais, examine os esquemas visuais investigativos e resolva os desafios com alternativas embaralhadas.
            </p>
          </div>

          {/* Clean Progress Indicator (No Ranking, No XP) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 min-w-[240px] space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 font-bold uppercase">Progresso de Conclusão:</span>
              <span className="text-cyan-400 font-black">{progressPercent}%</span>
            </div>

            {/* Smooth Progress Bar */}
            <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
              <span>{completedCount} de {totalLessons} Aulas Concluídas</span>
              {completedCount > 0 && (
                <span className="text-emerald-400 flex items-center gap-1 font-bold">
                  <Check className="w-3 h-3" />
                  Salvo Localmente
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action bar below header: mode toggle and back to series button */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-5 mt-5 border-t border-slate-800/80 text-xs font-mono">
          <button
            type="button"
            onClick={onBackToSeriesSelect}
            className="text-slate-400 hover:text-white transition flex items-center gap-1.5 cursor-pointer"
          >
            ← Selecionar Outra Série Escolar
          </button>

          <button
            type="button"
            onClick={() => setFreeMode(!freeMode)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition cursor-pointer ${
              freeMode
                ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300'
                : 'bg-slate-900 border-slate-700 text-slate-400'
            }`}
            title="Alternar entre modo livre (todas aulas acessíveis) e modo progressivo"
          >
            {freeMode ? <Unlock className="w-3.5 h-3.5 text-cyan-400" /> : <Lock className="w-3.5 h-3.5 text-amber-400" />}
            <span>{freeMode ? 'Modo Livre (Acesso Direto)' : 'Modo Sequencial'}</span>
          </button>
        </div>
      </section>

      {/* ----------------------------------------------------
          2. PEDAGOGICAL MASTERY BADGES (ZERO RANKING)
         ---------------------------------------------------- */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Badge Mod 1 */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            mod1Completed
              ? 'bg-amber-950/30 border-amber-500/60 text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.2)]'
              : 'bg-slate-900/60 border-slate-800/80 text-slate-500 opacity-70'
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

        {/* Badge Mod 2 */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            mod2Completed
              ? 'bg-cyan-950/30 border-cyan-500/60 text-cyan-200 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
              : 'bg-slate-900/60 border-slate-800/80 text-slate-500 opacity-70'
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

        {/* Badge Mod 3 */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            mod3Completed
              ? 'bg-emerald-950/30 border-emerald-500/60 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
              : 'bg-slate-900/60 border-slate-800/80 text-slate-500 opacity-70'
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

        {/* Badge Final */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            allCompleted
              ? 'bg-yellow-950/40 border-yellow-400 text-yellow-200 shadow-[0_0_20px_rgba(250,204,21,0.3)]'
              : 'bg-slate-900/60 border-slate-800/80 text-slate-500 opacity-70'
          }`}
        >
          <div className="text-2xl mb-1.5">{allCompleted ? '🏆' : '🔒'}</div>
          <span className="text-xs font-bold block text-white font-['Oxanium',sans-serif]">
            Coroa do 4º Bimestre
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">
            24 Aulas Dominadas
          </span>
        </div>
      </section>

      {/* ----------------------------------------------------
          3. MODULE FILTER TABS
         ---------------------------------------------------- */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800">
        <button
          type="button"
          onClick={() => setActiveModuleFilter('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeModuleFilter === 'all'
              ? 'bg-cyan-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Todas as 24 Aulas ({totalLessons})
        </button>

        <button
          type="button"
          onClick={() => setActiveModuleFilter('mod1')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeModuleFilter === 'mod1'
              ? 'bg-sky-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Módulo 1: Grandezas & Proporções (Aulas 1 a 8)
        </button>

        <button
          type="button"
          onClick={() => setActiveModuleFilter('mod2')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeModuleFilter === 'mod2'
              ? 'bg-indigo-500 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Módulo 2: Estatística & Dispersão (Aulas 9 a 16)
        </button>

        <button
          type="button"
          onClick={() => setActiveModuleFilter('mod3')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeModuleFilter === 'mod3'
              ? 'bg-emerald-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Módulo 3: Geometria Plana & Áreas (Aulas 17 a 24)
        </button>
      </div>

      {/* ----------------------------------------------------
          4. 24 SEPARATED LESSON CARDS GRID (WITH ZERO OVERFLOW)
         ---------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredQuestions.map((q, idx) => {
          const aulaNum = q.aulaNumero || idx + 1;
          const completed = isLessonCompleted(q.id);
          const accessible = isLessonAccessible(aulaNum - 1);

          return (
            <div
              key={q.id}
              className={`rounded-2xl border p-5 flex flex-col justify-between transition-all duration-200 ${
                completed
                  ? 'bg-slate-900/90 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                  : accessible
                  ? 'bg-slate-900/90 border-slate-700/80 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]'
                  : 'bg-slate-950/60 border-slate-800/60 opacity-60'
              }`}
            >
              {/* Card Header: Aula Number & Status */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-500/30">
                    AULA {String(aulaNum).padStart(2, '0')}
                  </span>

                  {completed ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
                      <Check className="w-3 h-3" />
                      Concluída
                    </span>
                  ) : accessible ? (
                    <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-500/20">
                      Disponível
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400">
                      <Lock className="w-3 h-3" />
                      Bloqueada
                    </span>
                  )}
                </div>

                {/* Exact Official Lesson Theme */}
                <h3 className="text-base font-bold text-white leading-snug font-['Oxanium',sans-serif]">
                  {q.aulaTitulo || q.temaNome}
                </h3>

                {/* Short Pedagogical Presentation */}
                {q.apresentacaoTema && (
                  <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-3">
                    {q.apresentacaoTema}
                  </p>
                )}

                {/* Featured formula if available */}
                {q.formulaDestaque && (
                  <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-cyan-300 truncate">
                    {q.formulaDestaque}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-4 border-t border-slate-800/80">
                <button
                  type="button"
                  disabled={!accessible}
                  onClick={() => setSelectedQuestion(q)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer disabled:cursor-not-allowed ${
                    completed
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      : accessible
                      ? 'bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                      : 'bg-slate-800/40 text-slate-500 border border-slate-800'
                  }`}
                >
                  <span>{completed ? 'Revisar Aula' : 'Iniciar Aula'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
