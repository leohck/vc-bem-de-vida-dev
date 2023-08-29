import React from "react";
import { Button, Dialog } from "../../../components/ui";
import { RoutineActionDelete } from "../../../services/RoutineActionService";
import { delAction } from "../../../store/module3/actionSlice";
import { toastFeedback } from "../../../utils/actionFeedback";
import { useDispatch } from "react-redux";

function ActionDeleteDialog({ actionID, dialogIsOpen, setIsOpen }) {
	const dispatch = useDispatch();
	
	const onDialogClose = () => {
		setIsOpen(false);
	};
	
	const onDialogOk = async () => {
		setIsOpen(false);
		await handleDeleteItem();
	};
	const handleDeleteItem = async () => {
		await RoutineActionDelete(actionID).then(
			async response => {
				if (response.status === 204) {
					dispatch(delAction(actionID));
					toastFeedback("warning", "Ação Deletada");
				}
			}
		);
	};
	
	return (
		<Dialog
			isOpen={dialogIsOpen}
			shouldCloseOnOverlayClick={false}
			shouldCloseOnEsc={false}
			onClose={onDialogClose}
			onRequestClose={onDialogClose}
		>
			<h5 className="mb-4">Excluir Ação</h5>
			<p>
				Cuidado, esta ação será excluida!
			</p>
			<div className="text-right mt-6">
				<Button
					className="ltr:mr-2 rtl:ml-2"
					variant="plain"
					onClick={onDialogClose}
				>
					CANCELAR
				</Button>
				<Button variant="twoTone"
				        color="pink-600"
				        onClick={onDialogOk}>
					CONTINUAR
				</Button>
			</div>
		</Dialog>
	);
}

export default ActionDeleteDialog;
