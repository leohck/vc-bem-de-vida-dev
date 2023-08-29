import React from "react";
import { Button, Dialog } from "../../../../components/ui";
import { finishSprint } from "../../../../services/Module3/SprintService";
import { toastFeedback } from "../../../../utils/actionFeedback";

function SprintFinishDialog({ sprintID, dialogIsOpen, setIsOpen }) {
	
	const handleFinishSprint = async () => {
		await finishSprint(sprintID)
			.then(async (response) => {
				const message1 = `Total de Ações : ${response.data.total_actions}`;
				const message2 = `Total de Ações Concluida: ${response.data.done_actions}`;
				toastFeedback("success", message1 + "\n" + message2);
				await new Promise(r => setTimeout(r, 2000));
				window.location.reload();
			});
	};
	
	const onDialogClose = () => {
		setIsOpen(false);
	};
	
	const onDialogOk = async () => {
		setIsOpen(false);
		await handleFinishSprint();
	};
	return (
		<div>
			<Dialog
				isOpen={dialogIsOpen}
				shouldCloseOnOverlayClick={false}
				shouldCloseOnEsc={false}
				onClose={onDialogClose}
				onRequestClose={onDialogClose}
			>
				<h5 className="mb-4">Concluir Sprint</h5>
				<p>
					Certifique-se de atualizar o status das tarefas antes de concluir a Sprint. Deseja concluir agora?
				</p>
				<div className="text-right mt-6">
					<Button
						className="mr-2"
						variant="plain"
						onClick={onDialogClose}
					>
						CANCELAR
					</Button>
					<Button variant="solid" onClick={onDialogOk}>
						CONCLUIR
					</Button>
				</div>
			</Dialog>
		</div>
	);
}

export default SprintFinishDialog;
