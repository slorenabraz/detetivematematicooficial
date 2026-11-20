import React from 'react';
import { Question } from '../types';
import { getInvestigationHint } from '../utils/investigationHints';
import { Lightbulb, Sparkles, X, ChevronDown, BookOpen, Compass } from 'lucide-react';

interface InvestigationHintBalloonProps {
  question: Question;
  isOpen: boolean;
  onToggle: () => void;
  accentColor?: 'amber' | 'cyan' | 'emerald';
}

export const InvestigationHintBalloon: React.FC<InvestigationHintBalloonProps> = ({
  question,
  isOpen,
  onToggle,
  accentColor = 'amber'
}) => {
  const hint = getInvestigationHint(question);

  // Styling maps based on accent color
  const colorConfig = {
    amber: {
      btnBorder: 'border-amber-400/80 hover:border-amber-300',
      btnGlow: 'shadow-[0_0_16px_rgba(251,191,36,0.45)] hover:shadow-[0_0_28px_rgba(251,191,36,0.85)]',
      btnBg: 'bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 hover:text-white',
      balloonBorder: 'border-amber-400/90 shadow-[0_0_30px_rgba(251,191,36,0.4),inset_0_0_15px_rgba(251,191,36,0.12)]',
      balloonPointer: 'border-amber-400 bg-[#091226]',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      formulaBg: 'bg-[#060b18] border-amber-500/40 text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.15)]',
      iconColor: 'text-amber-400',
      titleColor: 'text-amber-300'
    },
    cyan: {
      btnBorder: 'border-cyan-400/80 hover:border-cyan-300',
      btnGlow: 'shadow-[0_0_16px_rgba(0,240,255,0.45)] hover:shadow-[0_0_28px_rgba(0,240,255,0.85)]',
      btnBg: 'bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 hover:text-white',
      balloonBorder: 'border-cyan-400/90 shadow-[0_0_30px_rgba(0,240,255,0.4),inset_0_0_15px_rgba(0,240,255,0.12)]',
      balloonPointer: 'border-cyan-400 bg-[#091226]',
      badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      formulaBg: 'bg-[#060b18] border-cyan-500/40 text-cyan-200 shadow-[0_0_15px_rgba(0,240,255,0.15)]',
      iconColor: 'text-cyan-400',
      titleColor: 'text-cyan-300'
    },
    emerald: {
      btnBorder: 'border-emerald-400/80 hover:border-emerald-300',
      btnGlow: 'shadow-[0_0_16px_rgba(16,185,129,0.45)] hover:shadow-[0_0_28px_rgba(16,185,129,0.85)]',
      btnBg: 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 hover:text-white',
      balloonBorder: 'border-emerald-400/90 shadow-[0_0_30px_rgba(16,185,129,0.4),inset_0_0_15px_rgba(16,185,129,0.12)]',
      balloonPointer: 'border-emerald-400 bg-[#091226]',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
      formulaBg: 'bg-[#060b18] border-emerald-500/40 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.15)]',
      iconColor: 'text-emerald-400',
      titleColor: 'text-emerald-300'
    }
  };

  const currentTheme = colorConfig[accentColor];

  return (
    <div className="relative w-full my-3">
      {/* 1. BUTTON TO TOGGLE INVESTIGATION HINT */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onToggle}
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border-2 text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
            currentTheme.btnBorder
          } ${currentTheme.btnBg} ${currentTheme.btnGlow} ${
            isOpen ? 'scale-102 ring-2 ring-white/20' : ''
          }`}
          aria-expanded={isOpen}
          title="Clique para abrir ou fechar a dica de investigação"
        >
          <Lightbulb className={`w-4 h-4 ${currentTheme.iconColor} ${isOpen ? 'animate-bounce' : 'animate-pulse'}`} />
          <span>{isOpen ? 'Ocultar Dica de Investigação' : 'Dica de Investigação'}</span>
          <span className="hidden sm:inline-block text-[10px] bg-black/40 px-2 py-0.5 rounded-full font-mono font-normal opacity-90">
            {hint.conceito}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && (
          <span className="text-[11px] font-mono text-cyan-300 hidden md:flex items-center gap-1.5 animate-pulse">
            <Sparkles className="w-3 h-3 text-amber-300" />
            Conceito Geométrico Ativado
          </span>
        )}
      </div>

      {/* 2. TEXT BALLOON WITH SMOOTH ANIMATION & NEON STYLING */}
      {isOpen && (
        <div className="relative mt-3.5 neon-hint-balloon-animate z-20">
          {/* Triângulo / Ponteiro do balão de fala estilo cyber HUD */}
          <div
            className={`absolute -top-2 left-6 w-4 h-4 rotate-45 border-t-2 border-l-2 ${currentTheme.balloonPointer} shadow-[0_-4px_10px_rgba(0,0,0,0.5)]`}
          />

          {/* Corpo do balão de fala */}
          <div
            className={`relative rounded-2xl p-4 sm:p-5 bg-[#091226]/95 backdrop-blur-xl border-2 ${currentTheme.balloonBorder} text-white space-y-3.5`}
          >
            {/* Cabeçalho do balão com ícones e botão de fechar */}
            <div className="flex items-start justify-between gap-3 border-b border-cyan-500/20 pb-2.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xl">🕵️‍♂️</span>
                <div>
                  <h4 className={`text-sm sm:text-base font-black ${currentTheme.titleColor} flex items-center gap-1.5`}>
                    {hint.titulo}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${currentTheme.badgeBg}`}>
                      {hint.conceito}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                      • Laboratório Geométrico
                    </span>
                  </div>
                </div>
              </div>

              {/* Botão de Fechar */}
              <button
                type="button"
                onClick={onToggle}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
                title="Fechar dica"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Explicação Conceitual */}
            <div className="space-y-1.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
              <p className="flex items-start gap-2">
                <BookOpen className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{hint.explicacao}</span>
              </p>
            </div>

            {/* Caixa de Fórmula / Conceito em Destaque Neon */}
            {hint.formula && (
              <div className={`p-3 rounded-xl border font-mono text-xs sm:text-sm ${currentTheme.formulaBg}`}>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 flex items-center gap-1">
                  <Compass className="w-3 h-3 text-cyan-400" />
                  Relação / Fórmula Fundamental:
                </div>
                <div className="font-extrabold whitespace-pre-wrap leading-relaxed">
                  {hint.formula}
                </div>
              </div>
            )}

            {/* Dica Prática de Investigação */}
            <div className="bg-[#0e1b38]/80 border border-cyan-400/30 p-3 rounded-xl flex items-start gap-2.5">
              <span className="text-base shrink-0">💡</span>
              <div className="text-xs text-cyan-100 leading-relaxed">
                <strong className="text-cyan-300">Pista do Detetive:</strong> {hint.dicaPratica}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
