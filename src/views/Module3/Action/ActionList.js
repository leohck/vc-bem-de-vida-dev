import React, { useEffect, useState } from "react";
import { Button, Card, Input, Table } from "../../../components/ui";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineCheck, AiOutlineSetting } from "react-icons/ai";
import { useActionList } from "../../../hooks/useActionList";
import { delAction } from "../../../store/module3/actionSlice";
import { useDispatch } from "react-redux";
import { toastFeedback } from "../../../utils/actionFeedback";
import { useActionDeadlineList } from "../../../hooks/useActionDeadlineList";
import { useRoutineActionByPlanList } from "../../../hooks/useRoutineActionByPlanList";
import { deleteActionDeadline, putActionDeadline } from "../../../services/Module3/ActionDeadlineService";
import { deleteAction } from "../../../services/Module3/ActionService";

const { Tr, Td, THead, TBody } = Table;

function ActionList({ actionPlanID }) {
	const dispatch = useDispatch();
	const { actions, refreshActionList } = useActionList(actionPlanID);
	const { routine_actions, refreshRoutineActionList } = useRoutineActionByPlanList(actionPlanID);
	const { action_deadlines, refreshActionDeadlineList } = useActionDeadlineList(actionPlanID);
	const [raList, setRaList] = useState([]);
	
	const getActionDeadline = (actionID) => {
		const action = action_deadlines.filter(
			(el) => el.action === actionID
		)[0];
		if (action) {
			return action.estimated_deadline;
		} else {
			return "2024-01-01";
		}
	};
	
	useEffect(() => {
		if (actionPlanID) {
			refreshActionList();
			refreshActionDeadlineList();
			setRaList(routine_actions)
		}
	}, [actionPlanID]);
	
	const handleDeleteItem = async (item) => {
		// await deleteActionDeadline(item.id).then(
		// 	() => {
		// 	}
		// );
		dispatch(delAction(item.id));
		setRaList(raList.filter(
			(el) => el.id !== item.id
		));
		toastFeedback("warning", "Ação Excluida");
	};
	
	const handleConfigureItem = () => {
	
	};
	
	const ActionPlanItem = ({ item }) => {
		const [estimatedDeadline, setEstimatedDeadline] = useState(getActionDeadline(item.id));
		const handleSaveItem = async (item) => {
		
		};
		return (
			<Tr key={item.id} style={{ textAlign: "center" }}>
				<Td className="flex flex-row gap-2 items-center justify-center">
					<h6 className="mt-2">
						{item.value}
					</h6>
				</Td>
				<Td>
					<Input
						type="date"
						name="estimated_deadline"
						className="w-[165px]"
						value={estimatedDeadline}
						onChange={(e) => setEstimatedDeadline(e.target.value)}
						onBlur={() => {
							alert(estimatedDeadline);
						}}
					/>
				</Td>
				<Td>
					<div className="flex flex-row gap-4 justify-center mt-2">
						<Button
							shape="circle"
							color="green-500"
							size="sm"
							variant="twoTone"
							icon={<AiOutlineCheck />}
							onClick={() => handleSaveItem(item)}
						/>
						
						<Button
							type="button"
							shape="circle"
							color="blue-500"
							size="sm"
							variant="twoTone"
							icon={<AiOutlineSetting />}
							onClick={() => handleConfigureItem(item)}
						/>
						
						<Button
							type="button"
							shape="circle"
							color="red-500"
							size="sm"
							variant="twoTone"
							icon={<MdDeleteForever />}
							onClick={() => handleDeleteItem(item)}
						/>
					</div>
				</Td>
			</Tr>
		);
	};
	
	
	return (
		<div className="flex flex-col gap-2">
			<h6>Ações do Plano</h6>
			<Card className="max-h-[400px] h-[250px] overflow-y-auto">
				<Table>
					<THead style={{ textAlign: "center" }}>
						<Tr>
							<Td>
								<h6>Nome da Ação</h6>
							</Td>
							<Td>
								<h6>Prazo Estimado</h6>
							</Td>
							<Td>
								<h6>Ações</h6>
							</Td>
						</Tr>
					</THead>
					<TBody>
						{actions.map(
							item => (
								<ActionPlanItem key={item.id} item={item} />
							)
						)}
						{raList.map(
							item => (
								<ActionPlanItem key={item.id} item={item} />
							)
						)}
					</TBody>
				</Table>
			</Card>
		</div>
	);
}

export default ActionList;
