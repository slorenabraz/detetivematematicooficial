import { Question, QuestionModule, QuestionOverride } from '../types';
import { Storage } from '../utils/storage';

// Helper to shuffle an array
export function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ----------------------------------------------------------------------
// BANCO MODO OFICIAL - 4 ETAPAS (OBJETIVO INVERTIDO: IDENTIFICAR A INCORRETA)
// ----------------------------------------------------------------------

export const poolEtapa1Pitagoras: Question[] = [
  {
    id: 'pit-1',
    etapa: 1,
    temaKey: 'pitagoras',
    temaNome: 'Teorema de Pitágoras',
    invertida: true,
    pergunta: '[PISTA DE INVESTIGAÇÃO]: Três das afirmações sobre o Teorema de Pitágoras no triângulo retângulo de lados a, b (catetos) e c (hipotenusa) são verdadeiras. Identifique a alternativa INCORRETA:',
    opcoes: [
      'A hipotenusa c é calculada somando diretamente a medida dos catetos: c = a + b.',
      'O maior lado do triângulo retângulo é a hipotenusa, ficando sempre oposta ao ângulo de 90°.',
      'Para verificar se o triângulo de lados 6 cm, 8 cm e 10 cm é retângulo, calculamos: 6² + 8² = 36 + 64 = 100 (10²).',
      'Se um cateto mede 3 cm e o outro mede 4 cm, a hipotenusa é obrigatoriamente igual a 5 cm.'
    ],
    correta: 0,
    porque: 'A relação correta é c² = a² + b² (ou c = √(a² + b²)), e nunca a soma linear c = a + b.'
  },
  {
    id: 'pit-2',
    etapa: 1,
    temaKey: 'pitagoras',
    temaNome: 'Teorema de Pitágoras',
    invertida: true,
    pergunta: '[PISTA DE INVESTIGAÇÃO]: Analise os cálculos do detetive sobre um triângulo retângulo com hipotenusa 13 cm e um cateto de 12 cm. Marque a afirmativa INCORRETA:',
    opcoes: [
      "O outro cateto 'x' mede 7 cm, pois basta subtrair os lados conhecidos: 13 - 12 = 1.",
      "A equação correta do Teorema para este caso é: x² + 12² = 13².",
      'O quadrado da hipotenusa é igual a 169 (13 × 13).',
      "O cateto desconhecido 'x' é igual a 5 cm, pois 5² + 12² = 25 + 144 = 169."
    ],
    correta: 0,
    porque: 'O cateto mede 5 cm, calculado por x² = 13² - 12² = 169 - 144 = 25, resultando em x = 5 cm.'
  },
  {
    id: 'pit-3',
    etapa: 1,
    temaKey: 'pitagoras',
    temaNome: 'Teorema de Pitágoras',
    invertida: true,
    pergunta: '[PISTA DE INVESTIGAÇÃO]: Um estudante de geometria investigou as propriedades dos triângulos retângulos. Qual das conclusões abaixo é a INCORRETA?',
    opcoes: [
      'O Teorema de Pitágoras pode ser aplicado diretamente em qualquer triângulo, seja ele acutângulo ou obtusângulo.',
      'No triângulo retângulo isósceles, os dois catetos têm exatamente o mesmo comprimento.',
      'Se conhecemos as medidas de dois lados de um triângulo retângulo, é sempre possível deduzir o terceiro.',
      'A relação c² = a² + b² só é válida se c for a hipotenusa oposta ao ângulo reto.'
    ],
    correta: 0,
    porque: 'O Teorema de Pitágoras é válido estritamente para triângulos retângulos (com ângulo de 90°).'
  },
  {
    id: 'pit-4',
    etapa: 1,
    temaKey: 'pitagoras',
    temaNome: 'Teorema de Pitágoras',
    invertida: true,
    pergunta: '[PISTA DE INVESTIGAÇÃO]: Uma escada de 10 metros está apoiada em um muro vertical. A base da escada dista 6 metros do muro. Assinale a afirmativa INCORRETA:',
    opcoes: [
      'A altura alcançada no muro é de 16 metros, somando o comprimento da escada com a distância da base.',
      'A altura alcançada no muro é de 8 metros, pois h² + 6² = 10².',
      'A escada funciona geometricamente como a hipotenusa do triângulo retângulo formado.',
      'O chão e a parede vertical formam entre si um ângulo reto de 90°.'
    ],
    correta: 0,
    porque: 'A altura h é √(10² - 6²) = √(100 - 36) = √64 = 8 metros, e não 16 metros.'
  },
  {
    id: 'pit-5',
    etapa: 1,
    temaKey: 'pitagoras',
    temaNome: 'Teorema de Pitágoras',
    invertida: true,
    pergunta: '[PISTA DE INVESTIGAÇÃO]: Sobre a terno pitagórico primitivo (8, 15, 17), identifique a dedução INCORRETA:',
    opcoes: [
      'A hipotenusa é o lado de medida 15, pois 8 + 7 = 15.',
      'O quadrado de 17 é 289 e a soma dos quadrados 8² + 15² = 64 + 225 = 289.',
      'A hipotenusa mede 17, pois é o maior lado do triângulo.',
      'Os catetos desse triângulo medem 8 e 15.'
    ],
    correta: 0,
    porque: 'A hipotenusa é sempre o maior lado oposto ao ângulo reto, ou seja, 17, e não 15.'
  },
  {
    id: 'pit-6',
    etapa: 1,
    temaKey: 'pitagoras',
    temaNome: 'Teorema de Pitágoras',
    invertida: true,
    pergunta: '[PISTA DE INVESTIGAÇÃO]: Um quadrado tem lado medindo 5 cm. O detetive calculou o comprimento de sua diagonal. Qual afirmação é INCORRETA?',
    opcoes: [
      'A diagonal mede exatamente 10 cm, pois é o dobro do lado do quadrado.',
      'A diagonal divide o quadrado em dois triângulos retângulos isósceles congruentes.',
      'Aplicando Pitágoras: d² = 5² + 5² = 50, logo d = 5√2 cm.',
      'A diagonal é a hipotenusa em relação aos lados do quadrado que atuam como catetos.'
    ],
    correta: 0,
    porque: 'A diagonal mede 5√2 ≈ 7,07 cm, e nunca o dobro do lado (10 cm).'
  }
];

