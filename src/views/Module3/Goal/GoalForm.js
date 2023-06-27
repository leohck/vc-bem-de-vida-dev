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
import { useDispatch, useSelector } from "react-redux";
import { toastFeedback } from "../../../utils/actionFeedback";
import { addGoal, fetchGoals } from "../../../store/module3/goalSlice";
import { updateWish } from "../../../store/module3/wishSlice";


function GoalForm() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { state } = useLocation();

	const [cardHeader, setCardHeader] = useState("");
	const [wishItem, setWishItem] = useState();


	const [goal, setGoal] = useState();
	const [icon, setIcon] = useState();
	const [motivation, setMotivation] = useState();
	const [estimatedDeadline, setEstimatedDeadline] = useState();
	const [actionsPlans, setActionsPlans] = useState([]);

	const [currentGoal, setCurrentGoal] = useState();
	const goals = useSelector(state => state.module3.goalSlice)

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
		if (wishItem) {
			dispatch(fetchGoals());
		}
	}, [wishItem, currentGoal])

	const handleSubmitForm = async () => {
		try {
			const data = {
				wish_id: wishItem.id,
				id: 1,
				value: goal,
				icon: icon.value,
				estimated_deadline: estimatedDeadline,
				action_plans: actionsPlans
			};
			try {
				// await postWish(data).then(
				// 	response => {
				// 		dispatch(addWish(response.data));
				// 		toastFeedback("success", "Meta Cadastrada");
				// 	}
				// )
				dispatch(addGoal(data));
				dispatch(updateWish({...wishItem, configured: true}))
				navigate("/wish", { replace: true });
				toastFeedback("success", "Meta Cadastrada");
			} catch (e) {
				console.log(e);
				toastFeedback("danger", "Falha ao Cadastrar Meta");
			}
		} catch (e) {
			console.log(e);
			toastFeedback("danger", "Falha ao Cadastrar Meta - Preencha todos os campos do formulario");
		}
	};

	return (
		<div>
			<h3 className="mb-10">{cardHeader}</h3>
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
					<ActionPlan actionPlanList={actionsPlans}
					            setActionPlanList={setActionsPlans}
					/>
				</div>
			</Card>
		</div>
	);
}

export default GoalForm;
