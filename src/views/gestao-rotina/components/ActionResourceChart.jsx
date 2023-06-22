import React from "react";
import { Chart } from "../../../components/shared";
import convertToReal from "../../../utils/moneyWrapper";

const ActionResourceChart = (props) => {
	const { data, categories, color, chartType } = props;
	const data1 = [
		{
			name: "Custo",
			data: data
		}
	];
	const fontSize = data1.length < 5 ? "20px" : "14px"
	return (
		<Chart
			series={data1}
			type="bar"
			height={400}
			options={{
				plotOptions: {
					bar: {
						horizontal: true,
						columnWidth: "50%",
						// endingShape: 'rounded',
						borderRadius: 4,
						dataLabels: {
							position: "top"
						}
					}
				},
				colors: [color],
				dataLabels: {
					enabled: true,
					offsetX: chartType === "money_spent" ? -30 : -5,
					style: {
						fontSize: chartType === "money_spent" ? "16px" : fontSize,
						colors: ["#fff"]
					},
					formatter: function(val) {
						if (chartType === "money_spent") {
							return convertToReal(val);
						} else {
							return val;
						}
					}
				},
				xaxis: {
					categories: categories
				},
				stroke: {
					show: true,
					width: 2,
					colors: ["transparent"]
				},
				fill: {
					type: "gradient",
					opacity: 1
				}
			}}
		/>
	);
};

export default ActionResourceChart;
