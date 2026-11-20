import React, { useState, useMemo } from 'react';
import { User } from '../types';
import { Storage, INITIAL_SERIES } from '../utils/storage';
import { Trophy, Filter, Search, Award, Clock } from 'lucide-react';

interface RankingTabProps {
  currentUser: User | null;
}

export const RankingTab: React.FC<RankingTabProps> = ({ currentUser }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [version, setVersion] = useState(0);

  // Subscribe to real-time updates from Google Cloud Firestore
  React.useEffect(() => {
    const unsubscribe = Storage.subscribe(() => {
      setVersion((v) => v + 1);
    });
    return unsubscribe;
  }, []);

  const rankingData = useMemo(() => {
    return Storage.getRanking(selectedFilter);
  }, [selectedFilter, version]);

  const filteredRanking = useMemo(() => {
    if (!searchQuery.trim()) return rankingData;
    const query = searchQuery.toLowerCase();
    return rankingData.filter(
      (item) => item.nome.toLowerCase().includes(query) || item.serie.toLowerCase().includes(query)
    );
  }, [rankingData, searchQuery]);

  const topThree = useMemo(() => {
    return filteredRanking.slice(0, 3);
  }, [filteredRanking]);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner - Cyber HUD */}
      <div className="bg-[#0b1329]/90 border border-cyan-500/30 text-white p-6 sm:p-8 rounded-3xl shadow-[0_0_25px_rgba(0,240,255,0.15)] backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
            Classificação Escolar Oficial
          </span>
          <h2 className="text-2xl sm:text-3xl font-black flex items-center justify-center sm:justify-start gap-2.5">
            <Trophy className="w-8 h-8 text-amber-300" /> Ranking dos Detetives Matemáticos
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
            Acompanhe o desempenho nos <strong>Desafios Oficiais</strong> filtrando por sala/série ou visualizando todos os alunos da escola!
          </p>
        </div>

        <div className="bg-[#060a16] px-5 py-4 rounded-2xl border border-cyan-500/40 text-center sm:text-right shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
          <span className="text-[11px] text-cyan-300 font-bold block uppercase tracking-wide">
            Total de Participantes
          </span>
          <span className="text-3xl font-black text-amber-300 font-mono">
            {rankingData.length} alunos
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0b1329]/80 backdrop-blur-xl p-4 sm:p-6 rounded-3xl shadow-lg border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Class Filter */}
        <div className="w-full md:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-2 flex-grow">
          <label className="text-xs font-extrabold text-cyan-300 uppercase flex items-center gap-1.5 shrink-0">
            <Filter className="w-4 h-4 text-cyan-400" /> Filtrar por Sala / Turma:
          </label>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="w-full sm:w-auto bg-[#070b18] border border-cyan-500/40 text-cyan-100 text-xs sm:text-sm font-bold rounded-2xl px-4 py-2.5 focus:ring-2 focus:ring-cyan-400 focus:outline-none cursor-pointer"
          >
            <option value="todos">Todos da Escola (Geral)</option>
            {INITIAL_SERIES.map((serie) => (
              <option key={serie} value={serie}>
                {serie}
              </option>
            ))}
          </select>
        </div>

        {/* Search Input */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-cyan-400/60 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar aluno por nome..."
            className="w-full bg-[#070b18] border border-cyan-500/40 text-cyan-100 placeholder-slate-500 text-xs sm:text-sm rounded-2xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Top 3 Podium in Cyber Holographic Style */}
      {topThree.length > 0 && !searchQuery && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* 2nd Place */}
          {topThree[1] && (
            <div className="order-2 md:order-1 bg-[#091124] rounded-3xl p-6 border-2 border-slate-500/40 shadow-lg text-center flex flex-col items-center justify-center space-y-3 relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-slate-800 text-slate-300 flex items-center justify-center font-black text-2xl shadow-inner border border-slate-600">
                🥈
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">2º Lugar</span>
              <h4 className="font-extrabold text-white text-base">{topThree[1].nome}</h4>
              <span className="text-xs text-slate-300 bg-slate-800/80 px-3 py-1 rounded-full font-medium border border-slate-700">
                {topThree[1].serie}
              </span>
              <div className="flex gap-4 pt-1 text-xs">
                <div>
                  <span className="font-black text-emerald-400 block text-base font-mono">{topThree[1].totalAcertos}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Acertos</span>
                </div>
                <div>
                  <span className="font-black text-cyan-300 block text-base font-mono">{topThree[1].tempoMedioSegundos}s</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Tempo Médio</span>
                </div>
              </div>
            </div>
          )}

          {/* 1st Place - Champion */}
          {topThree[0] && (
            <div className="order-1 md:order-2 bg-[#0c1836] rounded-3xl p-6 sm:p-7 border-4 border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.35)] text-center flex flex-col items-center justify-center space-y-3 relative transform md:-translate-y-2">
              <div className="absolute top-2 right-3">
                <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                  Campeão
                </span>
              </div>
              <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-black text-3xl shadow-md border-2 border-amber-400">
                👑
              </div>
              <span className="text-xs font-black text-amber-300 uppercase tracking-wider">1º Lugar Geral</span>
              <h4 className="font-black text-white text-lg">{topThree[0].nome}</h4>
              <span className="text-xs text-amber-300 bg-amber-950/60 border border-amber-500/40 px-3.5 py-1 rounded-full font-bold">
                {topThree[0].serie}
              </span>
              <div className="flex gap-6 pt-2 text-xs">
                <div>
                  <span className="font-black text-emerald-400 block text-xl font-mono">{topThree[0].totalAcertos}</span>
                  <span className="text-[10px] text-slate-300 font-bold uppercase">Acertos</span>
                </div>
                <div>
                  <span className="font-black text-cyan-300 block text-xl font-mono">{topThree[0].aproveitamento}%</span>
                  <span className="text-[10px] text-slate-300 font-bold uppercase">Precisão</span>
                </div>
                <div>
                  <span className="font-black text-amber-400 block text-xl font-mono">{topThree[0].tempoMedioSegundos}s</span>
                  <span className="text-[10px] text-slate-300 font-bold uppercase">Tempo Médio</span>
                </div>
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {topThree[2] && (
            <div className="order-3 bg-[#091124] rounded-3xl p-6 border-2 border-amber-700/40 shadow-lg text-center flex flex-col items-center justify-center space-y-3 relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-amber-950/50 text-amber-400 flex items-center justify-center font-black text-2xl shadow-inner border border-amber-700/50">
                🥉
              </div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">3º Lugar</span>
              <h4 className="font-extrabold text-white text-base">{topThree[2].nome}</h4>
              <span className="text-xs text-slate-300 bg-slate-800/80 px-3 py-1 rounded-full font-medium border border-slate-700">
                {topThree[2].serie}
              </span>
              <div className="flex gap-4 pt-1 text-xs">
                <div>
                  <span className="font-black text-emerald-400 block text-base font-mono">{topThree[2].totalAcertos}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Acertos</span>
                </div>
                <div>
                  <span className="font-black text-cyan-300 block text-base font-mono">{topThree[2].tempoMedioSegundos}s</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Tempo Médio</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Ranking Table / List */}
      <div className="bg-[#0b1329]/80 backdrop-blur-xl rounded-3xl shadow-xl border border-cyan-500/30 overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-cyan-500/20 flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-black text-lg text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" /> Tabela de Classificação
            {selectedFilter !== 'todos' && (
              <span className="text-xs font-semibold text-cyan-300 bg-cyan-950 px-2.5 py-1 rounded-full border border-cyan-500/40">
                {selectedFilter}
              </span>
            )}
          </h3>
          <span className="text-xs text-slate-400">
            Critério: Acertos &gt; Precisão &gt; Tempo de Resposta
          </span>
        </div>

        {filteredRanking.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <Trophy className="w-12 h-12 text-slate-600 mx-auto" />
            <p className="text-base font-bold text-slate-300">Nenhum aluno registrado neste filtro</p>
            <p className="text-xs text-slate-500">
              Conclua uma rodada nos Desafios Oficiais para inaugurar a pontuação desta turma!
            </p>
          </div>
        ) : (
          <div className="divide-y divide-cyan-500/10">
            {filteredRanking.map((item, index) => {
              const isCurrentUser = currentUser?.id === item.alunoId;

              return (
                <div
                  key={item.alunoId}
                  className={`p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition hover:bg-cyan-950/30 ${
                    isCurrentUser ? 'bg-amber-950/40 border-l-4 border-amber-400 font-semibold' : ''
                  }`}
                >
                  {/* Left: Position and Name */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-sm ${
                        index === 0
                          ? 'bg-amber-400 text-slate-950 font-black shadow-[0_0_12px_rgba(251,191,36,0.6)]'
                          : index === 1
                          ? 'bg-slate-300 text-slate-900 font-black'
                          : index === 2
                          ? 'bg-amber-700 text-amber-100 font-black'
                          : 'bg-[#080d1b] text-cyan-300 border border-cyan-500/30'
                      }`}
                    >
                      #{index + 1}
                    </span>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-white text-sm sm:text-base">
                          {item.nome}
                        </h4>
                        {isCurrentUser && (
                          <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase shadow-sm">
                            Você
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 font-medium">
                        {item.serie} • {item.desafiosConcluidos} desafio(s) concluído(s)
                      </span>
                    </div>
                  </div>

                  {/* Right: Scores and Timing */}
                  <div className="flex items-center gap-4 sm:gap-6 self-end sm:self-center">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Acertos</span>
                      <span className="text-base sm:text-lg font-black text-emerald-400 font-mono">
                        {item.totalAcertos}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Precisão</span>
                      <span className="text-base sm:text-lg font-black text-cyan-300 font-mono">
                        {item.aproveitamento}%
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Tempo Médio</span>
                      <span className="text-xs sm:text-sm font-bold text-slate-300 flex items-center justify-end gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" /> {item.tempoMedioSegundos}s
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
