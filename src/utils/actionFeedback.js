import { Notification, toast } from "../components/ui";

export const toastFeedback = (type, message) => {
	let title = ''
	if (type === 'success') {
		title = 'Sucesso'
	} else if (type === 'danger') {
		title = 'Erro'
	} else if (type === 'warning') {
		title = 'Excluido'
	} else {
		title = 'Informação'
	}
	toast.push(
		<Notification
			title={title}
			type={type}
		>
			{message}
		</Notification>
	)
}