import {
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from 'constants/navigation.constant'

const navigationConfig = [
    {
        key: 'home',
        path: '/home',
        title: 'Tela Inicial',
        translateKey: '',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'auto-conhecimento',
        path: '/auto-conhecimento',
        title: 'Cadastro',
        translateKey: 'nav.auto_conhecimento',
        icon: 'auto_conhecimento',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'user-info',
                path: '/userinfo',
                title: 'Informações',
                translateKey: '',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'skills-achievements',
                path: '/skills-achievements',
                title: 'Habilidades e Conquistas',
                translateKey: '',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ],
    },
    {
        key: 'circulo',
        path: '/circulo',
        title: 'Satisfação Pessoal',
        translateKey: '',
        icon: 'auto_conhecimento_cadastro_circulo',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'circulo-social',
                path: '/circulo/social',
                title: 'Vida Social',
                translateKey: '',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'circulo-fisica',
                path: '/circulo/fisica',
                title: 'Saude Fisica',
                translateKey: '',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'circulo-profissional',
                path: '/circulo/profissional',
                title: 'Vida Profissional',
                translateKey: '',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'circulo-mental',
                path: '/circulo/mental',
                title: 'Saude Mental',
                translateKey: '',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'circulo-financeira',
                path: '/circulo/financeira',
                title: 'Gestao Financeira',
                translateKey: '',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ],
    },
    {
        key: 'gestao-rotina',
        path: '/gestao-rotina',
        title: 'Mapeamento de Rotina e Recursos',
        translateKey: '',
        icon: 'gestao_rotina',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'routine-dashboard',
                path: '/routine/dashboard',
                title: 'Painel - Sua Rotina',
                translateKey: '',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'source-incomes',
                path: '/source-incomes',
                title: 'Fontes de Renda',
                translateKey: '',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'routine-actions',
                path: '/routine/actions',
                title: 'Ações Cadastradas',
                translateKey: '',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'routine-payments',
                path: '/routine/payments',
                title: 'Pagamentos de Rotina',
                translateKey: '',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            }
        ],
    },
    {
        key: 'metas-projetos',
        path: '/metas-projetos',
        title: 'Metas e Projetos',
        translateKey: '',
        icon: 'metas_projetos',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'dashboard3',
                path: '/dashboard3',
                title: 'Painel',
                translateKey: '',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'wish-and-goal',
                path: '/wish-and-goal',
                title: 'Desejos / Metas',
                translateKey: '',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'action-plan-list',
                path: '/action-plan/list',
                title: 'Planos de Ação',
                translateKey: '',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            }
        ],
    }
]

export default navigationConfig
