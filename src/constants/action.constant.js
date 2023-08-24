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

export const PRIORITY_OPTIONS = [
	{value: 1, label: "1"},
	{value: 2, label: "2"},
	{value: 3, label: "3"},
	{value: 4, label: "4"},
	{value: 5, label: "5"},
]

export const getPriorityObjectFromValue = (value) => {
	return PRIORITY_OPTIONS.filter(el => el.value === value)[0]
}