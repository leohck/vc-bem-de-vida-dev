import React from "react";
import { Chart } from "../../../../../components/shared";
import useResponsive from "../../../../../utils/hooks/useResponsive";

function PieChart({ type, data }) {
	const { windowWidth } = useResponsive();
	const chartWidth = windowWidth > 640 ? 600 : 370
	const chartHeight = windowWidth > 640 ? 500 : 400
	const chartOptions = {
		fill: {
			type: "gradient"
		},
		legend: {
			position: "bottom",
			height: windowWidth > 640 ? 50 : 100,
			offsetX: 10,
			width: windowWidth > 640 ? 500 : 330,
			labels: {
				useSeriesColors: true
			},
			formatter: function(seriesName, opts) {
				return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] + "%";
			}
		},
		colors: ["#656464", "#0048ff", "#0adc93", "#f5ab1d", "#FF4560", "#8875de"],
		labels: [
			"Rotina",
			"Saúde Física",
			"Saúde Mental",
			"Vida Social",
			"Vida Profissional",
			"Gestão Financeira"
		]
	};
	return (
		<>
			{type === "time_spent" && (
				<Chart
					width={chartWidth}
					height={chartHeight}
					type="donut"
					options={chartOptions}
					series={data.time_spent_pie}
				/>
			)}
			{type === "money_spent" && (
				<Chart
					width={chartWidth}
					height={chartHeight}
					type="donut"
					options={chartOptions}
					series={data.money_spent_pie}
				/>
			)}
		
		</>
	);
}

export default PieChart;
