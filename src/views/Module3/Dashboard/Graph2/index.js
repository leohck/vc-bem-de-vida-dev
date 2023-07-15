import React from "react";
import { Card } from "../../../../components/ui";
import { Chart } from "../../../../components/shared";
import { useUserID } from "../../../../hooks/useUserID";
import { useQuery } from "@tanstack/react-query";
import { getDashboard32Data } from "../../../../services/Module3/Dashboard";
import { ASPECTS_TYPES_2 } from "../../../../constants/aspects.constant";

function Graph2() {
	const { userID } = useUserID();
	const { isLoading, error, data } = useQuery({
		queryKey: ["Dashboard32Data"],
		queryFn: () => getDashboard32Data(userID)
	});
	if (isLoading) return "Loading...";
	if (error) return "An error has occurred: " + error.message;
	const series = [
		{ name: "Conquistas Saude Fisica", data: data.data["achievements"]["Saude Fisica"] },
		{ name: "Conquistas Saude Mental", data: data.data["achievements"]["Saude Mental"] },
		{ name: "Conquistas Vida Social", data: data.data["achievements"]["Vida Social"] },
		{ name: "Conquistas Vida Profissional", data: data.data["achievements"]["Vida Profissional"] },
		{ name: "Conquistas Gestao Financeira", data: data.data["achievements"]["Gestao Financeira"] }
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
	const goals = data.data["goals"];
	for (let aspect of ASPECTS_TYPES_2) {
		if (goals !== undefined) {
			goals[aspect].forEach(item => {
				points.push({
					x: item.age,
					y: item.goals_count,
					marker: {
						size: 4,
						fillColor: getColor(aspect),
						strokeColor: getColor(aspect),
						shape: "square"
					}
				});
			});
		}
	}
	
	const chartOptions = {
		chart: {
			height: 350,
			type: "line",
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
		title: {
			text: "Linha do Tempo / Conquistas e Metas",
			align: "center",
			style: {
				fontSize: "16px",
				color: "#666"
			}
		},
		xaxis: {
			forceNiceScale: true,
			min: 15,
			max: 77
		},
		yaxis: {
			min: 0,
			max: 10
		},
		stroke: {
			width: 5,
			curve: "smooth"
		},
		dataLabels: {
			enabled: false
		},
		annotations: {
			points: points
		}
	};
	
	
	return (
		<Card>
			<div>
				<Chart options={chartOptions} series={series} />
			</div>
		
		</Card>
	);
}

export default Graph2;
