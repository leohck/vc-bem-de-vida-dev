import React from "react";
import { Chart } from "../../../../../components/shared";

function GaugeMeter() {
	return (
		<div>
			<Chart
				series={[67]}
				type={"radialBar"}
				options={{
				chart: {
					height: 350,
					type: "radialBar",
					offsetY: -10
				},
				plotOptions: {
					radialBar: {
						startAngle: -135,
						endAngle: 135,
						dataLabels: {
							name: {
								fontSize: "16px",
								color: undefined,
								offsetY: 120
							},
							value: {
								offsetY: 76,
								fontSize: "22px",
								color: undefined,
								formatter: function(val) {
									return val + "%";
								}
							}
						}
					}
				},
				fill: {
					type: "gradient",
					gradient: {
						shade: "dark",
						shadeIntensity: 0.15,
						inverseColors: false,
						opacityFrom: 1,
						opacityTo: 1,
						stops: [0, 50, 65, 91]
					}
				},
				stroke: {
					dashArray: 4
				},
				labels: ["Median Ratio"]
			}}
			/>
		</div>
	);
}

export default GaugeMeter;
