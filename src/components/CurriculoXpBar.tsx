import React, { useEffect, useRef } from 'react';
import { Zap, Trophy, Award, Sparkles, Flame, CheckCircle2 } from 'lucide-react';

interface CurriculoXpBarProps {
  currentResolved: number; // 0 to 10/15
  totalItems?: number; // default 10
  acertos: number;
  serie: string;
  on100PercentReached?: () => void;
  streak?: number;
  streakMultiplier?: number;
  currentXp?: number;
  maxXp?: number;
}

export const CurriculoXpBar: React.FC<CurriculoXpBarProps> = ({
  currentResolved,
  totalItems = 10,
  acertos,
  serie,
  on100PercentReached,
  streak = 0,
  streakMultiplier = 1.0,
  currentXp: customXp,
  maxXp: customMaxXp
}) => {
  // Don't render the XP bar for 3º Ano Ensino Médio as per user request
  if (serie === '3º Ano Ensino Médio' || serie.includes('3º Ano') || serie.startsWith('3º')) {
    return null;
  }

  const percentage = Math.min(100, Math.max(0, Math.round((currentResolved / totalItems) * 100)));
  const currentXp = customXp !== undefined ? customXp : currentResolved * 100;
  const maxXp = customMaxXp !== undefined ? customMaxXp : totalItems * 100;
  const isComplete = currentResolved >= totalItems;
  const hasTriggered100Ref = useRef(false);

  useEffect(() => {
    if (isComplete && !hasTriggered100Ref.current) {
      hasTriggered100Ref.current = true;
      if (on100PercentReached) {
        on100PercentReached();
      }
    } else if (!isComplete) {
      hasTriggered100Ref.current = false;
    }
  }, [isComplete, on100PercentReached]);

  // Level determination based on progress (proportional to totalItems)
  let levelTitle = 'NÍVEL 1 • DETETIVE APRENDIZ';
  let levelBadgeBg = 'bg-amber-950/60 border-amber-500/40 text-amber-300';

  if (isComplete) {
    levelTitle = 'NÍVEL MÁXIMO • MESTRE DO 4º BIMESTRE';
    levelBadgeBg = 'bg-gradient-to-r from-amber-500/30 via-yellow-500/30 to-emerald-500/30 border-yellow-400 text-yellow-200';
  } else if (currentResolved >= Math.ceil(totalItems * 0.66)) {
    levelTitle = 'NÍVEL 3 • DETETIVE PERITO';
    levelBadgeBg = 'bg-orange-950/60 border-orange-500/40 text-orange-300';
  } else if (currentResolved >= Math.ceil(totalItems * 0.33)) {
    levelTitle = 'NÍVEL 2 • DETETIVE INVESTIGADOR';
    levelBadgeBg = 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300';
  }

  return (
    <div className="w-full bg-[#080d1d] border-2 border-orange-500/40 rounded-2xl p-4 sm:p-5 shadow-[0_0_25px_rgba(249,115,22,0.25)] relative overflow-hidden">
      {/* Background cyber radial glow */}
      <div className="absolute top-0 right-1/4 w-72 h-32 bg-orange-500/10 blur-3xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 relative z-10">
        <div className="flex items-center gap-2.5 flex-wrap min-w-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 shadow-[0_0_15px_rgba(249,115,22,0.6)] shrink-0">
            {isComplete ? (
              <Trophy className="w-5 h-5 text-slate-950 animate-bounce" />
            ) : (
              <Zap className="w-5 h-5 text-slate-950 fill-slate-950" />
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs sm:text-sm font-black text-white font-['Oxanium',sans-serif] tracking-wider uppercase break-words">
                BARRA DE XP // {serie}
              </span>
              <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${levelBadgeBg} shrink-0`}>
                {levelTitle}
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 block truncate">
              Material Digital SP • Livro do Estudante (4º Bimestre)
            </span>
          </div>
        </div>

        {/* XP, Streak Badge and accuracy counters */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 self-start sm:self-center">
          {/* BADGE DE SEQUÊNCIA DE ACERTOS (SEM MENÇÃO A MULTIPLICADOR) */}
          {streak > 1 && (
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-black border transition-all duration-300 shadow-md ${
                streak >= 5
                  ? 'bg-gradient-to-r from-amber-500/30 via-orange-500/40 to-rose-500/30 border-orange-400 text-yellow-200 shadow-[0_0_20px_rgba(249,115,22,0.6)] animate-pulse'
                  : 'bg-orange-950/80 border-orange-500/60 text-orange-200 shadow-[0_0_12px_rgba(249,115,22,0.35)]'
              }`}
              title="Sequência de acertos no treino oficial"
            >
              <Flame className={`w-4 h-4 ${streak >= 5 ? 'text-yellow-300 animate-bounce' : 'text-orange-400'}`} />
              <span>{streak} acertos seguidos</span>
            </div>
          )}

          <div className="text-right">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">
              Progresso
            </span>
            <span className="text-xs sm:text-sm font-mono font-black text-orange-400">
              {currentResolved}/{totalItems} resolvidas
            </span>
          </div>

          <div className="bg-[#040711] px-3.5 py-1.5 rounded-xl border border-orange-500/40 shadow-inner text-right shrink-0">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">XP Acumulado</span>
            <div className="flex items-center gap-1 font-mono font-black text-sm sm:text-base text-yellow-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentXp}</span>
              <span className="text-xs text-slate-500 font-normal">/ {maxXp} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main XP Progress Bar */}
      <div className="relative w-full h-5 sm:h-6 bg-[#040711] rounded-full p-1 border border-orange-500/50 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Fill bar */}
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden ${
            isComplete
              ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-300 shadow-[0_0_20px_rgba(251,191,36,0.9)] animate-pulse'
              : 'bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400 shadow-[0_0_15px_rgba(249,115,22,0.6)]'
          }`}
          style={{ width: `${percentage}%` }}
        >
          {/* Animated striped pattern overlay */}
          <div
            className="absolute inset-0 w-full h-full opacity-35"
            style={{
              backgroundImage:
                'linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)',
              backgroundSize: '1.2rem 1.2rem'
            }}
          />

          {/* Shimmer light bar moving across */}
          <div className="absolute top-0 bottom-0 right-0 w-4 bg-white/50 blur-[2px]" />
        </div>

        {/* 15 segmented ticks indicator */}
        <div className="absolute inset-0 flex justify-between items-center px-1 pointer-events-none">
          {Array.from({ length: totalItems }).map((_, idx) => (
            <div
              key={idx}
              className={`w-[1px] h-3 transition-colors ${
                idx < currentResolved ? 'bg-black/40' : 'bg-slate-700/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Sub-row with Milestone & Completion Banner */}
      <div className="mt-2.5 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-orange-400 font-bold">{percentage}% concluído</span>
          <span>•</span>
          <span className="text-emerald-400 flex items-center gap-1 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" /> {acertos} acerto(s)
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-slate-400">
            Pontuação: <strong className="text-yellow-300">100 XP por acerto</strong> • Resolução de Exercícios
          </span>
        </div>

        {isComplete ? (
          <div className="flex items-center gap-1.5 text-yellow-300 font-bold bg-amber-950/80 px-3 py-0.5 rounded-full border border-yellow-400 shadow-[0_0_12px_rgba(251,191,36,0.5)] animate-pulse">
            <Trophy className="w-3.5 h-3.5 text-yellow-300" />
            <span>100% CONCLUÍDO • NÍVEL MÁXIMO DE XP ATINGIDO!</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-slate-400">
            <Flame className="w-3 h-3 text-orange-400" />
            <span>
              Faltam {totalItems - currentResolved} questão(ões) para o Nível Máximo ({maxXp} XP)
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
