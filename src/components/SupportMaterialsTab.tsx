import React from 'react';
import { BookOpen, GraduationCap } from 'lucide-react';

export const SupportMaterialsTab: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="bg-[#0b1329]/90 border border-cyan-500/30 text-white p-6 sm:p-8 rounded-3xl shadow-[0_0_25px_rgba(0,240,255,0.15)] backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              Guia Pedagógico Holográfico • 6º EF ao 3º EM
            </span>
            <span className="bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold px-3 py-1 rounded-full">
              Currículo Paulista &amp; Livro do Estudante
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-2.5">
            <BookOpen className="w-8 h-8 text-amber-300 shrink-0" />
            <span>Materiais de Apoio &amp; Formulário Vertical por Série</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Consulte as fórmulas essenciais, critérios geométricos e relações algébricas com a mesma identidade visual de cada série no <strong>Currículo em Ação</strong>, do <strong>6º Ano EF ao 3º Ano EM</strong>.
          </p>
        </div>
      </div>

      {/* =========================================================================
          BLOCO 1: 6º ANO DO ENSINO FUNDAMENTAL (LARANJA SOLAR VIBRANTE)
          ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 border-b border-orange-500/50 pb-2.5">
          <span className="w-8 h-8 rounded-xl bg-orange-950/85 text-orange-300 border border-orange-500/60 flex items-center justify-center font-black text-sm shadow-[0_0_15px_rgba(249,115,22,0.28)]">
            6º
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black bg-gradient-to-r from-orange-300 via-orange-400 to-amber-300 bg-clip-text text-transparent font-['Oxanium',sans-serif]">
              6º Ano do Ensino Fundamental • Fundamentos Geométricos &amp; Grandezas
            </h3>
            <p className="text-xs text-orange-200/85">
              Perímetros, cálculo de áreas planas retangulares e razões percentuais no cotidiano
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Áreas Básicas */}
          <div className="bg-gradient-to-br from-[#291002]/95 via-[#381603]/95 to-[#1f0b01]/95 p-5 rounded-2xl border-2 border-orange-500/60 hover:border-orange-400 shadow-md space-y-3 transition-colors">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-orange-200 text-sm">Áreas de Quadrados &amp; Retângulos</h4>
              <span className="text-[10px] font-mono font-bold text-orange-300 bg-orange-950/85 px-2 py-0.5 rounded border border-orange-500/60">Geometria Plana</span>
            </div>
            <div className="bg-[#140701] p-3 rounded-xl text-center font-mono font-black text-base text-orange-300 border border-orange-500/50">
              A_quadrado = L² • A_retângulo = b · h
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              A área mede a extensão interna da superfície em unidades quadradas (ex: cm², m²). O quadrado é um retângulo de lados iguais (L = b = h).
            </p>
          </div>

          {/* Área do Triângulo */}
          <div className="bg-gradient-to-br from-[#291002]/95 via-[#381603]/95 to-[#1f0b01]/95 p-5 rounded-2xl border-2 border-orange-500/60 hover:border-orange-400 shadow-md space-y-3 transition-colors">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-orange-200 text-sm">Área do Triângulo</h4>
              <span className="text-[10px] font-mono font-bold text-orange-300 bg-orange-950/85 px-2 py-0.5 rounded border border-orange-500/60">Base e Altura</span>
            </div>
            <div className="bg-[#140701] p-3 rounded-xl text-center font-mono font-black text-base text-orange-300 border border-orange-500/50">
              A = (base · altura) / 2
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Todo triângulo corresponde exatamente à metade de um paralelogramo de mesma base e mesma altura perpendicular.
            </p>
          </div>

          {/* Perímetro e Porcentagem */}
          <div className="bg-gradient-to-br from-[#291002]/95 via-[#381603]/95 to-[#1f0b01]/95 p-5 rounded-2xl border-2 border-orange-500/60 hover:border-orange-400 shadow-md space-y-3 transition-colors">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-orange-200 text-sm">Perímetro &amp; Frações</h4>
              <span className="text-[10px] font-mono font-bold text-orange-300 bg-orange-950/85 px-2 py-0.5 rounded border border-orange-500/60">Contorno e Razão</span>
            </div>
            <div className="bg-[#140701] p-3 rounded-xl text-center font-mono font-black text-base text-orange-300 border border-orange-500/50">
              P = L₁ + L₂ + ... + L_n • % = (p / t) · 100
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              O perímetro é a medida linear de contorno da figura (soma dos lados). Em porcentagens, a razão parte/todo é multiplicada por 100.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BLOCO 2: 7º ANO DO ENSINO FUNDAMENTAL (VERMELHO-ALARANJADO VULCÂNICO)
          ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 border-b border-red-500/50 pb-2.5">
          <span className="w-8 h-8 rounded-xl bg-red-950/85 text-orange-300 border border-red-500/60 flex items-center justify-center font-black text-sm shadow-[0_0_15px_rgba(239,68,68,0.3)]">
            7º
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black bg-gradient-to-r from-red-400 via-orange-400 to-red-300 bg-clip-text text-transparent font-['Oxanium',sans-serif]">
              7º Ano do Ensino Fundamental • Círculo, Proporções &amp; Equações
            </h3>
            <p className="text-xs text-orange-200/85">
              Circunferência, número Pi, regra de três direta e volume do paralelepípedo
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Comprimento da Circunferência */}
          <div className="bg-gradient-to-br from-[#2b0803]/95 via-[#3a0c04]/95 to-[#210502]/95 p-5 rounded-2xl border-2 border-red-500/60 hover:border-orange-400 shadow-md space-y-3 transition-colors">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-orange-200 text-sm">Comprimento da Circunferência</h4>
              <span className="text-[10px] font-mono font-bold text-orange-300 bg-red-950/85 px-2 py-0.5 rounded border border-red-500/60">Número Pi</span>
            </div>
            <div className="bg-[#160301] p-3 rounded-xl text-center font-mono font-black text-base text-orange-300 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              C = 2 · π · r = π · d
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              A razão entre a volta completa da borda e o diâmetro é constante universal: π ≈ 3,14159. Uma volta completa de roda de raio r percorre 2πr.
            </p>
          </div>

          {/* Área do Círculo */}
          <div className="bg-gradient-to-br from-[#2b0803]/95 via-[#3a0c04]/95 to-[#210502]/95 p-5 rounded-2xl border-2 border-red-500/60 hover:border-orange-400 shadow-md space-y-3 transition-colors">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-orange-200 text-sm">Área do Círculo</h4>
              <span className="text-[10px] font-mono font-bold text-orange-300 bg-red-950/85 px-2 py-0.5 rounded border border-red-500/60">Superfície</span>
            </div>
            <div className="bg-[#160301] p-3 rounded-xl text-center font-mono font-black text-base text-orange-300 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              A = π · r²
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Ao dobrar o raio de uma pizza ou piscina circular, a sua área quadruplica (2² = 4), pois a dependência do raio é quadrática.
            </p>
          </div>

          {/* Volume do Bloco Retangular */}
          <div className="bg-gradient-to-br from-[#2b0803]/95 via-[#3a0c04]/95 to-[#210502]/95 p-5 rounded-2xl border-2 border-red-500/60 hover:border-orange-400 shadow-md space-y-3 transition-colors">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-orange-200 text-sm">Volume do Bloco Retangular</h4>
              <span className="text-[10px] font-mono font-bold text-orange-300 bg-red-950/85 px-2 py-0.5 rounded border border-red-500/60">3 Dimensões</span>
            </div>
            <div className="bg-[#160301] p-3 rounded-xl text-center font-mono font-black text-base text-orange-300 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              V = comprimento · largura · altura
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              O espaço ocupado em 3D. 1 m³ equivale a exatamente 1.000 litros de água (1 dm³ = 1 litro).
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BLOCO 3: 8º ANO DO ENSINO FUNDAMENTAL (VERDE ESMERALDA NEON)
          ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 border-b border-emerald-500/40 pb-2.5">
          <span className="w-8 h-8 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 flex items-center justify-center font-black text-sm shadow-[0_0_15px_rgba(16,185,129,0.25)]">
            8º
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-400 bg-clip-text text-transparent font-['Oxanium',sans-serif]">
              8º Ano do Ensino Fundamental • Polígonos, Trapézio &amp; Cilindro
            </h3>
            <p className="text-xs text-emerald-200/85">
              Soma de ângulos de polígonos convexos, áreas compostas e volume de corpos redondos
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Ângulos Internos */}
          <div className="bg-gradient-to-br from-[#021c13]/95 via-[#04291c]/95 to-[#01140e]/95 p-5 rounded-2xl border-2 border-emerald-500/50 hover:border-emerald-400 shadow-md space-y-3 transition-colors">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-emerald-200 text-sm">Soma dos Ângulos Internos</h4>
              <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/50">Polígonos</span>
            </div>
            <div className="bg-[#010e09] p-3 rounded-xl text-center font-mono font-black text-base text-emerald-300 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              S_i = (n - 2) · 180°
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Onde n é o número de lados. Em um triângulo (n=3): 180°; quadrilátero (n=4): 360°; pentágono (n=5): 540°; hexágono (n=6): 720°.
            </p>
          </div>

          {/* Área do Trapézio e Losango */}
          <div className="bg-gradient-to-br from-[#021c13]/95 via-[#04291c]/95 to-[#01140e]/95 p-5 rounded-2xl border-2 border-emerald-500/50 hover:border-emerald-400 shadow-md space-y-3 transition-colors">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-emerald-200 text-sm">Área do Trapézio &amp; Losango</h4>
              <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/50">Quadriláteros</span>
            </div>
            <div className="bg-[#010e09] p-3 rounded-xl text-center font-mono font-black text-base text-emerald-300 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              A_trap = (B + b)·h / 2 • A_los = (D · d) / 2
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              O trapézio faz a média aritmética das bases vezes a altura; o losango multiplica as diagonais perpendiculares dividindo por 2.
            </p>
          </div>

          {/* Volume do Cilindro */}
          <div className="bg-gradient-to-br from-[#021c13]/95 via-[#04291c]/95 to-[#01140e]/95 p-5 rounded-2xl border-2 border-emerald-500/50 hover:border-emerald-400 shadow-md space-y-3 transition-colors">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-emerald-200 text-sm">Volume do Cilindro Reto</h4>
              <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/50">Corpo Redondo</span>
            </div>
            <div className="bg-[#010e09] p-3 rounded-xl text-center font-mono font-black text-base text-emerald-300 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              V = A_base · h = π · r² · h
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Multiplica a área da base circular (πr²) pela altura perpendicular h. Essencial para calcular capacidade de reservatórios e latas cilíndricas.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BLOCO 4: 9º ANO DO ENSINO FUNDAMENTAL (ROXO ELÉTRICO ULTRAVIOLETA)
          ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 border-b border-purple-500/50 pb-2.5">
          <span className="w-8 h-8 rounded-xl bg-purple-950/80 text-purple-300 border border-purple-500/50 flex items-center justify-center font-black text-sm shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            9º
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-400 bg-clip-text text-transparent font-['Oxanium',sans-serif]">
              9º Ano do Ensino Fundamental • Pitágoras, Tales, Semelhança &amp; Bhaskara
            </h3>
            <p className="text-xs text-purple-200/85">
              Pilares geométricos fundamentais para a transição completa ao Ensino Médio
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pitágoras - ROXO ELÉTRICO */}
          <div className="bg-gradient-to-br from-[#190a2a]/95 via-[#240e3b]/95 to-[#12071f]/95 p-6 rounded-3xl border-2 border-purple-500/50 hover:border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.2)] space-y-3 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">📐</span>
                <h4 className="font-extrabold text-base sm:text-lg text-purple-200">Teorema de Pitágoras</h4>
              </div>
              <span className="text-xs text-purple-300 font-bold bg-purple-950/80 border border-purple-500/50 px-2.5 py-0.5 rounded-full">
                Triângulos Retângulos (90°)
              </span>
            </div>
            <div className="bg-[#0c0416] p-3.5 rounded-2xl text-center font-mono font-black text-xl text-purple-300 border-2 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.22)]">
              c² = a² + b²
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              O quadrado da hipotenusa (c, lado oposto ao ângulo reto de 90°) equivale à soma dos quadrados dos catetos (a e b). Ternos pitagóricos comuns: (3, 4, 5), (5, 12, 13) e (8, 15, 17).
            </p>
          </div>

          {/* Relações de Semelhança - ROXO ELÉTRICO */}
          <div className="bg-gradient-to-br from-[#190a2a]/95 via-[#240e3b]/95 to-[#12071f]/95 p-6 rounded-3xl border-2 border-purple-500/50 hover:border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.2)] space-y-3 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🔺</span>
                <h4 className="font-extrabold text-base sm:text-lg text-purple-200">Relações de Semelhança</h4>
              </div>
              <span className="text-xs text-purple-300 font-bold bg-purple-950/80 border border-purple-500/50 px-2.5 py-0.5 rounded-full">
                Critérios AA, LLL e Áreas
              </span>
            </div>
            <div className="bg-[#0c0416] p-3.5 rounded-2xl text-center font-mono font-black text-lg text-purple-300 border-2 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.22)]">
              Lados: k | Perímetros: k | Áreas: k²
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Se dois triângulos possuem mesma forma (ângulos congruentes) e razão linear k, seus perímetros variam na mesma razão k, enquanto suas áreas variam no quadrado da razão (k²).
            </p>
          </div>

          {/* Teorema de Tales - ROXO ELÉTRICO */}
          <div className="bg-gradient-to-br from-[#190a2a]/95 via-[#240e3b]/95 to-[#12071f]/95 p-5 rounded-2xl border-2 border-purple-500/50 hover:border-purple-400 shadow-md space-y-3 transition-colors">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-purple-200 text-sm">Teorema de Tales</h4>
              <span className="text-[10px] font-mono font-bold text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/50">Retas Paralelas</span>
            </div>
            <div className="bg-[#0c0416] p-3 rounded-xl text-center font-mono font-black text-base text-purple-300 border border-purple-500/50">
              AB / BC = A'B' / B'C'
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Um feixe de retas paralelas determina, sobre duas retas transversais quaisquer, segmentos correspondentes que são diretamente proporcionais.
            </p>
          </div>

          {/* Bhaskara - ROXO ELÉTRICO */}
          <div className="bg-gradient-to-br from-[#190a2a]/95 via-[#240e3b]/95 to-[#12071f]/95 p-5 rounded-2xl border-2 border-purple-500/50 hover:border-purple-400 shadow-md space-y-3 transition-colors">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-purple-200 text-sm">Equação do 2º Grau (Bhaskara)</h4>
              <span className="text-[10px] font-mono font-bold text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/50">Álgebra &amp; Raízes</span>
            </div>
            <div className="bg-[#0c0416] p-3 rounded-xl text-center font-mono font-black text-base text-purple-300 border border-purple-500/50">
              x = (-b ± √Δ) / 2a • Δ = b² - 4ac
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Se Δ &gt; 0, duas raízes reais distintas; se Δ = 0, raiz real dupla (vértice tangencia o eixo X); se Δ &lt; 0, nenhuma raiz real.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BLOCO 5: 1º ANO DO ENSINO MÉDIO (ROSA CHOQUE & FRAMBOESA)
          ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 border-b border-pink-500/50 pb-2.5">
          <span className="w-8 h-8 rounded-xl bg-pink-950/80 text-pink-300 border border-pink-500/50 flex items-center justify-center font-black text-sm shadow-[0_0_15px_rgba(236,72,153,0.28)]">
            1º EM
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black bg-gradient-to-r from-pink-400 via-rose-300 to-pink-300 bg-clip-text text-transparent font-['Oxanium',sans-serif]">
              1º Ano do Ensino Médio • Razões Trigonométricas &amp; Funções
            </h3>
            <p className="text-xs text-pink-200/85">
              Seno, Cosseno, Tangente no triângulo retângulo e coordenadas do vértice
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Razões Trigonométricas no Triângulo Retângulo */}
          <div className="bg-gradient-to-br from-[#260517]/95 via-[#360821]/95 to-[#1a0310]/95 p-5 rounded-2xl border-2 border-pink-500/50 hover:border-pink-400 shadow-md space-y-3 transition-colors">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-pink-200 text-sm">Razões Trigonométricas Retângulas</h4>
              <span className="text-[10px] font-mono font-bold text-pink-300 bg-pink-950/80 px-2 py-0.5 rounded border border-pink-500/50">SOH CAH TOA</span>
            </div>
            <div className="bg-[#12020b] p-3 rounded-xl text-center font-mono font-black text-base text-pink-300 border border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
              sen(θ) = CO/H • cos(θ) = CA/H • tg(θ) = CO/CA
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              O cateto oposto (CO) fica de frente ao ângulo estudado θ; o cateto adjacente (CA) forma o ângulo θ junto com a hipotenusa H.
            </p>
          </div>

          {/* Vértice da Função Quadrática */}
          <div className="bg-gradient-to-br from-[#260517]/95 via-[#360821]/95 to-[#1a0310]/95 p-5 rounded-2xl border-2 border-pink-500/50 hover:border-pink-400 shadow-md space-y-3 transition-colors">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-pink-200 text-sm">Ponto Máximo ou Mínimo (Vértice)</h4>
              <span className="text-[10px] font-mono font-bold text-pink-300 bg-pink-950/80 px-2 py-0.5 rounded border border-pink-500/50">Parábola</span>
            </div>
            <div className="bg-[#12020b] p-3 rounded-xl text-center font-mono font-black text-base text-pink-300 border border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
              X_v = -b / 2a • Y_v = -Δ / 4a
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Se a &gt; 0, concavidade para cima e Y_v é o valor mínimo; se a &lt; 0, concavidade para baixo e Y_v é a altura máxima (trajetórias balísticas).
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BLOCO 6: 2º ANO DO ENSINO MÉDIO (AZUL SAFIRA GALÁCTICO)
          ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 border-b border-sky-500/50 pb-2.5">
          <span className="w-8 h-8 rounded-xl bg-sky-950/80 text-sky-300 border border-sky-500/50 flex items-center justify-center font-black text-sm shadow-[0_0_15px_rgba(56,189,248,0.28)]">
            2º EM
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black bg-gradient-to-r from-sky-300 via-blue-300 to-sky-400 bg-clip-text text-transparent font-['Oxanium',sans-serif]">
              2º Ano do Ensino Médio • Leis Trigonométricas &amp; Geometria Espacial
            </h3>
            <p className="text-xs text-sky-200/85">
              Lei dos Senos, Lei dos Cossenos, Relação Fundamental e Prismas/Pirâmides
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Lei dos Senos - AZUL SAFIRA */}
          <div className="bg-gradient-to-br from-[#03152e]/95 via-[#051e42]/95 to-[#020e21]/95 p-6 rounded-3xl border-2 border-sky-500/50 hover:border-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.2)] space-y-3 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">📏</span>
                <h4 className="font-extrabold text-base sm:text-lg text-sky-200">Lei dos Senos</h4>
              </div>
              <span className="text-xs text-sky-300 font-bold bg-sky-950/80 border border-sky-500/50 px-2.5 py-0.5 rounded-full">
                Triângulos Genéricos
              </span>
            </div>
            <div className="bg-[#010915] p-3.5 rounded-2xl text-center font-mono font-black text-base sm:text-lg text-sky-300 border-2 border-sky-500/50 shadow-[0_0_15px_rgba(56,189,248,0.22)]">
              a / sen(A) = b / sen(B) = c / sen(C) = 2R
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Em qualquer triângulo plano, os lados são diretamente proporcionais aos senos dos ângulos opostos. A razão constante de proporcionalidade é igual a 2R (diâmetro do círculo circunscrito).
            </p>
          </div>

          {/* Lei dos Cossenos - AZUL SAFIRA */}
          <div className="bg-gradient-to-br from-[#03152e]/95 via-[#051e42]/95 to-[#020e21]/95 p-6 rounded-3xl border-2 border-sky-500/50 hover:border-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.2)] space-y-3 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">📊</span>
                <h4 className="font-extrabold text-base sm:text-lg text-sky-200">Lei dos Cossenos</h4>
              </div>
              <span className="text-xs text-sky-300 font-bold bg-sky-950/80 border border-sky-500/50 px-2.5 py-0.5 rounded-full">
                Dois Lados e Ângulo
              </span>
            </div>
            <div className="bg-[#010915] p-3.5 rounded-2xl text-center font-mono font-black text-base sm:text-lg text-sky-300 border-2 border-sky-500/50 shadow-[0_0_15px_rgba(56,189,248,0.22)]">
              a² = b² + c² - 2bc · cos(A)
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Generalização do Teorema de Pitágoras. Quando A = 90°, cos(90°) = 0, reduzindo a a² = b² + c². Quando A &gt; 90° (obtuso), cos(A) é negativo, tornando o termo -2bc·cos(A) positivo!
            </p>
          </div>

          {/* Relação Fundamental da Trigonometria */}
          <div className="bg-gradient-to-br from-[#03152e]/95 via-[#051e42]/95 to-[#020e21]/95 p-5 rounded-2xl border-2 border-sky-500/50 hover:border-sky-400 shadow-md space-y-3 transition-colors">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sky-200 text-sm">Identidade Fundamental</h4>
              <span className="text-[10px] font-mono font-bold text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-500/50">Ciclo Unitário</span>
            </div>
            <div className="bg-[#010915] p-3 rounded-xl text-center font-mono font-black text-base text-sky-300 border border-sky-500/50 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              sen²(θ) + cos²(θ) = 1 • tg(θ) = sen(θ) / cos(θ)
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              A soma dos quadrados do seno e cosseno de um mesmo arco é sempre igual a 1, oriunda de Pitágoras no ciclo de raio R = 1.
            </p>
          </div>

          {/* Volume de Prismas e Pirâmides */}
          <div className="bg-gradient-to-br from-[#03152e]/95 via-[#051e42]/95 to-[#020e21]/95 p-5 rounded-2xl border-2 border-sky-500/50 hover:border-sky-400 shadow-md space-y-3 transition-colors">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sky-200 text-sm">Volume de Prismas &amp; Pirâmides</h4>
              <span className="text-[10px] font-mono font-bold text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-500/50">Geometria Espacial</span>
            </div>
            <div className="bg-[#010915] p-3 rounded-xl text-center font-mono font-black text-base text-sky-300 border border-sky-500/50 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              V_prisma = A_base · h • V_pirâmide = (A_base · h) / 3
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Uma pirâmide possui exatamente 1/3 do volume de um prisma de mesma base e mesma altura (Princípio de Cavalieri).
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BLOCO 7: 3º ANO DO ENSINO MÉDIO (GRANDE OURO DIAMANTE)
          ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 border-b border-yellow-500/50 pb-2.5">
          <span className="w-8 h-8 rounded-xl bg-amber-950/80 text-yellow-300 border border-yellow-500/50 flex items-center justify-center font-black text-sm shadow-[0_0_15px_rgba(234,179,8,0.28)]">
            3º EM
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-400 bg-clip-text text-transparent font-['Oxanium',sans-serif]">
              3º Ano do Ensino Médio • Geometria Analítica &amp; Razões de Variação
            </h3>
            <p className="text-xs text-yellow-200/85">
              Distância entre pontos, equação da reta, esferas e taxa de variação (velocidade média)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Distância entre Dois Pontos */}
          <div className="bg-gradient-to-br from-[#1c1402]/95 via-[#291e03]/95 to-[#140e02]/95 p-5 rounded-2xl border-2 border-yellow-500/50 hover:border-yellow-400 shadow-md space-y-3 transition-colors">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-yellow-200 text-sm">Distância Entre Pontos</h4>
              <span className="text-[10px] font-mono font-bold text-yellow-300 bg-amber-950/80 px-2 py-0.5 rounded border border-yellow-500/50">Plano Cartesiano</span>
            </div>
            <div className="bg-[#0e0a01] p-3 rounded-xl text-center font-mono font-black text-sm sm:text-base text-yellow-300 border border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
              d = √((x₂ - x₁)² + (y₂ - y₁)²)
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Aplicação de Pitágoras nas coordenadas cartesianas: o cateto horizontal é Δx = x₂ - x₁ e o vertical é Δy = y₂ - y₁.
            </p>
          </div>

          {/* Equação da Reta */}
          <div className="bg-gradient-to-br from-[#1c1402]/95 via-[#291e03]/95 to-[#140e02]/95 p-5 rounded-2xl border-2 border-yellow-500/50 hover:border-yellow-400 shadow-md space-y-3 transition-colors">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-yellow-200 text-sm">Equação Fundamental da Reta</h4>
              <span className="text-[10px] font-mono font-bold text-yellow-300 bg-amber-950/80 px-2 py-0.5 rounded border border-yellow-500/50">Inclinação m</span>
            </div>
            <div className="bg-[#0e0a01] p-3 rounded-xl text-center font-mono font-black text-sm sm:text-base text-yellow-300 border border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
              y - y₀ = m · (x - x₀) • m = Δy / Δx
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              O coeficiente angular m determina a tangente de inclinação da reta em relação ao eixo horizontal x.
            </p>
          </div>

          {/* Velocidade Média e Variação */}
          <div className="bg-gradient-to-br from-[#1c1402]/95 via-[#291e03]/95 to-[#140e02]/95 p-5 rounded-2xl border-2 border-yellow-500/50 hover:border-yellow-400 shadow-md space-y-3 transition-colors">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-yellow-200 text-sm">Taxa de Variação (Velocidade Média)</h4>
              <span className="text-[10px] font-mono font-bold text-yellow-300 bg-amber-950/80 px-2 py-0.5 rounded border border-yellow-500/50">Variação Linear</span>
            </div>
            <div className="bg-[#0e0a01] p-3 rounded-xl text-center font-mono font-black text-sm sm:text-base text-yellow-300 border border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
              v_m = Δs / Δt = (s₂ - s₁) / (t₂ - t₁)
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Razão entre deslocamento e intervalo de tempo. Para converter km/h em m/s, divide-se por 3,6 (ex: 72 km/h = 20 m/s).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
