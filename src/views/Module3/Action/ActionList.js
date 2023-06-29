import React, { useEffect, useState } from "react";
import { Button, Card, Input, Table } from "../../../components/ui";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineCheck, AiOutlineSetting } from "react-icons/ai";
import { useActionList } from "../../../hooks/useActionList";
import { delAction } from "../../../store/module3/actionSlice";
import { useDispatch } from "react-redux";
import { deleteAction } from "../../../services/Module3/ActionService";
import { toastFeedback } from "../../../utils/actionFeedback";

const { Tr, Td, THead, TBody } = Table;

function ActionList({ actionPlanID }) {
	const dispatch = useDispatch();
	const [estimatedDeadline, setEstimatedDeadline] = useState();
	const { actions, refreshActionList } = useActionList(actionPlanID);
	
	
	useEffect(() => {
		refreshActionList();
	}, [actionPlanID]);
	
	const handleDeleteItem = async (item) => {
		await deleteAction(item.id).then(
			() => {
				dispatch(delAction(item.id));
				toastFeedback("warning", "Ação Excluida");
			}
		);
	};
	
	const handleConfigureItem = () => {
	
	};
	
	const handleSaveItem = () => {
	
	};
	
	const ActionPlanItem = ({ item }) => {
		return (
			<Tr key={item.id}  style={{ textAlign: "center" }}>
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
							onClick={handleSaveItem}
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
					</TBody>
				</Table>
			</Card>
		</div>
	);
}

export default ActionList;