export const poolEtapa2Senos: Question[] = [
  {
    id: 'sen-1',
    etapa: 2,
    temaKey: 'senos',
    temaNome: 'Lei dos Senos',
    invertida: true,
    pergunta: '[PISTA DE INVESTIGAÇÃO]: Investigando a relação entre lados e ângulos pela Lei dos Senos, qual das proposições a seguir traz uma informação INCORRETA?',
    opcoes: [
      'A Lei dos Senos afirma que os lados de um triângulo são inversamente proporcionais aos senos dos ângulos opostos.',
      'A relação matemática padrão é expressa como a/sen(A) = b/sen(B) = c/sen(C).',
      'A Lei dos Senos é ideal para resolver triângulos quando conhecemos dois ângulos e um lado.',
      'Em qualquer triângulo, a razão entre um lado e o seno do seu ângulo oposto permanece constante.'
    ],
    correta: 0,
    porque: 'Os lados são DIRETAMENTE proporcionais aos senos de seus ângulos opostos, e não inversamente.'
  },
  {
    id: 'sen-2',
    etapa: 2,
    temaKey: 'senos',
    temaNome: 'Lei dos Senos',
    invertida: true,
    pergunta: '[PISTA DE INVESTIGAÇÃO]: Um detetive está calculando a/sen(30°) = 20 num triângulo qualquer. Sabendo que sen(30°) = 0,5, assinale a conclusão INCORRETA:',
    opcoes: [
      "O valor do lado 'a' é igual a 40, pois dividimos 20 por 0,5.",
      "Multiplicando 20 pelo seno de 30° (0,5), obtemos a = 10.",
      'A razão constante de proporcionalidade da Lei dos Senos neste triângulo vale 20.',
      "O ângulo de 30° está posicionado exatamente oposto ao lado 'a'."
    ],
    correta: 0,
    porque: 'Se a / sen(30°) = 20, então a = 20 × 0,5 = 10, e não 40.'
  },
  {
    id: 'sen-3',
    etapa: 2,
    temaKey: 'senos',
    temaNome: 'Lei dos Senos',
    invertida: true,
    pergunta: '[PISTA DE INVESTIGAÇÃO]: Analisando o uso da Lei dos Senos em triângulos genéricos, assinale a afirmativa INCORRETA:',
    opcoes: [
      "Se o ângulo A for o triplo do ângulo B, então o lado 'a' obrigatoriamente será três vezes maior que o lado 'b'.",
      'O seno de um ângulo de 90° vale 1.',
      'A Lei dos Senos pode ser aplicada em triângulos acutângulos e obtusângulos.',
      'O maior lado de um triângulo estará sempre oposto ao seu maior ângulo interno.'
    ],
    correta: 0,
    porque: 'Os lados são proporcionais aos SENOS dos ângulos, e não diretamente às medidas angulares em graus.'
  },
  {
    id: 'sen-4',
    etapa: 2,
    temaKey: 'senos',
    temaNome: 'Lei dos Senos',
    invertida: true,
    pergunta: '[PISTA DE INVESTIGAÇÃO]: Em relação ao raio R da circunferência circunscrita ao triângulo, qual afirmação é INCORRETA?',
    opcoes: [
      'A constante da Lei dos Senos é igual a R/2.',
      'A razão entre qualquer lado e o seno do ângulo oposto é igual a 2R (diâmetro da circunferência).',
      'A fórmula ampliada da Lei dos Senos é: a/sen(A) = b/sen(B) = c/sen(C) = 2R.',
      'Se o triângulo for retângulo com hipotenusa c, então c/sen(90°) = c = 2R.'
    ],
    correta: 0,
    porque: 'A razão da Lei dos Senos é igual ao diâmetro 2R, e não R/2.'
  },
  {
    id: 'sen-5',
    etapa: 2,
    temaKey: 'senos',
    temaNome: 'Lei dos Senos',
    invertida: true,
    pergunta: '[PISTA DE INVESTIGAÇÃO]: Um triângulo possui ângulo A = 45° e lado oposto a = 10 cm. Sabendo que sen(45°) = √2/2, identifique a opção INCORRETA:',
    opcoes: [
      'A razão a/sen(A) é igual a 5 cm.',
      'A razão a/sen(A) vale 10 / (√2/2) = 20 / √2 = 10√2 cm.',
      'Para qualquer outro ângulo B do mesmo triângulo, b/sen(B) terá o mesmo valor de 10√2 cm.',
      'O diâmetro do círculo circunscrito a este triângulo mede 10√2 cm.'
    ],
    correta: 0,
    porque: '10 / (√2/2) = 10 × (2/√2) = 10√2 ≈ 14,14 cm, e não 5 cm.'
  }
];

