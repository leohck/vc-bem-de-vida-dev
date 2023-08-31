import React from "react";
import { Chart } from "../../../../../components/shared";
import useResponsive from "../../../../../utils/hooks/useResponsive";


function PieChart({ data }) {
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
					return timeFormatter(value);
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
		<div className="flex flex-col md:flex-row items-center justify-between">
			<div className="flex flex-col items-center">
				<Chart
					width={chartWidth}
					height={chartHeight}
					type="donut"
					options={lifeAspectChartOptions}
					series={data.life_aspect_time_spent_pie}
				/>
				{data.life_aspect_time_spent_pie && (
					<h5>ASPECTOS DE VIDA</h5>
				)}
			</div>
			<div className="flex flex-col items-center">
				<div className="flex flex-col items-center relative">
					<Chart
						width={chartWidth - 100}
						height={chartHeight - 100}
						type="donut"
						options={statusChartOptions}
						series={data.status_actions_count_pie}
					/>
					{data.status_actions_count_pie && (
						<>
							<h2>{data.sprint_completion}%</h2>
							<h5>PROGRESSÃO DA SPRINT</h5>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default PieChart;
