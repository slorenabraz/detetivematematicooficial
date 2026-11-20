import React from 'react';
import { Target, GraduationCap, CheckCircle2 } from 'lucide-react';

interface StageMarker {
  id: number;
  label: string;
  subLabel?: string;
  itemsRange: string;
}

interface NeonChallengeProgressBarProps {
  mode: 'oficial' | 'treine_mais';
  currentResolved: number;
  totalItems: number;
  currentStageNumber?: number; // 1 to 4 for oficial
  currentLevelIndex?: number; // 0, 1, 2 for treine mais (Iniciante, Intermediário, Avançado)
  accentColor?: 'cyan' | 'amber' | 'emerald';
}

export const NeonChallengeProgressBar: React.FC<NeonChallengeProgressBarProps> = ({
  mode,
  currentResolved,
  totalItems,
  currentStageNumber = 1,
  currentLevelIndex = 0,
  accentColor = 'cyan'
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((currentResolved / totalItems) * 100)));

  // Stages definition for Desafios Oficiais (4 etapas, 2 questões cada = 8 total)
  const officialStages: StageMarker[] = [
    { id: 1, label: 'Etapa 1', subLabel: 'Pitágoras', itemsRange: 'Q1-Q2' },
    { id: 2, label: 'Etapa 2', subLabel: 'Senos', itemsRange: 'Q3-Q4' },
    { id: 3, label: 'Etapa 3', subLabel: 'Cossenos', itemsRange: 'Q5-Q6' },
    { id: 4, label: 'Etapa 4', subLabel: 'Semelhança', itemsRange: 'Q7-Q8' }
  ];

  // Levels definition for Treine Mais (3 níveis, 5 questões cada = 15 total)
  const practiceLevels: StageMarker[] = [
    { id: 1, label: 'Nível 1', subLabel: 'Iniciante', itemsRange: 'Q1-Q5' },
    { id: 2, label: 'Nível 2', subLabel: 'Intermediário', itemsRange: 'Q6-Q10' },
    { id: 3, label: 'Nível 3', subLabel: 'Avançado', itemsRange: 'Q11-Q15' }
  ];

  const markers = mode === 'oficial' ? officialStages : practiceLevels;

  return (
    <div className="w-full bg-[#080d1e]/90 backdrop-blur-md border-2 border-cyan-500/40 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-[0_0_25px_rgba(0,240,255,0.2)] space-y-3 relative overflow-hidden">
      {/* Decorative neon ambient background glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Row: Mode Title & Resolved Counter with Neon Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 relative z-10">
        <div className="flex items-center gap-2">
          {mode === 'oficial' ? (
            <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-400/60 flex items-center justify-center text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.3)]">
              <Target className="w-4 h-4" />
            </div>
          ) : (
            <div className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-400/60 flex items-center justify-center text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
              <GraduationCap className="w-4 h-4" />
            </div>
          )}
          <div>
            <span className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider text-cyan-300">
              {mode === 'oficial' ? 'Progresso dos Desafios Oficiais' : 'Progresso do Treine Mais'}
            </span>
            <div className="text-[11px] sm:text-xs text-slate-300 font-semibold flex items-center gap-1.5">
              <span>{mode === 'oficial' ? 'Investigação em 4 Etapas' : 'Trigonometria em 3 Níveis'}</span>
            </div>
          </div>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-2">
          <div className="bg-[#050914] border border-cyan-400/50 px-3 py-1 rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.25)] flex items-center gap-2">
            <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-bold tracking-wider">
              Resolvidos:
            </span>
            <span className="text-xs sm:text-sm font-black font-mono text-cyan-300">
              {currentResolved} <span className="text-slate-500">/</span> {totalItems}
            </span>
            <span className="text-[10px] sm:text-xs font-black font-mono bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 px-1.5 py-0.5 rounded-md shadow-[0_0_8px_rgba(0,240,255,0.4)]">
              {percentage}%
            </span>
          </div>
        </div>
      </div>

      {/* Visual Neon Bar Container */}
      <div className="relative pt-1">
        <div className="h-3 sm:h-3.5 bg-[#040711] rounded-full border border-cyan-500/50 p-0.5 overflow-hidden shadow-[inset_0_0_12px_rgba(0,0,0,0.9),0_0_10px_rgba(0,240,255,0.15)] relative">
          {/* Animated Gradient Progress Fill */}
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out relative ${
              mode === 'oficial'
                ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-cyan-400 shadow-[0_0_18px_rgba(251,191,36,0.9)]'
                : 'bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 shadow-[0_0_18px_rgba(16,185,129,0.9)]'
            }`}
            style={{ width: `${Math.max(percentage, currentResolved > 0 ? 5 : 2)}%` }}
          >
            {/* Luminous Leading Edge Glow Thumb */}
            {percentage > 0 && (
              <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-white rounded-full shadow-[0_0_12px_#ffffff,0_0_20px_#00f0ff] animate-pulse" />
            )}
          </div>
        </div>
      </div>

      {/* Step Segments / Checkpoint Markers */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2 pt-1" style={{ gridTemplateColumns: `repeat(${markers.length}, minmax(0, 1fr))` }}>
        {markers.map((marker, idx) => {
          const isCompleted = mode === 'oficial'
            ? currentResolved >= (idx + 1) * 2
            : currentResolved >= (idx + 1) * 5;

          const isCurrent = mode === 'oficial'
            ? currentStageNumber === marker.id
            : currentLevelIndex === idx;

          return (
            <div
              key={marker.id}
              className={`rounded-xl p-1.5 sm:p-2 text-center border transition-all duration-300 ${
                isCurrent
                  ? 'bg-cyan-950/60 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(0,240,255,0.35)] scale-102 ring-1 ring-cyan-400/50'
                  : isCompleted
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                  : 'bg-[#050814]/60 border-cyan-500/20 text-slate-400 opacity-75'
              }`}
            >
              <div className="flex items-center justify-center gap-1 text-[10px] sm:text-xs font-black uppercase tracking-wider">
                {isCompleted ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 inline-block" />
                )}
                <span className="truncate">{marker.label}</span>
              </div>
              <div className="text-[9px] sm:text-[10px] font-mono text-slate-300 truncate mt-0.5">
                {marker.subLabel} <span className="text-slate-500 hidden sm:inline">({marker.itemsRange})</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
