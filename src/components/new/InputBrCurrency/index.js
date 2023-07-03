import React from "react"
import IntlCurrencyInput from "react-intl-currency-input"
import { Input } from "../../ui";

const currencyConfig = {
	locale: "pt-BR",
	formats: {
		number: {
			BRL: {
				style: "currency",
				currency: "BRL",
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			},
		},
	},
};

const BrlCurrencyComponent = ({value, onChange}) => {
	const handleChange = (event, value, maskedValue) => {
		event.preventDefault();
		onChange(value)
	};
	
	return(
		<IntlCurrencyInput
			component={Input}
			currency="BRL"
			value={value}
			config={currencyConfig}
		    onChange={handleChange}/>
	);
}

export default BrlCurrencyComponent;