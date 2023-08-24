import React from "react";
import { Card, Table } from "../../../components/ui";
import ActionPlanItem from "./ActionPlanItem";
import {
	useQuery
} from "@tanstack/react-query";
import { getActionPlanListAll } from "../../../services/Module3/ActionPlanService";
import { useUserID } from "../../../hooks/useUserID";

const { Tr, Td, THead, TBody } = Table;

const ActionPlanView = () => {
	const { userID } = useUserID();
	const { isLoading, error, data, isFetching } = useQuery({
		queryKey: ["action_plans"],
		queryFn: () => getActionPlanListAll(userID)
	});
	if (isLoading) return "Loading...";
	if (error) return "An error has occurred: " + error.message;
	
	return (
		<Card header="Meus Planos de Ações"
		      bodyClass="max-h-[700px] overflow-y-auto"
		      headerClass="bg-[#FFBF29] rounded-t-lg"
		>
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
							<h6>Status</h6>
						</Td>
						<Td>
							<h6>Ações Cadastradas</h6>
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
