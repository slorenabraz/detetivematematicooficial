import React, { useMemo } from 'react';
import { Sparkles, Compass, Flame, GraduationCap, HeartHandshake } from 'lucide-react';

interface ArianeIncentiveCardProps {
  serie: string;
  accuracyPercent?: number;
  aulaNumero?: number;
  temaNome?: string;
}

interface IncentiveContent {
  badgeText: string;
  headline: string;
  body: string;
  extraMotivation: string;
  actionTip: string;
  closingTag: string;
}

export const ArianeIncentiveCard: React.FC<ArianeIncentiveCardProps> = ({
  serie,
  accuracyPercent,
  aulaNumero,
  temaNome
}) => {
  const content: IncentiveContent = useMemo(() => {
    const score = accuracyPercent ?? 100;

    if (serie === '3º Ano Ensino Médio') {
      const lessonLabel = aulaNumero ? `Aula ${String(aulaNumero).padStart(2, '0')}` : 'esta etapa';
      const themeHint = temaNome ? ` sobre ${temaNome}` : '';
      return {
        badgeText: 'Missão Rumo ao Vestibular & ENEM',
        headline: `Mandou muito bem na ${lessonLabel}, Detetive! Seu futuro agradece cada passo!`,
        body: `Você acabou de destravar mais uma peça essencial${themeHint} no 3º Ano do Ensino Médio. Lembre-se: nenhuma questão difícil resiste a quem lê o enunciado com calma, desenha o esquema no papel, identifica os dados e confia no próprio raciocínio. Cada exercício concluído hoje constrói a segurança que você vai sentir na hora da prova!`,
        extraMotivation: `Você está na reta decisiva da escola e é totalmente capaz de alcançar grandes sonhos — faculdade, carreira, projetos de vida! Continue participando com energia das aulas presenciais, perguntando sem vergonha e celebrando cada nova conquista. Eu acredito demais na sua força, na sua inteligência e no brilho da sua jornada!`,
        actionTip: 'Segredo de ouro: explique o raciocínio em voz alta para você mesmo ou para um colega na próxima aula!',
        closingTag: 'Foco total na reta final!'
      };
    }

    if (score >= 80) {
      if (serie.includes('6º') || serie.includes('7º')) {
        return {
          badgeText: 'Modo Detetive Turbo Ativado',
          headline: `Uau! Que show de raciocínio no ${serie}! Você está voando na Matemática!`,
          body: `Olha só esse resultado incrível! Você observou cada detalhe, analisou as figuras com olho de investigador(a) e não caiu nas armadilhas das questões. A Matemática não é um bicho de sete cabeças: ela é um superpoder que ajuda você a entender jogos, medidas, receitas, finanças e o mundo inteiro ao seu redor!`,
          extraMotivation: `Quanto mais você treina aqui com curiosidade e participa das aulas presenciais tirando dúvidas e ajudando os colegas, mais rápido sua mente fica! Nunca duvide da sua capacidade de resolver problemas grandes: você já provou hoje que tem talento, atenção e brilho próprio de sobra. Continue se divertindo enquanto aprende!`,
          actionTip: 'Desafio da Profª Ariane: conte amanhã na aula qual questão você achou mais legal de resolver!',
          closingTag: 'Orgulho total da turma!'
        };
      }
      return {
        badgeText: 'Radar Investigativo em Alta Precisão',
        headline: `Excelente desempenho no ${serie}! Sua mente matemática está afiadíssima!`,
        body: `Você demonstrou atenção aos detalhes, domínio das relações geométricas e coragem para encarar os desafios do 4º Bimestre. Cada resposta certa mostra que seu esforço está gerando frutos reais e transformando fórmulas em ferramentas práticas que fazem sentido na sua vida.`,
        extraMotivation: `Mantenha esse brilho nos olhos, anote seus truques favoritos no caderno e siga brilhando tanto na plataforma quanto nas discussões presenciais em sala de aula! Quem se dedica com constância constrói autonomia para escolher qualquer caminho no futuro — e você está mostrando exatamente essa atitude vencedora hoje!`,
        actionTip: 'Próxima jogada: ajude um colega que empacou em uma fórmula — ensinar é a forma mais rápida de nunca mais esquecer!',
        closingTag: 'Ritmo de campeão(ã)!'
      };
    }

    if (score >= 50) {
      return {
        badgeText: 'Evolução Constante em Curso',
        headline: `Boa investigação no ${serie}! Cada pista descoberta deixa você mais forte!`,
        body: `Sabe qual é o segredo dos maiores cientistas e matemáticos da história? Eles nunca acertam tudo de primeira — eles investigam por que uma opção deu errado, comparam caminhos e ajustam a rota com inteligência! Você já conquistou vários acertos e agora enxerga exatamente onde focar sua atenção.`,
        extraMotivation: `Nunca meça seu valor por um único erro: cada tentativa corajosa faz seu cérebro criar novas conexões e ficar mais ágil. Traga suas dúvidas para a nossa próxima aula presencial, converse comigo e com a turma, revise os resumos com calma e volte para superar sua própria marca. Você está evoluindo de verdade!`,
        actionTip: 'Dica divertida da Profª: antes de marcar a resposta, faça um rascunho rápido da figura e confira as unidades de medida!',
        closingTag: 'Você está no caminho certo!'
      };
    }

    return {
      badgeText: 'Rota de Descoberta Investigativa',
      headline: `Cada erro é uma pista para descobrir o caminho certo — ${serie}!`,
      body: `Sabe como funciona o cérebro de quem domina a Matemática? Ele aprende justamente quando compara o caminho que tentou com a explicação correta! Em vez de olhar apenas para a nota, observe em qual passo a dúvida apareceu: foi na leitura dos dados, na escolha da fórmula ou em uma armadilha de unidade? Mapear esse detalhe hoje já resolve metade dos próximos exercícios!`,
      extraMotivation: `Experimente um método prático de 3 passos na próxima rodada: 1) sublinhe os números e palavras-chave do enunciado; 2) faça um rascunho rápido da figura no caderno antes de calcular; 3) anote a questão que mais desafiou você para desvendarmos juntos na aula presencial. Com orientação, prática e curiosidade, o seu raciocínio destrava muito rápido — vamos nessa!`,
      actionTip: 'Passo prático da Profª Ariane: use as Pistas do Detetive durante o treino e anote sua dúvida no caderno para nossa aula presencial!',
      closingTag: 'Você está construindo seu domínio!'
    };
  }, [serie, accuracyPercent, aulaNumero, temaNome]);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#160d29] via-[#0b132b] to-[#1f1005] border-2 border-amber-400/70 p-5 sm:p-7 text-left shadow-[0_0_28px_rgba(251,191,36,0.22)]">
      <div className="relative z-10 space-y-4">
        {/* Top Row: Official Title + Dynamic Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-amber-400/25">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.45)] shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-black text-amber-300 font-['Oxanium',sans-serif] tracking-wide block">
                Mensagem de Foco &amp; Incentivo • Profª Ariane Braz
              </span>
              <span className="text-[11px] font-mono text-cyan-300">
                {serie} · 4º Bimestre SP
              </span>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-amber-200 bg-amber-950/70 border border-amber-400/40 px-3 py-1 rounded-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            {content.badgeText}
          </span>
        </div>

        {/* Dynamic Fun Headline */}
        <h4 className="text-base sm:text-lg font-black text-white font-['Oxanium',sans-serif] leading-snug">
          {content.headline}
        </h4>

        {/* Expanded Pedagogical & Motivational Message */}
        <div className="space-y-3 text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
          <p>{content.body}</p>
          <p className="text-amber-100/95 font-medium">{content.extraMotivation}</p>
        </div>

        {/* Practical Action Tip & Closing */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
          <div className="flex items-start gap-2 text-xs text-cyan-200 font-medium">
            <Compass className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>{content.actionTip}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-300 shrink-0 self-end sm:self-center">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>{content.closingTag}</span>
            <HeartHandshake className="w-4 h-4 text-amber-300" />
          </div>
        </div>
      </div>
    </div>
  );
};
