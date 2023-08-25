export const ESTIMATED_DAYS_OPTIONS = [
	{value: 7, label: "7 dias"},
	{value: 14, label: "14 dias"},
	{value: 21, label: "21 dias"},
	{value: 28, label: "28 dias"},
]

export const ESTIMATED_DAYS_DISABLED_OPTIONS = [
	{value: 7, label: "7 dias", isDisabled: true},
	{value: 14, label: "14 dias", isDisabled: true},
	{value: 21, label: "21 dias", isDisabled: true},
	{value: 28, label: "28 dias", isDisabled: true},
]

export const getEstimatedDaysObjectFromValue = (value) => {
	return ESTIMATED_DAYS_OPTIONS.filter(el => el.value === value)[0]
}