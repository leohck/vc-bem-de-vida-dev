import React from "react";
import { Chart } from "../../../../../components/shared";

function AreaChart({ type, data }) {
	
	const series = [
		{ name: `Conquistas ${type}`, data: data["achievements"][type] }
	];
	
	const getColor = (aspect) => {
		switch (aspect) {
			case "Saude Fisica":
				return "#0048ff";
			case "Saude Mental":
				return "#0adc93";
			case "Vida Social":
				return "#f5ab1d";
			case "Vida Profissional":
				return "#FF4560";
			case "Gestao Financeira":
				return "#8875de";
		}
	};
	let points = [];
	const goals = data["goals"][type];
	if (goals !== undefined) {
		goals.forEach(item => {
			points.push({
				x: item.age,
				y: item.goals_count,
				marker: {
					size: 10,
					fillColor: getColor(type),
					strokeColor: getColor(type),
					shape: "square"
				},
				label: {
					show: true,
					text: item.age
				}
			});
		});
	}
	
	
	const chartOptions = {
		chart: {
			toolbar: {
				show: false
			},
			zoom: {
				enabled: false
			},
			animations: {
				enabled: false
			}
		},
		xaxis: {
			forceNiceScale: true,
			min: 20,
			max: 45
		},
		yaxis: {
			min: 0,
			max: 10
		},
		stroke: {
			width: 5,
			// curve: "straight"
			curve: "smooth"
		},
		dataLabels: {
			enabled: false
		},
		annotations: {
			points: points
		},
		colors: [getColor(type)]
	};
	
	return (
		<div>
			<Chart
				height={350}
				type="area"
				options={chartOptions}
				series={series} />
		</div>
	);
}

export default AreaChart;
