import React from "react";
import ActionPlanItem from "./ActionPlanItem";
import { Table } from "../../../../components/ui";
const { THead, TBody, Tr, Td } = Table;

function ActionPlanList({sprintID, actions}) {
	return (
		<Table>
			<THead style={{ textAlign: "center" }}>
				<Tr>
					<Td>
						<h6>Adicionar</h6>
					</Td>
					<Td>
						<h6>Nome da Ação</h6>
					</Td>
					<Td>
						<h6>Plano</h6>
					</Td>
					<Td>
						<h6>Prioridade</h6>
					</Td>
				</Tr>
			</THead>
			<TBody style={{ textAlign: "center" }}>
				{actions.map(
					(action) => <ActionPlanItem key={action.id}
					                            sprintID={sprintID}
					                            item={action} />
				)}
			</TBody>
		</Table>
	);
}

export default ActionPlanList;
