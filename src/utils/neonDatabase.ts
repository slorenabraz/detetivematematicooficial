import { User, SessionResult, QuestionAttempt } from '../types';

/**
 * Neon Database Utility
 * Suporte a Neon Serverless PostgreSQL e exportação de backups
 */

export interface LoggedUserEvent {
  id: string;
  usuarioId: string;
  alunoNome: string;
  email: string;
  tipo: string;
  serie: string;
  timestamp: number;
  dataHora: string;
}

const NEON_LOGGED_USERS_KEY = 'detetive_neon_logged_users';

/**
 * Registra o login do usuário no histórico persistente para o banco Neon
 */
export function recordUserLoginEvent(user: User): void {
  try {
    const raw = localStorage.getItem(NEON_LOGGED_USERS_KEY);
    const events: LoggedUserEvent[] = raw ? JSON.parse(raw) : [];

    const newEvent: LoggedUserEvent = {
      id: `login_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      usuarioId: user.id,
      alunoNome: user.nome,
      email: user.email,
      tipo: user.tipo,
      serie: user.serie,
      timestamp: Date.now(),
      dataHora: new Date().toISOString()
    };

    // Mantém os últimos 200 eventos de login
    events.unshift(newEvent);
    if (events.length > 200) events.pop();

    localStorage.setItem(NEON_LOGGED_USERS_KEY, JSON.stringify(events));
  } catch (err) {
    console.error('Falha ao registrar evento de login:', err);
  }
}

/**
 * Retorna todos os usuários que já realizaram login na plataforma
 */
export function getLoggedUsersHistory(): LoggedUserEvent[] {
  try {
    const raw = localStorage.getItem(NEON_LOGGED_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Gera script SQL de migração com todos os dados atuais prontos para colar no console do Neon
 */
export function generateNeonSqlDump(
  users: User[],
  results: SessionResult[],
  attempts: QuestionAttempt[]
): string {
  let sql = `-- =============================================================================\n`;
  sql += `-- DUMP DE DADOS GERADO PELO DETETIVE MATEMÁTICO PARA BANCO NEON\n`;
  sql += `-- Gerado em: ${new Date().toISOString()}\n`;
  sql += `-- =============================================================================\n\n`;

  if (users.length > 0) {
    sql += `-- 1. USUÁRIOS CADASTRADOS\n`;
    users.forEach(u => {
      const nomeSafe = u.nome.replace(/'/g, "''");
      const emailSafe = u.email.replace(/'/g, "''");
      const serieSafe = u.serie.replace(/'/g, "''");
      const materiaSafe = (u.materia || '').replace(/'/g, "''");

      sql += `INSERT INTO usuarios (id, nome, tipo, email, senha, serie, materia, data_cadastro) VALUES ('${u.id}', '${nomeSafe}', '${u.tipo}', '${emailSafe}', '${u.senha}', '${serieSafe}', '${materiaSafe}', '${u.dataCadastro}') ON CONFLICT (id) DO UPDATE SET nome = EXCLUDED.nome, serie = EXCLUDED.serie;\n`;
    });
    sql += `\n`;
  }

  if (results.length > 0) {
    sql += `-- 2. RESULTADOS DE SESSÕES\n`;
    results.forEach(r => {
      const alunoSafe = r.alunoNome.replace(/'/g, "''");
      const serieSafe = r.serie.replace(/'/g, "''");
      const etapaSafe = r.etapaNome.replace(/'/g, "''");

      sql += `INSERT INTO resultados_sessoes (id, usuario_id, aluno_nome, serie, modo, etapa_nome, acertos, erros, tempo_total_segundos, tempo_medio_por_questao, data, timestamp) VALUES ('${r.id}', '${r.usuarioId}', '${alunoSafe}', '${serieSafe}', '${r.modo}', '${etapaSafe}', ${r.acertos}, ${r.erros}, ${r.tempoTotalSegundos}, ${r.tempoMedioPorQuestao}, '${r.data}', ${r.timestamp}) ON CONFLICT (id) DO NOTHING;\n`;
    });
    sql += `\n`;
  }

  return sql;
}
