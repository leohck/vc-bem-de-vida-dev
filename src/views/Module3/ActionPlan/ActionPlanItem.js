import React, { useEffect, useState } from "react";
import { Button, Table } from "../../../components/ui";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGoalList } from "../../../hooks/module3/useGoalList";
import { useActionList } from "../../../hooks/useActionList";
import { deleteActionPlan } from "../../../services/Module3/ActionPlanService";
import { delActionPlan } from "../../../store/module3/actionPlanSlice";
import { toastFeedback } from "../../../utils/actionFeedback";
import { getActionDeadline } from "../../../services/Module3/ActionDeadlineService";

const { Tr, Td } = Table;

const getGoalNameByID = (goalID, goalList) => {
	return goalList.filter(option => option.id === goalID)[0];
};

const DeadLine = ({ actionPlanID, actionID }) => {
	const [deadline, setDeadline] = useState();
	
	useEffect(() => {
		async function get_deadline(itemID, actionID) {
			setDeadline(null);
			const response = await getActionDeadline(itemID, actionID);
			if (!ignore) {
				setDeadline(response.data[0]);
			}
		}
		
		let ignore = false;
		get_deadline(actionPlanID, actionID);
		return () => {
			ignore = true;
		};
	}, [actionPlanID, actionID]);
	
	return (
		<p key={actionPlanID + actionID}>{deadline ? deadline.estimated_deadline : "Não Definido"}</p>
	);
};


function ActionPlanItem({ item }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { goals } = useGoalList();
	const { actions } = useActionList(item.id);
	const goalName = getGoalNameByID(item.goal, goals);
	
	const handleDeleteItem = async () => {
		try {
			await deleteActionPlan(item.id).then(
				() => {
					dispatch(delActionPlan(item.id));
					toastFeedback("success",
						"Plano de Ação Deletado");
				}
			);
		} catch (e) {
			console.log(e);
			toastFeedback("danger", "Falha ao deletar");
		}
	};
	
	const handleEditItem = () => {
		navigate("/action-plan/form",
			{ replace: true, state: { actionPlanItem: item } });
	};
	
	return (
		<Tr key={item.id} style={{ textAlign: "center" }}>
			<Td>{item.value}</Td>
			<Td>{goalName ? goalName.value : item.goal}</Td>
			<Td>
				{actions.map(action => (
					<p key={action.id}>{action.value}</p>
				))}
			</Td>
			<Td>
				{actions.map(action => (
					<p key={action.id}>{action.status}</p>
				))}
			</Td>
			<Td>
				{actions.map(action => (
					<DeadLine
						actionPlanID={item.id}
						actionID={action.id} />
				))}
			</Td>
			<Td>
				<div className="flex flex-row gap-4 justify-center">
					<Button
						shape="circle"
						color="red-500"
						size="sm"
						variant="twoTone"
						icon={<MdDeleteForever />}
						onClick={handleDeleteItem}
					/>
					
					<Button
						shape="circle"
						color="blue-500"
						size="sm"
						variant="twoTone"
						icon={<AiOutlineEdit />}
						onClick={handleEditItem}
					/>
				</div>
			</Td>
		</Tr>
	);
}

export default ActionPlanItem;
