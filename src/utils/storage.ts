import {
  User,
  QuestionAttempt,
  SessionResult,
  TeacherThemeStats,
  StudentComparisonData,
  TeacherComparativeSummary,
  QuestionOverride
} from '../types';
import { db, handleFirestoreError, OperationType, testConnection } from './firebase';
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  onSnapshot,
  collection,
  writeBatch
} from 'firebase/firestore';
import { recordUserLoginEvent } from './neonDatabase';
import {
  buildCommunitySeedDataset,
  build3EmExpansionDataset,
  CommunitySeedDataset
} from '../data/communitySeedData';

const STORAGE_KEYS = {
  USERS: 'detetive_db_usuarios',
  SESSION_USER: 'detetive_session_user',
  RESULTS: 'detetive_db_resultados',
  ATTEMPTS: 'detetive_db_attempts',
  QUESTION_OVERRIDES: 'detetive_db_question_overrides',
  SYNC_INIT: 'detetive_db_firebase_synced_v1',
  COMMUNITY_SEED_V2: 'detetive_db_community_seed_v2',
  COMMUNITY_SEED_V3_3EM: 'detetive_db_community_seed_v3_3em'
};

export const INITIAL_SERIES = [
  '6º Ano Fundamental',
  '7º Ano Fundamental',
  '8º Ano Fundamental',
  '9º Ano Fundamental',
  '1º Ano Ensino Médio',
  '2º Ano Ensino Médio',
  '3º Ano Ensino Médio'
];

type SyncListener = () => void;
const listeners: Set<SyncListener> = new Set();

function notifyListeners() {
  listeners.forEach(fn => {
    try {
      fn();
    } catch (e) {
      console.error('Error notifying sync listener', e);
    }
  });
}

// In-memory cache synced with Firestore and localStorage
let inMemoryUsers: User[] = [];
let inMemoryResults: SessionResult[] = [];
let inMemoryAttempts: QuestionAttempt[] = [];
let inMemoryQuestionOverrides: QuestionOverride[] = [];
let isFirebaseConnected = false;
let isSyncing = false;
let syncStarted = false;
let isCommunitySeeding = false;

function isLegacyDefaultTeacher(u: User): boolean {
  return (
    u.id === 'prof-ariane-braz' ||
    (u.tipo === 'professor' && u.email?.toLowerCase().trim() === 'arianebraz3@gmail.com')
  );
}

// Load initial cache from localStorage
try {
  const u = localStorage.getItem(STORAGE_KEYS.USERS);
  if (u) {
    const parsedUsers: User[] = JSON.parse(u);
    inMemoryUsers = parsedUsers.filter(user => !isLegacyDefaultTeacher(user));
  }
  const r = localStorage.getItem(STORAGE_KEYS.RESULTS);
  if (r) inMemoryResults = JSON.parse(r);
  const a = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
  if (a) inMemoryAttempts = JSON.parse(a);
  const q = localStorage.getItem(STORAGE_KEYS.QUESTION_OVERRIDES);
  if (q) inMemoryQuestionOverrides = JSON.parse(q);
} catch {
  // Ignore in restricted environments
}

/**
 * Real-time synchronization with Google Cloud Firestore
 */
export function initFirestoreSync() {
  if (syncStarted) return;
  syncStarted = true;
  isSyncing = true;

  testConnection().then(connected => {
    isFirebaseConnected = connected;
    notifyListeners();
  });

  // 1. Listen to 'users' collection in Google Cloud Firestore
  try {
    const usersCol = collection(db, 'users');
    onSnapshot(
      usersCol,
      snapshot => {
        const remoteUsers: User[] = [];
        snapshot.forEach(docSnap => {
          const data = docSnap.data() as User;
          if (data && data.id) {
            if (isLegacyDefaultTeacher(data)) {
              // Remove legacy default teacher from Firestore automatically
              deleteDoc(doc(db, 'users', data.id)).catch(() => {});
              return;
            }
            remoteUsers.push(data);
          }
        });

        if (!isCommunitySeeding && (remoteUsers.length > 0 || snapshot.empty)) {
          inMemoryUsers = remoteUsers;
          ensureDefaultAdminInMemoryOnly();
          try {
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(inMemoryUsers));
          } catch {}
          isFirebaseConnected = true;
          isSyncing = false;
          notifyListeners();
        }
      },
      error => {
        console.warn('Realtime sync users notice:', error.message);
        handleFirestoreError(error, OperationType.GET, 'users');
      }
    );
  } catch (err) {
    console.error('Failed to attach users snapshot listener:', err);
  }

  // 2. Listen to 'results' collection in Google Cloud Firestore
  try {
    const resultsCol = collection(db, 'results');
    onSnapshot(
      resultsCol,
      snapshot => {
        const remoteResults: SessionResult[] = [];
        snapshot.forEach(docSnap => {
          const data = docSnap.data() as SessionResult;
          if (data && data.id) {
            remoteResults.push(data);
          }
        });

        if (!isCommunitySeeding) {
          inMemoryResults = remoteResults;
          try {
            localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(inMemoryResults));
          } catch {}
          isFirebaseConnected = true;
          isSyncing = false;
          notifyListeners();
        }
      },
      error => {
        console.warn('Realtime sync results notice:', error.message);
        handleFirestoreError(error, OperationType.GET, 'results');
      }
    );
  } catch (err) {
    console.error('Failed to attach results snapshot listener:', err);
  }

  // 3. Listen to 'attempts' collection in Google Cloud Firestore
  try {
    const attemptsCol = collection(db, 'attempts');
    onSnapshot(
      attemptsCol,
      snapshot => {
        const remoteAttempts: QuestionAttempt[] = [];
        snapshot.forEach(docSnap => {
          const data = docSnap.data() as QuestionAttempt;
          if (data && data.id) {
            remoteAttempts.push(data);
          }
        });

        if (!isCommunitySeeding) {
          inMemoryAttempts = remoteAttempts;
          try {
            localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(inMemoryAttempts));
          } catch {}
          isFirebaseConnected = true;
          isSyncing = false;
          notifyListeners();
        }
      },
      error => {
        console.warn('Realtime sync attempts notice:', error.message);
        handleFirestoreError(error, OperationType.GET, 'attempts');
      }
    );
  } catch (err) {
    console.error('Failed to attach attempts snapshot listener:', err);
  }

  // 4. Listen to 'question_overrides' collection in Google Cloud Firestore
  try {
    const overridesCol = collection(db, 'question_overrides');
    onSnapshot(
      overridesCol,
      snapshot => {
        const remoteOverrides: QuestionOverride[] = [];
        snapshot.forEach(docSnap => {
          const data = docSnap.data() as QuestionOverride;
          if (data && data.id) {
            remoteOverrides.push(data);
          }
        });

        inMemoryQuestionOverrides = remoteOverrides;
        try {
          localStorage.setItem(
            STORAGE_KEYS.QUESTION_OVERRIDES,
            JSON.stringify(inMemoryQuestionOverrides)
          );
        } catch {}
        isFirebaseConnected = true;
        isSyncing = false;
        notifyListeners();
      },
      error => {
        console.warn('Realtime sync question_overrides notice:', error.message);
        handleFirestoreError(error, OperationType.GET, 'question_overrides');
      }
    );
  } catch (err) {
    console.error('Failed to attach question_overrides snapshot listener:', err);
  }

  // Ensure default Administrator account exists and clean legacy teacher seed
  setTimeout(() => {
    ensureDefaultAdminAccount();
  }, 800);
}

