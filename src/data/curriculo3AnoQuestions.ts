import { Question } from '../types';

export const CURRICULO_3EM_QUESTIONS: Question[] = [
  // --------------------------------------------------------------------------
  // AULA 1: RAZÃO ENTRE GRANDEZAS – VELOCIDADE MÉDIA
  // --------------------------------------------------------------------------
  {
    id: "cur-3em-1",
    serie: "3º Ano Ensino Médio",
    aulaNumero: 1,
    aulaTitulo: "Razão entre Grandezas – Velocidade Média",
    apresentacaoTema: "Estudo da velocidade média como a razão que relaciona a variação da posição (deslocamento) com o intervalo de tempo decorrido, aplicando conversão de unidades (minutos para horas).",
    temaKey: "curriculo_3em",
    temaNome: "Aula 1: Razão entre Grandezas – Velocidade Média",
    habilidade: "EM13MAT101",
    svgType: "velocidade_media",
    formulaDestaque: "Vm = ΔS ÷ Δt",
    resumoAula: "Velocidade média é a grandeza que relaciona a variação da posição de um corpo e o intervalo de tempo em que ele percorreu tal distância. Matematicamente, ela é definida pela razão:\n\nVm = ΔS / Δt\n\n• Vm → velocidade média;\n• ΔS → variação da posição (deslocamento em km ou metros);\n• Δt → intervalo de tempo decorrido (em horas ou segundos).",
    pergunta: "Em uma pesquisa sobre mobilidade urbana, um estudante registrou os seguintes trajetos até a escola:\n• Pessoa A: percorreu 12 km em 30 minutos.\n• Pessoa B: percorreu 18 km em 45 minutos.\n\nDetermine e compare a velocidade média desenvolvida por cada pessoa (em km/h):",
    opcoes: [
      "Ambas tiveram a mesma velocidade média de 24 km/h",
      "A Pessoa A foi mais rápida (24 km/h contra 18 km/h)",
      "A Pessoa B foi mais rápida (24 km/h contra 12 km/h)",
      "A Pessoa A teve velocidade de 40 km/h e a Pessoa B de 24 km/h"
    ],
    correta: 0,
    porque: "Conversão: 30 min = 0,5 h e 45 min = 0,75 h. Pessoa A: Vm = 12 km ÷ 0,5 h = 24 km/h. Pessoa B: Vm = 18 km ÷ 0,75 h = 24 km/h. Como 24 km/h = 24 km/h, ambas desenvolveram exatamente a mesma velocidade média!",
    dicaInvestigacao: "Converta os minutos para horas antes de efetuar a divisão (30 min = 0,5 h; 45 min = 0,75 h) e compare os dois quocientes.",
    atividades: [
      {
        id: "cur-3em-1-act2",
        numero: 2,
        titulo: "Atividade 2 (Tabela de Transportes)",
        pergunta: "Um trabalhador comparou três opções de transporte coletivo para percorrer a cidade:\n• Metrô: 24 km em 36 minutos (0,6 h)\n• Ônibus: 15 km em 30 minutos (0,5 h)\n• Carro compartilhado: 18 km em 24 minutos (0,4 h)\n\nQual transporte apresentou a MAIOR velocidade média?",
        opcoes: [
          "O Carro compartilhado (45 km/h)",
          "O Metrô (40 km/h)",
          "O Ônibus (30 km/h)",
          "Metrô e Carro tiveram a mesma velocidade (40 km/h)"
        ],
        correta: 0,
        porque: "Metrô: 24 km ÷ 0,6 h = 40 km/h. Ônibus: 15 km ÷ 0,5 h = 30 km/h. Carro: 18 km ÷ 0,4 h = 45 km/h. O carro compartilhado teve a maior velocidade média (45 km/h).",
        dica1: "Vm = ΔS ÷ Δt",
        dica2: "Divida a distância percorrida pelo tempo em horas (36 min = 0,6 h; 24 min = 0,4 h)."
      }
    ]
  },

  // --------------------------------------------------------------------------
  // AULA 2: GRANDEZAS POR RAZÃO OU PRODUTO – PARTE 1
  // --------------------------------------------------------------------------
  {
    id: "cur-3em-2",
    serie: "3º Ano Ensino Médio",
    aulaNumero: 2,
    aulaTitulo: "Grandezas determinadas pela razão ou pelo produto de outras – Parte 1",
    apresentacaoTema: "Análise de grandezas obtidas pela razão entre duas outras, como a densidade (massa/volume), densidade demográfica (habitantes/área) e valores unitários (preço/kg).",
    temaKey: "curriculo_3em",
    temaNome: "Aula 2: Grandezas por Razão ou Produto – Parte 1",
    habilidade: "EM13MAT101",
    svgType: "razao_preco_quilo",
    formulaDestaque: "D = m ÷ V  •  Preço/kg = Preço Total ÷ Massa",
    resumoAula: "Uma grandeza pode ser obtida ou definida a partir da relação entre outras duas grandezas. Essas relações podem aparecer como razões (divisão) ou produtos (multiplicação).\n\nUm exemplo de grandeza obtida como razão entre a massa e o volume de um objeto é a densidade:\nD = m / V\n\nEm que:\n• D é a densidade;\n• m é a massa (g ou kg);\n• V é o volume (cm³ ou m³).\n\nOutras grandezas por razão: velocidade média (distância/tempo), taxa de natalidade (nascimentos/população) e preço por unidade.",
    pergunta: "Em um laboratório de química, os estudantes mediram um bloco de polímero com massa m = 90 g e volume V = 60 cm³. Qual é a densidade (D) desse material?",
    opcoes: [
      "1,5 g/cm³",
      "0,67 g/cm³",
      "5.400 g/cm³",
      "1,2 g/cm³"
    ],
    correta: 0,
    porque: "Densidade D = m ÷ V = 90 g ÷ 60 cm³ = 1,5 g/cm³.",
    dicaInvestigacao: "Aplique a fórmula D = m / V dividindo a massa (90) pelo volume (60).",
    atividades: [
      {
        id: "cur-3em-2-act2",
        numero: 2,
        titulo: "Atividade 2 (Taxa de Natalidade)",
        pergunta: "Um município registrou os seguintes dados demográficos em dois anos consecutivos:\n• Em 2023: 32.000 nascimentos para 2.000.000 habitantes.\n• Em 2024: 34.500 nascimentos para 2.300.000 habitantes.\n\nCalcule a taxa de natalidade (nascimentos por mil habitantes) de cada ano e indique o que ocorreu de 2023 para 2024:",
        opcoes: [
          "A taxa caiu de 16 para 15 nascimentos por mil habitantes",
          "A taxa aumentou de 15 para 16 nascimentos por mil habitantes",
          "A taxa permaneceu exatamente a mesma em 16 nascimentos por mil habitantes",
          "A taxa aumentou em 2.500 nascimentos por mil habitantes"
        ],
        correta: 0,
        porque: "2023: (32.000 ÷ 2.000.000) × 1.000 = 16 por mil. 2024: (34.500 ÷ 2.300.000) × 1.000 = 15 por mil. Portanto, a taxa caiu de 16‰ para 15‰.",
        dica1: "Taxa por mil = (Nascimentos ÷ População) × 1.000",
        dica2: "Divida os nascimentos pela população total e multiplique por 1.000 para achar a proporção por mil habitantes."
      },
      {
        id: "cur-3em-2-act3",
        numero: 3,
        titulo: "Atividade 3 (Preço por Quilo)",
        pergunta: "No supermercado, duas opções de arroz estão em promoção:\n• Pacote A: 5 kg por R$ 32,00.\n• Pacote B: 2 kg por R$ 13,60.\n\nQual pacote apresenta a melhor relação custo-benefício (menor preço por kg)?",
        opcoes: [
          "O Pacote A é mais vantajoso (R$ 6,40/kg contra R$ 6,80/kg do Pacote B)",
          "O Pacote B é mais vantajoso (R$ 6,80/kg contra R$ 6,40/kg do Pacote A)",
          "Ambos têm exatamente o mesmo preço por kg (R$ 6,80/kg)",
          "O Pacote B é melhor apenas porque seu valor total é menor"
        ],
        correta: 0,
        porque: "Pacote A: R$ 32,00 ÷ 5 kg = R$ 6,40/kg. Pacote B: R$ 13,60 ÷ 2 kg = R$ 6,80/kg. O pacote A custa menos por quilo (R$ 6,40 < R$ 6,80).",
        dica1: "Preço por kg = Preço Total ÷ Massa em kg",
        dica2: "Calcule o quociente para cada opção e compare quem tem o menor valor unitário."
      }
    ]
  },

  // --------------------------------------------------------------------------
  // AULA 3: GRANDEZAS POR RAZÃO OU PRODUTO – PARTE 2
  // --------------------------------------------------------------------------
  {
    id: "cur-3em-3",
    serie: "3º Ano Ensino Médio",
    aulaNumero: 3,
    aulaTitulo: "Grandezas determinadas pela razão ou pelo produto de outras – Parte 2",
    apresentacaoTema: "Estudo de grandezas obtidas pelo produto de duas outras, como o consumo elétrico (potência × tempo) e a quantidade de movimento (massa × velocidade), explorando proporcionalidade direta e inversa.",
    temaKey: "curriculo_3em",
    temaNome: "Aula 3: Grandezas por Razão ou Produto – Parte 2",
    habilidade: "EM13MAT101",
    svgType: "quantidade_movimento_carrinhos",
    formulaDestaque: "C = p · t  •  Q = m · v",
    resumoAula: "Grandezas determinadas por produto:\nAlgumas grandezas são obtidas pelo produto de duas outras. Um exemplo é o consumo de energia elétrica, que depende da potência do aparelho e do tempo de uso:\nC = p · t\n\nEm que:\n• C é o consumo de energia (em kWh);\n• p é a potência do aparelho (em kW);\n• t é o tempo de uso do aparelho (em horas).\n\nOutro exemplo fundamental da física é a quantidade de movimento (Q = m · v).\n\nProporcionalidade:\n• Diretamente proporcional: quando a razão entre duas grandezas é constante (y / x = k).\n• Inversamente proporcional: quando o produto entre duas grandezas é constante (x · y = k).",
    pergunta: "A quantidade de movimento (Q) de um corpo é calculada pelo produto de sua massa (m) pela velocidade (v): Q = m · v. Um carrinho A possui massa de 3 kg e move-se a 8 m/s. Um carrinho B tem massa 20% maior que o carrinho A. Para que o carrinho B tenha a MESMA quantidade de movimento do carrinho A, qual deve ser, aproximadamente, a sua velocidade?",
    opcoes: [
      "Aproximadamente 6,67 m/s",
      "Aproximadamente 9,60 m/s",
      "Aproximadamente 8,00 m/s",
      "Aproximadamente 5,40 m/s"
    ],
    correta: 0,
    porque: "1. Q_A = 3 kg × 8 m/s = 24 kg·m/s. 2. Massa de B: m_B = 3 × 1,20 = 3,6 kg. 3. Para manter Q = 24: v_B = 24 ÷ 3,6 ≈ 6,67 m/s.",
    dicaInvestigacao: "Calcule a quantidade de movimento do carrinho A (3 × 8 = 24). Divida esse valor pela nova massa (3 × 1,20 = 3,6 kg).",
    atividades: [
      {
        id: "cur-3em-3-act2",
        numero: 2,
        titulo: "Atividade 2 (Consumo Elétrico)",
        pergunta: "Um chuveiro elétrico de potência 5.500 W (5,5 kW) é utilizado em média por 30 horas ao longo de um mês. Qual é o consumo mensal desse chuveiro em quilowatt-hora (kWh)?",
        opcoes: [
          "165 kWh",
          "183,3 kWh",
          "165.000 kWh",
          "55 kWh"
        ],
        correta: 0,
        porque: "Consumo C = p · t = 5,5 kW × 30 h = 165 kWh.",
        dica1: "C = p · t (com potência em kW e tempo em horas)",
        dica2: "Multiplique a potência de 5,5 kW pelas 30 horas de uso mensal."
      }
    ]
  },

  // --------------------------------------------------------------------------
  // AULA 4: GRANDEZAS DETERMINADAS PELA RAZÃO OU PRODUTO
  // --------------------------------------------------------------------------
  {
    id: "cur-3em-4",
    serie: "3º Ano Ensino Médio",
    aulaNumero: 4,
    aulaTitulo: "Grandezas determinadas pela razão ou pelo produto de outras",
    apresentacaoTema: "Sistematização e aprofundamento das relações diretas e inversas entre grandezas físicas e cotidianas, analisando como a variação de uma grandeza impacta as demais.",
    temaKey: "curriculo_3em",
    temaNome: "Aula 4: Grandezas determinadas pela razão ou pelo produto de outras",
    habilidade: "EM13MAT101",
    svgType: "densidade_demografica",
    formulaDestaque: "Razão Constante: y ÷ x = k  •  Produto Constante: x · y = k",
    resumoAula: "Fluxograma SEDUC de Relações entre Grandezas:\n• Quando a razão entre duas grandezas é constante (y / x = k), elas são diretamente proporcionais (se uma dobra, a outra dobra).\n• Quando o produto entre duas grandezas é constante (x · y = k), elas são inversamente proporcionais (se uma dobra, a outra é reduzida pela metade).\n\nExemplos práticos:\n• Fatura de energia elétrica: Valor = Consumo (kWh) × Tarifa (R$/kWh).\n• Densidade demográfica: População / Área territorial.",
    pergunta: "Em uma fatura de energia elétrica residencial, foram consumidos 150 kWh no mês. Sabendo que a tarifa cobrada pela concessionária é de R$ 0,73 por kWh consumido, qual é o valor referente apenas ao consumo de energia dessa fatura?",
    opcoes: [
      "R$ 109,50",
      "R$ 205,48",
      "R$ 150,73",
      "R$ 73,00"
    ],
    correta: 0,
    porque: "Valor da Fatura = Consumo × Tarifa = 150 kWh × R$ 0,73/kWh = R$ 109,50.",
    dicaInvestigacao: "O valor total de energia é determinado pelo produto entre a quantidade de kWh consumida e a tarifa unitária: multiplique 150 por 0,73.",
    atividades: [
      {
        id: "cur-3em-4-act2",
        numero: 2,
        titulo: "Atividade 2 (Densidade Demográfica)",
        pergunta: "Um município paulista possui população de 84.000 habitantes distribuídos em uma área territorial de 350 km². Qual é a densidade demográfica desse município em hab/km²?",
        opcoes: [
          "240 hab/km²",
          "350 hab/km²",
          "120 hab/km²",
          "480 hab/km²"
        ],
        correta: 0,
        porque: "Densidade Demográfica = População ÷ Área = 84.000 hab ÷ 350 km² = 240 hab/km².",
        dica1: "Densidade Demográfica = Habitantes ÷ Área (km²)",
        dica2: "Divida 84.000 por 350."
      }
    ]
  },

  // --------------------------------------------------------------------------
  // AULA 5: A REGRA DE TRÊS SIMPLES
  // --------------------------------------------------------------------------
  {
    id: "cur-3em-5",
    serie: "3º Ano Ensino Médio",
    aulaNumero: 5,
    aulaTitulo: "A regra de três simples",
    apresentacaoTema: "Aplicação do raciocínio proporcional para resolver problemas envolvendo duas grandezas direta ou inversamente proporcionais a partir de três valores conhecidos.",
    temaKey: "curriculo_3em",
    temaNome: "Aula 5: A regra de três simples",
    habilidade: "EM13MAT314",
    svgType: "regra_tres_simples",
    formulaDestaque: "Direta: a₁/b₁ = a₂/x  •  Inversa: a₁ · b₁ = a₂ · x",
    resumoAula: "A Regra de Três Simples permite calcular um valor desconhecido a partir de três valores dados.\n\nPasso a Passo:\n1. Montar a tabela com as duas grandezas em colunas.\n2. Avaliar se a relação é Diretamente Proporcional (aumentam juntas) ou Inversamente Proporcional (uma aumenta e a outra diminui).\n3. Se direta: multiplicar em cruz (a₁ · x = a₂ · b₁).\n4. Se inversa: multiplicar em linha (a₁ · b₁ = a₂ · x).",
    pergunta: "Para preparar uma bebida para uma festa escolar, sabe-se que 2 litros de suco concentrado custam R$ 6,00. Mantendo a mesma proporção de preço por litro, quanto custarão 5 litros desse mesmo suco concentrado?",
    opcoes: [
      "R$ 15,00",
      "R$ 12,00",
      "R$ 18,00",
      "R$ 10,00"
    ],
    correta: 0,
    porque: "Grandezas diretamente proporcionais (mais litros custam mais): 2 L / R$ 6,00 = 5 L / x ➔ 2x = 30 ➔ x = R$ 15,00.",
    dicaInvestigacao: "Calcule o preço de 1 litro (R$ 6,00 ÷ 2 = R$ 3,00) e multiplique pela quantidade desejada (5 litros).",
    atividades: [
      {
        id: "cur-3em-5-act2",
        numero: 2,
        titulo: "Atividade 2 (Velocidade e Distância)",
        pergunta: "Um automóvel percorre 150 km em 2 horas mantendo velocidade constante em uma rodovia. No mesmo ritmo de viagem, que distância esse automóvel percorrerá em 5 horas?",
        opcoes: [
          "375 km",
          "300 km",
          "450 km",
          "350 km"
        ],
        correta: 0,
        porque: "Diretamente proporcional: 150 km / 2 h = x / 5 h ➔ 2x = 750 ➔ x = 375 km.",
        dica1: "Distância e tempo são grandezas diretamente proporcionais",
        dica2: "Multiplique 150 por 5 e divida por 2."
      },
      {
        id: "cur-3em-5-act3",
        numero: 3,
        titulo: "Atividade 3 (Operários e Tempo - Inversa)",
        pergunta: "Em uma fábrica, 4 operários de mesma capacidade realizam uma tarefa em 12 dias. Se a fábrica contar com 6 operários com o mesmo ritmo de trabalho, em quantos dias a tarefa será concluída?",
        opcoes: [
          "8 dias",
          "18 dias",
          "10 dias",
          "6 dias"
        ],
        correta: 0,
        porque: "Grandezas inversamente proporcionais (mais operários levam menos dias): 4 × 12 = 6 × x ➔ 48 = 6x ➔ x = 8 dias.",
        dica1: "Mais operários levam menos tempo: multiplique em linha",
        dica2: "4 × 12 = 6 × x ➔ x = 48 ÷ 6."
      }
    ]
  },

  // --------------------------------------------------------------------------
  // AULA 6: A REGRA DE TRÊS COMPOSTA
  // --------------------------------------------------------------------------
  {
    id: "cur-3em-6",
    serie: "3º Ano Ensino Médio",
    aulaNumero: 6,
    aulaTitulo: "A regra de três composta",
    apresentacaoTema: "Articulação de processos envolvendo três ou mais grandezas interdependentes, determinando se cada grandeza é direta ou inversamente proporcional em relação à incógnita.",
    temaKey: "curriculo_3em",
    temaNome: "Aula 6: A regra de três composta",
    habilidade: "EM13MAT314",
    svgType: "regra_tres_composta",
    formulaDestaque: "Razão da Incógnita = Produto das Razões das demais grandezas",
    resumoAula: "A Regra de Três Composta envolve três ou mais grandezas proporcionais.\n\nMétodo de Resolução:\n1. Montar a tabela com as grandezas em colunas.\n2. Fixar a grandeza da incógnita e compará-la individualmente com as demais:\n   • Se direta: mantém a razão.\n   • Se inversa: inverte a razão.\n3. Igualar a razão da incógnita ao produto das demais razões ajustadas.",
    pergunta: "Uma equipe de 6 pessoas trabalhando 8 horas por dia constrói uma estrutura cenográfica em 10 dias. Quantos dias serão necessários para 8 pessoas construírem a mesma estrutura trabalhando 6 horas por dia?",
    opcoes: [
      "10 dias",
      "8 dias",
      "12 dias",
      "6 dias"
    ],
    correta: 0,
    porque: "Comparando com Dias (incógnita): Pessoas (inversa: 8/6) e Horas/dia (inversa: 6/8). Proporção: 10/x = (8/6) × (6/8) = 1. Logo: x = 10 dias.",
    dicaInvestigacao: "Observe que 6 × 8 = 48 pessoas·h/dia e 8 × 6 = 48 pessoas·h/dia. Como o total diário de horas-homem é idêntico, o número de dias permanece 10!",
    atividades: [
      {
        id: "cur-3em-6-act2",
        numero: 2,
        titulo: "Atividade 2 (Produção Gráfica)",
        pergunta: "Em uma gráfica, 5 máquinas idênticas trabalhando 6 horas por dia produzem 600 livros. Se forem utilizadas 8 máquinas trabalhando 4 horas por dia, quantos livros serão produzidos?",
        opcoes: [
          "640 livros",
          "720 livros",
          "580 livros",
          "800 livros"
        ],
        correta: 0,
        porque: "Livros em relação a Máquinas (direta: 5/8) e Horas/dia (direta: 6/4). Proporção: 600/x = (5/8) × (6/4) = 30/32 = 15/16. Logo: 15x = 9.600 ➔ x = 640 livros.",
        dica1: "Mais máquinas produzem mais (direta); mais horas produzem mais (direta)",
        dica2: "600/x = (5/8) × (6/4)"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // AULA 7: RESOLUÇÃO DE PROBLEMAS ENVOLVENDO RELAÇÃO ENTRE GRANDEZAS
  // --------------------------------------------------------------------------
  {
    id: "cur-3em-7",
    serie: "3º Ano Ensino Médio",
    aulaNumero: 7,
    aulaTitulo: "Resolução de problemas envolvendo relação entre grandeza",
    apresentacaoTema: "Aplicação contextualizada e investigativa de proporcionalidade, razões e produtos na resolução de problemas do cotidiano, de vestibulares e do ENEM.",
    temaKey: "curriculo_3em",
    temaNome: "Aula 7: Resolução de problemas envolvendo relação entre grandeza",
    habilidade: "EM13MAT314",
    svgType: "problemas_grandezas",
    formulaDestaque: "Proporcionalidade: y = k · x (Direta)  •  y = k / x (Inversa)",
    resumoAula: "Na resolução de problemas do ENEM e vestibulares:\n• Identificar claramente as grandezas físicas e econômicas presentes no texto.\n• Verificar se a relação entre elas é de razão (quociente constante) ou de produto (produto constante).\n• Analisar a consistência das unidades de medida antes de operar numericamente.",
    pergunta: "(FAMERP 2020) Um peregrino planeja fazer o Caminho de Santiago. Caminhando em média 24 km por dia, ele estima concluir todo o percurso em 30 dias. Se ele decidir caminhar um ritmo mais tranquilo de 20 km por dia, quantos dias ele levará para completar o mesmo percurso?",
    opcoes: [
      "36 dias",
      "25 dias",
      "32 dias",
      "40 dias"
    ],
    correta: 0,
    porque: "Velocidade diária (km/dia) e Dias são grandezas inversamente proporcionais (menos km por dia exigem mais dias). Distância total = 24 km/dia × 30 dias = 720 km. Tempo com 20 km/dia = 720 km ÷ 20 km/dia = 36 dias.",
    dicaInvestigacao: "Calcule a distância total multiplicando 24 por 30 (720 km) e depois divida pelo novo ritmo diário de 20 km/dia.",
    atividades: [
      {
        id: "cur-3em-7-act2",
        numero: 2,
        titulo: "Atividade 2 (Etanol vs Gasolina)",
        pergunta: "Um carro flex percorre 14 km com 1 litro de gasolina e 10 km com 1 litro de etanol. O preço da gasolina é R$ 5,60/L e o do etanol é R$ 3,60/L. Qual combustível apresenta o menor custo por quilômetro rodado?",
        opcoes: [
          "O etanol é mais econômico (R$ 0,36/km contra R$ 0,40/km da gasolina)",
          "A gasolina é mais econômica (R$ 0,40/km contra R$ 0,45/km do etanol)",
          "Ambos têm exatamente o mesmo custo por km (R$ 0,40/km)",
          "A gasolina é mais vantajosa porque seu rendimento de 14 km/L é maior"
        ],
        correta: 0,
        porque: "Gasolina: R$ 5,60 ÷ 14 km = R$ 0,40/km. Etanol: R$ 3,60 ÷ 10 km = R$ 0,36/km. O etanol tem menor custo por km rodado.",
        dica1: "Custo por km = Preço do Litro ÷ Rendimento em km/L",
        dica2: "Divida R$ 5,60 por 14 e R$ 3,60 por 10."
      }
    ]
  },

  // --------------------------------------------------------------------------
  // AULA 8: AULA DE VERIFICAÇÃO: RELAÇÃO ENTRE GRANDEZAS
  // --------------------------------------------------------------------------
  {
    id: "cur-3em-8",
    serie: "3º Ano Ensino Médio",
    aulaNumero: 8,
    aulaTitulo: "Aula de verificação: Relação entre grandezas",
    apresentacaoTema: "Aula avaliativa de consolidação para testar e validar o domínio das relações diretas e inversas entre grandezas, razões, produtos e regras de três.",
    temaKey: "curriculo_3em",
    temaNome: "Aula 8: Aula de verificação: Relação entre grandezas",
    habilidade: "EM13MAT314",
    svgType: "verificacao_grandezas",
    formulaDestaque: "Verificação Integrada de Grandezas Proporcionais",
    resumoAula: "Aula de Verificação das Aulas 1 a 7:\n• Reconhecer grandezas por razão: velocidade média, densidade, taxas e preços unitários.\n• Reconhecer grandezas por produto: energia elétrica, quantidade de movimento e trabalho.\n• Aplicar regras de três simples e compostas identificando se a variação é direta ou inversa.",
    pergunta: "Três torneiras idênticas enchem um reservatório em 4 horas. Para encher o mesmo reservatório em apenas 1 hora e 30 minutos (1,5 h), quantas torneiras idênticas no total serão necessárias?",
    opcoes: [
      "8 torneiras",
      "6 torneiras",
      "9 torneiras",
      "7 torneiras"
    ],
    correta: 0,
    porque: "Torneiras e tempo são inversamente proporcionais: 3 torneiras × 4 h = x torneiras × 1,5 h ➔ 12 = 1,5x ➔ x = 12 ÷ 1,5 = 8 torneiras.",
    dicaInvestigacao: "O produto Torneiras × Tempo é constante: 3 × 4 = 12. Para achar o número de torneiras em 1,5 h, divida 12 por 1,5!",
    atividades: [
      {
        id: "cur-3em-8-act2",
        numero: 2,
        titulo: "Atividade 2 (FUVEST 2022 Adaptada)",
        pergunta: "Em um experimento de física, a resistência elétrica R de um fio metálico é diretamente proporcional ao seu comprimento L e inversamente proporcional à área A de sua seção transversal. Se duplicarmos o comprimento L e triplicarmos a área A, a nova resistência será:",
        opcoes: [
          "2/3 da resistência original",
          "3/2 da resistência original",
          "6 vezes a resistência original",
          "1/6 da resistência original"
        ],
        correta: 0,
        porque: "R_nova = (2L) / (3A) = (2/3) · (L/A) = 2/3 da resistência inicial.",
        dica1: "R é proporcional a L/A",
        dica2: "Substitua L por 2L e A por 3A."
      }
    ]
  },

  // --------------------------------------------------------------------------
  // AULA 9: MÉDIA ARITMÉTICA
  // --------------------------------------------------------------------------
  {
    id: "cur-3em-9",
    serie: "3º Ano Ensino Médio",
    aulaNumero: 9,
    aulaTitulo: "Média aritmética",
    apresentacaoTema: "Cálculo e interpretação da média aritmética simples como medida de tendência central que representa o valor de equilíbrio de um conjunto de dados.",
    temaKey: "curriculo_3em",
    temaNome: "Aula 9: Média aritmética",
    habilidade: "EM13MAT406",
    svgType: "media_aritmetica",
    formulaDestaque: "x̄ = (x₁ + x₂ + ... + xₙ) ÷ n",
    resumoAula: "A média aritmética simples (x̄) de um conjunto de n valores é obtida pela soma de todos os valores dividida pelo número total de observações:\n\nx̄ = Σxᵢ / n\n\nPropriedades:\n• É a medida de tendência central mais comum.\n• É sensível a valores extremos (outliers).\n• Representa o ponto de equilíbrio de uma distribuição de dados.",
    pergunta: "Um grupo de 5 estudantes anotou o tempo diário que passou conectado às redes sociais durante uma semana:\n[4h, 3h, 5h, 2h, 6h]\n\nQual é o tempo médio diário de uso das redes sociais desse grupo?",
    opcoes: [
      "4 horas diárias",
      "3,5 horas diárias",
      "5 horas diárias",
      "4,5 horas diárias"
    ],
    correta: 0,
    porque: "Soma dos tempos = 4 + 3 + 5 + 2 + 6 = 20 horas. Média = 20 ÷ 5 = 4 horas diárias.",
    dicaInvestigacao: "Some todos os 5 valores (4 + 3 + 5 + 2 + 6 = 20) e divida por 5.",
    atividades: [
      {
        id: "cur-3em-9-act2",
        numero: 2,
        titulo: "Atividade 2 (Livros Lidos)",
        pergunta: "No primeiro semestre, quatro amigos leram a seguinte quantidade de livros: 7, 8, 6 e 9. Qual foi a média de livros lidos por esse grupo?",
        opcoes: [
          "7,5 livros",
          "8,0 livros",
          "7,0 livros",
          "8,5 livros"
        ],
        correta: 0,
        porque: "Soma = 7 + 8 + 6 + 9 = 30 livros. Média = 30 ÷ 4 = 7,5 livros.",
        dica1: "Média = Soma total ÷ Número de amigos",
        dica2: "Some 7 + 8 + 6 + 9 = 30 e divida por 4."
      }
    ]
  },

  // --------------------------------------------------------------------------
  // AULA 10: MÉDIA ARITMÉTICA E MÉDIA PONDERADA
  // --------------------------------------------------------------------------
  {
    id: "cur-3em-10",
    serie: "3º Ano Ensino Médio",
    aulaNumero: 10,
    aulaTitulo: "Média aritmética e média ponderada",
    apresentacaoTema: "Diferenciação entre média simples e média ponderada, atribuindo pesos ou frequências diferenciadas a cada dado no cálculo do valor representativo final.",
    temaKey: "curriculo_3em",
    temaNome: "Aula 10: Média aritmética e média ponderada",
    habilidade: "EM13MAT406",
    svgType: "media_ponderada",
    formulaDestaque: "x̄_pond = (x₁·p₁ + x₂·p₂ + ... + xₙ·pₙ) ÷ Σpᵢ",
    resumoAula: "Média Simples vs Média Ponderada:\n• Média Simples: todos os elementos têm a mesma importância (peso 1).\n• Média Ponderada: cada elemento xᵢ possui um peso pᵢ correspondente à sua importância ou frequência.\n\nFórmula da Média Ponderada:\nx̄_pond = (x₁ · p₁ + x₂ · p₂ + ... + xₙ · pₙ) / (p₁ + p₂ + ... + pₙ)",
    pergunta: "Em um processo seletivo para Engenharia no ENEM, a prova de Matemática possui peso 3 e a prova de Redação possui peso 2. Se um candidato obteve nota 8,0 em Matemática e 6,5 em Redação, qual é a sua média ponderada final?",
    opcoes: [
      "7,4",
      "7,25",
      "7,0",
      "7,6"
    ],
    correta: 0,
    porque: "x̄_pond = (8,0 × 3 + 6,5 × 2) ÷ (3 + 2) = (24,0 + 13,0) ÷ 5 = 37,0 ÷ 5 = 7,4.",
    dicaInvestigacao: "Multiplique cada nota pelo seu respectivo peso, some os resultados e divida pela soma dos pesos (3 + 2 = 5).",
    atividades: [
      {
        id: "cur-3em-10-act2",
        numero: 2,
        titulo: "Atividade 2 (Avaliações de Streaming)",
        pergunta: "Em um aplicativo de música, um álbum recebeu notas de usuários: nota 5 (avaliada por 40 ouvintes), nota 4 (avaliada por 50 ouvintes) e nota 3 (avaliada por 10 ouvintes). Qual é a média ponderada das avaliações?",
        opcoes: [
          "4,3",
          "4,0",
          "4,5",
          "3,8"
        ],
        correta: 0,
        porque: "Soma ponderada = (5 × 40) + (4 × 50) + (3 × 10) = 200 + 200 + 30 = 430. Total de avaliadores = 40 + 50 + 10 = 100. Média = 430 ÷ 100 = 4,3.",
        dica1: "Multiplique cada nota pelo número de ouvintes e divida por 100",
        dica2: "(200 + 200 + 30) ÷ 100"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // AULA 11: MEDIANA E MODA
  // --------------------------------------------------------------------------
  {
    id: "cur-3em-11",
    serie: "3º Ano Ensino Médio",
    aulaNumero: 11,
    aulaTitulo: "Mediana e moda",
    apresentacaoTema: "Identificação da moda (valor mais frequente na distribuição) e da mediana (elemento central do conjunto ordenado em rol), fundamentais na presença de valores discrepantes.",
    temaKey: "curriculo_3em",
    temaNome: "Aula 11: Mediana e moda",
    habilidade: "EM13MAT406",
    svgType: "mediana_moda",
    formulaDestaque: "Moda: Mais Frequente  •  Mediana: Termo Central do Rol Ordenado",
    resumoAula: "Medidas de Tendência Central:\n• Moda (Mo): é o valor que ocorre com maior frequência no conjunto de dados.\n• Mediana (Md): é o valor central que divide o conjunto de dados em duas metades iguais após organizá-los em ordem crescente ou decrescente (rol).\n  - Se n é ímpar: termo central único.\n  - Se n é par: média aritmética dos dois termos centrais.",
    pergunta: "Uma unidade móvel de saúde registrou o número de atendimentos diários durante 7 dias de campanha comunitária:\n[12, 15, 12, 18, 14, 20, 12]\n\nQuais são, respectivamente, a Moda (Mo) e a Mediana (Md) desses atendimentos?",
    opcoes: [
      "Moda = 12 e Mediana = 14",
      "Moda = 12 e Mediana = 15",
      "Moda = 14 e Mediana = 12",
      "Moda = 12 e Mediana = 14,7"
    ],
    correta: 0,
    porque: "1. Moda: o número 12 aparece 3 vezes (maior frequência). 2. Rol ordenado crescente (7 dados): [12, 12, 12, 14, 15, 18, 20]. O termo central (4º elemento) é 14. Logo, Moda = 12 e Mediana = 14.",
    dicaInvestigacao: "Ordene os dados em ordem crescente (rol). O valor mais repetido é a moda; o elemento exatamente no meio é a mediana.",
    atividades: [
      {
        id: "cur-3em-11-act2",
        numero: 2,
        titulo: "Atividade 2 (Deslocamento de Funcionários)",
        pergunta: "Os tempos (em minutos) de deslocamento de 8 funcionários até o trabalho foram: [15, 16, 17, 17, 17, 18, 19, 21]. Quais são a Moda e a Mediana?",
        opcoes: [
          "Moda = 17 e Mediana = 17",
          "Moda = 17 e Mediana = 17,5",
          "Moda = 18 e Mediana = 17",
          "Moda = 17 e Mediana = 16,5"
        ],
        correta: 0,
        porque: "Moda = 17 (aparece 3 vezes). Como n = 8 (par), a mediana é a média dos dois termos centrais (4º e 5º termos): (17 + 17) ÷ 2 = 17.",
        dica1: "Conjunto já está ordenado com 8 elementos",
        dica2: "A mediana é a média aritmética dos dois elementos do meio: (17 + 17) / 2."
      }
    ]
  },

  // --------------------------------------------------------------------------
  // AULA 12: REVISÃO: MEDIDAS DE TENDÊNCIA CENTRAL
  // --------------------------------------------------------------------------
  {
    id: "cur-3em-12",
    serie: "3º Ano Ensino Médio",
    aulaNumero: 12,
    aulaTitulo: "Revisão: medidas de tendência central",
    apresentacaoTema: "Análise comparativa e integrada entre média, mediana e moda para escolher a melhor medida de tendência central de acordo com a distribuição e simetria dos dados.",
    temaKey: "curriculo_3em",
    temaNome: "Aula 12: Revisão: medidas de tendência central",
    habilidade: "EM13MAT406",
    svgType: "revisao_tendencia_central",
    formulaDestaque: "Média (Equilíbrio)  •  Mediana (Centro Robusto)  •  Moda (Frequência)",
    resumoAula: "Comparação das Três Medidas:\n• A Média é ideal para conjuntos homogêneos sem valores atípicos.\n• A Mediana é a melhor representação quando existem valores extremos (outliers), pois não é distorcida por eles.\n• A Moda é útil para dados qualitativos ou quando se quer saber o valor mais comum/popular.",
    pergunta: "Em uma pequena oficina com 5 colaboradores, os salários mensais são: R$ 2.000, R$ 2.000, R$ 2.500, R$ 3.500 e R$ 20.000 (do proprietário). Qual medida representa com maior fidelidade o salário típico da equipe e qual é o seu valor?",
    opcoes: [
      "A Mediana (R$ 2.500), pois a Média (R$ 6.000) é inflacionada pelo salário do proprietário",
      "A Média (R$ 6.000), pois considera igualmente todos os valores",
      "A Moda (R$ 2.000), pois representa o salário de toda a equipe",
      "A Mediana (R$ 3.500), pois se aproxima da média aritmética"
    ],
    correta: 0,
    porque: "Rol: [2000, 2000, 2500, 3500, 20000]. Mediana = R$ 2.500. A média é (30.000 ÷ 5) = R$ 6.000, valor muito distante da realidade de 4 dos 5 trabalhadores. Por isso, a mediana é a medida mais confiável.",
    dicaInvestigacao: "Observe como o salário de R$ 20.000 puxa a média para cima. A mediana é a medida central mais estável frente a valores extremos!",
    atividades: [
      {
        id: "cur-3em-12-act2",
        numero: 2,
        titulo: "Atividade 2 (Simetria e Outliers)",
        pergunta: "Quando uma distribuição estatística apresenta alguns poucos valores extremamente elevados à direita, o que se espera que ocorra com a relação entre a Média e a Mediana?",
        opcoes: [
          "A Média será maior do que a Mediana (assimetria positiva)",
          "A Mediana será maior do que a Média",
          "Ambas serão exatamente iguais",
          "A Moda será maior do que a Média e a Mediana"
        ],
        correta: 0,
        porque: "Valores extremos elevados puxam a média para cima, enquanto a mediana permanece protegida no centro. Logo, Média > Mediana.",
        dica1: "Valores muito altos influenciam fortemente a soma da média",
        dica2: "A média é sensível a extremos; a mediana é robusta."
      }
    ]
  },

  // --------------------------------------------------------------------------
  // AULA 13: AMPLITUDE E VARIÂNCIA
  // --------------------------------------------------------------------------
  {
    id: "cur-3em-13",
    serie: "3º Ano Ensino Médio",
    aulaNumero: 13,
    aulaTitulo: "Amplitude e variância",
    apresentacaoTema: "Compreensão da dispersão de um conjunto de dados por meio da amplitude (diferença entre máximo e mínimo) e da variância (média dos quadrados dos desvios em relação à média).",
    temaKey: "curriculo_3em",
    temaNome: "Aula 13: Amplitude e variância",
    habilidade: "EM13MAT407",
    svgType: "amplitude_variancia",
    formulaDestaque: "A = x_max - x_min  •  σ² = Σ(xᵢ - x̄)² ÷ n",
    resumoAula: "Medidas de Dispersão:\n• Amplitude (A): diferença entre o maior e o menor valor do conjunto: A = x_max - x_min.\n• Variância (σ²): média dos quadrados das diferenças entre cada valor e a média aritmética:\n\nσ² = [(x₁ - x̄)² + (x₂ - x̄)² + ... + (xₙ - x̄)²] / n\n\nQuanto maior a variância, mais dispersos e heterogêneos estão os dados em relação à média.",
    pergunta: "Considere o conjunto de dados [2, 4, 6]. A média aritmética é x̄ = 4. Qual é o valor da Variância (σ²) desse conjunto?",
    opcoes: [
      "8/3 (aproximadamente 2,67)",
      "4",
      "2",
      "8"
    ],
    correta: 0,
    porque: "Desvios da média (4): (2 - 4) = -2; (4 - 4) = 0; (6 - 4) = 2. Quadrados dos desvios: (-2)² = 4; 0² = 0; 2² = 4. Variância = (4 + 0 + 4) ÷ 3 = 8/3 ≈ 2,67.",
    dicaInvestigacao: "Calcule a diferença de cada número para a média 4, eleve cada diferença ao quadrado, some tudo e divida por 3.",
    atividades: [
      {
        id: "cur-3em-13-act2",
        numero: 2,
        titulo: "Atividade 2 (Amplitude em Linhas de Ônibus)",
        pergunta: "Os tempos de espera (em minutos) registrados em um ponto de ônibus foram: 5, 8, 12, 15, 20. Qual é a amplitude desses tempos de espera?",
        opcoes: [
          "15 minutos",
          "20 minutos",
          "5 minutos",
          "12 minutos"
        ],
        correta: 0,
        porque: "Amplitude A = x_max - x_min = 20 - 5 = 15 minutos.",
        dica1: "Amplitude = Maior valor - Menor valor",
        dica2: "Subtraia 5 de 20."
      }
    ]
  },

  // --------------------------------------------------------------------------
  // AULA 14: DESVIO MÉDIO E DESVIO PADRÃO
  // --------------------------------------------------------------------------
  {
    id: "cur-3em-14",
    serie: "3º Ano Ensino Médio",
    aulaNumero: 14,
    aulaTitulo: "Desvio médio e desvio padrão",
    apresentacaoTema: "Estudo da homogeneidade e dispersão de distribuições estatísticas através do desvio médio e do desvio padrão (raiz quadrada da variância), expresso na mesma unidade dos dados.",
    temaKey: "curriculo_3em",
    temaNome: "Aula 14: Desvio médio e desvio padrão",
    habilidade: "EM13MAT407",
    svgType: "desvio_padrao",
    formulaDestaque: "DM = Σ|xᵢ - x̄| ÷ n  •  σ = √(Variância)",
    resumoAula: "Desvio Médio e Desvio Padrão:\n• Desvio Médio (DM): média dos valores absolutos (módulos) dos desvios: DM = Σ|xᵢ - x̄| / n.\n• Desvio Padrão (σ): raiz quadrada da variância: σ = √(σ²).\n  - Vantagem do desvio padrão: é expresso na mesma unidade de medida dos dados originais (ao contrário da variância, que fica na unidade ao quadrado).",
    pergunta: "Em um teste de laboratório sobre o tempo de reação de pilotos, a variância dos tempos medidos foi calculada em σ² = 16 segundos². Qual é o Desvio Padrão (σ) desses tempos de reação?",
    opcoes: [
      "4 segundos",
      "8 segundos",
      "16 segundos",
      "256 segundos"
    ],
    correta: 0,
    porque: "O desvio padrão é a raiz quadrada positiva da variância: σ = √16 = 4 segundos.",
    dicaInvestigacao: "O desvio padrão é simplesmente a raiz quadrada da variância: calcule √16.",
    atividades: [
      {
        id: "cur-3em-14-act2",
        numero: 2,
        titulo: "Atividade 2 (Desvio Médio em Pista)",
        pergunta: "Os desvios absolutos em relação à média de quatro voltas de um atleta foram: |x₁ - x̄| = 2 s; |x₂ - x̄| = 1 s; |x₃ - x̄| = 3 s; |x₄ - x̄| = 2 s. Qual é o Desvio Médio (DM)?",
        opcoes: [
          "2,0 segundos",
          "8,0 segundos",
          "2,5 segundos",
          "1,5 segundos"
        ],
        correta: 0,
        porque: "DM = (2 + 1 + 3 + 2) ÷ 4 = 8 ÷ 4 = 2,0 segundos.",
        dica1: "Some os módulos dos desvios e divida por 4",
        dica2: "(2 + 1 + 3 + 2) / 4"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // AULA 15: RESOLUÇÃO DE PROBLEMAS – DESVIO MÉDIO E DESVIO PADRÃO
  // --------------------------------------------------------------------------
  {
    id: "cur-3em-15",
    serie: "3º Ano Ensino Médio",
    aulaNumero: 15,
    aulaTitulo: "Resolução de problemas – Desvio médio e desvio padrão",
    apresentacaoTema: "Interpretação de situações reais, tomada de decisões gerenciais e avaliação da consistência e regularidade de processos comparando médias e desvios padrões.",
    temaKey: "curriculo_3em",
    temaNome: "Aula 15: Resolução de problemas – Desvio médio e desvio padrão",
    habilidade: "EM13MAT407",
    svgType: "problemas_desvio_padrao",
    formulaDestaque: "Menor Desvio Padrão = Maior Regularidade e Consistência",
    resumoAula: "Aplicação Prática da Dispersão:\nAo comparar dois grupos ou atletas com a mesma média:\n• O grupo com MENOR desvio padrão é mais regular, homogêneo e previsível.\n• O grupo com MAIOR desvio padrão apresenta maior oscilação entre os resultados.",
    pergunta: "(UPE 2013 Adaptada) Dois atletas de tiro esportivo, Lucas e Mateus, obtiveram exatamente a mesma pontuação média de 80 pontos após 10 séries de disparos. O desvio padrão de Lucas foi de 2 pontos, enquanto o de Mateus foi de 8 pontos. Qual atirador demonstrou MAIOR REGULARIDADE em seu desempenho?",
    opcoes: [
      "Lucas foi mais regular, pois apresentou menor desvio padrão (2 pontos)",
      "Mateus foi mais regular, pois apresentou maior desvio padrão (8 pontos)",
      "Ambos foram igualmente regulares, pois obtiveram a mesma média (80 pontos)",
      "Não é possível determinar a regularidade apenas pelo desvio padrão"
    ],
    correta: 0,
    porque: "Quanto menor o desvio padrão, menor é a dispersão em torno da média, o que indica maior regularidade e consistência. Como 2 < 8, Lucas foi o atirador mais regular.",
    dicaInvestigacao: "Lembre-se: em estatística, menor desvio padrão significa que os resultados oscilaram menos (maior regularidade).",
    atividades: [
      {
        id: "cur-3em-15-act2",
        numero: 2,
        titulo: "Atividade 2 (ENEM 2019 - Consistência de Atletas)",
        pergunta: "Em uma competição de salto em altura, cinco atletas obtiveram a mesma média de 2,10 m. Os desvios padrão foram: Atleta I (0,15 m), Atleta II (0,05 m), Atleta III (0,20 m), Atleta IV (0,10 m) e Atleta V (0,08 m). O treinador deve selecionar o atleta mais regular. Quem deve ser escolhido?",
        opcoes: [
          "Atleta II (σ = 0,05 m)",
          "Atleta I (σ = 0,15 m)",
          "Atleta III (σ = 0,20 m)",
          "Atleta V (σ = 0,08 m)"
        ],
        correta: 0,
        porque: "O atleta mais regular é aquele com o menor desvio padrão. O menor valor entre todos é 0,05 m (Atleta II).",
        dica1: "Mais regular = Menor desvio padrão",
        dica2: "Identifique o menor número da lista de desvios padrão."
      }
    ]
  },

  // --------------------------------------------------------------------------
  // AULA 16: AULA DE VERIFICAÇÃO: MEDIDAS DE TENDÊNCIA E DISPERSÃO
  // --------------------------------------------------------------------------
  {
    id: "cur-3em-16",
    serie: "3º Ano Ensino Médio",
    aulaNumero: 16,
    aulaTitulo: "Aula de verificação: medidas de tendência central e medidas de dispersão",
    apresentacaoTema: "Desafio avaliativo integrador consolidando todas as competências de estatística descritiva (média, mediana, moda, amplitude, variância e desvio padrão).",
    temaKey: "curriculo_3em",
    temaNome: "Aula 16: Aula de verificação: medidas de tendência central e medidas de dispersão",
    habilidade: "EM13MAT407",
    svgType: "verificacao_estatistica",
    formulaDestaque: "Síntese Estatística: Tendência Central & Dispersão",
    resumoAula: "Aula de Verificação das Aulas 9 a 15:\n• Medidas de Tendência Central: Média (x̄), Mediana (Md) e Moda (Mo).\n• Medidas de Dispersão: Amplitude (A), Variância (σ²) e Desvio Padrão (σ).\n• Análise conjunta: a média localiza o centro dos dados e o desvio padrão quantifica o espalhamento em torno desse centro.",
    pergunta: "Um conjunto de 5 números possui média x̄ = 10 e todos os 5 números são rigorosamente iguais a 10: [10, 10, 10, 10, 10]. Qual é o valor da sua Variância (σ²) e do seu Desvio Padrão (σ)?",
    opcoes: [
      "Variância = 0 e Desvio Padrão = 0",
      "Variância = 10 e Desvio Padrão = 10",
      "Variância = 1 e Desvio Padrão = 1",
      "Variância = 100 e Desvio Padrão = 10"
    ],
    correta: 0,
    porque: "Como todos os valores são idênticos à média 10, todos os desvios (xᵢ - x̄) são iguais a zero. Logo, a variância é 0 e o desvio padrão é √0 = 0 (dispersão nula).",
    dicaInvestigacao: "Se nenhum valor se afasta da média, não existe dispersão: calcule a diferença (10 - 10).",
    atividades: [
      {
        id: "cur-3em-16-act2",
        numero: 2,
        titulo: "Atividade 2 (Produtividade de Milho)",
        pergunta: "Duas fazendas colheram em média 120 sacas de milho por hectare nos últimos 4 anos. A Fazenda Esperança teve desvio padrão de 5 sacas/ha e a Fazenda Alvorada teve desvio padrão de 18 sacas/ha. O que se pode concluir?",
        opcoes: [
          "A Fazenda Esperança é mais previsível e estável em sua colheita",
          "A Fazenda Alvorada produziu mais milho no total",
          "Ambas tiveram exatamente as mesmas colheitas em cada ano",
          "A Fazenda Alvorada é mais confiável por ter maior desvio padrão"
        ],
        correta: 0,
        porque: "O menor desvio padrão (5 < 18) indica que a Fazenda Esperança oscilou muito menos de ano para ano, tendo colheita mais homogênea e previsível.",
        dica1: "Menor desvio padrão = Maior estabilidade e consistência",
        dica2: "Compare os valores 5 e 18."
      }
    ]
  },

  // --------------------------------------------------------------------------
  // AULA 17: PROPORCIONALIDADE COM PERÍMETRO E ÁREA DE POLÍGONOS
  // --------------------------------------------------------------------------
  {
    id: "cur-3em-17",
    serie: "3º Ano Ensino Médio",
    aulaNumero: 17,
    aulaTitulo: "Proporcionalidade com perímetro e área de polígonos",
    apresentacaoTema: "Investigação da razão de semelhança entre polígonos: como o fator de escala k multiplica o perímetro linearmente por k e multiplica a área superficial por k².",
    temaKey: "curriculo_3em",
    temaNome: "Aula 17: Proporcionalidade com perímetro e área de polígonos",
    habilidade: "EM13MAT502",
    svgType: "poligonos_semelhanca",
    formulaDestaque: "Razão dos Perímetros: P₂/P₁ = k  •  Razão das Áreas: A₂/A₁ = k²",
    resumoAula: "Relação de Proporcionalidade em Figuras Semelhantes:\nSe todos os lados de um polígono forem multiplicados por um fator k (razão de semelhança linear):\n• O Perímetro é multiplicado por k: P_novo = k · P_original.\n• A Área é multiplicada por k²: A_nova = k² · A_original.\n\nExemplo: dobrando os lados de um retângulo (k = 2), o perímetro dobra (2×), mas a área quadruplica (2² = 4×).",
    pergunta: "Em um projeto de paisagismo sustentável, uma calçada utilizava pisos drenantes quadrados de lado 2 m. Para uma nova praça, foi encomendado um piso semelhante com lado de 6 m. Sabendo que o lado triplicou (k = 3), quantas vezes a ÁREA do novo piso é maior que a do piso original?",
    opcoes: [
      "9 vezes maior (3² = 9)",
      "3 vezes maior (k = 3)",
      "6 vezes maior (2 × 3 = 6)",
      "12 vezes maior"
    ],
    correta: 0,
    porque: "A razão linear é k = 6/2 = 3. A razão entre as áreas de figuras semelhantes é proporcional ao quadrado da razão linear: k² = 3² = 9 vezes.",
    dicaInvestigacao: "A área varia com o quadrado do fator de escala linear: calcule 3² = 9.",
    atividades: [
      {
        id: "cur-3em-17-act2",
        numero: 2,
        titulo: "Atividade 2 (Dimensões Duplicadas)",
        pergunta: "Um retângulo possui área inicial de 15 cm². Se dobrarmos todas as suas dimensões lineares (comprimento e largura multiplicados por 2), qual será a nova área desse retângulo?",
        opcoes: [
          "60 cm² (15 × 2²)",
          "30 cm²",
          "45 cm²",
          "120 cm²"
        ],
        correta: 0,
        porque: "Com k = 2, a nova área é A_nova = A_original × k² = 15 × 2² = 15 × 4 = 60 cm².",
        dica1: "Área_nova = Área_original × k²",
        dica2: "Multiplique 15 por 4."
      }
    ]
  },

  // --------------------------------------------------------------------------
  // AULA 18: POLÍGONOS CONVEXOS REGULARES
  // --------------------------------------------------------------------------
  {
    id: "cur-3em-18",
    serie: "3º Ano Ensino Médio",
    aulaNumero: 18,
    aulaTitulo: "Polígonos convexos regulares",
    apresentacaoTema: "Propriedades geométricas dos polígonos regulares: ângulos internos, ângulos externos, soma angular total e número de diagonais.",
    temaKey: "curriculo_3em",
    temaNome: "Aula 18: Polígonos convexos regulares",
    habilidade: "EM13MAT502",
    svgType: "poligonos_regulares",
    formulaDestaque: "S_i = (n - 2) · 180°  •  a_i = (n - 2) · 180° ÷ n",
    resumoAula: "Polígono Regular: possui todos os lados congruentes (equilátero) e todos os ângulos congruentes (equiângulo).\n\nFórmulas Fundamentais (n = número de lados):\n• Soma dos ângulos internos: S_i = (n - 2) · 180°\n• Cada ângulo interno: a_i = S_i / n = [(n - 2) · 180°] / n\n• Cada ângulo externo: a_e = 360° / n\n• Relação: a_i + a_e = 180°",
    pergunta: "Qual é a medida de cada ângulo interno (a_i) de um hexágono regular (polígono convexo de n = 6 lados congruentes)?",
    opcoes: [
      "120°",
      "108°",
      "135°",
      "144°"
    ],
    correta: 0,
    porque: "Para n = 6: Soma dos ângulos internos S_i = (6 - 2) × 180° = 4 × 180° = 720°. Como o hexágono é regular, cada ângulo interno mede: a_i = 720° ÷ 6 = 120°.",
    dicaInvestigacao: "Aplique a fórmula a_i = (n - 2) · 180° ÷ n para n = 6: calcule (4 × 180) ÷ 6.",
    atividades: [
      {
        id: "cur-3em-18-act2",
        numero: 2,
        titulo: "Atividade 2 (Canteiro Octogonal)",
        pergunta: "Um canteiro de flores foi projetado no formato de um octógono regular (n = 8 lados). Qual é a soma de todos os seus ângulos internos e quanto mede cada um desses ângulos?",
        opcoes: [
          "Soma = 1.080° e cada ângulo mede 135°",
          "Soma = 720° e cada ângulo mede 120°",
          "Soma = 1.440° e cada ângulo mede 180°",
          "Soma = 1.080° e cada ângulo mede 108°"
        ],
        correta: 0,
        porque: "S_i = (8 - 2) × 180° = 6 × 180° = 1.080°. Cada ângulo: 1.080° ÷ 8 = 135°.",
        dica1: "S_i = (n - 2) · 180°",
        dica2: "(8 - 2) × 180 = 1.080; depois divida por 8."
      }
    ]
  },

  // --------------------------------------------------------------------------
  // AULA 19: ÁREAS DE POLÍGONOS REGULARES – PARTE 1
  // --------------------------------------------------------------------------
  {
    id: "cur-3em-19",
    serie: "3º Ano Ensino Médio",
    aulaNumero: 19,
    aulaTitulo: "Áreas de polígonos regulares – Parte 1",
    apresentacaoTema: "Dedução e aplicação da fórmula da área de polígonos regulares através do semiperímetro e do apótema (A = p · a) e cálculo da área de triângulos equiláteros.",
    temaKey: "curriculo_3em",
    temaNome: "Aula 19: Áreas de polígonos regulares – Parte 1",
    habilidade: "EM13MAT502",
    svgType: "area_poligono_apotema",
    formulaDestaque: "Área = p · a  •  Triângulo Equilátero: A = (L²√3) ÷ 4",
    resumoAula: "Área de um Polígono Regular:\nQualquer polígono regular de n lados pode ser decomposto em n triângulos congruentes com base L e altura igual ao apótema a:\n\nÁrea = n · (L · a / 2) = (n · L / 2) · a = p · a\n\nEm que:\n• p = Perímetro / 2 é o semiperímetro;\n• a é o apótema (distância do centro ao ponto médio do lado).\n\nTriângulo Equilátero de lado L:\nA = (L² · √3) / 4",
    pergunta: "Um azulejo artesanal possui a forma de um triângulo equilátero com lados medindo L = 6 cm. Qual é a área exata dessa peça? (Lembre-se da fórmula A = (L²√3)/4)",
    opcoes: [
      "9√3 cm²",
      "36√3 cm²",
      "18√3 cm²",
      "6√3 cm²"
    ],
    correta: 0,
    porque: "Área do triângulo equilátero: A = (L² · √3) / 4 = (6² · √3) / 4 = (36 · √3) / 4 = 9√3 cm².",
    dicaInvestigacao: "Eleve o lado ao quadrado (6² = 36), multiplique por √3 e divida o resultado por 4: 36/4 = 9.",
    atividades: [
      {
        id: "cur-3em-19-act2",
        numero: 2,
        titulo: "Atividade 2 (Área pelo Apótema)",
        pergunta: "Um octógono regular tem perímetro total de 40 cm e apótema medindo 6 cm. Qual é a área desse octógono regular?",
        opcoes: [
          "120 cm²",
          "240 cm²",
          "60 cm²",
          "480 cm²"
        ],
        correta: 0,
        porque: "Semiperímetro p = 40 ÷ 2 = 20 cm. Área = p · a = 20 cm × 6 cm = 120 cm².",
        dica1: "Área = Semiperímetro (p) × Apótema (a)",
        dica2: "Divida o perímetro por 2 (40/2 = 20) e multiplique por 6."
      }
    ]
  },

  // --------------------------------------------------------------------------
  // AULA 20: REVISÃO: POLÍGONOS CONVEXOS E CÁLCULOS DE ÁREA
  // --------------------------------------------------------------------------
  {
    id: "cur-3em-20",
    serie: "3º Ano Ensino Médio",
    aulaNumero: 20,
    aulaTitulo: "Revisão: polígonos convexos e cálculos de área",
    apresentacaoTema: "Consolidação das técnicas de decomposição geométrica de polígonos complexos em triângulos, retângulos e trapézios fundamentais.",
    temaKey: "curriculo_3em",
    temaNome: "Aula 20: Revisão: polígonos convexos e cálculos de área",
    habilidade: "EM13MAT502",
    svgType: "decomposicao_poligonos",
    formulaDestaque: "Área Total = Soma das Áreas Decompostas",
    resumoAula: "Estratégia de Decomposição de Figuras Planas:\nPara calcular a área de figuras poligonais irregulares ou compostas:\n1. Decompor a figura em formas elementares (triângulos, retângulos, trapézios).\n2. Calcular a área de cada parte com suas respectivas fórmulas.\n3. Somar as áreas parciais para obter a área total.",
    pergunta: "Uma praça comunitária tem a forma de um trapézio retângulo com base maior B = 20 m, base menor b = 14 m e altura h = 10 m. Qual é a área total dessa praça?",
    opcoes: [
      "170 m²",
      "340 m²",
      "140 m²",
      "200 m²"
    ],
    correta: 0,
    porque: "Área do trapézio: A = [(B + b) × h] ÷ 2 = [(20 + 14) × 10] ÷ 2 = [34 × 10] ÷ 2 = 340 ÷ 2 = 170 m².",
    dicaInvestigacao: "Some as bases (20 + 14 = 34), multiplique pela altura 10 e divida por 2.",
    atividades: [
      {
        id: "cur-3em-20-act2",
        numero: 2,
        titulo: "Atividade 2 (Decomposição em Retângulo e Triângulo)",
        pergunta: "Um terreno em formato de L pode ser dividido em dois retângulos: um de 8 m × 5 m e outro de 6 m × 4 m. Qual é a área total do terreno?",
        opcoes: [
          "64 m²",
          "40 m²",
          "24 m²",
          "72 m²"
        ],
        correta: 0,
        porque: "Área total = (8 × 5) + (6 × 4) = 40 + 24 = 64 m².",
        dica1: "Calcule a área de cada retângulo e some os dois valores",
        dica2: "40 + 24 = 64"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // AULA 21: ÁREAS DE POLÍGONOS REGULARES – PARTE 2
  // --------------------------------------------------------------------------
  {
    id: "cur-3em-21",
    serie: "3º Ano Ensino Médio",
    aulaNumero: 21,
    aulaTitulo: "Áreas de polígonos regulares – Parte 2",
    apresentacaoTema: "Aprofundamento no cálculo de apótemas de hexágonos regulares utilizando relações trigonométricas no triângulo retângulo (seno, cosseno e tangente).",
    temaKey: "curriculo_3em",
    temaNome: "Aula 21: Áreas de polígonos regulares – Parte 2",
    habilidade: "EM13MAT502",
    svgType: "area_hexagono_regular",
    formulaDestaque: "Hexágono Regular: A = (3 · L² · √3) ÷ 2  •  Apótema = (L · √3) ÷ 2",
    resumoAula: "Hexágono Regular:\nO hexágono regular é composto por 6 triângulos equiláteros de lado L unidos pelo centro.\n• Área de um triângulo equilátero: A_tri = (L² · √3) / 4\n• Área do hexágono regular: A_hex = 6 · [(L² · √3) / 4] = (3 · L² · √3) / 2\n• Apótema do hexágono: a = (L · √3) / 2",
    pergunta: "Qual é a área de um painel fotovoltaico em formato de hexágono regular com lados medindo L = 4 cm? (Considere a aproximação √3 ≈ 1,73)",
    opcoes: [
      "Aproximadamente 41,52 cm²",
      "Aproximadamente 27,68 cm²",
      "Aproximadamente 48,00 cm²",
      "Aproximadamente 83,04 cm²"
    ],
    correta: 0,
    porque: "A_hex = [3 × L² × √3] / 2 = [3 × 4² × 1,73] / 2 = [3 × 16 × 1,73] / 2 = 24 × 1,73 = 41,52 cm².",
    dicaInvestigacao: "Calcule a área de um triângulo equilátero (4² × 1,73 ÷ 4 = 6,92) e multiplique por 6 (pois o hexágono contém 6 triângulos equiláteros).",
    atividades: [
      {
        id: "cur-3em-21-act2",
        numero: 2,
        titulo: "Atividade 2 (Apótema do Hexágono)",
        pergunta: "Em um hexágono regular com lados de 6 cm, qual é a medida do seu apótema? (Considere a fórmula a = L√3 / 2)",
        opcoes: [
          "3√3 cm",
          "6√3 cm",
          "2√3 cm",
          "12√3 cm"
        ],
        correta: 0,
        porque: "a = L√3 / 2 = 6√3 / 2 = 3√3 cm.",
        dica1: "Apótema = L√3 ÷ 2",
        dica2: "Substitua L por 6 e simplifique por 2."
      }
    ]
  },

  // --------------------------------------------------------------------------
  // AULA 22: ÁREA DO CÍRCULO E DO SETOR CIRCULAR
  // --------------------------------------------------------------------------
  {
    id: "cur-3em-22",
    serie: "3º Ano Ensino Médio",
    aulaNumero: 22,
    aulaTitulo: "Área do círculo e do setor circular",
    apresentacaoTema: "Determinação da área do disco circular (A = πR²) e da área de setores circulares proporcionais ao ângulo central ou comprimento do arco.",
    temaKey: "curriculo_3em",
    temaNome: "Aula 22: Área do círculo e do setor circular",
    habilidade: "EM13MAT502",
    svgType: "area_circulo_setor",
    formulaDestaque: "A_círculo = π · R²  •  A_setor = (α ÷ 360°) · π · R²",
    resumoAula: "Círculo e Setor Circular:\n• Área do Círculo Completo: A = π · R²\n• Comprimento da Circunferência: C = 2 · π · R\n• Área do Setor Circular (fatia proporcional com ângulo central α em graus):\n  A_setor = (α / 360°) · π · R²\n  Em que α é a abertura do ângulo central.",
    pergunta: "Um canteiro ornamental foi construído na forma de um setor circular com raio R = 8 m e ângulo central de α = 135°. Qual é a área exata desse canteiro em função de π?",
    opcoes: [
      "24π m²",
      "32π m²",
      "16π m²",
      "48π m²"
    ],
    correta: 0,
    porque: "Área do círculo total: A = π · 8² = 64π m². Fração do setor: 135°/360° = 3/8. Logo: A_setor = (3/8) × 64π = 3 × 8π = 24π m².",
    dicaInvestigacao: "Simplifique a fração 135°/360° dividindo por 45°: ela resulta em 3/8. Em seguida, multiplique por 64π.",
    atividades: [
      {
        id: "cur-3em-22-act2",
        numero: 2,
        titulo: "Atividade 2 (Horta Circular de Alface)",
        pergunta: "Uma horta comunitária ocupa um setor circular com raio R = 10 m e ângulo central de 72°. Qual é a área dessa horta em função de π?",
        opcoes: [
          "20π m²",
          "25π m²",
          "10π m²",
          "50π m²"
        ],
        correta: 0,
        porque: "72°/360° = 1/5 do círculo completo. Área total = π · 10² = 100π m². Área do setor = 100π ÷ 5 = 20π m².",
        dica1: "72° ÷ 360° = 1/5",
        dica2: "Calcule π · 10² = 100π e divida por 5."
      },
      {
        id: "cur-3em-22-act3",
        numero: 3,
        titulo: "Atividade 3 (Setor de 60°)",
        pergunta: "Qual é a área de um setor circular com raio R = 6 cm e ângulo central de 60°? (Considere π ≈ 3,14)",
        opcoes: [
          "18,84 cm²",
          "37,68 cm²",
          "113,04 cm²",
          "9,42 cm²"
        ],
        correta: 0,
        porque: "Área total = 3,14 × 6² = 113,04 cm². Setor de 60° = 60°/360° = 1/6. Área = 113,04 ÷ 6 = 18,84 cm².",
        dica1: "60° representa 1/6 da volta completa",
        dica2: "113,04 ÷ 6"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // AULA 23: RESOLUÇÃO DE PROBLEMAS ENVOLVENDO ÁREAS DE FIGURAS PLANAS
  // --------------------------------------------------------------------------
  {
    id: "cur-3em-23",
    serie: "3º Ano Ensino Médio",
    aulaNumero: 23,
    aulaTitulo: "Resolução de problemas envolvendo áreas de figuras planas",
    apresentacaoTema: "Resolução de situações práticas contextualizadas de arquitetura, engenharia e paisagismo envolvendo áreas sombreadas, coroas circulares e regiões compostas.",
    temaKey: "curriculo_3em",
    temaNome: "Aula 23: Resolução de problemas envolvendo áreas de figuras planas",
    habilidade: "EM13MAT502",
    svgType: "area_sombreada",
    formulaDestaque: "Área Sombreada = Área da Figura Externa - Área Não Sombreada",
    resumoAula: "Áreas de Regiões Compostas e Sombreadas:\nGeralmente resolvidas por subtração:\n• Área Sombreada = Área da Figura Externa (Total) - Área da Figura Interna (Recorte).\n• Coroa Circular: A_coroa = π · (R² - r²).",
    pergunta: "(ENEM 2020 Adaptada) Em uma chapa metálica quadrada com lado de 10 cm, foi perfurado um orifício circular no centro com raio r = 3 cm. Qual é a área restante da chapa metálica? (Adote π ≈ 3,14)",
    opcoes: [
      "71,74 cm²",
      "100 cm²",
      "28,26 cm²",
      "81,14 cm²"
    ],
    correta: 0,
    porque: "Área do quadrado: A_quadrado = 10 × 10 = 100 cm². Área do círculo perfurado: A_círculo = 3,14 × 3² = 3,14 × 9 = 28,26 cm². Área remanescente = 100 - 28,26 = 71,74 cm².",
    dicaInvestigacao: "Calcule a área do quadrado (10 × 10 = 100) e subtraia a área do círculo perfurado (3,14 × 3² = 28,26).",
    atividades: [
      {
        id: "cur-3em-23-act2",
        numero: 2,
        titulo: "Atividade 2 (ENEM 2015 - Coroa Circular)",
        pergunta: "Uma praça circular de raio 10 metros possui no centro um chafariz circular de raio 4 metros. O restante da praça forma uma coroa circular pavimentada. Qual é a área dessa coroa circular em função de π?",
        opcoes: [
          "84π m²",
          "100π m²",
          "16π m²",
          "64π m²"
        ],
        correta: 0,
        porque: "A_coroa = π · (R² - r²) = π · (10² - 4²) = π · (100 - 16) = 84π m².",
        dica1: "A_coroa = π · (R² - r²)",
        dica2: "100 - 16 = 84"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // AULA 24: AULA DE VERIFICAÇÃO: ÁREAS DE FIGURAS PLANAS
  // --------------------------------------------------------------------------
  {
    id: "cur-3em-24",
    serie: "3º Ano Ensino Médio",
    aulaNumero: 24,
    aulaTitulo: "Aula de verificação: áreas de figuras planas",
    apresentacaoTema: "Desafio avaliativo final do bimestre, testando a maestria na resolução autônoma de problemas complexos de áreas de polígonos e regiões circulares.",
    temaKey: "curriculo_3em",
    temaNome: "Aula 24: Aula de verificação: áreas de figuras planas",
    habilidade: "EM13MAT502",
    svgType: "verificacao_geometria_areas",
    formulaDestaque: "Grande Aula Final de Geometria Plana (4º Bimestre)",
    resumoAula: "Aula de Verificação das Aulas 17 a 23:\n• Proporcionalidade de perímetros e áreas com fator k e k².\n• Polígonos regulares: ângulos internos e externos.\n• Áreas de polígonos pelo semiperímetro e apótema (A = p · a).\n• Círculos, setores e regiões compostas por subtração de áreas.",
    pergunta: "(ENEM 2020 Adaptada) Um jardim retangular possui dimensões de 12 m por 8 m. No centro desse terreno, foi instalado um canteiro circular com raio de 2 m. Qual é a área do jardim que continua coberta por grama? (Adote π ≈ 3,14)",
    opcoes: [
      "83,44 m²",
      "96,00 m²",
      "12,56 m²",
      "70,88 m²"
    ],
    correta: 0,
    porque: "Área do retângulo: A_ret = 12 × 8 = 96 m². Área do canteiro circular: A_circ = 3,14 × 2² = 3,14 × 4 = 12,56 m². Área gramada restante = 96 - 12,56 = 83,44 m².",
    dicaInvestigacao: "Calcule a área total do retângulo (12 × 8 = 96) e subtraia a área do canteiro circular (3,14 × 2² = 12,56).",
    atividades: [
      {
        id: "cur-3em-24-act2",
        numero: 2,
        titulo: "Atividade 2 (ENEM 2021 - Instrumento Triangular)",
        pergunta: "Um triângulo equilátero de lado L = 10 cm é utilizado como molde decorativo. Adotando √3 ≈ 1,73, qual é a área desse triângulo?",
        opcoes: [
          "43,25 cm²",
          "50,00 cm²",
          "86,50 cm²",
          "25,00 cm²"
        ],
        correta: 0,
        porque: "A = (L²√3) / 4 = (10² × 1,73) / 4 = (100 × 1,73) / 4 = 173 / 4 = 43,25 cm².",
        dica1: "A = (L²√3) / 4",
        dica2: "100 × 1,73 ÷ 4"
      }
    ]
  }
];