export const poolEtapa3Cossenos: Question[] = [
  {
    id: 'cos-1',
    etapa: 3,
    temaKey: 'cossenos',
    temaNome: 'Lei dos Cossenos',
    invertida: true,
    pergunta: '[PISTA DE INVESTIGAÇÃO]: A respeito da fórmula e aplicação da Lei dos Cossenos em triângulos, qual das afirmativas abaixo é INCORRETA?',
    opcoes: [
      'A fórmula da Lei dos Cossenos para o lado a é expressa por: a² = b² + c² + 2bc·cos(A).',
      'A Lei dos Cossenos reduz-se ao Teorema de Pitágoras quando o ângulo A é exatamente igual a 90°.',
      'Se o ângulo A for obtuso (maior que 90°), seu cosseno será negativo.',
      'Utiliza-se a Lei dos Cossenos quando conhecemos dois lados de um triângulo e o ângulo compreendido entre eles.'
    ],
    correta: 0,
    porque: 'O sinal correto na fórmula é de subtração: a² = b² + c² - 2bc·cos(A).'
  },
  {
    id: 'cos-2',
    etapa: 3,
    temaKey: 'cossenos',
    temaNome: 'Lei dos Cossenos',
    invertida: true,
    pergunta: '[PISTA DE INVESTIGAÇÃO]: Um triângulo possui lados b = 5, c = 8 e o ângulo entre eles A = 60°. Sabendo que cos(60°) = 0,5, assinale a alternativa INCORRETA:',
    opcoes: [
      'O valor do lado a é igual a 12 cm, obtido somando simplesmente 5 + 8 - 1.',
      'O termo de abatimento 2bc·cos(A) é calculado como 2 × 5 × 8 × 0,5 = 40.',
      'Ao calcular b² + c², obtemos 25 + 64 = 89.',
      'A medida do lado a é exatamente 7 cm, pois a² = 89 - 40 = 49 => a = 7.'
    ],
    correta: 0,
    porque: 'O lado a mede 7 cm (pois a² = 49), e não 12 cm.'
  },
  {
    id: 'cos-3',
    etapa: 3,
    temaKey: 'cossenos',
    temaNome: 'Lei dos Cossenos',
    invertida: true,
    pergunta: '[PISTA DE INVESTIGAÇÃO]: Testando hipóteses sobre os cossenos de ângulos conhecidos na geometria, qual proposição é INCORRETA?',
    opcoes: [
      'O cosseno de um ângulo de 0° é igual a zero.',
      'O cosseno de 60° possui valor exato de 0,5 (ou 1/2).',
      'O cosseno de 90° é nulo, ou seja, cos(90°) = 0.',
      'Em um triângulo acutângulo, os cossenos de todos os ângulos internos são estritamente positivos.'
    ],
    correta: 0,
    porque: 'O cosseno de 0° é igual a 1, e não zero (seno de 0° que é 0).'
  },
  {
    id: 'cos-4',
    etapa: 3,
    temaKey: 'cossenos',
    temaNome: 'Lei dos Cossenos',
    invertida: true,
    pergunta: '[PISTA DE INVESTIGAÇÃO]: Em um triângulo com lados a = 7, b = 3 e c = 5, o detetive determinou o ângulo oposto ao lado a. Marque a dedução INCORRETA:',
    opcoes: [
      'O cosseno de A resultará em um valor positivo, pois todos os lados são números positivos.',
      'Pela Lei dos Cossenos: 7² = 3² + 5² - 2(3)(5)cos(A) => 49 = 34 - 30cos(A).',
      'Temos 30cos(A) = 34 - 49 = -15, portanto cos(A) = -15/30 = -0,5.',
      'Como cos(A) = -0,5, o ângulo A é obtuso e mede 120°.'
    ],
    correta: 0,
    porque: 'O cosseno é negativo (-0,5), caracterizando um ângulo obtuso de 120°, mesmo com lados positivos.'
  },
  {
    id: 'cos-5',
    etapa: 3,
    temaKey: 'cossenos',
    temaNome: 'Lei dos Cossenos',
    invertida: true,
    pergunta: '[PISTA DE INVESTIGAÇÃO]: Quando os três lados de um triângulo são conhecidos (a, b, c), assinale a afirmação INCORRETA:',
    opcoes: [
      'A Lei dos Cossenos não pode ser utilizada para descobrir nenhum dos ângulos internos.',
      'Podemos isolar cos(A) obtendo cos(A) = (b² + c² - a²) / (2bc).',
      'Se b² + c² > a², o ângulo A é necessariamente agudo.',
      'Se b² + c² < a², o ângulo A é necessariamente obtuso.'
    ],
    correta: 0,
    porque: 'A Lei dos Cossenos é justamente o método ideal para encontrar qualquer ângulo quando os três lados são conhecidos.'
  }
];

