export const STATUS_OPTIONS = [
	{value: "nao iniciado", label: "Não Iniciado"},
	{value: "agendado", label: "Agendado"},
	{value: "em andamento", label: "Em Andamento"},
	{value: "interrompido", label: "Interrompido"},
	{value: "concluido", label: "Concluido"},
]

export const getStatusObjectFromValue = (value) => {
	return STATUS_OPTIONS.filter(el => el.value === value)[0]
}

export const RECURRENCE_OPTIONS = [
	{value: "pontual", label: "Pontual"},
	{value: "recorrente", label: "Recorrente"},
]

export const getRecurrenceObjectFromValue = (value) => {
	return RECURRENCE_OPTIONS.filter(el => el.value === value)[0]
}