import React from "react";
import { Chart } from "../../../components/shared";
import convertToReal from "../../../utils/moneyWrapper";
import useResponsive from "../../../utils/hooks/useResponsive";

const ActionResourceChart = (props) => {
	const { windowWidth } = useResponsive();
	const { data, categories, color, chartType } = props;
	const data1 = [
		{
			name: "Custo",
			data: data
		}
	];
	let dataLabelsEnabled = true
	if (chartType !== 'money_spent') {
		dataLabelsEnabled = true
	} else if (windowWidth < 640) {
		dataLabelsEnabled = false
	}
	return (
		<Chart
			series={data1}
			type="bar"
			height={600}
			options={{
				chart: {
					toolbar: {
						show: false
					},
					zoom: {
						enabled: false
					}
				},
				plotOptions: {
					bar: {
						horizontal: windowWidth > 640,
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
					enabled: dataLabelsEnabled,
					offsetX:  windowWidth > 640 ? chartType === "money_spent" ? -30 : -3 : 0,
					style: {
						fontSize: chartType === "money_spent" ? "14px" : "14px",
						colors: ["#fff"]
					},
					formatter: function(val) {
						if (chartType === "money_spent") {
							return convertToReal(val);
						} else {
							return Math.floor(val);
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
