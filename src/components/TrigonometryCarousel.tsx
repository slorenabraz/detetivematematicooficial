import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles, Compass } from 'lucide-react';

interface TrigoCard {
  id: number;
  etapa?: string;
  badge: string;
  badgeColor: string;
  title: string;
  formula: string;
  description: string;
  diagram: React.ReactNode;
  tip: string;
}

export const TrigonometryCarousel: React.FC = () => {
  const cards: TrigoCard[] = [
    {
      id: 1,
      badge: 'FUNDAMENTOS',
      badgeColor: 'text-cyan-300 border-cyan-500/40 bg-cyan-950/60',
      title: 'Razões Trigonométricas',
      formula: 'sen = CO/H • cos = CA/H • tg = CO/CA',
      description: 'Em triângulos retângulos, o seno é a razão do cateto oposto pela hipotenusa, o cosseno é o cateto adjacente pela hipotenusa e a tangente é oposto pelo adjacente.',
      tip: 'Dica do Detetive: Lembre-se do mnemônico SOH - CAH - TOA!',
      diagram: (
        <svg viewBox="0 0 240 120" className="w-full h-28 max-w-[240px] mx-auto" fill="none">
          <polygon points="30,100 190,100 30,20" stroke="#00F0FF" strokeWidth="2.5" fill="#00F0FF" fillOpacity="0.1" />
          <rect x="30" y="86" width="14" height="14" stroke="#38BDF8" strokeWidth="1.5" fill="none" />
          <circle cx="37" cy="93" r="2" fill="#00F0FF" />
          {/* Angle theta */}
          <path d="M 160,100 A 30 30 0 0 0 148,82" stroke="#FFEA00" strokeWidth="2" fill="none" />
          <text x="135" y="93" fill="#FFEA00" fontSize="11" fontWeight="bold">θ</text>
          {/* Labels */}
          <text x="105" y="115" fill="#38BDF8" fontSize="10" fontWeight="bold">Cateto Adj. (CA)</text>
          <text x="5" y="65" fill="#38BDF8" fontSize="10" fontWeight="bold" transform="rotate(-90 15,65)">Cateto Op. (CO)</text>
          <text x="120" y="52" fill="#FFEA00" fontSize="11" fontWeight="bold">Hipotenusa (H)</text>
        </svg>
      )
    },
    {
      id: 2,
      badge: 'IDENTIDADE',
      badgeColor: 'text-amber-300 border-amber-500/40 bg-amber-950/60',
      title: 'Relação Fundamental',
      formula: 'sen²(θ) + cos²(θ) = 1',
      description: 'Derivada diretamente do Teorema de Pitágoras no ciclo unitário. É a identidade mais utilizada em simplificações e equações trigonométricas.',
      tip: 'Consequência: tg(θ) = sen(θ) / cos(θ) para cos(θ) ≠ 0.',
      diagram: (
        <svg viewBox="0 0 240 120" className="w-full h-28 max-w-[240px] mx-auto" fill="none">
          {/* Unit circle */}
          <circle cx="120" cy="60" r="45" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="60" y1="60" x2="180" y2="60" stroke="#334155" strokeWidth="1.5" />
          <line x1="120" y1="10" x2="120" y2="110" stroke="#334155" strokeWidth="1.5" />
          {/* Radius vector */}
          <line x1="120" y1="60" x2="152" y2="28" stroke="#FFEA00" strokeWidth="2.5" />
          <line x1="152" y1="28" x2="152" y2="60" stroke="#00F0FF" strokeWidth="2" strokeDasharray="2 2" />
          <line x1="120" y1="60" x2="152" y2="60" stroke="#A855F7" strokeWidth="2" />
          <circle cx="152" cy="28" r="3.5" fill="#FFEA00" />
          <text x="156" y="48" fill="#00F0FF" fontSize="9" fontWeight="bold">sen(θ)</text>
          <text x="128" y="73" fill="#A855F7" fontSize="9" fontWeight="bold">cos(θ)</text>
          <text x="128" y="38" fill="#FFEA00" fontSize="10" fontWeight="bold">R = 1</text>
        </svg>
      )
    },
    {
      id: 3,
      etapa: 'Ensino Fundamental & Médio • 9º EF / 1º EM',
      badge: 'ÂNGULOS NOTÁVEIS',
      badgeColor: 'text-emerald-300 border-emerald-500/40 bg-emerald-950/60',
      title: 'Tabela dos Notáveis',
      formula: '30° • 45° • 60°',
      description: 'Valores memoráveis essenciais: sen(30°)=1/2, sen(45°)=√2/2, sen(60°)=√3/2. O cosseno percorre a ordem inversa e tg(45°)=1.',
      tip: 'Macetes: senos crescem (√1, √2, √3)/2, cossenos decrescem (√3, √2, √1)/2.',
      diagram: (
        <svg viewBox="0 0 240 120" className="w-full h-28 max-w-[240px] mx-auto" fill="none">
          <rect x="25" y="15" width="190" height="90" rx="8" fill="#030712" stroke="#10B981" strokeWidth="1" strokeOpacity="0.4" />
          {/* Table headers */}
          <text x="40" y="34" fill="#94A3B8" fontSize="10" fontWeight="bold">Ângulo</text>
          <text x="95" y="34" fill="#94A3B8" fontSize="10" fontWeight="bold">30°</text>
          <text x="140" y="34" fill="#94A3B8" fontSize="10" fontWeight="bold">45°</text>
          <text x="185" y="34" fill="#94A3B8" fontSize="10" fontWeight="bold">60°</text>
          <line x1="30" y1="42" x2="210" y2="42" stroke="#334155" strokeWidth="1" />
          {/* Seno */}
          <text x="40" y="58" fill="#00F0FF" fontSize="10" fontWeight="bold">sen</text>
          <text x="95" y="58" fill="#00F0FF" fontSize="10">1/2</text>
          <text x="140" y="58" fill="#00F0FF" fontSize="10">√2/2</text>
          <text x="185" y="58" fill="#00F0FF" fontSize="10">√3/2</text>
          {/* Cosseno */}
          <text x="40" y="78" fill="#A855F7" fontSize="10" fontWeight="bold">cos</text>
          <text x="95" y="78" fill="#A855F7" fontSize="10">√3/2</text>
          <text x="140" y="78" fill="#A855F7" fontSize="10">√2/2</text>
          <text x="185" y="78" fill="#A855F7" fontSize="10">1/2</text>
          {/* Tangente */}
          <text x="40" y="98" fill="#FFEA00" fontSize="10" fontWeight="bold">tg</text>
          <text x="95" y="98" fill="#FFEA00" fontSize="10">√3/3</text>
          <text x="140" y="98" fill="#FFEA00" fontSize="10">1</text>
          <text x="185" y="98" fill="#FFEA00" fontSize="10">√3</text>
        </svg>
      )
    },
    {
      id: 4,
      badge: 'LEI DOS SENOS',
      badgeColor: 'text-sky-300 border-sky-500/40 bg-sky-950/60',
      title: 'Lei dos Senos',
      formula: 'a/sen(A) = b/sen(B) = c/sen(C) = 2R',
      description: 'Valida para qualquer triângulo. Os lados são proporcionais aos senos dos respectivos ângulos opostos e a razão é igual ao diâmetro da circunferência circunscrita (2R).',
      tip: 'Ideal quando você conhece 2 ângulos e 1 lado, ou 2 lados e 1 ângulo oposto.',
      diagram: (
        <svg viewBox="0 0 240 120" className="w-full h-28 max-w-[240px] mx-auto" fill="none">
          {/* Triangle */}
          <polygon points="35,95 205,95 130,20" stroke="#38BDF8" strokeWidth="2.5" fill="#38BDF8" fillOpacity="0.12" />
          <text x="20" y="105" fill="#FFEA00" fontSize="11" fontWeight="bold">A</text>
          <text x="212" y="105" fill="#FFEA00" fontSize="11" fontWeight="bold">B</text>
          <text x="126" y="14" fill="#FFEA00" fontSize="11" fontWeight="bold">C</text>
          <text x="115" y="112" fill="#00F0FF" fontSize="11" fontWeight="bold">c</text>
          <text x="70" y="55" fill="#00F0FF" fontSize="11" fontWeight="bold">b</text>
          <text x="175" y="55" fill="#00F0FF" fontSize="11" fontWeight="bold">a</text>
        </svg>
      )
    },
    {
      id: 5,
      badge: 'LEI DOS COSSENOS',
      badgeColor: 'text-rose-300 border-rose-500/40 bg-rose-950/60',
      title: 'Lei dos Cossenos',
      formula: 'a² = b² + c² - 2bc · cos(A)',
      description: 'Generalização do Teorema de Pitágoras para triângulos acutângulos ou obtusângulos. O termo corretivo -2bc·cos(A) compensa o desvio de 90°.',
      tip: 'Se Â = 90°, cos(90°) = 0 e a equação recai em a² = b² + c²!',
      diagram: (
        <svg viewBox="0 0 240 120" className="w-full h-28 max-w-[240px] mx-auto" fill="none">
          <polygon points="30,95 195,95 155,25" stroke="#F43F5E" strokeWidth="2.5" fill="#F43F5E" fillOpacity="0.12" />
          {/* Angle A */}
          <path d="M 55,95 A 25 25 0 0 0 48,82" stroke="#FFEA00" strokeWidth="2" fill="none" />
          <text x="60" y="88" fill="#FFEA00" fontSize="10" fontWeight="bold">Â</text>
          <text x="110" y="110" fill="#38BDF8" fontSize="11" fontWeight="bold">c</text>
          <text x="80" y="52" fill="#38BDF8" fontSize="11" fontWeight="bold">b</text>
          <text x="185" y="60" fill="#FFEA00" fontSize="12" fontWeight="bold">a (oposto)</text>
        </svg>
      )
    },
    {
      id: 6,
      badge: 'CICLO TRIGONOMÉTRICO',
      badgeColor: 'text-purple-300 border-purple-500/40 bg-purple-950/60',
      title: 'Quadrantes e Sinais',
      formula: 'Q1(+,+) • Q2(-,+) • Q3(-,-) • Q4(+,-)',
      description: 'O ciclo possui raio 1 e gira em sentido anti-horário. O eixo X representa o cosseno e o eixo Y representa o seno. A tangente é traçada na reta paralela ao eixo Y.',
      tip: 'Sinais do Seno: Positivo no 1º e 2º; Cosseno: Positivo no 1º e 4º.',
      diagram: (
        <svg viewBox="0 0 240 120" className="w-full h-28 max-w-[240px] mx-auto" fill="none">
          {/* Axis */}
          <line x1="40" y1="60" x2="200" y2="60" stroke="#475569" strokeWidth="1.5" />
          <line x1="120" y1="10" x2="120" y2="110" stroke="#475569" strokeWidth="1.5" />
          {/* Circle */}
          <circle cx="120" cy="60" r="42" stroke="#A855F7" strokeWidth="2" fill="#A855F7" fillOpacity="0.08" />
          <text x="145" y="45" fill="#00F0FF" fontSize="10" fontWeight="bold">1º Q (+,+)</text>
          <text x="65" y="45" fill="#94A3B8" fontSize="10" fontWeight="bold">2º Q (-,+)</text>
          <text x="65" y="85" fill="#94A3B8" fontSize="10" fontWeight="bold">3º Q (-,-)</text>
          <text x="145" y="85" fill="#94A3B8" fontSize="10" fontWeight="bold">4º Q (+,-)</text>
          <text x="195" y="55" fill="#A855F7" fontSize="9" fontWeight="bold">Eixo Cos</text>
          <text x="124" y="20" fill="#00F0FF" fontSize="9" fontWeight="bold">Eixo Sen</text>
        </svg>
      )
    },
    {
      id: 7,
      etapa: 'Ensino Fundamental • 6º ao 8º Ano',
      badge: 'VISUALIZAÇÃO GEOMÉTRICA',
      badgeColor: 'text-amber-300 border-amber-500/40 bg-amber-950/60',
      title: 'Malhas & Ladrilhamentos',
      formula: 'Soma dos Ângulos no Vértice = 360°',
      description: 'Padrões de ladrilhos e calçadas: para cobrir um plano sem buracos nem sobreposição, a soma dos ângulos internos em cada vértice deve totalizar exatamente 360°.',
      tip: 'Apenas 3 polígonos regulares ladrilham o plano sozinhos: triângulos (60°), quadrados (90°) e hexágonos (120°)!',
      diagram: (
        <svg viewBox="0 0 240 120" className="w-full h-28 max-w-[240px] mx-auto" fill="none">
          {/* Hexagon pattern representation */}
          <polygon points="80,30 110,30 125,55 110,80 80,80 65,55" stroke="#F59E0B" strokeWidth="2" fill="#F59E0B" fillOpacity="0.15" />
          <polygon points="125,55 155,55 170,80 155,105 125,105 110,80" stroke="#06B6D4" strokeWidth="2" fill="#06B6D4" fillOpacity="0.15" />
          <polygon points="125,55 140,30 170,30 185,55 170,80 155,55" stroke="#10B981" strokeWidth="1.5" fill="#10B981" fillOpacity="0.1" />
          <circle cx="125" cy="55" r="4" fill="#FACC15" />
          <text x="132" y="48" fill="#FACC15" fontSize="10" fontWeight="bold">360°</text>
          <text x="35" y="112" fill="#94A3B8" fontSize="9">Hexágono = 120° (120° × 3 = 360°)</text>
        </svg>
      )
    },
    {
      id: 8,
      etapa: 'Ensino Fundamental • 7º ao 9º Ano',
      badge: 'TRANSFORMAÇÕES NO PLANO',
      badgeColor: 'text-emerald-300 border-emerald-500/40 bg-emerald-950/60',
      title: 'Simetria & Reflexão no Espelho',
      formula: 'Distância Objeto = Distância Imagem',
      description: 'A reflexão sobre um eixo de simetria preserva distâncias, ângulos e áreas, apenas invertendo o sentido (lateralidade). Muito comum em mosaicos e fachadas de arquitetura.',
      tip: 'No plano cartesiano, refletir no eixo das ordenadas Y transforma o ponto (x, y) em (-x, y).',
      diagram: (
        <svg viewBox="0 0 240 120" className="w-full h-28 max-w-[240px] mx-auto" fill="none">
          {/* Mirror axis */}
          <line x1="120" y1="10" x2="120" y2="110" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 4" />
          <text x="105" y="22" fill="#38BDF8" fontSize="8" fontWeight="bold">EIXO</text>
          {/* Left triangle */}
          <polygon points="50,90 100,90 75,35" stroke="#10B981" strokeWidth="2.5" fill="#10B981" fillOpacity="0.2" />
          <text x="65" y="70" fill="#34D399" fontSize="10" fontWeight="bold">Objeto</text>
          {/* Right mirrored triangle */}
          <polygon points="190,90 140,90 165,35" stroke="#F59E0B" strokeWidth="2.5" fill="#F59E0B" fillOpacity="0.2" />
          <text x="155" y="70" fill="#FBBF24" fontSize="10" fontWeight="bold">Reflexo</text>
          {/* Equal distance arrow */}
          <line x1="75" y1="35" x2="165" y2="35" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="120" cy="35" r="2.5" fill="#FACC15" />
        </svg>
      )
    },
    {
      id: 9,
      etapa: 'Ensino Fundamental • 7º e 8º Ano',
      badge: 'PROBLEMAS DO COTIDIANO',
      badgeColor: 'text-cyan-300 border-cyan-500/40 bg-cyan-950/60',
      title: 'O Número Pi & Rodas de Bicicleta',
      formula: 'Perímetro: C = 2 · π · r = π · d',
      description: 'A razão entre a volta completa da roda e seu diâmetro sempre resulta em π (~3,14159). Uma roda de aro 26 que dá 100 voltas percorre exatamente 100 vezes o seu comprimento de borda.',
      tip: 'Para saber a distância percorrida por um veículo, meça o raio do pneu e multiplique 2πr pelo total de voltas!',
      diagram: (
        <svg viewBox="0 0 240 120" className="w-full h-28 max-w-[240px] mx-auto" fill="none">
          {/* Ground */}
          <line x1="20" y1="95" x2="220" y2="95" stroke="#64748B" strokeWidth="2" />
          {/* Wheel */}
          <circle cx="70" cy="60" r="34" stroke="#00F0FF" strokeWidth="2.5" fill="#00F0FF" fillOpacity="0.1" />
          <circle cx="70" cy="60" r="4" fill="#FFEA00" />
          <line x1="70" y1="60" x2="70" y2="26" stroke="#FFEA00" strokeWidth="2" />
          <text x="75" y="48" fill="#FFEA00" fontSize="10" fontWeight="bold">raio r</text>
          {/* Rolling path */}
          <path d="M 70,95 L 205,95" stroke="#F59E0B" strokeWidth="3" />
          <text x="100" y="112" fill="#FBBF24" fontSize="10" fontWeight="bold">1 Volta = Comprimento 2·π·r</text>
        </svg>
      )
    },
    {
      id: 10,
      etapa: 'Ensino Fundamental • 9º Ano',
      badge: 'PROPORÇÕES & SOMBRAS',
      badgeColor: 'text-orange-300 border-orange-500/40 bg-orange-950/60',
      title: 'Teorema de Tales & Altura de Prédios',
      formula: 'Altura Prédio / Sombra Prédio = Vara / Sombra Vara',
      description: 'Tales mediu as pirâmides do Egito sem subir nelas usando a sombra de uma vara. Ao mesmo instante solar, triângulos formados pelas alturas e sombras são semelhantes!',
      tip: 'Como os raios solares são paralelos ao atingirem o solo, o ângulo de elevação é o mesmo em ambos os objetos.',
      diagram: (
        <svg viewBox="0 0 240 120" className="w-full h-28 max-w-[240px] mx-auto" fill="none">
          {/* Sun */}
          <circle cx="210" cy="20" r="10" fill="#FACC15" />
          <line x1="195" y1="20" x2="30" y2="95" stroke="#FACC15" strokeWidth="1" strokeDasharray="3 3" />
          {/* Building */}
          <rect x="40" y="30" width="30" height="65" stroke="#38BDF8" strokeWidth="2" fill="#38BDF8" fillOpacity="0.2" />
          <text x="25" y="65" fill="#38BDF8" fontSize="10" fontWeight="bold">H</text>
          {/* Stick */}
          <line x1="140" y1="70" x2="140" y2="95" stroke="#10B981" strokeWidth="3" />
          <text x="145" y="82" fill="#10B981" fontSize="10" fontWeight="bold">h</text>
          {/* Ground */}
          <line x1="20" y1="95" x2="220" y2="95" stroke="#64748B" strokeWidth="2" />
          <text x="75" y="110" fill="#94A3B8" fontSize="9">Sombra Maior</text>
          <text x="155" y="110" fill="#94A3B8" fontSize="9">Sombra Vara</text>
        </svg>
      )
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotation every 8 seconds for comfortable reading
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 8000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, cards.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const current = cards[currentIndex];

  return (
    <div
      className="bg-[#060a18]/95 p-4 sm:p-5 rounded-3xl shadow-[0_0_30px_rgba(0,240,255,0.22)] w-full max-w-md border-2 border-cyan-500/50 flex flex-col items-center relative overflow-hidden transition-all"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Top Header */}
      <div className="w-full flex items-center justify-between border-b border-cyan-500/30 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
          <span className="text-xs font-black tracking-wider uppercase font-mono text-cyan-300 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-cyan-400" /> GEOMETRIA & TRIGONOMETRIA • EF & EM
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#0e172e] border border-cyan-500/30 text-amber-300 font-bold">
            {currentIndex + 1} / {cards.length}
          </span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pausar auto-rotação' : 'Continuar auto-rotação'}
            className="text-slate-400 hover:text-cyan-300 p-1 rounded-lg transition cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* Card Content with subtle animation key */}
      <div key={current.id} className="w-full space-y-3 animate-in fade-in duration-300">
        {/* Card Header & Badges (Mostrando a Etapa/Série Atual) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between flex-wrap gap-1.5">
            <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${current.badgeColor} uppercase tracking-wider`}>
              {current.badge}
            </span>
            <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> Rotação 8s
            </span>
          </div>

          {current.etapa && (
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
                📌 {current.etapa}
              </span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
          {current.title}
        </h3>

        {/* Diagram Area */}
        <div className="bg-[#030611] rounded-2xl p-2.5 border border-cyan-500/25 shadow-inner flex items-center justify-center">
          {current.diagram}
        </div>

        {/* Formula Box in Neon Yellow */}
        <div className="bg-[#0a1226] border border-amber-400/40 rounded-xl px-3 py-2 text-center shadow-[0_0_15px_rgba(255,234,0,0.15)]">
          <span className="text-xs sm:text-sm font-black font-mono text-[#FFEA00] tracking-wide neon-glow-yellow">
            {current.formula}
          </span>
        </div>

        {/* Description & Detective Tip */}
        <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">
          {current.description}
        </p>
        <div className="text-[11px] text-amber-200/90 bg-amber-950/30 border border-amber-500/20 px-2.5 py-1.5 rounded-xl font-medium">
          💡 {current.tip}
        </div>
      </div>

      {/* Bottom Controls and Indicators */}
      <div className="w-full flex items-center justify-between pt-3 mt-2 border-t border-cyan-500/20">
        <button
          onClick={handlePrev}
          aria-label="Card anterior"
          className="p-1.5 rounded-xl bg-[#091124] hover:bg-cyan-950 border border-cyan-500/30 text-cyan-300 transition cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Dot Indicators */}
        <div className="flex items-center gap-1.5">
          {cards.map((card, idx) => (
            <button
              key={card.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ir para card ${idx + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'w-6 bg-[#FFEA00] shadow-[0_0_10px_rgba(255,234,0,0.8)]'
                  : 'w-2 bg-slate-700 hover:bg-cyan-400/60'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Próximo card"
          className="p-1.5 rounded-xl bg-[#091124] hover:bg-cyan-950 border border-cyan-500/30 text-cyan-300 transition cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
