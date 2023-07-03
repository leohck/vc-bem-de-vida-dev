import React from "react";
import { Button, Card, Table } from "../../../components/ui";
import { useActionPlanListAll } from "../../../hooks/module3/useActionPlanListAll";
import ActionPlanItem from "./ActionPlanItem";

const { Tr, Td, THead, TBody } = Table;

const ActionPlanView = () => {
	const { action_plans, refreshActionPlanList } = useActionPlanListAll();
	return (
		<Card header="Meus Planos de Ações">
			<Table>
				<THead style={{ textAlign: "center" }}>
					<Tr>
						<Td>
							<h6>Plano de Ação</h6>
						</Td>
						<Td>
							<h6>Meta</h6>
						</Td>
						<Td>
							<h6>Ações</h6>
						</Td>
						<Td>
							<h6>Status das Ações</h6>
						</Td>
						<Td>
							<h6>Prazo Estimado</h6>
						</Td>
						<Td>
							<h6>Ações do Plano</h6>
						</Td>
					</Tr>
				</THead>
				<TBody>
					{action_plans.map((item) => (
						<ActionPlanItem item={item} key={item.id} />
					))}
				
				</TBody>
			</Table>
		</Card>
	);
};

export default ActionPlanView;
