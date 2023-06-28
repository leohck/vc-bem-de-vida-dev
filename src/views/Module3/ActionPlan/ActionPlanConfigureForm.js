import React, { useState, useEffect } from "react";
import { Button, Card } from "../../../components/ui";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import store from "../../../store";
import { fetchRoutineActions } from "../../../store/userinfo/routineActionSlice";
import Action from "../Action";
import { useLocation } from "react-router-dom";


function ActionPlanConfigureForm() {
	const {state} = useLocation();
	const action_plan_id = state.actionPlanItem.id;
	
	const dispatch = useDispatch();
	const [actionPlanItem, setActionPlanItem] = useState();

	const [actionList, setActionList] = useState([]);
	const routine_actions = useSelector(
		state => state.userinfo.routineActionSlice
	);
	useEffect(() => {
		const { auth } = store.getState();
		const user_id = auth.user.user_info_id;
		dispatch(fetchRoutineActions({ user_id: user_id }));
	}, []);
	
	const handleAddItem = (item) => {
		
		setActionList([
			...actionList,
			{
				id: item.id,
				value: item.value
			}
		]);
	};

	useEffect(() => {
		try {
			const { actionPlanItem } = state;
			setActionPlanItem(actionPlanItem);
		} catch (e) {
			setActionPlanItem();
		}
	}, [state]);

	const RoutineActionItem = ({ item }) => {
		return (
			<div key={item.id}
			     className="flex flex-row items-center h-10 justify-between">
				<h6 className="mt-2">
					{item.value}
				</h6>

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
			</div>
		);
	};

	return (
		<div>
			<div className="flex flex-row items-center justify-center mb-10">
				{actionPlanItem ? (
					<h3>Plano de Ação - {actionPlanItem.value}</h3>
				) : (
					<h3>Plano de Ação</h3>
				)}
			</div>
			<div className="flex flex-col gap-10">
				<div className="flex flex-col gap-2">
					<h6>Ações Cadastradas</h6>
					<Card className="max-h-[400px] overflow-y-auto"
					      bodyClass="grid grid-cols-1 divide-y gap-2"
						// bodyClass="flex flex-col gap-4 divide-y"
					>
						{routine_actions.routine_actions.map(
							item => (
								<RoutineActionItem key={item.id} item={item} />
							)
						)}
					</Card>
				</div>
				<Action
					actionPlanID={action_plan_id}
					actionList={actionList} setActionList={setActionList} />
			</div>
		</div>
	);
}

export default ActionPlanConfigureForm;