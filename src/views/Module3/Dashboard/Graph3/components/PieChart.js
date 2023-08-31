import React from "react";
import { Chart } from "../../../../../components/shared";
import useResponsive from "../../../../../utils/hooks/useResponsive";
import convertToReal from "../../../../../utils/moneyWrapper";


function PieChart({ type, data }) {
	const { windowWidth } = useResponsive();
	const chartWidth = windowWidth > 640 ? 400 : 370;
	const chartHeight = windowWidth > 640 ? 400 : 400;
	
	function timeFormatter(value) {
		return value + " H";
	}
	
	const lifeAspectChartOptions = {
		fill: {
			type: "gradient"
		},
		legend: {
			show: false
		},
		dataLabels: {
			enabled: false
		},
		tooltip: {
			enabled: true,
			y: {
				formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
					if (type === "time_spent") {
						return timeFormatter(value)
					} else {
						return convertToReal(value);
					}
				}
			}
		},
		colors: ["#f59e0b", "#16a34a", "#6d28d9", "#1d4ed8", "#facc15"],
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
			show: false
		},
		dataLabels: {
			enabled: false
		},
		tooltip: {
			enabled: true,
			y: {
				formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
					if (type === "time_spent") {
						return timeFormatter(value)
					} else {
						return convertToReal(value);
					}
				}
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
					<div className="flex flex-col items-center">
						<Chart
							width={chartWidth}
							height={chartHeight}
							type="donut"
							options={lifeAspectChartOptions}
							series={data.life_aspect_time_spent_pie}
						/>
						<h5>ASPECTOS DE VIDA</h5>
					</div>
					<div className="flex flex-col items-center">
						<div className="flex flex-col items-center relative">
							<Chart
								width={chartWidth - 100}
								height={chartHeight - 100}
								type="donut"
								options={statusChartOptions}
								series={data.status_time_spent_pie}
							/>
							 <h5>PROGRESSÃO DA SPRINT {data.sprint_completion}%</h5>
						</div>
					</div>
				</div>
			)}
			{type === "money_spent" && (
				<div className="flex flex-row items-center justify-between">
					<div className="flex flex-col items-center">
						<Chart
							width={chartWidth}
							height={chartHeight}
							type="donut"
							options={lifeAspectChartOptions}
							series={data.life_aspect_money_spent_pie}
						/>
						<h5>ASPECTOS DE VIDA</h5>
					</div>
					<div className="flex flex-col items-center">
						<div className="flex flex-col items-center relative">
							<Chart
								width={chartWidth - 100}
								height={chartHeight - 100}
								type="donut"
								options={statusChartOptions}
								series={data.status_money_spent_pie}
							/>
							<h5>PROGRESSÃO DA SPRINT {data.sprint_completion}%</h5>
						</div>
					</div>
				</div>
			)}
		
		</>
	);
}

export default PieChart;