export const poolEtapa4Semelhanca: Question[] = [
  {
    id: 'sem-1',
    etapa: 4,
    temaKey: 'semelhanca',
    temaNome: 'Relações de Semelhança',
    invertida: true,
    pergunta: '[PISTA DE INVESTIGAÇÃO]: Dois triângulos são declarados semelhantes. Qual das afirmações abaixo traz um conceito INCORRETO?',
    opcoes: [
      'Triângulos semelhantes possuem obrigatoriamente áreas idênticas.',
      'Os ângulos internos correspondentes de dois triângulos semelhantes são perfeitamente iguais.',
      'Os lados correspondentes em triângulos semelhantes mantêm entre si uma razão constante k.',
      'Se dobrarmos proporcionalmente todos os lados de um triângulo, o novo triângulo será semelhante ao original.'
    ],
    correta: 0,
    porque: 'Triângulos semelhantes têm mesma forma, mas podem ter tamanhos e áreas diferentes (a razão das áreas é k²).'
  },
  {
    id: 'sem-2',
    etapa: 4,
    temaKey: 'semelhanca',
    temaNome: 'Relações de Semelhança',
    invertida: true,
    pergunta: '[PISTA DE INVESTIGAÇÃO]: Se a razão de semelhança linear entre dois triângulos é k = 3, assinale a conclusão INCORRETA de um detetive:',
    opcoes: [
      'A área do triângulo maior será exatamente 3 vezes a área do triângulo menor.',
      'Cada lado do triângulo maior é o triplo do lado correspondente do triângulo menor.',
      'A razão entre os perímetros dos dois triângulos também será igual a k = 3.',
      'A razão entre as áreas dos dois triângulos é calculada por k² = 3² = 9.'
    ],
    correta: 0,
    porque: 'A razão entre as áreas de figuras semelhantes é k² (ou seja, 3² = 9 vezes), e não 3.'
  },
  {
    id: 'sem-3',
    etapa: 4,
    temaKey: 'semelhanca',
    temaNome: 'Relações de Semelhança',
    invertida: true,
    pergunta: '[PISTA DE INVESTIGAÇÃO]: Analisando os critérios formais de semelhança de triângulos, selecione a afirmativa INCORRETA:',
    opcoes: [
      'Basta que dois triângulos sejam triângulos retângulos para garantirmos que eles sejam semelhantes.',
      'O critério AA (Ângulo-Ângulo) garante que dois triângulos são semelhantes se tiverem 2 ângulos congruentes.',
      'Se três lados de um triângulo forem proporcionais aos três lados de outro, os triângulos são semelhantes (Caso LLL).',
      'Figuras semelhantes têm exatamente a mesma forma e ângulos, mas escalas potencialmente distintas.'
    ],
    correta: 0,
    porque: 'Ser apenas retângulo não basta; os outros dois ângulos agudos podem ser diferentes (ex: 30°-60° versus 45°-45°).'
  },
  {
    id: 'sem-4',
    etapa: 4,
    temaKey: 'semelhanca',
    temaNome: 'Relações de Semelhança',
    invertida: true,
    pergunta: '[PISTA DE INVESTIGAÇÃO]: Uma vara de 2 metros projeta uma sombra de 3 metros. No mesmo instante, um poste projeta uma sombra de 12 metros. Identifique a dedução INCORRETA:',
    opcoes: [
      'A altura do poste é de 18 metros, calculada multiplicando 12 por 1,5.',
      'A razão entre as sombras é 12 / 3 = 4, logo a altura do poste é 4 vezes a da vara.',
      'A altura do poste é de 8 metros (2 × 4 = 8 m).',
      'Os triângulos formados pelas hastes e sombras são semelhantes pelo alinhamento dos raios solares.'
    ],
    correta: 0,
    porque: 'A altura do poste é 2 × (12/3) = 2 × 4 = 8 metros, e não 18 metros.'
  },
  {
    id: 'sem-5',
    etapa: 4,
    temaKey: 'semelhanca',
    temaNome: 'Relações de Semelhança',
    invertida: true,
    pergunta: '[PISTA DE INVESTIGAÇÃO]: Um segmento paralelo a um dos lados de um triângulo corta os outros dois lados (Teorema Fundamental da Semelhança). Qual opção é INCORRETA?',
    opcoes: [
      'O triângulo menor formado é obrigatoriamente um triângulo equilátero.',
      'O triângulo menor formado é semelhante ao triângulo original todo.',
      'Os lados correspondentes do triângulo menor e maior são proporcionais.',
      'Os ângulos correspondentes são congruentes devido às retas paralelas cortadas por transversais.'
    ],
    correta: 0,
    porque: 'O novo triângulo mantém os mesmos ângulos do original, não sendo necessariamente equilátero.'
  }
];

