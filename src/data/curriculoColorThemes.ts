export interface AulaColorTheme {
  numero: number;
  nomeCor: string;
  primaryHex: string;
  // Tailwind utility classes
  textAccent: string;
  textLight: string;
  badgeBg: string;
  badgeBorder: string;
  cardBorder: string;
  cardBorderHover: string;
  cardGlow: string;
  cardHeroGradient: string;
  buttonGradient: string;
  accentBar: string;
  iconBg: string;
}

export const AULA_COLOR_THEMES: Record<number, AulaColorTheme> = {
  // 1: Ciano Neon Elétrico
  1: {
    numero: 1,
    nomeCor: "Ciano Neon Elétrico",
    primaryHex: "#00F0FF",
    textAccent: "text-cyan-400",
    textLight: "text-cyan-100",
    badgeBg: "bg-cyan-950/80",
    badgeBorder: "border-cyan-400/50",
    cardBorder: "border-cyan-400/50",
    cardBorderHover: "hover:border-cyan-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.35)]",
    cardGlow: "shadow-[0_0_25px_rgba(0,240,255,0.25)]",
    cardHeroGradient: "from-cyan-950/80 via-slate-900 to-[#02101e]",
    buttonGradient: "bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black",
    accentBar: "bg-cyan-400",
    iconBg: "bg-cyan-500/20 text-cyan-300 border-cyan-400/50"
  },

  // 2: Verde Lima Radiante
  2: {
    numero: 2,
    nomeCor: "Verde Lima Radiante",
    primaryHex: "#84CC16",
    textAccent: "text-lime-400",
    textLight: "text-lime-100",
    badgeBg: "bg-lime-950/80",
    badgeBorder: "border-lime-400/50",
    cardBorder: "border-lime-400/50",
    cardBorderHover: "hover:border-lime-300 hover:shadow-[0_0_30px_rgba(132,204,22,0.35)]",
    cardGlow: "shadow-[0_0_25px_rgba(132,204,22,0.25)]",
    cardHeroGradient: "from-lime-950/80 via-slate-900 to-[#081502]",
    buttonGradient: "bg-gradient-to-r from-lime-400 to-emerald-500 hover:from-lime-300 hover:to-emerald-400 text-slate-950 font-black",
    accentBar: "bg-lime-400",
    iconBg: "bg-lime-500/20 text-lime-300 border-lime-400/50"
  },

  // 3: Amarelo Solar Puro
  3: {
    numero: 3,
    nomeCor: "Amarelo Solar Puro",
    primaryHex: "#FACC15",
    textAccent: "text-yellow-400",
    textLight: "text-yellow-100",
    badgeBg: "bg-yellow-950/80",
    badgeBorder: "border-yellow-400/50",
    cardBorder: "border-yellow-400/50",
    cardBorderHover: "hover:border-yellow-300 hover:shadow-[0_0_30px_rgba(250,204,21,0.35)]",
    cardGlow: "shadow-[0_0_25px_rgba(250,204,21,0.25)]",
    cardHeroGradient: "from-yellow-950/80 via-slate-900 to-[#141002]",
    buttonGradient: "bg-gradient-to-r from-yellow-300 to-amber-500 hover:from-yellow-200 hover:to-amber-400 text-slate-950 font-black",
    accentBar: "bg-yellow-400",
    iconBg: "bg-yellow-400/20 text-yellow-300 border-yellow-400/50"
  },

  // 4: Laranja Fogo Intenso
  4: {
    numero: 4,
    nomeCor: "Laranja Fogo Intenso",
    primaryHex: "#FF6B00",
    textAccent: "text-orange-400",
    textLight: "text-orange-100",
    badgeBg: "bg-orange-950/80",
    badgeBorder: "border-orange-500/50",
    cardBorder: "border-orange-500/50",
    cardBorderHover: "hover:border-orange-400 hover:shadow-[0_0_30px_rgba(255,107,0,0.35)]",
    cardGlow: "shadow-[0_0_25px_rgba(255,107,0,0.25)]",
    cardHeroGradient: "from-orange-950/80 via-slate-900 to-[#180902]",
    buttonGradient: "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-slate-950 font-black",
    accentBar: "bg-orange-400",
    iconBg: "bg-orange-500/20 text-orange-300 border-orange-400/50"
  },

  // 5: Hot Pink / Rosa Choque
  5: {
    numero: 5,
    nomeCor: "Hot Pink / Rosa Choque",
    primaryHex: "#FF1493",
    textAccent: "text-pink-400",
    textLight: "text-pink-100",
    badgeBg: "bg-pink-950/80",
    badgeBorder: "border-pink-500/50",
    cardBorder: "border-pink-500/50",
    cardBorderHover: "hover:border-pink-400 hover:shadow-[0_0_30px_rgba(255,20,147,0.35)]",
    cardGlow: "shadow-[0_0_25px_rgba(255,20,147,0.25)]",
    cardHeroGradient: "from-pink-950/80 via-slate-900 to-[#1c0211]",
    buttonGradient: "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-black",
    accentBar: "bg-pink-500",
    iconBg: "bg-pink-500/20 text-pink-300 border-pink-400/50"
  },

  // 6: Roxo Elétrico / Violeta
  6: {
    numero: 6,
    nomeCor: "Roxo Elétrico / Violeta",
    primaryHex: "#8B5CF6",
    textAccent: "text-violet-400",
    textLight: "text-violet-100",
    badgeBg: "bg-violet-950/80",
    badgeBorder: "border-violet-500/50",
    cardBorder: "border-violet-500/50",
    cardBorderHover: "hover:border-violet-400 hover:shadow-[0_0_30px_rgba(139,92,246,0.35)]",
    cardGlow: "shadow-[0_0_25px_rgba(139,92,246,0.25)]",
    cardHeroGradient: "from-violet-950/80 via-slate-900 to-[#11051e]",
    buttonGradient: "bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 text-white font-black",
    accentBar: "bg-violet-400",
    iconBg: "bg-violet-500/20 text-violet-300 border-violet-400/50"
  },

  // 7: Azul Royal Elétrico
  7: {
    numero: 7,
    nomeCor: "Azul Royal Elétrico",
    primaryHex: "#3B82F6",
    textAccent: "text-blue-400",
    textLight: "text-blue-100",
    badgeBg: "bg-blue-950/80",
    badgeBorder: "border-blue-500/50",
    cardBorder: "border-blue-500/50",
    cardBorderHover: "hover:border-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.35)]",
    cardGlow: "shadow-[0_0_25px_rgba(59,130,246,0.25)]",
    cardHeroGradient: "from-blue-950/80 via-slate-900 to-[#030e22]",
    buttonGradient: "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-black",
    accentBar: "bg-blue-400",
    iconBg: "bg-blue-500/20 text-blue-300 border-blue-400/50"
  },

  // 8: Esmeralda Neon Brilhante (Verificação 1)
  8: {
    numero: 8,
    nomeCor: "Esmeralda Neon Brilhante (Verificação 1)",
    primaryHex: "#10B981",
    textAccent: "text-emerald-400",
    textLight: "text-emerald-100",
    badgeBg: "bg-emerald-950/80",
    badgeBorder: "border-emerald-400/60",
    cardBorder: "border-emerald-400/60",
    cardBorderHover: "hover:border-emerald-300 hover:shadow-[0_0_35px_rgba(16,185,129,0.4)]",
    cardGlow: "shadow-[0_0_30px_rgba(16,185,129,0.3)]",
    cardHeroGradient: "from-emerald-950/80 via-slate-900 to-[#021810]",
    buttonGradient: "bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-black",
    accentBar: "bg-emerald-400",
    iconBg: "bg-emerald-500/25 text-emerald-300 border-emerald-400/60"
  },

  // 9: Fúcsia Radiante
  9: {
    numero: 9,
    nomeCor: "Fúcsia Radiante",
    primaryHex: "#D946EF",
    textAccent: "text-fuchsia-400",
    textLight: "text-fuchsia-100",
    badgeBg: "bg-fuchsia-950/80",
    badgeBorder: "border-fuchsia-500/50",
    cardBorder: "border-fuchsia-500/50",
    cardBorderHover: "hover:border-fuchsia-400 hover:shadow-[0_0_30px_rgba(217,70,239,0.35)]",
    cardGlow: "shadow-[0_0_25px_rgba(217,70,239,0.25)]",
    cardHeroGradient: "from-fuchsia-950/80 via-slate-900 to-[#1a021c]",
    buttonGradient: "bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-400 hover:to-pink-400 text-white font-black",
    accentBar: "bg-fuchsia-400",
    iconBg: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/50"
  },

  // 10: Azul Turquesa Caribe
  10: {
    numero: 10,
    nomeCor: "Azul Turquesa Caribe",
    primaryHex: "#06B6D4",
    textAccent: "text-cyan-300",
    textLight: "text-cyan-100",
    badgeBg: "bg-cyan-950/80",
    badgeBorder: "border-cyan-500/50",
    cardBorder: "border-cyan-500/50",
    cardBorderHover: "hover:border-cyan-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.35)]",
    cardGlow: "shadow-[0_0_25px_rgba(6,182,212,0.25)]",
    cardHeroGradient: "from-cyan-950/80 via-slate-900 to-[#01141a]",
    buttonGradient: "bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-300 hover:to-cyan-400 text-slate-950 font-black",
    accentBar: "bg-cyan-400",
    iconBg: "bg-cyan-500/20 text-cyan-200 border-cyan-400/50"
  },

  // 11: Coral Luminoso
  11: {
    numero: 11,
    nomeCor: "Coral Luminoso",
    primaryHex: "#FB7185",
    textAccent: "text-rose-400",
    textLight: "text-rose-100",
    badgeBg: "bg-rose-950/80",
    badgeBorder: "border-rose-400/50",
    cardBorder: "border-rose-400/50",
    cardBorderHover: "hover:border-rose-300 hover:shadow-[0_0_30px_rgba(251,113,133,0.35)]",
    cardGlow: "shadow-[0_0_25px_rgba(251,113,133,0.25)]",
    cardHeroGradient: "from-rose-950/80 via-slate-900 to-[#1c060a]",
    buttonGradient: "bg-gradient-to-r from-rose-400 to-orange-400 hover:from-rose-300 hover:to-orange-300 text-slate-950 font-black",
    accentBar: "bg-rose-400",
    iconBg: "bg-rose-500/20 text-rose-300 border-rose-400/50"
  },

  // 12: Ouro Imperial Nobre (Revisão 2)
  12: {
    numero: 12,
    nomeCor: "Ouro Imperial Nobre (Revisão 2)",
    primaryHex: "#EAB308",
    textAccent: "text-amber-300",
    textLight: "text-amber-100",
    badgeBg: "bg-amber-950/80",
    badgeBorder: "border-amber-400/60",
    cardBorder: "border-amber-400/60",
    cardBorderHover: "hover:border-yellow-300 hover:shadow-[0_0_35px_rgba(234,179,8,0.4)]",
    cardGlow: "shadow-[0_0_30px_rgba(234,179,8,0.3)]",
    cardHeroGradient: "from-amber-950/80 via-slate-900 to-[#191002]",
    buttonGradient: "bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black",
    accentBar: "bg-amber-400",
    iconBg: "bg-amber-400/25 text-amber-300 border-amber-400/60"
  },

  // 13: Vermelho Escarlate Neon
  13: {
    numero: 13,
    nomeCor: "Vermelho Escarlate Neon",
    primaryHex: "#EF4444",
    textAccent: "text-red-400",
    textLight: "text-red-100",
    badgeBg: "bg-red-950/80",
    badgeBorder: "border-red-500/50",
    cardBorder: "border-red-500/50",
    cardBorderHover: "hover:border-red-400 hover:shadow-[0_0_30px_rgba(239,68,68,0.35)]",
    cardGlow: "shadow-[0_0_25px_rgba(239,68,68,0.25)]",
    cardHeroGradient: "from-red-950/80 via-slate-900 to-[#1f0406]",
    buttonGradient: "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 text-white font-black",
    accentBar: "bg-red-500",
    iconBg: "bg-red-500/20 text-red-300 border-red-400/50"
  },

  // 14: Verde Menta Brilhante
  14: {
    numero: 14,
    nomeCor: "Verde Menta Brilhante",
    primaryHex: "#2DD4BF",
    textAccent: "text-teal-300",
    textLight: "text-teal-100",
    badgeBg: "bg-teal-950/80",
    badgeBorder: "border-teal-400/50",
    cardBorder: "border-teal-400/50",
    cardBorderHover: "hover:border-teal-200 hover:shadow-[0_0_30px_rgba(45,212,191,0.35)]",
    cardGlow: "shadow-[0_0_25px_rgba(45,212,191,0.25)]",
    cardHeroGradient: "from-teal-950/80 via-slate-900 to-[#021816]",
    buttonGradient: "bg-gradient-to-r from-teal-300 to-emerald-400 hover:from-teal-200 hover:to-emerald-300 text-slate-950 font-black",
    accentBar: "bg-teal-300",
    iconBg: "bg-teal-400/20 text-teal-200 border-teal-300/50"
  },

  // 15: Índigo Galáctico
  15: {
    numero: 15,
    nomeCor: "Índigo Galáctico",
    primaryHex: "#6366F1",
    textAccent: "text-indigo-400",
    textLight: "text-indigo-100",
    badgeBg: "bg-indigo-950/80",
    badgeBorder: "border-indigo-500/50",
    cardBorder: "border-indigo-500/50",
    cardBorderHover: "hover:border-indigo-400 hover:shadow-[0_0_30px_rgba(99,102,241,0.35)]",
    cardGlow: "shadow-[0_0_25px_rgba(99,102,241,0.25)]",
    cardHeroGradient: "from-indigo-950/80 via-slate-900 to-[#0b0524]",
    buttonGradient: "bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-black",
    accentBar: "bg-indigo-400",
    iconBg: "bg-indigo-500/20 text-indigo-300 border-indigo-400/50"
  },

  // 16: Magenta Choque (Verificação 2)
  16: {
    numero: 16,
    nomeCor: "Magenta Choque (Verificação 2)",
    primaryHex: "#EC4899",
    textAccent: "text-pink-400",
    textLight: "text-pink-100",
    badgeBg: "bg-pink-950/80",
    badgeBorder: "border-pink-500/60",
    cardBorder: "border-pink-500/60",
    cardBorderHover: "hover:border-pink-300 hover:shadow-[0_0_35px_rgba(236,72,153,0.4)]",
    cardGlow: "shadow-[0_0_30px_rgba(236,72,153,0.3)]",
    cardHeroGradient: "from-pink-950/80 via-slate-900 to-[#220316]",
    buttonGradient: "bg-gradient-to-r from-pink-500 to-fuchsia-600 hover:from-pink-400 hover:to-fuchsia-500 text-white font-black",
    accentBar: "bg-pink-500",
    iconBg: "bg-pink-500/25 text-pink-300 border-pink-400/60"
  },

  // 17: Azul Celeste Céu
  17: {
    numero: 17,
    nomeCor: "Azul Celeste Céu",
    primaryHex: "#0EA5E9",
    textAccent: "text-sky-400",
    textLight: "text-sky-100",
    badgeBg: "bg-sky-950/80",
    badgeBorder: "border-sky-400/50",
    cardBorder: "border-sky-400/50",
    cardBorderHover: "hover:border-sky-300 hover:shadow-[0_0_30px_rgba(14,165,233,0.35)]",
    cardGlow: "shadow-[0_0_25px_rgba(14,165,233,0.25)]",
    cardHeroGradient: "from-sky-950/80 via-slate-900 to-[#02131f]",
    buttonGradient: "bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-black",
    accentBar: "bg-sky-400",
    iconBg: "bg-sky-400/20 text-sky-300 border-sky-400/50"
  },

  // 18: Tangerina Solar
  18: {
    numero: 18,
    nomeCor: "Tangerina Solar",
    primaryHex: "#F97316",
    textAccent: "text-amber-400",
    textLight: "text-amber-100",
    badgeBg: "bg-orange-950/80",
    badgeBorder: "border-orange-500/50",
    cardBorder: "border-orange-500/50",
    cardBorderHover: "hover:border-orange-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.35)]",
    cardGlow: "shadow-[0_0_25px_rgba(249,115,22,0.25)]",
    cardHeroGradient: "from-orange-950/80 via-slate-900 to-[#180902]",
    buttonGradient: "bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-400 hover:to-amber-300 text-slate-950 font-black",
    accentBar: "bg-orange-400",
    iconBg: "bg-orange-500/20 text-amber-300 border-orange-400/50"
  },

  // 19: Púrpura Místico
  19: {
    numero: 19,
    nomeCor: "Púrpura Místico",
    primaryHex: "#A855F7",
    textAccent: "text-purple-400",
    textLight: "text-purple-100",
    badgeBg: "bg-purple-950/80",
    badgeBorder: "border-purple-500/50",
    cardBorder: "border-purple-500/50",
    cardBorderHover: "hover:border-purple-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.35)]",
    cardGlow: "shadow-[0_0_25px_rgba(168,85,247,0.25)]",
    cardHeroGradient: "from-purple-950/80 via-slate-900 to-[#150422]",
    buttonGradient: "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-black",
    accentBar: "bg-purple-400",
    iconBg: "bg-purple-500/20 text-purple-300 border-purple-400/50"
  },

  // 20: Verde Chartreuse Primavera (Revisão 3)
  20: {
    numero: 20,
    nomeCor: "Verde Chartreuse Primavera (Revisão 3)",
    primaryHex: "#A3E635",
    textAccent: "text-lime-300",
    textLight: "text-lime-100",
    badgeBg: "bg-lime-950/80",
    badgeBorder: "border-lime-400/60",
    cardBorder: "border-lime-400/60",
    cardBorderHover: "hover:border-lime-200 hover:shadow-[0_0_35px_rgba(163,230,53,0.4)]",
    cardGlow: "shadow-[0_0_30px_rgba(163,230,53,0.3)]",
    cardHeroGradient: "from-lime-950/80 via-slate-900 to-[#0e1903]",
    buttonGradient: "bg-gradient-to-r from-lime-400 to-teal-400 hover:from-lime-300 hover:to-teal-300 text-slate-950 font-black",
    accentBar: "bg-lime-300",
    iconBg: "bg-lime-400/25 text-lime-200 border-lime-300/60"
  },

  // 21: Rubi Carmesim Lapidado
  21: {
    numero: 21,
    nomeCor: "Rubi Carmesim Lapidado",
    primaryHex: "#F43F5E",
    textAccent: "text-rose-400",
    textLight: "text-rose-100",
    badgeBg: "bg-rose-950/80",
    badgeBorder: "border-rose-500/50",
    cardBorder: "border-rose-500/50",
    cardBorderHover: "hover:border-rose-300 hover:shadow-[0_0_30px_rgba(244,63,94,0.35)]",
    cardGlow: "shadow-[0_0_25px_rgba(244,63,94,0.25)]",
    cardHeroGradient: "from-rose-950/80 via-slate-900 to-[#1e020a]",
    buttonGradient: "bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white font-black",
    accentBar: "bg-rose-400",
    iconBg: "bg-rose-500/20 text-rose-300 border-rose-400/50"
  },

  // 22: Safira Noturna Profunda
  22: {
    numero: 22,
    nomeCor: "Safira Noturna Profunda",
    primaryHex: "#2563EB",
    textAccent: "text-blue-300",
    textLight: "text-blue-100",
    badgeBg: "bg-blue-950/80",
    badgeBorder: "border-blue-500/50",
    cardBorder: "border-blue-500/50",
    cardBorderHover: "hover:border-blue-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.35)]",
    cardGlow: "shadow-[0_0_25px_rgba(37,99,235,0.25)]",
    cardHeroGradient: "from-blue-950/80 via-slate-900 to-[#020b24]",
    buttonGradient: "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black",
    accentBar: "bg-blue-400",
    iconBg: "bg-blue-600/20 text-blue-300 border-blue-400/50"
  },

  // 23: Orquídea Elétrica
  23: {
    numero: 23,
    nomeCor: "Orquídea Elétrica",
    primaryHex: "#C026D3",
    textAccent: "text-fuchsia-300",
    textLight: "text-fuchsia-100",
    badgeBg: "bg-fuchsia-950/80",
    badgeBorder: "border-fuchsia-500/50",
    cardBorder: "border-fuchsia-500/50",
    cardBorderHover: "hover:border-fuchsia-300 hover:shadow-[0_0_30px_rgba(192,38,211,0.35)]",
    cardGlow: "shadow-[0_0_25px_rgba(192,38,211,0.25)]",
    cardHeroGradient: "from-fuchsia-950/80 via-slate-900 to-[#18011c]",
    buttonGradient: "bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-black",
    accentBar: "bg-fuchsia-400",
    iconBg: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/50"
  },

  // 24: Grande Ouro Diamante Multicor (Coroação Final)
  24: {
    numero: 24,
    nomeCor: "Grande Ouro Diamante Multicor (Verificação Final)",
    primaryHex: "#FFD700",
    textAccent: "text-yellow-300",
    textLight: "text-yellow-100",
    badgeBg: "bg-gradient-to-r from-yellow-950/90 via-amber-950/90 to-rose-950/90",
    badgeBorder: "border-yellow-400/80",
    cardBorder: "border-yellow-400/80",
    cardBorderHover: "hover:border-yellow-200 hover:shadow-[0_0_40px_rgba(255,215,0,0.45)]",
    cardGlow: "shadow-[0_0_35px_rgba(255,215,0,0.35)]",
    cardHeroGradient: "from-yellow-950/85 via-slate-900 to-[#220014]",
    buttonGradient: "bg-gradient-to-r from-yellow-300 via-amber-400 to-pink-500 hover:from-yellow-200 hover:to-pink-400 text-slate-950 font-black shadow-xl",
    accentBar: "bg-yellow-300",
    iconBg: "bg-yellow-400/30 text-yellow-200 border-yellow-300/70"
  }
};

export function getAulaColorTheme(aulaNumero: number): AulaColorTheme {
  const num = ((aulaNumero - 1) % 24) + 1;
  return AULA_COLOR_THEMES[num] || AULA_COLOR_THEMES[1];
}
