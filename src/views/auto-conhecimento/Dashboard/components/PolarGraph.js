import React from "react";
import { Chart } from "../../../../components/shared";
import {
	HEX_COLOR_NOT_RATED,
	HEX_COLOR_LOW,
	HEX_COLOR_VERY_LOW,
	HEX_COLOR_REGULAR,
	HEX_COLOR_HIGH,
	HEX_COLOR_VERY_HIGH
} from "../../../../constants/aspects.constant";
import { useQuery } from "@tanstack/react-query";
import { getDashboard11Data } from "../../../../services/Module1/Dashboard";
import { useUserID } from "../../../../hooks/useUserID";

function PolarGraph() {
	const { userID } = useUserID();
	const { isLoading, error, data } = useQuery({
		queryKey: ["Dashboard11Data"],
		queryFn: () => getDashboard11Data(userID)
	});
	if (isLoading) return "Loading...";
	if (error) return "An error has occurred: " + error.message;
	
	const graphData = data.data.life_aspect_questions_ratings;
	return (
		<Chart
			type="polarArea"
			height={500}
			series={graphData}
			options={{
				chart: {
					toolbar: {
						show: false
					}
				},
				legend: {
					show: false
				},
				title: {
					text: "Radar de Qualidade de Vida",
					align: "left"
				},
				stroke: {
					colors: ["#fff"]
				},
				tooltip: {
					enabled: true
				},
				colors: [function({ value, seriesIndex, w }) {
					switch (value) {
						case 0:
							return HEX_COLOR_NOT_RATED;
						case 1:
							return HEX_COLOR_VERY_LOW;
						case 2:
							return HEX_COLOR_LOW;
						case 3:
							return HEX_COLOR_REGULAR;
						case 4:
							return HEX_COLOR_HIGH;
						case 5:
							return HEX_COLOR_VERY_HIGH;
						default:
							return HEX_COLOR_NOT_RATED;
					}
				}],
				fill: {
					opacity: 0.8,
					colors: [function({ value, seriesIndex, w }) {
						switch (value) {
							case 0:
								return HEX_COLOR_NOT_RATED;
							case 1:
								return HEX_COLOR_VERY_LOW;
							case 2:
								return HEX_COLOR_LOW;
							case 3:
								return HEX_COLOR_REGULAR;
							case 4:
								return HEX_COLOR_HIGH;
							case 5:
								return HEX_COLOR_VERY_HIGH;
							default:
								return HEX_COLOR_NOT_RATED;
						}
					}]
				},
				yaxis: {
					show: false,
					min: 0,
					max: 5,
					forceNiceScale: false
				},
				responsive: [{
					breakpoint: 480,
					options: {
						chart: {
							height: 350
						}
					}
				}]
			}}
		/>
	);
}

export default PolarGraph;

