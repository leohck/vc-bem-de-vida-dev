import React, { useState, useEffect } from "react";
import { Card, Dialog, Select } from "../../../components/ui";
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
import { getStatusObjectFromValue, STATUS_OPTIONS } from "./goal.constant";


function GoalForm() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const { state } = useLocation();
	const { userID } = useUserID();
	const [goalItemID, setGoalItemID] = useState(null);
	
	const [pageTitle, setPageTitle] = useState("");
	const [cardHeader, setCardHeader] = useState("Cadastrar Meta");
	const [wishItem, setWishItem] = useState();
	
	const [goal, setGoal] = useState();
	const [icon, setIcon] = useState();
	const [lifeAspect, setLifeAspect] = useState();
	const [motivation, setMotivation] = useState();
	const [estimatedDeadline, setEstimatedDeadline] = useState();
	const [status, setStatus] = useState();
	const [hasInProgressActions, setHasInProgressActions] = useState(false);
	
	
	const [dialogIsOpen, setIsOpen] = useState(false);
	
	const openDialog = () => {
		setIsOpen(true);
	};
	
	const onDialogClose = (e) => {
		setIsOpen(false);
	};
	
	const onDialogOk = (e) => {
		setIsOpen(false);
	};
	
	const handleStatusChange = (e) => {
		if (e.value === "cancelada" || e.value === "concluida") {
			openDialog();
			setStatus(e);
		} else {
			setStatus(e);
		}
	};
	
	useEffect(() => {
		try {
			const { goalItem } = state;
			if (goalItem) {
				setCardHeader("Alterar Meta");
				setGoal(goalItem.value);
				setIcon(getAchievementFromValue(goalItem.icon));
				setLifeAspect([goalItem.life_aspect]);
				setMotivation(goalItem.motivation);
				setEstimatedDeadline(goalItem.estimated_deadline);
				setStatus(getStatusObjectFromValue(goalItem.status));
				setHasInProgressActions(goalItem.has_in_progress_action);
				setGoalItemID(goalItem.id);
			}
		} catch (e) {
			console.log(e);
		}
		try {
			const { wishItem } = state;
			if (wishItem) {
				setPageTitle("Desejo - " + wishItem.value);
				setGoal(wishItem.value);
				setLifeAspect([wishItem.life_aspect]);
				setIcon(getAchievementFromValue(wishItem.icon));
				setWishItem(wishItem);
			}
		} catch (e) {
			console.log(e);
		}
	}, [state, goalItemID, wishItem]);
	
	const handleSubmitForm = async () => {
		const dlWish = async (wishID) => {
			await deleteWish(wishID).then(
				_ => {
					dispatch(delGoal(wishID));
				}
			);
		};
		try {
			const data = {
				value: goal,
				icon: icon.value,
				life_aspect: lifeAspect.toString(),
				motivation: motivation,
				estimated_deadline: estimatedDeadline,
				status: status.value,
				user: userID
			};
			if (goalItemID !== null) {
				try {
					await putGoal(goalItemID, data).then(
						response => {
							dispatch(updateGoal(response.data));
							toastFeedback("success", "Meta Atualizada");
							navigate("/wish-and-goal");
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
							if (wishItem) {
								dlWish(wishItem.id);
							}
							navigate("/goal/form",
								{
									replace: true,
									state: { goalItem: response.data }
								}
							);
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
			{pageTitle && (
				<h3 className="mb-10">{pageTitle}</h3>
			)}
			<Card
				header={cardHeader}
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
								className="md:w-[400px]"
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
					
					<div className="flex flex-row items-center justify-start">
						<InputLabel label="Aspecto de Vida Relacionado">
							<LifeAspectSegment value={lifeAspect} onChange={setLifeAspect} singleOption />
						</InputLabel>
					</div>
					
					<div>
						<InputLabel label="Motivação">
							<Input
								className="md:w-[600px]"
								type="text"
								name="motivation"
								placeholder="Motivação"
								value={motivation}
								onChange={(e) => setMotivation(e.target.value)}
							/>
						</InputLabel>
					</div>
					<div>
						<InputLabel label="Prazo Estimado">
							<Input
								type="date"
								name="estimated_deadline"
								className="w-[165px]"
								value={estimatedDeadline}
								onChange={(e) => setEstimatedDeadline(e.target.value)}
							/>
						</InputLabel>
					</div>
					<div>
						<InputLabel label="Status da Meta">
							<Select
								className="w-[250px]"
								options={STATUS_OPTIONS}
								placeholder="Status"
								value={status}
								onChange={handleStatusChange}
							/>
						</InputLabel>
					</div>
					{goalItemID !== null && (
						<ActionPlan goalID={goalItemID} />
					)}
				
				</div>
			</Card>
			
			<Dialog
				isOpen={dialogIsOpen}
				onClose={onDialogClose}
				onRequestClose={onDialogClose}
			>
				<h5 className="mb-4">Cuidado!</h5>
				<p>
					Tem certeza que deseja alterar o status da meta?
					Ao mudar para Cancelada ou Concluída, os Planos de
					Ação vínculados serão excluídos e as Ações desvínculadas.
				</p>
				<div className="text-right mt-6">
					<Button
						className="ltr:mr-2 rtl:ml-2"
						variant="plain"
						onClick={onDialogClose}
					>
						Cancelar
					</Button>
					<Button variant="solid" onClick={onDialogOk}>
						Estou Ciente!
					</Button>
				</div>
			</Dialog>
		</div>
	);
}

export default GoalForm;
