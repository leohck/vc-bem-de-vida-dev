import React, { useEffect, useState } from "react";
import { Button, Table } from "../../../components/ui";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteActionPlan } from "../../../services/Module3/ActionPlanService";
import { delActionPlan } from "../../../store/module3/actionPlanSlice";
import { toastFeedback } from "../../../utils/actionFeedback";
import { getAchievementIconFromValue } from "../../auto-conhecimento/form.options";

const { Tr, Td } = Table;


function ActionPlanItem({ item }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	
	const handleDeleteItem = async () => {
		try {
			await deleteActionPlan(item.id).then(
				() => {
					dispatch(delActionPlan(item.id));
					toastFeedback("success",
						"Plano de Ação Deletado");
					window.location.reload();
				}
			);
		} catch (e) {
			console.log(e);
			toastFeedback("danger", "Falha ao deletar");
		}
	};
	
	const handleEditItem = () => {
		navigate("/action-plan/form",
			{ state: { actionPlanItem: item } });
	};
	
	return (
		<Tr key={item.id} style={{ textAlign: "center" }}>
			<Td>{item.value}</Td>
			<Td>
				<div className="flex flex-row gap-2 justify-center items-center">
					{getAchievementIconFromValue(item.goal.icon)}
					{item.goal.value}
				</div>
			</Td>
			<Td>
				{item.goal.status}
			</Td>
			<Td>
				{item.actions.length}
			</Td>
			<Td>
				<div className="flex flex-row gap-4 justify-center">
					<Button
						shape="circle"
						color="blue-500"
						size="sm"
						variant="twoTone"
						icon={<AiOutlineEdit />}
						onClick={handleEditItem}
					/>
					<Button
						shape="circle"
						color="red-500"
						size="sm"
						variant="twoTone"
						icon={<MdDeleteForever />}
						onClick={handleDeleteItem}
					/>
				</div>
			</Td>
		</Tr>
	);
}

export default ActionPlanItem;