// Automatically initiate sync on module load
if (typeof window !== 'undefined') {
  ensureDefaultAdminInMemoryOnly();
  initFirestoreSync();
}

function createDefaultAdminUser(): User {
  return {
    id: 'admin-master',
    nome: 'Administrador',
    tipo: 'admin',
    email: 'admin@detetivematematico.sp.gov.br',
    senha: 'admin123',
    serie: 'Administração',
    dataCadastro: new Date().toLocaleDateString('pt-BR')
  };
}

function ensureDefaultAdminInMemoryOnly() {
  const hasAdmin = inMemoryUsers.some(u => u.tipo === 'admin');
  if (!hasAdmin) {
    inMemoryUsers.push(createDefaultAdminUser());
  }
}

function ensureDefaultAdminAccount() {
  // Remove legacy Profª Ariane Braz teacher seed if present
  const legacyTeachers = inMemoryUsers.filter(isLegacyDefaultTeacher);
  if (legacyTeachers.length > 0) {
    inMemoryUsers = inMemoryUsers.filter(u => !isLegacyDefaultTeacher(u));
    legacyTeachers.forEach(t => {
      deleteDoc(doc(db, 'users', t.id)).catch(() => {});
    });
  }

  // Ensure Administrator account exists in Firestore
  const existingAdmin = inMemoryUsers.find(u => u.tipo === 'admin');
  if (!existingAdmin) {
    Storage.saveUser(createDefaultAdminUser());
  } else {
    // Persist the initial default admin to Firestore if needed
    const adminDocRef = doc(db, 'users', existingAdmin.id);
    setDoc(adminDocRef, {
      id: existingAdmin.id,
      nome: existingAdmin.nome,
      tipo: existingAdmin.tipo,
      email: existingAdmin.email,
      senha: existingAdmin.senha,
      serie: existingAdmin.serie,
      materia: existingAdmin.materia || '',
      dataCadastro: existingAdmin.dataCadastro
    }).catch(() => {});
  }

  runOneTimeSeedsIfNeeded().catch((err) => {
    console.warn('Community seed check notice:', err instanceof Error ? err.message : err);
  });
}

async function runOneTimeSeedsIfNeeded(): Promise<void> {
  if (isCommunitySeeding) return;

  isCommunitySeeding = true;
  try {
    await applyOneTimeSeedIfNeeded(
      'seed_v2_community',
      STORAGE_KEYS.COMMUNITY_SEED_V2,
      () => buildCommunitySeedDataset(),
      { version: 2, studentCount: 51, teacherCount: 6 }
    );

    await applyOneTimeSeedIfNeeded(
      'seed_v3_3em_35',
      STORAGE_KEYS.COMMUNITY_SEED_V3_3EM,
      () => build3EmExpansionDataset(),
      { version: 3, added3EmStudents: 35, bimester: 2 }
    );
  } finally {
    isCommunitySeeding = false;
  }
}

