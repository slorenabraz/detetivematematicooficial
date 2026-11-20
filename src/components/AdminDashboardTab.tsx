import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  User,
  UserType,
  DISCIPLINAS_ESCOLARES,
  QuestionModule,
  QuestionOverride
} from '../types';
import { Storage, INITIAL_SERIES } from '../utils/storage';
import { getAdminQuestionCatalog, AdminQuestionEntry } from '../utils/questionBank';
import { CURRICULO_SERIES } from '../data/curriculoAcaoQuestions';
import {
  ShieldCheck,
  Users,
  BookOpenCheck,
  UserPlus,
  Plus,
  Pencil,
  Trash2,
  RotateCcw,
  Search,
  Eye,
  EyeOff,
  X,
  CheckCircle2,
  AlertCircle,
  Lock,
  KeyRound,
  GraduationCap,
  Target,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface AdminDashboardTabProps {
  currentUser: User | null;
  onOpenAuth: () => void;
  onCurrentUserUpdated: (user: User) => void;
  onQuestionsUpdated: () => void;
}

const QUESTIONS_PER_PAGE = 20;
const USERS_PER_PAGE = 15;

const ETAPA_DEFAULT_THEME: Record<number, { key: string; nome: string }> = {
  1: { key: 'pitagoras', nome: 'Teorema de Pitágoras' },
  2: { key: 'senos', nome: 'Lei dos Senos' },
  3: { key: 'cossenos', nome: 'Lei dos Cossenos' },
  4: { key: 'semelhanca', nome: 'Semelhança de Triângulos' }
};

const NIVEL_DEFAULT_THEME: Record<'iniciante' | 'intermediario' | 'avancado', { key: string; nome: string }> = {
  iniciante: { key: 'trig_iniciante', nome: 'Trigonometria — Nível Iniciante' },
  intermediario: { key: 'trig_intermediario', nome: 'Trigonometria — Nível Intermediário' },
  avancado: { key: 'trig_avancado', nome: 'Trigonometria — Nível Avançado' }
};

export const AdminDashboardTab: React.FC<AdminDashboardTabProps> = ({
  currentUser,
  onOpenAuth,
  onCurrentUserUpdated,
  onQuestionsUpdated
}) => {
  const isAdmin = currentUser?.tipo === 'admin';

  const [storageVersion, setStorageVersion] = useState(0);
  const [activeSection, setActiveSection] = useState<'usuarios' | 'questoes'>('usuarios');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // User management filters & states
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'todos' | UserType>('todos');
  const [userSerieFilter, setUserSerieFilter] = useState<string>('todos');
  const [userPage, setUserPage] = useState(1);
  const [revealedPasswords, setRevealedPasswords] = useState<Record<string, boolean>>({});

  // User create/edit modal state
  const [userModalMode, setUserModalMode] = useState<'create' | 'edit' | null>(null);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [formNome, setFormNome] = useState('');
  const [formTipo, setFormTipo] = useState<UserType>('aluno');
  const [formEmail, setFormEmail] = useState('');
  const [formSenha, setFormSenha] = useState('');
  const [formSerie, setFormSerie] = useState<string>(INITIAL_SERIES[3]);
  const [formMateria, setFormMateria] = useState<string>(DISCIPLINAS_ESCOLARES[0]);
  const [showFormPassword, setShowFormPassword] = useState(false);
  const [userFormError, setUserFormError] = useState('');

  // User delete confirmation modal state
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Question management filters & states
  const [selectedModule, setSelectedModule] = useState<QuestionModule>('oficial');
  const [questionSubFilter, setQuestionSubFilter] = useState<string>('todos');
  const [questionSearch, setQuestionSearch] = useState('');
  const [showDeletedQuestions, setShowDeletedQuestions] = useState(false);
  const [questionPage, setQuestionPage] = useState(1);

  // Question create/edit modal state
  const [questionModalMode, setQuestionModalMode] = useState<'create' | 'edit' | null>(null);
  const [editingEntry, setEditingEntry] = useState<AdminQuestionEntry | null>(null);
  const [qModulo, setQModulo] = useState<QuestionModule>('oficial');
  const [qEtapa, setQEtapa] = useState<number>(1);
  const [qNivel, setQNivel] = useState<'iniciante' | 'intermediario' | 'avancado'>('iniciante');
  const [qSerie, setQSerie] = useState<string>(CURRICULO_SERIES[0]);
  const [qAulaNumero, setQAulaNumero] = useState<string>('');
  const [qHabilidade, setQHabilidade] = useState<string>('');
  const [qTemaNome, setQTemaNome] = useState<string>('');
  const [qPergunta, setQPergunta] = useState<string>('');
  const [qOpcoes, setQOpcoes] = useState<string[]>(['', '', '', '']);
  const [qCorreta, setQCorreta] = useState<number>(0);
  const [qPorque, setQPorque] = useState<string>('');
  const [qDica, setQDica] = useState<string>('');
  const [questionFormError, setQuestionFormError] = useState('');

  // Question delete confirmation modal state
  const [questionToDelete, setQuestionToDelete] = useState<AdminQuestionEntry | null>(null);

  useEffect(() => {
    return Storage.subscribe(() => {
      setStorageVersion((v) => v + 1);
    });
  }, []);

  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(() => setFeedback(null), 5000);
    return () => clearTimeout(timer);
  }, [feedback]);

  const hasOpenModal = Boolean(
    userModalMode || userToDelete || questionModalMode || questionToDelete
  );

  // Lock background scroll and allow Escape key to close active admin modal
  useEffect(() => {
    if (!hasOpenModal) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (questionToDelete) {
        setQuestionToDelete(null);
      } else if (userToDelete) {
        setUserToDelete(null);
      } else if (questionModalMode) {
        setQuestionModalMode(null);
      } else if (userModalMode) {
        setUserModalMode(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasOpenModal, questionToDelete, userToDelete, questionModalMode, userModalMode]);

  const allUsers = useMemo(() => Storage.getUsers(), [storageVersion]);
  const allOverrides = useMemo(() => Storage.getQuestionOverrides(), [storageVersion]);
  const questionCatalog = useMemo(() => getAdminQuestionCatalog(), [storageVersion]);

  const kpis = useMemo(() => {
    const alunos = allUsers.filter((u) => u.tipo === 'aluno').length;
    const professores = allUsers.filter((u) => u.tipo === 'professor').length;
    const activeQuestions = questionCatalog.filter((q) => q.status !== 'deleted').length;
    const modifiedCount = allOverrides.length;
    return {
      totalUsers: allUsers.length,
      alunos,
      professores,
      activeQuestions,
      modifiedCount
    };
  }, [allUsers, questionCatalog, allOverrides]);

  const filteredUsers = useMemo(() => {
    const query = userSearch.trim().toLowerCase();
    return allUsers.filter((u) => {
      if (userRoleFilter !== 'todos' && u.tipo !== userRoleFilter) return false;
      if (userSerieFilter !== 'todos' && u.serie !== userSerieFilter) return false;
      if (query) {
        const hay = `${u.nome} ${u.email} ${u.serie} ${u.materia || ''}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });
  }, [allUsers, userSearch, userRoleFilter, userSerieFilter]);

  const totalUserPages = Math.max(1, Math.ceil(filteredUsers.length / USERS_PER_PAGE));
  const safeUserPage = Math.min(userPage, totalUserPages);
  const paginatedUsers = useMemo(() => {
    const start = (safeUserPage - 1) * USERS_PER_PAGE;
    return filteredUsers.slice(start, start + USERS_PER_PAGE);
  }, [filteredUsers, safeUserPage]);

  useEffect(() => {
    setUserPage(1);
  }, [userSearch, userRoleFilter, userSerieFilter]);

  const filteredQuestions = useMemo(() => {
    const query = questionSearch.trim().toLowerCase();
    return questionCatalog.filter((entry) => {
      if (entry.modulo !== selectedModule) return false;
      if (!showDeletedQuestions && entry.status === 'deleted') return false;

      if (questionSubFilter !== 'todos') {
        if (selectedModule === 'oficial') {
          if (String(entry.question.etapa || 1) !== questionSubFilter) return false;
        } else if (selectedModule === 'treine_mais') {
          if ((entry.question.nivel || 'iniciante') !== questionSubFilter) return false;
        } else if (selectedModule === 'curriculo_acao') {
          if (entry.question.serie !== questionSubFilter && !entry.subLabel.startsWith(questionSubFilter)) {
            return false;
          }
        }
      }

      if (query) {
        const hay = `${entry.id} ${entry.subLabel} ${entry.question.temaNome} ${entry.question.pergunta} ${entry.question.opcoes.join(' ')} ${entry.question.habilidade || ''}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }

      return true;
    });
  }, [questionCatalog, selectedModule, showDeletedQuestions, questionSubFilter, questionSearch]);

  const totalQuestionPages = Math.max(1, Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE));
  const safeQuestionPage = Math.min(questionPage, totalQuestionPages);
  const paginatedQuestions = useMemo(() => {
    const start = (safeQuestionPage - 1) * QUESTIONS_PER_PAGE;
    return filteredQuestions.slice(start, start + QUESTIONS_PER_PAGE);
  }, [filteredQuestions, safeQuestionPage]);

  // Reset question pagination when filters change
  useEffect(() => {
    setQuestionPage(1);
  }, [selectedModule, questionSubFilter, questionSearch, showDeletedQuestions]);

  // -------------------------------------------------------------------------
  // USER CRUD HANDLERS
  // -------------------------------------------------------------------------
  const openCreateUserModal = (defaultRole: 'aluno' | 'professor' = 'aluno') => {
    setUserModalMode('create');
    setEditingUserId(null);
    setFormNome('');
    setFormTipo(defaultRole);
    setFormEmail('');
    setFormSenha('');
    setFormSerie(INITIAL_SERIES[3]);
    setFormMateria(DISCIPLINAS_ESCOLARES[0]);
    setShowFormPassword(false);
    setUserFormError('');
  };

  const openEditUserModal = (user: User) => {
    setUserModalMode('edit');
    setEditingUserId(user.id);
    setFormNome(user.nome);
    setFormTipo(user.tipo);
    setFormEmail(user.email);
    setFormSenha(user.senha);
    setFormSerie(
      INITIAL_SERIES.includes(user.serie) ? user.serie : INITIAL_SERIES[3]
    );
    setFormMateria(user.materia || DISCIPLINAS_ESCOLARES[0]);
    setShowFormPassword(false);
    setUserFormError('');
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    setUserFormError('');

    const nome = formNome.trim();
    const email = formEmail.trim();
    const senha = formSenha.trim();

    if (!nome) {
      setUserFormError('Informe o nome completo do usuário.');
      return;
    }
    if (!email) {
      setUserFormError('Informe o e-mail ou login de acesso.');
      return;
    }
    if (senha.length < 3) {
      setUserFormError('A senha deve conter no mínimo 3 caracteres.');
      return;
    }

    const normalizedEmail = email.toLowerCase();
    const duplicate = allUsers.find(
      (u) =>
        u.id !== editingUserId &&
        (u.email.trim().toLowerCase() === normalizedEmail ||
          u.id.trim().toLowerCase() === normalizedEmail)
    );
    if (duplicate) {
      setUserFormError(`Já existe outro usuário cadastrado com o login "${email}".`);
      return;
    }

    if (userModalMode === 'create') {
      const novoUsuario: User = {
        id: `usr-${Date.now()}`,
        nome,
        tipo: formTipo,
        email,
        senha,
        serie:
          formTipo === 'aluno'
            ? formSerie
            : formTipo === 'admin'
            ? 'Administração'
            : 'Corpo Docente',
        materia: formTipo === 'professor' ? formMateria : undefined,
        dataCadastro: new Date().toLocaleDateString('pt-BR')
      };
      Storage.saveUser(novoUsuario);
      setFeedback({
        type: 'success',
        message: `Usuário "${nome}" (${formTipo === 'professor' ? 'Professor' : 'Aluno'}) cadastrado com sucesso.`
      });
    } else if (userModalMode === 'edit' && editingUserId) {
      const updated = Storage.updateUser(editingUserId, {
        nome,
        tipo: formTipo,
        email,
        senha,
        serie:
          formTipo === 'aluno'
            ? formSerie
            : formTipo === 'admin'
            ? 'Administração'
            : 'Corpo Docente',
        materia: formTipo === 'professor' ? formMateria : undefined
      });
      if (!updated) {
        setUserFormError('Não foi possível atualizar este usuário.');
        return;
      }
      if (currentUser && updated.id === currentUser.id) {
        onCurrentUserUpdated(updated);
      }
      setFeedback({
        type: 'success',
        message: `Dados e credenciais de "${updated.nome}" atualizados com sucesso.`
      });
    }

    setUserModalMode(null);
    setEditingUserId(null);
  };

  const handleConfirmDeleteUser = () => {
    if (!userToDelete) return;
    if (currentUser && userToDelete.id === currentUser.id) {
      setFeedback({
        type: 'error',
        message: 'Você não pode remover a conta de Administrador que está conectada no momento.'
      });
      setUserToDelete(null);
      return;
    }
    const deletedName = userToDelete.nome;
    Storage.deleteUser(userToDelete.id);
    setUserToDelete(null);
    setFeedback({
      type: 'success',
      message: `Usuário "${deletedName}" removido da plataforma.`
    });
  };

  // -------------------------------------------------------------------------
  // QUESTION CRUD HANDLERS
  // -------------------------------------------------------------------------
  const openCreateQuestionModal = () => {
    setQuestionModalMode('create');
    setEditingEntry(null);
    setQModulo(selectedModule);
    setQEtapa(
      selectedModule === 'oficial' && questionSubFilter !== 'todos'
        ? Number(questionSubFilter) || 1
        : 1
    );
    setQNivel(
      selectedModule === 'treine_mais' &&
        (questionSubFilter === 'iniciante' ||
          questionSubFilter === 'intermediario' ||
          questionSubFilter === 'avancado')
        ? questionSubFilter
        : 'iniciante'
    );
    setQSerie(
      selectedModule === 'curriculo_acao' && questionSubFilter !== 'todos'
        ? questionSubFilter
        : CURRICULO_SERIES[0]
    );
    setQAulaNumero('');
    setQHabilidade('');
    setQTemaNome(
      selectedModule === 'oficial'
        ? ETAPA_DEFAULT_THEME[1].nome
        : selectedModule === 'treine_mais'
        ? NIVEL_DEFAULT_THEME.iniciante.nome
        : ''
    );
    setQPergunta('');
    setQOpcoes(['', '', '', '']);
    setQCorreta(0);
    setQPorque('');
    setQDica('');
    setQuestionFormError('');
  };

  const openEditQuestionModal = (entry: AdminQuestionEntry) => {
    const q = entry.question;
    setQuestionModalMode('edit');
    setEditingEntry(entry);
    setQModulo(entry.modulo);
    setQEtapa(q.etapa || 1);
    setQNivel(q.nivel || 'iniciante');
    setQSerie(q.serie || CURRICULO_SERIES[0]);
    setQAulaNumero(q.aulaNumero ? String(q.aulaNumero) : '');
    setQHabilidade(q.habilidade || '');
    setQTemaNome(q.temaNome || '');
    setQPergunta(q.pergunta || '');
    setQOpcoes(q.opcoes.length >= 2 ? [...q.opcoes] : ['', '', '', '']);
    setQCorreta(Math.min(Math.max(0, q.correta), Math.max(0, q.opcoes.length - 1)));
    setQPorque(q.porque || '');
    setQDica(q.dicaInvestigacao || '');
    setQuestionFormError('');
  };

  const handleOptionChange = (index: number, value: string) => {
    setQOpcoes((prev) => prev.map((opt, idx) => (idx === index ? value : opt)));
  };

  const handleAddOption = () => {
    if (qOpcoes.length >= 5) return;
    setQOpcoes((prev) => [...prev, '']);
  };

  const handleRemoveOption = (index: number) => {
    if (qOpcoes.length <= 2) return;
    setQOpcoes((prev) => prev.filter((_, idx) => idx !== index));
    setQCorreta((prev) => {
      if (prev === index) return 0;
      if (prev > index) return prev - 1;
      return prev;
    });
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    setQuestionFormError('');

    const temaNome = qTemaNome.trim();
    const pergunta = qPergunta.trim();
    const cleanOptions = qOpcoes.map((o) => o.trim());

    if (!temaNome) {
      setQuestionFormError('Informe o tema / tópico da questão.');
      return;
    }
    if (!pergunta) {
      setQuestionFormError('Escreva o enunciado da questão.');
      return;
    }
    if (cleanOptions.length < 2 || cleanOptions.some((o) => !o)) {
      setQuestionFormError('Preencha todas as alternativas (mínimo de 2 alternativas).');
      return;
    }
    if (qCorreta < 0 || qCorreta >= cleanOptions.length) {
      setQuestionFormError('Selecione qual alternativa representa o gabarito.');
      return;
    }

    const parsedAula =
      qModulo === 'curriculo_acao' && qSerie === '3º Ano Ensino Médio' && qAulaNumero.trim()
        ? Math.max(1, parseInt(qAulaNumero.trim(), 10) || 1)
        : undefined;

    const temaKey =
      qModulo === 'oficial'
        ? (ETAPA_DEFAULT_THEME[qEtapa]?.key || 'pitagoras')
        : qModulo === 'treine_mais'
        ? NIVEL_DEFAULT_THEME[qNivel].key
        : temaNome
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '_')
            .replace(/^_|_$/g, '') || 'curriculo';

    const isCustom =
      questionModalMode === 'create' || (editingEntry !== null && !editingEntry.isBuiltIn);
    const id =
      questionModalMode === 'create'
        ? `custom-${qModulo}-${Date.now()}`
        : editingEntry!.id;

    const overridePayload: QuestionOverride = {
      id,
      modulo: qModulo,
      status: isCustom ? 'custom' : 'edited',
      etapa: qModulo === 'oficial' ? qEtapa : undefined,
      nivel: qModulo === 'treine_mais' ? qNivel : undefined,
      serie: qModulo === 'curriculo_acao' ? qSerie : undefined,
      aulaNumero: parsedAula,
      aulaTitulo:
        qModulo === 'curriculo_acao' && editingEntry?.question.aulaTitulo
          ? editingEntry.question.aulaTitulo
          : undefined,
      temaKey,
      temaNome,
      pergunta,
      opcoes: cleanOptions,
      correta: qCorreta,
      porque: qPorque.trim() || undefined,
      dicaInvestigacao: qDica.trim() || undefined,
      svgType: editingEntry?.question.svgType,
      invertida: qModulo === 'oficial',
      habilidade: qHabilidade.trim() || undefined,
      updatedAt: Date.now()
    };

    Storage.saveQuestionOverride(overridePayload);
    onQuestionsUpdated();
    setQuestionModalMode(null);
    setEditingEntry(null);
    setFeedback({
      type: 'success',
      message:
        questionModalMode === 'create'
          ? 'Nova questão adicionada ao banco com sucesso.'
          : 'Questão atualizada e salva com sucesso.'
    });
  };

  const handleConfirmDeleteQuestion = () => {
    if (!questionToDelete) return;
    if (!questionToDelete.isBuiltIn) {
      Storage.deleteQuestionOverride(questionToDelete.id);
    } else {
      Storage.saveQuestionOverride({
        id: questionToDelete.id,
        modulo: questionToDelete.modulo,
        status: 'deleted',
        updatedAt: Date.now()
      });
    }
    onQuestionsUpdated();
    setQuestionToDelete(null);
    setFeedback({
      type: 'success',
      message: questionToDelete.isBuiltIn
        ? 'Questão removida dos desafios ativos (você pode restaurá-la quando desejar).'
        : 'Questão personalizada excluída permanentemente.'
    });
  };

  const handleRestoreQuestion = (entry: AdminQuestionEntry) => {
    Storage.deleteQuestionOverride(entry.id);
    onQuestionsUpdated();
    setFeedback({
      type: 'success',
      message: 'Questão original restaurada com sucesso.'
    });
  };

  // -------------------------------------------------------------------------
  // RESTRICTED VIEW FOR NON-ADMIN
  // -------------------------------------------------------------------------
  if (!isAdmin) {
    return (
      <div className="max-w-3xl mx-auto py-8 animate-fadeIn">
        <div className="bg-[#0b1329]/90 border border-amber-500/40 p-8 rounded-3xl shadow-[0_0_25px_rgba(251,191,36,0.15)] text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 text-amber-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white">Área Exclusiva do Administrador</h2>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Esta central é restrita à conta de Administrador para gerenciamento de usuários, credenciais e banco de questões da plataforma.
            </p>
          </div>
          <button
            onClick={onOpenAuth}
            className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black px-6 py-3 rounded-2xl transition shadow-[0_0_20px_rgba(251,191,36,0.4)] text-sm cursor-pointer"
          >
            Entrar como Administrador
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fadeIn">
      {/* HEADER BANNER */}
      <div className="bg-[#0b1329]/90 border border-amber-500/40 text-white p-6 sm:p-8 rounded-3xl shadow-[0_0_28px_rgba(251,191,36,0.14)] backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="space-y-2 text-center sm:text-left">
          <span className="bg-amber-500/20 text-amber-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 border border-amber-500/40">
            <ShieldCheck className="w-3.5 h-3.5" /> Controle Total da Plataforma
          </span>
          <h2 className="text-2xl sm:text-3xl font-black flex items-center justify-center sm:justify-start gap-2.5">
            Painel do Administrador
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
            Gerencie contas de alunos e professores, altere logins ou senhas e adicione, edite, reformule ou remova questões de todos os desafios.
          </p>
        </div>

        <div className="bg-[#060a16] px-5 py-3.5 rounded-2xl border border-amber-500/40 text-center sm:text-right shrink-0">
          <span className="text-[11px] text-amber-300 font-bold block uppercase tracking-wide">
            Sessão Administrativa
          </span>
          <span className="text-base font-black text-white block">{currentUser.nome}</span>
          <span className="text-[11px] text-slate-400 font-mono">{currentUser.email}</span>
        </div>
      </div>

      {/* KPI STRIP */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-[#0b1329]/85 border border-cyan-500/30 rounded-2xl p-4 sm:p-5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 block">
            Total de Usuários
          </span>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums mt-1">
            {kpis.totalUsers}
          </div>
          <span className="text-[11px] text-slate-400">Contas ativas na base</span>
        </div>

        <div className="bg-[#0b1329]/85 border border-emerald-500/30 rounded-2xl p-4 sm:p-5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 block">
            Alunos
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-200 font-mono tabular-nums mt-1">
            {kpis.alunos}
          </div>
          <span className="text-[11px] text-slate-400">Estudantes matriculados</span>
        </div>

        <div className="bg-[#0b1329]/85 border border-purple-500/30 rounded-2xl p-4 sm:p-5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 block">
            Professores
          </span>
          <div className="text-2xl sm:text-3xl font-black text-purple-200 font-mono tabular-nums mt-1">
            {kpis.professores}
          </div>
          <span className="text-[11px] text-slate-400">Corpo docente ativo</span>
        </div>

        <div className="bg-[#0b1329]/85 border border-amber-500/30 rounded-2xl p-4 sm:p-5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
            Banco de Questões
          </span>
          <div className="text-2xl sm:text-3xl font-black text-amber-200 font-mono tabular-nums mt-1">
            {kpis.activeQuestions}
          </div>
          <span className="text-[11px] text-slate-400 tabular-nums">
            {kpis.modifiedCount} ajuste(s) salvo(s)
          </span>
        </div>
      </div>

      {/* FEEDBACK TOAST */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs sm:text-sm font-bold animate-in fade-in duration-200 ${
            feedback.type === 'success'
              ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200'
              : 'bg-rose-950/70 border-rose-500/50 text-rose-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-slate-400 hover:text-white p-1 cursor-pointer"
            aria-label="Fechar aviso"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* MAIN SUB-TABS */}
      <div className="bg-[#050813] p-1.5 rounded-2xl border border-slate-800 grid grid-cols-2 gap-2">
        <button
          onClick={() => setActiveSection('usuarios')}
          className={`py-3 px-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wide flex items-center justify-center gap-2 transition cursor-pointer ${
            activeSection === 'usuarios'
              ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.45)]'
              : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-900'
          }`}
        >
          <Users className="w-4 h-4" /> Gestão de Usuários
        </button>

        <button
          onClick={() => setActiveSection('questoes')}
          className={`py-3 px-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wide flex items-center justify-center gap-2 transition cursor-pointer ${
            activeSection === 'questoes'
              ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.45)]'
              : 'text-slate-400 hover:text-amber-300 hover:bg-slate-900'
          }`}
        >
          <BookOpenCheck className="w-4 h-4" /> Banco de Questões
        </button>
      </div>

      {/* =====================================================================
          SECTION 1: USER MANAGEMENT
         ===================================================================== */}
      {activeSection === 'usuarios' && (
        <div className="bg-[#0b1329]/85 backdrop-blur-xl rounded-3xl border border-cyan-500/30 shadow-xl overflow-hidden">
          {/* Toolbar */}
          <div className="p-5 sm:p-6 border-b border-cyan-500/20 flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-2.5 flex-grow">
              <div className="relative flex-grow max-w-md">
                <Search className="w-4 h-4 text-cyan-400/70 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Buscar por nome, login ou e-mail..."
                  className="w-full bg-[#060a16] border border-cyan-500/35 text-white placeholder-slate-500 text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                />
              </div>

              <select
                value={userRoleFilter}
                onChange={(e) => setUserRoleFilter(e.target.value as 'todos' | UserType)}
                className="bg-[#060a16] border border-cyan-500/35 text-cyan-100 text-xs sm:text-sm font-bold rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-cyan-400 focus:outline-none cursor-pointer"
              >
                <option value="todos">Todos os Perfis</option>
                <option value="aluno">Alunos</option>
                <option value="professor">Professores</option>
                <option value="admin">Administradores</option>
              </select>

              <select
                value={userSerieFilter}
                onChange={(e) => setUserSerieFilter(e.target.value)}
                className="bg-[#060a16] border border-cyan-500/35 text-cyan-100 text-xs sm:text-sm font-bold rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-cyan-400 focus:outline-none cursor-pointer"
              >
                <option value="todos">Todas as Séries</option>
                {INITIAL_SERIES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap gap-2 shrink-0">
              <button
                onClick={() => openCreateUserModal('aluno')}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs uppercase tracking-wide flex items-center gap-1.5 shadow-[0_0_16px_rgba(0,240,255,0.35)] transition cursor-pointer"
              >
                <UserPlus className="w-4 h-4" /> + Novo Aluno
              </button>
              <button
                onClick={() => openCreateUserModal('professor')}
                className="bg-gradient-to-r from-purple-400 to-fuchsia-500 hover:from-purple-300 hover:to-fuchsia-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs uppercase tracking-wide flex items-center gap-1.5 shadow-[0_0_16px_rgba(168,85,247,0.35)] transition cursor-pointer"
              >
                <UserPlus className="w-4 h-4" /> + Novo Professor
              </button>
            </div>
          </div>

          {/* Users Table */}
          {filteredUsers.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <Users className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-sm font-bold text-slate-300">Nenhum usuário encontrado para os filtros aplicados.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#070b18] text-cyan-300 font-extrabold uppercase text-[11px] border-b border-cyan-500/20">
                  <tr>
                    <th className="py-3.5 px-4 sm:px-5">Usuário</th>
                    <th className="py-3.5 px-4">Login / E-mail</th>
                    <th className="py-3.5 px-4">Perfil</th>
                    <th className="py-3.5 px-4">Série / Disciplina</th>
                    <th className="py-3.5 px-4">Senha</th>
                    <th className="py-3.5 px-4 sm:px-5 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyan-500/10">
                  {paginatedUsers.map((user) => {
                    const isSelf = currentUser.id === user.id;
                    const isPwdVisible = !!revealedPasswords[user.id];
                    return (
                      <tr key={user.id} className="hover:bg-cyan-950/25 transition">
                        <td className="py-3.5 px-4 sm:px-5">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shrink-0 border ${
                                user.tipo === 'admin'
                                  ? 'bg-amber-950 border-amber-500/50 text-amber-300'
                                  : user.tipo === 'professor'
                                  ? 'bg-purple-950 border-purple-500/50 text-purple-300'
                                  : 'bg-cyan-950 border-cyan-500/40 text-cyan-300'
                              }`}
                            >
                              {user.nome.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-white truncate max-w-[200px]">
                                {user.nome}
                                {isSelf && (
                                  <span className="ml-1.5 text-[10px] font-mono text-amber-300">(você)</span>
                                )}
                              </div>
                              <div className="text-[10px] text-slate-500">
                                Cadastro: {user.dataCadastro || '—'}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 font-mono text-xs text-slate-300">
                          <span className="block truncate max-w-[220px]" title={user.email}>
                            {user.email}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md border ${
                              user.tipo === 'admin'
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                                : user.tipo === 'professor'
                                ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                                : 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
                            }`}
                          >
                            {user.tipo === 'admin'
                              ? 'Admin'
                              : user.tipo === 'professor'
                              ? 'Professor'
                              : 'Aluno'}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-xs text-slate-300">
                          {user.tipo === 'professor'
                            ? user.materia || 'Matemática'
                            : user.tipo === 'admin'
                            ? 'Administração'
                            : user.serie}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5 font-mono text-xs text-slate-300">
                            <span>{isPwdVisible ? user.senha : '••••••'}</span>
                            <button
                              type="button"
                              onClick={() =>
                                setRevealedPasswords((prev) => ({
                                  ...prev,
                                  [user.id]: !prev[user.id]
                                }))
                              }
                              className="text-slate-400 hover:text-cyan-300 p-1 cursor-pointer"
                              title={isPwdVisible ? 'Ocultar senha' : 'Mostrar senha'}
                            >
                              {isPwdVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 sm:px-5 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => openEditUserModal(user)}
                              className="bg-cyan-950 hover:bg-cyan-900 text-cyan-200 border border-cyan-500/40 font-bold px-2.5 py-1.5 rounded-lg text-[11px] inline-flex items-center gap-1 transition cursor-pointer"
                              title="Editar dados, login ou alterar senha"
                            >
                              <KeyRound className="w-3.5 h-3.5" /> Editar / Senha
                            </button>
                            <button
                              type="button"
                              disabled={isSelf}
                              onClick={() => setUserToDelete(user)}
                              className={`font-bold px-2.5 py-1.5 rounded-lg text-[11px] inline-flex items-center gap-1 border transition ${
                                isSelf
                                  ? 'bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed'
                                  : 'bg-rose-950/70 hover:bg-rose-900/80 text-rose-300 border-rose-500/40 cursor-pointer'
                              }`}
                              title={isSelf ? 'Você não pode remover sua própria conta ativa' : 'Remover usuário'}
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Remover
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Users Pagination */}
          {totalUserPages > 1 && (
            <div className="p-4 bg-[#070b18] border-t border-cyan-500/20 flex items-center justify-between text-xs text-slate-300">
              <span className="font-mono tabular-nums">
                Página {safeUserPage} de {totalUserPages} • {filteredUsers.length} usuário(s)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={safeUserPage <= 1}
                  onClick={() => setUserPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-lg bg-[#0b1329] border border-slate-700 disabled:opacity-40 hover:border-cyan-400/50 flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Anterior
                </button>
                <button
                  type="button"
                  disabled={safeUserPage >= totalUserPages}
                  onClick={() => setUserPage((p) => Math.min(totalUserPages, p + 1))}
                  className="px-3 py-1.5 rounded-lg bg-[#0b1329] border border-slate-700 disabled:opacity-40 hover:border-cyan-400/50 flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed"
                >
                  Próxima <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          SECTION 2: QUESTION BANK MANAGEMENT
         ===================================================================== */}
      {activeSection === 'questoes' && (
        <div className="bg-[#0b1329]/85 backdrop-blur-xl rounded-3xl border border-amber-500/35 shadow-xl overflow-hidden space-y-0">
          {/* Module Selector */}
          <div className="p-4 sm:p-5 bg-[#070b18] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setSelectedModule('oficial');
                  setQuestionSubFilter('todos');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide flex items-center gap-1.5 transition cursor-pointer ${
                  selectedModule === 'oficial'
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-[0_0_16px_rgba(0,240,255,0.4)]'
                    : 'bg-[#0b1329] text-slate-300 border border-slate-700 hover:border-cyan-400/50'
                }`}
              >
                <Target className="w-3.5 h-3.5" /> Desafio Oficial
              </button>

              <button
                onClick={() => {
                  setSelectedModule('treine_mais');
                  setQuestionSubFilter('todos');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide flex items-center gap-1.5 transition cursor-pointer ${
                  selectedModule === 'treine_mais'
                    ? 'bg-gradient-to-r from-purple-400 to-fuchsia-500 text-slate-950 shadow-[0_0_16px_rgba(168,85,247,0.4)]'
                    : 'bg-[#0b1329] text-slate-300 border border-slate-700 hover:border-purple-400/50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" /> Treine Mais
              </button>

              <button
                onClick={() => {
                  setSelectedModule('curriculo_acao');
                  setQuestionSubFilter('todos');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide flex items-center gap-1.5 transition cursor-pointer ${
                  selectedModule === 'curriculo_acao'
                    ? 'bg-gradient-to-r from-orange-400 to-amber-500 text-slate-950 shadow-[0_0_16px_rgba(249,115,22,0.4)]'
                    : 'bg-[#0b1329] text-slate-300 border border-slate-700 hover:border-orange-400/50'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" /> Currículo em Ação
              </button>
            </div>

            <button
              onClick={openCreateQuestionModal}
              className="bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs uppercase tracking-wide flex items-center gap-1.5 shadow-[0_0_16px_rgba(16,185,129,0.4)] transition cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Nova Questão
            </button>
          </div>

          {/* Search & Sub-filter Bar */}
          <div className="p-4 sm:p-5 border-b border-slate-800 flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-2.5 flex-grow">
              <div className="relative flex-grow max-w-md">
                <Search className="w-4 h-4 text-amber-400/70 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={questionSearch}
                  onChange={(e) => setQuestionSearch(e.target.value)}
                  placeholder="Buscar por enunciado, tema, alternativa ou habilidade..."
                  className="w-full bg-[#060a16] border border-amber-500/35 text-white placeholder-slate-500 text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              {selectedModule === 'oficial' && (
                <select
                  value={questionSubFilter}
                  onChange={(e) => setQuestionSubFilter(e.target.value)}
                  className="bg-[#060a16] border border-amber-500/35 text-amber-100 text-xs sm:text-sm font-bold rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-amber-400 focus:outline-none cursor-pointer"
                >
                  <option value="todos">Todas as Etapas (1–4)</option>
                  <option value="1">Etapa 1 • Pitágoras</option>
                  <option value="2">Etapa 2 • Lei dos Senos</option>
                  <option value="3">Etapa 3 • Lei dos Cossenos</option>
                  <option value="4">Etapa 4 • Semelhança</option>
                </select>
              )}

              {selectedModule === 'treine_mais' && (
                <select
                  value={questionSubFilter}
                  onChange={(e) => setQuestionSubFilter(e.target.value)}
                  className="bg-[#060a16] border border-amber-500/35 text-amber-100 text-xs sm:text-sm font-bold rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-amber-400 focus:outline-none cursor-pointer"
                >
                  <option value="todos">Todos os Níveis</option>
                  <option value="iniciante">Iniciante</option>
                  <option value="intermediario">Intermediário</option>
                  <option value="avancado">Avançado</option>
                </select>
              )}

              {selectedModule === 'curriculo_acao' && (
                <select
                  value={questionSubFilter}
                  onChange={(e) => setQuestionSubFilter(e.target.value)}
                  className="bg-[#060a16] border border-amber-500/35 text-amber-100 text-xs sm:text-sm font-bold rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-amber-400 focus:outline-none cursor-pointer"
                >
                  <option value="todos">Todas as Séries</option>
                  {CURRICULO_SERIES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4">
              <label className="inline-flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showDeletedQuestions}
                  onChange={(e) => setShowDeletedQuestions(e.target.checked)}
                  className="rounded border-slate-600 bg-[#060a16] text-amber-400 focus:ring-amber-400 cursor-pointer"
                />
                <span>Mostrar removidas</span>
              </label>

              <span className="text-xs font-mono text-slate-400 tabular-nums">
                {filteredQuestions.length} questão(ões)
              </span>
            </div>
          </div>

          {/* Question List */}
          {paginatedQuestions.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <BookOpenCheck className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-sm font-bold text-slate-300">
                Nenhuma questão encontrada para este filtro.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800/80">
              {paginatedQuestions.map((entry) => {
                const q = entry.question;
                const answerLabel = q.opcoes[q.correta] || '—';
                return (
                  <div
                    key={`${entry.modulo}-${entry.id}`}
                    className={`p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition ${
                      entry.status === 'deleted'
                        ? 'bg-rose-950/15 opacity-70'
                        : 'hover:bg-slate-900/50'
                    }`}
                  >
                    <div className="space-y-1.5 min-w-0 flex-grow">
                      <div className="flex flex-wrap items-center gap-2 text-[11px]">
                        <span
                          className={`font-black uppercase px-2 py-0.5 rounded-md border ${
                            entry.status === 'custom'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : entry.status === 'edited'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : entry.status === 'deleted'
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                              : 'bg-slate-800 text-slate-300 border-slate-700'
                          }`}
                        >
                          {entry.status === 'custom'
                            ? 'Nova'
                            : entry.status === 'edited'
                            ? 'Editada'
                            : entry.status === 'deleted'
                            ? 'Removida'
                            : 'Original'}
                        </span>

                        <span className="font-bold text-cyan-300">{entry.subLabel}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-300 font-semibold">{q.temaNome}</span>
                        {q.habilidade && (
                          <span className="font-mono text-[10px] text-amber-300/90 bg-amber-950/50 px-1.5 py-0.5 rounded border border-amber-500/30">
                            {q.habilidade}
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-white font-semibold line-clamp-2 leading-relaxed">
                        {q.pergunta}
                      </p>

                      <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span>{q.opcoes.length} alternativas</span>
                        <span>•</span>
                        <span className="truncate max-w-xl">
                          <strong className={entry.modulo === 'oficial' ? 'text-amber-300' : 'text-emerald-300'}>
                            {entry.modulo === 'oficial' ? 'Incorreta (Gabarito):' : 'Correta:'}
                          </strong>{' '}
                          {answerLabel}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => openEditQuestionModal(entry)}
                        className="bg-cyan-950 hover:bg-cyan-900 text-cyan-200 border border-cyan-500/40 font-bold px-3 py-1.5 rounded-lg text-xs inline-flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" /> Editar / Reformular
                      </button>

                      {entry.isBuiltIn && (entry.status === 'edited' || entry.status === 'deleted') && (
                        <button
                          type="button"
                          onClick={() => handleRestoreQuestion(entry)}
                          className="bg-amber-950/70 hover:bg-amber-900/80 text-amber-200 border border-amber-500/40 font-bold px-3 py-1.5 rounded-lg text-xs inline-flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> Restaurar
                        </button>
                      )}

                      {entry.status !== 'deleted' && (
                        <button
                          type="button"
                          onClick={() => setQuestionToDelete(entry)}
                          className="bg-rose-950/70 hover:bg-rose-900/80 text-rose-300 border border-rose-500/40 font-bold px-3 py-1.5 rounded-lg text-xs inline-flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remover
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalQuestionPages > 1 && (
            <div className="p-4 bg-[#070b18] border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <span className="font-mono tabular-nums">
                Página {safeQuestionPage} de {totalQuestionPages}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={safeQuestionPage <= 1}
                  onClick={() => setQuestionPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-lg bg-[#0b1329] border border-slate-700 disabled:opacity-40 hover:border-cyan-400/50 flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Anterior
                </button>
                <button
                  type="button"
                  disabled={safeQuestionPage >= totalQuestionPages}
                  onClick={() => setQuestionPage((p) => Math.min(totalQuestionPages, p + 1))}
                  className="px-3 py-1.5 rounded-lg bg-[#0b1329] border border-slate-700 disabled:opacity-40 hover:border-cyan-400/50 flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed"
                >
                  Próxima <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          ADMIN MODALS PORTAL (z-[9999] IN FOREGROUND ABOVE HEADER & NAV BAR)
         ===================================================================== */}
      {typeof document !== 'undefined' &&
        hasOpenModal &&
        createPortal(
          <>
            {/* MODAL: CREATE / EDIT USER */}
            {userModalMode && (
              <div
                onClick={(e) => {
                  if (e.target === e.currentTarget) setUserModalMode(null);
                }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 sm:py-6 overflow-y-auto"
              >
                <div className="bg-[#0b1329] border-2 border-cyan-500/50 rounded-3xl p-6 sm:p-7 max-w-lg w-full space-y-5 shadow-[0_0_40px_rgba(0,240,255,0.25)] my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                {userModalMode === 'create' ? (
                  <>
                    <UserPlus className="w-5 h-5 text-cyan-400" /> Cadastrar Novo Usuário
                  </>
                ) : (
                  <>
                    <KeyRound className="w-5 h-5 text-amber-400" /> Editar Usuário / Alterar Senha
                  </>
                )}
              </h3>
              <button
                type="button"
                onClick={() => setUserModalMode(null)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {userFormError && (
              <div className="p-3 bg-rose-950/70 border border-rose-500/50 rounded-xl text-xs text-rose-200 font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{userFormError}</span>
              </div>
            )}

            <form onSubmit={handleSaveUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-cyan-300 uppercase mb-1">
                  Perfil do Usuário
                </label>
                {userModalMode === 'edit' && formTipo === 'admin' ? (
                  <div className="px-4 py-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs font-bold">
                    Administrador do Sistema
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 p-1 bg-[#060a16] border border-cyan-500/30 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setFormTipo('aluno')}
                      className={`py-2 rounded-lg text-xs font-black transition cursor-pointer ${
                        formTipo === 'aluno'
                          ? 'bg-cyan-500 text-slate-950'
                          : 'text-slate-400 hover:text-cyan-300'
                      }`}
                    >
                      Aluno
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormTipo('professor')}
                      className={`py-2 rounded-lg text-xs font-black transition cursor-pointer ${
                        formTipo === 'professor'
                          ? 'bg-purple-500 text-slate-950'
                          : 'text-slate-400 hover:text-purple-300'
                      }`}
                    >
                      Professor
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-cyan-300 uppercase mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  value={formNome}
                  onChange={(e) => setFormNome(e.target.value)}
                  placeholder="Nome completo"
                  className="w-full px-4 py-2.5 rounded-xl border border-cyan-500/30 bg-[#060a16] text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-cyan-300 uppercase mb-1">
                  Login / E-mail de Acesso
                </label>
                <input
                  type="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder={
                    formTipo === 'aluno'
                      ? '000111222SP@aluno.educacao.sp.gov.br'
                      : formTipo === 'professor'
                      ? 'nome@professor.educacao.sp.gov.br'
                      : 'admin@detetivematematico.sp.gov.br'
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-cyan-500/30 bg-[#060a16] text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-sm font-mono"
                />
              </div>

              {formTipo === 'aluno' && (
                <div>
                  <label className="block text-xs font-bold text-cyan-300 uppercase mb-1">
                    Série / Turma
                  </label>
                  <select
                    value={formSerie}
                    onChange={(e) => setFormSerie(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-cyan-500/30 bg-[#060a16] text-white focus:ring-2 focus:ring-cyan-400 focus:outline-none text-sm cursor-pointer"
                  >
                    {INITIAL_SERIES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {formTipo === 'professor' && (
                <div>
                  <label className="block text-xs font-bold text-cyan-300 uppercase mb-1">
                    Disciplina que Ministra
                  </label>
                  <select
                    value={formMateria}
                    onChange={(e) => setFormMateria(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-cyan-500/30 bg-[#060a16] text-white focus:ring-2 focus:ring-cyan-400 focus:outline-none text-sm cursor-pointer"
                  >
                    {DISCIPLINAS_ESCOLARES.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-cyan-300 uppercase mb-1">
                  Senha de Acesso (mínimo 3 caracteres)
                </label>
                <div className="relative">
                  <input
                    type={showFormPassword ? 'text' : 'password'}
                    required
                    value={formSenha}
                    onChange={(e) => setFormSenha(e.target.value)}
                    placeholder="Digite a senha"
                    className="w-full pl-4 pr-11 py-2.5 rounded-xl border border-cyan-500/30 bg-[#060a16] text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-sm font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowFormPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-300 p-1 cursor-pointer"
                  >
                    {showFormPassword ? <EyeOff className="w-4 h-4 text-cyan-400" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setUserModalMode(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-700 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wide cursor-pointer"
                >
                  {userModalMode === 'create' ? 'Cadastrar Usuário' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

            {/* MODAL: CONFIRM DELETE USER */}
            {userToDelete && (
              <div
                onClick={(e) => {
                  if (e.target === e.currentTarget) setUserToDelete(null);
                }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
              >
                <div className="bg-[#0b1329] border-2 border-rose-500/50 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-[0_0_35px_rgba(244,63,94,0.25)]">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-rose-400" /> Remover Usuário
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Tem certeza que deseja remover{' '}
              <strong className="text-white">{userToDelete.nome}</strong> (
              <span className="font-mono text-xs text-rose-300">{userToDelete.email}</span>) da plataforma?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setUserToDelete(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-700 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteUser}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase cursor-pointer"
              >
                Confirmar Remoção
              </button>
            </div>
          </div>
        </div>
      )}

            {/* MODAL: CREATE / EDIT / REFORMULATE QUESTION */}
            {questionModalMode && (
              <div
                onClick={(e) => {
                  if (e.target === e.currentTarget) setQuestionModalMode(null);
                }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 sm:py-6 overflow-y-auto"
              >
                <div className="bg-[#0b1329] border-2 border-amber-500/50 rounded-3xl p-6 sm:p-7 max-w-2xl w-full space-y-5 shadow-[0_0_45px_rgba(251,191,36,0.28)] my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                {questionModalMode === 'create' ? (
                  <>
                    <Plus className="w-5 h-5 text-emerald-400" /> Adicionar Nova Questão
                  </>
                ) : (
                  <>
                    <Pencil className="w-5 h-5 text-amber-400" /> Editar / Reformular Questão
                  </>
                )}
              </h3>
              <button
                type="button"
                onClick={() => setQuestionModalMode(null)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {questionFormError && (
              <div className="p-3 bg-rose-950/70 border border-rose-500/50 rounded-xl text-xs text-rose-200 font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{questionFormError}</span>
              </div>
            )}

            <form onSubmit={handleSaveQuestion} className="space-y-4">
              {/* Module + Category row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                    Módulo / Desafio
                  </label>
                  <select
                    value={qModulo}
                    disabled={questionModalMode === 'edit' && !!editingEntry?.isBuiltIn}
                    onChange={(e) => {
                      const nextMod = e.target.value as QuestionModule;
                      setQModulo(nextMod);
                      if (nextMod === 'oficial') {
                        setQTemaNome(ETAPA_DEFAULT_THEME[qEtapa]?.nome || 'Teorema de Pitágoras');
                      } else if (nextMod === 'treine_mais') {
                        setQTemaNome(NIVEL_DEFAULT_THEME[qNivel].nome);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amber-500/35 bg-[#060a16] text-white text-xs sm:text-sm font-bold disabled:opacity-60 cursor-pointer"
                  >
                    <option value="oficial">Desafio Oficial</option>
                    <option value="treine_mais">Treine Mais</option>
                    <option value="curriculo_acao">Currículo em Ação</option>
                  </select>
                </div>

                {qModulo === 'oficial' && (
                  <div>
                    <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                      Etapa do Desafio Oficial
                    </label>
                    <select
                      value={qEtapa}
                      onChange={(e) => {
                        const etapaVal = Number(e.target.value);
                        setQEtapa(etapaVal);
                        if (questionModalMode === 'create') {
                          setQTemaNome(ETAPA_DEFAULT_THEME[etapaVal]?.nome || '');
                        }
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-amber-500/35 bg-[#060a16] text-white text-xs sm:text-sm font-bold cursor-pointer"
                    >
                      <option value={1}>Etapa 1 • Teorema de Pitágoras</option>
                      <option value={2}>Etapa 2 • Lei dos Senos</option>
                      <option value={3}>Etapa 3 • Lei dos Cossenos</option>
                      <option value={4}>Etapa 4 • Semelhança de Triângulos</option>
                    </select>
                  </div>
                )}

                {qModulo === 'treine_mais' && (
                  <div>
                    <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                      Nível do Treine Mais
                    </label>
                    <select
                      value={qNivel}
                      onChange={(e) => {
                        const nivelVal = e.target.value as 'iniciante' | 'intermediario' | 'avancado';
                        setQNivel(nivelVal);
                        if (questionModalMode === 'create') {
                          setQTemaNome(NIVEL_DEFAULT_THEME[nivelVal].nome);
                        }
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-amber-500/35 bg-[#060a16] text-white text-xs sm:text-sm font-bold cursor-pointer"
                    >
                      <option value="iniciante">Nível Iniciante</option>
                      <option value="intermediario">Nível Intermediário</option>
                      <option value="avancado">Nível Avançado</option>
                    </select>
                  </div>
                )}

                {qModulo === 'curriculo_acao' && (
                  <div>
                    <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                      Série / Ano Escolar
                    </label>
                    <select
                      value={qSerie}
                      onChange={(e) => setQSerie(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-amber-500/35 bg-[#060a16] text-white text-xs sm:text-sm font-bold cursor-pointer"
                    >
                      {CURRICULO_SERIES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {qModulo === 'oficial' && (
                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200 leading-relaxed">
                  <strong>Regra do Desafio Oficial (Gabarito Invertido):</strong> marque abaixo qual alternativa contém a afirmação <strong>INCORRETA</strong> que o aluno detetive deverá descobrir.
                </div>
              )}

              {/* Tema + Optional Aula / Habilidade */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                    Tema / Tópico
                  </label>
                  <input
                    type="text"
                    required
                    value={qTemaNome}
                    onChange={(e) => setQTemaNome(e.target.value)}
                    placeholder="Ex.: Teorema de Pitágoras"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amber-500/35 bg-[#060a16] text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-400 focus:outline-none text-xs sm:text-sm"
                  />
                </div>

                {qModulo === 'curriculo_acao' ? (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                        Habilidade (opc.)
                      </label>
                      <input
                        type="text"
                        value={qHabilidade}
                        onChange={(e) => setQHabilidade(e.target.value)}
                        placeholder="Ex.: EF09MA13"
                        className="w-full px-3 py-2.5 rounded-xl border border-amber-500/35 bg-[#060a16] text-white placeholder-slate-500 text-xs font-mono"
                      />
                    </div>
                    {qSerie === '3º Ano Ensino Médio' && (
                      <div>
                        <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                          Aula Nº (opc.)
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={40}
                          value={qAulaNumero}
                          onChange={(e) => setQAulaNumero(e.target.value)}
                          placeholder="1–24"
                          className="w-full px-3 py-2.5 rounded-xl border border-amber-500/35 bg-[#060a16] text-white placeholder-slate-500 text-xs font-mono"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                      Dica de Investigação (opcional)
                    </label>
                    <input
                      type="text"
                      value={qDica}
                      onChange={(e) => setQDica(e.target.value)}
                      placeholder="Dica pedagógica curta para o aluno"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-amber-500/35 bg-[#060a16] text-white placeholder-slate-500 text-xs sm:text-sm"
                    />
                  </div>
                )}
              </div>

              {/* Enunciado */}
              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                  Enunciado da Questão
                </label>
                <textarea
                  rows={3}
                  required
                  value={qPergunta}
                  onChange={(e) => setQPergunta(e.target.value)}
                  placeholder="Escreva ou reformule o enunciado completo da questão..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-500/35 bg-[#060a16] text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-400 focus:outline-none text-xs sm:text-sm leading-relaxed"
                />
              </div>

              {/* Alternativas */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-amber-300 uppercase">
                    Alternativas — marque a{' '}
                    {qModulo === 'oficial' ? 'afirmação INCORRETA (gabarito)' : 'resposta CORRETA'}
                  </label>
                  {qOpcoes.length < 5 && (
                    <button
                      type="button"
                      onClick={handleAddOption}
                      className="text-[11px] font-bold text-emerald-300 hover:text-emerald-200 cursor-pointer"
                    >
                      + Adicionar alternativa
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {qOpcoes.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correct-option"
                        checked={qCorreta === idx}
                        onChange={() => setQCorreta(idx)}
                        className="w-4 h-4 accent-emerald-400 cursor-pointer shrink-0"
                        title="Definir como gabarito"
                      />
                      <span className="text-xs font-mono font-bold text-slate-400 w-5 shrink-0">
                        {String.fromCharCode(65 + idx)})
                      </span>
                      <input
                        type="text"
                        required
                        value={opt}
                        onChange={(e) => handleOptionChange(idx, e.target.value)}
                        placeholder={`Texto da alternativa ${String.fromCharCode(65 + idx)}`}
                        className={`flex-grow px-3 py-2 rounded-xl border bg-[#060a16] text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none ${
                          qCorreta === idx
                            ? 'border-emerald-400/70 ring-1 ring-emerald-400/40'
                            : 'border-slate-700 focus:border-amber-400'
                        }`}
                      />
                      {qOpcoes.length > 2 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveOption(idx)}
                          className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer shrink-0"
                          title="Remover alternativa"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Explicação */}
              <div>
                <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                  Explicação / Resolução Pedagógica
                </label>
                <textarea
                  rows={2}
                  value={qPorque}
                  onChange={(e) => setQPorque(e.target.value)}
                  placeholder="Explique passo a passo o porquê da resposta..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-500/35 bg-[#060a16] text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-400 focus:outline-none text-xs sm:text-sm leading-relaxed"
                />
              </div>

              {qModulo === 'curriculo_acao' && (
                <div>
                  <label className="block text-xs font-bold text-amber-300 uppercase mb-1">
                    Dica de Investigação (opcional)
                  </label>
                  <input
                    type="text"
                    value={qDica}
                    onChange={(e) => setQDica(e.target.value)}
                    placeholder="Dica curta exibida ao aluno quando solicitar ajuda"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amber-500/35 bg-[#060a16] text-white placeholder-slate-500 text-xs sm:text-sm"
                  />
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setQuestionModalMode(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-700 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wide cursor-pointer"
                >
                  {questionModalMode === 'create' ? 'Adicionar Questão' : 'Salvar Questão'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

            {/* MODAL: CONFIRM DELETE QUESTION */}
            {questionToDelete && (
              <div
                onClick={(e) => {
                  if (e.target === e.currentTarget) setQuestionToDelete(null);
                }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
              >
                <div className="bg-[#0b1329] border-2 border-rose-500/50 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-[0_0_35px_rgba(244,63,94,0.25)]">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-rose-400" /> Remover Questão
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {questionToDelete.isBuiltIn
                ? 'Esta questão deixará de aparecer nos desafios para alunos e professores. Você poderá restaurá-la depois ativando "Mostrar removidas".'
                : 'Esta questão personalizada será excluída permanentemente da plataforma.'}
            </p>
            <div className="p-3 rounded-xl bg-[#060a16] border border-slate-800 text-xs text-slate-300 line-clamp-3">
              {questionToDelete.question.pergunta}
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setQuestionToDelete(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-700 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteQuestion}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase cursor-pointer"
              >
                Confirmar Remoção
              </button>
            </div>
          </div>
        </div>
      )}
          </>,
          document.body
        )}
    </div>
  );
};
