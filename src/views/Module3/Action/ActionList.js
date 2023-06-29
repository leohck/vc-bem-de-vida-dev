import React, { useEffect, useState } from "react";
import { Button, Card, Input, Table } from "../../../components/ui";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineCheck, AiOutlineSetting } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toastFeedback } from "../../../utils/actionFeedback";
import { useActionDeadlineList } from "../../../hooks/useActionDeadlineList";
import { useActionList } from "../../../hooks/useActionList";
import { unlinkActionAndPlan } from "../../../services/Module3/ActionService";
import { delAction } from "../../../store/module3/actionSlice";
import { deleteActionDeadline, putActionDeadline } from "../../../services/Module3/ActionDeadlineService";
import { delActionDeadline } from "../../../store/module3/actionDeadlineSlice";
import { useNavigate } from "react-router-dom";

const { Tr, Td, THead, TBody } = Table;

function ActionList({ actionPlanID }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { actions, refreshActionList } = useActionList(actionPlanID);
	const { action_deadlines, refreshActionDeadlineList } = useActionDeadlineList(actionPlanID);
	
	const getActionDeadline = (actionID) => {
		const action = action_deadlines.filter(
			(el) => el.action === actionID
		)[0];
		if (action) {
			return action;
		} else {
			return {};
		}
	};
	
	useEffect(() => {
		if (actionPlanID) {
			refreshActionList();
			refreshActionDeadlineList();
		}
	}, [actionPlanID]);
	
	const handleDeleteItem = async (actionItem, actionDeadline) => {
		await unlinkActionAndPlan(actionItem.id, actionPlanID).then(
			async response => {
				if (response.status === 200) {
					dispatch(delAction(actionItem.id))
					await deleteActionDeadline(actionDeadline.id).then(
						() => {
							dispatch(delActionDeadline(actionDeadline.id))
						}
					)
					toastFeedback("warning", "Ação Desvinculada");
				}
			}
		);
	};
	
	const handleConfigureItem = (item) => {
		if (item.action_type === 'action' && !item.configured) {
			navigate("/routine/action/form", {replace: true, state: {itemID: item.id, isNew: true}})
		} else {
			navigate("/routine/action/form", {replace: true, state: {itemID: item.id, isNew: false}})
		}
	};
	
	const ActionPlanItem = ({ item }) => {
		const [actionDeadLine, setActionDeadLine] = useState();
		const [estimatedDeadline, setEstimatedDeadline] = useState(actionDeadLine);
		useEffect(() => {
			if (action_deadlines) {
				const actdead = getActionDeadline(item.id)
				if (actdead) {
					setActionDeadLine(actdead)
					setEstimatedDeadline(actdead.estimated_deadline)
				}
			}
		}, [action_deadlines])
		const handleSaveItem = async (item) => {
			if (actionDeadLine && estimatedDeadline) {
				await putActionDeadline(actionDeadLine.id, {estimated_deadline: estimatedDeadline}).then(
					() => {
						toastFeedback("success", "Prazo Alterado!")
					}
				)
			}
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
						onBlur={() => {handleSaveItem(item)}}
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
							onClick={() => handleDeleteItem(item, actionDeadLine)}
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
					</TBody>
				</Table>
			</Card>
		</div>
	);
}

export default ActionList;
