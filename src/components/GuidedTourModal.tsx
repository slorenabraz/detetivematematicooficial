import React, { useState, useEffect } from 'react';
import {
  Compass,
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Target,
  GraduationCap,
  TrendingUp,
  Users,
  Trophy,
  BookOpen,
  HelpCircle,
  Lightbulb,
  ExternalLink
} from 'lucide-react';

interface GuidedTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

interface TourStep {
  id: string;
  page: string;
  badge: string;
  titulo: string;
  subtitulo: string;
  icon: React.ReactNode;
  corNeon: string;
  bordaNeon: string;
  glowBg: string;
  descricao: string;
  paraQueServe: string;
  dicaInvestigativa: string;
  tags: string[];
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'inicio',
    page: 'inicio',
    badge: 'Módulo 1 de 6 • Ponto de Partida',
    titulo: 'Início & Laboratório Holográfico',
    subtitulo: 'Centro de Inteligência Matemática',
    icon: <Compass className="w-7 h-7 text-amber-300" />,
    corNeon: 'text-amber-300',
    bordaNeon: 'border-amber-400/80 shadow-[0_0_25px_rgba(251,191,36,0.3)]',
    glowBg: 'from-amber-950/40 via-yellow-950/20 to-transparent',
    descricao:
      'O hub inicial da plataforma reúne os conceitos fundamentais de Geometria e Trigonometria, a Dica Matemática do Dia e o carrossel dinâmico com fórmulas essenciais.',
    paraQueServe:
      'Apresentar os pilares teóricos (Pitágoras, Senos, Cossenos e Semelhança) e fornecer acesso rápido a todos os ambientes de investigação.',
    dicaInvestigativa:
      'Consulte a Dica Matemática do Dia no início de cada sessão. Ela traz curiosidades geométricas que ajudam a resolver os enigmas dos desafios!',
    tags: ['Dica do Dia', 'Carrossel de Fórmulas', 'Teorema de Pitágoras', 'Leis de Senos e Cossenos']
  },
  {
    id: 'desafios',
    page: 'desafios',
    badge: 'Módulo 2 de 6 • Desafios Competitivos',
    titulo: 'Desafios Oficiais & Treine Mais',
    subtitulo: 'Cronômetro de 2 minutos e Pistas Invertidas',
    icon: <Target className="w-7 h-7 text-cyan-300" />,
    corNeon: 'text-cyan-300',
    bordaNeon: 'border-cyan-400/80 shadow-[0_0_25px_rgba(0,240,255,0.3)]',
    glowBg: 'from-cyan-950/40 via-blue-950/20 to-transparent',
    descricao:
      'Nos Desafios Oficiais por Etapas, seu papel de detetive é identificar a AFIRMAÇÃO INCORRETA (pista falsa) em até 2 minutos por questão, pontuando no Ranking Escolar.',
    paraQueServe:
      'Desenvolver agilidade de raciocínio investigativo e testar a identificação de pegadinhas e erros conceituais.',
    dicaInvestigativa:
      'Use o Treine Mais para praticar sem limite de tempo com as Dicas de Investigação e os diagramas interativos antes de disputar os Desafios Oficiais.',
    tags: ['4 Etapas Oficiais', 'Cronômetro 2 min', 'Pistas Invertidas', 'Treine Mais Sem Pressa']
  },
  {
    id: 'curriculo',
    page: 'curriculo',
    badge: 'Módulo 3 de 6 • Sala de Aula SP',
    titulo: 'Currículo em Ação (4º Bimestre SP)',
    subtitulo: '15 Questões por Série com Barra de XP',
    icon: <GraduationCap className="w-7 h-7 text-orange-400" />,
    corNeon: 'text-orange-400',
    bordaNeon: 'border-orange-500/80 shadow-[0_0_25px_rgba(249,115,22,0.35)]',
    glowBg: 'from-orange-950/40 via-amber-950/20 to-transparent',
    descricao:
      'Módulo 100% alinhado ao Material Digital e Livro do Estudante do Estado de São Paulo para todas as séries do 6º Ano do Ensino Fundamental ao 3º Ano do Ensino Médio.',
    paraQueServe:
      'Reforçar o aprendizado de sala de aula com exercícios específicos do 4º Bimestre, feedback pedagógico passo a passo e barra de progressão gamer de 0 a 1500 XP.',
    dicaInvestigativa:
      'Este módulo é formativo e NÃO altera sua posição no ranking competitivo. Treine quantas vezes desejar para alcançar o Nível Máximo (100% de XP)!',
    tags: ['Do 6º EF ao 3º EM', 'Livro do Estudante SP', 'Barra de XP Gamer', 'Sem Impactar o Ranking']
  },
  {
    id: 'resultados',
    page: 'resultados',
    badge: 'Módulo 4 de 6 • Diagnóstico Pessoal',
    titulo: 'Meus Resultados & Diagnóstico',
    subtitulo: 'Análise de Erros e Mensagem de Foco',
    icon: <TrendingUp className="w-7 h-7 text-emerald-400" />,
    corNeon: 'text-emerald-400',
    bordaNeon: 'border-emerald-400/80 shadow-[0_0_25px_rgba(16,185,129,0.3)]',
    glowBg: 'from-emerald-950/40 via-teal-950/20 to-transparent',
    descricao:
      'Acompanhe seu histórico completo: total de acertos, erros, taxa de precisão, tempo médio investigativo por pergunta e diagnósticos formativos detalhados.',
    paraQueServe:
      'Apresentar onde você teve mais dificuldade, quais foram seus pontos fortes e orientações pedagógicas da Profª Ariane Braz para manter a constância nos estudos.',
    dicaInvestigativa:
      'Alterne entre as abas Desafios Oficiais e Currículo em Ação para comparar sua evolução temporal e identificar os tópicos que merecem revisão.',
    tags: ['Onde Mais Errou', 'Pontos Fortes', 'Tempo Médio p/ Questão', 'Incentivo da Docente']
  },
  {
    id: 'professores',
    page: 'professores',
    badge: 'Módulo 5 de 6 • Gestão Pedagógica',
    titulo: 'Painel dos Professores',
    subtitulo: 'Tempo por Pergunta & Intervenção',
    icon: <Users className="w-7 h-7 text-purple-400" />,
    corNeon: 'text-purple-400',
    bordaNeon: 'border-purple-400/80 shadow-[0_0_25px_rgba(168,85,247,0.3)]',
    glowBg: 'from-purple-950/40 via-fuchsia-950/20 to-transparent',
    descricao:
      'Área analítica para docentes da rede pública acompanharem os dados das turmas: quanto tempo cada aluno ficou nas questões, taxa de erro por tema e diagnósticos.',
    paraQueServe:
      'Gerar relatórios de intervenção pedagógica indicando qual tema requer recuperação imediata e qual já foi consolidado pela sala.',
    dicaInvestigativa:
      'Professores podem filtrar relatórios por turma específica e alternar entre os módulos oficiais e o Currículo em Ação.',
    tags: ['Acesso Restrito Docente', 'Tempo Dedicado por Pergunta', 'Tema Crítico da Sala', 'Intervenção Guiada']
  },
  {
    id: 'ranking',
    page: 'ranking',
    badge: 'Módulo 6 de 6 • Comunidade & Apoio',
    titulo: 'Ranking Escolar & Materiais de Apoio',
    subtitulo: 'Hall de Honra e Biblioteca de Consulta',
    icon: <Trophy className="w-7 h-7 text-pink-400" />,
    corNeon: 'text-pink-400',
    bordaNeon: 'border-pink-400/80 shadow-[0_0_25px_rgba(244,63,94,0.3)]',
    glowBg: 'from-pink-950/40 via-rose-950/20 to-transparent',
    descricao:
      'Veja a classificação dos detetives matemáticos por série e por escola no Ranking, e acerte mais questões consultando a aba de Materiais de Apoio.',
    paraQueServe:
      'Celebrar o engajamento dos estudantes e disponibilizar tabelas trigonométricas completas (sen, cos, tg para 30°, 45° e 60°) e fórmulas em um só lugar.',
    dicaInvestigativa:
      'Antes de iniciar desafios difíceis, dê uma olhada rápida na aba Materiais de Apoio para memorizar as relações métricas e trigonométricas!',
    tags: ['Ranking por Sala', 'Tabelas Trigonométricas', 'Ângulos Notáveis', 'Biografias Históricas']
  }
];

