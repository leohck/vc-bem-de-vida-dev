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
					size: 4,
					fillColor: getColor(type),
					strokeColor: getColor(type),
					shape: "square"
				},
				// label: {
				// 	show: false,
				// 	text: item.age
				// }
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
			// min: series[0].data?.indexOf(2) !== -1 ? series[0].data[series[0].data?.indexOf(2)] : 20,
			min: 20,
			max: series[0].data?.length ? series[0].data?.length : 45,
			tickAmount: 5
			
		},
		yaxis: {
			min: 0,
			max: 10,
			labels: {
				show: true
			}
		},
		stroke: {
			width: 3,
			// curve: "straight"
			curve: "smooth"
		},
		dataLabels: {
			enabled: false
		},
		annotations: {
			points: points
		},
		colors: [getColor(type)],
		title: {
			text: type,
			align: 'center',
			margin: 10,
			offsetX: 0,
			offsetY: 0,
			floating: false,
			style: {
				fontSize:  '14px',
				fontWeight:  'bold',
				fontFamily:  undefined,
				color:  '#263238'
			},
		}
	};
	
	return (
		<div>
			<Chart
				height={350}
				width={300}
				type="area"
				options={chartOptions}
				series={series} />
		</div>
	);
}

export default AreaChart;
