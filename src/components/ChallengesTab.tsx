import React, { useState, useEffect, useRef } from 'react';
import { User, Question } from '../types';
import { MathDiagram } from './MathDiagram';
import { InvestigationHintBalloon } from './InvestigationHintBalloon';
import { NeonChallengeProgressBar } from './NeonChallengeProgressBar';
import { MathParticleCelebration } from './MathParticleCelebration';
import { Storage } from '../utils/storage';
import {
  Target,
  GraduationCap,
  Timer,
  CheckCircle2,
  XCircle,
  ArrowRight,
  AlertTriangle,
  RotateCcw,
  Trophy,
  Lock,
  Check
} from 'lucide-react';

interface ChallengesTabProps {
  currentUser: User | null;
  onOpenAuth: () => void;
  onNavigate: (page: string) => void;
  officialQuestions: Record<number, Question[]>;
  practiceQuestions: Question[];
  onRefreshQuestions: () => void;
}

const ETAPAS_INFO: Record<number, { titulo: string; icon: string; badge: string }> = {
  1: { titulo: 'Etapa 1: Teorema de Pitágoras', icon: '📐', badge: 'Etapa 1 de 4' },
  2: { titulo: 'Etapa 2: Lei dos Senos', icon: '📏', badge: 'Etapa 2 de 4' },
  3: { titulo: 'Etapa 3: Lei dos Cossenos', icon: '📊', badge: 'Etapa 3 de 4' },
  4: { titulo: 'Etapa 4: Relações de Semelhança', icon: '🔺', badge: 'Etapa 4 de 4' }
};