export const GuidedTourModal: React.FC<GuidedTourModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Keyboard navigation (Arrow keys and Escape)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStep]);

  if (!isOpen) return null;

  const step = TOUR_STEPS[currentStep];

  const handleNext = () => {
    if (currentStep + 1 < TOUR_STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleJumpToModule = () => {
    onNavigate(step.page);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md animate-fadeIn">
      {/* Container Cyber HUD */}
      <div
        className={`relative w-full max-w-2xl bg-gradient-to-b ${step.glowBg} to-[#060a16] border-2 ${step.bordaNeon} rounded-3xl p-5 sm:p-7 shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-300`}
      >
        {/* Futuristic Corner Brackets */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

        {/* Top Bar: Badge, Step Indicator & Close Button */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>TOUR GUIADO // {step.badge}</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-900/80 hover:bg-rose-950/80 border border-slate-700 hover:border-rose-500/60 text-slate-400 hover:text-rose-300 flex items-center justify-center transition-colors cursor-pointer"
            title="Fechar Tour Guiado (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Interactive Step Progress Dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {TOUR_STEPS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentStep(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentStep
                  ? 'w-8 bg-gradient-to-r from-amber-400 to-orange-500 shadow-[0_0_10px_rgba(251,191,36,0.8)]'
                  : idx < currentStep
                  ? 'w-3 bg-emerald-500/80'
                  : 'w-2 bg-slate-800 hover:bg-slate-700'
              }`}
              title={`Ir para passo ${idx + 1}: ${s.titulo}`}
            />
          ))}
        </div>

        {/* Main Content Area */}
        <div className="space-y-5">
          {/* Module Header Card */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#080d1d] border-2 border-slate-700 flex items-center justify-center shadow-inner shrink-0">
              {step.icon}
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">
                {step.subtitulo}
              </span>
              <h3 className={`text-2xl sm:text-3xl font-black font-['Oxanium',sans-serif] ${step.corNeon} tracking-wide`}>
                {step.titulo}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            {step.descricao}
          </p>

          {/* Contextual Guidance Grid: Objetivo vs Dica de Investigação */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-3.5 rounded-2xl bg-[#080d1d]/90 border border-slate-800 space-y-1.5">
              <span className="text-[11px] font-mono font-bold text-cyan-300 uppercase flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-cyan-400" />
                <span>Objetivo do Módulo</span>
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {step.paraQueServe}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#080d1d]/90 border border-amber-500/40 space-y-1.5">
              <span className="text-[11px] font-mono font-bold text-amber-300 uppercase flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>Dica de Investigação</span>
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {step.dicaInvestigativa}
              </p>
            </div>
          </div>

          {/* Feature Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {step.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-slate-900/90 border border-slate-700/80 text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Navigation Controls */}
        <div className="mt-7 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleJumpToModule}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Explorar Módulo Agora</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                currentStep === 0
                  ? 'opacity-40 bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Anterior</span>
            </button>

            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(251,191,36,0.6)] hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{currentStep + 1 === TOUR_STEPS.length ? 'Concluir Tour' : 'Próximo Módulo'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
