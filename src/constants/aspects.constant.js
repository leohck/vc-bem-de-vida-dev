import { GiHealthNormal } from "react-icons/gi";
import { RiCoinsLine, RiMentalHealthFill } from "react-icons/ri";
import { MdGroups } from "react-icons/md";
import { FaHandshake } from "react-icons/fa";

export const TEXT_NOT_RATED = 'Não Avaliado'
export const TEXT_VERY_LOW = 'Muito Baixa'
export const TEXT_LOW = 'Baixa'
export const TEXT_REGULAR = 'Regular'
export const TEXT_HIGH = 'Alta'
export const TEXT_VERY_HIGH = 'Muito Alta'

export const VALUE_NOT_RATED = 0
export const VALUE_VERY_LOW = 1
export const VALUE_LOW = 2
export const VALUE_REGULAR = 3
export const VALUE_HIGH = 4
export const VALUE_VERY_HIGH = 5

export const HEX_COLOR_NOT_RATED = '#374151'
export const HEX_COLOR_VERY_LOW = '#dc2626'
export const HEX_COLOR_LOW = '#f97316'
export const HEX_COLOR_REGULAR = '#facc15'
export const HEX_COLOR_HIGH = '#22c55e'
export const HEX_COLOR_VERY_HIGH = '#047857'

export const THEME_COLOR_NOT_RATED = 'gray-700'
export const THEME_COLOR_VERY_LOW = 'red-500'
export const THEME_COLOR_LOW = 'orange-500'
export const THEME_COLOR_REGULAR = 'yellow-500'
export const THEME_COLOR_HIGH = 'green-500'
export const THEME_COLOR_VERY_HIGH = 'emerald-700'

export const NOT_RATED = {
    label: TEXT_NOT_RATED,
    value: VALUE_NOT_RATED,
    color: THEME_COLOR_NOT_RATED,
    hex_color: HEX_COLOR_NOT_RATED,
    disabled: false,
}
export const VERY_LOW = {
    label: TEXT_VERY_LOW,
    value: VALUE_VERY_LOW,
    color: THEME_COLOR_VERY_LOW,
    hex_color: HEX_COLOR_VERY_LOW,
    disabled: false,
}
export const LOW = {
    label: TEXT_LOW,
    value: VALUE_LOW,
    color: THEME_COLOR_LOW,
    hex_color: HEX_COLOR_LOW,
    disabled: false,
}
export const REGULAR = {
    label: TEXT_REGULAR,
    value: VALUE_REGULAR,
    color: THEME_COLOR_REGULAR,
    hex_color: HEX_COLOR_REGULAR,
    disabled: false,
}
export const HIGH = {
    label: TEXT_HIGH,
    value: VALUE_HIGH,
    color: THEME_COLOR_HIGH,
    hex_color: HEX_COLOR_HIGH,
    disabled: false,
}
export const VERY_HIGH = {
    label: TEXT_VERY_HIGH,
    value: VALUE_VERY_HIGH,
    color: THEME_COLOR_VERY_HIGH,
    hex_color: HEX_COLOR_VERY_HIGH,
    disabled: false,
}

export const ASPECTS = [VERY_LOW, LOW, REGULAR, HIGH, VERY_HIGH]

export const ASPECTS_QUESTIONS = {
    saude_fisica: [
        {
            question: 1,
            full: 'Como está sua satisfação com a sua disposição para atividades diária?',
            short: 'Disposição para atividades',
        },
        {
            question: 2,
            full: 'Como está sua satisfação com a sua condição de saúde (uso de medicamentos / dores)?',
            short: 'Condição de Saúde',
        },
        {
            question: 3,
            full: 'Como está sua satisfação com seu corpo (visual)?',
            short: 'Visual do Corpo',
        },
    ],
    saude_mental: [
        {
            question: 1,
            full: 'Como está sua satisfação quanto à sua condição atual (estabilidade/segurança)?',
            short: 'Condição Atual',
        },
        {
            question: 2,
            full: 'Como está sua satisfação ao lidar com suas emoções / sentimentos?',
            short: 'Lidando com Emoções',
        },
        {
            question: 3,
            full: 'Quão satisfeito(a) você está com a sua capacidade de alcançar seus objetivos / sonhos / desejos?',
            short: 'Capacidade para Sucesso',
        },
    ],
    vida_profissional: [
        {
            question: 1,
            full: 'Como você avalia sua satisfação com relação ao rumo da sua carreira profissional atual?',
            short: 'Carreira Profissional',
        },
        {
            question: 2,
            full: 'Como está sua satisfação com a forma que você desempenha sua atividade profissional atual?',
            short: 'Desempenho Profissional',
        },
        {
            question: 3,
            full: 'Quão satisfeito(a) você está com a relevância/importância da sua atividade profissional?',
            short: 'Relevância Profissional',
        },
    ],
    vida_social: [
        {
            question: 1,
            full: 'Quão satisfeito(a) você está com a sua relação/condição familiar?',
            short: 'Relação / Condição Familiar',
        },
        {
            question: 2,
            full: 'Como está sua satisfação com sua relação interpessoal com amigos?',
            short: 'Relação com Amigos',
        },
        {
            question: 3,
            full: 'Quão satisfeito(a) você está com sua imagem perante aos outros?',
            short: 'Sua imagem Social',
        },
    ],
    gestao_financeira: [
        {
            question: 1,
            full: 'Quão satisfeito(a) você está com sua renda atual?',
            short: 'Renda Atual',
        },
        {
            question: 2,
            full: 'Quão satisfeito(a) você está com sua reserva financeira atual?',
            short: 'Reserva Financeira',
        },
        {
            question: 3,
            full: 'Quão satisfeito(a) você está com a quantidade de atividades remuneradas você tem atualmente?',
            short: 'Fontes de Renda',
        },
    ],
}

let aspects_questions_full = []
let aspects_questions_short = []
// eslint-disable-next-line
for (let [key, value] of Object.entries(ASPECTS_QUESTIONS)) {
    value.forEach((item) => {
        aspects_questions_full.push(item['full'])
        aspects_questions_short.push(item['short'])
    })
}

export const ASPECTS_QUESTIONS_FULL = aspects_questions_full
export const ASPECTS_QUESTIONS_SHORT = aspects_questions_short

export const ASPECTS_TYPES = [
    'Saúde Física',
    'Saúde Mental',
    'Vida Social',
    'Vida Profissional',
    'Gestão Financeira',
]

export const LIFE_ASPECTS_OPTIONS = [
    {
        label: 'Saúde Física',
        value: 'Saude Fisica',
        icon: <GiHealthNormal size="2.5em"/>,
    },
    {
        label: 'Saúde Mental',
        value: 'Saude Mental',
        icon: <RiMentalHealthFill size="2.5em" />,
    },
    {
        label: 'Vida Social',
        value: 'Vida Social',
        icon: <MdGroups size="2.5em" />,
    },
    {
        label: 'Vida Profissional',
        value: 'Vida Profissional',
        icon: <FaHandshake size="2.5em" />,
    },
    {
        label: 'Gestão Financeira',
        value: 'Gestao Financeira',
        icon: <RiCoinsLine size="2.5em" />,
    },
]

export const getLifeAspectIconFromValue = (value) => {
    return LIFE_ASPECTS_OPTIONS.filter(option => option.value === value)[0].icon;
}

export const getLifeAspectLabelFromValue = (value) => {
    return LIFE_ASPECTS_OPTIONS.filter(option => option.value === value)[0].label;
}

export const getLifeAspectFromValue = (value) => {
    return LIFE_ASPECTS_OPTIONS.filter(option => option.value === value)[0];
}