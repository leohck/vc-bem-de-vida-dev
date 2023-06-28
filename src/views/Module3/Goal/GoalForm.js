import React, { useState, useEffect } from "react";
import { Card, Select } from "../../../components/ui";
import { Input, Button } from "components/ui";
import ActionPlan from "../ActionPlan";
import {
	conquistasOptions,
	getAchievementFromValue
} from "../../auto-conhecimento/form.options";
import { useLocation, useNavigate } from "react-router-dom";
import { InputLabel } from "../../../components/new";
import { useDispatch } from "react-redux";
import { toastFeedback } from "../../../utils/actionFeedback";
import { addGoal, delGoal, updateGoal } from "../../../store/module3/goalSlice";
import { postGoal, putGoal } from "../../../services/Module3/GoalService";
import { deleteWish } from "../../../services/Module3/WishService";
import { useUserID } from "../../../hooks/useUserID";
import LifeAspectSegment from "../../gestao-rotina/components/LifeAspectSegment";
import { useActionPlanList } from "../../../hooks/useActionPlanList";


function GoalForm() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { state } = useLocation();
	const { userID } = useUserID();
	const [cardHeader, setCardHeader] = useState("");
	const [wishItem, setWishItem] = useState();
	const [goalItem, setGoalItem] = useState();
	const [goal, setGoal] = useState();
	const [icon, setIcon] = useState();
	const [lifeAspect, setLifeAspect] = useState();
	const [motivation, setMotivation] = useState();
	const [estimatedDeadline, setEstimatedDeadline] = useState();
	
	const goal_id = state.goalItem.id;
	const { action_plans } = useActionPlanList(goal_id);
	const [actionsPlans, setActionsPlans] = useState([]);
	
	useEffect(() => {
		try {
			const { wishItem } = state;
			setCardHeader("Desejo - " + wishItem.value);
			setGoal(wishItem.value);
			setIcon(getAchievementFromValue(wishItem.icon));
			setWishItem(wishItem);
		} catch (e) {
			setWishItem(null);
		}
	}, [state]);
	
	useEffect(() => {
		try {
			const { goalItem } = state;
			setGoalItem(goalItem);
			setGoal(goalItem.value);
			setIcon(getAchievementFromValue(goalItem.icon));
			setLifeAspect([goalItem.life_aspect]);
			setMotivation(goalItem.motivation);
			setEstimatedDeadline(goalItem.estimated_deadline);
			if (action_plans) {
				setActionsPlans(action_plans);
			}
		} catch (e) {
			setGoalItem(null);
		}
	}, [state]);
	
	const handleSubmitForm = async () => {
		const dlWish = async (wishID) => {
			await deleteWish(wishID).then(
				delGoal(wishID)
			);
		};
		try {
			const data = {
				value: goal,
				icon: icon.value,
				life_aspect: lifeAspect.toString(),
				motivation: motivation,
				estimated_deadline: estimatedDeadline,
				user: userID
				// action_plans: actionsPlans
			};
			if (goalItem) {
				try {
					await putGoal(goalItem.id, data).then(
						response => {
							dispatch(updateGoal(response.data));
							toastFeedback("success", "Meta Atualizada");
							navigate("/wish-and-goal", { replace: true });
						}
					);
				} catch (e) {
					console.log(e);
					toastFeedback("danger", "Falha ao Editar Meta");
				}
			} else {
				try {
					await postGoal(data).then(
						response => {
							dispatch(addGoal(response.data));
							toastFeedback("success", "Meta Cadastrada");
							navigate("/wish-and-goal", { replace: true });
							if (wishItem) {
								dlWish(wishItem.id);
							}
						}
					);
				} catch (e) {
					console.log(e);
					toastFeedback("danger", "Falha ao Cadastrar Meta");
				}
			}
		} catch (e) {
			console.log(e);
			toastFeedback("danger", "Falha ao Cadastrar Meta - Preencha todos os campos do formulario");
		}
	};
	
	return (
		<div>
			{cardHeader && (
				<h3 className="mb-10">{cardHeader}</h3>
			)}
			<Card
				header="Cadastrar Meta"
				footer={
					<div className="flex justify-items-end">
						<Button
							size="sm"
							variant="solid"
							onClick={handleSubmitForm}
						>
							Salvar
						</Button>
					</div>
				}
			>
				<div className="flex flex-col gap-4">
					<div className="flex flex-row gap-4">
						<InputLabel
							label="Meta"
						>
							<Input
								className="w-[400px]"
								type="text"
								name="value"
								placeholder="Meta"
								value={goal}
								onChange={(e) => setGoal(e.target.value)}
							/>
						</InputLabel>
						<InputLabel label="Icone">
							<Select placeholder="Icone"
							        className="max-w-[100px] h-10"
							        isSearchable={false}
							        options={conquistasOptions}
							        value={icon}
							        onChange={(e) => setIcon(e)}
							/>
						</InputLabel>
					</div>
					
					<InputLabel label="Aspecto de Vida Relacionado">
						<LifeAspectSegment value={lifeAspect} onChange={setLifeAspect} singleOption />
					</InputLabel>
					
					<InputLabel label="Motivação">
						<Input
							className="w-[600px]"
							type="text"
							name="motivation"
							placeholder="Motivação"
							value={motivation}
							onChange={(e) => setMotivation(e.target.value)}
						/>
					</InputLabel>
					<InputLabel label="Prazo Estimado">
						<Input
							type="date"
							name="estimated_deadline"
							className="w-[165px]"
							value={estimatedDeadline}
							onChange={(e) => setEstimatedDeadline(e.target.value)}
						/>
					</InputLabel>
					<ActionPlan
						goalID={goalItem ? goalItem.id : null}
						actionPlanList={actionsPlans}
						setActionPlanList={setActionsPlans}
					/>
				</div>
			</Card>
		</div>
	);
}

export default GoalForm;
