import {
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE
} from 'constants/navigation.constant'

const navigationConfig = [
    {
        key: 'home',
        path: '/home',
        title: 'Tela Inicial',
        translateKey: 'nav.home',
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
                key: 'dashboard',
                path: '/dashboard',
                title: 'Dashboard',
                translateKey: '',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: []
            },
        ]
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
                subMenu: []
            },
            {
                key: 'circulo-fisica',
                path: '/circulo/fisica',
                title: 'Saude Fisica',
                translateKey: '',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: []
            },
            {
                key: 'circulo-profissional',
                path: '/circulo/profissional',
                title: 'Vida Profissional',
                translateKey: '',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: []
            },
            {
                key: 'circulo-mental',
                path: '/circulo/mental',
                title: 'Saude Mental',
                translateKey: '',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: []
            },
            {
                key: 'circulo-financeira',
                path: '/circulo/financeira',
                title: 'Gestao Financeira',
                translateKey: '',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: []
            }
        ]
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
                key: 'gestao-rotina-dashboard',
                path: '/gestao-rotina/dashboard',
                title: 'Dashboard',
                translateKey: '',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: []
            },
            {
                key: 'source-incomes',
                path: '/source-incomes',
                title: 'Fontes de Renda',
                translateKey: '',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: []
            },
            {
                key: 'routine-actions',
                path: '/routine/actions',
                title: 'Ações de Rotina',
                translateKey: '',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: []
            },
            {
                key: 'routine-payments',
                path: '/routine/payments',
                title: 'Pagamentos de Rotina',
                translateKey: '',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: []
            },
            {
                key: 'gestao-rotina-form-rotina',
                path: '/formulario/rotina',
                title: 'Cadastrar Ação de Rotina',
                translateKey: '',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: []
            },
            {
                key: 'gestao-rotina-form-pagamento',
                path: '/formulario/pagamento',
                title: 'Cadastrar Pagamento de Rotina',
                translateKey: '',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: []
            }
        ]
    },
]

export default navigationConfig