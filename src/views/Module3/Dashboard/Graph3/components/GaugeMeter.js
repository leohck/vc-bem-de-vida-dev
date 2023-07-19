import React from "react";
import { Chart } from "../../../../../components/shared";
import { percentageFormatter } from "../../../../../utils/percentageFormatter";


function GaugeMeter({ type, data }) {
	const chartOptions = {
		plotOptions: {
			radialBar: {
				startAngle: -90,
				endAngle: 90,
				hollow: {
					margin: 5,
					size: "30%",
					background: "transparent"
				},
				dataLabels: {
					name: {
						show: false
					},
					value: {
						show: true,
						fontSize: "16px",
						offsetY: 0,
						formatter: function(val) {
							return percentageFormatter(val) + "%";
						}
					}
				}
			}
		},
		colors: ["#333", "#0048ff", "#0adc93", "#f5ab1d", "#FF4560", "#8875de"],
		labels: ["Linha 1", "Saúde Física", "Saúde Mental", "Vida Social", "Vida Profissional", "Gestão Financeira"],
		// legend: {
		// 	show: true,
		// 	position: "bottom",
		// 	fontSize: "10px"
		// }
		legend: {
			show: true,
			floating: true,
			fontSize: '12px',
			position: 'bottom',
			offsetY: -20,
			offsetX: 0,
			labels: {
				useSeriesColors: true,
			},
			formatter: function(seriesName, opts) {
				return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] + "%"
			},
		},
	};
	
	
	return (
		<div className='w-full'>
			{type === "time_spent" && (
				<Chart
					width='900px'
					height='600px'
					type={"radialBar"}
					options={chartOptions}
					series={data.time_spent}
				/>
			)}
			{type === "money_spent" && (
				<Chart
					width='900px'
					height='600px'
					type={"radialBar"}
					options={chartOptions}
					series={data.money_spent}
				/>
			)}
		
		</div>
	);
}

export default GaugeMeter;
