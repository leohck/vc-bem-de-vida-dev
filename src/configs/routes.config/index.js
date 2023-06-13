import React from 'react'
import authRoute from './authRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: React.lazy(() =>
            import('views/auto-conhecimento/Dashboard')
        ),
        authority: [],
    },
    {
        key: 'source-incomes',
        path: '/source-incomes',
        component: React.lazy(() => import('views/SourceIncome')),
        authority: [],
    },
    {
        key: 'auto-conhecimento',
        path: '/auto-conhecimento',
        component: React.lazy(() => import('views/auto-conhecimento/Home')),
        authority: [],
    },
    {
        key: 'auto-conhecimento-cadastro',
        path: '/conhecimento/cadastro',
        component: React.lazy(() => import('views/auto-conhecimento/Cadastro')),
        authority: [],
    },
    {
        key: 'circulo',
        path: '/circulo',
        component: React.lazy(() => import('views/Home')),
        authority: [],
    },
    {
        key: 'circulo-social',
        path: '/circulo/social',
        component: React.lazy(() =>
            import('views/auto-conhecimento/circulo/VidaSocial')
        ),
        authority: [],
    },
    {
        key: 'circulo-fisica',
        path: '/circulo/fisica',
        component: React.lazy(() =>
            import('views/auto-conhecimento/circulo/SaudeFisica')
        ),
        authority: [],
    },
    {
        key: 'circulo-profissional',
        path: '/circulo/profissional',
        component: React.lazy(() =>
            import('views/auto-conhecimento/circulo/VidaProfissional')
        ),
        authority: [],
    },
    {
        key: 'circulo-mental',
        path: '/circulo/mental',
        component: React.lazy(() =>
            import('views/auto-conhecimento/circulo/SaudeMental')
        ),
        authority: [],
    },
    {
        key: 'circulo-financeira',
        path: '/circulo/financeira',
        component: React.lazy(() =>
            import('views/auto-conhecimento/circulo/GestaoFinanceira')
        ),
        authority: [],
    },
    {
        key: 'gestao-rotina-dashboard',
        path: '/gestao-rotina/dashboard',
        component: React.lazy(() => import('views/gestao-rotina/dashboard')),
        authority: [],
    },
    {
        key: 'gestao-rotina-form-rotina',
        path: '/formulario/rotina',
        component: React.lazy(() =>
            import('views/gestao-rotina/formulario-rotina/index')
        ),
        authority: [],
    },
    {
        key: 'gestao-rotina-form-pagamento',
        path: '/formulario/pagamento',
        component: React.lazy(() =>
            import('views/gestao-rotina/formulario-pagamento-rotina')
        ),
        authority: [],
    },
    {
        key: 'routine-actions',
        path: '/routine/actions',
        component: React.lazy(() => import('views/RoutineAction')),
        authority: [],
    },
    {
        key: 'routine-payments',
        path: '/routine/payments',
        component: React.lazy(() => import('views/RoutinePayment')),
        authority: [],
    },
]
