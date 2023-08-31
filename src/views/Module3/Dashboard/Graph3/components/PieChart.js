import React from "react";
import { Chart } from "../../../../../components/shared";
import useResponsive from "../../../../../utils/hooks/useResponsive";

function PieChart({ type, data }) {
	const { windowWidth } = useResponsive();
	const chartWidth = windowWidth > 640 ? 400 : 370;
	const chartHeight = windowWidth > 640 ? 400 : 400;
	const lifeAspectChartOptions = {
		fill: {
			type: "gradient"
		},
		legend: {
			position: "bottom",
			height: windowWidth > 640 ? 50 : 100,
			width: windowWidth > 640 ? 500 : 330,
			labels: {
				useSeriesColors: true
			},
			formatter: function(seriesName, opts) {
				return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] + "%";
			}
		},
		colors: ["#0048ff", "#0adc93", "#f5ab1d", "#FF4560", "#8875de"],
		labels: [
			"Saúde Física",
			"Saúde Mental",
			"Vida Social",
			"Vida Profissional",
			"Gestão Financeira"
		]
	};
	const statusChartOptions = {
		fill: {
			type: "gradient"
		},
		legend: {
			position: "bottom",
			height: windowWidth > 640 ? 50 : 100,
			width: windowWidth > 640 ? 500 : 330,
			labels: {
				useSeriesColors: true
			},
			formatter: function(seriesName, opts) {
				return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] + "%";
			}
		},
		colors: ["#ef0c1d", "#fde80b", "#079f1f", "#7c580c", "#656464"],
		labels: [
			"Não Iniciada",
			"Agendada",
			"Em Andamento",
			"Interrompida",
			"Concluída"
		]
	};
	return (
		<>
			{type === "time_spent" && (
				<div className="flex flex-row items-center justify-between">
					<Chart
						width={chartWidth}
						height={chartHeight}
						type="donut"
						options={lifeAspectChartOptions}
						series={data.life_aspect_time_spent_pie}
					/>
					<Chart
						width={chartWidth - 100}
						height={chartHeight - 100}
						type="donut"
						options={statusChartOptions}
						series={data.status_time_spent_pie}
					/>
				</div>
			)}
			{type === "money_spent" && (
				<div className="flex flex-row items-center justify-between">
					<Chart
						width={chartWidth}
						height={chartHeight}
						type="donut"
						options={lifeAspectChartOptions}
						series={data.life_aspect_money_spent_pie}
					/>
					<Chart
						width={chartWidth - 100}
						height={chartHeight - 100}
						type="donut"
						options={statusChartOptions}
						series={data.status_money_spent_pie}
					/>
				</div>
			)}
		
		</>
	);
}

export default PieChart;
