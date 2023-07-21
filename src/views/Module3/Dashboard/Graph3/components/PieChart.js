import React from "react";
import { Chart } from "../../../../../components/shared";

function PieChart({ type, data }) {
	const chartOptions = {
		fill: {
			type: 'gradient',
		},
		legend: {
			position: "bottom",
			height: 50,
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
		<div className="w-full">
			{type === "time_spent" && (
				<Chart
					width="600px"
					height="500px"
					type="donut"
					options={chartOptions}
					// series={[44, 55, 41, 17, 15]}
					series={data.time_spent_pie}
				/>
			)}
			{type === "money_spent" && (
				<Chart
					width="600px"
					height="500px"
					type="donut"
					options={chartOptions}
					// series={[44, 55, 41, 17, 15]}
					series={data.money_spent_pie}
				/>
			)}
		
		</div>
	);
}

export default PieChart;
