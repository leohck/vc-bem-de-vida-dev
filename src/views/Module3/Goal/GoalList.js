import React from "react";
import { Button, Card, Table } from "../../../components/ui";
import { getAchievementIconFromValue } from "../../auto-conhecimento/form.options";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGoals } from "../../../hooks/useGoals";
import { deleteGoal } from "../../../services/Module3/GoalService";
import { delGoal } from "../../../store/module3/goalSlice";
import { toastFeedback } from "../../../utils/actionFeedback";
import { FaPlusSquare } from "react-icons/fa";

const { Tr, Td, THead, TBody } = Table;

function GoalList() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	
	const { goals } = useGoals();
	
	const handleEditItem = (item) => {
		navigate("/goal/form", { replace: true, state: { goalItem: item } });
	};
	
	const handleDeleteItem = async (itemID) => {
		try {
			await deleteGoal(itemID).then(
				() => {
					dispatch(delGoal(itemID));
					toastFeedback("warning", "Meta Excluida");
				}
			);
		} catch (e) {
			toastFeedback("error", "Falha ao Excluir Meta");
		}
	};
	
	
	const ItemRow = ({ item }) => {
		const date = new Date(item.estimated_deadline + " EDT");
		const estimated_deadline = date.toLocaleDateString("pt-BR");
		return (
			<Tr key={item.id} style={{ textAlign: "center" }}>
				<Td className="flex flex-row justify-center">
					<div className="flex flex-row gap-2 items-center">
						{getAchievementIconFromValue(item.icon)}
						{item.value}
					</div>
				</Td>
				<Td>
					{estimated_deadline}
				</Td>
				<Td>
					<div className="flex flex-row gap-4 justify-center">
						<Button
							shape="circle"
							color="blue-500"
							size="sm"
							variant="twoTone"
							icon={<AiOutlineEdit />}
							onClick={() => handleEditItem(item)}
						/>
						<Button
							shape="circle"
							color="red-500"
							size="sm"
							variant="twoTone"
							icon={<MdDeleteForever />}
							onClick={() => handleDeleteItem(item.id)}
						/>
					</div>
				</Td>
			</Tr>
		);
	};
	
	const handleAddGoal = () => {
		navigate("/goal/form", { replace: true });
	};
	
	const headerExtraContent = (
		<span className="flex items-center">
			<Button
				className="mr-2"
				variant="twoTone"
				icon={<FaPlusSquare />}
				onClick={handleAddGoal}
			>
				Nova Meta
			</Button>
        </span>
	);
	
	return (
		<Card
			header="Minhas Metas"
			bodyClass="max-h-[700px] overflow-y-auto"
			headerExtra={headerExtraContent}
		>
			<Table>
				<THead style={{ textAlign: "center" }}>
					<Tr>
						<Td>
							<h6>Meta</h6>
						</Td>
						<Td>
							<h6>Prazo</h6>
						</Td>
						<Td>
							<h6>Ações</h6>
						</Td>
					</Tr>
				</THead>
				<TBody>
					{goals && goals.map(item => (
						<ItemRow item={item} key={item.id} />
					))}
				</TBody>
			</Table>
		</Card>
	);
}

export default GoalList;
