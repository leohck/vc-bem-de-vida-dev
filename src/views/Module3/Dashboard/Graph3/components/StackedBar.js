import React from "react";
import { Chart } from "../../../../../components/shared";

function StackedBar({ type, data }) {
	const chartOptions = {
		chart: {
			stacked: true,
			// stackType: "100%",
			toolbar: {
				show: false
			},
		},
		plotOptions: {
			bar: {
				horizontal: false
			},
		},
		stroke: {
			width: 1,
			colors: ["#fff"]
		},
		xaxis: {
			categories: ["Recurso Investido"]
		},
		tooltip: {
			y: {
				formatter: function(val) {
					return val + "%";
				}
			}
		},
		fill: {
			opacity: 1
		},
		legend: {
			position: "bottom",
			horizontalAlign: "center",
			// floating: true,
			// width: 200,
			labels: {
				useSeriesColors: true,
			},
			formatter: function(seriesName, opts) {
				return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] + "%"
			},
		},
		dataLabels: {
			enabled: true,
			style: {
				colors: ['#fff']
			},
			formatter: function(val) {
				return val + "%"
			},
		},
		colors: ["#333", "#0048ff", "#0adc93", "#f5ab1d", "#FF4560", "#8875de"],
	};
	return (
		<div className="w-full">
			{type === "time_spent" && (
				<Chart
					width="400px"
					height="600px"
					type="bar"
					options={chartOptions}
					series={data.time_spent}
				/>
			)}
			{type === "money_spent" && (
				<Chart
					width="400px"
					height="600px"
					type="bar"
					options={chartOptions}
					series={data.money_spent}
				/>
			)}
		
		</div>
	);
}

export default StackedBar;
