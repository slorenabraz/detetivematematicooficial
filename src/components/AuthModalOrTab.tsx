import React, { useState } from 'react';
import { User, UserType, DISCIPLINAS_ESCOLARES } from '../types';
import { Storage, INITIAL_SERIES } from '../utils/storage';
import { LogIn, UserPlus, Check, AlertCircle, KeyRound, ArrowLeft, ShieldCheck, Eye, EyeOff, UserCheck } from 'lucide-react';

interface AuthModalOrTabProps {
  onLoginSuccess: (user: User) => void;
  onClose?: () => void;
  currentUser?: User | null;
  onLogout?: () => void;
}

export const AuthModalOrTab: React.FC<AuthModalOrTabProps> = ({
  onLoginSuccess,
  onClose,
  currentUser,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [isResetMode, setIsResetMode] = useState(false);

  // Active session tracking for duplicate login prevention
  const [activeSession, setActiveSession] = useState<User | null>(() => currentUser || Storage.getSessionUser());

  // Password visibility states (permitir visualizar a senha ao clicar no olho)
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showResetNewPassword, setShowResetNewPassword] = useState(false);
  const [showResetConfirmPassword, setShowResetConfirmPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Login states
  const [loginTipo, setLoginTipo] = useState<UserType>('aluno');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Password Reset states
  const [resetTipo, setResetTipo] = useState<UserType>('aluno');
  const [resetId, setResetId] = useState('');
  const [resetNewPassword, setResetNewPassword] = useState('');
  const [resetConfirmPassword, setResetConfirmPassword] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');

  // Register states
  const [regNome, setRegNome] = useState('');
  const [regTipo, setRegTipo] = useState<UserType>('aluno');
  const [regEmail, setRegEmail] = useState('');
  const [regSenha, setRegSenha] = useState('');
  const [regSerie, setRegSerie] = useState(INITIAL_SERIES[3]);
  const [regMateria, setRegMateria] = useState('Matemática');
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');

  const handleEndCurrentSession = () => {
    Storage.setSessionUser(null);
    setActiveSession(null);
    if (onLogout) {
      onLogout();
    }
    setLoginError('');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const inputLogin = loginEmail.trim().toLowerCase();
    const inputPass = loginPassword.trim();

    // Prevenção rigorosa de duplicidade de login de usuários
    const currentSession = Storage.getSessionUser();
    if (currentSession) {
      if (
        currentSession.email.toLowerCase().trim() === inputLogin ||
        currentSession.id.toLowerCase().trim() === inputLogin
      ) {
        setLoginError(`Atenção: O usuário "${currentSession.nome}" já está conectado nesta plataforma. Para evitar duplicidade de login simultâneo, encerre a sessão antes de autenticar novamente.`);
        return;
      } else {
        setLoginError(`Atenção: Já existe uma sessão ativa para "${currentSession.nome}". Não é permitida duplicidade de logins simultâneos. Encerre a sessão atual para conectar com outro usuário.`);
        return;
      }
    }

    const users = Storage.getUsers();
    // Permite login com e-mail ou RA/login, aceitando letras e números sem distinção de maiúsculas/minúsculas
    let user = users.find(
      (u) =>
        u.tipo === loginTipo &&
        (u.email.toLowerCase().trim() === inputLogin ||
         u.id.toLowerCase().trim() === inputLogin) &&
        (u.senha === inputPass || u.senha.toLowerCase() === inputPass.toLowerCase())
    );
    if (!user) {
      user = users.find(
        (u) =>
          (u.email.toLowerCase().trim() === inputLogin ||
           u.id.toLowerCase().trim() === inputLogin) &&
          (u.senha === inputPass || u.senha.toLowerCase() === inputPass.toLowerCase())
      );
    }

    if (!user) {
      setLoginError('E-mail/usuário ou senha incorretos. Verifique seus dados.');
      return;
    }

    Storage.setSessionUser(user);
    setActiveSession(user);
    onLoginSuccess(user);
  };

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');
    setResetSuccess('');

    const input = resetId.trim().toLowerCase();
    if (!input) {
      setResetError('Por favor, informe seu e-mail institucional ou usuário cadastrado.');
      return;
    }

    const users = Storage.getUsers();
    const user = users.find(
      (u) => u.email.toLowerCase().trim() === input || u.id.toLowerCase().trim() === input
    );

    if (!user) {
      setResetError(`E-mail ou usuário "${resetId}" não encontrado na plataforma. Verifique seus dados.`);
      return;
    }

    if (!resetNewPassword) {
      setResetError('Por favor, informe a nova senha.');
      return;
    }

    if (
      resetNewPassword !== resetConfirmPassword &&
      resetNewPassword.toLowerCase() !== resetConfirmPassword.toLowerCase()
    ) {
      setResetError('A nova senha e a confirmação não conferem.');
      return;
    }

    if (user.tipo === 'professor') {
      if (resetNewPassword.length < 3 || resetNewPassword.length > 8) {
        setResetError('A senha deve conter entre 3 e 8 caracteres.');
        return;
      }
    } else {
      if (resetNewPassword.length < 3) {
        setResetError('A nova senha deve ter no mínimo 3 caracteres.');
        return;
      }
    }

    // Save/persist updated password (letras e números suportados)
    const success = Storage.updateUserPassword(user.id, resetNewPassword);
    if (success) {
      setResetSuccess(
        `Senha redefinida com sucesso para o usuário ${user.nome} (${user.tipo === 'admin' ? 'Administrador' : user.tipo === 'professor' ? 'Docente' : user.serie})! Suas informações foram salvas com sucesso.`
      );
      // Prepopulate login fields so the user can easily log in
      setLoginEmail(user.email);
      setLoginPassword(resetNewPassword);
      setResetId('');
      setResetNewPassword('');
      setResetConfirmPassword('');
    } else {
      setResetError('Erro ao atualizar a senha no armazenamento.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess('');

    const nome = regNome.trim();
    const email = regEmail.trim();

    if (!nome) {
      setRegError('Por favor, informe seu nome completo.');
      return;
    }

    if (!email) {
      setRegError('Por favor, informe seu e-mail institucional ou identificador/RA.');
      return;
    }

    if (regTipo === 'professor') {
      if (regSenha.length < 3 || regSenha.length > 8) {
        setRegError('A senha do professor deve conter entre 3 e 8 caracteres.');
        return;
      }
    } else {
      if (regSenha.length < 3) {
        setRegError('A senha do aluno deve conter no mínimo 3 caracteres.');
        return;
      }
    }

    // Permite letras e números no cadastro, sem fazer diferença entre maiúsculas e minúsculas
    const normalizedInput = email.toLowerCase();
    const users = Storage.getUsers();
    if (
      users.some(
        (u) =>
          u.email.toLowerCase().trim() === normalizedInput ||
          u.id.toLowerCase().trim() === normalizedInput
      )
    ) {
      setRegError('Atenção: Este e-mail ou usuário de acesso já está cadastrado.');
      return;
    }

    const novoUsuario: User = {
      id: `usr-${Date.now()}`,
      nome,
      tipo: regTipo,
      email,
      senha: regSenha,
      serie: regTipo === 'aluno' ? regSerie : 'Corpo Docente',
      materia: regTipo === 'professor' ? regMateria : undefined,
      dataCadastro: new Date().toLocaleDateString('pt-BR')
    };

    Storage.saveUser(novoUsuario);
    setRegSuccess('Cadastro realizado com sucesso! Suas informações foram salvas. Você já pode efetuar o login.');
    setActiveTab('login');
    setIsResetMode(false);
    setLoginEmail(email);
    setLoginPassword(regSenha);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* LOGIN / PASSWORD RESET CARD */}
        {!isResetMode ? (
          <div className="bg-[#0b1329]/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-[0_0_30px_rgba(0,240,255,0.15)] border border-cyan-500/40 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-cyan-950 border border-cyan-500/40 text-cyan-300 p-3 rounded-2xl shadow-sm">
                <LogIn className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">Entrar na Conta</h3>
                <p className="text-xs text-slate-400">Acesse para desbloquear desafios e rankings</p>
              </div>
            </div>

            {/* Aviso de Prevenção de Duplicidade de Sessão */}
            {activeSession && (
              <div className="p-4 bg-amber-950/70 border border-amber-500/50 rounded-2xl text-xs text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-[0_0_15px_rgba(251,191,36,0.15)]">
                <div className="flex items-center gap-2.5">
                  <UserCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold text-amber-300">Sessão Ativa:</span>{' '}
                    <span>{activeSession.nome} ({activeSession.tipo === 'admin' ? 'Administrador' : activeSession.tipo === 'professor' ? 'Docente' : activeSession.serie})</span>
                    <p className="text-[11px] text-slate-300 mt-0.5">Para evitar duplicidade de login, encerre a sessão atual antes de conectar com outro usuário.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleEndCurrentSession}
                  className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/50 px-3.5 py-1.5 rounded-xl font-bold transition text-xs whitespace-nowrap cursor-pointer shrink-0"
                >
                  Encerrar Sessão
                </button>
              </div>
            )}

            {loginError && (
              <div className="p-3.5 bg-rose-950/60 border border-rose-500/40 rounded-2xl text-xs text-rose-300 font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {regSuccess && (
              <div className="p-3.5 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl text-xs text-emerald-300 font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{regSuccess}</span>
              </div>
            )}

            {resetSuccess && (
              <div className="p-3.5 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl text-xs text-emerald-300 font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{resetSuccess}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Seletor de Tipo de Acesso: Aluno, Professor ou Admin */}
              <div>
                <label className="block text-xs font-bold text-cyan-300 uppercase mb-1.5">
                  Tipo de Acesso
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#060a16] border border-cyan-500/30 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setLoginTipo('aluno')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition cursor-pointer text-center ${
                      loginTipo === 'aluno'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(0,240,255,0.4)] font-black'
                        : 'text-slate-400 hover:text-cyan-300'
                    }`}
                  >
                    Aluno
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginTipo('professor')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition cursor-pointer text-center ${
                      loginTipo === 'professor'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(0,240,255,0.4)] font-black'
                        : 'text-slate-400 hover:text-cyan-300'
                    }`}
                  >
                    Professor
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginTipo('admin')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition cursor-pointer text-center ${
                      loginTipo === 'admin'
                        ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-[0_0_15px_rgba(251,191,36,0.5)] font-black'
                        : 'text-slate-400 hover:text-amber-300'
                    }`}
                  >
                    Admin
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-cyan-300 uppercase mb-1">
                  {loginTipo === 'admin'
                    ? 'Login do Administrador'
                    : loginTipo === 'aluno'
                    ? 'E-mail do Aluno'
                    : 'E-mail do Professor'}
                </label>
                <input
                  type="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder={
                    loginTipo === 'admin'
                      ? 'admin@detetivematematico.sp.gov.br'
                      : loginTipo === 'aluno'
                      ? '000111222SP@aluno.educacao.sp.gov.br'
                      : 'nome@professor.educacao.sp.gov.br'
                  }
                  className="w-full px-4 py-3 rounded-2xl border border-cyan-500/30 bg-[#060a16] text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-xs sm:text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-cyan-300 uppercase mb-1">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-4 pr-11 py-3 rounded-2xl border border-cyan-500/30 bg-[#060a16] text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-xs sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-300 transition cursor-pointer p-1"
                    title={showLoginPassword ? 'Ocultar senha' : 'Visualizar senha'}
                    aria-label={showLoginPassword ? 'Ocultar senha' : 'Visualizar senha'}
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4 text-cyan-400" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Botão de Esqueci a Senha */}
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsResetMode(true);
                    setResetError('');
                    setResetSuccess('');
                  }}
                  className="text-xs text-amber-300 hover:text-amber-200 hover:underline font-bold transition cursor-pointer flex items-center gap-1.5"
                >
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  Esqueceu a senha? Redefinir senha
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black py-3.5 rounded-2xl transition shadow-[0_0_20px_rgba(0,240,255,0.4)] text-sm cursor-pointer"
              >
                Acessar Plataforma
              </button>
            </form>
          </div>
        ) : (
          /* PASSWORD RESET CARD */
          <div className="bg-[#0b1329]/95 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-[0_0_35px_rgba(251,191,36,0.2)] border-2 border-amber-400/60 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-amber-950 border border-amber-500/50 text-amber-300 p-3 rounded-2xl shadow-sm">
                  <KeyRound className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Redefinir Senha</h3>
                  <p className="text-xs text-slate-300">Alunos e Professores: informe seu e-mail cadastrado</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsResetMode(false)}
                className="text-xs text-cyan-300 hover:text-cyan-200 flex items-center gap-1 font-bold cursor-pointer bg-[#070c18] border border-cyan-500/30 px-3 py-1.5 rounded-xl"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Voltar
              </button>
            </div>

            {resetError && (
              <div className="p-3.5 bg-rose-950/60 border border-rose-500/40 rounded-2xl text-xs text-rose-300 font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{resetError}</span>
              </div>
            )}

            {resetSuccess && (
              <div className="p-3.5 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl text-xs text-emerald-300 font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{resetSuccess}</span>
              </div>
            )}

            <div className="bg-[#070d1e] p-3 rounded-2xl border border-amber-500/20 text-xs text-slate-300 space-y-1">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" /> Redefinição Segura:
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Informe o seu e-mail institucional cadastrado na plataforma para definir sua nova senha. Todas as alterações serão salvas com segurança.
              </p>
            </div>

            <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
              {/* Seletor Aluno ou Professor na Redefinição */}
              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1.5">
                  Tipo de Acesso
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-[#060a16] border border-amber-500/30 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setResetTipo('aluno')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer text-center ${
                      resetTipo === 'aluno'
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-[0_0_15px_rgba(251,191,36,0.4)] font-black'
                        : 'text-slate-400 hover:text-amber-300'
                    }`}
                  >
                    Aluno
                  </button>
                  <button
                    type="button"
                    onClick={() => setResetTipo('professor')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer text-center ${
                      resetTipo === 'professor'
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-[0_0_15px_rgba(251,191,36,0.4)] font-black'
                        : 'text-slate-400 hover:text-amber-300'
                    }`}
                  >
                    Professor
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                  {resetTipo === 'aluno' ? 'E-mail do Aluno' : 'E-mail do Professor'}
                </label>
                <input
                  type="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  required
                  value={resetId}
                  onChange={(e) => setResetId(e.target.value)}
                  placeholder={
                    resetTipo === 'aluno'
                      ? '000111222SP@aluno.educacao.sp.gov.br'
                      : 'nome@professor@educacao.sp.gov.br'
                  }
                  className="w-full px-4 py-3 rounded-2xl border border-amber-500/40 bg-[#060a16] text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-400 focus:outline-none text-xs sm:text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                  Nova Senha (3 a 8 caracteres)
                </label>
                <div className="relative">
                  <input
                    type={showResetNewPassword ? 'text' : 'password'}
                    required
                    value={resetNewPassword}
                    onChange={(e) => setResetNewPassword(e.target.value)}
                    placeholder="Digite sua nova senha"
                    className="w-full pl-4 pr-11 py-3 rounded-2xl border border-amber-500/40 bg-[#060a16] text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-400 focus:outline-none text-xs sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowResetNewPassword(!showResetNewPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-300 transition cursor-pointer p-1"
                    title={showResetNewPassword ? 'Ocultar senha' : 'Visualizar senha'}
                    aria-label={showResetNewPassword ? 'Ocultar senha' : 'Visualizar senha'}
                  >
                    {showResetNewPassword ? <EyeOff className="w-4 h-4 text-amber-400" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                  Confirmar Nova Senha
                </label>
                <div className="relative">
                  <input
                    type={showResetConfirmPassword ? 'text' : 'password'}
                    required
                    value={resetConfirmPassword}
                    onChange={(e) => setResetConfirmPassword(e.target.value)}
                    placeholder="Confirme a nova senha"
                    className="w-full pl-4 pr-11 py-3 rounded-2xl border border-amber-500/40 bg-[#060a16] text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-400 focus:outline-none text-xs sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowResetConfirmPassword(!showResetConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-300 transition cursor-pointer p-1"
                    title={showResetConfirmPassword ? 'Ocultar senha' : 'Visualizar senha'}
                    aria-label={showResetConfirmPassword ? 'Ocultar senha' : 'Visualizar senha'}
                  >
                    {showResetConfirmPassword ? <EyeOff className="w-4 h-4 text-amber-400" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsResetMode(false)}
                  className="w-1/3 bg-[#081024] hover:bg-[#0e1a38] text-slate-300 font-bold py-3 rounded-2xl transition border border-cyan-500/30 text-xs sm:text-sm cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black py-3 rounded-2xl transition shadow-[0_0_20px_rgba(251,191,36,0.5)] text-xs sm:text-sm cursor-pointer"
                >
                  Salvar Nova Senha
                </button>
              </div>
            </form>
          </div>
        )}

        {/* REGISTRATION FORM */}
        <div className="bg-[#0b1329]/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-[0_0_30px_rgba(251,191,36,0.15)] border border-amber-500/40 space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-amber-950 border border-amber-500/40 text-amber-300 p-3 rounded-2xl shadow-sm">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">Criar Novo Cadastro</h3>
              <p className="text-xs text-slate-400">Cadastre-se como Aluno ou Professor</p>
            </div>
          </div>

          {regError && (
            <div className="p-3.5 bg-rose-950/60 border border-rose-500/40 rounded-2xl text-xs text-rose-300 font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{regError}</span>
            </div>
          )}

          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                required
                value={regNome}
                onChange={(e) => setRegNome(e.target.value)}
                placeholder="Seu nome completo"
                className="w-full px-4 py-2.5 rounded-2xl border border-amber-500/30 bg-[#060a16] text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-400 focus:outline-none text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                Tipo de Utilizador
              </label>
              <select
                value={regTipo}
                onChange={(e) => setRegTipo(e.target.value as UserType)}
                className="w-full px-4 py-2.5 rounded-2xl border border-amber-500/30 bg-[#060a16] text-white focus:ring-2 focus:ring-amber-400 focus:outline-none text-xs sm:text-sm cursor-pointer"
              >
                <option value="aluno">Aluno</option>
                <option value="professor">Professor</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                {regTipo === 'aluno' ? 'E-mail do Aluno' : 'E-mail do Professor'}
              </label>
              <input
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder={
                  regTipo === 'aluno'
                    ? '000111222SP@aluno.educacao.sp.gov.br'
                    : 'nome@professor@educacao.sp.gov.br'
                }
                className="w-full px-4 py-2.5 rounded-2xl border border-amber-500/30 bg-[#060a16] text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-400 focus:outline-none text-xs sm:text-sm font-mono"
              />
            </div>

            {regTipo === 'aluno' ? (
              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                  Série / Sala
                </label>
                <select
                  value={regSerie}
                  onChange={(e) => setRegSerie(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-amber-500/30 bg-[#060a16] text-white focus:ring-2 focus:ring-amber-400 focus:outline-none text-xs sm:text-sm cursor-pointer"
                >
                  {INITIAL_SERIES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                  Matéria / Disciplina que Ministra
                </label>
                <select
                  value={regMateria}
                  onChange={(e) => setRegMateria(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-amber-500/30 bg-[#060a16] text-white focus:ring-2 focus:ring-amber-400 focus:outline-none text-xs sm:text-sm cursor-pointer"
                >
                  {DISCIPLINAS_ESCOLARES.map((disc) => (
                    <option key={disc} value={disc}>
                      {disc}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                Senha {regTipo === 'professor' && '(3 a 8 caracteres)'}
              </label>
              <div className="relative">
                <input
                  type={showRegPassword ? 'text' : 'password'}
                  required
                  value={regSenha}
                  onChange={(e) => setRegSenha(e.target.value)}
                  placeholder="Senha"
                  className="w-full pl-4 pr-11 py-2.5 rounded-2xl border border-amber-500/30 bg-[#060a16] text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-400 focus:outline-none text-xs sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowRegPassword(!showRegPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-300 transition cursor-pointer p-1"
                  title={showRegPassword ? 'Ocultar senha' : 'Visualizar senha'}
                  aria-label={showRegPassword ? 'Ocultar senha' : 'Visualizar senha'}
                >
                  {showRegPassword ? <EyeOff className="w-4 h-4 text-amber-400" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-amber-200/70 mt-1">
                Permite letras e números, maiúsculas e minúsculas sem distinção.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black py-3.5 rounded-2xl transition shadow-[0_0_20px_rgba(251,191,36,0.4)] text-sm cursor-pointer"
            >
              Finalizar Cadastro
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

