import React, { useState } from 'react';
import { Target, BookOpen, Compass, Award, CheckCircle, Sparkles, HelpCircle } from 'lucide-react';
import { TrigonometryCarousel } from './TrigonometryCarousel';
import { MathTipOfTheDay } from './MathTipOfTheDay';
import { GuidedTourModal } from './GuidedTourModal';

interface HomeTabProps {
  onNavigate: (page: string) => void;
  onOpenTour?: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({ onNavigate, onOpenTour }) => {
  return (
    <div className="space-y-6">

      {/* Hero Card - Cyber Holographic Laboratory matching the artwork */}
      <div className="bg-[#0b1329]/80 backdrop-blur-xl rounded-3xl shadow-[0_0_30px_rgba(0,240,255,0.12)] p-5 sm:p-7 border border-cyan-500/30 space-y-6 relative overflow-hidden">
        {/* Subtle Neon Radial Glow in Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
          <div className="lg:col-span-7 space-y-3.5">
            {/* Top Badges Row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-cyan-950/80 text-cyan-300 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider inline-flex items-center gap-2 border border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.25)]">
                <Compass className="w-3.5 h-3.5 text-cyan-400" /> Investigação Matemática Futurista
              </span>

              {/* Quick Tour Pill Button */}
              <button
                onClick={() => onOpenTour?.()}
                className="bg-purple-950/70 hover:bg-purple-900 border border-purple-400/50 text-purple-200 text-xs font-mono font-bold px-3 py-1 rounded-full inline-flex items-center gap-1.5 shadow-[0_0_12px_rgba(168,85,247,0.3)] transition-all cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-yellow-300" />
                <span>Novo por aqui? <strong>Tour Guiado</strong></span>
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
              Desvende as pistas e domine a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-300 drop-shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                Geometria e Trigonometria!
              </span>
            </h2>

            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              Entre no laboratório holográfico do <strong>Detetive Matemático</strong>. Aqui a aprendizagem do <strong>Currículo em Ação</strong> é totalmente gamificada para facilitar a fixação: do <strong>6º Ano do Ensino Fundamental ao 2º Ano do Ensino Médio</strong>, pratique com questões 100% oficiais do <strong>Livro do Estudante (4º Bimestre - SP)</strong> com pontuação em XP, bônus de sequência e feedback estruturado (por que acertou e armadilhas a evitar); e no <strong>3º Ano do Ensino Médio</strong>, domine a trilha de 24 aulas com o modo <strong>Revisão Rápida</strong> (consulta teórica imediata), esquemas investigativos e desafios práticos focados nas matrizes do ENEM e vestibulares!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-[#070c1a]/90 p-3.5 rounded-2xl border border-cyan-500/30 flex items-center gap-3 shadow-sm">
                <span className="text-2xl filter drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]">🎯</span>
                <div>
                  <h4 className="font-black text-xs sm:text-sm text-amber-300">Desafios Oficiais</h4>
                  <p className="text-[11px] text-slate-400">4 Etapas com ranking escolar e pistas</p>
                </div>
              </div>

              <div className="bg-[#070c1a]/90 p-3.5 rounded-2xl border border-orange-500/40 flex items-center gap-3 shadow-sm">
                <span className="text-2xl filter drop-shadow-[0_0_10px_rgba(249,115,22,0.6)]">🎓</span>
                <div>
                  <h4 className="font-black text-xs sm:text-sm text-orange-300">Currículo em Ação Gamificado</h4>
                  <p className="text-[11px] text-slate-300">6º EF ao 3º EM • 4º Bimestre SP</p>
                </div>
              </div>

              <div className="bg-[#070c1a]/90 p-3.5 rounded-2xl border border-cyan-500/30 flex items-center gap-3 shadow-sm">
                <span className="text-2xl filter drop-shadow-[0_0_10px_rgba(0,240,255,0.6)]">📐</span>
                <div>
                  <h4 className="font-black text-xs sm:text-sm text-cyan-300">Treine Mais</h4>
                  <p className="text-[11px] text-slate-400">15 Questões com diagramas visuais</p>
                </div>
              </div>
            </div>

            {/* Action buttons with vibrant neon styles spanning the whole space */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full">
              <button
                onClick={() => onNavigate('desafios')}
                className="w-full bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-500 text-slate-950 font-black px-4 py-3 rounded-2xl border-2 border-cyan-200 neon-glow-btn-cyan transition flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.5)] text-center"
              >
                <Target className="w-4 h-4 fill-slate-950 shrink-0" /> <span className="truncate">Iniciar Desafios</span>
              </button>

              <button
                onClick={() => onNavigate('curriculo')}
                className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-slate-950 font-black px-4 py-3 rounded-2xl border-2 border-orange-200 neon-glow-btn-orange transition flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer uppercase tracking-wider shadow-[0_0_20px_rgba(249,115,22,0.5)] text-center"
              >
                <span className="shrink-0">🎓</span> <span className="truncate">Currículo em Ação</span>
              </button>

              <button
                onClick={() => onOpenTour?.()}
                className="w-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-black px-4 py-3 rounded-2xl border-2 border-fuchsia-300 neon-glow-btn-purple transition flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer uppercase tracking-wider shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:scale-102 text-center"
              >
                <Compass className="w-4 h-4 text-white animate-spin-slow shrink-0" /> <span className="truncate">Tour Guiado</span>
              </button>

              <button
                onClick={() => onNavigate('materiais')}
                className="w-full bg-cyan-950/50 hover:bg-cyan-900/70 text-cyan-200 font-bold px-4 py-3 rounded-2xl transition flex items-center justify-center gap-2 text-xs sm:text-sm border-2 border-cyan-400/60 neon-glow-btn-cyan cursor-pointer uppercase tracking-wider text-center"
              >
                <BookOpen className="w-4 h-4 text-cyan-300 shrink-0" /> <span className="truncate">Ver Apoio</span>
              </button>
            </div>
          </div>

          {/* Carrossel Interativo de Cards de Trigonometria Rodando Sozinho */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <TrigonometryCarousel />
          </div>
        </div>

        {/* Dica Matemática do Dia (30 Curiosidades, Usos Reais e Desafios Diários) - ACIMA DE CONCEITOS CHAVE */}
        <MathTipOfTheDay onNavigateCurriculo={() => onNavigate('curriculo')} />

        {/* Fundamental Concepts in Cyber Dark Cards */}
        <div className="pt-6 border-t border-cyan-500/20">
          <div className="text-center max-w-2xl mx-auto mb-5 space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              📐 Conceitos Chave de Geometria e Trigonometria
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              Pilares essenciais abordados nos desafios investigativos de cada etapa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* 1. Teorema de Pitágoras - AMARELO / DOURADO NEON VIBRANTE */}
            <div className="bg-gradient-to-br from-[#1c1303]/95 via-[#0b0802]/95 to-[#160f02]/95 p-4 sm:p-5 rounded-2xl border-2 border-amber-400/70 space-y-3.5 hover:border-amber-300 transition shadow-[0_0_25px_rgba(251,191,36,0.22)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 rounded-xl flex items-center justify-center font-black text-base shadow-[0_0_15px_rgba(251,191,36,0.8)] shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-black text-base sm:text-lg text-amber-200">Teorema de Pitágoras</h4>
                  <span className="text-xs text-amber-300 font-bold bg-amber-950/80 border border-amber-400/50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                    Triângulos Retângulos (90°)
                  </span>
                </div>
              </div>

              <div className="flex justify-center bg-[#080501] p-3 rounded-xl border-2 border-amber-500/40 shadow-inner">
                <svg width="200" height="105" viewBox="0 0 200 110" fill="none">
                  <path d="M 25,90 L 175,90 L 25,20 Z" stroke="#FFEA00" strokeWidth="3" fill="#FFEA00" fillOpacity="0.15" />
                  <rect x="25" y="75" width="15" height="15" stroke="#FACC15" strokeWidth="1.8" fill="none" />
                  <circle cx="32" cy="82" r="2.5" fill="#FFEA00" />
                  <text x="95" y="105" fontSize="13" fontWeight="bold" fill="#FDE047">b (cateto)</text>
                  <text x="10" y="60" fontSize="13" fontWeight="bold" fill="#FDE047">a</text>
                  <text x="105" y="48" fontSize="14" fontWeight="bold" fill="#FB923C">c (hipotenusa)</text>
                </svg>
              </div>

              <div className="bg-amber-950/80 border-2 border-amber-400/60 rounded-xl p-2.5 text-center shadow-[0_0_15px_rgba(251,191,36,0.25)]">
                <span className="font-mono font-black text-sm sm:text-base text-[#FFEA00]">
                  a² + b² = c²
                </span>
              </div>

              <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                Em todo triângulo retângulo, o quadrado da hipotenusa (c) equivale à soma dos quadrados dos catetos: <strong className="text-amber-300 font-bold font-mono">a² + b² = c²</strong>.
              </p>
            </div>

            {/* 2. Lei dos Senos - CIANO / AZUL ELÉTRICO NEON VIBRANTE */}
            <div className="bg-gradient-to-br from-[#021824]/95 via-[#010c14]/95 to-[#032030]/95 p-4 sm:p-5 rounded-2xl border-2 border-cyan-400/70 space-y-3.5 hover:border-cyan-300 transition shadow-[0_0_25px_rgba(0,240,255,0.22)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-sky-500 text-slate-950 rounded-xl flex items-center justify-center font-black text-base shadow-[0_0_15px_rgba(0,240,255,0.8)] shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-black text-base sm:text-lg text-cyan-200">Lei dos Senos</h4>
                  <span className="text-xs text-cyan-300 font-bold bg-cyan-950/80 border border-cyan-400/50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                    Lados e Ângulos Opostos
                  </span>
                </div>
              </div>

              <div className="flex justify-center bg-[#010910] p-3 rounded-xl border-2 border-cyan-500/40 shadow-inner">
                <svg width="200" height="105" viewBox="0 0 200 110" fill="none">
                  <path d="M 25,90 L 180,90 L 110,20 Z" stroke="#00F0FF" strokeWidth="3" fill="#00F0FF" fillOpacity="0.15" />
                  <text x="100" y="105" fontSize="13" fontWeight="bold" fill="#38BDF8">c</text>
                  <text x="48" y="50" fontSize="13" fontWeight="bold" fill="#38BDF8">b</text>
                  <text x="152" y="50" fontSize="13" fontWeight="bold" fill="#38BDF8">a</text>
                  <text x="25" y="102" fontSize="11" fontWeight="bold" fill="#E0F2FE">Â</text>
                  <text x="178" y="102" fontSize="11" fontWeight="bold" fill="#E0F2FE">B̂</text>
                  <text x="108" y="15" fontSize="11" fontWeight="bold" fill="#E0F2FE">Ĉ</text>
                </svg>
              </div>

              <div className="bg-cyan-950/80 border-2 border-cyan-400/60 rounded-xl p-2.5 text-center shadow-[0_0_15px_rgba(0,240,255,0.25)]">
                <span className="font-mono font-black text-xs sm:text-sm text-cyan-200">
                  a/sen(A) = b/sen(B) = c/sen(C) = 2R
                </span>
              </div>

              <p className="text-xs sm:text-sm text-cyan-100/90 leading-relaxed">
                Os lados de um triângulo são proporcionais aos senos dos seus ângulos opostos, igualando ao diâmetro circunscrito: <strong className="text-cyan-300 font-bold font-mono">2R</strong>.
              </p>
            </div>

            {/* 3. Lei dos Cossenos - ROSA / MAGENTA / RUBI NEON VIBRANTE */}
            <div className="bg-gradient-to-br from-[#240310]/95 via-[#120108]/95 to-[#2a0414]/95 p-4 sm:p-5 rounded-2xl border-2 border-rose-400/70 space-y-3.5 hover:border-rose-300 transition shadow-[0_0_25px_rgba(244,63,94,0.22)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 text-slate-950 rounded-xl flex items-center justify-center font-black text-base shadow-[0_0_15px_rgba(244,63,94,0.8)] shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-black text-base sm:text-lg text-rose-200">Lei dos Cossenos</h4>
                  <span className="text-xs text-rose-300 font-bold bg-rose-950/80 border border-rose-400/50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                    Dois Lados e Ângulo Entre Eles
                  </span>
                </div>
              </div>

              <div className="flex justify-center bg-[#100106] p-3 rounded-xl border-2 border-rose-500/40 shadow-inner">
                <svg width="200" height="105" viewBox="0 0 200 110" fill="none">
                  <path d="M 30,90 L 170,90 L 130,25 Z" stroke="#FB7185" strokeWidth="3" fill="#F43F5E" fillOpacity="0.15" />
                  <path d="M 52,90 A 22 22 0 0 0 44,78" stroke="#FFEA00" strokeWidth="2" fill="none" />
                  <text x="56" y="84" fill="#FFEA00" fontSize="10" fontWeight="bold">Â</text>
                  <text x="95" y="105" fontSize="13" fontWeight="bold" fill="#FDA4AF">a (oposto)</text>
                  <text x="65" y="55" fontSize="13" fontWeight="bold" fill="#FDA4AF">c</text>
                  <text x="155" y="55" fontSize="13" fontWeight="bold" fill="#FDA4AF">b</text>
                </svg>
              </div>

              <div className="bg-rose-950/80 border-2 border-rose-400/60 rounded-xl p-2.5 text-center shadow-[0_0_15px_rgba(244,63,94,0.25)]">
                <span className="font-mono font-black text-xs sm:text-sm text-rose-200">
                  a² = b² + c² - 2bc · cos(A)
                </span>
              </div>

              <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed">
                Generalização de Pitágoras para qualquer ângulo: o termo <strong className="text-rose-300 font-bold font-mono">-2bc·cos(A)</strong> ajusta com precisão o desvio de 90°.
              </p>
            </div>

            {/* 4. Relações de Semelhança - VERDE ESMERALDA / LIMA NEON VIBRANTE */}
            <div className="bg-gradient-to-br from-[#021f12]/95 via-[#010e08]/95 to-[#032717]/95 p-4 sm:p-5 rounded-2xl border-2 border-emerald-400/70 space-y-3.5 hover:border-emerald-300 transition shadow-[0_0_25px_rgba(16,185,129,0.22)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-400 text-slate-950 rounded-xl flex items-center justify-center font-black text-base shadow-[0_0_15px_rgba(16,185,129,0.8)] shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-black text-base sm:text-lg text-emerald-200">Relações de Semelhança</h4>
                  <span className="text-xs text-emerald-300 font-bold bg-emerald-950/80 border border-emerald-400/50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                    Razão de Escala e Áreas
                  </span>
                </div>
              </div>

              <div className="flex justify-center items-end gap-6 bg-[#010e07] p-3 rounded-xl border-2 border-emerald-500/40 shadow-inner h-[115px]">
                <div className="flex flex-col items-center">
                  <svg width="65" height="60" viewBox="0 0 70 65" fill="none">
                    <path d="M 10,55 L 60,55 L 10,15 Z" stroke="#10B981" strokeWidth="2.5" fill="#10B981" fillOpacity="0.15" />
                  </svg>
                  <span className="text-[10px] text-emerald-300 font-bold font-mono">Área = A</span>
                </div>
                <div className="flex flex-col items-center">
                  <svg width="105" height="85" viewBox="0 0 110 90" fill="none">
                    <path d="M 10,80 L 100,80 L 10,15 Z" stroke="#34D399" strokeWidth="3" fill="#34D399" fillOpacity="0.2" />
                  </svg>
                  <span className="text-[10px] text-emerald-300 font-bold font-mono">Área = k² · A</span>
                </div>
              </div>

              <div className="bg-emerald-950/80 border-2 border-emerald-400/60 rounded-xl p-2.5 text-center shadow-[0_0_15px_rgba(16,185,129,0.25)]">
                <span className="font-mono font-black text-xs sm:text-sm text-emerald-200">
                  Lados: k • Perímetros: k • Áreas: k²
                </span>
              </div>

              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Lados proporcionais na razão <strong className="text-emerald-300 font-mono">k</strong> geram perímetros na razão <strong className="text-emerald-300 font-mono">k</strong> e áreas na razão <strong className="text-emerald-300 font-mono">k²</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Platform Highlights */}
        <div className="bg-gradient-to-br from-[#0c1630] to-[#060914] p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-4 border border-cyan-500/30">
          <div className="flex items-center gap-2 text-cyan-300 font-bold text-lg border-b border-cyan-500/20 pb-3">
            <Award className="w-6 h-6 text-amber-400" /> Destaques Pedagógicos da Plataforma
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs sm:text-sm pt-2">
            <div className="bg-[#050812]/80 p-4 rounded-2xl border border-cyan-500/20 space-y-1 hover:border-cyan-400/40 transition">
              <div className="font-bold text-cyan-200 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" /> Trilhas do 6º EF ao 3º EM
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Questões 100% oficiais do <strong>Livro do Estudante (4º Bimestre - SP)</strong> com temas coloridos exclusivos para cada série e pontuação por acerto.
              </p>
            </div>

            <div className="bg-[#050812]/80 p-4 rounded-2xl border border-amber-500/20 space-y-1 hover:border-amber-400/40 transition">
              <div className="font-bold text-amber-200 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" /> Modo Revisão Rápida
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                No 3º EM, alterne entre aula completa e teoria pura das 24 aulas com esquemas visuais investigativos combinados à paleta de cor de cada aula.
              </p>
            </div>

            <div className="bg-[#050812]/80 p-4 rounded-2xl border border-emerald-500/20 space-y-1 hover:border-emerald-400/40 transition">
              <div className="font-bold text-emerald-200 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> Feedback Analítico Completo
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Explicação oficial em duas colunas: detalha por que a alternativa correta é válida e revela a armadilha conceitual das opções incorretas.
              </p>
            </div>

            <div className="bg-[#050812]/80 p-4 rounded-2xl border border-purple-500/20 space-y-1 hover:border-purple-400/40 transition">
              <div className="font-bold text-purple-200 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400 shrink-0" /> Apoio Vertical por Série
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Fórmulas fundamentais organizadas em blocos contínuos do 6º EF ao 3º EM, prontas para consulta rápida durante o treinamento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
