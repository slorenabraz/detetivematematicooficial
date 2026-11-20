import React from 'react';
import { User } from '../types';
import detetiveBg from '../assets/images/detetive_matematico_bg_1791321167300.jpg';
import {
  Home,
  Target,
  TrendingUp,
  Users,
  Trophy,
  BookOpen,
  LogIn,
  LogOut,
  Sparkles,
  GraduationCap,
  ShieldCheck
} from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  currentUser: User | null;
  onLogout: () => void;
  onOpenAuth: () => void;
  onOpenTour?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  currentUser,
  onLogout,
  onOpenAuth,
  onOpenTour
}) => {
  return (
    <header className="relative bg-[#070b16] text-white shadow-2xl border-b-2 border-cyan-500/40">
      {/* 1. TOP BAR: Clean, with brand indicator, Tour Guiado button, and signature! */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between relative z-20 border-b border-cyan-500/20 bg-[#050812]/90 backdrop-blur-md">
        {/* Left: Discreet Brand indicator */}
        <div className="flex items-center gap-2">
          <span className="text-xl">🕵️‍♂️</span>
          <span className="text-xs font-black uppercase tracking-wider text-cyan-300 font-mono">
            Plataforma Pedagógica
          </span>
          {currentUser && (
            <span className="text-[11px] text-slate-300 ml-2 hidden sm:inline">
              • Olá, <strong className="text-white">{currentUser.nome.split(' ')[0]}</strong> ({currentUser.tipo === 'admin' ? 'Administrador' : currentUser.tipo === 'professor' ? 'Docente' : currentUser.serie})
            </span>
          )}
        </div>

        {/* Right: Tour button + Subtle Signature */}
        <div className="flex items-center gap-2">
          {onOpenTour && (
            <button
              onClick={onOpenTour}
              className="flex items-center gap-1.5 text-xs text-purple-200 font-mono font-bold bg-purple-950/70 hover:bg-purple-900 px-3 py-1.5 rounded-full border border-purple-400/50 shadow-[0_0_12px_rgba(168,85,247,0.3)] transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Tour Guiado</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 text-xs text-amber-200 font-semibold bg-[#111c38]/90 px-3.5 py-1.5 rounded-full border border-amber-400/40 shadow-[0_0_12px_rgba(251,191,36,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Desenvolvido por <strong>Profª Ariane Braz e Sabrina Braz</strong></span>
          </div>
        </div>
      </div>

      {/* 2. CENTRAL BANNER: AI-Generated Classroom Background Image across the whole banner */}
      <div className="relative min-h-[210px] sm:min-h-[250px] md:min-h-[280px] max-h-[340px] w-full flex items-center justify-center overflow-hidden">
        {/* The AI-Generated Image applied clearly across the background */}
        <img
          src={detetiveBg}
          alt="Detetive Matemático Cenário Holográfico"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-105 contrast-105"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const img = e.currentTarget;
            if (!img.dataset.fallbackTried) {
              img.dataset.fallbackTried = '1';
              img.src = '/detetive_matematico_bg.jpg';
            } else if (img.dataset.fallbackTried === '1') {
              img.dataset.fallbackTried = '2';
              img.src = '/detetive_matematico_bg_1791321167300.jpg';
            }
          }}
        />

        {/* Softened Scrim Overlay: image is much less transparent and clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b16]/35 via-black/20 to-[#070b16]/45" />

        {/* Center Title Content: Elementos Futuristas & Tipografia Sci-Fi com Azul Suavizado */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-4 sm:py-6 flex flex-col items-center justify-center text-center">
          {/* Micro-cabeçalho Sci-Fi Holográfico */}
          <div className="flex items-center gap-2 mb-1.5 px-3 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-400/40 shadow-[0_0_12px_rgba(0,240,255,0.2)] text-[9px] sm:text-[11px] font-mono text-cyan-300 tracking-[0.25em] font-bold uppercase select-none animate-pulse">
            <span className="text-amber-400">◈</span>
            <span>HOLOGRAPHIC DETECTIVE LAB // GEOMETRIA & TRIGONOMETRIA</span>
            <span className="text-amber-400">◈</span>
          </div>

          {/* DETETIVE MATEMÁTICO: Estrutura 3D com fonte futurista (Oxanium) e intensidade do azul suavizada */}
          <h1 className="sr-only">DETETIVE MATEMÁTICO</h1>
          <div className="relative select-none flex flex-col items-center leading-none px-4 sm:px-8 py-2">
            {/* Elementos angulares futuristas nas laterais do bloco principal */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400/70" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400/70" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400/70" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400/70" />

            {/* 1. DETETIVE */}
            <div className="relative flex justify-center">
              {/* Camada 3D Bevel Profundo (Sombra Base Metálica com azul suavizado) */}
              <span
                className="absolute inset-0 select-none pointer-events-none text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-[0.1em] font-['Oxanium','Chakra_Petch','Orbitron',sans-serif] text-[#140600]"
                style={{
                  transform: 'translateY(5px)',
                  WebkitTextStroke: '4.5px #120400',
                  paintOrder: 'stroke fill',
                  /* Azul atrás do texto com intensidade diminuída para clareza máxima */
                  filter: 'drop-shadow(0 0 10px rgba(0,240,255,0.28)) drop-shadow(0 4px 12px rgba(0,0,0,0.95))'
                }}
                aria-hidden="true"
              >
                DETETIVE
              </span>

              {/* Camada 3D Bevel Intermediário */}
              <span
                className="absolute inset-0 select-none pointer-events-none text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-[0.1em] font-['Oxanium','Chakra_Petch','Orbitron',sans-serif] text-[#852a0d]"
                style={{
                  transform: 'translateY(2.5px)',
                  WebkitTextStroke: '2.5px #631c07',
                  paintOrder: 'stroke fill'
                }}
                aria-hidden="true"
              >
                DETETIVE
              </span>

              {/* Face Frontal Realista Ouro/Laranja Neon com Fonte Futurista Oxanium */}
              <span className="relative z-10 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-[0.1em] font-['Oxanium','Chakra_Petch','Orbitron',sans-serif] neon-title-detetive">
                DETETIVE
              </span>
            </div>

            {/* 2. MATEMÁTICO */}
            <div className="relative flex justify-center mt-1 sm:mt-2">
              {/* Camada 3D Bevel Profundo (Sombra Base com azul suavizado) */}
              <span
                className="absolute inset-0 select-none pointer-events-none text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-[0.08em] font-['Oxanium','Chakra_Petch','Orbitron',sans-serif] text-[#140600]"
                style={{
                  transform: 'translateY(6px)',
                  WebkitTextStroke: '5px #120400',
                  paintOrder: 'stroke fill',
                  /* Azul atrás do texto com intensidade diminuída */
                  filter: 'drop-shadow(0 0 12px rgba(0,240,255,0.28)) drop-shadow(0 5px 14px rgba(0,0,0,0.95))'
                }}
                aria-hidden="true"
              >
                MATEMÁTICO
              </span>

              {/* Camada 3D Bevel Intermediário */}
              <span
                className="absolute inset-0 select-none pointer-events-none text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-[0.08em] font-['Oxanium','Chakra_Petch','Orbitron',sans-serif] text-[#852a0d]"
                style={{
                  transform: 'translateY(3px)',
                  WebkitTextStroke: '3px #631c07',
                  paintOrder: 'stroke fill'
                }}
                aria-hidden="true"
              >
                MATEMÁTICO
              </span>

              {/* Face Frontal Realista Ouro/Laranja Neon com Fonte Futurista Oxanium */}
              <span className="relative z-10 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-[0.08em] font-['Oxanium','Chakra_Petch','Orbitron',sans-serif] neon-title-detetive">
                MATEMÁTICO
              </span>
            </div>
          </div>

          {/* Caixa Contornando em Forma Falhada Futurista: TODO DESAFIO TEM UMA SOLUÇÃO! */}
          <div className="relative mt-3 sm:mt-4 px-4 sm:px-8 py-2.5 sm:py-3 flex items-center justify-center max-w-full group">
            {/* Moldura Futurista em Forma Falhada (linhas interrompidas e estilo HUD cibernético) */}
            <div className="absolute inset-0 rounded-xl neon-hud-box-glitched pointer-events-none">
              {/* Falhas e cortes de linhas no contorno */}
              <div className="absolute top-0 left-1/4 w-10 sm:w-16 h-[2px] bg-cyan-300 shadow-[0_0_8px_#00F0FF]" />
              <div className="absolute top-0 right-1/4 w-8 sm:w-12 h-[2px] bg-cyan-300 shadow-[0_0_8px_#00F0FF]" />
              <div className="absolute bottom-0 left-1/3 w-10 sm:w-14 h-[2px] bg-cyan-300 shadow-[0_0_8px_#00F0FF]" />
              <div className="absolute bottom-0 right-1/3 w-8 sm:w-16 h-[2px] bg-cyan-300 shadow-[0_0_8px_#00F0FF]" />

              {/* Cantos reforçados estilo retículo HUD com cortes angulares */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-300 shadow-[0_0_10px_rgba(0,240,255,1)]" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-300 shadow-[0_0_10px_rgba(0,240,255,1)]" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-300 shadow-[0_0_10px_rgba(0,240,255,1)]" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-300 shadow-[0_0_10px_rgba(0,240,255,1)]" />
            </div>

            {/* Conteúdo com detalhes cibernéticos e fonte futurista */}
            <div className="relative z-10 flex items-center gap-2 sm:gap-3.5 px-2">
              <span className="text-[10px] sm:text-xs text-cyan-400 font-mono tracking-tighter select-none font-bold animate-pulse">:::</span>

              {/* Texto com cores e fonte futurista (Oxanium) */}
              <div className="relative flex justify-center">
                {/* Camada 3D Bevel Sombra com azul diminuído */}
                <span
                  className="absolute inset-0 select-none pointer-events-none text-xs sm:text-base md:text-xl lg:text-2xl font-black uppercase tracking-[0.1em] font-['Oxanium','Chakra_Petch','Orbitron',sans-serif] text-[#140600]"
                  style={{
                    transform: 'translateY(2px)',
                    WebkitTextStroke: '2px #120400',
                    paintOrder: 'stroke fill',
                    filter: 'drop-shadow(0 0 6px rgba(0,240,255,0.25))'
                  }}
                  aria-hidden="true"
                >
                  TODO DESAFIO TEM UMA SOLUÇÃO!
                </span>

                {/* Face Frontal com fonte futurista e iluminação ciano refinada */}
                <span className="relative z-10 text-xs sm:text-base md:text-xl lg:text-2xl font-black uppercase tracking-[0.1em] font-['Oxanium','Chakra_Petch','Orbitron',sans-serif] neon-subtitle-futuristic">
                  TODO DESAFIO TEM UMA SOLUÇÃO!
                </span>
              </div>

              <span className="text-[10px] sm:text-xs text-cyan-400 font-mono tracking-tighter select-none font-bold animate-pulse">:::</span>
            </div>

            {/* Linha de base sutil com iluminação ciano */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-48 sm:w-80 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
          </div>
        </div>
      </div>

      {/* 3. NAVIGATION BAR WITH VIVID NEON BUTTONS - PROPORTIONAL UNIFORM GRID ACROSS FULL WIDTH */}
      <nav className="bg-[#050812] border-t-2 border-cyan-500/50 shadow-[0_0_25px_rgba(0,240,255,0.25)] relative z-20 w-full overflow-hidden">
        <div className="w-full px-2 sm:px-4 lg:px-6">
          <div className={`grid grid-cols-2 sm:grid-cols-4 ${currentUser?.tipo === 'admin' ? 'lg:grid-cols-9' : 'lg:grid-cols-8'} gap-1.5 sm:gap-2 w-full py-2.5 items-stretch`}>
            {/* Início: Vivid Neon Âmbar / Dourado */}
            <button
              onClick={() => onNavigate('inicio')}
              className={`w-full min-h-[42px] px-2 py-2 rounded-xl flex items-center justify-center gap-1.5 text-[10px] xl:text-[11px] 2xl:text-xs font-black uppercase tracking-tight text-center leading-tight transition-all cursor-pointer neon-glow-btn-amber ${
                currentPage === 'inicio'
                  ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 shadow-[0_0_35px_rgba(251,191,36,1)] border-2 border-amber-200 scale-102'
                  : 'bg-amber-950/60 text-amber-300 border-2 border-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.6)] hover:bg-amber-900/80 hover:text-white hover:border-amber-300'
              }`}
            >
              <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)] shrink-0" />
              <span>INÍCIO</span>
            </button>

            {/* Desafios: Vivid Neon Ciano Elétrico */}
            <button
              onClick={() => onNavigate('desafios')}
              className={`w-full min-h-[42px] px-2 py-2 rounded-xl flex items-center justify-center gap-1.5 text-[10px] xl:text-[11px] 2xl:text-xs font-black uppercase tracking-tight text-center leading-tight transition-all cursor-pointer neon-glow-btn-cyan ${
                currentPage === 'desafios'
                  ? 'bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-500 text-slate-950 shadow-[0_0_35px_rgba(0,240,255,1)] border-2 border-cyan-100 scale-102'
                  : 'bg-cyan-950/60 text-cyan-300 border-2 border-cyan-400 shadow-[0_0_18px_rgba(0,240,255,0.6)] hover:bg-cyan-900/80 hover:text-white hover:border-cyan-300'
              }`}
            >
              <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-300 drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] shrink-0" />
              <span>DESAFIOS</span>
            </button>

            {/* Currículo em Ação: Vivid Neon Laranja / Âmbar Escolar */}
            <button
              onClick={() => onNavigate('curriculo')}
              className={`w-full min-h-[42px] px-1.5 py-2 rounded-xl flex items-center justify-center gap-1.5 text-[10px] xl:text-[11px] 2xl:text-xs font-black uppercase tracking-tight text-center leading-tight transition-all cursor-pointer neon-glow-btn-orange ${
                currentPage === 'curriculo'
                  ? 'bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 text-slate-950 shadow-[0_0_35px_rgba(249,115,22,1)] border-2 border-orange-100 scale-102'
                  : 'bg-orange-950/60 text-orange-300 border-2 border-orange-400 shadow-[0_0_18px_rgba(249,115,22,0.6)] hover:bg-orange-900/80 hover:text-white hover:border-orange-300'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-300 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] shrink-0" />
              <span>CURRÍCULO EM AÇÃO</span>
            </button>

            {/* Meus Resultados: Vivid Neon Esmeralda / Verde */}
            <button
              onClick={() => onNavigate('resultados')}
              className={`w-full min-h-[42px] px-1.5 py-2 rounded-xl flex items-center justify-center gap-1.5 text-[10px] xl:text-[11px] 2xl:text-xs font-black uppercase tracking-tight text-center leading-tight transition-all cursor-pointer neon-glow-btn-emerald ${
                currentPage === 'resultados'
                  ? 'bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 text-slate-950 shadow-[0_0_35px_rgba(16,185,129,1)] border-2 border-emerald-100 scale-102'
                  : 'bg-emerald-950/60 text-emerald-300 border-2 border-emerald-400 shadow-[0_0_18px_rgba(16,185,129,0.6)] hover:bg-emerald-900/80 hover:text-white hover:border-emerald-300'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] shrink-0" />
              <span>MEUS RESULTADOS</span>
            </button>

            {/* Professores: Vivid Neon Roxo / Violeta */}
            <button
              onClick={() => onNavigate('professores')}
              className={`w-full min-h-[42px] px-2 py-2 rounded-xl flex items-center justify-center gap-1.5 text-[10px] xl:text-[11px] 2xl:text-xs font-black uppercase tracking-tight text-center leading-tight transition-all cursor-pointer neon-glow-btn-purple ${
                currentPage === 'professores'
                  ? 'bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-500 text-slate-950 shadow-[0_0_35px_rgba(168,85,247,1)] border-2 border-purple-100 scale-102'
                  : 'bg-purple-950/60 text-purple-300 border-2 border-purple-400 shadow-[0_0_18px_rgba(168,85,247,0.6)] hover:bg-purple-900/80 hover:text-white hover:border-purple-300'
              }`}
            >
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] shrink-0" />
              <span>PROFESSORES</span>
            </button>

            {/* Ranking: Vivid Neon Rosa Choque / Pink */}
            <button
              onClick={() => onNavigate('ranking')}
              className={`w-full min-h-[42px] px-2 py-2 rounded-xl flex items-center justify-center gap-1.5 text-[10px] xl:text-[11px] 2xl:text-xs font-black uppercase tracking-tight text-center leading-tight transition-all cursor-pointer neon-glow-btn-pink ${
                currentPage === 'ranking'
                  ? 'bg-gradient-to-r from-pink-500 via-rose-400 to-fuchsia-500 text-white shadow-[0_0_35px_rgba(244,63,94,1)] border-2 border-pink-100 scale-102'
                  : 'bg-rose-950/60 text-pink-300 border-2 border-pink-400 shadow-[0_0_18px_rgba(244,63,94,0.6)] hover:bg-rose-900/80 hover:text-white hover:border-pink-300'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-300 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)] shrink-0" />
              <span>RANKING</span>
            </button>

            {/* Materiais de Apoio: Vivid Neon Azul Celeste / Laser Sky */}
            <button
              onClick={() => onNavigate('materiais')}
              className={`w-full min-h-[42px] px-1 py-2 rounded-xl flex items-center justify-center gap-1 text-[9.5px] xl:text-[10.5px] 2xl:text-xs font-black uppercase tracking-tight text-center leading-tight transition-all cursor-pointer neon-glow-btn-sky ${
                currentPage === 'materiais'
                  ? 'bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 text-slate-950 shadow-[0_0_35px_rgba(56,189,248,1)] border-2 border-sky-100 scale-102'
                  : 'bg-sky-950/60 text-sky-300 border-2 border-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.6)] hover:bg-sky-900/80 hover:text-white hover:border-sky-300'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)] shrink-0" />
              <span>MATERIAIS DE APOIO</span>
            </button>

            {/* Administrador: Aba Exclusiva visível apenas para usuário Admin */}
            {currentUser?.tipo === 'admin' && (
              <button
                onClick={() => onNavigate('admin')}
                className={`w-full min-h-[42px] px-1.5 py-2 rounded-xl flex items-center justify-center gap-1 text-[9.5px] xl:text-[10.5px] 2xl:text-xs font-black uppercase tracking-tight text-center leading-tight transition-all cursor-pointer ${
                  currentPage === 'admin'
                    ? 'bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 text-slate-950 shadow-[0_0_32px_rgba(251,191,36,0.95)] border-2 border-amber-100 scale-102'
                    : 'bg-amber-950/70 text-amber-300 border-2 border-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.55)] hover:bg-amber-900/80 hover:text-white hover:border-amber-300'
                }`}
              >
                <ShieldCheck className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${currentPage === 'admin' ? 'text-slate-950' : 'text-amber-300'}`} />
                <span>ADMINISTRADOR</span>
              </button>
            )}

            {/* Login / Logout Button in UPPERCASE - Proportional item */}
            {currentUser ? (
              <button
                onClick={onLogout}
                className="w-full min-h-[42px] bg-rose-600 hover:bg-rose-500 text-white font-black px-1.5 py-2 rounded-xl flex items-center justify-center gap-1.5 text-[10px] xl:text-[11px] 2xl:text-xs uppercase tracking-tight border-2 border-rose-300 shadow-[0_0_25px_rgba(244,63,94,0.85)] hover:shadow-[0_0_40px_rgba(244,63,94,1)] hover:scale-102 transition-all cursor-pointer text-center leading-tight"
              >
                <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>SAIR ({currentUser.nome.split(' ')[0].toUpperCase()})</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="w-full min-h-[42px] bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black px-2 py-2 rounded-xl flex items-center justify-center gap-1.5 text-[10px] xl:text-[11px] 2xl:text-xs uppercase tracking-tight border-2 border-cyan-200 shadow-[0_0_28px_rgba(0,240,255,0.95)] hover:shadow-[0_0_45px_rgba(0,240,255,1)] hover:scale-102 transition-all cursor-pointer text-center leading-tight"
              >
                <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-slate-950 shrink-0" />
                <span>ENTRAR</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