// ----------------------------------------------------------------------
// BANCO TREINE MAIS (TRIGONOMETRIA - 3 NÍVEIS)
// ----------------------------------------------------------------------

export const poolTreineIniciante: Question[] = [
  {
    id: 'trig-ini-1',
    nivel: 'iniciante',
    temaKey: 'trig_iniciante',
    temaNome: 'Trigonometria - Iniciante',
    pergunta: 'Em um triângulo retângulo, a razão entre o Cateto Oposto ao ângulo θ e a Hipotenusa define qual razão trigonométrica?',
    opcoes: ['Seno (sen)', 'Cosseno (cos)', 'Tangente (tan)', 'Cotangente'],
    correta: 0,
    porque: 'Por definição trigonométrica fundamental no triângulo retângulo: Seno(θ) = Cateto Oposto / Hipotenusa.',
    svgType: 'triangulo_seno'
  },
  {
    id: 'trig-ini-2',
    nivel: 'iniciante',
    temaKey: 'trig_iniciante',
    temaNome: 'Trigonometria - Iniciante',
    pergunta: 'Em um triângulo retângulo, a relação Tangente(θ) é calculada dividindo:',
    opcoes: [
      'Cateto Oposto pelo Cateto Adjacente',
      'Cateto Adjacente pela Hipotenusa',
      'Hipotenusa pelo Cateto Oposto',
      'Seno pelo Cosseno inverso'
    ],
    correta: 0,
    porque: 'A Tangente de um ângulo agudo é a razão entre a medida do Cateto Oposto e a do Cateto Adjacente (tan = CO / CA).',
    svgType: 'triangulo_tangente'
  },
  {
    id: 'trig-ini-3',
    nivel: 'iniciante',
    temaKey: 'trig_iniciante',
    temaNome: 'Trigonometria - Iniciante',
    pergunta: 'Qual é o valor numérico exato do sen(30°)?',
    opcoes: ['0,5 (ou 1/2)', '1', '√3/2', '0'],
    correta: 0,
    porque: '30° é um ângulo notável fundamental, e o seno de 30° é exatamente 1/2 = 0,5.',
    svgType: 'angulo_30'
  },
  {
    id: 'trig-ini-4',
    nivel: 'iniciante',
    temaKey: 'trig_iniciante',
    temaNome: 'Trigonometria - Iniciante',
    pergunta: 'Se em um triângulo retângulo a Hipotenusa mede 10 cm e o Cateto Oposto ao ângulo α mede 5 cm, qual o valor de sen(α)?',
    opcoes: ['0,5', '1,0', '0,25', '2,0'],
    correta: 0,
    porque: 'sen(α) = Cateto Oposto / Hipotenusa = 5 / 10 = 0,5.',
    svgType: 'triangulo_calculo_5_10'
  },
  {
    id: 'trig-ini-5',
    nivel: 'iniciante',
    temaKey: 'trig_iniciante',
    temaNome: 'Trigonometria - Iniciante',
    pergunta: 'Qual é o valor exato de cos(60°)?',
    opcoes: ['0,5', '√2/2', '√3/2', '1'],
    correta: 0,
    porque: 'O cosseno de 60° possui o mesmo valor que o seno de seu ângulo complementar (30°), ou seja, 0,5 (1/2).',
    svgType: 'angulo_60'
  },
  {
    id: 'trig-ini-6',
    nivel: 'iniciante',
    temaKey: 'trig_iniciante',
    temaNome: 'Trigonometria - Iniciante',
    pergunta: 'Em um triângulo retângulo, a razão Cosseno(θ) é calculada dividindo:',
    opcoes: [
      'Cateto Adjacente pela Hipotenusa',
      'Cateto Oposto pela Hipotenusa',
      'Hipotenusa pelo Cateto Adjacente',
      'Cateto Adjacente pelo Cateto Oposto'
    ],
    correta: 0,
    porque: 'Por definição clássica: cos(θ) = Cateto Adjacente / Hipotenusa.',
    svgType: 'triangulo_cosseno'
  },
  {
    id: 'trig-ini-7',
    nivel: 'iniciante',
    temaKey: 'trig_iniciante',
    temaNome: 'Trigonometria - Iniciante',
    pergunta: 'Se os catetos de um triângulo retângulo medem 6 cm e 8 cm, a hipotenusa é 10 cm. Quanto vale o cosseno do ângulo adjacente ao cateto de 8 cm?',
    opcoes: ['0,8 (8/10)', '0,6 (6/10)', '1,33 (8/6)', '0,5'],
    correta: 0,
    porque: 'cos = Cateto Adjacente / Hipotenusa = 8 / 10 = 0,8.',
    svgType: 'triangulo_6_8_10'
  }
];

