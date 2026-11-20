import React from 'react';
import { BookOpen, Sparkles, Lightbulb, Compass, Award, ArrowRight, Layers, Target } from 'lucide-react';
import { Question } from '../types';
import { getAulaColorTheme } from '../data/curriculoColorThemes';

interface ResumoPedagogicoCardProps {
  question: Question;
  aulaNumero?: number;
  isQuickRevision?: boolean;
}

export const ResumoPedagogicoCard: React.FC<ResumoPedagogicoCardProps> = ({
  question,
  aulaNumero,
  isQuickRevision = false
}) => {
  const numero = question.aulaNumero || aulaNumero || 1;
  const titulo = question.aulaTitulo || question.temaNome;
  const rawText = question.resumoAula || '';
  const theme = getAulaColorTheme(numero);

  // Smart parser to extract theoretical concept, formula, and proportionality notes
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);

  const formulaLines: string[] = [];
  const conceptLines: string[] = [];
  const directPropLines: string[] = [];
  const inversePropLines: string[] = [];

  let inProportionalitySection = false;

  for (const line of lines) {
    const lower = line.toLowerCase();

    // Proportionality detection
    if (lower.includes('proporcionalidade') || lower.includes('diretamente proporcional') || lower.includes('inversamente proporcional')) {
      inProportionalitySection = true;
      if (lower.includes('diretamente')) {
        directPropLines.push(line.replace(/^[•\-*]\s*/, ''));
      } else if (lower.includes('inversamente')) {
        inversePropLines.push(line.replace(/^[•\-*]\s*/, ''));
      }
      continue;
    }

    if (inProportionalitySection) {
      if (lower.includes('diretamente')) {
        directPropLines.push(line.replace(/^[•\-*]\s*/, ''));
      } else if (lower.includes('inversamente')) {
        inversePropLines.push(line.replace(/^[•\-*]\s*/, ''));
      } else {
        conceptLines.push(line);
      }
      continue;
    }

    // Formulas
    if (
      line.includes('=') &&
      (line.includes('+') || line.includes('·') || line.includes('×') || line.includes('/') || line.includes('÷') || line.includes('√') || line.includes('²') || line.includes('Δ')) &&
      !line.includes('•') &&
      !line.includes('→')
    ) {
      formulaLines.push(line);
      continue;
    }

    // General theoretical concept
    if (!line.startsWith('•') && !line.includes('→')) {
      conceptLines.push(line);
    }
  }

  // Ensure formulas list has official highlight
  const formulasToDisplay = formulaLines.length > 0
    ? formulaLines
    : question.formulaDestaque
    ? [question.formulaDestaque]
    : [];

  return (
    <section className={`rounded-3xl bg-gradient-to-b ${theme.cardHeroGradient} border-2 ${theme.cardBorder} p-5 sm:p-7 md:p-8 shadow-2xl space-y-6 sm:space-y-7 transition-all w-full max-w-full overflow-hidden`}>
      {/* ----------------------------------------------------
          1. CABEÇALHO EDITORIAL & BARRA DE METADADOS
         ---------------------------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div className="space-y-1.5 min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-300">
            <span className={`font-black px-2.5 py-0.5 rounded-md ${theme.badgeBg} border ${theme.badgeBorder} ${theme.textAccent}`}>
              AULA {String(numero).padStart(2, '0')}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>3º Ano do Ensino Médio</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-amber-400 font-medium">Material Digital SP (4º Bimestre)</span>
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white font-['Oxanium',sans-serif] tracking-tight break-words">
            {titulo}
          </h3>
        </div>

        <div className="self-start md:self-center shrink-0">
          <div className={`flex items-center gap-2 text-xs font-mono font-bold ${theme.badgeBg} ${theme.textAccent} px-3.5 py-1.5 rounded-xl border ${theme.badgeBorder} shadow-sm`}>
            <BookOpen className="w-4 h-4" />
            <span>Fundamentação Curricular Oficial</span>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------
          2. FOCO NA HABILIDADE ATRAENTE & LUMINOSO
             Com destaque visual de alta vibração
         ---------------------------------------------------- */}
      <div className={`rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-[#0d1424] to-slate-950 border-2 ${theme.badgeBorder} shadow-lg relative overflow-hidden group`}>
        <div className={`absolute top-0 left-0 w-2 h-full ${theme.accentBar}`} />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 min-w-0 pl-1 sm:pl-2">
          <div className="flex items-start gap-3.5 min-w-0 flex-1">
            <div className={`w-10 h-10 rounded-xl ${theme.iconBg} flex items-center justify-center shrink-0 shadow-md`}>
              <Award className="w-5 h-5" />
            </div>
            <div className="space-y-1.5 font-sans min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className={`text-xs sm:text-[13px] font-mono font-black ${theme.textAccent} uppercase tracking-wider flex items-center gap-1.5`}>
                  <Sparkles className="w-3.5 h-3.5" />
                  Foco na Habilidade Curricular
                </span>
                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${theme.badgeBg} ${theme.textAccent} border ${theme.badgeBorder}`}>
                  Objetivo de Aprendizagem
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed break-words">
                {question.habilidade === 'EM13MAT101' && 'Interpretar e analisar relações entre grandezas determinadas pela razão ou pelo produto.'}
                {question.habilidade === 'EM13MAT314' && 'Resolver problemas que envolvam grandezas direta ou inversamente proporcionais (regra de três simples e composta).'}
                {question.habilidade === 'EM13MAT406' && 'Calcular e interpretar medidas de tendência central (média aritmética, ponderada, mediana e moda).'}
                {question.habilidade === 'EM13MAT407' && 'Aplicar medidas de dispersão (amplitude, variância, desvio médio e desvio padrão) para avaliar regularidade.'}
                {(question.habilidade === 'EM13MAT502' || question.habilidade === 'EM13MAT501') && 'Investigar relações de escala com perímetro e área, áreas de polígonos regulares, círculos e setores circulares.'}
                {!['EM13MAT101', 'EM13MAT314', 'EM13MAT406', 'EM13MAT407', 'EM13MAT502', 'EM13MAT501'].includes(question.habilidade || '') && 'Desenvolvimento das competências matemáticas fundamentais do Ensino Médio.'}
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-400 shrink-0">
            <Target className={`w-3.5 h-3.5 ${theme.textAccent}`} />
            <span>Competência Essencial</span>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------
          3. FUNDAMENTAÇÃO CURRICULAR ORGANIZADA (PREENCHIMENTO PLENO)
         ---------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full min-w-0">
        {/* ====================================================
            COLUNA ESQUERDA: CONCEITO TEÓRICO FUNDAMENTAL
           ==================================================== */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-5 min-w-0">
          <div className="rounded-2xl bg-[#070d1e]/90 border border-slate-800/90 p-5 sm:p-6 shadow-sm space-y-4 min-w-0 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-slate-200 uppercase tracking-wider pb-2 border-b border-slate-800">
                <Compass className={`w-4 h-4 ${theme.textAccent}`} />
                <span>Conceito Teórico Fundamental</span>
              </div>

              {/* Breve Apresentação do Tema da Aula */}
              {question.apresentacaoTema && (
                <div className={`p-4 rounded-xl bg-slate-950/90 border-l-4 ${theme.accentBar} border ${theme.badgeBorder} space-y-1 shadow-inner`}>
                  <span className={`text-[11px] font-mono font-bold ${theme.textAccent} uppercase tracking-wider block`}>
                    Apresentação do Tema da Aula
                  </span>
                  <p className="text-xs sm:text-sm text-slate-100 font-sans leading-relaxed break-words">
                    {question.apresentacaoTema}
                  </p>
                </div>
              )}

              {/* Texto Didático Explicativo */}
              <div className="text-sm sm:text-[15px] text-slate-200 font-sans leading-relaxed space-y-3.5 min-w-0">
                {conceptLines.map((paragraph, idx) => (
                  <p key={idx} className="leading-relaxed break-words [overflow-wrap:anywhere]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Dica Pedagógica de Investigação */}
            <div className="pt-3 border-t border-slate-800/80">
              <div className="rounded-xl bg-gradient-to-r from-amber-950/30 via-slate-900/60 to-transparent border border-amber-500/30 p-3.5 flex items-start gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-amber-950/70 border border-amber-400/40 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 font-sans min-w-0 flex-1">
                  <span className="text-[11px] font-mono font-bold text-amber-300 uppercase tracking-wider block">
                    Dica de Investigação Pedagógica
                  </span>
                  <p className="text-xs text-amber-100/90 leading-relaxed break-words">
                    {question.dicaInvestigacao || 'Analise atentamente as grandezas, converta as unidades para o mesmo sistema e aplique as relações matemáticas destacadas ao lado.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================
            COLUNA DIREITA: MODELO MATEMÁTICO & FÓRMULAS OFICIAIS
           ==================================================== */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5 min-w-0">
          {/* Card: Modelo Matemático */}
          <div className={`rounded-2xl bg-[#070e22]/90 border ${theme.badgeBorder} p-5 sm:p-6 shadow-sm space-y-4 relative overflow-hidden min-w-0 h-full flex flex-col justify-between`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className={`text-xs font-mono font-bold ${theme.textAccent} uppercase tracking-wider flex items-center gap-1.5`}>
                  <Sparkles className="w-3.5 h-3.5" />
                  Modelo Matemático // Equação-Chave
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {formulasToDisplay.length > 1 ? `${formulasToDisplay.length} Relações` : 'Definição'}
                </span>
              </div>

              {/* Fórmulas Destacadas */}
              <div className="space-y-3">
                {formulasToDisplay.map((formula, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl bg-[#040816]/95 border-2 ${theme.badgeBorder} py-4 px-4 text-center shadow-inner group hover:border-amber-400 transition-all overflow-hidden`}
                  >
                    <span className={`text-base sm:text-lg md:text-xl font-mono font-black ${theme.textAccent} tracking-wider block break-words [overflow-wrap:anywhere]`}>
                      {formula}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-xs font-sans text-slate-300 leading-relaxed text-center">
                Utilize este modelo matemático como ponto de partida para calcular e relacionar os dados da aula.
              </p>

              {/* Proporcionalidades (se presentes) */}
              {(directPropLines.length > 0 || inversePropLines.length > 0) && (
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    Proporcionalidade:
                  </span>
                  {directPropLines.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs text-emerald-200">
                      <strong className="block text-emerald-400 font-mono">Direta:</strong> {directPropLines.join(' ')}
                    </div>
                  )}
                  {inversePropLines.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200">
                      <strong className="block text-amber-400 font-mono">Inversa:</strong> {inversePropLines.join(' ')}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Guia de Próximo Passo Responsivo */}
            {!isQuickRevision ? (
              <div className={`rounded-xl bg-[#070b18]/90 border ${theme.badgeBorder} p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-300 min-w-0 shadow-sm mt-3`}>
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <ArrowRight className={`w-4 h-4 ${theme.textAccent} shrink-0`} />
                  <span className="text-xs sm:text-[13px] font-sans font-medium text-slate-200 break-words leading-relaxed">
                    Próximo passo: Resolver o desafio prático da aula abaixo
                  </span>
                </div>
                <span className={`text-[11px] font-mono font-bold ${theme.badgeBg} ${theme.textAccent} border ${theme.badgeBorder} px-2.5 py-1 rounded-lg shrink-0 self-start sm:self-auto`}>
                  Aplicação Prática
                </span>
              </div>
            ) : (
              <div className={`rounded-xl bg-[#070b18]/90 border ${theme.badgeBorder} p-3.5 flex items-center justify-between gap-3 text-xs font-mono text-slate-300 min-w-0 shadow-sm mt-3`}>
                <span className={`text-xs ${theme.textAccent} font-bold`}>
                  Modo Revisão Rápida Ativo
                </span>
                <span className="text-[11px] text-slate-400">
                  Desafios práticos ocultos para leitura ágil
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
