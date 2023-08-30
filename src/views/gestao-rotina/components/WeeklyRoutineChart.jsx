import React from "react";
import Chart from "react-apexcharts";
import { Card } from "../../../components/ui";
import useResponsive from "../../../utils/hooks/useResponsive";
import { useUserID } from "../../../hooks/useUserID";
import { useQuery } from "@tanstack/react-query";
import { getDashboard22 } from "../../../services/Module2/Dashboard";

const WeeklyRoutineChart = () => {
	const { userID } = useUserID();
	const { windowWidth } = useResponsive();
	
	const { isLoading, isError, error, data } = useQuery({
		queryKey: ["Dashboard22Data", userID],
		queryFn: () => getDashboard22(userID),
		refetchOnMount: true
	});
	if (isLoading) return "Loading...";
	if (isError) return "An error has occurred: " + error.message;
	
	const charRawData = data.data;
	
	const chartID = "weekly_time_and_energy_spent_chart";
	const routine_actions_time_spent = {
		name: "Horas Consumidas Ações de Rotina",
		data: charRawData.routine_actions_time_spent
	};
	
	const plan_actions_time_spent = {
		name: "Horas Consumidas Ações de Plano",
		data: charRawData.plan_actions_time_spent
	};
	
	const weekly_free_time = {
		name: "Tempo Livre",
		data: charRawData.weekly_free_time
	};
	
	const chartData = [
		routine_actions_time_spent,
		plan_actions_time_spent,
		weekly_free_time
	];
	console.log(chartData);
	
	return (
		<div>
			<div className="grid justify-items-center">
				<h4>Rotina Semanal - Tempo & Energia</h4>
				<Card className="mt-5">
					<div className="flex flex-row max-h-[60px] max-w-[250px]">
						<h6>
							Media de Energia / Tempo:{" "}
							{100 * charRawData.average_energy_by_time}%
						</h6>
					</div>
				</Card>
			</div>
			
			<Chart
				series={chartData}
				height={windowWidth > 640 ? 350 : 600}
				type="bar"
				options={{
					chart: {
						id: chartID,
						toolbar: {
							show: false
						},
						zoom: {
							enabled: false
						}
					},
					legend: {
						show: true
					},
					plotOptions: {
						bar: {
							borderRadius: 4,
							horizontal: false,
							columnWidth: windowWidth > 640 ? "65%" : "100%",
							endingShape: "rounded",
							dataLabels: {
								position: "top"
							}
						}
					},
					colors: ["#2563eb", "#f59e0b", "#079f1f"],
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
						categories: charRawData.categories
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