export const poolTreineIntermediario: Question[] = [
  {
    id: 'trig-int-1',
    nivel: 'intermediario',
    temaKey: 'trig_intermediario',
    temaNome: 'Trigonometria - Intermediário',
    pergunta: 'Um triângulo retângulo tem cateto oposto x e hipotenusa 20 cm. Sabendo que sen(30°) = 0,5, qual a medida do cateto x?',
    opcoes: ['10 cm', '5 cm', '15 cm', '40 cm'],
    correta: 0,
    porque: 'sen(30°) = x / 20 => 0,5 = x / 20 => x = 20 × 0,5 = 10 cm.',
    svgType: 'triangulo_x_20'
  },
  {
    id: 'trig-int-2',
    nivel: 'intermediario',
    temaKey: 'trig_intermediario',
    temaNome: 'Trigonometria - Intermediário',
    pergunta: 'Qual é o valor exato da Tangente de 45°?',
    opcoes: ['1', '0', '√3', '√2/2'],
    correta: 0,
    porque: 'Em um triângulo retângulo com ângulo de 45°, os catetos oposto e adjacente são iguais. Logo, tan(45°) = CO / CA = 1.',
    svgType: 'triangulo_45'
  },
  {
    id: 'trig-int-3',
    nivel: 'intermediario',
    temaKey: 'trig_intermediario',
    temaNome: 'Trigonometria - Intermediário',
    pergunta: 'Na Relação Fundamental da Trigonometria, para qualquer ângulo x é sempre verdade que:',
    opcoes: [
      'sen²(x) + cos²(x) = 1',
      'sen(x) + cos(x) = 1',
      'tan(x) = sen(x) · cos(x)',
      'sen²(x) - cos²(x) = 1'
    ],
    correta: 0,
    porque: 'Derivada do Teorema de Pitágoras no ciclo trigonométrico, a relação fundamental é sen²(x) + cos²(x) = 1.',
    svgType: 'circulo_trig'
  },
  {
    id: 'trig-int-4',
    nivel: 'intermediario',
    temaKey: 'trig_intermediario',
    temaNome: 'Trigonometria - Intermediário',
    pergunta: 'Um observador vê o topo de um edifício sob um ângulo de elevação de 45°. Se ele está a 30 metros da base, qual a altura do edifício? (considere tan 45° = 1)',
    opcoes: ['30 metros', '15 metros', '60 metros', '45 metros'],
    correta: 0,
    porque: 'tan(45°) = Altura / Distância => 1 = h / 30 => h = 30 metros.',
    svgType: 'predio_30m'
  },
  {
    id: 'trig-int-5',
    nivel: 'intermediario',
    temaKey: 'trig_intermediario',
    temaNome: 'Trigonometria - Intermediário',
    pergunta: 'Em um triângulo qualquer com lados a = 6, sen(A) = 0,3 e sen(B) = 0,5, qual é a medida do lado b pela Lei dos Senos?',
    opcoes: ['10', '12', '8', '15'],
    correta: 0,
    porque: 'Pela Lei dos Senos: a/sen(A) = b/sen(B) => 6/0,3 = b/0,5 => 20 = b/0,5 => b = 10.',
    svgType: 'lei_senos_generica'
  },
  {
    id: 'trig-int-6',
    nivel: 'intermediario',
    temaKey: 'trig_intermediario',
    temaNome: 'Trigonometria - Intermediário',
    pergunta: 'Sabendo que sen(x) = 0,6 em um ângulo agudo, quanto vale a tangente de x sabendo que cos(x) = 0,8?',
    opcoes: ['0,75 (ou 3/4)', '1,33', '0,48', '0,2'],
    correta: 0,
    porque: 'tan(x) = sen(x) / cos(x) = 0,6 / 0,8 = 6/8 = 3/4 = 0,75.',
    svgType: 'tangente_divisao'
  }
];

