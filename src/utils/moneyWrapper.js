function convertToReal(number) {
	return Intl.NumberFormat(
		"pt-br",
		{ style: "currency", currency: "BRL" }
	).format(number);
}

export default convertToReal;