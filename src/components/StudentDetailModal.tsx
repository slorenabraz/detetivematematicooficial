import React from 'react';
import { QuestionAttempt } from '../types';
import { X, Clock, CheckCircle2, XCircle, BookOpen } from 'lucide-react';

interface StudentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  studentClass: string;
  attempts: QuestionAttempt[];
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  isOpen,
  onClose,
  studentName,
  studentClass,
  attempts
}) => {
  if (!isOpen) return null;

  const total = attempts.length;
  const acertos = attempts.filter((a) => a.acertou).length;
  const erros = total - acertos;
  const tempoTotal = attempts.reduce((acc, curr) => acc + (curr.tempoGastoSegundos || 20), 0);
  const tempoMedio = total > 0 ? Math.round(tempoTotal / total) : 0;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0b1329] rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-[0_0_40px_rgba(0,240,255,0.25)] border-2 border-cyan-500/40 overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#060a16] text-white flex items-center justify-between border-b border-cyan-500/30">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">
              Relatório Individual de Desempenho
            </span>
            <h3 className="text-xl sm:text-2xl font-black mt-0.5 text-white">{studentName}</h3>
            <span className="text-xs text-cyan-300 font-mono">{studentClass}</span>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-300 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview Badges */}
        <div className="p-4 sm:p-6 bg-[#070d1e] border-b border-cyan-500/20 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-[#0a142c] p-3 rounded-2xl border border-cyan-500/30">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Questões</span>
            <span className="text-xl font-black text-white font-mono">{total}</span>
          </div>
          <div className="bg-[#0a142c] p-3 rounded-2xl border border-cyan-500/30">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Acertos</span>
            <span className="text-xl font-black text-emerald-400 font-mono">{acertos}</span>
          </div>
          <div className="bg-[#0a142c] p-3 rounded-2xl border border-cyan-500/30">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Erros</span>
            <span className="text-xl font-black text-rose-400 font-mono">{erros}</span>
          </div>
          <div className="bg-[#0a142c] p-3 rounded-2xl border border-cyan-500/30">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Tempo Médio/Q</span>
            <span className="text-xl font-black text-cyan-300 font-mono">{tempoMedio}s</span>
          </div>
        </div>

        {/* Question Log List */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-grow space-y-3 bg-[#060a16]">
          <h4 className="text-xs font-black uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-cyan-400" /> Histórico de Resoluções e Tempo Gasto
          </h4>

          {attempts.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-8">
              Nenhuma tentativa de questão registrada ainda para este aluno.
            </p>
          ) : (
            attempts.map((att, idx) => (
              <div
                key={att.id || idx}
                className={`p-4 rounded-2xl border-2 space-y-2 text-xs sm:text-sm ${
                  att.acertou
                    ? 'border-emerald-500/30 bg-emerald-950/30'
                    : 'border-rose-500/30 bg-rose-950/30'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-500/10 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-cyan-200 bg-[#081226] px-2.5 py-1 rounded-xl border border-cyan-500/30 text-xs">
                      {att.temaNome}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{att.data}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-cyan-300 flex items-center gap-1 bg-[#081226] px-2.5 py-1 rounded-xl border border-cyan-500/30 text-xs font-mono">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      Ficou na questão: <strong className="text-white">{att.tempoGastoSegundos}s</strong>
                    </span>

                    {att.acertou ? (
                      <span className="text-emerald-400 font-black flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Acertou
                      </span>
                    ) : (
                      <span className="text-rose-400 font-black flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Errou
                      </span>
                    )}
                  </div>
                </div>

                <p className="font-medium text-slate-200 leading-relaxed pt-1">
                  {att.pergunta}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div className="bg-[#081226] p-2.5 rounded-xl border border-cyan-500/20">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Marcada pelo aluno:</span>
                    <span className={att.acertou ? 'text-emerald-300 font-semibold' : 'text-rose-300 font-semibold'}>
                      {att.respostaSelecionada}
                    </span>
                  </div>

                  {!att.acertou && (
                    <div className="bg-emerald-950/50 p-2.5 rounded-xl border border-emerald-500/40">
                      <span className="text-[10px] text-emerald-400 font-bold block uppercase">Resposta Correta:</span>
                      <span className="text-emerald-200 font-semibold">
                        {att.respostaCorreta}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#070d1e] border-t border-cyan-500/20 flex justify-end">
          <button
            onClick={onClose}
            className="bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 font-bold px-6 py-2.5 rounded-2xl text-xs sm:text-sm transition cursor-pointer"
          >
            Fechar Relatório
          </button>
        </div>
      </div>
    </div>
  );
};
