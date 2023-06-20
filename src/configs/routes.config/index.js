import React from "react";
import authRoute from "./authRoute";

export const publicRoutes = [...authRoute];

export const protectedRoutes = [
	{
		key: "home",
		path: "/home",
		component: React.lazy(() =>
			import("views/auto-conhecimento/Dashboard")
		),
		authority: []
	},
	{
		key: "source-incomes",
		path: "/source-incomes",
		component: React.lazy(() => import("views/SourceIncome")),
		authority: []
	},
	{
		key: "skills-achievements",
		path: "/skills-achievements",
		component: React.lazy(() => import("views/SkillAndAchievement")),
		authority: []
	},
	{
		key: "user-info",
		path: "/userinfo",
		component: React.lazy(() => import("views/auto-conhecimento/Cadastro")),
		authority: []
	},
	{
		key: "circulo",
		path: "/circulo",
		component: React.lazy(() => import("views/Home")),
		authority: []
	},
	{
		key: "circulo-social",
		path: "/circulo/social",
		component: React.lazy(() =>
			import("views/auto-conhecimento/circulo/VidaSocial")
		),
		authority: []
	},
	{
		key: "circulo-fisica",
		path: "/circulo/fisica",
		component: React.lazy(() =>
			import("views/auto-conhecimento/circulo/SaudeFisica")
		),
		authority: []
	},
	{
		key: "circulo-profissional",
		path: "/circulo/profissional",
		component: React.lazy(() =>
			import("views/auto-conhecimento/circulo/VidaProfissional")
		),
		authority: []
	},
	{
		key: "circulo-mental",
		path: "/circulo/mental",
		component: React.lazy(() =>
			import("views/auto-conhecimento/circulo/SaudeMental")
		),
		authority: []
	},
	{
		key: "circulo-financeira",
		path: "/circulo/financeira",
		component: React.lazy(() =>
			import("views/auto-conhecimento/circulo/GestaoFinanceira")
		),
		authority: []
	},
	{
		key: "routine-dashboard",
		path: "/routine/dashboard",
		component: React.lazy(() => import("views/gestao-rotina/dashboard")),
		authority: []
	},
	{
		key: "routine-action-form",
		path: "/routine/action/form",
		component: React.lazy(() =>
			import("views/RoutineAction/RoutineActionForm")
		),
		authority: []
	},
	{
		key: "routine-payment-form",
		path: "/routine/payment/form",
		component: React.lazy(() =>
			import("views/RoutinePayment/RoutinePaymentForm")
		),
		authority: []
	},
	{
		key: "routine-actions",
		path: "/routine/actions",
		component: React.lazy(() => import("views/RoutineAction")),
		authority: []
	},
	{
		key: "routine-payments",
		path: "/routine/payments",
		component: React.lazy(() => import("views/RoutinePayment")),
		authority: []
	}
];
