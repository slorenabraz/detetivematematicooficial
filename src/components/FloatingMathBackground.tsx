import React from 'react';

export const FloatingMathBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. Wireframe Icosahedron Top-Left */}
      <div className="absolute top-[8%] left-[4%] animate-float-1 opacity-25 hover:opacity-60 transition duration-700">
        <svg width="110" height="110" viewBox="0 0 100 100" fill="none">
          <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" stroke="#00F0FF" strokeWidth="1.5" fill="#00F0FF" fillOpacity="0.05" />
          <polygon points="50,25 75,40 75,60 50,75 25,60 25,40" stroke="#38BDF8" strokeWidth="1" fill="none" />
          <line x1="50" y1="10" x2="50" y2="25" stroke="#00F0FF" strokeWidth="1.2" />
          <line x1="90" y1="30" x2="75" y2="40" stroke="#00F0FF" strokeWidth="1.2" />
          <line x1="90" y1="70" x2="75" y2="60" stroke="#00F0FF" strokeWidth="1.2" />
          <line x1="50" y1="90" x2="50" y2="75" stroke="#00F0FF" strokeWidth="1.2" />
          <line x1="10" y1="70" x2="25" y2="60" stroke="#00F0FF" strokeWidth="1.2" />
          <line x1="10" y1="30" x2="25" y2="40" stroke="#00F0FF" strokeWidth="1.2" />
        </svg>
      </div>

      {/* 2. Floating Golden Wireframe Cube Top-Right */}
      <div className="absolute top-[12%] right-[6%] animate-float-2 opacity-25 hover:opacity-60 transition duration-700">
        <svg width="95" height="95" viewBox="0 0 100 100" fill="none">
          <polygon points="50,15 85,32 85,68 50,85 15,68 15,32" stroke="#FFBC00" strokeWidth="1.5" fill="#FFBC00" fillOpacity="0.05" />
          <line x1="50" y1="15" x2="50" y2="52" stroke="#FFBC00" strokeWidth="1.2" />
          <line x1="85" y1="32" x2="50" y2="52" stroke="#FFBC00" strokeWidth="1.2" />
          <line x1="15" y1="32" x2="50" y2="52" stroke="#FFBC00" strokeWidth="1.2" />
          <line x1="50" y1="52" x2="50" y2="85" stroke="#FFBC00" strokeWidth="1.2" />
        </svg>
      </div>

      {/* 3. Floating Pythagorean Triangle Middle-Left */}
      <div className="absolute top-[42%] left-[2%] animate-float-3 opacity-20 hover:opacity-50 transition duration-700">
        <svg width="120" height="90" viewBox="0 0 120 90" fill="none">
          <path d="M 15,75 L 105,75 L 15,15 Z" stroke="#00F0FF" strokeWidth="1.8" fill="#00F0FF" fillOpacity="0.08" />
          <rect x="15" y="60" width="15" height="15" stroke="#38BDF8" strokeWidth="1" fill="none" />
          <circle cx="22" cy="67" r="2" fill="#00F0FF" />
          <text x="50" y="86" fill="#38BDF8" fontSize="10" fontWeight="bold">a² + b² = c²</text>
        </svg>
      </div>

      {/* 4. Floating Neon Formula: sen² + cos² = 1 Center-Right */}
      <div className="absolute top-[48%] right-[3%] animate-float-1 opacity-25 hover:opacity-60 transition duration-700 font-mono text-xs font-bold text-cyan-300 bg-[#070d1e]/40 p-2.5 rounded-xl border border-cyan-500/20 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
        <span>sen²(θ) + cos²(θ) = 1</span>
      </div>

      {/* 5. Floating Square Root of Pi & Dodecahedron Bottom-Left */}
      <div className="absolute bottom-[18%] left-[5%] animate-float-2 opacity-20 hover:opacity-50 transition duration-700">
        <div className="flex flex-col items-center gap-1">
          <svg width="70" height="70" viewBox="0 0 80 80" fill="none">
            <polygon points="40,8 72,28 60,68 20,68 8,28" stroke="#E11D48" strokeWidth="1.5" fill="#E11D48" fillOpacity="0.05" />
            <polygon points="40,22 58,35 50,58 30,58 22,35" stroke="#FB7185" strokeWidth="1" fill="none" />
          </svg>
          <span className="font-mono text-xs text-rose-400 font-extrabold">√π ≈ 1.772</span>
        </div>
      </div>

      {/* 6. Floating Math Equations Bottom-Right */}
      <div className="absolute bottom-[14%] right-[5%] animate-float-3 opacity-25 hover:opacity-60 transition duration-700 font-mono text-xs font-bold text-amber-300 bg-[#070d1e]/40 p-2.5 rounded-xl border border-amber-500/20 shadow-[0_0_15px_rgba(251,191,36,0.15)]">
        <div>a / sen(A) = 2R</div>
        <div className="text-[10px] text-cyan-300 mt-1">∑ [ 1, 2, 3... n ]</div>
      </div>

      {/* 7. Floating Sine Wave Mid-Screen */}
      <div className="absolute top-[28%] left-[45%] animate-float-2 opacity-15 pointer-events-none">
        <svg width="180" height="50" viewBox="0 0 180 50" fill="none">
          <path d="M 0,25 Q 45,0 90,25 T 180,25" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 4" fill="none" />
          <circle cx="45" cy="12" r="3" fill="#FFBC00" />
          <circle cx="135" cy="38" r="3" fill="#00F0FF" />
        </svg>
      </div>

      {/* 8. Floating Matrix & Delta Symbol Center-Left */}
      <div className="absolute top-[65%] left-[12%] animate-float-1 opacity-20 font-mono text-[11px] text-emerald-400">
        <div>∆ = b² - 4ac</div>
        <div className="text-[10px] text-slate-400 mt-0.5">λ₁ = 5, λ₂ = -3</div>
      </div>

      {/* 9. Floating Gear Hologram Bottom-Center */}
      <div className="absolute bottom-[6%] left-[42%] animate-float-3 opacity-15">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="30" stroke="#FFBC00" strokeWidth="2" strokeDasharray="6 3" />
          <circle cx="40" cy="40" r="16" stroke="#00F0FF" strokeWidth="1.5" />
          <circle cx="40" cy="40" r="6" fill="#FFBC00" />
        </svg>
      </div>
    </div>
  );
};
