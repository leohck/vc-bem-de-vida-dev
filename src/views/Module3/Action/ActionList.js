import React, { useEffect, useRef, useState } from "react";
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
			return null;
		}
	};
	
	useEffect(() => {
		if (actionPlanID) {
			refreshActionList();
			refreshActionDeadlineList();
		}
	}, [actionPlanID]);
	
	const handleConfigureItem = (item) => {
		if (item.action_type === "action" && !item.configured) {
			navigate("/routine/action/form", { state: { itemID: item.id } });
		} else {
			navigate("/routine/action/form", { state: { itemID: item.id } });
		}
	};
	
	const ActionPlanItem = ({ item }) => {
		let actionDeadlineItem = getActionDeadline(item.id);
		
		const [estimatedDeadline, setEstimatedDeadline] = useState(actionDeadlineItem ? actionDeadlineItem.estimated_deadline : null);
		
		const handleSaveItem = async () => {
			if (actionDeadlineItem) {
				await putActionDeadline(actionDeadlineItem.id, { estimated_deadline: actionDeadlineItem ? estimatedDeadline ? estimatedDeadline : null : null }).then(
					() => {
						toastFeedback("success", "Prazo Alterado!");
					}
				);
			}
		};
		
		const handleDeleteItem = async (actionItem, actionDeadline) => {
			await unlinkActionAndPlan(actionItem.id, actionPlanID).then(
				async response => {
					if (response.status === 200) {
						dispatch(delAction(actionItem.id));
						await deleteActionDeadline(actionDeadline.id).then(
							() => {
								dispatch(delActionDeadline(actionDeadline.id));
							}
						);
						toastFeedback("warning", "Ação Desvinculada");
					}
				}
			);
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
						onBlur={async () => {
							await handleSaveItem();
						}}
					/>
				</Td>
				<Td>
					<div className="flex flex-row gap-4 justify-center mt-2">
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
							onClick={() => handleDeleteItem(item, actionDeadlineItem)}
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
								<ActionPlanItem
									key={item.id}
									item={item} />
							)
						)}
					</TBody>
				</Table>
			</Card>
		</div>
	);
}

export default ActionList;
