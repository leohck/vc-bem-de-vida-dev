import React, { useState } from "react";
import { Button, Card, Select, Table } from "../../../../components/ui";
import { ESTIMATED_DAYS_DISABLED_OPTIONS, ESTIMATED_DAYS_OPTIONS, getEstimatedDaysObjectFromValue } from "../constants";
import { StartStopSprint } from "../../../../services/Module3/SprintService";
import { toastFeedback } from "../../../../utils/actionFeedback";
import SprintAction from "./SprintAction";
import ActionPlanList from "./ActionPlanList";

const { Tr, Td, THead, TBody } = Table;

function SprintConfig({ sprint }) {
	const [estimatedDays, setEstimatedDays] = useState(
		getEstimatedDaysObjectFromValue(sprint.estimated_days)
	);
	
	const handleStartStopSprint = async () => {
		const data = {
			estimated_days: estimatedDays.value,
			running: !sprint.running
		};
		await StartStopSprint(sprint.id, data)
			.then((response) => {
				if (response.data.running) {
					toastFeedback("success", "Sprint Iniciada");
				} else {
					toastFeedback("success", "Sprint Concluida");
				}
				window.location.reload();
			});
	};
	
	const formatDate = (date) => {
		const dt = new Date(date + " EDT");
		return dt.toLocaleDateString("pt-BR");
	};
	
	
	return (
		<div className="flex flex-row gap-10">
			<div className="flex flex-col">
				<div className="flex flex-row items-center gap-10">
					<h6>Duração da Sprint: </h6>
					<Select
						className="w-[150px]"
						options={!sprint.running ? ESTIMATED_DAYS_OPTIONS : ESTIMATED_DAYS_DISABLED_OPTIONS}
						value={estimatedDays}
						onChange={setEstimatedDays}
					
					/>
					<h6>{formatDate(sprint.conclusion_date)}</h6>
				</div>
				
				<div className="flex flex-row items-center justify-between  gap-10 mt-10 w-[600px]">
					<h6>
						Sprint Atual
					</h6>
					{sprint.running
						? (
							<Button
								variant="twoTone"
								color="green-600"
								onClick={handleStartStopSprint}
							>
								CONCLUIR SPRINT
							</Button>
						)
						: (
							<Button
								variant="solid"
								color="green-600"
								onClick={handleStartStopSprint}
							>
								INICIAR SPRINT
							</Button>
						)
					}
				</div>
				<Card className="w-[600px] h-[600px] mt-1">
					<Table>
						<THead style={{ textAlign: "center" }}>
							<Tr>
								<Td>
									<h6>Nome da Ação</h6>
								</Td>
								<Td>
									<h6>Plano</h6>
								</Td>
								<Td>
									<h6>Status</h6>
								</Td>
								<Td>
									<h6>Data</h6>
								</Td>
							</Tr>
						</THead>
						<TBody style={{ textAlign: "center" }}>
							{sprint.routine_actions.map(
								(action) => <SprintAction key={action.id} action={action} />
							)}
						</TBody>
					</Table>
				</Card>
			</div>
			<div className="flex flex-col gap-2 h-[730px]">
				<h6>Repositório de Ações</h6>
				<Card className="overflow-y-auto bg-gray-300 md:h-full md:w-[600px]"
				      bodyClass="grid grid-cols-1 divide-y gap-2"
				>
					<ActionPlanList
						sprintID={sprint.id}
						actions={sprint.available_routine_actions}/>
				</Card>
			</div>
		</div>
	);
}

export default SprintConfig;
