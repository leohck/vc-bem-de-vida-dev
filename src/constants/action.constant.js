export const STATUS_OPTIONS = [
	{value: "nao configurada", label: "Não Configurada"},
	{value: "nao iniciada", label: "Não Iniciada"},
	{value: "agendada", label: "Agendada"},
	{value: "em andamento", label: "Em Andamento"},
	{value: "interrompida", label: "Interrompida"},
	{value: "concluida", label: "Concluida"},
]

export const STATUS_OPTIONS_DISABLED = [
	{value: "nao configurada", label: "Não Configurada", isDisabled: true},
	{value: "nao iniciada", label: "Não Iniciada", isDisabled: true},
	{value: "agendada", label: "Agendada", isDisabled: true},
	{value: "em andamento", label: "Em Andamento", isDisabled: true},
	{value: "interrompida", label: "Interrompida", isDisabled: true},
	{value: "concluida", label: "Concluida", isDisabled: true},
]

export const getStatusObjectFromValue = (value) => {
	return STATUS_OPTIONS.filter(el => el.value === value)[0]
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