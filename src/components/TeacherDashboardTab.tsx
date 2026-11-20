import React, { useState, useMemo, useEffect } from 'react';
import { User, QuestionAttempt } from '../types';
import { Storage, INITIAL_SERIES } from '../utils/storage';
import { StudentDetailModal } from './StudentDetailModal';
import { TeacherComparativeChart } from './TeacherComparativeChart';
import {
  Users,
  AlertTriangle,
  Clock,
  Filter,
  BarChart3,
  Search,
  Eye,
  GraduationCap,
  Sparkles,
  BookOpen,
  Lock,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Target
} from 'lucide-react';

interface TeacherDashboardTabProps {
  currentUser: User | null;
  onOpenAuth: () => void;
}

export const TeacherDashboardTab: React.FC<TeacherDashboardTabProps> = ({
  currentUser,
  onOpenAuth
}) => {
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('todos');
  const [selectedModoFilter, setSelectedModoFilter] = useState<'todos' | 'oficial' | 'curriculo_acao' | 'treine_mais'>('curriculo_acao');
  const [searchStudent, setSearchStudent] = useState<string>('');

  // Modal inspection state
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<{
    nome: string;
    serie: string;
    tentativas: QuestionAttempt[];
  } | null>(null);

  // Allow teachers and administrators to access pedagogical analytics
  const isTeacher = currentUser?.tipo === 'professor' || currentUser?.tipo === 'admin';

  const [version, setVersion] = useState(0);

  // Subscribe to real-time updates from Firestore
  useEffect(() => {
    const unsubscribe = Storage.subscribe(() => {
      setVersion((v) => v + 1);
    });
    return unsubscribe;
  }, []);

  // Retrieve teacher analytics filtered by class and by module!
  const studentAnalytics = useMemo(() => {
    return Storage.getTeacherStudentAnalytics(selectedClassFilter, selectedModoFilter);
  }, [selectedClassFilter, selectedModoFilter, version]);

  const themeOverview = useMemo(() => {
    return Storage.getTeacherThemeOverview(selectedClassFilter, selectedModoFilter);
  }, [selectedClassFilter, selectedModoFilter, version]);

  const filteredStudents = useMemo(() => {
    if (!searchStudent.trim()) return studentAnalytics;
    const q = searchStudent.toLowerCase();
    return studentAnalytics.filter(
      (s) => s.nome.toLowerCase().includes(q) || s.serie.toLowerCase().includes(q)
    );
  }, [studentAnalytics, searchStudent]);

  const registeredTeachers = useMemo(() => {
    return Storage.getUsers().filter((u) => {
      if (u.tipo !== 'professor') return false;
      const emailNorm = (u.email || '').trim().toLowerCase();
      if (u.id === 'prof-ariane-braz' || emailNorm === 'arianebraz3@gmail.com') return false;
      return true;
    });
  }, [version]);

  // Comparative data synchronized with selectedClassFilter (Turma / Série)
  const comparativeData = useMemo(() => {
    return Storage.getComparativeStudentData(selectedClassFilter);
  }, [selectedClassFilter, version]);

  const handleInspectStudentByName = (name: string) => {
    const attempts = Storage.getAttempts().filter((a) => {
      if (a.alunoNome.toLowerCase() !== name.toLowerCase()) return false;
      if (selectedClassFilter !== 'todos' && a.serie && a.serie !== selectedClassFilter) return false;
      return true;
    });
    const user = Storage.getUsers().find(
      (u) => u.nome.toLowerCase() === name.toLowerCase()
    );
    setSelectedStudentForModal({
      nome: name,
      serie: user?.serie || (selectedClassFilter !== 'todos' ? selectedClassFilter : 'Série Escolar'),
      tentativas: attempts
    });
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-fadeIn">
      {/* Detail Modal */}
      {selectedStudentForModal && (
        <StudentDetailModal
          isOpen={!!selectedStudentForModal}
          onClose={() => setSelectedStudentForModal(null)}
          studentName={selectedStudentForModal.nome}
          studentClass={selectedStudentForModal.serie}
          attempts={selectedStudentForModal.tentativas}
        />
      )}

      {/* Header Banner - Cyber Dark HUD */}
      <div className="bg-[#0b1329]/90 border border-cyan-500/30 text-white p-6 sm:p-8 rounded-3xl shadow-[0_0_25px_rgba(0,240,255,0.15)] backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <span className="bg-amber-500/20 text-amber-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-block border border-amber-500/40 shadow-[0_0_10px_rgba(251,191,36,0.2)]">
            Módulo de Gestão Pedagógica
          </span>
          <h2 className="text-2xl sm:text-3xl font-black flex items-center justify-center sm:justify-start gap-2.5">
            <Users className="w-8 h-8 text-cyan-400" /> Painel Analítico dos Professores
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
            Acompanhe o <strong className="text-cyan-300">tempo dedicado às perguntas</strong>, diagnostique os <strong className="text-rose-400">erros mais frequentes</strong> e identifique os <strong className="text-emerald-400">acertos consolidados</strong> para intervenções pedagógicas orientadas.
          </p>
        </div>

        {isTeacher && (
          <div className="bg-[#060a16] px-5 py-3.5 rounded-2xl border border-cyan-500/40 text-center sm:text-right shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <span className="text-[11px] text-cyan-300 font-bold block uppercase tracking-wide">
              {currentUser?.tipo === 'admin' ? 'Administrador Conectado' : 'Docente Conectado'}
            </span>
            <span className="text-base sm:text-lg font-black text-amber-300">
              {currentUser?.nome || 'Docente'}
            </span>
          </div>
        )}
      </div>

      {/* If not logged in as teacher */}
      {!isTeacher ? (
        <div className="space-y-6">
          <div className="bg-[#0b1329]/90 border border-amber-500/40 p-6 sm:p-8 rounded-3xl shadow-[0_0_20px_rgba(251,191,36,0.15)] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto sm:mx-0">
                <Lock className="w-6 h-6 text-amber-400" />
              </div>
              <h4 className="font-black text-white text-lg flex items-center gap-2 justify-center sm:justify-start">
                <span>Área Restrita aos Professores</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Para ter acesso aos diagnósticos por turma, intervenção pedagógica e relatórios de erros por tema, efetue login com sua conta docente institucional (@professor.educacao.sp.gov.br).
              </p>
            </div>

            <button
              onClick={onOpenAuth}
              className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black px-6 py-3.5 rounded-2xl transition shadow-[0_0_20px_rgba(251,191,36,0.4)] text-xs sm:text-sm whitespace-nowrap shrink-0 cursor-pointer"
            >
              Fazer Login Docente
            </button>
          </div>

          {/* Faculty List */}
          <div className="bg-[#0b1329]/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-xl border border-cyan-500/30 space-y-4">
            <h3 className="text-xl font-black text-cyan-300 flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" /> Corpo Docente Cadastrado na Plataforma
            </h3>
            {registeredTeachers.length === 0 ? (
              <div className="p-6 rounded-2xl bg-[#070b18] border border-cyan-500/20 text-center text-xs sm:text-sm text-slate-400">
                Nenhum professor cadastrado na plataforma no momento.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {registeredTeachers.map((prof) => (
                  <div
                    key={prof.id}
                    className="p-4 bg-[#070b18] rounded-2xl border border-cyan-500/20 flex items-center gap-3 hover:border-cyan-400/50 transition shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 flex items-center justify-center font-black text-lg shadow-sm">
                      {prof.nome.charAt(0)}
                    </div>
                    <div>
                      <h5 className="font-extrabold text-white text-sm">{prof.nome}</h5>
                      <span className="text-[11px] text-slate-400 font-mono block truncate max-w-[200px]">
                        {prof.email}
                      </span>
                      <span className="text-[10px] text-blue-300 bg-blue-500/20 border border-blue-400/50 shadow-[0_0_10px_rgba(59,130,246,0.3)] px-2.5 py-0.5 rounded-full font-bold inline-block mt-1">
                        Ministra: {prof.materia || 'Matemática'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* FULL TEACHER DASHBOARD CONTENT (WHEN TEACHER IS LOGGED IN) */
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Module Selector (Separating Currículo em Ação from other modules) */}
          <div className="bg-[#050813] p-2 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedModoFilter('curriculo_acao')}
              className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                selectedModoFilter === 'curriculo_acao'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-[0_0_20px_rgba(249,115,22,0.6)] scale-102 border border-orange-200'
                  : 'text-slate-400 hover:text-orange-300 hover:bg-slate-900 border border-transparent'
              }`}
            >
              <GraduationCap className="w-4 h-4" /> CURRÍCULO EM AÇÃO (4º BIMESTRE SP)
            </button>

            <button
              onClick={() => setSelectedModoFilter('oficial')}
              className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                selectedModoFilter === 'oficial'
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.6)] scale-102 border border-cyan-200'
                  : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-900 border border-transparent'
              }`}
            >
              <Target className="w-4 h-4" /> DESAFIOS OFICIAIS
            </button>

            <button
              onClick={() => setSelectedModoFilter('treine_mais')}
              className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                selectedModoFilter === 'treine_mais'
                  ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 text-slate-950 shadow-[0_0_20px_rgba(168,85,247,0.6)] scale-102 border border-purple-200'
                  : 'text-slate-400 hover:text-purple-300 hover:bg-slate-900 border border-transparent'
              }`}
            >
              <Sparkles className="w-4 h-4" /> TREINE MAIS
            </button>

            <button
              onClick={() => setSelectedModoFilter('todos')}
              className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                selectedModoFilter === 'todos'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.6)] scale-102 border border-emerald-200'
                  : 'text-slate-400 hover:text-emerald-300 hover:bg-slate-900 border border-transparent'
              }`}
            >
              <Users className="w-4 h-4" /> TODOS OS MÓDULOS
            </button>
          </div>

          {/* Top Filter and Controls */}
          <div className="bg-[#0b1329]/80 backdrop-blur-xl p-5 rounded-3xl shadow-lg border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-2 flex-grow">
              <label className="text-xs font-black text-cyan-300 uppercase flex items-center gap-1.5 shrink-0">
                <Filter className="w-4 h-4 text-cyan-400" /> Turma / Série:
              </label>
              <select
                value={selectedClassFilter}
                onChange={(e) => setSelectedClassFilter(e.target.value)}
                className="w-full sm:w-auto bg-[#070b18] border border-cyan-500/40 text-cyan-100 text-xs sm:text-sm font-bold rounded-2xl px-4 py-2.5 focus:ring-2 focus:ring-cyan-400 focus:outline-none cursor-pointer"
              >
                <option value="todos">Todas as Salas da Escola</option>
                {INITIAL_SERIES.map((serie) => (
                  <option key={serie} value={serie}>
                    {serie}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full md:w-72 relative">
              <Search className="w-4 h-4 text-cyan-400/60 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchStudent}
                onChange={(e) => setSearchStudent(e.target.value)}
                placeholder="Buscar aluno por nome..."
                className="w-full bg-[#070b18] border border-cyan-500/40 text-cyan-100 placeholder-slate-500 text-xs sm:text-sm rounded-2xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          {/* PEDAGOGICAL INTERVENTION SUMMARY CARD */}
          <div className="rounded-3xl bg-gradient-to-r from-[#0c1427] via-[#091024] to-[#0c1427] border-2 border-amber-500/50 p-6 sm:p-8 shadow-[0_0_30px_rgba(251,191,36,0.18)] space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl text-amber-300">
                📋
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white font-['Oxanium',sans-serif]">
                  RESUMO PARA INTERVENÇÃO PEDAGÓGICA // {selectedModoFilter === 'curriculo_acao' ? 'CURRÍCULO EM AÇÃO' : selectedModoFilter === 'oficial' ? 'DESAFIOS OFICIAIS' : 'VISÃO INTEGRADA'} {selectedClassFilter !== 'todos' ? `• ${selectedClassFilter}` : ''}
                </h3>
                <p className="text-xs text-amber-400 font-mono">
                  {selectedClassFilter === 'todos'
                    ? 'Direcionamento formativo baseado no cruzamento de dados de todas as séries'
                    : `Visão integrada exclusiva da turma: ${selectedClassFilter}`}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-1">
                <span className="text-[11px] font-mono font-bold text-emerald-300 uppercase flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Tema com Maior Índice de Acertos
                </span>
                <p className="text-sm font-black text-white">{themeOverview.temaMaisAcertosGeral}</p>
                <p className="text-xs text-slate-300">
                  Os estudantes demonstram assimilação adequada dos conceitos essenciais deste tópico.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/40 space-y-1">
                <span className="text-[11px] font-mono font-bold text-rose-300 uppercase flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-400" /> Tema Crítico (Mais Erros Registrados)
                </span>
                <p className="text-sm font-black text-white">{themeOverview.temaCriticoGeral}</p>
                <p className="text-xs text-slate-300">
                  Ponto de atenção imediato para recuperação paralela, aulas de reforço ou estudo em duplas.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#060a16] border border-cyan-500/30 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase">Sugestão de Encaminhamento Didático</span>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
                  {themeOverview.sugestaoIntervencao}
                </p>
              </div>
            </div>
          </div>

          {/* RECHARTS COMPARATIVE BAR CHART (SINCRONIZADO COM TURMA / SÉRIE) */}
          <TeacherComparativeChart
            comparisonData={comparativeData}
            selectedSerie={selectedClassFilter}
            onSelectSerie={setSelectedClassFilter}
            onInspectStudent={handleInspectStudentByName}
          />

          {/* KEY ANALYTICS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Tema com Mais Erros */}
            <div className="bg-gradient-to-br from-rose-950/40 to-[#0b1329] p-6 rounded-3xl border-2 border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.15)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-rose-300 uppercase tracking-wider">
                  Maior Dificuldade
                </span>
                <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-black text-rose-200">
                {themeOverview.temaCriticoGeral}
              </h3>
              <p className="text-xs text-rose-300/80 leading-relaxed">
                Prioridade para resolução coletiva no quadro com a turma.
              </p>
            </div>

            {/* 2. Tempo Médio por Questão */}
            <div className="bg-gradient-to-br from-cyan-950/40 to-[#0b1329] p-6 rounded-3xl border-2 border-cyan-500/40 shadow-[0_0_20px_rgba(0,240,255,0.15)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-cyan-300 uppercase tracking-wider">
                  Tempo Médio Investigativo
                </span>
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-3xl font-black text-cyan-100 font-mono">
                {themeOverview.tempoMedioGeralEscola}s
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Média de segundos dedicada antes da confirmação da alternativa.
              </p>
            </div>

            {/* 3. Total de Questões Resolvidas */}
            <div className="bg-gradient-to-br from-emerald-950/40 to-[#0b1329] p-6 rounded-3xl border-2 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)] space-y-2 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-emerald-300 uppercase tracking-wider">
                  Total de Resoluções
                </span>
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-3xl font-black text-emerald-200 font-mono">
                {themeOverview.totalTentativasGeral}
              </h3>
              <p className="text-xs text-emerald-300/80 leading-relaxed">
                Aproveitamento global da turma: <strong>{themeOverview.totalTentativasGeral > 0 ? Math.round((themeOverview.totalAcertosGeral / themeOverview.totalTentativasGeral) * 100) : 0}%</strong>
              </p>
            </div>
          </div>

          {/* THEMES ERROR RATE BAR CHART & DIAGNOSTIC */}
          <div className="bg-[#0b1329]/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-xl border border-cyan-500/30 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-500/20 pb-4">
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-cyan-400" /> Diagnóstico de Desempenho por Tema
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {selectedClassFilter === 'todos'
                    ? 'Taxa de erros e tempo médio apurados para o módulo selecionado'
                    : `Desempenho por tema exclusivo da turma selecionada (${selectedClassFilter})`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-orange-300 bg-orange-950/70 border border-orange-500/40 px-3 py-1 rounded-full uppercase">
                  {selectedModoFilter === 'curriculo_acao' ? 'Currículo em Ação' : selectedModoFilter === 'oficial' ? 'Desafios Oficiais' : 'Módulos Filtrados'}
                </span>
                <span className="text-xs font-bold text-cyan-300 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-500/40">
                  {selectedClassFilter === 'todos' ? 'Toda a Escola' : selectedClassFilter}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {themeOverview.temasStats.length === 0 ? (
                <p className="text-center text-slate-400 py-6 text-sm">
                  Nenhuma tentativa registrada para os filtros selecionados.
                </p>
              ) : (
                themeOverview.temasStats.map((tema) => (
                  <div key={tema.temaNome} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="font-extrabold text-slate-200 flex items-center gap-2">
                        <span className="text-cyan-400">📐</span> {tema.temaNome}
                        <span className="text-xs font-normal text-slate-400">
                          ({tema.totalErros} erros em {tema.totalRespostas} respostas • Tempo médio: {tema.tempoMedioSegundos}s)
                        </span>
                      </span>
                      <span
                        className={`font-black font-mono ${
                          tema.taxaErroPercentual >= 40
                            ? 'text-rose-400'
                            : tema.taxaErroPercentual >= 20
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        {tema.taxaErroPercentual}% de erro
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-3 bg-[#060a16] rounded-full overflow-hidden flex border border-cyan-500/20">
                      <div
                        style={{ width: `${Math.min(100, Math.max(4, tema.taxaErroPercentual))}%` }}
                        className={`h-full rounded-full transition-all duration-500 ${
                          tema.taxaErroPercentual >= 40
                            ? 'bg-gradient-to-r from-rose-600 to-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.6)]'
                            : tema.taxaErroPercentual >= 20
                            ? 'bg-gradient-to-r from-amber-600 to-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]'
                            : 'bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.6)]'
                        }`}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* DETAILED STUDENT TABLE */}
          <div className="bg-[#0b1329]/80 backdrop-blur-xl rounded-3xl shadow-xl border border-cyan-500/30 overflow-hidden space-y-4">
            <div className="p-6 border-b border-cyan-500/20 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-cyan-400" /> Relatório por Aluno no Módulo
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {selectedClassFilter === 'todos'
                    ? 'Visualize quanto tempo cada aluno ficou nas perguntas e qual tema ele teve mais erros'
                    : `Estudantes matriculados exclusivamente em ${selectedClassFilter}`}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {selectedClassFilter !== 'todos' && (
                  <span className="text-xs font-bold text-amber-300 bg-amber-950/70 border border-amber-500/40 px-3 py-1.5 rounded-full">
                    {selectedClassFilter}
                  </span>
                )}
                <span className="text-xs font-bold text-cyan-300 bg-cyan-950 border border-cyan-500/40 px-3 py-1.5 rounded-full">
                  {filteredStudents.length} aluno(s) listado(s)
                </span>
              </div>
            </div>

            {filteredStudents.length === 0 ? (
              <div className="p-12 text-center text-slate-400 space-y-2">
                <Users className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-base font-bold text-slate-300">Nenhum aluno encontrado para este filtro</p>
                <p className="text-xs text-slate-500">Altere o filtro de turma, módulo ou a busca por nome.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#070b18] text-cyan-300 font-extrabold uppercase text-[11px] border-b border-cyan-500/20">
                    <tr>
                      <th className="py-3.5 px-4 sm:px-6">Aluno</th>
                      <th className="py-3.5 px-4">Turma / Série</th>
                      <th className="py-3.5 px-4 text-center">Tempo Médio p/ Pergunta</th>
                      <th className="py-3.5 px-4">Tema com Mais Erros</th>
                      <th className="py-3.5 px-4 text-center">Acertos / Total</th>
                      <th className="py-3.5 px-4 sm:px-6 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cyan-500/10">
                    {filteredStudents.map((student) => (
                      <tr key={student.alunoId} className="hover:bg-cyan-950/30 transition">
                        <td className="py-4 px-4 sm:px-6">
                          <div className="font-extrabold text-white">
                            {student.nome}
                          </div>
                        </td>

                        <td className="py-4 px-4 text-slate-300 font-medium">
                          {student.serie}
                        </td>

                        <td className="py-4 px-4 text-center font-mono font-bold text-cyan-300">
                          <span className="inline-flex items-center gap-1.5 bg-[#060a16] text-cyan-300 px-2.5 py-1 rounded-xl border border-cyan-500/40 text-xs">
                            <Clock className="w-3.5 h-3.5 text-cyan-400" />
                            {student.tempoMedioPorPergunta > 0 ? `${student.tempoMedioPorPergunta}s` : 'N/A'}
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          <span
                            className={`inline-block text-xs font-bold px-2.5 py-1 rounded-xl border ${
                              student.temaMaisErros.includes('erro')
                                ? 'bg-rose-950/60 text-rose-300 border-rose-500/40'
                                : student.totalPerguntas > 0
                                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                                : 'bg-slate-900 text-slate-400 border-slate-700'
                            }`}
                          >
                            {student.temaMaisErros}
                          </span>
                        </td>

                        <td className="py-4 px-4 text-center font-mono font-bold">
                          <span className="text-emerald-400">{student.totalAcertos}</span> /{' '}
                          <span className="text-slate-400">{student.totalPerguntas}</span>
                        </td>

                        <td className="py-4 px-4 sm:px-6 text-right">
                          <button
                            onClick={() =>
                              setSelectedStudentForModal({
                                nome: student.nome,
                                serie: student.serie,
                                tentativas: student.tentativasDetalhes
                              })
                            }
                            className="bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 font-bold px-3.5 py-1.5 rounded-xl text-xs transition shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" /> Detalhes
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Faculty Roster */}
          <div className="bg-[#0b1329]/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-xl border border-cyan-500/30 space-y-4">
            <h3 className="text-xl font-black text-cyan-300 flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" /> Corpo Docente Cadastrado na Plataforma
            </h3>
            {registeredTeachers.length === 0 ? (
              <div className="p-6 rounded-2xl bg-[#070b18] border border-cyan-500/20 text-center text-xs sm:text-sm text-slate-400">
                Nenhum professor cadastrado na plataforma no momento.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {registeredTeachers.map((prof) => (
                  <div
                    key={prof.id}
                    className="p-4 bg-[#070b18] rounded-2xl border border-cyan-500/20 flex items-center gap-3 hover:border-cyan-400/50 transition shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 flex items-center justify-center font-black text-lg shadow-sm">
                      {prof.nome.charAt(0)}
                    </div>
                    <div>
                      <h5 className="font-extrabold text-white text-sm">{prof.nome}</h5>
                      <span className="text-[11px] text-slate-400 font-mono block truncate max-w-[200px]">
                        {prof.email}
                      </span>
                      <span className="text-[10px] text-blue-300 bg-blue-500/20 border border-blue-400/50 shadow-[0_0_10px_rgba(59,130,246,0.3)] px-2.5 py-0.5 rounded-full font-bold inline-block mt-1">
                        Ministra: {prof.materia || 'Matemática'}
                      </span>
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
