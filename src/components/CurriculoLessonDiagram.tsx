import React from 'react';
import { Question } from '../types';
import { Compass, Lightbulb, Sparkles, Scale, Activity, PieChart, Layers, Shapes } from 'lucide-react';
import { getAulaColorTheme } from '../data/curriculoColorThemes';

interface CurriculoLessonDiagramProps {
  question: Question;
  className?: string;
}

export const CurriculoLessonDiagram: React.FC<CurriculoLessonDiagramProps> = ({
  question,
  className = "w-full"
}) => {
  const aulaNum = question.aulaNumero || 1;

  // Render diagram specifically tailored to each lesson, with 100% responsive HTML/CSS containment
  const renderDiagramContent = () => {
    switch (aulaNum) {
      // ---------------------------------------------------------
      // AULA 1: VELOCIDADE MÉDIA (p. 134-136)
      // ---------------------------------------------------------
      case 1:
        return (
          <div className="space-y-3.5">
            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-400/40 text-center">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider block">
                Relação Fundamental da Velocidade Média
              </span>
              <span className="text-base sm:text-lg font-mono font-black text-cyan-200 mt-0.5 block">
                Vm = ΔS ÷ Δt &nbsp;(Deslocamento ÷ Intervalo de Tempo)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-sky-500 text-slate-950 font-black flex items-center justify-center text-xs">
                    A
                  </span>
                  <span className="text-xs font-mono font-bold text-sky-400">Pessoa A (Deslocamento)</span>
                </div>
                <div className="text-xs text-slate-200 space-y-1">
                  <p><strong className="text-sky-300">Distância:</strong> ΔS = 12 km</p>
                  <p><strong className="text-sky-300">Tempo:</strong> 30 min = 0,5 hora</p>
                </div>
                <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">Vm_A = 12 ÷ 0,5</span>
                  <span className="text-xs font-mono font-bold text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-500/30">
                    ? km/h
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs">
                    B
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-400">Pessoa B (Deslocamento)</span>
                </div>
                <div className="text-xs text-slate-200 space-y-1">
                  <p><strong className="text-amber-300">Distância:</strong> ΔS = 18 km</p>
                  <p><strong className="text-amber-300">Tempo:</strong> 45 min = 0,75 hora</p>
                </div>
                <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">Vm_B = 18 ÷ 0,75</span>
                  <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                    ? km/h
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-dashed border-cyan-400/40 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-xs text-cyan-100 leading-relaxed">
                <strong className="text-cyan-300">Dica Investigativa:</strong> Converta sempre os minutos para horas antes de efetuar a divisão (30 min = 0,5 h e 45 min = 0,75 h). Em seguida, compare os dois quocientes!
              </div>
            </div>
          </div>
        );

      // ---------------------------------------------------------
      // AULA 2: DENSIDADE E RAZÕES (p. 137-140)
      // ---------------------------------------------------------
      case 2:
        return (
          <div className="space-y-3.5">
            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-400/40 text-center">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider block">
                Grandezas por Razão: Densidade e Valores Unitários
              </span>
              <span className="text-base sm:text-lg font-mono font-black text-cyan-200 mt-0.5 block">
                D = m ÷ V &nbsp;•&nbsp; Preço/kg = Preço Total ÷ Massa
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold text-xs border border-sky-500/40">
                    Densidade do Material
                  </span>
                </div>
                <div className="text-xs text-slate-200 space-y-1">
                  <p><strong className="text-sky-300">Massa:</strong> m = 90 g</p>
                  <p><strong className="text-sky-300">Volume:</strong> V = 60 cm³</p>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">D = 90 ÷ 60</span>
                  <span className="text-xs font-mono font-bold text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-500/30">
                    ? g/cm³
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/40">
                    Taxa de Natalidade Demográfica
                  </span>
                </div>
                <div className="text-xs text-slate-200 space-y-1">
                  <p><strong className="text-amber-300">2023:</strong> 32.000 nasc. / 2.000.000 hab</p>
                  <p><strong className="text-amber-300">2024:</strong> 34.500 nasc. / 2.300.000 hab</p>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">Taxa por mil hab</span>
                  <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                    16‰ vs 15‰
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-dashed border-cyan-400/40 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-xs text-cyan-100 leading-relaxed">
                <strong className="text-cyan-300">Dica Investigativa:</strong> A razão unitária relaciona duas grandezas diretamente pela divisão. Ao comparar taxas proporcionais, divida a quantidade pelo total de referência.
              </div>
            </div>
          </div>
        );

      // ---------------------------------------------------------
      // AULA 3: CONSUMO E QUANTIDADE DE MOVIMENTO (p. 141-144)
      // ---------------------------------------------------------
      case 3:
        return (
          <div className="space-y-3.5">
            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-400/40 text-center">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider block">
                Grandezas por Produto (Proporcionalidade Inversa)
              </span>
              <span className="text-base sm:text-lg font-mono font-black text-cyan-200 mt-0.5 block">
                C = p · t &nbsp;•&nbsp; Q = m · v &nbsp;(Produto Constante: k = x · y)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/40 space-y-2">
                <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider block">
                  Consumo de Energia (C = p · t)
                </span>
                <div className="text-xs text-slate-200 space-y-1">
                  <p><strong className="text-sky-300">Potência:</strong> 5.500 W = 5,5 kW</p>
                  <p><strong className="text-sky-300">Tempo:</strong> 30 horas mensais</p>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">Consumo = 5,5 × 30</span>
                  <span className="text-xs font-mono font-bold text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-500/30">
                    165 kWh
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/40 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  Quantidade de Movimento (Q = m · v)
                </span>
                <div className="text-xs text-slate-200 space-y-1">
                  <p><strong className="text-amber-300">Massa:</strong> Aumentou +20% ➔ 3,6 kg</p>
                  <p><strong className="text-amber-300">Q Constante:</strong> 24 kg·m/s</p>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">v = 24 ÷ 3,6</span>
                  <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                    6,67 m/s
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-dashed border-cyan-400/40 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-xs text-cyan-100 leading-relaxed">
                <strong className="text-cyan-300">Dica:</strong> Em grandezas cujo produto é constante, se um fator aumenta em uma proporção, o outro deve decrescer na mesma proporção para equilibrar a igualdade.
              </div>
            </div>
          </div>
        );

      // ---------------------------------------------------------
      // AULA 4: FLUXOGRAMA DE RELAÇÃO ENTRE GRANDEZAS (p. 145-146)
      // ---------------------------------------------------------
      case 4:
        return (
          <div className="space-y-3.5">
            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-400/40 text-center">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider block">
                Fluxograma Oficial SEDUC: Relações entre Grandezas
              </span>
              <span className="text-base sm:text-lg font-mono font-black text-cyan-200 mt-0.5 block">
                Classificação por Razão (y ÷ x = k) ou Produto (x · y = k)
              </span>
            </div>

            {/* Fluxograma visual em caixas limpas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/40 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono font-bold text-emerald-300 uppercase">Grandezas por Razão</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Quando o quociente entre as duas grandezas permanece inalterado. Se uma dobra, a outra também dobra (Diretamente Proporcionais).
                </p>
                <div className="p-2 rounded bg-emerald-950/60 border border-emerald-500/30 text-xs font-mono text-emerald-200 text-center">
                  Ex: Preço da Conta = Consumo (kWh) × Tarifa (R$/kWh)
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/40 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="text-xs font-mono font-bold text-amber-300 uppercase">Grandezas por Produto</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Quando a multiplicação entre as grandezas resulta em um valor fixo. Se uma dobra, a outra é reduzida pela metade (Inversamente Proporcionais).
                </p>
                <div className="p-2 rounded bg-amber-950/60 border border-amber-500/30 text-xs font-mono text-amber-200 text-center">
                  Ex: Tempo × Velocidade = Distância Fixa
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-dashed border-cyan-400/40 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-xs text-cyan-100 leading-relaxed">
                <strong className="text-cyan-300">Dica:</strong> Para 150 kWh consumidos com tarifa de R$ 0,73 por kWh, multiplique 150 × 0,73 para encontrar o valor total da fatura.
              </div>
            </div>
          </div>
        );

      // ---------------------------------------------------------
      // AULA 5: REGRA DE TRÊS SIMPLES (p. 147-149)
      // ---------------------------------------------------------
      case 5:
        return (
          <div className="space-y-3.5">
            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-400/40 text-center">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider block">
                Regra de Três Simples
              </span>
              <span className="text-base sm:text-lg font-mono font-black text-cyan-200 mt-0.5 block">
                a₁ / b₁ = a₂ / x &nbsp;(Direta) &nbsp;•&nbsp; a₁ · b₁ = a₂ · x &nbsp;(Inversa)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/40 space-y-2">
                <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider block">
                  Situação Conhecida
                </span>
                <div className="text-xs text-slate-200 space-y-1">
                  <p>Volume de Suco: 2 litros</p>
                  <p>Custo correspondente: R$ 6,00</p>
                </div>
                <div className="p-2 rounded bg-sky-950/60 border border-sky-500/30 text-xs font-mono text-sky-300 text-center">
                  Preço unitário: R$ 6,00 ÷ 2 L = R$ 3,00/L
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/40 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  Situação Desejada
                </span>
                <div className="text-xs text-slate-200 space-y-1">
                  <p>Novo volume: 5 litros</p>
                  <p>Custo total: x reais</p>
                </div>
                <div className="p-2 rounded bg-amber-950/60 border border-amber-500/30 text-xs font-mono text-amber-300 text-center">
                  x = 5 L × R$ 3,00/L = R$ 15,00
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-dashed border-cyan-400/40 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-xs text-cyan-100 leading-relaxed">
                <strong className="text-cyan-300">Dica:</strong> Identifique se as grandezas variam no mesmo sentido antes de cruzar a multiplicação.
              </div>
            </div>
          </div>
        );

      // ---------------------------------------------------------
      // AULA 6: REGRA DE TRÊS COMPOSTA (p. 150-153)
      // ---------------------------------------------------------
      case 6:
        return (
          <div className="space-y-3.5">
            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-400/40 text-center">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider block">
                Regra de Três Composta
              </span>
              <span className="text-base sm:text-lg font-mono font-black text-cyan-200 mt-0.5 block">
                Razão da Incógnita = Produto das Razões de Cada Grandeza
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/40 space-y-3">
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="font-bold text-sky-400 block">Pessoas</span>
                  <span className="font-mono text-slate-300 text-[11px]">6 ➔ 8 pessoas</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="font-bold text-amber-400 block">Horas/Dia</span>
                  <span className="font-mono text-slate-300 text-[11px]">8h ➔ 6h/dia</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="font-bold text-emerald-400 block">Dias</span>
                  <span className="font-mono text-slate-300 text-[11px]">10 ➔ x dias</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-dashed border-cyan-400/40 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-xs text-cyan-100 leading-relaxed">
                <strong className="text-cyan-300">Dica:</strong> Compare cada grandeza individualmente com a grandeza que contém a incógnita (Dias), determinando se a relação é direta ou inversa.
              </div>
            </div>
          </div>
        );

      // ---------------------------------------------------------
      // AULAS 9 A 12: ESTATÍSTICA E TENDÊNCIA CENTRAL (p. 160-171)
      // ---------------------------------------------------------
      case 9:
      case 10:
      case 11:
      case 12:
        return (
          <div className="space-y-3.5">
            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-400/40 text-center">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider block">
                Medidas de Tendência Central
              </span>
              <span className="text-base sm:text-lg font-mono font-black text-cyan-200 mt-0.5 block">
                Média Simples (x̄) &nbsp;•&nbsp; Média Ponderada (x̄_p) &nbsp;•&nbsp; Mediana (Md) &nbsp;•&nbsp; Moda (Mo)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-sky-500/40 text-center space-y-1">
                <span className="text-xs font-mono font-bold text-sky-400 block">Média Aritmética</span>
                <span className="text-sm font-mono text-slate-200 font-bold">x̄ = ∑ x ÷ n</span>
                <p className="text-[11px] text-slate-400">Soma de todos os valores dividida pelo total</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/40 text-center space-y-1">
                <span className="text-xs font-mono font-bold text-amber-400 block">Mediana (Md)</span>
                <span className="text-sm font-mono text-slate-200 font-bold">Termo Central do Rol</span>
                <p className="text-[11px] text-slate-400">Valor central dos dados ordenados</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-emerald-500/40 text-center space-y-1">
                <span className="text-xs font-mono font-bold text-emerald-400 block">Moda (Mo)</span>
                <span className="text-sm font-mono text-slate-200 font-bold">Mais Frequente</span>
                <p className="text-[11px] text-slate-400">Dado que mais se repete na amostra</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-dashed border-cyan-400/40 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-xs text-cyan-100 leading-relaxed">
                <strong className="text-cyan-300">Dica:</strong> Ao calcular a mediana, organize primeiro todos os dados em ordem crescente (Rol). Se a quantidade for par, faça a média dos dois termos centrais!
              </div>
            </div>
          </div>
        );

      // ---------------------------------------------------------
      // AULAS 13 A 16: MEDIDAS DE DISPERSÃO (p. 172-186)
      // ---------------------------------------------------------
      case 13:
      case 14:
      case 15:
      case 16:
        return (
          <div className="space-y-3.5">
            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-400/40 text-center">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider block">
                Medidas de Dispersão e Regularidade
              </span>
              <span className="text-base sm:text-lg font-mono font-black text-cyan-200 mt-0.5 block">
                Amplitude (A) &nbsp;•&nbsp; Variância (σ²) &nbsp;•&nbsp; Desvio Padrão (σ = √σ²)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/40 space-y-2">
                <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider block">
                  Variância (σ²)
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Média dos quadrados das distâncias de cada dado em relação à média aritmética:
                </p>
                <div className="p-2 rounded bg-sky-950/60 border border-sky-500/30 text-xs font-mono text-sky-300 text-center">
                  σ² = ∑ (x_i - x̄)² ÷ n
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/40 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  Desvio Padrão (σ) & Regularidade
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Raiz quadrada da variância. Quanto MENOR o desvio padrão, MAIS REGULAR e homogêneo é o conjunto.
                </p>
                <div className="p-2 rounded bg-amber-950/60 border border-amber-500/30 text-xs font-mono text-amber-300 text-center">
                  Menor σ ➔ Maior Regularidade
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-dashed border-cyan-400/40 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-xs text-cyan-100 leading-relaxed">
                <strong className="text-cyan-300">Dica:</strong> Em questões do ENEM sobre atletas ou turmas com a mesma média, o mais regular ou consistente é sempre aquele com o menor desvio padrão!
              </div>
            </div>
          </div>
        );

      // ---------------------------------------------------------
      // AULA 17: PROPORCIONALIDADE COM PERÍMETRO E ÁREA (p. 187-189)
      // ---------------------------------------------------------
      case 17:
        return (
          <div className="space-y-3.5">
            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-400/40 text-center">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider block">
                Fator de Escala (k) entre Figuras Semelhantes
              </span>
              <span className="text-base sm:text-lg font-mono font-black text-cyan-200 mt-0.5 block">
                Comprimento & Perímetro ➔ Razão k &nbsp;•&nbsp; Área ➔ Razão k²
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/40 space-y-2 text-center">
                <span className="text-xs font-mono font-bold text-sky-400 uppercase block">
                  Dimensão Linear (k)
                </span>
                <div className="h-16 flex items-center justify-center">
                  <div className="w-10 h-10 border-2 border-sky-400 rounded flex items-center justify-center text-xs font-mono text-sky-300">
                    L
                  </div>
                  <span className="mx-3 text-slate-500 font-mono">➔</span>
                  <div className="w-14 h-14 border-2 border-emerald-400 rounded flex items-center justify-center text-xs font-mono text-emerald-300">
                    k·L
                  </div>
                </div>
                <p className="text-[11px] text-slate-300 font-mono">Perímetro_novo = k × Perímetro_original</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/40 space-y-2 text-center">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase block">
                  Superfície / Área (k²)
                </span>
                <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-500/30 text-xs font-mono text-amber-200">
                  Se o lado triplica (k = 3):<br />
                  <span className="text-amber-400 font-bold">Área multiplica por 3² = 9 vezes!</span>
                </div>
                <p className="text-[11px] text-slate-300 font-mono">Área_nova = k² × Área_original</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-dashed border-cyan-400/40 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-xs text-cyan-100 leading-relaxed">
                <strong className="text-cyan-300">Dica:</strong> Cuidado com pegadinhas: dobrar o lado de uma figura não dobra a área; a área quadruplica (2² = 4)!
              </div>
            </div>
          </div>
        );

      // ---------------------------------------------------------
      // AULAS 18 A 21: POLÍGONOS REGULARES E ÁREAS (p. 190-199)
      // ---------------------------------------------------------
      case 18:
      case 19:
      case 20:
      case 21:
        return (
          <div className="space-y-3.5">
            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-400/40 text-center">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider block">
                Geometria de Polígonos Regulares
              </span>
              <span className="text-base sm:text-lg font-mono font-black text-cyan-200 mt-0.5 block">
                Área = Semiperímetro (p) × Apótema (a) &nbsp;•&nbsp; S = (n - 2) · 180°
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/40 space-y-2">
                <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider block">
                  Triângulo Equilátero & Hexágono
                </span>
                <div className="text-xs text-slate-200 space-y-1.5 font-mono">
                  <p>Triângulo Equilátero: A = (L²√3) ÷ 4</p>
                  <p>Hexágono Regular: A = 6 × [(L²√3) ÷ 4]</p>
                  <p className="text-sky-300 font-bold">A_hex = (3L²√3) ÷ 2</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/40 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  Fórmula Universal com Apótema
                </span>
                <div className="text-xs text-slate-200 space-y-1">
                  <p><strong className="text-amber-300">Semiperímetro (p):</strong> metade do perímetro total</p>
                  <p><strong className="text-amber-300">Apótema (a):</strong> distância do centro ao ponto médio do lado</p>
                </div>
                <div className="p-2 rounded bg-amber-950/60 border border-amber-500/30 text-xs font-mono text-amber-300 text-center">
                  Área = p · a
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-dashed border-cyan-400/40 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-xs text-cyan-100 leading-relaxed">
                <strong className="text-cyan-300">Dica:</strong> Qualquer polígono regular de n lados pode ser decomposto em n triângulos isósceles congruentes unidos pelo centro.
              </div>
            </div>
          </div>
        );

      // ---------------------------------------------------------
      // AULA 22: ÁREA DO CÍRCULO E SETOR CIRCULAR (p. 200-204)
      // ---------------------------------------------------------
      case 22:
        return (
          <div className="space-y-3.5">
            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-400/40 text-center">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider block">
                Círculo e Setor Circular Proporcional
              </span>
              <span className="text-base sm:text-lg font-mono font-black text-cyan-200 mt-0.5 block">
                A_círculo = π · R² &nbsp;•&nbsp; A_setor = (α ÷ 360°) · π · R²
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/40 space-y-2">
                <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider block">
                  Disco Circular Completo (360°)
                </span>
                <div className="text-xs text-slate-200 space-y-1 font-mono">
                  <p>Comprimento: C = 2 · π · R</p>
                  <p>Área Total: A = π · R²</p>
                </div>
                <div className="p-2 rounded bg-sky-950/60 border border-sky-500/30 text-xs font-mono text-sky-300 text-center">
                  Para R = 8 m ➔ A = 64π m²
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/40 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  Setor Circular com Ângulo Central (α)
                </span>
                <div className="text-xs text-slate-200 space-y-1">
                  <p>Fração da volta completa: <strong>α ÷ 360°</strong></p>
                  <p>Exemplo de 135°: 135° ÷ 360° = 3/8 da área total</p>
                </div>
                <div className="p-2 rounded bg-amber-950/60 border border-amber-500/30 text-xs font-mono text-amber-300 text-center">
                  A_setor = (3/8) × 64π = 24π m²
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-dashed border-cyan-400/40 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-xs text-cyan-100 leading-relaxed">
                <strong className="text-cyan-300">Dica:</strong> Simplifique a fração α / 360° antes de multiplicar pelo raio ao quadrado para facilitar os cálculos manuais!
              </div>
            </div>
          </div>
        );

      // ---------------------------------------------------------
      // AULAS 23 E 24: RESOLUÇÃO E VERIFICAÇÃO DE ÁREAS (p. 205-214)
      // ---------------------------------------------------------
      case 23:
      case 24:
        return (
          <div className="space-y-3.5">
            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-400/40 text-center">
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider block">
                Decomposição de Figuras Planas Compostas
              </span>
              <span className="text-base sm:text-lg font-mono font-black text-cyan-200 mt-0.5 block">
                Área Total = Soma ou Diferença entre Figuras Elementares
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/40 space-y-2">
                <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider block">
                  Estratégia de Decomposição
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Divida a área complexa em triângulos, retângulos, trapézios ou setores conhecidos e some as partes correspondentes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/40 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  Estratégia por Subtração
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Calcule a área da figura envolvente maior (ex.: retângulo ou círculo total) e subtraia as áreas vazias ou recortes internos.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-dashed border-cyan-400/40 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-xs text-cyan-100 leading-relaxed">
                <strong className="text-cyan-300">Dica:</strong> Identifique as linhas de simetria do problema para reduzir o número de cálculos e evitar duplicações.
              </div>
            </div>
          </div>
        );

      // Default layout
      default:
        return (
          <div className="space-y-3.5">
            {question.formulaDestaque && (
              <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-400/40 text-center">
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider block">
                  Modelo Matemático da Aula
                </span>
                <span className="text-base sm:text-lg font-mono font-black text-cyan-200 mt-0.5 block break-words">
                  {question.formulaDestaque}
                </span>
              </div>
            )}

            <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/40 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-400">
                <Compass className="w-4 h-4 text-sky-400" />
                <span>Dados do Problema & Relação Pedagógica</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed break-words">
                {question.apresentacaoTema || 'Examine atentamente os dados numéricos fornecidos no desafio e aplique os conceitos apresentados no resumo teórico.'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-dashed border-cyan-400/40 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-xs text-cyan-100 leading-relaxed break-words">
                <strong className="text-cyan-300">Dica Investigativa:</strong> {question.dicaInvestigacao || 'Identifique as variáveis do problema, verifique a compatibilidade das unidades de medida e resolva a operação com calma!'}
              </div>
            </div>
          </div>
        );
    }
  };

  const theme = getAulaColorTheme(aulaNum);

  return (
    <div className={`rounded-3xl bg-gradient-to-b ${theme.cardHeroGradient} border-2 ${theme.cardBorder} p-4 sm:p-6 shadow-2xl w-full max-w-full overflow-hidden min-w-0 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 mb-4 border-b border-slate-800">
        <div className={`flex items-center gap-2 text-xs font-mono ${theme.textAccent} font-bold uppercase tracking-wider`}>
          <Sparkles className="w-4 h-4" />
          <span>Esquema Visual Investigativo // Aula {String(aulaNum).padStart(2, '0')}</span>
        </div>
        <div className={`flex items-center gap-2 text-[11px] font-mono ${theme.badgeBg} ${theme.badgeBorder} ${theme.textAccent} px-2.5 py-0.5 rounded-full border self-start sm:self-auto`}>
          <span>Sem Gabarito Revelado · Resolva Ativamente</span>
        </div>
      </div>

      {renderDiagramContent()}
    </div>
  );
};
