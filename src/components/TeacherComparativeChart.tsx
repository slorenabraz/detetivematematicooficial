import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';
import {
  StudentComparisonData,
  TeacherComparativeSummary
} from '../types';
import { INITIAL_SERIES } from '../utils/storage';
import {
  BarChart3,
  Filter,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  GraduationCap,
  Target,
  ArrowRight,
  Info,
  Lightbulb,
  Eye
} from 'lucide-react';

interface TeacherComparativeChartProps {
  comparisonData: {
    students: StudentComparisonData[];
    summary: TeacherComparativeSummary;
  };
  selectedSerie: string;
  onSelectSerie: (serie: string) => void;
  onInspectStudent?: (studentName: string) => void;
}

export const TeacherComparativeChart: React.FC<TeacherComparativeChartProps> = ({
  comparisonData,
  selectedSerie,
  onSelectSerie,
  onInspectStudent
}) => {
  const [metricMode, setMetricMode] = useState<'taxa' | 'acertos'>('taxa');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('todos');

  const { students, summary } = comparisonData;

  // Filter students by category if requested
  const filteredStudents = useMemo(() => {
    if (activeCategoryFilter === 'todos') return students;
    return students.filter((s) => s.categoriaIntervencao === activeCategoryFilter);
  }, [students, activeCategoryFilter]);

  // Transform data for recharts
  const chartData = useMemo(() => {
    return filteredStudents.map((s) => ({
      alunoId: s.alunoId,
      nome: s.nome,
      nomeAbrev: s.nomeAbrev,
      serie: s.serie,
      // Bar 1: Desafio Oficial
      oficial: metricMode === 'taxa' ? s.taxaOficial : s.acertosOficial,
      totalOficial: s.totalOficial,
      acertosOficial: s.acertosOficial,
      taxaOficial: s.taxaOficial,
      // Bar 2: Currículo em Ação
      curriculo: metricMode === 'taxa' ? s.taxaCurriculo : s.acertosCurriculo,
      totalCurriculo: s.totalCurriculo,
      acertosCurriculo: s.acertosCurriculo,
      taxaCurriculo: s.taxaCurriculo,
      // Diagnostic
      diferencaTaxa: s.diferencaTaxa,
      diagnostico: s.diagnosticoPedagogico,
      categoria: s.categoriaIntervencao
    }));
  }, [filteredStudents, metricMode]);

  // Custom cyber tooltip for recharts
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#050914]/95 border-2 border-cyan-400/70 p-4 rounded-2xl shadow-[0_0_25px_rgba(0,240,255,0.4)] backdrop-blur-xl max-w-xs space-y-2.5 text-xs">
          <div className="border-b border-cyan-500/30 pb-2">
            <h4 className="font-black text-white text-sm flex items-center justify-between gap-2">
              <span>{data.nome}</span>
              <span className="text-[10px] text-amber-300 font-mono bg-amber-950/60 border border-amber-500/40 px-2 py-0.5 rounded-full">
                {data.serie}
              </span>
            </h4>
          </div>

          <div className="space-y-1.5 font-mono">
            {/* Desafio Oficial */}
            <div className="flex items-center justify-between p-1.5 rounded-lg bg-cyan-950/50 border border-cyan-500/30 text-cyan-200">
              <span className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-cyan-400" /> Desafio Oficial:
              </span>
              <span className="font-bold text-cyan-300">
                {data.taxaOficial}% ({data.acertosOficial}/{data.totalOficial})
              </span>
            </div>

            {/* Currículo em Ação */}
            <div className="flex items-center justify-between p-1.5 rounded-lg bg-orange-950/50 border border-orange-500/30 text-orange-200">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-orange-400" /> Currículo em Ação:
              </span>
              <span className="font-bold text-orange-300">
                {data.taxaCurriculo}% ({data.acertosCurriculo}/{data.totalCurriculo})
              </span>
            </div>
          </div>

          <div className="pt-1.5 border-t border-slate-800 text-[11px]">
            <span className="text-amber-300 font-bold block mb-0.5">Diagnóstico Pedagógico:</span>
            <p className="text-slate-300 leading-tight">{data.diagnostico}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-3xl bg-[#090f21]/90 border-2 border-cyan-500/40 p-6 sm:p-8 shadow-[0_0_30px_rgba(0,240,255,0.18)] backdrop-blur-xl space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-cyan-500/20 pb-6">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-gradient-to-r from-cyan-500/20 to-orange-500/20 border border-cyan-400/50 text-cyan-300 text-[10px] sm:text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,240,255,0.25)]">
              <BarChart3 className="w-3.5 h-3.5 text-cyan-400" /> Análise Comparativa Intermodular • Exclusivo Professores
            </span>
            <span className="bg-amber-950/70 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full">
              4º Bimestre SP
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 font-['Oxanium',sans-serif]">
            Comparativo de Desempenho: Desafio Oficial vs. Currículo em Ação
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Compare como cada estudante se comporta na investigação cronometrada (2 min com pistas invertidas) em contraste com os exercícios estruturados do material digital da sua série.
          </p>
        </div>

        {/* Filters and Metric Toggle */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          {/* Série Filter */}
          <div className="flex items-center gap-2 bg-[#050813] border border-cyan-500/40 rounded-2xl px-3 py-1.5">
            <Filter className="w-4 h-4 text-cyan-400 shrink-0" />
            <select
              value={selectedSerie}
              onChange={(e) => onSelectSerie(e.target.value)}
              className="bg-transparent text-cyan-200 text-xs sm:text-sm font-bold focus:outline-none cursor-pointer"
            >
              <option value="todos" className="bg-[#0b1329] text-white">Todas as Séries da Escola</option>
              {INITIAL_SERIES.map((serie) => (
                <option key={serie} value={serie} className="bg-[#0b1329] text-white">
                  {serie}
                </option>
              ))}
            </select>
          </div>

          {/* Metric Toggle */}
          <div className="flex bg-[#050813] p-1 rounded-2xl border border-cyan-500/40">
            <button
              onClick={() => setMetricMode('taxa')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                metricMode === 'taxa'
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(0,240,255,0.5)] font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Taxa de Acertos (%)
            </button>
            <button
              onClick={() => setMetricMode('acertos')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                metricMode === 'acertos'
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(0,240,255,0.5)] font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Acertos Absolutos (Nº)
            </button>
          </div>
        </div>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Média Desafio Oficial */}
        <div className="bg-gradient-to-br from-cyan-950/40 to-[#070c1a] border border-cyan-500/40 p-4 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-xs text-cyan-300 font-bold mb-1">
            <span className="flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-cyan-400" /> Média Desafio Oficial
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-300">
            {summary.mediaOficialGeral}%
          </div>
          <span className="text-[10px] text-slate-400">Pistas falsas / 2 min por item</span>
        </div>

        {/* Média Currículo em Ação */}
        <div className="bg-gradient-to-br from-orange-950/40 to-[#070c1a] border border-orange-500/40 p-4 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-xs text-orange-300 font-bold mb-1">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-orange-400" /> Média Currículo
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-orange-300">
            {summary.mediaCurriculoGeral}%
          </div>
          <span className="text-[10px] text-slate-400">15 itens 4º Bimestre SP</span>
        </div>

        {/* Alunos em Atenção Prioritária */}
        <button
          onClick={() => setActiveCategoryFilter(activeCategoryFilter === 'atencao' ? 'todos' : 'atencao')}
          className={`text-left p-4 rounded-2xl transition border cursor-pointer ${
            activeCategoryFilter === 'atencao'
              ? 'bg-rose-950/80 border-rose-400 ring-2 ring-rose-400/50 shadow-[0_0_15px_rgba(244,63,94,0.4)]'
              : 'bg-gradient-to-br from-rose-950/40 to-[#070c1a] border-rose-500/40 hover:border-rose-400'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-rose-300 font-bold mb-1">
            <span className="flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> Atenção Prioritária
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-rose-400">
            {summary.alunosAtencaoCount}
          </div>
          <span className="text-[10px] text-rose-300/80">Abaixo de 50% de acerto</span>
        </button>

        {/* Alunos de Domínio Consolidado */}
        <button
          onClick={() => setActiveCategoryFilter(activeCategoryFilter === 'avancado' ? 'todos' : 'avancado')}
          className={`text-left p-4 rounded-2xl transition border cursor-pointer ${
            activeCategoryFilter === 'avancado'
              ? 'bg-emerald-950/80 border-emerald-400 ring-2 ring-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
              : 'bg-gradient-to-br from-emerald-950/40 to-[#070c1a] border-emerald-500/40 hover:border-emerald-400'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-emerald-300 font-bold mb-1">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Domínio Consolidado
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
            {summary.alunosAvancadoCount}
          </div>
          <span className="text-[10px] text-emerald-300/80">&gt; 80% nos dois módulos</span>
        </button>
      </div>

      {/* Filter Badges Pill Bar */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
          Filtrar Alunos por Status:
        </span>
        <button
          onClick={() => setActiveCategoryFilter('todos')}
          className={`text-xs px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
            activeCategoryFilter === 'todos'
              ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(0,240,255,0.4)] font-black'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Todos ({students.length})
        </button>
        <button
          onClick={() => setActiveCategoryFilter('atencao')}
          className={`text-xs px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
            activeCategoryFilter === 'atencao'
              ? 'bg-rose-500 text-white shadow-[0_0_10px_rgba(244,63,94,0.4)] font-black'
              : 'bg-rose-950/40 text-rose-300 border border-rose-500/30 hover:bg-rose-950'
          }`}
        >
          🚨 Atenção ({summary.alunosAtencaoCount})
        </button>
        <button
          onClick={() => setActiveCategoryFilter('descompasso')}
          className={`text-xs px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
            activeCategoryFilter === 'descompasso'
              ? 'bg-amber-500 text-slate-950 shadow-[0_0_10px_rgba(251,191,36,0.4)] font-black'
              : 'bg-amber-950/40 text-amber-300 border border-amber-500/30 hover:bg-amber-950'
          }`}
        >
          ⚖️ Descompasso de Módulos ({summary.alunosDescompassoCount})
        </button>
        <button
          onClick={() => setActiveCategoryFilter('avancado')}
          className={`text-xs px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
            activeCategoryFilter === 'avancado'
              ? 'bg-emerald-500 text-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.4)] font-black'
              : 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-950'
          }`}
        >
          🌟 Avançado ({summary.alunosAvancadoCount})
        </button>
      </div>

      {/* RECHARTS BAR CHART */}
      <div className="bg-[#050813] p-4 sm:p-6 rounded-2xl border border-cyan-500/30 shadow-inner">
        {chartData.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center space-y-2">
            <Info className="w-8 h-8 text-slate-500" />
            <p className="text-sm font-bold text-slate-300">Nenhum aluno encontrado para este filtro.</p>
            <p className="text-xs text-slate-500">Selecione "Todas as Séries" ou desative o filtro de status.</p>
          </div>
        ) : (
          <div className="w-full h-80 sm:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 20, left: 0, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.07)" vertical={false} />
                <XAxis
                  dataKey="nomeAbrev"
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                  axisLine={{ stroke: 'rgba(0, 240, 255, 0.3)' }}
                  tickLine={false}
                  interval={0}
                  angle={chartData.length > 8 ? -30 : 0}
                  textAnchor={chartData.length > 8 ? 'end' : 'middle'}
                  height={chartData.length > 8 ? 50 : 30}
                />
                <YAxis
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  axisLine={{ stroke: 'rgba(0, 240, 255, 0.3)' }}
                  tickLine={false}
                  domain={[0, metricMode === 'taxa' ? 100 : 'auto']}
                  unit={metricMode === 'taxa' ? '%' : ''}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="top"
                  align="right"
                  height={36}
                  formatter={(value) => {
                    const label =
                      value === 'oficial'
                        ? 'Desafios Oficiais (Lógica Invertida / 2 min)'
                        : 'Currículo em Ação (4º Bimestre SP)';
                    return <span className="text-xs font-bold text-slate-300 ml-1">{label}</span>;
                  }}
                />
                {metricMode === 'taxa' && (
                  <ReferenceLine
                    y={50}
                    stroke="rgba(244, 63, 94, 0.6)"
                    strokeDasharray="4 4"
                    label={{
                      value: 'Linha de Corte (50%)',
                      fill: '#f43f5e',
                      fontSize: 10,
                      position: 'insideBottomRight'
                    }}
                  />
                )}
                {/* Bar 1: Desafio Oficial - Neon Cyan */}
                <Bar
                  dataKey="oficial"
                  fill="#00f0ff"
                  radius={[6, 6, 0, 0]}
                  name="oficial"
                />
                {/* Bar 2: Currículo em Ação - Neon Orange */}
                <Bar
                  dataKey="curriculo"
                  fill="#f97316"
                  radius={[6, 6, 0, 0]}
                  name="curriculo"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Pedagogical Insights Box */}
      <div className="bg-gradient-to-r from-[#0a1228] to-[#070d1e] p-5 sm:p-6 rounded-2xl border border-amber-500/40 space-y-3">
        <div className="flex items-center gap-2.5 text-amber-300 font-bold text-sm">
          <Lightbulb className="w-5 h-5 text-amber-400 shrink-0" />
          <span>Diagnóstico Formativo & Recomendações para a Série Selecionada</span>
        </div>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
          {summary.insightsPedagogicos.map((insight, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold shrink-0">▸</span>
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Detailed Diagnostic Student Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <span>Intervenções Recomendadas por Estudante</span>
          </h4>
          <span className="text-xs text-cyan-300 font-mono">
            {filteredStudents.length} estudante(s) filtrado(s)
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-cyan-500/20 bg-[#060a16]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0b1329] text-cyan-300 font-extrabold uppercase text-[10px] border-b border-cyan-500/20">
              <tr>
                <th className="py-3 px-4">Estudante</th>
                <th className="py-3 px-3">Série</th>
                <th className="py-3 px-3 text-center text-cyan-300">Desafio Oficial</th>
                <th className="py-3 px-3 text-center text-orange-300">Currículo em Ação</th>
                <th className="py-3 px-3 text-center">Discrepância</th>
                <th className="py-3 px-4">Diagnóstico & Intervenção Docente</th>
                {onInspectStudent && <th className="py-3 px-3 text-right">Ação</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredStudents.map((st) => (
                <tr key={st.alunoId} className="hover:bg-cyan-950/20 transition">
                  <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                    {st.nome}
                  </td>
                  <td className="py-3 px-3 text-slate-400 whitespace-nowrap">
                    {st.serie}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-cyan-300 whitespace-nowrap">
                    <span className="bg-cyan-950/70 border border-cyan-500/40 px-2 py-0.5 rounded-lg">
                      {st.taxaOficial}% ({st.acertosOficial}/{st.totalOficial})
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-orange-300 whitespace-nowrap">
                    <span className="bg-orange-950/70 border border-orange-500/40 px-2 py-0.5 rounded-lg">
                      {st.taxaCurriculo}% ({st.acertosCurriculo}/{st.totalCurriculo})
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded-lg ${
                        Math.abs(st.diferencaTaxa) < 10
                          ? 'text-slate-400 bg-slate-900 border border-slate-700'
                          : st.diferencaTaxa > 0
                          ? 'text-orange-300 bg-orange-950/60 border border-orange-500/40'
                          : 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/40'
                      }`}
                    >
                      {st.diferencaTaxa > 0 ? `+${st.diferencaTaxa}% Cur.` : st.diferencaTaxa < 0 ? `+${Math.abs(st.diferencaTaxa)}% Ofic.` : 'Equilibrado'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300 leading-snug">
                    <span
                      className={`inline-block mr-2 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                        st.categoriaIntervencao === 'avancado'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                          : st.categoriaIntervencao === 'atencao'
                          ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
                          : st.categoriaIntervencao === 'descompasso'
                          ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                          : 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                      }`}
                    >
                      {st.categoriaIntervencao === 'avancado'
                        ? '🌟 Avançado'
                        : st.categoriaIntervencao === 'atencao'
                        ? '🚨 Atenção'
                        : st.categoriaIntervencao === 'descompasso'
                        ? '⚖️ Descompasso'
                        : '📈 Em Progresso'}
                    </span>
                    {st.diagnosticoPedagogico}
                  </td>
                  {onInspectStudent && (
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => onInspectStudent(st.nome)}
                        className="bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 px-2.5 py-1 rounded-lg text-[11px] font-bold transition inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3 h-3" /> Ver
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
