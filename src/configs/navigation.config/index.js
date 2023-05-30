import {
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE
} from 'constants/navigation.constant'

const navigationConfig = [
    {
        key: 'home',
        path: '/home',
        title: 'Home',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'auto-conhecimento',
        path: '/auto-conhecimento',
        title: 'Auto-Conhecimento',
        translateKey: 'nav.auto_conhecimento',
        icon: 'auto_conhecimento',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'auto-conhecimento-cadastro',
                path: '/conhecimento/cadastro',
                title: 'Cadastro Inicial',
                translateKey: 'nav.auto_conhecimento_cadastro',
                icon: 'auto_conhecimento_cadastro',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: []
            },
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
            {
                key: 'dashboard2',
                path: '/dashboard2',
                title: 'Dashboard 2',
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
        title: 'Circulos da Vida',
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
]

export default navigationConfig