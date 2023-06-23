import { Notification, toast } from "../components/ui";

export const toastFeedback = (type, message) => {
	let title = type
	if (type === 'success') {
		title = 'Sucesso'
	} else if (type === 'danger') {
		title = 'Erro'
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