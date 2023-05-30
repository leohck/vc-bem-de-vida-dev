import React from 'react'
import authRoute from './authRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: React.lazy(() => import('views/Home')),
        authority: [],
    },
    {
        key: 'dashboard',
        path: '/dashboard',
        component: React.lazy(() => import('views/auto-conhecimento/Dashboard')),
        authority: [],
    },
    {
        key: 'dashboard2',
        path: '/dashboard2',
        component: React.lazy(() => import('views/auto-conhecimento/Dashboard2')),
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
        component: React.lazy(() => import('views/auto-conhecimento/circulo/VidaSocial')),
        authority: [],
    },
    {
        key: 'circulo-fisica',
        path: '/circulo/fisica',
        component: React.lazy(() => import('views/auto-conhecimento/circulo/SaudeFisica')),
        authority: [],
    },
    {
        key: 'circulo-profissional',
        path: '/circulo/profissional',
        component: React.lazy(() => import('views/auto-conhecimento/circulo/VidaProfissional')),
        authority: [],
    },
    {
        key: 'circulo-mental',
        path: '/circulo/mental',
        component: React.lazy(() => import('views/auto-conhecimento/circulo/SaudeMental')),
        authority: [],
    },
    {
        key: 'circulo-financeira',
        path: '/circulo/financeira',
        component: React.lazy(() => import('views/auto-conhecimento/circulo/GestaoFinanceira')),
        authority: [],
    },
]
