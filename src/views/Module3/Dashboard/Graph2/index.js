import React from "react";
import { Card } from "../../../../components/ui";
import { Chart } from "../../../../components/shared";
import { useUserID } from "../../../../hooks/useUserID";
import { useQuery } from "@tanstack/react-query";
import { getDashboard32Data } from "../../../../services/Module3/Dashboard";

const arrayRange = (start, stop, step) =>
	Array.from(
		{ length: (stop - start) / step + 1 },
		(value, index) => start + index * step
	);

function Graph2() {
	const { userID } = useUserID();
	const { isLoading, error, data } = useQuery({
		queryKey: ["data"],
		queryFn: () => getDashboard32Data(userID)
	});
	// if (isLoading) return "Loading...";
	if (error) return "An error has occurred: " + error.message;
	
	const series = [
		{ name: "Conquistas Saude Fisica", data: [1, 2, 3, 4] },
		{ name: "Conquistas Saude Mental", data: [4, 3, 2, 1] },
		{ name: "Conquistas Vida Social", data: [3, 1, 4, 2] },
		{ name: "Conquistas Vida Profissional", data: [2, 4, 1, 3] },
		{ name: "Conquistas Gestao Financeira", data: [0, 0, 0, 0] },
		{ name: "Metas Saude Fisica", data: [0, 0, 0, 0] },
		{ name: "Metas Saude Mental", data: [0, 0, 0, 0] },
		{ name: "Metas Vida Social", data: [0, 0, 0, 0] },
		{ name: "Metas Vida Profissional", data: [0, 0, 0, 0] },
		{ name: "Metas Gestao Financeira", data: [0, 0, 0, 0] }
	];
	const categories = arrayRange(15, 77, 1);
	
	
	const chartOptions = {
		chart: {
			height: 350,
			type: "line",
			toolbar: {
				show: false
			}
		},
		forecastDataPoints: {
			count: 7
		},
		stroke: {
			width: 5,
			curve: "smooth"
		},
		xaxis: {
			categories: categories,
			tickAmount: 10
		},
		title: {
			text: "Conquistas e Metas X Vida",
			align: "center",
			style: {
				fontSize: "16px",
				color: "#666"
			}
		},
		fill: {
			type: "gradient",
			gradient: {
				shade: "dark",
				gradientToColors: ["#FDD835"],
				shadeIntensity: 1,
				type: "horizontal",
				opacityFrom: 1,
				opacityTo: 1,
				stops: [0, 100, 100, 100]
			}
		},
		yaxis: {
			categories: [
				"Conquistas Saude Fisica",
				"Conquistas Saude Mental",
				"Conquistas Vida Social",
				"Conquistas Vida Profissional",
				"Conquistas Gestao Financeira",
				"Metas Saude Fisica",
				"Metas Saude Mental",
				"Metas Vida Social",
				"Metas Vida Profissional",
				"Metas Gestao Financeira"
			]
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
