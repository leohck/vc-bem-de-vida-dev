import React, {
	useState,
	useCallback,
	useEffect
} from "react";
import { Input, Button, Card, Select } from "components/ui";

import LifeAspectSegment from "../gestao-rotina/components/LifeAspectSegment";
import WeekdaySegment from "./components/WeekdaySegment";
import EnergyLevelSegment from "./components/EnergyLevelSegment";
import ActionMoneySegment from "./components/ActionMoneySegment";
import { useDispatch } from "react-redux";
import { addNewAction } from "store/userinfo/routineActionSlice";
import { getRoutineAction, getWeeklyHoursSpent, postRoutineAction } from "../../services/RoutineActionService";
import { useLocation, useNavigate } from "react-router-dom";
import {
	getStatusObjectFromValue,
	STATUS_OPTIONS, STATUS_OPTIONS_DISABLED
} from "../../constants/action.constant";
import { useUserID } from "../../hooks/useUserID";
import { toastFeedback } from "../../utils/actionFeedback";

const RoutineForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { state } = useLocation();
	const { userID } = useUserID();
	const [user_info_id, setUserInfoID] = useState(userID);
	const [itemID, setItemID] = useState(null);
	
	const [lifeAspect, setLifeAspect] = useState([]);
	const [weekDay, setWeekDay] = useState([]);
	const [energyLevel, setEnergyLevel] = useState([]);
	const [actionMoney, setActionMoney] = useState([]);
	const [actionValue, setActionValue] = useState();
	const [timeSpent, setTimeSpent] = useState();
	const [actionCost, setActionCost] = useState();
	const [weeklyHoursSpentCount, setWeeklyHoursSpentCount] = useState([
		0, 0, 0, 0, 0, 0, 0
	]);
	const [status, setStatus] = useState([]);
	const [currentItem, setCurrentItem] = useState({});
	const [title, setTitle] = useState("Cadastrar Ação de Rotina");
	
	
	useEffect(() => {
		try {
			const { itemID } = state;
			setItemID(itemID);
		} catch (e) {
			setItemID(null);
		}
	}, [state]);
	
	useEffect(() => {
		const get_ra = async () => {
			if (itemID) {
				await getRoutineAction(itemID).then(
					response => {
						setCurrentItem(response.data);
						setTitle("Configurar Ação");
						const action_money = [];
						if (response.data.action_generate_money) {
							action_money.push("1");
						}
						if (response.data.action_cost_money) {
							action_money.push("0");
						}
						setActionValue(response.data.value);
						setTimeSpent(response.data.time_spent);
						try {
							setLifeAspect(response.data.life_aspect.split(","));
						} catch (e) {
							setLifeAspect([]);
						}
						try {
							setWeekDay(response.data.days_of_week.split(","));
						} catch (e) {
							setWeekDay([]);
						}
						setEnergyLevel([response.data.energy_spent.toString()]);
						setActionMoney(action_money);
						setActionCost(response.data.action_cost);
						let days_of_week = [];
						try {
							days_of_week = response.data.days_of_week.split(",");
						} catch (e) {
							days_of_week = [];
						}
						const time_spent = parseInt(response.data.time_spent);
						setStatus(getStatusObjectFromValue(response.data.status));
						const get_wh = async () => {
							try {
								if (user_info_id) {
									await getWeeklyHoursSpent(user_info_id).then(
										response => {
											let weekly_hours = response.data.weekly_hours_spent;
											for (let day of days_of_week) {
												let current_day = parseInt(day);
												let hours_per_day_count = weekly_hours[current_day];
												weekly_hours[current_day] = hours_per_day_count - time_spent;
											}
											setWeeklyHoursSpentCount(weekly_hours);
										}
									);
								}
							} catch (e) {
								console.log(e);
							}
						};
						get_wh();
					}
				);
			} else {
				const get_wh = async () => {
					try {
						if (user_info_id) {
							await getWeeklyHoursSpent(user_info_id).then(
								response => {
									setWeeklyHoursSpentCount(response.data.weekly_hours_spent);
								}
							);
						}
					} catch (e) {
						console.log(e);
					}
				};
				get_wh();
			}
		};
		get_ra();
	}, [itemID, user_info_id]);
	
	const handleLifeAspectChange = useCallback((val) => {
		setLifeAspect(val);
	}, []);
	
	const handleWeekDayChange = useCallback((val) => {
		setWeekDay(val);
	}, []);
	
	const handleEnergyLevelChange = useCallback((val) => {
		setEnergyLevel(val);
	}, []);
	
	const handleActionMoneyChange = useCallback((val) => {
		setActionMoney(val);
	}, []);
	
	const addNewRoutineAction = async (data) => {
		try {
			const resp = await postRoutineAction(data, itemID);
			if (resp.data) {
				if (itemID) {
					data.id = itemID;
				}
				dispatch(addNewAction(data));
				if (resp.data.action_type === "rotina") {
					toastFeedback("success", "Rotina Atualizada");
					navigate("/routine/actions");
				} else {
					toastFeedback("success", "Plano Atualizado");
					navigate("/action-plan/form", { state: { actionPlanItem: resp.data.action_plan_info } });
				}
			}
		} catch (errors) {
			console.log(errors);
		}
	};
	
	const handleFormSubmit = () => {
		const action_generate_money = actionMoney.includes("1");
		const action_cost_money = actionMoney.includes("0");
		const action_cost = action_cost_money ? actionCost : 0;
		let data;
		try {
			data = {
				user: user_info_id,
				value: actionValue,
				life_aspect: lifeAspect.toString(),
				time_spent: timeSpent,
				days_of_week: weekDay.toString(),
				energy_spent: energyLevel.toString(),
				action_cost: action_cost,
				action_generate_money: action_generate_money,
				action_cost_money: action_cost_money,
				status: status.value,
				configured: true
			};
		} catch (e) {
			console.log(e);
			data = {
				user: user_info_id,
				value: actionValue,
				life_aspect: lifeAspect.toString(),
				time_spent: timeSpent,
				days_of_week: weekDay.toString(),
				energy_spent: energyLevel.toString(),
				action_cost: action_cost,
				action_generate_money: action_generate_money,
				action_cost_money: action_cost_money,
				configured: true
			};
		}
		for (let day of weekDay) {
			let hours_addition = parseInt(data.time_spent);
			let hours_per_day_count = weeklyHoursSpentCount[parseInt(day)];
			if ((hours_per_day_count + hours_addition) > 24) {
				alert("Você excedeu o máximo de horas permitidas em um dia (24 horas), revise seu cadastro!");
				return;
			}
		}
		addNewRoutineAction(data);
	};
	
	return (
		<div>
			<div className="mb-8 grid justify-items-center">
				<h3>{title}</h3>
			</div>
			
			<Card
				footer={
					<div className="flex justify-items-end">
						<Button
							size="sm"
							variant="solid"
							onClick={handleFormSubmit}
						>
							Salvar
						</Button>
					</div>
				}
			>
				<div className="flex flex-col items-center md:flex-row">
					<p className="font-bold text-lg">Ação de Rotina: </p>
					<Input
						className="max-w-sm md:ml-16"
						placeholder="Nome da Ação de Rotina"
						name="routine_action"
						value={actionValue}
						onChange={(e) => {
							setActionValue(e.target.value);
						}}
					/>
				</div>
				
				<div className="flex flex-col mt-10 items-center md:items-start">
					<p className="font-bold text-base text-center md:text-lg">
						Aspecto de Vida Influenciado pela Ação:
					</p>
					<LifeAspectSegment
						value={lifeAspect}
						onChange={handleLifeAspectChange}
					/>
				</div>
				
				<div className="flex flex-col items-center mt-10 md:flex-row">
					<p className="font-bold text-base text-center md:text-lg">
						Quantas horas / dia são necessárias para esta ação:
					</p>
					<Input
						className="max-w-sm md:ml-16"
						name="time_spent"
						value={timeSpent}
						onChange={(e) => {
							setTimeSpent(e.target.value);
						}}
						type="number"
						step={0.5}
						min={1}
						max={24}
						placeholder="Quantas horas são necessárias"
					/>
				</div>
				
				<div className="flex flex-col mt-10 items-center md:items-start">
					<p className="font-bold text-base text-center md:text-lg">
						Em quais dias da semana esta ação é executada?{" "}
					</p>
					<WeekdaySegment
						value={weekDay}
						onChange={handleWeekDayChange}
						weeklyHoursSpentCount={weeklyHoursSpentCount}
					/>
				</div>
				
				<div className="flex flex-col mt-10 items-center md:items-start">
					<p className="font-bold text-base text-center md:text-lg">
						Considerando a escala abaixo, como você classifica o
						nível de energia (esforço/atenção) despendido nesta
						ação?{" "}
					</p>
					<EnergyLevelSegment
						value={energyLevel}
						onChange={handleEnergyLevelChange}
					/>
				</div>
				
				<div className="flex flex-col mt-10 items-center md:flex-row md:items-start">
					<div className="flex flex-col">
						<p className="font-bold text-base text-center md:text-lg">Esta Ação?</p>
						<ActionMoneySegment
							value={actionMoney}
							onChange={handleActionMoneyChange}
						/>
					</div>
					{actionMoney.includes("0") ? (
						<div className="flex flex-col items-center mt-10 md:ml-16 md:mt-0">
							<p className="font-bold text-base text-center md:text-lg">
								Quanto por mês é gasto com esta ação?{" "}
							</p>
							<Input
								className="max-w-sm"
								name="action_cost"
								value={actionCost}
								onChange={(e) => {
									setActionCost(e.target.value);
								}}
								type="number"
								prefix="R$"
							/>
						</div>
					) : null}
				</div>
				{currentItem.action_type === "plano" && currentItem.configured &&
					(
						<div className="flex flex-col gap-2 items-center mt-10 md:flex-row">
							<p className="font-bold text-base text-center md:text-lg">
								Status da Ação:
							</p>
							<Select
								className="w-[250px]"
								options={STATUS_OPTIONS}
								placeholder="Status"
								value={status}
								onChange={setStatus}
							/>
						</div>
					)
				}
			</Card>
		</div>
	);
};

export default RoutineForm;
