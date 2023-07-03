import React from "react";
import authRoute from "./authRoute";

export const publicRoutes = [...authRoute];

const module3Routes = [
	{
		key: "wish-and-goal",
		path: "/wish-and-goal",
		component: React.lazy(() =>
			import("views/Module3/WishAndGoal")
		),
		authority: []
	},
	{
		key: "wish",
		path: "/wish",
		component: React.lazy(() =>
			import("views/Module3/Wish")
		),
		authority: []
	},
	{
		key: "goal",
		path: "/goal",
		component: React.lazy(() =>
			import("views/Module3/Goal/GoalList")
		),
		authority: []
	},
	{
		key: "goal-form",
		path: "/goal/form",
		component: React.lazy(() =>
			import("views/Module3/Goal/GoalForm")
		),
		authority: []
	},
	{
		key: "action",
		path: "/action",
		component: React.lazy(() =>
			import("views/auto-conhecimento/Dashboard")
		),
		authority: []
	},
	{
		key: "action-config-form",
		path: "/action-config-form",
		component: React.lazy(() =>
			import("views/Module3/Action/ActionConfigureForm")
		),
		authority: []
	},
	{
		key: "action-plan",
		path: "/action-plan",
		component: React.lazy(() =>
			import("views/auto-conhecimento/Dashboard")
		),
		authority: []
	},
	{
		key: "action-plan-form",
		path: "/action-plan/form",
		component: React.lazy(() =>
			import("views/Module3/ActionPlan/ActionPlanConfigureForm")
		),
		authority: []
	},
	{
		key: "action-plan-list",
		path: "/action-plan/list",
		component: React.lazy(() =>
			import("views/Module3/ActionPlan/ActionPlanView")
		),
		authority: []
	},
]

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
	},
	...module3Routes
];
