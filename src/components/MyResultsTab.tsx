import React, { useState, useMemo, useEffect } from 'react';
import { User } from '../types';
import { Storage } from '../utils/storage';
import {
  TrendingUp,
  Award,
  Target,
  Calendar,
  CheckCircle2,
  XCircle,
  GraduationCap,
  Brain,
  Lightbulb,
  Sparkles,
  ArrowRight,
  BookOpen,
  Compass
} from 'lucide-react';

interface MyResultsTabProps {
  currentUser: User | null;
  onOpenAuth: () => void;
  onNavigate: (page: string) => void;
}

export const MyResultsTab: React.FC<MyResultsTabProps> = ({
  currentUser,
  onOpenAuth,
  onNavigate
}) => {
  const [activeModule, setActiveModule] = useState<'oficial' | 'curriculo'>('oficial');
  const [version, setVersion] = useState(0);

  // Subscribe to real-time updates from Firestore / LocalStorage
  useEffect(() => {
    const unsubscribe = Storage.subscribe(() => {
      setVersion((v) => v + 1);
    });
    return unsubscribe;
  }, []);

  // Filter results by module
  const officialResults = useMemo(() => {
    if (!currentUser) return [];
    return Storage.getResults()
      .filter((r) => r.usuarioId === currentUser.id && (r.modo === 'oficial' || !r.modo))
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [currentUser, version]);

  const curriculoResults = useMemo(() => {
    if (!currentUser) return [];
    return Storage.getResults()
      .filter((r) => r.usuarioId === currentUser.id && r.modo === 'curriculo_acao')
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [currentUser, version]);

  const curriculoAttempts = useMemo(() => {
    if (!currentUser) return [];
    return Storage.getAttempts()
      .filter((a) => a.usuarioId === currentUser.id && a.modo === 'curriculo_acao')
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [currentUser, version]);

  const officialAttempts = useMemo(() => {
    if (!currentUser) return [];
    return Storage.getAttempts()
      .filter((a) => a.usuarioId === currentUser.id && (a.modo === 'oficial' || !a.modo))
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [currentUser, version]);

  // Curriculo em Ação Diagnostic
  const curriculoDiagnostic = useMemo(() => {
    if (!currentUser) return null;
    return Storage.getCurriculoAcaoDiagnostic(currentUser.id);
  }, [currentUser, version]);

  if (!currentUser) {
    return (
      <div className="bg-[#0b1329]/80 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-[0_0_30px_rgba(0,240,255,0.15)] border border-cyan-500/30 text-center max-w-xl mx-auto space-y-6">
        <div className="w-16 h-16 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-3xl flex items-center justify-center text-3xl mx-auto shadow-sm">
          🔍
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-white">
            Histórico Pessoal de Desempenho
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Faça login para acompanhar suas estatísticas, diagnóstico do Currículo em Ação e histórico de desafios completados!
          </p>
        </div>
        <button
          onClick={onOpenAuth}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black px-8 py-3.5 rounded-2xl transition shadow-[0_0_20px_rgba(0,240,255,0.4)] inline-flex items-center gap-2 text-sm cursor-pointer"
        >
          Fazer Login Agora
        </button>
      </div>
    );
  }

  // Official stats calculation
  const totalOficialAcertos = officialResults.reduce((acc, r) => acc + r.acertos, 0);
  const totalOficialErros = officialResults.reduce((acc, r) => acc + r.erros, 0);
  const totalOficialQuestoes = totalOficialAcertos + totalOficialErros;
  const aproveitamentoOficial = totalOficialQuestoes > 0 ? Math.round((totalOficialAcertos / totalOficialQuestoes) * 100) : 0;
  const tempoMedioOficial =
    officialAttempts.length > 0
      ? Math.round(
          officialAttempts.reduce((acc, a) => acc + (a.tempoGastoSegundos || 20), 0) / officialAttempts.length
        )
      : 25;

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fadeIn">
      {/* Banner */}
      <div className="bg-[#0b1329]/90 border border-cyan-500/30 text-white p-6 sm:p-8 rounded-3xl shadow-[0_0_25px_rgba(0,240,255,0.15)] backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
            Histórico Individual do Aluno
          </span>
          <h2 className="text-2xl sm:text-3xl font-black flex items-center justify-center sm:justify-start gap-2.5">
            <TrendingUp className="w-8 h-8 text-emerald-400" /> Meus Resultados e Diagnóstico
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
            Detetive <strong className="text-cyan-300">{currentUser.nome}</strong> ({currentUser.serie})
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeModule === 'curriculo' ? (
            <button
              onClick={() => onNavigate('curriculo')}
              className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:to-amber-500 text-slate-950 font-black px-5 py-3 rounded-2xl border-2 border-orange-300/80 neon-glow-btn-orange transition text-xs sm:text-sm flex items-center gap-2 shrink-0 cursor-pointer shadow-[0_0_20px_rgba(249,115,22,0.4)]"
            >
              <GraduationCap className="w-4 h-4 fill-slate-950" /> Praticar Currículo em Ação
            </button>
          ) : (
            <button
              onClick={() => onNavigate('desafios')}
              className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black px-5 py-3 rounded-2xl border-2 border-amber-300/80 neon-glow-btn-amber transition text-xs sm:text-sm flex items-center gap-2 shrink-0 cursor-pointer shadow-[0_0_20px_rgba(251,191,36,0.4)]"
            >
              <Target className="w-4 h-4 fill-slate-950" /> Jogar Novo Desafio
            </button>
          )}
        </div>
      </div>

      {/* Module Selector (Desafios Oficiais vs Currículo em Ação) */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 p-2 bg-[#050813] rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveModule('oficial')}
          className={`w-full sm:w-auto px-6 py-3 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
            activeModule === 'oficial'
              ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-[0_0_25px_rgba(0,240,255,0.7)] scale-102 border border-cyan-200'
              : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-900 border border-transparent'
          }`}
        >
          <Target className="w-4 h-4" /> DESAFIOS OFICIAIS ({officialResults.length})
        </button>

        <button
          onClick={() => setActiveModule('curriculo')}
          className={`w-full sm:w-auto px-6 py-3 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
            activeModule === 'curriculo'
              ? 'bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 text-slate-950 shadow-[0_0_25px_rgba(249,115,22,0.7)] scale-102 border border-orange-200'
              : 'text-slate-400 hover:text-orange-300 hover:bg-slate-900 border border-transparent'
          }`}
        >
          <GraduationCap className="w-4 h-4" /> CURRÍCULO EM AÇÃO ({curriculoResults.length})
        </button>
      </div>

      {/* =========================================================================
          TAB 1: CURRÍCULO EM AÇÃO VIEW (DIAGNOSTIC, WHERE MADE MISTAKES, IMPROVEMENTS, MOTIVATION)
         ========================================================================= */}
      {activeModule === 'curriculo' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Pedagogical Diagnostic Card */}
          <div className="rounded-3xl bg-gradient-to-b from-[#0e172a] via-[#091024] to-[#050813] border-2 border-orange-500/50 p-6 sm:p-8 shadow-[0_0_30px_rgba(249,115,22,0.2)] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-orange-950 border border-orange-500/60 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                  🧠
                </div>
                <div>
                  <h3 className="text-xl font-black text-white font-['Oxanium',sans-serif]">
                    DIAGNÓSTICO FORMATIVO // CURRÍCULO EM AÇÃO
                  </h3>
                  <p className="text-xs text-orange-400 font-mono">
                    Análise pedagógica para orientar seus estudos e fortalecer seus pontos de atenção
                  </p>
                </div>
              </div>

              <span className="self-start sm:self-center px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300">
                {curriculoDiagnostic?.totalTentativas || 0} questões respondidas
              </span>
            </div>

            {/* Diagnostic Grid: Onde mais errou vs Onde mais acertou vs O que melhorar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Onde mais errou */}
              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/40 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase font-mono">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>Onde Teve Mais Dificuldade</span>
                </div>
                <p className="text-sm font-black text-white">
                  {curriculoDiagnostic?.ondeMaisErrou || 'Sem registros de erro'}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Ponto de atenção para revisar conceitos, fórmulas e interpretações de figuras.
                </p>
              </div>

              {/* Onde mais acertou */}
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase font-mono">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Ponto Forte de Aprendizagem</span>
                </div>
                <p className="text-sm font-black text-white">
                  {curriculoDiagnostic?.ondeMaisAcertou || 'Pratique para identificar seus pontos fortes'}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Competências em que seu raciocínio investigativo funcionou com alta precisão!
                </p>
              </div>

              {/* No que pode ser melhorado */}
              <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/40 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase font-mono">
                  <Lightbulb className="w-4 h-4 shrink-0" />
                  <span>Plano de Melhoria</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {curriculoDiagnostic?.oqueMelhorar || 'Resolva as 15 questões da sua série para gerar sugestões de estudo!'}
                </p>
              </div>
            </div>

            {/* Encouraging Message to Maintain Focus */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-orange-950/40 via-amber-950/30 to-orange-950/40 border border-orange-500/40 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-400 flex items-center justify-center shrink-0 text-xl text-orange-300">
                ✨
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                    Mensagem de Foco &amp; Incentivo • Profª Ariane Braz
                  </span>
                </div>
                <p className="text-sm text-slate-100 font-medium leading-relaxed">
                  "{curriculoDiagnostic?.mensagemIncentivo}"
                </p>
              </div>
            </div>
          </div>

          {/* KPI Cards for Curriculo */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#0b1329]/80 backdrop-blur-xl p-5 rounded-3xl border border-orange-500/30 shadow-md text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Séries Testadas</span>
              <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                {curriculoResults.length}
              </span>
            </div>

            <div className="bg-[#0b1329]/80 backdrop-blur-xl p-5 rounded-3xl border border-orange-500/30 shadow-md text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Questões Certas</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                {curriculoDiagnostic?.totalAcertos || 0}
              </span>
            </div>

            <div className="bg-[#0b1329]/80 backdrop-blur-xl p-5 rounded-3xl border border-orange-500/30 shadow-md text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Questões Erradas</span>
              <span className="text-2xl sm:text-3xl font-black text-rose-400 font-mono">
                {curriculoDiagnostic?.totalErros || 0}
              </span>
            </div>

            <div className="bg-[#0b1329]/80 backdrop-blur-xl p-5 rounded-3xl border border-orange-500/30 shadow-md text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Aproveitamento</span>
              <span className="text-2xl sm:text-3xl font-black text-orange-400 font-mono">
                {curriculoDiagnostic?.aproveitamento || 0}%
              </span>
            </div>
          </div>

          {/* History of Curriculo Sessions */}
          <div className="bg-[#0b1329]/80 backdrop-blur-xl rounded-3xl shadow-xl border border-orange-500/30 overflow-hidden space-y-4">
            <div className="p-6 border-b border-orange-500/20 flex items-center justify-between">
              <h3 className="font-black text-lg text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-orange-400" /> Séries do Currículo em Ação Concluídas
              </h3>
              <span className="text-xs text-orange-300 font-mono">
                {curriculoResults.length} sessão(ões)
              </span>
            </div>

            {curriculoResults.length === 0 ? (
              <div className="p-12 text-center text-slate-400 space-y-4">
                <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-base font-bold text-slate-300">Nenhum teste do Currículo em Ação realizado ainda</p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Acesse a aba Currículo em Ação, selecione sua série e responda às 15 questões investigativas para registrar seu diagnóstico!
                </p>
                <button
                  onClick={() => onNavigate('curriculo')}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                >
                  <span>Iniciar Teste da Minha Série</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-800">
                {curriculoResults.map((r) => (
                  <div
                    key={r.id}
                    className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-orange-950/20 transition"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-white text-sm sm:text-base">
                          {r.serie} • Currículo em Ação
                        </span>
                        <span className="text-[10px] font-bold text-orange-300 bg-orange-950 px-2 py-0.5 rounded-full border border-orange-500/40 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {r.data}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 block">
                        Total de 15 questões investigativas integradas ao Material Digital do 4º Bimestre de SP
                      </span>
                    </div>

                    <div className="flex items-center gap-6 self-end sm:self-center">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Acertos / Erros</span>
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold font-mono">
                          <span className="text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> {r.acertos}
                          </span>
                          <span className="text-rose-400 flex items-center gap-1">
                            <XCircle className="w-4 h-4" /> {r.erros}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Aproveitamento</span>
                        <span className="text-xs font-bold text-orange-300 bg-orange-950/60 border border-orange-500/40 px-3 py-1 rounded-full inline-block font-mono">
                          {Math.round((r.acertos / ((r.acertos + r.erros) || 15)) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: DESAFIOS OFICIAIS VIEW
         ========================================================================= */}
      {activeModule === 'oficial' && (
        <div className="space-y-6 animate-fadeIn">
          {/* KPI Cards for Official */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#0b1329]/80 backdrop-blur-xl p-5 rounded-3xl border border-cyan-500/30 shadow-md text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Desafios Concluídos</span>
              <span className="text-2xl sm:text-3xl font-black text-white font-mono">{officialResults.length}</span>
            </div>

            <div className="bg-[#0b1329]/80 backdrop-blur-xl p-5 rounded-3xl border border-cyan-500/30 shadow-md text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Total de Acertos</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">{totalOficialAcertos}</span>
            </div>

            <div className="bg-[#0b1329]/80 backdrop-blur-xl p-5 rounded-3xl border border-cyan-500/30 shadow-md text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Taxa de Precisão</span>
              <span className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono">{aproveitamentoOficial}%</span>
            </div>

            <div className="bg-[#0b1329]/80 backdrop-blur-xl p-5 rounded-3xl border border-cyan-500/30 shadow-md text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Tempo Médio p/ Questão</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">{tempoMedioOficial}s</span>
            </div>
          </div>

          {/* History List */}
          <div className="bg-[#0b1329]/80 backdrop-blur-xl rounded-3xl shadow-xl border border-cyan-500/30 overflow-hidden space-y-4">
            <div className="p-6 border-b border-cyan-500/20 flex items-center justify-between">
              <h3 className="font-black text-lg text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" /> Registro de Desafios Oficiais Concluídos
              </h3>
              <span className="text-xs text-cyan-300 font-mono">
                {officialResults.length} registro(s)
              </span>
            </div>

            {officialResults.length === 0 ? (
              <div className="p-12 text-center text-slate-400 space-y-2">
                <Target className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-base font-bold text-slate-300">Você ainda não concluiu nenhum Desafio Oficial</p>
                <p className="text-xs text-slate-500">
                  Acesse a aba Desafios e inicie sua investigação matemática para registrar pontuações no ranking!
                </p>
              </div>
            ) : (
              <div className="divide-y divide-cyan-500/10">
                {officialResults.map((r) => (
                  <div
                    key={r.id}
                    className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-cyan-950/20 transition"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-white text-sm sm:text-base">
                          {r.etapaNome}
                        </span>
                        <span className="text-[10px] font-bold text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded-full border border-cyan-500/40 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {r.data}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 block">
                        Série: {r.serie} • Tempo médio: {r.tempoMedioPorQuestao || 25}s por questão
                      </span>
                    </div>

                    <div className="flex items-center gap-6 self-end sm:self-center">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Resultado</span>
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold font-mono">
                          <span className="text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> {r.acertos}
                          </span>
                          <span className="text-rose-400 flex items-center gap-1">
                            <XCircle className="w-4 h-4" /> {r.erros}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Status</span>
                        <span className="text-xs font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 rounded-full inline-block">
                          Concluído
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
