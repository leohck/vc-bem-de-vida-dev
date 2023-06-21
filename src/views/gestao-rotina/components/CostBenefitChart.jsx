import React, { useCallback, useEffect, useState } from "react";
import { Card, Radio, Segment } from "../../../components/ui";
import { Chart } from "../../../components/shared";
import store from "../../../store";
import { getCostBenefitChartData } from "../../../services/PersonalService";
import Image from "d3-fetch/src/image";

const CostBenefitChart = () => {
	const [lifeAspect, setLifeAspect] = useState(["Saude Fisica"]);
	const [chartData, setChartData] = useState([]);
	const [chartMainData, setChartMainData] = useState({});
	const [ratings, setRatings] = useState({});


	const handleFormInput = useCallback(
		(val) => {
			setChartData(chartMainData[lifeAspect]);
			setLifeAspect(val);
		},
		[lifeAspect]
	);

	useEffect(() => {
		const { auth } = store.getState();
		const user_id = auth.user.user_info_id;
		const getData = async () => {
			await getCostBenefitChartData(user_id).then(
				response => {
					setChartMainData(response.data);
					setRatings(response.data.ratings);
				}
			);
		};
		try {
			getData();
		} catch (e) {
			console.log(e);
		}
	}, []);

	useEffect(() => {
		setChartData(chartMainData[lifeAspect]);
	}, [lifeAspect, chartMainData]);

	const LifeAspectRating = () => {
		const rating_value = ratings[lifeAspect[0]];
		const img_src_path = "/img/ratings/";
		return (
			<div>
				<h1>
					<img src={`${img_src_path}rating-${rating_value}.png`}
					     alt={`life-aspect-rating-${rating_value}`}
					     width={50}
					     height={50}
					/>
				</h1>
			</div>
		);
	};

	return (
		<div className="flex flex-col justify-items-center">
			<div className="grid justify-items-center mb-4">
				<h4>Custo x Beneficio</h4>
			</div>
			<div className="flex flex-row gap-4 justify-evenly">
				<Segment
					size="sm"
					value={lifeAspect}
					onChange={(val) => handleFormInput(val)}
					className="flex flex-col justify-evenly"
				>
					<Segment.Item value="Saude Fisica">
						Saude Fisica
					</Segment.Item>
					<Segment.Item value="Saude Mental">
						Saude Mental
					</Segment.Item>
					<Segment.Item value="Vida Social">Vida Social</Segment.Item>
					<Segment.Item value="Vida Profissional">
						Vida Profissional
					</Segment.Item>
					<Segment.Item value="Gestao Financeira">
						Gestao Financeira
					</Segment.Item>
				</Segment>
				<div className="flex flex-col gap-2">
					<div className="grid justify-items-center">
						{ratings && (
							<LifeAspectRating />
						)}
					</div>
					<div>
						<Chart
							series={chartData}
							height={500}
							type="bar"
							options={{
								plotOptions: {
									bar: {
										borderRadius: 4,
										horizontal: false,
										columnWidth: "55%",
										endingShape: "rounded",
										dataLabels: {
											position: "top"
										}
									}
								},
								colors: ["#16a34a", "#2563eb", "#f59e0b"],
								dataLabels: {
									enabled: true,
									position: "top",
									offsetY: 10
								},
								stroke: {
									show: true,
									width: 2,
									colors: ["transparent"]
								},
								xaxis: {
									categories: [lifeAspect]
								},
								yaxis: {
									min: 0,
									max: 100,
									forceNiceScale: false,
									labels: {
										formatter: function(val) {
											return Math.floor(val)
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
				</div>
			</div>
		</div>
	);
};

export default CostBenefitChart;
