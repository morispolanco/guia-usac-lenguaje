
import { Module, QuizQuestionType } from './types';

export const EDUCATIONAL_CONTENT: Module[] = [
  {
    id: 'm1',
    title: 'MÓDULO 1: COMUNICACIÓN',
    description: 'Fundamentos del proceso comunicativo, argumentación y uso correcto del lenguaje.',
    units: [
      {
        id: 'm1u1',
        title: 'La Comunicación',
        content: {
          theory: [
            "La comunicación es el proceso de transmisión de información entre un emisor y un receptor que decodifica e interpreta un determinado mensaje. Este proceso es fundamental para la vida en sociedad y se compone de varios elementos clave.",
            "Elementos de la Comunicación: Emisor (quien envía el mensaje), Receptor (quien lo recibe), Mensaje (la información transmitida), Código (el sistema de signos, ej. el idioma español), Canal (el medio físico por el cual se transmite, ej. el aire, un papel), Contexto (la situación en que se produce la comunicación).",
            "Funciones del Lenguaje: Informativa (transmitir datos objetivos), Emotiva (expresar sentimientos), Apelativa (influir en el receptor), Poética (embellecer el mensaje), Fática (iniciar, mantener o cerrar la comunicación), Metalingüística (hablar del propio lenguaje)."
          ],
          examples: [
            "Ejemplo de Función Apelativa: '¡Compra ahora y obtén un 50% de descuento!'",
            "Ejemplo de Función Metalingüística: 'La palabra 'casa' es un sustantivo común.'"
          ]
        },
        quiz: [
          {
            id: 'm1u1q1',
            type: QuizQuestionType.MultipleChoice,
            question: "En la frase '¡Qué alegría verte!', ¿qué función del lenguaje predomina?",
            options: ['Informativa', 'Emotiva', 'Apelativa', 'Fática'],
            answer: 'Emotiva',
            explanation: "La función emotiva o expresiva se centra en expresar los sentimientos y emociones del emisor."
          },
          {
            id: 'm1u1q2',
            type: QuizQuestionType.TrueFalse,
            question: "El canal es el sistema de signos utilizado para crear el mensaje.",
            answer: false,
            explanation: "Falso. El sistema de signos es el código. El canal es el medio físico por el cual viaja el mensaje."
          }
        ]
      },
      {
        id: 'm1u2',
        title: 'Juicio, Razonamiento y Argumentación',
        content: {
          theory: [
            "El juicio es una operación mental que afirma o niega algo sobre un concepto. El razonamiento es el proceso que permite obtener nuevos conocimientos a partir de juicios existentes. La argumentación es la expresión verbal de un razonamiento, con el fin de persuadir."
          ],
          examples: [
            "Juicio: 'El sol es una estrella.'",
            "Argumento: 'Todos los hombres son mortales. Sócrates es un hombre. Por lo tanto, Sócrates es mortal.'"
          ]
        },
        quiz: [
          {
            id: 'm1u2q1',
            type: QuizQuestionType.MultipleChoice,
            question: "¿Cuál es el propósito principal de la argumentación?",
            options: ['Expresar emociones', 'Describir un objeto', 'Persuadir o convencer', 'Contar una historia'],
            answer: 'Persuadir o convencer',
            explanation: "La argumentación busca defender una idea o persuadir a otros de la validez de un razonamiento."
          }
        ]
      },
    ],
  },
  {
    id: 'm2',
    title: 'MÓDULO 2: LENGUAJE',
    description: 'Conceptos de lengua, habla, signo lingüístico y los diferentes niveles y disciplinas de la lengua.',
    units: [
        {
          id: 'm2u1',
          title: 'Lenguaje, Lengua, Dialecto y Habla',
          content: {
            theory: ["El lenguaje es la capacidad humana para comunicarse. La lengua (o idioma) es el sistema de signos de una comunidad (ej. español). El dialecto es una variedad regional de una lengua. El habla es el uso individual y concreto de la lengua."],
            examples: [],
          },
          quiz: [
            {
                id: 'm2u1q1',
                type: QuizQuestionType.MultipleChoice,
                question: "El español hablado en Guatemala con sus particularidades es un ejemplo de:",
                options: ['Lenguaje', 'Habla', 'Dialecto', 'Código'],
                answer: 'Dialecto',
                explanation: "Un dialecto es la variante de una lengua hablada en una zona geográfica específica."
            }
          ]
        }
    ]
  },
  // --- Módulos 3, 4, 5, y 6 se agregarían aquí siguiendo la misma estructura ---
  {
    id: 'm3',
    title: 'MÓDULO 3: ORTOGRAFÍA',
    description: 'Normas de escritura, puntuación y acentuación del español.',
    units: [],
  },
  {
    id: 'm4',
    title: 'MÓDULO 4: GRAMÁTICA Y VOCABULARIO',
    description: 'Estructura de la oración, categorías gramaticales y formación de palabras.',
    units: [],
  },
  {
    id: 'm5',
    title: 'MÓDULO 5: EXPOSICIÓN ORAL Y ESCRITA',
    description: 'Técnicas de redacción, tipos de texto y organización de la información.',
    units: [],
  },
  {
    id: 'm6',
    title: 'MÓDULO 6: COMPRENSIÓN LECTORA',
    description: 'Estrategias para entender, analizar e interpretar textos.',
    units: [],
  },
];
