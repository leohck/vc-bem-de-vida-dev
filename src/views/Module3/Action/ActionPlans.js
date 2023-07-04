import React from "react";
import { Button, Card } from "../../../components/ui";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function ActionPlans({ action }) {
	const navigate = useNavigate();
	return (
		<Card header="Planos de Ação Vinculados">
			{action.action_plans_list.map(
				item => (
					<div className="flex flex-row gap-4 items-center">
						<h6>{item.name}</h6>
						<Button
							shape="circle"
							color="blue-500"
							size="sm"
							variant="twoTone"
							icon={<AiOutlineSearch />}
							onClick={() => {
								navigate('/action-plan/form', { state: {actionPlanItem: item} })
							}}
						/>
					</div>
				)
			)}
		</Card>
	);
}

export default ActionPlans;
