export const STATUS_OPTIONS = [
	{value: "nao iniciada", label: "Não Iniciada", isDisabled: false},
	{value: "em andamento", label: "Em Andamento", isDisabled: false},
	{value: "cancelada", label: "Cancelada", isDisabled: false},
	{value: "concluida", label: "Concluída", isDisabled: false},
]


export const getStatusObjectFromValue = (value) => {
	return STATUS_OPTIONS.filter(el => el.value === value)[0]
}
