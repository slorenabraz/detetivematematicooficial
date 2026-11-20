-- =============================================================================
-- DETETIVE MATEMÁTICO - ESQUEMA OFICIAL PARA BANCO DE DADOS NEON (POSTGRESQL)
-- Compatível com: Neon Serverless Postgres, Vercel Postgres e Supabase
-- =============================================================================

-- 1. TABELA DE USUÁRIOS (ALUNOS E PROFESSORES)
CREATE TABLE IF NOT EXISTS usuarios (
    id VARCHAR(64) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tipo VARCHAR(32) NOT NULL CHECK (tipo IN ('aluno', 'professor')),
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    serie VARCHAR(64) NOT NULL,
    materia VARCHAR(128) DEFAULT '',
    data_cadastro VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para otimização de busca e autenticação
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
CREATE INDEX IF NOT EXISTS idx_usuarios_serie ON usuarios(serie);
CREATE INDEX IF NOT EXISTS idx_usuarios_tipo ON usuarios(tipo);

-- 2. TABELA DE SESSÕES E HISTÓRICO DE USUÁRIOS LOGADOS
CREATE TABLE IF NOT EXISTS sessoes_ativas (
    id VARCHAR(64) PRIMARY KEY,
    usuario_id VARCHAR(64) NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    aluno_nome VARCHAR(255) NOT NULL,
    tipo VARCHAR(32) NOT NULL,
    serie VARCHAR(64) NOT NULL,
    ultimo_acesso TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ip_origem VARCHAR(64) DEFAULT '127.0.0.1',
    user_agent TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sessoes_usuario_id ON sessoes_ativas(usuario_id);
CREATE INDEX IF NOT EXISTS idx_sessoes_ultimo_acesso ON sessoes_ativas(ultimo_acesso);

-- 3. TABELA DE TENTATIVAS DE QUESTÕES (RESOLUÇÃO DETALHADA)
CREATE TABLE IF NOT EXISTS tentativas_questoes (
    id VARCHAR(64) PRIMARY KEY,
    usuario_id VARCHAR(64) NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    aluno_nome VARCHAR(255) NOT NULL,
    serie VARCHAR(64) NOT NULL,
    modo VARCHAR(64) NOT NULL, -- 'oficial', 'treine_mais', 'curriculo_acao'
    etapa_numero INT DEFAULT 0,
    tema_nome VARCHAR(255) NOT NULL,
    pergunta TEXT NOT NULL,
    resposta_selecionada TEXT NOT NULL,
    resposta_correta TEXT NOT NULL,
    acertou BOOLEAN NOT NULL,
    tempo_gasto_segundos INT NOT NULL DEFAULT 0,
    data VARCHAR(32) NOT NULL,
    timestamp BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_tentativas_usuario_id ON tentativas_questoes(usuario_id);
CREATE INDEX IF NOT EXISTS idx_tentativas_serie ON tentativas_questoes(serie);
CREATE INDEX IF NOT EXISTS idx_tentativas_modo ON tentativas_questoes(modo);
CREATE INDEX IF NOT EXISTS idx_tentativas_acertou ON tentativas_questoes(acertou);

-- 4. TABELA DE RESULTADOS DAS SESSÕES
CREATE TABLE IF NOT EXISTS resultados_sessoes (
    id VARCHAR(64) PRIMARY KEY,
    usuario_id VARCHAR(64) NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    aluno_nome VARCHAR(255) NOT NULL,
    serie VARCHAR(64) NOT NULL,
    modo VARCHAR(64) NOT NULL,
    etapa_nome VARCHAR(255) NOT NULL,
    acertos INT NOT NULL DEFAULT 0,
    erros INT NOT NULL DEFAULT 0,
    tempo_total_segundos INT NOT NULL DEFAULT 0,
    tempo_medio_por_questao INT NOT NULL DEFAULT 0,
    data VARCHAR(32) NOT NULL,
    timestamp BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_resultados_usuario_id ON resultados_sessoes(usuario_id);
CREATE INDEX IF NOT EXISTS idx_resultados_serie ON resultados_sessoes(serie);

-- 5. USUÁRIO DOCENTE/ADMINISTRADOR PADRÃO (SEED INICIAL)
INSERT INTO usuarios (id, nome, tipo, email, senha, serie, materia, data_cadastro)
VALUES (
    'docente_default_admin',
    'Professor Coordenador de Matemática',
    'professor',
    'professor@escola.sp.gov.br',
    'prof1234',
    'Todas as Séries',
    'Matemática e Geometria',
    TO_CHAR(CURRENT_TIMESTAMP, 'YYYY-MM-DD"T"HH24:MI:SS')
)
ON CONFLICT (email) DO NOTHING;
