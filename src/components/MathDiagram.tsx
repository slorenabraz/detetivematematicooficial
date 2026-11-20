import React from 'react';

interface MathDiagramProps {
  type?: string;
  className?: string;
}

export const MathDiagram: React.FC<MathDiagramProps> = ({
  type,
  className = "w-full max-w-xs h-auto"
}) => {
  // Helper for background container
  const bg = (
    <rect width="200" height="120" rx="12" fill="#070c1a" stroke="#00f0ff" strokeWidth="1" strokeOpacity="0.4" />
  );
  // Wide container helper for 3º Ano do Ensino Médio & comparative illustrations (460x200)
  const bgWide = (
    <rect width="460" height="200" rx="14" fill="#070c1a" stroke="#00f0ff" strokeWidth="1.2" strokeOpacity="0.4" />
  );

  switch (type) {
    // ----------------------------------------------------
    // CURRÍCULO EM AÇÃO: 3º ANO DO ENSINO MÉDIO (24 AULAS)
    // Ilustrações amplas (460x200), espaçamento generoso,
    // sem sobreposição de texto, todos os dados visíveis
    // e dicas pedagógicas com interrogação "?"
    // ----------------------------------------------------

    // AULA 1: VELOCIDADE MÉDIA
    case 'velocidade_media':
      return (
        <svg className={className} viewBox="0 0 460 200" fill="none">
          {bgWide}
          {/* Top Formula Header */}
          <rect x="70" y="8" width="320" height="24" rx="7" fill="#0c1630" stroke="#00f0ff" strokeWidth="1.2" />
          <text x="230" y="24" fontSize="12" fontWeight="bold" fill="#00f0ff" textAnchor="middle">Vm = ΔS ÷ Δt  (Velocidade Média)</text>
          
          {/* Track A */}
          <rect x="14" y="38" width="432" height="48" rx="8" fill="#081026" stroke="#38bdf8" strokeWidth="1.2" />
          <rect x="24" y="46" width="30" height="32" rx="6" fill="#38bdf8" />
          <text x="39" y="67" fontSize="14" fontWeight="bold" fill="#040814" textAnchor="middle">A</text>
          <text x="64" y="56" fontSize="12" fontWeight="bold" fill="#38bdf8">Pessoa A: ΔS = 12 km</text>
          <text x="64" y="73" fontSize="11" fill="#94a3b8">Tempo gasto: Δt = 30 min (0,5 h)</text>
          <rect x="290" y="46" width="144" height="32" rx="7" fill="#040916" stroke="#38bdf8" strokeWidth="1" />
          <text x="362" y="66" fontSize="11.5" fontWeight="bold" fill="#38bdf8" textAnchor="middle">Vm(A) = 12 ÷ 0,5 = ?</text>
          
          {/* Track B */}
          <rect x="14" y="92" width="432" height="48" rx="8" fill="#140d04" stroke="#ffbc00" strokeWidth="1.2" />
          <rect x="24" y="100" width="30" height="32" rx="6" fill="#ffbc00" />
          <text x="39" y="121" fontSize="14" fontWeight="bold" fill="#040814" textAnchor="middle">B</text>
          <text x="64" y="110" fontSize="12" fontWeight="bold" fill="#ffbc00">Pessoa B: ΔS = 18 km</text>
          <text x="64" y="127" fontSize="11" fill="#94a3b8">Tempo gasto: Δt = 45 min (0,75 h)</text>
          <rect x="290" y="100" width="144" height="32" rx="7" fill="#0f0902" stroke="#ffbc00" strokeWidth="1" />
          <text x="362" y="120" fontSize="11.5" fontWeight="bold" fill="#ffbc00" textAnchor="middle">Vm(B) = 18 ÷ 0,75 = ?</text>

          {/* Pedagogical Hint */}
          <rect x="14" y="146" width="432" height="44" rx="7" fill="#06121e" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="230" y="162" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">💡 Dica: Converta os minutos em horas (30 min = 0,5 h | 45 min = 0,75 h)</text>
          <text x="230" y="179" fontSize="9.5" fill="#94a3b8" textAnchor="middle">Aplique Vm = ΔS ÷ Δt para A e B e compare qual velocidade é maior!</text>
        </svg>
      );

    // AULA 2: PREÇO POR QUILO (GRANDEZAS POR RAZÃO - OPÇÃO A vs B)
    case 'razao_preco_quilo':
    case 'arroz_custo_beneficio':
      return (
        <svg className={className} viewBox="0 0 460 200" fill="none">
          {bgWide}
          {/* Formula Header */}
          <rect x="50" y="8" width="360" height="24" rx="7" fill="#0c1630" stroke="#f97316" strokeWidth="1.2" />
          <text x="230" y="24" fontSize="12" fontWeight="bold" fill="#fb923c" textAnchor="middle">Preço por Quilograma = Preço Total ÷ Massa (kg)</text>
          
          {/* Option A Box */}
          <rect x="14" y="38" width="210" height="102" rx="8" fill="#081026" stroke="#38bdf8" strokeWidth="1.2" />
          <rect x="24" y="46" width="76" height="20" rx="4" fill="#38bdf8" />
          <text x="62" y="60" fontSize="10" fontWeight="bold" fill="#040814" textAnchor="middle">OPÇÃO A</text>
          <text x="119" y="78" fontSize="12" fontWeight="bold" fill="#ffffff" textAnchor="middle">Pacote de 5 kg</text>
          <text x="119" y="96" fontSize="12" fontWeight="bold" fill="#38bdf8" textAnchor="middle">Total: R$ 32,00</text>
          <text x="119" y="113" fontSize="10.5" fill="#94a3b8" textAnchor="middle">Razão: 32,00 ÷ 5</text>
          <text x="119" y="130" fontSize="11.5" fontWeight="bold" fill="#f59e0b" textAnchor="middle">R$/kg = ?</text>

          {/* Option B Box */}
          <rect x="236" y="38" width="210" height="102" rx="8" fill="#140d04" stroke="#ffbc00" strokeWidth="1.2" />
          <rect x="246" y="46" width="76" height="20" rx="4" fill="#ffbc00" />
          <text x="284" y="60" fontSize="10" fontWeight="bold" fill="#040814" textAnchor="middle">OPÇÃO B</text>
          <text x="341" y="78" fontSize="12" fontWeight="bold" fill="#ffffff" textAnchor="middle">Pacote de 2 kg</text>
          <text x="341" y="96" fontSize="12" fontWeight="bold" fill="#ffbc00" textAnchor="middle">Total: R$ 13,60</text>
          <text x="341" y="113" fontSize="10.5" fill="#94a3b8" textAnchor="middle">Razão: 13,60 ÷ 2</text>
          <text x="341" y="130" fontSize="11.5" fontWeight="bold" fill="#f59e0b" textAnchor="middle">R$/kg = ?</text>

          {/* Pedagogical Hint */}
          <rect x="14" y="146" width="432" height="44" rx="7" fill="#06121e" stroke="#f97316" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="230" y="162" fontSize="10" fontWeight="bold" fill="#fb923c" textAnchor="middle">💡 Dica: Divida o valor em reais pelo peso em kg de cada opção:</text>
          <text x="230" y="179" fontSize="9.5" fill="#94a3b8" textAnchor="middle">A opção com o MENOR preço por quilograma é a mais econômica e vantajosa!</text>
        </svg>
      );

    // AULA 3: QUANTIDADE DE MOVIMENTO (Q = m · v)
    case 'quantidade_movimento_carrinhos':
      return (
        <svg className={className} viewBox="0 0 460 200" fill="none">
          {bgWide}
          {/* Formula Header */}
          <rect x="60" y="8" width="340" height="24" rx="7" fill="#0c1630" stroke="#00f0ff" strokeWidth="1.2" />
          <text x="230" y="24" fontSize="12" fontWeight="bold" fill="#00f0ff" textAnchor="middle">Q = m · v  (Quantidade de Movimento Constante)</text>
          
          {/* Carrinho A */}
          <rect x="14" y="38" width="432" height="48" rx="8" fill="#081026" stroke="#38bdf8" strokeWidth="1.2" />
          <rect x="24" y="46" width="30" height="32" rx="6" fill="#38bdf8" />
          <text x="39" y="67" fontSize="13" fontWeight="bold" fill="#040814" textAnchor="middle">A</text>
          <text x="64" y="56" fontSize="12" fontWeight="bold" fill="#38bdf8">Carrinho A: m = 3 kg  |  v = 8 m/s</text>
          <text x="64" y="73" fontSize="11" fill="#94a3b8">QA = 3 × 8 = ? kg·m/s (produto constante)</text>
          <rect x="300" y="46" width="134" height="32" rx="7" fill="#040916" stroke="#38bdf8" strokeWidth="1" />
          <text x="367" y="66" fontSize="11" fontWeight="bold" fill="#38bdf8" textAnchor="middle">QA = 3 · 8 = ?</text>

          {/* Carrinho B */}
          <rect x="14" y="92" width="432" height="48" rx="8" fill="#140d04" stroke="#ffbc00" strokeWidth="1.2" />
          <rect x="24" y="100" width="30" height="32" rx="6" fill="#ffbc00" />
          <text x="39" y="121" fontSize="13" fontWeight="bold" fill="#040814" textAnchor="middle">B</text>
          <text x="64" y="110" fontSize="12" fontWeight="bold" fill="#ffbc00">Carrinho B: m = 3 × 1,20 = 3,6 kg (+20%)</text>
          <text x="64" y="127" fontSize="11" fill="#94a3b8">Mesmo Q: 3,6 · vB = QA  ➔  vB = QA ÷ 3,6</text>
          <rect x="300" y="100" width="134" height="32" rx="7" fill="#0f0902" stroke="#f59e0b" strokeWidth="1" />
          <text x="367" y="120" fontSize="12" fontWeight="bold" fill="#f59e0b" textAnchor="middle">vB = ?</text>

          {/* Pedagogical Hint without Answer */}
          <rect x="14" y="146" width="432" height="44" rx="7" fill="#06121e" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="230" y="162" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">💡 Dica: Se a massa aumentou 20%, a velocidade precisa diminuir:</text>
          <text x="230" y="179" fontSize="9.5" fill="#94a3b8" textAnchor="middle">Calcule QA = 24 kg·m/s e divida pela nova massa: vB = 24 ÷ 3,6 = ?</text>
        </svg>
      );

    // AULA 4: DENSIDADE DEMOGRÁFICA
    case 'densidade_demografica':
      return (
        <svg className={className} viewBox="0 0 460 200" fill="none">
          {bgWide}
          <rect x="60" y="8" width="340" height="24" rx="7" fill="#0c1630" stroke="#00f0ff" strokeWidth="1.2" />
          <text x="230" y="24" fontSize="12" fontWeight="bold" fill="#00f0ff" textAnchor="middle">Densidade Demográfica = População ÷ Área (km²)</text>
          
          <rect x="14" y="38" width="210" height="102" rx="8" fill="#081026" stroke="#38bdf8" strokeWidth="1.2" />
          <text x="119" y="60" fontSize="12" fontWeight="bold" fill="#38bdf8" textAnchor="middle">MUNICÍPIO PAULISTA</text>
          <text x="119" y="82" fontSize="14" fontWeight="bold" fill="#ffffff" textAnchor="middle">84.000 habitantes</text>
          <text x="119" y="104" fontSize="10.5" fill="#94a3b8" textAnchor="middle">População Total Cadastrada</text>
          <text x="119" y="124" fontSize="10" fill="#38bdf8" textAnchor="middle">Território Urbano e Rural</text>

          <rect x="236" y="38" width="210" height="102" rx="8" fill="#140d04" stroke="#ffbc00" strokeWidth="1.2" />
          <text x="341" y="60" fontSize="12" fontWeight="bold" fill="#ffbc00" textAnchor="middle">ÁREA TERRITORIAL</text>
          <text x="341" y="82" fontSize="14" fontWeight="bold" fill="#ffffff" textAnchor="middle">350 km²</text>
          <text x="341" y="104" fontSize="10.5" fill="#94a3b8" textAnchor="middle">Extensão Territorial</text>
          <text x="341" y="125" fontSize="11.5" fontWeight="bold" fill="#f59e0b" textAnchor="middle">D = 84.000 ÷ 350 = ?</text>

          <rect x="14" y="146" width="432" height="44" rx="7" fill="#06121e" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="230" y="162" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">💡 Dica: Divida o total de habitantes pela área territorial em km²:</text>
          <text x="230" y="179" fontSize="9.5" fill="#94a3b8" textAnchor="middle">Densidade = 84.000 ÷ 350 = ? habitantes por km²</text>
        </svg>
      );

    // AULA 5: CONSUMO DE ENERGIA ELÉTRICA (C = p · t)
    case 'consumo_energia_eletrica':
      return (
        <svg className={className} viewBox="0 0 460 200" fill="none">
          {bgWide}
          <rect x="60" y="8" width="340" height="24" rx="7" fill="#0c1630" stroke="#f59e0b" strokeWidth="1.2" />
          <text x="230" y="24" fontSize="12" fontWeight="bold" fill="#fbbf24" textAnchor="middle">Consumo de Energia Elétrica: C = p · t  (kWh)</text>
          
          <rect x="14" y="38" width="210" height="102" rx="8" fill="#081026" stroke="#38bdf8" strokeWidth="1.2" />
          <text x="119" y="60" fontSize="12" fontWeight="bold" fill="#38bdf8" textAnchor="middle">CHUVEIRO ELÉTRICO</text>
          <text x="119" y="80" fontSize="12.5" fontWeight="bold" fill="#ffffff" textAnchor="middle">Potência: 5.500 W</text>
          <text x="119" y="100" fontSize="12" fontWeight="bold" fill="#38bdf8" textAnchor="middle">p = 5,5 kW</text>
          <text x="119" y="122" fontSize="10" fill="#94a3b8" textAnchor="middle">(1 kW = 1.000 W)</text>

          <rect x="236" y="38" width="210" height="102" rx="8" fill="#140d04" stroke="#ffbc00" strokeWidth="1.2" />
          <text x="341" y="60" fontSize="12" fontWeight="bold" fill="#ffbc00" textAnchor="middle">TEMPO NO MÊS</text>
          <text x="341" y="80" fontSize="11.5" fill="#ffffff" textAnchor="middle">30 min/dia = 0,5 h/dia</text>
          <text x="341" y="100" fontSize="11.5" fontWeight="bold" fill="#ffbc00" textAnchor="middle">Em 30 dias: 15 horas</text>
          <text x="341" y="123" fontSize="12" fontWeight="bold" fill="#f59e0b" textAnchor="middle">C = 5,5 × 15 = ? kWh</text>

          <rect x="14" y="146" width="432" height="44" rx="7" fill="#06121e" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="230" y="162" fontSize="10" fontWeight="bold" fill="#fbbf24" textAnchor="middle">💡 Dica: Converta W para kW (5.500 W = 5,5 kW) e multiplique pelas horas:</text>
          <text x="230" y="179" fontSize="9.5" fill="#94a3b8" textAnchor="middle">0,5 h/dia × 30 dias = 15 horas. Calcule: C = 5,5 × 15 = ? kWh</text>
        </svg>
      );

    // AULA 6: GRANDEZAS INVERSAMENTE PROPORCIONAIS (VAZÃO E TEMPO)
    case 'proporcionalidade_inversa_vazao':
      return (
        <svg className={className} viewBox="0 0 460 200" fill="none">
          {bgWide}
          <rect x="50" y="8" width="360" height="24" rx="7" fill="#0c1630" stroke="#00f0ff" strokeWidth="1.2" />
          <text x="230" y="24" fontSize="12" fontWeight="bold" fill="#00f0ff" textAnchor="middle">Vazão × Tempo = Volume do Tanque (Constante)</text>
          
          {/* Situation 1 */}
          <rect x="14" y="38" width="432" height="48" rx="8" fill="#081026" stroke="#38bdf8" strokeWidth="1.2" />
          <text x="30" y="56" fontSize="12" fontWeight="bold" fill="#38bdf8">Situação 1: Vazão = 12 L/min</text>
          <text x="30" y="73" fontSize="11" fill="#94a3b8">Tempo para encher: 20 minutos</text>
          <rect x="270" y="46" width="164" height="32" rx="7" fill="#040916" stroke="#38bdf8" strokeWidth="1" />
          <text x="352" y="66" fontSize="11" fontWeight="bold" fill="#38bdf8" textAnchor="middle">Vol = 12 × 20 = 240 L</text>

          {/* Situation 2 */}
          <rect x="14" y="92" width="432" height="48" rx="8" fill="#140d04" stroke="#ffbc00" strokeWidth="1.2" />
          <text x="30" y="110" fontSize="12" fontWeight="bold" fill="#ffbc00">Situação 2: Nova vazão = 15 L/min</text>
          <text x="30" y="127" fontSize="11" fill="#94a3b8">Mesmo volume: 15 L/min · t = 240 L</text>
          <rect x="270" y="100" width="164" height="32" rx="7" fill="#0f0902" stroke="#f59e0b" strokeWidth="1" />
          <text x="352" y="120" fontSize="12" fontWeight="bold" fill="#f59e0b" textAnchor="middle">t = 240 ÷ 15 = ? min</text>

          {/* Hint */}
          <rect x="14" y="146" width="432" height="44" rx="7" fill="#06121e" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="230" y="162" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">💡 Dica: Quanto maior a vazão da torneira, menor o tempo para encher:</text>
          <text x="230" y="179" fontSize="9.5" fill="#94a3b8" textAnchor="middle">Divida o volume total do tanque (240 L) pela nova vazão (15 L/min)!</text>
        </svg>
      );

    // AULA 7: COEFICIENTE ANGULAR DA RETA
    case 'ga_coeficiente_angular':
      return (
        <svg className={className} viewBox="0 0 460 200" fill="none">
          {bgWide}
          <rect x="60" y="8" width="340" height="24" rx="7" fill="#0c1630" stroke="#00f0ff" strokeWidth="1.2" />
          <text x="230" y="24" fontSize="12" fontWeight="bold" fill="#00f0ff" textAnchor="middle">Taxa Média de Variação: m = Δy ÷ Δx</text>
          
          <rect x="14" y="38" width="220" height="102" rx="8" fill="#081026" stroke="#38bdf8" strokeWidth="1.2" />
          <line x1="30" y1="115" x2="210" y2="115" stroke="#475569" strokeWidth="1.5" />
          <line x1="45" y1="48" x2="45" y2="128" stroke="#475569" strokeWidth="1.5" />
          <line x1="55" y1="108" x2="190" y2="58" stroke="#00f0ff" strokeWidth="2.5" />
          <circle cx="70" cy="102" r="5" fill="#f43f5e" />
          <circle cx="175" cy="64" r="5" fill="#10b981" />
          <text x="70" y="93" fontSize="10.5" fontWeight="bold" fill="#f43f5e" textAnchor="middle">A(2, 5)</text>
          <text x="175" y="54" fontSize="10.5" fontWeight="bold" fill="#10b981" textAnchor="middle">B(6, 17)</text>

          <rect x="244" y="38" width="202" height="102" rx="8" fill="#140d04" stroke="#ffbc00" strokeWidth="1.2" />
          <text x="345" y="60" fontSize="11" fontWeight="bold" fill="#ffbc00" textAnchor="middle">Δy = 17 - 5 = 12</text>
          <text x="345" y="80" fontSize="11" fontWeight="bold" fill="#38bdf8" textAnchor="middle">Δx = 6 - 2 = 4</text>
          <text x="345" y="102" fontSize="11" fill="#94a3b8" textAnchor="middle">Razão: m = Δy ÷ Δx</text>
          <text x="345" y="123" fontSize="12.5" fontWeight="bold" fill="#f59e0b" textAnchor="middle">m = 12 ÷ 4 = ?</text>

          <rect x="14" y="146" width="432" height="44" rx="7" fill="#06121e" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="230" y="162" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">💡 Dica: Subtraia as ordenadas no numerador e as abscissas no denominador:</text>
          <text x="230" y="179" fontSize="9.5" fill="#94a3b8" textAnchor="middle">(yB - yA) ÷ (xB - xA) = (17 - 5) ÷ (6 - 2) = 12 ÷ 4 = ? (coeficiente angular)!</text>
        </svg>
      );

    // AULA 8: EQUAÇÃO FUNDAMENTAL DA RETA
    case 'equacao_fundamental_reta':
      return (
        <svg className={className} viewBox="0 0 460 200" fill="none">
          {bgWide}
          <rect x="60" y="8" width="340" height="24" rx="7" fill="#0c1630" stroke="#00f0ff" strokeWidth="1.2" />
          <text x="230" y="24" fontSize="12" fontWeight="bold" fill="#00f0ff" textAnchor="middle">Equação Fundamental: y - y₀ = m · (x - x₀)</text>
          
          <rect x="14" y="38" width="432" height="102" rx="8" fill="#081026" stroke="#38bdf8" strokeWidth="1.2" />
          <text x="230" y="62" fontSize="13" fontWeight="bold" fill="#ffffff" textAnchor="middle">Ponto P(3, 4)  |  Inclinação m = 2</text>
          <text x="230" y="84" fontSize="12" fontWeight="bold" fill="#38bdf8" textAnchor="middle">y - 4 = 2 · (x - 3)</text>
          <text x="230" y="104" fontSize="11.5" fill="#94a3b8" textAnchor="middle">y - 4 = 2x - 6  ➔  y = 2x - 6 + 4</text>
          <text x="230" y="126" fontSize="13" fontWeight="bold" fill="#f59e0b" textAnchor="middle">Equação Reduzida: y = ?</text>

          <rect x="14" y="146" width="432" height="44" rx="7" fill="#06121e" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="230" y="162" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">💡 Dica: Aplique a propriedade distributiva e isole a variável y:</text>
          <text x="230" y="179" fontSize="9.5" fill="#94a3b8" textAnchor="middle">y = 2x - 6 + 4 ➔ a equação final fica na forma y = mx + n!</text>
        </svg>
      );

    // AULA 9: RETAS PERPENDICULARES
    case 'ga_retas_perpendiculares':
      return (
        <svg className={className} viewBox="0 0 460 200" fill="none">
          {bgWide}
          <rect x="60" y="8" width="340" height="24" rx="7" fill="#0c1630" stroke="#00f0ff" strokeWidth="1.2" />
          <text x="230" y="24" fontSize="12" fontWeight="bold" fill="#00f0ff" textAnchor="middle">Retas Perpendiculares (90°): mr · ms = -1</text>
          
          <rect x="14" y="38" width="210" height="102" rx="8" fill="#081026" stroke="#38bdf8" strokeWidth="1.2" />
          <line x1="30" y1="120" x2="190" y2="50" stroke="#00f0ff" strokeWidth="2.5" />
          <line x1="70" y1="46" x2="150" y2="128" stroke="#ffbc00" strokeWidth="2.5" />
          <rect x="104" y="78" width="10" height="10" stroke="#ffffff" strokeWidth="1.2" fill="none" transform="rotate(-21, 109, 83)" />
          <text x="180" y="58" fontSize="11" fontWeight="bold" fill="#00f0ff">Reta r</text>
          <text x="156" y="126" fontSize="11" fontWeight="bold" fill="#ffbc00">Reta s</text>

          <rect x="236" y="38" width="210" height="102" rx="8" fill="#140d04" stroke="#ffbc00" strokeWidth="1.2" />
          <text x="341" y="60" fontSize="11.5" fontWeight="bold" fill="#00f0ff" textAnchor="middle">Reta r: mr = 3</text>
          <text x="341" y="80" fontSize="11" fill="#94a3b8" textAnchor="middle">Condição: mr · ms = -1</text>
          <text x="341" y="100" fontSize="11.5" fontWeight="bold" fill="#ffbc00" textAnchor="middle">3 · ms = -1</text>
          <text x="341" y="123" fontSize="12" fontWeight="bold" fill="#34d399" textAnchor="middle">ms = -1 ÷ 3 = ?</text>

          <rect x="14" y="146" width="432" height="44" rx="7" fill="#06121e" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="230" y="162" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">💡 Dica: O coeficiente angular da reta perpendicular é o inverso com sinal trocado:</text>
          <text x="230" y="179" fontSize="9.5" fill="#94a3b8" textAnchor="middle">O inverso de 3 é 1/3, com sinal negativo fica ms = -1/3!</text>
        </svg>
      );

    // AULA 10: DISTÂNCIA ENTRE PONTOS (PITÁGORAS NO PLANO)
    case 'ga_distancia_pontos_pitagoras':
      return (
        <svg className={className} viewBox="0 0 460 200" fill="none">
          {bgWide}
          <rect x="60" y="8" width="340" height="24" rx="7" fill="#0c1630" stroke="#00f0ff" strokeWidth="1.2" />
          <text x="230" y="24" fontSize="12" fontWeight="bold" fill="#00f0ff" textAnchor="middle">Distância Euclidiana: d = √[ (Δx)² + (Δy)² ]</text>
          
          <rect x="14" y="38" width="210" height="102" rx="8" fill="#081026" stroke="#38bdf8" strokeWidth="1.2" />
          <line x1="50" y1="115" x2="170" y2="115" stroke="#ffbc00" strokeWidth="2.5" />
          <line x1="170" y1="115" x2="170" y2="60" stroke="#f43f5e" strokeWidth="2.5" />
          <line x1="50" y1="115" x2="170" y2="60" stroke="#00f0ff" strokeWidth="3" />
          <circle cx="50" cy="115" r="4.5" fill="#38bdf8" />
          <circle cx="170" cy="60" r="4.5" fill="#38bdf8" />
          <text x="40" y="128" fontSize="10.5" fontWeight="bold" fill="#38bdf8">A(1, 2)</text>
          <text x="175" y="58" fontSize="10.5" fontWeight="bold" fill="#38bdf8">B(4, 6)</text>
          <text x="110" y="128" fontSize="10" fontWeight="bold" fill="#ffbc00" textAnchor="middle">Δx = 3</text>
          <text x="185" y="90" fontSize="10" fontWeight="bold" fill="#f43f5e">Δy = 4</text>

          <rect x="236" y="38" width="210" height="102" rx="8" fill="#140d04" stroke="#ffbc00" strokeWidth="1.2" />
          <text x="341" y="60" fontSize="11" fontWeight="bold" fill="#ffbc00" textAnchor="middle">Δx = 4 - 1 = 3  (cateto 1)</text>
          <text x="341" y="80" fontSize="11" fontWeight="bold" fill="#f43f5e" textAnchor="middle">Δy = 6 - 2 = 4  (cateto 2)</text>
          <text x="341" y="100" fontSize="11.5" fill="#94a3b8" textAnchor="middle">d² = 3² + 4² = 9 + 16 = 25</text>
          <text x="341" y="123" fontSize="12.5" fontWeight="bold" fill="#34d399" textAnchor="middle">d = √25 = ? unidades</text>

          <rect x="14" y="146" width="432" height="44" rx="7" fill="#06121e" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="230" y="162" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">💡 Dica: Aplique o Teorema de Pitágoras no triângulo retângulo:</text>
          <text x="230" y="179" fontSize="9.5" fill="#94a3b8" textAnchor="middle">d = √(9 + 16) = √25 = 5 unidades no plano cartesiano!</text>
        </svg>
      );

    // AULA 11: PONTO MÉDIO DE UM SEGMENTO
    case 'ga_ponto_medio':
      return (
        <svg className={className} viewBox="0 0 460 200" fill="none">
          {bgWide}
          <rect x="60" y="8" width="340" height="24" rx="7" fill="#0c1630" stroke="#00f0ff" strokeWidth="1.2" />
          <text x="230" y="24" fontSize="12" fontWeight="bold" fill="#00f0ff" textAnchor="middle">Ponto Médio de AB: M = ((xA + xB)/2, (yA + yB)/2)</text>
          
          <rect x="14" y="38" width="210" height="102" rx="8" fill="#081026" stroke="#38bdf8" strokeWidth="1.2" />
          <line x1="35" y1="110" x2="185" y2="55" stroke="#00f0ff" strokeWidth="3" />
          <circle cx="35" cy="110" r="4.5" fill="#38bdf8" />
          <circle cx="185" cy="55" r="4.5" fill="#38bdf8" />
          <circle cx="110" cy="82" r="5.5" fill="#f43f5e" />
          <text x="35" y="126" fontSize="10.5" fontWeight="bold" fill="#38bdf8" textAnchor="middle">A(2, 8)</text>
          <text x="185" y="46" fontSize="10.5" fontWeight="bold" fill="#38bdf8" textAnchor="middle">B(6, 2)</text>
          <text x="110" y="73" fontSize="11" fontWeight="bold" fill="#f43f5e" textAnchor="middle">M (Médio)</text>

          <rect x="236" y="38" width="210" height="102" rx="8" fill="#140d04" stroke="#ffbc00" strokeWidth="1.2" />
          <text x="341" y="60" fontSize="11" fontWeight="bold" fill="#ffbc00" textAnchor="middle">xM = (2 + 6) ÷ 2 = 4</text>
          <text x="341" y="82" fontSize="11" fontWeight="bold" fill="#ffbc00" textAnchor="middle">yM = (8 + 2) ÷ 2 = 5</text>
          <text x="341" y="104" fontSize="10.5" fill="#94a3b8" textAnchor="middle">Média aritmética simples</text>
          <text x="341" y="124" fontSize="12" fontWeight="bold" fill="#34d399" textAnchor="middle">Ponto M = ( ? , ? )</text>

          <rect x="14" y="146" width="432" height="44" rx="7" fill="#06121e" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="230" y="162" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">💡 Dica: O ponto médio é a média das abscissas e das ordenadas:</text>
          <text x="230" y="179" fontSize="9.5" fill="#94a3b8" textAnchor="middle">(2 + 6)/2 = 4 e (8 + 2)/2 = 5 ➔ M(4, 5)!</text>
        </svg>
      );

    // AULA 12: PONTOS ALINHADOS
    case 'ga_pontos_alinhados':
      return (
        <svg className={className} viewBox="0 0 460 200" fill="none">
          {bgWide}
          <rect x="60" y="8" width="340" height="24" rx="7" fill="#0c1630" stroke="#00f0ff" strokeWidth="1.2" />
          <text x="230" y="24" fontSize="12" fontWeight="bold" fill="#00f0ff" textAnchor="middle">Condição de Alinhamento: m_AB = m_BC ou Determinante = 0</text>
          
          <rect x="14" y="38" width="210" height="102" rx="8" fill="#081026" stroke="#38bdf8" strokeWidth="1.2" />
          <line x1="30" y1="120" x2="190" y2="45" stroke="#00f0ff" strokeWidth="2.5" />
          <circle cx="45" cy="113" r="4.5" fill="#f43f5e" />
          <circle cx="110" cy="83" r="4.5" fill="#ffbc00" />
          <circle cx="175" cy="52" r="4.5" fill="#10b981" />
          <text x="45" y="130" fontSize="10" fontWeight="bold" fill="#f43f5e" textAnchor="middle">A(1, 2)</text>
          <text x="110" y="100" fontSize="10" fontWeight="bold" fill="#ffbc00" textAnchor="middle">B(2, 4)</text>
          <text x="175" y="42" fontSize="10" fontWeight="bold" fill="#10b981" textAnchor="middle">C(3, y)</text>

          <rect x="236" y="38" width="210" height="102" rx="8" fill="#140d04" stroke="#ffbc00" strokeWidth="1.2" />
          <text x="341" y="60" fontSize="11" fontWeight="bold" fill="#00f0ff" textAnchor="middle">m_AB = (4 - 2)/(2 - 1) = 2</text>
          <text x="341" y="82" fontSize="11" fill="#94a3b8" textAnchor="middle">Equação da Reta: y = 2x</text>
          <text x="341" y="104" fontSize="11" fill="#ffbc00" textAnchor="middle">Para x = 3: y = 2 · (3)</text>
          <text x="341" y="124" fontSize="12" fontWeight="bold" fill="#34d399" textAnchor="middle">y = ?</text>

          <rect x="14" y="146" width="432" height="44" rx="7" fill="#06121e" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="230" y="162" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">💡 Dica: Como os pontos formam a reta proporcional y = 2x:</text>
          <text x="230" y="179" fontSize="9.5" fill="#94a3b8" textAnchor="middle">Substituindo a abscissa x = 3: y = 2 × 3 = 6!</text>
        </svg>
      );

    // AULA 13: DISTÂNCIA DE PONTO A RETA
    case 'ga_distancia_ponto_reta':
      return (
        <svg className={className} viewBox="0 0 460 200" fill="none">
          {bgWide}
          <rect x="50" y="8" width="360" height="24" rx="7" fill="#0c1630" stroke="#00f0ff" strokeWidth="1.2" />
          <text x="230" y="24" fontSize="12" fontWeight="bold" fill="#00f0ff" textAnchor="middle">Distância de Ponto a Reta: d = |ax₀ + by₀ + c| ÷ √(a² + b²)</text>
          
          <rect x="14" y="38" width="210" height="102" rx="8" fill="#081026" stroke="#38bdf8" strokeWidth="1.2" />
          <line x1="30" y1="120" x2="190" y2="50" stroke="#00f0ff" strokeWidth="2.5" />
          <circle cx="100" cy="45" r="5" fill="#f43f5e" />
          <line x1="100" y1="45" x2="114" y2="78" stroke="#ffbc00" strokeWidth="2" strokeDasharray="3 2" />
          <rect x="108" y="72" width="7" height="7" stroke="#ffbc00" strokeWidth="1" fill="none" />
          <text x="100" y="35" fontSize="10.5" fontWeight="bold" fill="#f43f5e" textAnchor="middle">P(0, 0)</text>
          <text x="126" y="60" fontSize="11" fontWeight="bold" fill="#ffbc00">d = ?</text>
          <text x="160" y="112" fontSize="9.5" fill="#38bdf8">3x+4y-15=0</text>

          <rect x="236" y="38" width="210" height="102" rx="8" fill="#140d04" stroke="#ffbc00" strokeWidth="1.2" />
          <text x="341" y="58" fontSize="10.5" fontWeight="bold" fill="#00f0ff" textAnchor="middle">Reta: 3x + 4y - 15 = 0</text>
          <text x="341" y="78" fontSize="10.5" fill="#94a3b8" textAnchor="middle">|3(0) + 4(0) - 15| = 15</text>
          <text x="341" y="98" fontSize="10.5" fill="#ffbc00" textAnchor="middle">√(3² + 4²) = √25 = 5</text>
          <text x="341" y="122" fontSize="12" fontWeight="bold" fill="#34d399" textAnchor="middle">d = 15 ÷ 5 = ?</text>

          <rect x="14" y="146" width="432" height="44" rx="7" fill="#06121e" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="230" y="162" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">💡 Dica: Substitua a origem (0,0) no numerador e divida pela raiz √(3² + 4²):</text>
          <text x="230" y="179" fontSize="9.5" fill="#94a3b8" textAnchor="middle">d = |-15| ÷ 5 = 15 ÷ 5 = 3 unidades de distância!</text>
        </svg>
      );

    // AULA 14: DISTÂNCIA ENTRE RETAS PARALELAS
    case 'ga_retas_paralelas_distancia':
      return (
        <svg className={className} viewBox="0 0 460 200" fill="none">
          {bgWide}
          <rect x="50" y="8" width="360" height="24" rx="7" fill="#0c1630" stroke="#00f0ff" strokeWidth="1.2" />
          <text x="230" y="24" fontSize="12" fontWeight="bold" fill="#00f0ff" textAnchor="middle">Distância entre Paralelas: d = |c₁ - c₂| ÷ √(a² + b²)</text>
          
          <rect x="14" y="38" width="210" height="102" rx="8" fill="#081026" stroke="#38bdf8" strokeWidth="1.2" />
          <line x1="25" y1="62" x2="195" y2="62" stroke="#00f0ff" strokeWidth="2.5" />
          <line x1="25" y1="108" x2="195" y2="108" stroke="#00f0ff" strokeWidth="2.5" />
          <line x1="100" y1="62" x2="100" y2="108" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 2" />
          <rect x="100" y="62" width="7" height="7" stroke="#f43f5e" strokeWidth="1" fill="none" />
          <text x="110" y="88" fontSize="11" fontWeight="bold" fill="#f43f5e">d</text>
          <text x="140" y="55" fontSize="9.5" fontWeight="bold" fill="#00f0ff">r: 3x+4y-10=0</text>
          <text x="140" y="122" fontSize="9.5" fontWeight="bold" fill="#00f0ff">s: 3x+4y+15=0</text>

          <rect x="236" y="38" width="210" height="102" rx="8" fill="#140d04" stroke="#ffbc00" strokeWidth="1.2" />
          <text x="341" y="58" fontSize="10.5" fontWeight="bold" fill="#ffbc00" textAnchor="middle">|c₁ - c₂| = |-10 - 15| = 25</text>
          <text x="341" y="78" fontSize="10.5" fill="#94a3b8" textAnchor="middle">√(a² + b²) = √(3² + 4²) = 5</text>
          <text x="341" y="98" fontSize="11" fill="#38bdf8" textAnchor="middle">Razão: 25 ÷ 5</text>
          <text x="341" y="122" fontSize="12" fontWeight="bold" fill="#34d399" textAnchor="middle">d = 25 ÷ 5 = ?</text>

          <rect x="14" y="146" width="432" height="44" rx="7" fill="#06121e" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="230" y="162" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">💡 Dica: Calcule a diferença entre os coeficientes lineares e divida por 5:</text>
          <text x="230" y="179" fontSize="9.5" fill="#94a3b8" textAnchor="middle">d = |-10 - 15| ÷ 5 = 25 ÷ 5 = 5 unidades entre as duas retas!</text>
        </svg>
      );

    // AULA 15: ÁREA DO TRIÂNGULO POR VÉRTICES
    case 'ga_area_triangulo_vertices':
      return (
        <svg className={className} viewBox="0 0 460 200" fill="none">
          {bgWide}
          <rect x="60" y="8" width="340" height="24" rx="7" fill="#0c1630" stroke="#00f0ff" strokeWidth="1.2" />
          <text x="230" y="24" fontSize="12" fontWeight="bold" fill="#00f0ff" textAnchor="middle">Área por Coordenadas: Área = ½ · |Determinante de Gauss|</text>
          
          <rect x="14" y="38" width="210" height="102" rx="8" fill="#081026" stroke="#38bdf8" strokeWidth="1.2" />
          <polygon points="40,118 180,118 90,55" stroke="#00f0ff" strokeWidth="2.5" fill="#00f0ff" fillOpacity="0.15" />
          <circle cx="40" cy="118" r="4" fill="#38bdf8" />
          <circle cx="180" cy="118" r="4" fill="#38bdf8" />
          <circle cx="90" cy="55" r="4" fill="#f43f5e" />
          <text x="32" y="132" fontSize="9.5" fontWeight="bold" fill="#38bdf8">A(0,0)</text>
          <text x="175" y="132" fontSize="9.5" fontWeight="bold" fill="#38bdf8">B(6,0)</text>
          <text x="90" y="45" fontSize="10" fontWeight="bold" fill="#f43f5e" textAnchor="middle">C(2, 4)</text>

          <rect x="236" y="38" width="210" height="102" rx="8" fill="#140d04" stroke="#ffbc00" strokeWidth="1.2" />
          <text x="341" y="60" fontSize="11" fontWeight="bold" fill="#38bdf8" textAnchor="middle">Base no eixo x: 6 unidades</text>
          <text x="341" y="80" fontSize="11" fontWeight="bold" fill="#f43f5e" textAnchor="middle">Altura vertical: y = 4 unidades</text>
          <text x="341" y="100" fontSize="11" fill="#94a3b8" textAnchor="middle">Área = (Base × Altura) ÷ 2</text>
          <text x="341" y="123" fontSize="12" fontWeight="bold" fill="#34d399" textAnchor="middle">Área = (6 × 4) ÷ 2 = ?</text>

          <rect x="14" y="146" width="432" height="44" rx="7" fill="#06121e" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="230" y="162" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">💡 Dica: Base sobre o eixo x mede 6 e altura perpendicular mede 4:</text>
          <text x="230" y="179" fontSize="9.5" fill="#94a3b8" textAnchor="middle">Área = (6 × 4) ÷ 2 = 24 ÷ 2 = 12 unidades²!</text>
        </svg>
      );

    // AULA 16: EQUAÇÃO DA CIRCUNFERÊNCIA (CENTRO E RAIO)
    case 'ga_circunferencia_centro_raio':
    case 'ga_circunferencia':
      return (
        <svg className={className} viewBox="0 0 460 200" fill="none">
          {bgWide}
          <rect x="60" y="8" width="340" height="24" rx="7" fill="#0c1630" stroke="#00f0ff" strokeWidth="1.2" />
          <text x="230" y="24" fontSize="12" fontWeight="bold" fill="#00f0ff" textAnchor="middle">Equação Reduzida: (x - a)² + (y - b)² = R²</text>
          
          <rect x="14" y="38" width="210" height="102" rx="8" fill="#081026" stroke="#38bdf8" strokeWidth="1.2" />
          <circle cx="105" cy="89" r="34" stroke="#00f0ff" strokeWidth="2.5" fill="#00f0ff" fillOpacity="0.1" />
          <circle cx="105" cy="89" r="4.5" fill="#ffbc00" />
          <line x1="105" y1="89" x2="139" y2="89" stroke="#ffbc00" strokeWidth="2.5" />
          <text x="122" y="83" fontSize="10.5" fontWeight="bold" fill="#ffbc00">R = 5</text>
          <text x="105" y="105" fontSize="10.5" fontWeight="bold" fill="#ffffff" textAnchor="middle">C(3, -2)</text>

          <rect x="236" y="38" width="210" height="102" rx="8" fill="#140d04" stroke="#ffbc00" strokeWidth="1.2" />
          <text x="341" y="60" fontSize="11" fontWeight="bold" fill="#38bdf8" textAnchor="middle">Centro: a = 3, b = -2</text>
          <text x="341" y="80" fontSize="11" fontWeight="bold" fill="#ffbc00" textAnchor="middle">Raio: R = 5 ➔ R² = 25</text>
          <text x="341" y="102" fontSize="10.5" fill="#94a3b8" textAnchor="middle">(x - 3)² + [y - (-2)]²</text>
          <text x="341" y="124" fontSize="12" fontWeight="bold" fill="#34d399" textAnchor="middle">(x - 3)² + (y + 2)² = ?</text>

          <rect x="14" y="146" width="432" height="44" rx="7" fill="#06121e" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="230" y="162" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">💡 Dica: Inverta o sinal das coordenadas: (x - 3) e [y - (-2)] = (y + 2)</text>
          <text x="230" y="179" fontSize="9.5" fill="#94a3b8" textAnchor="middle">Eleve o raio ao quadrado no segundo membro: 5² = 25!</text>
        </svg>
      );

    // AULA 17: COMPLETANDO QUADRADOS
    case 'ga_completando_quadrados':
      return (
        <svg className={className} viewBox="0 0 460 200" fill="none">
          {bgWide}
          <rect x="60" y="8" width="340" height="24" rx="7" fill="#0c1630" stroke="#00f0ff" strokeWidth="1.2" />
          <text x="230" y="24" fontSize="12" fontWeight="bold" fill="#00f0ff" textAnchor="middle">Equação Geral ➔ Reduzida da Circunferência</text>
          
          <rect x="14" y="38" width="432" height="102" rx="8" fill="#081026" stroke="#38bdf8" strokeWidth="1.2" />
          <text x="230" y="62" fontSize="12" fontWeight="bold" fill="#ffbc00" textAnchor="middle">Dada: x² + y² - 4x - 6y + 9 = 0</text>
          <text x="230" y="82" fontSize="11.5" fill="#38bdf8" textAnchor="middle">Completando quadrados: (x - 2)² + (y - 3)² = 4</text>
          <text x="230" y="102" fontSize="11.5" fontWeight="bold" fill="#ffffff" textAnchor="middle">Forma Reduzida: (x - a)² + (y - b)² = R²</text>
          <text x="230" y="124" fontSize="12.5" fontWeight="bold" fill="#34d399" textAnchor="middle">Centro C(2, 3)  |  Raio R = √4 = ?</text>

          <rect x="14" y="146" width="432" height="44" rx="7" fill="#06121e" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="230" y="162" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">💡 Dica: O centro é C(2, 3) e o raio é a raiz quadrada do termo independente:</text>
          <text x="230" y="179" fontSize="9.5" fill="#94a3b8" textAnchor="middle">R² = 4 ➔ R = √4 = 2 unidades de raio!</text>
        </svg>
      );

    // AULA 18: POSIÇÃO RELATIVA DE PONTO E CIRCUNFERÊNCIA
    case 'ga_ponto_circunferencia_posicao':
      return (
        <svg className={className} viewBox="0 0 460 200" fill="none">
          {bgWide}
          <rect x="50" y="8" width="360" height="24" rx="7" fill="#0c1630" stroke="#00f0ff" strokeWidth="1.2" />
          <text x="230" y="24" fontSize="12" fontWeight="bold" fill="#00f0ff" textAnchor="middle">Posição de Ponto e Circunferência: Comparar d² com R²</text>
          
          <rect x="14" y="38" width="210" height="102" rx="8" fill="#081026" stroke="#38bdf8" strokeWidth="1.2" />
          <circle cx="105" cy="89" r="34" stroke="#00f0ff" strokeWidth="2.5" fill="#00f0ff" fillOpacity="0.08" />
          <circle cx="105" cy="89" r="4" fill="#ffffff" />
          <circle cx="139" cy="89" r="5" fill="#ffbc00" />
          <text x="145" y="85" fontSize="10.5" fontWeight="bold" fill="#ffbc00">P(3, 4)</text>
          <text x="105" y="112" fontSize="10" fill="#38bdf8" textAnchor="middle">x² + y² = 25</text>

          <rect x="236" y="38" width="210" height="102" rx="8" fill="#140d04" stroke="#ffbc00" strokeWidth="1.2" />
          <text x="341" y="60" fontSize="10.5" fontWeight="bold" fill="#38bdf8" textAnchor="middle">Teste com P(3, 4):</text>
          <text x="341" y="80" fontSize="11" fontWeight="bold" fill="#ffbc00" textAnchor="middle">3² + 4² = 9 + 16 = 25</text>
          <text x="341" y="100" fontSize="10.5" fill="#94a3b8" textAnchor="middle">Como 25 = R² (25 = 25)...</text>
          <text x="341" y="124" fontSize="12" fontWeight="bold" fill="#34d399" textAnchor="middle">Posição: Pertence à Circunf.!</text>

          <rect x="14" y="146" width="432" height="44" rx="7" fill="#06121e" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="230" y="162" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">💡 Dica: d² &lt; R² ➔ Interno  |  d² = R² ➔ Pertence à borda  |  d² &gt; R² ➔ Externo</text>
          <text x="230" y="179" fontSize="9.5" fill="#94a3b8" textAnchor="middle">Como 25 é exatamente igual ao raio ao quadrado (25), o ponto pertence à curva!</text>
        </svg>
      );

    // AULA 19: ARCOS CÔNGRUOS
    case 'arcos_congruos':
      return (
        <svg className={className} viewBox="0 0 460 200" fill="none">
          {bgWide}
          <rect x="50" y="8" width="360" height="24" rx="7" fill="#0c1630" stroke="#00f0ff" strokeWidth="1.2" />
          <text x="230" y="24" fontSize="12" fontWeight="bold" fill="#00f0ff" textAnchor="middle">Ciclo Trigonométrico & Arcos Cônfgruos: α = θ + k · 360°</text>
          
          <rect x="14" y="38" width="210" height="102" rx="8" fill="#081026" stroke="#38bdf8" strokeWidth="1.2" />
          <circle cx="105" cy="89" r="34" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.08" />
          <line x1="65" y1="89" x2="145" y2="89" stroke="#475569" strokeWidth="1.5" />
          <line x1="105" y1="49" x2="105" y2="129" stroke="#475569" strokeWidth="1.5" />
          <path d="M 105,89 L 139,89 A 34,34 0 0,0 134,72 Z" fill="#ffbc00" fillOpacity="0.3" stroke="#ffbc00" strokeWidth="2" />
          <text x="145" y="72" fontSize="11" fontWeight="bold" fill="#ffbc00">30°</text>

          <rect x="236" y="38" width="210" height="102" rx="8" fill="#140d04" stroke="#ffbc00" strokeWidth="1.2" />
          <text x="341" y="60" fontSize="11" fontWeight="bold" fill="#38bdf8" textAnchor="middle">Ângulo total: 750°</text>
          <text x="341" y="80" fontSize="10.5" fill="#94a3b8" textAnchor="middle">750 ÷ 360 = 2 voltas (720°)</text>
          <text x="341" y="100" fontSize="11" fontWeight="bold" fill="#ffbc00" textAnchor="middle">Resto: 750° - 720° = ?</text>
          <text x="341" y="124" fontSize="12" fontWeight="bold" fill="#34d399" textAnchor="middle">1ª Determinação = 30°</text>

          <rect x="14" y="146" width="432" height="44" rx="7" fill="#06121e" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="230" y="162" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">💡 Dica: Divida o ângulo total por 360° e observe o resto da divisão:</text>
          <text x="230" y="179" fontSize="9.5" fill="#94a3b8" textAnchor="middle">750° - (2 × 360°) = 750° - 720° = 30° (arco côngruo)!</text>
        </svg>
      );

    // AULA 20: IDENTIDADES DO ARCO DUPLO
    case 'identidade_arco_duplo':
      return (
        <svg className={className} viewBox="0 0 460 200" fill="none">
          {bgWide}
          <rect x="60" y="8" width="340" height="24" rx="7" fill="#0c1630" stroke="#ffbc00" strokeWidth="1.2" />
          <text x="230" y="24" fontSize="12" fontWeight="bold" fill="#ffbc00" textAnchor="middle">Identidades do Arco Duplo: cos(2x)</text>
          
          <rect x="14" y="38" width="432" height="102" rx="8" fill="#081026" stroke="#38bdf8" strokeWidth="1.2" />
          <text x="230" y="60" fontSize="12" fontWeight="bold" fill="#00f0ff" textAnchor="middle">Fórmula Original: cos(2x) = cos²(x) - sen²(x)</text>
          <text x="230" y="80" fontSize="11" fill="#94a3b8" textAnchor="middle">Relação Fundamental: sen²(x) = 1 - cos²(x)</text>
          <text x="230" y="100" fontSize="11" fill="#ffbc00" textAnchor="middle">Substituição: cos(2x) = cos²(x) - (1 - cos²(x))</text>
          <text x="230" y="124" fontSize="12.5" fontWeight="bold" fill="#34d399" textAnchor="middle">Forma Equivalente: 2 · cos²(x) - 1</text>

          <rect x="14" y="146" width="432" height="44" rx="7" fill="#06121e" stroke="#ffbc00" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="230" y="162" fontSize="10" fontWeight="bold" fill="#ffbc00" textAnchor="middle">💡 Dica: Substitua sen²(x) por 1 - cos²(x) na identidade trigonométrica:</text>
          <text x="230" y="179" fontSize="9.5" fill="#94a3b8" textAnchor="middle">cos²(x) - (1 - cos²(x)) = cos²(x) - 1 + cos²(x) = 2cos²(x) - 1!</text>
        </svg>
      );

    // AULA 21: ONDAS PERIÓDICAS (ENEM)
    case 'ondas_periodicas_enem':
      return (
        <svg className={className} viewBox="0 0 460 200" fill="none">
          {bgWide}
          <rect x="50" y="8" width="360" height="24" rx="7" fill="#0c1630" stroke="#00f0ff" strokeWidth="1.2" />
          <text x="230" y="24" fontSize="12" fontWeight="bold" fill="#00f0ff" textAnchor="middle">Modelagem Periódica de Fenômenos: h(t) = A + B · sen(ωt)</text>
          
          <rect x="14" y="38" width="210" height="102" rx="8" fill="#081026" stroke="#38bdf8" strokeWidth="1.2" />
          <line x1="25" y1="89" x2="195" y2="89" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 2" />
          <path d="M 25,89 Q 50,49 75,89 T 125,89 T 175,89 T 195,89" stroke="#00f0ff" strokeWidth="2.5" fill="none" />
          <circle cx="75" cy="57" r="4.5" fill="#ffbc00" />
          <text x="75" y="49" fontSize="10" fontWeight="bold" fill="#ffbc00" textAnchor="middle">Máx</text>

          <rect x="236" y="38" width="210" height="102" rx="8" fill="#140d04" stroke="#ffbc00" strokeWidth="1.2" />
          <text x="341" y="58" fontSize="11" fontWeight="bold" fill="#38bdf8" textAnchor="middle">h(t) = 3 + 2 · sen(πt/6)</text>
          <text x="341" y="78" fontSize="10.5" fill="#94a3b8" textAnchor="middle">A = 3 m | Amplitude = 2 m</text>
          <text x="341" y="98" fontSize="10.5" fill="#ffbc00" textAnchor="middle">Máximo de sen(...) = +1</text>
          <text x="341" y="122" fontSize="12" fontWeight="bold" fill="#34d399" textAnchor="middle">h_max = 3 + 2(1) = ? m</text>

          <rect x="14" y="146" width="432" height="44" rx="7" fill="#06121e" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="230" y="162" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">💡 Dica: A crista da onda ocorre quando a função seno atinge o valor máximo (+1):</text>
          <text x="230" y="179" fontSize="9.5" fill="#94a3b8" textAnchor="middle">h_max = 3 + 2(1) = 5 metros!</text>
        </svg>
      );

    // AULA 22: SÓLIDO COMPOSTO (SILO - ENEM)
    case 'solido_composto_enem':
      return (
        <svg className={className} viewBox="0 0 460 200" fill="none">
          {bgWide}
          <rect x="60" y="8" width="340" height="24" rx="7" fill="#0c1630" stroke="#00f0ff" strokeWidth="1.2" />
          <text x="230" y="24" fontSize="12" fontWeight="bold" fill="#00f0ff" textAnchor="middle">Sólido Composto (Silo): V_total = V_cilindro + V_cone</text>
          
          <rect x="14" y="38" width="180" height="102" rx="8" fill="#081026" stroke="#38bdf8" strokeWidth="1.2" />
          <ellipse cx="104" cy="115" rx="30" ry="9" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.1" />
          <line x1="74" y1="80" x2="74" y2="115" stroke="#38bdf8" strokeWidth="2" />
          <line x1="134" y1="80" x2="134" y2="115" stroke="#38bdf8" strokeWidth="2" />
          <ellipse cx="104" cy="80" rx="30" ry="9" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.1" />
          <line x1="74" y1="80" x2="104" y2="52" stroke="#ffbc00" strokeWidth="2" />
          <line x1="134" y1="80" x2="104" y2="52" stroke="#ffbc00" strokeWidth="2" />
          <circle cx="104" cy="52" r="3" fill="#ffbc00" />

          <rect x="204" y="38" width="242" height="102" rx="8" fill="#140d04" stroke="#ffbc00" strokeWidth="1.2" />
          <text x="325" y="58" fontSize="11" fontWeight="bold" fill="#38bdf8" textAnchor="middle">Cilindro (h=10, r=3, π≈3):</text>
          <text x="325" y="74" fontSize="11" fill="#ffffff" textAnchor="middle">V_cil = 3 × 3² × 10 = 270 m³</text>
          <text x="325" y="94" fontSize="11" fontWeight="bold" fill="#ffbc00" textAnchor="middle">Cone (h=4, r=3, π≈3):</text>
          <text x="325" y="110" fontSize="11" fill="#ffffff" textAnchor="middle">V_cone = (3 × 3² × 4) ÷ 3 = 36 m³</text>
          <text x="325" y="128" fontSize="12" fontWeight="bold" fill="#34d399" textAnchor="middle">Total: 270 + 36 = ? m³</text>

          <rect x="14" y="146" width="432" height="44" rx="7" fill="#06121e" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="230" y="162" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">💡 Dica: Some o volume do cilindro (270 m³) com o volume do cone (36 m³):</text>
          <text x="230" y="179" fontSize="9.5" fill="#94a3b8" textAnchor="middle">270 + 36 = 306 m³ no total!</text>
        </svg>
      );

    // AULA 23: QUADRADO ROTACIONADO (DIAGONAL)
    case 'ga_quadrado_rotacionado':
      return (
        <svg className={className} viewBox="0 0 460 200" fill="none">
          {bgWide}
          <rect x="60" y="8" width="340" height="24" rx="7" fill="#0c1630" stroke="#00f0ff" strokeWidth="1.2" />
          <text x="230" y="24" fontSize="12" fontWeight="bold" fill="#00f0ff" textAnchor="middle">Área do Quadrado via Diagonal: Área = d² ÷ 2</text>
          
          <rect x="14" y="38" width="210" height="102" rx="8" fill="#081026" stroke="#38bdf8" strokeWidth="1.2" />
          <line x1="45" y1="118" x2="165" y2="118" stroke="#475569" strokeWidth="1.5" />
          <line x1="45" y1="58" x2="45" y2="118" stroke="#475569" strokeWidth="1.5" />
          <line x1="45" y1="118" x2="145" y2="58" stroke="#00f0ff" strokeWidth="2.5" />
          <circle cx="45" cy="118" r="4.5" fill="#38bdf8" />
          <circle cx="145" cy="58" r="4.5" fill="#38bdf8" />
          <text x="35" y="126" fontSize="10.5" fontWeight="bold" fill="#38bdf8">(0, 0)</text>
          <text x="155" y="54" fontSize="10.5" fontWeight="bold" fill="#38bdf8">(6, 8)</text>

          <rect x="236" y="38" width="210" height="102" rx="8" fill="#140d04" stroke="#ffbc00" strokeWidth="1.2" />
          <text x="341" y="60" fontSize="11" fontWeight="bold" fill="#ffbc00" textAnchor="middle">Diagonal d = √(6² + 8²) = 10</text>
          <text x="341" y="80" fontSize="10.5" fill="#94a3b8" textAnchor="middle">Área = d² / 2 = 10² / 2</text>
          <text x="341" y="100" fontSize="11" fontWeight="bold" fill="#ffffff" textAnchor="middle">100 ÷ 2 = ?</text>
          <text x="341" y="124" fontSize="12" fontWeight="bold" fill="#34d399" textAnchor="middle">Área = 50 unidades²</text>

          <rect x="14" y="146" width="432" height="44" rx="7" fill="#06121e" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="230" y="162" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">💡 Dica: A diagonal divide o quadrado em 2 triângulos retângulos:</text>
          <text x="230" y="179" fontSize="9.5" fill="#94a3b8" textAnchor="middle">Área = 10² ÷ 2 = 100 ÷ 2 = 50 unidades²!</text>
        </svg>
      );

    // AULA 24: VELOCIDADE MÉDIA GLOBAL (MÚLTIPLOS TRECHOS)
    case 'velocidade_media_global':
      return (
        <svg className={className} viewBox="0 0 460 200" fill="none">
          {bgWide}
          <rect x="60" y="8" width="340" height="24" rx="7" fill="#0c1630" stroke="#00f0ff" strokeWidth="1.2" />
          <text x="230" y="24" fontSize="12" fontWeight="bold" fill="#00f0ff" textAnchor="middle">Velocidade Média Global: Vm = ΔS_total ÷ Δt_total</text>
          
          {/* Trecho 1 */}
          <rect x="14" y="38" width="432" height="48" rx="8" fill="#081026" stroke="#38bdf8" strokeWidth="1.2" />
          <rect x="24" y="46" width="30" height="32" rx="6" fill="#38bdf8" />
          <text x="39" y="67" fontSize="14" fontWeight="bold" fill="#040814" textAnchor="middle">1</text>
          <text x="64" y="56" fontSize="12" fontWeight="bold" fill="#38bdf8">TRECHO 1: 60 km em 1,0 hora</text>
          <text x="64" y="73" fontSize="11" fill="#94a3b8">Vm₁ = 60 km/h (ΔS₁ = 60 km | Δt₁ = 1,0 h)</text>
          <rect x="300" y="46" width="134" height="32" rx="7" fill="#040916" stroke="#38bdf8" strokeWidth="1" />
          <text x="367" y="66" fontSize="11" fontWeight="bold" fill="#38bdf8" textAnchor="middle">ΔS₁ = 60 | Δt₁ = 1,0</text>

          {/* Trecho 2 */}
          <rect x="14" y="92" width="432" height="48" rx="8" fill="#140d04" stroke="#ffbc00" strokeWidth="1.2" />
          <rect x="24" y="100" width="30" height="32" rx="6" fill="#ffbc00" />
          <text x="39" y="121" fontSize="14" fontWeight="bold" fill="#040814" textAnchor="middle">2</text>
          <text x="64" y="110" fontSize="12" fontWeight="bold" fill="#ffbc00">TRECHO 2: 120 km em 1,5 hora</text>
          <text x="64" y="127" fontSize="11" fill="#94a3b8">Total: ΔS = 180 km | Tempo total = 2,5 h</text>
          <rect x="280" y="100" width="154" height="32" rx="7" fill="#0f0902" stroke="#f59e0b" strokeWidth="1" />
          <text x="357" y="120" fontSize="11" fontWeight="bold" fill="#f59e0b" textAnchor="middle">Vm = 180 ÷ 2,5 = ?</text>

          {/* Hint */}
          <rect x="14" y="146" width="432" height="44" rx="7" fill="#06121e" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 2" />
          <text x="230" y="162" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">💡 Dica: Divida o percurso total (180 km) pelo tempo total (1 + 1,5 = 2,5 h):</text>
          <text x="230" y="179" fontSize="9.5" fill="#94a3b8" textAnchor="middle">Vm_global = 180 ÷ 2,5 = 72 km/h (NÃO é a média aritmética das velocidades)!</text>
        </svg>
      );


    // ----------------------------------------------------
    // 6º ANO DO ENSINO FUNDAMENTAL & MEDIDAS BÁSICAS
    // ----------------------------------------------------
    case 'retangulo_perimetro':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <rect x="35" y="30" width="130" height="55" stroke="#00f0ff" strokeWidth="2.5" fill="#00f0ff" fillOpacity="0.08" rx="4" />
          <text x="100" y="24" fontSize="11" fontWeight="bold" fill="#38bdf8" textAnchor="middle">12 m (comprimento)</text>
          <text x="100" y="100" fontSize="10" fill="#94a3b8" textAnchor="middle">12 m</text>
          <text x="24" y="62" fontSize="11" fontWeight="bold" fill="#ffbc00" textAnchor="middle">5 m</text>
          <text x="176" y="62" fontSize="11" fontWeight="bold" fill="#ffbc00" textAnchor="middle">5 m</text>
          <text x="100" y="114" fontSize="9" fontWeight="bold" fill="#38bdf8" textAnchor="middle">💡 Dica: Perímetro = soma dos 4 lados = ? m</text>
        </svg>
      );

    case 'metro_conversao':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          {/* Ruler scale graphic */}
          <rect x="25" y="45" width="150" height="28" stroke="#38bdf8" strokeWidth="2" fill="#0f172a" rx="4" />
          {[...Array(11)].map((_, i) => (
            <line key={i} x1={35 + i * 13} y1="45" x2={35 + i * 13} y2={i % 2 === 0 ? "60" : "53"} stroke="#00f0ff" strokeWidth="1.5" />
          ))}
          <line x1="35" y1="36" x2="165" y2="36" stroke="#ffbc00" strokeWidth="2" />
          <polygon points="165,36 158,32 158,40" fill="#ffbc00" />
          <text x="100" y="30" fontSize="11" fontWeight="bold" fill="#ffbc00" textAnchor="middle">2,5 metros (m)</text>
          <text x="100" y="93" fontSize="11" fontWeight="bold" fill="#f59e0b" textAnchor="middle">2,5 m = ? cm</text>
          <text x="100" y="112" fontSize="9" fill="#94a3b8" textAnchor="middle">💡 Dica: 1 m = 100 cm ➔ Multiplique por 100</text>
        </svg>
      );

    case 'angulo_classificacao':
    case 'angulo_agudo':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <line x1="40" y1="88" x2="160" y2="88" stroke="#38bdf8" strokeWidth="2.5" />
          <line x1="40" y1="88" x2="120" y2="28" stroke="#ffbc00" strokeWidth="2.5" />
          <path d="M 75,88 A 35,35 0 0,0 64,70" stroke="#00f0ff" strokeWidth="2" fill="none" />
          <circle cx="40" cy="88" r="4" fill="#00f0ff" />
          <text x="82" y="78" fontSize="11" fontWeight="bold" fill="#ffbc00">&lt; 90° (Agudo)</text>
          <text x="100" y="110" fontSize="9" fill="#94a3b8" textAnchor="middle">Agudo: 0° &lt; θ &lt; 90° | Reto: 90°</text>
        </svg>
      );

    case 'quadrado_area':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <rect x="65" y="24" width="70" height="70" stroke="#10b981" strokeWidth="2.5" fill="#10b981" fillOpacity="0.12" rx="4" />
          <text x="100" y="18" fontSize="11" fontWeight="bold" fill="#34d399" textAnchor="middle">Lado = 7 m</text>
          <text x="48" y="62" fontSize="11" fontWeight="bold" fill="#34d399" textAnchor="middle">7 m</text>
          <text x="100" y="62" fontSize="13" fontWeight="bold" fill="#ffffff" textAnchor="middle">Área = L²</text>
          <text x="100" y="112" fontSize="9" fontWeight="bold" fill="#38bdf8" textAnchor="middle">Área = 7 × 7 = ? m²</text>
        </svg>
      );

    case 'fracao_circulo':
    case 'fracao_visual':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <circle cx="100" cy="58" r="38" stroke="#38bdf8" strokeWidth="2" fill="#0f172a" />
          <path d="M 100,58 L 100,20 A 38,38 0 0,1 138,58 Z" fill="#00f0ff" fillOpacity="0.6" stroke="#00f0ff" strokeWidth="1.5" />
          <path d="M 100,58 L 138,58 A 38,38 0 0,1 100,96 Z" fill="#00f0ff" fillOpacity="0.6" stroke="#00f0ff" strokeWidth="1.5" />
          <path d="M 100,58 L 100,96 A 38,38 0 0,1 62,58 Z" fill="#00f0ff" fillOpacity="0.6" stroke="#00f0ff" strokeWidth="1.5" />
          <line x1="62" y1="58" x2="138" y2="58" stroke="#38bdf8" strokeWidth="1.5" />
          <line x1="100" y1="20" x2="100" y2="96" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="100" y="112" fontSize="10" fontWeight="bold" fill="#a78bfa" textAnchor="middle">3 partes de 4 = ¾ = 0,75 (75%)</text>
        </svg>
      );

    case 'triangulo_equilatero':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <polygon points="100,22 45,95 155,95" stroke="#ffbc00" strokeWidth="2.5" fill="#ffbc00" fillOpacity="0.12" />
          <text x="100" y="44" fontSize="10" fontWeight="bold" fill="#ffbc00" textAnchor="middle">60°</text>
          <text x="65" y="90" fontSize="10" fontWeight="bold" fill="#ffbc00">60°</text>
          <text x="122" y="90" fontSize="10" fontWeight="bold" fill="#ffbc00">60°</text>
          <text x="62" y="55" fontSize="10" fill="#38bdf8">L</text>
          <text x="135" y="55" fontSize="10" fill="#38bdf8">L</text>
          <text x="100" y="108" fontSize="10" fill="#38bdf8" textAnchor="middle">Base = L</text>
        </svg>
      );

    case 'triangulo_equilatero_altura':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <polygon points="100,20 45,95 155,95" stroke="#ffbc00" strokeWidth="2.5" fill="#ffbc00" fillOpacity="0.1" />
          <line x1="100" y1="20" x2="100" y2="95" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 2" />
          <rect x="100" y="85" width="10" height="10" stroke="#f43f5e" strokeWidth="1" fill="none" />
          <text x="92" y="60" fontSize="10" fontWeight="bold" fill="#f43f5e" textAnchor="end">h</text>
          <text x="100" y="112" fontSize="9" fontWeight="bold" fill="#34d399" textAnchor="middle">h = (L · √3) / 2 | Área = (L² · √3) / 4</text>
        </svg>
      );

    case 'hexagono_regular':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <polygon points="70,30 130,30 160,60 130,90 70,90 40,60" stroke="#00f0ff" strokeWidth="2.5" fill="#00f0ff" fillOpacity="0.1" />
          <circle cx="100" cy="60" r="3" fill="#ffbc00" />
          <line x1="100" y1="60" x2="70" y2="30" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="100" y1="60" x2="130" y2="30" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="100" y1="60" x2="160" y2="60" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="100" y1="60" x2="130" y2="90" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="100" y1="60" x2="70" y2="90" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="100" y1="60" x2="40" y2="60" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
          <text x="100" y="112" fontSize="9" fontWeight="bold" fill="#ffbc00" textAnchor="middle">Hexágono = 6 Triângulos Equiláteros</text>
        </svg>
      );

    case 'malha_quadriculada':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          {/* Grid lines */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line key={`h-${i}`} x1="45" y1={25 + i * 14} x2="155" y2={25 + i * 14} stroke="#1e293b" strokeWidth="1" />
          ))}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <line key={`v-${i}`} x1={45 + i * 15} y1="25" x2={45 + i * 15} y2="95" stroke="#1e293b" strokeWidth="1" />
          ))}
          {/* Colored shape occupying 12 squares */}
          <polygon points="60,39 120,39 135,67 105,95 60,95" stroke="#00f0ff" strokeWidth="2.5" fill="#00f0ff" fillOpacity="0.25" />
          <text x="100" y="112" fontSize="9" fontWeight="bold" fill="#38bdf8" textAnchor="middle">Malha: Contagem de Unidades de Área</text>
        </svg>
      );

    case 'cubo_planificacao':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          {/* Net of a cube: 4 vertical squares + 2 lateral wings */}
          <rect x="85" y="15" width="22" height="22" stroke="#38bdf8" strokeWidth="1.5" fill="#00f0ff" fillOpacity="0.15" />
          <rect x="63" y="37" width="22" height="22" stroke="#38bdf8" strokeWidth="1.5" fill="#00f0ff" fillOpacity="0.15" />
          <rect x="85" y="37" width="22" height="22" stroke="#ffbc00" strokeWidth="1.5" fill="#ffbc00" fillOpacity="0.2" />
          <rect x="107" y="37" width="22" height="22" stroke="#38bdf8" strokeWidth="1.5" fill="#00f0ff" fillOpacity="0.15" />
          <rect x="85" y="59" width="22" height="22" stroke="#38bdf8" strokeWidth="1.5" fill="#00f0ff" fillOpacity="0.15" />
          <rect x="85" y="81" width="22" height="22" stroke="#38bdf8" strokeWidth="1.5" fill="#00f0ff" fillOpacity="0.15" />
          <text x="100" y="114" fontSize="9" fontWeight="bold" fill="#34d399" textAnchor="middle">Planificação: 6 Faces Quadradas Iguais</text>
        </svg>
      );

    case 'retas_paralelas':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <line x1="25" y1="40" x2="175" y2="40" stroke="#00f0ff" strokeWidth="2.5" />
          <line x1="25" y1="75" x2="175" y2="75" stroke="#00f0ff" strokeWidth="2.5" />
          <line x1="100" y1="40" x2="100" y2="75" stroke="#ffbc00" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="180" y="44" fontSize="11" fontWeight="bold" fill="#00f0ff">r</text>
          <text x="180" y="79" fontSize="11" fontWeight="bold" fill="#00f0ff">s</text>
          <text x="107" y="60" fontSize="10" fontWeight="bold" fill="#ffbc00">distância constante</text>
          <text x="100" y="110" fontSize="9" fill="#94a3b8" textAnchor="middle">Retas Paralelas: r // s (não se cruzam)</text>
        </svg>
      );

    case 'eixo_simetria':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          {/* Symmetric butterfly/geometry */}
          <path d="M 100,30 C 70,15 45,40 55,65 C 60,80 85,85 100,92 C 115,85 140,80 145,65 C 155,40 130,15 100,30 Z" stroke="#38bdf8" strokeWidth="2" fill="#38bdf8" fillOpacity="0.15" />
          <line x1="100" y1="18" x2="100" y2="102" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" />
          <text x="100" y="114" fontSize="9" fontWeight="bold" fill="#f43f5e" textAnchor="middle">Eixo de Simetria Reflexiva</text>
        </svg>
      );

    case 'trapezio_perimetro':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <polygon points="50,85 150,85 130,35 70,35" stroke="#00f0ff" strokeWidth="2.5" fill="#00f0ff" fillOpacity="0.1" />
          <text x="100" y="28" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">b = 6 m</text>
          <text x="100" y="98" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">B = 10 m</text>
          <text x="48" y="58" fontSize="10" fontWeight="bold" fill="#ffbc00">5 m</text>
          <text x="144" y="58" fontSize="10" fontWeight="bold" fill="#ffbc00">5 m</text>
          <text x="100" y="114" fontSize="9" fill="#34d399" textAnchor="middle">Perímetro = 10 + 6 + 5 + 5 = ? m</text>
        </svg>
      );

    case 'bloco_cubinhos':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <rect x="45" y="45" width="80" height="40" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.1" />
          <polygon points="45,45 70,25 150,25 125,45" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.15" />
          <polygon points="125,45 150,25 150,65 125,85" stroke="#00f0ff" strokeWidth="2" fill="#38bdf8" fillOpacity="0.1" />
          <text x="85" y="100" fontSize="9" fontWeight="bold" fill="#38bdf8" textAnchor="middle">c = 5 cm</text>
          <text x="146" y="42" fontSize="9" fontWeight="bold" fill="#ffbc00">l = 3 cm</text>
          <text x="32" y="65" fontSize="9" fontWeight="bold" fill="#f43f5e">h = 2</text>
          <text x="100" y="114" fontSize="9" fill="#94a3b8" textAnchor="middle">Volume V = c · l · h = 5 · 3 · 2 = ? cm³</text>
        </svg>
      );

    case 'giro_graus':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <circle cx="100" cy="58" r="35" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="100" y1="58" x2="100" y2="23" stroke="#00f0ff" strokeWidth="2.5" />
          <line x1="100" y1="58" x2="135" y2="58" stroke="#ffbc00" strokeWidth="2.5" />
          <path d="M 100,38 A 20,20 0 0,1 120,58" stroke="#f43f5e" strokeWidth="2" fill="none" />
          <polygon points="120,58 122,50 115,53" fill="#f43f5e" />
          <text x="115" y="44" fontSize="10" fontWeight="bold" fill="#f43f5e">90°</text>
          <text x="100" y="112" fontSize="9" fill="#38bdf8" textAnchor="middle">Giro: 90° (¼ volta) | 180° (meia volta)</text>
        </svg>
      );

    // ----------------------------------------------------
    // 7º ANO DO ENSINO FUNDAMENTAL & ÂNGULOS / POLÍGONOS
    // ----------------------------------------------------
    case 'triangulo_angulos_soma':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <polygon points="35,92 165,92 90,28" stroke="#00f0ff" strokeWidth="2.5" fill="#00f0ff" fillOpacity="0.08" />
          <text x="52" y="86" fontSize="10" fontWeight="bold" fill="#ffbc00">50°</text>
          <text x="138" y="86" fontSize="10" fontWeight="bold" fill="#38bdf8">70°</text>
          <text x="90" y="46" fontSize="11" fontWeight="bold" fill="#f43f5e" textAnchor="middle">x = ?</text>
          <text x="100" y="112" fontSize="9" fill="#94a3b8" textAnchor="middle">Soma dos Ângulos Internos = 180°</text>
        </svg>
      );

    case 'triangulo_base_altura':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <polygon points="30,88 170,88 110,25" stroke="#00f0ff" strokeWidth="2.5" fill="#00f0ff" fillOpacity="0.1" />
          <line x1="110" y1="25" x2="110" y2="88" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 2" />
          <rect x="110" y="78" width="10" height="10" stroke="#f43f5e" strokeWidth="1" fill="none" />
          <text x="100" y="100" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">Base (b) = 8 cm</text>
          <text x="118" y="55" fontSize="10" fontWeight="bold" fill="#f43f5e">h = 5 cm</text>
          <text x="100" y="114" fontSize="9" fill="#34d399" textAnchor="middle">Área = (b × h) ÷ 2 = (8 × 5) ÷ 2 = ? cm²</text>
        </svg>
      );

    case 'angulos_suplementares':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <line x1="25" y1="85" x2="175" y2="85" stroke="#38bdf8" strokeWidth="2.5" />
          <line x1="100" y1="85" x2="60" y2="30" stroke="#ffbc00" strokeWidth="2.5" />
          <circle cx="100" cy="85" r="3.5" fill="#00f0ff" />
          <path d="M 75,85 A 25,25 0 0,1 86,66" stroke="#00f0ff" strokeWidth="2" fill="none" />
          <path d="M 100,60 A 25,25 0 0,1 125,85" stroke="#f43f5e" strokeWidth="2" fill="none" />
          <text x="58" y="70" fontSize="10" fontWeight="bold" fill="#00f0ff">130°</text>
          <text x="125" y="72" fontSize="10" fontWeight="bold" fill="#f43f5e">x = ?</text>
          <text x="100" y="112" fontSize="9" fill="#94a3b8" textAnchor="middle">Ângulos Suplementares: Soma = 180°</text>
        </svg>
      );

    case 'angulos_opv':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <line x1="30" y1="90" x2="170" y2="30" stroke="#00f0ff" strokeWidth="2.5" />
          <line x1="30" y1="30" x2="170" y2="90" stroke="#ffbc00" strokeWidth="2.5" />
          <circle cx="100" cy="60" r="3" fill="#ffffff" />
          <text x="60" y="63" fontSize="11" fontWeight="bold" fill="#00f0ff">x = ?</text>
          <text x="128" y="63" fontSize="11" fontWeight="bold" fill="#ffbc00">40°</text>
          <text x="100" y="42" fontSize="9" fill="#94a3b8" textAnchor="middle">140°</text>
          <text x="100" y="86" fontSize="9" fill="#94a3b8" textAnchor="middle">140°</text>
          <text x="100" y="112" fontSize="9" fontWeight="bold" fill="#34d399" textAnchor="middle">O.P.V.: Ângulos Opostos são Iguais</text>
        </svg>
      );

    case 'angulos_complementares':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <line x1="50" y1="90" x2="150" y2="90" stroke="#38bdf8" strokeWidth="2.5" />
          <line x1="50" y1="90" x2="50" y2="20" stroke="#38bdf8" strokeWidth="2.5" />
          <line x1="50" y1="90" x2="125" y2="35" stroke="#ffbc00" strokeWidth="2.5" />
          <rect x="50" y="78" width="12" height="12" stroke="#38bdf8" strokeWidth="1" fill="none" />
          <text x="75" y="80" fontSize="10" fontWeight="bold" fill="#ffbc00">35°</text>
          <text x="65" y="50" fontSize="10" fontWeight="bold" fill="#f43f5e">x = ?</text>
          <text x="100" y="112" fontSize="9" fill="#94a3b8" textAnchor="middle">Ângulos Complementares: Soma = 90°</text>
        </svg>
      );

    case 'trapezio_area':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <polygon points="45,85 155,85 130,35 70,35" stroke="#00f0ff" strokeWidth="2.5" fill="#00f0ff" fillOpacity="0.1" />
          <line x1="70" y1="35" x2="70" y2="85" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="100" y="28" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">b = 6</text>
          <text x="100" y="98" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">B = 10</text>
          <text x="60" y="60" fontSize="9" fontWeight="bold" fill="#f43f5e">h = 4</text>
          <text x="100" y="114" fontSize="9" fill="#38bdf8" textAnchor="middle">💡 Dica: Área = [(B + b) · h] / 2 = ?</text>
        </svg>
      );

    case 'quadrilatero_angulos':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <polygon points="40,85 160,80 140,30 65,40" stroke="#00f0ff" strokeWidth="2.5" fill="#00f0ff" fillOpacity="0.08" />
          <text x="55" y="78" fontSize="9" fill="#ffbc00">Â</text>
          <text x="145" y="74" fontSize="9" fill="#ffbc00">B̂</text>
          <text x="128" y="44" fontSize="9" fill="#ffbc00">Ĉ</text>
          <text x="75" y="52" fontSize="9" fill="#ffbc00">D̂</text>
          <text x="100" y="112" fontSize="9" fontWeight="bold" fill="#34d399" textAnchor="middle">Soma dos Ângulos de Quadrilátero = 360°</text>
        </svg>
      );

    case 'desigualdade_triangular':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <line x1="30" y1="85" x2="170" y2="85" stroke="#38bdf8" strokeWidth="3" />
          <line x1="30" y1="85" x2="90" y2="35" stroke="#00f0ff" strokeWidth="2.5" />
          <line x1="170" y1="85" x2="90" y2="35" stroke="#ffbc00" strokeWidth="2.5" />
          <text x="100" y="98" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">a = 10</text>
          <text x="50" y="55" fontSize="10" fontWeight="bold" fill="#00f0ff">b = 6</text>
          <text x="140" y="55" fontSize="10" fontWeight="bold" fill="#ffbc00">c = 8</text>
          <text x="100" y="114" fontSize="9" fill="#94a3b8" textAnchor="middle">Condição de Existência: a &lt; b + c (10 &lt; 6 + 8)</text>
        </svg>
      );

    case 'plano_cartesiano_ponto':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <line x1="25" y1="70" x2="175" y2="70" stroke="#475569" strokeWidth="1.5" />
          <line x1="100" y1="15" x2="100" y2="105" stroke="#475569" strokeWidth="1.5" />
          <text x="180" y="74" fontSize="10" fill="#94a3b8" fontWeight="bold">x</text>
          <text x="105" y="18" fontSize="10" fill="#94a3b8" fontWeight="bold">y</text>
          <line x1="140" y1="70" x2="140" y2="35" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="100" y1="35" x2="140" y2="35" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="140" cy="35" r="4.5" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
          <text x="146" y="30" fontSize="10" fontWeight="bold" fill="#f43f5e">P(3, 4)</text>
          <text x="100" y="114" fontSize="9" fill="#94a3b8" textAnchor="middle">1º Quadrante: (+, +)</text>
        </svg>
      );

    case 'losango_diagonais':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <polygon points="100,20 155,60 100,100 45,60" stroke="#00f0ff" strokeWidth="2.5" fill="#00f0ff" fillOpacity="0.1" />
          <line x1="100" y1="20" x2="100" y2="100" stroke="#ffbc00" strokeWidth="2" strokeDasharray="3 2" />
          <line x1="45" y1="60" x2="155" y2="60" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />
          <circle cx="100" cy="60" r="2.5" fill="#ffffff" />
          <text x="108" y="45" fontSize="9" fontWeight="bold" fill="#ffbc00">D = 8</text>
          <text x="70" y="55" fontSize="9" fontWeight="bold" fill="#38bdf8">d = 6</text>
          <text x="100" y="114" fontSize="9" fill="#38bdf8" textAnchor="middle">💡 Dica: Área = (D × d) / 2 = ?</text>
        </svg>
      );

    case 'paralelogramo_area':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <polygon points="40,85 140,85 165,35 65,35" stroke="#00f0ff" strokeWidth="2.5" fill="#00f0ff" fillOpacity="0.1" />
          <line x1="65" y1="35" x2="65" y2="85" stroke="#ffbc00" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="90" y="100" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">Base (b) = 8</text>
          <text x="55" y="60" fontSize="9" fontWeight="bold" fill="#ffbc00">h = 4</text>
          <text x="100" y="114" fontSize="9" fill="#38bdf8" textAnchor="middle">💡 Dica: Área = Base × Altura = ?</text>
        </svg>
      );

    case 'escala_mapa':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          {/* Compass and map segment */}
          <rect x="30" y="35" width="140" height="35" stroke="#38bdf8" strokeWidth="1.5" fill="#0f172a" rx="4" />
          <line x1="45" y1="52" x2="155" y2="52" stroke="#ffbc00" strokeWidth="3" />
          <circle cx="45" cy="52" r="4" fill="#00f0ff" />
          <circle cx="155" cy="52" r="4" fill="#00f0ff" />
          <text x="100" y="46" fontSize="10" fontWeight="bold" fill="#ffbc00" textAnchor="middle">Distância no Mapa: 5 cm</text>
          <text x="100" y="90" fontSize="11" fontWeight="bold" fill="#34d399" textAnchor="middle">Escala 1 : 100.000 ➔ 5 km Real</text>
          <text x="100" y="112" fontSize="9" fill="#94a3b8" textAnchor="middle">1 cm no mapa = 100.000 cm = 1 km real</text>
        </svg>
      );

    case 'retas_transversal':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <line x1="25" y1="40" x2="175" y2="40" stroke="#00f0ff" strokeWidth="2" />
          <line x1="25" y1="80" x2="175" y2="80" stroke="#00f0ff" strokeWidth="2" />
          <line x1="50" y1="95" x2="150" y2="25" stroke="#ffbc00" strokeWidth="2.5" />
          <text x="180" y="44" fontSize="10" fill="#00f0ff">r</text>
          <text x="180" y="84" fontSize="10" fill="#00f0ff">s</text>
          <text x="152" y="24" fontSize="10" fill="#ffbc00">t</text>
          <text x="100" y="48" fontSize="10" fontWeight="bold" fill="#f43f5e">α</text>
          <text x="100" y="88" fontSize="10" fontWeight="bold" fill="#f43f5e">α (alternos)</text>
          <text x="100" y="112" fontSize="9" fill="#94a3b8" textAnchor="middle">r // s cortadas por t: Ângulos Alternos Internos Iguais</text>
        </svg>
      );

    case 'triangulo_obtusangulo':
    case 'triangulo_obtuso':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <polygon points="30,85 170,85 80,45" stroke="#00f0ff" strokeWidth="2.5" fill="#00f0ff" fillOpacity="0.1" />
          <path d="M 60,75 A 25,25 0 0,0 75,85" stroke="#f43f5e" strokeWidth="2" fill="none" />
          <text x="80" y="75" fontSize="10" fontWeight="bold" fill="#f43f5e">&gt; 90°</text>
          <text x="100" y="112" fontSize="9" fill="#94a3b8" textAnchor="middle">Triângulo Obtusângulo: Possui 1 ângulo obtuso (&gt; 90°)</text>
        </svg>
      );

    // ----------------------------------------------------
    // 8º ANO DO ENSINO FUNDAMENTAL & CÍRCULO / TALES
    // ----------------------------------------------------
    case 'teorema_tales':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <line x1="25" y1="28" x2="175" y2="28" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 2" />
          <line x1="25" y1="60" x2="175" y2="60" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 2" />
          <line x1="25" y1="92" x2="175" y2="92" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 2" />
          <line x1="45" y1="18" x2="75" y2="102" stroke="#00f0ff" strokeWidth="2.5" />
          <line x1="155" y1="18" x2="125" y2="102" stroke="#ffbc00" strokeWidth="2.5" />
          <text x="40" y="47" fontSize="10" fontWeight="bold" fill="#00f0ff">3</text>
          <text x="52" y="78" fontSize="10" fontWeight="bold" fill="#00f0ff">6</text>
          <text x="150" y="47" fontSize="10" fontWeight="bold" fill="#ffbc00">4</text>
          <text x="140" y="78" fontSize="10" fontWeight="bold" fill="#f43f5e">x = ?</text>
          <text x="100" y="112" fontSize="9" fill="#94a3b8" textAnchor="middle">Tales: 3 / 6 = 4 / x ➔ Multiplique cruzado: x = ?</text>
        </svg>
      );

    case 'circulo_comprimento':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <circle cx="100" cy="55" r="36" stroke="#00f0ff" strokeWidth="2.5" fill="#00f0ff" fillOpacity="0.08" />
          <circle cx="100" cy="55" r="3" fill="#ffbc00" />
          <line x1="100" y1="55" x2="136" y2="55" stroke="#ffbc00" strokeWidth="2" />
          <text x="116" y="50" fontSize="10" fontWeight="bold" fill="#ffbc00">r = 5 cm</text>
          <text x="100" y="110" fontSize="9" fontWeight="bold" fill="#34d399" textAnchor="middle">Comprimento C = 2 · π · r = ? cm</text>
        </svg>
      );

    case 'circulo_area_pi':
    case 'circulo_raio_diametro':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <circle cx="100" cy="55" r="36" stroke="#10b981" strokeWidth="2.5" fill="#10b981" fillOpacity="0.12" />
          <circle cx="100" cy="55" r="3" fill="#ffbc00" />
          <line x1="64" y1="55" x2="136" y2="55" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="100" y1="55" x2="136" y2="55" stroke="#ffbc00" strokeWidth="2.2" />
          <text x="118" y="50" fontSize="10" fontWeight="bold" fill="#ffbc00">r = 3</text>
          <text x="80" y="50" fontSize="9" fill="#38bdf8">D = 2r = 6</text>
          <text x="100" y="112" fontSize="9" fill="#34d399" textAnchor="middle">Área = π · r² = 3,14 · 3² = ?</text>
        </svg>
      );

    case 'coroa_circular':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <circle cx="100" cy="55" r="38" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.2" />
          <circle cx="100" cy="55" r="22" stroke="#ffbc00" strokeWidth="2" fill="#070c1a" />
          <line x1="100" y1="55" x2="122" y2="55" stroke="#ffbc00" strokeWidth="1.5" />
          <line x1="100" y1="55" x2="138" y2="55" stroke="#00f0ff" strokeWidth="1.5" />
          <text x="111" y="50" fontSize="8" fill="#ffbc00">r=3</text>
          <text x="130" y="50" fontSize="8" fill="#00f0ff">R=5</text>
          <text x="100" y="112" fontSize="9" fill="#34d399" textAnchor="middle">Área Coroa = π · (R² - r²) = π · (5² - 3²) = ?</text>
        </svg>
      );

    case 'setor_circular':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <circle cx="100" cy="58" r="36" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 100,58 L 136,58 A 36,36 0 0,0 118,27 Z" fill="#00f0ff" fillOpacity="0.25" stroke="#00f0ff" strokeWidth="2" />
          <circle cx="100" cy="58" r="2.5" fill="#ffbc00" />
          <text x="114" y="52" fontSize="9" fontWeight="bold" fill="#ffbc00">60°</text>
          <text x="100" y="112" fontSize="9" fill="#34d399" textAnchor="middle">Área Setor = (60° / 360°) · π · r² = ⅙ · π · r²</text>
        </svg>
      );

    case 'pentagono_angulos':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <polygon points="100,24 140,52 125,92 75,92 60,52" stroke="#00f0ff" strokeWidth="2.5" fill="#00f0ff" fillOpacity="0.1" />
          <text x="100" y="42" fontSize="9" fill="#ffbc00" textAnchor="middle">108°</text>
          <text x="100" y="112" fontSize="9" fill="#34d399" textAnchor="middle">Soma dos Ângulos = (n - 2) · 180° = 3 · 180° = 540°</text>
        </svg>
      );

    case 'hexagono_angulo_interno':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <polygon points="70,28 130,28 160,58 130,88 70,88 40,58" stroke="#38bdf8" strokeWidth="2.5" fill="#38bdf8" fillOpacity="0.1" />
          <text x="100" y="40" fontSize="10" fontWeight="bold" fill="#ffbc00" textAnchor="middle">Ângulo Interno = ?</text>
          <text x="100" y="112" fontSize="9" fill="#94a3b8" textAnchor="middle">💡 Dica: Si = (6 - 2) · 180° = 720° ➔ Divida pelos 6 ângulos: ?</text>
        </svg>
      );

    case 'bissetriz_angulo':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <line x1="40" y1="85" x2="160" y2="85" stroke="#38bdf8" strokeWidth="2.5" />
          <line x1="40" y1="85" x2="135" y2="25" stroke="#38bdf8" strokeWidth="2.5" />
          <line x1="40" y1="85" x2="155" y2="50" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 2" />
          <circle cx="40" cy="85" r="3" fill="#ffffff" />
          <text x="80" y="80" fontSize="9" fontWeight="bold" fill="#ffbc00">30°</text>
          <text x="80" y="60" fontSize="9" fontWeight="bold" fill="#ffbc00">30°</text>
          <text x="160" y="52" fontSize="9" fontWeight="bold" fill="#f43f5e">Bissetriz</text>
          <text x="100" y="112" fontSize="9" fill="#94a3b8" textAnchor="middle">Bissetriz divide o ângulo em duas partes iguais (60° ➔ 30° + 30°)</text>
        </svg>
      );

    case 'mediatriz_segmento':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <line x1="40" y1="65" x2="160" y2="65" stroke="#00f0ff" strokeWidth="3" />
          <line x1="100" y1="18" x2="100" y2="102" stroke="#ffbc00" strokeWidth="2" />
          <circle cx="40" cy="65" r="4" fill="#00f0ff" />
          <circle cx="160" cy="65" r="4" fill="#00f0ff" />
          <circle cx="100" cy="65" r="3.5" fill="#f43f5e" />
          <rect x="100" y="55" width="10" height="10" stroke="#ffbc00" strokeWidth="1" fill="none" />
          <text x="35" y="78" fontSize="10" fontWeight="bold" fill="#00f0ff">A</text>
          <text x="160" y="78" fontSize="10" fontWeight="bold" fill="#00f0ff">B</text>
          <text x="105" y="80" fontSize="9" fill="#f43f5e">M (ponto médio)</text>
          <text x="100" y="114" fontSize="9" fill="#94a3b8" textAnchor="middle">Mediatriz: Reta perpendicular que passa no meio de AB</text>
        </svg>
      );

    case 'quadrado_soma_geometrico':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <rect x="55" y="20" width="55" height="55" stroke="#00f0ff" strokeWidth="1.5" fill="#00f0ff" fillOpacity="0.2" />
          <rect x="110" y="20" width="30" height="55" stroke="#38bdf8" strokeWidth="1.5" fill="#38bdf8" fillOpacity="0.15" />
          <rect x="55" y="75" width="55" height="30" stroke="#38bdf8" strokeWidth="1.5" fill="#38bdf8" fillOpacity="0.15" />
          <rect x="110" y="75" width="30" height="30" stroke="#ffbc00" strokeWidth="1.5" fill="#ffbc00" fillOpacity="0.25" />
          <text x="82" y="52" fontSize="11" fontWeight="bold" fill="#00f0ff" textAnchor="middle">a²</text>
          <text x="125" y="52" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">a·b</text>
          <text x="82" y="94" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">a·b</text>
          <text x="125" y="94" fontSize="11" fontWeight="bold" fill="#ffbc00" textAnchor="middle">b²</text>
          <text x="100" y="114" fontSize="9" fontWeight="bold" fill="#34d399" textAnchor="middle">(a + b)² = a² + 2ab + b²</text>
        </svg>
      );

    case 'triangulos_congruentes':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <polygon points="30,85 75,85 50,35" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.12" />
          <polygon points="115,85 160,85 135,35" stroke="#10b981" strokeWidth="2" fill="#10b981" fillOpacity="0.12" />
          <text x="52" y="98" fontSize="9" fill="#00f0ff" textAnchor="middle">Δ ABC</text>
          <text x="137" y="98" fontSize="9" fill="#10b981" textAnchor="middle">Δ DEF</text>
          <text x="100" y="60" fontSize="13" fontWeight="bold" fill="#ffbc00" textAnchor="middle">≅</text>
          <text x="100" y="112" fontSize="9" fill="#94a3b8" textAnchor="middle">Critérios de Congruência: LAL, LLL, ALA</text>
        </svg>
      );

    case 'poligono_diagonais':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <polygon points="100,22 145,55 128,95 72,95 55,55" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.05" />
          <line x1="100" y1="22" x2="128" y2="95" stroke="#ffbc00" strokeWidth="1.5" />
          <line x1="100" y1="22" x2="72" y2="95" stroke="#ffbc00" strokeWidth="1.5" />
          <line x1="145" y1="55" x2="72" y2="95" stroke="#ffbc00" strokeWidth="1.5" />
          <line x1="145" y1="55" x2="55" y2="55" stroke="#ffbc00" strokeWidth="1.5" />
          <line x1="128" y1="95" x2="55" y2="55" stroke="#ffbc00" strokeWidth="1.5" />
          <text x="100" y="112" fontSize="9" fontWeight="bold" fill="#34d399" textAnchor="middle">Diagonais d = [n · (n - 3)] ÷ 2 = ?</text>
        </svg>
      );

    case 'angulo_externo_triangulo':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <polygon points="35,85 130,85 85,30" stroke="#00f0ff" strokeWidth="2.5" fill="#00f0ff" fillOpacity="0.1" />
          <line x1="130" y1="85" x2="175" y2="85" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />
          <text x="50" y="80" fontSize="9" fontWeight="bold" fill="#00f0ff">α</text>
          <text x="85" y="48" fontSize="9" fontWeight="bold" fill="#00f0ff">β</text>
          <path d="M 140,85 A 15,15 0 0,0 125,68" stroke="#f43f5e" strokeWidth="2" fill="none" />
          <text x="145" y="75" fontSize="10" fontWeight="bold" fill="#f43f5e">θ_ext</text>
          <text x="100" y="112" fontSize="9" fill="#94a3b8" textAnchor="middle">Teorema do Ângulo Externo: θ_ext = α + β</text>
        </svg>
      );

    case 'reta_secante_tangente':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <circle cx="95" cy="60" r="32" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.08" />
          {/* Tangent line */}
          <line x1="127" y1="15" x2="127" y2="105" stroke="#10b981" strokeWidth="2.5" />
          <circle cx="127" cy="60" r="3" fill="#ffbc00" />
          <line x1="95" y1="60" x2="127" y2="60" stroke="#ffbc00" strokeWidth="1.5" strokeDasharray="2 2" />
          <rect x="119" y="52" width="8" height="8" stroke="#ffbc00" strokeWidth="1" fill="none" />
          {/* Secant line */}
          <line x1="35" y1="35" x2="165" y2="75" stroke="#38bdf8" strokeWidth="1.8" />
          <text x="135" y="25" fontSize="9" fontWeight="bold" fill="#10b981">Tangente (90° ao raio)</text>
          <text x="45" y="28" fontSize="9" fill="#38bdf8">Secante (2 pontos)</text>
          <text x="100" y="114" fontSize="9" fill="#94a3b8" textAnchor="middle">Reta Tangente toca a circunferência em 1 ponto</text>
        </svg>
      );

    // ----------------------------------------------------
    // 9º ANO DO ENSINO FUNDAMENTAL & PITÁGORAS / MÉTRICAS
    // ----------------------------------------------------
    case 'pitagoras_3_4_5':
    case 'triangulo_3_4_5':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <path d="M 40,92 L 150,92 L 150,28 Z" stroke="#00f0ff" strokeWidth="2.5" fill="#00f0ff" fillOpacity="0.12" />
          <rect x="136" y="78" width="14" height="14" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
          <circle cx="143" cy="85" r="2" fill="#00f0ff" />
          <text x="95" y="106" fontSize="11" fontWeight="bold" fill="#38bdf8" textAnchor="middle">b = 4</text>
          <text x="162" y="62" fontSize="11" fontWeight="bold" fill="#38bdf8">a = 3</text>
          <text x="82" y="50" fontSize="12" fontWeight="bold" fill="#ffbc00">c = ? (Hipotenusa)</text>
          <text x="100" y="114" fontSize="9" fill="#34d399" textAnchor="middle">💡 Dica: c² = a² + b² = 3² + 4² ➔ c = ?</text>
        </svg>
      );

    case 'triangulo_6_8_10':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <path d="M 40,92 L 150,92 L 150,28 Z" stroke="#ffbc00" strokeWidth="2.5" fill="#ffbc00" fillOpacity="0.12" />
          <rect x="136" y="78" width="14" height="14" stroke="#ffbc00" strokeWidth="1.5" fill="none" />
          <text x="95" y="106" fontSize="11" fontWeight="bold" fill="#ffbc00" textAnchor="middle">b = 8</text>
          <text x="162" y="62" fontSize="11" fontWeight="bold" fill="#ffbc00">a = 6</text>
          <text x="82" y="50" fontSize="12" fontWeight="bold" fill="#34d399">c = ?</text>
          <text x="100" y="114" fontSize="9" fill="#94a3b8" textAnchor="middle">💡 Dica: c² = 6² + 8² ➔ Hipotenusa c = ?</text>
        </svg>
      );

    case 'triangulo_seno':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <path d="M 30,95 L 160,95 L 160,25 Z" stroke="#00f0ff" strokeWidth="2.5" fill="#00f0ff" fillOpacity="0.1" />
          <rect x="145" y="80" width="15" height="15" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
          <circle cx="152" cy="88" r="2" fill="#00f0ff" />
          <text x="95" y="108" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">Cateto Adjacente</text>
          <text x="165" y="65" fontSize="10" fontWeight="bold" fill="#38bdf8">Cat. Oposto</text>
          <text x="70" y="50" fontSize="11" fontWeight="bold" fill="#ffbc00">Hipotenusa</text>
          <path d="M 50,95 A 20,20 0 0,0 45,85" stroke="#ffbc00" strokeWidth="2" fill="none" />
          <text x="55" y="90" fontSize="10" fontWeight="bold" fill="#ffbc00">θ</text>
          <text x="100" y="114" fontSize="9" fontWeight="bold" fill="#34d399" textAnchor="middle">sen(θ) = Cateto Oposto / Hipotenusa</text>
        </svg>
      );

    case 'triangulo_cosseno':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <path d="M 30,95 L 160,95 L 160,25 Z" stroke="#38bdf8" strokeWidth="2.5" fill="#38bdf8" fillOpacity="0.1" />
          <rect x="145" y="80" width="15" height="15" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
          <text x="95" y="108" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">Cateto Adjacente (CA)</text>
          <text x="165" y="65" fontSize="10" fontWeight="bold" fill="#64748b">Cat. Oposto</text>
          <text x="70" y="50" fontSize="11" fontWeight="bold" fill="#ffbc00">Hipotenusa (H)</text>
          <text x="55" y="90" fontSize="10" fontWeight="bold" fill="#ffbc00">θ</text>
          <text x="100" y="114" fontSize="9" fontWeight="bold" fill="#34d399" textAnchor="middle">cos(θ) = Cateto Adjacente / Hipotenusa</text>
        </svg>
      );

    case 'triangulo_tangente':
    case 'tangente_divisao':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <path d="M 25,95 L 160,95 L 160,25 Z" stroke="#38bdf8" strokeWidth="2.5" fill="#38bdf8" fillOpacity="0.1" />
          <text x="90" y="108" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">Cateto Adjacente (CA)</text>
          <text x="165" y="65" fontSize="10" fontWeight="bold" fill="#00f0ff">Cateto Oposto (CO)</text>
          <text x="70" y="45" fontSize="9" fill="#64748b">Hipotenusa</text>
          <text x="100" y="114" fontSize="9" fontWeight="bold" fill="#34d399" textAnchor="middle">tg(θ) = CO / CA = sen(θ) / cos(θ)</text>
        </svg>
      );

    case 'triangulo_x_20':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <path d="M 30,95 L 160,95 L 160,25 Z" stroke="#00f0ff" strokeWidth="2.5" fill="#00f0ff" fillOpacity="0.1" />
          <rect x="145" y="80" width="15" height="15" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
          <text x="165" y="65" fontSize="12" fontWeight="bold" fill="#f43f5e">x = ?</text>
          <text x="75" y="50" fontSize="12" fontWeight="bold" fill="#ffbc00">20 cm</text>
          <text x="50" y="90" fontSize="11" fontWeight="bold" fill="#38bdf8">30°</text>
          <text x="100" y="114" fontSize="9" fill="#94a3b8" textAnchor="middle">💡 Dica: sen(30°) = x / 20 ➔ Calcule o valor de x</text>
        </svg>
      );

    case 'triangulo_calculo_5_10':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <path d="M 30,95 L 160,95 L 160,25 Z" stroke="#00f0ff" strokeWidth="2.5" fill="#00f0ff" fillOpacity="0.1" />
          <rect x="145" y="80" width="15" height="15" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
          <text x="165" y="65" fontSize="12" fontWeight="bold" fill="#38bdf8">5 cm</text>
          <text x="75" y="50" fontSize="12" fontWeight="bold" fill="#ffbc00">10 cm</text>
          <text x="50" y="90" fontSize="11" fontWeight="bold" fill="#ffffff">α = ?</text>
          <text x="100" y="114" fontSize="9" fill="#34d399" textAnchor="middle">💡 Dica: sen(α) = 5 / 10 = 0,5 ➔ Descubra o ângulo α</text>
        </svg>
      );

    case 'predio_30m':
    case 'torre_sombra_45':
    case 'triangulo_45':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <rect x="140" y="22" width="28" height="73" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" rx="3" />
          <path d="M 25,95 L 140,95 L 140,22 Z" stroke="#ffbc00" strokeWidth="2.5" strokeDasharray="4 4" />
          <text x="82" y="108" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">Distância = 30 m</text>
          <text x="175" y="60" fontSize="11" fontWeight="bold" fill="#ffbc00">h = ?</text>
          <text x="45" y="90" fontSize="11" fontWeight="bold" fill="#00f0ff">45°</text>
          <text x="100" y="114" fontSize="9" fill="#94a3b8" textAnchor="middle">💡 Dica: tg(45°) = h / d ➔ Determine a altura h</text>
        </svg>
      );

    case 'tangente_60':
    case 'angulo_60':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <path d="M 35,95 L 145,95 L 145,20 Z" stroke="#ffbc00" strokeWidth="2.5" fill="#ffbc00" fillOpacity="0.1" />
          <text x="55" y="90" fontSize="11" fontWeight="bold" fill="#00f0ff">60°</text>
          <text x="90" y="108" fontSize="10" fill="#38bdf8" textAnchor="middle">d = 10 m</text>
          <text x="150" y="55" fontSize="11" fontWeight="bold" fill="#f43f5e">h = ?</text>
          <text x="100" y="114" fontSize="9" fill="#94a3b8" textAnchor="middle">💡 Dica: tg(60°) = h / d = √3 ➔ Calcule h</text>
        </svg>
      );

    case 'angulo_30':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <circle cx="100" cy="60" r="42" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.05" />
          <line x1="50" y1="60" x2="150" y2="60" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="100" y1="15" x2="100" y2="105" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="100" y1="60" x2="136" y2="39" stroke="#ffbc00" strokeWidth="2.5" />
          <text x="110" y="54" fontSize="11" fontWeight="bold" fill="#ffbc00">30°</text>
          <text x="100" y="114" fontSize="9" fill="#34d399" textAnchor="middle">sen(30°) = ½ = 0,5 | cos(30°) = √3 / 2</text>
        </svg>
      );

    case 'triangulos_semelhantes_sombra':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          {/* Post and shadow */}
          <line x1="75" y1="35" x2="75" y2="95" stroke="#38bdf8" strokeWidth="3" />
          <line x1="25" y1="95" x2="75" y2="95" stroke="#ffbc00" strokeWidth="2.5" />
          <line x1="25" y1="95" x2="75" y2="35" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 2" />
          {/* Person and shadow */}
          <line x1="150" y1="65" x2="150" y2="95" stroke="#10b981" strokeWidth="2" />
          <line x1="130" y1="95" x2="150" y2="95" stroke="#ffbc00" strokeWidth="2" />
          <line x1="130" y1="95" x2="150" y2="65" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="75" y="28" fontSize="9" fontWeight="bold" fill="#38bdf8" textAnchor="middle">Poste (H)</text>
          <text x="150" y="58" fontSize="9" fontWeight="bold" fill="#10b981" textAnchor="middle">Pessoa (h)</text>
          <text x="100" y="112" fontSize="9" fontWeight="bold" fill="#34d399" textAnchor="middle">H / h = Sombra_Poste / Sombra_Pessoa</text>
        </svg>
      );

    case 'relacoes_metricas_altura':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <polygon points="30,90 170,90 85,30" stroke="#00f0ff" strokeWidth="2.5" fill="#00f0ff" fillOpacity="0.08" />
          <line x1="85" y1="30" x2="85" y2="90" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 2" />
          <rect x="85" y="80" width="10" height="10" stroke="#f43f5e" strokeWidth="1" fill="none" />
          <text x="55" y="102" fontSize="9" fontWeight="bold" fill="#38bdf8">m</text>
          <text x="125" y="102" fontSize="9" fontWeight="bold" fill="#38bdf8">n</text>
          <text x="92" y="60" fontSize="10" fontWeight="bold" fill="#f43f5e">h</text>
          <text x="100" y="114" fontSize="9" fontWeight="bold" fill="#ffbc00" textAnchor="middle">h² = m · n  e  a · h = b · c</text>
        </svg>
      );

    case 'relacao_cateto_projecao':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <polygon points="30,90 170,90 85,30" stroke="#00f0ff" strokeWidth="2.5" fill="#00f0ff" fillOpacity="0.08" />
          <line x1="85" y1="30" x2="85" y2="90" stroke="#64748b" strokeWidth="1.5" strokeDasharray="2 2" />
          <text x="50" y="55" fontSize="10" fontWeight="bold" fill="#ffbc00">c</text>
          <text x="135" y="55" fontSize="10" fontWeight="bold" fill="#ffbc00">b</text>
          <text x="55" y="102" fontSize="9" fontWeight="bold" fill="#38bdf8">m</text>
          <text x="100" y="114" fontSize="9" fontWeight="bold" fill="#34d399" textAnchor="middle">b² = a · n  e  c² = a · m</text>
        </svg>
      );

    case 'quadrado_diagonal':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <rect x="65" y="25" width="70" height="70" stroke="#00f0ff" strokeWidth="2.5" fill="#00f0ff" fillOpacity="0.1" />
          <line x1="65" y1="95" x2="135" y2="25" stroke="#ffbc00" strokeWidth="2.5" />
          <text x="100" y="108" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">Lado = L</text>
          <text x="52" y="60" fontSize="10" fontWeight="bold" fill="#38bdf8">L</text>
          <text x="106" y="55" fontSize="11" fontWeight="bold" fill="#ffbc00">d = L · √2</text>
          <text x="100" y="114" fontSize="9" fill="#94a3b8" textAnchor="middle">Diagonal do Quadrado de Lado L</text>
        </svg>
      );

    case 'semelhanca_k2':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <polygon points="35,85 75,85 35,45" stroke="#10b981" strokeWidth="2" fill="#10b981" fillOpacity="0.15" />
          <polygon points="105,85 175,85 105,15" stroke="#34d399" strokeWidth="2.5" fill="#34d399" fillOpacity="0.2" />
          <text x="55" y="98" fontSize="9" fill="#10b981" textAnchor="middle">Lado: L (Área A)</text>
          <text x="140" y="98" fontSize="9" fill="#34d399" textAnchor="middle">Lado: 2L (Área 4A)</text>
          <text x="100" y="114" fontSize="9" fontWeight="bold" fill="#ffbc00" textAnchor="middle">Razão linear k ➔ Razão de Áreas k²</text>
        </svg>
      );

    // ----------------------------------------------------
    // 1º ANO DO ENSINO MÉDIO & TRIGONOMETRIA NO CICLO
    // ----------------------------------------------------
    case 'funcao_afim_reta':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <line x1="20" y1="85" x2="180" y2="85" stroke="#475569" strokeWidth="1.5" />
          <line x1="70" y1="15" x2="70" y2="105" stroke="#475569" strokeWidth="1.5" />
          <line x1="35" y1="100" x2="155" y2="25" stroke="#00f0ff" strokeWidth="2.5" />
          <circle cx="70" cy="65" r="4" fill="#ffbc00" />
          <text x="80" y="65" fontSize="9" fontWeight="bold" fill="#ffbc00">(0, b)</text>
          <text x="135" y="38" fontSize="10" fontWeight="bold" fill="#00f0ff">f(x) = ax + b</text>
          <text x="100" y="112" fontSize="9" fill="#94a3b8" textAnchor="middle">Reta crescente (a &gt; 0) | Coeficiente Linear b</text>
        </svg>
      );

    case 'parabola_vertice':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <line x1="20" y1="80" x2="180" y2="80" stroke="#475569" strokeWidth="1.5" />
          <line x1="100" y1="15" x2="100" y2="105" stroke="#475569" strokeWidth="1.5" />
          <path d="M 40,30 Q 100,105 160,30" stroke="#00f0ff" strokeWidth="2.5" fill="none" />
          <circle cx="100" cy="86" r="4" fill="#f43f5e" />
          <text x="100" y="100" fontSize="9" fontWeight="bold" fill="#f43f5e" textAnchor="middle">V(xv, yv)</text>
          <text x="145" y="35" fontSize="9" fontWeight="bold" fill="#00f0ff">y = ax² + bx + c</text>
          <text x="100" y="114" fontSize="9" fill="#ffbc00" textAnchor="middle">xv = -b / (2a)  |  yv = -Δ / (4a)</text>
        </svg>
      );

    case 'graus_radianos':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <circle cx="100" cy="58" r="38" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.05" />
          <line x1="62" y1="58" x2="138" y2="58" stroke="#475569" strokeWidth="1.5" />
          <line x1="100" y1="20" x2="100" y2="96" stroke="#475569" strokeWidth="1.5" />
          <text x="142" y="61" fontSize="9" fontWeight="bold" fill="#38bdf8">0 / 2π rad (360°)</text>
          <text x="100" y="15" fontSize="9" fontWeight="bold" fill="#38bdf8" textAnchor="middle">π/2 rad (90°)</text>
          <text x="56" y="61" fontSize="9" fontWeight="bold" fill="#38bdf8" textAnchor="end">π rad (180°)</text>
          <text x="100" y="108" fontSize="9" fontWeight="bold" fill="#38bdf8" textAnchor="middle">3π/2 rad (270°)</text>
        </svg>
      );

    case 'ciclo_eixos_sen_cos':
    case 'circunferencia_trig':
    case 'circulo_trig':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <circle cx="100" cy="58" r="38" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.05" />
          <line x1="50" y1="58" x2="150" y2="58" stroke="#ffbc00" strokeWidth="2" />
          <line x1="100" y1="12" x2="100" y2="104" stroke="#38bdf8" strokeWidth="2" />
          <text x="155" y="62" fontSize="9" fontWeight="bold" fill="#ffbc00">cos (x)</text>
          <text x="100" y="10" fontSize="9" fontWeight="bold" fill="#38bdf8" textAnchor="middle">sen (y)</text>
          <circle cx="127" cy="31" r="3.5" fill="#f43f5e" />
          <line x1="100" y1="58" x2="127" y2="31" stroke="#f43f5e" strokeWidth="1.5" />
          <text x="100" y="114" fontSize="9" fill="#94a3b8" textAnchor="middle">Círculo Trigonométrico de Raio R = 1</text>
        </svg>
      );

    case 'relacao_fundamental':
    case 'circulo_identidade':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <circle cx="100" cy="58" r="38" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.05" />
          <polygon points="100,58 126,58 126,31" stroke="#f43f5e" strokeWidth="1.5" fill="#f43f5e" fillOpacity="0.2" />
          <line x1="100" y1="58" x2="126" y2="31" stroke="#ffbc00" strokeWidth="2" />
          <text x="113" y="68" fontSize="8" fill="#ffbc00">cos(x)</text>
          <text x="130" y="46" fontSize="8" fill="#38bdf8">sen(x)</text>
          <text x="100" y="112" fontSize="10" fontWeight="bold" fill="#34d399" textAnchor="middle">sen²(x) + cos²(x) = 1</text>
        </svg>
      );

    case 'pa_segmentos':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <line x1="25" y1="60" x2="175" y2="60" stroke="#475569" strokeWidth="2" />
          <circle cx="45" cy="60" r="4" fill="#00f0ff" />
          <circle cx="85" cy="60" r="4" fill="#00f0ff" />
          <circle cx="125" cy="60" r="4" fill="#00f0ff" />
          <circle cx="165" cy="60" r="4" fill="#00f0ff" />
          <text x="65" y="50" fontSize="9" fontWeight="bold" fill="#ffbc00" textAnchor="middle">+r</text>
          <text x="105" y="50" fontSize="9" fontWeight="bold" fill="#ffbc00" textAnchor="middle">+r</text>
          <text x="145" y="50" fontSize="9" fontWeight="bold" fill="#ffbc00" textAnchor="middle">+r</text>
          <text x="45" y="78" fontSize="9" fill="#38bdf8" textAnchor="middle">a₁</text>
          <text x="85" y="78" fontSize="9" fill="#38bdf8" textAnchor="middle">a₂</text>
          <text x="125" y="78" fontSize="9" fill="#38bdf8" textAnchor="middle">a₃</text>
          <text x="165" y="78" fontSize="9" fill="#38bdf8" textAnchor="middle">a₄</text>
          <text x="100" y="112" fontSize="9" fill="#94a3b8" textAnchor="middle">Progressão Aritmética: Termo Geral an = a₁ + (n - 1)r</text>
        </svg>
      );

    case 'quadrantes_sinais':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <line x1="40" y1="58" x2="160" y2="58" stroke="#475569" strokeWidth="1.5" />
          <line x1="100" y1="15" x2="100" y2="101" stroke="#475569" strokeWidth="1.5" />
          <text x="130" y="38" fontSize="9" fontWeight="bold" fill="#10b981">1ºQ: (+, +)</text>
          <text x="70" y="38" fontSize="9" fontWeight="bold" fill="#38bdf8" textAnchor="end">2ºQ: (-, +)</text>
          <text x="70" y="80" fontSize="9" fontWeight="bold" fill="#f43f5e" textAnchor="end">3ºQ: (-, -)</text>
          <text x="130" y="80" fontSize="9" fontWeight="bold" fill="#ffbc00">4ºQ: (+, -)</text>
          <text x="100" y="114" fontSize="9" fill="#94a3b8" textAnchor="middle">Sinais de (cosseno, seno) nos 4 Quadrantes</text>
        </svg>
      );

    case 'distancia_dois_pontos':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <line x1="30" y1="85" x2="170" y2="85" stroke="#475569" strokeWidth="1.5" />
          <line x1="60" y1="15" x2="60" y2="105" stroke="#475569" strokeWidth="1.5" />
          <line x1="60" y1="85" x2="140" y2="85" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="140" y1="85" x2="140" y2="35" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="60" y1="85" x2="140" y2="35" stroke="#ffbc00" strokeWidth="2.5" />
          <circle cx="60" cy="85" r="4" fill="#00f0ff" />
          <circle cx="140" cy="35" r="4" fill="#00f0ff" />
          <text x="45" y="85" fontSize="9" fontWeight="bold" fill="#00f0ff">A</text>
          <text x="146" y="35" fontSize="9" fontWeight="bold" fill="#00f0ff">B</text>
          <text x="100" y="55" fontSize="10" fontWeight="bold" fill="#ffbc00">d(A, B)</text>
          <text x="100" y="112" fontSize="9" fontWeight="bold" fill="#34d399" textAnchor="middle">d = √[(x₂ - x₁)² + (y₂ - y₁)²]</text>
        </svg>
      );

    case 'eixo_tangente':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <circle cx="90" cy="58" r="35" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.05" />
          <line x1="45" y1="58" x2="135" y2="58" stroke="#475569" strokeWidth="1.5" />
          <line x1="90" y1="15" x2="90" y2="101" stroke="#475569" strokeWidth="1.5" />
          {/* Vertical tangent line at x = 1 */}
          <line x1="125" y1="15" x2="125" y2="101" stroke="#f43f5e" strokeWidth="2" />
          <line x1="90" y1="58" x2="125" y2="28" stroke="#ffbc00" strokeWidth="1.8" />
          <circle cx="125" cy="28" r="3" fill="#ffbc00" />
          <text x="130" y="24" fontSize="9" fontWeight="bold" fill="#f43f5e">Eixo das Tangentes</text>
          <text x="100" y="114" fontSize="9" fill="#94a3b8" textAnchor="middle">Reta vertical x = 1 paralela ao eixo dos senos</text>
        </svg>
      );

    case 'arco_circunferencia':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <circle cx="100" cy="58" r="36" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M 100,58 L 136,58 A 36,36 0 0,0 125,32 Z" fill="#00f0ff" fillOpacity="0.15" />
          <path d="M 136,58 A 36,36 0 0,0 125,32" stroke="#ffbc00" strokeWidth="3" />
          <circle cx="100" cy="58" r="3" fill="#ffffff" />
          <text x="110" y="52" fontSize="9" fill="#38bdf8">θ rad</text>
          <text x="140" y="45" fontSize="10" fontWeight="bold" fill="#ffbc00">s</text>
          <text x="100" y="112" fontSize="9" fontWeight="bold" fill="#34d399" textAnchor="middle">Comprimento do Arco: s = r · θ (θ em rad)</text>
        </svg>
      );

    case 'inclinacao_reta_m':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <line x1="30" y1="85" x2="170" y2="85" stroke="#475569" strokeWidth="1.5" />
          <line x1="70" y1="15" x2="70" y2="105" stroke="#475569" strokeWidth="1.5" />
          <line x1="45" y1="95" x2="155" y2="25" stroke="#00f0ff" strokeWidth="2.5" />
          <path d="M 95,85 A 25,25 0 0,0 90,73" stroke="#ffbc00" strokeWidth="2" fill="none" />
          <text x="96" y="80" fontSize="10" fontWeight="bold" fill="#ffbc00">θ</text>
          <text x="130" y="42" fontSize="10" fontWeight="bold" fill="#34d399">m = tg(θ)</text>
          <text x="100" y="112" fontSize="9" fill="#94a3b8" textAnchor="middle">Coeficiente Angular: m = (y₂ - y₁) / (x₂ - x₁)</text>
        </svg>
      );

    case 'reducao_primeiro_quadrante':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <circle cx="100" cy="58" r="36" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.05" />
          <line x1="55" y1="58" x2="145" y2="58" stroke="#475569" strokeWidth="1.5" />
          <line x1="100" y1="15" x2="100" y2="101" stroke="#475569" strokeWidth="1.5" />
          <line x1="100" y1="58" x2="68" y2="40" stroke="#f43f5e" strokeWidth="2" />
          <line x1="100" y1="58" x2="132" y2="40" stroke="#10b981" strokeWidth="2" strokeDasharray="3 2" />
          <text x="60" y="35" fontSize="9" fontWeight="bold" fill="#f43f5e">150° (2ºQ)</text>
          <text x="140" y="35" fontSize="9" fontWeight="bold" fill="#10b981">30° (1ºQ)</text>
          <text x="100" y="114" fontSize="9" fill="#34d399" textAnchor="middle">💡 Redução: sen(150°) = sen(180° - 150°) = sen(30°) = ?</text>
        </svg>
      );

    case 'setor_radianos':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <path d="M 100,60 L 136,60 A 36,36 0 0,0 122,32 Z" fill="#ffbc00" fillOpacity="0.2" stroke="#ffbc00" strokeWidth="2" />
          <circle cx="100" cy="60" r="3" fill="#ffffff" />
          <text x="110" y="55" fontSize="9" fill="#ffffff">θ rad</text>
          <text x="116" y="72" fontSize="9" fill="#38bdf8">Raio = r</text>
          <text x="100" y="112" fontSize="9" fontWeight="bold" fill="#34d399" textAnchor="middle">Área = ½ · r² · θ (θ em radianos)</text>
        </svg>
      );

    case 'seno_para_cosseno':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <circle cx="100" cy="58" r="36" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.08" />
          <line x1="100" y1="58" x2="128" y2="35" stroke="#ffbc00" strokeWidth="2" />
          <line x1="128" y1="35" x2="128" y2="58" stroke="#f43f5e" strokeWidth="1.8" />
          <text x="100" y="112" fontSize="10" fontWeight="bold" fill="#34d399" textAnchor="middle">cos(x) = ± √(1 - sen²(x))</text>
        </svg>
      );

    case 'fractal_pg':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          {/* Sierpinski Triangle Step 1 & 2 */}
          <polygon points="100,18 45,95 155,95" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.1" />
          <polygon points="100,95 72,56 128,56" stroke="#ffbc00" strokeWidth="2" fill="#070c1a" />
          <text x="100" y="112" fontSize="9" fontWeight="bold" fill="#34d399" textAnchor="middle">Fractal: Progressão Geométrica (q = 3/4)</text>
        </svg>
      );

    // ----------------------------------------------------
    // 2º ANO DO ENSINO MÉDIO & GEOMETRIA ESPACIAL E SENOIDE
    // ----------------------------------------------------
    case 'lei_senos_geral':
    case 'lei_senos_generica':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <polygon points="35,90 165,90 110,25" stroke="#00f0ff" strokeWidth="2.5" fill="#00f0ff" fillOpacity="0.1" />
          <text x="95" y="104" fontSize="10" fontWeight="bold" fill="#38bdf8" textAnchor="middle">c</text>
          <text x="65" y="52" fontSize="10" fontWeight="bold" fill="#38bdf8">b</text>
          <text x="142" y="52" fontSize="10" fontWeight="bold" fill="#38bdf8">a</text>
          <text x="35" y="102" fontSize="9" fill="#ffbc00">Â</text>
          <text x="165" y="102" fontSize="9" fill="#ffbc00">B̂</text>
          <text x="110" y="18" fontSize="9" fill="#ffbc00" textAnchor="middle">Ĉ</text>
          <text x="100" y="114" fontSize="9" fontWeight="bold" fill="#34d399" textAnchor="middle">a / sen(A) = b / sen(B) = c / sen(C)</text>
        </svg>
      );

    case 'triangulo_cossenos_5_8':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <path d="M 30,95 L 170,95 L 120,30 Z" stroke="#00f0ff" strokeWidth="2.5" fill="#00f0ff" fillOpacity="0.1" />
          <text x="60" y="55" fontSize="11" fontWeight="bold" fill="#38bdf8">c = 8</text>
          <text x="150" y="55" fontSize="11" fontWeight="bold" fill="#38bdf8">b = 5</text>
          <text x="95" y="108" fontSize="12" fontWeight="bold" fill="#f43f5e">a = ?</text>
          <text x="45" y="90" fontSize="10" fontWeight="bold" fill="#ffbc00">60°</text>
          <text x="100" y="114" fontSize="9" fill="#94a3b8" textAnchor="middle">💡 Dica: a² = b² + c² - 2bc · cos(60°) ➔ Calcule o lado a</text>
        </svg>
      );

    case 'triangulo_obtuso_cosseno':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <polygon points="30,85 170,85 70,35" stroke="#f43f5e" strokeWidth="2.5" fill="#f43f5e" fillOpacity="0.1" />
          <path d="M 55,75 A 25,25 0 0,0 70,85" stroke="#ffbc00" strokeWidth="2" fill="none" />
          <text x="75" y="78" fontSize="10" fontWeight="bold" fill="#ffbc00">120°</text>
          <text x="100" y="112" fontSize="9" fill="#34d399" textAnchor="middle">cos(120°) = -cos(60°) = -0,5 (Lei dos Cossenos)</text>
        </svg>
      );

    case 'prisma_triangular':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <polygon points="50,45 80,25 110,45" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.15" />
          <polygon points="50,95 80,75 110,95" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.15" />
          <line x1="50" y1="45" x2="50" y2="95" stroke="#38bdf8" strokeWidth="2" />
          <line x1="80" y1="25" x2="80" y2="75" stroke="#38bdf8" strokeWidth="2" />
          <line x1="110" y1="45" x2="110" y2="95" stroke="#38bdf8" strokeWidth="2" />
          <text x="125" y="70" fontSize="10" fontWeight="bold" fill="#ffbc00">h</text>
          <text x="100" y="112" fontSize="9" fill="#94a3b8" textAnchor="middle">Volume do Prisma: V = Área da Base (Ab) × h</text>
        </svg>
      );

    case 'prisma_volume':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <polygon points="60,40 100,25 140,40 100,55" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.15" />
          <polygon points="60,85 100,70 140,85 100,100" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.15" />
          <line x1="60" y1="40" x2="60" y2="85" stroke="#38bdf8" strokeWidth="2" />
          <line x1="140" y1="40" x2="140" y2="85" stroke="#38bdf8" strokeWidth="2" />
          <line x1="100" y1="55" x2="100" y2="100" stroke="#38bdf8" strokeWidth="2" />
          <text x="148" y="65" fontSize="10" fontWeight="bold" fill="#ffbc00">h</text>
          <text x="100" y="114" fontSize="9" fontWeight="bold" fill="#34d399" textAnchor="middle">V = Ab · h  |  Área Total = 2·Ab + Alateral</text>
        </svg>
      );

    case 'piramide_volume':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <polygon points="50,85 150,85 120,65 70,65" stroke="#38bdf8" strokeWidth="1.8" fill="#38bdf8" fillOpacity="0.1" />
          <line x1="100" y1="20" x2="50" y2="85" stroke="#00f0ff" strokeWidth="2.2" />
          <line x1="100" y1="20" x2="150" y2="85" stroke="#00f0ff" strokeWidth="2.2" />
          <line x1="100" y1="20" x2="120" y2="65" stroke="#00f0ff" strokeWidth="1.8" />
          <line x1="100" y1="20" x2="70" y2="65" stroke="#00f0ff" strokeWidth="1.8" strokeDasharray="3 2" />
          <line x1="100" y1="20" x2="100" y2="75" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 2" />
          <circle cx="100" cy="20" r="3" fill="#ffbc00" />
          <text x="108" y="50" fontSize="10" fontWeight="bold" fill="#f43f5e">h</text>
          <text x="100" y="114" fontSize="9" fontWeight="bold" fill="#34d399" textAnchor="middle">Volume da Pirâmide: V = ⅓ · Ab · h</text>
        </svg>
      );

    case 'funcao_senoide':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <line x1="20" y1="60" x2="180" y2="60" stroke="#475569" strokeWidth="1.5" />
          <line x1="30" y1="15" x2="30" y2="105" stroke="#475569" strokeWidth="1.5" />
          <path d="M 30,60 Q 65,20 100,60 T 170,60" stroke="#00f0ff" strokeWidth="2.5" fill="none" />
          <text x="65" y="24" fontSize="9" fontWeight="bold" fill="#38bdf8">+1 (máx)</text>
          <text x="135" y="98" fontSize="9" fontWeight="bold" fill="#38bdf8">-1 (mín)</text>
          <text x="170" y="74" fontSize="8" fill="#ffbc00">2π</text>
          <text x="100" y="114" fontSize="9" fill="#94a3b8" textAnchor="middle">f(x) = sen(x) | Período T = 2π / c | Im = [-1, 1]</text>
        </svg>
      );

    case 'cilindro_volume':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <ellipse cx="100" cy="30" rx="36" ry="12" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.15" />
          <line x1="64" y1="30" x2="64" y2="85" stroke="#38bdf8" strokeWidth="2" />
          <line x1="136" y1="30" x2="136" y2="85" stroke="#38bdf8" strokeWidth="2" />
          <ellipse cx="100" cy="85" rx="36" ry="12" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.08" />
          <line x1="100" y1="30" x2="136" y2="30" stroke="#ffbc00" strokeWidth="1.8" />
          <circle cx="100" cy="30" r="2.5" fill="#ffbc00" />
          <text x="118" y="24" fontSize="9" fontWeight="bold" fill="#ffbc00">r</text>
          <text x="145" y="60" fontSize="10" fontWeight="bold" fill="#38bdf8">h</text>
          <text x="100" y="112" fontSize="9" fill="#94a3b8" textAnchor="middle">V = π · r² · h (Cilindro Reto)</text>
        </svg>
      );

    case 'cone_volume':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <ellipse cx="100" cy="88" rx="36" ry="12" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.1" />
          <line x1="64" y1="88" x2="100" y2="20" stroke="#38bdf8" strokeWidth="2" />
          <line x1="136" y1="88" x2="100" y2="20" stroke="#38bdf8" strokeWidth="2" />
          <line x1="100" y1="20" x2="100" y2="88" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="100" y1="88" x2="136" y2="88" stroke="#ffbc00" strokeWidth="1.8" />
          <circle cx="100" cy="88" r="2.5" fill="#ffbc00" />
          <circle cx="100" cy="20" r="3" fill="#00f0ff" />
          <text x="118" y="82" fontSize="9" fontWeight="bold" fill="#ffbc00">r</text>
          <text x="92" y="55" fontSize="9" fontWeight="bold" fill="#f43f5e">h</text>
          <text x="122" y="50" fontSize="9" fontWeight="bold" fill="#38bdf8">g</text>
          <text x="100" y="114" fontSize="9" fill="#94a3b8" textAnchor="middle">V = ⅓ · π · r² · h | g² = r² + h²</text>
        </svg>
      );

    case 'esfera_volume':
    case 'esfera_area':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <circle cx="100" cy="55" r="36" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.1" />
          <ellipse cx="100" cy="55" rx="36" ry="12" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
          <circle cx="100" cy="55" r="3" fill="#ffbc00" />
          <line x1="100" y1="55" x2="136" y2="55" stroke="#ffbc00" strokeWidth="2" />
          <text x="118" y="50" fontSize="10" fontWeight="bold" fill="#ffbc00">R</text>
          <text x="100" y="108" fontSize="9" fill="#94a3b8" textAnchor="middle">V = ⁴⁄₃ · π · R³ | A = 4 · π · R²</text>
        </svg>
      );

    case 'seno_adicao_arcos':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <text x="100" y="45" fontSize="11" fontWeight="bold" fill="#ffbc00" textAnchor="middle">Adição de Arcos</text>
          <text x="100" y="70" fontSize="11" fontWeight="bold" fill="#00f0ff" textAnchor="middle">sen(a + b) = sen(a)cos(b) + sen(b)cos(a)</text>
          <text x="100" y="105" fontSize="9" fill="#34d399" textAnchor="middle">Ex: sen(75°) = sen(45° + 30°)</text>
        </svg>
      );

    case 'lei_senos_circunscrito':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <circle cx="100" cy="55" r="38" stroke="#38bdf8" strokeWidth="1.5" fill="#00f0ff" fillOpacity="0.05" />
          <polygon points="75,28 135,38 90,88" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.1" />
          <text x="100" y="60" fontSize="9" fontWeight="bold" fill="#ffbc00" textAnchor="middle">Raio R</text>
          <text x="100" y="112" fontSize="9" fontWeight="bold" fill="#34d399" textAnchor="middle">a / sen(A) = b / sen(B) = c / sen(C) = 2R</text>
        </svg>
      );

    case 'area_triangulo_seno':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <polygon points="35,85 165,85 115,25" stroke="#ffbc00" strokeWidth="2.5" fill="#ffbc00" fillOpacity="0.1" />
          <text x="65" y="52" fontSize="11" fontWeight="bold" fill="#00f0ff">b</text>
          <text x="145" y="52" fontSize="11" fontWeight="bold" fill="#00f0ff">a</text>
          <text x="100" y="100" fontSize="9" fill="#64748b" textAnchor="middle">c</text>
          <text x="115" y="42" fontSize="10" fontWeight="bold" fill="#f43f5e" textAnchor="middle">Ĉ</text>
          <text x="100" y="114" fontSize="9" fontWeight="bold" fill="#34d399" textAnchor="middle">Área = ½ · a · b · sen(C)</text>
        </svg>
      );

    case 'equacao_trigonometrica':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <circle cx="100" cy="58" r="38" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.05" />
          <line x1="50" y1="58" x2="150" y2="58" stroke="#475569" strokeWidth="1.5" />
          <line x1="100" y1="15" x2="100" y2="101" stroke="#475569" strokeWidth="1.5" />
          {/* Horizontal line sen(x) = 1/2 */}
          <line x1="62" y1="39" x2="138" y2="39" stroke="#f43f5e" strokeWidth="1.8" strokeDasharray="3 2" />
          <circle cx="132" cy="39" r="3" fill="#ffbc00" />
          <circle cx="68" cy="39" r="3" fill="#ffbc00" />
          <text x="135" y="32" fontSize="8" fontWeight="bold" fill="#ffbc00">θ₁ (1ºQ)</text>
          <text x="65" y="32" fontSize="8" fontWeight="bold" fill="#ffbc00">θ₂ (2ºQ)</text>
          <text x="100" y="112" fontSize="9" fill="#34d399" textAnchor="middle">sen(x) = ½ ➔ x = ? (1º e 2º Quadrantes)</text>
        </svg>
      );

    case 'poliedro_euler':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <rect x="75" y="35" width="50" height="50" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.1" />
          <polygon points="75,35 95,20 145,20 125,35" stroke="#38bdf8" strokeWidth="1.8" fill="#38bdf8" fillOpacity="0.15" />
          <polygon points="125,35 145,20 145,70 125,85" stroke="#38bdf8" strokeWidth="1.8" fill="#38bdf8" fillOpacity="0.1" />
          <text x="100" y="65" fontSize="12" fontWeight="bold" fill="#ffbc00" textAnchor="middle">V - A + F = 2</text>
          <text x="100" y="112" fontSize="9" fill="#34d399" textAnchor="middle">Relação de Euler para Poliedros Convexos</text>
        </svg>
      );

    case 'tronco_piramide':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <polygon points="75,40 125,40 110,25 90,25" stroke="#38bdf8" strokeWidth="1.5" fill="#38bdf8" fillOpacity="0.2" />
          <polygon points="50,90 150,90 130,70 70,70" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.15" />
          <line x1="75" y1="40" x2="50" y2="90" stroke="#00f0ff" strokeWidth="2" />
          <line x1="125" y1="40" x2="150" y2="90" stroke="#00f0ff" strokeWidth="2" />
          <line x1="90" y1="25" x2="70" y2="70" stroke="#00f0ff" strokeWidth="1.5" />
          <line x1="110" y1="25" x2="130" y2="70" stroke="#00f0ff" strokeWidth="1.5" />
          <text x="100" y="112" fontSize="9" fill="#94a3b8" textAnchor="middle">V = ⅓ · h · (B + b + √(B · b))</text>
        </svg>
      );

    // ----------------------------------------------------
    // 3º ANO DO ENSINO MÉDIO & GEOMETRIA ANALÍTICA
    // ----------------------------------------------------
    case 'ga_reta_cartesiana':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <line x1="20" y1="75" x2="180" y2="75" stroke="#475569" strokeWidth="1.5" />
          <line x1="85" y1="15" x2="85" y2="105" stroke="#475569" strokeWidth="1.5" />
          <line x1="45" y1="95" x2="155" y2="25" stroke="#00f0ff" strokeWidth="2.5" />
          <circle cx="65" cy="82" r="4" fill="#f43f5e" />
          <circle cx="135" cy="38" r="4" fill="#10b981" />
          <text x="50" y="74" fontSize="9" fontWeight="bold" fill="#f43f5e">A(x₁, y₁)</text>
          <text x="138" y="32" fontSize="9" fontWeight="bold" fill="#10b981">B(x₂, y₂)</text>
          <text x="100" y="112" fontSize="9" fill="#ffbc00" textAnchor="middle">Equação Geral: ax + by + c = 0</text>
        </svg>
      );

    case 'cubo_volume':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <rect x="55" y="45" width="55" height="55" stroke="#38bdf8" strokeWidth="2" fill="#38bdf8" fillOpacity="0.1" />
          <polygon points="55,45 80,25 135,25 110,45" stroke="#00f0ff" strokeWidth="2" fill="#00f0ff" fillOpacity="0.15" />
          <polygon points="110,45 135,25 135,80 110,100" stroke="#38bdf8" strokeWidth="2" fill="#00f0ff" fillOpacity="0.05" />
          <text x="82" y="112" fontSize="10" fontWeight="bold" fill="#ffbc00" textAnchor="middle">a = 4 cm</text>
          <text x="100" y="22" fontSize="9.5" fontWeight="bold" fill="#38bdf8" textAnchor="middle">💡 Dica: Volume do Cubo = a³ = ? cm³</text>
        </svg>
      );

    case 'grafico_colunas':
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <line x1="30" y1="95" x2="175" y2="95" stroke="#475569" strokeWidth="1.5" />
          <line x1="30" y1="20" x2="30" y2="95" stroke="#475569" strokeWidth="1.5" />
          <rect x="45" y="60" width="22" height="35" fill="#38bdf8" rx="2" />
          <rect x="75" y="40" width="22" height="55" fill="#00f0ff" rx="2" />
          <rect x="105" y="25" width="22" height="70" fill="#f43f5e" rx="2" />
          <rect x="135" y="50" width="22" height="45" fill="#ffbc00" rx="2" />
          <text x="56" y="107" fontSize="8" fill="#94a3b8" textAnchor="middle">A</text>
          <text x="86" y="107" fontSize="8" fill="#94a3b8" textAnchor="middle">B</text>
          <text x="116" y="107" fontSize="8" fill="#94a3b8" textAnchor="middle">C</text>
          <text x="146" y="107" fontSize="8" fill="#94a3b8" textAnchor="middle">D</text>
          <text x="116" y="20" fontSize="9" fontWeight="bold" fill="#f43f5e" textAnchor="middle">Coluna Mais Alta (?)</text>
        </svg>
      );

    default:
      return (
        <svg className={className} viewBox="0 0 200 120" fill="none">
          {bg}
          <path d="M 30,95 L 160,95 L 30,25 Z" stroke="#00f0ff" strokeWidth="2.5" fill="#00f0ff" fillOpacity="0.1" />
          <rect x="30" y="80" width="15" height="15" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
          <text x="90" y="112" fontSize="10" fontWeight="bold" fill="#38bdf8">Cateto (b)</text>
          <text x="14" y="65" fontSize="10" fontWeight="bold" fill="#38bdf8" transform="rotate(-90,14,65)">Cateto (a)</text>
          <text x="95" y="55" fontSize="11" fontWeight="bold" fill="#ffbc00">Hipotenusa (c)</text>
        </svg>
      );
  }
};
