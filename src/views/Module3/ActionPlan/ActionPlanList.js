import React from "react";
import { Button, Card } from "../../../components/ui";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toastFeedback } from "../../../utils/actionFeedback";
import { delActionPlan } from "../../../store/module3/actionPlanSlice";
import { deleteActionPlan } from "../../../services/Module3/ActionPlanService";


function ActionPlanList({ goalID, actionPlanList, setActionPlanList }) {
	const navigate = useNavigate();
	const handleDeleteItem = async (item) => {
		try {
			await deleteActionPlan(item.id).then(
				response => {
					delActionPlan(item.id);
					toastFeedback("success", "Plano de Ação Deletado")
					setActionPlanList(actionPlanList.filter(
						(el) => el.id !== item.id
					));
				}
			);
		} catch (e) {
			console.log(e);
			toastFeedback("danger", "Falha ao deletar");
		}
		
	};
	
	const handleConfigureItem = (item) => {
		navigate("/action-plan/form", { replace: true, state: { actionPlanItem: item } });
	};
	
	const ActionPlanItem = ({ item }) => {
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
			</div>
		);
	};
	
	return (
		<div>
			{actionPlanList.length >= 1 ? (
				<Card className="max-h-[400px] overflow-y-auto"
				      bodyClass="grid grid-cols-1 divide-y gap-2"
					// bodyClass="flex flex-col gap-4 divide-y"
				>
					{actionPlanList.map(
						item => (
							<ActionPlanItem key={item.id} item={item} />
						)
					)}
				</Card>
			) : null}
		</div>
	);
}

export default ActionPlanList;
