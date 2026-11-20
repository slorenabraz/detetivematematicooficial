import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Lightbulb,
  Sparkles,
  RefreshCw,
  Globe,
  GraduationCap,
  CheckCircle2,
  XCircle,
  Zap,
  ArrowRight,
  SkipForward
} from 'lucide-react';
import { MathParticleCelebration } from './MathParticleCelebration';

export interface DailyChallenge {
  pergunta: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
}

export interface GeometricTip {
  id: number;
  serieEstudo: string;
  categoria: string;
  icone: string;
  titulo: string;
  fato: string;
  usoNoMundoReal: string;
  exemplosReais: string[];
  desafioRapido: DailyChallenge;
}

interface MathTipOfTheDayProps {
  onNavigateCurriculo?: () => void;
}

export const GEOMETRIC_TIPS: GeometricTip[] = [
  {
    id: 1,
    serieEstudo: '6º Ano Fundamental',
    categoria: 'Porcentagem & Economia',
    icone: '🛒',
    titulo: 'Porcentagens e Frações em Cada Compra e Jogo',
    fato: 'Uma porcentagem nada mais é do que uma fração com denominador 100 (25% = 25/100 = 1/4). Dominar essa conversão mental permite comparar preços, calcular descontos e entender estatísticas em segundos!',
    usoNoMundoReal: 'Usamos porcentagens o tempo todo fora da escola: desde calcular o desconto em uma loja até acompanhar a bateria do celular ou barras de progresso em jogos.',
    exemplosReais: [
      'Promoções e finanças: saber se "25% de desconto à vista" compensa mais que parcelar',
      'Videogames: taxas de acerto crítico, energia restante e XP para o próximo nível',
      'Alimentação: entender rótulos nutricionais com valores diários recomendados em %'
    ],
    desafioRapido: {
      pergunta: 'Um tênis que custa R$ 200,00 está com 25% de desconto para pagamento à vista. Qual será o valor final pago?',
      opcoes: ['R$ 150,00', 'R$ 175,00', 'R$ 125,00'],
      correta: 0,
      explicacao: '25% equivale a 1/4 do valor. Um quarto de 200 é 50, logo R$ 200 - R$ 50 = R$ 150,00!'
    }
  },
  {
    id: 2,
    serieEstudo: '7º Ano Fundamental',
    categoria: 'Volume & Capacidade 3D',
    icone: '💧',
    titulo: 'Como Medimos Água, Piscinas e Embalagens (1 dm³ = 1 L)',
    fato: 'A matemática conecta o espaço tridimensional diretamente aos líquidos que bebemos: um cubo com 10 cm de lado (1 dm³) armazena exatamente 1 litro, e 1 m³ guarda 1.000 litros!',
    usoNoMundoReal: 'Engenheiros, cozinheiros, designers de embalagens e até aquaristas usam cálculos de volume para saber exatamente quanto cabe dentro de caixas, tanques e reservatórios.',
    exemplosReais: [
      'Supermercado: caixas de leite (1 litro = 1.000 cm³) projetadas para caber na porta da geladeira',
      'Sustentabilidade: calcular quantos litros de chuva uma cisterna retangular consegue captar',
      'Logística: empilhar caixas dentro de caminhões aproveitando 100% do volume interno'
    ],
    desafioRapido: {
      pergunta: 'Um aquário retangular tem 50 cm de comprimento, 20 cm de largura e 30 cm de altura. Quantos litros de água cabem nele totalmente cheio?',
      opcoes: ['3 litros', '30 litros', '300 litros'],
      correta: 1,
      explicacao: 'Volume = 50 × 20 × 30 = 30.000 cm³. Como 1.000 cm³ = 1 litro, dividimos por 1.000 e obtemos 30 litros!'
    }
  },
  {
    id: 3,
    serieEstudo: '8º Ano Fundamental',
    categoria: 'Círculos, Rodas & Cilindros',
    icone: '🚲',
    titulo: 'O Número Pi (π) Faz o Mundo Girar em Bicicletas e Engrenagens',
    fato: 'Toda vez que uma roda dá uma volta completa no chão, a distância percorrida é exatamente o comprimento da circunferência: C = 2 · π · r (onde π ≈ 3,14).',
    usoNoMundoReal: 'Sem o número Pi não existiriam velocímetros precisos, engrenagens de relógios, tubulações hidráulicas, latas de refrigerante padronizadas nem cálculos de órbitas planetárias!',
    exemplosReais: [
      'Ciclismo e carros: o velocímetro calcula sua velocidade contando quantas voltas o pneu dá por segundo',
      'Indústria de alimentos: latas cilíndricas (V = π·r²·h) otimizadas para gastar menos alumínio',
      'Estádios e pistas de atletismo: curvas desenhadas com arcos circulares exatos'
    ],
    desafioRapido: {
      pergunta: 'Uma pizza grande circular tem raio de 20 cm, enquanto uma brotinho tem raio de 10 cm. Usando A = π·r², quantas vezes a área da grande é maior que a da brotinho?',
      opcoes: ['2 vezes maior', '3 vezes maior', '4 vezes maior'],
      correta: 2,
      explicacao: 'Como o raio está ao quadrado (r²), ao dobrar o raio (de 10 para 20), a área multiplica por 2² = 4 vezes!'
    }
  },
  {
    id: 4,
    serieEstudo: '9º Ano Fundamental',
    categoria: 'Pitágoras & Construção',
    icone: '📐',
    titulo: 'A Corda Egípcia (3, 4, 5) Que Endireita Casas, Telas e Campos',
    fato: 'Mais de mil anos antes de Pitágoras, construtores já sabiam que um triângulo com lados 3, 4 e 5 sempre forma um ângulo reto perfeito de 90°, pois 3² + 4² = 5² (9 + 16 = 25).',
    usoNoMundoReal: 'O Teorema de Pitágoras está em praticamente qualquer projeto físico ou digital: calcula diagonais de telas de celular/TV, rampas acessíveis, cabos de pontes e distâncias em jogos!',
    exemplosReais: [
      'Pedreiros e arquitetos: usam o esquadro 3-4-5 para garantir paredes perfeitamente retas',
      'Tecnologia e TVs: uma TV de "50 polegadas" tem esse tamanho medido na diagonal por Pitágoras',
      'Jogos digitais 2D/3D: detectar se um personagem está perto de um item usando d = √(Δx² + Δy²)'
    ],
    desafioRapido: {
      pergunta: 'Uma escada de 5 metros é apoiada em uma parede vertical, com sua base a 3 metros de distância da parede. A que altura do chão ela toca a parede?',
      opcoes: ['4 metros', '2 metros', '6 metros'],
      correta: 0,
      explicacao: 'Pelo Teorema de Pitágoras: h² + 3² = 5² → h² + 9 = 25 → h² = 16 → h = 4 metros!'
    }
  },
  {
    id: 5,
    serieEstudo: '9º Ano Fundamental',
    categoria: 'Tales & Semelhança',
    icone: '☀️',
    titulo: 'Medindo Prédios e Árvores Gigantes Só com a Sombra do Sol',
    fato: 'Tales de Mileto descobriu que, no mesmo instante do dia, os raios solares atingem o solo com o mesmo ângulo, criando triângulos semelhantes entre qualquer objeto e sua sombra.',
    usoNoMundoReal: 'A proporcionalidade e a semelhança de triângulos permitem fazer medições impossíveis com régua comum — além de serem a base para o zoom de câmeras, maquetes e plantas de casas!',
    exemplosReais: [
      'Fotografia e cinema: lentes ajustam o tamanho proporcional da imagem projetada no sensor',
      'Arquitetura e engenharia: maquetes em escala 1:50 preservam todos os ângulos do prédio real',
      'Topografia: medir a largura de rios sem precisar atravessá-los usando triângulos semelhantes'
    ],
    desafioRapido: {
      pergunta: 'Uma placa de 2 m de altura projeta sombra de 1 m no mesmo momento em que um poste projeta sombra de 4,5 m. Qual é a altura do poste?',
      opcoes: ['6,5 metros', '9 metros', '11 metros'],
      correta: 1,
      explicacao: 'A altura é o dobro da sombra (2/1 = H/4,5), portanto H = 2 × 4,5 = 9 metros!'
    }
  },
  {
    id: 6,
    serieEstudo: '1º Ano Ensino Médio',
    categoria: 'Trigonometria & Trajetórias',
    icone: '⚽',
    titulo: 'Seno, Cosseno e Tangente no Futebol, Música e Rampas',
    fato: 'No triângulo retângulo, seno, cosseno e tangente traduzem ângulos em razões entre lados (SOH-CAH-TOA). Isso permite descobrir alturas e distâncias inatingíveis apenas medindo um ângulo!',
    usoNoMundoReal: 'Essas relações guiam desde a inclinação segura de rampas de acessibilidade até ondas sonoras no fone de ouvido e a trajetória de lançamentos nos esportes.',
    exemplosReais: [
      'Esportes e robótica: calcular o ângulo ideal de arremesso no basquete ou lançamento de foguetes',
      'Áudio e música: sintetizadores digitais combinam ondas senoidais para criar timbres musicais',
      'Acessibilidade urbana: normas técnicas usam tangente do ângulo para projetar rampas seguras'
    ],
    desafioRapido: {
      pergunta: 'Ao observar o topo de uma torre sob um ângulo de elevação de 45° estando a 30 m da base (tg 45° = 1), qual a altura aproximada da torre acima dos seus olhos?',
      opcoes: ['15 metros', '30 metros', '60 metros'],
      correta: 1,
      explicacao: 'Como tg(45°) = CO / CA = 1, o cateto oposto (altura) é exatamente igual ao adjacente (30 metros)!'
    }
  },
  {
    id: 7,
    serieEstudo: '2º Ano Ensino Médio',
    categoria: 'Leis Trigonométricas & GPS',
    icone: '🛰️',
    titulo: 'Como Satélites de GPS e Navios Fazem Triangulação no Globo',
    fato: 'Quando um triângulo não tem ângulo reto de 90°, entram em cena a Lei dos Senos e a Lei dos Cossenos (a² = b² + c² - 2bc·cos A), que funcionam em qualquer triângulo do universo!',
    usoNoMundoReal: 'O GPS do celular, radares aéreos, drones de mapeamento e antenas localizam você cruzando distâncias e ângulos entre três pontos por triangulação trigonométrica.',
    exemplosReais: [
      'Navegação GPS e aplicativos de corrida: localização exata por triangulação de sinais de satélite',
      'Engenharia de pontes estaiadas: calcular a tensão exata de cabos inclinados em diferentes ângulos',
      'Astronomia: determinar a distância até estrelas próximas usando a órbita da Terra como base'
    ],
    desafioRapido: {
      pergunta: 'Na Lei dos Cossenos (a² = b² + c² - 2bc·cos A), o que acontece quando o ângulo A vale exatamente 90°?',
      opcoes: ['Vira o Teorema de Pitágoras', 'A área vira zero', 'Os lados ficam todos iguais'],
      correta: 0,
      explicacao: 'Como cos(90°) = 0, o termo -2bc·cos(90°) desaparece, deixando exatamente a² = b² + c²!'
    }
  },
  {
    id: 8,
    serieEstudo: '3º Ano Ensino Médio',
    categoria: 'Geometria Analítica & Distâncias',
    icone: '🚀',
    titulo: 'Coordenadas Cartesianas e Mapas Digitais no Mundo Moderno',
    fato: 'A Geometria Analítica une desenho e álgebra usando coordenadas (x, y), permitindo calcular distâncias exatas entre qualquer par de pontos no mapa usando d = √((x₂ - x₁)² + (y₂ - y₁)²).',
    usoNoMundoReal: 'Tudo que se move em telas, mapas de entrega, radares de trânsito e gráficos digitais usa coordenadas cartesianas e cálculos analíticos em tempo real!',
    exemplosReais: [
      'Apps de entrega e mobilidade: calculam distância em linha reta e rotas entre coordenadas GPS',
      'Computação gráfica e IA: animações 3D movem personagens atualizando coordenadas (x, y, z)',
      'Aviação e meteorologia: radares plotam tempestades e aeronaves em planos cartesianos'
    ],
    desafioRapido: {
      pergunta: 'Um drone sai do ponto A(1, 2) e voa em linha reta até o ponto B(4, 6) no mapa cartesiano (em km). Qual distância ele percorreu?',
      opcoes: ['5 km', '7 km', '10 km'],
      correta: 0,
      explicacao: 'Δx = 4 - 1 = 3 e Δy = 6 - 2 = 4. Logo d = √(3² + 4²) = √25 = 5 km!'
    }
  },
  {
    id: 9,
    serieEstudo: '6º Ano Fundamental',
    categoria: 'Frações & Ritmo Musical',
    icone: '🎵',
    titulo: 'Frações Estão por Trás da Culinária e das Batidas Musicais',
    fato: 'Uma fração representa partes iguais de um inteiro. Na música, um compasso 4/4 divide o tempo em semínimas (1/4), colcheias (1/8) e semicolcheias (1/16) — pura matemática rítmica!',
    usoNoMundoReal: 'Receitas adaptadas para mais pessoas, partituras musicais, divisão justa de contas e medições de ferramentas (como chaves de 1/2 ou 3/4 de polegada) dependem de frações.',
    exemplosReais: [
      'Cozinha: dobrar ou reduzir pela metade uma receita usando 3/4 ou 1/2 xícara de medida',
      'Produção musical e DJs: encaixar batidas sincronizando compassos fracionários (BPM)',
      'Oficina e marcenaria: escolher parafusos e canos medidos em frações exatas'
    ],
    desafioRapido: {
      pergunta: 'Uma receita de bolo pede 3/4 de xícara de leite. Se você quiser fazer o dobro dessa receita, de quantas xícaras de leite vai precisar?',
      opcoes: ['1 xícara', '1,5 xícara (1 e 1/2)', '2,5 xícaras'],
      correta: 1,
      explicacao: 'O dobro de 3/4 é 2 × (3/4) = 6/4 = 3/2 = 1,5 xícara (ou 1 xícara e meia)!'
    }
  },
  {
    id: 10,
    serieEstudo: '6º Ano Fundamental',
    categoria: 'Perímetro & Área',
    icone: '🏡',
    titulo: 'Perímetro é o Contorno (Cerca), Área é o Preenchimento (Piso)',
    fato: 'Embora muita gente confunda os dois, perímetro soma apenas o comprimento das bordas externas (medido em m), enquanto área multiplica dimensões para cobrir a superfície interna (em m²).',
    usoNoMundoReal: 'Ao reformar um quarto, você usa o perímetro para comprar rodapés ou fita de LED ao redor da parede, mas usa a área para comprar latas de tinta ou caixas de piso.',
    exemplosReais: [
      'Esportes: calcular quantos metros de linha branca marcam o contorno do campo (perímetro)',
      'Reforma e pintura: saber quantas latas de tinta cobrem a parede inteira (área em m²)',
      'Agricultura: cercar um pasto retangular gastando a menor quantidade possível de arame'
    ],
    desafioRapido: {
      pergunta: 'Um terreno retangular mede 12 metros de comprimento por 8 metros de largura. Quantos metros de tela são necessários para cercar toda a volta dele uma única vez?',
      opcoes: ['20 metros', '40 metros', '96 metros'],
      correta: 1,
      explicacao: 'O contorno é o perímetro: 12 + 8 + 12 + 8 = 40 metros (96 m² seria a área interna)!'
    }
  },
  {
    id: 11,
    serieEstudo: '6º Ano Fundamental',
    categoria: 'Proporção & Regra de Três',
    icone: '📶',
    titulo: 'Grandezas Proporcionais no Tempo de Download e Viagens',
    fato: 'Quando duas grandezas crescem no mesmo ritmo (se uma dobra, a outra também dobra), dizemos que são diretamente proporcionais — uma regra simples resolve milhares de problemas!',
    usoNoMundoReal: 'Prever quanto tempo um arquivo vai demorar para baixar, calcular combustível para uma viagem ou ajustar porções em um churrasco usam raciocínio proporcional direto.',
    exemplosReais: [
      'Internet e tecnologia: estimar o tempo restante de download conforme a taxa de MB/s',
      'Viagens de carro: calcular quantos litros de gasolina serão gastos em 400 km',
      'Economia doméstica: comparar se o pacote maior no mercado realmente sai mais barato por kg'
    ],
    desafioRapido: {
      pergunta: 'Em uma conexão estável, um jogo baixa 60 MB a cada 4 segundos. Nesse mesmo ritmo, quantos segundos levará para baixar 300 MB?',
      opcoes: ['16 segundos', '20 segundos', '24 segundos'],
      correta: 1,
      explicacao: '300 MB é 5 vezes maior que 60 MB (300 ÷ 60 = 5). Logo, leva 5 × 4 = 20 segundos!'
    }
  },
  {
    id: 12,
    serieEstudo: '7º Ano Fundamental',
    categoria: 'Números Inteiros & Altitudes',
    icone: '🏔️',
    titulo: 'Números Negativos: De Submarinos e Temperaturas a Saldo Bancário',
    fato: 'Na reta numérica, o zero funciona como marco de referência: tudo abaixo dele é negativo (-), permitindo somar e subtrair variações térmicas, profundidades oceânicas e dívidas.',
    usoNoMundoReal: 'Previsões do tempo em países frios, mergulhadores medindo profundidade abaixo do nível do mar (-30 m), andares de subsolo em shoppings e extratos financeiros operam com inteiros.',
    exemplosReais: [
      'Clima e meteorologia: calcular a variação de temperatura entre a madrugada (-4°C) e a tarde',
      'Edifícios e elevadores: deslocar-se do 2º subsolo (-2) até o 10º andar (+10) percorrendo 12 níveis',
      'Finanças pessoais: controlar entradas positivas e saídas negativas no orçamento mensal'
    ],
    desafioRapido: {
      pergunta: 'Numa cidade serrana, o termômetro marcava -4 °C às 5h da manhã. Até o meio-dia, a temperatura subiu 11 °C. Quanto o termômetro passou a marcar?',
      opcoes: ['+7 °C', '+15 °C', '-7 °C'],
      correta: 0,
      explicacao: 'Partindo de -4 e somando +11 na reta numérica: -4 + 11 = +7 °C!'
    }
  },
  {
    id: 13,
    serieEstudo: '7º Ano Fundamental',
    categoria: 'Ângulos & Triângulos',
    icone: '🔺',
    titulo: 'O Segredo dos 180° Que Garante Estabilidade a Pontes e Telhados',
    fato: 'Por mais esticado ou inclinado que um triângulo seja, a soma dos seus três ângulos internos é invariavelmente 180° — além disso, ele é o único polígono que não deforma sob pressão!',
    usoNoMundoReal: 'Por ser rígido e ter ângulos previsíveis, o triângulo forma treliças em torres de energia, pontes metálicas, estruturas de telhados e quadros de bicicletas.',
    exemplosReais: [
      'Engenharia civil: pontes treliçadas distribuem toneladas de peso usando dezenas de triângulos',
      'Design gráfico e 3D: personagens de videogames são modelados por milhares de triângulos (malhas)',
      'Esportes: quadros de bicicleta unem dois triângulos para aguentar impacto sem entortar'
    ],
    desafioRapido: {
      pergunta: 'Em uma treliça metálica triangular, dois ângulos internos medem 55° e 65°. Qual deve ser a medida exata do terceiro ângulo?',
      opcoes: ['50°', '60°', '70°'],
      correta: 1,
      explicacao: 'A soma dos três ângulos é 180°. Como 55° + 65° = 120°, falta 180° - 120° = 60°!'
    }
  },
  {
    id: 14,
    serieEstudo: '7º Ano Fundamental',
    categoria: 'Escalas & Mapas',
    icone: '🗺️',
    titulo: 'Como um Mapa de Bolso Consegue Representar um País Inteiro',
    fato: 'Uma escala como 1 : 100.000 significa que cada 1 cm desenhado no papel equivale a 100.000 cm (ou seja, 1 quilômetro!) no mundo real, preservando todas as proporções geográficas.',
    usoNoMundoReal: 'Engenheiros civis usam plantas em escala 1:50 ou 1:100 antes de erguer um prédio; colecionadores montam miniaturas 1:18; e aplicativos de mapa ajustam escalas dinamicamente ao dar zoom.',
    exemplosReais: [
      'Plantas arquitetônicas: conferir no papel se uma cama ou sofá cabe no quarto antes da compra',
      'Cartografia e turismo: calcular quantos quilômetros separam duas cidades em um guia impresso',
      'Modelismo e impressão 3D: imprimir réplicas fiéis reduzindo cada medida pela mesma razão'
    ],
    desafioRapido: {
      pergunta: 'Em um mapa com escala onde 1 cm representa 1 km real, duas estações de metrô estão separadas por 7,5 cm na régua. Qual é a distância real entre elas?',
      opcoes: ['7,5 km', '75 km', '750 metros'],
      correta: 0,
      explicacao: 'Se cada 1 cm vale 1 km, multiplicamos 7,5 × 1 km = 7,5 km em linha reta!'
    }
  },
  {
    id: 15,
    serieEstudo: '8º Ano Fundamental',
    categoria: 'Polígonos & Natureza',
    icone: '🐝',
    titulo: 'Por Que as Abelhas Escolheram o Hexágono para os Favos de Mel?',
    fato: 'Entre todas as formas que se encaixam perfeitamente lado a lado sem sobrar espaços vazios (triângulo, quadrado e hexágono), o hexágono regular (ângulos de 120°) guarda mais área gastando menos cera!',
    usoNoMundoReal: 'Inspirados na eficiência geométrica dos favos de mel, engenheiros criam painéis em formato "honeycomb" (colmeia) usados em asas de aviões, foguetes e embalagens ultrarresistentes.',
    exemplosReais: [
      'Indústria aeroespacial: estruturas internas em colmeia tornam aviões mais leves e rígidos',
      'Arquitetura e pisos: ladrilhos hexagonais cobrem superfícies inteiras sem desperdício de recorte',
      'Óptica espacial: o telescópio James Webb usa 18 espelhos hexagonais dourados encaixados juntos'
    ],
    desafioRapido: {
      pergunta: 'Qual é a medida de cada ângulo interno de um hexágono regular (polígono de 6 lados iguais)?',
      opcoes: ['90°', '108°', '120°'],
      correta: 2,
      explicacao: 'A soma dos ângulos internos é (6 - 2) × 180° = 720°. Dividindo pelos 6 vértices: 720° ÷ 6 = 120°!'
    }
  },
  {
    id: 16,
    serieEstudo: '8º Ano Fundamental',
    categoria: 'Equações & Sistemas',
    icone: '⚖️',
    titulo: 'A Lógica da Balança: Descobrindo Valores Ocultos com Equações',
    fato: 'Uma equação funciona como uma balança em equilíbrio perfeito: tudo que você soma, subtrai, multiplica ou divide de um lado precisa repetir do outro para revelar o valor desconhecido (x).',
    usoNoMundoReal: 'De calcular quantas parcelas faltam até planejar quantos ingredientes comprar para um evento com orçamento limitado, equações e sistemas organizam decisões financeiras e técnicas.',
    exemplosReais: [
      'Lazer em grupo: descobrir o preço unitário de ingressos quando o combo vem com lanche incluído',
      'Nutrição e química: balancear misturas para atingir exatamente a quantidade ideal de nutrientes',
      'Programação: resolver restrições de orçamento, tempo ou espaço dentro de algoritmos'
    ],
    desafioRapido: {
      pergunta: 'Dois ingressos de cinema mais um combo de pipoca custam juntos R$ 55,00. Sabendo que o combo de pipoca custa R$ 15,00, quanto custa cada ingresso?',
      opcoes: ['R$ 18,00', 'R$ 20,00', 'R$ 25,00'],
      correta: 1,
      explicacao: 'Montando a equação: 2x + 15 = 55 → 2x = 40 → x = R$ 20,00 por ingresso!'
    }
  },
  {
    id: 17,
    serieEstudo: '8º Ano Fundamental',
    categoria: 'Potências & Notação Científica',
    icone: '🔭',
    titulo: 'Notação Científica: Escrevendo Galáxias e Átomos Sem Zeros Infinitos',
    fato: 'Para não escrever dezenas de zeros ao medir distâncias espaciais ou o tamanho de células e vírus, a ciência usa potências de 10 na forma a × 10ⁿ (com 1 ≤ a < 10).',
    usoNoMundoReal: 'Astrônomos, médicos, químicos e cientistas da computação (megabytes, gigabytes, terabytes e nanômetros de processadores) dependem diariamente de potências de base 10.',
    exemplosReais: [
      'Astronomia: expressar os cerca de 150 milhões de quilômetros entre a Terra e o Sol',
      'Hardware de celular: chips fabricados na escala de 3 nanômetros (3 × 10⁻⁹ metros)',
      'Biologia: contar bilhões de bactérias ou medir o tamanho microscópico de uma hemácia'
    ],
    desafioRapido: {
      pergunta: 'A distância média entre a Terra e o Sol é de aproximadamente 150.000.000 km. Como escrevemos esse valor corretamente em notação científica?',
      opcoes: ['15 × 10⁷ km', '1,5 × 10⁸ km', '0,15 × 10⁹ km'],
      correta: 1,
      explicacao: 'A mantissa precisa ficar entre 1 e 10. Deslocando a vírgula 8 casas à esquerda obtemos 1,5 × 10⁸ km!'
    }
  },
  {
    id: 18,
    serieEstudo: '9º Ano Fundamental',
    categoria: 'Equação do 2º Grau & Áreas',
    icone: '🌿',
    titulo: 'Raízes Quadradas e Equações de 2º Grau no Planejamento de Espaços',
    fato: 'Sempre que multiplicamos duas dimensões desconhecidas (como largura × comprimento), surge uma equação do 2º grau (ax² + bx + c = 0), resolvida com segurança por fatoração ou Bhaskara.',
    usoNoMundoReal: 'Arquitetos e paisagistas resolvem equações quadráticas para definir bordas uniformes de jardins, molduras de quadros, dimensões de piscinas e otimização de caixas sem tampas.',
    exemplosReais: [
      'Paisagismo: descobrir o lado exato de um canteiro quadrado a partir da área disponível',
      'Design de embalagens: cortar quadrados nos cantos de uma folha para dobrar uma caixa de volume alvo',
      'Engenharia: calcular tempo de queda de objetos ou frenagem segura de veículos'
    ],
    desafioRapido: {
      pergunta: 'Um canteiro comunitário quadrado possui área total de 144 m². Quanto mede cada um dos seus lados?',
      opcoes: ['11 metros', '12 metros', '14 metros'],
      correta: 1,
      explicacao: 'Como a área do quadrado é L² = 144, extraímos a raiz quadrada positiva: L = √144 = 12 metros!'
    }
  },
  {
    id: 19,
    serieEstudo: '9º Ano Fundamental',
    categoria: 'Relações Métricas no Triângulo',
    icone: '⛺',
    titulo: 'A Altura da Tenda: O Segredo das Projeções h² = m · n',
    fato: 'Em todo triângulo retângulo, ao traçar a altura relativa à hipotenusa, ela se divide em dois segmentos (m e n) ligados pela elegante relação geométrica h² = m · n.',
    usoNoMundoReal: 'Essa relação auxilia engenheiros e carpinteiros a calcular a altura de vigas centrais de telhados assimétricos, pilares de pontes e escoras em construções inclinadas.',
    exemplosReais: [
      'Carpintaria e telhados: determinar a altura exata da cumeeira quando as duas águas têm comprimentos distintos',
      'Design de barracas e tendas: calcular o comprimento ideal do mastro central de sustentação',
      'Desenho técnico: encontrar médias geométricas graficamente sem usar calculadora'
    ],
    desafioRapido: {
      pergunta: 'A altura de uma cobertura forma dois segmentos na base medindo m = 4 m e n = 9 m. Usando h² = m · n, qual é a altura h?',
      opcoes: ['6 metros', '6,5 metros', '13 metros'],
      correta: 0,
      explicacao: 'Aplicando a relação métrica: h² = 4 × 9 = 36 → h = √36 = 6 metros!'
    }
  },
  {
    id: 20,
    serieEstudo: '9º Ano Fundamental',
    categoria: 'Probabilidade & Estatística',
    icone: '🎲',
    titulo: 'Probabilidade: Como Prever Chances em Jogos, Clima e Medicina',
    fato: 'A probabilidade mede a chance de um evento acontecer dividindo o número de resultados favoráveis pelo total de resultados possíveis — variando sempre entre 0 (impossível) e 1 (ou 100%).',
    usoNoMundoReal: 'Previsões de chuva ("70% de chance"), sorteios, estatísticas esportivas, segurança digital e eficácia de vacinas utilizam cálculos probabilísticos para tomar decisões inteligentes.',
    exemplosReais: [
      'Jogos de tabuleiro e cartas: avaliar se vale a pena arriscar uma jogada pelas chances reais',
      'Meteorologia: decidir se leva guarda-chuva entendendo o significado real de 80% de probabilidade',
      'Seguros e saúde: analisar fatores de risco e prevenir acidentes com base em dados'
    ],
    desafioRapido: {
      pergunta: 'Ao lançar um dado comum honesto de 6 faces (numeradas de 1 a 6), qual é a probabilidade de sair um número par?',
      opcoes: ['25%', '50%', '75%'],
      correta: 1,
      explicacao: 'Há 3 números pares (2, 4, 6) entre 6 resultados possíveis: 3/6 = 1/2 = 50%!'
    }
  },
  {
    id: 21,
    serieEstudo: '1º Ano Ensino Médio',
    categoria: 'Função Afim (1º Grau)',
    icone: '🚕',
    titulo: 'Função do 1º Grau: Tarifa Fixa Mais Preço por Quilômetro',
    fato: 'Toda situação que combina um valor inicial fixo (b) com uma taxa constante por unidade (a) segue a reta f(x) = a·x + b, onde "a" controla a inclinação de subida ou descida.',
    usoNoMundoReal: 'Corridas de aplicativo, contas de água e luz, salários com comissão por vendas e recarga de baterias em taxa constante são modelados diretamente por funções afins.',
    exemplosReais: [
      'Apps de transporte: valor inicial (bandeirada) somado ao preço cobrado por cada quilômetro',
      'Energia elétrica: taxa mínima da rede somada ao consumo medido em kWh',
      'Vendas e empreendedorismo: salário fixo somado à comissão por cada produto vendido'
    ],
    desafioRapido: {
      pergunta: 'Um serviço de entrega cobra R$ 5,00 de taxa fixa mais R$ 2,00 por quilômetro rodado: P(x) = 2x + 5. Qual o valor total de uma entrega de 8 km?',
      opcoes: ['R$ 15,00', 'R$ 21,00', 'R$ 26,00'],
      correta: 1,
      explicacao: 'Substituindo x = 8 na função: P(8) = 2 × 8 + 5 = 16 + 5 = R$ 21,00!'
    }
  },
  {
    id: 22,
    serieEstudo: '1º Ano Ensino Médio',
    categoria: 'Função Quadrática & Parábolas',
    icone: '🏀',
    titulo: 'A Parábola no Basquete, Fontes de Água e Antenas Parabólicas',
    fato: 'Sempre que lançamos algo no ar sob ação da gravidade, o movimento desenha uma parábola f(x) = ax² + bx + c. O ponto mais alto (vértice) ocorre em x_v = -b / (2a).',
    usoNoMundoReal: 'Engenheiros calculam arcos de pontes, o formato de espelhos de faróis automotivos e antenas parabólicas (que concentram todos os sinais no foco) usando propriedades da parábola.',
    exemplosReais: [
      'Esportes olímpicos: descobrir o instante exato em que uma bola ou dardo atinge a altura máxima',
      'Telecomunicações: antenas parabólicas captam sinais fracos e os refletem para um único receptor',
      'Economia e negócios: encontrar o preço ideal de um ingresso para atingir o lucro máximo'
    ],
    desafioRapido: {
      pergunta: 'A altura de um pequeno foguete de garrafa PET segue h(t) = -t² + 6t (t em segundos). Em qual segundo t ele atinge a altura máxima?',
      opcoes: ['2 segundos', '3 segundos', '6 segundos'],
      correta: 1,
      explicacao: 'Usando o vértice t_v = -b / (2a): t_v = -6 / (2 · (-1)) = -6 / (-2) = 3 segundos!'
    }
  },
  {
    id: 23,
    serieEstudo: '1º Ano Ensino Médio',
    categoria: 'Função Exponencial',
    icone: '🦠',
    titulo: 'Crescimento Exponencial: Por Que Pequenas Dobras Viram Gigantes',
    fato: 'Na função exponencial f(x) = k · aˣ, a variável está no expoente. Diferente da soma constante, multiplicar repetidamente pelo mesmo fator faz o valor explodir em poucos passos!',
    usoNoMundoReal: 'Juros compostos em investimentos, multiplicação celular, viralização de vídeos em redes sociais e datação por Carbono-14 em fósseis seguem curvas exponenciais.',
    exemplosReais: [
      'Educação financeira: juros compostos rendem "juros sobre juros" ao longo dos anos',
      'Biologia e saúde: crescimento de colônias de microrganismos que se dividem em intervalos fixos',
      'Redes sociais: um conteúdo compartilhado por 3 pessoas, que compartilham para mais 3, se espalha rápido'
    ],
    desafioRapido: {
      pergunta: 'Uma cultura começa com 100 bactérias benéficas e dobra de quantidade a cada hora: Q(t) = 100 · 2ᵗ. Quantas bactérias existirão após 4 horas?',
      opcoes: ['800 bactérias', '1.600 bactérias', '3.200 bactérias'],
      correta: 1,
      explicacao: 'Calculamos Q(4) = 100 × 2⁴ = 100 × 16 = 1.600 bactérias!'
    }
  },
  {
    id: 24,
    serieEstudo: '1º Ano Ensino Médio',
    categoria: 'Ângulos Notáveis (30°, 45°, 60°)',
    icone: '♿',
    titulo: 'Ângulos Notáveis na Arquitetura Segura de Rampas e Telhados',
    fato: 'Os ângulos 30°, 45° e 60° aparecem tanto na natureza e engenharia que seus senos, cossenos e tangentes são chamados de notáveis — com eles, você resolve medidas complexas de cabeça!',
    usoNoMundoReal: 'Projetar rampas acessíveis, inclinar painéis solares para captar o máximo de luz do Sol ao longo do ano e posicionar escadas com segurança dependem desses ângulos-chave.',
    exemplosReais: [
      'Energia solar: inclinar placas fotovoltaicas segundo a latitude local usando seno e cosseno',
      'Segurança do trabalho: posicionar escadas portáteis no ângulo seguro para não escorregar',
      'Carpintaria: cortar caibros de madeira em 30° ou 45° para encaixes perfeitos'
    ],
    desafioRapido: {
      pergunta: 'Uma esteira rolante tem 12 metros de comprimento e sobe inclinada a 30° em relação ao piso. Sabendo que sen(30°) = 0,5, qual altura ela vence?',
      opcoes: ['4 metros', '6 metros', '8,5 metros'],
      correta: 1,
      explicacao: 'Como sen(30°) = altura / hipotenusa → 0,5 = h / 12 → h = 12 × 0,5 = 6 metros!'
    }
  },
  {
    id: 25,
    serieEstudo: '2º Ano Ensino Médio',
    categoria: 'Ciclo Trigonométrico & Ondas',
    icone: '🌊',
    titulo: 'Funções Seno e Cosseno: Marés, Batimentos Cardíacos e Wi-Fi',
    fato: 'Tudo o que se repete em ciclos regulares no universo — das horas no relógio às ondas do mar e sinais de rádio — é descrito pelo ciclo trigonométrico (0° a 360° ou 0 a 2π radianos).',
    usoNoMundoReal: 'Engenheiros elétricos analisam corrente alternada (60 Hz nas tomadas), oceanógrafos preveem tábuas de marés para navios e médicos leem eletrocardiogramas como curvas periódicas.',
    exemplosReais: [
      'Energia elétrica: a tomada da sua casa oscila em uma onda senoidal 60 vezes por segundo',
      'Oceanografia e surfe: prever horários exatos de maré alta e maré baixa ao longo do mês',
      'Telecomunicações: sinais 4G, 5G e Wi-Fi viajam modulados em ondas trigonométricas'
    ],
    desafioRapido: {
      pergunta: 'No mostrador circular de um relógio analógico (360° no total), qual é o menor ângulo formado entre os ponteiros das horas e dos minutos às 3h em ponto?',
      opcoes: ['60°', '90°', '120°'],
      correta: 1,
      explicacao: 'Das 12h às 3h são 3 de 12 divisões (1/4 do círculo): 360° ÷ 4 = 90° (ou π/2 radianos)!'
    }
  },
  {
    id: 26,
    serieEstudo: '2º Ano Ensino Médio',
    categoria: 'Geometria Espacial (Cones & Cilindros)',
    icone: '🍦',
    titulo: 'A Surpreendente Relação 1 para 3 Entre Cones e Cilindros',
    fato: 'Se você construir um cone e um cilindro com exatamente a mesma base circular e a mesma altura, precisará encher o cone exatas 3 vezes com água para completar o cilindro!',
    usoNoMundoReal: 'Fábricas de sorvetes, copos descartáveis, silos agrícolas de grãos e funis industriais aplicam V_cone = (1/3)·π·r²·h para economizar material ou estimar estoques.',
    exemplosReais: [
      'Agronegócio: calcular quantas toneladas de soja cabem no teto cônico e no corpo cilíndrico de um silo',
      'Gastronomia: comparar quanto sorvete cabe em uma casquinha cônica versus um copo cilíndrico',
      'Vulcanologia e mineração: estimar o volume de montes cônicos de areia, brita ou minério'
    ],
    desafioRapido: {
      pergunta: 'Um copo cilíndrico possui exatamente a mesma base e a mesma altura de um cone de papel. O volume do cone corresponde a que fração do volume do cilindro?',
      opcoes: ['1/2 (metade)', '1/3 (um terço)', '1/4 (um quarto)'],
      correta: 1,
      explicacao: 'Pela fórmula de sólidos pontiagudos (cones e pirâmides), V_cone = (Área da base × altura) / 3, exatamente 1/3 do cilindro!'
    }
  },
  {
    id: 27,
    serieEstudo: '2º Ano Ensino Médio',
    categoria: 'Análise Combinatória & Senhas',
    icone: '🔐',
    titulo: 'Princípio Multiplicativo: Por Que Senhas Longas São Quase Invioláveis',
    fato: 'Quando uma escolha tem várias etapas independentes, multiplicamos as possibilidades de cada posição — é por isso que adicionar apenas 1 ou 2 caracteres extras multiplica a segurança de uma senha!',
    usoNoMundoReal: 'Criptografia bancária, combinações de placas de veículos (padrão Mercosul), sorteios de loterias e planejamento de cardápios combinados usam análise combinatória.',
    exemplosReais: [
      'Segurança digital: entender por que senhas de 8 caracteres variados levam anos para serem quebradas',
      'Trânsito e logística: saber quantos milhões de placas únicas o padrão de letras e números permite',
      'Genética: calcular combinações possíveis de características herdadas em cruzamentos'
    ],
    desafioRapido: {
      pergunta: 'Quantos códigos numéricos diferentes de 3 dígitos podem ser criados usando apenas os algarismos 1, 2, 3 e 4, podendo repetir os números?',
      opcoes: ['12 códigos', '24 códigos', '64 códigos'],
      correta: 2,
      explicacao: 'Cada uma das 3 posições tem 4 opções disponíveis: 4 × 4 × 4 = 4³ = 64 códigos diferentes!'
    }
  },
  {
    id: 28,
    serieEstudo: '3º Ano Ensino Médio',
    categoria: 'Equação da Circunferência & Radares',
    icone: '📡',
    titulo: 'A Equação da Circunferência em Torres de Celular e Áreas de Cobertura',
    fato: 'Todos os pontos à mesma distância R de uma antena central C(a, b) obedecem à equação (x - a)² + (y - b)² = R², definindo exatamente a fronteira circular de alcance do sinal.',
    usoNoMundoReal: 'Operadoras de telefonia posicionam antenas 5G evitando áreas de sombra, radares marítimos monitoram zonas de proteção e jogos calculam raios de alcance com essa equação.',
    exemplosReais: [
      'Telecomunicações: mapear onde instalar novas torres para cobrir bairros inteiros sem falhas',
      'Controle aéreo: verificar instantaneamente se um avião entrou no raio de 50 km do aeroporto',
      'Robótica: programar sensores de colisão ao redor de robôs autônomos e aspiradores inteligentes'
    ],
    desafioRapido: {
      pergunta: 'Uma torre Wi-Fi está na origem (0, 0) e cobre uma área descrita pela equação x² + y² = 100 (em metros). Qual é o raio máximo de alcance dessa torre?',
      opcoes: ['10 metros', '50 metros', '100 metros'],
      correta: 0,
      explicacao: 'Na equação x² + y² = R², temos R² = 100. Extraindo a raiz quadrada, o raio de alcance é R = √100 = 10 metros!'
    }
  },
  {
    id: 29,
    serieEstudo: '3º Ano Ensino Médio',
    categoria: 'Taxas de Variação & Velocidade',
    icone: '⚡',
    titulo: 'Coeficiente Angular (Δy/Δx): Medindo a Rapidez de Qualquer Mudança',
    fato: 'A inclinação de uma reta (m = Δy / Δx) revela o quanto uma grandeza muda em relação à outra — na física é a velocidade média; na economia, o ritmo de crescimento ou queda!',
    usoNoMundoReal: 'Radares de rodovias comparam distância e tempo para calcular velocidade média, cientistas analisam taxas de aquecimento global e aplicativos medem o ritmo (pace) de corredores.',
    exemplosReais: [
      'Mobilidade e trânsito: calcular velocidade média em trechos monitorados de rodovias',
      'Saúde e treino: acompanhar gráficos de queima calórica por minuto ou ganho de desempenho',
      'Mercado e dados: interpretar rapidamente se um gráfico de vendas acelera ou desacelera'
    ],
    desafioRapido: {
      pergunta: 'Um ônibus passa pelo marco km 40 de uma rodovia às 8h00 e alcança o marco km 220 às 10h00. Qual foi a sua taxa média de variação (velocidade média)?',
      opcoes: ['70 km/h', '90 km/h', '110 km/h'],
      correta: 1,
      explicacao: 'Δd = 220 - 40 = 180 km e Δt = 10 - 8 = 2 horas. Logo, m = 180 / 2 = 90 km/h!'
    }
  },
  {
    id: 30,
    serieEstudo: '3º Ano Ensino Médio',
    categoria: 'Ponto Médio & Localização Central',
    icone: '📍',
    titulo: 'Encontrando o Ponto de Encontro Exato Entre Duas Coordenadas',
    fato: 'Para achar o ponto exatamente na metade do caminho entre A(x₁, y₁) e B(x₂, y₂), basta calcular a média aritmética das coordenadas: M = ((x₁ + x₂)/2, (y₁ + y₂)/2).',
    usoNoMundoReal: 'Centros de distribuição entre duas cidades, pontos de encontro justos entre amigos em mapas, roteadores centrais em escritórios e balanceamento de peças usam o ponto médio.',
    exemplosReais: [
      'Logística urbana: escolher um ponto de transferência exatamente entre dois bairros atendidos',
      'Design e UI: centralizar elementos gráficos e calcular centros de rotação com precisão',
      'Geografia e engenharia: localizar o ponto central de estruturas simétricas e pontes'
    ],
    desafioRapido: {
      pergunta: 'Um ponto de recarga para drones deve ser instalado exatamente no meio do trajeto em linha reta entre a base A(2, 4) e a base B(8, 10). Quais são as coordenadas dele?',
      opcoes: ['(4, 6)', '(5, 7)', '(6, 6)'],
      correta: 1,
      explicacao: 'Calculando a média: x_M = (2 + 8)/2 = 5 e y_M = (4 + 10)/2 = 7. Ponto médio = (5, 7)!'
    }
  }
];

function getCurrentDateKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getInitialDailyTipIndex(date: Date = new Date()): number {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return dayOfYear % GEOMETRIC_TIPS.length;
}

const AUTO_ADVANCE_SECONDS = 5;

function shuffleDailyChallenge(desafio: DailyChallenge): DailyChallenge {
  const indices = desafio.opcoes.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return {
    ...desafio,
    opcoes: indices.map((i) => desafio.opcoes[i]),
    correta: indices.indexOf(desafio.correta)
  };
}

export const MathTipOfTheDay: React.FC<MathTipOfTheDayProps> = ({ onNavigateCurriculo }) => {
  const [currentDateKey, setCurrentDateKey] = useState<string>(() => getCurrentDateKey());
  const [currentTipIndex, setCurrentTipIndex] = useState<number>(() => getInitialDailyTipIndex());
  const [shuffleKey, setShuffleKey] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [autoAdvanceSeconds, setAutoAdvanceSeconds] = useState<number | null>(null);
  const [celebrationTrigger, setCelebrationTrigger] = useState<number>(0);

  const tip = useMemo(() => GEOMETRIC_TIPS[currentTipIndex] || GEOMETRIC_TIPS[0], [currentTipIndex]);

  const shuffledChallenge = useMemo(
    () => shuffleDailyChallenge(tip.desafioRapido),
    [tip, shuffleKey]
  );

  // Atualiza automaticamente a dica sempre que o dia do calendário virar
  useEffect(() => {
    const checkDateChange = () => {
      const now = new Date();
      const todayKey = getCurrentDateKey(now);
      if (todayKey !== currentDateKey) {
        setCurrentDateKey(todayKey);
        setCurrentTipIndex(getInitialDailyTipIndex(now));
        setSelectedOption(null);
        setAutoAdvanceSeconds(null);
        setShuffleKey((prev) => prev + 1);
      }
    };

    const intervalId = window.setInterval(checkDateChange, 60_000);
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        checkDateChange();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [currentDateKey]);

  const handleNextTip = useCallback(() => {
    setAutoAdvanceSeconds(null);
    setIsAnimating(true);
    setSelectedOption(null);
    window.setTimeout(() => {
      setCurrentTipIndex((prev) => (prev + 1) % GEOMETRIC_TIPS.length);
      setShuffleKey((prev) => prev + 1);
      setIsAnimating(false);
    }, 150);
  }, []);

  // Contagem regressiva de 5 segundos para avançar automaticamente após concluir o desafio
  useEffect(() => {
    if (autoAdvanceSeconds === null) return;

    if (autoAdvanceSeconds <= 0) {
      handleNextTip();
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setAutoAdvanceSeconds((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [autoAdvanceSeconds, handleNextTip]);

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    setAutoAdvanceSeconds(AUTO_ADVANCE_SECONDS);
    if (idx === shuffledChallenge.correta) {
      setCelebrationTrigger(Date.now());
    }
  };

  const isAnswered = selectedOption !== null;
  const isCorrect = selectedOption === shuffledChallenge.correta;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#071329]/95 border border-cyan-400/40 p-5 sm:p-7 shadow-[0_0_30px_rgba(0,240,255,0.14)] backdrop-blur-xl">
      <MathParticleCelebration trigger={celebrationTrigger} />

      {/* Cabeçalho do Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-500/20 pb-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shrink-0">
            <Lightbulb className="w-6 h-6 text-yellow-300" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono tabular-nums">
              <span className="text-cyan-300 font-bold">
                Dica #{tip.id} de {GEOMETRIC_TIPS.length}
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-amber-300 font-bold inline-flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5" /> Estudado no: {tip.serieEstudo}
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">{tip.categoria}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2 font-['Oxanium',sans-serif]">
              <span>Dica Matemática do Dia</span>
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            </h3>
          </div>
        </div>

        {/* Botão Interativo para alternar dica */}
        <button
          type="button"
          onClick={handleNextTip}
          className="self-start sm:self-auto bg-cyan-950/70 hover:bg-cyan-900/90 text-cyan-200 border border-cyan-400/50 hover:border-cyan-300 px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer group shrink-0"
          title="Explorar outra curiosidade, aplicação real e desafio"
        >
          <RefreshCw className={`w-3.5 h-3.5 transition-transform duration-300 ${isAnimating ? 'rotate-180' : 'group-hover:rotate-45'}`} />
          <span>Sortear Outra Dica</span>
        </button>
      </div>

      {/* Conteúdo da Dica + Uso no Mundo + Desafio Rápido */}
      <div className={`mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5 transition-opacity duration-150 ${isAnimating ? 'opacity-40' : 'opacity-100'}`}>
        {/* Coluna 1: Curiosidade + Onde Usamos no Mundo Real */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-3xl sm:text-4xl shrink-0 select-none">
              {tip.icone}
            </span>
            <div className="space-y-1.5">
              <h4 className="text-base sm:text-lg font-black text-amber-300 font-['Oxanium',sans-serif]">
                {tip.titulo}
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {tip.fato}
              </p>
            </div>
          </div>

          <div className="bg-[#050c1d]/90 border border-cyan-500/25 rounded-2xl p-4 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-black text-cyan-300 uppercase tracking-wider font-['Oxanium',sans-serif]">
              <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Onde Usamos Isso no Mundo Real ({tip.serieEstudo}):</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {tip.usoNoMundoReal}
            </p>
            <ul className="space-y-1.5 pt-1 text-xs text-slate-300">
              {tip.exemplosReais.map((ex, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold shrink-0">▸</span>
                  <span>{ex}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Coluna 2: Desafio Rápido Interativo */}
        <div className="lg:col-span-5 bg-[#050b19]/95 border border-amber-400/35 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3.5">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-amber-300 uppercase tracking-wider font-['Oxanium',sans-serif]">
                <Zap className="w-4 h-4 text-amber-400" />
                Desafio Rápido do Dia
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {tip.serieEstudo}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-white font-semibold leading-relaxed">
              {shuffledChallenge.pergunta}
            </p>

            <div className="space-y-2 pt-1">
              {shuffledChallenge.opcoes.map((opcao, idx) => {
                const isThisSelected = selectedOption === idx;
                const isThisCorrect = idx === shuffledChallenge.correta;
                const letters = ['A', 'B', 'C'];

                let btnStyle =
                  'bg-[#0a1428] border-slate-700/80 text-slate-200 hover:border-cyan-400/70 hover:bg-[#0f1d38]';

                if (isAnswered) {
                  if (isThisCorrect) {
                    btnStyle = 'bg-emerald-950/70 border-emerald-400 text-emerald-100 font-bold';
                  } else if (isThisSelected) {
                    btnStyle = 'bg-rose-950/70 border-rose-500 text-rose-100';
                  } else {
                    btnStyle = 'bg-[#081021]/60 border-slate-800 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between gap-2 cursor-pointer disabled:cursor-default ${btnStyle}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded bg-slate-800 text-slate-200 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                        {letters[idx]}
                      </span>
                      <span>{opcao}</span>
                    </div>
                    {isAnswered && isThisCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                    {isAnswered && isThisSelected && !isThisCorrect && (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {isAnswered ? (
            <div className="space-y-2.5">
              <div
                className={`p-3 rounded-xl border text-xs leading-relaxed space-y-1 ${
                  isCorrect
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100'
                    : 'bg-rose-950/40 border-rose-500/40 text-rose-100'
                }`}
              >
                <strong className="block font-bold">
                  {isCorrect ? 'Acertou! Excelente raciocínio!' : 'Quase lá! Veja como funciona:'}
                </strong>
                <p className="text-slate-200">{shuffledChallenge.explicacao}</p>
              </div>

              {/* Barra discreta de avanço automático de 5 segundos com botão para pular */}
              {autoAdvanceSeconds !== null && (
                <div className="rounded-xl bg-[#081329]/80 border border-slate-700/60 px-3 py-2 space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="text-slate-300 font-mono tabular-nums">
                      Próxima dica em <strong className="text-amber-300">{autoAdvanceSeconds}s</strong>...
                    </span>
                    <button
                      type="button"
                      onClick={handleNextTip}
                      className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 font-bold transition cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <span>Próxima dica agora</span>
                      <SkipForward className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="w-full h-1 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-amber-400 transition-all duration-1000 ease-linear"
                      style={{
                        width: `${Math.max(0, (autoAdvanceSeconds / AUTO_ADVANCE_SECONDS) * 100)}%`
                      }}
                    />
                  </div>
                </div>
              )}

              {onNavigateCurriculo && (
                <button
                  type="button"
                  onClick={() => {
                    setAutoAdvanceSeconds(null);
                    onNavigateCurriculo();
                  }}
                  className="w-full py-2 px-3.5 rounded-xl bg-cyan-950/25 hover:bg-cyan-900/40 border border-cyan-400/25 hover:border-cyan-300/50 text-cyan-200/85 hover:text-cyan-100 text-xs font-medium transition flex items-center justify-between gap-2 cursor-pointer group"
                >
                  <span className="truncate">Quer praticar mais na sua série? Ir para Currículo em Ação</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-300/80 group-hover:translate-x-0.5 transition-transform shrink-0" />
                </button>
              )}
            </div>
          ) : (
            <p className="text-[11px] text-slate-400 font-mono">
              Escolha uma alternativa acima para testar seu raciocínio na hora.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