async function applyOneTimeSeedIfNeeded(
  sentinelDocId: string,
  localFlagKey: string,
  buildDataset: () => CommunitySeedDataset,
  sentinelMeta: Record<string, unknown>
): Promise<void> {
  const seedSentinelRef = doc(db, 'test', sentinelDocId);

  // Check Firestore sentinel first so deletions made by Admin persist across devices and refreshes
  try {
    const sentinelSnap = await getDoc(seedSentinelRef);
    if (sentinelSnap.exists()) {
      try {
        localStorage.setItem(localFlagKey, '1');
      } catch {}
      return;
    }
  } catch {
    // Fallback to local flag if offline
    try {
      if (localStorage.getItem(localFlagKey) === '1') {
        return;
      }
    } catch {}
  }

  const dataset = buildDataset();

  const existingUserIds = new Set(inMemoryUsers.map((u) => u.id));
  const existingEmails = new Set(
    inMemoryUsers.map((u) => (u.email || '').trim().toLowerCase())
  );
  const existingResultIds = new Set(inMemoryResults.map((r) => r.id));
  const existingAttemptIds = new Set(inMemoryAttempts.map((a) => a.id));

  const newUsers = dataset.users.filter(
    (u) => !existingUserIds.has(u.id) && !existingEmails.has(u.email.trim().toLowerCase())
  );
  const newResults = dataset.results.filter((r) => !existingResultIds.has(r.id));
  const newAttempts = dataset.attempts.filter((a) => !existingAttemptIds.has(a.id));

  // Update local cache immediately for instant UI responsiveness
  inMemoryUsers = [...inMemoryUsers, ...newUsers];
  inMemoryResults = [...inMemoryResults, ...newResults];
  inMemoryAttempts = [...inMemoryAttempts, ...newAttempts];

  try {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(inMemoryUsers));
    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(inMemoryResults));
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(inMemoryAttempts));
    localStorage.setItem(localFlagKey, '1');
  } catch {}
  notifyListeners();

  // Persist to Firestore in atomic batches (max 400 ops per batch)
  type PendingWrite = { ref: ReturnType<typeof doc>; data: Record<string, unknown> };
  const writes: PendingWrite[] = [];

  newUsers.forEach((user) => {
    writes.push({
      ref: doc(db, 'users', user.id),
      data: {
        id: user.id,
        nome: user.nome,
        tipo: user.tipo,
        email: user.email,
        senha: user.senha,
        serie: user.serie,
        materia: user.materia || '',
        dataCadastro: user.dataCadastro
      }
    });
  });

  newResults.forEach((result) => {
    writes.push({
      ref: doc(db, 'results', result.id),
      data: {
        id: result.id,
        usuarioId: result.usuarioId,
        alunoNome: result.alunoNome,
        serie: result.serie,
        modo: result.modo,
        etapaNome: result.etapaNome,
        acertos: result.acertos,
        erros: result.erros,
        tempoTotalSegundos: result.tempoTotalSegundos,
        tempoMedioPorQuestao: result.tempoMedioPorQuestao,
        data: result.data,
        timestamp: result.timestamp
      }
    });
  });

  newAttempts.forEach((attempt) => {
    writes.push({
      ref: doc(db, 'attempts', attempt.id),
      data: {
        id: attempt.id,
        usuarioId: attempt.usuarioId,
        alunoNome: attempt.alunoNome,
        serie: attempt.serie,
        modo: attempt.modo,
        etapaNumero: attempt.etapaNumero || 1,
        temaNome: attempt.temaNome,
        pergunta: attempt.pergunta,
        respostaSelecionada: attempt.respostaSelecionada,
        respostaCorreta: attempt.respostaCorreta,
        acertou: attempt.acertou,
        tempoGastoSegundos: attempt.tempoGastoSegundos,
        data: attempt.data,
        timestamp: attempt.timestamp
      }
    });
  });

  writes.push({
    ref: seedSentinelRef,
    data: {
      ...sentinelMeta,
      appliedAt: Date.now()
    }
  });

  const BATCH_LIMIT = 400;
  for (let i = 0; i < writes.length; i += BATCH_LIMIT) {
    const batch = writeBatch(db);
    const slice = writes.slice(i, i + BATCH_LIMIT);
    slice.forEach((item) => {
      batch.set(item.ref, item.data);
    });
    await batch.commit();
  }
}