export const poolTreineAvancado: Question[] = [
  {
    id: 'trig-av-1',
    nivel: 'avancado',
    temaKey: 'trig_avancado',
    temaNome: 'Trigonometria - Avançado',
    pergunta: 'Um triângulo tem lados b = 5 cm, c = 8 cm e o ângulo entre eles A = 60°. Sabendo que cos(60°) = 0,5, qual a medida do lado a pela Lei dos Cossenos?',
    opcoes: ['7 cm', '√39 cm', '9 cm', '8 cm'],
    correta: 0,
    porque: 'a² = b² + c² - 2bc·cos(A) = 5² + 8² - 2(5)(8)(0,5) = 25 + 64 - 40 = 49 => a = √49 = 7 cm.',
    svgType: 'triangulo_cossenos_5_8'
  },
  {
    id: 'trig-av-2',
    nivel: 'avancado',
    temaKey: 'trig_avancado',
    temaNome: 'Trigonometria - Avançado',
    pergunta: 'Se sen(x) = 3/5 em um ângulo agudo, qual é o valor exato do cos(x)?',
    opcoes: ['4/5 (ou 0,8)', '2/5', '1/5', '5/3'],
    correta: 0,
    porque: 'sen²(x) + cos²(x) = 1 => 9/25 + cos²(x) = 1 => cos²(x) = 16/25 => cos(x) = 4/5.',
    svgType: 'triangulo_3_4_5'
  },
  {
    id: 'trig-av-3',
    nivel: 'avancado',
    temaKey: 'trig_avancado',
    temaNome: 'Trigonometria - Avançado',
    pergunta: 'Considerando sen(45°) = √2/2 e cos(45°) = √2/2, qual o valor numérico exato de sen²(45°) + cos²(45°)?',
    opcoes: ['1', '2', '√2', '0,5'],
    correta: 0,
    porque: '(√2/2)² + (√2/2)² = 2/4 + 2/4 = 4/4 = 1. Isto confirma a relação fundamental sen² + cos² = 1.',
    svgType: 'circulo_identidade'
  },
  {
    id: 'trig-av-4',
    nivel: 'avancado',
    temaKey: 'trig_avancado',
    temaNome: 'Trigonometria - Avançado',
    pergunta: 'Em um triângulo com lados a = 7, b = 5, c = 3, o cálculo de cos(A) resulta em um valor negativo (-0,5). Isso indica que o ângulo A é:',
    opcoes: ['Obtusângulo (maior que 90°)', 'Agudo (menor que 90°)', 'Reto (exatamente 90°)', 'Raso (180°)'],
    correta: 0,
    porque: 'No ciclo trigonométrico, cossenos negativos entre 0° e 180° situam-se no 2º quadrante (entre 90° e 180°), caracterizando um ângulo obtuso.',
    svgType: 'triangulo_obtuso'
  },
  {
    id: 'trig-av-5',
    nivel: 'avancado',
    temaKey: 'trig_avancado',
    temaNome: 'Trigonometria - Avançado',
    pergunta: 'Se a sombra de uma torre de transmissão de 50 m tem exatamente o mesmo comprimento da sua altura (50 m), qual o ângulo de elevação do sol?',
    opcoes: ['45°', '30°', '60°', '90°'],
    correta: 0,
    porque: 'tan(θ) = Altura / Sombra = 50 / 50 = 1. O ângulo agudo cuja tangente é 1 é exatamente 45°.',
    svgType: 'torre_sombra_45'
  },
  {
    id: 'trig-av-6',
    nivel: 'avancado',
    temaKey: 'trig_avancado',
    temaNome: 'Trigonometria - Avançado',
    pergunta: 'Qual o valor de tan(60°), sabendo que sen(60°) = √3/2 e cos(60°) = 1/2?',
    opcoes: ['√3 (aproximadamente 1,73)', '1', '√3/3', '2'],
    correta: 0,
    porque: 'tan(60°) = sen(60°) / cos(60°) = (√3/2) / (1/2) = √3.',
    svgType: 'tangente_60'
  }
];

// Helper to shuffle options of a question and recalculate correct index
export function prepareShuffledQuestion(q: Question): Question {
  const optionsWithMeta = q.opcoes.map((texto, idx) => ({
    texto,
    isCorrect: idx === q.correta
  }));
  const shuffledOptions = shuffle(optionsWithMeta);
  const newCorrectIndex = shuffledOptions.findIndex(o => o.isCorrect);

  return {
    ...q,
    opcoes: shuffledOptions.map(o => o.texto),
    correta: newCorrectIndex
  };
}

export function mergeOverrideWithQuestion(base: Question, ov: QuestionOverride): Question {
  const mergedOpcoes = ov.opcoes && ov.opcoes.length >= 2 ? ov.opcoes : base.opcoes;
  const mergedCorreta =
    typeof ov.correta === 'number' && ov.correta >= 0 && ov.correta < mergedOpcoes.length
      ? ov.correta
      : base.correta;

  return {
    ...base,
    etapa: ov.etapa ?? base.etapa,
    nivel: ov.nivel ?? base.nivel,
    serie: ov.serie ?? base.serie,
    aulaNumero: ov.aulaNumero ?? base.aulaNumero,
    aulaTitulo: ov.aulaTitulo ?? base.aulaTitulo,
    temaKey: ov.temaKey ?? base.temaKey,
    temaNome: ov.temaNome ?? base.temaNome,
    pergunta: ov.pergunta ?? base.pergunta,
    opcoes: mergedOpcoes,
    correta: mergedCorreta,
    porque: ov.porque !== undefined ? ov.porque : base.porque,
    dicaInvestigacao:
      ov.dicaInvestigacao !== undefined ? ov.dicaInvestigacao : base.dicaInvestigacao,
    svgType: ov.svgType !== undefined ? ov.svgType : base.svgType,
    invertida: ov.invertida !== undefined ? ov.invertida : base.invertida,
    habilidade: ov.habilidade ?? base.habilidade,
    // Keep 3º EM primary activity synchronized when edited by admin
    atividades: base.atividades
      ? base.atividades.map((act, idx) =>
          idx === 0
            ? {
                ...act,
                pergunta: ov.pergunta ?? act.pergunta,
                opcoes: mergedOpcoes,
                correta: mergedCorreta,
                porque: ov.porque !== undefined ? ov.porque : act.porque,
                dica1: ov.dicaInvestigacao !== undefined ? ov.dicaInvestigacao : act.dica1
              }
            : act
        )
      : undefined
  };
}

