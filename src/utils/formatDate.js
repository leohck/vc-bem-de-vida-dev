export const formatDate = (date) => {
	const dt = new Date(date + " EDT");
	return dt.toLocaleDateString("pt-BR");
};