export const Storage = {
  subscribe(listener: SyncListener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  getSyncStatus() {
    return {
      connected: isFirebaseConnected,
      syncing: isSyncing,
      userCount: inMemoryUsers.length,
      resultCount: inMemoryResults.length,
      attemptCount: inMemoryAttempts.length
    };
  },

  getUsers(): User[] {
    return inMemoryUsers;
  },

  saveUser(user: User): void {
    // 1. Update in-memory & local storage immediately
    const existingIndex = inMemoryUsers.findIndex(
      u => u.id === user.id || u.email.toLowerCase() === user.email.toLowerCase()
    );
    if (existingIndex >= 0) {
      inMemoryUsers[existingIndex] = user;
    } else {
      inMemoryUsers.push(user);
    }
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(inMemoryUsers));
    } catch {}
    notifyListeners();

    // 2. Persist to Google Cloud Firestore database
    const userDocRef = doc(db, 'users', user.id);
    setDoc(userDocRef, {
      id: user.id,
      nome: user.nome,
      tipo: user.tipo,
      email: user.email,
      senha: user.senha,
      serie: user.serie,
      materia: user.materia || '',
      dataCadastro: user.dataCadastro
    }).catch(error => {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.id}`);
    });
  },

  getUserById(id: string): User | undefined {
    if (!id) return undefined;
    const cleanId = id.trim().toLowerCase();
    return inMemoryUsers.find(u => u.id.toLowerCase() === cleanId || u.email.toLowerCase() === cleanId);
  },

  updateUserPassword(id: string, newPassword: string): boolean {
    if (!id || !newPassword) return false;
    const cleanId = id.trim().toLowerCase();
    const user = inMemoryUsers.find(
      u => u.id.toLowerCase() === cleanId || u.email.toLowerCase() === cleanId
    );

    if (user) {
      user.senha = newPassword;
      try {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(inMemoryUsers));
      } catch {}

      // Update session if same user
      const sessionUser = this.getSessionUser();
      if (sessionUser && (sessionUser.id.toLowerCase() === cleanId || sessionUser.email.toLowerCase() === cleanId)) {
        sessionUser.senha = newPassword;
        this.setSessionUser(sessionUser);
      }

      notifyListeners();

      // Sync to Google Cloud Firestore
      const userDocRef = doc(db, 'users', user.id);
      setDoc(userDocRef, {
        id: user.id,
        nome: user.nome,
        tipo: user.tipo,
        email: user.email,
        senha: newPassword,
        serie: user.serie,
        materia: user.materia || '',
        dataCadastro: user.dataCadastro
      }).catch(error => {
        handleFirestoreError(error, OperationType.UPDATE, `users/${user.id}`);
      });

      return true;
    }
    return false;
  },

  updateUser(id: string, updates: Partial<Omit<User, 'id'>>): User | null {
    const idx = inMemoryUsers.findIndex(u => u.id === id);
    if (idx < 0) return null;

    const updatedUser: User = {
      ...inMemoryUsers[idx],
      ...updates,
      id: inMemoryUsers[idx].id
    };

    inMemoryUsers[idx] = updatedUser;
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(inMemoryUsers));
    } catch {}

    // Keep active session synchronized if the edited user is currently signed in
    const sessionUser = this.getSessionUser();
    if (sessionUser && sessionUser.id === updatedUser.id) {
      this.setSessionUser(updatedUser);
    }

    notifyListeners();

    const userDocRef = doc(db, 'users', updatedUser.id);
    setDoc(userDocRef, {
      id: updatedUser.id,
      nome: updatedUser.nome,
      tipo: updatedUser.tipo,
      email: updatedUser.email,
      senha: updatedUser.senha,
      serie: updatedUser.serie,
      materia: updatedUser.materia || '',
      dataCadastro: updatedUser.dataCadastro
    }).catch(error => {
      handleFirestoreError(error, OperationType.UPDATE, `users/${updatedUser.id}`);
    });

    return updatedUser;
  },

  deleteUser(id: string): boolean {
    const exists = inMemoryUsers.some(u => u.id === id);
    if (!exists) return false;

    const userResults = inMemoryResults.filter(r => r.usuarioId === id);
    const userAttempts = inMemoryAttempts.filter(a => a.usuarioId === id);

    inMemoryUsers = inMemoryUsers.filter(u => u.id !== id);
    inMemoryResults = inMemoryResults.filter(r => r.usuarioId !== id);
    inMemoryAttempts = inMemoryAttempts.filter(a => a.usuarioId !== id);

    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(inMemoryUsers));
      localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(inMemoryResults));
      localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(inMemoryAttempts));
    } catch {}

    notifyListeners();

    const refsToDelete = [
      doc(db, 'users', id),
      ...userResults.map(r => doc(db, 'results', r.id)),
      ...userAttempts.map(a => doc(db, 'attempts', a.id))
    ];

    const BATCH_LIMIT = 400;
    for (let i = 0; i < refsToDelete.length; i += BATCH_LIMIT) {
      const batch = writeBatch(db);
      refsToDelete.slice(i, i + BATCH_LIMIT).forEach(ref => batch.delete(ref));
      batch.commit().catch(error => {
        handleFirestoreError(error, OperationType.DELETE, `users/${id}`);
      });
    }

    return true;
  },

  getQuestionOverrides(): QuestionOverride[] {
    return inMemoryQuestionOverrides;
  },

  saveQuestionOverride(override: QuestionOverride): void {
    const cleanOverride: QuestionOverride = {
      id: override.id,
      modulo: override.modulo,
      status: override.status,
      updatedAt: override.updatedAt || Date.now()
    };

    if (typeof override.etapa === 'number') cleanOverride.etapa = override.etapa;
    if (override.nivel) cleanOverride.nivel = override.nivel;
    if (override.serie) cleanOverride.serie = override.serie;
    if (typeof override.aulaNumero === 'number') cleanOverride.aulaNumero = override.aulaNumero;
    if (override.aulaTitulo) cleanOverride.aulaTitulo = override.aulaTitulo;
    if (override.temaKey) cleanOverride.temaKey = override.temaKey;
    if (override.temaNome) cleanOverride.temaNome = override.temaNome;
    if (override.pergunta !== undefined) cleanOverride.pergunta = override.pergunta;
    if (Array.isArray(override.opcoes)) cleanOverride.opcoes = override.opcoes;
    if (typeof override.correta === 'number') cleanOverride.correta = override.correta;
    if (override.porque !== undefined) cleanOverride.porque = override.porque;
    if (override.dicaInvestigacao !== undefined) cleanOverride.dicaInvestigacao = override.dicaInvestigacao;
    if (override.svgType) cleanOverride.svgType = override.svgType;
    if (typeof override.invertida === 'boolean') cleanOverride.invertida = override.invertida;
    if (override.habilidade) cleanOverride.habilidade = override.habilidade;

    const existingIdx = inMemoryQuestionOverrides.findIndex(o => o.id === cleanOverride.id);
    if (existingIdx >= 0) {
      inMemoryQuestionOverrides[existingIdx] = cleanOverride;
    } else {
      inMemoryQuestionOverrides.push(cleanOverride);
    }

    try {
      localStorage.setItem(
        STORAGE_KEYS.QUESTION_OVERRIDES,
        JSON.stringify(inMemoryQuestionOverrides)
      );
    } catch {}
    notifyListeners();

    const docRef = doc(db, 'question_overrides', cleanOverride.id);
    setDoc(docRef, cleanOverride).catch(error => {
      handleFirestoreError(error, OperationType.WRITE, `question_overrides/${cleanOverride.id}`);
    });
  },

  deleteQuestionOverride(id: string): void {
    inMemoryQuestionOverrides = inMemoryQuestionOverrides.filter(o => o.id !== id);
    try {
      localStorage.setItem(
        STORAGE_KEYS.QUESTION_OVERRIDES,
        JSON.stringify(inMemoryQuestionOverrides)
      );
    } catch {}
    notifyListeners();

    deleteDoc(doc(db, 'question_overrides', id)).catch(error => {
      handleFirestoreError(error, OperationType.DELETE, `question_overrides/${id}`);
    });
  },

  getSessionUser(): User | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SESSION_USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setSessionUser(user: User | null): void {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.SESSION_USER, JSON.stringify(user));
      recordUserLoginEvent(user);
    } else {
      localStorage.removeItem(STORAGE_KEYS.SESSION_USER);
    }
    notifyListeners();
  },

  getResults(): SessionResult[] {
    return inMemoryResults;
  },

  saveResult(result: SessionResult): void {
    // 1. Optimistic in-memory & local cache update
    inMemoryResults.push(result);
    try {
      localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(inMemoryResults));
    } catch {}
    notifyListeners();

    // 2. Persist to Google Cloud Firestore
    const resultDocRef = doc(db, 'results', result.id);
    setDoc(resultDocRef, {
      id: result.id,
      usuarioId: result.usuarioId,
      alunoNome: result.alunoNome,
      serie: result.serie,
      modo: result.modo,
      etapaNome: result.etapaNome,
      acertos: result.acertos,
      erros: result.erros,
      tempoTotalSegundos: result.tempoTotalSegundos,
      tempoMedioPorQuestao: result.tempoMedioPorQuestao,
      data: result.data,
      timestamp: result.timestamp
    }).catch(error => {
      handleFirestoreError(error, OperationType.WRITE, `results/${result.id}`);
    });
  },

  getAttempts(): QuestionAttempt[] {
    return inMemoryAttempts;
  },

  saveAttempt(attempt: QuestionAttempt): void {
    // 1. Optimistic in-memory & local cache update
    inMemoryAttempts.push(attempt);
    try {
      localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(inMemoryAttempts));
    } catch {}
    notifyListeners();

    // 2. Persist to Google Cloud Firestore
    const attemptDocRef = doc(db, 'attempts', attempt.id);
    setDoc(attemptDocRef, {
      id: attempt.id,
      usuarioId: attempt.usuarioId,
      alunoNome: attempt.alunoNome,
      serie: attempt.serie,
      modo: attempt.modo,
      etapaNumero: attempt.etapaNumero || 1,
      temaNome: attempt.temaNome,
      pergunta: attempt.pergunta,
      respostaSelecionada: attempt.respostaSelecionada,
      respostaCorreta: attempt.respostaCorreta,
      acertou: attempt.acertou,
      tempoGastoSegundos: attempt.tempoGastoSegundos,
      data: attempt.data,
      timestamp: attempt.timestamp
    }).catch(error => {
      handleFirestoreError(error, OperationType.WRITE, `attempts/${attempt.id}`);
    });
  },

  /**
   * Agrupa ranking de alunos sincronizado (por sala ou todos da escola)
   */
  getRanking(serieFilter?: string): {
    alunoId: string;
    nome: string;
    serie: string;
    totalAcertos: number;
    totalErros: number;
    desafiosConcluidos: number;
    tempoMedioSegundos: number;
    aproveitamento: number;
  }[] {
    const results = this.getResults();
    const map = new Map<string, {
      alunoId: string;
      nome: string;
      serie: string;
      totalAcertos: number;
      totalErros: number;
      desafiosConcluidos: number;
      somaTempoSegundos: number;
      totalQuestoes: number;
    }>();

    results.forEach(r => {
      // Excluir Currículo em Ação e Treine Mais do ranking competitivo escolar
      if (r.modo && r.modo !== 'oficial') return;
      if (serieFilter && serieFilter !== 'todos' && r.serie !== serieFilter) return;

      const current = map.get(r.usuarioId) || {
        alunoId: r.usuarioId,
        nome: r.alunoNome,
        serie: r.serie,
        totalAcertos: 0,
        totalErros: 0,
        desafiosConcluidos: 0,
        somaTempoSegundos: 0,
        totalQuestoes: 0
      };

      current.totalAcertos += r.acertos;
      current.totalErros += r.erros;
      current.desafiosConcluidos += 1;
      current.somaTempoSegundos += r.tempoTotalSegundos || (r.acertos + r.erros) * (r.tempoMedioPorQuestao || 25);
      current.totalQuestoes += (r.acertos + r.erros);

      map.set(r.usuarioId, current);
    });

    return Array.from(map.values())
      .map(entry => {
        const total = entry.totalAcertos + entry.totalErros;
        const aproveitamento = total > 0 ? Math.round((entry.totalAcertos / total) * 100) : 0;
        const tempoMedio = entry.totalQuestoes > 0 ? Math.round(entry.somaTempoSegundos / entry.totalQuestoes) : 0;

        return {
          alunoId: entry.alunoId,
          nome: entry.nome,
          serie: entry.serie,
          totalAcertos: entry.totalAcertos,
          totalErros: entry.totalErros,
          desafiosConcluidos: entry.desafiosConcluidos,
          tempoMedioSegundos: tempoMedio,
          aproveitamento
        };
      })
      .sort((a, b) => {
        if (b.totalAcertos !== a.totalAcertos) return b.totalAcertos - a.totalAcertos;
        if (b.aproveitamento !== a.aproveitamento) return b.aproveitamento - a.aproveitamento;
        return a.tempoMedioSegundos - b.tempoMedioSegundos;
      });
  },

  /**
   * Analytics para Professores sincronizados em tempo real:
   * 1. Quanto tempo cada aluno ficou nas perguntas
   * 2. Qual tema teve mais erros geral e por aluno
   * 3. Permite isolar por modo ('oficial' | 'curriculo_acao' | 'treine_mais' | 'todos')
   */
  getTeacherStudentAnalytics(serieFilter?: string, modoFilter?: string): {
    alunoId: string;
    nome: string;
    serie: string;
    totalPerguntas: number;
    totalAcertos: number;
    totalErros: number;
    tempoMedioPorPergunta: number;
    temaMaisErros: string;
    tentativasDetalhes: QuestionAttempt[];
  }[] {
    const attempts = this.getAttempts();
    const studentsMap = new Map<string, {
      alunoId: string;
      nome: string;
      serie: string;
      tentativas: QuestionAttempt[];
    }>();

    // Map all registered students strictly from the selected grade (or all grades if 'todos')
    const users = this.getUsers().filter(u => u.tipo === 'aluno');
    users.forEach(u => {
      if (serieFilter && serieFilter !== 'todos' && u.serie !== serieFilter) return;
      studentsMap.set(u.id, {
        alunoId: u.id,
        nome: u.nome,
        serie: u.serie,
        tentativas: []
      });
    });

    attempts.forEach(att => {
      if (serieFilter && serieFilter !== 'todos' && att.serie !== serieFilter) return;
      if (modoFilter && modoFilter !== 'todos' && att.modo !== modoFilter) return;

      // Also guard against attempts belonging to a student of a different grade
      const registeredUser = users.find(u => u.id === att.usuarioId);
      if (serieFilter && serieFilter !== 'todos' && registeredUser && registeredUser.serie !== serieFilter) return;

      if (!studentsMap.has(att.usuarioId)) {
        studentsMap.set(att.usuarioId, {
          alunoId: att.usuarioId,
          nome: att.alunoNome,
          serie: att.serie,
          tentativas: []
        });
      }
      studentsMap.get(att.usuarioId)!.tentativas.push(att);
    });

    return Array.from(studentsMap.values()).map(s => {
      const total = s.tentativas.length;
      const acertos = s.tentativas.filter(t => t.acertou).length;
      const erros = total - acertos;

      const somaTempo = s.tentativas.reduce((acc, curr) => acc + (curr.tempoGastoSegundos || 20), 0);
      const tempoMedio = total > 0 ? Math.round(somaTempo / total) : 0;

      // Calcular tema com mais erros do aluno
      const errosPorTema: Record<string, number> = {};
      s.tentativas.filter(t => !t.acertou).forEach(t => {
        errosPorTema[t.temaNome] = (errosPorTema[t.temaNome] || 0) + 1;
      });

      let temaMaisErros = 'Nenhum erro registrado';
      let maxErros = 0;
      Object.entries(errosPorTema).forEach(([tema, count]) => {
        if (count > maxErros) {
          maxErros = count;
          temaMaisErros = `${tema} (${count} erro${count > 1 ? 's' : ''})`;
        }
      });

      return {
        alunoId: s.alunoId,
        nome: s.nome,
        serie: s.serie,
        totalPerguntas: total,
        totalAcertos: acertos,
        totalErros: erros,
        tempoMedioPorPergunta: tempoMedio,
        temaMaisErros: maxErros > 0 ? temaMaisErros : (total > 0 ? 'Excelente! Zero erros' : 'Sem atividades registradas'),
        tentativasDetalhes: s.tentativas.sort((a, b) => b.timestamp - a.timestamp)
      };
    }).sort((a, b) => b.totalPerguntas - a.totalPerguntas);
  },

  /**
   * Resumo de Erros por Tema para os Professores (com filtro por módulo)
   */
  getTeacherThemeOverview(serieFilter?: string, modoFilter?: string): {
    temasStats: TeacherThemeStats[];
    temaCriticoGeral: string;
    temaMaisAcertosGeral: string;
    tempoMedioGeralEscola: number;
    totalTentativasGeral: number;
    totalAcertosGeral: number;
    sugestaoIntervencao: string;
  } {
    const attempts = this.getAttempts().filter(a => {
      if (serieFilter && serieFilter !== 'todos' && a.serie !== serieFilter) return false;
      if (modoFilter && modoFilter !== 'todos' && a.modo !== modoFilter) return false;
      return true;
    });

    const themeMap: Record<string, { total: number; acertos: number; erros: number; tempoSoma: number }> = {};

    let totalTempo = 0;
    let totalAcertosGeral = 0;

    attempts.forEach(a => {
      const key = a.temaNome || 'Conteúdo Geral';
      if (!themeMap[key]) {
        themeMap[key] = { total: 0, acertos: 0, erros: 0, tempoSoma: 0 };
      }
      themeMap[key].total += 1;
      if (a.acertou) {
        themeMap[key].acertos += 1;
        totalAcertosGeral += 1;
      } else {
        themeMap[key].erros += 1;
      }
      const t = a.tempoGastoSegundos || 20;
      themeMap[key].tempoSoma += t;
      totalTempo += t;
    });

    const temasStats: TeacherThemeStats[] = Object.entries(themeMap)
      .filter(([, data]) => data.total > 0)
      .map(([tema, data]) => ({
        temaNome: tema,
        totalRespostas: data.total,
        totalErros: data.erros,
        taxaErroPercentual: Math.round((data.erros / data.total) * 100),
        tempoMedioSegundos: Math.round(data.tempoSoma / data.total)
      }))
      .sort((a, b) => b.taxaErroPercentual - a.taxaErroPercentual);

    const temaCriticoGeral = temasStats.length > 0 && temasStats[0].totalErros > 0
      ? `${temasStats[0].temaNome} (${temasStats[0].taxaErroPercentual}% de erros)`
      : 'Nenhum tema com erros elevados';

    const temaMaisAcertos = [...temasStats]
      .sort((a, b) => a.taxaErroPercentual - b.taxaErroPercentual)[0];
    const temaMaisAcertosGeral = temaMaisAcertos
      ? `${temaMaisAcertos.temaNome} (${100 - temaMaisAcertos.taxaErroPercentual}% de acertos)`
      : 'Sem dados';

    const tempoMedioGeralEscola = attempts.length > 0 ? Math.round(totalTempo / attempts.length) : 0;

    let sugestaoIntervencao = 'Mantenha a rotina pedagógica contínua com resolução de problemas práticos.';
    if (temasStats.length > 0 && temasStats[0].totalErros > 0) {
      sugestaoIntervencao = `Recomenda-se aula de reforço focada em "${temasStats[0].temaNome}", com diagramas visuais e exercícios guiados passo a passo antes do próximo simulado.`;
    }

    return {
      temasStats,
      temaCriticoGeral,
      temaMaisAcertosGeral,
      tempoMedioGeralEscola,
      totalTentativasGeral: attempts.length,
      totalAcertosGeral,
      sugestaoIntervencao
    };
  },

  /**
   * Diagnóstico do aluno em Currículo em Ação para Meus Resultados:
   * Onde mais errou, onde mais acertou, o que melhorar e mensagem de incentivo.
   */
  getCurriculoAcaoDiagnostic(usuarioId: string): {
    totalTentativas: number;
    totalAcertos: number;
    totalErros: number;
    aproveitamento: number;
    ondeMaisErrou: string;
    ondeMaisAcertou: string;
    oqueMelhorar: string;
    mensagemIncentivo: string;
    seriesRealizadas: string[];
  } {
    const attempts = this.getAttempts().filter(
      a => a.usuarioId === usuarioId && a.modo === 'curriculo_acao'
    );

    if (attempts.length === 0) {
      return {
        totalTentativas: 0,
        totalAcertos: 0,
        totalErros: 0,
        aproveitamento: 0,
        ondeMaisErrou: 'Ainda sem atividades no Currículo em Ação',
        ondeMaisAcertou: 'Ainda sem atividades no Currículo em Ação',
        oqueMelhorar: 'Acesse a aba Currículo em Ação e teste seus conhecimentos aprendidos em sala de aula!',
        mensagemIncentivo: 'Cada desafio resolvido fortalece sua mente matemática. Dê o primeiro passo!',
        seriesRealizadas: []
      };
    }

    const totalTentativas = attempts.length;
    const totalAcertos = attempts.filter(a => a.acertou).length;
    const totalErros = totalTentativas - totalAcertos;
    const aproveitamento = Math.round((totalAcertos / totalTentativas) * 100);

    const errosPorTema: Record<string, number> = {};
    const acertosPorTema: Record<string, number> = {};
    const seriesSet = new Set<string>();

    attempts.forEach(a => {
      if (a.serie) seriesSet.add(a.serie);
      if (!a.acertou) {
        errosPorTema[a.temaNome] = (errosPorTema[a.temaNome] || 0) + 1;
      } else {
        acertosPorTema[a.temaNome] = (acertosPorTema[a.temaNome] || 0) + 1;
      }
    });

    const piorTemaEntry = Object.entries(errosPorTema).sort((a, b) => b[1] - a[1])[0];
    const melhorTemaEntry = Object.entries(acertosPorTema).sort((a, b) => b[1] - a[1])[0];

    const ondeMaisErrou = piorTemaEntry
      ? `${piorTemaEntry[0]} (${piorTemaEntry[1]} questão(ões) para revisar)`
      : 'Excelente! Você não teve erros significativos!';

    const ondeMaisAcertou = melhorTemaEntry
      ? `${melhorTemaEntry[0]} (${melhorTemaEntry[1]} acerto(s))`
      : 'Continue praticando!';

    const oqueMelhorar = piorTemaEntry
      ? `Revise com atenção os conceitos de ${piorTemaEntry[0]}. Observe com calma os desenhos geométricos e use a Dica de Investigação quando tiver dúvidas!`
      : 'Você está demonstrando excelente domínio dos conteúdos de sala de aula! Continue explorando novas séries!';

    let mensagemIncentivo = 'Parabéns pela dedicação! Manter o foco e a constância nos estudos transforma qualquer desafio em aprendizado.';
    if (aproveitamento >= 80) {
      mensagemIncentivo = 'Sensacional! Seu foco e raciocínio estão afiados! Continue mantendo esse ritmo brilhante em sala de aula!';
    } else if (aproveitamento >= 50) {
      mensagemIncentivo = 'Muito bom! Você está no caminho certo. Lembre-se: todo erro é uma oportunidade de aprender e se tornar um detetive matemático melhor!';
    } else {
      mensagemIncentivo = 'Não desanime! A matemática se conquista com prática passo a passo. Mantenha o foco, leia as explicações didáticas e tente novamente!';
    }

    return {
      totalTentativas,
      totalAcertos,
      totalErros,
      aproveitamento,
      ondeMaisErrou,
      ondeMaisAcertou,
      oqueMelhorar,
      mensagemIncentivo,
      seriesRealizadas: Array.from(seriesSet)
    };
  },

  /**
   * Retorna dados comparativos detalhados entre 'Desafio Oficial' e 'Currículo em Ação'
   * para o gráfico do TeacherDashboardTab e diagnóstico pedagógico de intervenção.
   */
  getComparativeStudentData(serieFilter?: string): {
    students: StudentComparisonData[];
    summary: TeacherComparativeSummary;
  } {
    let students = this.getUsers().filter(u => u.tipo === 'aluno');
    if (serieFilter && serieFilter !== 'todos') {
      students = students.filter(u => u.serie === serieFilter);
    }

    const attempts = this.getAttempts();

    const comparisonList: StudentComparisonData[] = students.map(student => {
      const studentAttempts = attempts.filter(a => {
        const matchesStudent = a.usuarioId === student.id || a.alunoNome.toLowerCase() === student.nome.toLowerCase();
        if (!matchesStudent) return false;
        if (serieFilter && serieFilter !== 'todos' && a.serie && a.serie !== serieFilter) return false;
        return true;
      });

      const oficialAttempts = studentAttempts.filter(a => a.modo === 'oficial');
      const curriculoAttempts = studentAttempts.filter(a => a.modo === 'curriculo_acao');

      const totalOficial = oficialAttempts.length;
      const acertosOficial = oficialAttempts.filter(a => a.acertou).length;
      const errosOficial = totalOficial - acertosOficial;
      const taxaOficial = totalOficial > 0 ? Math.round((acertosOficial / totalOficial) * 100) : 0;

      const totalCurriculo = curriculoAttempts.length;
      const acertosCurriculo = curriculoAttempts.filter(a => a.acertou).length;
      const errosCurriculo = totalCurriculo - acertosCurriculo;
      const taxaCurriculo = totalCurriculo > 0 ? Math.round((acertosCurriculo / totalCurriculo) * 100) : 0;

      const diferencaTaxa = taxaCurriculo - taxaOficial;

      // Abbreviate name: e.g. "Gabriel Oliveira" -> "Gabriel O."
      const parts = student.nome.trim().split(/\s+/);
      const nomeAbrev = parts.length > 1
        ? `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`
        : parts[0];

      let categoriaIntervencao: 'atencao' | 'descompasso' | 'avancado' | 'em_progresso' = 'em_progresso';
      let diagnosticoPedagogico = 'Desempenho em evolução equilibrada nos dois formatos.';

      if (totalOficial === 0 && totalCurriculo === 0) {
        categoriaIntervencao = 'atencao';
        diagnosticoPedagogico = 'Ainda não iniciou os módulos. Estimular primeiro acesso ao Currículo em Ação.';
      } else if (taxaOficial >= 80 && taxaCurriculo >= 80) {
        categoriaIntervencao = 'avancado';
        diagnosticoPedagogico = 'Domínio consolidado. Excelente assimilação teórica e velocidade investigativa.';
      } else if ((totalOficial > 0 && taxaOficial < 50) && (totalCurriculo > 0 && taxaCurriculo < 50)) {
        categoriaIntervencao = 'atencao';
        diagnosticoPedagogico = 'Alerta prioritário. Necessita de recuperação paralela nos conceitos essenciais de Geometria/Trigonometria.';
      } else if (diferencaTaxa >= 20) {
        categoriaIntervencao = 'descompasso';
        diagnosticoPedagogico = `Forte no currículo (+${diferencaTaxa}%), mas sente a pressão do cronômetro ou pistas invertidas. Praticar simulados de 2 minutos.`;
      } else if (diferencaTaxa <= -20) {
        categoriaIntervencao = 'descompasso';
        diagnosticoPedagogico = `Ágil nos desafios (+${Math.abs(diferencaTaxa)}%), mas apresenta lacunas conceituais no Livro do Estudante do 4º Bimestre.`;
      } else if (taxaOficial >= 70 || taxaCurriculo >= 70) {
        categoriaIntervencao = 'em_progresso';
        diagnosticoPedagogico = 'Bom rendimento geral. Manter exercícios regulares para consolidar fixação.';
      }

      return {
        alunoId: student.id,
        nome: student.nome,
        nomeAbrev,
        serie: student.serie,
        totalOficial,
        acertosOficial,
        errosOficial,
        taxaOficial,
        totalCurriculo,
        acertosCurriculo,
        errosCurriculo,
        taxaCurriculo,
        diferencaTaxa,
        diagnosticoPedagogico,
        categoriaIntervencao
      };
    });

    // Sort: students with attempts first, then by highest overall score
    comparisonList.sort((a, b) => {
      const activeA = a.totalOficial + a.totalCurriculo;
      const activeB = b.totalOficial + b.totalCurriculo;
      if (activeB !== activeA) return activeB - activeA;
      return (b.taxaCurriculo + b.taxaOficial) - (a.taxaCurriculo + a.taxaOficial);
    });

    const studentsWithData = comparisonList.filter(s => s.totalOficial > 0 || s.totalCurriculo > 0);
    const mediaOficialGeral = studentsWithData.length > 0
      ? Math.round(studentsWithData.reduce((acc, s) => acc + s.taxaOficial, 0) / studentsWithData.length)
      : 0;
    const mediaCurriculoGeral = studentsWithData.length > 0
      ? Math.round(studentsWithData.reduce((acc, s) => acc + s.taxaCurriculo, 0) / studentsWithData.length)
      : 0;

    const alunosAtencaoCount = comparisonList.filter(s => s.categoriaIntervencao === 'atencao').length;
    const alunosDescompassoCount = comparisonList.filter(s => s.categoriaIntervencao === 'descompasso').length;
    const alunosAvancadoCount = comparisonList.filter(s => s.categoriaIntervencao === 'avancado').length;

    const insightsPedagogicos: string[] = [];
    if (mediaCurriculoGeral > mediaOficialGeral + 10) {
      insightsPedagogicos.push(
        `Desempenho Curricular (${mediaCurriculoGeral}%) superior aos Desafios Oficiais (${mediaOficialGeral}%): os alunos assimilam a teoria do 4º bimestre, mas sentem a pressão do tempo de 2 minutos ou pistas invertidas.`
      );
    } else if (mediaOficialGeral > mediaCurriculoGeral + 10) {
      insightsPedagogicos.push(
        `Desafios Oficiais (${mediaOficialGeral}%) superiores ao Currículo (${mediaCurriculoGeral}%): a turma tem raciocínio rápido, porém demanda revisão formal das atividades do livro do estudante.`
      );
    } else {
      insightsPedagogicos.push(
        `Aproveitamento equilibrado entre Desafios Oficiais (${mediaOficialGeral}%) e Currículo em Ação (${mediaCurriculoGeral}%). Alinhamento consistente entre teoria e raciocínio sob cronômetro.`
      );
    }

    if (alunosAtencaoCount > 0) {
      insightsPedagogicos.push(
        `${alunosAtencaoCount} aluno(s) identificado(s) no grupo de Atenção. Recomenda-se acompanhamento direcionado com diagramas visuais e passos explicativos.`
      );
    }
    if (alunosDescompassoCount > 0) {
      insightsPedagogicos.push(
        `${alunosDescompassoCount} aluno(s) com descompasso significativo entre os formatos. O trabalho em duplas mistas pode equilibrar rapidez e rigor conceitual.`
      );
    }

    return {
      students: comparisonList,
      summary: {
        mediaOficialGeral,
        mediaCurriculoGeral,
        totalAlunosComparados: comparisonList.length,
        alunosAtencaoCount,
        alunosDescompassoCount,
        alunosAvancadoCount,
        insightsPedagogicos
      }
    };
  }
};

