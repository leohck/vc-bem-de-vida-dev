import React from "react";
import { Button, Card } from "../../../components/ui";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function ActionPlans({ action }) {
	const navigate = useNavigate();
	return (
		<Card header="Planos de Ação Vinculados">
			{action.action_plan.map(
				item => (
					<div className="flex flex-row gap-4 items-center">
						<h6>{item}</h6>
						<Button
							shape="circle"
							color="blue-500"
							size="sm"
							variant="twoTone"
							icon={<AiOutlineSearch />}
							onClick={() => {
								navigate('/action-plan/form', { replace: true, state: {actionPlanItem: {id: item}} })
							}}
						/>
					</div>
				)
			)}
		</Card>
	);
}

export default ActionPlans;
