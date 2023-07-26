import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Card } from "../../../components/ui";
import useResponsive from "../../../utils/hooks/useResponsive";

const WeeklyRoutineChart = (props) => {
	const { data } = props;
	const {windowWidth} = useResponsive();
	
	const chartID = "weekly_time_and_energy_spent_chart";
	const time_spent = {
		name: "Tempo Consumido",
		data: data.time_spent
	};
	
	const energy_spent = {
		name: "Energia Consumida",
		data: data.energy_spent
	};
	
	const chartData = [time_spent, energy_spent];
	
	return (
		<div>
			<div className="grid justify-items-center">
				<h4>Rotina Semanal - Tempo & Energia</h4>
				<Card className="mt-5">
					<div className="flex flex-row max-h-[60px] max-w-[250px]">
						<h6>
							Media de Energia / Tempo:{" "}
							{100 * data.average_energy_by_time}%
						</h6>
					</div>
				</Card>
			</div>
			
			<Chart
				series={chartData}
				height={windowWidth > 640 ? 350 : 600 }
				type="bar"
				options={{
					chart: {
						id: chartID,
						toolbar: {
							show: false
						},
						zoom: {
							enabled: false
						},
					},
					legend: {
						show: true
					},
					plotOptions: {
						bar: {
							borderRadius: 4,
							horizontal: false,
							columnWidth: windowWidth > 640 ? "65%" : "100%" ,
							endingShape: "rounded",
							dataLabels: {
								position: "top"
							}
						}
					},
					colors: ["#2563eb", "#f59e0b"],
					dataLabels: {
						enabled: true,
						formatter: function(val) {
							return Math.floor(val * 100) / 100;
						}
					},
					stroke: {
						show: true,
						width: 2,
						colors: ["transparent"]
					},
					xaxis: {
						categories: data.categories
					},
					yaxis: {
						title: {
							text: "Horas Disponíveis"
						},
						min: 0,
						max: 24,
						forceNiceScale: true,
						labels: {
							formatter: function(val) {
								return Math.floor(val);
							}
						}
					},
					fill: {
						type: "gradient",
						opacity: 1
					}
				}}
			/>
		</div>
	);
};

export default WeeklyRoutineChart;
