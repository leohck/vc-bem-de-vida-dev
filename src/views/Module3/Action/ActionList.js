import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Input, Select, Table } from "../../../components/ui";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toastFeedback } from "../../../utils/actionFeedback";
import { useActionDeadlineList } from "../../../hooks/useActionDeadlineList";
import { useActionList } from "../../../hooks/useActionList";
import { delAction } from "../../../store/module3/actionSlice";
import { putActionDeadline } from "../../../services/Module3/ActionDeadlineService";
import { useNavigate } from "react-router-dom";
import { getPriorityObjectFromValue, PRIORITY_OPTIONS } from "../../../constants/action.constant";
import { RoutineActionDelete } from "../../../services/RoutineActionService";
import ActionDeleteDialog from "./ActionDeleteDialog";

const { Tr, Td, THead, TBody } = Table;

function ActionList({ actionPlanID }) {
	const [dialogIsOpen, setDialogIsOpen] = useState(false);
	
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
		navigate("/routine/action/form", { state: { itemID: item.id } });
	};
	
	const ActionPlanItem = ({ item }) => {
		let actionDeadlineItem = getActionDeadline(item.id);
		
		const [estimatedDeadline, setEstimatedDeadline] = useState(
			actionDeadlineItem
				? actionDeadlineItem.estimated_deadline
				: null
		);
		const [priority, setPriority] = useState(
			actionDeadlineItem
				? getPriorityObjectFromValue(actionDeadlineItem.priority)
				: null
		);
		
		const handleSaveItem = async () => {
			if (actionDeadlineItem) {
				await putActionDeadline(
					actionDeadlineItem.id,
					{
						estimated_deadline: actionDeadlineItem
							? estimatedDeadline
								? estimatedDeadline
								: null
							: null
					}
				).then(
					() => {
						toastFeedback("success", "Prazo Alterado!");
					}
				);
			}
		};
		
		const handlePriorityChange = async (e) => {
			if (actionDeadlineItem) {
				await putActionDeadline(
					actionDeadlineItem.id,
					{
						priority: e.value
					}
				).then(
					() => {
						setPriority(e);
						toastFeedback("success", "Prioridade Alterada!");
					}
				);
			}
		};
		
		return (
			<>
				<Tr key={item.id} style={{ textAlign: "center", maxHeight: 100 }}>
					<Td>
						<h6>
							{item.value}
						</h6>
					</Td>
					<Td>
						<h6>{item.read_status}</h6>
					</Td>
					<Td>
						<div>
							<Select
								className="w-[90px]"
								options={PRIORITY_OPTIONS}
								value={priority}
								onChange={(e) => handlePriorityChange(e)}
							/>
						</div>
					</Td>
					<Td>
						<Input
							type="date"
							name="estimated_deadline"
							className="w-[150px]"
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
								onClick={() => setDialogIsOpen(true)}
							/>
						</div>
					</Td>
				</Tr>
				<ActionDeleteDialog
					actionID={item.id}
					dialogIsOpen={dialogIsOpen}
					setIsOpen={setDialogIsOpen}
				/>
			</>
		);
	};
	
	
	return (
		<div className="flex flex-col gap-2">
			<h6>Ações do Plano</h6>
			<Card
				className="overflow-y-auto md:w-[900px]"
				bodyClass="h-[300px] md:h-[455px]"
			>
				<Table>
					<THead style={{ textAlign: "center" }}>
						<Tr>
							<Td>
								<h6>Nome da Ação</h6>
							</Td>
							<Td>
								<h6>Status</h6>
							</Td>
							<Td>
								<h6>Prioridade</h6>
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
