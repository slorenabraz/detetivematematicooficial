import { Question } from '../types';

export interface InvestigationHintData {
  titulo: string;
  conceito: string;
  formula?: string;
  explicacao: string;
  dicaPratica: string;
}

export function getInvestigationHint(question: Question): InvestigationHintData {
  if (question.dicaInvestigacao) {
    return {
      titulo: 'Pista Personalizada do Desafio',
      conceito: question.temaNome,
      explicacao: question.dicaInvestigacao,
      dicaPratica: 'Analise as opções comparando com as propriedades descritas acima.'
    };
  }

  const p = question.pergunta.toLowerCase();

  switch (question.temaKey) {
    case 'pitagoras':
      if (p.includes('escada') || p.includes('muro') || p.includes('altura')) {
        return {
          titulo: 'Pista de Aplicação: Teorema de Pitágoras',
          conceito: 'Triângulo Retângulo no Espaço Real',
          formula: 'h² + d² = comp_escada²  =>  h = √(comp_escada² - d²)',
          explicacao: 'A escada apoiada age como a hipotenusa (o maior segmento). O chão e a parede vertical formam o ângulo reto de 90° entre os dois catetos.',
          dicaPratica: 'Nunca some ou subtraia as medidas diretamente: você deve elevar ao quadrado antes de somar ou subtrair!'
        };
      }
      if (p.includes('terno') || p.includes('primitivo')) {
        return {
          titulo: 'Pista de Investigação: Ternos Pitagóricos',
          conceito: 'Triângulos Inteiros de Pitágoras',
          formula: 'a² + b² = c²  (ex.: 3, 4, 5  |  5, 12, 13  |  8, 15, 17)',
          explicacao: 'Em qualquer terno pitagórico, o maior valor é SEMPRE a hipotenusa. A soma dos quadrados dos dois menores deve igualar o quadrado do maior.',
          dicaPratica: 'Verifique se o maior número ao quadrado coincide com a soma dos quadrados dos outros dois.'
        };
      }
      return {
        titulo: 'Pista de Investigação: Teorema de Pitágoras',
        conceito: 'Relação Fundamental no Triângulo Retângulo',
        formula: 'c² = a² + b²   ou   c = √(a² + b²)',
        explicacao: 'A hipotenusa (c) é o maior lado e sempre se localiza exatamente em frente ao ângulo reto (90°). Os catetos (a e b) são os lados adjacentes ao ângulo de 90°.',
        dicaPratica: 'Se o desafio pede a alternativa INCORRETA, desconfie de afirmações que dizem que a hipotenusa é a soma simples c = a + b ou que o teorema vale para qualquer triângulo!'
      };

    case 'senos':
      if (p.includes('circunferência') || p.includes('raio') || p.includes('circunscrit')) {
        return {
          titulo: 'Pista de Investigação: Lei dos Senos e Circunferência',
          conceito: 'Relação com o Diâmetro da Circunferência Circunscrita',
          formula: 'a / sen(A) = b / sen(B) = c / sen(C) = 2R',
          explicacao: 'A razão constante entre cada lado e o seno do ângulo oposto é numericamente igual ao diâmetro (2R) da circunferência que circunscreve o triângulo.',
          dicaPratica: 'O diâmetro é o dobro do raio (2R). Portanto, a / sen(A) = 2R, o que implica R = a / (2·sen(A)).'
        };
      }
      return {
        titulo: 'Pista de Investigação: Lei dos Senos',
        conceito: 'Proporcionalidade entre Lados e Ângulos Opostos',
        formula: 'a / sen(A) = b / sen(B) = c / sen(C)',
        explicacao: 'A Lei dos Senos conecta cada lado ao seno do ângulo que está DE FRENTE para ele. Lados maiores sempre se opõem a ângulos maiores!',
        dicaPratica: 'Observe que a relação divide o lado pelo seno do ângulo oposto (lado / sen(ângulo)). Fórmulas com senos no numerador ou com multiplicação cruzada invertida são incorretas!'
      };

    case 'cossenos':
      if (p.includes('obtuso') || p.includes('90°') || p.includes('sinal') || p.includes('negativo')) {
        return {
          titulo: 'Pista de Investigação: Lei dos Cossenos em Ângulos Obtusos',
          conceito: 'Comportamento do Cosseno em Ângulos > 90°',
          formula: 'Para 90° < A < 180°:  cos(A) < 0  (negativo)',
          explicacao: 'No segundo quadrante trigonométrico, o cosseno é negativo. Quando o ângulo é obtuso, o termo -2bc·cos(A) fica positivo (- com - dá +), aumentando a medida do lado oposto!',
          dicaPratica: 'Lembre-se: cos(90°) = 0 (o que faz a fórmula virar o Teorema de Pitágoras). E cos(0°) = 1!'
        };
      }
      return {
        titulo: 'Pista de Investigação: Lei dos Cossenos',
        conceito: 'Generalização do Teorema de Pitágoras',
        formula: 'a² = b² + c² - 2·b·c·cos(A)',
        explicacao: 'Aplica-se quando conhecemos dois lados e o ângulo entre eles para achar o terceiro lado. Note o sinal NEGATIVO antes do dobro do produto.',
        dicaPratica: 'Cuidado com pegadinhas de sinais! A fórmula correta subtrai o termo: a² = b² + c² - 2bc·cos(A), nunca soma.'
      };

    case 'semelhanca':
      return {
        titulo: 'Pista de Investigação: Semelhança de Triângulos',
        conceito: 'Proporcionalidade Métrica e Ângulos Congruentes',
        formula: 'Lados homólogos: a/a\' = b/b\' = c/c\' = k  |  Ângulos correspondentes iguais',
        explicacao: 'Dois triângulos semelhantes têm exatamente a mesma forma (mesmos ângulos), mas tamanhos proporcionais. A razão de semelhança k multiplica todos os lados correspondentes.',
        dicaPratica: 'Se os triângulos são semelhantes, seus ângulos NÃO são multiplicados por k (eles permanecem exatamente iguais!). Somente os comprimentos dos lados são proporcionais.'
      };

    case 'trig_iniciante':
      return {
        titulo: 'Pista de Investigação: Razões no Triângulo Retângulo',
        conceito: 'Definições Clássicas de Seno, Cosseno e Tangente',
        formula: 'sen(θ) = Cateto Oposto / Hipotenusa\ncos(θ) = Cateto Adjacente / Hipotenusa\ntg(θ) = Cateto Oposto / Cateto Adjacente',
        explicacao: 'A hipotenusa é o lado mais longo (oposto ao ângulo reto). O cateto oposto fica do outro lado do ângulo θ, e o adjacente toca no ângulo θ.',
        dicaPratica: 'Dica mnemônica: SOH (Seno = Oposto/Hipotenusa), CAH (Cosseno = Adjacente/Hipotenusa), TOA (Tangente = Oposto/Adjacente).'
      };

    case 'trig_intermediario':
      return {
        titulo: 'Pista de Investigação: Ângulos Notáveis e Identidades',
        conceito: 'Valores Notáveis (30°, 45°, 60°) e Relação Fundamental',
        formula: 'sen²(θ) + cos²(θ) = 1  |  tg(θ) = sen(θ) / cos(θ)\nsen(30°)=1/2  |  cos(60°)=1/2  |  tg(45°)=1',
        explicacao: 'Ângulos complementares (que somam 90°) trocam seus senos e cossenos: sen(30°) = cos(60°) = 0,5.',
        dicaPratica: 'Sempre que tiver o seno e precisar do cosseno, a relação fundamental sen² + cos² = 1 permite calcular o valor exato.'
      };

    case 'trig_avancado':
      return {
        titulo: 'Pista de Investigação: Aplicações Avançadas',
        conceito: 'Cálculo de Distâncias, Alturas e Topografia',
        formula: 'tg(ângulo) = Altura / Distância Horizontal',
        explicacao: 'Em problemas com ângulos de elevação visual a partir do solo, a tangente é a ferramenta ideal porque relaciona a altura vertical com a distância no solo.',
        dicaPratica: 'Verifique se na altura total é necessário somar a altura dos olhos do observador ou do teodolito em relação ao solo.'
      };

    default:
      return {
        titulo: 'Pista de Investigação Geométrica',
        conceito: question.temaNome,
        formula: 'Analise as relações angulares e métricas do problema.',
        explicacao: 'Use as definições canônicas de geometria plana e trigonometria para testar cada afirmação.',
        dicaPratica: 'Elimine primeiro as alternativas que contradizem os teoremas fundamentais da geometria.'
      };
  }
}