export function overrideToCustomQuestion(ov: QuestionOverride): Question {
  const opcoes = ov.opcoes && ov.opcoes.length >= 2 ? ov.opcoes : ['Opção A', 'Opção B'];
  const correta =
    typeof ov.correta === 'number' && ov.correta >= 0 && ov.correta < opcoes.length
      ? ov.correta
      : 0;

  return {
    id: ov.id,
    etapa: ov.etapa,
    nivel: ov.nivel,
    serie: ov.serie,
    aulaNumero: ov.aulaNumero,
    aulaTitulo: ov.aulaTitulo,
    temaKey: ov.temaKey || 'custom',
    temaNome: ov.temaNome || 'Tema Personalizado',
    pergunta: ov.pergunta || '',
    opcoes,
    correta,
    porque: ov.porque || '',
    dicaInvestigacao: ov.dicaInvestigacao || '',
    svgType: ov.svgType,
    invertida: ov.invertida,
    habilidade: ov.habilidade
  };
}

export function applyOverridesToPool(
  basePool: Question[],
  modulo: QuestionModule,
  matchesCustom: (ov: QuestionOverride) => boolean
): Question[] {
  const overrides = Storage.getQuestionOverrides().filter((o) => o.modulo === modulo);
  const overrideMap = new Map<string, QuestionOverride>();
  overrides.forEach((o) => overrideMap.set(o.id, o));

  const result: Question[] = [];
  for (const baseQ of basePool) {
    const ov = overrideMap.get(baseQ.id);
    if (ov?.status === 'deleted') continue;
    if (ov?.status === 'edited') {
      result.push(mergeOverrideWithQuestion(baseQ, ov));
    } else {
      result.push(baseQ);
    }
  }

  // Append custom questions belonging to this slice
  for (const ov of overrides) {
    if (ov.status === 'custom' && matchesCustom(ov)) {
      result.push(overrideToCustomQuestion(ov));
    }
  }

  return result;
}

/**
 * GERA PERGUNTAS DINÂMICAS E DIFERENTES A CADA LOGIN
 * Mantém os temas fixos (com suporte em tempo real às edições/adições/remoções do Administrador):
 * Etapa 1: Teorema de Pitágoras (2 questões sorteadas)
 * Etapa 2: Lei dos Senos (2 questões sorteadas)
 * Etapa 3: Lei dos Cossenos (2 questões sorteadas)
 * Etapa 4: Relações de Semelhança (2 questões sorteadas)
 */
export function generateOfficialQuestionsSession(): Record<number, Question[]> {
  const p1 = applyOverridesToPool(poolEtapa1Pitagoras, 'oficial', (o) => o.etapa === 1);
  const p2 = applyOverridesToPool(poolEtapa2Senos, 'oficial', (o) => o.etapa === 2);
  const p3 = applyOverridesToPool(poolEtapa3Cossenos, 'oficial', (o) => o.etapa === 3);
  const p4 = applyOverridesToPool(poolEtapa4Semelhanca, 'oficial', (o) => o.etapa === 4);

  const q1 = shuffle(p1.length > 0 ? p1 : poolEtapa1Pitagoras).slice(0, 2).map(prepareShuffledQuestion);
  const q2 = shuffle(p2.length > 0 ? p2 : poolEtapa2Senos).slice(0, 2).map(prepareShuffledQuestion);
  const q3 = shuffle(p3.length > 0 ? p3 : poolEtapa3Cossenos).slice(0, 2).map(prepareShuffledQuestion);
  const q4 = shuffle(p4.length > 0 ? p4 : poolEtapa4Semelhanca).slice(0, 2).map(prepareShuffledQuestion);

  return {
    1: q1,
    2: q2,
    3: q3,
    4: q4
  };
}

/**
 * GERA PERGUNTAS DINÂMICAS E DIFERENTES PARA O TREINE MAIS
 * 5 Iniciantes + 5 Intermediárias + 5 Avançadas = 15 Questões sorteadas
 */
export function generatePracticeQuestionsSession(): Question[] {
  const pIni = applyOverridesToPool(poolTreineIniciante, 'treine_mais', (o) => o.nivel === 'iniciante');
  const pInter = applyOverridesToPool(poolTreineIntermediario, 'treine_mais', (o) => o.nivel === 'intermediario');
  const pAvan = applyOverridesToPool(poolTreineAvancado, 'treine_mais', (o) => o.nivel === 'avancado');

  const ini = shuffle(pIni.length > 0 ? pIni : poolTreineIniciante).slice(0, 5).map(prepareShuffledQuestion);
  const inter = shuffle(pInter.length > 0 ? pInter : poolTreineIntermediario).slice(0, 5).map(prepareShuffledQuestion);
  const avan = shuffle(pAvan.length > 0 ? pAvan : poolTreineAvancado).slice(0, 5).map(prepareShuffledQuestion);

  return [...ini, ...inter, ...avan];
}
