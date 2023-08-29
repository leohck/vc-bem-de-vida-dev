import React, { useState } from "react";
import { Button, Card, Select, Table } from "../../../../components/ui";
import { ESTIMATED_DAYS_DISABLED_OPTIONS, ESTIMATED_DAYS_OPTIONS, getEstimatedDaysObjectFromValue } from "../constants";
import { StartStopSprint } from "../../../../services/Module3/SprintService";
import { toastFeedback } from "../../../../utils/actionFeedback";
import SprintAction from "./SprintAction";
import ActionPlanList from "./ActionPlanList";
import SprintFinishDialog from "./SprintFinishDialog";

const { Tr, Td, THead, TBody } = Table;

function SprintConfig({ sprint }) {
	const [dialogIsOpen, setDialogIsOpen] = useState(false);
	
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
	
	const handleChangeSprintDuration = async (e) => {
		const data = {
			estimated_days: e.value,
		};
		await StartStopSprint(sprint.id, data)
			.then(() => {
				setEstimatedDays(e.value);
				window.location.reload();
			});
	}
	
	const formatDate = (date) => {
		const dt = new Date(date + " EDT");
		return dt.toLocaleDateString("pt-BR");
	};
	
	
	return (
		<div className="flex flex-col md:flex-row gap-10 justify-center">
			<div className="flex flex-col">
				<div className="flex flex-col items-center gap-2 md:gap-10 md:flex-row">
					<h6>Duração da Sprint: </h6>
					<div className="flex flex-row gap-2 items-center">
						<Select
							className="w-[150px]"
							options={!sprint.running ? ESTIMATED_DAYS_OPTIONS : ESTIMATED_DAYS_DISABLED_OPTIONS}
							value={estimatedDays}
							onChange={(e) => handleChangeSprintDuration(e)}
						
						/>
						<h6>{formatDate(sprint.conclusion_date)}</h6>
					</div>
				</div>
				<div className="flex flex-row items-center justify-between mt-5 md:w-[650px]">
					<h6>
						Sprint Atual
					</h6>
					{sprint.running
						? sprint.can_finish && (
							<>
								<Button
									variant="twoTone"
									color="green-600"
									onClick={() => setDialogIsOpen(true)}
								>
									CONCLUIR SPRINT
								</Button>
							</>
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
				<Card className="overflow-y-auto mt-1 h-[400px] md:w-[650px] md:h-[600px] ">
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
								{!sprint.running && (
									<Td>
										<h6>Ações</h6>
									</Td>
								)}
							</Tr>
						</THead>
						<TBody style={{ textAlign: "center" }}>
							{sprint.routine_actions.map(
								(action) => <SprintAction
									key={action.id}
									isSprintRunning={sprint.running}
									action={action} />
							)}
						</TBody>
					</Table>
				</Card>
			</div>
			
			{!sprint.running && (
				<div className="flex flex-col gap-2 h-[730px]">
					<h6>Repositório de Ações</h6>
					<Card className="overflow-y-auto bg-gray-300 md:h-full md:w-[600px]"
					      bodyClass="grid grid-cols-1 divide-y gap-2"
					>
						<ActionPlanList
							sprintID={sprint.id}
							isSprintRunning={sprint.running}
							actions={sprint.available_routine_actions} />
					</Card>
				</div>
			)}
			<SprintFinishDialog
				sprintID={sprint.id}
				dialogIsOpen={dialogIsOpen}
				setIsOpen={setDialogIsOpen}
			/>
		</div>
	);
}

export default SprintConfig;
