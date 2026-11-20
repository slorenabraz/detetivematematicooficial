/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User, Question } from './types';
import { Storage } from './utils/storage';
import { getAppUrl } from './utils/env';
import {
  generateOfficialQuestionsSession,
  generatePracticeQuestionsSession
} from './data/questions';

import { Header } from './components/Header';
import { FloatingMathBackground } from './components/FloatingMathBackground';
import { HomeTab } from './components/HomeTab';
import { ChallengesTab } from './components/ChallengesTab';
import { RankingTab } from './components/RankingTab';
import { TeacherDashboardTab } from './components/TeacherDashboardTab';
import { MyResultsTab } from './components/MyResultsTab';
import { SupportMaterialsTab } from './components/SupportMaterialsTab';
import { CurriculoAcaoTab } from './components/CurriculoAcaoTab';
import { AuthModalOrTab } from './components/AuthModalOrTab';
import { AdminDashboardTab } from './components/AdminDashboardTab';
import { GuidedTourModal } from './components/GuidedTourModal';
import { Play } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('inicio');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);

  // Dynamic question pools generated per login / session
  const [officialQuestions, setOfficialQuestions] = useState<Record<number, Question[]>>(() =>
    generateOfficialQuestionsSession()
  );
  const [practiceQuestions, setPracticeQuestions] = useState<Question[]>(() =>
    generatePracticeQuestionsSession()
  );

  // Post-login confirmation modal
  const [showPostLoginModal, setShowPostLoginModal] = useState<boolean>(false);

  // Load session user on startup, sync public APP_URL metadata, and sync question overrides
  useEffect(() => {
    const appUrl = getAppUrl();
    if (appUrl && typeof document !== 'undefined') {
      let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
      if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrl);
      }
      ogUrl.setAttribute('content', appUrl);
    }

    const user = Storage.getSessionUser();
    if (user) {
      setCurrentUser(user);
    }

    let lastOverrideSig = Storage.getQuestionOverrides()
      .map((o) => `${o.id}:${o.updatedAt}`)
      .sort()
      .join('|');

    const unsubscribe = Storage.subscribe(() => {
      const nextSig = Storage.getQuestionOverrides()
        .map((o) => `${o.id}:${o.updatedAt}`)
        .sort()
        .join('|');
      if (nextSig !== lastOverrideSig) {
        lastOverrideSig = nextSig;
        setOfficialQuestions(generateOfficialQuestionsSession());
        setPracticeQuestions(generatePracticeQuestionsSession());
      }
    });

    return unsubscribe;
  }, []);

  // Regenerates questions whenever a user logs in (or upon explicit refresh)
  const refreshQuestions = () => {
    setOfficialQuestions(generateOfficialQuestionsSession());
    setPracticeQuestions(generatePracticeQuestionsSession());
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    refreshQuestions();
    setShowPostLoginModal(true);
  };

  const handleLogout = () => {
    Storage.setSessionUser(null);
    setCurrentUser(null);
    refreshQuestions();
    setCurrentPage('inicio');
  };

  const handleConfirmStartChallenge = (goHome: boolean) => {
    setShowPostLoginModal(false);
    if (goHome) {
      setCurrentPage('inicio');
    } else {
      setCurrentPage('inicio');
    }
  };

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col antialiased selection:bg-cyan-500 selection:text-slate-950 relative">
      {/* Floating mathematical shapes in the background of the whole page */}
        <FloatingMathBackground />

        {/* POST-LOGIN CONFIRMATION MODAL - Cyber HUD styling */}
        {showPostLoginModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#0b1329] rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-4 shadow-[0_0_40px_rgba(0,240,255,0.3)] border-2 border-cyan-400 animate-in fade-in zoom-in duration-200">
              <div className="text-5xl filter drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]">🕵️‍♂️</div>
              <h3 className="text-2xl font-black text-white">
                Bem-vindo(a), Detetive {currentUser?.nome.split(' ')[0]}!
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Login realizado com sucesso! Todos os desafios, trilhas do Currículo em Ação e materiais de apoio estão prontos para você.
              </p>
              <div className="flex flex-wrap gap-3 justify-center pt-3">
                {currentUser?.tipo === 'admin' && (
                  <button
                    onClick={() => {
                      setShowPostLoginModal(false);
                      setCurrentPage('admin');
                    }}
                    className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black px-5 py-2.5 rounded-2xl text-xs sm:text-sm border-2 border-amber-200/80 transition flex items-center gap-2 cursor-pointer"
                  >
                    Painel Administrador
                  </button>
                )}
                <button
                  onClick={() => handleConfirmStartChallenge(true)}
                  className="bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-500 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-black px-6 py-2.5 rounded-2xl text-xs sm:text-sm border-2 border-cyan-200/80 neon-glow-btn-cyan transition flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-slate-950" /> Conheça o site
                </button>
              </div>
            </div>
          </div>
        )}

        {/* HEADER WITH GAMING HUD & 3D NEON TITLE */}
        <Header
          currentPage={currentPage}
          onNavigate={(page) => setCurrentPage(page)}
          currentUser={currentUser}
          onLogout={handleLogout}
          onOpenAuth={() => setCurrentPage('auth')}
          onOpenTour={() => setIsTourOpen(true)}
        />

        {/* GUIDED TOUR MODAL - Mounted at root with z-[9999] so it is strictly in foreground and menu/site in background */}
        <GuidedTourModal
          isOpen={isTourOpen}
          onClose={() => setIsTourOpen(false)}
          onNavigate={(page) => {
            setCurrentPage(page);
            setIsTourOpen(false);
          }}
        />

        {/* MAIN CONTENT AREA */}
        <main className="max-w-7xl mx-auto px-4 py-4 sm:py-6 flex-grow w-full relative z-10">
          {currentPage === 'inicio' && (
            <HomeTab
              onNavigate={(page) => setCurrentPage(page)}
              onOpenTour={() => setIsTourOpen(true)}
            />
          )}

          {currentPage === 'desafios' && (
            <ChallengesTab
              currentUser={currentUser}
              onOpenAuth={() => setCurrentPage('auth')}
              onNavigate={(page) => setCurrentPage(page)}
              officialQuestions={officialQuestions}
              practiceQuestions={practiceQuestions}
              onRefreshQuestions={refreshQuestions}
            />
          )}

          {currentPage === 'curriculo' && (
            <CurriculoAcaoTab
              currentUser={currentUser}
              onOpenAuth={() => setCurrentPage('auth')}
              onNavigate={(page) => setCurrentPage(page)}
            />
          )}

          {currentPage === 'ranking' && (
            <RankingTab currentUser={currentUser} />
          )}

          {currentPage === 'professores' && (
            <TeacherDashboardTab
              currentUser={currentUser}
              onOpenAuth={() => setCurrentPage('auth')}
            />
          )}

          {currentPage === 'resultados' && (
            <MyResultsTab
              currentUser={currentUser}
              onOpenAuth={() => setCurrentPage('auth')}
              onNavigate={(page) => setCurrentPage(page)}
            />
          )}

          {currentPage === 'materiais' && (
            <SupportMaterialsTab />
          )}

          {currentPage === 'admin' && (
            <AdminDashboardTab
              currentUser={currentUser}
              onOpenAuth={() => setCurrentPage('auth')}
              onCurrentUserUpdated={(updated) => setCurrentUser(updated)}
              onQuestionsUpdated={refreshQuestions}
            />
          )}

          {currentPage === 'auth' && (
            <AuthModalOrTab
              onLoginSuccess={handleLoginSuccess}
              onClose={() => setCurrentPage('inicio')}
              currentUser={currentUser}
              onLogout={handleLogout}
            />
          )}
        </main>

        {/* FOOTER */}
        <footer className="bg-[#050812] text-white text-center py-4 text-xs mt-auto border-t-2 border-cyan-500/30 space-y-1 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
          <p className="font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
            DETETIVE MATEMÁTICO • TODO DESAFIO TEM UMA SOLUÇÃO!
          </p>
          <p className="text-slate-400 text-[11px]">
            Plataforma Pedagógica • Desenvolvido por <strong className="text-cyan-300">Profª Ariane Braz e Sabrina Braz</strong>
          </p>
        </footer>
    </div>
  );
}