export const ChallengesTab: React.FC<ChallengesTabProps> = ({
  currentUser,
  onOpenAuth,
  onNavigate,
  officialQuestions,
  practiceQuestions,
  onRefreshQuestions
}) => {
  // Mode selection: 'menu' | 'oficial' | 'treine_mais'
  const [mode, setMode] = useState<'menu' | 'oficial' | 'treine_mais'>('menu');

  // -------------------------------------------------------------
  // MODO OFICIAL STATE (2 MINUTOS = 120 SEGUNDOS POR QUESTÃO)
  // -------------------------------------------------------------
  const OFFICIAL_TIME_LIMIT = 120;
  const formatOfficialTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const [etapaOficial, setEtapaOficial] = useState<number>(1);
  const [etapaCardOpen, setEtapaCardOpen] = useState<boolean>(true);
  const [questaoIdxOficial, setQuestaoIdxOficial] = useState<number>(0);
  const [tempoRestanteOficial, setTempoRestanteOficial] = useState<number>(OFFICIAL_TIME_LIMIT);
  const [selectedOptionOficial, setSelectedOptionOficial] = useState<number | null>(null);
  const [isAnswerConfirmedOficial, setIsAnswerConfirmedOficial] = useState<boolean>(false);
  const [acertosOficial, setAcertosOficial] = useState<number>(0);
  const [errosOficial, setErrosOficial] = useState<number>(0);
  const [desafioConcluidoOficial, setDesafioConcluidoOficial] = useState<boolean>(false);
  const [showHintOficial, setShowHintOficial] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);
  const questionStartTimeRef = useRef<number>(Date.now());

  // -------------------------------------------------------------
  // MODO TREINE MAIS STATE
  // -------------------------------------------------------------
  const [idxTreine, setIdxTreine] = useState<number>(0);
  const [selectedOptionTreine, setSelectedOptionTreine] = useState<number | null>(null);
  const [isAnswerConfirmedTreine, setIsAnswerConfirmedTreine] = useState<boolean>(false);
  const [acertosTreine, setAcertosTreine] = useState<number>(0);
  const [errosTreine, setErrosTreine] = useState<number>(0);
  const [treineConcluido, setTreineConcluido] = useState<boolean>(false);
  const [showHintTreine, setShowHintTreine] = useState<boolean>(false);
  const [celebrationTrigger, setCelebrationTrigger] = useState<number>(0);
  const [levelTransitionModal, setLevelTransitionModal] = useState<{
    visible: boolean;
    titulo: string;
    desc: string;
  } | null>(null);
  const treineQuestionStartTimeRef = useRef<number>(Date.now());

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Timer loop for Official Challenge question
  useEffect(() => {
    if (mode === 'oficial' && !etapaCardOpen && !desafioConcluidoOficial && !isAnswerConfirmedOficial) {
      setTempoRestanteOficial(OFFICIAL_TIME_LIMIT);
      questionStartTimeRef.current = Date.now();

      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = window.setInterval(() => {
        setTempoRestanteOficial((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            handleTimeExpiredOficial();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [mode, etapaOficial, questaoIdxOficial, etapaCardOpen, desafioConcluidoOficial]);

  const handleTimeExpiredOficial = () => {
    const q = officialQuestions[etapaOficial]?.[questaoIdxOficial];
    if (!q) return;

    setIsAnswerConfirmedOficial(true);
    setErrosOficial((prev) => prev + 1);

    if (currentUser) {
      Storage.saveAttempt({
        id: `att-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        usuarioId: currentUser.id,
        alunoNome: currentUser.nome,
        serie: currentUser.serie,
        modo: 'oficial',
        etapaNumero: etapaOficial,
        temaNome: q.temaNome,
        pergunta: q.pergunta,
        respostaSelecionada: 'Tempo Esgotado (Nenhuma resposta)',
        respostaCorreta: q.opcoes[q.correta],
        acertou: false,
        tempoGastoSegundos: OFFICIAL_TIME_LIMIT,
        data: new Date().toLocaleDateString('pt-BR'),
        timestamp: Date.now()
      });
    }
  };

  const handleStartModoOficial = () => {
    setMode('oficial');
    setEtapaOficial(1);
    setQuestaoIdxOficial(0);
    setAcertosOficial(0);
    setErrosOficial(0);
    setEtapaCardOpen(true);
    setDesafioConcluidoOficial(false);
    setSelectedOptionOficial(null);
    setIsAnswerConfirmedOficial(false);
    setShowHintOficial(false);
  };

  const handleStartEtapaInvestigacao = () => {
    setEtapaCardOpen(false);
    setSelectedOptionOficial(null);
    setIsAnswerConfirmedOficial(false);
    setShowHintOficial(false);
    setTempoRestanteOficial(OFFICIAL_TIME_LIMIT);
  };

  const handleConfirmAnswerOficial = () => {
    if (selectedOptionOficial === null || isAnswerConfirmedOficial) return;

    if (timerRef.current) clearInterval(timerRef.current);

    const q = officialQuestions[etapaOficial]?.[questaoIdxOficial];
    if (!q) return;

    const tempoGasto = Math.max(
      1,
      Math.min(OFFICIAL_TIME_LIMIT, OFFICIAL_TIME_LIMIT - tempoRestanteOficial)
    );
    const acertou = selectedOptionOficial === q.correta;

    setIsAnswerConfirmedOficial(true);
    if (acertou) {
      setAcertosOficial((prev) => prev + 1);
      setCelebrationTrigger(Date.now());
    } else {
      setErrosOficial((prev) => prev + 1);
    }

    if (currentUser) {
      Storage.saveAttempt({
        id: `att-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        usuarioId: currentUser.id,
        alunoNome: currentUser.nome,
        serie: currentUser.serie,
        modo: 'oficial',
        etapaNumero: etapaOficial,
        temaNome: q.temaNome,
        pergunta: q.pergunta,
        respostaSelecionada: q.opcoes[selectedOptionOficial],
        respostaCorreta: q.opcoes[q.correta],
        acertou,
        tempoGastoSegundos: tempoGasto,
        data: new Date().toLocaleDateString('pt-BR'),
        timestamp: Date.now()
      });
    }
  };

  const handleNextQuestaoOficial = () => {
    setShowHintOficial(false);
    if (questaoIdxOficial < 1) {
      setQuestaoIdxOficial(1);
      setSelectedOptionOficial(null);
      setIsAnswerConfirmedOficial(false);
    } else {
      if (etapaOficial < 4) {
        setEtapaOficial((prev) => prev + 1);
        setQuestaoIdxOficial(0);
        setEtapaCardOpen(true);
        setSelectedOptionOficial(null);
        setIsAnswerConfirmedOficial(false);
      } else {
        setDesafioConcluidoOficial(true);
        if (currentUser) {
          const totalQ = acertosOficial + errosOficial;
          const tempoMedio = 25;
          Storage.saveResult({
            id: `res-${Date.now()}`,
            usuarioId: currentUser.id,
            alunoNome: currentUser.nome,
            serie: currentUser.serie,
            modo: 'oficial',
            etapaNome: 'Desafio Oficial Invertido (4 Etapas)',
            acertos: acertosOficial,
            erros: errosOficial,
            tempoTotalSegundos: totalQ * tempoMedio,
            tempoMedioPorQuestao: tempoMedio,
            data: new Date().toLocaleDateString('pt-BR'),
            timestamp: Date.now()
          });
        }
      }
    }
  };

  const handleStartModoTreineMais = () => {
    setMode('treine_mais');
    setIdxTreine(0);
    setAcertosTreine(0);
    setErrosTreine(0);
    setTreineConcluido(false);
    setSelectedOptionTreine(null);
    setIsAnswerConfirmedTreine(false);
    setShowHintTreine(false);
    treineQuestionStartTimeRef.current = Date.now();
    setLevelTransitionModal({
      visible: true,
      titulo: 'Módulo Treine Mais Iniciado!',
      desc: 'Você iniciará 15 questões progressivas de Trigonometria divididas em Níveis Iniciante (1-5), Intermediário (6-10) e Avançado (11-15). Sem limite de tempo, com explicações didáticas!'
    });
  };

  const handleConfirmAnswerTreine = () => {
    if (selectedOptionTreine === null || isAnswerConfirmedTreine) return;

    const q = practiceQuestions[idxTreine];
    if (!q) return;

    const tempoGasto = Math.max(2, Math.round((Date.now() - treineQuestionStartTimeRef.current) / 1000));
    const acertou = selectedOptionTreine === q.correta;

    setIsAnswerConfirmedTreine(true);
    if (acertou) {
      setAcertosTreine((prev) => prev + 1);
      setCelebrationTrigger(Date.now());
    } else {
      setErrosTreine((prev) => prev + 1);
    }

    if (currentUser) {
      Storage.saveAttempt({
        id: `att-treine-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        usuarioId: currentUser.id,
        alunoNome: currentUser.nome,
        serie: currentUser.serie,
        modo: 'treine_mais',
        temaNome: q.temaNome,
        pergunta: q.pergunta,
        respostaSelecionada: q.opcoes[selectedOptionTreine],
        respostaCorreta: q.opcoes[q.correta],
        acertou,
        tempoGastoSegundos: tempoGasto,
        data: new Date().toLocaleDateString('pt-BR'),
        timestamp: Date.now()
      });
    }
  };

  const handleNextQuestaoTreine = () => {
    setShowHintTreine(false);
    const nextIdx = idxTreine + 1;
    if (nextIdx < practiceQuestions.length) {
      if (nextIdx === 5) {
        setLevelTransitionModal({
          visible: true,
          titulo: 'Parabéns! Nível Intermediário',
          desc: 'Você completou o Nível Iniciante. Agora vamos aprofundar com a Relação Fundamental, ângulos notáveis e cálculos no Nível Intermediário!'
        });
      } else if (nextIdx === 10) {
        setLevelTransitionModal({
          visible: true,
          titulo: 'Sensacional! Nível Avançado',
          desc: 'Você alcançou as 5 questões do Nível Avançado! Concentre-se nas Leis dos Cossenos, triângulos obtusos e aplicações geométricas.'
        });
      }

      setIdxTreine(nextIdx);
      setSelectedOptionTreine(null);
      setIsAnswerConfirmedTreine(false);
      treineQuestionStartTimeRef.current = Date.now();
    } else {
      setTreineConcluido(true);
    }
  };

  // Guard: Not logged in
  if (!currentUser) {
    return (
      <div className="bg-[#0b1329]/80 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-[0_0_30px_rgba(0,240,255,0.15)] border border-cyan-500/30 text-center max-w-xl mx-auto space-y-6">
        <div className="w-20 h-20 bg-amber-500/20 border border-amber-500/40 text-amber-400 rounded-3xl flex items-center justify-center text-4xl mx-auto shadow-[0_0_15px_rgba(251,191,36,0.2)]">
          <Lock className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Acesso Restrito aos Módulos
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Para acessar os <strong>Desafios Oficiais</strong> e o <strong>Treine Mais</strong> com perguntas dinâmicas geradas a cada login, você precisa estar conectado como Aluno ou Professor.
          </p>
        </div>
        <button
          onClick={onOpenAuth}
          className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black px-8 py-3.5 rounded-2xl transition shadow-[0_0_20px_rgba(251,191,36,0.4)] inline-flex items-center gap-2 cursor-pointer"
        >
          Fazer Login ou Criar Cadastro
        </button>
      </div>
    );
  }

  // SUB-MENU DE ESCOLHA DOS MODOS
  if (mode === 'menu') {
    return (
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="bg-[#0b1329]/90 border border-cyan-500/30 text-white p-6 sm:p-8 rounded-3xl shadow-[0_0_25px_rgba(0,240,255,0.15)] text-center space-y-3">
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
            Módulos Pedagógicos Ativos
          </span>
          <h2 className="text-2xl sm:text-4xl font-black">
            Escolha seu Modo de Investigação
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Selecione entre os <strong>Desafios Oficiais</strong> (cronometrados e classificatórios no Ranking) ou o treinamento livre no <strong>Treine Mais</strong> com feedback passo a passo!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Opção 1: Desafios Oficiais */}
          <div className="bg-[#0b1329]/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-cyan-500/30 hover:border-amber-400 transition flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-3xl rounded-2xl flex items-center justify-center font-bold shadow-sm">
                🎯
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Desafios Oficiais (4 Etapas)
                </h3>
                <span className="text-xs font-bold text-amber-300 bg-amber-500/20 border border-amber-500/40 px-2.5 py-0.5 rounded-full inline-block mt-1">
                  Valendo Pontos para o Ranking Escolar
                </span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                <strong className="text-amber-300">Modo Invertido!</strong> Analise as pistas de cada etapa e encontre a opção <strong className="text-rose-400">INCORRETA</strong> antes que o tempo de 2 minutos esgote. Questões e alternativas sorteadas dinamicamente a cada login!
              </p>
              <ul className="text-xs text-slate-400 space-y-1.5 pt-1">
                <li className="flex items-center gap-2 text-cyan-300">✓ Etapa 1: Teorema de Pitágoras</li>
                <li className="flex items-center gap-2 text-cyan-300">✓ Etapa 2: Lei dos Senos</li>
                <li className="flex items-center gap-2 text-cyan-300">✓ Etapa 3: Lei dos Cossenos</li>
                <li className="flex items-center gap-2 text-cyan-300">✓ Etapa 4: Relações de Semelhança</li>
              </ul>
            </div>

            <button
              onClick={handleStartModoOficial}
              className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black py-4 rounded-2xl transition border-2 border-amber-300/80 neon-glow-btn-cyan flex items-center justify-center gap-2 cursor-pointer"
            >
              <Target className="w-5 h-5 fill-slate-950" /> Iniciar Desafios Oficiais
            </button>
          </div>

          {/* Opção 2: Treine Mais */}
          <div className="bg-[#0b1329]/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-cyan-500/30 hover:border-emerald-400 transition flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-3xl rounded-2xl flex items-center justify-center font-bold shadow-sm">
                📐
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Treine Mais (Trigonometria)
                </h3>
                <span className="text-xs font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 rounded-full inline-block mt-1">
                  Aprendizado Progressivo com Imagens
                </span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                15 questões exclusivas de Trigonometria divididas em 3 Níveis (Iniciante, Intermediário e Avançado). Sem cronômetro, com diagramas holográficos e explicações didáticas em cada resposta!
              </p>
              <ul className="text-xs text-slate-400 space-y-1.5 pt-1">
                <li className="flex items-center gap-2 text-emerald-300">✓ Nível Iniciante (Q1 a Q5)</li>
                <li className="flex items-center gap-2 text-emerald-300">✓ Nível Intermediário (Q6 a Q10)</li>
                <li className="flex items-center gap-2 text-emerald-300">✓ Nível Avançado (Q11 a Q15)</li>
                <li className="flex items-center gap-2 text-emerald-300">✓ Botão Confirmar Resposta em cada questão</li>
              </ul>
            </div>

            <button
              onClick={handleStartModoTreineMais}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black py-4 rounded-2xl transition border-2 border-emerald-300/80 neon-glow-btn-cyan flex items-center justify-center gap-2 cursor-pointer"
            >
              <GraduationCap className="w-5 h-5 fill-slate-950" /> Iniciar Treine Mais
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MODO 1: DESAFIOS OFICIAIS (4 ETAPAS)
  if (mode === 'oficial') {
    const currentQList = officialQuestions[etapaOficial] || [];
    const qAtual = currentQList[questaoIdxOficial];
    const infoEtapa = ETAPAS_INFO[etapaOficial] || { titulo: `Etapa ${etapaOficial}`, icon: '📐', badge: `Etapa ${etapaOficial}` };

    if (desafioConcluidoOficial) {
      return (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-[#0b1329]/95 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-[0_0_30px_rgba(16,185,129,0.3)] border-4 border-emerald-500 text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-400 rounded-3xl flex items-center justify-center text-5xl mx-auto">
              🏆
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-white">
                Parabéns, Detetive {currentUser.nome}!
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Você concluiu com sucesso todas as 4 etapas da investigação matemática dos Desafios Oficiais!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-500/40">
                <span className="text-xs text-emerald-300 font-bold uppercase block">Acertos</span>
                <span className="text-3xl font-black text-emerald-400 font-mono">{acertosOficial}</span>
              </div>
              <div className="bg-rose-950/60 p-4 rounded-2xl border border-rose-500/40">
                <span className="text-xs text-rose-300 font-bold uppercase block">Erros</span>
                <span className="text-3xl font-black text-rose-400 font-mono">{errosOficial}</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Seus resultados foram registrados com sucesso no histórico escolar e computados no Ranking!
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('ranking')}
                className="bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black px-6 py-3.5 rounded-2xl shadow-[0_0_20px_rgba(251,191,36,0.4)] transition flex items-center gap-2 text-sm cursor-pointer"
              >
                <Trophy className="w-5 h-5 fill-slate-950" /> Ver Ranking da Escola
              </button>
              <button
                onClick={() => setMode('menu')}
                className="bg-[#0e172e] hover:bg-[#152347] text-cyan-200 border border-cyan-500/40 font-bold px-6 py-3.5 rounded-2xl transition text-sm cursor-pointer"
              >
                Voltar aos Desafios
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (etapaCardOpen) {
      return (
        <div className="max-w-2xl mx-auto space-y-6">
          <button
            onClick={() => setMode('menu')}
            className="text-cyan-400 hover:text-cyan-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            ← Voltar à seleção de modos
          </button>

          <div className="bg-[#0b1329]/95 border-2 border-amber-400/60 text-white p-6 rounded-3xl shadow-[0_0_25px_rgba(251,191,36,0.2)]">
            <div className="flex items-center gap-4">
              <div className="text-4xl">{infoEtapa.icon}</div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/40 inline-block">
                  {infoEtapa.badge}
                </span>
                <h2 className="text-2xl font-black mt-1 text-white">
                  {infoEtapa.titulo}
                </h2>
                <p className="text-xs font-bold text-amber-300 mt-1">
                  ⚠️ "Sua missão é usar as pistas pedagógicas para encontrar a alternativa INCORRETA!"
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#0b1329]/90 border border-cyan-500/30 p-8 rounded-3xl shadow-xl text-center space-y-5">
            <div className="text-5xl">{infoEtapa.icon}</div>
            <h3 className="text-2xl font-black text-white">
              Pronto para iniciar a {infoEtapa.titulo}?
            </h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
              Serão apresentadas 2 questões contendo pistas pedagógicas. Lembre-se: selecione a afirmativa <strong className="text-rose-400">INCORRETA</strong> e clique em <strong>"Confirmar Resposta"</strong>! O cronômetro de 2 minutos iniciará assim que você clicar abaixo.
            </p>

            <button
              onClick={handleStartEtapaInvestigacao}
              className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-base px-8 py-4 rounded-2xl border-2 border-emerald-300/80 neon-glow-btn-emerald transition inline-flex items-center gap-2 cursor-pointer"
            >
              <span>🔍</span> Iniciar Investigação da Etapa
            </button>
          </div>
        </div>
      );
    }

    const currentResolvedOficial = (etapaOficial - 1) * 2 + questaoIdxOficial + (isAnswerConfirmedOficial ? 1 : 0);

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        {/* EFEITO DE PARTÍCULAS / CONFETE GEOMÉTRICO AO ACERTAR */}
        <MathParticleCelebration trigger={celebrationTrigger} />

        {/* BARRA DE PROGRESSO VISUAL NEON NO TOPO (MODO OFICIAL: 8 ITENS) */}
        <NeonChallengeProgressBar
          mode="oficial"
          currentResolved={currentResolvedOficial}
          totalItems={8}
          currentStageNumber={etapaOficial}
        />

        <div className="flex items-center justify-between">
          <button
            onClick={() => setMode('menu')}
            className="text-cyan-400 hover:text-cyan-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            ← Voltar ao Menu
          </button>
          <span className="text-xs font-extrabold text-cyan-300">
            Questão {questaoIdxOficial + 1} de 2 • {infoEtapa.titulo}
          </span>
        </div>

        <div className="bg-[#0b1329]/90 border-2 border-cyan-500/40 p-6 sm:p-8 rounded-3xl shadow-[0_0_30px_rgba(0,240,255,0.15)] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
            <div>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 font-black text-xs px-3 py-1 rounded-full uppercase">
                {infoEtapa.badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                {infoEtapa.titulo}
              </h3>
            </div>

            <div className="bg-[#060a16] px-4 py-2 rounded-2xl border border-cyan-500/40 text-right flex items-center gap-3">
              <Timer className={`w-5 h-5 ${tempoRestanteOficial <= 20 ? 'text-rose-400 animate-spin' : 'text-cyan-400'}`} />
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-extrabold">Tempo Restante</span>
                <span className={`text-xl font-black font-mono tabular-nums ${tempoRestanteOficial <= 20 ? 'timer-blink text-rose-400' : 'text-cyan-300'}`}>
                  {formatOfficialTimer(tempoRestanteOficial)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-amber-950/40 border-l-4 border-amber-500 p-3.5 rounded-r-2xl">
            <p className="text-xs font-black text-amber-300 uppercase flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" /> Objetivo da Investigação (Invertido):
            </p>
            <p className="text-xs text-amber-200 mt-0.5">
              Analise as pistas fornecidas em cada opção e marque a afirmação <strong>INCORRETA (FALSA)</strong>. Em seguida, clique em <strong>"Confirmar Resposta"</strong>.
            </p>
          </div>

          <div className="bg-[#060a16] p-4 sm:p-5 rounded-2xl border border-cyan-500/20">
            <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              {qAtual ? qAtual.pergunta : 'Carregando questão...'}
            </p>
          </div>

          {/* DICA DE INVESTIGAÇÃO COM BALÃO NEON SUAVE (OFICIAL) */}
          {qAtual && (
            <InvestigationHintBalloon
              question={qAtual}
              isOpen={showHintOficial}
              onToggle={() => setShowHintOficial((prev) => !prev)}
              accentColor="amber"
            />
          )}

          {qAtual && (
            <div className="space-y-3">
              {qAtual.opcoes.map((opcao, index) => {
                const isSelected = selectedOptionOficial === index;
                const isCorrectFalse = index === qAtual.correta;

                let optionStyles = 'border-cyan-500/20 bg-[#070c1a] hover:border-cyan-400/50 text-slate-200';

                if (!isAnswerConfirmedOficial && isSelected) {
                  optionStyles = 'border-cyan-400 bg-cyan-950/70 text-cyan-100 shadow-[0_0_15px_rgba(0,240,255,0.3)] ring-1 ring-cyan-400';
                }

                if (isAnswerConfirmedOficial) {
                  if (isCorrectFalse) {
                    optionStyles = 'border-emerald-400 bg-emerald-950/70 text-emerald-100 font-bold ring-2 ring-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.35)]';
                  } else if (isSelected && !isCorrectFalse) {
                    optionStyles = 'border-rose-500 bg-rose-950/70 text-rose-100 font-bold';
                  } else {
                    optionStyles = 'opacity-50 border-slate-800 bg-[#060914] text-slate-500';
                  }
                }

                return (
                  <button
                    key={index}
                    disabled={isAnswerConfirmedOficial}
                    onClick={() => setSelectedOptionOficial(index)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 cursor-pointer ${optionStyles}`}
                  >
                    <span className={`w-7 h-7 rounded-full border text-center text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected && !isAnswerConfirmedOficial
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black'
                        : isAnswerConfirmedOficial && isCorrectFalse
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black'
                        : 'bg-[#0b1428] text-cyan-300 border-cyan-500/30'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-xs sm:text-sm leading-relaxed flex-grow">{opcao}</span>
                    {isSelected && !isAnswerConfirmedOficial && (
                      <span className="text-cyan-400 text-xs font-bold shrink-0 self-center">Selecionada</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {isAnswerConfirmedOficial && qAtual && (
            <div className={`p-4 rounded-2xl border-2 space-y-1.5 ${
              selectedOptionOficial === qAtual.correta
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/60 border-rose-500/40 text-rose-200'
            }`}>
              <div className="font-bold text-sm flex items-center gap-2">
                {selectedOptionOficial === qAtual.correta ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>✓ Excelente, Detetive! Você identificou corretamente a afirmativa INCORRETA!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-400" />
                    <span>✕ Atenção! A opção destacada em verde era a INCORRETA que você deveria encontrar.</span>
                  </>
                )}
              </div>
              {qAtual.porque && (
                <p className="text-xs leading-relaxed text-slate-300 pt-1">
                  <strong>Pista Pedagógica:</strong> {qAtual.porque}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-cyan-500/20">
            <button
              onClick={() => setMode('menu')}
              className="text-rose-400 hover:text-rose-300 text-xs sm:text-sm font-bold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Desistir do Desafio
            </button>

            {!isAnswerConfirmedOficial ? (
              <button
                disabled={selectedOptionOficial === null}
                onClick={handleConfirmAnswerOficial}
                className={`px-7 py-3 rounded-2xl font-black text-sm flex items-center gap-2 transition ${
                  selectedOptionOficial !== null
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 cursor-pointer border-2 border-emerald-300/80 neon-glow-btn-emerald'
                    : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                }`}
              >
                <Check className="w-4 h-4" /> Confirmar Resposta
              </button>
            ) : (
              <button
                onClick={handleNextQuestaoOficial}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black px-7 py-3 rounded-2xl transition border-2 border-cyan-300/80 neon-glow-btn-cyan flex items-center gap-2 text-sm cursor-pointer"
              >
                <span>
                  {questaoIdxOficial === 1 && etapaOficial === 4 ? 'Concluir Desafio e Ver Ranking' : 'Próxima Questão'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // MODO 2: TREINE MAIS (15 QUESTÕES)
  if (mode === 'treine_mais') {
    const qAtual = practiceQuestions[idxTreine];
    const totalQ = practiceQuestions.length;

    if (treineConcluido) {
      const pct = Math.round((acertosTreine / totalQ) * 100);

      return (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-[#0b1329]/95 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-[0_0_30px_rgba(16,185,129,0.3)] border-4 border-emerald-500 text-center space-y-6">
            <div className="text-6xl">{pct >= 60 ? '🌟' : '💡'}</div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-white">
                Treinamento de Trigonometria Concluído!
              </h3>
              <p className="text-slate-300 text-sm">
                Você percorreu os 3 níveis com empenho e dedicação.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-cyan-500/30">
                <span className="text-xs text-slate-400 font-bold uppercase block">Acertos</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">{acertosTreine} / {totalQ}</span>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-cyan-500/30">
                <span className="text-xs text-slate-400 font-bold uppercase block">Aproveitamento</span>
                <span className="text-2xl font-black text-cyan-300 font-mono">{pct}%</span>
              </div>
            </div>

            <div className={`p-6 rounded-2xl text-sm leading-relaxed max-w-lg mx-auto text-center border ${
              pct >= 60 ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200' : 'bg-blue-950/60 border-blue-500/40 text-blue-200'
            }`}>
              {pct >= 60 ? (
                <>
                  <h4 className="font-extrabold text-base text-emerald-300 mb-1">
                    Parabéns pelo excelente progresso! 🎉
                  </h4>
                  <p className="text-xs leading-relaxed">
                    Você dominou definições fundamentais de seno, cosseno, tangente e leis trigonométricas. Continue avançando com essa mesma curiosidade e paixão matemática!
                  </p>
                </>
              ) : (
                <>
                  <h4 className="font-extrabold text-base text-blue-300 mb-1">
                    Cada erro é um degrau para o aprendizado! 💡
                  </h4>
                  <p className="text-xs leading-relaxed">
                    A Trigonometria fica muito mais simples com a prática contínua. Consulte as fórmulas na aba de apoio e faça mais uma rodada para fixar os conceitos!
                  </p>
                </>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={handleStartModoTreineMais}
                className="bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black px-6 py-3.5 rounded-2xl transition shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center gap-2 text-sm cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Tentar Novamente
              </button>
              <button
                onClick={() => setMode('menu')}
                className="bg-[#0e172e] hover:bg-[#152347] text-cyan-200 border border-cyan-500/40 font-bold px-6 py-3.5 rounded-2xl transition text-sm cursor-pointer"
              >
                Voltar aos Desafios
              </button>
            </div>
          </div>
        </div>
      );
    }

    const nivelTag = idxTreine < 5
      ? { nome: 'Nível Iniciante (Q1 a Q5)', bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40' }
      : idxTreine < 10
      ? { nome: 'Nível Intermediário (Q6 a Q10)', bg: 'bg-amber-500/20 text-amber-300 border-amber-400/40' }
      : { nome: 'Nível Avançado (Q11 a Q15)', bg: 'bg-rose-500/20 text-rose-300 border-rose-400/40' };

    const currentResolvedTreine = idxTreine + (isAnswerConfirmedTreine ? 1 : 0);
    const currentLevelIdx = idxTreine < 5 ? 0 : idxTreine < 10 ? 1 : 2;

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        {/* EFEITO DE PARTÍCULAS / CONFETE GEOMÉTRICO AO ACERTAR */}
        <MathParticleCelebration trigger={celebrationTrigger} />

        {/* BARRA DE PROGRESSO VISUAL NEON NO TOPO (TREINE MAIS: 15 ITENS) */}
        <NeonChallengeProgressBar
          mode="treine_mais"
          currentResolved={currentResolvedTreine}
          totalItems={totalQ}
          currentLevelIndex={currentLevelIdx}
          accentColor="emerald"
        />

        {levelTransitionModal?.visible && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#0b1329] rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-4 shadow-[0_0_30px_rgba(16,185,129,0.4)] border-2 border-emerald-500 animate-in fade-in zoom-in duration-200">
              <div className="text-5xl">🚀</div>
              <h3 className="text-2xl font-black text-white">
                {levelTransitionModal.titulo}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {levelTransitionModal.desc}
              </p>
              <button
                onClick={() => setLevelTransitionModal(null)}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black py-3 rounded-2xl text-sm shadow-[0_0_20px_rgba(16,185,129,0.5)] transition cursor-pointer"
              >
                Começar Questões
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            onClick={() => setMode('menu')}
            className="text-cyan-400 hover:text-cyan-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            ← Voltar ao Menu
          </button>
          <span className="text-xs font-bold text-cyan-300">
            Questão {idxTreine + 1} de {totalQ}
          </span>
        </div>

        <div className="bg-[#0b1329]/90 border border-emerald-500/40 text-white p-5 sm:p-6 rounded-3xl shadow-[0_0_25px_rgba(16,185,129,0.2)] flex flex-wrap justify-between items-center gap-4">
          <div>
            <span className={`text-xs font-black px-3 py-1 rounded-full uppercase border ${nivelTag.bg}`}>
              {nivelTag.nome}
            </span>
            <h2 className="text-xl sm:text-2xl font-black mt-1 text-white">
              Módulo Treine Mais • Trigonometria 📐
            </h2>
          </div>
          <div className="bg-[#060a16] px-4 py-2 rounded-2xl border border-cyan-500/30 text-right">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Progresso</span>
            <span className="text-lg font-black font-mono text-cyan-300">
              {idxTreine + 1} / {totalQ}
            </span>
          </div>
        </div>

        <div className="bg-[#0b1329]/90 border-2 border-emerald-500/40 p-6 sm:p-8 rounded-3xl shadow-[0_0_30px_rgba(16,185,129,0.15)] space-y-6">
          {qAtual && (
            <div className="flex justify-center bg-[#060a16] p-4 rounded-2xl border border-cyan-500/30">
              <MathDiagram type={qAtual.svgType} />
            </div>
          )}

          <div className="bg-[#060a16] p-4 sm:p-5 rounded-2xl border border-cyan-500/20">
            <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
              {qAtual ? qAtual.pergunta : 'Carregando questão...'}
            </p>
          </div>

          {/* DICA DE INVESTIGAÇÃO COM BALÃO NEON SUAVE (TREINE MAIS) */}
          {qAtual && (
            <InvestigationHintBalloon
              question={qAtual}
              isOpen={showHintTreine}
              onToggle={() => setShowHintTreine((prev) => !prev)}
              accentColor="emerald"
            />
          )}

          {qAtual && (
            <div className="space-y-3">
              {qAtual.opcoes.map((opcao, index) => {
                const isSelected = selectedOptionTreine === index;
                const isCorrect = index === qAtual.correta;

                let optionStyles = 'border-cyan-500/20 bg-[#070c1a] hover:border-emerald-400/50 text-slate-200';

                if (!isAnswerConfirmedTreine && isSelected) {
                  optionStyles = 'border-emerald-400 bg-emerald-950/70 text-emerald-100 ring-1 ring-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]';
                }

                if (isAnswerConfirmedTreine) {
                  if (isCorrect) {
                    optionStyles = 'border-emerald-400 bg-emerald-950/70 text-emerald-100 font-bold ring-2 ring-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.35)]';
                  } else if (isSelected && !isCorrect) {
                    optionStyles = 'border-rose-500 bg-rose-950/70 text-rose-100 font-bold';
                  } else {
                    optionStyles = 'opacity-50 border-slate-800 bg-[#060914] text-slate-500';
                  }
                }

                return (
                  <button
                    key={index}
                    disabled={isAnswerConfirmedTreine}
                    onClick={() => setSelectedOptionTreine(index)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 cursor-pointer ${optionStyles}`}
                  >
                    <span className={`w-7 h-7 rounded-full border text-center text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected && !isAnswerConfirmedTreine
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black'
                        : isAnswerConfirmedTreine && isCorrect
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black'
                        : 'bg-[#0b1428] text-cyan-300 border-cyan-500/30'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-xs sm:text-sm leading-relaxed flex-grow">{opcao}</span>
                    {isSelected && !isAnswerConfirmedTreine && (
                      <span className="text-emerald-400 text-xs font-bold shrink-0 self-center">Selecionada</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {isAnswerConfirmedTreine && qAtual && (
            <div className={`p-4 sm:p-5 rounded-2xl border-2 space-y-1.5 ${
              selectedOptionTreine === qAtual.correta
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/60 border-rose-500/40 text-rose-200'
            }`}>
              <div className="font-bold text-sm flex items-center gap-2">
                {selectedOptionTreine === qAtual.correta ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>✓ Parabéns! Você acertou!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-400" />
                    <span>✕ Resposta incorreta! A alternativa correta foi destacada em verde.</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-300 pt-1">
                <strong>Explicação Pedagógica:</strong> {qAtual.porque}
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-cyan-500/20">
            <button
              onClick={() => setMode('menu')}
              className="text-slate-400 hover:text-slate-200 text-xs sm:text-sm font-bold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Sair do Módulo
            </button>

            {!isAnswerConfirmedTreine ? (
              <button
                disabled={selectedOptionTreine === null}
                onClick={handleConfirmAnswerTreine}
                className={`px-7 py-3 rounded-2xl font-black text-sm flex items-center gap-2 transition ${
                  selectedOptionTreine !== null
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 cursor-pointer border-2 border-emerald-300/80 neon-glow-btn-emerald'
                    : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                }`}
              >
                <Check className="w-4 h-4" /> Confirmar Resposta
              </button>
            ) : (
              <button
                onClick={handleNextQuestaoTreine}
                className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black px-7 py-3 rounded-2xl transition border-2 border-emerald-300/80 neon-glow-btn-emerald flex items-center gap-2 text-sm cursor-pointer"
              >
                <span>{idxTreine === totalQ - 1 ? 'Concluir Treinamento' : 'Próxima Questão'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
