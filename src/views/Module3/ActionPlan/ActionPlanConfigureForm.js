import React, { useState, useEffect } from "react";
import { Button, Card } from "../../../components/ui";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useRoutineActionList } from "../../../hooks/useRoutineActionList";
import { toastFeedback } from "../../../utils/actionFeedback";
import { postActionDeadline } from "../../../services/Module3/ActionDeadlineService";
import { addAction } from "../../../store/module3/actionSlice";
import Action from "../Action";
import { linkActionAndPlan } from "../../../services/Module3/ActionService";
import { addActionDeadline } from "../../../store/module3/actionDeadlineSlice";
import { BsArrowLeftCircle, BsArrowUpCircle } from "react-icons/bs";
import useResponsive from "../../../utils/hooks/useResponsive";


function ActionPlanConfigureForm() {
	const { state } = useLocation();
	const { windowWidth } = useResponsive();
	const action_plan_id = state.actionPlanItem.id;
	const dispatch = useDispatch();
	const [actionPlanItem, setActionPlanItem] = useState();
	const { routine_actions_not_done, refreshRoutineActions } = useRoutineActionList();
	
	useEffect(() => {
		refreshRoutineActions();
	}, []);
	
	const handleAddItem = async (item) => {
		await linkActionAndPlan(item.id, action_plan_id).then(
			async response => {
				if (response.status === 200) {
					dispatch(addAction(item));
					toastFeedback("success", "Ação Vinculada");
					await postActionDeadline({
						action: item.id,
						action_plan: action_plan_id
					}).then(
						response => {
							addActionDeadline(response.data);
						}
					);
					window.location.reload();
				}
			}
		);
	};
	
	useEffect(() => {
		try {
			const { actionPlanItem } = state;
			setActionPlanItem(actionPlanItem);
		} catch (e) {
			setActionPlanItem(null);
		}
	}, [state]);
	
	const RoutineActionItem = ({ item }) => {
		return (
			<div key={item.id}
			     className="flex flex-row items-center h-10 justify-between">
				<div className="flex flex-row gap-4 justify-center mt-2">
					<Button
						type="button"
						shape="circle"
						color="blue-500"
						size="sm"
						variant="twoTone"
						icon={<AiOutlinePlusCircle />}
						onClick={() => handleAddItem(item)}
					/>
				</div>
				<h6 className="mt-2">
					{item.value}
				</h6>
			</div>
		);
	};
	
	return (
		<div>
			<div className="flex flex-row items-center justify-center mb-10">
				{actionPlanItem ? (
					<div className="flex flex-col items-center">
						<h3>Plano de Ação</h3>
						<h3>{actionPlanItem.value}</h3>
					</div>
				) : (
					<h3>Plano de Ação</h3>
				)}
			</div>
			<div className="flex flex-col gap-10 justify-center md:flex-row">
				<Action actionPlanID={action_plan_id} />
				<div className="flex flex-col gap-2 h-[600px]">
					<h6>Ações Cadastradas</h6>
					<Card className="overflow-y-auto bg-gray-300 md:h-[600px] md:w-[600px]"
					      bodyClass="grid grid-cols-1 divide-y gap-2"
					>
						{routine_actions_not_done.map(
							item => (
								<RoutineActionItem key={item.id} item={item} />
							)
						)}
					</Card>
				</div>
			</div>
		</div>
	);
}

export default ActionPlanConfigureForm;
