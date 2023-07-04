import React from "react";
import { Card, Table } from "../../../components/ui";
import ActionPlanItem from "./ActionPlanItem";
import {
	useQuery
} from "@tanstack/react-query";
import { getActionPlanListAll } from "../../../services/Module3/ActionPlanService";

const { Tr, Td, THead, TBody } = Table;

const ActionPlanView = () => {
	const { isLoading, error, data, isFetching } = useQuery({
		queryKey: ["action_plans"],
		queryFn: () => getActionPlanListAll(1)
	});
	if (isLoading) return 'Loading...'
	if (error) return 'An error has occurred: ' + error.message
	
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
					{data.data?.map((item) => (
						<ActionPlanItem item={item} key={item.id} />
					))}
				</TBody>
			</Table>
		</Card>
	);
};

export default ActionPlanView;
